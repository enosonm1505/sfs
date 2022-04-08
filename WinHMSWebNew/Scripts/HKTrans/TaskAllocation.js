var app = angular.module('HKTApp', ['webix']);

app.controller("HKTranscontroller", function ($scope) {

    $("#LoadDIv").hide();
    var wid_Val = '';
    
    wid_Val = '50';

    var searchicon = "<span class='webix_icon wxi-search'></span>";
    var Removeicon = "<span class='webix_icon wxi-close'></span>";
    fnCurrentDt();
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
                                       fndateChange(vDate, "");
                                       $$("txtTotalRms").setValue("");
                                       $$("txtSno").setValue("");
                                       $$("txtAttend").setValue("");
                                       $$("txtTaskName").setValue("");
                                       $$("grdAttendant").clearAll();
                                       $$("grdAttendant").refresh();
                                       $$("grdAttendant").clearAll();
                                       $$("grdRoomStatus").clearAll();
                                       $$("grdRoomStatus").refresh();
                                       $$("ddlSno").setValue("");
                                       fnLoadSno("1");
                                   }
                               }
                           },
                           {
                               view: "text",
                               id: "txtSno",
                               label: "No",
                               labelAlign: "Left",
                               labelWidth: 50,
                               inputWidth: 150,
                               width: 210,
                               disabled: true,
                           },
                           {
                               view: "richselect",
                               id: "ddlSno",
                               label: "No",
                               labelAlign: "Left",
                               labelWidth: 50,
                               inputWidth: 150,
                               width: 210,
                               disabled: true,
                               hidden: true,
                               on: {
                                   onChange: function (newval, oldval) {
                                       $$("txtTotalRms").setValue("");
                                       $$("txtAttend").setValue("");
                                       $$("txtTaskName").setValue("");
                                       $$("grdAttendant").clearAll();
                                       $$("grdAttendant").refresh();
                                       $$("grdAttendant").clearAll();
                                       $$("grdRoomStatus").clearAll();
                                       $$("grdRoomStatus").refresh();
                                       fnLoadSno("2");
                                   }
                               }
                           },
                           {
                               view: "text",
                               id: "txtTotalRms",
                               label: "Total Rooms Alloted",
                               labelAlign: "Left",
                               labelWidth: 120,
                               inputWidth: 200,
                               width: 200,
                               readonly:true,
                               disabled: true,
                               
                           },
                           {
                               view: "text",
                               id: "txtAttend",
                               label: "Total Attendants",
                               labelAlign: "Left",
                               labelWidth: 120,
                               inputWidth: 200,
                               width: 200,
                               readonly: true,
                               disabled: true,
                               
                           }
                       ]
                   },
                   
                 {
                     cols: [
                         {
                             view: "search",
                             id: "txtTaskName", 
                             readonly: true,
                             maxWidth: 350,
                             labelWidth: 69,
                             inputwidth:250,
                             label: "Task",
                             disabled: true,
                             on: {
                                 onSearchIconClick: function () {
                                     fnLoadTaskPopup();
                                 },
                                 onChange: function (NewVal, OldVal) {
                                 }
                             }
                            
                         },
                         {
                             width:610,
                         },
                        
                         {
                             view: "button", id: "btnDelete", width: 35, css: "webix_primary", value: "Delete",
                             label: '<span class="webix_icon wxi-close"></span>', tooltip: true,
                             on: {
                                 onItemClick: function () {
                                     fnDeleteRooms();
                                 },
                             }
                         }
                        
                     ]
                 },
                 {
                     cols: [
                       {
                           view: "datatable",
                           id: "grdAttendant",
                           select: "row",
                           data: [],
                           height: 400,
                           minWidth: 300,
                           width: 400,
                           editable: true,
                           scroll: true,
                           columns: [
                                   { header: "AttenId", id: "EMP_ID", width: 30, hidden: true, },
                                   //{ header: "AttenId", id: "FL_ID", width: 30, hidden: true, },
                                   //{ header: "AttenId", id: "SE_ID", width: 30, hidden: true, },
                                   //{ header: "AttenId", id: "BLD_ID", width: 30, hidden: true, },
                                   { header: "Assign Rooms", id: "ASSINGN_ROOM", width: 30, hidden: true, },
                                    { header: "Attendant", id: "EMP_NM", width: 180, css: { 'text-align': 'left ! important' }, },
                                    { header: "Assign", id: "chkAssign", template: "{common.checkbox()}", width: 120, css: { 'text-align': 'center ! important' } },
                                    { header: "", id: "btnISrch", width: 40, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' },hidden:false },
                                    { header: "", id: "btnIRemove", width: 40, template: Removeicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' },hidden:false },
                           ],
                           
                           on: {
                              'onItemClick': function (id) {
                                   var getval = this.getItem(id.row);
                                   var getColumn = id.column;
                                   var itemval = $$("grdAttendant").getSelectedItem()
                                   $("#hdnRowId").val(itemval.id);
                                   $("#hdnAlreadyRowRmNo").val($.trim(itemval.ASSINGN_ROOM));
                                   
                                   if (itemval.chkAssign == "1") {
                                       if (getColumn == 'btnISrch') {
                                           fnGetAlreadyAssignRoom();
                                           fnGstPrfRmNoSrchWindowDesign();
                                           RoomSrchClick();
                                       }
                                       else if (getColumn == 'btnIRemove') {
                                           var row_id = $("#hdnRowId").val();
                                           $$("grdAttendant").updateItem(row_id, {
                                               ASSINGN_ROOM: ""
                                           });
                                           $$("grdAttendant").refresh();
                                           $$("grdRoomStatus").clearAll();
                                           $$("grdRoomStatus").refresh();
                                       }
                                   }
                                  
                              },
                              'onCheck': function (rowId, colId) {
                                  var itemval = this.getItem(rowId);
                                  $("#hdnRowId").val(itemval.id);
                                  if (itemval.chkAssign == "1") {
                                      $("#hdnAlreadyRowRmNo").val($.trim(itemval.ASSINGN_ROOM));
                                      fnbuildRmSelect(itemval.ASSINGN_ROOM);
                                  }
                                  else {
                                      fnbuildRmSelect("");
                                      $("#hdnAlreadyRowRmNo").val("");
                                  }
                              },
                              'onSelectChange': function (rowId, colId) {
                                  var itemval = $$("grdAttendant").getSelectedItem();
                                  if (itemval != undefined) {
                                      $("#hdnRowId").val(itemval.id);
                                      $("#hdnAlreadyRowRmNo").val($.trim(itemval.ASSINGN_ROOM));
                                      fnbuildRmSelect($.trim(itemval.ASSINGN_ROOM));
                                  }
                                }
                           },

                          
                       },
                      

                       //****
                       {

                           view: 'form',
                               id: "grdRoomStatusfrm",
                               css: "my_style",
                               
                               
                               elements: [
                                   {
                                       paddingX: 10,
                                       cols: [
                                           {
                                               rows: [
                                                    {
                                                        cols: [
                                                            {
                                                                view: "datatable",
                                                                id: "grdRoomStatus",
                                                                select: "cell",
                                                                header: false,
                                                                data: [],
                                                                css: "my_style",
                                                                height: 400,
                                                                minWidth: 300,
                                                                multiselect: true,
                                                                multiselect: "touch",
                                                                width: 600,
                                                                
                                                                columns: [
                                                                       {
                                                                           header: "", id: "Col0",
                                                                           template: function (obj) {

                                                                               var array = $.trim(obj.Col0).split('~');
                                                                               var RoomNo = array[0].toString();
                                                                               return RoomNo;
                                                                           },
                                                                           width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                                       },
                                                                      {
                                                                          header: "", id: "Col1",
                                                                          template: function (obj) {

                                                                              var array = $.trim(obj.Col1).split('~');
                                                                              var RoomNo = array[0].toString();
                                                                              return RoomNo;
                                                                          },
                                                                          width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                                      },
                                                                      {
                                                                          header: "", id: "Col2",
                                                                          template: function (obj) {

                                                                              var array = $.trim(obj.Col2).split('~');
                                                                              var RoomNo = array[0].toString();
                                                                              return RoomNo;
                                                                          },
                                                                          width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                                      },
                                                                      {
                                                                          header: "", id: "Col3",
                                                                          template: function (obj) {

                                                                              var array = $.trim(obj.Col3).split('~');
                                                                              var RoomNo = array[0].toString();
                                                                              return RoomNo;
                                                                          },
                                                                          width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                                      },
                                                                        {
                                                                            header: "", id: "Col4",
                                                                            template: function (obj) {

                                                                                var array = $.trim(obj.Col4).split('~');
                                                                                var RoomNo = array[0].toString();
                                                                                return RoomNo;
                                                                            },
                                                                            width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                                        },
                                                                       {
                                                                           header: "", id: "Col5",
                                                                           template: function (obj) {

                                                                               var array = $.trim(obj.Col5).split('~');
                                                                               var RoomNo = array[0].toString();
                                                                               return RoomNo;
                                                                           },
                                                                           width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                                       },
                                                                        {
                                                                            header: "", id: "Col6",
                                                                            template: function (obj) {

                                                                                var array = $.trim(obj.Col6).split('~');
                                                                                var RoomNo = array[0].toString();
                                                                                return RoomNo;
                                                                            },
                                                                            width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                                        },
                                                                       {
                                                                           header: "", id: "Col7",
                                                                           template: function (obj) {

                                                                               var array = $.trim(obj.Col7).split('~');
                                                                               var RoomNo = array[0].toString();
                                                                               return RoomNo;
                                                                           },
                                                                           width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                                       },
                                                                       {
                                                                           header: "", id: "Col8",
                                                                           template: function (obj) {

                                                                               var array = $.trim(obj.Col8).split('~');
                                                                               var RoomNo = array[0].toString();
                                                                               return RoomNo;
                                                                           },
                                                                           width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                                       },
                                                                        {
                                                                            header: "", id: "Col9",
                                                                            template: function (obj) {

                                                                                var array = $.trim(obj.Col9).split('~');
                                                                                var RoomNo = array[0].toString();
                                                                                return RoomNo;
                                                                            },
                                                                            width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                                                                        },
                                                                      
                                                                     
                                                                ],

                                                                scheme: {
                                                                    $init: function (item) {
                                                                        fnRetCssRmSelction(item);
                                                                    },
                                                                },
                                                                on: {
                                                                    "onBeforeSelect": function (Select, preserve) {
                                                                        var RowId = Select.row;
                                                                        var ColId = Select.column;
                                                                        var SelRow = this.getItem(RowId);
                                                                        var vVal = SelRow[ColId];
                                                                        if (vVal) {
                                                                            var Status = "";
                                                                            if (Status == "F" || Status == "FH") return false;

                                                                        }
                                                                        else return false;
                                                                    },
                                                                },
                                                            }

                                                        ]
                                                    }
                                               ]
                                           }
                                       ]
                                   }
                               ],
                        },
                       //***



                     ]
                 }

                ]
            }
        ]
    }
});


