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


var PageCall = function (data, urlapi, ddlids) {
    debugger;
    Glurl = urlapi;
    requestData = data;
    ddldocment = ddlids;
    
    DropCall(data, urlapi, ddlids);
    var dropdowlist = $("#divPropbox").data("kendoDropDownList");
    var company_id = dropdowlist.value();
    DropdownLoad(company_id);
}

var DropdownLoad = function (data) {
   debugger;
    var obj = {};
    var dataparam = JSON.parse(requestData);
    dataparam["COMPID"] = data;
    dataparam["REQ_NM"] = "DROP_DOWN";
    dataparam["DROP_DWN"] = ddldocment;
    dataparam["USER_ID"] = "";
    dataparam = JSON.stringify(dataparam);
    $.ajax({
    async: false,
    url: "/BQMaster/API_CALL",
    type: 'POST',

    data: "request=" + dataparam,
       
        success: function (d) {

            var ddlgrid = JSON.parse(d);
            $.each(ddlgrid, function (key, value) {
                if (key == "ddltitle")
                    $("#" + key).kendoDropDownList({ dataTextField: "ITEM_NM", dataValueField: "ITEM_VAL", dataSource: value, height: 100, optionLabel: "Title..." });
                    // $("#" + key).jqxDropDownList({ width: '30%', source: value, displayMember: "ITEM_NM", valueMember: "ITEM_VAL", height: 25});
                else
                    $("#" + key).kendoDropDownList({ dataTextField: "ITEM_NM", dataValueField: "ITEM_VAL", dataSource: value, height: 200, optionLabel: "Select...", filter: "startswith" });
                //$("#" + key).jqxDropDownList({ width: '70%', source: value, displayMember: "ITEM_NM", valueMember: "ITEM_VAL", height: 25});
            });
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
};

//change multi property
//$("#divPropbox").change(function (e) {
//    debugger;
//    var obj = {};
//    var dropdowlist = $("#divPropbox").data("kendoDropDownList");
//    var company_id = dropdowlist.value();
//    var dataparam = JSON.parse(requestData);
//    dataparam["COMPID"] = company_id;
//    dataparam["REQ_NM"] = "";
//    dataparam["USER_ID"] = "";
//    dataparam["DROP_DWN"] = ddldocment;
//    dataparam = JSON.stringify(dataparam);
//    $.ajax({
//        async: false,
//        url: "/BQMaster/API_CALL",
//        type: 'POST',

//        data: "request=" + dataparam,
       
//        success: function (d) {

//        },

//            error: function (request, status, error) {
//                console.log("Error Failrue");
//            }
//        });
//});

var PageOnSave = function () {
    var Validate = "";
    //debugger;
    if (validatePage() == true) {
        Validate = true;
    }
    else {
        $("#EPopup").modal('show');
        $("#alerttxt").html("Please Fill Required <span style='color:red;'>*</span> Values");
        Validate = false;
    }
    return Validate;
}
var PageSave = function () {
    //
    var indicator = pgindic;
    var Contorl_lists = [];
    $.unique($(".container1").find("div[id^=ddl], :text, :checked")).each(function (e) {
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


function ValidationClear() {
    var controlid = [];
    $.unique($(".container1").find("span[id=req]")).each(function (e) {
        controlid.push(this.parentNode.attributes.role.value);
        $.each(controlid, function (key, value) {
            //debugger;
            var reqvalue = $("#" + value).val();
            if (value.toLowerCase().indexOf("ddl") >= 0) {
                $("#" + value).parent('span').css('border', '1px #C3C3C3')
            }
            if ($("#" + value)[0].style.display != 'none') {
                {
                    if (value.toLowerCase().indexOf("ddl") >= 0) {
                        //var dropval = $("#" + value).data("kendoDropDownList");
                        //dropval.span.css('border', '1px #C3C3C3');
                        $("#" + value).parent('span').css('border', '1px #C3C3C3')
                    }
                    else if (value.toLowerCase().indexOf("date") >= 0) {
                        $("#" + value).parent('span').css('border', '1px solid #C3C3C3')
                    }
                    else {
                        $("#" + value).css('border', '1px solid #C3C3C3');
                    }
                }
            }

        });
    });
}

function validatePage() {
    var result = true;
    var controlid = []; 
    $.unique($(".container1").find("span[id=req]")).each(function (e) {
        controlid.push(this.parentNode.attributes.role.value);
        //controlid.push(this.parentNode.attributes.for)
    });
    req = controlid;

    $.each(controlid, function (key, value) {
        debugger;
        //var reqvalue = $("#" + value).val();

        var reqvalue = $.trim($("#" + value).val());
        if (reqvalue == "") {
            if (value.toLowerCase().indexOf("ddl") >= 0) {
                if ($("#" + value).parent('span')[0].style.display != 'none') {
                    $("#" + value).parent('span').css('border', '1px solid #ff0000');
                    result = false;
                }
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

                if (value.toLowerCase().indexOf("ddl") >= 0) {
                    $("#" + value).parent('span').css('border', '1px solid #ff0000')
                }
                else if (value.toLowerCase().indexOf("date") >= 0) {
                    $("#" + value).parent('span').css('border', '1px solid #ff0000')
                }
                else {
                    $("#" + value).css('border', '1px solid #ff0000');
                }
                result = false;
            }
            else {
                if (value.toLowerCase().indexOf("ddl") >= 0) {
                    //var dropval = $("#" + value).data("kendoDropDownList");
                    //dropval.span.css('border', '1px #C3C3C3');
                    $("#" + value).parent('span').css('border', '1px #C3C3C3')
                }
                else if (value.toLowerCase().indexOf("date") >= 0) {
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
//chezhian
var CntrlClear = function Clear(ddlIds, txtids, Chkids, dateids) {
    //debugger;
    if (ddlIds != undefined) {
        $.each(ddlIds, function (key, value) {
            var id = $("#" + value).data("kendoDropDownList");
            id.value("");
        });
    }
    if (txtids != undefined) {
        $.each(txtids, function (key, value) {
            var id = $("#" + value).val("");

        });
    }
    if (Chkids != undefined) {
        $.each(Chkids, function (key, value) {
            var id = $("#" + value);
            id[0].checked = false;
        });
    }

    if (dateids != undefined) {
        $.each(dateids, function (key, value) {
            var id = $("#" + value).data("kendoDatePicker");
            id.value("");
        });
    }
}

//PopUp
var CmnPopLoad = function (Request, Glurl) {
    //debugger;
    //var  JSON.parse(request);
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


$("#btnpopAlertclose").click(function(e) {
    debugger;
    $("#AlertPoptxt").text('');
    $("#DivAlertPopup").modal('hide');
});
