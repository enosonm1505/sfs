
var app = angular.module('MTApp', ['webix']);

app.controller("MasterController", function ($scope) {
    var dataProp = fnPropertyLoad();

    $("#LoadDIv").hide();
    $scope.frmMstCity = {

        id: "frmMstCity",
        view: 'form',
        minWidth: 700,
        maxWidth: 700,
        height: 500,
        elements: [
            {
                paddingX: 20,
                rows: [

                    {
                        cols: [
                            {
                                view: "richselect",
                                id: "ddlcountry",
                                label: " Country",
                                labelAlign: "Left",
                                inputWidth: 320,
                                labelWidth: 70,
                                //width: 550,
                                on: {
                                    onChange: function (newval, oldval) {
                                        fnddlCountryName();
                                    }
                                }

                            },

                        ]

                    },

                    {
                        cols: [

                             {
                                 view: "button",
                                 id: "btnDel",
                                 stringResult: true,
                                 type: "icon",
                                 icon: "wxi-trash",
                                 //label: "Add",
                                 labelAlign: "Left",
                                 inputWidth: 65,
                                 labelWidth: 30,
                                 width: 100,
                                 height: 30,
                                 css: 'float-right',
                                 on: {
                                     onItemClick: function () {
                                         fnCallDelRow();
                                     }
                                 }

                             },

                            {
                                view: "button",
                                id: "btnAdd",
                                stringResult: true,
                                type: "icon",
                                icon: "wxi-plus",
                                //label: "Add",
                                labelAlign: "Left",
                                inputWidth: 65,
                                labelWidth: 30,
                                width: 70,
                                height: 30,
                                css: 'float-right',
                                on: {
                                    onItemClick: function () {
                                        var bValid = countryValidation();
                                        if (bValid == true) {
                                            $("#hdnCurMode").val("N");
                                            fnCountryPopUp("N");
                                        }

                                    }
                                }

                            },
                        ]

                    },


                    {
                        cols: [
                            {
                                view: "datatable",
                                id: "grdMstCity",
                                select: "row",
                                height: 420,
                                fixedRowHeight: false,
                                rowLineHeight: 23,
                                autoConfig: true,
                                minWidth: 150,
                                width: 620,
                                scroll: true,
                                position: "flex",
                                css: "webix_header_border wingrd_hight",
                                data: [],
                                columns: [
                                    { header: ["City"], id: "city_nm", width: 250, css: { 'text-align': 'left ! important' }, fillspace: true },
                                    { header: ["ZipCode"], id: "z_id", width: 200, css: { 'text-align': 'left ! important' }, fillspace: true },
                                    { header: ["city_id"], id: "city_id", hidden: true, width: 240, css: { 'text-align': 'left ! important' }, fillspace: true },
                                    { header: ["Reg_Id", ], id: "rg_id", hidden: true, width: 240, css: { 'text-align': 'left ! important' }, fillspace: true },
                                    { header: ["State", ], id: "sr_nm", width: 240, css: { 'text-align': 'left ! important' }, fillspace: true },

                                ],
                                data: [],
                                on: {
                                    'onItemDblClick': function (id) {
                                        debugger;
                                        $("#hdnCurMode").val("O");
                                        fnCountryPopUp("O");

                                    }

                                }


                            },

                        ]

                    },

                ]

            }

        ]
    }
});

function countryValidation() {
    debugger;
    if (($.trim($$("ddlcountry").getValue()) == "")) {
        AlertMessage("Country cannot be empty");
        return false;
    }
    return true;
}


