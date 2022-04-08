var Save = "<span  class='wc_fnt18 fas fa-1x  fa fa-save'></span>";
var selModuleId = "";
var selUserId = "";
function RUserddlFn() {
    var dataparam = {};
    dataparam["REQTYPE"] = "ModuleUserLoad";
  
    dataparam["MODULE_ID"] = '';
    dataparam["COMPID"] = $$('Property').getValue();
    dataparam["USER_ID"] = selUserId.trim();
    dataparam["c1_ind"] = $("#MulCompInd").val();
   
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + encodeURIComponent(DataVal),
        success: function (d) {
            //debugger;
            if (d != "") {
                idVal = JSON.parse(d);
                var arrayTree = [];
                for (i = 0; i < idVal.length; i++) {
                    var test = {};
                    test['id'] = idVal[i].USER_ID.trim();
                    test['value'] = idVal[i].USER_NM.trim();
                    arrayTree.push(test);
                }
                $$("UsersDDL").define('options', arrayTree);
                $$("UsersDDL").setValue('');
                $$("UsersDDL").refresh();
                $$("ModuleDDL").setValue('');
            }
        }
    });
}
var RModuleLoad = function () {
    var idVal = '';
    var dataparam = {};
    dataparam["REQTYPE"] = "ModuleLoad";
  
     dataparam["COMPID"] = $$('Property').getValue();
   
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + encodeURIComponent(DataVal),
        success: function (d) {
            //debugger;
            if (d != "") {
                idVal = JSON.parse(d);
                $$("ModuleDDL").define('options', idVal);
                $$("ModuleDDL").refresh();
                $$("ModuleDDL").setValue('');
            }
        }
    });
    return idVal;
}
var RUserLoadFn = function () {
    var idVal = '';
    var dataparam = {};
    dataparam["REQTYPE"] = "UserLoad";
  
    dataparam["MODULE_ID"] = $$("ModuleDDL").getValue();
    dataparam["COMPID"] = $$('Property').getValue();
    dataparam["c1_ind"] = $("#MulCompInd").val();
    dataparam["Repuser"] = "1";
    dataparam["Repseluser"] = $$("UsersDDL").getValue();
   
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + encodeURIComponent(DataVal),
        success: function (d) {
            //debugger;
            if (d != "") {
                idVal = JSON.parse(d);
                $$('RUsersGrid').clearAll();
                $$("RUsersGrid").parse(idVal);
                $$("RUsersGrid").refresh();

            }
        }
    });
    return idVal;
}
function PageLoadFn() {
    debugger;
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 32; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        container: "divPropbox", view: "richselect", maxWidth: 400, id: "Property",
        value :$.trim($("#hdnCompId").val()),
        on: {
            onChange: function (newval, oldval) {
                var Tabval = $$('tabbar').getValue();

                if (Tabval == "ModulePrivilege") {
                    selModuleId = "";
                    selUserId = "";
                    
                    ModuleLoad();
                }
                else if (Tabval == "MenuPrivilege") {
                    ModuleMenuLoad();
                }
                else if (Tabval == "UserRights") {
                    selModuleId = "";
                    selUserId = "";
                    RUserddlFn();
                    RModuleLoad();
                    RUserLoadFn();
                }
            }
        }
    });
    webix.ui({
        view: 'form',
        id: 'DivForm',
        container: 'DivForm',
        autowidth: true,
        minHeight: 520,
        elements: [
            {
                rows: [
                   
                    {
                        view: "tabbar", name: 'tabbar', id: "tabbar", value: "listView", multiview: true, value: 'ModulePrivilege', options: [
                        { value: 'Module Privilege                     ', id: 'ModulePrivilege', width: 250 },
                        { value: 'Menu Privilege                       ', id: 'MenuPrivilege', width: 250 },
                        { value: 'Replicate User Privilege             ', id: 'UserRights', width: 250 },
                        { value: ' ', id: 'ex2', },
                        { value: ' ', id: 'ex3' },
                        { value: ' ', id: 'ex4' },
                        { value: ' ', id: 'ex5' },

                        ],
                        on: {
                            onItemClick: function () {
                                var Tabval = $$('tabbar').getValue();
                                
                                if (Tabval == "ModulePrivilege") {
                                    //selModuleId = "";
                                    selUserId = "";
                                    if ($.trim($("#MulCompInd").val()) == "1")
                                        $$("Save_Btn").hide();
                                    else
                                        $$("Save_Btn").show();
                                   
                                    ModuleLoad();
                                }
                                else if (Tabval == "MenuPrivilege") {
                                   ModuleMenuLoad();
                                }
                                else if (Tabval == "UserRights") {
                                    selModuleId = "";
                                    selUserId = "";
                                    RUserddlFn();
                                    RModuleLoad();
                                    RUserLoadFn();
                                }
                            }
                        }

                    },
                     {
                         cells: [
                              {
                                  id: "ModulePrivilege",
                                  view: 'form', css: "From_Scroll",
                                  elements: [
                                      
                                          {
                                              view: "button", value: "Save",  label: Save, tooltip: true,

                                              css: 'BtnSaveCss',
                                              //view: 'button',
                                              //type: "icon",
                                              //icon: "fa fa-save",
                                              id: 'Save_Btn',
                                              width: 40,
                                              height:35,
                                              align: "right",
                                              hidden :$.trim($("#MulCompInd").val()) == "1" ?true:false,
                                              on: {
                                                  onItemClick: function () {
                                                      var ModuleID = $$('MModuleTree').getSelectedId();
                                                      
                                                      var UserDT = $$('MUsersGrid').serialize();
                                                      if (ModuleID != '' && ModuleID != undefined) {
                                                          var dataparam = {};
                                                          dataparam["REQTYPE"] = "ModulePostFn";
                                                        
                                                          dataparam["MODULE_ID"] = ModuleID.trim();
                                                          dataparam["UserDT"] = UserDT;
                                                           dataparam["COMPID"] = $$('Property').getValue();
                                                         
                                                          var DataVal = JSON.stringify(dataparam);
                                                          $.ajax({
                                                              async: false,
                                                              url: "/Master/MSTAPI_CALL",
                                                              type: 'POST',
                                                              data: "request=" + encodeURIComponent(DataVal),
                                                              success: function (d) {
                                                                  //debugger;
                                                                  if (d == "1") {
                                                                      alert("Saved Successfully!");
                                                                  }
                                                                  else
                                                                      alert(d)
                                                              }
                                                          });
                                                      }
                                                                
                                                  }
                                              }
                                          },
                                          {
                                          cols: [
                                             {
                                                 paddingX: 5,
                                                 rows: [
                                                     {
                                                         view:"template", template:"Module", type:"header" , width: 400,
                                                     },
                                                     {
                                                         view: "tree",
                                                         select: true,
                                                         id: "MModuleTree",
                                                         data: [],
                                                         minHeight: 400,
                                                         maxHeight: 700,
                                                         on: {
                                                             "onItemClick": function (id, e, node) {
                                                                 var dataparam = {};
                                                                 selModuleId = id.trim();

                                                                 dataparam["REQTYPE"] = "UserLoad";
                                                               
                                                                 dataparam["MODULE_ID"] = id.trim();
                                                                 dataparam["USER_ID"] = selUserId.trim();
                                                                 dataparam["COMPID"] = $$('Property').getValue();
                                                                 dataparam["c1_ind"] = $("#MulCompInd").val();
                                                                
                                                                 var DataVal = JSON.stringify(dataparam);
                                                                 $.ajax({
                                                                     async: false,
                                                                     url: "/Master/MSTAPI_CALL",
                                                                     type: 'POST',
                                                                     data: "request=" + encodeURIComponent(DataVal),
                                                                     success: function (d) {
                                                                         if (d != "") {
                                                                             idVal = JSON.parse(d);
                                                                             $$('MUsersGrid').clearAll();
                                                                             $$("MUsersGrid").parse(idVal);
                                                                             $$("MUsersGrid").refresh();
                                                                         }
                                                                     }
                                                                 });
                                                             }
                                                         }
                                                     }
                                                 ]
                                               
                                             },
                                             {
                                                 view: "datatable",
                                                 id: "MUsersGrid",
                                                 name: 'MUsersGrid',
                                                 css: 'Part_Grid',
                                                 select: 'row',
                                                 columns: [
                                                          { header: "User", id: "USER_NM", width: 200, css: { 'text-align': 'left ! important' } },
                                                         
                                                         { header: "Applicable", id: "USER_CHK", template: ($.trim($("#MulCompInd").val()) == "1" ? "{common.rcheckbox()}" : "{common.checkbox()}"), width: 90, css: { 'text-align': 'center ! important' }, },
                                                          { header: " ", id: "USER_ID", width: 50,  hidden: true },
                                                          { header: " ", id: "ACTIVE_ID", width: 50,  hidden: true },
                                                 ],
                                                 type: {
                                                     rcheckbox: function (obj, common, value, config) {
                                                         var checked = (value == config.checkValue) ? 'checked="true"' : '';
                                                         return "<input disabled class='webix_table_checkbox' type='checkbox' " + checked + ">";
                                                     }
                                                 },
                                                 editable: true,
                                                 minHeight: 400,
                                                 maxHeight: 700,
                                                 autowidth: true,
                                                 data: [],
                                                 scheme: {                                                                           //Sets Header color
                                                     $change: function (item, h) {
                                                         if (item.ACTIVE_ID == "5") {
                                                             item.$css = "rowColor";
                                                         }
                                                       
                                                     }
                                                 },
                                                 on: {
                                                     'onItemClick': function (id) {
                                                        
                                                     },
                                                    
                                                     'onSelectChange': function (rowId, colId) {
                                                         var itemval = $$("MUsersGrid").getSelectedItem();
                                                         if (itemval != undefined) {
                                                             selUserId = itemval.USER_ID.trim();
                                                         }
                                                     }
                                                 }
                                             },
                                             ]
                                      }
                                  ]
                              },
                             {
                                 id: "MenuPrivilege",
                                 view: 'form', css: "From_Scroll",
                                 elements: [
                                     {
                                         //css: 'BtnSaveCss',
                                         //view: 'button',
                                         //type: "icon",
                                         //icon: "wxi-file",
                                         view: "button", value: "Save", label: Save, tooltip: true,

                                         css: 'BtnSaveCss',
                                         id: 'MenuSave_Btn',
                                         width: 40,
                                         height: 35,
                                         align: "right",
                                         hidden:false,
                                         on: {
                                             onItemClick: function () {
                                                 var ModuleID = $$('ModuleTree').getSelectedId();
                                                 var UserDT = $$('UsersGrid').serialize();
                                                 var MenusGrid = $$('MenusGrid').serialize();
                                                 if (ModuleID != '' && ModuleID != undefined && MenusGrid.length > 0) {
                                                     var splitval = ModuleID.split('_');
                                                     var dataparam = {};
                                                     dataparam["REQTYPE"] = "MenuPostFn";
                                                     dataparam["MODULE_ID"] = splitval[0].trim();
                                                     dataparam["NODE_ID"] = splitval[1].trim();
                                                     dataparam["UserDT"] = UserDT;
                                                     dataparam["MenusGrid"] = MenusGrid;
                                                      dataparam["COMPID"] = $$('Property').getValue();
                                                    
                                                     var DataVal = JSON.stringify(dataparam);
                                                     $.ajax({
                                                         async: false,
                                                         url: "/Master/MSTAPI_CALL",
                                                         type: 'POST',
                                                         data: "request=" + encodeURIComponent(DataVal),
                                                         success: function (d) {
                                                             //debugger;
                                                             if (d == "1") {
                                                                 alert("Saved Successfully!");
                                                             }
                                                             else
                                                                 alert(d)
                                                         }
                                                     });
                                                 }

                                             }
                                         }
                                     },
                                     {
                                         cols: [
                                             {
                                                 paddingX: 5,
                                                 rows:[
                                                     {
                                                         view:"template", template:"Module", type:"header" , width: 260,
                                                     },
                                                     {
                                                         view: "tree",
                                                         select: true,
                                                         id: "ModuleTree",
                                                         data: [],
                                                         minHeight: 400,
                                                         maxHeight: 700,
                                                         on: {
                                                             "onItemClick": function (id, e, node) {
                                                                 var splitval = id.split('_');
                                                                 var dataparam = {};
                                                                 dataparam["REQTYPE"] = "ModuleUserLoad";
                                                               
                                                                 dataparam["MODULE_ID"] = splitval[0].trim();
                                                                 dataparam["COMPID"] = $$('Property').getValue();
                                                                 dataparam["USER_ID"] = selUserId.trim();
                                                                 dataparam["c1_ind"] = $("#MulCompInd").val();
                                                                
                                                                 var DataVal = JSON.stringify(dataparam);
                                                                 $.ajax({
                                                                     async: false,
                                                                     url: "/Master/MSTAPI_CALL",
                                                                     type: 'POST',
                                                                     data: "request=" + encodeURIComponent(DataVal),
                                                                     success: function (d) {
                                                                         if (d != "") {
                                                                             idVal = JSON.parse(d);
                                                                             $$('UsersGrid').clearAll();
                                                                             $$("UsersGrid").parse(idVal);
                                                                             $$('MenusGrid').clearAll();
                                                                             $$("MenusGrid").refresh();
                                                                             if (selUserId != "") {
                                                                                 $$("UsersGrid").select($$("UsersGrid").getFirstId());
                                                                                 webix.UIManager.setFocus($$("UsersGrid"));
                                                                                 
                                                                                     MenuLoadFn(selUserId, id);
                                                                                 
                                                                             }
                                                                             $$("UsersGrid").refresh();
                                                                         }
                                                                     }
                                                                 });
                                                             }
                                                         }
                                                     }
                                                 ]
                                               
                                             },
                                             {
                                                 view: "datatable",
                                                 id: "UsersGrid",
                                                 name: 'UsersGrid',
                                                 css: 'Part_Grid',
                                                 select: 'row',
                                                 columns: [
                                                          { header: "User", id: "USER_NM", width: 162, css: { 'text-align': 'left ! important' } },
                                                          { header: " ", id: "USER_CHK", checkValue: '1', uncheckValue: '0', template: "{common.radio()}", width: 40, css: { 'text-align': 'center ! important' }, },
                                                          { header: " ", id: "USER_ID", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                          { header: " ", id: "ACTIVE_ID", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                 ],
                                                 editable: true,
                                                 minHeight: 400,
                                                 maxHeight: 700,
                                                 autowidth: true,
                                                 data: [],
                                                 scheme: {                                                                           //Sets Header color
                                                     $change: function (item, h) {
                                                         if (item.ACTIVE_ID == "5") {
                                                             item.$css = "rowColor";
                                                         }
                                                        
                                                     }
                                                 },
                                                 on: {
                                                     onCheck: function (row, column, state) {
                                                         var getval = this.getItem(row);
                                                         var getval1 = $$('ModuleTree').getSelectedId();
                                                         if (getval1 != '' && getval1 != undefined && getval.USER_ID != '') {
                                                             MenuLoadFn(getval.USER_ID, getval1);
                                                         }
                                                     }
                                                 }
                                             },
                                             {
                                                 paddingX: 5,
                                                 rows:[
                                                    {
                                                        view: "datatable",
                                                        id: "MenusGrid",
                                                        name: 'MenusGrid',
                                                        css: 'Part_Grid',
                                                        select: 'row',
                                                        columns: [
                                                                 {
                                                                     header: "Menu", id: "MENU_NM", width: 240, css: { 'text-align': 'left ! important' },
                                                                     //template: function (obj, common) {
                                                                     //    return common.treetable(obj, common) + (obj.value || obj.MENU_NM);
                                                                     //}
                                                                 },
                                                                 { header: "New", id: "CHKIND1", template: custom_checkBox1, width: 50, css: { 'text-align': 'center ! important' }, },
                                                                 { header: "Modify", id: "CHKIND2", template: custom_checkBox2, width: 60, css: { 'text-align': 'center ! important' }, },
                                                                 { header: "View", id: "CHKIND3", template: custom_checkBox3, width: 50, css: { 'text-align': 'center ! important' }, },
                                                                 { header: "Delete", id: "CHKIND4", template: custom_checkBox4, width: 60, css: { 'text-align': 'center ! important' }, },
                                                                 { header: "Excel", id: "CHKIND5", template: custom_checkBox5, width: 50, css: { 'text-align': 'center ! important' }, },
                                                                 { header: "Drill", id: "CHKIND6", template: custom_checkBox6, width: 50, css: { 'text-align': 'center ! important' }, },
                                                                 { header: " ", id: "NODE_KEY", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                                 { header: " ", id: "SEQ_NO", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                                 { header: " ", id: "PROGRAM_LINK_ID", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                                 { header: " ", id: "PARENT_KEY", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                                 { header: " ", id: "NEW_IND", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                                 { header: " ", id: "MOD_IND", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                                 { header: " ", id: "DEL_IND", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                                 { header: " ", id: "VIEW_IND", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                                 { header: " ", id: "A_IND", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                                 { header: " ", id: "B_IND", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                                 { header: " ", id: "TAG1", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                                 { header: " ", id: "TAG2", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                                              
                                                        ],
                                                        editable: true,
                                                        minHeight: 400,
                                                        maxHeight: 700,
                                                        autowidth: true,
                                                        scheme: {                                                                           //Sets Header color
                                                            $change: function (item, h) {
                                                                debugger;
                                                                if (item.PARENT_KEY.trim() == "MENU") {
                                                                    item.$css = "rowColor";
                                                                }
                                                                if (item.PARENT_KEY.trim() == "MENU") {
                                                                    item.$css = "bgcolor_row";
                                                                }
                                                            }
                                                        },
                                                        data: [],
                                                        on: {
                                                            'onItemDblClick': function (id) {
                                                            }
                                                        }
                                                    },
                                                 ]

                                             }
                                         ]
                                     }
                                 ]
                             },
                             {
                                 id: "UserRights",
                                 view: 'form', css: "From_Scroll",  minWidth: 900,
                                 maxWidth: 1200,
                                 elements: [
                                     {
                                         //css: 'BtnSaveCss',
                                         //view: 'button',
                                         //type: "icon",
                                         //icon: "wxi-file",
                                         view: "button", value: "Save", label: Save, tooltip: true,

                                         css: 'BtnSaveCss',
                                         id: 'UserSave_Btn',
                                         width: 40,
                                         height: 35,
                                         align: "right",
                                         hidden: false,
                                         on: {
                                             onItemClick: function () {
                                                
                                                 if ($$('UsersDDL').getValue() == "")
                                                 {
                                                     alert("Replicate from user cannot be empty");
                                                     return;
                                                 }
                                                 if ($$('ModuleDDL').getValue() == "") {
                                                     alert("Module cannot be empty");
                                                     return;
                                                 }
                                                 var UserDT = $$('RUsersGrid').serialize();
                                                 if ($$('ModuleDDL').getValue() != '' && $$('ModuleDDL').getValue() != undefined
                                                     && $$('UsersDDL').getValue() != '' && $$('UsersDDL').getValue() != undefined) {
                                                     var dataparam = {};
                                                     dataparam["REQTYPE"] = "ReplicateUserPostFn";
                                                   
                                                     dataparam["MODULE_ID"] = $$('ModuleDDL').getValue();
                                                     dataparam["RUSER_ID"] = $$('UsersDDL').getValue();
                                                     dataparam["UserDT"] = UserDT;
                                                      dataparam["COMPID"] = $$('Property').getValue();
                                                    
                                                     var DataVal = JSON.stringify(dataparam);
                                                     $.ajax({
                                                         async: false,
                                                         url: "/Master/MSTAPI_CALL",
                                                         type: 'POST',
                                                         data: "request=" + encodeURIComponent(DataVal),
                                                         success: function (d) {
                                                             //debugger;
                                                             if (d == "1") {
                                                                 alert("Saved Successfully!");
                                                             }
                                                             else
                                                                 alert(d)
                                                         }
                                                     });
                                                 }

                                             }
                                         }
                                     },
                                     {
                                         cols: [
                                             {
                                                 rows: [
                                                     {
                                                         view: 'richselect',
                                                         label: 'Replicate From User',
                                                         id: 'UsersDDL',
                                                         value: '',
                                                         options: [],
                                                         labelWidth: 150,
                                                         inputWidth: 450,
                                                         width: 450,
                                                         on: {
                                                             onChange: function (newval, oldval) {
                                                                 var idVal = '';
                                                                 var dataparam = {};
                                                                 dataparam["REQTYPE"] = "RUserModuleLoad";
                                                               
                                                                  dataparam["COMPID"] = $$('Property').getValue();
                                                                  dataparam["RUSER_ID"] = newval;
                                                                  
                                                                
                                                                 var DataVal = JSON.stringify(dataparam);
                                                                 $.ajax({
                                                                     async: false,
                                                                     url: "/Master/MSTAPI_CALL",
                                                                     type: 'POST',
                                                                     data: "request=" + encodeURIComponent(DataVal),
                                                                     success: function (d) {
                                                                         //debugger;
                                                                         if (d != "") {
                                                                             idVal = JSON.parse(d);
                                                                             $$("ModuleDDL").define('options', idVal);
                                                                             $$("ModuleDDL").refresh();
                                                                             $$("ModuleDDL").setValue('');
                                                                         }
                                                                     }
                                                                 });
                                                             }
                                                         }
                                                     },
                                    {
                                        view: 'richselect',
                                        label: 'Module',
                                        id: 'ModuleDDL',
                                        value: '',
                                        options: [],
                                        labelWidth: 150,
                                        inputWidth: 450,
                                        width: 450,
                                        on: {
                                            onChange: function (newval, oldval) {
                                                RUserLoadFn();
                                            }
                                        }
                                    },
                                    {
                                        view: "datatable",
                                        id: "RUsersGrid",
                                        name: 'RUsersGrid',
                                        css: 'Part_Grid',
                                        select: 'row',
                                        columns: [
                                                 { header: "Replicate To User", id: "USER_NM", width: 300, css: { 'text-align': 'left ! important' } },
                                                { header: "Applicable", id: "USER_CHK", template: "{common.checkbox()}", width: 130, css: { 'text-align': 'center ! important' }, },
                                                 { header: " ", id: "USER_ID", hidden: true },
                                                  { header: " ", id: "ACTIVE_ID", width: 500, css: { 'text-align': 'left ! important' }, hidden: true },
                                        ],
                                        editable: true,
                                        minHeight: 300,
                                        maxHeight: 700,
                                        autowidth: true,
                                        data: [],
                                        scheme: {                                                                           //Sets Header color
                                            $change: function (item, h) {
                                                if (item.ACTIVE_ID == "5") {
                                                    item.$css = "rowColor";
                                                }

                                            }
                                        },
                                        on: {
                                            'onItemDblClick': function (id) {

                                            }
                                        }
                                    },
                                                 ]
                                             }
                                         ]
                                     },
                                    

                                 ]
                             },
                             
                         ]
                     },
                      
                ]
            }
        ]
    });
    ModuleLoad();    
}
function custom_checkBox(obj, common, value) {
    
    if (obj.PARENT_KEY.trim() != "MENU") {
            if (value == 1 || value.toString().toLowerCase() == "true") {
                return "<div class='webix_table_checkbox custom checked')' style='text-align: center;width: 100% !important;'><input type='checkbox' checked='checked' style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
            }
            else if (value == 0 || value.toString().toLowerCase() == "false") {
                return "<div class='webix_table_checkbox custom notchecked' style='text-align: center;width: 100% !important;'><input type='checkbox'style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
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
function custom_checkBox1(obj, common, value) {

    if (obj.PARENT_KEY.trim() != "MENU" && obj.NEW_IND == 1) {
        if (value == 1 || value.toString().toLowerCase() == "true") {
            return "<div class='webix_table_checkbox custom checked')' style='text-align: center;width: 100% !important;'><input type='checkbox' checked='checked' style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
        }
        else if (value == 0 || value.toString().toLowerCase() == "false") {
            return "<div class='webix_table_checkbox custom notchecked' style='text-align: center;width: 100% !important;'><input type='checkbox'style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
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
function custom_checkBox2(obj, common, value) {

    if (obj.PARENT_KEY.trim() != "MENU" && obj.MOD_IND == 1) {
        if (value == 1 || value.toString().toLowerCase() == "true") {
            return "<div class='webix_table_checkbox custom checked')' style='text-align: center;width: 100% !important;'><input type='checkbox' checked='checked' style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
        }
        else if (value == 0 || value.toString().toLowerCase() == "false") {
            return "<div class='webix_table_checkbox custom notchecked' style='text-align: center;width: 100% !important;'><input type='checkbox'style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
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
function custom_checkBox3(obj, common, value) {

    if (obj.PARENT_KEY.trim() != "MENU" && obj.VIEW_IND == 1) {
        if (value == 1 || value.toString().toLowerCase() == "true") {
            return "<div class='webix_table_checkbox custom checked')' style='text-align: center;width: 100% !important;'><input type='checkbox' checked='checked' style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
        }
        else if (value == 0 || value.toString().toLowerCase() == "false") {
            return "<div class='webix_table_checkbox custom notchecked' style='text-align: center;width: 100% !important;'><input type='checkbox'style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
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
function custom_checkBox4(obj, common, value) {

    if (obj.PARENT_KEY.trim() != "MENU" && obj.DEL_IND == 1) {
        if (value == 1 || value.toString().toLowerCase() == "true") {
            return "<div class='webix_table_checkbox custom checked')' style='text-align: center;width: 100% !important;'><input type='checkbox' checked='checked' style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
        }
        else if (value == 0 || value.toString().toLowerCase() == "false") {
            return "<div class='webix_table_checkbox custom notchecked' style='text-align: center;width: 100% !important;'><input type='checkbox'style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
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
function custom_checkBox5(obj, common, value) {

    if (obj.PARENT_KEY.trim() != "MENU" && obj.A_IND == 1) {
        if (value == 1 || value.toString().toLowerCase() == "true") {
            return "<div class='webix_table_checkbox custom checked')' style='text-align: center;width: 100% !important;'><input type='checkbox' checked='checked' style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
        }
        else if (value == 0 || value.toString().toLowerCase() == "false") {
            return "<div class='webix_table_checkbox custom notchecked' style='text-align: center;width: 100% !important;'><input type='checkbox'style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
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
function custom_checkBox6(obj, common, value) {

    if (obj.PARENT_KEY.trim() != "MENU" && obj.B_IND == 1) {
        if (value == 1 || value.toString().toLowerCase() == "true") {
            return "<div class='webix_table_checkbox custom checked')' style='text-align: center;width: 100% !important;'><input type='checkbox' checked='checked' style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
        }
        else if (value == 0 || value.toString().toLowerCase() == "false") {
            return "<div class='webix_table_checkbox custom notchecked' style='text-align: center;width: 100% !important;'><input type='checkbox'style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
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
var SiteLoadFn = function () {
    var idVal = '';
    var dataparam = {};
    dataparam["REQTYPE"] = "EscalationGroupUserSiteLoad";
    dataparam["ReqPage"] = "EscalationGroupUser";
   
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + encodeURIComponent(DataVal),
        success: function (d) {
            //debugger;
            if (d != "") {
                idVal = JSON.parse(d);
            }
        }
    });
    return idVal;
}
var UserLoadFn = function () {
    var idVal = '';
    var dataparam = {};
    dataparam["REQTYPE"] = "UserLoad";
  
    dataparam["MODULE_ID"] = "";
    dataparam["COMPID"] = $$('Property').getValue();
    dataparam["c1_ind"] = $("#MulCompInd").val();
   
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + encodeURIComponent(DataVal),
        success: function (d) {
            //debugger;
            if (d != "") {
                idVal = JSON.parse(d);
                $$('MUsersGrid').clearAll();
                $$("MUsersGrid").parse(idVal);
                $$("MUsersGrid").refresh();
               
            }
        }
    });
    return idVal;
}
var MenuLoadFn = function (UserId, ModuleID) {
    var splitval = ModuleID.split('_');
    var idVal = '';
    var dataparam = {};
    dataparam["REQTYPE"] = "MenuLoadFn";
  
    dataparam["MODULE_ID"] = splitval[0].trim();
    dataparam["NODE_ID"] =  splitval[1] != undefined && splitval[1] != null ? splitval[1].trim():"";
    dataparam["AUSER_ID"] = UserId.trim();
     dataparam["COMPID"] = $$('Property').getValue();
   
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + encodeURIComponent(DataVal),
        success: function (d) {
            debugger;
            if (d != "") {
                idVal = JSON.parse(d);
                var MenuDT = idVal;
                var arrayTree = [];
              
                for (i = 0; i < MenuDT.length; i++) {
                    if (MenuDT[i].MENU_LEVEL == 1) {
                        arrayTree1 = [];
                        var test = {};
                        test['MENU_LEVEL'] = MenuDT[i].MENU_LEVEL ;
                        test['PARENT_KEY'] = MenuDT[i].PARENT_KEY ;
                        test['NODE_KEY'] = MenuDT[i].NODE_KEY;
                        test['TAG1'] = MenuDT[i].MENU_NM;
                        test['TAG2'] = MenuDT[i].MENU_NM;
                        test['MENU_NM'] = MenuDT[i].MENU_NM ;
                        test['SEQ_NO'] = MenuDT[i].SEQ_NO ;
                        test['PROGRAM_LINK_ID'] = MenuDT[i].PROGRAM_LINK_ID ;
                        test['CHKIND1'] = MenuDT[i].CHKIND1 ;
                        test['CHKIND2'] = MenuDT[i].CHKIND2 ;
                        test['CHKIND3'] = MenuDT[i].CHKIND3 ;
                        test['CHKIND4'] = MenuDT[i].CHKIND4;
                        test['CHKIND5'] = MenuDT[i].CHKIND5;
                        test['CHKIND6'] = MenuDT[i].CHKIND6;
                        test['NEW_IND'] = MenuDT[i].NEW_IND;
                        test['MOD_IND'] = MenuDT[i].MOD_IND;
                        test['DEL_IND'] = MenuDT[i].DEL_IND;
                        test['VIEW_IND'] = MenuDT[i].VIEW_IND;
                        test['A_IND'] = MenuDT[i].A_IND;
                        test['B_IND'] = MenuDT[i].B_IND;
                       
                        arrayTree.push(test);
                        for (j = 0; j < MenuDT.length; j++) {
                            if (MenuDT[j].MENU_LEVEL == 2 && MenuDT[i].NODE_KEY == MenuDT[j].PARENT_KEY) {
                                var test = {};
                                test['MENU_LEVEL'] = MenuDT[j].MENU_LEVEL ;
                                test['PARENT_KEY'] = MenuDT[j].PARENT_KEY ;
                                test['NODE_KEY'] = MenuDT[j].NODE_KEY;
                                test['TAG1'] = MenuDT[i].MENU_NM;
                                test['TAG2'] = MenuDT[j].MENU_NM;
                                test['MENU_NM'] = MenuDT[j].MENU_NM ;
                                test['SEQ_NO'] = MenuDT[j].SEQ_NO ;
                                test['PROGRAM_LINK_ID'] = MenuDT[j].PROGRAM_LINK_ID ;
                                test['CHKIND1'] = MenuDT[j].CHKIND1 ;
                                test['CHKIND2'] = MenuDT[j].CHKIND2 ;
                                test['CHKIND3'] = MenuDT[j].CHKIND3 ;
                                test['CHKIND4'] = MenuDT[j].CHKIND4;
                                test['CHKIND5'] = MenuDT[j].CHKIND5;
                                test['CHKIND6'] = MenuDT[j].CHKIND6;
                                test['NEW_IND'] = MenuDT[j].NEW_IND;
                                test['MOD_IND'] = MenuDT[j].MOD_IND;
                                test['DEL_IND'] = MenuDT[j].DEL_IND;
                                test['VIEW_IND'] = MenuDT[j].VIEW_IND;
                                test['A_IND'] = MenuDT[j].A_IND;
                                test['B_IND'] = MenuDT[j].B_IND;
                                arrayTree.push(test);
                                for (k = 0; k < MenuDT.length; k++) {
                                    if (MenuDT[k].MENU_LEVEL == 3 && MenuDT[j].NODE_KEY == MenuDT[k].PARENT_KEY) {
                                        var test = {};
                                        test['MENU_LEVEL'] = MenuDT[k].MENU_LEVEL ;
                                        test['PARENT_KEY'] = MenuDT[k].PARENT_KEY ;
                                        test['NODE_KEY'] = MenuDT[k].NODE_KEY;
                                        test['TAG1'] = MenuDT[j].MENU_NM;
                                        test['TAG2'] = MenuDT[k].MENU_NM;
                                        test['MENU_NM'] = MenuDT[k].MENU_NM ;
                                        test['SEQ_NO'] = MenuDT[k].SEQ_NO ;
                                        test['PROGRAM_LINK_ID'] = MenuDT[k].PROGRAM_LINK_ID ;
                                        test['CHKIND1'] = MenuDT[k].CHKIND1 ;
                                        test['CHKIND2'] = MenuDT[k].CHKIND2 ;
                                        test['CHKIND3'] = MenuDT[k].CHKIND3 ;
                                        test['CHKIND4'] = MenuDT[k].CHKIND4;
                                        test['CHKIND5'] = MenuDT[k].CHKIND5;
                                        test['CHKIND6'] = MenuDT[k].CHKIND6;
                                        test['NEW_IND'] = MenuDT[k].NEW_IND;
                                        test['MOD_IND'] = MenuDT[k].MOD_IND;
                                        test['DEL_IND'] = MenuDT[k].DEL_IND;
                                        test['VIEW_IND'] = MenuDT[k].VIEW_IND;
                                        test['A_IND'] = MenuDT[k].A_IND;
                                        test['B_IND'] = MenuDT[k].B_IND;
                                        arrayTree.push(test);
                                    }
                                }
                            }
                        }
                    }
                   
                    
                }
               
                if (arrayTree.length <= 0) {
                    for (i = 0; i < MenuDT.length; i++) {
                        if (MenuDT[i].MENU_LEVEL == 2) {
                            
                            var test = {};
                            test['MENU_LEVEL'] = MenuDT[i].MENU_LEVEL;
                            test['PARENT_KEY'] = MenuDT[i].PARENT_KEY;
                            test['NODE_KEY'] = MenuDT[i].NODE_KEY;
                            test['TAG1'] = MenuDT[i].MENU_NM;
                            test['TAG2'] = MenuDT[i].MENU_NM;
                            test['MENU_NM'] = MenuDT[i].MENU_NM;
                            test['SEQ_NO'] = MenuDT[i].SEQ_NO;
                            test['PROGRAM_LINK_ID'] = MenuDT[i].PROGRAM_LINK_ID;
                            test['CHKIND1'] = MenuDT[i].CHKIND1;
                            test['CHKIND2'] = MenuDT[i].CHKIND2;
                            test['CHKIND3'] = MenuDT[i].CHKIND3;
                            test['CHKIND4'] = MenuDT[i].CHKIND4;
                            test['CHKIND5'] = MenuDT[i].CHKIND5;
                            test['CHKIND6'] = MenuDT[i].CHKIND6;
                            test['NEW_IND'] = MenuDT[i].NEW_IND;
                            test['MOD_IND'] = MenuDT[i].MOD_IND;
                            test['DEL_IND'] = MenuDT[i].DEL_IND;
                            test['VIEW_IND'] = MenuDT[i].VIEW_IND;
                            test['A_IND'] = MenuDT[i].A_IND;
                            test['B_IND'] = MenuDT[i].B_IND;
                            arrayTree.push(test);
                            for (k = 0; k < MenuDT.length; k++) {
                                if (MenuDT[k].MENU_LEVEL == 3 && MenuDT[i].NODE_KEY == MenuDT[k].PARENT_KEY) {
                                    var test = {};
                                    test['MENU_LEVEL'] = MenuDT[k].MENU_LEVEL;
                                    test['PARENT_KEY'] = MenuDT[k].PARENT_KEY;
                                    test['NODE_KEY'] = MenuDT[k].NODE_KEY;
                                    test['TAG1'] = MenuDT[i].MENU_NM;
                                    test['TAG2'] = MenuDT[k].MENU_NM;
                                    test['MENU_NM'] = MenuDT[k].MENU_NM;
                                    test['SEQ_NO'] = MenuDT[k].SEQ_NO;
                                    test['PROGRAM_LINK_ID'] = MenuDT[k].PROGRAM_LINK_ID;
                                    test['CHKIND1'] = MenuDT[k].CHKIND1;
                                    test['CHKIND2'] = MenuDT[k].CHKIND2;
                                    test['CHKIND3'] = MenuDT[k].CHKIND3;
                                    test['CHKIND4'] = MenuDT[k].CHKIND4;
                                    test['CHKIND5'] = MenuDT[k].CHKIND5;
                                    test['CHKIND6'] = MenuDT[k].CHKIND6;
                                    test['NEW_IND'] = MenuDT[k].NEW_IND;
                                    test['MOD_IND'] = MenuDT[k].MOD_IND;
                                    test['DEL_IND'] = MenuDT[k].DEL_IND;
                                    test['VIEW_IND'] = MenuDT[k].VIEW_IND;
                                    test['A_IND'] = MenuDT[k].A_IND;
                                    test['B_IND'] = MenuDT[k].B_IND;
                                    arrayTree.push(test);
                                }
                            }
                        }
                    }
                }
                if (arrayTree.length <= 0) {
                    for (i = 0; i < MenuDT.length; i++) {
                        arrayTree1 = [];
                        var test = {};
                        test['MENU_LEVEL'] = MenuDT[i].MENU_LEVEL;
                        test['PARENT_KEY'] = MenuDT[i].PARENT_KEY;
                        test['NODE_KEY'] = MenuDT[i].NODE_KEY;
                        test['TAG1'] = MenuDT[i].MENU_NM;
                        test['TAG2'] = MenuDT[i].MENU_NM;
                        test['MENU_NM'] = MenuDT[i].MENU_NM;
                        test['SEQ_NO'] = MenuDT[i].SEQ_NO;
                        test['PROGRAM_LINK_ID'] = MenuDT[i].PROGRAM_LINK_ID;
                        test['CHKIND1'] = MenuDT[i].CHKIND1;
                        test['CHKIND2'] = MenuDT[i].CHKIND2;
                        test['CHKIND3'] = MenuDT[i].CHKIND3;
                        test['CHKIND4'] = MenuDT[i].CHKIND4;
                        test['CHKIND5'] = MenuDT[i].CHKIND5;
                        test['CHKIND6'] = MenuDT[i].CHKIND6;
                        test['NEW_IND'] = MenuDT[i].NEW_IND;
                        test['MOD_IND'] = MenuDT[i].MOD_IND;
                        test['DEL_IND'] = MenuDT[i].DEL_IND;
                        test['VIEW_IND'] = MenuDT[i].VIEW_IND;
                        test['A_IND'] = MenuDT[i].A_IND;
                        test['B_IND'] = MenuDT[i].B_IND;
                        arrayTree.push(test);
                    }
                }
                $$('MenusGrid').clearAll();
                $$("MenusGrid").parse(arrayTree);
                $$("MenusGrid").refresh();
                //$$("grida").group({
                //    by: function (obj) { return obj.unitName + "-" + obj.tagName },
                //    map: {
                //        value: ["unitName"],
                //        tagName: ["tagName"]
                //    }
                //});

                //$$("grida").group({
                //    by: "tagName",
                //    map: {
                //        value: ["tagName"],
                //        unitName: ["unitName"],

                //    }
                //}, 0);
                //$$("MenusGrid").group({
                //    by: function (obj) { return obj.TAG2 + "-" + obj.TAG1 },
                //    map: {
                //        value: ["MENU_NM"],
                //        TAG1: ["TAG1"]
                //    }
                //});

                //$$("MenusGrid").group({
                //    by: "TAG1",
                //    map: {
                //        value: ["TAG1"],
                //    }
                //});
                $$("MenusGrid").refresh();
            }
        }
    });
    return idVal;
}
var MUserLoadFn = function () {
    var idVal = '';
    var dataparam = {};
    dataparam["REQTYPE"] = "ModuleUserLoad";
  
    dataparam["MODULE_ID"] = "";
    dataparam["COMPID"] = $$('Property').getValue();
    dataparam["USER_ID"] = selUserId.trim();
    dataparam["c1_ind"] = $("#MulCompInd").val();
   
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + encodeURIComponent(DataVal),
        success: function (d) {
            if (d != "") {
                idVal = JSON.parse(d);
                $$('UsersGrid').clearAll();
                $$("UsersGrid").parse(idVal);
                $$("UsersGrid").refresh();
                $$('MenusGrid').clearAll();
                $$("MenusGrid").refresh();

            }
        }
    });
    return idVal;
}
var ModuleLoad = function () {
    var idVal = '';
    var dataparam = {};
    dataparam["REQTYPE"] = "ModuleLoad";
    dataparam["COMPID"] = $$('Property').getValue();
    dataparam["c1_ind"] = $("#MulCompInd").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + encodeURIComponent(DataVal),
        success: function (d) {
           
            if (d != "") {
                idVal = JSON.parse(d);
                
                $$('MModuleTree').clearAll();
                $$("MModuleTree").parse(idVal);
                $$("MModuleTree").refresh();
                if (selModuleId == "") {
                    $$("MModuleTree").select($$("MModuleTree").getFirstId());
                    webix.UIManager.setFocus($$("MModuleTree"));
                }
                else {
                    $$("MModuleTree").select(selModuleId);
                    webix.UIManager.setFocus($$("MModuleTree"));
                }
                var itemval = $$("MModuleTree").getSelectedId();
                selModuleId = itemval.trim();
                var dataparam = {};
                dataparam["REQTYPE"] = "UserLoad";
              
                dataparam["MODULE_ID"] = itemval.trim();
                dataparam["COMPID"] = $$('Property').getValue();
                dataparam["c1_ind"] = $("#MulCompInd").val();

                var DataVal = JSON.stringify(dataparam);
                $.ajax({
                    async: false,
                    url: "/Master/MSTAPI_CALL",
                    type: 'POST',
                    data: "request=" + encodeURIComponent(DataVal),
                    success: function (d) {
                        if (d != "") {
                            idVal = JSON.parse(d);
                            $$('MUsersGrid').clearAll();
                            $$("MUsersGrid").parse(idVal);
                            //if ($("#MulCompInd").val() == "1")
                            //    $$("MUsersGrid").hideColumn("USER_CHK");
                            //else
                            //    $$("MUsersGrid").showColumn("USER_CHK");

                            $$("MUsersGrid").refresh();
                        }
                    }
                });
            }
        }
    });
    return idVal;
}
var ModuleMenuLoad = function () {
    var idVal = '';
    var dataparam = {};
    dataparam["REQTYPE"] = "ModuleMenuLoad";
    dataparam["c1_ind"] = $("#MulCompInd").val();
    dataparam["MODULE_ID"] = selModuleId.trim();
    dataparam["USER_ID"] = selUserId.trim();
  
   
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
        type: 'POST',
        data: "request=" + encodeURIComponent(DataVal),
        success: function (d) {
            debugger;
            if (d != "") {
                idVal = JSON.parse(d);

                var ModuleDt = idVal.Module;
                var MenuDT = idVal.Menu;
                var arrayTree = [];
                var arrayTree1 = [];
                var arrayTree2 = [];
                var arrayTree3 = [];
                var arrayTree4 = [];
                var arrayTree5 = [];
                for (i = 0; i < ModuleDt.length; i++) {
                    arrayTree1 = [];
                    var test = {};
                    test['id'] = ModuleDt[i].MODULE_ID.trim()+'_ ';
                    test['value'] = ModuleDt[i].MODULE_NM.trim();
                    for (j = 0; j < MenuDT.length; j++) {
                        if (ModuleDt[i].MODULE_ID.trim() == MenuDT[j].MODULE_ID.trim() && MenuDT[j].MENU_LEVEL == 1) {
                            arrayTree2 = [];
                                var test1 = {};
                                test1['id'] = MenuDT[j].MODULE_ID.trim() + '_' + MenuDT[j].NODE_KEY.trim();
                                test1['value'] = MenuDT[j].MENU_NM.trim();
                                for (k = 0; k < MenuDT.length; k++) {
                                    if (MenuDT[k].MENU_LEVEL == 2 && MenuDT[j].NODE_KEY == MenuDT[k].PARENT_KEY) {
                                        arrayTree3 = [];
                                        var test2 = {};
                                        test2['id'] = MenuDT[k].MODULE_ID.trim() + '_' + MenuDT[k].NODE_KEY.trim();
                                        test2['value'] = MenuDT[k].MENU_NM.trim();
                                        for (m = 0; m < MenuDT.length; m++) {
                                            if (MenuDT[m].MENU_LEVEL == 3 && MenuDT[k].NODE_KEY == MenuDT[m].PARENT_KEY) {
                                                var test3 = {};
                                                test3['id'] = MenuDT[m].MODULE_ID.trim() + '_' + MenuDT[m].NODE_KEY.trim();
                                                test3['value'] = MenuDT[m].MENU_NM.trim();
                                                for (n = 0; n < MenuDT.length; n++) {
                                                    if (MenuDT[n].MENU_LEVEL == 3 && MenuDT[m].NODE_KEY == MenuDT[n].PARENT_KEY) {
                                                        var test4 = {};
                                                        test4['id'] = MenuDT[n].MODULE_ID.trim() + '_' + MenuDT[n].NODE_KEY.trim();
                                                        test4['value'] = MenuDT[n].MENU_NM.trim();
                                                        for (v = 0; v < MenuDT.length; v++) {
                                                            if (MenuDT[v].MENU_LEVEL == 3 && MenuDT[n].NODE_KEY == MenuDT[v].PARENT_KEY) {
                                                                var test5 = {};
                                                                test5['id'] = MenuDT[v].MODULE_ID.trim() + '_' + MenuDT[v].NODE_KEY.trim();
                                                                test5['value'] = MenuDT[v].MENU_NM.trim();
                                                                arrayTree5.push(test5);
                                                            }
                                                        }
                                                        test4['data'] = arrayTree5;
                                                        arrayTree4.push(test4);
                                                    }
                                                }
                                                test3['data'] = arrayTree4;
                                                arrayTree3.push(test3);
                                            }
                                        }
                                        test2['data'] = arrayTree3;
                                        arrayTree2.push(test2);
                                    }
                                }
                                test1['data'] = arrayTree2;
                                arrayTree1.push(test1);
                        }                        
                    }
                    test['data'] = arrayTree1;
                    arrayTree.push(test);
                }
              
                $$('ModuleTree').clearAll();
                $$("ModuleTree").parse(arrayTree);
                $$("ModuleTree").refresh();
                $$("ModuleTree").select($$("ModuleTree").getFirstId());
                webix.UIManager.setFocus($$("ModuleTree"));
                var itemval = $$("ModuleTree").getSelectedId();
                $$("ModuleTree").open(itemval);
                var splitval = itemval.split('_');
                var dataparam = {};
                dataparam["REQTYPE"] = "ModuleUserLoad";
              
                dataparam["MODULE_ID"] = splitval[0].trim();
                dataparam["COMPID"] = $$('Property').getValue();
                dataparam["USER_ID"] = selUserId.trim();
                dataparam["c1_ind"] = $("#MulCompInd").val();
               
                var DataVal = JSON.stringify(dataparam);
                $.ajax({
                    async: false,
                    url: "/Master/MSTAPI_CALL",
                    type: 'POST',
                    data: "request=" + encodeURIComponent(DataVal),
                    success: function (d) {
                        if (d != "") {
                            idVal = JSON.parse(d);
                            $$('UsersGrid').clearAll();
                            $$("UsersGrid").parse(idVal);
                            $$('MenusGrid').clearAll();
                            $$("MenusGrid").refresh();
                            if (selUserId != "")
                            {
                                $$("UsersGrid").select($$("UsersGrid").getFirstId());
                                webix.UIManager.setFocus($$("UsersGrid"));
                                var itemval = $$("UsersGrid").getSelectedId();
                                MenuLoadFn(selUserId, selModuleId)
                            }
                            $$("UsersGrid").refresh();
                            
                        }
                    }
                });
            }
        }
    });
    return idVal;
}
