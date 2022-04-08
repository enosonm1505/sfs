var app = angular.module('BQTApp', ['webix']);

app.controller("BQAnalysisController", function ($scope) {

    $("#LoadDIv").hide();
    fnAccountDt();
    fnLoadBNControl();

    var FromDt1 = $("#hdnCurrentDt").val().split("/");

    var FromDt = FromDt1[0] + "/" + FromDt1[1] + "/01";

    var fnLoad = prcLoadDrops();

    var GrpData = fnLoadGrpdata();

    var Set1 = fnLoad.TBLMARK;

    $scope.frmBQContribute = {

        id: "frmBQContribute",
        view: 'form',
        minWidth: 900,
        height: 95,
        elements: [
            {
                rows: [
                    {
                        cols: [
                            {
                                id: "rbtnRpt",
                                view: "radio",
                                label: "",
                                value: "R",
                                vertical: false,
                                width: 330,
                                minWidth: 330,
                                height: 30,
                                options: [
                                    { "id": "R", "value": "Reservation" },
                                    { "id": "D", "value": "Date wise" },
                                    { "id": "S", "value": "Summary" }
                                ],
                                on: {
                                    onChange: function (newval, oldval) {
                                        if ($$("grdContribute")) {
                                            $$("grdContribute").clearAll();
                                            $$("grdContribute").refresh();
                                        }
                                    }
                                }
                            },
                            {
                                view: "datepicker",
                                id: "txtFrmDate",
                                stringResult: true,
                                label: "From",
                                format: "%d/%m/%Y",
                                value: FromDt,
                                inputWidth: 165,
                                labelWidth: 40,
                                width: 200,
                                minWidth: 200,
                            },
                            {
                                view: "datepicker",
                                id: "txtToDt",
                                stringResult: true,
                                label: "To",
                                format: "%d/%m/%Y",
                                value: $("#hdnCurrentDt").val(),
                                inputWidth: 140,
                                labelWidth: 25,
                                width: 160,
                                minWidth: 160,
                            },
                            {
                                view: "button",
                                id: 'btnDisplay',
                                label: "Display",
                                width: 100,
                                minWidth: 100,
                                on: {
                                    onItemClick: function () {
                                        fnLoadContributeDisp();
                                    }
                                }
                            },
                            {
                                width: 35,
                                minWidth: 35,
                            },
                            {
                                view: "richselect",
                                id: "ddlGrouBy",
                                label: "Group By",
                                labelAlign: "Left",
                                labelWidth: 60,
                                inputWidth: 250,
                                width: 250,
                                minWidth: 250,
                                options: GrpData,
                                value: "M",
                                on: {
                                    onChange: function (newval, oldval) {
                                        if ($$("grdContribute")) {
                                            $$("grdContribute").clearAll();
                                            $$("grdContribute").refresh();
                                        }
                                        var Tbldata = [];

                                        if ($$("ddlGrouBy").getValue() == "M") {
                                            $$("ddlFilter").define("label", "Market Segment");
                                            Tbldata = fnLoad.TBLMARK;
                                        }
                                        else if ($$("ddlGrouBy").getValue() == "BK") {
                                            $$("ddlFilter").define("label", "Booker");
                                            Tbldata = fnLoad.TBLBOOKER;
                                        }
                                        else if ($$("ddlGrouBy").getValue() == "CM") {
                                            $$("ddlFilter").define("label", "Company");
                                            Tbldata = fnLoad.TBLCPM;
                                        }
                                        else if ($$("ddlGrouBy").getValue() == "S") {
                                            $$("ddlFilter").define("label", "Sales Person");
                                            Tbldata = fnLoad.TBLSALES;
                                        }
                                        else if ($$("ddlGrouBy").getValue() == "B") {
                                            $$("ddlFilter").define("label", "Business Source");
                                            Tbldata = fnLoad.TBLBSOURCE;
                                        }
                                        else if ($$("ddlGrouBy").getValue() == "CH") {
                                            $$("ddlFilter").define("label", "Channel");
                                            Tbldata = fnLoad.TBLCHANNEL;

                                        }
                                        else if ($$("ddlGrouBy").getValue() == "VS") {
                                            $$("ddlFilter").define("label", "Venue/Session");
                                            Tbldata = fnLoad.TBLVENUE;
                                        }

                                        $$("ddlFilter").refresh();

                                        if (Tbldata.length > 0) {
                                            $$("ddlFilter").define("options", Tbldata);
                                            $$("ddlFilter").refresh();
                                        }
                                    }
                                }
                            },
                             {
                                 width: 35,
                                 minWidth: 35,
                             },
                        ]
                    },
                    {
                        paddingY: 10,
                        cols: [
                        {
                            view: "richselect",
                            id: "ddlFilter",
                            label: "Market Segment",
                            labelAlign: "Left",
                            labelWidth: 110,
                            inputWidth: 300,
                            width: 350,
                            minWidth: 350,
                            options: Set1,
                            value: "ALL",
                            on: {
                                onChange: function (newval, oldval) {

                                }
                            }
                        }]
                    }
                ]
            }
        ]
    }
});

