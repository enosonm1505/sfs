var app = angular.module('HKTApp', ['webix']);

var cBuild = "0", cFloor = "0", cSec = "0", cTyp = "1", cArr = "0", cDep = "0", cHkI = "0", cAge = "0", cCom = "0", cNat = "1", cGst = "1", cAdl = "0";
var ColHead = "ixType";
app.controller("HKTranscontroller", function ($scope) {

    var Opticon = "<span  class='wc_fnt18 fa fa-list'></span>";
    $("#LoadDIv").hide(); 
   
   
    fnCurrentDt();
    var ddlSno = fnLoadSno("3", $("#hdnCurrentDt").val(),"");
    var ddlAtten = fnLoadAttendant($("#hdnCurrentDt").val(), "", "");
   

    $scope.frmTask = {

        id: "frmTask",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        height: 550,
        elements: [
            {
                paddingX: 20,
                rows: [
                   {
                       cols: [
                           {
                               view: "text",
                               id: "txtAssTask",
                               label: "Task",
                               labelAlign: "Left",
                               labelWidth: 70,
                               inputWidth: 250,
                               width: 260,
                               readonly: true,
                               disabled: true,
                           },
                           {
                               view: "datepicker",
                               id: "txtDate",
                               stringResult: true,
                               label: "For",
                               format: "%d/%m/%Y",
                               labelAlign: "Left",
                               labelWidth: 30,
                               inputWidth: 160,
                               width: 180,
                               minWidth: 180,
                               disabled: false,
                               value: $("#hdnCurrentDt").val(),
                               on: {
                                   onChange: function (newval, oldval) {
                                       var vDate = $$("txtDate").getValue();
                                       fndateChange(vDate,"1");
                                       fnLoadSno("3", vDate, "1");
                                       fnLoadAttendant(vDate, $$("ddlSno").getValue, "1");
                                       $$("txtAssTask").setValue("");
                                       $$("grdTaskAllocList").clearAll();
                                   }
                               }
                           },
                          
                           {
                               view: "richselect",
                               id: "ddlSno",
                               label: "SNo",
                               labelAlign: "Left",
                               labelWidth: 30,
                               inputWidth: 120,
                               width: 120,
                               options:ddlSno,
                               on: {
                                   onChange: function (newval, oldval) {
                                       var vDate = $$("txtDate").getValue();
                                       fnLoadAttendant(vDate, newval, "1");
                                       fnLoadRmUptIndTaskName(vDate, newval);
                                       $$("grdTaskAllocList").clearAll();
                                   }
                               }
                           },
                           {
                               view: "button", 
                               id: "btnDisplay", 
                               icon: "wxi-check", 
                               label: "Display",
                               css:"webix_primary",
                               inputWidth: 80, 
                               width: 80, 
                               click: function () { fnbtnDisplay(); }                              
                           },
                            {
                                view: "button",
                                id: "btnOptions",
                                label: Opticon,
                                css: "btn-filter",
                                tooltip: true,
                                value: "Options",
                                inputWidth: 30,
                                width: 50,
                                click: function () { loadOptionPopWindow(); }
                            },
                            
                            {
                                view: "checkbox",
                                id: "chkRmNo",
                                label: "Room No",
                                labelWidth: 100,
                                width: 180,
                                value: "1",
                                customCheckbox:false,
                                on: {
                                    onItemClick: function (newval, oldval) {
                                        funSortchange("1");
                                    }
                                }
                                
                            },
                            {
                                view: "checkbox",
                                id: "chkRmType",
                                label: "Room Type,Room No",
                                labelWidth: 130,
                                width: 180,
                                customCheckbox: false,
                                on: {
                                    onItemClick: function (newval, oldval) {
                                        funSortchange("2");
                                    }
                                }
                            },
                           
                          
                           
                       ]
                   },
                   {
                       cols: [
                            {
                                view: "richselect",
                                id: "ddlAttend",
                                label: "Attendant",
                                labelAlign: "Left",
                                labelWidth: 70,
                                inputWidth: 250,
                                width: 260,
                                options: ddlAtten,
                                on: {
                                    onclick: function (newval, oldval) {
                                        $$("grdTaskAllocList").clearAll();
                                    }
                                }

                            },
                            {
                                width :250,
                            },
                            {
                                width: 180,
                            },
                             {
                                 view: "checkbox",
                                 id: "chkFloorSec",
                                 label: "Floor & Section",
                                 labelWidth: 100,
                                 width: 180,
                                 customCheckbox: false,
                                 on: {
                                     onItemClick: function (newval, oldval) {
                                         funSortchange("3");
                                     }
                                 }

                             },
                             {
                                 view: "checkbox",
                                 id: "chkBildSec",
                                 label: "Building,Floor,Section",
                                 labelWidth: 130,
                                 width: 180,
                                 customCheckbox: false,
                                 on: {
                                     onItemClick: function (newval, oldval) {
                                         funSortchange("4");
                                     }
                                 }

                             },
                       ]
                   },
                   {
                       cols: [
                            {
                                width: 260,
                            },
                           {
                               width: 250,
                           },
                            {
                                width: 180,
                            },
                             {
                                 view: "checkbox",
                                 id: "chkSortSec",
                                 label: "Section",
                                 labelWidth: 100,
                                 width: 180,
                                 customCheckbox: false,
                                 on: {
                                     onItemClick: function (newval, oldval) {
                                         funSortchange("5");
                                     }
                                 }

                             },
                            
                       ]
                   },
                
                 {
                     cols: [
                       {
                           view: "datatable",
                           id: "grdTaskAllocList",
                           select: "row",
                           data: [],
                           height: 450,
                           minWidth: 300,
                           width: 1050,
                           editable: true,
                           scroll: true,
                           columns: [
                                   { header: "Building", id: "ixRmBuild", width: 150, css: { 'text-align': 'left ! important' },hidden:true, },
                                   { header: "Floor", id: "ixFloor", width: 150, css: { 'text-align': 'left ! important' }, hidden: true, },
                                   { header: "Section", id: "ixSection", width: 150, css: { 'text-align': 'left ! important' }, hidden: true, },
                                   { header: "Type", id: "ixType", width: 200, css: { 'text-align': 'left ! important' }, hidden: true, },
                                   { header: "Room", id: "ixRoom", width: 200, css: { 'text-align': 'left ! important' }, },
                                   { header: "Guest", id: "ixGuest", width: 200, css: { 'text-align': 'left ! important' }, },
                                   { header: "Nationality", id: "ixNation", width: 100, css: { 'text-align': 'left ! important' }, hidden: true, },
                                   { header: "Company", id: "ixCompany", width: 100, css: { 'text-align': 'left ! important' }, hidden: true, },
                                   { header: "Agent", id: "ixAgent", width: 100, css: { 'text-align': 'left ! important' }, hidden: true, },
                                   { header: "Arrival", id: "ixArrDt", width: 100, css: { 'text-align': 'left ! important' }, },
                                   { header: "Today Arrival", id: "ixArrToday", width: 100, css: { 'text-align': 'left ! important' }, hidden: true, },
                                   { header: "Departure", id: "ixDepDt", width: 100, css: { 'text-align': 'left ! important' }, },
                                   { header: "Today Departure", id: "ixDepToday", width: 150, css: { 'text-align': 'left ! important' }, hidden: true, },
                                   { header: "Pax", id: "ixPax", width: 100, css: { 'text-align': 'left ! important' }, },
                                   { header: "Adult", id: "ixAdult", width: 100, css: { 'text-align': 'left ! important' }, hidden: true, },
                                   { header: "Child", id: "ixChild", width: 100, css: { 'text-align': 'left ! important' }, hidden: true, },
                                   { header: "Infant", id: "ixInf", width: 100, css: { 'text-align': 'left ! important' }, hidden: true, },
                                   { header: "FO Status", id: "ixFoSts", width: 100, css: { 'text-align': 'left ! important' }, },
                                   { header: "HK Status", id: "ixHkSts", width: 100, css: { 'text-align': 'left ! important' }, },
                                   { header: "Guest Status", id: "ixGstSts", width: 100, css: { 'text-align': 'left ! important' }, hidden: true, },
                                   { header: "HK Instructions", id: "ixHKInstruction", width: 150, css: { 'text-align': 'left ! important' }, hidden: true, },
                                   

                           ],

                           //scheme: {
                           //    $change: function (item) {

                           //        if (cBuild == "1")
                           //        {
                           //            if (item.ixRmBuild != "" && item.ixRmBuild != null) {
                           //                debugger;
                           //                if (item.ixRmBuild.substring(0, 1) == "~") {
                           //                    item.ixRmBuild = item.ixRmBuild.replace("~", "");
                           //                    $$("grdTaskAllocList").addSpan(item.id, "ixRmBuild", 3, 1, null, "GrpHead");
                           //                }
                           //            }
                           //        }
                           //        else if (cFloor == "1") {
                           //            if (item.ixFloor != "" && item.ixFloor != null) {
                           //                debugger;
                           //                if (item.ixFloor.substring(0, 1) == "~") {
                           //                    item.ixFloor = item.ixFloor.replace("~", "");
                           //                    $$("grdTaskAllocList").addSpan(item.id, "ixFloor", 3, 1, null, "GrpHead");
                           //                }
                           //            }
                           //        }
                           //        else if (cSec == "1") {
                           //            if (item.ixSection != "" && item.ixSection != null) {
                           //                debugger;
                           //                if (item.ixSection.substring(0, 1) == "~") {
                           //                    item.ixSection = item.ixSection.replace("~", "");
                           //                    $$("grdTaskAllocList").addSpan(item.id, "ixSection", 3, 1, null, "GrpHead");
                           //                }
                           //            }
                           //        }
                           //        else if (cTyp == "1") {
                           //            if (item.ixType != "" && item.ixType != null) {
                           //                debugger;
                           //                if (item.ixType.substring(0, 1) == "~") {
                           //                    item.ixType = item.ixType.replace("~", "");
                           //                    $$("grdTaskAllocList").addSpan(item.id, "ixType", 3, 1, null, "GrpHead");
                           //                }
                           //            }
                           //        }

                           //        else {
                           //            if (item.ixRoom != "" && item.ixRoom != null) {
                           //                debugger;
                           //                if (item.ixRoom.substring(0, 1) == "~") {
                           //                    item.ixRoom = item.ixRoom.replace("~", "");
                           //                    $$("grdTaskAllocList").addSpan(item.id, "ixRoom", 3, 1, null, "GrpHead");
                           //                }
                           //            }
                           //        }
                           //    },
                           //}
                         

                       },

                      

                       


                     ]
                 }

                ]
            }
        ]
    }
});

