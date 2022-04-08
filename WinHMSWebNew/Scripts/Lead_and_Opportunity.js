var app = angular.module('LeadOpportunity_app', ['webix']);


app.controller("LeadOpportunity_Control", function ($scope) {
    var LOArea_List = LoadDropDown("SalesAndMarket", "CityAreaLoad");
    $scope.LOArea_Load = {
        //view: "richselect",
        view: 'combo',
        options: LOArea_List,
        id: 'LOArea_Load',
        width: 205

    };
    var Source_List = LoadDropDown("SalesAndMarket", "SourceLoad");
    $scope.SourceLoad = {
        //view: 'richselect',
        view: 'combo',
        options: Source_List,
        id: 'SourceLoad',
        width: 230
    };
    var Stage_List = LoadDropDown("SalesAndMarket", "StageLoad");
    $scope.Stage_Load = {
        //  view: 'richselect',
            view: 'combo',
            options: Stage_List,
            id: 'Stage_Load',
            width: 120,
        on: {
            "onChange": function (newValue, oldValue) {
                Stage_Onchange();
            }

        }
    };
    var PriorityLead_List = LoadDropDown("SalesAndMarket", "LeadPriorityLoad");
    $scope.PriorityLead_Load = {
        view: 'richselect',
        options: PriorityLead_List,
        id: 'PriorityLead_Load',
        width: 85
    };

    var DefaultPropertyList = LoadDropDown("SalesAndMarket", "DefaultProperty");
    $scope.DefaultProperty_Load = {
        // view: 'richselect',
        view: 'combo',
        options: DefaultPropertyList,
        id: 'DefaultProperty_Load',
        width: 200,
        click: function (id, event) {
            $("#QuoteGenerateGrid").data("kendoGrid").dataSource.data([]);
            $("#FBWSGenerateGrid").data("kendoGrid").dataSource.data([]);
            $("#BanqWSGenerateGrid").data("kendoGrid").dataSource.data([]);

            $("#OtherCharges").data("kendoGrid").dataSource.data([]);
            $("#OtherChargesHidden").data("kendoGrid").dataSource.data([]);
        }
    };
    var Assigned_List = LoadDropDown("SalesAndMarket", "AssignedToLoad");
    $scope.Assigned_Load = {
        // view: 'richselect',
        view: 'combo',
        options: Assigned_List,
        id: 'Assigned_Load',
        width: 230,
        on: {
            "onChange": function (newValue, oldValue) {
                Assigned_change();
            }

        }
    };
    wid_45 = ((screen.width - 100) * 0.45);
    wid_10 = ((screen.width - 100) * 0.1);
    wid_5 = ((screen.width - 100) * 0.05);
    $scope.Activity_Grid = {
        id: "Activity_Grid",
        select: "row",
        view: "datatable",
        columns: [
               { id: "R", header: ' ', css: 'Activity_Grid_style', width: wid_5, cssFormat: HDClr },
               { id: "StrDate", header: 'Date', css: 'Activity_Grid_style', width: wid_5 },
               { id: "Time", header: 'Time', css: 'Activity_Grid_style', width: wid_5 },
               { id: "Comments", header: 'Comments', css: 'Activity_Grid_style', width: wid_45 },
               { id: "OrgType", header: 'Type', css: 'Activity_Grid_style', width: wid_10 },
               { id: "ContPersonNM", header: 'Contact', css: 'Activity_Grid_style', width: wid_10 },
               { id: "subject", header: 'Subject', css: 'Activity_Grid_style', width: wid_10 },
               { id: "AssignedTo", header: 'Assigned To', css: 'Activity_Grid_style', width: wid_10 },
               { id: "Status", hidden: true },
               { id: "LeadOpp", hidden: true },
               { id: "Organization", hidden: true },
               { id: "ID", hidden: true },
               { id: "StatusID", hidden: true },
               { id: "Assignedtoid", hidden: true },
               { id: "hdnComments", hidden: true },
               { id: "Locations", hidden: true },
               { id: "ContType", hidden: true },
               { id: "ContPersonID", hidden: true },
               { id: "PriorityId", hidden: true },
               { id: "hdnContPersonNM", hidden: true },
               { id: "AC_S_ID", hidden: true },
               { id: "AC_S_NO", hidden: true },
               { id: "AlertonDueDt", hidden: true },
               { id: "PriorTo", hidden: true },
               { id: "DurationTime", hidden: true },
               { id: "ToTime", hidden: true },
               { id: "Activeind", hidden: true },
               { id: "OrganizationId", hidden: true }
        ],
        datafetch: 10,
        loadahead: 100,
        autoconfig: true,
        url: Load_ActivityInfo,
        height: 330,
        width: screen.width - 100,
        css: "webix_header_border webix_data_border",
        on: {
            "onItemDblClick": function (id, e, node) {

                document.getElementById("LeadAct").checked = false;
                document.getElementById("OppoAct").checked = false;
                document.getElementById("ToDoAct").checked = false;
                $("#SAVE_ACT_TY").val("E");
                $("#proceedTY").val("");
                $("#DeleteActivity").removeClass("Pagefalse");
                $("#DeleteActivity").show();
                var LeadOppPageID = $("#LeadOppPageID").val();
                var BTN_TYPE = $("#BTN_TYPE").val();
                if (BTN_TYPE == "NEW") {
                    $("#closedDiv").hide();
                    $("#cancelDiv").hide();
                }
                else {
                    $("#closedDiv").show();
                    $("#cancelDiv").show();
                }
                $("#closedDiv").show();

                $("#ClosedActivity").attr("Checked", false);
                //var grid = $("#ActivityGrid").data("kendoGrid");
                var grid_data = $$("Activity_Grid").serialize();
                // var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;
                var no = (parseInt(node.getAttribute("aria-rowindex")) - 1);
                $("#ActivityRow").val(no);
                var R = grid_data[no].R;
                var LeadOpp = grid_data[no].LeadOpp;
                var Organization = grid_data[no].Organization;
                var OrganizationId = grid_data[no].OrganizationId;

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
                var PriorTo = grid_data[no].PriorTo;
                var AlertonDueDt = grid_data[no].AlertonDueDt;
                var Activeind = grid_data[no].Activeind;


                if (AlertonDueDt == "1") {
                    document.getElementById("AlertonDueDt").checked = true;
                    //var AG_IND = '<%=Session["AG_IND"]%>';
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

                var DurationTime = grid_data[no].DurationTime;
                var ToTime = grid_data[no].ToTime;
                $("#DurationTime").data("kendoDropDownList").value(DurationTime);
                $("#ToTime").data("kendoTimePicker").value(ToTime);
                $("#OrganizationActivity").val(LeadOpp);
                $("#subject").val(subject);
                $("#AssignedTo").data("kendoDropDownList").value(Assignedtoid);
                $("#Status").data("kendoDropDownList").value(StatusID);
                $("#Typeload").data("kendoDropDownList").value(ContType);
                $("#Priority").data("kendoDropDownList").value(PriorityId);
                $("#Date").data("kendoDatePicker").value(Date);

                var ORGID = $("#ORGID").val();
                $("#Time").val(Time);
                $("#Comments").val(Comments);
                var Individual = "2";
                if (Activeind == "1") {
                    Individual = "1";
                }
                $.ajax({
                    type: "POST",
                    url: "/SalesAndMarket/ORG_ContactPerson",
                    data: "orgId=" + ORGID + "&Individual=" + Individual,
                    async: false,
                    success: function (data) {
                        $("#ContCompanyNm").data("kendoDropDownList").dataSource.data(data);
                        $("#ContCompanyNm").data("kendoDropDownList").value(ContPersonID);
                        $("#ContCompanyNm").data("kendoDropDownList").text(ContPersonNM);
                    }
                });
                //if (AC_S_ID == "" || AC_S_ID==null || AC_S_ID==undefined)
                //    AC_S_ID = $("#LeadOpprtunityID").val();
                $("#Activity_S_ID").val(AC_S_ID);
                $("#Activity_S_NO").val(AC_S_NO);
                $("#Locations").val(Locations);
                //$("#LeadOpprtunityID").val(AC_S_ID);
                if (LeadOppPageID == "1") {
                    $("#ActivityType").data("kendoDropDownList").value("L");
                }
                else {
                    $("#ActivityType").data("kendoDropDownList").value("O");
                }

                $("#ActivityType").data("kendoDropDownList").enable(false);

                document.getElementById("ClosedActivity").checked = false;
                document.getElementById("CanceledActivity").checked = false;

                if (StatusID == "7") {
                    $("#OkActivity").show();
                    $("#activityActive").addClass("Pagefalse");
                    $("#closedDiv").hide();
                    $("#cancelDiv").hide();
                    $("#Status").data("kendoDropDownList").value("7");
                    document.getElementById("ClosedActivity").checked = true;
                    document.getElementById('AddActivityclosemode').style.visibility = 'visible';
                } else {
                    $("#closedDiv").show();
                    $("#OkActivity").show();
                    $("#activityActive").removeClass("Pagefalse");
                    document.getElementById("ClosedActivity").checked = false;
                    document.getElementById('AddActivityclosemode').style.visibility = 'Hidden';
                }

                if (LeadOppPageID == "4") {
                    $("#OkActivity").hide();
                    $("#activityActive").removeClass("Pagefalse");
                    $("#activityActive").addClass("DivFalse");
                }
                document.getElementById('Savenew').style.visibility = 'Hidden';



                var Individual = "2";
                if ($("#Individual")[0].checked == true) Individual = "1";
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
                            if (dtval.Mob != "")
                                $("#cMobId").text("[M: " + dtval.Mob + "]");
                            if (dtval.Email != "")
                                $("#cEmilId").text("[E: " + dtval.Email + "]");
                        }
                    }
                });

                if (AC_S_ID == "")
                    $("#closedDiv").hide();
                else
                    $("#closedDiv").show();

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
    wid_25 = ((screen.width - 100) * 0.25);
    wid_10 = ((screen.width - 100) * 0.1);
    $scope.Product_Grid = {
        id: "Product_Grid",
        select: "row",
        view: "datatable",
        scheme: {
            $init: function (row) {
                row.CalcValue = (row.CalcValue == "" || row.CalcValue == null || row.CalcValue == undefined ? "" : parseFloat(row.CalcValue).toFixed(2));
            }
        },
        columns: [
               { id: "ProductType", header: 'Product', css: 'Product_Grid_style', width: wid_25 },
               { id: "ProdtTy", header: 'Type', footer: "Total:", css: 'Product_Grid_style', width: wid_25 },
               { id: "ProductValue", header: 'Value', footer: { content: 'summColumn' }, css: 'Product_Grid_style_right', width: wid_10, format: "1.00", editor: "text" },
               { id: "ProductQty", header: 'Units', /*footer: { content: 'summColumn' },*/ css: 'Product_Grid_style_right', width: wid_10, hidden: IsAdmin, editor: "text" },
               { id: "CalcTY", header: '', css: 'Product_Grid_style1', width: wid_10, hidden: IsWorksheet },
               { id: "CalcValue", header: ' ', css: 'Product_Grid_style1', width: wid_10, format: "1.00", hidden: IsWorksheet },
               { id: "Select", header: '', css: 'Product_Grid_style2', width: wid_10, template: "W", hidden: IsWorksheet, cssFormat: backGroundChange },
               { id: "ProductTypeId", hidden: true },
               { id: "ProdtTyId", hidden: true },
               { id: "ProdtInd", hidden: true },
               { id: "UnitTyID", hidden: true },
               { id: "ID", hidden: true },
               { id: "setSelectColor", hidden: true },
        {id:"exist",hidden:true}
        ],
        editable: true,
        footer: true,
        datafetch: 10,
        loadahead: 100,
        autoconfig: true,
        url: Load_ProductInfo,
        height: 300,
        width: screen.width - 100,
        css: "webix_header_border webix_data_border webix_footer_border",
        on: {
            "onItemDblClick": function (id, e, node) {
                var grid = $$("Product_Grid").serialize(); //$("#ProductGrid").data("kendoGrid");
                var rowIndex = (parseInt(node.getAttribute("aria-rowindex")) - 1);//grid.selectable.userEvents.currentTarget.rowIndex;
                $("#ProductGridRow").val(rowIndex);
                var Cellindx = (parseInt(node.getAttribute("aria-colindex")) - 1);//grid._current[0].cellIndex;
                if (Cellindx == "4") {
                    var CalcTY = grid[rowIndex].CalcTY;
                    if (CalcTY != "" && CalcTY != null && CalcTY != undefined) {
                        var QtyArrAmount = grid[rowIndex].ProductValue;
                        var QtyArrCal = grid[rowIndex].ProductQty;
                        var QtyArrValues = grid[rowIndex].CalcValue;
                        $("#CaptionCalc").text(CalcTY);
                        if (QtyArrCal == "" || QtyArrCal == null || QtyArrCal == undefined) QtyArrCal = "0";
                        else QtyArrCal = QtyArrCal.toString().replace(/,/g, '');
                        if (QtyArrValues == "" || QtyArrValues == null || QtyArrValues == undefined) QtyArrValues = "0";
                        else QtyArrValues = QtyArrValues.toString().replace(/,/g, '');
                        if (QtyArrAmount == "" || QtyArrAmount == null || QtyArrAmount == undefined) QtyArrAmount = "0";
                        else QtyArrAmount = QtyArrAmount.toString().replace(/,/g, '');

                        if (CalcTY.trim() == "ARR") {
                            $("#QtyCap").text("Nights");
                        }
                        else {
                            $("#QtyCap").text("Pax");
                        }

                        $("#QtyArrAmount").val(QtyArrAmount);
                        $("#QtyArrCal").val(QtyArrCal);
                        $("#QtyArrValues").val(parseFloat(QtyArrValues).toFixed(2));

                        var window = $("#ARRandAPC_CalculatePopup");
                        var kWnd = window.data("kendoWindow");
                        kWnd.center().open();
                    }
                }
            },
            "onBeforeEditStart": function (cell) {
                if (cell.column == "ProductQty") {
                    row = this.getItem(cell.row);
                    if (row.ProdtInd == "1") {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            },
            "onAfterEditStop": function (state, editor, ignoreUpdate) {
                if (editor.column == "ProductQty" || editor.column == "ProductValue") {
                    var tot = $$("Product_Grid").getFooterNode("ProductValue").innerText;
                    if (tot != "" && tot != null && tot != undefined) {
                        $("#ProjectionValue").val(Comma(Number(tot.toString().replace(/,/g, '')).toFixed(2)));
                    }
                }
            },
            "onEditorChange": function (cell, value) {
                //productTotalCalculation(Prev_view);
                //unitARRCalc(Prev_view);
                if (cell.column == "ProductQty" || cell.column == "ProductValue") {
                    var Values;
                    var Units;
                    if (cell.column == "ProductQty") {
                        Values = this.getItem(cell.row).ProductValue;
                        Units = value;
                    }
                    else if (cell.column == "ProductValue") {
                        Values = value;
                        Units = this.getItem(cell.row).ProductQty;
                    }
                    var CalcValue = 0;
                    if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                        Values = Values.toString().replace(/,/g, '');
                        if (Units != "" && Units != undefined && Units != null && Units != "0") {
                            CalcValue = parseFloat(Number(Values) / Number(Units)).toFixed(2);
                        }
                    }
                    this.getItem(cell.row).CalcValue = CalcValue;
                    this.refresh(cell.row);
                }

            },
            "onItemClick": function (id, e, node) {
                //var C10_IND = '<%=Session["C10_IND"]%>';
                //var D10_IND = '<%=Session["D10_IND"]%>';
                //var E10_IND = '<%=Session["E10_IND"]%>';
                //var F10_IND = '<%=Session["F10_IND"]%>';
                if (C10_IND == "3" || C10_IND == "4") $("#QUOTE_ID_GUEST").show();
                else $("#QUOTE_ID_GUEST").hide();

                if (F10_IND == "1") $("#OTHER_CHRG").show();
                else $("#OTHER_CHRG").hide();

                if (C10_IND == "4") $("#Booking_NO").show();
                else $("#Booking_NO").hide();

                var grid = $$("Product_Grid").serialize();// $("#ProductGrid").data("kendoGrid");
                var rowIndex = (parseInt(node.getAttribute("aria-rowindex")) - 1);//grid.selectable.userEvents.currentTarget.rowIndex;
                // var dataSource = grid.dataSource;
                var total = grid.length;
                var ProductTypeId = grid[rowIndex].ProductTypeId;
                var UnitTyID = grid[rowIndex].UnitTyID;
                $("#ProductGridRow").val(rowIndex);
                var Cellindx = (parseInt(node.getAttribute("aria-colindex")) - 1);;
                if (Cellindx == "6") {
                    if (ProductTypeId != "") {
                        $.ajax({
                            type: "POST",
                            url: "/SalesAndMarket/LoadQuoteGeneration",
                            cache: false,
                            async: false,
                            charset: 'utf-8',
                            data: "SID=" + Lead_id,
                            success: function (data) {
                                if (data != "") {
                                    DatVal = JSON.parse(data);
                                    f_and_b_grid = DatVal.FBWorkSheet;
                                    Banq_grid = DatVal.BQWorkSheet;
                                    quote_generate_grid = DatVal.FoWorkSheet;
                                    other_charges_grid = DatVal.Othercharges;
                                }
                                else {
                                    f_and_b_grid = [];
                                    Banq_grid =[];
                                    quote_generate_grid = [];
                                    other_charges_grid = [];
                                }
                                    Product_Id = ProductTypeId;
                                    unit_type_id = UnitTyID;
                                    load_QuoteGenerateGrid(ProductTypeId, UnitTyID);
                                    load_BanqWSGenerateGrid(ProductTypeId, UnitTyID);
                                    load_FBWSGenerateGrid(ProductTypeId, UnitTyID);
                                    load_OtherChargesHidden(ProductTypeId, UnitTyID);
                                    first_exe_of_bq = false;
                                    first_exe_of_other = false;
                                    first_exe_of_fb = false;
                                    first_exe_of_quote = false;
                            }
                        });
                        $("#ProductTypeId").val(ProductTypeId);
                        $("#UnitTyID").val(UnitTyID);
                        if (UnitTyID == "1") {
                            if (C10_IND != "") {
                                if (C10_IND != "1") {
                                    $("#ProgressPropertydiv").show();
                                    QuoteGenerate();
                                }
                                else {
                                    OffLineQuoteGenerate();
                                }
                            }
                            else {
                                $("#AlertMessageHdn").val(" FO Work Sheet Not Appicable.");
                                $("#alertType").val('fail');
                                AlertMesaage();
                            }
                        }
                        else if (UnitTyID == "2") {
                            if (D10_IND != "") {
                                BanquetWorkSheet(e);
                            }
                            else {
                                $("#AlertMessageHdn").val(" Banquet Work Sheet Not Appicable.");
                                $("#alertType").val('fail');
                                AlertMesaage();
                            }
                        }
                        else if (UnitTyID == "3") {
                            if (E10_IND != "") {
                                FandBWorkSheet(e);
                            }
                            else {
                                $("#AlertMessageHdn").val(" F&B Work Sheet Not Appicable.");
                                $("#alertType").val('fail');
                                AlertMesaage();
                            }
                        }
                    }
                    else {
                        $("#AlertMessageHdn").val(" Select any one Product. ");
                        $("#alertType").val('fail');
                        AlertMesaage();
                    }
                }

            }
        }
    }


});


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
function Stage_Onchange() {
    //var OPP_LEAD_STG = '<%=Session["OPP_LEAD_STG"]%>';
    //var Stage = $("#Stage").val();
    var Stage = $$("Stage_Load").getValue();
    //  if (Stage == "") Stage = $("#Stage").data("kendoDropDownList").value();
    if (Stage == "") Stage = OPP_LEAD_STG;
    //var LeadOppPageID = '<%=Session["LeadOppPageID"]%>';

    var Convert = $("#Convert").val();

    if (LeadOppPageID == "2" || LeadOppPageID == "5" || Convert == "1") {
        if (Stage != "") {
            $.ajax({
                type: "POST",
                url: "/SalesAndMarket/StageSTS_Load",
                data: "Stage=" + Stage,
                async: false,
                success: function (data) {
                    $("#CUR_STAGE_STS").val(data.v);
                    $("#Probability").val(data.w);
                    if (data.v == "5") {
                        $("#WONCOMDIV").show();
                        $("#LOSTCOMDIV").hide();
                    }
                    else if (data.v == "8") {
                        $("#WONCOMDIV").hide();
                        $("#LOSTCOMDIV").show();
                    }
                    else {
                        $("#WONCOMDIV").hide();
                        $("#LOSTCOMDIV").hide();
                    }
                }
            });

        }
    }

    //var AA_IND = '<%=Session["AA_IND"]%>';
    //var BB_IND = '<%=Session["BB_IND"]%>';
    if (BB_IND == "2") $("#WONAMTODIV").hide();
}
function openmodeButtonhideshow(val) {
    if (val == 1) {
        $("#New").hide();
        $("#Open").hide();
        $("#Refresh").hide();
        $("#leadoppoSearch").hide();
        $("#LeadNmAmend").hide();
    }
    else {
        $("#New").show();
        $("#Open").show();
        $("#Refresh").show();
    }

}
function ToDoCovertDataLoad() {
    $("#BTN_TYPE").val("NEW");
    $("#TRN").removeClass("Pagefalse");
    var buttonObject1 = $("#Open").kendoButton().data("kendoButton");
    buttonObject1.enable(false);
    $("#New").attr("style", "border-style:solid;border-width:thin;border-color: blue;"); //Added by Jagadeesh on 25th Mar 2017
    $("#Open").attr("style", "color:gray;"); //Added by Jagadeesh on 25th Mar 2017
    $("#Organization").attr("disabled", true);
    $("#LeadOpprtunity").attr("disabled", false);
    $("#NewOrg").show();
    $("#OrgSearch").show();
    $("#Convert").hide();
    $("#orgsrch").hide();
    $("#Individual").attr("disabled", false);
    var tabStrip = $("#tabstrip").data("kendoTabStrip");
    tabStrip.select(0);
    $("#leadoppoSearch").addClass("Pagefalse");
    document.getElementById('leadoppoSearchDiv').style.visibility = 'Hidden';
    document.getElementById('leadoppoAmend').style.visibility = 'Hidden';

    //var Sid = '<%=Session["ToDoCovert"]%>';
    if (Sid != "") {
        $.ajax({
            type: "POST",
            url: "/SalesAndMarket/ToDoCovertDataLoad",
            data: "Sid=" + Sid,
            async: false,
            success: function (data) {
                var LeadOpprtunity = data.v.LeadOpprtunity;
                var Leadid = data.v.Leadid;
                var ActivityType = data.v.ActivityType;
                var PriorityId = data.v.PriorityId;
                var DueDate = data.v.DueDate;
                var StrDate = data.v.StrDate;
                var Time = data.v.Time;
                var Assignedtoid = data.v.Assignedtoid;
                var AssignedTo = data.v.AssignedTo;
                var Area = data.v.Area;
                var Locations = data.v.Locations;
                var Comments = data.v.Comments;
                var subject = data.v.subject;
                var StatusID = data.v.StatusID;

                var OrganizationId = data.v.OrganizationId;
                var Organization = data.v.Organization;

                var Status = data.v.Status;

                $("#Organization").val(Organization);
                $("#ORGID").val(OrganizationId);

                $("#LeadOpprtunity").val(LeadOpprtunity);
                
                $("#LeadOpprtunityID").val(Leadid);
                //$("#LOArea").data("kendoDropDownList").value(Area);
                $$("LOArea_Load").setValue(Area);
                //$("#Assigned").data("kendoDropDownList").value(Assignedtoid);
                $$("Assigned_Load").blockEvent();
                $$("Assigned_Load").setValue(Assignedtoid);
                $$("Assigned_Load").unblockEvent();
                $("#DueDate").data("kendoDatePicker").value(DueDate);

                //var ActivityGrid = $("#ActivityGrid").data("kendoGrid");
                //ActivityGrid.dataSource.add({
                $$("Activity_Grid").add({
                    R: "L",
                    LeadOpp: LeadOpprtunity,
                    subject: subject,
                    StrDate: StrDate,
                    Time: Time,
                    AssignedTo: AssignedTo,
                    Status: Status,
                    StatusID: StatusID,
                    Assignedtoid: Assignedtoid,
                    Comments: Comments,
                    Locations: Locations,
                    PriorityId: PriorityId,
                    ContType: ActivityType,
                    ContPersonID: "0"
                });

                var addrow = { USER_NM: Assignedtoid, PER: 100, HDN: 1 };
                $$("SecAssigned").add(addrow);
                $$("SecAssigned").refresh();

            }
        });
    }
}
function Assigned_change() {
    var BTN_TYPE = $("#BTN_TYPE").val();
    if (BTN_TYPE == "NEW") {
        //var SALE_PER_ID = '<%=Session["SALE_PER_ID"]%>';
        var AssignedtoVal = $$("Assigned_Load").getValue();// $("#Assigned").data('kendoDropDownList').value();
        //var AAA_IND = '<%=Session["AAA_IND"]%>';
        if (AAA_IND == "1") {
            if (AssignedtoVal != SALE_PER_ID) {
                $("#EMAILDIV").show();
            }
            else {
                $("#EMAILDIV").hide();
            }
        }
        else {
            $("#EMAILDIV").hide();
        }
    }

    var valueSales = $$("Assigned_Load").getValue();// this.value;
    var data = $$("SecAssigned").serialize();
    var addrow = { USER_NM: $$("Assigned_Load").getValue()/*this.value*/, PER: 100, HDN: 1 };
    if (data.length > 0) {
        $.each(data, function (key, value) {
            if (key == 0) {
                value.USER_NM = valueSales;
                value.HDN = 1;
            }
        });
    }
    else {
        $$("SecAssigned").add(addrow);
    }
    $$("SecAssigned").refresh();
}
function Load_ActivityInfo() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/LeadActivityGridLoad",
        data: {},
        async: false,
        success: function (d) {
            if (d != "") {
                rowDatad = JSON.parse(d);
            }
        }
    });
    $$("Activity_Grid").clearAll();
    $$("Activity_Grid").parse(rowDatad);
    $$("Activity_Grid").refresh();
}
function Load_ProductInfo() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/ProductGridLoad",
        data: {},
        async: false,
        success: function (d) {
            if (d != "") {
                rowDatad = JSON.parse(d);
            }
        }
    });
    $$("Product_Grid").clearAll();
    $$("Product_Grid").parse(rowDatad);
    $$("Product_Grid").refresh();
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
function backGroundChange(value, config) {
    if (config.setSelectColor == "yellow") {
        config.setSelectColor = "";
        return { "background-color": "#ffd800 !important" };
    }
}
function LeadOpen() {
    $("#BTN_TYPE").val("OPEN");
    $("#TRN").removeClass("Pagefalse");
    //$("#Stage").data('kendoDropDownList').value(LEAD_STG);
    $$("Stage_Load").setValue(LEAD_STG);
    //var OpenId = '<%=Session["OpenId"]%>';
    $("#OpenId").val(Open_Id);
    $("#leadopponm").text("Lead");
    $("#leadoppolabel").text("Lead");
    var buttonObject1 = $("#Save").kendoButton().data("kendoButton");
    buttonObject1.enable(true);
    //var LeadOppPageID = '<%=Session["LeadOppPageID"]%>';
    var buttonObject1 = $("#New").kendoButton().data("kendoButton");
    buttonObject1.enable(false);
    $("#Open").attr("style", "border-style:solid;border-width: thin;border-color: blue"); //Added by Jagadeesh on 25th Mar 2017
    $("#New").attr("style", "color:gray"); //Added by Jagadeesh on 25th Mar 2017
    $("#Convert").show();
    $("#LeadOpprtunity").attr("disabled", true);
    $("#Organization").attr("disabled", true);
    $("#OrgSearch").hide();
    //$("#OrgCall").hide();
    $("#NewOrg").hide();
    $("#Individual").attr("disabled", true);
    $("#orgsrch").show();
    $("#NewSource").hide();
    var tabStrip = $("#tabstrip").data("kendoTabStrip");
    $(tabStrip.items()[1]).attr("style", "display:normal");
    $("#leadoppoSearch").removeClass("Pagefalse");
    document.getElementById('leadoppoSearchDiv').style.visibility = 'visible';
    document.getElementById('leadoppoAmend').style.visibility = 'visible';
    OpenModeLoadData();
}
function OpportunityOpen() {
    $("#exitbtnDIv").show();
    $("#BTN_TYPE").val("OPEN");
    $("#TRN").removeClass("Pagefalse");
    // var OpenId = '<%=Session["OpenId"]%>';
    $("#OpenId").val(Open_Id);
    //$("#Stage").data('kendoDropDownList').value(OPP_LEAD_STG);
    $$("Stage_Load").setValue(OPP_LEAD_STG);
    $("#leadopponm").text("Opportunity");
    $("#leadoppolabel").text("Opportunity");
    $("#Convert").hide();
    $("#orgsrch").show();
    $("#NewSource").hide();
    $("#Organization").attr("disabled", true);
    $("#Individual").attr("disabled", true);
    $("#OrgSearch").hide();
    var buttonObject1 = $("#New").kendoButton().data("kendoButton");
    buttonObject1.enable(false);
    $("#Open").attr("style", "border-style:solid;border-width: thin;border-color: blue"); //Added by Jagadeesh on 25th Mar 2017
    $("#New").hide();
    $("#Refresh").hide();//Added by Jagadeesh on 25th Mar 2017
    var buttonObject1 = $("#Save").kendoButton().data("kendoButton");
    buttonObject1.enable(true);
    $("#NewOrg").hide();
    $("#Prioritydiv").show();
    $("#Probabilitydiv").show();
    $("#individualDiv").hide();
    $("#ProjectionDiv").show();
    var tabStrip = $("#tabstrip").data("kendoTabStrip");
    $(tabStrip.items()[1]).attr("style", "display:normal");
    $(tabStrip.items()[2]).attr("style", "display:normal");
    $(tabStrip.items()[3]).attr("style", "display:normal");
    $("#consultantdiv").show();
    document.getElementById('DueDiv').style.visibility = 'Hidden';
    OpenModeLoadData();
}
function OpenModeLoadData() {
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/OpportunityView",
        data: "",
        async: false,
        success: function (data) {

            var OrganizationId = data.v.OrganizationId;
            var Organization = data.v.Organization;
            var Lead = data.v.Lead;
            var Leadid = data.v.Leadid;
            
            $("#LeadOpprtunityID").val(Leadid);
            var Status = data.v.Status;
            var StatusID = data.v.StatusID;
            var StrDate = data.v.StrDate;
            var DueDate = data.v.DueDate;
            var AssignedTo = data.v.AssignedTo;
            var City = data.v.City;
            var CityId = data.v.CityId;
            var Area = data.v.Area;

            var Stage = data.v.Stage;
            var Stageid = data.v.Stageid;
            var Probability = data.v.Probability;
            var Probilityid = data.v.Probilityid;
            var Assignedtoid = data.v.Assignedtoid;
            var Notes = data.v.Notes;
            var ClientType = data.v.ClientType;
            var Source = data.v.Source;
            var Phone1 = data.v.Phone1;
            var Designation = data.v.Designation;
            var Website = data.v.Website;
            var PriorityId = data.v.PriorityId;
            var Product = data.v.Product;
            var ProjectedValue = data.v.ProjectedValue;
            var ClosureDate = data.v.ClosureDate;
            var ProjectionValue = data.v.ProjectionValue;
            var ProjectionDate = data.v.ProjectionDate;
            var Consultant = data.v.Consultant;
            var Consultantid = data.v.Consultantid;
            var Activeind = data.v.Activeind;
            var RMT_ID = data.v.RMT_ID;
            var Lost_Reason = data.v.Lost_Reason;
            var Lost_TO_ID = data.v.Lost_TO_ID;
            var Lost_TO_NM = data.v.Lost_TO_NM;
            var PoNo = data.v.PoNo;
            var Podt = data.v.Podt;
            var AdvanceAmt = data.v.AdvanceAmt;
            var AdvanceDt = data.v.AdvanceDt;

            var ProposalDate = data.v.ProposalDate;
            var ReferenceNo = data.v.ReferenceNo;
            $("#ReferenceNo").val(ReferenceNo);
            $("#ProposalDate").data("kendoDatePicker").value(ProposalDate);

            //$("#DefaultProperty").data("kendoDropDownList").value(RMT_ID);
            $$("DefaultProperty_Load").setValue(RMT_ID);
            // $("#LOArea").data("kendoDropDownList").value(Area);
            $$("LOArea_Load").setValue(Area);
            $("#Phone1").val(Phone1);
            $("#Website").val(Website);
            $("#LeadDesignation").val(Designation);
            $("#Consultant").val(Consultant);
            $('#ConsultantID').val(Consultantid);
            //$("#PriorityLead").data("kendoDropDownList").value(PriorityId);
            $$("PriorityLead_Load").setValue(PriorityId);
            $("#Probability").val(Product);
            $("#ProjectedValue").val(ProjectedValue);
            $("#ClosureDate").val(ClosureDate);
            $("#ProjectionValue").val(ProjectionValue);
            $("#ProjectionDate").data("kendoDatePicker").value(ProjectionDate);
            $("#ProjectionDate").val(ProjectionDate);
            $("#CityIDD").val(CityId);
            $("#City").val(City);
            $("#DueDate").val(DueDate);
            $("#ORGID").val(OrganizationId);
            $("#Organization").val(Organization);
            $("#OrganizationActivity").val(Organization);

            $("#LeadOpprtunity").val(Lead);
            
            $("#LeadOpprtunityID").val(Leadid);
            $("#Notes").val(Notes);

            if (ClientType == "1") {
                $("#exclient").attr("checked", "checked");
            }
            else {
                $("#newclient").attr("checked", "checked");
            }
            if (Activeind == "1") {
                $("#Individual").attr("checked", "checked");
                $("#individualDiv").show();
            }
            else {
                $("#Individual").attr("checked", false);
                $("#individualDiv").hide();
            }
            //$("#Stage").data("kendoDropDownList").value(Stageid);
            $$("Stage_Load").setValue(Stageid);
            //  $("#Source").data("kendoDropDownList").value(Source);
            $$('SourceLoad').setValue(Source);
            // $("#Assigned").data("kendoDropDownList").value(Assignedtoid);
            $$("Assigned_Load").blockEvent();
            $$("Assigned_Load").setValue(Assignedtoid);
            $$("Assigned_Load").unblockEvent();
            //$("#Assigned").change();
            // $("#ActivityGrid").data("kendoGrid").dataSource.read();
            Load_ActivityInfo();
            //$("#ProductGrid").data("kendoGrid").dataSource.read();
            Load_ProductInfo();
            $("#CompetitorGrid").data("kendoGrid").dataSource.read();
            $("#ProductType").data("kendoDropDownList").value(data.v);
            //LoadQuoteGeneration(Leadid);

            $.ajax({
                type: "POST",
                url: "/SalesAndMarket/LeadSecAssignedLoad",
                data: "LeadOppID=" + Leadid + "&LeadOppNM=" + Lead + "&ORGID=" + OrganizationId + "&Organization=" + Organization,
                cache: false,
                charset: 'utf-8',
                async: false,
                success: function (data) {

                    $$("SecAssigned").clearAll();
                    $$("SecAssigned").parse(data.v);
                }
            });
            //$("#Stage").val(Stageid);
            $$("Stage_Load").setValue(Stageid);
            if (StatusID == "5" || StatusID == "8") {
                //$("#Stage").change();
                Stage_Onchange();
                if (StatusID == "5") {
                    $("#WONCOMDIV").show();
                    $("#LOSTCOMDIV").hide();
                    $("#Won_Comments").val(Lost_Reason);
                    $("#PONoValue").val(PoNo);
                    $("#PODt").val(Podt);
                    $("#POAmtValue").val(AdvanceAmt);
                    $("#POAMtDt").val(AdvanceDt);
                }
                else if (StatusID == "8") {
                    $("#WONCOMDIV").hide();
                    $("#LOSTCOMDIV").show();
                    $("#Lost_TO_NM").val(Lost_TO_NM);
                    $("#Lost_TO_ID").val(Lost_TO_ID);
                    $("#Lost_Reason").val(Lost_Reason);
                }
            }

        }
    });
}

