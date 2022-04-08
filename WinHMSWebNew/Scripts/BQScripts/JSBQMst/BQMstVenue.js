var app = angular.module('BQTApp', ['webix']);
var Type = [
       { "id": "P", "value": "Individual" },
       { "id": "B", "value": "Combined" }];

app.controller("BQMasterController", function ($scope) {
    $("#LoadDIv").hide();
    fnGetX2_IND();
    $scope.frmMstVenu = {
        id: "frmMstVenu",
        view: 'form',
        minWidth: 1250,
        height: 520,
        scroll: true,
        elements: [
            {
                paddingX: 20,
                rows: [
                   {
                       cols: [
                           {
                               cols: [
                                   {

                                       view: "text",
                                       id: "txtVenuID",
                                       label: "Venue ID",
                                       labelAlign: "Left",
                                       labelWidth: 180,
                                       inputWidth: 350,
                                       width: 350,
                                       minWidth:350,
                                       attributes: { maxlength: 2 },
                                       on: {

                                       }
                                   },
                                   {
                                       view: "button",
                                       id: 'btnGroupSrch',
                                       minWidth: 10,
                                       labelWidth: 10,
                                       width: 30,
                                       height: 28,
                                       type: 'icon',
                                       icon: 'wxi-search',
                                       css: "Ar_search",
                                       hidden: true,
                                       on: {
                                           onItemClick: function () {
                                               fnCallVenuGrpSrchPopup();
                                           }
                                       }
                                   },

                                   { 
                                       view: "checkbox",
                                       id: "chkActive",
                                       label: "Active",
                                       labelAlign: "Right",
                                       labelWidth: 200,
                                       inputWidth: 230,
                                       width: 230,
                                       minWidth: 230,
                                   }]
                           }]
                   },
                    {
                        cols: [{
                            view: "text",
                            id: "txtVenuName",
                            label: "Venue Name",
                            labelAlign: "Left",
                            labelWidth: 180,
                            inputWidth: 350,
                            width: 350,
                            minWidth: 350,
                            attributes: { maxlength: 30 },
                            on: {
                                onChange: function (newval, oldval) {
                                }
                            }
                        },
                        {
                            view: "label",
                            id: "LblHdn",
                            minWidth: 10,
                            labelWidth: 10,
                            width: 30,
                            height: 28,
                            hidden:true,
                        },
                        {

                            view: "checkbox",
                            id: "chkConsider",
                            label: "Consider as Rooms",
                            labelAlign: "Right",
                            labelWidth: 200,
                            inputWidth: 230,
                            width: 230,
                            minWidth: 230,
                        }, {
                            view: "label",
                            //id: "SquareFeet",
                            label: "(Won't to displayed in chart)",
                            labelAlign: "left",
                            labelWidth: 30,
                            inputWidth: 200,
                            width: 200,
                            minWidth: 200,

                        }, ]
                    },
                     {
                         cols: [{
                             view: "richselect",
                             id: "ddlVenuType",
                             label: "Venue Type",
                             labelAlign: "Left",
                             labelWidth: 180,
                             inputWidth: 350,
                             minWidth: 400,
                             width: 400,
                             options: Type,
                             value: "",
                             on: {
                                 onChange: function (newval, oldval) {
                                     if ($.trim(newval) == "B") {
                                         $$("ddlPartOf").show();
                                         $$("txtDisplaySeqNo").disable();
                                     }
                                     else {
                                         $$("ddlPartOf").hide();
                                         $$("txtDisplaySeqNo").enable();
                                     }
                                 }
                             }

                         }, {
                             view: "richselect",
                             id: "ddlPartOf",
                             label: "Part Of",
                             labelAlign: "left",
                             labelWidth: 50,
                             inputWidth: 200,
                             width: 500,
                             minWidth: 500,
                             hidden: true,
                            

                             on: {
                                 onChange: function (newval, oldval) {

                                 }
                             }
                         }, ]
                     },
                     {
                         view: "richselect",
                         id: "ddlVenuGroup",
                         label: "Venue Group",
                         labelAlign: "Left",
                         labelWidth: 180,
                         inputWidth: 350,
                         width: 400,
                         minWidth: 350,
                         on: {
                             onChange: function (newval, oldval) {
                             }
                         }
                     },
                     {

                         view: "text",
                         id: "txtDisplaySeqNo",
                         label: "Display Seq No",
                         labelAlign: "Left",
                         labelWidth: 180,
                         inputWidth: 350,
                         width: 450,
                         minWidth: 350,
                         attributes: { maxlength: 2 },
                         pattern: { mask: "##", allow: /[0-9]/g },
                     },

                     {
                         cols: [
                         {
                             view: "text",
                             id: "txtArea",
                             label: "Area",
                             labelAlign: "Left",
                             labelWidth: 180,
                             inputWidth: 350,
                             width: 350,
                             minWidth: 350,
                             pattern: { mask: "########", allow: /[0-9]/g },

                         }, {
                             view: "label",
                             id: "SquareFeet",
                             label: "SquareFeet",
                             labelAlign: "left",
                             labelWidth: 20,
                             inputWidth: 150,
                             width: 250,
                             pattern: { mask: "####", allow: /[0-9]/g },
                         }, ]
                     },
                     {
                         cols: [
                        {
                            view: "text",
                            id: "txtLength",
                            label: "Length",
                            labelAlign: "Left",
                            labelWidth: 180,
                            inputWidth: 350,
                            width: 350,
                            minWidth: 350,
                            attributes: { maxlength: 12 },
                            pattern: { mask: "############", allow: /[0-9]/g },

                        },
                        {
                            view: "text",
                            id: "txtWith",
                            label: "Width",
                            labelAlign: "Left",
                            labelWidth: 50,
                            inputWidth: 200,
                            width: 200,
                            minWidth: 350,
                            attributes: { maxlength: 12 },
                            pattern: { mask: "############", allow: /[0-9]/g },
                        },
                            {
                                view: "text",
                                id: "txtHeight",
                                label: "Height",
                                labelAlign: "Left",
                                labelWidth: 50,
                                inputWidth: 200,
                                width: 200,
                                minWidth: 350,
                                attributes: { maxlength: 12 },
                                pattern: { mask: "############", allow: /[0-9]/g },
                            },
                            {
                                view: "label",
                                id: "FEET",
                                label: "FEET",
                                labelAlign: "Right",
                                labelWidth: 20,
                                inputWidth: 50,
                                width: 70,
                            }
                         ]
                     },
                     {
                         view: "text",
                         id: "txtDefaul",
                         label: "Default Venue Rate",
                         labelAlign: "Left",
                         labelWidth: 180,
                         inputWidth: 350,
                         width: 450,
                         minWidth: 350,
                         format: "111111111.00",
                         attributes: { maxlength: 9 },
                         pattern: { mask: "#########", allow: /[0-9]/g },
                     },
                {
                    cols: [
                        {
                            view: "text",
                            id: "txtVenuMax",
                            label: "Venue Max Capacity",
                            labelAlign: "Left",
                            labelWidth: 180,
                            inputWidth: 350,
                            width: 350,
                            minWidth: 350,
                            pattern: { mask: "######", allow: /[0-9]/g },
                        },

                    {
                        view: "text",
                        id: "txtMinimum",
                        label: "Minimum Capacity",
                        labelAlign: "Left",
                        labelWidth: 120,
                        inputWidth: 200,
                        width: 200,
                        minWidth: 200,
                        pattern: { mask: "######", allow: /[0-9]/g },
                    },
                    ]
                },
                {
                    view: "text",
                    id: "txtMaxFunction",
                    label: "Max Function per Day",
                    labelAlign: "Left",
                    labelWidth: 180,
                    inputWidth: 300,
                    width: 450,
                    minWidth: 450,
                    pattern: { mask: "##", allow: /[0-9]/g },
                },
                 {
                     view: "text",
                     id: "txtVenuDescrpition",
                     label: "Venue Descrpition",
                     labelAlign: "Left",
                     labelWidth: 180,
                     inputWidth: 550,
                     width: 550,
                     minWidth: 550,
                     attributes: { maxlength: 100 },
                 },


                {
                    cols: [{

                        id: "rbtnRpts",
                        view: "",
                        label: "",
                        labelWidth: 180,
                        inputWidth: 180,
                        width: 180,


                    }, {
                        view: "text",
                        label: "",
                        id: "txtVenuDescrpition2",
                        labelAlign: "Left",
                        labelWidth: 180,
                        inputWidth: 370,
                        width: 550,
                        minWidth: 550,
                        attributes: { maxlength: 100 },
                    }, ]
                },

                  {
                      cols: [{

                          id: "rbtnRpts",
                          view: "",
                          label: "",
                          labelWidth: 180,
                          inputWidth: 180,
                          width: 180,
                          minWidth: 180,
                          labelAlign: "Left",
                      }, {
                          view: "text",
                          id: "txtVenuDescrpition3",
                          labelAlign: "Left",
                          labelWidth: 180,
                          inputWidth: 370,
                          width: 550,
                          minWidth: 550,
                          attributes: { maxlength: 100 },
                      }, ]
                  },


                  //{
                  //    view: "label",
                  //    id: "txtPictures",
                  //    label: "Pictures",
                  //    labelAlign: "Right",
                  //    labelWidth: 220,
                  //    inputWidth: 450,
                  //    width: 550,
                  //},
                  //{

                  //    view: 'form',
                  //   // width: 100,
                  //    minWidth: 100,
                  //    height: 150,
                  //    labelAlign: "Right",
                  //    elements: [
                  //        {
                  //            paddingX: 10,
                  //            rows: [
                  //               {
                  //                   cols: [
                  //                      {
                  //                          view: "uploader",
                  //                          id: "txtuploader",
                  //                          label: "Pictures",
                  //                          labelAlign: "Right",
                  //                          labelWidth: 120,
                  //                          inputWidth: 150,
                  //                          width: 300,
                  //                      },
                  //                       {
                  //                           view: "uploader",
                  //                           id: "txtuploader2",
                  //                           label: "Pictures2",
                  //                           labelAlign: "Right",
                  //                           labelWidth: 120,
                  //                           inputWidth: 150,
                  //                           width: 300,
                  //                       },
                  //                       {
                  //                           view: "uploader",
                  //                           id: "txtuploader3",
                  //                           label: "Pictures3",
                  //                           labelAlign: "Right",
                  //                           names: "files",
                  //                           link:"mylist",
                  //                           labelWidth: 120,
                  //                           inputWidth: 150,
                  //                           width: 300,
                  //                       },

                  //                       {
                  //                           view: "button",
                  //                           id: "btn",
                  //                           label: "Save",
                  //                           labelAlign: "Right",
                  //                           labelWidth: 120,
                  //                           inputWidth: 50,
                  //                           width: 550,
                  //                       },
                  //                   ]
                  //               }, ]
                  //        },
                  //    ]
                  //},
                  {
                      view: "checkbox",
                      id: "chkoutdoor",
                      label: "Outdoor Catering Applicable",
                      labelAlign: "Left",
                      inputWidth: 330,
                      width: 500,
                      labelWidth: 180,
                      minWidth: 500,
                  },
                ]
            }
        ]
    }
});