function fnbtnDisplay() {
    $$("grdTaskAllocList").clearAll();
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_TASKALLOCATIONLIST";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var Date = $$("txtDate").getValue();
    var vDate = convert(Date);
    dataparam["AL_DT"] = vDate;
    dataparam["AL_NO"] = $$("ddlSno").getValue();
    dataparam["AT_ID"] = $$("ddlAttend").getValue();
    dataparam["Build"] = cBuild;
    dataparam["Floor"] = cFloor;
    dataparam["Type"] = cTyp;
    dataparam["Section"] = cSec;

    dataparam["ChkRoom"] = $$("chkRmNo").getValue();
    dataparam["ChkFloor"] = $$("chkFloorSec").getValue();
    dataparam["ChkSection"] = $$("chkSortSec").getValue();
    dataparam["ChkRoomTy"] = $$("chkRmType").getValue();
    dataparam["ChkBuild"] = $$("chkBildSec").getValue();
    var DataVal = JSON.stringify(dataparam);

    if (cBuild == "1")
        ColHead = "ixRmBuild";
    else if (cFloor == "1")
        ColHead = "ixFloor";
    else if (cSec == "1")
        ColHead = "ixSection";
    else if (cTyp == "1")
        ColHead = "ixType";
    else
        ColHead = "ixRoom";

    $.ajax({
        async: false,
        url: "/HKTrans/HKAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("grdTaskAllocList").parse(rowData);
                if(cBuild == "1")
                    $$("grdTaskAllocList").showColumn("ixRmBuild");
                else
                    $$("grdTaskAllocList").hideColumn("ixRmBuild");
                if (cFloor == "1")
                    $$("grdTaskAllocList").showColumn("ixFloor");
                else
                    $$("grdTaskAllocList").hideColumn("ixFloor");
                if (cSec == "1")
                    $$("grdTaskAllocList").showColumn("ixSection");
                else
                    $$("grdTaskAllocList").hideColumn("ixSection");
                if (cTyp == "1")
                    $$("grdTaskAllocList").showColumn("ixType");
                else
                    $$("grdTaskAllocList").hideColumn("ixType");
                if (cCom == "1")
                    $$("grdTaskAllocList").showColumn("ixCompany");
                else
                    $$("grdTaskAllocList").hideColumn("ixCompany");
                if (cNat == "1")
                    $$("grdTaskAllocList").showColumn("ixNation");
                else
                    $$("grdTaskAllocList").hideColumn("ixNation");
                if (cAge == "1")
                    $$("grdTaskAllocList").showColumn("ixAgent");
                else
                    $$("grdTaskAllocList").hideColumn("ixAgent");
                if (cAdl == "1") {
                    $$("grdTaskAllocList").showColumn("ixAdult");
                    $$("grdTaskAllocList").showColumn("ixInf");
                }
                else {
                    $$("grdTaskAllocList").hideColumn("ixAdult");
                    $$("grdTaskAllocList").hideColumn("ixChild");
                    $$("grdTaskAllocList").hideColumn("ixInf");
                }
                if (cGst == "1")
                    $$("grdTaskAllocList").showColumn("ixGstSts");
                else
                    $$("grdTaskAllocList").hideColumn("ixGstSts");
                if (cHkI == "1")
                    $$("grdTaskAllocList").showColumn("ixHKInstruction");
                else
                    $$("grdTaskAllocList").hideColumn("ixHKInstruction");
                if(cArr == "1")
                    $$("grdTaskAllocList").showColumn("ixArrToday");
                else
                    $$("grdTaskAllocList").hideColumn("ixArrToday");
                if (cDep == "1")
                    $$("grdTaskAllocList").showColumn("ixDepToday");
                else
                    $$("grdTaskAllocList").hideColumn("ixDepToday");

                $$("grdTaskAllocList").refresh();
            }
        },
    });
    
}


