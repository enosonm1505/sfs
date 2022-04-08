

function fnCallGuestProfile(Compid, GstTy, GuestId, Title, FirstNm, LastNM, GstNm_Ind) {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupGstProf",
        head: "Guest Profile",
        position: "center",
        minWidth: 1050,
        maxWidth: 1050,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 600,

        body: {
            view: 'form',
            minWidth: 1050,
            maxWidth: 1050,

            elements: [
                {
                    rows: [
                        {
                            cols: [
                                    {
                                        width: 700,
                                        rows: [
                                            {
                                                cols: [
                                                    {
                                                        view: "richselect",
                                                        id: "ddlGPTit",
                                                        label: " Title",
                                                        labelPosition: "top",
                                                        labelAlign: "Center",
                                                        labelWidth: 50,
                                                        inputWidth: 100,
                                                        width: 100,
                                                        on: {
                                                            onChange: function (newval, oldval) {
                                                            }
                                                        }
                                                    },
                                                    {
                                                        view: "text",
                                                        id: "txtGPGstName",
                                                        label: " Last Name",
                                                        labelAlign: "Center",
                                                        labelPosition: "top",
                                                        labelWidth: 200,
                                                        inputWidth: 200,
                                                        width: 200,
                                                    },
                                                      {
                                                          view: "text",
                                                          id: "txtGPFirstNm",
                                                          label: " First Name",
                                                          labelAlign: "Center",
                                                          labelPosition: "top",
                                                          labelWidth: 200,
                                                          inputWidth: 200,
                                                          width: 200,
                                                      },
                                                      {
                                                          view: "button",
                                                          id: 'btnGPGstSrch',
                                                          minWidth: 250,
                                                          label: " ",
                                                          labelAlign: "Center",
                                                          labelPosition: "top",
                                                          labelWidth: 1,
                                                          width: 50,
                                                          height: 28,
                                                          type: 'icon',
                                                          icon: 'wxi-search',
                                                          hidden:true,
                                                          css: "webixGsrch",
                                                          on: {
                                                              onItemClick: function () {
                                                                  if ($$("ddlGuestTy").getValue() != "M")
                                                                      fnCallPopUpGstSearch();
                                                                  else
                                                                      fnCallMemberSearch();
                                                              }
                                                          }
                                                      },
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        view: "radio",
                                        id: 'RbtnGPTy',
                                        label: "Guest Type",
                                        //vertical: true,
                                        disabled: true,
                                        height: 60,
                                        value: 1, options: [
                                            { "id": "O", "value": "Individual" }, // the initially selected item
                                            { "id": "C", "value": "Compay" },
                                            { "id": "G", "value": "FO Guest" },
                                            { "id": "M", "value": "Member" }

                                        ]
                                    }
                            ]
                        },
                        {
                            width: 1320,
                            height: 450,
                            id: "GPTabView",
                            view: "tabview",
                            type: "space",
                            cells: [
                              {
                                  header: "<span class='fa fa-home'></span>Address",
                                  body: {
                                      id: "Address",
                                      view: "form",
                                      select: true,
                                      elements: [
                                          {
                                              rows: [
                                                     {
                                                         view: "text",
                                                         id: "txtGPAddress",
                                                         labelAlign: "Right",
                                                         label: "Address",
                                                         labelWidth: 150,
                                                         inputWidth: 500,
                                                         width: 500,
                                                     },
                                                     {
                                                         view: "text",
                                                         id: "txtGPAddress1",
                                                         labelAlign: "Right",
                                                         label: " ",
                                                         labelWidth: 150,
                                                         inputWidth: 500,
                                                         width: 500,
                                                     },
                                                     {
                                                         view: "text",
                                                         id: "txtGPAddress2",
                                                         labelAlign: "Right",
                                                         label: " ",
                                                         labelWidth: 150,
                                                         inputWidth: 500,
                                                         width: 500,
                                                     },
                                                     {
                                                         cols: [
                                                             {
                                                                 view: "text",
                                                                 id: "txtGPCity",
                                                                 labelAlign: "Right",
                                                                 label: "City",
                                                                 labelWidth: 150,
                                                                 inputWidth: 300,
                                                                 width: 300,
                                                             },
                                                             {
                                                                 view: "text",
                                                                 id: "txtGPPincode",
                                                                 labelAlign: "Right",
                                                                 label: "Zip Code",
                                                                 labelWidth: 70,
                                                                 inputWidth: 200,
                                                                 width: 200,
                                                             }
                                                         ]
                                                     },
                                                     {
                                                         cols: [
                                                             {
                                                                 view: "text",
                                                                 id: "txtGPCountry",
                                                                 labelAlign: "Right",
                                                                 label: "Country",
                                                                 labelWidth: 150,
                                                                 inputWidth: 400,
                                                                 disabled:true,
                                                                 width: 400,
                                                             },
                                                             {
                                                                 view: "button",
                                                                 id: 'btnGPCntSrch',
                                                                 minWidth: 250,
                                                                 labelWidth: 0,
                                                                 width: 30,
                                                                 height: 28,
                                                                 type: 'icon',
                                                                 icon: 'wxi-search',
                                                                 css: "Ar_search",
                                                                 on: {
                                                                     onItemClick: function () {
                                                                         fnCountrySrch();
                                                                     }
                                                                 }
                                                             }
                                                         ]
                                                     },
                                                     {
                                                         cols: [
                                                             {
                                                                 view: "text",
                                                                 id: "txtGPPhone",
                                                                 labelAlign: "Right",
                                                                 label: "Phone",
                                                                 labelWidth: 150,
                                                                 inputWidth: 400,
                                                                 width: 400,
                                                             }, {
                                                                 view: "text",
                                                                 id: "txtGPOfftel",
                                                                 labelAlign: "Right",
                                                                 label: "Office Tel",
                                                                 labelWidth: 150,
                                                                 inputWidth: 380,
                                                                 width: 380,
                                                             },
                                                         ]
                                                     },
                                                     {
                                                         cols: [
                                                             {
                                                                 view: "text",
                                                                 id: "txtGPEmail1",
                                                                 labelAlign: "Right",
                                                                 label: "Email 1",
                                                                 labelWidth: 150,
                                                                 inputWidth: 400,
                                                                 width: 400,
                                                             },
                                                             {
                                                                 view: "text",
                                                                 id: "txtGPMobile",
                                                                 labelAlign: "Right",
                                                                 label: "Mobile",
                                                                 labelWidth: 150,
                                                                 inputWidth: 380,
                                                                 width: 380,
                                                             }
                                                         ]
                                                     },
                                                     {
                                                         cols: [
                                                             {
                                                                 view: "text",
                                                                 id: "txtGPEmail2",
                                                                 labelAlign: "Right",
                                                                 label: "Email 2",
                                                                 labelWidth: 150,
                                                                 inputWidth: 400,
                                                                 width: 400,
                                                             },
                                                             {
                                                                 view: "text",
                                                                 id: "txtGPFax",
                                                                 labelAlign: "Right",
                                                                 label: "Fax",
                                                                 labelWidth: 150,
                                                                 inputWidth: 380,
                                                                 width: 380,
                                                             }

                                                         ]
                                                     },
                                                     {
                                                         view: "label",
                                                         id: "lbl1",
                                                         labelAlign: "Left",
                                                         label: "Contact Details",
                                                         labelWidth: 150,
                                                         inputWidth: 400,
                                                         width: 400,
                                                     },
                                                     {
                                                         view: "text",
                                                         id: "txtGPName",
                                                         labelAlign: "Right",
                                                         label: "Name",
                                                         labelWidth: 150,
                                                         inputWidth: 400,
                                                         width: 400,
                                                     },
                                                     {
                                                         view: "text",
                                                         id: "txtGPDesig",
                                                         labelAlign: "Right",
                                                         label: "Designation",
                                                         labelWidth: 150,
                                                         inputWidth: 400,
                                                         width: 400,
                                                     },
                                                     {
                                                         view: "text",
                                                         id: "txtGPCPhone",
                                                         labelAlign: "Right",
                                                         label: "Phone",
                                                         labelWidth: 150,
                                                         inputWidth: 400,
                                                         width: 400,
                                                     },
                                                     {
                                                         cols: [
                                                             {
                                                                 view: "text",
                                                                 id: "txtGPCEmail1",
                                                                 labelAlign: "Right",
                                                                 label: "Email 1",
                                                                 labelWidth: 150,
                                                                 inputWidth: 400,
                                                                 width: 400,
                                                             },
                                                             {
                                                                 view: "text",
                                                                 id: "txtGPCEmail2",
                                                                 labelAlign: "Right",
                                                                 label: "Email 2",
                                                                 labelWidth: 150,
                                                                 inputWidth: 380,
                                                                 width: 380,
                                                             }

                                                         ]
                                                     }
                                              ]
                                          }
                                      ]
                                  }
                              }
                            ]
                        }
                    ]
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 1050,
                             paddingX: 870,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Save',
                                             type: "icon",
                                             icon: "wxi-check",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     fnSaveGuestProf(Compid,GuestId, GstNm_Ind);
                                                 }
                                             }
                                         },
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupGstProf').hide();
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

    $$("PopupGstProf").show();
    fnLoadGstData(GuestId, Title, LastNM, FirstNm, GstTy, GstNm_Ind);
}

function fnLoadGstData(GuestId, Title, LastNM, FirstNm, GstTy, GstNm_Ind) {
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BQRESDEFLOAD";
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

                var TblTit = rowData.TBLTITLE;
                $$("ddlGPTit").define("options", TblTit);
                $$("ddlGPTit").refresh();
            }
        }
    });

    if ($.trim(GuestId) != "") {

        var dataparam = {};
        dataparam["REQTYPE"] = "GET_GUESTPROFOPEN";
        dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
        dataparam["COMPID"] = $("#hdnCompId").val();
        dataparam["GstId"] = GuestId;
        var DataVal = JSON.stringify(dataparam);
        $.ajax({
            async: false,
            url: "/BQTrans/COMAPI_CALL",
            type: 'POST',
            data: "request=" + DataVal,
            success: function (d) {
                if (d != "") {

                    var rowData = JSON.parse(d);

                    if (rowData.length > 0) {
                        $$("ddlGPTit").setValue($.trim(rowData[0].GS_TL_ID));

                        $$("RbtnGPTy").setValue($.trim(rowData[0].GS_TY));

                        if ($.trim(GstNm_Ind) == "1")
                            $$("txtGPGstName").setValue(rowData[0].GS_NM);
                        else if ($.trim(GstNm_Ind) == "2")
                            $$("txtGPFirstNm").setValue(rowData[0].GS_NM);
                        else
                            $$("txtGPGstName").setValue(rowData[0].GS_NM);

                        if ($.trim(rowData[0].GS_TY) != "C") {

                            $$("txtGPFirstNm").setValue(rowData[0].GS_NM1);
                            $$("txtGPGstName").setValue(rowData[0].GS_NM2);
                        }

                        $$("txtGPAddress").setValue(rowData[0].ADD1);
                        $$("txtGPAddress1").setValue(rowData[0].ADD2);
                        $$("txtGPAddress2").setValue(rowData[0].ADD3);

                        $$("txtGPCity").setValue(rowData[0].PL);
                        $$("txtGPPincode").setValue(rowData[0].PN);
                        var GstDet = fnMstCountry();

                        var cnt = GstDet.filter(function (GstDet) {
                            return GstDet.CT_ID == $.trim(rowData[0].CT_ID);
                        });

                        if (cnt.length > 0) {
                            $$("txtGPCountry").setValue(cnt[0].COUNTRY_NM);
                        }

                        $$("txtGPPhone").setValue(rowData[0].RS_T);
                        $$("txtGPOfftel").setValue(rowData[0].OF_T);
                        $$("txtGPEmail1").setValue(rowData[0].MB);
                        $$("txtGPMobile").setValue(rowData[0].EM);
                        $$("txtGPEmail2").setValue(rowData[0].EM2);

                        $$("txtGPFax").setValue(rowData[0].K1_ID);
                        $$("txtGPName").setValue(rowData[0].CN_PR);

                        $$("txtGPDesig").setValue(rowData[0].CN_DS);
                        $$("txtGPCPhone").setValue(rowData[0].CN_TL);

                        $$("txtGPCEmail1").setValue(rowData[0].J1_ID);
                        $$("txtGPCEmail2").setValue(rowData[0].J2_ID);
                    }
                }
            }
        });
    }
    else {

        Cleardata();

        $$("ddlGPTit").setValue($.trim(Title));

        $$("txtGPGstName").setValue(LastNM);

        $$("txtGPFirstNm").setValue(FirstNm);

        $$("RbtnGPTy").setValue(GstTy);

        var GstDet = fnMstCountry();

        var cnt = GstDet.filter(function (GstDet) {
            return GstDet.CT_ID == $.trim($("#hdnCountryId").val());
        });

        if (cnt.length > 0) {
            $$("txtGPCountry").setValue(cnt[0].COUNTRY_NM);
        }
    }
}