function fnDisable() {
    $$("txtVenuID").disable();
    $$("chkActive").disable();
    $$("txtVenuName").disable();
    $$("chkConsider").disable();
    $$("ddlVenuType").disable()
    $$("ddlVenuGroup").disable();
    $$("txtDisplaySeqNo").disable();
    $$("txtArea").disable();
    $$("txtWith").disable();
    $$("txtLength").disable();
    $$("txtHeight").disable();
    $$("txtDefaul").disable();
    $$("txtLength").disable();
    $$("txtVenuMax").disable();
    $$("txtMinimum").disable()
    $$("txtMaxFunction").disable();
    $$("txtMaxFunction").disable();
    $$("txtVenuDescrpition").disable();
    $$("txtVenuDescrpition2").disable();
    $$("txtVenuDescrpition3").disable();
    $$("chkoutdoor").disable();
    $$("SquareFeet").disable();
    $$("FEET").disable();
    $$("ddlPartOf").disable();
}

function fnEnable() {
    $$("txtVenuID").enable();
    $$("chkActive").enable();
    $$("txtVenuName").enable();
    $$("chkConsider").enable();
    $$("ddlVenuType").enable()
    $$("ddlVenuGroup").enable();
    $$("txtDisplaySeqNo").enable();
    $$("txtArea").enable();
    $$("txtWith").enable();
    $$("txtLength").enable();
    $$("txtHeight").enable();
    $$("txtDefaul").enable();
    $$("txtLength").enable();
    $$("txtVenuMax").enable();
    $$("txtMinimum").enable()
    $$("txtMaxFunction").enable();
    $$("txtMaxFunction").enable();
    $$("txtVenuDescrpition").enable();
    $$("txtVenuDescrpition2").enable();
    $$("txtVenuDescrpition3").enable();
    $$("chkoutdoor").enable();
    $$("SquareFeet").enable();
    $$("FEET").enable();
    $$("ddlPartOf").enable();
}

