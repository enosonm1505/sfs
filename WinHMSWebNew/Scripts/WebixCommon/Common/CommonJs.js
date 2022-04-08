//for numeric text box
(function ($) {
    $.fn.inputFilter = function (inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    };
}(jQuery));


//For DropDown Load Function 
var PageCall = function (data, urlapi, ddlids) {

    Glurl = urlapi;
    requestData = data;
    ddldocment = ddlids;

    DropCall(data, urlapi, ddlids);
    var dropdowlist = $("#divPropbox").data("kendoDropDownList");
    var company_id = dropdowlist.value();
    DropdownLoad(company_id);
}
var GetddlIds = function (DivId) {
    //debugger;
    var ddlids = [];
    $.unique($(DivId).find("div[id^=ddl]")).each(function () {
        ddlids.push(this.id);
    });

    return ddlids;
}

var SingleDropdownColorLoad = function (DivId, Request) {
    var ddlgrid = "";
    var dataparam = {};
    dataparam["REQTYPE"] = "DROP_DOWN";
    dataparam["DROP_DOWN"] = DivId;

    if (Request != "" && Request != undefined) {
        dataparam["ddlHostel"] = Request.ddlHostel;
        dataparam["ADDITIONALVALUES"] = JSON.stringify(Request);
    }
    else dataparam["ADDITIONALVALUES"] = "";

    dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/MP_MVC/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
             ddlgrid = JSON.parse(d);
            $.each(ddlgrid, function (key, value) {
                //debugger;               
                $("#" + key).kendoDropDownList({ template: "<div class='k-state-default' style='background-color:#:data.KOLOR#;height:15px;width:7%;MARGIN-TOP:2%; PADDING:0% 1%; float:left;' ></div>  " +
                    "<div class='k-state-default' style='width:85%;text-alian:left; float:left;padding-left:5%;'>#:data.ITEM_NM#</div> ", dataTextField: "ITEM_NM", dataValueField: "ITEM_VAL", dataSource: value, height: 200, optionLabel: "", filter: "startswith" });
            });
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return ddlgrid;
};

var SingleDropdownLoad = function (DivId, Request) {
    var ddlgrid = "";
    var dataparam = {};
    dataparam["REQTYPE"] = "DROP_DOWN";
    dataparam["DROP_DOWN"] = DivId;

    if (Request != "" && Request != undefined) {
        dataparam["ddlHostel"] = Request.ddlHostel;
        dataparam["ADDITIONALVALUES"] = JSON.stringify(Request);
    }
    else dataparam["ADDITIONALVALUES"] = "";

    dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/MP_MVC/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
             ddlgrid = JSON.parse(d);
            $.each(ddlgrid, function (key, value) {
                //debugger;               
                $("#" + key).kendoDropDownList({ dataTextField: "ITEM_NM", dataValueField: "ITEM_VAL", dataSource: value, height: 200, optionLabel: "", filter: "startswith" });
            });
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return ddlgrid;
};
var SingleDropdownLoadGrid = function (DivId, Request) {
    debugger;
    var ddlgrid
    var dataparam = {};
    dataparam["REQTYPE"] = "DROP_DOWN";
    dataparam["DROP_DOWN"] = DivId;
    dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/MP_MVC/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            ddlgrid = JSON.parse(d);

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return ddlgrid;
};
var DropdownLoad = function (DivId, Request) {
    var dataparam = {};
    dataparam["REQTYPE"] = "DROP_DOWN";
    dataparam["DROP_DOWN"] = GetddlIds(DivId);
    if (Request != "" && Request != undefined) {
        dataparam["ddlHostel"] = Request.ddlHostel;
        dataparam["ADDITIONALVALUES"] = JSON.stringify(Request);
    }
    else dataparam["ADDITIONALVALUES"] = "";

    dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/MP_MVC/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            var ddlgrid = JSON.parse(d);
            $.each(ddlgrid, function (key, value) {

                $("#" + key).kendoDropDownList({ dataTextField: "ITEM_NM", dataValueField: "ITEM_VAL", dataSource: value, height: 200, optionLabel: "", filter: "startswith" });
            });
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
};
//End Of DropDown Load Function 