function fnLoadTaskPopup() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "TaskPopup",
        head: "Task",
        position: "center",
        minWidth: 300,
        maxWidth: 600,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 280,
            maxWidth: 330,
            elements: [
                {
                    view: "datatable",
                    id: "grdTask",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "Task Id", id: "J_I",hidden:true},
                            { header: ["Task"], id: "J_N", width: 310, StringResult: true, css: { 'text-align': 'left ! important' } },
                           
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            $("#LoadDIv").show();

                            var selectedRows = this.getSelectedItem(id.row);

                            $$("txtTaskName").setValue(selectedRows[0].J_N);
                            $("#hdnTaskId").val(selectedRows[0].J_I);

                            $$('TaskPopup').hide();
                            $("#LoadDIv").hide();
                        }
                    }
                   
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 350,
                             paddingX: 170,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'ok',
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('TaskPopup').hide();
                                                 }
                                             }
                                         },
                                         {
                                             width: 15,
                                         },
                                         {
                                             view: 'button',
                                             label: 'Cancel',
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('TaskPopup').hide();
                                                 }
                                             }
                                         },
                                     ]
                                 }
                             ]
                         }
                    ]
                }
            ]
        }
    });

    $$("TaskPopup").show();
    fnTaskLoad();

}

function fnTaskLoad() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_TASKLOAD";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/HKTrans/HKAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("grdTask").clearAll();
                $$("grdTask").parse(rowData);
                $$("grdTask").refresh();
            }
        },
    });

   
}