function ClearDatas() {
    $$("ddlVenuType").setValue("P");
}


function ClearData() {
    debugger;
    $$("txtVenuID").setValue("");
    $$("chkActive").setValue("");
    $$("txtVenuName").setValue("");
    $$("chkConsider").setValue("");
    $$("ddlVenuType").setValue("");
    $$("ddlVenuGroup").setValue("");
    $$("txtDisplaySeqNo").setValue("");
    $$("txtArea").setValue("");
    $$("txtWith").setValue("");
    $$("txtLength").setValue("");
    $$("txtHeight").setValue("");
    $$("txtDefaul").setValue("");
    $$("txtLength").setValue("");
    $$("txtVenuMax").setValue("");
    $$("txtMinimum").setValue("");
    $$("txtMaxFunction").setValue("");
    $$("txtVenuDescrpition").setValue("");
    $$("txtVenuDescrpition2").setValue("");
    $$("txtVenuDescrpition3").setValue("");
    $$("chkoutdoor").setValue("");

}

function fnBanquetSaveVenu() {
    debugger;
    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_BQVENUE";
    dataparam["PROGNAME"] = "GET_MST_BANQUET_VENUE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();
    dataparam["txtVenuID"] = $.trim($$("txtVenuID").getValue());
    dataparam["chkActive"] = $.trim($$("chkActive").getValue());
    dataparam["txtVenuName"] = $.trim($$("txtVenuName").getValue());
    dataparam["chkConsider"] = $.trim($$("chkConsider").getValue());
    dataparam["ddlVenuType"] = $.trim($$("ddlVenuType").getValue());
    dataparam["ddlVenuGroup"] = $.trim($$("ddlVenuGroup").getValue());
    dataparam["txtDisplaySeqNo"] = $.trim($$("txtDisplaySeqNo").getValue());
    dataparam["txtArea"] = $.trim($$("txtArea").getValue());
    dataparam["txtLength"] = $.trim($$("txtLength").getValue());
    dataparam["txtWith"] = $.trim($$("txtWith").getValue());
    dataparam["txtHeight"] = $.trim($$("txtHeight").getValue());
    dataparam["txtDefaul"] = $.trim($$("txtDefaul").getValue());
    dataparam["txtVenuMax"] = $.trim($$("txtVenuMax").getValue());
    dataparam["txtMinimum"] = $.trim($$("txtMinimum").getValue());
    dataparam["txtMaxFunction"] = $.trim($$("txtMaxFunction").getValue());
    dataparam["txtVenuDescrpition"] = $.trim($$("txtVenuDescrpition").getValue());
    dataparam["txtVenuDescrpition2"] = $.trim($$("txtVenuDescrpition2").getValue());
    dataparam["txtVenuDescrpition3"] = $.trim($$("txtVenuDescrpition3").getValue());
    dataparam["chkoutdoor"] = $.trim($$("chkoutdoor").getValue());
    dataparam["ddlPartOf"] = $.trim($$("ddlPartOf").getValue());
    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/BQMaster/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                rowData = JSON.parse(objRes);
                if ($.trim(rowData) == "True") {

                    if ($("#hdnCurMode").val() == "N") {
                        AlertMessage("created Successfully");
                        $("#btnRef").click();
                    }
                    else {
                        AlertMessage("Updated Successfully");
                        $("#btnRef").click();
                    }

                    $("#LoadDIv").hide();
                    return;
                }
                else if ($.trim(rowData) == "false") {
                    AlertMessage("Save Failed");
                    $("#LoadDIv").hide();
                    return;
                }
                else {
                    AlertMessage($.trim(rowData));
                    $("#LoadDIv").hide();
                    return;
                }

            }

        },
    });
}