function fnMstCountry() {

    var rowData = [];
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MSTCOUNTRY";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
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
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });
    return rowData;
}

function fnSaveGuestProf(CompId, GuestId, GstNm_Ind) {

    if ($$("txtGPGstName").getValue() == "") {

        if ($.trim(GstNm_Ind) != "0") {
            AlertMessage("Last Name Cannot be empty");
            return;
        }
        else {
            AlertMessage("Guest Name Cannot be empty");
            return;
        }
    }

    if ($$("txtGPCountry").getValue() == "") {
        AlertMessage("Country Cannot be empty");
        return;
    }
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_GUESTPROFSAVE";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = CompId;
    dataparam["CurMode"] = ($.trim(GuestId) == "" ? "N" : "O");
    dataparam["txtGstId"] = GuestId;

    dataparam["ddlGPTit"] = $.trim($$("ddlGPTit").getValue());
    dataparam["txtGPGstName"] = $.trim($$("txtGPGstName").getValue());
    dataparam["txtGPFirstNm"] = $.trim($$("txtGPFirstNm").getValue());
    dataparam["RbtnGPTy"] = $.trim($$("RbtnGPTy").getValue());

    dataparam["txtGPAddress"] = $.trim($$("txtGPAddress").getValue());
    dataparam["txtGPAddress1"] = $.trim($$("txtGPAddress1").getValue());
    dataparam["txtGPAddress2"] = $.trim($$("txtGPAddress2").getValue());

    dataparam["txtGPCity"] = $.trim($$("txtGPCity").getValue());
    dataparam["txtGPPincode"] = $.trim($$("txtGPPincode").getValue());

    dataparam["txtGPCountry"] = $.trim($("#hdnCountryId").val());
    dataparam["txtGPPhone"] = $.trim($$("txtGPPhone").getValue());
    dataparam["txtGPOfftel"] = $.trim($$("txtGPOfftel").getValue());
    dataparam["txtGPEmail1"] = $.trim($$("txtGPEmail1").getValue());
    dataparam["txtGPMobile"] = $.trim($$("txtGPMobile").getValue());
    dataparam["txtGPEmail2"] = $.trim($$("txtGPEmail2").getValue());
    dataparam["txtGPFax"] = $.trim($$("txtGPFax").getValue());

    dataparam["txtGPName"] = $.trim($$("txtGPName").getValue());
    dataparam["txtGPDesig"] = $.trim($$("txtGPDesig").getValue());
    dataparam["txtGPCPhone"] = $.trim($$("txtGPCPhone").getValue());

    dataparam["txtGPCEmail1"] = $.trim($$("txtGPCEmail1").getValue());
    dataparam["txtGPCEmail2"] = $.trim($$("txtGPCEmail2").getValue());

    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);

    debugger;
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/BQTrans/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                debugger;
                rowData = JSON.parse(objRes);
                if (rowData.vRetMsg == "True") {
                    SuccessMsg('Created Succesfully', rowData.vGuestId);
                    return
                }
                else {
                    AlertMessage('Saved Failed');
                    return;
                }
            }
        },
    });
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