function fnLoadAttendant(vDate,AL_NO,choice) {
    var dataparam = {};
    var rowData = [];
    var options = [];
    dataparam["REQTYPE"] = "GET_ATTENDANTUP";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["AL_NO"] = AL_NO;
    dataparam["CHOICE"] = "1";
    vDate = convert(vDate);
    dataparam["Date"] = vDate;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/HKTrans/HKAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                if (choice == "1") {
                    options = rowData;
                    options.splice(0, 0, { value: "<-ALL->", id: " " });
                    $$("ddlAttend").define("options", options);
                    $$("ddlAttend").setValue("");
                    $$("ddlAttend").setValue(" ");
                }
            }
        },
    });
    return rowData
}

function fnLoadSno(choice, vDate, ch) {
    var rowData = [];
    var options = [];
    var CompId = $("#hdnCompId").val();
    vDate = convert(vDate);
    Request = {
        REQTYPE: "GET_LOADSNO",
        COMPID: CompId,
        Date: vDate,
        Choice: choice,
    }
    var DataVal = JSON.stringify(Request);

    $.ajax({
        async: false,
        url: "/HKTrans/HKAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                if (ch == "1") {
                    options = rowData;
                    $$("ddlSno").define("options", options);
                    $$("ddlSno").setValue("");
                }
            }
        },
    });
    return rowData;
}