function fnBQValidate() {
    debugger;
    if ($("#hdnCurMode").val() == "N") {

        if ($.trim($$("txtVenuID").getValue()) == "") {
            AlertMessage("Venue ID cannot be empty !");
            return false;
        }
    }

    if ($.trim($$("txtVenuName").getValue()) == "") {
        AlertMessage("Venue Name cannot be empty !");
        return false;
    }
    if ($.trim($$("txtArea").getValue()) == "" && $("#hdnX2IND").val() == "1") {
        AlertMessage("Area cannot be empty !");
        return false;
    }

    var Dataset = fnVenuOpen();
    debugger;
    if ($("#hdnCurMode").val() == "N") {
        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.VENUE_ID) == $.trim($$("txtVenuID").getValue());
        });

        if (Filter3.length > 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }
    }

    return true;
}

function fnVenuOpen() {
    debugger;
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_VENUOPEN";
    dataparam["PROGNAME"] = "GET_MST_BANQUET_VENUE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var rowData = [];
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
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

function fnVenGroupLoad() {
    debugger;
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_VENUGROUPLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var rowData = [];
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("ddlVenuGroup").define("options", rowData);
                //($$("ddlVenuGroup").setValue(rowData[0].id));
            }
        }
    });
    return rowData;
}

function fnLoadVenuGroup() {

    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_VENUGROUPLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
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

function fnLoadVenuGroupPart() {

    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_BNVENUE";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("ddlPartOf").define("options", rowData);
                //($$("ddlPartOf").setValue(rowData[0].id));
            }
        }
    });

    return rowData;
}