function SuccessMsg(Text, GuestId) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Message",
        text: Text,
        modal: true,
    }).then(function (result) {

        $$("ddlTit").setValue($$("ddlGPTit").getValue());
        $$("txtGstName").setValue($$("txtGPGstName").getValue());
        $$("txtFirstNm").setValue($$("txtGPFirstNm").getValue());
        $("#hdnGstId").val(GuestId);
        $$("PopupGstProf").hide();
        Cleardata();
    })
}

function Cleardata() {

    $$("ddlGPTit").setValue("");

    $$("RbtnGPTy").setValue("");
    $$("txtGPGstName").setValue("");
    $$("txtGPFirstNm").setValue("");
    $$("txtGPAddress").setValue("");
    $$("txtGPAddress1").setValue("");
    $$("txtGPAddress2").setValue("");

    $$("txtGPCity").setValue("");
    $$("txtGPPincode").setValue("");
    $$("txtGPCountry").setValue("");

    $$("txtGPPhone").setValue("");
    $$("txtGPOfftel").setValue("");
    $$("txtGPEmail1").setValue("");
    $$("txtGPMobile").setValue("");
    $$("txtGPEmail2").setValue("");

    $$("txtGPFax").setValue("");
    $$("txtGPName").setValue("");

    $$("txtGPDesig").setValue("");
    $$("txtGPCPhone").setValue("");

    $$("txtGPCEmail1").setValue("");
    $$("txtGPCEmail2").setValue("");
}