function fnLoadAttendant() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_ATTENDANTLOAD";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["MODE"] = $("#hdnCurMode").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/HKTrans/HKAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("grdAttendant").clearAll();
                $$("grdAttendant").parse(rowData);
                $$("grdAttendant").refresh();
            }
        },
    });

}

function fnDisable() {
    $$("txtDate").disable();
    $$("txtSno").disable();
    $$("txtTotalRms").disable();
    $$("txtAttend").disable();
    $$("txtTaskName").disable();
    $$("ddlSno").disable();
}

function fnEnable() {
    $$("txtDate").enable();
    $$("txtTotalRms").enable();
    $$("txtAttend").enable();
    $$("txtTaskName").enable();
    $$("ddlSno").enable();
}

function fnGetAlreadyAssignRoom() {
    var RmBuild = "";
    var data = $$("grdAttendant").serialize();
    var lenval = data.length;
    var indx = $("#hdnRowId").val();
    var RoomAlre = $.trim($("#hdnAlreadyRowRmNo").val());
    if (lenval != 0) {
        
        for (i = 0; i < lenval; i++) {
            
            if ($.trim(data[i].ASSINGN_ROOM) != "") {
                if ($.trim(RoomAlre) != $.trim(data[i].ASSINGN_ROOM)) {
                    if (RmBuild == "")
                        RmBuild = $.trim(data[i].ASSINGN_ROOM);
                    else
                        RmBuild += "," + $.trim(data[i].ASSINGN_ROOM);
                }
            }
          
        }
    }
    //$("#hdnAlreadyRmNo").val(RmBuild);
    if (RoomAlre != "")
        $("#hdnAlreadyRmNo").val(RoomAlre);
    else
        $("#hdnAlreadyRmNo").val(RmBuild);
    
}


