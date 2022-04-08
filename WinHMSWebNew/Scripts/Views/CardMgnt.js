$(document).ready(function () {
    ////debugger;
    /*Global Variables of this Project*/
    window.Prop_Id = "";
    /*Global Variables of this Project*/

    //Property Dropdown Load
    var COMPID = $("#COMPID").val();
    var Table = {};
    Table["REQTYPE"] = "CDLOADGSTTY";
    Table["COMPID"] = COMPID;
    var ParamVal = JSON.stringify(Table);
    $.ajax({
        async: false,
        type: "POST",
        url: "/Cardmanagement/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            ////debugger;
            var ddlguest = JSON.parse(data);
            $("#ddlguestty").kendoDropDownList({ dataTextField: "PLYR_CAT_NM", dataValueField: "PLYR_CAT_ID", dataSource: ddlguest.GUESTTYPE, height: 100, optionLabel: "<--SELECT-->" });
            $("#ddlguestty").data("kendoDropDownList").value();
        }
    });
});

var LoadGuestPop = function (Guestty, Mode) {
    ////debugger;
    var reqobj = {};
    reqobj["COMPID"] = window.COMPID;
    reqobj["REQTYPE"] = "CDLOADGUEST";
    reqobj["GUESTTYPE"] = Guestty;
    reqobj["MODE"] = Mode;
    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/Cardmanagement/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var values = JSON.parse(data);
            //debugger;
            var grid = $("#GrdGuest").data("kendoGrid");
            grid.dataSource.data(values.GUESTDET);

            var grid = $("#GrdGuest1").data("kendoGrid");
            grid.dataSource.data(values.GUESTDET);

        }
    });
}

var LoadGuestDependPop = function (Guestty, Mode) {
    //debugger;
    var reqobj = {};
    reqobj["COMPID"] = window.COMPID;
    reqobj["REQTYPE"] = "CDLOADGUEST";
    reqobj["GUESTTYPE"] = Guestty;
    reqobj["MODE"] = Mode;
    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/Cardmanagement/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var values = JSON.parse(data);
            //debugger;
            var grid = $("#GrdGuestdepend").data("kendoGrid");
            grid.dataSource.data(values.GUESTDET);

        }
    });
}

var LoadCardMgntGrd = function (Guestty, memb_id, depndsrno) {
    ////debugger;
    var reqobj = {};
    reqobj["COMPID"] = window.COMPID;
    reqobj["REQTYPE"] = "CDLOADCARDMGNT";
    reqobj["GUESTTYPE"] = Guestty;
    reqobj["MEMBID"] = memb_id;
    reqobj["DEPNDSRNNO"] = depndsrno;
    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/Cardmanagement/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var values = JSON.parse(data);
            ////debugger;
            var grid = $("#GrdCardMgnt").data("kendoGrid");
            grid.dataSource.data(values.CRDMGNTDET);


        }
    });
}

var GridGuest1 = function () {
    ////debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    GS_NM: { type: "string" },
                    ADD1: { type: "string" },
                }
            }
        },
    });

    $("#GrdGuest1").kendoGrid({

        dataSource: datsource,

        filterable:

        {

            mode: "row"

        },
        selectable: "row",
        //scrollable: true,
        //// navigatable: true,
        // change: Footerrowcalc,
        columns: [
            //{ field: "QUOTE_ID", title: 'QUOTE_ID', width: 20, attributes: { style: "text-align:left" } },
            {
                field: "GS_NM", title: 'Guest Name', width: 45, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            {
                field: "ADD1", title: 'Address', width: 55, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            //{ field: "PARTY_ID", title: 'PARTY_ID', width: 70, attributes: { style: "text-align:left" } },

        ],
        //header
        editable: false,
    });
}

var GridGuest = function () {
    ////debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    MEMB_NO: { type: "string" },
                    PARTY_NM: { type: "string" },
                }
            }
        },
    });

    $("#GrdGuest").kendoGrid({

        dataSource: datsource,

        filterable:

        {

            mode: "row"

        },
        selectable: "row",
        //scrollable: true,
        //// navigatable: true,
        // change: Footerrowcalc,
        columns: [
            //{ field: "QUOTE_ID", title: 'QUOTE_ID', width: 20, attributes: { style: "text-align:left" } },
            {
                field: "MEMB_NO", title: 'Guest Id', width: 30, attributes: { style: "text-align:left" },
                //field: "MEMB_NO", title:card, width: 45, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            {
                field: "PARTY_NM", title: 'Guest Name', width: 35, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },

            //{ field: "PARTY_ID", title: 'PARTY_ID', width: 70, attributes: { style: "text-align:left" } },

        ],
        //header
        editable: false,
    });
}