function fnGetX2_IND() {
    debugger;
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BNCONTROL";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var rowData = [];
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnX2IND").val($.trim(rowData[0].X2_IND));
                //($$("ddlVenuGroup").setValue(rowData[0].id));
            }
        }
    });
}

function fnCallVenuGrpSrchPopup() {
    var Dataset = fnVenuOpen();
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "btnGroupSrch1",
        head: "Venu  Group Name Search",
        position: "center",
        minWidth: 300,
        maxWidth: 300,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,
        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            elements: [
                {
                    view: "datatable",
                    id: "grdSrch",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "VenuGroup id", id: "VENUE_ID", hidden: true, },
                            { header: ["VenuGroup Name", { content: "textFilter" }, ], id: "VENUE_NM", width: 260, StringResult: true, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            debugger;

                            var selectedRows = this.getSelectedItem(id.row);

                            var Filter1 = Dataset.filter(function (Dataset) {
                                return $.trim(Dataset.VENUE_ID) == $.trim(selectedRows[0].VENUE_ID);
                            });
                            if (Filter1.length > 0) {
                                $$("txtVenuID").setValue($.trim(Filter1[0].VENUE_ID));
                                $$("txtVenuName").setValue($.trim(Filter1[0].VENUE_NM));
                                $$("chkConsider").setValue($.trim(Filter1[0].E_IND));

                              
                                $$("ddlVenuType").setValue($.trim(Filter1[0].C_IND));
                               // if (Filter1[0]["C_IND"] == '1')
                                if (Filter1[0]["C_IND"] == null)
                                {
                                    $$("ddlVenuType").setValue("P");
                                }
                                // if (Filter1[0]["C_IND"] == null)
                                //{
                                //    $$("ddlVenuType").setValue("P");

                                //}
                            
                                else if (Filter1[0]["C_IND"] == '2')
                                {
                                $$("ddlVenuType").setValue("B");
                              }
                        
                                $$("ddlPartOf").setValue($.trim(Filter1[0].SV_ID));
                                $$("ddlVenuGroup").setValue($.trim(Filter1[0].A_ID));
                                $$("txtDisplaySeqNo").setValue($.trim(Filter1[0].S_NO));
                                $$("txtArea").setValue(Filter1[0].S_A);
                                $$("txtWith").setValue(Filter1[0].VEN_WI);
                                $$("txtLength").setValue(Filter1[0].VEN_LEN);
                                $$("txtHeight").setValue(Filter1[0].VEN_HT);
                                $$("txtDefaul").setValue(Filter1[0].V_AMT);
                                $$("txtVenuMax").setValue(Filter1[0].H_C);
                                $$("txtMinimum").setValue(Filter1[0].L_C);
                                $$("txtMaxFunction").setValue(Filter1[0].M_F);
                                $$("txtVenuDescrpition").setValue(Filter1[0].DESC1);
                                $$("txtVenuDescrpition2").setValue(Filter1[0].DESC2);
                                $$("txtVenuDescrpition3").setValue(Filter1[0].DESC3);
                                $$("chkoutdoor").setValue(Filter1[0].D_IND);
                               // $$("chkActive").setValue(Filter1[0].B_IND);

                                var chkActive = (Filter1[0].B_IND == null || ($.trim(Filter1[0].B_IND) == "0") == true ? "1" : "0");
                                $$("chkActive").setValue(chkActive);
                                
                            }
                            $$('btnGroupSrch1').hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 350,
                             paddingX: 200,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('btnGroupSrch1').hide();
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
    $$("btnGroupSrch1").show();
    $$("grdSrch").clearAll();
    $$("grdSrch").parse(Dataset);
    $$("grdSrch").refresh();
}


