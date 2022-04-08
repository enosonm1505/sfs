
function fnLoadRooms(RmTyIds) {
    $$("grdGstProfRmSrch").clearAll();
    $$("grdTmpRm").clearAll();
    if (RmTyIds == "") return false;
    fnRmNoLoadData(RmTyIds);
};
function fnRmTypeLoad() {
    
    var rowData = [];
    var options = [];
    var CompId = $("#hdnCompId").val();

    $$("ddlGstProfType").define("options", options);
    Request = {
        REQTYPE: "GET_FOROOMTY",
        COMPID: CompId,
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
                options = rowData;
                options.splice(0, 0, { value: "<-ALL->", id: "<-ALL->" });
                $$("ddlGstProfType").define("options", options);
                $$("ddlGstProfType").setValue("");
                $$("ddlGstProfType").setValue("<-ALL->");
            }
        },
    });
};

function fnRmNoLoadData(vRmTy) {
    
   

    webix.extend($$("grdGstProfRmSrch"), webix.OverlayBox);
    //$$("grdGstProfRmSrch").showOverlay(GstProfPrgStr);
    vRmTy = vRmTy || "";

    if (vRmTy == "'<-ALL->'") vRmTy = "";


    var dataparam = {};
    dataparam["REQTYPE"] = "GET_FNALLROOMSEL";
    dataparam["RoomTy"] = vRmTy;
    dataparam["Room"] = $("#hdnAlreadyRmNo").val();
    dataparam["Fromdt"] = "01/01/2000";
    dataparam["FromTm"] = "00:00";
    dataparam["Todt"] = "01/01/2000";
    dataparam["ToTm"] = "23:59";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["BUILD"] = $("#hdnBuild").val();
    dataparam["FLOOR"] = $("#hdnFloor").val();
    dataparam["SECTION"] = $("#hdnSection").val();
    
    var DataVal = JSON.stringify(dataparam);

    var rowDatad = [];

    $.ajax({
        async: false,
        url: "/HKTrans/HKAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                
                rowDatad = JSON.parse(d);
                    

                if (rowDatad.dtroom) {
                    if (rowDatad.dtRmFtr) {
                        $$("grdTmpRm").clearAll();
                        $$("grdTmpRm").parse(rowDatad.dtRmFtr);
                        $$("grdTmpRm").refresh();
                    }
                    $$("grdGstProfRmSrch").clearAll();
                    $$("grdGstProfRmSrch").parse(rowDatad.dtroom);

                    $$("grdGstProfRmSrch").refresh();
                    var vId = $$("grdGstProfRmSrch").getFirstId();
                    $$("grdGstProfRmSrch").freezeRow(vId, true);
                    $$("grdGstProfRmSrch").refresh();

                    if (LoadSelect == "1") fnSelectRoom();

                    LoadSelect = "0";

                    var i = 0;
                }
            }
        }
    });
}

    
function fnRmTypeChange(RmTyIds) {
    if (RmTyIds != null && RmTyIds != "") {
        RmTyIds = "'" + RmTyIds.toString().trim() + "'";
        fnLoadRooms(RmTyIds);
    }
};


function fnSelectRoom() {
   
    var SelectedRms = $("#hdnAlreadyRowRmNo").val();
    if (SelectedRms != null && SelectedRms != "") {
        var vSplit = SelectedRms.split(",");
        vSplit.forEach(function (entry) {
            var RoomNo = $.trim(entry);
            $$("grdGstProfRmSrch").eachRow(function (row) {
                $$("grdGstProfRmSrch").eachColumn(function (col) {
                    
                    if (col != "Col0") {
                        var value = $$("grdGstProfRmSrch").getText(row, col);
                        if (value.trim() == RoomNo) {
                            $$("grdGstProfRmSrch").select(row, col, true);
                        }
                    }

                });
            });
        });
    }
};