var Dependgrd = function () {
    //debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    MEMB_NO: { type: "string" },
                    PARTY_NM: { type: "string" },
                    DEPEND_NM: { type: "string" }
                }
            }
        },
    });

    $("#GrdGuestdepend").kendoGrid({

        dataSource: datsource,

        filterable:

        {
            mode: "row"
        },
        selectable: "row",
        //scrollable: true,
        //// navigatable: true,
        // change: Footerrowcalc,
        columns: [
            //{ field: "QUOTE_ID", title: 'QUOTE_ID', width: 20, attributes: { style: "text-align:left" } },
            {
                field: "MEMB_NO", title: 'Member No', width: 20, attributes: { style: "text-align:left" },
                //field: "MEMB_NO", title:card, width: 45, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            {
                field: "PARTY_NM", title: 'Member Name', width: 45, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            {
                field: "DEPEND_NM", title: 'Depend Name', width: 35, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            //{ field: "PARTY_ID", title: 'PARTY_ID', width: 70, attributes: { style: "text-align:left" } },

        ],
        //header
        editable: false,
    });
}

var GrdCardMgntload = function () {
    ////debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    CARDNO: { type: "string" },
                    CARDTYPE: { type: "string" },
                    CATEGORY: { type: "string" },
                    VALIDFRM: { type: "date" },
                    VALIDTO: { type: "date" },
                    ACTIVE: { type: "string" },
                    OLDCARDNO: { type: "string" },
                    CARDTYID: { type: "string" },
                    CARDCATID: { type: "string" },
                    ISSUEDT: { type: "date" },
                    ACTID: { type: "string" },
                }
            }
        },
    });

    $("#GrdCardMgnt").kendoGrid({

        dataSource: datsource,

        filterable:

        {
            mode: "row"
        },
        selectable: "row",
        //scrollable: true,
        //// navigatable: true,
        // change: Footerrowcalc,
        dataBound: OnGridDataBound,
        columns: [
            //{ field: "QUOTE_ID", title: 'QUOTE_ID', width: 20, attributes: { style: "text-align:left" } },
            {
                field: "CARDNO", title: 'Card No', width: 15, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            {
                field: "CARDTYPE", title: 'Card Type', width: 15, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            {
                field: "CATEGORY", title: 'Category', width: 15, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
             {
                 field: "VALIDFRM", title: 'Valid From', width: 12, attributes: { style: "text-align:left" },
                 filterable: {

                     cell: {

                         showOperators: false, operator: "contains",

                         suggestionOperator: "contains"

                     }

                 }
             },
              {
                  field: "VALIDTO", title: 'Valid To', width: 12, attributes: { style: "text-align:left" },
                  filterable: {

                      cell: {

                          showOperators: false, operator: "contains",

                          suggestionOperator: "contains"

                      }

                  }
              },
               {
                   field: "ACTIVE", title: 'Active', width: 12, attributes: { style: "text-align:center" },
                   filterable: {

                       cell: {

                           showOperators: false, operator: "contains",

                           suggestionOperator: "contains"

                       }

                   }
               },
               {
                   field: "ISSUEDT", title: 'Issue Dt', width: 12, attributes: { style: "text-align: center;" },
                   filterable: {

                       cell: {

                           showOperators: false, operator: "contains",

                           suggestionOperator: "contains"

                       }

                   }
               },
               {
                   field: "OLDCARDNO", width: 35, hidden: true, attributes: { style: "display:none;" }
               },
               {
                   field: "CARDTYID", width: 35, hidden: true, attributes: { style: "display:none;" }
               },
               {
                   field: "CARDCATID", width: 35, hidden: true, attributes: { style: "display:none;" }
               },

        ],
        //header
        editable: false,
    });
}

var LoadCardLink = function (Guestty, membid) {
    //debugger;
    var reqobj = {};
    reqobj["COMPID"] = window.COMPID;
    reqobj["REQTYPE"] = "CDLOADCARDLINK";
    reqobj["GUESTTYPE"] = Guestty;
    reqobj["MEMB_ID"] = membid;
    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        async: false,
        url: "/Cardmanagement/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var values = JSON.parse(data);
            window.LoadCard = values;
        }
    });

}

function OnGridDataBound(e) {
    var grid = $("#GrdCardMgnt").data("kendoGrid");
    var data = grid.dataSource.data();
    var Count = 0;
    $.each(data, function (i, row) {
        var Status = row.ACTIVE;
        if (Status == "CANCELED") {
            var element = $('tr[data-uid="' + row.uid + '"] td:nth-child(14)');
            $(element).addClass("colored-row");
        }
        if (Status == "BLOCKED") {
            var element = $('tr[data-uid="' + row.uid + '"] td:nth-child(14)');
            $(element).addClass("colored-row1");
        }
        if (Status == "ACTIVE") {
            var element = $('tr[data-uid="' + row.uid + '"] td:nth-child(14)');
            $(element).addClass("colored-row2");
        }

    });
}

var CardType_Change = function (Guestty, memid, oldcardno, cardty,fromdt,mode) {
    debugger;
    var reqobj = {};
    reqobj["COMPID"] = window.COMPID;
    reqobj["REQTYPE"] = "CDLOADCARDTYPECHANGE";
    reqobj["GUESTTYPE"] = Guestty;
    reqobj["MEMBID"] = memid;
    reqobj["OLDCARDNO"] = oldcardno;
    reqobj["CARDTYPE"] = cardty;
    reqobj["FRMDT"] = fromdt;
    reqobj["MODE"] = mode;
    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        type: "POST",
        url: "/Cardmanagement/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var values = JSON.parse(data);
            //debugger;
            window.CARDCHNG = values.CARDCHNG;
            window.REC_COUNT = values.REC_COUNT;
        }
    });
}

var CardMgntsave = function (Guestty, Mode,grddet,membid,dependsrno,guestnm) {
    ////debugger;
    var reqobj = {};
    reqobj["COMPID"] = window.COMPID;
    reqobj["REQTYPE"] = "CDSAVECARDMGNT";
    reqobj["GUESTTYPE"] = Guestty;
    reqobj["GRDDET"] = grddet;
    reqobj["MEMBID"] = membid;
    reqobj["DEPNDSRNO"] = dependsrno;
    reqobj["GSTNM"] = guestnm;
    reqobj["MODE"] = Mode;

    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        type: "POST",
        url: "/Cardmanagement/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var values = JSON.parse(data);
            //alert(values);
            window.response = values;
            //debugger;

        }
    });
}
