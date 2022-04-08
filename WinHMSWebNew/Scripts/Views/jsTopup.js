$(document).ready(function () {
    debugger;
    
    /*Global Variables of this Project*/
    window.Prop_Id = "";
    /*Global Variables of this Project*/
   // @Html.Raw(Json.Encode(ViewBag.USER))
    //Property Dropdown Load
    //var com = @Html.Raw(@ViewBag.COMPID);
    //alert(COMPID);
    
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