function fnGstPrfRmNoSrchWindowDesign() {
    var wid_Val = 55;
    var wid_Floor = 50;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "GstProfRmNoSrch",
        head: "Room Search",
        position: "center",
        width: 900,
        height: 600,
        body: {
            padding: { left: 5 },
            rows: [
                {
                    height: 40, padding: { top: 8 },
                    cols: [
                         {
                             rows: [
                                    { view: "richselect", width: 250, labelWidth: 40, id: "ddlGstProfType", label: "Type", on: { onChange: function (newVal, OldVal) { fnRmTypeChange(newVal) } }, },
                                    { view: "text", width: 280, labelWidth: 40, id: "txtGstProfType", label: "Type", hidden: true },
                                   {}
                             ]
                         },

                        { width: 40 },
                        {
                            rows: [

                                 {
                                     view: "search",
                                     id: "txtBuild",
                                     readonly: true,
                                     maxWidth: 350,
                                     labelWidth: 60,
                                     inputwidth: 250,
                                     label: "Building",
                                     
                                     on: {
                                         onSearchIconClick: function () {
                                             fnLoadBuildPopup();
                                         },
                                         onChange: function (NewVal, OldVal) {
                                         }
                                     }

                                 },

                            ],
                        },

                         { width: 40 },
                        {
                            rows: [

                                 {
                                     view: "search",
                                     id: "txtFloor",
                                     readonly: true,
                                     maxWidth: 350,
                                     labelWidth: 35,
                                     inputwidth: 250,
                                     label: "Floor",
                                     
                                     on: {
                                         onSearchIconClick: function () {
                                             fnLoadFloorPopup();
                                         },
                                         onChange: function (NewVal, OldVal) {
                                         }
                                     }

                                 },

                            ],
                        },
                         { width: 40 },
                        {
                            rows: [

                                 {
                                     view: "search",
                                     id: "txtSection",
                                     readonly: true,
                                     maxWidth: 350,
                                     labelWidth: 60,
                                     inputwidth: 250,
                                     label: "Section",
                                     
                                     on: {
                                         onSearchIconClick: function () {
                                             fnLoadSectionPopup();
                                         },
                                         onChange: function (NewVal, OldVal) {
                                         }
                                     }

                                 },

                            ],
                        },

                        { width: 10 },
                        {
                            rows: [
                                { view: "button", id: "btnGstProfRoomSel", width: 70, css: "webix_primary", label: "Select", click: function () { fnbtnSelClick(); } },
                            ]
                        },
                        { width: 5 },
                    ]
                },
                
                      

                {
                    view: "datatable",
                    id: "grdGstProfRmSrch",
                    select: "cell",
                    header: false,
                    data: [],
                    css: "my_style",
                    rowHeight: 28,
                    height: 440,
                    scrollY: true,
                    scrollX: false,
                    multiselect: true,
                    multiselect: "touch",
                    columns: [
                            {

                                header: [{ text: "", css: { "display": "none !important" } }], id: "Col0",
                                template: function (obj) {
                                    //
                                    var array = $.trim(obj.Col0).split('~');
                                    var RoomNo = array[0].toString();
                                    return RoomNo;
                                },
                                width: wid_Floor, css: { 'text-align': 'Center ! important' }, css: "custom",
                            },
                            {
                                header: "", id: "Col1",
                                template: function (obj) {
                                    //
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
                            {
                                header: "", id: "Col10",
                                template: function (obj) {

                                    var array = $.trim(obj.Col10).split('~');
                                    var RoomNo = array[0].toString();
                                    return RoomNo;
                                },
                                width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                            },
                            {
                                header: "", id: "Col11",
                                template: function (obj) {

                                    var array = $.trim(obj.Col11).split('~');
                                    var RoomNo = array[0].toString();
                                    return RoomNo;
                                },
                                width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                            },
                            {
                                header: "", id: "Col12",
                                template: function (obj) {

                                    var array = $.trim(obj.Col12).split('~');
                                    var RoomNo = array[0].toString();
                                    return RoomNo;
                                },
                                width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                            },
                            {
                                header: "", id: "Col13",
                                template: function (obj) {

                                    var array = $.trim(obj.Col13).split('~');
                                    var RoomNo = array[0].toString();
                                    return RoomNo;
                                },
                                width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                            },
                            {
                                header: "", id: "Col14",
                                template: function (obj) {

                                    var array = $.trim(obj.Col14).split('~');
                                    var RoomNo = array[0].toString();
                                    return RoomNo;
                                },
                                width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                            },
                             {
                                 header: "", id: "Col15",
                                 template: function (obj) {

                                     var array = $.trim(obj.Col15).split('~');
                                     var RoomNo = array[0].toString();
                                     return RoomNo;
                                 },
                                 width: wid_Val, css: { 'text-align': 'Center ! important' }, css: "custom",
                             },

                    ],


                    scheme: {
                        $init: function (item) {
                            fnRetCss(item);
                        },
                    },


                    on: {
                        "onBeforeSelect": function (Select, preserve) {
                            var RowId = Select.row;
                            var ColId = Select.column;
                            var SelRow = this.getItem(RowId);
                            var vVal = SelRow[ColId];
                            if (vVal) {
                                var array = $.trim(vVal).split('~');
                                var Status = array[1].toString();
                                if (Status == "F" || Status == "FH") return false;
                            }
                            else return false;
                        },

                        'onItemDblClick': function (id) {
                            
                            var RowId = id.row;
                            var ColId = id.column;
                            var SelRow = this.getItem(RowId);
                            var vVal = SelRow[ColId];
                            //if (ColId != "Col0" && vVal != null && vVal != "") fnbtnSelClick();
                        },
                     }
                },
              
              
            { view: "text", id: "hdnColCodeInd", hidden: true, value: "0" },
            { view: "text", id: "hdnRmFtr", hidden: true, },
            { view: "text", id: "hdnRmFtrCnt", hidden: true, },
            { view: "text", id: "hdnRmTp", hidden: true, },
            { view: "text", id: "hdnBedTp", hidden: true, },
            { view: "text", id: "hdnRoomNo", hidden: true, },
            { view: "text", id: "hdnRoomSts", hidden: true, },
             
           
            {
                view: "datatable",
                id: "grdTmpRm",
                hidden: true,
                data: [],
                columns: [
                        {
                            id: "ROOM_NO",
                        },
                ],
            }
            ]
        }

    });
};