//Controlls validation Function
var PageOnSave = function (DivId) {
    var Validate = "";
    //debugger;
    var Id = DivId;
    if (validatePage(Id) == true) {
        Validate = true;
    }
    else {
        AlertMesaage("Please fill required ('*') values", 'fail');
        Validate = false;
    }
    return Validate;
}
var PageSave = function () {
    //
    var indicator = pgindic;
    var Contorl_lists = [];
    $.unique($(".HM_ContainerPage").find("div[id^=ddl], :text, :checked")).each(function (e) {
        var controlValue = {};
        controlValue.Id = this.id;
        // controlValue.Type = this.type;
        controlValue.Value = (this.type == "radio") || (this.type == "checkbox") ? true : this.checked;
        // controlValue.elements = this;
        Contorl_lists.push(controlValue);
        //controlid.push(this.parentNode.attributes.for)
        //})
    });

}
function ValidationClear(DivIds) {
    var controlid = [];
    $.unique($(DivIds).find("span[id=req]")).each(function (e) {
        controlid.push(this.parentNode.attributes.for.value);
        $.each(controlid, function (key, value) {
            //debugger;
            var reqvalue = $("#" + value).val();
            if (value.toLowerCase().indexOf("ddl") >= 0) {
                $("#" + value).parent('span').css('border', '1px #C3C3C3')
            }
            if ($("#" + value)[0].style.display != 'none') {
                if (value.toLowerCase().indexOf("date") >= 0) {
                    $("#" + value).parent('span').css('border', '1px solid #C3C3C3')
                }
                else {
                    $("#" + value).css('border', '1px solid #C3C3C3');
                }
            }
        });
    });
}

function validatePage(DivId) {
    var result = true;
    var controlid = [];
    $.unique($(DivId).find("span[id=req]")).each(function (e) {
        controlid.push(this.parentNode.attributes.for.value);
        //  controlid.push(this.parentNode.nextSibling.attributes.for.value);
    });
    req = controlid;

    $.each(controlid, function (key, value) {
        //debugger;
        var reqvalue = $.trim($("#" + value).val());
        if (reqvalue == "") {
            if (value.toLowerCase().indexOf("ddl") >= 0) {
                $("#" + value).parent('span').css('border', '1px solid #ff0000');
                result = false;
            }
        }
        else {
            if (value.toLowerCase().indexOf("ddl") >= 0) {
                //var dropval = $("#" + value).data("kendoDropDownList");
                //dropval.span.css('border', '1px #C3C3C3');
                $("#" + value).parent('span').css('border', '1px #C3C3C3')
            }
        }

        if ($("#" + value)[0].style.display != 'none') {
            if (reqvalue == "") {//border: 1px solid #ff0000;

                if (value.toLowerCase().indexOf("date") >= 0) {
                    $("#" + value).parent('span').css('border', '1px solid #ff0000')
                }
                else {
                    $("#" + value).css('border', '1px solid #ff0000');
                }
                result = false;
            }
            else {

                if (value.toLowerCase().indexOf("date") >= 0) {
                    $("#" + value).parent('span').css('border', '1px solid #C3C3C3')
                }
                else {
                    $("#" + value).css('border', '1px solid #C3C3C3');
                }
            }
        }

    });
    return result;
}
//End Of validation