function load_QuoteGenerateGrid(ProductTypeId, UnitTyID) {
    if (first_exe_of_quote == true) {
        modified_data = [];
        $.each(quote_generate_grid, function (key, value) {
            if (value.PROD_ID == ProductTypeId) {
                value.Active = 1;
                value.ID = ++l;
                modified_data.push(value);
            }
        });
        if (modified_data.length > 0)
            $("#QuoteGenerateGrid").data("kendoGrid").dataSource.data(modified_data);
        quote_generate_grid1 = quote_generate_grid;
    }
    else {
        var modified_data = [];
        $.each(quote_generate_grid1, function (key, value) {
            if (value.PROD_ID == ProductTypeId) {
                value.Active = 1;
                value.ID = ++l;
                modified_data.push(value);
            }
        });
        $("#QuoteGenerateGrid").data("kendoGrid").dataSource.data(modified_data);
    }
}
function load_BanqWSGenerateGrid(ProductTypeId) {

    if (first_exe_of_bq == true) {
        modified_data = [];
        $.each(Banq_grid, function (key, value) {
            if (value.PROD_ID == ProductTypeId) {
                value.Active = 1;
                value.ID = ++k;
                modified_data.push(value);
            }
        });
        if (modified_data.length > 0)
            $("#BanqWSGenerateGrid").data("kendoGrid").dataSource.data(modified_data);
        Banq_grid1 = Banq_grid;
    }
    else {
        var modified_data = [];
        $.each(Banq_grid1, function (key, value) {
            if (value.PROD_ID == ProductTypeId) {
                value.Active = 1;
                value.ID = ++k;
                modified_data.push(value);
            }
        });
        $("#BanqWSGenerateGrid").data("kendoGrid").dataSource.data(modified_data);
    }
}
function load_FBWSGenerateGrid(ProductTypeId) {
    if (first_exe_of_fb == true) {
        modified_data = [];
        $.each(f_and_b_grid, function (key, value) {
            if (value.PROD_ID == ProductTypeId) {
                value.Active = 1;
                value.ID = ++i;
                modified_data.push(value);
            }
        });
        if (modified_data.length > 0)
            $("#FBWSGenerateGrid").data("kendoGrid").dataSource.data(modified_data);
        f_and_b_grid1 = f_and_b_grid;
    }
    else {
        var modified_data = [];
        $.each(f_and_b_grid1, function (key, value) {
            if (value.PROD_ID == ProductTypeId) {
                value.Active = 1;
                value.ID = ++i;
                modified_data.push(value);
            }
        });
        $("#FBWSGenerateGrid").data("kendoGrid").dataSource.data(modified_data);
    }
}
function load_OtherChargesHidden(ProductTypeId) {
    if (first_exe_of_other == true) {
        modified_data = [];
        $.each(other_charges_grid, function (key, value) {
            if (value.PROD_ID == ProductTypeId) {
                value.Active = 1;
                value.ID = ++l;
                modified_data.push(value);
            }
        });
        if (modified_data.length > 0)
            $("#OtherChargesHidden").data("kendoGrid").dataSource.data(modified_data);
        other_charges_grid1 = other_charges_grid;
    }
    else {
        var modified_data = [];
        $.each(other_charges_grid1, function (key, value) {
            if (value.PROD_ID == ProductTypeId) {
                value.Active = 1;
                value.ID = ++l;
                modified_data.push(value);
            }
        });
        $("#OtherChargesHidden").data("kendoGrid").dataSource.data(modified_data);
    }
}