function fnSaveTaskAllocation()
{
    $("#LoadDIv").show();
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_TASKALLOCATIONSAVE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["MODE"] = $("#hdnCurMode").val();
    var Date = $$("txtDate").getValue();
    var vDate = convert(Date);
    dataparam["AL_DT"] = vDate;
    if ($.trim($("#hdnCurMode").val()) == "OPEN")
        dataparam["AL_NO"] = $$("ddlSno").getValue();
    dataparam["TS_K"] = $("#hdnTaskId").val();
    var data = $$("grdAttendant").serialize();
    var lenval = data.length;
    if ($$("txtDate").getValue() == "")
    {
        webix.message({ type: 'warning', text: 'Date Cannot be Empty' });
        webix.UIManager.setFocus($$("txtDate"));
        $("#LoadDIv").hide();
        return false;
    }

    if ($$("txtTaskName").getValue() == "" || $("#hdnTaskId").val() == "") {
        webix.message({ type: 'warning', text: 'Task Cannot be Empty' });
        webix.UIManager.setFocus($$("txtDate"));
        $("#LoadDIv").hide();
        return false;
    }

    
   
    var count = 0;
    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {
            if ($.trim(data[i].chkAssign) == "1") {
                count ++;
                if ($.trim(data[i].ASSINGN_ROOM) == "") {
                    webix.message({ type: 'warning', text: 'Rooms Are not Assigned' });
                    webix.UIManager.setFocus($$("grdAttendant"));
                    $("#LoadDIv").hide();
                    return false;
                }
            }
                  }
            if(count == 0){
                webix.message({ type: 'warning', text: 'One Attend to be Selected' });
                webix.UIManager.setFocus($$("grdAttendant"));
                $("#LoadDIv").hide();
                return false;
            }
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
                    $("#btnRef").click();
                }
                else {
                    webix.message({ type: 'warning', text: 'Operation failed' });
                    return;
                }
            }
        },
    });
}

