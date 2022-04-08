var app = angular.module('Organization_app', ['webix']);
webix.i18n.parseFormat = "%d/%m/%Y";
webix.i18n.setLocale("en-US");
var read_ORG_Data = "true";

function LoadDropDown(controller, action) {
    var ddlVal = [];
    $.ajax({
        type: "POST",
        url: "/" + controller + "/" + action,
        cache: false,
        async: false,
        charset: 'utf-8',
        data: "text=" + "",
        success: function (data) {
            if (data != null) {
                $.each(data, function (key, value) {
                    var set = { value: value.Text, id: value.Value };
                    ddlVal.push(set);
                });
            }
        }
    });
    return ddlVal;
}
function LoadOrgInfo() {
    read_ORG_Data = "true";
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/OrgInformationLoad",
        data: {},
        async: false,
        success: function (d) {
            if (d != "") {
                rowDatad = JSON.parse(d);
            }
        }
    });
    $$("OrgInfoGrid").clearAll();
    $$("OrgInfoGrid").parse(rowDatad);

    $$("OrgInfoGrid").refresh();
}
function custom_checkBox(obj, common, value) {
    if (read_ORG_Data == "true") {
        if (obj.FieldType == "Y") {
            if (obj.OrgInfoValue == "true") {
                return "<div class='webix_table_checkbox custom checked' ><input type='checkbox' checked='checked' /></div>";
            }
            else {
                return "<div class='webix_table_checkbox custom notchecked' ><input type='checkbox'/></div>";
            }
        }
        else {
            if (obj.OrgInfoValue != null && obj.OrgInfoValue != undefined && obj.OrgInfoValue != "undefined") {
                return obj.OrgInfoValue;
            }
            else {
                return "";
            }
        }
        read_ORG_Data = "false";
    }
    else {
        if (obj.FieldType == "Y") {
            if (value == 1 || value.toString().toLowerCase() == "true") {
                return "<div class='webix_table_checkbox custom checked')'><input type='checkbox' checked='checked' /></div>";
            }
            else if (value == 0 || value.toString().toLowerCase() == "false") {
                return "<div class='webix_table_checkbox custom notchecked'><input type='checkbox'/></div>";
            }
        }
        else {
            if (obj.OrgInfoValue != null && obj.OrgInfoValue != undefined && obj.OrgInfoValue != "undefined") {
                return obj.OrgInfoValue;
            }
            else {
                return "";
            }
        }
    }
}
function Country_onchange() {
    $('#CityID').val("");
    $("#CityIDD").val("");
    $('#CityNM').val("");
    $('#ZipID').val("");
    $('#CityCountryID').val("");
    $('#Reg_ID').val("");
    $("#City").val("");
    var Country = $$("CountryLoad").getValue();
    $("#CountryIDD").val(Country);
    var ind = $$("CountryLoad").getValue();
    var Textnm = $$("CountryLoad").getInputNode().innerText;
    if (Country != "") {
        $("#Country").val(Textnm);
        $.ajax({
            type: "POST",
            url: "/SalesAndMarket/Appl_City_Search",
            cache: false,
            async: false,
            charset: 'utf-8',
            data: "Country=" + Country,
            success: function (data) {
                var Area_List = LoadDropDown("SalesAndMarket", "CountrywiseAreaLoad");
                $$("AreaLoad").define("options", Area_List);
                $$("AreaLoad").refresh();
                $("#CityNameGrid").data("kendoGrid").dataSource.read();
                $("#StateDrop").data("kendoDropDownList").dataSource.read();
            },
        });
    }
}
function HDClr(value, config) {
    if (config.StatusID == "1") {
        //var element = $('tr[data-uid="' + row.uid + '"] td:nth-child(1)');
        //$(element).addClass("Greencolor");
        return "Greencolor";
    } else if (config.StatusID == "6") {
        // var element = $('tr[data-uid="' + row.uid + '"] td:nth-child(1)');
        //$(element).addClass("Greencolor");
        return "Greencolor";
    } else {
        //var element2 = $('tr[data-uid="' + row.uid + '"] td:nth-child(1)');
        //$(element2).addClass("redcolor");
        return "redcolor";
    }
}
function Load_ActivityInfo1() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/ActivityGridLoadORG",
        data: {},
        async: false,
        success: function (d) {
            if (d != "") {
                rowDatad = JSON.parse(d);
            }
        }
    });
    // $$("Activity_Grid").clearAll();
    //$$("Activity_Grid").parse(rowDatad);
    //$$("Activity_Grid").refresh();
    return rowDatad;
}


