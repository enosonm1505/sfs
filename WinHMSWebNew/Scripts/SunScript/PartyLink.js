var app = angular.module('GPApp', ['webix']);

app.controller("GPController", function ($scope) {
    debugger;
    webix.editors.myeditor = webix.extend({
        render: function () {
            return webix.html.create("div", {
                "class": "webix_dt_editor"
            }, "<input type='text'  maxlength='10'/>");
        }
    }, webix.editors.text);

    var dataProp = ddlPropertyLoadFn();

    $scope.ddlProperty = {
        view: "combo",
        id: "ddlProperty",
        value: "WS",
        label: "Property",
        disabled: false,
        options: dataProp,
        labelwidth: 130,
        on: {
            onChange: function (newval, oldval) {
                var rowData = fnpartyTy($$("chkAcRecvable").getValue());
                $$("ddlpartyTy").define("options", rowData);
                $$("ddlpartyTy").setValue("");
                $$("grdPartyId").clearAll();
            }
        }
    };



    var PartyTy = fnpartyTy("1");

    $scope.DivForm = {
        view: 'form',
        minWidth: 900,
        MinHeight: 700,
        id: 'DivForm',
      
        elements: [
            {
                rows: [
                    { cols: [{
                               
                        view: "combo",
                        id: "ddlpartyTy",
                        value: "0",
                        label: "Party Type",
                        disabled: false,
                        labelwidth: 130,
                        inputWidth: 300,
                        options: PartyTy,
                        on: {
                            onchange: function () {
                                fnLoadGridvalues($$("chkAcRecvable").getValue());
                            }
                        }
                    },
                    
                    {
                        view: "button",
                        id: "AllPartySearch",
                        label: "",
                        width: 30,
                        height: 30,
                        type: 'icon',
                        icon: 'wxi-search',
                        on: {
                            onItemClick: function () {
                                LoadPartPopup();
                            }
                        }
                    },
                    {
                        view: "checkbox",
                        id: "chkAcRecvable",
                        label: "Ac Receivable",
                        labelWidth: 100,
                        minWidth: 170,
                        value: 1,
                        on: {
                            "onChange": function () {
                                var rowData = fnpartyTy($$("chkAcRecvable").getValue());
                                $$("ddlpartyTy").define("options", rowData);
                                $$("ddlpartyTy").setValue("");
                                $$("grdPartyId").clearAll();
                            }
                        }
                    },
                    ]
                        
                    },
                    {
                        view: "treetable",
                        id: "grdPartyId",
                        select: "row",
                        data: [],
                        height: 475,
                        width: 500,
                        editable :true,
                        columns: [
                          
                          { header: "Party Id", id: "PARTY_ID", width: 100, css: { 'text-align': 'left ! important' } },
                          { header: "Party Name", id: "PARTY_NM", width: 400, css: { 'text-align': 'Center ! important' } },
                          { header: "Account Code", id: "MFF_GL_CD", width: 200, css: { 'text-align': 'left ! important' }, editor: 'myeditor', liveEdit: true, },
                          { header: "Settlement", id: "IxSet", width: 170, css: { 'text-align': 'left ! important' } },
                          
                        ],
                        ready: function () {
                            this.openAll();
                        }
                    }

                   
                ]
            }
        ]
    }

    
});