function fnLoadContributeDisp() {
    //debugger;

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_BQCONTRIBUTION";
    dataparam["COMPID"] = $("#hdnCompId").val();

    dataparam["FrmDt"] = $$("txtFrmDate").getValue();
    dataparam["EndDt"] = $$("txtToDt").getValue();

    dataparam["GstTy"] = "";
    dataparam["GstId"] = "";
    dataparam["VenueId"] = ""; 

    dataparam["FOption"] = $$("ddlGrouBy").getValue();

    dataparam["ddlFilter"] = $$("ddlFilter").getValue();

    var DataVal = JSON.stringify(dataparam);

    $.ajax({
        type: "POST",
        async: true,
        url: "/BQAnalysis/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (data) {
            if (data != "") {

                var rowDatad = JSON.parse(data);

                var dtColNm = rowDatad.ColName;

                if (rowDatad.GridCol.length > 0) {

                    //debugger;
                    if ($$("grdContribution"))
                        $$("grdContribution").destructor();

                    GridDesign();

                    var ColVal = [];

                    $.each(rowDatad.GridCol, function (key, value) {
                        //debugger;

                        if (value == "BillNo" || value == "BillDt" || value == "ResvNo" || value == "FPNo" || value == "Covers" || value == "DispBillNo" || value == "GrpInd"
                            || value == "SumCol" || value == "GrpId" || value == "Narration") {

                            var HeaderNm = "";

                            HeaderNm = value;

                            if (value == "DispBillNo") {
                                HeaderNm = "Bill No";
                            }
                            else if (value == "BillDt") {
                                HeaderNm = "Date";
                            }
                            else if (value == "ResvNo") {
                                HeaderNm = "Resv#";
                            }
                            else if (value == "FPNo") {
                                HeaderNm = "FP No";
                            }

                            var ShowInd = 1;

                            if (value == "Covers" ) {
                                ShowInd = 1;
                            }
                            else if (value == "BillDt") {
                                ShowInd = ($$("rbtnRpt").getValue() == "R" || $$("rbtnRpt").getValue() == "D" ? 1 : 0);
                            }
                            else if (value == "SumCol") {
                                ShowInd = ($$("rbtnRpt").getValue() == "S" ? 1 : 0);
                            }
                            else if (value == "GrpInd" || value == "GrpId" || value == "FPNo" || value == "Narration" || value == "BillNo") {
                                ShowInd = 0;
                            }
                            else
                                ShowInd = ($$("rbtnRpt").getValue() == "R" ? 1 : 0);

                            var set = {
                                id: $.trim(value), header: HeaderNm, css: { 'text-align': 'Center !important' }, width: 90, hidden: (ShowInd == "1" ? false : true),
                            };
                        }
                        else if (value == "GuestNm" || value == "Company") {

                            var set = {
                                id: $.trim(value), header: value, css: { 'text-align': 'left !important' }, width: 200, hidden: ($$("rbtnRpt").getValue() == "R" ? false : true),
                            };
                        }
                        else if (value == "Session" || value == "Venue" || value == "MobileNo" || value == "EmailId") {
                            var set = {
                                id: $.trim(value), header: value, css: { 'text-align': 'left !important' }, width: 130, hidden: ($$("rbtnRpt").getValue() == "R" ? true : true),
                            };
                        }
                        else if (value == "TotSales") {
                            var set = {
                                id: $.trim(value), header: value, css: { 'text-align': 'right !important' }, width: 130,
                            };
                        }
                        else {

                            var ItemArr = dtColNm.filter(function (dtColNm) {
                                return $.trim(dtColNm.BN_GR_ID) == $.trim(value);
                            });

                            var ColName = ItemArr[0].BN_GR_NM;

                            var set = {
                                id: $.trim(value), header: ColName, css: { 'text-align': 'right !important' }, width: 110,
                            };
                        }
                        //if (~value.indexOf("~R")) 

                        ColVal.push(set);
                    });

                    $$("grdContribute").clearAll();
                    $$("grdContribute").config.columns = ColVal;
                    $$("grdContribute").refreshColumns();

                    $$("grdContribute").parse(rowDatad.GridData);
                    $$("grdContribute").show();

                    $("#LoadDIv").hide();
                }
                else {
                    if ($$("grdContribute")) {
                        $$("grdContribute").clearAll();
                        $$("grdContribute").refresh();
                    }
                }
            }
        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }

    });
}