app.controller("Organization_Control", function ($scope) {
    var Area_List = LoadDropDown("SalesAndMarket", "CountrywiseAreaLoad");
    $scope.AreaLoad = {
       // view: 'richselect',
        view: 'combo',
        options: Area_List,
        id: 'AreaLoad',
        width: 253,
        value: OG_ID,
        maxHeight:1900
    };
    var Segment_List = LoadDropDown("SalesAndMarket", "SegmentLoad");
    $scope.SegmentLoad = {
        //view: 'richselect',
        view: 'combo',
        options: Segment_List,
        id: 'SegmentLoad',
        width: 220
    };
    var Source_List = LoadDropDown("SalesAndMarket", "SourceLoad");
    $scope.SourceLoad = {
        //view: 'richselect',
        view: 'combo',
        options: Source_List,
        id: 'SourceLoad',
        width: 220
    };

    var Country_List = LoadDropDown("SalesAndMarket", "Applicale_Country");
    $scope.CountryLoad = {
        //view: 'richselect',
        view: 'combo',
        options: Country_List,
        id: 'CountryLoad',
        width: 220,
        value:CID,
        on: {
            "onChange": function (newValue, oldValue) {
                Country_onchange();
            }
        }
    };
    var LOArea_List = LoadDropDown("SalesAndMarket", "CityAreaLoad");
    $scope.LOArea_Load = {
        view: "richselect",
        options:LOArea_List,
        id: 'LOArea_Load',
        width:220
    };
    
    var LOArea_List = LoadDropDown("SalesAndMarket", "CityAreaLoad");
    $scope.LOAreaLoad = {
        view: "richselect",
        options: LOArea_List,
        id: 'LOAreaLoad',
        width: 220
    };
    $scope.OrgInfoGrid = {
        id: "OrgInfoGrid",
        select: 'row',
        view: "datatable",
        checkboxRefresh: "true",
        columns: [
                { id: "OrgInfoTyNm", header: 'Information', editable: false, css: 'org_info_grid_style', fillspace: true },
                { id: "OrgInfoValue", header: 'Data', editable: true, css: 'org_info_grid_style', template: custom_checkBox, width: 200 },
                { id: "OrgInfoTyId", hidden: true },
                { id: "OrgInfoid", hidden: true },
                { id: "OrgInfoTitle", hidden: true },
                { id: "OrgInfoMaxlength", hidden: true },
                { id: "OrgInfoValueID", hidden: true },
                { id: "FieldType", hidden: true },
                { id: "ID", hidden: true }
        ],
        editable: true,
        datafetch: 10,
        loadahead: 100,
        autoConfig: true,
        url: LoadOrgInfo,
        height: 355,
        width: 600,
        scheme: {                                                                           //Sets Header color
            $change: function (item,h) {
                if (item.OrgInfoTitle == "T") {
                    item.$css = "rowColor";
                }
                if (item.OrgInfoTitle != "T") {
                    item.$css = "bgcolor_row";
                }
            }
        },
        on: {
            'onCheck': function (row, column, state) {
                read_ORG_Data = "false";
            },
            'onAfterEditStop': function (state, editor) {                                   //Numeric field check
                if (editor.column == 'OrgInfoValue') {
                    var getval = this.getItem(editor.row);
                    if (getval.FieldType == "N") {
                        if (isNaN(state.value) == false) {
                            getval.OrgInfoValue = state.value;
                        }
                        else if (isNaN(state.value) == true) {
                            getval.OrgInfoValue = "";
                        }
                    }
                    if (getval.FieldType == "T") {                                           //Loads Selected dropdown text into its corressponding text field
                        getval.OrgInfoValueID = getval.OrgInfoValue;
                        if (getval.FieldType != "") {
                            $.ajax({
                                type: "POST",
                                url: "/SalesAndMarket/OrgInfoDropdownArgs",
                                data: "INFOR_TY=" + getval.OrgInfoid,
                                async: false,
                                success: function (data) {
                                    Selected_data = data.v.filter(function (s) { return s.Value == getval.OrgInfoValueID })
                                    if (Selected_data != null || Selected_data != undefined) {
                                        if (Selected_data[0] != null || Selected_data[0] != undefined) {
                                            getval.OrgInfoValue = Selected_data[0].Text;
                                        }
                                    }
                                }
                            });
                        }
                    }
                    $$("OrgInfoGrid").refresh();
                }
            },
            'onBeforeEditStart': function (id) {                                            //Sets textbox,dropdown,checkbox,numeric text box based on condition
                var row = this.getItem(id.row);
                var col = this.getColumnConfig(id.column);
                var OrgInfoid = row.OrgInfoid;
                var OrgInfoValue = row.OrgInfoValue;
                var OrgInfoMaxlength = row.OrgInfoMaxlength;
                if (id.column == "OrgInfoValue") {                    
                    if (row.FieldType == "Y") {
                        return false;
                    }
                    else if (row.FieldType == "T") {
                        col.editor = "select";
                        col.liveEdit = true;
                        var Org_Info_data_combo = [];
                        if (row.FieldType != "") {
                            $.ajax({                                                       //Loads Dropdown
                                type: "POST",
                                url: "/SalesAndMarket/OrgInfoDropdownArgs",
                                data: "INFOR_TY=" + row.OrgInfoid,
                                async: false,
                                success: function (data) {
                                    $.each(data.v, function (key, value) {
                                        var set = { value: value.Text, id: value.Value };
                                        Org_Info_data_combo.push(set);
                                    });
                                }
                            });
                        }
                        col.collection = Org_Info_data_combo;
                    }
                    else if (row.FieldType == "C") {
                        col.editor = "text";
                    }
                    else if (row.FieldType == "D") {
                        col.editor = "date";
                        col.format = webix.Date.dateToStr("%d/%m/%Y");
                        col.stringResult = true;
                    }
                    else if (row.FieldType == "N") {
                        col.editor = "text";
                    }
                    else {
                        return false;
                    }
                }
                this.refresh();
            }
        }

    };
    
    data = Load_ActivityInfo1();
    wid_45 = ((screen.width - 100) * 0.45);
    wid_10 = ((screen.width - 100) * 0.1);
    wid_5 = ((screen.width - 100) * 0.05);
    $scope.Activity_Grid = {
        id: "Activity_Grid",
        select: "row",
        view: "datatable",
        columns: [
               { id: "R", header: ' ', css: 'Activity_Grid_style', width: wid_5, cssFormat: HDClr },
               { id: "StrDate", header: 'Date', editable: false, css: 'Activity_Grid_style', width: wid_5 },
               { id: "Time", header: 'Time', editable: false, css: 'Activity_Grid_style', width: wid_5 },
               { id: "Comments", header: 'Comments', editable: false, css: 'Activity_Grid_style', width: wid_45 },
               { id: "OrgType", header: 'Type', editable: false, css: 'Activity_Grid_style', width: wid_10 },
               { id: "ContPersonNM", header: 'Contact', editable: false, css: 'Activity_Grid_style', width: wid_10 },
               { id: "subject", header: 'Subject', editable: false, css: 'Activity_Grid_style', width: wid_10 },
               { id: "AssignedTo", header: 'Assigned To', editable: false, css: 'Activity_Grid_style', width: wid_10 },
               { id: "Status", hidden: true },
               { id: "ID", hidden: true },
               { id: "StatusID", hidden: true },
               { id: "LeadOpp", hidden: true },
               { id: "Organization", hidden: true },
               { id: "Assignedtoid", hidden: true },
               { id: "Locations", hidden: true },
               { id: "ContType", hidden: true },
               { id: "ContPersonID", hidden: true },
               { id: "PriorityId", hidden: true },
               { id: "PriorTo", hidden: true },
               { id: "AC_S_ID", hidden: true },
               { id: "AC_S_NO", hidden: true },
               { id: "AlertonDueDt", hidden: true },
               { id: "DurationTime", hidden: true },
               { id: "ToTime", hidden: true },
               { id: "Name", hidden: true },
        ],
        editable: true,
        datafetch: 10,
        loadahead: 100,
        autoConfig: true,
        data: data,
        height: 355,
        width: screen.width - 100,
        css: "webix_header_border webix_data_border",
        on: {
            "onItemDblClick": function (id, e, node) {                
                $("#SAVE_ACT_TY").val("E");                   
                $("#OPENLO").hide();
                $("#LeadoppoSearchdiv").hide();
                $("#LeadopposerImg").hide();
                $("#LeadOpp").attr("disabled", false);
                //
                document.getElementById("LeadAct").checked = false;
                document.getElementById("OppoAct").checked = false;
                document.getElementById("ToDoAct").checked = false;

                $("#proceedTY").val("");
                $("#CLODIV").hide();
                $("#DeleteActivity").removeClass("Pagefalse");
                $("#DeleteActivity").show();
                $("#closedDiv").show();
                $("#cancelDiv").show();
                // var grid = $("#ActivityGrid").data("kendoGrid");
                 var grid_data = $$("Activity_Grid").serialize();
                //var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;
                 var no = (parseInt(node.getAttribute("aria-rowindex")) - 1);
                $("#ActivityRow").val(no);
                var R = grid_data[no].R;
                var LeadOpp = grid_data[no].LeadOpp;
                var Organization = grid_data[no].Organization;
                var ORGID = $('#ORGID').val();
                var Name = grid_data[no].Name;
                var subject = grid_data[no].subject;
                var Date = grid_data[no].StrDate;
                var Time = grid_data[no].Time;
                var AssignedTo = grid_data[no].AssignedTo;
                var Status = grid_data[no].Status;
                var OrgType = grid_data[no].OrgType;
                var StatusID = grid_data[no].StatusID;
                var Assignedtoid = grid_data[no].Assignedtoid;
                var Comments = grid_data[no].Comments;
                var Locations = grid_data[no].Locations;
                var ContType = grid_data[no].ContType;
                var ContPersonID = grid_data[no].ContPersonID;
                var ContPersonNM = grid_data[no].ContPersonNM;
                var PriorityId = grid_data[no].PriorityId;
                var AC_S_ID = grid_data[no].AC_S_ID;
                var AC_S_NO = grid_data[no].AC_S_NO;
                var AlertonDueDt = grid_data[no].AlertonDueDt;
                var DurationTime = grid_data[no].DurationTime;
                var ToTime = grid_data[no].ToTime;
                var PriorTo = grid_data[no].PriorTo;

                $("#DurationTime").data("kendoDropDownList").value(DurationTime);
                $("#ToTime").data("kendoTimePicker").value(ToTime);

                if (AlertonDueDt == "1") {
                    document.getElementById("AlertonDueDt").checked = true;
                   
                    if (AG_IND == "1") {
                        document.getElementById("PriorDiv").style.visibility = "visible";
                    }
                    else {
                        document.getElementById("PriorDiv").style.visibility = "hidden";
                    }
                }
                else {
                    document.getElementById("AlertonDueDt").checked = false;
                    document.getElementById("PriorDiv").style.visibility = "hidden";
                }

                $("#PriorTo").data("kendoDropDownList").value(PriorTo);
                if (R == "RG") {
                    $("#OrganizationActivity").val(Organization);
                }
                else {
                    $("#OrganizationActivity").val(Name);
                }

                $("#subject").val(subject);
                $("#AssignedTo").data("kendoDropDownList").value(Assignedtoid);
                $("#Status").data("kendoDropDownList").value(StatusID);
                $("#Typeload").data("kendoDropDownList").value(ContType);
                $("#Priority").data("kendoDropDownList").value(PriorityId);
                $("#Date").data("kendoDatePicker").value(Date);
                $("#Time").val(Time);
                $("#ContCompanyNm").val(ContPersonID);
                $("#Comments").val(Comments);
                $("#ContCompanyNm").data("kendoDropDownList").value(ContPersonID);
                $("#Activity_S_ID").val(AC_S_ID);
                $("#Activity_S_NO").val(AC_S_NO);
                $("#LeadOpprtunityID").val(AC_S_ID);


                $("#Locations").val(Locations);
                $("#ActivityType").data("kendoDropDownList").value(R);
                $("#ActivityType").data("kendoDropDownList").enable(false);
                if (StatusID == "7") {
                    $("#OkActivity").show();
                    $("#activityActive").addClass("Pagefalse");
                    $("#closedDiv").hide();
                    $("#cancelDiv").hide();
                    document.getElementById('AddActivityclosemode').style.visibility = 'visible';
                } else {
                    $("#OkActivity").show();
                    $("#activityActive").removeClass("Pagefalse");
                    document.getElementById('AddActivityclosemode').style.visibility = 'Hidden';
                }
                document.getElementById("ClosedActivity").checked = false;
                document.getElementById("CanceledActivity").checked = false;
                var Individual = "2";
                $.ajax({
                    type: "POST",
                    url: "/SalesAndMarket/OrganaizationID",
                    data: "orgId=" + ORGID + "&Organization=" + Organization + "&Individual=" + Individual,
                    success: function (data) {
                        $("#ContCompanyNm").data("kendoDropDownList").dataSource.read();
                        $("#cMobId").text("");
                        $("#cEmilId").text("");
                        if (data != null && data != "" && data != undefined) {
                            var dtval = JSON.parse(data.v);
                            if (dtval.Mob != "" && dtval.Mob != null)
                                $("#cMobId").text("[M: " + dtval.Mob + "]");
                            if (dtval.Email != "" && dtval.Email != null)
                                $("#cEmilId").text("[E: " + dtval.Email + "]");
                        }
                    }
                });
                var window = $("#ActivityLoad");
                var kWnd = window.data("kendoWindow");
                kWnd.setOptions({
                    title: "Activity - Open",
                    color: "white"
                });
                kWnd.refresh();
                kWnd.center().open();
            }

        }
    }
});