function onFandBsheetPopup_Close() {
    if (f_and_b_grid1.length <= 0) {
        $.each(f_and_b_grid, function (key1, value1) {
            if((Number(Product_Id) != Number(value1.PROD_ID))&&(Number(unit_type_id)!=value1.UnitTyID)) {                
                value1.Active = 1;
                value1.ID = ++i;
                f_and_b_grid1.push(value1);
            }
        });
        $.each($("#FBWSGenerateGrid").data("kendoGrid").dataSource.data(), function (key, value) {
            value.Active = 1;
            value.ID = ++i;
            f_and_b_grid1.push(value);
        });
    }
    else {
        $.each(f_and_b_grid, function (key1, value1) {
            if (value1.Active != 1) {
                if ((Number(Product_Id) != Number(value1.PROD_ID)) && (Number(unit_type_id) != value1.UnitTyID)) {
                    value1.Active = 1;
                    value1.ID = ++i;
                    f_and_b_grid1.push(value1);
                }
            }
        });
        $.each($("#FBWSGenerateGrid").data("kendoGrid").dataSource.data(), function (key, value) {
            if (value.Active != 1) {
                value.Active = 1;
                value.ID = ++i;
                f_and_b_grid1.push(value);
            }
        });
    }
}
function onQuoteGenerate_Close() {
    if (quote_generate_grid1.length <= 0) {
        $.each(quote_generate_grid, function (key1, value1) {
            if ((Number(Product_Id) != Number(value1.PROD_ID)) && (Number(unit_type_id) != value1.UnitTyID)) {
                value1.Active = 1;
                value1.ID = ++j;
                quote_generate_grid1.push(value1);
            }
        });
        $.each($("#QuoteGenerateGrid").data("kendoGrid").dataSource.data(), function (key, value) {
            value.Active = 1;
            value.ID = ++j;
            quote_generate_grid1.push(value);
        });
    }
    else {
        $.each(quote_generate_grid, function (key1, value1) {
            if (value1.Active != 1) {
                if ((Number(Product_Id) != Number(value1.PROD_ID)) && (Number(unit_type_id) != value1.UnitTyID)) {
                    value1.Active = 1;
                    value1.ID = ++j;
                    quote_generate_grid1.push(value1);
                }
            }
        });
        $.each($("#QuoteGenerateGrid").data("kendoGrid").dataSource.data(), function (key, value) {
            if (value.Active != 1) {
                value.Active = 1;
                value.ID = ++j;
                quote_generate_grid1.push(value);
            }
        });
    }
}
function onBanqWSGenerateGrid_Close() {
    if (Banq_grid1.length <= 0) {
        $.each(Banq_grid, function (key1, value1) {
            if ((Number(Product_Id) != Number(value1.PROD_ID)) && (Number(unit_type_id) != value1.UnitTyID)) {
                value1.Active = 1;
                value1.ID = ++k;
                Banq_grid1.push(value1);
            }
        });
        $.each($("#BanqWSGenerateGrid").data("kendoGrid").dataSource.data(), function (key, value) {
            value.Active = 1;
            value.ID = ++k;
            Banq_grid1.push(value);
        });
    }
    else {
        $.each(Banq_grid, function (key1, value1) {
            if (value1.Active != 1) {
                if ((Number(Product_Id) != Number(value1.PROD_ID)) && (Number(unit_type_id) != value1.UnitTyID)) {
                    value1.Active = 1;
                    value1.ID = ++k;
                    Banq_grid1.push(value1);
                }
            }
        });
        $.each($("#BanqWSGenerateGrid").data("kendoGrid").dataSource.data(), function (key, value) {
            if (value.Active != 1) {
                value.Active = 1;
                value.ID = ++k;
                Banq_grid1.push(value);
            }
        });
    }
}
function onOtherChargesHidden_Close() {
    if (other_charges_grid1.length <= 0) {
        $.each(other_charges_grid, function (key1, value1) {
            if ((Number(Product_Id) != Number(value1.PROD_ID)) && (Number(unit_type_id) != value1.UnitTyID)) {
                value1.Active = 1;
                value1.ID = ++l;
                other_charges_grid1.push(value1);
            }
        });
        $.each($("#OtherChargesHidden").data("kendoGrid").dataSource.data(), function (key, value) {
            value.Active = 1;
            value.ID = ++l;
            other_charges_grid1.push(value);
        });
    }
    else {
        $.each(f_and_b_grid, function (key1, value1) {
            if (value1.Active != 1) {
                if ((Number(Product_Id) != Number(value1.PROD_ID)) && (Number(unit_type_id) != value1.UnitTyID)) {
                    value1.Active = 1;
                    value1.ID = ++l;
                    other_charges_grid1.push(value1);
                }
            }
        });
        $.each($("#OtherChargesHidden").data("kendoGrid").dataSource.data(), function (key, value) {
            if (value.Active != 1) {
                value.Active = 1;
                value.ID = ++l;
                other_charges_grid1.push(value);
            }
        });
    }
}


