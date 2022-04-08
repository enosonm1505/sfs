function fnPropertyLoad() {
    //debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["COMPID"] = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARTrans/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                //$("#hdnCompId").val("WS");
            }
        },
    });
    return rowData;
}

function fnPageLoad() {
    //debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_DEFAULTDT";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARTrans/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnCurDt1").val(rowData[0].CURRDT1);
                $("#hdnCurDt").val(rowData[0].CURRDT);
                $("#hdnCurTm").val(rowData[0].CURRTM);
            }
        },
    });
    return rowData;
}

function LoadPartySubType() {
    debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GETPARTYSUBTYPE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["IdsAllParty"] = "";
    dataparam["IdsPartySub"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARReport/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "")
                rowData = JSON.parse(d);
            $$("grdPartySubType").clearAll();
            $$("grdPartySubType").parse(rowData);
            $$("grdPartySubType").refresh();
        },
    });
}

function LoadAllParty() {
    debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GETALLPARTY";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["IdsAllParty"] = "";
    dataparam["IdsPartySub"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARReport/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "")
                rowData = JSON.parse(d);
            $$("grdAllParty").clearAll();
            $$("grdAllParty").parse(rowData);
            $$("grdAllParty").refresh();
        },
    });
}

function fnCallPopPartySrch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PartySrchPopUp",
        head: "Party Search",
        position: "center",
        minWidth: 500,
        maxWidth: 500,
        css: "webix_header_border",
        height: 500,
        body: {
            view: 'form',
            minWidth: 500,
            maxWidth: 500,

            elements: [
                {
                    view: "datatable",
                    id: "grdAllParty",
                    select: "row",
                    data: [],
                    adjustRowHeight: true,
                    fixedRowHeight: false,
                    columns: [
                        { header: ["Type ", { content: "textFilter" }], id: "PARTY_TY_NM", width: 100, css: { 'text-align': 'left ! important' } },
                           { header: ["Party", { content: "textFilter" }], id: "PARTY_NM", width: 300, css: { 'text-align': 'left ! important' } },
                           { header: "Select", id: "ChkGrdAllParty", template: "{common.checkbox()}", width: 59, css: { 'text-align': 'center ! important' } },
                           { header: "", id: "BLACK_LIST_IND", hidden: true },
                           { header: "", id: "PARTY_ID", hidden: true },
                           { header: "", id: "PARTY_TY_ID", hidden: true },
                    ],
                    on: {

                        'onCheck': function (row, column, state) {
                            //debugger;
                            var getval = this.getItem(row);
                            if (column == 'ChkGrdAllParty') {
                                if (state == "1")
                                    getval.ChkGrdAllParty = 1;
                                else
                                    getval.ChkGrdAllParty = 0;
                            }
                        }
                    },
                },
                {
                    cols: [
                        {
                            view: "checkbox",
                            id: "ChkAll",
                            labelRight: "Select All",
                            labelWidth: 1,
                            width: 150,
                            on: {
                                onChange: function (newval, oldval) {

                                    var data = $$("grdAllParty").serialize();
                                    var lenval = data.length;
                                    if (lenval != 0) {
                                        for (i = 0; i < lenval; i++) {
                                            debugger;
                                            if ($.trim(newval) == "1")
                                                data[i].ChkGrdAllParty = "1";
                                            else
                                                data[i].ChkGrdAllParty = "0";

                                            $$("grdAllParty").refresh();
                                        }
                                    }
                                }
                            }
                        },
                        {
                            view: "button",
                            id: "grdOkAllParty",
                            value: "Ok",
                            align: "right",
                            inputWidth: 70,
                            on: {
                                'onItemClick': function () {

                                    var IdsAllParty = "";

                                    var data = $$("grdAllParty").serialize();
                                    var lenval = data.length;
                                    if (lenval != 0) {
                                        for (i = 0; i < lenval; i++) {
                                            //debugger;
                                            if ($.trim(data[i].ChkGrdAllParty) == "1") {
                                                if (IdsAllParty == "")
                                                    IdsAllParty = "'" + $.trim(data[i].PARTY_ID) + "'";
                                                else
                                                    IdsAllParty += ",'" + $.trim(data[i].PARTY_ID) + "'";
                                            }
                                        }
                                    }

                                    $("#hdnAllParty").val(IdsAllParty);

                                    if ($.trim(IdsAllParty) == "")
                                        $$("ChkAllParty").setValue("0");

                                    $$('PartySrchPopUp').hide();
                                    prcfnLoadPartyOut("");
                                }
                            }
                        }
                    ]
                }
            ]
        }
    });

    LoadAllParty();
    $$("PartySrchPopUp").show();
}

function fnCallPopPartySubSrch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PartySubSrchPopUp",
        head: "Party Sub Type",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        css: "webix_header_border",
        height: 500,
        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,

            elements: [
                {
                    view: "datatable",
                    id: "grdPartySubType",
                    select: "row",
                    data: [],
                    adjustRowHeight: true,
                    fixedRowHeight: false,
                    columns: [
                            { header: ["Name", { content: "textFilter" }], id: "PARTY_SUB_TY_NM", width: 300, css: { 'text-align': 'left ! important' } },
                            { header: "Select", id: "ChkGrdPartySub", width: 59, css: { 'text-align': 'center ! important' }, template: "{common.checkbox()}", },
                            { header: "", id: "PARTY_SUB_TY_ID", hidden: true },
                            { header: "", id: "PARTY_TY_ID", hidden: true },
                    ],
                    on: {

                        'onCheck': function (row, column, state) {
                            //debugger;
                            var getval = this.getItem(row);
                            if (column == 'ChkGrdPartySub') {
                                if (state == "1")
                                    getval.ChkGrdPartySub = 1;
                                else getval.ChkGrdPartySub = 0;
                            }
                        }
                    },
                },
                {
                    view: "button",
                    id: "grdOkPartySub",
                    value: "Ok",
                    align: "right",
                    inputWidth: 70,
                    on: {
                        'onItemClick': function () {

                            var IdsPartySub = "";

                            var data = $$("grdPartySubType").serialize();
                            var lenval = data.length;
                            if (lenval != 0) {
                                for (i = 0; i < lenval; i++) {
                                    //debugger;
                                    if ($.trim(data[i].ChkGrdPartySub) == "1") {
                                        if (IdsPartySub == "")
                                            IdsPartySub = "'" + $.trim(data[i].PARTY_SUB_TY_ID) + "'";
                                        else
                                            IdsPartySub += ",'" + $.trim(data[i].PARTY_SUB_TY_ID) + "'";
                                    }
                                }
                            }

                            $("#hdnPartySub").val(IdsPartySub);

                            if ($.trim(IdsPartySub) == "")
                                $$("ChkPartySubTy").setValue("0");

                            $$('PartySubSrchPopUp').hide();
                            prcfnLoadPartyOut("");
                        }
                    }
                }
            ]
        }
    });

    LoadPartySubType();
    $$("PartySubSrchPopUp").show();
}

