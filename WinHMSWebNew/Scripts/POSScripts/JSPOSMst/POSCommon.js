
function fnLoadProperty() {

    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "richselect",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        //label: "Property",
        labelwidth: 1,
        inputwidth: 180,
        width: 280,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                $("#hdnCompId").val(newval);
                fnLoadPropertyChange();
            }
        }
    });
}

function fnPropertyLoad() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PosMaster/COMAPI_CALL",
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

function fnMstCompany() {
   // debugger;
    window.CURRENCY_FORMAT = "";
    window.CURRENCY_DELIMIT = "";
    window.CURRENCY_DECIMLIMIT = "";
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_MSTCOMPANY";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PosMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);

                if (rowData.length > 0) {
                    window.CURRENCY_FORMAT = rowData[0].CURRENCY_FORMAT;
                    window.CURRENCY_DELIMIT = rowData[0].CURRENCY_DELIMIT;
                    window.CURRENCY_DECIMLIMIT = rowData[0].VAL_DECIM_LIMIT;
                }
            }
        },
    });

    return rowData;
}
function fnFoCont() {

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FOCONT";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PosMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}

function fnAccountDt() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_ACCOUNTDT";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/PosMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnCurrentDt").val(rowData[0].CURDT);
            }
        },
    });
}
           
// Added by Revathy Chandraseker 
function fnCurrDate() {
    Request = {
        PROGNAME: "GET_COMFUNCCLASS",
        REQTYPE: "GET_CURRDATE",
        COMPID: $("#hdnCompId").val(),
    }
    var rowData = [];
    var options = [];

    $("#hdnCurrentDt").val("");
    requestData = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/PosReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            //debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                $("#hdnCurrentDt").val(rowData[0].CURRDT);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function fnAlertMessage(Text) {
    webix.alert({
        title: "Alert Message",
        text: Text,
        ok: "Ok",
        type: "alert-error",
        modal: true,
    }).then(function (result) {
        // some action
    });
}

function SuccessMsg(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Message",
        text: Text,
        modal: true,
    }).then(function (result) {
        fnRemoveClass();
        fnClearData();
    })
}

function fnRemoveArry(DataSet, ColName, FilterVal) {
    var i = DataSet.length;
    while (i--) {
        if (DataSet[i]
            && DataSet[i].hasOwnProperty(ColName)
            && (arguments.length > 2 && DataSet[i][ColName] == FilterVal)) {

            DataSet.splice(i, 1);

        }
    }
    return DataSet;
}

function fnLogoutPos() {

    $("#hdnStwId").val("");
    $("#hdnOutletId").val("");
    $("#hdnOutletNm").val("");
    $("#hdnAccountDt").val("");
    $("#hdnStwardNm").val("");

    document.location = "/TPosLogin/TLogin";
    return;
}

// Added by Revathy Chandraseker 
function fnRemoveClass(Mode) {
    $("#btnNew").removeClass("ClickBtn");
    $("#btnOpen").removeClass("ClickBtn");
    $("#btnView").removeClass("ClickBtn");
    $("#btnSave").removeClass("ClickBtn");
    $("#btnRef").removeClass("ClickBtn");

    if ($.trim(Mode) == "N") {
        $('#btnNew').prop('disabled', true);
        $('#btnView').prop('disabled', true);
        $('#btnOpen').prop('disabled', true);
        $('#btnSave').prop('disabled', false);
        $('#btnRef').prop('disabled', false);
    } else if ($.trim(Mode) == "O") {
        $('#btnNew').prop('disabled', true);
        $('#btnView').prop('disabled', true);
        $('#btnOpen').prop('disabled', true);
        $('#btnSave').prop('disabled', false);
        $('#btnRef').prop('disabled', false);
    }
    else if ($.trim(Mode) == "V") {
        $('#btnNew').prop('disabled', true);
        $('#btnView').prop('disabled', true);
        $('#btnOpen').prop('disabled', true);
        $('#btnSave').prop('disabled', true);
        $('#btnRef').prop('disabled', false);
    }
    else if ($.trim(Mode) == "") {
        $('#btnNew').prop('disabled', false);
        $('#btnView').prop('disabled', false);
        $('#btnOpen').prop('disabled', false);
        $('#btnSave').prop('disabled', false);
        $('#btnRef').prop('disabled', true);
    }
}

function AlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    });
}