$(window).load(function () {
    $$("Product_Grid").attachEvent("onKeyPress", function (code, e) {
        var charCode = e.which || e.keyCode;
        if (charCode == 46)
            return true
        if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105))))
            return false;
        var grdd1 = document.getElementById("ProductValue");
        if (grdd1 != null && grdd1 != "") {
            if (grdd1.value.length > 7) {
                $(e.container).find('input[name="ProductValue"]').attr("maxlength", 7);
                return false;
            } else {
                return true;
            }
        }
        return true;
    });
    $$("LOArea_Load").disable();
    //From document.ready
    //$("#Stage").change();
    if (A10_IND == "1") {
        //var AE_IND = '<%=Session["AE_IND"]%>';
        //$("#DefaultProperty").data('kendoDropDownList').enable(true);
        //$("#DefaultProperty").data('kendoDropDownList').value(AE_IND);
        $$("DefaultProperty_Load").enable();
        $$("DefaultProperty_Load").setValue(AE_IND);
        $("#DefaultPropertyDIV").show();
    }
    else {
        //$("#DefaultProperty").data('kendoDropDownList').enable(false);
        //$("#DefaultProperty").data('kendoDropDownList').value("");
        $$("DefaultProperty_Load").disable();
        $$("DefaultProperty_Load").setValue("");
        $("#DefaultPropertyDIV").hide();
    }
    $$("Assigned_Load").blockEvent();
    $$("Assigned_Load").setValue(SALE_PER_ID);
    $$("Assigned_Load").unblockEvent();
    if ($$("Assigned_Load").getValue() != "") {
        if (LeadOppPageID != "1") {
            var addrow = { USER_NM: $$("Assigned_Load").getValue(), PER: 100, HDN: 1 };
            $$("SecAssigned").add(addrow);
            $$("SecAssigned").refresh();
        }
    }
    Stage_Onchange();
    if (LeadOppPageID == "1") {

        $("#ClosedAcitivityDIV").hide();
        if (Open_Id == "" || Open_Id == null) {
            // $("#Stage").data('kendoDropDownList').value(LEAD_STG);
            $$('Stage_Load').setValue(LEAD_STG);
            $("#leadopponm").text("Lead");
            $("#leadoppolabel").text("Lead");
            var tabStrip = $("#tabstrip").data("kendoTabStrip");
            $(tabStrip.items()[1]).attr("style", "display:normal");
            $(tabStrip.items()[2]).attr("style", "display:none");
            $(tabStrip.items()[3]).attr("style", "display:none");
            $("#Prioritydiv").hide();
            $("#Probabilitydiv").hide();
            $("#individualDiv").hide();
            $("#consultantdiv").hide();
            openmodeButtonhideshow(0);
            if (ToDoCovert != "") {
                ToDoCovertDataLoad();
                openmodeButtonhideshow(1);
            }
        }
        else if (Open_Id != "") {
            LeadOpen();
            if (LeadConvert == "1") {
                $("#Convert").click();
            }
            openmodeButtonhideshow(1);
        }
        $("#Individual").removeClass("Pagefalse");
    }
    else if (LeadOppPageID == "2") {
        $("#ClosedAcitivityDIV").show();
        if (Open_Id == "" || Open_Id == null) {
            //$("#Stage").data('kendoDropDownList').value(OPP_LEAD_STG);
            $$('Stage_Load').setValue(OPP_LEAD_STG);
            $("#leadopponm").text("Opportunity");
            $("#leadoppolabel").text("Opportunity");
            $("#Convert").hide();
            $("#orgsrch").show();
            $("#NewSource").hide();
            $("#Organization").attr("disabled", true);
            $("#Individual").attr("disabled", false);
            $("#OrgSearch").hide();
            //$("#OrgCall").hide();
            $("#NewOrg").hide();
            $("#Prioritydiv").show();
            $("#Probabilitydiv").show();
            $("#individualDiv").hide();
            $("#ProjectionDiv").show();
            var tabStrip = $("#tabstrip").data("kendoTabStrip");
            $(tabStrip.items()[1]).attr("style", "display:normal");
            $(tabStrip.items()[2]).attr("style", "display:normal");
            $(tabStrip.items()[3]).attr("style", "display:normal");
            $("#consultantdiv").show();
            document.getElementById('DueDiv').style.visibility = 'Hidden';
            openmodeButtonhideshow(0);
        }
        else {
            Lead_id = Open_Id;
            OpportunityOpen();
            openmodeButtonhideshow(1);
        }
        $("#Individual").removeClass("Pagefalse");
    }
    else if (LeadOppPageID == "3") {
        $("#leadopponm").text("Lead");
        $("#leadoppolabel").text("Lead");
        // $("#Stage").data('kendoDropDownList').value(LEAD_STG);
        $$('Stage_Load').setValue(LEAD_STG);
        $("#New").attr("style", "border-style:solid;border-width:thin;border-color: blue;"); //Added by Jagadeesh on 25th Mar 2017
        $("#Open").hide();
        $("#BTN_TYPE").val("NEW");
        $("#TRN").removeClass("Pagefalse");
        $("#Organization").attr("disabled", true);
        $("#orgsrch").hide();
        $("#OrgSearch").show();
        $("#Convert").hide();
        var tabStrip = $("#tabstrip").data("kendoTabStrip");
        $(tabStrip.items()[1]).attr("style", "display:none");
        $("#leadoppoSearch").addClass("Pagefalse");
        document.getElementById('leadoppoSearchDiv').style.visibility = 'Hidden';
        document.getElementById('leadoppoAmend').style.visibility = 'Hidden';
        $("#New").click();
        var buttonObject1 = $("#Save").kendoButton().data("kendoButton");
        buttonObject1.enable(true);

        $.ajax({
            type: "POST",
            url: "/SalesAndMarket/ConvertPage",
            data: "Pageid=1",
            async: false,
            success: function (data) {
                //$("#LeadOpportunityLGrid").data("kendoGrid").dataSource.read();
                // $("#Stage").data("kendoDropDownList").dataSource.read();
                //$("#Stage").val("");
                //$("#Stage").data("kendoDropDownList").value("");
                var Stage_List = LoadDropDown("SalesAndMarket", "StageLoad");
                $$("Stage_Load").define("options", Stage_List);
                $$("Stage_Load").refresh();
                $$('Stage_Load').setValue(LEAD_STG);
                //$$("Stage_Load").setValue("");
                // $("#Stage").change();
            }
        });
        //$("#Stage").change();
        Stage_Onchange();
        $("#Individual").removeClass("Pagefalse");
        openmodeButtonhideshow(1);
    }

    else if (LeadOppPageID == "5") {
        //  $("#Stage").data('kendoDropDownList').value(OPP_LEAD_STG);
        $$('Stage_Load').setValue(OPP_LEAD_STG);
        $("#leadopponm").text("Opportunity");
        $("#leadoppolabel").text("Opportunity");
        $("#Convert").hide();
        $("#orgsrch").show();
        $("#NewSource").hide();
        $("#Organization").attr("disabled", true);
        $("#Individual").attr("disabled", false);
        $("#OrgSearch").hide();
        //$("#OrgCall").hide();
        $("#OrgSearch").show();
        $("#NewOrg").hide();
        $("#Prioritydiv").show();
        $("#Probabilitydiv").show();
        $("#individualDiv").hide();
        $("#ProjectionDiv").show();
        var tabStrip = $("#tabstrip").data("kendoTabStrip");
        $(tabStrip.items()[1]).attr("style", "display:normal");
        $(tabStrip.items()[2]).attr("style", "display:normal");
        $(tabStrip.items()[3]).attr("style", "display:normal");
        $("#consultantdiv").show();
        document.getElementById('DueDiv').style.visibility = 'Hidden';
        $("#Open").hide();
        $("#New").click();
        var buttonObject1 = $("#Save").kendoButton().data("kendoButton");
        buttonObject1.enable(true);

        $.ajax({
            type: "POST",
            url: "/SalesAndMarket/ConvertPage",
            data: "Pageid=2",
            async: false,
            success: function (data) {
                // $("#LeadOpportunityLGrid").data("kendoGrid").dataSource.read();
                //$("#Stage").data("kendoDropDownList").dataSource.read();
                //$("#Stage").val("");
                //$("#Stage").data("kendoDropDownList").value("");
                var Stage_List = LoadDropDown("SalesAndMarket", "StageLoad");
                $$("Stage_Load").define("options", Stage_List);
                $$("Stage_Load").refresh();
                // $$("Stage_Load").setValue("");                                            //commented on 25/2/2020 as per mrs.viji instruction
                $$('Stage_Load').setValue(OPP_LEAD_STG);                                    //added on 25/2/2020 as per mrs.viji instruction
                // $("#Stage").change();
            }
        });
        // $("#Stage").change();
        Stage_Onchange();
        //$("#Stage").change();
        $("#Individual").removeClass("Pagefalse");
        openmodeButtonhideshow(1);
    }
    else if (LeadOppPageID == "4") {
        $("#TRN").removeClass("Pagefalse");
        $("#headerdiv1").addClass("DivFalse");
        $("#TabDiv1").addClass("DivFalse");
        $("#TabDiv3").addClass("DivFalse");
        $("#TabDiv4").addClass("DivFalse");
        $("#btndiv").addClass("DivFalse");
        $("#OkActivity").hide();
        document.getElementById('Savenew').style.visibility = 'Hidden';
        $("#activityopenTab").addClass("DivFalse");
        $("#activityActive").addClass("DivFalse");
        // var OpenId = '<%=Session["OpenId"]%>';
        $("#OpenId").val(Open_Id);
        //$("#Stage").data('kendoDropDownList').value(OPP_LEAD_STG);
        $$('Stage_Load').setValue(OPP_LEAD_STG);
        $("#leadopponm").text("Opportunity");
        $("#leadoppolabel").text("Opportunity");
        $("#Convert").hide();
        $("#orgsrch").show();
        $("#NewSource").hide();
        $("#Organization").attr("disabled", true);
        $("#Individual").attr("disabled", true);
        $("#OrgSearch").hide();
        //$("#OrgCall").hide();
        $("#NewOrg").hide();
        $("#Prioritydiv").show();
        $("#Probabilitydiv").show();
        $("#individualDiv").hide();
        $("#ProjectionDiv").show();
        var tabStrip = $("#tabstrip").data("kendoTabStrip");
        $(tabStrip.items()[1]).attr("style", "display:normal");
        $(tabStrip.items()[2]).attr("style", "display:normal");
        $(tabStrip.items()[3]).attr("style", "display:normal");
        $("#consultantdiv").show();
        document.getElementById('DueDiv').style.visibility = 'Hidden';
        $("#menuDiv").hide();
        OpenModeLoadData();
        $("#Individual").removeClass("Pagefalse");
        openmodeButtonhideshow(1);
    }
    //$("#PriorityLead").data("kendoDropDownList").value(OPP_PRIORITY);
    $$("PriorityLead_Load").setValue(OPP_PRIORITY);
    //end document.ready

    //$$("CountryLoad").attachEvent("onChange", function (newValue, oldValue) {
    //    $('#CityID').val("");
    //    $("#CityIDD").val("");
    //    $('#CityNM').val("");
    //    $('#ZipID').val("");
    //    $('#CityCountryID').val("");
    //    $('#Reg_ID').val("");
    //    $("#City").val("");

    //    var Country = $$("CountryLoad").getValue();
    //    $("#CountryIDD").val(Country);
    //    var Textnm = $$("CountryLoad").getInputNode().innerText;
    //    if (Country != "") {
    //        $("#Country").val(Textnm);
    //        $.ajax({
    //            type: "POST",
    //            url: "/SalesAndMarket/Appl_City_Search",
    //            cache: false,
    //            async: false,
    //            charset: 'utf-8',
    //            data: "Country=" + Country,
    //            success: function (data) {
    //                $("#CityNameGrid").data("kendoGrid").dataSource.read();
    //                $("#StateDrop").data("kendoDropDownList").dataSource.read();
    //            }
    //        });
    //    }
    //});
    
});