function fnRetCss(Item) {
    var rowid = 0;

    rowid = Item.id;

    $.each(Item, function (k, v) {
       
        if (k != "id") {

            var array = $.trim(v).split('~');

            if (array != "") {

                var Status = array[1].toString();
                var BInd = array[6].toString();

                if ($.trim(Status) == "D") {

                    if (BInd == "1") {
                        if ($("#hdnColCodeInd").val() == "1")
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorDB1");
                        else
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorDB2");
                    }
                    else {
                        if ($("#hdnColCodeInd").val() == "1")
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorD1");
                        else
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorD2");
                    }

                   
                }
                else if ($.trim(Status) == "V") {

                    if (BInd == "1") {
                        if ($("#hdnColCodeInd").val() == "1")
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorVB1");
                        else
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorVB2");
                    }
                    else {
                        if ($("#hdnColCodeInd").val() == "1")
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorV1");
                        else
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorV2");
                    }
                   
                }
                else if ($.trim(Status) == "OB" || $.trim(Status) == "OW" || $.trim(Status) == "OBU" || $.trim(Status) == "OWU") {

                    if ($.trim(Status) == "OB") {
                        if ($("#hdnColCodeInd").val() == "1")
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorO1");
                        else
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorO2");
                    }
                    else if ($.trim(Status) == "OW") {
                        if ($("#hdnColCodeInd").val() == "1")
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorOD1");
                        else
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorOD2");

                        
                    }
                    else if ($.trim(Status) == "OBU") {
                        if ($("#hdnColCodeInd").val() == "1")
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorOU1");
                        else
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorOU2");
                    }
                    else if ($.trim(Status) == "OWU") {
                        if ($("#hdnColCodeInd").val() == "1")
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorODU1");
                        else
                            $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorODU2");

                       
                    }

                   
                }
                else if ($.trim(Status) == "BG") {

                    if ($("#hdnColCodeInd").val() == "1")
                        $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorBG1");
                    else
                        $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorBG2");

                }
                else if ($.trim(Status) == "BGD") {

                    if ($("#hdnColCodeInd").val() == "1")
                        $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorBGD1");
                    else
                        $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorBGD2");


                }
                else if ($.trim(Status) == "B") {
                    if ($("#hdnColCodeInd").val() == "1")
                        $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorBMT1");
                    else
                        $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorBMT2");


                }
                else if ($.trim(Status) == "BM") {

                    if ($("#hdnColCodeInd").val() == "1")
                        $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorBM1");
                    else
                        $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorBM2");


                }
                else if ($.trim(Status) == "M") {
                    if ($("#hdnColCodeInd").val() == "1")
                        $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorM1");
                    else
                        $$("grdGstProfRmSrch").addCellCss(rowid, k, "BgColorM2");


                }
            }
        }
    });
}

