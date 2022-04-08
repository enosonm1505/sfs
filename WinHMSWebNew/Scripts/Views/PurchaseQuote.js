$(document).ready(function () {
     debugger;
    /*Global Variables of this Project*/
    window.Prop_Id = "";
    /*Global Variables of this Project*/

    //Property Dropdown Load
    var COMPID = $("#COMPID").val();  
    var Table = {};
    Table["REQTYPE"] = "PROPERTY";
    Table["COMPID"] = COMPID;
    var ParamVal = JSON.stringify(Table);
    $.ajax({
       async: false,
        type: "POST",
        url: "/PurchaseQuote/API_CALL", 
        data: "request=" + ParamVal,      
        success: function (data) {
            debugger;
            var ddlcomp = JSON.parse(data);
            $("#divPropbox").kendoDropDownList({ dataTextField: "COMPANY_NM", dataValueField: "COMPANY_ID", dataSource: ddlcomp, height: 100 });            
            $("#divPropbox").data("kendoDropDownList").value(COMPID);
        }       
    });

    var OnchangeProp = function () {
        debugger;
        var dropdowlist = $("#divPropbox").data("kendoDropDownList");
        Prop_Id = dropdowlist.value();

        if ($.trim(Prop_Id) != "") {
            $("#divTheme").removeClass("pagefalse");
            DropdownCall(Request, pageurl, $.trim(Prop_Id)); //Request, pageurl, Prop_Id Given Id is the Window Variables of this Project   
        }
        else {
            $("#divTheme").addClass("pagefalse");
        }
    }

});


