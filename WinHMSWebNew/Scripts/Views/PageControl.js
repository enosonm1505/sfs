//$(function () {
//    document.onreadystatechange = function () {        
//        var state = document.readyState;
//        if (state == "interactive") {
//            $('.themedes').hide();
//        }
//        else if (state == "complete") {
//            setTimeout(function () {
//                $("#loading").hide();
//                $('.themedes').show();
//            }, 5000)
//        }
//    }

//    $('[data-toggle="popover"]').popover({ html: true, placement: 'auto' });

//    $(".pop").popover({ trigger: "manual", html: true, animation: false, placement:'auto' })
//    .on("mouseenter", function () {
//        debugger;
//        var _this = this;
//        $(this).popover("show");
//        $(".popover").on("mouseleave", function ()
//        {
//            $(_this).popover("hide");
//        }).on("mouseleave", function () {
//            var _this = this;
//            setTimeout(function () {
//                if (!$(".popover:hover").length) {
//                    $(_this).popover("hide");
//                }
//            }, 300);
//        })
//    }).on("mouseleave", function () {
//        debugger;
//        var _this = this;
//        setTimeout(function () {
//            if (!$(".popover:hover").length) {
//                $(_this).popover("hide");
//            }
//        }, 300);
//    })
//})



var ControlCall = function (request, Glurl, prop_id) {
    debugger;
    var ddlids = [];
    var modddlids = [];
    var PromptIds = [];
    var hiddenddl = [];
    /*Get All Drop Down input Div From Html Elements */
    $.unique($(".themedes").find("div[id^=ddl]")).each(function () {
        ddlids.push(this.id);
    });
    
    $.unique($(".themedes").find("input[id^=ddl]")).each(function () {
        ddlids.push(this.id);
        hiddenddl.push(this.id);
    });

    /*Get All Prompt input From Html Elements */
    $.unique($(".themedes").find("button[custom='prompt']")).each(function () {
        var $this = $(this);
        $this = $this["0"].attributes["modal"].value;
        PromptIds.push($this);
    });

    /*Get All Time input From Html Elements */
    $.unique($(".themedes").find("input[id^=time]")).each(function () {
        $("#" + this.id).kendoMaskedTextBox({ mask: "00:00" });
    });

    /*Get All Date input From Html Elements */
    $.unique($(".themedes").find("input[id^=date]")).each(function (e) {        
        var $this = $(this);
        $this = $this["0"].attributes["custom"].value;       
        if ($this == "dateTime") $("#" + this.id).kendoDateTimePicker({ dateInput: true });
        else $("#" + this.id).kendoDatePicker({ format: "{0: dd/MM/yyyy}" });
    });

    //$.unique($(".themedes").find("input[id^=TimeDate]")).each(function () {
    //    $("#" + this.id).kendoDateTimePicker({
    //        dateInput: true
    //    });
    //});
    
    var obj = {};
    var dataparam = JSON.parse(request);
    dataparam["COMPID"] = prop_id;
    dataparam["REQTYPE"] = "DROP_DOWNS";
    dataparam["DROP_VALUES"] = ddlids;
    dataparam["PROMPT_VALUES"] = PromptIds;
    // dataparam = JSON.stringify(dataparam);
    obj.request = dataparam;
    $.ajax({
        async: false,
        url: Glurl + "api/FOAPI",
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        data: JSON.stringify(dataparam),
        success: function (data) {            
            var controlData = JSON.parse(data);
            window.Dropdownlist = controlData.DropDown;
            window.prompts = controlData.Prompts;
            $.each(Dropdownlist, function (key, value) {
                var elelm = $("#" + key)["0"].attributes.for;

                if (elelm === undefined) {
                    if (key == "ddltitle") {
                        debugger;
                        $("#" + key).kendoDropDownList({ dataTextField: "ITEM_NM", dataValueField: "ITEM_VAL", dataSource: value, height: 100, optionLabel: "Title...", open: adjustDropDownWidth });
                        var title =$("#ddltitle").data('kendoDropDownList');
                        title.wrapper.hide();
                    }

                    else {
                        $("#" + key).kendoDropDownList({ dataTextField: "ITEM_NM", dataValueField: "ITEM_VAL", dataSource: value, optionLabel: "Select..." });
                    }
                }
                else {
                    $("#" + key).kendoDropDownList({ dataTextField: "ITEM_NM", dataValueField: "ITEM_VAL", dataSource: value, optionLabel: "Select..." });
                }
            });
            DropdownHeight(ddlids);
            DropDownHidde(hiddenddl);
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}

var DropDownHidde = function (hiddenddl) {
    debugger
    $.each(hiddenddl, function (key, value) {
        $("span[aria-owns='" + value + "_listbox']").css("display", "none");
    });
};


var adjustDropDownWidth = function (e) {
    var listenobject = e.sender.list.closest('.k-list-container');
    listenobject.width(listenobject.width() + kendo.support.scrollbar());
}


var DropdownHeight = function (ddllist) {    
    $.each(ddllist, function (key, value) {
        var elelm = $("#" + value)["0"].attributes.for;

        if (elelm === undefined)
        {
            var dropdown = $("#" + value).data("kendoDropDownList");
            var span = dropdown.span;
            var spansipling = span["0"].nextSibling;
            span.css("height", "15px");
            spansipling.style.margin = "-2px 0px 0px 0px";
        }
    });
}


var GetdayName = function(datestr)
{
    debugger;
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = new Date(datestr);
    var dayname = day[d.getDay()];
    return dayname;
}


var IsNumberKey = function (evt) {
    var charcode = (evt.which) ? evt.which : event.keyCode;
    if (charcode > 31 && (charcode < 48 || charcode > 57))
        return false;
    return true;
}


$.extend({
    disitinctObj: function(obj, propertyName)
    {
        var result = [];
        $.each(obj, function (i, v) {
            var prop = eval("v." + propertyName);
            if ($.inArray(prop, result) == -1) result.push(prop);
        })
        return result;
    }
})


