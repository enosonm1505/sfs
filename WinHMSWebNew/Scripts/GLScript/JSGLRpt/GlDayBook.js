
var app = angular.module('GLRApp', ['webix']);

app.controller("GLReportsController", function ($scope) {
    //debugger;

    $("#LoadDIv").hide();

    $scope.frmDayBook = {

        id: "frmDayBook",
        view: 'form',  
        position: "center",
        minWidth: 900,
        maxWidth: 5000,
        minHeight: 520,
        elements: [
            {
                cols: [
                    {
                        rows: [
                            {
                                cols: [
                                    {
                                        view: "richselect",
                                        id: "ddlOpt",
                                        width: 260, labelWidth: 60,
                                        label: "Options",
                                        //options: DropLoad("OptionLoad", 0, setDef),
                                        value: "C",
                                    },
                                    {
                                        view: "button",
                                        id: "imgFilter",
                                        width: 30,
                                        type: "icon",
                                        icon: 'fa fa-filter',
                                        click: function () {
                                            $$("frmFilter").show();
                                        },
                                    }
                                ]
                            },
                            {
                                cols: [
                                    {
                                        view: "richselect",
                                        id: "ddlVoucher",
                                        width: 260, labelWidth: 60,
                                        label: "Voucher",
                                        //options: DropLoad("VoucherLoad", 0, setDef),
                                        value: "All",
                                        on: {
                                            onAfterScroll: function () {

                                                //var url = "/GLTransaction/VoucherLoad";
                                                //var set = {
                                                //    "Load": "1",
                                                //};
                                                //scrollHandlerDrop(url, JSON.stringify(set), "ddlVoucher");
                                                //$$("ddlVoucher").refresh();
                                            },
                                        }
                                    },
                                    {
                                        rows: [
                                            {
                                                cols: [
                                                    {
                                                        view: "datepicker",
                                                        id: "dateFrm",
                                                        width: 155, labelWidth: 38,
                                                        label: "From",
                                                        //value: new Date(),
                                                        format: "%d/%m/%Y",
                                                    },
                                                     {
                                                         view: "datepicker",
                                                         id: "dateTo",
                                                         width: 140, labelWidth: 25,
                                                         label: "To",
                                                         //value: new Date(),
                                                         format: "%d/%m/%Y",
                                                     },
                                                     {
                                                         view: "button",
                                                         id: "imgPeriod",
                                                         width: 30,
                                                         type: "icon",
                                                         icon: 'fa fa-search',
                                                         click: function () {
                                                             $$("WFiscalPeriod").show();
                                                         },
                                                     },
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        view: "button",
                                        id: "btnDisplay",
                                        width: 100, labelWidth: 90,
                                        label: "Display",
                                        on: {
                                            'onItemClick': function () {
                                                //DisplayDataLoad();
                                            },
                                        }
                                    }
                                ],
                            },
                            {
                                cols: [{
                                    view: "richselect",
                                    id: "ddlDiv",
                                    width: 260, labelWidth: 60,
                                    label: "Division",
                                    //options: DropLoad("DivisionLoad", 0, setDef),
                                    hidden: true
                                }, {
                                    view: "checkbox",
                                    id: "chkDiv",
                                    width: 300, labelWidth: 80,
                                    label: "Print Div Id",
                                    hidden: true
                                }]
                            }
                        ]
                    },
                    {
                        view: "fieldset",
                        id: "fldSort", label: "Sort On",
                        body: {
                            rows: [{
                                cols: [{
                                    view: "radio", id: "chkSort", value: "D", width: 320, options: [{ id: "D", value: "Date" }, { id: "R", value: "Ref/Chq#" }, { id: "V", value: "Type/Voucher#" }],
                                }],

                            }]
                        }
                    }
                ]
            },
            {
                rows: [
                    {
                        view: "datatable",
                        id: "RevrslEntryGrd",
                        select: 'row',
                        minHeight: 500,
                        //maxHeight: 700,
                        editable: true,
                        //header: false,
                        spans: true,
                        scroll: "y",
                        columns: [
                            { id: "Date", header: "Date", width: 100 },
                            { id: "AcCode", header: "Acc Code", width: 100 },
                            { id: "LName", header: "Ledger Name", width: 200 },
                            { id: "Narration", header: "Narration", width: 300 },
                            { id: "VouchNo", header: "Voucher No", width: 120 },
                            { id: "VouchType", header: "Voucher Type", width: 120 },
                            { id: "RefNo", header: "Ref / chq No", width: 100 },
                            { id: "Dr", header: "Dr", width: 100, css: { 'text-align': 'right ! important' }, format: webix.Number.numToStr({ groupDelimiter: ",", groupSize: 3, decimalDelimiter: ".", decimalSize: 2 }) },
                            { id: "Cr", header: "Cr", width: 100, css: { 'text-align': 'right ! important' }, format: webix.Number.numToStr({ groupDelimiter: ",", groupSize: 3, decimalDelimiter: ".", decimalSize: 2 }) },
                            { id: "TrnId", hidden: true },
                            { id: "FsYr ", hidden: true },
                        ],
                        on: {
                            'onItemDblClick': function () {
                                Rpage = $("#Rpage").val();
                                if (Rpage == "1") {
                                    var dataItems = $$("RevrslEntryGrd").getSelectedItem();
                                    if (dataItems.TrnId != undefined && dataItems.TrnId != "" && dataItems.TrnId != null) {
                                        localStorage.clear();
                                        localStorage.setItem("TRN_IDD", dataItems.TrnId);
                                        localStorage.setItem("Date", dataItems.Date);
                                        localStorage.setItem("Narration", dataItems.Narration);
                                        localStorage.setItem("VouchNo", dataItems.VouchNo);
                                        localStorage.setItem("FsYr", dataItems.FsYr);
                                        localStorage.setItem("LAmt", dataItems.Dr);

                                        $("#TRN_IDD").val(dataItems.TrnId);
                                        $("#Date").val(dataItems.Date);
                                        $("#Narration").val(dataItems.Narration);
                                        $("#VouchNo").val(dataItems.VouchNo);

                                        //$.ajax({
                                        //    type: "POST",
                                        //    url: "/GLTransaction/OpenTransaction",
                                        //    cache: false,
                                        //    charset: 'utf-8',
                                        //    data: "ID=" + dataItems.TrnId,
                                        //    success: function (data) {
                                        //        Window1 = window.open("/GLTransaction/Transaction?Page=2", "PopupWindow", "width=1100,height=560,left=30,top=50");
                                        //        return true;
                                        //    }
                                        //});
                                    }
                                }
                            },
                            'onAfterScroll': function () {
                                var pos = this.getScrollState();

                                var url = "/GLTransaction/LoadReversalData";
                                var dateVouch = ""; var dateCFrm = ""; var dateCTo = "";
                                var dateFrm = dateFormat($$("dateFrm").getValue(), "mm/dd/yyyy");
                                var dateTo = dateFormat($$("dateTo").getValue(), "mm/dd/yyyy");
                                if ($$("dateVouch").getValue() != "" && $$("dateVouch").getValue() != null && $$("dateVouch").getValue() != undefined)
                                    dateVouch = dateFormat($$("dateVouch").getValue(), "mm/dd/yyyy");
                                if ($$("dateCFrm").getValue() != "" != "" && $$("dateCFrm").getValue() != null && $$("dateCFrm").getValue() != undefined)
                                    dateCFrm = dateFormat($$("dateCFrm").getValue(), "mm/dd/yyyy");
                                if ($$("dateCTo").getValue() != "" != "" && $$("dateCTo").getValue() != null && $$("dateCTo").getValue() != undefined)
                                    dateCTo = dateFormat($$("dateCTo").getValue(), "mm/dd/yyyy");

                                var set = {
                                    "FRDT": dateFrm,
                                    "TODT": dateTo,
                                    "OPTION": $$("ddlOpt").getValue(),
                                    "DIVISION": $$("ddlDiv").getValue(),
                                    "VOUCHERTYPE": $$("ddlVoucher").getValue(),
                                    //ddlGroup, dateCFrm dateCTo    
                                    "DATECFRM": dateCFrm,
                                    "DATECTO": dateCTo,
                                    "ORDERBY": $$("chkSort").getValue(),
                                    "TRN_ID": "",//$$("dateFrm").getValue(),
                                    "TRN_ID_SRNO": "",//$$("dateFrm").getValue(),
                                    "FVouchDate": dateVouch,
                                    "FTxtAmount": $$("txtAmt").getValue(),
                                    "FDebitAmount": $$("chkDrCr").getValue() == "1" ? "D" : "C",
                                    "FCredititAmount": $$("chkDrCr").getValue() == "1" ? "D" : "C",
                                    "FVouchFrom": $$("txtFromVouch").getValue(),
                                    "FVouchTo": $$("txtToVouch").getValue(),
                                    "FNarration": $$("txtNarr").getValue(),
                                    "Load": "1",//$$("dateFrm").getValue(),
                                };

                                scrollHandlerGrid(url, JSON.stringify(set), "RevrslEntryGrd");
                                $$("RevrslEntryGrd").refresh();
                            },
                            onAfterContextMenu: function (id, e, node) {
                                webix.delay(function () { this.select(id.row); }, this);
                            }
                        }
                    }
                ]
            }
        ]
    }


    //filter Form
    webix.ui({
        view: "window",
        id: "frmFilter",
        close: true,
        modal: true,
        head: "Search",
        position: "center",
        width: 600,
        body: {
            paddingX: 30,
            cols: [{
                rows: [{
                    view: "richselect",
                    id: "ddlGroup",
                    width: 300, labelWidth: 100,
                    label: "group",
                    options: [],
                    hidden: true,
                }, {
                    view: "search",
                    id: "srchLedger",
                    width: 300, labelWidth: 100,
                    label: "Ledger",
                    hidden: true,
                }, {
                    cols: [{
                        view: "datepicker",
                        id: "dateCFrm",
                        width: 220, labelWidth: 100,
                        label: "create Dt From",
                        format: "%d/%m/%Y",
                        //hidden: true,
                        //value: new Date(), format: "%d/%m/%Y",
                    }, {
                        view: "datepicker",
                        id: "dateCTo",
                        width: 150, labelWidth: 30,
                        label: "To",
                        format: "%d/%m/%Y",
                        //hidden: true,
                        //value: new Date(), format: "%d/%m/%Y",
                    }],
                },
                {
                    view: "datepicker",
                    id: "dateVouch",
                    width: 220, labelWidth: 100,
                    label: "Voucher Dt",
                    format: "%d/%m/%Y",
                },

                {
                    cols: [{
                        view: "text",
                        id: "txtAmt",
                        width: 220,
                        labelWidth: 100,
                        label: "Amount",
                    }, { view: "radio", id: "chkDrCr", value: "1", labelwidth: 30, options: [{ id: "1", value: "DR" }, { id: "2", value: "CR" }], }]

                }, {
                    cols: [{
                        view: "text",
                        id: "txtFromVouch",
                        width: 220, labelWidth: 100,
                        label: "Vouch No From",
                    }, {
                        view: "text",
                        id: "txtToVouch",
                        width: 150, labelWidth: 30,
                        label: "To",
                    }]
                }, {
                    view: "text",
                    id: "txtRefNo",
                    width: 300, labelWidth: 100,
                    label: "Chq/Ref No",
                    hidden: true,
                }, {
                    view: "text",
                    id: "txtNarr",
                    width: 300, labelWidth: 100,
                    label: "Narration",
                }, {
                    view: "button",
                    id: "btnFok",
                    width: 60, labelWidth: 80,
                    label: "ok",
                    align: "right",
                    on: {
                        'onItemClick': function () {
                            DisplayDataLoad();
                            $$("frmFilter").hide();
                        },
                    }
                }],
            }],
        },
    });
});
gridResize("1");

function CurrencyFormat()
{ return webix.Number.numTostr({ groupDelimiter: ",", groupSize: 3, decimalDelimiter: ".", decimalSize: 2 }) }


//webix.event(window, "resize", function () {
//    gridResize("1");
//})
//function gridResize(choice) {
//    var vheight = window.innerHeight
//           || document.documentElement.clientHeight
//           || document.body.clientHeight;
//    if (choice == "1") {
//        var offset = $("#frmDayBook").offset();


//        $$("frmDayBook").define("height", ((vheight - offset.top - 10)));
//        $$("frmDayBook").adjust();

//        $$("grdRoomStatus").define("height", ((vheight - offset.top - 40)));
//        $$("grdRoomStatus").adjust();
//    }

//    else if (choice == "2") {
//        var offset = $("#grdMnthRmPosition").offset();

//        $$("grdMnthRmPosition").define("height", ((vheight - offset.top - 10)));
//        $$("grdMnthRmPosition").adjust();

//        $$("RevrslEntryGrd").define("height", ((vheight - offset.top - 40)));
//        $$("RevrslEntryGrd").adjust();
//    }

//    else if (choice == "3") {
//        var offset = $("#grdInHouseGst").offset();

//        $$("grdInHouseGst").define("height", ((vheight - offset.top - 50)));
//        $$("grdInHouseGst").adjust();

//        $$("grdInHouseGst").define("height", ((vheight - offset.top - 30)));
//        $$("grdInHouseGst").adjust();
//    }

//    else if (choice == "4") {
//        var offset = $("#grdExpArrial").offset();

//        $$("grdExpArrial").define("height", ((vheight - offset.top - 50)));
//        $$("grdExpArrial").adjust();

//        $$("grdExpArrial").define("height", ((vheight - offset.top - 30)));
//        $$("grdExpArrial").adjust();
//    }

//    else if (choice == "5") {
//        var offset = $("#grdExpDepart").offset();

//        $$("grdExpDepart").define("height", ((vheight - offset.top - 50)));
//        $$("grdExpDepart").adjust();

//        $$("grdExpDepart").define("height", ((vheight - offset.top - 30)));
//        $$("grdExpDepart").adjust();
//    }

//}


//webix.event(window, "resize", function () {
//    gridResize("1");
//})
//function gridResize(choice) {
//    debugger;
//    var vWidth = $("#divform").width();
//    $$("frmDayBook").define("width", vWidth);
//    $$("frmDayBook").resize();
//    var vheight = window.innerHeight
//           || document.documentElement.clientHeight
//           || document.body.clientHeight;


//    $$("frmDayBook").define("height", vheight - 100);
//    $$("frmDayBook").resize();
//    var vWidth = $("#divform").width();
//    $$("frmDayBook").define("width", vWidth);
//    $$("frmDayBook").resize();
//    if (choice == "1") {
//        var offsetTop = $$("RevrslEntryGrd").getNode().offsetTop;


//        $$("RevrslEntryGrd").define("height", ((vheight - offsetTop - 160)));
//        $$("RevrslEntryGrd").adjust();
//    }





//}