function GridDesign() {
    webix.ui({
        view: 'form',
        id: "grdContribution",
        container: "grdContribution",
        minWidth: 900,
        //maxWidth: 1100,
        height: 450,
        elements: [
            {
                paddingX: 10,
                rows: [
                     {

                         id: "grdContribute",
                         select: 'row',
                         view: "datatable",
                         data: [],
                         scroll: true,
                         spans: true,
                         scheme: {
                             $change: function (item) {
                                 debugger;

                                 if (item.GrpInd == "1") {
                                     $$("grdContribute").addSpan(item.id, "BillDt", 4, 1, null, "Grouping");
                                     $$("grdContribute").refresh();
                                     //item.$css = "Grouping";
                                 }
                                 else if (item.GrpInd == "2") {
                                     item.$css = "GroupTot";
                                 }
                                 else if ($.trim(item.GrpInd) == "3") {
                                     item.$css = "GroupGrTot";
                                 }
                             }
                         },

                     }
                ]
            }
        ],
    });
}

function SetCondition(value, config, id) {
    if (value < 0) {
        return { "background-color": "#ec2e2e", "color": "White", "font-weight": "Bold", "font-family": "Arial !important;" };
    }
    else if (value == "") {
        return { "background-color": "#fff !important", "border-bottom": " 1px solid #fff ! important", "border-top": " 1px solid #fff ! important" };
    }
};

function fnLoadGrpdata() {

    var dataparam = {};
    var rowData = [];

    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_CONTGROUPBY";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQAnalysis/COMAPI_CALL",
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

function prcLoadDrops() {

    var dataparam = {};
    var rowData = [];

    dataparam["REQTYPE"] = "";
    dataparam["PROGNAME"] = "GET_BQCONTDROPVALUE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQAnalysis/COMAPI_CALL",
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

function fnLoadBNControl() {
    //debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_BNCONTROL";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQAnalysis/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnSpAppl").val(rowData[0].H2_IND);
                $("#hdnChAppl").val(rowData[0].I2_IND);
                $("#hdnBkrAppl").val(rowData[0].J2_IND);
            }
        },
    });
}



