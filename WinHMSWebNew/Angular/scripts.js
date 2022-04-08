function RoutingPopUpShowFn(Res_no, RNo, GId, GNm1, GNm2, stDt, enDt, Comp, Trv, PID, TrvID, SrcID, SrcNm, indx, Routprv, RmTy, Title, Mode, ConString, UsrId, CompId, usrTyId) {
    if (!webix.env.touch && webix.env.scrollSize)
        webix.CustomScroll.init();

    var GroupIdMain = "";
    var RevenueIdMain = "";

    var searchicon = "<span class='webix_input_icon wxi-search ' style='position: relative; top: 4px;left:4px;' ></span>";
    var types = [{ id: 'S', value: 'Split' }, { id: 'R', value: 'Room' }, { id: 'E', value: 'Reserve' }, { id: 'T', value: 'P.M' }];

    //webix.editors.$popup = {
    //    date: {
    //        view: 'popup',
    //        body: {
    //            view: 'calender',
    //            minDate: '2019/01/01',
    //            manDate: '2019/01/20',
    //            events: webix.Date.isHoliday,
    //            weekHeader: true,
    //            weekNumber:true
    //        }
    //    }
    //}

    webix.ui({
        view: "window",
        close: true,
        modal:true,
        id:"RoutingPopUp",
        head: "Routing - Instructions",
        position: "center",
        minWidth: 500,
        maxWidth: 800,
        height:380,
        autowidth:true,
        body: {
            view: 'form',
            minWidth: 500,
            maxWidth: 800,
            elements:[
                {
                    paddingX: 275,
                    PaddingY:5,
                    cols: [
                        {
                            minWidth: 300,
                            maxWidth: 300,
                           
                            rows: [
                                 {
                                     cols: [{
                                         view: 'button',
                                         label: 'Add Routing',
                                         maxWidth: 100,
                                         on: {
                                             onItemClick: function () {
                                                 AddRoutingRow();
                                             }
                                         }
                                     },
                                     {
                                         view: 'button',
                                         label: 'Delete Routing',
                                         maxWidth: 100,
                                         on: {
                                             onItemClick: function () {
                                                 $$("RoutingGrid").editCancel();
                                                 $$("RoutingGrid").remove($$("RoutingGrid").getSelectedId());
                                                 $$("RoutingGrid").refresh();
                                                 $$("RoutingGrid").select($$("RoutingGrid").getLastId());
                                                 $$("RoutingGrid").refresh();
                                             }
                                         }
                                     
                                     }
                                     ]
                                 }
                            ]
                        },
                         {
                             minWidth: 150,
                             maxWidth: 150,
                             paddingX:50,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Edit Splits',
                                             maxWidth: 100,
                                             on: {
                                                 onItemClick: function () {
                                                     if (parseInt($$('SplitNo').getValue()) > 0) {
                                                         $$("SplitGrid").clearAll();
                                                         AddSplitRow(parseInt($$('SplitNo').getValue()), GId,Title, GNm1, GNm2);
                                                         $$('SplitPopUp').show();
                                                         $$('Add1').setValue('');
                                                         $$('Add2').setValue('');
                                                         $$('Add3').setValue('');
                                                         $$('Add4').setValue('');
                                                     }
                                                     else {
                                                         $$("SplitGrid").clearAll();
                                                         webix.message({
                                                             type: 'debug',
                                                             text: 'Edit No.Of Split > 0'
                                                         });
                                                     }
                                                 }
                                             }
                                         },
                                         {
                                             view: 'text',
                                             label: ' ',
                                             id:'SplitNo',
                                             maxWidth: 50,
                                             labelWidth: 0,
                                             value:0
                                         },
                                     ]
                                 }
                            ]
                        }
                    ]

                },
                {
                    view: "datatable",
                    id: "RoutingGrid",
                    select: "row",
                    data: [],
                    height: 280,
                    scrollX: false,
                    editable:true,
                    columns: [
                           { header: "EntireStay", id: "Entire_Stay", width: 70, template: "{common.checkbox()}", css: { 'text-align': 'center ! important' } },
                           { header: "Start Dt", id: "Start_Dt", editor: "date",format:webix.Date.dateToStr("%d/%m/%Y"), width: 75, css: { 'text-align': 'left ! important' } },
                           { header: "End Dt", id: "End_Dt", editor: "date", format: webix.Date.dateToStr("%d/%m/%Y"), width: 75, css: { 'text-align': 'left ! important' } },
                           { header: " ", id: "Type", width: 85, css: { 'text-align': 'left ! important' }, editor: "select", collection: function (id) { return types; } },
                           { header: "Assign To", id: "Assign_To", width: 65, editor: "text", liveEdit: true, css: { 'text-align': 'center ! important' } },
                           { header: " ", id: "Icon1", width: 25, template: searchicon, css: { 'text-align': 'center ! important' }, hidden: true },
                           { header: "Name", id: "Name", width: 160, css: { 'text-align': 'left ! important' } },
                           { header: "Group/Revenue ", id: "Grp_Revenue", width: 220, css: { 'text-align': 'left ! important' } },
                           { header: "Revenue", id: "Revenue", hidden: true },
                           { header: "%", id: "Percentage", hidden: true },
                           { header: "Res_No", id: "Res_No", hidden: true },
                           { header: "GroupId", id: "GroupId", hidden: true },
                           { header: "ixSplitAmt", id: "ixSplitAmt", hidden: true },
                           { header: "ixSplitToNo", id: "ixSplitToNo", hidden: true },
                           { header: "ixSplitTax", id: "ixSplitTax", hidden: true },
                           { header: "ParentSrNo", id: "ParentSrNo", hidden: true },
                    ],
                    on: {
                        onLiveEdit: function (state, editor) {
                            debugger;
                            var getval = this.getItem(editor.row);
                            if (editor.column == "Assign_To" && getval.Type == "S") {
                                if (state.value > 0) {
                                    var Dataval = $$('SplitGrid').serialize();
                                    if (Dataval.length > 0) {
                                        for (i = 0; i < Dataval.length; i++) {
                                            if (Dataval[i].Split == state.value) {
                                                getval.Name = Dataval[i].Bill_Name;
                                            }
                                        }
                                    }
                                    else {
                                       
                                        webix.message({
                                            type: 'debug',
                                            text: 'Routing Split is Empty...'
                                        });
                                    }
                                   
                                }
                                else {
                                    getval.Assign_To = 0;
                                    getval.Name = "";
                                   
                                }
                                this.refresh();
                            }
                        },
                        onItemClick: function (id) {
                            var getval = this.getItem(id.row);
                            if (id.column == 'Grp_Revenue') {
                                
                                $$('SplitIdpop').setValue($$('SplitNo').getValue());
                                $$('GroupRevPopUp').show();
                                GroupIdMain = getval.GroupId;
                                RevenueIdMain = getval.Revenue;

                                if (getval.Type == "S") {
                                    $$('DynamicLbl').config.label = 'Splits No.';
                                    $$('DynamicLbl').refresh();
                                    $$('SplitIdPer').enable();
                                }
                                else if (getval.Type == "T") {
                                    $$('DynamicLbl').config.label = 'P.M';
                                    $$('DynamicLbl').refresh();
                                    $$('SplitIdPer').disable();
                                }
                                else if (getval.Type == "R") {
                                    $$('DynamicLbl').config.label = 'Room';
                                    $$('DynamicLbl').refresh();
                                    $$('SplitIdPer').disable();
                                }
                                else if (getval.Type == "E") {
                                    $$('DynamicLbl').config.label = 'Reserve';
                                    $$('DynamicLbl').refresh();
                                    $$('SplitIdPer').disable();
                                }
                            }
                            else if (id.column == 'Icon1') {
                                if (getval.Type == "R") {
                                    

                                    var ColumnConf = $$("GuestpopGrid").config.columns;
                                    ColumnConf.splice(0, 1);
                                    $$("GuestpopGrid").refreshColumns();
                                    ColumnConf.splice(0, 0, {
                                        id: "REG_NO", header: ['Reg No.', { content: "textFilter" }], width: 80, css: { 'text-align': 'center ! important' } 
                                    });
                                    $$("GuestpopGrid").refreshColumns();

                                    GuestPopupLoadFn(RNo, GId, ConString, UsrId, CompId);
                                }
                                else if (getval.Type == "E") {
                                    var ColumnConf = $$("GuestpopGrid").config.columns;
                                    ColumnConf.splice(0, 1);
                                    $$("GuestpopGrid").refreshColumns();
                                    ColumnConf.splice(0, 0, {
                                        id: "REG_NO", header: ['Reserve No.', { content: "textFilter" }], width: 80, css: { 'text-align': 'center ! important' }
                                    });
                                    $$("GuestpopGrid").refreshColumns();
                                    GuestPopupLoadFn1(RNo, GId, ConString, UsrId, CompId);
                                }
                                else {
                                    PMPopupLoadFn(RNo, GId, ConString, UsrId, CompId);
                                }
                            }

                        },
                        'onBeforeEditStart': function (id) {
                            var getval = this.getItem(id.row);
                            if (id.column == 'Start_Dt' || id.column == 'End_Dt') {
                                if (getval.Entire_Stay == "1") {
                                    return false;
                                }
                                else {
                                    return true;
                                }

                            }
                            if (id.column == 'Assign_To') {
                                if (getval.Type != 'S') {
                                    return false;
                                }
                            }
                        },
                        'onEditorChange': function (id, value) {
                            debugger;
                            var getval = this.getItem(id.row);
                            if (id.column == 'Type') {
                                if (value != 'S') {
                                    $$("RoutingGrid").showColumn('Icon1');
                                    getval.Name = '';
                                    getval.Assign_To = '';
                                }
                                else {
                                    getval.Name = '';
                                    getval.Assign_To = '';
                                    $$("RoutingGrid").hideColumn('Icon1');
                                }
                                $$("RoutingGrid").refresh();
                            }
                           
                            this.refresh();
                        },
                    }
                    
                },
                 {
                     PaddingY:20,
                     cols: [
                          {
                              minWidth: 250,
                              maxWidth: 250,

                              rows: [
                                   {
                                       cols: [{
                                           view: 'icon',
                                           icon: 'wxi-file',
                                           maxWidth: 30,
                                       },
                                          {
                                              view: 'button',
                                              label: 'Log Inst',
                                              maxWidth: 70
                                          },
                                           {
                                               view: 'button',
                                               label: 'Log Split',
                                               maxWidth: 80
                                           },
                                       ]
                                   }
                              ]
                          },
                         {
                             minWidth: 340,
                             maxWidth: 340,
                             rows: [
                                  {
                                      cols: [{
                                          view: 'button',
                                          label: 'Auto Routing',
                                          maxWidth: 100,
                                        },
                                         {
                                             view: 'button',
                                             label: 'Repost',
                                             maxWidth: 70
                                         },
                                          {
                                              view: 'button',
                                              label: 'Group Update',
                                              maxWidth: 100
                                          },
                                      ]
                                  }
                             ]
                         },
                          {
                              minWidth: 150,
                              maxWidth: 150,
                              paddingX: 50,
                              rows: [
                                  {
                                      cols: [
                                         {
                                             view: 'button',
                                             label: 'Save',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {

                                                     var SplitGrd = $$("SplitGrid").serialize();
                                                     if (SplitGrd.length > 0) {

                                                     }
                                                     else {
                                                         webix.message({
                                                             type: 'debug',
                                                             text: 'Routing Splits is Empty...'
                                                         });
                                                         return false;
                                                     }
                                                     var RoutingGrd = $$("RoutingGrid").serialize();
                                                     if (RoutingGrd.length > 0) {
                                                         for (i = 0; i < RoutingGrd.length; i++) {
                                                          
                                                             if (RoutingGrd[i].Type == "") {
                                                                 webix.message({
                                                                     type: 'debug',
                                                                     text: 'Type should be selected'
                                                                 });
                                                                 $$("RoutingGrid").select(RoutingGrd[i].id, "Type", false);
                                                                 webix.UIManager.setFocus($$("RoutingGrid"));
                                                                 return false;
                                                             }
                                                             if (RoutingGrd[i].Assign_To == "") {
                                                                 webix.message({
                                                                     type: 'debug',
                                                                     text: 'Assign To should be selected'
                                                                 });
                                                                 $$("RoutingGrid").select(RoutingGrd[i].id, "Assign_To", false);
                                                                 webix.UIManager.setFocus($$("RoutingGrid"));
                                                                 return false;
                                                             }
                                                             if (RoutingGrd[i].Name == "") {
                                                                 webix.message({
                                                                     type: 'debug',
                                                                     text: 'Name should be selected'
                                                                 });
                                                                 $$("RoutingGrid").select(RoutingGrd[i].id, "Name", false);
                                                                 webix.UIManager.setFocus($$("RoutingGrid"));
                                                                 return false;
                                                             }
                                                             if (RoutingGrd[i].Grp_Revenue == "") {
                                                                 webix.message({
                                                                     type: 'debug',
                                                                     text: 'Group Revenue should be selected'
                                                                 });
                                                                 $$("RoutingGrid").select(RoutingGrd[i].id, "Grp_Revenue", false);
                                                                 webix.UIManager.setFocus($$("RoutingGrid"));
                                                                 return false;
                                                             }
                                                         }
                                                         localStorage.setItem('RoutingGrid', JSON.stringify(RoutingGrd));
                                                         localStorage.setItem('SplitGrid', JSON.stringify(SplitGrd));
                                                     }
                                                     else {
                                                         webix.message({
                                                             type: 'debug',
                                                             text: 'Routing is Empty...'
                                                         });
                                                         return false;
                                                     }

                                                     $$('RoutingPopUp').hide();
                                                 }
                                             }
                                         },
                                         {
                                             view: 'button',
                                             label: 'Exit',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('RoutingPopUp').hide();
                                                 }
                                             }
                                         }
                                      ]
                                  }
                              ]
                          }
                     ]
                 },
               
                ]
            }
    });

    /////group revenue

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GroupRevPopUp",
        head: "Routing Details",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        height: 400,
        autowidth: true,
        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            elements: [
                {
                    rows: [
                        {
                            view: 'label',
                            label: 'Splits No.',
                            id:'DynamicLbl'
                        },
                        {
                           
                            cols: [
                                        {
                                            view: 'text',
                                            label: ' ',
                                            labelWidth: 0,
                                            inputWidth: 50,
                                            maxWidth: 60,
                                            id: 'SplitIdpop',
                                            disabled:true
                                        },
                                        {
                                            view: 'text',
                                            label: '%',
                                            labelWidth: 20,
                                            inputWidth: 70,
                                            value:'100',
                                            maxWidth: 150,
                                            id: 'SplitIdPer',
                                            on: {
                                                onItemClick: function () {
                                                    $$('SplitPerPopUp').show();
                                                    $$('SplitPer').setValue($$('SplitIdPer').getValue());
                                                }
                                            }
                                           
                                        },
                                        {
                                            view: 'button',
                                            label: 'Group',
                                            maxWidth: 70,
                                            on: {
                                                onItemClick: function () {
                                                    var data = $$("GroupRevGrid").serialize();
                                                    var lenval = data.length;
                                                    var indx = "";
                                                   var GroupId= "";
                                                    if (lenval != 0) {
                                                        for (i = 0; i < lenval; i++) {
                                                            debugger;
                                                            indx = i;
                                                            if (data[i].Filed == 'G') {
                                                                if (GroupId == "") {
                                                                    GroupId = "'" + data[i].Id + "'";
                                                                }
                                                                else {
                                                                    GroupId += ",'" + data[i].Id + "'";
                                                                }
                                                            }

                                                        }
                                                    }
                                                    GroupRevLoadFn(RNo, GId, ConString, UsrId, CompId, GroupId);
                                                    $$('GroupSelectPopUp').show();
                                                    GroupId = "";
                                                   
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            label: 'Revenue',
                                            maxWidth: 70,
                                            on: {
                                                onItemClick: function () {
                                                    var data = $$("GroupRevGrid").serialize();
                                                    var lenval = data.length;
                                                    var indx = "";
                                                    var RevenueId = "";
                                                    var GroupId = "";
                                                    if (lenval != 0) {
                                                        for (i = 0; i < lenval; i++) {
                                                            debugger;
                                                            indx = i;
                                                            if (data[i].Filed == 'R') {
                                                                if (RevenueId == "") {
                                                                    RevenueId = "'" + data[i].Id + "'";
                                                                }
                                                                else {
                                                                    RevenueId += ",'" + data[i].Id + "'";
                                                                }
                                                            }
                                                            if (data[i].Filed == 'G') {
                                                                if (GroupId == "") {
                                                                    GroupId = "'" + data[i].Id + "'";
                                                                }
                                                                else {
                                                                    GroupId += ",'" + data[i].Id + "'";
                                                                }
                                                            }


                                                        }
                                                    }
                                                    RevenueLoadFn(RNo, GId, ConString, UsrId, CompId, RevenueId, GroupId);
                                                    $$('RevenueSelectPopUp').show();
                                                    RevenueId = "";
                                                }
                                            }
                                        },
                                        {
                                            view: 'icon',
                                            icon: 'wxi-trash',
                                            maxWidth: 20,
                                            on: {
                                                onItemClick: function () {
                                                    $$("GroupRevGrid").remove($$("GroupRevGrid").getSelectedId());
                                                    $$("GroupRevGrid").refresh();
                                                }
                                            }
                                        }
                            ]
                        },
                        {
                            view: 'label',
                            label: 'Note: Double Click % to edit Split %',
                            labelWidth:300
                            
                        }
                    ]
                },
                {
                    view: "datatable",
                    id: "GroupRevGrid",
                    select: "row",
                    data: [],
                    height: 250,
                    scrollX: false,
                    editable: true,
                    columns: [
                           { header: " ", id: "Filed", width: 50, css: { 'text-align': 'center ! important' } },
                           { header: "Id", id: "Id", width: 80, css: { 'text-align': 'center ! important' } },
                           { header: "Revenue", id: "Revenue", width: 245, css: { 'text-align': 'left ! important' }, },
                    ],
                    on: {
                        onItemClick: function (id) {
                            var getval = this.getItem(id.row);

                        }
                    }
                },
                {
                    cols: [
                        {},
                        {
                            cols: [
                                {
                                    view: 'button',
                                    label: 'Ok',
                                    on: {
                                        onItemClick: function () {
                                            var dataval = $$('GroupRevGrid').serialize();
                                            var Grp = "";
                                            var Rev = "";
                                            if (dataval.length > 0) {
                                                for (i = 0; i < dataval.length; i++) {
                                                    if (dataval[i].Filed == 'G') {
                                                        if (Grp == '') {
                                                            Grp = dataval[i].Id;
                                                        }
                                                        else {
                                                            Grp += ',' + dataval[i].Id;
                                                        }
                                                    }
                                                    if (dataval[i].Filed == 'R') {
                                                        if (Rev == '') {
                                                            Rev = dataval[i].Id;
                                                        }
                                                        else {
                                                            Rev += ',' + dataval[i].Id;
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                webix.message({
                                                    type: 'debug',
                                                    text: 'Routing Group Revenue is Empty...'
                                                });
                                            }
                                            if (Grp != "" || Rev != "") {
                                                var GetVal = $$('RoutingGrid').getSelectedItem();
                                                GetVal.Grp_Revenue = Grp + "," + Rev;
                                                GetVal.GroupId = Grp;
                                                GetVal.Revenue = Rev;
                                                $$('RoutingGrid').refresh();
                                                $$('GroupRevPopUp').hide();
                                            }
                                        }
                                    }
                                },
                                {
                                    view: 'button',
                                    label: 'Exit',
                                    on: {
                                        onItemClick: function () {
                                            $$('GroupRevPopUp').hide();
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    });

    //////group selection

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GroupSelectPopUp",
        head: "Group Selection",
        position: "center",
        minWidth: 300,
        maxWidth: 300,
        height: 420,
        autowidth: true,
        body: {
            view: 'form',
            minWidth: 300,
            maxWidth: 300,
            elements: [
                {
                    view: "datatable",
                    id: "GroupSelectGrid",
                    select: "row",
                    data: [],
                    height: 350,
                    scrollX: false,
                    editable: true,
                    multiselect:true,
                    columns: [
                           { header: "Id", id: "R_GI", width: 80, css: { 'text-align': 'center ! important' }, hidden: true },
                           { header: ["Group Name", { content: "textFilter" }], id: "R_GN", width: 245, css: { 'text-align': 'left ! important' }, },
                           { header: " ", id: "CheckInd", width: 30, css: { 'text-align': 'center ! important' }, template: "{common.checkbox()}" },
                      
                    ],
                    on: {
                      
                    }
                },
                {
                    cols: [
                        {},
                        {
                            cols: [
                                {
                                    view: 'button',
                                    label: 'Ok',
                                    on: {
                                        onItemClick: function () {
                                            var getval = $$('GroupSelectGrid').serialize();
                                            var data = $$("GroupRevGrid").serialize();
                                            var lenval = getval.length;
                                            var indx = "";
                                            if (lenval != 0) {
                                                for (i = 0; i < lenval; i++) {
                                                    debugger;
                                                    indx = i;
                                                    if (getval[i].CheckInd == '1') {
                                                        var addrow = {
                                                            Filed: 'G', Id: getval[i].R_GI, Revenue: getval[i].R_GN
                                                        };
                                                        $$("GroupRevGrid").add(addrow);
                                                    }

                                                }
                                            }
                                          
                                            $$("GroupRevGrid").refresh();
                                            $$('GroupSelectPopUp').hide();
                                        }
                                    }
                                },
                                {
                                    view: 'button',
                                    label: 'Exit',
                                    on: {
                                        onItemClick: function () {
                                            $$('GroupSelectPopUp').hide();
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    });

    //////Revenue selection

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "RevenueSelectPopUp",
        head: "Revenue Selection",
        position: "center",
        minWidth: 300,
        maxWidth: 300,
        height: 420,
        autowidth: true,
        body: {
            view: 'form',
            minWidth: 300,
            maxWidth: 300,
            elements: [
                {
                    view: "datatable",
                    id: "RevenueSelectGrid",
                    select: "row",
                    data: [],
                    height: 350,
                    scrollX: false,
                    editable: true,
                    multiselect: true,
                    columns: [
                           { header: "Id", id: "Rev_Id", width: 80, css: { 'text-align': 'center ! important' }, hidden: true },
                           {header: ["Revenue Name", { content: "textFilter" }], id: "Revenue_Nm", width: 245, css: { 'text-align': 'left ! important' },},
                           { header: " ", id: "CheckInd", width: 30, css: { 'text-align': 'center ! important' }, template: "{common.checkbox()}" },
                    ],
                    on: {
                       
                    }
                },
                {
                    cols: [
                        {},
                        {
                            cols: [
                                {
                                    view: 'button',
                                    label: 'Ok',
                                    on: {
                                        onItemClick: function () {
                                            var getval = $$('RevenueSelectGrid').serialize();
                                            var data = $$("GroupRevGrid").serialize();
                                            var lenval = getval.length;
                                            var indx = "";
                                            if (lenval != 0) {
                                                for (i = 0; i < lenval; i++) {
                                                    debugger;
                                                    indx = i;
                                                    if (getval[i].CheckInd == '1') {
                                                        var addrow = {
                                                            Filed: 'R', Id: getval[i].Rev_Id, Revenue: getval[i].Revenue_Nm
                                                        };
                                                        $$("GroupRevGrid").add(addrow);
                                                    }

                                                }
                                            }
                                            $$("GroupRevGrid").refresh();
                                            $$('RevenueSelectPopUp').hide();
                                        }
                                    }
                                },
                                {
                                    view: 'button',
                                    label: 'Exit',
                                    on: {
                                        onItemClick: function () {
                                            $$('RevenueSelectPopUp').hide();
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    });

    //////SplitPer selection

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "SplitPerPopUp",
        head: "Split % Details",
        position: "center",
        minWidth: 300,
        maxWidth: 300,
        height: 140,
        autowidth: true,
        body: {
            view: 'form',
            minWidth: 300,
            maxWidth: 300,
            elements: [
                {
                    rows: [
                        {
                            view: 'text',
                            label: 'Split %',
                            id:'SplitPer',
                            labelWidth: 100,
                            minWidth: 150,
                            maxWidth: 150,
                        },
                        {
                            view: 'combo',
                            label: 'Move to Split',
                            labelWidth: 100,
                            id:'SplitMove',
                            options:[]
                        },
                        {
                            view: 'checkbox',
                            labelWidth: 120,
                            id:'SplitTaxChk',
                            label: 'Split Related Taxes',
                            
                        },

                   ]
                },
                {
                    cols: [
                        {},
                        {
                            cols: [
                                {
                                    view: 'button',
                                    label: 'Save',
                                    on: {
                                        onItemClick: function () {
                                            var GetVal = $$('RoutingGrid').getSelectedItem();
                                            GetVal.ixSplitAmt = $$('SplitPer').getValue();
                                            GetVal.ixSplitToNo = $$('SplitMove').getValue();
                                            GetVal.ixSplitTax = $$('SplitTaxChk').getValue();
                                            $$('RoutingGrid').refresh();
                                            $$('SplitPerPopUp').hide();
                                        }
                                    }
                                },
                                {
                                    view: 'button',
                                    label: 'Exit',
                                    on: {
                                        onItemClick: function () {
                                            $$('SplitPerPopUp').hide();
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    });


    //////Guest popup selection

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GuestPopUp",
        head: "Inhouse Guest Search",
        position: "center",
        minWidth: 1100,
        maxWidth: 1100,
        height: 470,
        autowidth: true,
        body: {
            view: 'form',
            minWidth: 1100,
            maxWidth: 1100,
            elements: [
                {
                    view: "datatable",
                    id: "GuestpopGrid",
                    select: "row",
                    data: [{}],
                    height: 400,
                    scrollX: false,
                    editable: true,
                    columns: [
                        { id: "REG_NO", header: ['Reg No.', { content: "textFilter" }], width: 70, css: { 'text-align': 'center ! important' } },
                        { id: "R_NO", header: ['R No.', { content: "textFilter" }], width: 70, css: { 'text-align': 'center ! important' } },
                        { id: "ROOM_TY_ID", header: ['Type', { content: "textFilter" }], width: 60, css: { 'text-align': 'center ! important' } },
                        { id: "Room_No", header: ['Room', { content: "textFilter" }], width: 70, css: { 'text-align': 'center ! important' } },
                        { id: "Guest_NM", header: ['Guest Name', { content: "textFilter" }], width: 250, },
                        { id: "PAX", header: ['Pax', { content: "textFilter" }], width: 40, css: { 'text-align': 'center ! important' } },
                        { id: "PARTY_NM", header: ['Company', { content: "textFilter" }], width: 170, },
                        { id: "TRV_AGENT_NM", header: ['Agent', { content: "textFilter" }], width: 120, },
                        { id: "GUEST_ID", header: 'GuestId', width: 140, hidden: true },
                        { id: "Arrival_Dt", header: ['Arrival Dt', { content: "textFilter" }], width: 100, css: { 'text-align': 'center ! important' } },
                        { id: "Departure_Dt", header: ['Departure Dt', { content: "textFilter" }], width: 100, css: { 'text-align': 'center ! important' } },
                    ],
                    on: {
                        onItemClick: function (id) {
                            var getval = this.getItem(id.row);

                        }
                    }
                },
                {
                    cols: [
                        {},
                        {},
                        {},
                        {
                            cols: [
                                {
                                    view: 'button',
                                    label: 'Ok',
                                    on: {
                                        onItemClick: function () {
                                            var RoomRes = $$('GuestpopGrid').getSelectedItem();
                                            var GetVal = $$('RoutingGrid').getSelectedItem();
                                            GetVal.Assign_To = RoomRes.REG_NO;
                                            GetVal.Name = RoomRes.Guest_NM;
                                            $$('RoutingGrid').refresh();
                                            $$('GuestPopUp').hide();
                                        }
                                    }
                                },
                                {
                                    view: 'button',
                                    label: 'Exit',
                                    on: {
                                        onItemClick: function () {
                                            $$('GuestPopUp').hide();
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    });


    //////PM popup selection

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PMPopUp",
        head: "P.M Guest Search",
        position: "center",
        minWidth: 600,
        maxWidth: 600,
        height: 470,
        autowidth: true,
        body: {
            view: 'form',
            minWidth: 600,
            maxWidth: 600,
            elements: [
                {
                    view: "datatable",
                    id: "PMGrid",
                    select: "row",
                    data: [{}],
                    height: 400,
                    scrollX: false,
                    editable: true,
                    columns: [
                        { id: "Reg_No", header: ['Reg No.', { content: "textFilter" }], width: 70, css: { 'text-align': 'center ! important' } },
                        { id: "Room_Ty_Id", header: ['Type', { content: "textFilter" }], width: 60, css: { 'text-align': 'center ! important' } },
                        { id: "Room_No", header: ['Room', { content: "textFilter" }], width: 75, css: { 'text-align': 'center ! important' } },
                        { id: "Guest_NM", header: ['Guest Name', { content: "textFilter" }], width: 230, },
                        { id: "Pax", header: ['Pax', { content: "textFilter" }], width: 60, css: { 'text-align': 'center ! important' } },
                        { id: "Checkin", header: ['Checkin', { content: "textFilter" }], width: 80, },
                        { id: "GUEST_ID", header: 'GuestId', width: 140, hidden: true },
                    ],
                    on: {
                        onItemClick: function (id) {
                            var getval = this.getItem(id.row);

                        }
                    }
                },
                {
                    cols: [
                        {},
                        {},
                        {
                            cols: [
                                {
                                    view: 'button',
                                    label: 'Ok',
                                    on: {
                                        onItemClick: function () {
                                            var PMGD = $$('PMGrid').getSelectedItem();
                                            var GetVal = $$('RoutingGrid').getSelectedItem();
                                            GetVal.Assign_To = PMGD.Reg_No;
                                            GetVal.Name = PMGD.Guest_NM;
                                            $$('RoutingGrid').refresh();
                                            $$('GuestPopUp').hide();
                                        }
                                    }
                                },
                                {
                                    view: 'button',
                                    label: 'Exit',
                                    on: {
                                        onItemClick: function () {
                                            $$('PMPopUp').hide();
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    });


    $$("RoutingPopUp").show();
    SplitPopupLoadFn(Res_no, RNo, GId, GNm1, GNm2, stDt, enDt, Comp, Trv, PID, TrvID, SrcID, SrcNm, indx, Routprv, RmTy, Title, Mode, ConString, UsrId, CompId, usrTyId);
}

function SplitPopupLoadFn(Res_no, RNo, GId, GNm1, GNm2, stDt, enDt, Comp, Trv, PID, TrvID, SrcID, SrcNm, indx, Routprv, RmTy, Title, Mode, ConString, UsrId, CompId, usrTyId) {

    var DataVal = FoRoutingSplitLoadFn(RNo,GId, RmTy, Title, Mode, ConString, UsrId, CompId, usrTyId);
    debugger;
    var FOCONT = DataVal.FOCONT;
    var F11_Ind = FOCONT[0].F11_Ind;
    var FOCONTROL = DataVal.FOCONTROL;
    var M12_Ind = FOCONTROL[0].M12_Ind;
    var SETTLEMODE = DataVal.SETTLEMODE;
    var ROOMEXTENSION = "";
    var CheckBool = true;
    if (M12_Ind == 0) {
        CheckBool = true;
    }
    else {
        CheckBool = false;
        ROOMEXTENSION = DataVal.ROOMEXTENSION;
    }
    var ROUTESPLIT = "";
    if (Mode == 'A') {
        ROUTESPLIT = DataVal.ROUTESPLIT;
    }

    debugger;
    var Settle = SETTLEMODE;
    var types = "";
    if (F11_Ind==0)
         types = [{ id: 'G', value: 'Guest' }, { id: 'C', value: 'Company' }, { id: 'T', value: 'Agent' }, ];
    else
        types = [{ id: 'G', value: 'Guest' }, { id: 'C', value: 'Company' }, { id: 'T', value: 'Agent' }, { id: 'S', value: 'Source' }];
    webix.ui({
    view: "window",
    close: true,
    modal:true,
    id:"SplitPopUp",
    head: "Routing - Split Name",
    position: "center",
    minWidth: 500,
    maxWidth: 700,
    height:360,
    autowidth:true,
    body: {
        view: 'form',
        minWidth: 500,
        maxWidth: 700,
        elements:[
            {
                     view: "datatable",
                     id: "SplitGrid",
                     select: "row",
                     data: [],
                     height: 180,
                     scrollX: false,
                     editable: true,
                     columns: [
                            { header: "Split", id: "Split", width: 50, css: { 'text-align': 'center ! important' } },
                            { header: "Extensions", id: "Extensions", width: 80, css: { 'text-align': 'center ! important' }, hidden: CheckBool },
                            { header: "Type", id: "Type", width: 100, css: { 'text-align': 'left ! important' }, editor: "select", collection: function (id) { return types; } },
                            { header: "Bill Name", id: "Bill_Name", width: 230, css: { 'text-align': 'left ! important' } },
                            { header: "Settlement", id: "Settlement", width: 135, css: { 'text-align': 'left ! important' }, editor: "select", collection: function (id) { return Settle; } },
                            { header: "Add1", id: "Add1", hidden: true },
                            { header: "Add2", id: "Add2", hidden: true },
                            { header: "Add3", id: "Add3", hidden: true },
                            { header: "Add4", id: "Add4", hidden: true },
                            { header: "PostCd", id: "PostCd", hidden: true },
                            { header: "PartyId", id: "PartyId", hidden: true },
                            { header: "GId", id: "GId", hidden: true },
                            { header: "Guest_Sno", id: "Guest_Sno", hidden: true },
                            { header: "Trv_Agent", id: "Trv_Agent", hidden: true },
                            { header: "SrcId", id: "SrcId", hidden: true },
                            { header: "RoomNo", id: "RoomNo", id: "Extensions", width: 80, css: { 'text-align': 'center ! important' }, hidden: CheckBool },
                     ],
                     on: {
                         onItemClick: function (id) {
                             var getval = this.getItem(id.row);
                             $$('Add1').setValue(getval.Add1);
                             $$('Add2').setValue(getval.Add2);
                             $$('Add3').setValue(getval.Add3);
                             $$('Add4').setValue(getval.Add4);
                         },
                         onItemDblClick: function (id) {
                             var getval = this.getItem(id.row);
                             debugger;
                             if (id.column == 'Bill_Name') {
                                 if (getval.Type == 'G' && Mode == 'A') {
                                     GuestSplitLoadFn(RNo,GId, ConString, UsrId, CompId, usrTyId);
                                     $$('GuestSplitPopUp').show();

                                 }
                                
                             }
                             
                         },
                         'onEditorChange': function (id, value) {
                             debugger;
                             var getval = this.getItem(id.row);
                             if (id.column == 'Type') {
                                 if (value == 'G') {
                                     getval.PartyId = '';
                                     getval.SrcId = '';
                                     getval.Trv_Agent = '';
                                     if (Mode == 'A') {
                                         GuestSplitLoadFn(RNo, GId, ConString, UsrId, CompId, usrTyId);
                                         $$('GuestSplitPopUp').show();
                                     }
                                     else{ 
                                     getval.Bill_Name = Title+GNm1+', '+GNm2;
                                     getval.G_Id = GId;
                                     getval.Guest_Sno = '1';
                                     }

                                 }
                                 else if (value == 'C') {
                                     getval.Bill_Name = Comp;
                                     getval.PartyId = PID;
                                     getval.G_Id = '';
                                     getval.Guest_Sno = ' ';
                                     getval.SrcId = '';
                                     getval.Trv_Agent = '';
                                 }
                                 else if (value == 'S') {
                                     getval.Bill_Name = SrcNm;
                                     getval.SrcId = SrcID;
                                     getval.G_Id = '';
                                     getval.PartyId = '';
                                     getval.Trv_Agent = '';
                                     getval.Guest_Sno = ' ';
                                 }
                                 else if (value == 'T') {
                                     getval.Bill_Name = Trv;
                                     getval.Trv_Agent = TrvID;
                                     getval.G_Id = '';
                                     getval.PartyId = '';
                                     getval.Guest_Sno = ' ';
                                     getval.SrcId = '';
                                 }
                             }
                         }
                     }
            },
            {
                cols: [
                    {
                        minWidth: 500,
                        maxWidth: 500,
                        rows: [
                        {
                            view: 'text',
                            label: 'Bill Address',
                            id:'Add1',
                            maxWidth: 400,
                            on:{
                                onBlur: function (id) {
                                    var selectedRows = $$('SplitGrid').getSelectedItem();
                                    selectedRows.Add1 = $$('Add1').getValue();
                                }
                            }
                           
                        },
                         {
                             view: 'text',
                             label: ' ',
                             id: 'Add2',
                             maxWidth: 400,
                             on: {
                                 onBlur: function (id) {
                                     var selectedRows = $$('SplitGrid').getSelectedItem();
                                     selectedRows.Add2 = $$('Add2').getValue();
                                 }
                             }
                         },    
                         {
                             view: 'text',
                             label: '  ',
                             id: 'Add3',
                             maxWidth: 400,
                             on: {
                                 onBlur: function (id) {
                                     var selectedRows = $$('SplitGrid').getSelectedItem();
                                     selectedRows.Add3 = $$('Add3').getValue();
                                 }
                             }
                         },
                          {
                              view: 'text',
                              label: ' ',
                              id: 'Add4',
                              maxWidth: 400,
                              on: {
                                  onBlur: function (id) {
                                      var selectedRows = $$('SplitGrid').getSelectedItem();
                                      selectedRows.Add4 = $$('Add4').getValue();
                                  }
                              }
                          },
                        ]
                    },
                    {
                        minWidth: 150,
                        maxWidth: 150,
                        rows: [
                       
                        {
                            view: 'button',
                            label: 'Personal',
                            maxWidth: 70,
                            on: {
                                onItemClick: function () {
                                    var selectedRows = $$('SplitGrid').getSelectedItem();
                                    var AddrTy = 'P';
                                    var DataVal = FoGuestAddressFn(GId, ConString, UsrId, CompId, usrTyId, AddrTy);
                                    debugger;
                                    var GUESTADDR = DataVal;
                                    if (GUESTADDR[0].Add1 == null) { $$('Add1').setValue(''); selectedRows.Add1 = ''; }
                                    else { $$('Add1').setValue(GUESTADDR[0].Add1); selectedRows.Add1 = GUESTADDR[0].Add1; }
                                    if (GUESTADDR[0].Add2 == null) { $$('Add2').setValue(''); selectedRows.Add2 = ''; }
                                    else { $$('Add2').setValue(GUESTADDR[0].Add2); selectedRows.Add2 = GUESTADDR[0].Add2; }
                                    if (GUESTADDR[0].Add3 == null) { $$('Add3').setValue(''); selectedRows.Add3 = ''; }
                                    else { $$('Add3').setValue(GUESTADDR[0].Add3); selectedRows.Add3 = GUESTADDR[0].Add3; }
                                    if (GUESTADDR[0].Place == null && GUESTADDR[0].pin_cd == null) { $$('Add4').setValue(''); selectedRows.Add4 = ''; }
                                    else {
                                        $$('Add4').setValue(GUESTADDR[0].Place + ' ' + GUESTADDR[0].pin_cd);
                                        selectedRows.Add4 = GUESTADDR[0].Place + ' ' + GUESTADDR[0].pin_cd;
                                    }
                                    $$('SplitGrid').refresh();
                                }
                                 
                            }
                        },
                        {
                            view: 'button',
                            label: 'Work',
                            maxWidth: 70,
                            on: {
                                onItemClick: function () {
                                    var selectedRows = $$('SplitGrid').getSelectedItem();
                                    var AddrTy = 'W';
                                    var DataVal = FoGuestAddressFn(selectedRows.GId, ConString, UsrId, CompId, usrTyId, AddrTy);
                                    var GUESTADDR = DataVal;


                                    if (GUESTADDR[0].O_A1 == null) { $$('Add1').setValue(''); selectedRows.Add1 = ''; }
                                    else { $$('Add1').setValue(GUESTADDR[0].O_A1); selectedRows.Add1 = GUESTADDR[0].O_A1; }
                                    if (GUESTADDR[0].O_A2 == null) { $$('Add2').setValue(''); selectedRows.Add2 = ''; }
                                    else { $$('Add2').setValue(GUESTADDR[0].O_A2); selectedRows.Add2 = GUESTADDR[0].O_A2; }
                                    if (GUESTADDR[0].O_A3 == null) { $$('Add3').setValue(''); selectedRows.Add3 = ''; }
                                    else { $$('Add3').setValue(GUESTADDR[0].O_A3); selectedRows.Add3 = GUESTADDR[0].O_A3; }
                                    if (GUESTADDR[0].O_A5 == null && GUESTADDR[0].O_A6 == null) { $$('Add4').setValue(''); selectedRows.Add4 = ''; }
                                    else {
                                        $$('Add4').setValue(GUESTADDR[0].O_A5 + ' ' + GUESTADDR[0].O_A6);
                                        selectedRows.Add4 = GUESTADDR[0].O_A5 + ' ' + GUESTADDR[0].O_A6;
                                    }
                                    $$('SplitGrid').refresh();
                                }
                            }
                        },
                        
                        ]
                    }
                ]
            },
            {
                
               
                cols: [
                    {
                        view: 'label',
                        label: ' ',
                        maxWidth:500
                    },
                   {
                       view: 'button',
                       label: 'Ok',
                       maxWidth: 70,
                       on: {
                           onItemClick: function () {
                               $$('SplitPopUp').hide();
                           }
                       }
                   },
                     {
                         view: 'button',
                         label: 'Close',
                         maxWidth: 70,
                         on: {
                             onItemClick: function () {
                                 $$('SplitPopUp').hide();
                             }
                         }
                     },
                    
                ]
               
            }
        ]
    }
    });
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GuestSplitPopUp",
        head: "Guest Selection",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        height: 370,
        autowidth: true,
        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            elements: [
                {
                    view: "datatable",
                    id: "GuestSplitGrid",
                    select: "row",
                    data: [{}],
                    height: 150,
                    scrollX: false,
                    editable: true,
                    columns: [
                           { header: "Title", id: "Guest_Inform_Nm", width: 80, css: { 'text-align': 'center ! important' } },
                           { header: "Guest", id: "Guest_Nm", width: 295, css: { 'text-align': 'left ! important' }, },
                           { header: "Guest_Id", id: "G_Id", hidden: true },
                           { header: "Guest_Id", id: "Guest_Sno", hidden: true },
                    ],
                    on: {
                        onItemClick: function (id) {
                                var getval = this.getItem(id.row);
                                
                                var selectedRows = $$('SplitGrid').getSelectedItem();
                                selectedRows.Bill_Name = getval.Guest_Nm;
                                selectedRows.G_Id = getval.G_Id;
                                selectedRows.Guest_Sno = Guest_Sno;
                                $$('SplitGrid').refresh();
                                $$('GuestSplitPopUp').hide();
                                
                        }
                    }
                }
            ]
        }
    });
}

function GuestSplitLoadFn(RNo,GId, ConString, UsrId, CompId, usrTyId) {
    var reqobj = new Object;
    var DataVal = [];
    reqobj["REQTYPE"] = "LOADROUTEGUEST";
    reqobj["USRID"] = $.trim(UsrId);
    reqobj["COMPID"] = $.trim(CompId);
    reqobj["CONSTRING"] = $.trim(ConString);
    reqobj["GId"] = $.trim(GId);
    reqobj["MainRegNo"] = $.trim(RNo);
    reqobj["WhichForm"] = $.trim('RESERVE');
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "http://localhost:58091/api/Routing/RoutingRequest",
        type: 'POST',
        data: dataparam,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (d) {
            if (d != "") {
                debugger;
                DataVal = JSON.parse(d);
                $$('GuestSplitGrid').clearAll();
                $$('GuestSplitGrid').parse(DataVal);
                $$('GuestSplitGrid').refresh();
            }
        },
    });
}

function FoRoutingSplitLoadFn(RNo, GId, RmTy, Title, Mode, ConString, UsrId, CompId, usrTyId) {
    debugger;
    var reqobj = new Object;
    var DataVal=[];
    reqobj["REQTYPE"] = "LOADROUTINGSPLIT";
    reqobj["USRID"] = $.trim(UsrId);
    reqobj["COMPID"] = $.trim(CompId);
    reqobj["CONSTRING"] = $.trim(ConString);
    reqobj["RMTY"] = $.trim(RmTy);
    reqobj["GId"] = $.trim(GId);
    reqobj["WhichForm"] = $.trim('RESERVE');
    reqobj["RESNO"] = $.trim(RNo);
    reqobj["MODE"] = $.trim(Mode);
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "http://localhost:58091/api/Routing/RoutingRequest",
        type: 'POST',
        data: dataparam,
        dataType: 'json',
        contentType:'application/json; charset=utf-8',
        success: function (d) {
            if (d != "") {
                DataVal = JSON.parse(d);
            }
        },
    });
    return DataVal;
}

function FoGuestAddressFn(GId, ConString, UsrId, CompId, usrTyId,AddrTy) {
    debugger;
    var reqobj = new Object;
    var DataVal = [];
    reqobj["REQTYPE"] = "LOADGUESTADDRESS";
    reqobj["USRID"] = $.trim(UsrId);
    reqobj["COMPID"] = $.trim(CompId);
    reqobj["CONSTRING"] = $.trim(ConString);
    reqobj["GId"] = $.trim(GId);
    reqobj["ADDRTYPE"] = $.trim(AddrTy);    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "http://localhost:58091/api/Routing/RoutingRequest",
        type: 'POST',
        data: dataparam,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (d) {
            if (d != "") {
                DataVal = JSON.parse(d);
            }
        },
    });
    return DataVal;
}
function AddRoutingRow() {


    var data = $$("RoutingGrid").serialize();
    var lenval = data.length;
    var indx = "";
    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {
            debugger;
            indx = i;
            if (data[i].Assign_To == "") {
                webix.message({
                    type: 'debug',
                    text: 'Assign To should be selected'
                })
                return false;
            }
            if (data[i].Name == "" ) {
                webix.message({
                    type: 'debug',
                    text: 'Name should be selected'
                })
                return false;
            }
            if (data[i].Grp_Revenue == "") {
                webix.message({
                    type: 'debug',
                    text: 'Group Revenue should be selected'
                })
                return false;
            }
        }
        var Dateval = new Date();
        var day = String(Dateval.getDate()).padStart(2, '0');
        var Month = String(Dateval.getMonth() + 1).padStart(2, '0');
        var year = Dateval.getFullYear();
        var day1 = String(Dateval.getDate() + 1).padStart(2, '0');
        var date = day + '/' + Month + '/' + year;
        var date1 = day1 + '/' + Month + '/' + year;


        var addrow = {
            Entire_Stay: '1', Start_Dt: date, End_Dt: date1, Type: 'S', Assign_To: '', Name: '', Grp_Revenue: '', Revenue: '', Percentage: '100', Res_No: '',
            GroupId: '', ixSplitAmt: '', ixSplitToNo: '', ixSplitTax: '', ParentSrNo: ''
        };
        $$("RoutingGrid").add(addrow);
        $$("RoutingGrid").select($$("RoutingGrid").getLastId());
        webix.UIManager.setFocus($$("RoutingGrid"));
        var itemval = $$("RoutingGrid").getSelectedItem();
        $$("RoutingGrid").editCell(itemval.id, "Assign_To", false, true);
        $$("RoutingGrid").refresh();
    }
    else {
        var Dateval = new Date();
        var day = String(Dateval.getDate()).padStart(2, '0');
        var Month = String(Dateval.getMonth() + 1).padStart(2, '0');
        var year = Dateval.getFullYear();
        var day1 = String(Dateval.getDate() + 1).padStart(2, '0');
        var date = year + '/' + Month + '/' + day;
        var date1 = year + '/' + Month + '/' + day1;


        var addrow = {
            Entire_Stay: '1', Start_Dt: date, End_Dt: date1, Type: 'S', Assign_To: '', Name: '', Grp_Revenue: '', Revenue: '', Percentage: '100', Res_No: '',
            GroupId: '', ixSplitAmt: '', ixSplitToNo: '', ixSplitTax: '', ParentSrNo: ''
        };
        $$("RoutingGrid").add(addrow);
        $$("RoutingGrid").select($$("RoutingGrid").getLastId());
        webix.UIManager.setFocus($$("RoutingGrid"));
        var itemval = $$("RoutingGrid").getSelectedItem();
        $$("RoutingGrid").editCell(itemval.id, "Assign_To", false, true);
        $$("RoutingGrid").refresh();
    }
}

function AddSplitRow(Count, GId,Title, GNm1, GNm2) {
    debugger;
    for (i = 1; i <= Count; i++) {
        var addrow = {
            Split: i, Extensions: '', Type: 'G', Bill_Name: $.trim(Title) + $.trim(GNm1)+',' + $.trim(GNm2), Settlement: '1', Add1: '', Add2: '', Add3: '', Add4: '', PostCd: '',
            PartyId: '', GId: GId, Trv_Agent: '', SrcId: '', RoomNo: '',Guest_Sno:'1'
        };
        $$("SplitGrid").add(addrow);
        $$("SplitGrid").refresh();
    }
    $$("SplitGrid").select($$("SplitGrid").getFirstId());
    webix.UIManager.setFocus($$("SplitGrid"));
    $$("SplitGrid").refresh();

}


function GroupRevLoadFn(RNo, GId, ConString, UsrId, CompId, GroupId) {
    var reqobj = new Object;
    var DataVal = [];
    reqobj["REQTYPE"] = "LOADREVGROUP";
    reqobj["USRID"] = $.trim(UsrId);
    reqobj["COMPID"] = $.trim(CompId);
    reqobj["CONSTRING"] = $.trim(ConString);
    reqobj["GId"] = $.trim(GId);
    reqobj["MainRegNo"] = $.trim(RNo);
    reqobj["WhichForm"] = $.trim('RESERVE');
    reqobj["SelectedRevIds"] = $.trim(GroupId);
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "http://localhost:58091/api/Routing/RoutingRequest",
        type: 'POST',
        data: dataparam,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (d) {
            if (d != "") {
                debugger;
                DataVal = JSON.parse(d);
                $$('GroupSelectGrid').clearAll();
                $$('GroupSelectGrid').parse(DataVal);
                $$('GroupSelectGrid').refresh();
            }
        },
    });
}
function RevenueLoadFn(RNo, GId, ConString, UsrId, CompId, RevenueId, GroupId) {
    var reqobj = new Object;
    var DataVal = [];
    reqobj["REQTYPE"] = "LOADREVENUE";
    reqobj["USRID"] = $.trim(UsrId);
    reqobj["COMPID"] = $.trim(CompId);
    reqobj["CONSTRING"] = $.trim(ConString);
    reqobj["GId"] = $.trim(GId);
    reqobj["MainRegNo"] = $.trim(RNo);
    reqobj["WhichForm"] = $.trim('RESERVE');
    reqobj["SelectedRevIds"] = $.trim(RevenueId);
    reqobj["SelectedGIds"] = $.trim(GroupId);
    
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "http://localhost:58091/api/Routing/RoutingRequest",
        type: 'POST',
        data: dataparam,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (d) {
            if (d != "") {
                debugger;
                DataVal = JSON.parse(d);
                $$('RevenueSelectGrid').clearAll();
                $$('RevenueSelectGrid').parse(DataVal);
                $$('RevenueSelectGrid').refresh();
            }
        },
    });
}
function GuestPopupLoadFn(RNo, GId, ConString, UsrId, CompId) {
    var reqobj = new Object;
    var DataVal = [];
    reqobj["REQTYPE"] = "ROOMSEARCH";
    reqobj["USRID"] = $.trim(UsrId);
    reqobj["COMPID"] = $.trim(CompId);
    reqobj["CONSTRING"] = $.trim(ConString);
    reqobj["GId"] = $.trim(GId);
    reqobj["ResNo"] = $.trim(RNo);
    reqobj["WhichForm"] = $.trim('RESERVE');
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "http://localhost:58091/api/Routing/RoutingRequest",
        type: 'POST',
        data: dataparam,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (d) {
            if (d != "") {
                debugger;
                DataVal = JSON.parse(d);
                $$('GuestpopGrid').clearAll();
                $$('GuestpopGrid').parse(DataVal);
                $$('GuestpopGrid').refresh();
                $$("GuestPopUp").show();
            }
        },
    });
}
function GuestPopupLoadFn1(RNo, GId, ConString, UsrId, CompId) {
    var reqobj = new Object;
    var DataVal = [];
    reqobj["REQTYPE"] = "RESERVESEARCH";
    reqobj["USRID"] = $.trim(UsrId);
    reqobj["COMPID"] = $.trim(CompId);
    reqobj["CONSTRING"] = $.trim(ConString);
    reqobj["GId"] = $.trim(GId);
    reqobj["ResNo"] = $.trim(RNo);
    reqobj["WhichForm"] = $.trim('RESERVE');
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "http://localhost:58091/api/Routing/RoutingRequest",
        type: 'POST',
        data: dataparam,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (d) {
            if (d != "") {
                debugger;
                DataVal = JSON.parse(d);
                $$('GuestpopGrid').clearAll();
                $$('GuestpopGrid').parse(DataVal);
                $$('GuestpopGrid').refresh();
                $$("GuestPopUp").show();
            }
        },
    });
}
function PMPopupLoadFn(RNo, GId, ConString, UsrId, CompId) {
    var reqobj = new Object;
    var DataVal = [];
    reqobj["REQTYPE"] = "PMROOMSEARCH";
    reqobj["USRID"] = $.trim(UsrId);
    reqobj["COMPID"] = $.trim(CompId);
    reqobj["CONSTRING"] = $.trim(ConString);
    reqobj["GId"] = $.trim(GId);
    reqobj["ResNo"] = $.trim(RNo);
    reqobj["WhichForm"] = $.trim('RESERVE');
    reqobj["RoomNo"] = $.trim('');
    
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "http://localhost:58091/api/Routing/RoutingRequest",
        type: 'POST',
        data: dataparam,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (d) {
            if (d != "") {
                debugger;
                DataVal = JSON.parse(d);
                $$('PMGrid').clearAll();
                $$('PMGrid').parse(DataVal);
                $$('PMGrid').refresh();
                $$("PMPopUp").show();
            }
        },
    });
}


;
//# sourceMappingURL=scripts.js.map