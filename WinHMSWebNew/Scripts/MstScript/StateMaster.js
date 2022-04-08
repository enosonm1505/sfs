var app = angular.module('MTApp', ['webix']);

app.controller("MasterController", function ($scope) {
    var dataProp = fnPropertyLoad();

    $("#LoadDIv").hide();
    $scope.frmMstState = {

        id: "frmMstState",
        view: 'form',
        minWidth: 600,
        maxWidth: 600,
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
                                        fnRegion();
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
                                        var bValid = AdValidation();
                                        if (bValid == true) {
                                            fnCallAddRow();
                                            $$("btnAdd").disable();
                                           // AlertMessage("More than One State is not allowed ");
                                          
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
                                id: "grdMstState",
                                select: "row",
                                height: 420,
                                fixedRowHeight: false,
                                rowLineHeight: 23,
                                autoConfig: true,
                                minWidth: 150,
                                width: 520,
                                scroll: true,
                                position: "flex",
                                editable: true,
                                spans: true,
                                navigation: true,
                                css: "webix_header_border wingrd_hight",
                                data: [],
                                columns: [
                                      { header: ["State"], id: "sr_nm", width: 280, css: { 'text-align': 'left ! important' }, editor: "text", liveEdit: true},
                                      { header: ["sr_id"], id: "sr_id", hidden: true, width: 200, css: { 'text-align': 'left ! important' }, editor: "text", liveEdit: true, fillspace: true },
                                      //{ header: ["c_id"], hidden: true, },
                                      { header: ["Region"], id: "c_id", width: 200, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: false, fillspace: true, collection: function (id) { return []; } },
                                      { header: ["Active"], id: "a_ind", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '18px', 'width': '18px' } },


                                ],
                                data: [],
                                on: {
                                    'onBlur': function () {
                                       // debugger;
                                        $$("grdMstState").editStop();
                                        $$("grdMstState").refresh();
                                    },
                                    'onAfterEditStop': function (state, editor) {
                                        debugger;
                                        $$("grdMstState").editStop();
                                        $$("grdMstState").refresh();
                                    },
                                    'onEditorChange': function (id, value, row) {
                                        $$("grdMstState").refresh();
                                        $$("grdMstState").editStop();
                                    },

                                        'onKeyPress': function (code, e) {
                                            //debugger;
                                            var selRow = this.getSelectedItem();
                                            var rowid = selRow.id;
                                            var vChk = selRow.a_ind;
                                            if (vChk == "1") selRow.a_ind = "1";
                                            else selRow.a_ind = "0";

                                        },

                                        onAfterEditStart: function (id) {
                                            if (id.column == 'sr_nm')
                                                this.getEditor().getInputNode().setAttribute("maxlength", 30);
                                            $$("grdMstState").refresh();
                                        }
                                    },
                                },
                             ]
                         },
                     ]
                 }
              ]
          }
     });



function AdValidation()
{
    debugger;

    if (($.trim($$("ddlcountry").getValue()) == "")) {
        AlertMessage("Country Cannot be empty");
        return false;
    }

    return true;
}

function fnOpen() {
    debugger;
    OPENCONTROL();
    var openmode = "1";
    var dataparam = {};
    var rowData = [];
    Request = {
        REQTYPE: "GET_FNDDLCOUNTRYLOAD",
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


function OPENCONTROL() {
    debugger;
    $$("ddlcountry").enable();
    $$("btnAdd").enable();
    document.getElementById("SAVE").disabled = false;
}

function fnRegion() {
    debugger;
    var ddlCountryId = $$("ddlcountry").getValue();
    Request = {
        REQTYPE: "GET_FNDDLREGIONLOAD",
        COMPID: $("#hdnCompId").val(),
        COUNTRY_ID: ddlCountryId,
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("grdMstState").clearAll();
                var Options = $$("grdMstState").getColumnConfig("c_id").collection;
                Options.clearAll();
                Options.parse(rowData.TBLREGION);
                $$("grdMstState").parse(rowData.TBLREGION);
                $$("grdMstState").refresh();
            }
        },
    });
};


