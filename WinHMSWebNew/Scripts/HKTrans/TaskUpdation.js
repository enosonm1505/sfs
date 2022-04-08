var app = angular.module('HKTApp', ['webix']);

app.controller("HKTranscontroller", function ($scope) {

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
                               view: "datepicker",
                               id: "txtDate",
                               stringResult: true,
                               label: "Date",
                               format: "%d/%m/%Y",
                               labelAlign: "Left",
                               labelWidth: 70,
                               inputWidth: 200,
                               width: 220,
                               minWidth: 220,
                               disabled: false,
                               value: $("#hdnCurrentDt").val(),
                               on: {
                                   onChange: function (newval, oldval) {
                                       var vDate = $$("txtDate").getValue();
                                       fndateChange(vDate,"1");
                                       fnLoadSno("3", vDate, "1");
                                       fnLoadAttendant(vDate, $$("ddlSno").getValue, "1");
                                       $$("txtAssTask").setValue("");
                                       $$("grdTaskUpdate").clearAll();
                                   }
                               }
                           },
                          
                           {
                               view: "richselect",
                               id: "ddlSno",
                               label: "Task SNo",
                               labelAlign: "Left",
                               labelWidth: 70,
                               inputWidth: 150,
                               width: 170,
                               options:ddlSno,
                               on: {
                                   onChange: function (newval, oldval) {
                                       var vDate = $$("txtDate").getValue();
                                       fnLoadAttendant(vDate, newval, "1");
                                       fnLoadRmUptIndTaskName(vDate, newval);
                                       $$("grdTaskUpdate").clearAll();
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
                               width: 150, 
                               click: function () { fnbtnDisplay(); }                              
                           },
                           {
                               view: "richselect",
                               id: "ddlAttend",
                               label: "Attendant",
                               labelAlign: "Left",
                               labelWidth: 70,
                               inputWidth: 200,
                               width: 250,
                               options:ddlAtten,
                               on: {
                                   onChange: function (newval, oldval) {
                                       $$("grdTaskUpdate").clearAll();
                                   }
                               }
                               
                           },
                           {
                               view: "text",
                               id: "txtAssTask",
                               label: "Assigned Task",
                               labelAlign: "Left",
                               labelWidth: 100,
                               inputWidth: 250,
                               width: 300,
                               readonly: true,
                               disabled: true,
                           }
                       ]
                   },
                   
                
                 {
                     cols: [
                       {
                           view: "datatable",
                           id: "grdTaskUpdate",
                           select: "row",
                           data: [],
                           height: 450,
                           minWidth: 300,
                           width: 1050,
                           editable: true,
                           scroll: true,
                           columns: [
                                   { header: "AttenId", id: "AT_ID", width: 30, hidden: true, },
                                    { header: ["Attendant", { content: "textFilter" }], id: "EMP_NM", width: 180, css: { 'text-align': 'left ! important' }, },
                                    { header: ["Building", { content: "textFilter" }], id: "Room_Bld_NM", width: 200, css: { 'text-align': 'left ! important' }, },
                                     { header: ["Floor",{ content: "textFilter" }], id: "FL_ID", width: 100, css: { 'text-align': 'left ! important' }, },
                                      { header: ["Section",{ content: "textFilter" }], id: "L_NM", width: 200, css: { 'text-align': 'left ! important' }, },
                                      { header: ["Rooms", { content: "textFilter" }], id: "R_N", width: 70, css: { 'text-align': 'left ! important' }, },
                                      { header: "AttenId", id: "S_N", width: 30, hidden: true, },
                                    { id: "chkUpdate", editor: "Checkbox", header: [{ content: "masterCheckbox", css: { 'padding': '0px ! important' } }], width: 120,css: { 'text-align': 'center ! important' }, css: "check_box", template: "{common.checkbox()}" },
                                      { header: "Status", id: "Status", width: 100, css: { 'text-align': 'left ! important' }, hidden:true,}, ],
                           
                           on: {
                            
                           },

                          
                       },
                      

                       


                     ]
                 }

                ]
            }
        ]
    }
});

function fnbtnDisplay() {
    $$("grdTaskUpdate").clearAll();
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_GRIDLOADTASKUPDATE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var Date = $$("txtDate").getValue();
    var vDate = convert(Date);
    dataparam["AL_DT"] = vDate;
    dataparam["AL_NO"] = $$("ddlSno").getValue();
    dataparam["AT_ID"] = $$("ddlAttend").getValue();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/HKTrans/HKAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("grdTaskUpdate").parse(rowData);
                $$("grdTaskUpdate").refresh();
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
                    $$("ddlAttend").setValue("");
                }
            }
        },
    });
    return rowData
}

function fnSaveTaskUpdation()
{
    $("#LoadDIv").show();
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_TASKUPADTIONSAVE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var Date = $$("txtDate").getValue();
    var vDate = convert(Date);
    dataparam["AL_DT"] = vDate;
    dataparam["AL_NO"] = $$("ddlSno").getValue();
    dataparam["RMUPTIND"] = $("#hdnRmuptInd").val();
    
    var data = $$("grdTaskUpdate").serialize();
    var lenval = data.length;
    if ($$("txtDate").getValue() == "")
    {
        webix.message({ type: 'warning', text: 'Date Cannot be Empty' });
        webix.UIManager.setFocus($$("txtDate"));
        $("#LoadDIv").hide();
        return false;
    }

  
    var count = 0;
    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {
            if ($.trim(data[i].chkUpdate) == "1") {
                count ++;
            }
          }
    }
    if (count == 0) {
        webix.message({ type: 'warning', text: 'Please Select atleast one' });
        webix.UIManager.setFocus($$("grdTaskUpdate"));
        $("#LoadDIv").hide();
        return false;
    }
    dataparam["TASKGRID"] = data;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/HKTrans/HKAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                $("#LoadDIv").hide();
                rowData = JSON.parse(d);
                if (rowData == "1") {
                    webix.message({ type: 'success', text: 'Saved Successfully' });
                    $$("txtAssTask").setValue("");
                    $$("ddlSno").setValue("");
                    $$("ddlAttend").setValue("");
                    $$("grdTaskUpdate").clearAll();
                    $$("grdTaskUpdate").refresh();
                    $("#hdnRmuptInd").val("");
                }
                else if(rowData == "0") {
                    webix.message({ type: 'warning', text: 'Operation failed' });
                    return;
                }
                else {
                    webix.message({ type: 'warning', text: rowData });
                    return;
                }
            }
        },
    });
}

function fnLoadSno(choice,vDate,ch) {
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
                    //options.splice(0, 0, { value: "<-ALL->", id: "" });
                    $$("ddlSno").define("options", options);
                    $$("ddlSno").setValue("");
                    //$$("ddlSno").setValue("<-ALL->");
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