function fnCountrySrch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupCountry",
        head: "Country Search",
        position: "center",
        minWidth: 300,
        maxWidth: 300,
        move: true,
        height: 500,
        body: {
            view: 'form',
            minWidth: 300,
            maxWidth: 300,
            height: 500,
            elements: [
                {

                    view: "datatable",
                    id: "grdCountry",
                    select: "row",
                    data: [],
                    height: 400,
                    scroll: "y",
                    columns: [
                            { header: ["Country", { content: "textFilter" }, ], id: "COUNTRY_NM", width: 280, css: { 'text-align': 'left ! important' } },
                            { header: "Venue", id: "CT_ID", hidden: true, },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            var selectedRows = this.getSelectedItem(id.row);

                            $("#hdnCountryId").val(selectedRows[0].CT_ID);
                            $("#hdnCountryNm").val(selectedRows[0].COUNTRY_NM);

                            $$("txtGPCountry").setValue($("#hdnCountryNm").val());

                            $$("PopupCountry").hide();
                        },
                        'onKeyPress': function (e, id) {
                            if (e == 27) {
                                $("PopupCountry").hide();
                            }
                        }
                    }
                },
                {
                    cols: [
                         {
                             minWidth: 205,
                             paddingX: 205,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupCountry').hide();
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

    $$("PopupCountry").show();
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MSTCOUNTRY";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
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
                $$("grdCountry").clearAll();
                $$("grdCountry").parse(rowData);
                $$("grdCountry").refresh();
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