function fnCountryPopUp(mode) {
    debugger;

    var rowData= fnStateLoad();

    var Tblstate = rowData.TBLREGION;

    var StateId = ""; var CityNm = ""; var ZipCode = "";

    if ($.trim(mode) == "O") {

        var selectedRows = $$("grdMstCity").getSelectedItem();

        StateId = $.trim(selectedRows.rg_id);

        CityNm = $.trim(selectedRows.city_nm);

        ZipCode = $.trim(selectedRows.z_id);

        $("#hdnCityId").val($.trim(selectedRows.city_id));
    }

    var bValid = countryValidation();
    if (bValid == true) {
        webix.ui({
            view: "window",
            close: true,
            modal: true,
            id: "GridCountryPopup",
            head: "City Creation / Amendment",
            position: "center",
            minWidth: 900,
            maxWidth: 900,
            scroll: true,
            height: 400,
            body: {
                rows: [
                    {
                        cols: [
                            {
                                view: "text",
                                id: "PopUpTxtCity",
                                stringResult: true,
                                label: "City",
                                labelAlign: "Left",
                                inputWidth: 320,
                                inputHeight: 30,
                                labelWidth: 80,
                                attributes: { maxlength: 25 },
                                width: 550,
                                value:CityNm,

                            },
                        ]
                    },
                    {
                        cols: [
                            {
                                view: "richselect",
                                id: "ddlPopUpState",
                                stringResult: true,
                                label: "State",
                                labelAlign: "Left",
                                inputWidth: 320,
                                //inputHeight: 30,
                                labelWidth: 80,
                                width: 550,
                                options: Tblstate,
                                value: StateId,

                            },
                        ]
                    },
                    {
                        cols: [
                             {
                                 view: "text",
                                 id: "PopUpZipCode",
                                 stringResult: true,
                                 label: "Zip Code",
                                 labelAlign: "Left",
                                 labelWidth: 80,
                                 inputHeight: 30,
                                 inputWidth: 320,
                                 width: 550,
                                 attributes: { maxlength: 10 },
                                 value: ZipCode,
                             },
                        ]
                    },

                      {
                          cols: [
                                {
                                    view: "button",
                                    id: "cancel",
                                    stringResult: true,
                                    label: "Cancel",
                                    labelAlign: "Right",
                                    inputWidth: 100,
                                    labelWidth: 30,
                                    width: 110,
                                    css: 'float-right',
                                    on: {
                                        onItemClick: function () {
                                            $$("GridCountryPopup").hide();

                                        }
                                    }

                                },

                      {
                          view: "button",
                          id: "PopUpSave",
                          stringResult: true,
                          label: "Save",
                          labelAlign: "Left",
                          inputWidth: 100,
                          labelWidth: 30,
                          width: 110,
                          css: 'float-right',
                          on: {
                              onItemClick: function () {
                                  var bValid = fnValidation();
                                  if (bValid == true) {
                                      fnSave();
                                  }
                             
                               }
                             }
                          },
                       ]
                    },
                ]
             }
        });
    }
    $$("GridCountryPopup").show();
}



function fnSave()
{
    debugger;
  
        if ($("#hdnCurMode").val() == "N") {
            var Country_Id = $$("ddlcountry").getValue();
        }
        if ($("#hdnCurMode").val() == "O") {
            var Country_Id = $$("ddlcountry").getValue();
        }

        var City_Nm = $$("PopUpTxtCity").getValue();
        var Zip_Cd = $$("PopUpZipCode").getValue();
        var Reg_Name = $$("ddlPopUpState").getValue();
        var City_Id = $("#hdnCityId").val();

        try {
            Request = {
                REQTYPE: "GET_SAVECITYMASTER",
                COMPID: $("#hdnCompId").val(),
                COUNTRY_ID: Country_Id,
                CITY_NM: City_Nm,
                ZIP_CD: Zip_Cd,
                REG_ID: Reg_Name,
                City_Id: City_Id,
                CurMode: $("#hdnCurMode").val(),
            }
            requestData = JSON.stringify(Request);
            requestData = encodeURIComponent(requestData);
            $.ajax({
                async: true,
                url: "/Master/MSTAPI_CALL",
                type: 'POST',
                data: "request=" + requestData,
                success: function (data) {
                    if (data != "") {
                        rowData = JSON.parse(data);
                        if ($.trim(rowData) == "True") {
                            if ($("#hdnCurMode").val() == "N") {
                                SuccessMsg('Created Successfully');

                                $$("GridCountryPopup").hide();
                                $$("GridCountryPopup").refresh();
                                //fnRefresh();
                            }

                            else {
                                SuccessMsg('Updated Successfully');

                                $$("GridCountryPopup").hide();
                                $$("GridCountryPopup").refresh();
                                // fnRefresh();
                            }
                            $("#LoadDIv").hide();
                            return;
                        }
                        else {
                            AlertMessage('Operation Failed');

                            $$("GridCountryPopup").hide();
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
   
function fnValidation() {
    debugger;
    var Dataset = fnLoadChkCityName();

    if ($("#hdnCurMode").val() == "N") {

        var Filter = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.CITY_NM) == $.trim($$("PopUpTxtCity").getValue());
        });

        if (Filter.length > 0) {
            AlertMessage("City already Exists");
          return false;
        }
    }

    if (($.trim($$("PopUpTxtCity").getValue()) == "")) {
        AlertMessage("City cannot be empty");
        return false;
    }
    return true;
}


function fnOpen() {

    debugger;
    $$("ddlcountry").enable();
    $$("btnDel").enable();
    $$("btnAdd").enable();
    var openmode = "1";
    var dataparam = {};
    var rowData = [];
    Request = {
        REQTYPE: "GETCOUNTRYLOAD",
        COMPID: $("#hdnCompId").val(),
        OPENMODE: openmode,
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
                $$("ddlcountry").define("options", rowData)
            }
        },


    });
};


function fnddlCountryName() {
    debugger;
    var ddlGroupID = $$("ddlcountry").getValue();
    $$("grdMstCity").clearAll();
    var rowdata = [];
    if (ddlGroupID != "") {
        try {
            Request = {
                REQTYPE: "GET_MST_LOADCHNGDROPVALUE",
                COMPID: $("#hdnCompId").val(),
                COUNTRY_ID: ddlGroupID,

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
                            $$("grdMstCity").clearAll();
                            $$("grdMstCity").parse(rowdata);
                            $$("grdMstCity").refresh();
                        }

                    }


                },

            });
        }
        catch (e) {
            console.log(e.message);

        }

    }
}


