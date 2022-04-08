function PageLoadFn() {
    debugger;
    var  wid_45 = ((screen.width - 100) * 0.45);
    var wid_10 = ((screen.width - 100) * 0.1);
    var wid_5 = ((screen.width - 100) * 0.05);
    var ddlProperty = PropertyNM_New();
    var GridVal = LoadOrgInfo();
    var Area_List = LoadDropDown("SalesAndMarket", "CountrywiseAreaLoad");
    var Segment_List = LoadDropDown("SalesAndMarket", "SegmentLoad");
    var Source_List = LoadDropDown("SalesAndMarket", "SourceLoad");
    var CID = "";
    CID = $("#BASECOUNTRYID").val();
    if (CID == "") CID = $("#CID").val();
    var ORG_SYNC_IND = $("#ORG_SYNC_IND").val();
    var PMS_SYNC_IND = $("#PMS_SYNC_IND").val();  
    var Country_List = LoadDropDown("SalesAndMarket", "Applicale_Country");
    // var LOArea_List = LoadDropDown("SalesAndMarket", "CityAreaLoad");
    webix.ui({
        view: 'combo',
        id: 'ddlProperty',
        container: 'ddlProperty',
        value:ddlProperty[0].id,
        options: ddlProperty,
    });
    webix.ui({
        view: 'form',
        id: 'DivForm',
        container: 'DivForm',
        minWidth: 900,
        minHeight: 520,
        elements: [
            {
                rows: [
                    {
                        cols:[
                             {
                                 view: 'text',
                                 label: 'Organization',
                                 name: 'Organization',
                                 id: 'Organization',
                                 labelWidth: 100,
                                 // inputWidth: 350,
                                 minWidth: 350,
                                 attributes: { maxLength: 60 },
                                 on: {
                                     onChange: function (newVal, OldVal) {
                                         if ($("#BTN_TYPE").val() == "NEW" && newVal !="") fnChkOrgExist(newVal);
                                     }
                                 }
                             },
                            {
                                view: 'button',
                                type: "icon",
                                icon: "wxi-search",
                                name: 'Organization_Btn',
                                id: 'Organization_Btn',
                                inputWidth: 30,
                                css:'webix_primary',
                                minWidth: 30,
                                on: {
                                    onItemClick: function () {
                                        OrgSerarchPopupFn();
                                    }
                                }
                            },
                             {
                                 view: 'label',
                                 label: ' ',
                                 id:'Hidelbl',
                                 hidden:true,
                                 minWidth: 30,
                             },
                             {
                                 view: 'radio',
                                 minWidth: 100,
                                 id: "RadBus",
                                 value: 1,                               
                                 options: [
                                 { "id": 1, "value": "Business" } 
                                 ],                                
                                 on: {
                                     "onChange": function (newValue, oldValue) {
                                         debugger;
                                         if (newValue == "1") {
                                             $$("RadInd").setValue(0);
                                             $$("Organization").config.label = "Organization";
                                             $$("Organization").refresh();
                                             $$("label4").config.label = "Organization Information";
                                             $$("label4").refresh();
                                             $$("Group_Btn1").show();
                                             $$("City_Btn2").show();
                                             $$("Group").show();
                                         }
                                     }
                                 }
                             },
                             {
                                 view: 'checkbox',
                                 labelRight: 'PMS Sync',
                                 name: 'PMS Sync',
                                 id: 'ChkPmsSync',
                                 labelWidth: 0,
                                 hidden: (ORG_SYNC_IND == "1"? false : true),
                                 width: 120,
                                 on: {
                                     "onChange": function (newValue, oldValue) {
                                         if ($("#LKCMPID").val() == "" || $("#LKCMPID").val() == undefined)
                                         {
                                             if (newValue == "1") {
                                                 //$$("BtnPmsSync").show();
                                                 //$$("HidBtnSync").show();
                                                 if ($$("RadBus").getValue() == "1") $$("CompanyCreationPOP").show();
                                                 else $$("IndividualCreationPOP").show();                                                 
                                             }
                                             else {
                                                 //$$("HidBtnSync").hide();
                                                 //$$("BtnPmsSync").hide();
                                             }
                                             $$("TxtShrtNm").setValue("");
                                             $$("ORGSUBTY").setValue("");
                                             $$("SUBLED").setValue("");
                                             $$("TxtFirstNm").setValue("");
                                             $$("TxtLastNm").setValue("");
                                             $$("TxtLastNm").setValue("");
                                             $$("TxtFirstNm").setValue("");
                                             $$("TitleIndTxt").setValue("");
                                             $$("TxtMobile").setValue($$("Phone2").getValue());
                                                                                      }                                                                                   
                                     }
                                 }                              
                             },                             
                             {
                                 view: 'checkbox',
                                 labelRight: 'Active',
                                 name: 'Active',
                                 id: 'Active',
                                 labelWidth: 0,
                                 // inputWidth: 100,
                                 minWidth: 100,
                                 value:1,
                             },
                            {
                                view: 'combo',
                                label: 'Area',
                                name: 'Area',
                                id: 'Area',
                                labelWidth: 100,
                                inputWidth: 380,
                                minWidth: 400,
                                value: '1',
                                options: Area_List
                            },
                        ]
                    },
                    {
                        cols: [
                            {
                                view: 'label',
                                label: ' ',
                                name: 'label1',
                                id: 'label1',
                                labelWidth: 100,
                                minWidth: 350
                            },
                             {
                                 view: 'label',
                                 label: ' ',
                                 name: 'label2',
                                 id: 'label2',
                                 labelWidth: 30,
                                 minWidth: 30
                             },
                              {
                                  view: 'radio',
                                  minWidth: 100,
                                  id: "RadInd",
                                  options: [{ "id": 1, "value": "Individual" }],
                                  value: 0,
                                  on: {
                                      "onChange": function (newValue, oldValue) {
                                          debugger;
                                          if (newValue == "1") {
                                              $$("RadBus").setValue(0);
                                              if ($("#BTN_TYPE").val() == "NEW" && $("#DEF_IND_SEG").val() != "")
                                                  $$("Industry").setValue($("#DEF_IND_SEG").val());

                                              $$("Organization").config.label = "Individual";
                                              $$("Organization").refresh();
                                              $$("label4").config.label = "Individual Information";
                                              $$("label4").refresh();

                                              $$("Group_Btn1").hide();
                                              $$("City_Btn2").hide();
                                              $$("Group").hide();
                                          }
                                      }
                                  }
                              },
                              {
                                  hidden: (ORG_SYNC_IND == "1" ? false : true),
                                  width: 120
                              },
                              //{
                              //  view: 'label',
                              //  label: ' ',
                              //  id: 'HidBtnSync',
                              //  hidden:true,
                              //  width: 30
                              //},
                              {
                                  view: 'label',
                                  label: ' ',
                                  name: 'label3',
                                  id: 'label3',
                                  labelWidth: 100,
                                  minWidth: 100
                              },                             
                            {
                                view: 'search',
                                label: 'Assigned To',
                                name: 'Assigned_To',
                                id: 'Assigned_To',
                                labelWidth: 100,
                                inputWidth: 380,
                                minWidth: 400,
                                on: {
                                    onItemClick: function () {
                                        AssignLoadfn();
                                    }
                                } 
                            },
                        ]
                    },
                    {
                        view: "tabbar", name: 'tabbar', id: "tabbar", value: "listView", multiview: true, value: 'MainView', options: [
                               { value: 'Main', id: 'MainView' },
                               { value: 'Contact', id: 'ContactView' },
                               { value: 'Activities', id: 'ActivitiesView' },
                               { value: 'Lead/Opportunity', id: 'LOView' },
                               { value: ' ', id: 'MainView1' },
                               { value: ' ', id: 'ContactView1' },
                               { value: ' ', id: 'ActivitiesView1' },                              
                        ]
                    },
                    {
                        cells:[
                               {
                                   id: "MainView",
                                   view: 'form',
                                   elements:[{
                                       cols: [
                                           {
                                               rows: [
                                               {
                                                   view: "combo",
                                                   options: Segment_List,
                                                   label: 'Industry',
                                                   id: 'Industry',
                                                   labelWidth: 100,
                                                   minWidth: 250,
                                                   inputWidth:350,
                                               },
                                               {
                                                   cols: [
                                                       {
                                                           view: "combo",
                                                           options: Source_List,
                                                           label: 'Source',
                                                           id: 'Source',
                                                           labelWidth: 100,
                                                           minWidth: 350,
                                                           inputWidth: 350,
                                                       },
                                                       {
                                                           view: 'button',
                                                           value:'N',
                                                           name: 'Source_Btn',
                                                           id: 'Source_Btn',
                                                           css: 'webix_primary',
                                                           inputWidth: 30,
                                                           minWidth: 30,
                                                           on: {
                                                               onItemClick: function () {
                                                                   SourceLoadfn();
                                                               }
                                                           }
                                                       }
                                                   ]
                                               },
                                               {
                                                   view: "combo",
                                                   options: Country_List,
                                                   label: 'Country',
                                                   id: 'Country',
                                                   labelWidth: 100,
                                                   minWidth: 250,
                                                   inputWidth: 350,
                                                   value: CID,//S.VijayaLakshmi''24/6/20
                                                   on: {
                                                       "onChange": function (newValue, oldValue) {
                                                           debugger;
                                                           Country_onchange();
                                                       }
                                                   }
                                               },
                                               {
                                                   cols: [
                                                       {
                                                           view: "text",
                                                           label: 'City',
                                                           id: 'City',
                                                           labelWidth: 100,
                                                           minWidth: 350,
                                                           inputWidth: 350,
                                                           attributes: { maxLength: 30 },
                                                       },
                                                       {
                                                           view: 'button',
                                                           type: "icon",
                                                           icon: "wxi-search",
                                                           name: 'City_Btn',
                                                           id: 'City_Btn',
                                                           css: 'webix_primary',
                                                           inputWidth: 30,
                                                           minWidth: 30,
                                                           on: {
                                                               onItemClick: function () {
                                                                   FnCityPopupLoad();
                                                                   $$("CityPopup").show();
                                                                   $$("CityGrid").select($$("CityGrid").getFirstId());
                                                                   webix.UIManager.setFocus($$("CityGrid"));
                                                                   $$("CityGrid").refresh();
                                                               }
                                                           } 
                                                       }
                                                   ]
                                               },
                                                {
                                                    view: "text",
                                                    //label: 'Primary Ph',
                                                    label: 'Phone No',
                                                    id: 'Primary_Ph',
                                                    labelWidth: 100,
                                                    minWidth: 350,
                                                    inputWidth: 450,
                                                    attributes: { maxLength: 40 },
                                                    pattern: { mask: '#################################', allow: /[0-9]/g },
                                                },
                                                {
                                                    view: "text",
                                                    //label: 'Phone2',
                                                    label: 'Mobile No',
                                                    id: 'Phone2',
                                                    labelWidth: 100,
                                                    minWidth: 350,
                                                    inputWidth: 450,
                                                    attributes: { maxLength: 40 },
                                                    pattern: { mask: '#################################', allow: /[0-9]/g },
                                                },
                                                {
                                                    view: "text",
                                                    label: 'Website',
                                                    id: 'Website',
                                                    labelWidth: 100,
                                                    minWidth: 350,
                                                    inputWidth: 450,
                                                    attributes: { maxLength: 40 },
                                                },
                                                {
                                                    view: "text",
                                                    label: 'Address',
                                                    id: 'Address1',
                                                    labelWidth: 100,
                                                    minWidth: 350,
                                                    inputWidth: 450,
                                                    attributes: { maxLength: 40 },
                                                },
                                                {
                                                    view: "text",
                                                    label: ' ',
                                                    id: 'Address2',
                                                    labelWidth: 100,
                                                    minWidth: 350,
                                                    inputWidth: 450,
                                                    attributes: { maxLength: 40 },
                                                },
                                                {
                                                    view: "text",
                                                    label: ' ',
                                                    id: 'Address3',
                                                    labelWidth: 100,
                                                    minWidth: 350,
                                                    inputWidth: 450,
                                                    attributes: { maxLength: 40 },
                                                },
                                                 {
                                                     view: "textarea",
                                                     label: 'Notes',
                                                     id: 'Notes',
                                                     labelWidth: 100,
                                                     minWidth: 350,
                                                     inputWidth: 450,
                                                     attributes: { maxLength: 2000 },
                                                 },
                                               ]
                                           },
                                           {
                                               rows: [
                                                    {
                                                        cols: [
                                                            {
                                                                view: "text",
                                                                label: 'Group',
                                                                id: 'Group',
                                                                labelWidth: 100,
                                                                minWidth: 450,
                                                                inputWidth: 450,
                                                            },
                                                            {
                                                                view: 'button',
                                                                type: "icon",
                                                                icon: "wxi-search",
                                                                name: 'Group_Btn1',
                                                                id: 'Group_Btn1',
                                                                css: 'webix_primary',
                                                                inputWidth: 30,
                                                                minWidth: 5,
                                                                width:30,
                                                                on: {
                                                                    onItemClick: function () {
                                                                        GroupLoadfn();
                                                                    }
                                                                }
                                                            },
                                                             {
                                                                 view: 'button',
                                                                 type: "icon",
                                                                 icon: "wxi-close",
                                                                 name: 'City_Btn2',
                                                                 css: 'webix_primary',
                                                                 id: 'City_Btn2',
                                                                 inputWidth: 30,
                                                                 minWidth: 5,
                                                                 on: {
                                                                     onItemClick: function () {
                                                                         $$("Group").setValue('');
                                                                         $('#GroupID').val('');
                                                                     }
                                                                 }
                                                             }
                                                        ]
                                                    },
                                                    {
                                                        view: 'label',
                                                        label: 'Organization Information:',
                                                        name: 'label4',
                                                        id: 'label4',
                                                        labelWidth: 400,
                                                        minWidth: 400
                                                    },
                                                    {
                                                        id: "OrgInfoGrid",
                                                        name: 'OrgInfoGrid',
                                                        select: 'row',css: 'Part_Grid',
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
                                                        data:GridVal,
                                                        height: 355,
                                                        width: 600,
                                                        scheme: {                                                                           //Sets Header color
                                                            $change: function (item, h) {
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
                                                            onAfterEditStart: function (id) {
                                                                debugger;
                                                                var getColumn = id.column;
                                                                SettleSelectedColumn = getColumn;
                                                                var row = this.getItem(id.row);
                                                                if (getColumn == "OrgInfoValue") {
                                                                    this.getEditor().getInputNode().setAttribute("maxlength", row.OrgInfoMaxlength)
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

                                                    }
                                               ]
                                           }
                                       ]
                                   }]
                               },
                               {
                                   id: "ContactView",
                                   view: 'form',
                                   elements: [{
                                       rows: [
                                           {
                                               cols: [
                                                                           {
                                                                               view: 'label',
                                                                               label: ' ',
                                                                               name: 'label5',
                                                                               id: 'label5',
                                                                               labelWidth: 100,
                                                                               minWidth: 350
                                                                           },
                                                                            {
                                                                                view: 'label',
                                                                                label: ' ',
                                                                                name: 'label6',
                                                                                id: 'label6',
                                                                                labelWidth: 30,
                                                                                minWidth: 30
                                                                            },
                                                                             {
                                                                                 view: 'label',
                                                                                 label: ' ',
                                                                                 name: 'label7',
                                                                                 id: 'label7',
                                                                                 labelWidth: 100,
                                                                                 minWidth: 100
                                                                             },
                                                                             {
                                                                                 view: 'checkbox',
                                                                                 labelRight: 'Active',
                                                                                 name: 'ContactActive',
                                                                                 id: 'ContactActive',
                                                                                 labelWidth: 0,
                                                                                 value:1,
                                                                                 minWidth: 140,
                                                                                 on: {
                                                                                     onChange: function (valnew, oldval) {
                                                                                         debugger;
                                                                                         var CHKVAL = "";
                                                                                         if (valnew == 0) {
                                                                                             CHKVAL=1;
                                                                                         }
                                                                                         $.ajax({
                                                                                             type: "POST",
                                                                                             url: "/SalesAndMarket/LoadContactType",
                                                                                             cache: false,
                                                                                             async: false,
                                                                                             charset: 'utf-8',
                                                                                             data: "ActContact=" + CHKVAL,
                                                                                             success: function (data) {
                                                                                                 $.ajax({
                                                                                                     async: false,
                                                                                                     url: "/SalesAndMarket/ContactGridLoad_New",
                                                                                                     type: 'POST',
                                                                                                     data: "ORG_ID=" +  $("#ORGID").val(),
                                                                                                     success: function (data) {
                                                                                                         if (data != "") {
                                                                                                             $$("ContactGrid").clearAll();
                                                                                                             $$("ContactGrid").parse(JSON.parse(data));
                                                                                                             $$("ContactGrid").refresh();
                                                                                                         }
                                                                                                     }
                                                                                                 });
                                                                                             }
                                                                                         });
                                                                                    
                                                                                     
                                                                                     }
                                                                                 }
                                                                             },
                                                                            {
                                                                                view: 'button',
                                                                                type: "icon",
                                                                                icon: "wxi-plus",
                                                                               // label:'Add',
                                                                                name: 'Contact_Btn',
                                                                                id: 'Contact_Btn',
                                                                                css: 'webix_primary',
                                                                                inputWidth: 70,
                                                                                minWidth: 30,
                                                                                align: "right",
                                                                                on: {
                                                                                    onItemClick: function () {
                                                                                        debugger;
                                                                                        $('#ContactRow').val('');
                                                                                        if ($$("Organization").getValue() != "") {
                                                                                            ContactAddLoadfn();
                                                                                            debugger;
                                                                                            $$("OrganizationTxt").setValue($$("Organization").getValue());
                                                                                            var ContactGrid = $$("ContactGrid").serialize();
                                                                                            var optIndividual = $$("RadInd").getValue();
                                                                                            var OrgNm = $$("Organization").getValue();
                                                                                            if (optIndividual == "1" && ContactGrid.length == 0 && $("#BTN_TYPE").val() == "NEW")
                                                                                            {
                                                                                                fnSetContFirstNmLastNm(OrgNm.toString().trim());

                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            alert("Organization Cannot be Empty...");
                                                                                            webix.UIManager.setFocus($$('Organization'));
                                                                                        }
                                                                                    }
                                                                                }
                                                                            },
                                                                                 
                                               ]
                                           },
                                           {
                                               id: "ContactGrid",
                                               name: 'ContactGrid',
                                               select: 'row',
                                               view: "datatable",
                                               columns: [
                                                    { header: "Title", id: "Title", width: 80, css: { 'text-align': 'center ! important' }},
                                                    { header: "Last Name", id: "LastName", width: 200, css: { 'text-align': 'left ! important' } },
                                                    { header: "First Name", id: "FirstName", width: 160, css: { 'text-align': 'left ! important' } },
                                                    { header: "Designation ", id: "DesignationTxt", width: 160, css: { 'text-align': 'left ! important' } },
                                                    { header: "Email", id: "Emailid", width: 180, css: { 'text-align': 'left ! important' } },
                                                    { header: "Official Phone", id: "OfficialPhone", width: 130, css: { 'text-align': 'left ! important' } },
                                                    { header: "Mobile", id: "Mobileno", width: 130, css: { 'text-align': 'left ! important' } },
                                                    { id: "Email2", hidden: true },
                                                    { id: "ContactNotes", hidden: true },
                                                    { id: "Designation", hidden: true },
                                                    { id: "TitleID", hidden: true },
                                                    { id: "ActiveContact", hidden: true },
                                                    { id: "StrDate", hidden: true },
                                                    { id: "StringDate", hidden: true },
                                                    { id: "ID", hidden: true }
                                               ],
                                               editable: true,
                                               height: 380,
                                               data: [],
                                               on: {
                                                   'onItemDblClick': function (id) {
                                                       debugger;
                                                       $('#ContactRow').val(id);
                                                       ContactRow
                                                       var selectedRows = this.getSelectedItem(id);
                                                       ContactAddLoadfn();
                                                       $$("OrganizationTxt").setValue($$("Organization").getValue());
                                                       $$("TitleTxt").setValue(selectedRows[0].TitleID);
                                                       $$("LastName").setValue(selectedRows[0].LastName);
                                                       $$("FirstName").setValue(selectedRows[0].FirstName);
                                                       $$("Designation").setValue(selectedRows[0].Designation);
                                                       $$("MobilePhone").setValue(selectedRows[0].Mobileno);
                                                       $$("Email1pop").setValue(selectedRows[0].Emailid);
                                                       $$("OfficialPhonepop").setValue(selectedRows[0].OfficialPhone);
                                                       $$("Email2pop").setValue(selectedRows[0].Email2);
                                                       debugger;
                                                       var dt = selectedRows[0].StrDate;
                                                       dt = dt.split('/');
                                                       dt = new Date(parseInt(dt["2"]), parseInt(dt["1"]) - 1, parseInt(dt["0"]));
                                                       //
                                                       //$$("DOB").setValue(selectedRows[0].StrDate);
                                                       $$("DOB").setValue(dt);
                                                       dt = selectedRows[0].StringDate;
                                                       dt = dt.split('/');
                                                       dt = new Date(parseInt(  dt["2"]), parseInt(dt["1"]) - 1, parseInt(dt["0"]));
                                                       //$$("Anniversary").setValue(selectedRows[0].StringDate);
                                                       $$("Anniversary").setValue(dt);
                                                       $$("Notespop").setValue(selectedRows[0].ContactNotes);
                                                       $$("ChkActivepop").setValue(selectedRows[0].ActiveContact);
                                                   }
                                               }
                                           }
                                       ]
                                   }]
                               },
                               {
                                 
                                   id: "ActivitiesView",
                                   view: 'form',
                                   elements:[{
                                       rows: [
                                           {
                                               cols: [
                                                   {},
                                                   {},
                                                    {},
                                                {
                                                    view: 'button',                                                
                                                    label: 'Display',
                                                    name: 'Act_Display',
                                                    id: 'Act_Display',
                                                    css: 'webix_primary',
                                                    inputWidth:90,
                                                    minWidth: 90,
                                                    on: {
                                                        onItemClick: function () {
                                                            Load_ActivityInfoORG();
                                                        }
                                                    }

                                                },
                                                {},
                                                 {},
                                                  {},
                                            {
                                                view: 'button',
                                                type: "icon",
                                                icon: "wxi-plus",
                                                //label: 'Add',
                                                css: 'webix_primary',
                                                name: 'Activities_Btn',
                                                id: 'Activities_Btn',
                                                inputWidth: 70,
                                                minWidth: 30,
                                               // align: "right",
                                                on: {
                                                    onItemClick: function () {
                                                        ActivityAddLoadfn();
                                                        $$("Contact_Name_Btn").hide();
                                                        $('#OrganaizationType').val($('#ORGID').val());
                                                        $$("ActiveOrganizationTxt").setValue($$("Organization").getValue());
                                                    }
                                                }
                                            },
                                           ]                                               
                                           },  
                                           {
                                               id: "Activity_Grid",
                                               name: "Activity_Grid",
                                               select: "row",
                                               view: "datatable",
                                               columns: [
                                                      { id: "R", header: ' ', css: 'Activity_Grid_style', width: 40, cssFormat: HDClr, css: { 'text-align': 'center ! important' } },
                                                      { id: "StrDate", header: 'Date', editable: false, css: 'Activity_Grid_style', width:100, css: { 'text-align': 'center ! important' } },
                                                      { id: "Time", header: 'Time', editable: false, css: 'Activity_Grid_style', width:50, css: { 'text-align': 'center ! important' } },
                                                      { id: "Comments", header: 'Comments', editable: false, css: 'Activity_Grid_style', width: 400, css: { 'text-align': 'left ! important' } },
                                                      { id: "OrgType", header: 'Type', editable: false, css: 'Activity_Grid_style', width: 90, css: { 'text-align': 'left ! important' } },
                                                      { id: "ContPersonNM", header: 'Contact', editable: false, css: 'Activity_Grid_style', width: 120, css: { 'text-align': 'left ! important' } },
                                                      { id: "subject", header: 'Subject', editable: false, css: 'Activity_Grid_style', width: 130, css: { 'text-align': 'left ! important' } },
                                                      { id: "AssignedTo", header: 'Assigned To', editable: false, css: 'Activity_Grid_style', width: 120, css: { 'text-align': 'left ! important' } },
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
                                               data: [],
                                               height: 380,                                                
                                               css: "webix_header_border webix_data_border",
                                               on: {
                                                   "onItemDblClick": function (id, e, node) {                
                                                       ActivityAddLoadfn();
                                                       //$("#SAVE_ACT_TY").val("E");
                                                       //$("#OPENLO").hide();
                                                       //$("#LeadoppoSearchdiv").hide();
                                                       //$("#LeadopposerImg").hide();
                                                       //$("#LeadOpp").attr("disabled", false);
                                                       ////
                                                       //document.getElementById("LeadAct").checked = false;
                                                       //document.getElementById("OppoAct").checked = false;
                                                       //document.getElementById("ToDoAct").checked = false;

                                                       //$("#proceedTY").val("");
                                                       //$("#CLODIV").hide();
                                                       //$("#DeleteActivity").removeClass("Pagefalse");
                                                       //$("#DeleteActivity").show();
                                                       //$("#closedDiv").show();
                                                       //$("#cancelDiv").show();
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
                                                       $$("Contact_Name_Btn").hide();
                                                       //var Date = grid_data[no].StrDate;
                                                       //S.VijayaLakshmi''21/5/20
                                                       var dt = grid_data[no].StrDate;
                                                       dt = dt.split('/');
                                                       dt = new Date(parseInt(dt["2"]), parseInt(dt["1"]) - 1, parseInt(dt["0"]));
                                                       //
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
                                                       $$("ActiveOrganizationTxt").setValue(Organization);
                                                       $$("DurationPop").setValue(DurationTime);
                                                       $$("ToPop").setValue(ToTime);

                                                       //if (AlertonDueDt == "1") {
                                                       //    document.getElementById("AlertonDueDt").checked = true;

                                                       //    if (AG_IND == "1") {
                                                       //        document.getElementById("PriorDiv").style.visibility = "visible";
                                                       //    }
                                                       //    else {
                                                       //        document.getElementById("PriorDiv").style.visibility = "hidden";
                                                       //    }
                                                       //}
                                                       //else {
                                                       //    document.getElementById("AlertonDueDt").checked = false;
                                                       //    document.getElementById("PriorDiv").style.visibility = "hidden";
                                                       //}

                                                       $$("PriorTo").setValue(PriorTo);
                                                       if (R == "RG") {
                                                           $$("OrganizationActivity").setValue(Organization);
                                                       }
                                                       else {
                                                           $$("OrganizationActivity").setValue(Name);
                                                       }
                                                       if (R == "RG") {
                                                           $$("ToDoTxt").setValue(Organization);
                                                       }
                                                       else {
                                                           $$("ToDoTxt").setValue(Name);
                                                       }
                                                       $$("Subjectpop").setValue(subject);
                                                       $$("Assigned_Topop").setValue(Assignedtoid);
                                                       $$("Statuspop").setValue(StatusID);
                                                       $$("Typepop").setValue(ContType);
                                                       $$("Prioritypop").setValue(PriorityId);
                                                       $$("DatePOP").setValue(dt);//Date
                                                       $$("TimePop").setValue(Time);
                                                       $("#ContCompanyNm").val(ContPersonID);
                                                       $$("Commentspop").setValue(Comments);
                                                       $$("Contact_Name").setValue(ContPersonID);
                                                       $("#Activity_S_ID").val(AC_S_ID);
                                                       $("#Activity_S_NO").val(AC_S_NO);
                                                       $("#LeadOpprtunityID").val(AC_S_ID);
                                                       $$("Locations").setValue(Locations);


                                                       //$("#ActivityType").data("kendoDropDownList").value(R);
                                                       //$("#ActivityType").data("kendoDropDownList").enable(false);
                                                       //if (StatusID == "7") {
                                                       //    $("#OkActivity").show();
                                                       //    $("#activityActive").addClass("Pagefalse");
                                                       //    $("#closedDiv").hide();
                                                       //    $("#cancelDiv").hide();
                                                       //    document.getElementById('AddActivityclosemode').style.visibility = 'visible';
                                                       //} else {
                                                       //    $("#OkActivity").show();
                                                       //    $("#activityActive").removeClass("Pagefalse");
                                                       //    document.getElementById('AddActivityclosemode').style.visibility = 'Hidden';
                                                       //}
                                                       $$("ClosedActivity").setValue(0);
                                                       $$("CanceledActivity").setValue(0);
                                                   }
                                               }
                                           }
                                       ]
                                   }]
                                       },
                                       {
                                           id: "LOView",
                                           view: 'form',
                                           elements:[{
                                               rows: [
                                          {
                                              cols: [
                                                                          {
                                                                              view: 'label',
                                                                              label: ' ',
                                                                              name: 'label5',
                                                                              id: 'label5',
                                                                              labelWidth: 100,
                                                                              minWidth: 350
                                                                          },
                                                                           {
                                                                               view: 'label',
                                                                               label: ' ',
                                                                               name: 'label6',
                                                                               id: 'label6',
                                                                               labelWidth: 30,
                                                                               minWidth: 30
                                                                           },
                                                                            {
                                                                                view: 'label',
                                                                                label: ' ',
                                                                                name: 'label7',
                                                                                id: 'label7',
                                                                                labelWidth: 100,
                                                                                minWidth: 100
                                                                            },
                                                                            {
                                                                                view: 'button',
                                                                                type: "icon",
                                                                                icon: "wxi-plus",
                                                                                label: 'New Lead',
                                                                                css: 'webix_primary',
                                                                                name: 'Lead_Btn',
                                                                                id: 'Lead_Btn',
                                                                                hidden:true,
                                                                                inputWidth: 120,
                                                                                minWidth: 150,
                                                                                on: {
                                                                                    onItemClick: function () {
                                                                                        $("#GRID").val("ORGLOGRID");
                                                                                        var Organization = $$("Organization").getValue();
                                                                                        if (Organization != "") {
                                                                                            var SW = Number(screen.width) - 20;
                                                                                            var Sh = Number(screen.height) - 100;
                                                                                            var Window1 = window.open("/SalesAndMarket/SMLeadOpportunity?Page=3&OrgId=" + $("#ORGID").val(), "NewLeadCreation", "width=" + SW + ",height=" + Sh + ",left=10,top=20 ");
                                                                                        }
                                                                                        else {
                                                                                            alert("Organization Name Cannot be Empty.");
                                                                                        }
                                                                                    }
                                                                                }
                                                                            
                                                                            },
                                                                           {
                                                                               view: 'button',
                                                                               type: "icon",
                                                                               icon: "wxi-plus",
                                                                               label:'New Opportunity',
                                                                               name: 'Opportunity_Btn',
                                                                               id: 'Opportunityt_Btn',
                                                                               hidden: true,
                                                                               inputWidth: 150,
                                                                               minWidth: 150,
                                                                               align: "right",
                                                                               on: {
                                                                                   onItemClick: function () {
                                                                                       $("#GRID").val("ORGLOGRID");
                                                                                       var Organization = $$("Organization").getValue();
                                                                                       if (Organization != "") {
                                                                                           var SW = Number(screen.width) - 20;
                                                                                           var Sh = Number(screen.height) - 100;
                                                                                           var Window1 = window.open("/SalesAndMarket/SMLeadOpportunity?Page=5&OrgId=" + $("#ORGID").val(), "NewCreation", "width=" + SW + ",height=" + Sh + ",left=10,top=20 ");
                                                                                       }
                                                                                       else {
                                                                                           alert("Organization Name Cannot be Empty.");
                                                                                       }

                                                                                     
                                                                                   }
                                                                               }

                                                                           },
                                                                                 
                                              ]
                                          },
                                          {
                                              id: "LOGrid",
                                              name: 'LOGrid',
                                              select: 'row',
                                              view: "datatable",
                                              columns: [
                                                   { header: " ", id: "R", width: 60, css: { 'text-align': 'center ! important' } },
                                                   { header: "Lead/Opportunity", id: "LeadOpp", width: 390, css: { 'text-align': 'left ! important' } },
                                                   { header: "Assigned To", id: "AssignedTo", width: 150, css: { 'text-align': 'left ! important' } },                                                   
                                                   { header: "Stage ", id: "Stage", width: 150, css: { 'text-align': 'left ! important' }, },
                                                   { header: "Status ", id: "Status", width: 150, css: { 'text-align': 'center ! important' },hidden:false },
                                                   { header: "Closure Dt", id: "StrDate", width: 150, css: { 'text-align': 'left ! important' } },
                                                   { header: "Projection Value", id: "ProductValue", width: 140,format: webix.i18n.numberFormat, css: { 'text-align': 'right ! important' } },
                                                   { id: "AC_S_ID", hidden: true },
                                                   { id: "StatusID", hidden: true },
                                                   { id: "Stage_Id", hidden: true }
                                              ],
                                              editable: true,
                                              height: 380,
                                              data: [{ Title: '' }],
                                              on: {
                                                  'onItemDblClick': function (id) {
                                                      //S.VijayaLakshmi''3/7/20
                                                      //debugger;
                                                      //var selectedRows = this.getItem(id.row);
                                                      //var R =selectedRows.R;
                                                      //var Leadid = selectedRows.AC_S_ID;
                                                      //var OrganizationId = $("#ORGID").val();
                                                      //$("#GRID").val("ORGLOGRID");
                                                      //if (R == "L") {
                                                      //    OpenLead(Leadid, OrganizationId);
                                                      //} else if (R == "O") {
                                                      //    OpenOpportunity(Leadid, OrganizationId);
                                                      //}
                                                      //else if (R == "T") {                                                    
                                                      //    ToDo(Leadid);
                                                      //}
                                                }}
                                          }
                                               ]
                                           }]
                                       },
                                ]
                    }
                ]

            }
        ]
    });
    debugger;
   
    $$("RadBus").setValue(1);
    $$("Country").setValue(CID);
    CompanyCreationLoadFn();
    IndividualCreationLoadFn();
}
//Added by S.VijayaLakshmi''3/7/20
function OpenLead(Leadid, OrganizationId) {
    debugger;
    var SW = Number(screen.width) - 20;
    var Sh = Number(screen.height) - 100;
    Window1 = window.open("/SalesAndMarket/SMLeadOpportunity?Page=1&OpenId=" + Leadid + "&OrgId=" + OrganizationId + "", "Lead", "width=" + SW + ",height=" + Sh + ",left=10,top=20 ");
};
function OpenOpportunity(Leadid, OrganizationId) {
    debugger;
    var SW = Number(screen.width) - 20;
    var Sh = Number(screen.height) - 100;
    Window1 = window.open("/SalesAndMarket/SMLeadOpportunity?Page=2&OpenId=" + Leadid + "&OrgId=" + OrganizationId + "", "Opportunity", "width=" + SW + ",height=" + Sh + ",left=10,top=20 ");
};
function ToDo(Leadid) {
    var SW = Number(screen.width) - 100;
    var Sh = Number(screen.height) - 250;
    Window1 = window.open("/SalesAndMarket/SMToDoActivity?OpenId=" + Leadid, "ToDoActivity", "width=" + SW + ",height=" + Sh + ",left=100,top=60,right=30 ");
};
//

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
    return rowDatad;
}
function PropertyNM_New() {
    read_ORG_Data = "true";
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/PropertyNM_New",
        data: {},
        async: false,
        success: function (d) {
            if (d != "") {
                rowDatad = JSON.parse(d);
            }
        }
    });
    return rowDatad;
}
function Country_onchange() {
    debugger;
    $('#CityID').val("");
    $("#CityIDD").val("");
    $('#CityNM').val("");
    $('#ZipID').val("");
    $('#CityCountryID').val("");
    $('#Reg_ID').val("");
    $("#City").val("");
    var Country = $$("Country").getValue();
    $("#CountryIDD").val(Country);
    var ind = $$("Country").getValue();
    var Textnm = $$("Country").getInputNode().innerText;
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
                $$("Area").define("options", Area_List);
                $$("Area").refresh();
                //$("#CityNameGrid").data("kendoGrid").dataSource.read();
                //$("#StateDrop").data("kendoDropDownList").dataSource.read();
            },
        });
    }
}


function custom_checkBox(obj, common, value) {
    if (read_ORG_Data == "true") {
        if (obj.FieldType == "Y") {
            if (obj.OrgInfoValue == "true") {
                return "<div class='webix_table_checkbox custom checked' style='text-align: center;width: 100% !important;' ><input type='checkbox' checked='checked' style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
            }
            else {
                return "<div class='webix_table_checkbox custom notchecked' style='text-align: center;width: 100% !important;' ><input type='checkbox' style='height: 20px; width: 18px;margin-top: 3px;'/></div>";
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