function fnddlCountryName() {
    debugger;
    var ddlCountryId = $$("ddlcountry").getValue();
    $$("grdMstState").clearAll();
    var rowdata = [];
    if (ddlCountryId != "") {
        try {
            Request = {
                REQTYPE: "GET_MST_GRIDCOUNTRYDROPVALUE",
                COMPID: $("#hdnCompId").val(),
                COUNTRY_ID: ddlCountryId,

            }
            requestData = JSON.stringify(Request);
            requestData = encodeURIComponent(requestData);
            $.ajax({
                async: false,
                url: "/Master/MSTAPI_CALL",
                type: 'POST',
                data: "request=" + requestData,
                success: function (d) {
                    debugger;
                    if (d != "" && d != null) {
                        rowdata = JSON.parse(d);
                        if (rowdata != null && rowdata != "") {
                            $$("grdMstState").clearAll();
                            $$("grdMstState").parse(rowdata);
                            $$("grdMstState").refresh();
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



function fnCallAddRow() {
    debugger;

    $$("grdMstState").add({ "STATE": "", "REGION": "" });
    $$("grdMstState").refresh();
    $$("grdMstState").refreshColumns();
};

function fnCallDelRow() {
    debugger;

        var SelRow = $$("grdMstState").getSelectedItem();
        var State_Id = SelRow.sr_id;
 
        var ddlCountry = $$("ddlcountry").getValue();
        debugger;
        var rowdata = [];
        if (ddlCountry != "") {
            try {
                Request = {
                    REQTYPE: "GET_MST_GRIDSTATEDELETE",
                    COUNTRY_ID: ddlCountry,
                    State_Id: State_Id,

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
                                var SelRow = $$("grdMstState").getSelectedId(false);
                                //$$("grdMstState").editStop();
                                //if (SelRow == undefined || SelRow == null) SelRow = $$("grdMstState").getLastId();
                                $$("grdMstState").remove(SelRow);
                                // $$("grdMstCity").remove(SelRow);
                                //SuccessMsg('Deleted Successfully');
                            }
                            if ($.trim(rowData) == "false") {
                                var SelRow = $$("grdMstState").getSelectedId(false);
                                //$$("grdMstState").editStop();
                                //if (SelRow == undefined || SelRow == null) SelRow = $$("grdMstState").getLastId();
                                $$("grdMstState").remove(SelRow);
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

function fnsave() {
    debugger;
    var bValid = fnValidation();
    if (bValid == true) {
        var ddlCountryId = $$("ddlcountry").getValue();
        var GridCountry = $$("grdMstState").serialize();
        try {
            Request = {
                REQTYPE: "GET_FNSAVESTATEMASTER",
                Country_Id: ddlCountryId,
                Country_Grid: GridCountry,
            }

            requestData = JSON.stringify(Request);
            requestData = encodeURIComponent(requestData);
            $.ajax({
                async: false,
                url: "/Master/MSTAPI_CALL",
                type: 'POST',
                data: "request=" + requestData,
                success: function (d) {
                    if (d != "") {
                        rowData = JSON.parse(d);
                        if ($.trim(rowData) == "True") {
                            SuccessMsg("Saved Successfully");
                            fnRefresh();
                          //  $$("grdMstState").refresh();
                            $("#LoadDIv").hide();
                            return;
                        }
                        
                        else {
                            AlertMessage("Operation failed");
                            fnRefresh();
                            $$("grdMstState").refresh();
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


}




function fnValidation() {
    debugger;

    if (($.trim($$("ddlcountry").getValue()) == "")) {
        AlertMessage("Country cannot be empty");
        return false;
    }

    var data = $$("grdMstState").serialize();

    $$("grdMstState").refresh();

    if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {

            if ($.trim(data[i].sr_id) == "") {

                for (f = 0; f < data.length; f++) {

                    if ($.trim(data[f].sr_nm) == "") {
                        AlertMessage("State cannot be empty");
                        return false;
                    }

                    else {

                        if ($.trim(data[i].sr_nm) == $.trim(data[f].sr_nm) && $.trim(data[f].sr_id) != "") {
                            AlertMessage("State already exists");
                            return false;
                        }

                    }
                }
            }
        }
    }

    else
    {
        if ((data.length == "0") || (data.length == null))
        {
            AlertMessage("No Record Found");
            return false;
        }

    }

    return true;
}



function fnRefresh() {
    debugger;
    $$("grdMstState").editStop();
    $$("grdMstState").refresh();
    //$$("grdMstState").clearAll();
    $$("ddlcountry").setValue("");
    $$("ddlcountry").disable();
    $$("btnAdd").disable();
    document.getElementById("SAVE").disabled = true;
}


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