function fnStateLoad() {
    debugger;

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_STATELOAD";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["COUNTRY_ID"] =$$("ddlcountry").getValue();
    var DataVal = JSON.stringify(dataparam);

    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (data) {
            //debugger;
            if (data != "") {
                rowData = JSON.parse(data);
            }
        },
    });

    return rowData;
};


function fnLoadProperty() {
    debugger;

    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "richselect",
        id: "ddlProperty",
        container: "ddlPropertyCont",
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
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
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

function fnRefresh() {
    debugger;
    $$("grdMstCity").clearAll();
    $$("ddlcountry").setValue("");
    $$("ddlcountry").disable();
    $$("btnAdd").disable();
    $$("btnDel").disable();
   // $$("GridCountryPopup").clearAll();
    //$$("GridCountryPopup").refresh();
  
}


function fnLoadChkCityName() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_CITYNAME";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["COUNTRY_ID"] = $$("ddlcountry").getValue();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
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

function fnCallDelRow() {
    debugger;
    var SelRow = $$("grdMstCity").getSelectedItem();
    var City_Id = SelRow.city_id;
    var ddlCountry = $$("ddlcountry").getValue();
    debugger;
    var rowdata = [];
    if (ddlCountry != "") {
        try {
            Request = {
                REQTYPE: "GET_MST_GRIDCOUNTRYDELETEVALUE",
                COUNTRY_ID: ddlCountry,
                City_Id: City_Id,

            }
            requestData = JSON.stringify(Request);
            requestData = encodeURIComponent(requestData);
            $.ajax({
                async: false,
                url: "/Master/MSTAPI_CALL",
                type: 'POST',
                data: "request=" + requestData,
                success: function (data) {
                    debugger;
                    if (data != "") {
                        rowData = JSON.parse(data);
                        if ($.trim(rowData) == "True") {
                            var SelRow = $$("grdMstCity").getSelectedId(false);
                            $$("grdMstCity").editStop();
                            if (SelRow == undefined || SelRow == null) SelRow = $$("grdMstCity").getLastId();
                            $$("grdMstCity").remove(SelRow);
                           // $$("grdMstCity").remove(SelRow);
                            //SuccessMsg('Deleted Successfully');
                            }
                            $("#LoadDIv").hide();
                            return;
                        }
                        else {
                            AlertMessage('Operation Failed');

                            $("#LoadDIv").hide();
                            return;
                        }
                     },
                });
            }
        catch (e) {
            console.log(e.message);

        }

    }
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