function fnLoadRmUptIndTaskName(vDate, AL_NO) {
    var rowData = [];
    var options = [];
    var CompId = $("#hdnCompId").val();
    vDate = convert(vDate);
    Request = {
        REQTYPE: "GET_TASKRMUPTIND",
        COMPID: CompId,
        AL_DT: vDate,
        AL_NO: AL_NO,
    }
    var DataVal = JSON.stringify(Request);

    $.ajax({
        async: false,
        url: "/HKTrans/HKAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("txtAssTask").setValue($.trim(rowData[0].J_N));
                $("#hdnRmuptInd").val($.trim(rowData[0].B_Ind))
            }
        },
    });
    return rowData;
}

function loadOptionPopWindow() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "RptOptionsNew",
        head: "Option",
        position: "center",
        css: "WebIxStyle",
        height: 470,
        width: 250,
        move: true,
        body: {
            rows: [
                    {
                        view: "scrollview", scroll: "y", height: 400, width: 250, body: {
                            padding: { top: 20, left: 30, bottom: 20, right: 10 },
                            rows: [
                                { view: "checkbox", id: "chkBui", labelWidth: 5, labelRight: "Building", customCheckbox: false, },
                                { view: "checkbox", id: "chkFlo", labelWidth: 5, labelRight: "Floor", customCheckbox: false, },
                                { view: "checkbox", id: "chkSec", labelWidth: 5, labelRight: "Section", customCheckbox: false, },
                                { view: "checkbox", id: "chkTyp", labelWidth: 5, labelRight: "Type", customCheckbox: false, value: "1", },
                                { view: "checkbox", id: "chkArr", labelWidth: 5, labelRight: "Arrival Today", customCheckbox: false, },
                                { view: "checkbox", id: "chkDep", labelWidth: 5, labelRight: "Departure Today", customCheckbox: false, },
                                { view: "checkbox", id: "chkHkI", labelWidth: 5, labelRight: "HK Instructions", customCheckbox: false, },
                                { view: "checkbox", id: "chkCom", labelWidth: 5, labelRight: "Company", customCheckbox: false, },
                                { view: "checkbox", id: "chkAge", labelWidth: 5, labelRight: "Agent", customCheckbox: false, },
                                { view: "checkbox", id: "chkNat", labelWidth: 5, labelRight: "Nationality", customCheckbox: false, value: "1", },
                                { view: "checkbox", id: "chkGst", labelWidth: 5, labelRight: "Guest Status", customCheckbox: false,value:"1", },
                                { view: "checkbox", id: "chkAdl", labelWidth: 5, labelRight: "Adult/Child", customCheckbox: false, },
                            ]
                        }
                    },
                    { cols: [{}, { view: "button", type: "icon", id: "Okoptions", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80, click: function () { btnOkOptionClick(); } }], }
            ]

        }
    });
    btnoptLoad();
    $$("RptOptionsNew").show();
};