function fnRetCssRmSelction(Item) {
    var rowid = 0;
    rowid = Item.id;

    $.each(Item, function (k, v) {
        var Room = $.trim(v);
        if (Room != "")
            $$("grdRoomStatus").addCellCss(rowid, k, "BgColorRoomSel");
    });
}




function fnbtnSelClick() {
    
    var item = $$("grdGstProfRmSrch").getSelectedId(true);
    var vRetRoom = "";
    var vRetRoom = $("#hdnAlreadyRowRmNo").val();

    if (item.length == 0) {
        webix.message({ type: 'warning', text: 'Select atleast one Room' });
        webix.UIManager.setFocus($$("grdGstProfRmSrch"));
        return false;
    }

    $.each(item, function (key, sVal) {
        
        var value = $$("grdGstProfRmSrch").getText(sVal.row, sVal.column);
        var RoomNo = value;
        if (vRetRoom.includes("'" + RoomNo + "'") == false) {
            if (vRetRoom == "") vRetRoom = "'" + RoomNo + "'";
            else vRetRoom += "," + "'" + RoomNo + "'";
        }

    });

    var row_id = $("#hdnRowId").val();
    $$("grdAttendant").updateItem(row_id, {
        ASSINGN_ROOM: vRetRoom
    });
    $("#hdnAlreadyRowRmNo").val(vRetRoom);
    $$("grdAttendant").refresh();
    $$("GstProfRmNoSrch").hide();
    $("#hdnBuild").val("");
    $("#hdnFloor").val("");
    $("#hdnSection").val("");
    fnbuildRmSelect(vRetRoom);

};

function RoomSrchClick() {
    LoadSelect = "1";
    $$("GstProfRmNoSrch").show();
    fnRmTypeLoad();
   
};

function fnLoadBuildPopup() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "BuildPopup",
        head: "Building",
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
                    id: "grdBuilding",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { id: "ROOM_BLD_NM", header: 'Building', width: 280, css: { 'text-align': 'left ! important' } },
                            { id: "Select", editor: "Checkbox", header: [{ content: "masterCheckbox", css: { 'padding': '0px ! important' } }], width: 30, css: "check_box", template: "{common.checkbox()}" },
                            { id: "ROOM_BLD_ID", hidden: true },

                    ],
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
                                                     var data = $$("grdBuilding").serialize();
                                                     var lenval = data.length;
                                                     var BuildId = '';
                                                     var BuildNm = '';
                                                     if (lenval != 0) {
                                                         for (i = 0; i < lenval; i++) {
                                                             if (data[i].Select == "1") {
                                                                 if (BuildId == "") {
                                                                     BuildId += "'" + $.trim(data[i].ROOM_BLD_ID) + "'";
                                                                     BuildNm += "" + $.trim(data[i].ROOM_BLD_NM) + "";

                                                                 }
                                                                 else {
                                                                     BuildId += ",'" + $.trim(data[i].ROOM_BLD_ID) + "'";
                                                                     BuildNm += "," + $.trim(data[i].ROOM_BLD_NM) + "";
                                                                 }
                                                             }
                                                         }
                                                     }
                                                     
                                                     $$("txtBuild").setValue(BuildNm);
                                                     $("#hdnBuild").val(BuildId)
                                                     $$("BuildPopup").hide();
                                                     fnRmTypeChange($$("ddlGstProfType").getValue());
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
                                                     $$('BuildPopup').hide();
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

    $$("BuildPopup").show();
    fnRoomFilter("1");

}

function fnLoadFloorPopup() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "FloorPopup",
        head: "Floor",
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
                    id: "grdFloor",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { id: "ROOM_BLD_NM", header: 'Floor', width: 280, css: { 'text-align': 'left ! important' } },
                            { id: "Select", editor: "Checkbox", header: [{ content: "masterCheckbox", css: { 'padding': '0px ! important' } }], width: 30, css: "check_box", template: "{common.checkbox()}" },
                            { id: "ROOM_BLD_ID", hidden: true },

                    ],
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
                                                     var data = $$("grdFloor").serialize();
                                                     var lenval = data.length;
                                                     var BuildId = '';
                                                     var BuildNm = '';
                                                     if (lenval != 0) {
                                                         for (i = 0; i < lenval; i++) {
                                                             if (data[i].Select == "1") {
                                                                 if (BuildId == "") {
                                                                     BuildId += "'" + $.trim(data[i].ROOM_BLD_ID) + "'";
                                                                     BuildNm += "" + $.trim(data[i].ROOM_BLD_NM) + "";

                                                                 }
                                                                 else {
                                                                     BuildId += ",'" + $.trim(data[i].ROOM_BLD_ID) + "'";
                                                                     BuildNm += "," + $.trim(data[i].ROOM_BLD_NM) + "";
                                                                 }
                                                             }
                                                         }
                                                     }

                                                     $$("txtFloor").setValue(BuildNm);
                                                     $("#hdnFloor").val(BuildId)
                                                     $$("FloorPopup").hide();
                                                     fnRmTypeChange($$("ddlGstProfType").getValue());
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
                                                     $$('FloorPopup').hide();
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

    $$("FloorPopup").show();
    fnRoomFilter("2");

}