function fnLoadSno(choice) {
    var rowData = [];
    var options = [];
    var CompId = $("#hdnCompId").val();
    var Date = $$("txtDate").getValue();
    var vDate = convert(Date);
    var SNO = "";
    if (choice == "2")
      SNO =  $$("ddlSno").getValue();
    Request = {
        REQTYPE: "GET_LOADSNO",
        COMPID: CompId,
        Date: vDate,
        Choice: choice,
        SNO : SNO
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
                if(choice == "1")
                {
                    options = rowData;
                    options.splice(0, 0, { value: "<-ALL->", id: "" });
                    $$("ddlSno").define("options", options);
                    $$("ddlSno").setValue("");
                    $$("ddlSno").setValue("<-ALL->");
                }
                else if (choice == "2") {
                    if (rowData.dtTaskAll) {
                        $$("grdAttendant").clearAll();
                        $$("grdAttendant").parse(rowData.dtTaskAll);
                        $$("grdAttendant").refresh();
                        //$("#hdnRowId").val(itemval.id);
                        $("#hdnAlreadyRowRmNo").val($.trim(rowData.dtTaskAll[0].ASSINGN_ROOM));
                        fnbuildRmSelect($.trim(rowData.dtTaskAll[0].ASSINGN_ROOM));
                    }
                    if (rowData.dtTask) {
                        $("#hdnTaskId").val($.trim(rowData.dtTask[0].TASK_ID));
                        $$("txtTaskName").setValue($.trim(rowData.dtTask[0].TASK_NM));
                        $$("txtTotalRms").setValue($.trim(rowData.dtTask[0].RM_COUNT));
                        $$("txtAttend").setValue($.trim(rowData.dtTask[0].EMP_COUNT));
                    }
                }
            }
        },
    });
}

function fnbuildRmSelect(ASSINGN_ROOM) {

    $$("grdRoomStatus").clearAll();
    var rowData = [];
    var options = [];
    var CompId = $("#hdnCompId").val();

    Request = {
        REQTYPE: "GET_SELECTEDROOM",
        COMPID: CompId,
        ASSINGN_ROOM: ASSINGN_ROOM,
        DELETE_ROOM: $("#hdnDeleRms").val(),
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
                $$("grdRoomStatus").parse(rowData.dtroom);
                var row_id = $("#hdnRowId").val();
                $$("grdAttendant").updateItem(row_id, {
                    ASSINGN_ROOM: rowData.AlrAssRms
                });
                    $("#hdnAlreadyRowRmNo").val($.trim(rowData.AlrAssRms));
                    $$("grdAttendant").refresh();
                
            }
        },
    });

    $$("grdRoomStatus").refresh();
   
    fnCountAttendRooms();
}

function fnCountAttendRooms() {
    var data = $$("grdAttendant").serialize();
    var lenval = data.length;
    var AttCnt = 0;
    var RmCnt = 0;
    for (i = 0; i < lenval; i++) {
        if ($.trim(data[i].chkAssign) == "1") {
            AttCnt++;
            if ($.trim(data[i].ASSINGN_ROOM) != "") {
                var SelectedRms = $.trim(data[i].ASSINGN_ROOM);
                if (SelectedRms != null && SelectedRms != "") {
                    var vSplit = SelectedRms.split(",");
                    vSplit.forEach(function (entry) {
                        var RoomNo = $.trim(entry);
                        if (RoomNo != "")
                            RmCnt++;
                    });
                }
                else
                    RmCnt++;
            }
        }
    }
    $$("txtTotalRms").setValue(RmCnt == 0 ? "" : RmCnt);
    $$("txtAttend").setValue(AttCnt == 0 ? "" : AttCnt);
}

function fnDeleteRooms()
{
    var item = $$("grdRoomStatus").getSelectedId(true);
    var vRetRoom = "";
    var ASSINGN_ROOM = $("#hdnAlreadyRowRmNo").val();

    if (item.length == 0) {
        webix.message({ type: 'warning', text: 'Select atleast one Room' });
        webix.UIManager.setFocus($$("grdRoomStatus"));
        return false;
    }

    $.each(item, function (key, sVal) {

        var value = $$("grdRoomStatus").getText(sVal.row, sVal.column);
        var RoomNo = value;
        if (vRetRoom == "") vRetRoom = "'" + RoomNo + "'";
        else vRetRoom += "," + "'" + RoomNo + "'";
        
    });
    $("#hdnDeleRms").val($.trim(vRetRoom));
    $("#hdnAlreadyRowRmNo").val(vRetRoom);
    fnbuildRmSelect(ASSINGN_ROOM);
    $$("grdRoomStatus").refresh();
    $("#hdnDeleRms").val("");
}