function btnOkOptionClick() {
    cBuild = $$("chkBui").getValue() == "1" ? "1" : "0";
    cFloor = $$("chkFlo").getValue() == "1" ? "1" : "0";
    cSec = $$("chkSec").getValue() == "1" ? "1" : "0";
    cTyp = $$("chkTyp").getValue() == "1" ? "1" : "0";
    cArr = $$("chkArr").getValue() == "1" ? "1" : "0";
    cDep = $$("chkDep").getValue() == "1" ? "1" : "0";
    cHkI = $$("chkHkI").getValue() == "1" ? "1" : "0";
    cCom = $$("chkCom").getValue() == "1" ? "1" : "0";
    cAge = $$("chkAge").getValue() == "1" ? "1" : "0";
    cNat = $$("chkNat").getValue() == "1" ? "1" : "0";
    cGst = $$("chkGst").getValue() == "1" ? "1" : "0";
    cAdl = $$("chkAdl").getValue() == "1" ? "1" : "0";
    $$("RptOptionsNew").hide();
    fnbtnDisplay();
}

function btnoptLoad() {
    $$("chkBui").setValue(cBuild);
    $$("chkFlo").setValue(cFloor);
    $$("chkSec").setValue(cSec);
    $$("chkTyp").setValue(cTyp);
    $$("chkArr").setValue(cArr);
    $$("chkDep").setValue(cDep);
    $$("chkHkI").setValue(cHkI);
    $$("chkCom").setValue(cCom);
    $$("chkAge").setValue(cAge);
    $$("chkNat").setValue(cNat);
    $$("chkGst").setValue(cGst);
    $$("chkAdl").setValue(cAdl);
}

function funSortchange(ch) {
    $$("chkRmNo").setValue("0");
    $$("chkRmType").setValue("0");
    $$("chkFloorSec").setValue("0");
    $$("chkBildSec").setValue("0");
    $$("chkSortSec").setValue("0");
    if(ch == "1")
        $$("chkRmNo").setValue("1");
    else if (ch == "2")
        $$("chkRmType").setValue("1");
    else if (ch == "3")
        $$("chkFloorSec").setValue("1");
    else if (ch == "4")
        $$("chkBildSec").setValue("1");
    else if (ch == "5")
        $$("chkSortSec").setValue("1");
}

function fnGridPrint() {
    var len = "";

    var vHeader = "Task Allocation List";
    var FullData = "";

    FullData = $$("grdTaskAllocList").serialize();
    len = FullData.length;
    if (len > 0) {
        webix.print($$("grdTaskAllocList"), {
            docHeader: vHeader,
            fontSize: 25,
            mode: "landscape",
            fit: "data"

        });
    }
    else {
        alert("Records not present in Report");
    }
};

function DisplayExcel() {
    var FullData = "";
    var len = 0;
    var FileName = "";

    var vHeader = "Task Allocation List";
    FileName = "Task Allocation List";

    FullData = $$("grdTaskAllocList").serialize();
    len = FullData.length;
    if (len > 0) {
        var data = $$("grdTaskAllocList");
        webix.toExcel($$("grdTaskAllocList"), {

            filename: FileName,
            styles: false,
            name: FileName,
            rawValues: true,
            spans: true,
            filterHTML: true,
            title: true,
        });
    }
    else {
        alert("Records not present in Report");
    }

}