function fnLoadSectionPopup() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "SectionPopup",
        head: "Section",
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
                    id: "grdSection",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { id: "L_NM", header: 'Section', width: 280, css: { 'text-align': 'left ! important' } },
                            { id: "Select", editor: "Checkbox", header: [{ content: "masterCheckbox", css: { 'padding': '0px ! important' } }], width: 30, css: "check_box", template: "{common.checkbox()}" },
                            { id: "L_NO", hidden: true },

                    ],
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
                                                     var data = $$("grdSection").serialize();
                                                     var lenval = data.length;
                                                     var BuildId = '';
                                                     var BuildNm = '';
                                                     if (lenval != 0) {
                                                         for (i = 0; i < lenval; i++) {
                                                             if (data[i].Select == "1") {
                                                                 if (BuildId == "") {
                                                                     BuildId += "'" + $.trim(data[i].L_NO) + "'";
                                                                     BuildNm += "" + $.trim(data[i].L_NM) + "";

                                                                 }
                                                                 else {
                                                                     BuildId += ",'" + $.trim(data[i].L_NO) + "'";
                                                                     BuildNm += "," + $.trim(data[i].L_NM) + "";
                                                                 }
                                                             }
                                                         }
                                                     }

                                                     $$("txtSection").setValue(BuildNm);
                                                     $("#hdnSection").val(BuildId)
                                                     $$("SectionPopup").hide();
                                                     fnRmTypeChange($$("ddlGstProfType").getValue());
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
                                                     $$('SectionPopup').hide();
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

    $$("SectionPopup").show();
    fnRoomFilter("3");

}

function fnRoomFilter(Choice) {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_RMFILTER";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["Choice"] = Choice;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/HKTrans/HKAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                if (Choice == "1") {
                    $$("grdBuilding").clearAll();
                    $$("grdBuilding").parse(rowData);
                    var BuildId = $("#hdnBuild").val();
                    var data = $$("grdBuilding").serialize();
                    var lenval = data.length;
                    if (lenval != 0) {
                        for (i = 0; i < lenval; i++) {
                            if (BuildId != "") {
                                if (BuildId.includes($.trim(data[i].ROOM_BLD_ID)) == true)
                                    data[i].Select = "1";
                                else
                                    data[i].Select = "0";

                            }
                        }
                    
                }
                    $$("grdBuilding").refresh();
                }
                else if (Choice == "2") {
                    $$("grdFloor").clearAll();
                    $$("grdFloor").parse(rowData);
                    var BuildId = $("#hdnFloor").val();
                    var data = $$("grdFloor").serialize();
                    var lenval = data.length;
                    if (lenval != 0) {
                        for (i = 0; i < lenval; i++) {
                            if (BuildId != "") {
                                if (BuildId.includes($.trim(data[i].ROOM_BLD_ID)) == true)
                                    data[i].Select = "1";
                                else
                                    data[i].Select = "0";

                            }
                        }
                    
                }
                    $$("grdFloor").refresh();
                }
                else if (Choice == "3") {
                    $$("grdSection").clearAll();
                    $$("grdSection").parse(rowData);
                    var BuildId = $("#hdnSection").val();
                    var data = $$("grdSection").serialize();
                    var lenval = data.length;
                    if (lenval != 0) {
                        for (i = 0; i < lenval; i++) {
                            if (BuildId != "") {
                                if (BuildId.includes($.trim(data[i].L_NO)) == true)
                                    data[i].Select = "1";
                                else
                                    data[i].Select = "0";

                            }
                        }
                    
                }
                    $$("grdSection").refresh();
                }
            }
        },
    });


}



    
        
        
                    
            
                  
        