function LoadPartPopup() {
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Party Search",
        id: 'Partypopup',
        modal: true,
        width: 500,
        close: true,
        body: {

            rows: [
               {
                   id: "PartyGrid",
                   select: 'row',
                   view: "datatable",
                   columns: [
                           { header: "Party Id", id: "PARTY_ID", width: 100, css: { 'text-align': 'left ! important' } },
                          { header: "Party Name", id: "PARTY_NM", width: 400, css: { 'text-align': 'Center ! important' } },
                          { header: "", id: "MFF_GL_CD", width: 100, css: { 'text-align': 'left ! important' } ,hidden:true},
                   ],
                   scroll: "y",
                   height: 300,
                   data: [],
                   on: {
                       'onItemDblClick': function (id) {
                           
                           var itemval = $$("PartyGrid").getSelectedItem()
                           $$("grdPartyId").clearAll();
                           var addrow = {
                               PARTY_ID: itemval.PARTY_ID, PARTY_NM: itemval.PARTY_NM, MFF_GL_CD: itemval.MFF_GL_CD,
                           };
                           $$("grdPartyId").add(addrow);
                           $$("grdPartyId").refresh();
                           $$("Partypopup").hide();
                       }
                   }

               },
               {
                   view: 'form',
                   elements: [
                       {
                           cols: [
                               {
                                   view: 'label',
                                   label: ' ',
                                   name: 'label1',
                                   id: 'label1',
                                   labelWidth: 100,
                               },
                               {
                                   cols: [
                                       {
                                           view: 'button',
                                           type: "icon",
                                           icon: "wxi-file",
                                           label: 'Ok',
                                           minWidth: 100,
                                           align: "right",
                                           on: {
                                               onItemClick: function () {
                                                  $$("Partypopup").hide();
                                               }
                                           }
                                       },
                                       {
                                           view: 'button',
                                           type: "icon",
                                           icon: "wxi-close",
                                           label: 'Cancel',
                                           minWidth: 100,

                                           align: "right",
                                           on: {
                                               onItemClick: function () {
                                                   $$("Partypopup").hide();
                                               }
                                           }
                                       }
                                   ]
                               }
                           ]
                       }
                   ]
               }
            ]
        }
    }).show();
    LoadPartySrch("SRH");
}

function LoadPartySrch(Mode)
{
    var dataparam = {};

    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_LOADPARTYSEARCH";
    dataparam["PARTY_TY_ID"] = $$("ddlpartyTy").getValue();
    dataparam["ACREV"] = $$("chkAcRecvable").getValue();
    dataparam["Mode"] = $("#hdnMode").val().toUpperCase().trim();// Mode;
    

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            rowData = JSON.parse(d);
            $$("PartyGrid").clearAll();
            $$("PartyGrid").parse(rowData);
            $$("PartyGrid").refresh();
        },
    });
}

function fnpartyTy(AcReceivable) {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PARTYID";
    dataparam["ACREV"] = AcReceivable;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
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

function fnLoadGridvalues(AcReceivable)
{
    if ($$("ddlpartyTy").getValue() != "") {
        var dataparam = {};
        dataparam["COMPID"] = $$("ddlProperty").getValue();
        dataparam["REQTYPE"] = "GET_LOADPARTYSEARCH";
        dataparam["PARTY_TY_ID"] = $$("ddlpartyTy").getValue();
        dataparam["Mode"] = $("#hdnMode").val();
        dataparam["ACREV"] = AcReceivable;
        if ($("#hdnMode").val().toUpperCase().trim() == "NEW") {
            var DataVal = JSON.stringify(dataparam);
            $.ajax({
                async: false,
                url: "/SUN_MST/API_CALL",
                type: 'POST',
                data: "request=" + DataVal,
                success: function (d) {
                    $$("grdPartyId").clearAll();
                    if (d != "") {
                        rowData = JSON.parse(d);

                        $$("grdPartyId").parse(rowData);
                        if ($("#hdnMode").val().toUpperCase().trim() == "NEW")
                            $$("grdPartyId").showColumn("IxSet");
                        else
                            $$("grdPartyId").hideColumn("IxSet");
                        $$("grdPartyId").refresh();
                    }
                },
            });
        }
    }
}

function fnclear()
{
    $$("grdPartyId").clearAll();
    $$("grdPartyId").refresh();
    $$("ddlpartyTy").setValue("");
}

function fnpartTyLinkSave()
{
    var dataparam = {};

    var grdPartyId = $$("grdPartyId").serialize();
    var GrdLen = grdPartyId.length;

    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_PARTYLINKSAVE";
    dataparam["PARTY_TY_ID"] = $$("ddlpartyTy").getValue();
    dataparam["Mode"] = $("#hdnMode").val();
    dataparam["GRDPARTYLINK"] = grdPartyId;
    dataparam["ACREV"] = $$("chkAcRecvable").getValue();
    
    var request = JSON.stringify(dataparam);
    var DataVal = encodeURIComponent(request);

    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            rowData = JSON.parse(d);
            if (rowData == "True") {
                if ($("#hdnMode").val() == "New")
                    alert("Saved Successfully");
                else if ($("#hdnMode").val() == "Open")
                    alert("Updated Successfully");

                $$("grdPartyId").clearAll();
                $$("ddlpartyTy").setValue("");
                
            }

        },
    });
}

function ddlPropertyLoadFn() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "ddlPropertyLoadFn";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "")
                rowData = JSON.parse(d);
        },
    });
    return rowData;
}