// Added by Revathy Chandraseker 
function CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal) {
    //debugger;
    if (value == null || value == undefined) return "";
    if (isNaN(value)) return "";

    if (value.toString() != "") {
        if (Currfrmt == "L") {
            var x = parseFloat(value).toFixed(CurrDecimal);
            var neg = false;
            if (value < 0) {
                neg = true;
                //x = math.abs(x);
            }
            x = x.toString();
            var afterPoint = '';
            if (x.indexOf('.') > 0) {
                ////afterPoint = x.substring(x.indexOf('.') + 1, x.length);
                ////afterPoint = CurrDelimit + afterPoint
                var vArr = x.split('.');
                x = vArr[0].toString().trim();
                afterPoint = vArr[1].toString().trim();
                afterPoint = CurrDelimit + afterPoint
            }
            //x = Math.floor(x);

            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '' && otherNumbers != '-')
                lastThree = ',' + lastThree;
            if (afterPoint != "") return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
            else return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        }
        else {
            var x = parseFloat(value).toFixed(CurrDecimal);
            var neg = false;
            if (value < 0) {
                neg = true;
                //x = math.abs(x);
            }

            x = x.toString();

            //var res = x.replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,")  //+ afterPoint;
            //var res = x.replace(/(\d{3})/g, "1,")
            var res = x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

            if (res.indexOf('.') > 0) {

                res = res.replace(".", CurrDelimit)
            }


            return res;
        }
    }
    else {
        return value;
    }
};

// Added by Revathy Chandraseker 
function fnCurrDtTime() {
    var vDate = "";
    var vTime = "";
    var rowData = [];

    Request = {
        PROGNAME: "GET_COMFUNCCLASS",
        REQTYPE: "GET_FNLOADCURRDTTM",
        COMPID: $("#hdnCompId").val(),
    }
  
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/PosReports/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                vDate = rowData.GDate;
                vTime = rowData.GTime;

            }
        },
    });

    return [vDate, vTime];
};

function fnComExcelExport(grid, Name, DocHeader, styles, CompanyNm, CurrDate, CurrTime, FromDt, ToDt, AsOn) {
    debugger;

    ToDt = ToDt || "";
    FromDt = FromDt || "";
    AsOn = AsOn || "";
    DocHeader = DocHeader || "";
    CompanyNm = CompanyNm || "";
    var ColId = "";
    var vRows = 0;

    var vColmns = grid.config.columns;

    grid.spans = true;

    var HeadRow = vColmns[0].header.length;
    for (var i = 0; i < HeadRow; i++) {
        vRows += 1;
        grid.add({}, i);
        var row = grid.getIdByIndex(i);
        var SelRow = grid.getItem(row);
        grid.addRowCss(row, "webix_ss_header");
        $.each(vColmns, function (key, value) {
            debugger;
            ColId = value.id;
            grid.addCellCss(row, ColId, "webix_hcell");
            if (value.header[i]) {
                SelRow[value.id] = value.header[i].text;
                if (value.header[i].colspan) {
                    if (value.header[i].colspan > 1) {
                        grid.addSpan(row, ColId, value.header[i].colspan, 1, null, "webix_ss_header webix_hcell");
                    }
                }
            }

        })
        if (i == 0) FrzRow = row;
        SelRow["CLR"] = "ExcelHead";
        grid.updateItem(row, SelRow);
    }


    if (AsOn) {
        vRows += 1;
        grid.add({}, 0);
        var SelRow = grid.getItem(grid.getFirstId());
        var vCenterCol = Math.floor(vColmns.length / 2)
        var row = grid.getFirstId();
        ColId = vColmns[0].id;
        SelRow[ColId] = "AsOn :  " + AsOn;
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextBold xltextCenter xlHdRemBorder");

        SelRow["CLR"] = "ExcelHead";
        grid.updateItem(row, SelRow);

    }
    else if (FromDt || ToDt) {
        vRows += 1;
        grid.add({}, 0);
        var SelRow = grid.getItem(grid.getFirstId());
        var vCenterCol = Math.floor(vColmns.length / 2)
        var row = grid.getFirstId();

        var DtString = "";
        DtString = "From : " + FromDt + "       To : " + ToDt;
        ColId = vColmns[0].id;
        SelRow[ColId] = DtString;
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextBold xltextCenter xlHdRemBorder");

        SelRow["CLR"] = "ExcelHead";
        grid.updateItem(row, SelRow);
    }


    grid.add({}, 0);
    vRows += 1;
    var SelRow = grid.getItem(grid.getFirstId());
    var row = grid.getFirstId();
    if (DocHeader != "") {
        ColId = vColmns[vCenterCol - 1].id;
        ColId = vColmns[0].id;
        SelRow[ColId] = DocHeader;
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextBold xltextCenter xlHdRemBorder");

    }

    SelRow["CLR"] = "ExcelHead";
    grid.updateItem(row, SelRow);

    grid.add({}, 0);
    vRows += 1;
    var SelRow = grid.getItem(grid.getFirstId());
    var row = grid.getFirstId();
    if (CompanyNm != "") {
        ColId = vColmns[0].id;
        SelRow[ColId] = CompanyNm + "  , " + CurrDate + "  , " + CurrTime;
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextLeft xltextBold xlHdRemBorder");

    }
    grid.updateItem(row, SelRow);
    grid.refresh();

    var data = webix.toExcel(grid, {
        filename: Name,
        filterHTML: true,
        styles: styles,
        spans: true,
        name: Name,
        docHeader: "",
        rawValues: true,
        header: false,
    });
    for (var j = 1; j <= vRows; j++) {
        grid.remove(grid.getFirstId());
    }
    grid.refresh();
};