//PopUp Grid Creation And Bind Data
var GridPop = function () {
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    ID: { validation: { required: true }, type: "string" },
                    NM: { type: "string" },
                }
            }
        },
    });

    $("#CmnGrid").kendoGrid({
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
            {
                field: "ID", title: 'Id', width: 20, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                field: "NM", title: 'Name', width: 70, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
        ],
        //header
        editable: false,
    });
}
var CmnPopLoad = function (Request, Glurl) {
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["USER_ID"] = Request.USER_ID;
    reqobj["REQ_NM"] = Request.REQ_NM;
    // 
    reqobj["FormMode"] = Request.Mode;

    var dataparam = JSON.stringify(reqobj);

    $.ajax({
        async: false,
        url: "/BQMaster/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            // //debugger;
            var Detemp = JSON.parse(d);

            var grid = $("#CmnGrid").data("kendoGrid");
            grid.dataSource.data(Detemp.Itm);
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}
//End PopUp Grid Creation And Bind Data

//Alert Popus
function AlertMesaage(meg, alertType) {
    $("#alertMeg").text(meg);
    var alertty = alertType;
    if (alertty == 'fail') {
        $("#alertimg").show();
        $("#saveimg").hide();
    }
    else {
        $("#saveimg").show();
        $("#alertimg").hide();
    }
    var window = $("#Alert");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
}
function AlertMesaageMBL(meg, alertType) {
    debugger;
    $("#alertMeg").text(meg);
    var alertty = alertType;
    if (alertty == 'fail') {
        $("#alertimg").show();
        $("#saveimg").hide();
    }
    else {
        $("#saveimg").show();
        $("#alertimg").hide();
    }
    var window = $("#AlertMBL");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
}
function DelAlertMesaage(meg, alertType) {
    $("#alertMeg1").text(meg);
    var alertty = alertType;
    if (alertty == 'ok') {
        $("#alertimg1").show();
        $("#saveimg1").hide();
    }

    var window = $("#DEAlert");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
}
function SaveMesaageWindow(meg) {
    $("#alertMegsave").text(meg);
    var window = $("#MessageSave");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
}
function SaveMesaageWindowWR(meg) {
    $("#alertMegsaveWR").text(meg);
    var window = $("#MessageSaveWR");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
}
function error_handler(e) {
    if (e.errors) {
        var message = "Errors:\n";
        $.each(e.errors, function (key, value) {
            if ('errors' in value) {
                $.each(value.errors, function () {
                    message += this + "\n";
                });
            }
        });
        alert(message);
    }
}
//End Alert Pop

//Get page Control Id's
function getPageControlsId() {
    //debugger;
    var Contorl_lists = [];

    $.unique($(".HM_ContainerPage").find("div[id^=ddl], :text, :checkbox,:radio,label[id^=lbl],div[id^=lbl]")).each(function (e) {
        var controlValue = {};
        //debugger;
        var $this = this;
        var dataids = $this.attributes['data-id'];
        controlValue.Id = this.id;
        if (dataids != undefined)
            controlValue.Dataids = $this.attributes['data-id'].nodeValue;
        else controlValue.Dataids = "";

        controlValue.Type = this.type;
        if ((this.type == "radio") || (this.type == "checkbox"))
            controlValue.Value = this.checked;
        else
            controlValue.Value = encodeURIComponent(this.value);

        Contorl_lists.push(controlValue);
    });

    return Contorl_lists;
}
//End 

//Get specicfic Control Id's
function getSpecificDivControlsId(DivIds) {
    // //debugger;
    var Contorl_lists = [];

    $.unique($(DivIds).find(":text")).each(function (e) {
        var controlValue = {};
        // //debugger;
        var $this = this;
        var dataids = $this.attributes['data-id'];
        controlValue.Id = this.id;
        if (dataids != undefined)
            controlValue.Dataids = $this.attributes['data-id'].nodeValue;
        else controlValue.Dataids = "";

        controlValue.Type = this.type;

        Contorl_lists.push(controlValue);
    });

    return Contorl_lists;
}
//End 

//Get Pop Control Id's
function getPopUpControlsId() {
    // //debugger;
    var Contorl_lists = [];

    $.unique($(".HM_ContainerPop").find("div[id^=ddl], :text, :checkbox,:radio")).each(function (e) {
        var controlValue = {};
        //debugger;
        var $this = this;
        var dataids = $this.attributes['data-id'];
        controlValue.Id = this.id;
        if (dataids != undefined)
            controlValue.Dataids = $this.attributes['data-id'].nodeValue;
        else controlValue.Dataids = "";

        controlValue.Type = this.type;
        if ((this.type == "radio") || (this.type == "checkbox"))
            controlValue.Value = this.checked;
        else
            controlValue.Value = $.trim(encodeURIComponent(this.value));

        Contorl_lists.push(controlValue);
    });

    return Contorl_lists;
}

//Controls Process Function for Reason=Enable/Reason1=Disable/Reason2=Clear
var CntrlProcess = function Process(DivId, Reason, Reason1, Reason2) {
    //debugger;
    var ddlids = [];
    $.unique($(DivId).find("select[id^=ddl]")).each(function () {
        ddlids.push(this.id);
    });

    var txtids = [];
    $.unique($(DivId).find("input[id^=txt]")).each(function () {
        txtids.push(this.id);
    });

    var Chkids = [];
    $.unique($(DivId).find("input[id^=chk]")).each(function () {
        Chkids.push(this.id);
    });

    var dateids = [];
    $.unique($(DivId).find("input[id^=date]")).each(function () {
        dateids.push(this.id);
    });
    var textarids = [];
    $.unique($(DivId).find("textarea[id^=txtar]")).each(function () {
        textarids.push(this.id);
    });

    var lblids = [];
    $.unique($(DivId).find("label[id^=lbl]")).each(function () {
        lblids.push(this.id);
    });

    if (ddlids != undefined) {
        $.each(ddlids, function (key, value) {
            if (Reason == 'E')
                $("#" + value).prop("disabled", false);
            if (Reason1 == 'D')
                $("#" + value).prop("disabled", true);
            if (Reason2 == 'C')
                $("#" + value).val("");
        });
    }
    if (txtids != undefined) {
        $.each(txtids, function (key, value) {
            if (Reason == 'E')
                $("#" + value).prop("disabled", false);
            if (Reason1 == 'D')
                $("#" + value).prop("disabled", true);
            if (Reason2 == 'C')
                $("#" + value).val("");
        });
    }
    if (textarids != undefined) {
        $.each(textarids, function (key, value) {
            if (Reason == 'E')
                $("#" + value).prop("disabled", false);
            if (Reason1 == 'D')
                $("#" + value).prop("disabled", true);
            if (Reason2 == 'C')
                $("#" + value).val("");
        });
    }
    if (Chkids != undefined) {
        $.each(Chkids, function (key, value) {
            if (Reason == 'E')
                $("#" + value).prop("disabled", false);
            if (Reason1 == 'D')
                $("#" + value).prop("disabled", true);
            if (Reason2 == 'C') {
                var id = $("#" + value);
                id[0].checked = false;
            }
        });
    }

    if (dateids != undefined) {
        $.each(dateids, function (key, value) {

            if (Reason == 'E')
                $("#" + value).prop("disabled", false);
            if (Reason1 == 'D')
                $("#" + value).prop("disabled", true);
            if (Reason2 == 'C') {
                var id = $("#" + value).data("kendoDatePicker");
                id.value("");
            }
        });
    }

    if (lblids != undefined) {
        $.each(lblids, function (key, value) {
            //if (Reason == 'E')
            //    $("#" + value).prop("disabled", false);
            //if (Reason1 == 'D')
            //    $("#" + value).prop("disabled", true);
            if (Reason2 == 'C')
                $("#" + value).text("");
        });
    }
}
//End Of Disable Controls Function

/*The Buttons  Click Events */
$("#btnOpen, #btnNew, #btnSave, #btnRefresh").on('click', function (event) {
    if (event) {
        var Currtargeid = event.currentTarget.id;
        var Targerid = "";
        switch (Currtargeid) {
            case "btnNew":
                PgMode = "NEW";
                PageMode("NEW");
                break;
            case "btnOpen":
                PgMode = "OPEN";
                PageMode("OPEN");
                break;
            case "btnRefresh":
                PgMode = "REFRESH";
                PageMode("REFRESH");
                break;
            case "btnSave":
                PageOnSave();
            default:
                break;
        }
    }
});

//Adding new row
var CreateRow = function (_grid) {
    var $grid = $("#" + _grid).data("kendoGrid");
    $grid.content[0].scrollTop = $grid.content[0].scrollHeight;
    var row = $grid.tbody.find("tr:last");
    $grid.select(row);
    row.trigger('click');
}

var btnPrev = function () {
    $("#btnView").hide();
    $("#btnAdd").hide();
    $("#btnModify").hide();
    if (window.NewMode == "True")
        $("#btnAdd").show();
    if (window.AmendMode == "True")
        $("#btnModify").show();
    if (window.ViewMode == "True")
        $("#btnView").show();
}

var ShowBtn = function () {
    $("#btnSave").attr("disabled", true);
    $("#btnView").attr("disabled", false);
    $("#btnAdd").attr("disabled", false);
    $("#btnModify").attr("disabled", false);
    $("#btnrefresh").attr("disabled", false);
    $("#btnDelete").attr("disabled", true);
    
}
var fnBtnNewprocess = function () {
    $("#btnSave").attr("disabled", false);
    $("#btnView").attr("disabled", true);
    $("#btnAdd").attr("disabled", false);
    $("#btnModify").attr("disabled", true);
    $("#btnrefresh").attr("disabled", false);
    $("#btnDelete").attr("disabled", true);
}

var fnBtnOpenprocess = function () {
    $("#btnSave").attr("disabled", false);
    $("#btnView").attr("disabled", true);
    $("#btnAdd").attr("disabled", true);
    $("#btnModify").attr("disabled", false);
    $("#btnrefresh").attr("disabled", false);
    $("#btnDelete").attr("disabled", true);
}

var fnBtnViewprocess = function () {
    $("#btnSave").attr("disabled", true);
    $("#btnView").attr("disabled", false);
    $("#btnAdd").attr("disabled", true);
    $("#btnModify").attr("disabled", true);
    $("#btnrefresh").attr("disabled", false);
    $("#btnDelete").attr("disabled", false);
}

var fnBtnRefreshprocess = function () {
    $("#btnSave").attr("disabled", true);
    $("#btnView").attr("disabled", false);
    $("#btnAdd").attr("disabled", false);
    $("#btnModify").attr("disabled", false);
    $("#btnrefresh").attr("disabled", false);
    $("#btnDelete").attr("disabled", true);
}

var DropdownLoadData = function (DivId, Request) {

    var dataparam = {};
    dataparam["REQTYPE"] = "DROP_DOWN";
    dataparam["DROP_DOWN"] = DivId;

    if (Request != "" && Request != undefined) {
        dataparam["ddlHostel"] = Request.ddlHostel;
        dataparam["ADDITIONALVALUES"] = JSON.stringify(Request);
    }
    else dataparam["ADDITIONALVALUES"] = "";

    dataparam = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/MP_MVC/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            window.getdata = JSON.parse(d);
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
};
//page Common functions

//Loading AcademicYr Details
var LoadAcademicYr = function () {
    var reqobj = {};
    reqobj["REQTYPE"] = "LOADACADEMICYR";
    var dataparam = JSON.stringify(reqobj);

    $.ajax({
        async: false,
        url: "/MP_MVC/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var Detemp = JSON.parse(d);
            if (Detemp != undefined && Detemp != "") {
                if (Detemp.Sts == "FAILURE" && Detemp.Msg != "")
                    AlertMesaage(Detemp.Msg, 'fail');
                else {
                    $("#txtYrID").val(Detemp.YrID);
                    $("#txtAcademicYr").val(Detemp.YrSHNM);
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}

function Comma(Num) { //function to add commas to textboxes
    // //debugger;
    var rgx = "";
    var Format = $("#hdnCurFrmt").val();
    var decimal = $("#hdnDeciml").val();
    if (Format == "M") {
        Num += '';
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        x = Num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';

        rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;

    }
    else { return inrFormat(Num.toString(), decimal) }
}

function inrFormat(nStr, decimal) { // nStr is the input string
    //debugger;
    var vbool = false;
    if (nStr.toString().includes('-')) {
        nStr = nStr.replace('-', '');
        vbool = true;
    }

    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    var z = 0;
    var len = String(x1).length;
    var num = parseInt((len / 2) - 1);
    while (rgx.test(x1)) {
        if (z > 0) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        else {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
            rgx = /(\d+)(\d{2})/;
        }
        z++;
        num--;
        if (num == 0) {
            break;
        }
    }
    if (vbool == true)
        x1 = '-' + x1;

    return x1 + x2;

}

function convert(str) {
    //debugger;
    var cndt = window.datafor;
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
}
// currency details
var Currencyfrmt = function () {
    //debugger;
    var dataparam = {};
    dataparam["REQTYPE"] = "GetCurrencyfrmt";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/MP_MVC/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            var prompts = JSON.parse(d);
            $("#hdnCurFrmt").val(prompts[0].CURRENCY_FORMAT);
            $("#hdnDeciml").val(prompts[0].VAL_DECIM_LIMIT);
        }
    });
}


function fnCreateDatePicker(id) {
    var datepicker2 = $("#" + id);
    datepicker2.kendoMaskedTextBox({
        mask: "00/00/0000"
    });

    datepicker2.kendoDatePicker({
        format: "dd/MM/yyyy",
        parseFormats: ['dd/MM/yyyy'],
    });

    datepicker2.closest(".k-datepicker")
    .add(datepicker2)
    .removeClass("k-textbox");
}
////hostel reg no Load function
function HostelRegNoFunction(ID, NO,val) {
        //debugger;
    var value = HostelRegNoLoad(val);
    value = JSON.parse(value);
    $("#" + NO).kendoAutoComplete({
        dataTextField: "HOSTEL_ADMISSION_NO",
        dataValueField: "HOSTEL_ADMISSION_ID",
        filter: "contains",
        minLength: 1,
        template: '<span class="k-state-default">#: data.HOSTEL_ADMISSION_NO #</span>',
        dataSource: value,
        select: function (e) {
            debugger;
            var selectedOne = this.dataItem(e.item.index());
            var txt = selectedOne.HOSTEL_ADMISSION_NO;
            var val = selectedOne.HOSTEL_ADMISSION_ID;

            $("#" + NO).val(txt);
            $("#" + ID).val(val);
            PopLoadHotelRegNoDetails(txt);
        }
    });
}
function HostelRegNoLoad(val) {
    var reqobj = {};
    var ReturnValue = "";
    reqobj["value"] = val;
    reqobj["REQTYPE"] = "CommanHostelRegNoLoad";
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MP_MVC/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            ReturnValue = d;
        },
    });
    return ReturnValue;
}
function PopLoadHotelRegNoDetails(HostelRegNo) {
    //debugger;
    var reqobj = {};
    reqobj["REQTYPE"] = "CommanStudentLoad";
    reqobj["HostelRegNo"] = HostelRegNo;
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MP_MVC/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            //debugger;
            var value = JSON.parse(d);
            var Contorl_lists = [];
            Contorl_lists = getPageControlsId();
            LoadControlsDynamic(value[0], Contorl_lists);
        },
    });

}
////clear cookies
//    var cookies = $.cookie();
//    for (var cookie in cookies) {
//        $.removeCookie(cookie);
//    }

function UserDetailsdLoadFn() {
    //debugger;
    var reqobj = {};
    reqobj["REQTYPE"] = "UserDetailsdLoadFn";
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/MP_MVC/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            var value = JSON.parse(d);
            if (d != "") {
                $("#loginUser").text(value[0].USER_NM);
                $("#loginUser1").text(value[0].USER_NM);
                $("#DeptUserNM").text(value[0].DEPART_NM);
                $("#RoleUserNM").text(value[0].ROLE_NM);
            }
            else {
                $("#loginUser").text("");
                $("#loginUser1").text("");
                $("#DeptUserNM").text("");
                $("#RoleUserNM").text("");
            }
           
        },
    });

}