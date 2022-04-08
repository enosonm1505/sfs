
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
    }
    );
    return ddlVal;
}
function PageLoadFn(PageId, AA_IND, BB_IND, A10_IND, AF_IND, C10_IND, D10_IND, E10_IND, F10_IND, DD_IND, REAL_IND) {
    debugger;
    var wid_25 = ((screen.width - 100) * 0.25);
    var wid_10 = ((screen.width - 100) * 0.1);
    var searchicon = "<span class='fa fa-search ' ></span>";
    var Filtericon = "<span class='fa fa-filter'></span>";
    var IsAdmin = true;
    var IsWorksheet = true;
    $("#btnConvert").hide();//S.Vijayalakshmi''20/6/20
    $("#Convert").val("");
    webix.editors.myeditor1 = webix.extend({
        render: function () {
            return webix.html.create("div", {
                "class": "webix_dt_editor"
            }, "<input type='text' maxlength='9'/>");
        }
    }, webix.editors.text);
    webix.editors.myeditor2 = webix.extend({
        render: function () {
            return webix.html.create("div", {
                "class": "webix_dt_editor"
            }, "<input type='text'  maxlength='3'/>");
        }
    }, webix.editors.text);
    webix.editors.NotesCM = webix.extend({
        render: function () {
            return webix.html.create("div", {
                "class": "webix_dt_editor"
            }, "<input type='text'  maxlength='500'/>");
        }
    }, webix.editors.text);
    webix.editors.ProdNmCM = webix.extend({
        render: function () {
            return webix.html.create("div", {
                "class": "webix_dt_editor"
            }, "<input type='text'  maxlength='80'/>");
        }
    }, webix.editors.text);
    var ddlProperty = PropertyNM_New();
    var ddlValues = SecAssignedDrop();
    var Area_List = LoadDropDown("SalesAndMarket", "CityAreaLoad");//CountrywiseAreaLoad--old ( Changed by S.VijayaLakshmi''18/6/20)
    var Stage_List = LoadDropDown("SalesAndMarket", "StageLoad_New");
    var Source_List = LoadDropDown("SalesAndMarket", "SourceLoad");
    var PriorityLead_List = LoadDropDown("SalesAndMarket", "LeadPriorityLoad");
    var Assigned_List = LoadDropDown("SalesAndMarket", "AssignedToLoad");
    var DefaultPropertyList = LoadDropDown("SalesAndMarket", "DefaultProperty");
    var date = new Date();
    date.setDate(date.getDate() + 1);
    date.toLocaleDateString();

    var PageIdtst = '';
    if (PageId == 1 || PageId == 3) {
        PageIdtst = 1;
    }
    else {
        PageIdtst = 0;
    }

    var txtlop = '';
    if (PageId == 1 || PageId == 3) {
        txtlop = "Lead";
    }
    else {
        txtlop = "Opportunity";
    }
    webix.ui({
        view: 'combo',
        id: 'ddlProperty',
        container: 'ddlProperty',
        value: ddlProperty[0].id,
        options: ddlProperty,
        on: {
            onChange: function () {
                alert();
            }
        }

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
                        cols: [
                               {
                                   view: 'text',
                                   label: txtlop,
                                   name: 'LOText',
                                   id: 'LOText',
                                   labelWidth: 100,
                                   // inputWidth: 350,//350
                                   inputWidth: PageIdtst == 1 ? 420 : 350,
                                   minWidth: 350,//350
                                   attributes: { maxlength: 40 },
                                   css: "TxtClsHd",


                               },
                               {
                                   view: 'label',
                                   label: ' ',
                                   id: 'LOHidelbl',
                                   width: 60,
                                   hidden: true,
                               },
                               {
                                   view: 'button',
                                   type: "icon",
                                   css:'webix_primary',
                                   icon: "wxi-search",
                                   id: 'LOBtn1',
                                   width: 30,
                                   minwidth: 30,
                                   inputwidth: 30,
                                   on: {
                                       onItemClick: function () {
                                           LOPopUpLoadfn(AA_IND, BB_IND, A10_IND, AF_IND);
                                       }
                                   }
                               },
                               {
                                   paddingX: 5,
                                   cols: [{
                                       view: 'button',
                                       label: 'A',
                                       css: 'webix_primary',
                                       id: 'LOBtn2',
                                       width: 30,
                                       minwidth: 30,
                                       inputwidth: 30,
                                       on: {
                                           onItemClick: function () {

                                               LOLoadPopfn();
                                               debugger;
                                               var opp = $$("LOText").getValue();
                                               $$("ExistingTxt").setValue(opp);
                                           }
                                       }
                                   }]
                               },
                                {
                                    view: 'combo',
                                    label: 'Stage',
                                    name: 'Stage',
                                    id: 'Stage',
                                    labelWidth: 60,
                                    inputWidth: 190,
                                    minWidth: 190,
                                    value: PageIdtst == 1 ? 2 : 12,
                                    options: Stage_List,
                                    on: {
                                        "onChange": function (newValue, oldValue) {
                                            Stage_Onchange();//S.VijayaLakshmi''22/6/20
                                            // if (newValue == "14") {
                                            //     $$("POFrm").show();
                                            //     $$("Won_CommentsFrm").show();
                                            //     $$("Lost_CommentsFrm").hide();
                                            // }
                                            //else if (newValue == "13") {
                                            //    $$("Lost_CommentsFrm").show();
                                            //    $$("POFrm").hide();
                                            //    $$("Won_CommentsFrm").hide();
                                            //}
                                            //else {
                                            //    $$("POFrm").hide();
                                            //    $$("Won_CommentsFrm").hide();
                                            //    $$("Lost_CommentsFrm").hide();
                                            //}

                                        }

                                    }
                                },

                            {
                                view: 'combo',
                                label: 'Priority',
                                name: 'Prioritfy',
                                id: 'Prioritfy',
                                labelWidth: 80,
                                inputWidth: 180,
                                minWidth: 180,
                                value: '1',
                                hidden: PageIdtst == 1 ? true : false,
                                options: PriorityLead_List
                            },
                            {
                                view: 'combo',
                                label: 'Area',
                                name: 'Area',
                                id: 'Area',
                                labelWidth: 80,
                                inputWidth: 260,
                                minWidth: 280,
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
                                 name: 'Individual',
                                 id: 'HidLblInd',
                                 hidden: DD_IND != 1 ? true : false,
                                 labelWidth: 100,
                                 minWidth: 350,

                             },

                                {
                                    view: 'checkbox',
                                    label: 'Individual',
                                    name: 'Individual',
                                    id: 'Individual',
                                    hidden: DD_IND == 1 ? true : false,
                                    labelWidth: 100,
                                    minWidth: 350,
                                    on: {
                                        onChange: function (newval, oldval) {
                                            debugger;
                                            if (newval == 1) {
                                                $$("Organization").define("label", "Individual");
                                                $$("Organization").refresh();
                                                $$('Area').enable();

                                                //Commented by S.VijayaLakshmi''30/5/20
                                                //$("#ORGID").val("");
                                                //$("#AreaID").val("");
                                                //$$("Area").setValue("");
                                                //
                                                $("#ORGIDCONTACT").val("");
                                                $("#Organization").val("");
                                                $("#OrganizationActivity").val("");

                                                var BTN_TYPE = $("#BTN_TYPE").val();
                                                debugger;
                                                if (BTN_TYPE == "OPEN") {
                                                    var Organization = $("#INDIVNAME").val();
                                                    $$("Organization").setValue(Organization);

                                                }

                                                $$("Phone1").show();
                                                $$("LeadDesignation").show();
                                                $$("Website").show();
                                                $$("Organization_Btn1").hide();
                                                $$("Organization_Btn2").hide();

                                            }
                                            else {
                                                $$("Phone1").hide();
                                                $$("LeadDesignation").hide();
                                                $$("Website").hide();
                                                if ($("#BTN_TYPE").val() == "OPEN") {
                                                    $$("Organization_Btn1").hide();
                                                    $$("Organization_Btn2").hide();
                                                }
                                                else {
                                                    $$("Organization_Btn1").show();
                                                    $$("Organization_Btn2").show();
                                                }
                                                $$("Organization").define("label", "Organization");
                                                $$("Organization").refresh();
                                                // $("#ORGID").val("");//Comment by S.VijayaLakshmi''27.5.20
                                                $("#ORGIDCONTACT").val("");
                                                $("#Organization").val("");
                                                $("#OrganizationActivity").val("");
                                                $("#AreaID").val("");

                                            }

                                        }
                                    }
                                },
                                {
                                    paddingX: 5,
                                    cols: [{
                                        view: 'label',
                                        label: ' ',
                                        id: 'Hidelbl',
                                        width: 60,
                                    }]
                                },
                                 {
                                     cols: [{
                                         view: 'label',
                                         label: ' ',
                                         id: 'Hidelbl11',
                                         labelWidth: 60,
                                         hidden: PageIdtst == 1 ? true : false,
                                         minWidth: 190,
                                     }]
                                 },
                              {
                                  view: 'datepicker',
                                  label: 'Due Dt',
                                  id: 'Due_Date',
                                  labelWidth: 60,
                                  inputWidth: 190,
                                  minWidth: 190,
                                  hidden: PageIdtst != 1 ? true : false,
                                  stringResult: true,
                                  format: "%d/%m/%Y",
                                  value: date
                              },
                             {
                                 view: 'text',
                                 label: 'Probability',
                                 name: 'Probability',
                                 id: 'Probability',
                                 labelWidth: 80,
                                 hidden: PageIdtst == 1 ? true : false,
                                 inputWidth: 180,
                                 minWidth: 180,
                                 pattern: { mask: "###", allow: /[0-9]/g },
                                 attributes: { maxlength: 3 },
                                 inputAlign: "right",//S.VijayaLakshmi''15/6/20

                             },
                             {
                                 view: 'label',
                                 label: ' ',
                                 id: 'HidePptLbl',
                                 labelWidth: 80,
                                 hidden: A10_IND == 1 ? true : false,
                                 minWidth: 280,


                             },
                             {
                                 view: 'combo',
                                 label: 'Property',
                                 name: 'Property',
                                 id: 'Property',
                                 labelWidth: 80,
                                 hidden: A10_IND != 1 ? true : false,
                                 inputWidth: 260,
                                 minWidth: 280,
                                 options: DefaultPropertyList

                             },
                         ]
                     },

                     {
                         cols: [
                              {
                                  view: "text",
                                  label: 'Organization',
                                  id: 'Organization',
                                  name: 'Organization',
                                  disabled: true,
                                  labelWidth: 100,
                                  minWidth: 450,
                                  inputWidth: 450,
                                  css: "TxtClsHd",
                                  width: 450,
                                  attributes: { maxlength: 60 }
                              },
                               {
                                   view: 'label',
                                   label: ' ',
                                   id: 'OrgHidelbl',
                                   hidden: true,
                                   width: 60,
                               },
                               {
                                   view: 'button',
                                   type: "icon",
                                   css: 'webix_primary',
                                   icon: "wxi-search",
                                   name: 'Organization_Btn1',
                                   id: 'Organization_Btn1',
                                   inputWidth: 30,
                                   minWidth: 5,
                                   width: 30,//S.VijayaLakshmi''11/6/20
                                   on: {
                                       onItemClick: function () {
                                           OrgSerarchPopupFn('LOP');
                                       }
                                   }
                               },
                               {
                                   view: 'button',
                                   label: 'N',
                                   css: 'webix_primary',
                                   id: 'Organization_Btn2',
                                   inputWidth: 30,
                                   minWidth: 5,
                                   width: 30,
                                   on: {
                                       onItemClick: function () {
                                           debugger;
                                           //S.VijayaLakshmi''30/5/20
                                           var SW = Number(screen.width) - 100;
                                           var Sh = Number(screen.height) - 100;
                                           var QuickLead = $("#QuickLeadId").val();
                                           Window1 = window.open("/SalesAndMarket/Organization?Page=1&QuickLeadId=" + $.trim(QuickLead), "Organization", "width=" + SW + ",height=" + Sh + ",left=10,top=20 ");
                                           //
                                       }
                                   }
                               },
                               {
                                   view: 'label',
                                   label: ' ',
                                   id: 'Quotelbl',
                                   hidden: false,
                                   width: 80,
                               },
                               {
                                   view: 'button',
                                   label: 'Quotation',
                                   css: 'webix_primary',
                                   id: 'BtnQuote',
                                   inputWidth: 80,
                                   minWidth: 80,
                                   width: 80,
                                   hidden: true,

                                   on: {
                                       onItemClick: function () {
                                           debugger;
                                           QuotationPopup();
                                           ExistQuoteChk();
                                           $$("QuotationPopup").show();
                                           //  $$("QuoteNo").setValue( $("#RECREATENO").val());

                                       }
                                   }
                               },




                         {
                             minWidth: 750,//550
                         }

                         ]
                     },
                      {
                          view: "tabbar", name: 'tabbar', id: "tabbar", value: "listView", multiview: true, value: 'MainView', options: [
                                 { value: 'Main', id: 'MainView' },
                                 { value: 'Activities', id: 'ActivitiesView' },
                                 { value: 'Product', id: 'ProductView', hidden: PageIdtst == 1 ? true : false, },
                                 { value: 'Competitor', id: 'CompetitorView', hidden: PageIdtst == 1 ? true : false, },
                                 { value: ' ', id: 'MainView1' },
                                 { value: ' ', id: 'ContactView1' },
                                 { value: ' ', id: 'ActivitiesView1' },

                          ]
                      },
                    {
                        cells: [
                            {
                                id: "MainView",
                                view: 'form', css: "From_Scroll", height: 370,
                                elements: [{
                                    cols: [
                                        {
                                            width:400,
                                            rows: [
                                                {
                                                    cols: [
                                                    {
                                                        view: "combo",
                                                        options: Source_List,
                                                        label: 'Source',
                                                        id: 'Source',
                                                        name: 'Source',
                                                        labelWidth: 100,
                                                        //minWidth: 500,
                                                        //inputWidth: 500,
                                                    },
                                                    {
                                                        view: 'button',
                                                        value: 'N',
                                                        css: 'webix_primary',
                                                        name: 'Source_Btn',
                                                        id: 'Source_Btn',
                                                        inputWidth: 30,
                                                        minWidth: 30,
                                                        width: 40,//S.VijayaLakshmi''11/6/20
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
                                                    label: 'Assigned To',
                                                    id: 'Assigned_To',
                                                    name: 'Assigned_To',
                                                    labelWidth: 100,
                                                    //minWidth: 500,
                                                    //inputWidth: 500,
                                                    options: Assigned_List,
                                                    on: {
                                                        onChange: function (newval, oldval) {
                                                            $$("SecAssigned").clearAll();
                                                            var addrow = { USER_NM: newval, PER: 100, HDN: 0 };
                                                            $$("SecAssigned").add(addrow);
                                                            $$("SecAssigned").refresh();
                                                        }
                                                    }
                                                },
                                                {
                                                    view: 'checkbox',
                                                    label: 'E-Mail Alert',
                                                    labelWidth: 100,
                                                    id: 'EmailAlert',
                                                    name: 'EmailAlert',
                                                    hidden: true,
                                                },

                                                 {

                                                     view: "radio",
                                                     label: 'Type',
                                                     id: 'Type',
                                                     name: 'Type',
                                                     labelWidth: 100,
                                                     //minWidth: 500,
                                                     //inputWidth: 500,
                                                     vertical: false,
                                                     value: 1,
                                                     options: [{ value: "New Client", id: 1 },
                                                               { value: "Existing Client", id: 2 }]
                                                 },
                                                 {
                                                     view: 'label',
                                                     label: ' ',
                                                     hidden: PageIdtst != 1 ? true : false,
                                                     minWidth: 450,
                                                 },
                                                 {
                                                     paddingY: 5,
                                                     cols: [
                                                        {
                                                            view: "text",
                                                            label: 'Consultant',
                                                            id: 'Consultant',
                                                            name: 'Consultant',
                                                            labelWidth: 100,
                                                            minWidth: 500,
                                                            inputWidth: 400,
                                                            disabled: true,
                                                            css: "TxtClsHd",
                                                            hidden: PageIdtst == 1 ? true : false,
                                                        },
                                                        {
                                                            view: 'button',
                                                            type: "icon",
                                                            css: 'webix_primary',
                                                            icon: "wxi-search",
                                                            name: 'Consultant_Btn1',
                                                            id: 'Consultant_Btn1',
                                                            inputWidth: 30,
                                                            hidden: PageIdtst == 1 ? true : false,
                                                            minWidth: 50,
                                                            on: {
                                                                onItemClick: function () {
                                                                    ConsultantLoadfn();
                                                                }
                                                            }
                                                        },
                                                         {
                                                             view: 'button',
                                                             //type: "icon",
                                                             //icon: "wxi-close",
                                                             css: 'webix_primary',
                                                             name: 'Consultant_Btn2',
                                                             id: 'Consultant_Btn2',
                                                             inputWidth: 30,
                                                             minWidth: 50,
                                                             hidden: PageIdtst == 1 ? true : false,
                                                             on: {
                                                                 onItemClick: function () {

                                                                 }
                                                             }
                                                         }
                                                     ]
                                                 },
                                                  {
                                                      view: "textarea",
                                                      label: 'Comments',
                                                      id: 'Comments',
                                                      name: 'Comments',
                                                      labelWidth: 100,
                                                      //minWidth: 500,
                                                      //inputWidth: 500,
                                                      height: 120,
                                                      attributes: { maxlength: 2000 },
                                                  },
                                                  {
                                                      view: "text",
                                                      id: 'Phone1',
                                                      label: 'Phone',
                                                      name: 'Phone1',
                                                      labelWidth: 100,// 140,
                                                      //minWidth: 500,
                                                      //inputWidth: 500,
                                                      hidden: true,
                                                      pattern: { mask: "#################", allow: /[0-9]/g },
                                                  },
                                                  {
                                                      view: "text",
                                                      id: 'LeadDesignation',
                                                      label: 'Designation',//'Lead Designation',
                                                      name: 'LeadDesignation',
                                                      labelWidth: 100,// 140,
                                                      //minWidth: 500,
                                                      //inputWidth: 500,
                                                      hidden: true,
                                                  },
                                                  {
                                                      view: "text",
                                                      id: 'Website',
                                                      label: 'Website',
                                                      name: 'Website',
                                                      labelWidth: 100,// 140,
                                                      //minWidth: 500,
                                                      //inputWidth: 500,
                                                      hidden: true,
                                                  },

                                            ]
                                        },
                                        {
                                            rows: [
                                                {
                                                    paddingX: 10,
                                                    cols: [
                                                        {
                                                            view: 'label',
                                                            label: 'Secondary Assigned To:',
                                                            id: 'Assignedlbl1',
                                                            hidden: false,
                                                            minWidth: 200,
                                                        },
                                                        {
                                                            view: "button",
                                                            css: 'webix_primary',
                                                            type: "icon",
                                                            icon: "wxi-plus",
                                                            //label: "",
                                                            id: "secAdd",
                                                            width: 30,
                                                            click: function () {
                                                                debugger;
                                                                // var text = $("#Assigned").val();
                                                                var text = $$("Assigned_To").getValue();
                                                                if (text == "") {
                                                                    alert("Assigned To Cannot be Empty...!");
                                                                    return false;
                                                                }
                                                                $$("SecAssigned").refresh();
                                                                var data = $$("SecAssigned").serialize();
                                                                if (data.length > 0) {
                                                                    var bool = false;
                                                                    $.each(data, function (key, value) {
                                                                        if (value.USER_NM == "") {
                                                                            alert("Row Cannot be Empty Value...!");
                                                                            bool = true;
                                                                        }
                                                                    });
                                                                    if (bool == true)
                                                                        return false;
                                                                }
                                                                var addrow = { USER_NM: '', PER: 0, HDN: 0 };
                                                                $$("SecAssigned").add(addrow);
                                                                $$("SecAssigned").refresh();
                                                            },
                                                            align: "right"
                                                        },
                                                        {
                                                            view: "button",
                                                            type: "icon",
                                                            icon: "wxi-trash",
                                                            css: 'webix_primary',
                                                            label: "",
                                                            id: "secDel",
                                                            width: 30,
                                                            click: function () {
                                                                debugger;
                                                                if ($$("SecAssigned").getSelectedId() != undefined) {
                                                                    var id = $$("SecAssigned").getSelectedId();
                                                                    var getitem = $$("SecAssigned").getItem(id);
                                                                    $$("SecAssigned").remove($$("SecAssigned").getSelectedId());
                                                                    $$("SecAssigned").refresh();
                                                                    //if (getitem.HDN != "1") {
                                                                    //    $$("SecAssigned").remove($$("SecAssigned").getSelectedId());
                                                                    //    $$("SecAssigned").refresh();
                                                                    //}
                                                                }
                                                            },
                                                            align: "right"
                                                        }
                                                    ]
                                                },
                                                {
                                                    view: "datatable",
                                                    id: "SecAssigned",
                                                    name: "SecAssigned",
                                                    select: 'row',
                                                    //height: 200,
                                                    //width: 200,
                                                    height: 150,
                                                    // autowidth: true,
                                                    editable: true,
                                                    //scroll: "xy",
                                                    scroll: "y",
                                                    columns: [

                                                          { id: "USER_NM", header: 'Sales Person', width: 290, css: { 'text-align': 'left ! important' }, liveedit: true, editor: "select", collection: function (id) { return ddlValues; } },
                                                          { id: "PER", header: ' % ', width: 80, css: { 'text-align': 'left ! important' }, editor: "text", liveedit: true,format: webix.i18n.intFormat, validate: function (val) { return !isNaN(val * 1) } },
                                                          { id: "HDN", hidden: true },
                                                    ],
                                                    data: [],
                                                    on: {
                                                        'onEditorChange': function (id, value) {
                                                            var getval = this.getItem(id.row);
                                                            if (id.column == 'USER_NM') {
                                                                getval.USER_NM = value;
                                                                $$("SecAssigned").refresh();
                                                            }
                                                        },
                                                        'onBeforeEditStart': function (id) {
                                                            var getval = this.getItem(id.row);
                                                            if (getval != undefined) {
                                                                if (id.column == 'USER_NM') {
                                                                    if (getval.HDN != "1") {
                                                                        var Options = this.getColumnConfig("USER_NM").collection;
                                                                        Options.clearAll();
                                                                        dataVal = SecAssignedDrop();
                                                                        Options.parse(dataVal);
                                                                    }
                                                                    else return false;
                                                                }
                                                            }
                                                        },
                                                        //"onKeyPress": function (code, e) {
                                                        //    var charCode = e.which || e.keyCode;
                                                        //    if (charCode == 46 || (charCode > 47 && charCode < 57) || charCode ==8)
                                                        //        return true;
                                                        //   // if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105))))
                                                        //    else
                                                        //        return false;                                                           
                                                        //       return true;                                                            
                                                        //  },                                                       
                                                        'onBlur': function () {
                                                            debugger;
                                                            //$$("SecAssigned").editStop();
                                                            $$("SecAssigned").refresh();
                                                        },
                                                        'onAfterEditStop': function (state, editor) {
                                                            debugger;
                                                            
                                                            if (editor.column == 'PER') {
                                                                debugger;
                                                                $$("SecAssigned").refresh();
                                                            }
                                                        }
                                                    },
                                                },
                                                 {
                                                     view: "form", minWidth: 320, id: 'Won_CommentsFrm', hidden: true, elements: [{
                                                         view: "textarea",
                                                         label: 'Won Comments',
                                                         id: 'Won_Comments',
                                                         name: 'Won_Comments',
                                                         labelPosition: 'top',
                                                         labelWidth: 100,
                                                         height: 100,
                                                         attributes: { maxlength: 300 },

                                                     }]
                                                 },

                                            ]
                                        },
                                        {
                                            rows: [
                                                {
                                                    view: "form", width: 320, elements: [{
                                                        view: "fieldset", id: "fieldsetProj", label: "Current", hidden: PageIdtst == 1 ? true : false, labelWidth: 100, height: 120, width: 200, body: {
                                                            rows: [
                                                            {
                                                                cols: [
                                                                    {
                                                                        view: "text",
                                                                        label: 'Projection Value',
                                                                        id: 'Projection_Value',
                                                                        name: 'Projection_Value',
                                                                        labelPosition: 'top',
                                                                        labelWidth: 200,
                                                                        width: 200,
                                                                        attributes: { maxlength: 9 },

                                                                        pattern: { mask: "#########", allow: /[0-9]/g },
                                                                        format: "1111.00",
                                                                        inputAlign: "right",//S.VijayaLakshmi''15/6/20

                                                                    },
                                                                     {

                                                                         rows: [
                                                                             {height:20,},

{ 



                                                                         view: "button",
                                                                         label: "Log",
                                                                         css: 'webix_primary',
                                                                         id: "Log",//"secDel"
                                                                         // labelPosition: 'right',
                                                                         align: "right",
                                                                         width: 40,
                                                                         on: {
                                                                             onItemClick: function () {
                                                                                 debugger;
                                                                                 var LeadOpprtunityID = $("#LeadOpprtunityID").val();
                                                                                 if (LeadOpprtunityID != "") {
                                                                                     $.ajax({
                                                                                         type: "POST",
                                                                                         url: "/SalesAndMarket/LogIDArgsNew",
                                                                                         data: "LogID=" + LeadOpprtunityID,
                                                                                         success: function (data) {
                                                                                             if (data.v != 0) {
                                                                                                 $$("AuditLogOppoPop").show();
                                                                                                 Load_AuditLogOppoInfo();
                                                                                             }
                                                                                         }
                                                                                     });
                                                                                 }
                                                                                
                                                                             }
                                                                         }
                                                                        
                                                                     }








                                                                ]
                                                                     }

                                                                ]



                                                            },
                                                            {
                                                                cols: [
                                                                  {
                                                                      view: "datepicker",
                                                                      label: 'Expected Closure Date',
                                                                      id: 'Expected_Closure_Date',
                                                                      name: 'Expected_Closure_Date',
                                                                      labelPosition: 'top',
                                                                      labelWidth: 200,
                                                                      width: 200,
                                                                      //S.VijayaLakshmi''25/5/20
                                                                      stringResult: true,
                                                                      format: "%d/%m/%Y",
                                                                      //
                                                                      on: {
                                                                          onChange: function () {
                                                                              debugger;
                                                                              if (REAL_IND == "1") {

                                                                                  if ($$("Real_Dt").getText() != "") {
                                                                                  }
                                                                                  else {
                                                                                      var get = $$("Expected_Closure_Date").getValue();
                                                                                      $$("Real_Dt").setValue(get);
                                                                                  }
                                                                              }

                                                                          }
                                                                      }
                                                                  }]
                                                            },
                                                            {
                                                                cols: [
                                                                  {
                                                                      view: "label",
                                                                      label: ' ',
                                                                      labelWidth: 200,
                                                                      hidden: REAL_IND == 1 ? true : false,
                                                                      width: 200,
                                                                  }]
                                                            },
                                                            {
                                                                cols: [
                                                                    {
                                                                        view: "datepicker",
                                                                        label: 'Realization Date',
                                                                        id: 'Real_Dt',
                                                                        name: 'Real_Dt',
                                                                        labelPosition: 'top',
                                                                        labelWidth: 200,
                                                                        //S.VijayaLakshmi''25/5/20
                                                                        stringResult: true,
                                                                        hidden: REAL_IND != "1" ? true : false,
                                                                        width: 200,
                                                                        format: "%d/%m/%Y",
                                                                        //
                                                                    }]
                                                            },

                                                                    //{
                                                                    //    view: "button",
                                                                    //    label: "Log",
                                                                    //    id: "Log",//"secDel"
                                                                    //    labelPosition: 'right',
                                                                    //    width: 40,
                                                                    //    click: function () { }
                                                                    //}


                                                            ]
                                                        }
                                                    }
                                                    ]
                                                },
                                                  {
                                                      view: "form", width: 320, elements: [{
                                                          view: "fieldset", label: "Proposal", id: "fieldsetProp", hidden: PageIdtst == 1 ? true : false, labelWidth: 100, height: 100, body: {
                                                              rows: [
                                                                   {
                                                                       view: "datepicker",
                                                                       label: 'First Proposal Date',
                                                                       id: 'First_Proposal_Dat',
                                                                       name: 'First_Proposal_Dat',
                                                                       labelPosition: 'top',
                                                                       labelWidth: 200,
                                                                       //S.VijayaLakshmi''25/5/20
                                                                       stringResult: true,
                                                                       format: "%d/%m/%Y",
                                                                       //

                                                                   },
                                                              {
                                                                  view: "text",
                                                                  label: 'Reference No',
                                                                  id: 'Reference_No',
                                                                  name: 'Reference_No',
                                                                  labelPosition: 'top',
                                                                  labelWidth: 200,
                                                                  pattern: { mask: "##################", allow: /[0-9]/g },
                                                                  attributes: { maxlength: 20 },
                                                              },


                                                              ]
                                                          }
                                                      }
                                                      ]
                                                  },
                                                   {
                                                       view: "form", width: 320, id: 'InitialFrm', hidden: true, elements: [{
                                                           view: "fieldset", label: "Initial", labelWidth: 100, height: 100, body: {
                                                               rows: [
                                                                     {
                                                                         view: "text",
                                                                         label: 'Projected Value',
                                                                         id: 'Projected_Value',
                                                                         name: 'Projected_Value',
                                                                         labelPosition: 'top',
                                                                         labelWidth: 200,
                                                                         attributes: { maxlength: 9 },
                                                                         format: "1,111.00",
                                                                         pattern: { mask: "#########", allow: /[0-9]/g },
                                                                     },
                                                                    {
                                                                        view: "datepicker",
                                                                        label: 'Projected Closure Date',
                                                                        id: 'Projected_Closure_Date',
                                                                        name: 'Projected_Closure_Date',
                                                                        labelPosition: 'top',
                                                                        labelWidth: 200,
                                                                        //S.VijayaLakshmi''25/5/20
                                                                        stringResult: true,
                                                                        format: "%d/%m/%Y",
                                                                        //

                                                                    },



                                                               ]
                                                           }
                                                       }
                                                       ]
                                                   },

                                                    {
                                                        view: "form", width: 320, id: 'POFrm', hidden: true, elements: [{
                                                            view: "fieldset", label: "PO", hidden: PageIdtst == 1 ? true : false, labelWidth: 100, height: 200, body: {
                                                                rows: [
                                                                      {
                                                                          view: "text",
                                                                          label: 'PO No',
                                                                          id: 'PO_No',
                                                                          name: 'PO_No',
                                                                          pattern: { mask: "#############", allow: /[0-9]/g },
                                                                          labelPosition: 'top',
                                                                          labelWidth: 200,
                                                                          attributes: { maxlength: 20 },
                                                                      },
                                                                     {
                                                                         view: "datepicker",
                                                                         label: 'PO Date',
                                                                         id: 'PO_Dt',
                                                                         name: 'PO_Dt',
                                                                         labelPosition: 'top',
                                                                         labelWidth: 200,
                                                                         //S.VijayaLakshmi''25/5/20
                                                                         stringResult: true,
                                                                         format: "%d/%m/%Y",
                                                                         //

                                                                     },
                                                                      {
                                                                          view: "text",
                                                                          label: 'Advance Amt',
                                                                          id: 'Advance_Amt',
                                                                          name: 'Advance_Amt',
                                                                          labelPosition: 'top',
                                                                          labelWidth: 200,
                                                                          pattern: { mask: "###################", allow: /[0-9]/g },
                                                                          inputAlign: "right",//S.VijayaLakshmi''15/6/20
                                                                          attributes: { maxlength: 18 },

                                                                      },
                                                                     {
                                                                         view: "datepicker",
                                                                         label: 'Date',
                                                                         id: 'POAMtDt',
                                                                         name: 'POAMtDt',
                                                                         labelPosition: 'top',
                                                                         labelWidth: 200,
                                                                         //S.VijayaLakshmi''25/5/20
                                                                         stringResult: true,
                                                                         format: "%d/%m/%Y",
                                                                         //


                                                                     },



                                                                ]
                                                            }
                                                        }
                                                        ]
                                                    },
                                                    {
                                                        view: "form", width: 320, id: 'Lost_CommentsFrm', hidden: true, elements: [
                                                          {



                                                              cols: [
                                                                  {
                                                                      view: "text",
                                                                      label: 'Lost To',
                                                                      id: 'Lost_To',
                                                                      name: 'Lost_To',
                                                                      labelPosition: 'top',
                                                                      labelWidth: 100,//150,
                                                                      inputWidth: 215,
                                                                      attributes: { maxlength: 40 },


                                                                      // minWidth:150
                                                                  },
                                                                  {
                                                                      view: "button",
                                                                      label: "C",
                                                                      css: 'webix_primary',
                                                                      // labelPosition: 'top',
                                                                      id: "Lost_To_Btn1",
                                                                      width: 30,
                                                                      //inputwidth: 30,
                                                                      //  minWidth: 5,
                                                                      click: function () {
                                                                          //S.VijayaLakshmi''20/6/20
                                                                          debugger;
                                                                          $("CompetitorSELE_ID").val("2");
                                                                          CompetitorLoadfn();

                                                                      }
                                                                  },
                                                                  {
                                                                      view: "button",
                                                                      type: "icon",
                                                                      icon: "wxi-trash",
                                                                      css: 'webix_primary',
                                                                      label: "",
                                                                      id: "Lost_To_Btn2",
                                                                      width: 30,
                                                                      //  inputwidth: 30,
                                                                      //  minWidth: 5,
                                                                      click: function () {
                                                                          //S.VijayaLakshmi''20/6/20
                                                                          debugger;
                                                                          $$("Lost_To").setValue("");
                                                                          $("#Lost_TO_ID").val("");
                                                                          $$("Lost_To").enable();
                                                                      }
                                                                  }
                                                              ]


                                                          }, {
                                                              view: "textarea",
                                                              label: 'Lost Reason',
                                                              id: 'Lost_Reason',
                                                              name: 'Lost_Reason',
                                                              labelPosition: 'top',
                                                              labelWidth: 100,
                                                              inputWidth: 215,
                                                              attributes: { maxlength: 300 },
                                                          }
                                                        ]
                                                    },

                                            ]
                                        }
                                    ]
                                }
                                ]
                            },
                            {

                                id: "ActivitiesView",
                                view: 'form',
                                elements: [{
                                    rows: [
                                         {
                                             view: 'button',
                                             type: "icon",
                                             icon: "wxi-plus",
                                             css: 'webix_primary',
                                             //label: 'Add',
                                             name: 'Activities_Btn',
                                             id: 'Activities_Btn',                                          
                                             width: 30,
                                             align: "right",
                                             on: {
                                                 onItemClick: function () {
                                                     if ($$('LOText').getValue() != "" && $$("Organization").getValue() != "") {
                                                         debugger;
                                                         $('#ActivityRow').val('');//S.VijayaLakshmi''20/5/20                                                        
                                                         ActivityAddLoadfn();
                                                         $$("ClosedActivity").hide();
                                                         $$("CanceledActivity").hide();
                                                         if (SALE_PER_ID != undefined) $$("Assigned_Topop").setValue(SALE_PER_ID);//S.VijayaLakshmi''16/5/20
                                                         $$("ActiveOrganizationTxt").setValue($$("Organization").getValue());
                                                         var Individual = $$("Individual").getValue();
                                                         if (Individual == '') {
                                                             Individual = '2';
                                                         }
                                                         var ddlvalts = [];
                                                         $.ajax({
                                                             type: "POST",
                                                             url: "/SalesAndMarket/ContactPersonDropDownNEW",
                                                             data: { 'Individual': Individual, 'orgId': $("#ORGID").val(), },
                                                             cache: false,
                                                             async: false,
                                                             charset: 'utf-8',
                                                             success: function (data) {
                                                                 if (data != null) {
                                                                     $.each(data, function (key, value) {
                                                                         var set = { value: value.Text, id: value.Value };
                                                                         ddlvalts.push(set);
                                                                     });
                                                                     $$("Contact_Name").define('options', ddlvalts);
                                                                     $$("Contact_Name").refresh();
                                                                 }
                                                             }
                                                         });
                                                     }
                                                 }
                                             }
                                         },
                                        {
                                            id: "Activity_Grid",
                                            name: "Activity_Grid",
                                            select: "row",
                                            view: "datatable",
                                            columns: [
                                                  { id: "R", header: ' ', css: 'Activity_Grid_style', width: 30, cssFormat: HDClr, css: { 'text-align': 'center ! important' } },
                                                      { id: "StrDate", header: 'Date', editable: false, css: 'Activity_Grid_style', width: 100, css: { 'text-align': 'center ! important' } },
                                                      { id: "Time", header: 'Time', editable: false, css: 'Activity_Grid_style', width: 50, css: { 'text-align': 'center ! important' } },
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
                                            height: 350,
                                            css: "webix_header_border webix_data_border",
                                            on: {
                                                "onItemDblClick": function (id, e, node) {
                                                    ActivityAddLoadfn();
                                                    var Individual = $$("Individual").getValue();
                                                    if (Individual == '') {
                                                        Individual = '2';
                                                    }
                                                    var ddlVal5 = [];
                                                    $.ajax({
                                                        type: "POST",
                                                        url: "/SalesAndMarket/ContactPersonDropDownNEW",
                                                        data: { 'Individual': Individual, 'orgId': $("#ORGID").val(), },
                                                        cache: false,
                                                        async: false,
                                                        charset: 'utf-8',
                                                        success: function (data) {
                                                            if (data != null) {
                                                                $.each(data, function (key, value) {
                                                                    var set = { value: value.Text, id: value.Value };
                                                                    ddlVal5.push(set);
                                                                });
                                                                $$("Contact_Name").define('options', ddlVal5);
                                                                $$("Contact_Name").refresh();
                                                            }

                                                        }
                                                    });
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
                                                    //Comment & Added by S.VijayaLakshmi''20/5/20
                                                    // var no = (parseInt(node.getAttribute("aria-rowindex")) - 1);
                                                    // $("#ActivityRow").val(no);
                                                    //
                                                    $('#ActivityRow').val(id);
                                                    //var no = this.getSelectedItem(id);
                                                    var no = (parseInt(node.getAttribute("aria-rowindex")) - 1);
                                                    debugger;
                                                    var R = grid_data[no].R;
                                                    var LeadOpp = grid_data[no].LeadOpp;
                                                    debugger;
                                                    var Organization = grid_data[no].Organization;
                                                    var ORGID = $('#ORGID').val();
                                                    var Name = grid_data[no].Name;
                                                    var subject = grid_data[no].subject;
                                                    debugger;
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
                                                    debugger;
                                                    if (AC_S_ID == "")
                                                        $$("ClosedActivity").hide();
                                                    else
                                                        $$("ClosedActivity").show();
                                                    if ($("#BTN_TYPE").val() == "NEW") $$("CanceledActivity").hide();
                                                    else $$("CanceledActivity").show();
                                                    var AC_S_NO = grid_data[no].AC_S_NO;
                                                    debugger;
                                                    var AlertonDueDt = grid_data[no].AlertonDueDt;
                                                    var DurationTime = grid_data[no].DurationTime;
                                                    var ToTime = grid_data[no].ToTime;
                                                    var PriorTo = grid_data[no].PriorTo;
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
                                                    $$("ActiveOrganizationTxt").setValue(Organization);
                                                    $$("Subjectpop").setValue(subject);
                                                    $$("Assigned_Topop").setValue(Assignedtoid);
                                                    $$("Statuspop").setValue(StatusID);
                                                    $$("Typepop").setValue(ContType);
                                                    $$("Prioritypop").setValue(PriorityId);
                                                    //$$("DatePOP").setValue(Date);
                                                    $$("DatePOP").setValue(dt);
                                                    $$("TimePop").setValue(Time);
                                                    $("#ContCompanyNm").val(ContPersonID);
                                                    $$("Commentspop").setValue(Comments);
                                                    $$("Contact_Name").setValue(ContPersonID);
                                                    $("#Activity_S_ID").val(AC_S_ID);
                                                    $("#Activity_S_NO").val(AC_S_NO);
                                                    $$("Locations").setValue(Locations);
                                                    $$("ActiveChkActivepop").setValue(AlertonDueDt);//S.VijayaLakshmi''20/5/20
                                                    //$("#ActivityType").data("kendoDropDownList").value(R);
                                                    //$("#ActivityType").data("kendoDropDownList").enable(false);
                                                    if (StatusID == "7") $$("ClosedActivity").setValue(1);
                                                    else $$("ClosedActivity").setValue(0);
                                                    if (StatusID == "9") $$("CanceledActivity").setValue(1);
                                                    else $$("CanceledActivity").setValue(0);
                                                }
                                            }
                                        }
                                    ]
                                }]
                            },
                            {
                                id: "ProductView",
                                view: 'form',
                                elements: [{
                                    rows: [
                                      {
                                          cols: [
                                              {},
                                              {},
                                              {
                                              view: 'button',
                                              type: "icon",
                                              icon: "wxi-plus",
                                              //label: 'Add',
                                              css: 'webix_primary',
                                              name: 'Product_Btn',
                                              id: 'Product_Btn',
                                              width: 30,
                                              align: "right",
                                              on: {
                                                  onItemClick: function () {
                                                      if ($$('LOText').getValue() != "" && $$("Organization").getValue() != "") {
                                                          ProductSearchPOPLoadfn();
                                                      }
                                                  }
                                              }
                                          },
                                          {
                                              view: "button",
                                              type: "icon",
                                              icon: "wxi-trash",
                                              css: 'webix_primary',
                                              label: "",
                                              id: "Product_Del",
                                              width: 30,
                                              click: function () {
                                                  $$("Product_Grid").editCancel();
                                                  $$("Product_Grid").remove($$("Product_Grid").getSelectedId());
                                                  $$("Product_Grid").refresh();
                                              },
                                              align: "right"
                                          }
                                          ]
                                      },
                                         {
                                             id: "Product_Grid",
                                             name: "Product_Grid",
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
                                                    { id: "ProductValue", header: 'Value', footer: { content: 'summColumn' }, width: wid_10, format: webix.i18n.numberFormat, css: { 'text-align': 'right ! important' }, editor: 'myeditor1' },
                                                    { id: "ProductQty", header: 'Units', /*footer: { content: 'summColumn' },*/ css: { 'text-align': 'center ! important' }, width: wid_10, hidden: false, editor: 'myeditor2', format: webix.i18n.intFormat, },
                                                    { id: "CalcTY", header: '', css: { 'text-align': 'center ! important' }, width: wid_10, hidden: false },
                                                    { id: "CalcValue", header: ' ', css: { 'text-align': 'right ! important' }, width: wid_10, format: webix.i18n.numberFormat, hidden: false, editor: 'myeditor1' },
                                                    { id: "Select", header: '', width: wid_10, template: "W", css: { 'text-align': 'center ! important' }, hidden: false, cssFormat: backGroundChange },
                                                    { id: "ProductTypeId", hidden: true },
                                                    { id: "ProdtTyId", hidden: true },
                                                    { id: "ProdtInd", hidden: true },
                                                    { id: "UnitTyID", hidden: true },
                                                    { id: "ID", hidden: true },
                                                    { id: "SetInd", hidden: true },
                                                    { id: "setSelectColor", hidden: true },
                                             { id: "exist", hidden: true }
                                             ],
                                             editable: true,
                                             footer: true,
                                             data: [],
                                             height: 350,
                                             on: {
                                                 "onItemDblClick": function (id, e, node) {
                                                     debugger;
                                                     var grid = $$("Product_Grid").serialize(); //$("#ProductGrid").data("kendoGrid");
                                                     var rowIndex = (parseInt(node.getAttribute("aria-rowindex")) - 1);//grid.selectable.userEvents.currentTarget.rowIndex;
                                                     $("#ProductGridRow").val(rowIndex);
                                                     var Cellindx = (parseInt(node.getAttribute("aria-colindex")) - 1);//grid._current[0].cellIndex;

                                                     if (Cellindx == "4") {
                                                         debugger;
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
                                                         if (row.ProdtInd == "1" && row.SetInd != "1") {
                                                             return true;
                                                         }
                                                         else {
                                                             return false;
                                                         }
                                                     }
                                                     if (cell.column == "ProductValue") {
                                                         row = this.getItem(cell.row);
                                                         if (row.ProdtInd == "1" && row.SetInd != "1") {
                                                             return true;
                                                         }
                                                         else {
                                                             return false;
                                                         }
                                                     }
                                                     if (cell.column == "CalcValue") {
                                                     debugger;
                                                         row = this.getItem(cell.row);
                                                         if (row.ProdtInd == "1" && row.SetInd != "1") {
                                                             return true;
                                                         }
                                                         else {
                                                             return false;
                                                         }
                                                     }
                                                 },
                                                 "onAfterEditStop": function (state, editor, ignoreUpdate) {
                                                     debugger;
                                                     if (editor.column == "ProductQty" || editor.column == "ProductValue" || editor.column == "CalcValue") {
                                                         var tot = $$("Product_Grid").getFooterNode("ProductValue").innerText;
                                                         if (tot != "" && tot != null && tot != undefined) {
                                                             //   $("#ProjectionValue").val(Comma(Number(tot.toString().replace(/,/g, '')).toFixed(2)));
                                                             $$("Projection_Value").setValue(tot);//S.Vijayalakshmi''22/5/20
                                                         }
                                                     }
                                                 },
                                                 "onEditorChange": function (cell, value) {
                                                     //productTotalCalculation(Prev_view);
                                                     //unitARRCalc(Prev_view);
                                                     if (cell.column == "ProductQty" || cell.column == "ProductValue" || cell.column == "CalcValue") {
                                                         var Values = 0;
                                                         var Units = 0;
                                                         if (cell.column == "ProductQty") {
                                                             Values = this.getItem(cell.row).ProductValue;
                                                             if (Values == "" || Values == undefined || Values == null || Values == "0" || Values == "0.00") {
                                                                 Values = this.getItem(cell.row).CalcValue;
                                                             }
                                                             Units = value;
                                                         }
                                                         else if (cell.column == "ProductValue") {
                                                             Values = value;
                                                             Units = this.getItem(cell.row).ProductQty;
                                                         }
                                                         else if (cell.column == "CalcValue") {
                                                             Values = value;
                                                             Units = this.getItem(cell.row).ProductQty;
                                                         }
                                                         var CalcValue = 0;
                                                         var PrdValue = 0;
                                                         if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                                                             Values = Values.toString().replace(/,/g, '');
                                                             if (Units != "" && Units != undefined && Units != null && Units != "0") {
                                                                 CalcValue = parseFloat(Number(Values) / Number(Units)).toFixed(2);
                                                                 PrdValue = parseFloat(Number(Values) * Number(Units)).toFixed(2);
                                                             }
                                                         }
                                                         if (cell.column == "CalcValue") {
                                                             this.getItem(cell.row).CalcValue = parseFloat(Number(Values)).toFixed(2);
                                                             this.getItem(cell.row).ProductValue = parseFloat(Number(PrdValue)).toFixed(2);
                                                             this.getItem(cell.row).ProductQty = Units;
                                                         }
                                                         if (cell.column == "ProductValue") {
                                                             this.getItem(cell.row).CalcValue = CalcValue;
                                                             this.getItem(cell.row).ProductValue = parseFloat(Number(Values)).toFixed(2);
                                                             this.getItem(cell.row).ProductQty = Units;
                                                         }
                                                         if (cell.column == "ProductQty") {
                                                             var Values1 = 0;
                                                             this.getItem(cell.row).ProductQty = Units;
                                                             Values1 = this.getItem(cell.row).ProductValue;
                                                             if (Values1 == "" || Values1 == undefined || Values1 == null || Values1 == "0" || Values1 == "0.00") {
                                                                 this.getItem(cell.row).CalcValue = Values;
                                                                 this.getItem(cell.row).ProductValue = parseFloat(Number(PrdValue)).toFixed(2);
                                                             }
                                                             else {
                                                                 this.getItem(cell.row).CalcValue = CalcValue;
                                                                 this.getItem(cell.row).ProductValue = parseFloat(Number(Values)).toFixed(2);
                                                             }
                                                         }
                                                         this.refresh();
                                                     }
                                                 },
                                                 "onItemClick": function (id, e, node) {
                                                     debugger;
                                                     if (A10_IND == "1") {
                                                         if ($$("Property").getValue() == "") {
                                                             alert('Property is Empty!....');
                                                             return false;
                                                         }
                                                     }
                                                     var C10_IND = C10_IND;
                                                     var D10_IND = D10_IND;
                                                     var E10_IND = E10_IND;
                                                     var F10_IND = F10_IND;
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
                                                                         Banq_grid = [];
                                                                         quote_generate_grid = [];
                                                                         other_charges_grid = [];
                                                                     }
                                                                     Product_Id = ProductTypeId;
                                                                     unit_type_id = UnitTyID;
                                                                     load_OtherChargesHidden(ProductTypeId, UnitTyID);
                                                                     first_exe_of_other = false;                                                                 }
                                                             });
                                                             $("#ProductTypeId").val(ProductTypeId);
                                                             $("#UnitTyID").val(UnitTyID);
                                                             if (UnitTyID == "1") {
                                                                 if (C10_IND != "") {
                                                                     load_QuoteGenerateGrid(ProductTypeId, UnitTyID);
                                                                     first_exe_of_quote = false;
                                                                     if (C10_IND != "1") {
                                                                         $$('QuoteGenerationPopup').show();
                                                                     }
                                                                     else {
                                                                         $$('QuoteGenerationPopup').show();
                                                                     }
                                                                 }
                                                                 else {
                                                                     alert(" FO Work Sheet Not Appicable.");
                                                                 }
                                                                 var gridval = $$("QuoteGeneration_Grid").serialize();
                                                                 var TotNt = 0;
                                                                 var TotTrf = 0;
                                                                 for (i = 0; i < gridval.length; i++) {
                                                                     var TotalNights = parseInt(gridval[i].RoomID) * parseInt(gridval[i].Nights);
                                                                     var TotalTariff = parseInt(gridval[i].RoomID) * parseInt(gridval[i].NetTariff);
                                                                     TotNt = TotNt + parseInt(TotalNights);
                                                                     TotTrf = TotTrf + parseInt(TotalTariff);
                                                                 }
                                                                 $$("TotalNights").define('label', TotNt);
                                                                 $$("TotalNights").refresh();
                                                                 $$("TotalTariff").define('label', parseFloat(TotTrf).toFixed(2));
                                                                 $$("TotalTariff").refresh();
                                                             }
                                                             else if (UnitTyID == "2") {
                                                                 if (D10_IND != "") {
                                                                     load_BanqWSGenerateGrid(ProductTypeId, UnitTyID);
                                                                     first_exe_of_bq = false;
                                                                     $$('BanqWorksheetPopup').show();
                                                                     var grid = $$("BanqWorksheet_Grid").serialize();
                                                                     var TOTALGross = 0;
                                                                     var TOTALUnits = 0;
                                                                     var TOTALAPC = 0;
                                                                     for (var i = 0; i < grid.length; i++) {
                                                                         var Values = grid[i].ProductValue;
                                                                         if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                                                                             TOTALGross = Number(TOTALGross) + Number(Values);
                                                                         }
                                                                         var Unitis = grid[i].ProductQty;
                                                                         if (Unitis != "" && Unitis != undefined && Unitis != null && Unitis != "0" && Unitis != "0.00") {
                                                                             TOTALUnits = Number(TOTALUnits) + Number(Unitis);
                                                                         }
                                                                         var CalcValue = grid[i].CalcValue;
                                                                         if (CalcValue != "" && CalcValue != undefined && CalcValue != null && CalcValue != "0" && CalcValue != "0.00") {
                                                                             TOTALAPC = Number(TOTALAPC) + Number(CalcValue);
                                                                         }
                                                                     }
                                                                     $$("TotalGrossAmountBQ").setValue(Number(TOTALGross).toFixed(2));
                                                                     $$("TotalGrossUnitsBQ").setValue(TOTALUnits);
                                                                     $("#BqAPCTotal").val(TOTALAPC);
                                                                 }
                                                                 else {
                                                                     alert(" Banquet Work Sheet Not Appicable.");
                                                                 }
                                                             }
                                                             else if (UnitTyID == "3") {
                                                                 if (E10_IND != "") {
                                                                     load_FBWSGenerateGrid(ProductTypeId, UnitTyID);
                                                                     first_exe_of_fb = false;
                                                                     $$('FandBsheetPopup').show();
                                                                     var grid = $$("FandBsheet_Grid").serialize();
                                                                     debugger;
                                                                     var TOTALGross = 0;
                                                                     var TOTALUnits = 0;
                                                                     var TOTALAPC = 0;
                                                                     for (var i = 0; i < grid.length; i++) {
                                                                         var Values = grid[i].ProductValue;
                                                                         if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                                                                             TOTALGross = Number(TOTALGross) + Number(Values);
                                                                         }
                                                                         var Unitis = grid[i].ProductQty;
                                                                         if (Unitis != "" && Unitis != undefined && Unitis != null && Unitis != "0" && Unitis != "0.00") {
                                                                             TOTALUnits = Number(TOTALUnits) + Number(Unitis);
                                                                         }
                                                                         var CalcValue = grid[i].CalcValue;
                                                                         if (CalcValue != "" && CalcValue != undefined && CalcValue != null && CalcValue != "0" && CalcValue != "0.00") {
                                                                             TOTALAPC = Number(TOTALAPC) + Number(CalcValue);
                                                                         }
                                                                     }
                                                                     $$("TotalGrossAmountFB").setValue(Number(TOTALGross).toFixed(2));
                                                                     $$("TotalGrossUnitsFB").setValue(TOTALUnits);
                                                                     $("#FBAPCTotal").val(TOTALAPC);
                                                                 }
                                                                 else {
                                                                     alert(" F&B Work Sheet Not Appicable.");
                                                                 }
                                                             }
                                                         }
                                                         else {
                                                             alert(" Select any one Product. ");
                                                         }
                                                     }

                                                 }
                                             }
                                         }

                                    ]
                                }
                                ]
                            },

                             {
                                 id: "CompetitorView",
                                 view: 'form',
                                 elements: [{
                                     rows: [
                                       {
                                           cols: [
                                               {},
                                               {},

                                               {
                                               view: 'button',
                                               type: "icon",
                                               icon: "wxi-plus",
                                               //label: 'Add',
                                               css: 'webix_primary',
                                               width:30,
                                               name: 'Competitor_Btn',
                                               id: 'Competitor_Btn',                                               
                                               minWidth: 30,
                                               align: "right",
                                               on: {
                                                   onItemClick: function () {
                                                       if ($$('LOText').getValue() != "" && $$("Organization").getValue() != "") {
                                                           $$("Competitor_Grid").add({
                                                               CompetitorTy: '',
                                                               ProductDropTrn: '',
                                                               Price1: '',
                                                               Notes: '',
                                                               CompetitorTyId: '',
                                                           });
                                                           $$("Competitor_Grid").refresh();
                                                       }
                                                   }
                                               }
                                           },
                                           {
                                               view: "button",
                                               type: "icon",
                                               icon: "wxi-trash",
                                               //label: "",
                                               css: 'webix_primary',
                                               id: "Competitor_Del",
                                               width: 30,
                                               click: function () {
                                                   $$("Competitor_Grid").editCancel();
                                                   $$("Competitor_Grid").remove($$("Competitor_Grid").getSelectedId());
                                               },
                                               align: "right"
                                           }
                                           ]
                                       },
                                          {
                                              id: "Competitor_Grid",
                                              name: "Competitor_Grid",
                                              select: "row",
                                              view: "datatable",
                                              columns: [
                                                     { id: "CompetitorTy", header: 'Competitor', width: 380, css: { 'text-align': 'left ! important' } },
                                                     { id: "Select", header: ' ', template: searchicon, width: 30, css: { 'text-align': 'center ! important' } },
                                                     { id: "Select1", header: ' ', template: Filtericon, width: 30, css: { 'text-align': 'center ! important' } },
                                                     { id: "ProductDropTrn", header: 'Product', width: 220, hidden: false, css: { 'text-align': 'left ! important' }, editor: "ProdNmCM" },
                                                     { id: "Price1", header: 'Price', width: 180, hidden: false, css: { 'text-align': 'right ! important' }, numberFormat: '111111111.00', editor: "myeditor1", },
                                                     { id: "Notes", header: 'Notes', width: 200, hidden: false, css: { 'text-align': 'left ! important' }, editor: "NotesCM" },
                                                     { id: "CompetitorTyId", hidden: true },
                                                     { id: "ID", hidden: true },
                                              ],
                                              editable: true,
                                              data: [],
                                              height: 350,
                                              on: {
                                                  onItemClick: function (id) {
                                                      if (id.column == 'Select') {
                                                          $("#CompetitorSELE_ID").val("1");
                                                          CompetitorLoadfn();
                                                      }
                                                      if (id.column == 'Select1') {
                                                          CompetitorCreation();
                                                      }
                                                  }
                                              }
                                          }
                                     ]
                                 }]
                             }
                        ]
                    },
                ]
            }
        ]
    });
    QuoteGenerationPopup();
    BanqWorksheetPopup();
    FandBsheetPopup();
    OtherChargesHidden();
    if ($("#QUOT_IND").val() == "1") QuotationPopup();
    AuditLogOppoLoadFn();
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
function SecAssignedDrop() {
    var text = "";
    var dataRec = "";
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/SecAssignedToLoad",
        cache: false,
        async: false,
        charset: 'utf-8',
        data: "text=" + text,
        success: function (data) {

            dataRec = JSON.parse(data);
        }
    });
    return dataRec;
}

function load_QuoteGenerateGrid(ProductTypeId, UnitTyID) {
    debugger;
    if (first_exe_of_quote == true) {
        modified_data = [];
        $.each(quote_generate_grid, function (key, value) {
            if (value.PROD_ID == ProductTypeId) {
                value.Active = 1;
                value.ID = ++l;
                modified_data.push(value);
            }
        });
        if (modified_data.length > 0) {
            $$("QuoteGeneration_Grid").clearAll();
            $$("QuoteGeneration_Grid").parse(modified_data);
            $$("QuoteGeneration_Grid").refresh();
        }
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
        $$("QuoteGeneration_Grid").clearAll();
        $$("QuoteGeneration_Grid").parse(modified_data);
        $$("QuoteGeneration_Grid").refresh();
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
            $$("BanqWorksheet_Grid").clearAll();
        $$("BanqWorksheet_Grid").parse(modified_data);
        $$("BanqWorksheet_Grid").refresh();

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
        $$("BanqWorksheet_Grid").clearAll();
        $$("BanqWorksheet_Grid").parse(modified_data);
        $$("BanqWorksheet_Grid").refresh();
    }
}
function load_FBWSGenerateGrid(ProductTypeId) {
    debugger;
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
            $$("FandBsheet_Grid").clearAll();
        $$("FandBsheet_Grid").parse(modified_data);
        $$("FandBsheet_Grid").refresh();
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
        $$("FandBsheet_Grid").clearAll();;
        $$("FandBsheet_Grid").parse(modified_data);
        $$("FandBsheet_Grid").refresh();
    }
}
function load_OtherChargesHidden(ProductTypeId) {
    if (first_exe_of_other == true) {
        modified_data = [];
        $.each(other_charges_grid, function (key, value) {
            value.Active = 1;
            value.ID = ++l;
            modified_data.push(value);
        });
        if (modified_data.length > 0)
            $$("OtherChargesHidden").clearAll();
        $$("OtherChargesHidden").parse(modified_data);
        $$("OtherChargesHidden").refresh();
        other_charges_grid1 = other_charges_grid;
    }
    else {
        var modified_data = [];
        $.each(other_charges_grid1, function (key, value) {
            value.Active = 1;
            value.ID = ++l;
            modified_data.push(value);
        });
        $$("OtherChargesHidden").clearAll();
        $$("OtherChargesHidden").parse(modified_data);
        $$("OtherChargesHidden").refresh();
    }
}
function onFandBsheetPopup_Close() {
    if (f_and_b_grid1.length <= 0) {
        $.each(f_and_b_grid, function (key1, value1) {
            if ((Number(Product_Id) != Number(value1.PROD_ID)) && (Number(unit_type_id) != value1.UnitTyID)) {
                value1.Active = 1;
                value1.ID = ++i;
                f_and_b_grid1.push(value1);
            }
        });
        $.each($$("FandBsheet_Grid").serialize(), function (key, value) {
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
        $.each($$("FandBsheet_Grid").serialize(), function (key, value) {
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
        $.each($$("QuoteGeneration_Grid").serialize(), function (key, value) {
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
        $.each($$("QuoteGeneration_Grid").serialize(), function (key, value) {
            if (value.Active != 1) {
                value.Active = 1;
                value.ID = ++j;
                quote_generate_grid1.push(value);
            }
        });
    }
}
function onBanqWSGenerateGrid_Close() {
    debugger;
    if (Banq_grid1.length <= 0) {
        $.each(Banq_grid, function (key1, value1) {
            if ((Number(Product_Id) != Number(value1.PROD_ID)) && (Number(unit_type_id) != value1.UnitTyID)) {
                value1.Active = 1;
                value1.ID = ++k;
                Banq_grid1.push(value1);
            }
        });
        $.each($$("BanqWorksheet_Grid").serialize(), function (key, value) {
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
        $.each($$("BanqWorksheet_Grid").serialize(), function (key, value) {
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
        $.each($$("OtherChargesHidden").serialize(), function (key, value) {
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
        $.each($$("OtherChargesHidden").serialize(), function (key, value) {
            if (value.Active != 1) {
                value.Active = 1;
                value.ID = ++l;
                other_charges_grid1.push(value);
            }
        });
    }
}

function LoadNewWorksheet(Lead_id) {
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
                quote_generate_grid = DatVal.FoWorkSheet;
                f_and_b_grid = DatVal.FBWorkSheet;
                Banq_grid = DatVal.BQWorkSheet;
            }
            else {
                quote_generate_grid = [];
                f_and_b_grid = [];
                Banq_grid = [];
            }
            modified_data = [];
            $.each(quote_generate_grid, function (key, value) {
                value.Active = 1;
                value.ID = ++l;
                modified_data.push(value);
            });
            modified_data1 = [];
            $.each(f_and_b_grid, function (key, value) {
                value.Active = 1;
                value.ID = ++l;
                modified_data1.push(value);
            });
            modified_data2 = [];
            $.each(Banq_grid, function (key, value) {
                value.Active = 1;
                value.ID = ++l;
                modified_data2.push(value);
            });
            if (modified_data.length > 0) {
                var grid = $$("Product_Grid").serialize(); //$("#ProductGrid").data("kendoGrid");
                for (s = 0; s < grid.length; s++) {
                    if (modified_data[0].PROD_ID == grid[s].ProductTypeId) {
                        grid[s].SetInd = "1";
                    }
                }
                $$("Product_Grid").refresh();
            }
            if (modified_data1.length > 0) {
                var grid = $$("Product_Grid").serialize(); //$("#ProductGrid").data("kendoGrid");
                for (s = 0; s < grid.length; s++) {
                    if (modified_data1[0].PROD_ID == grid[s].ProductTypeId) {
                        grid[s].SetInd = "1";
                    }
                }
                $$("Product_Grid").refresh();
            }
            if (modified_data2.length > 0) {
                var grid = $$("Product_Grid").serialize(); //$("#ProductGrid").data("kendoGrid");
                for (s = 0; s < grid.length; s++) {
                    if (modified_data2[0].PROD_ID == grid[s].ProductTypeId) {
                        grid[s].SetInd = "1";
                    }
                }
                $$("Product_Grid").refresh();
            }
            //  $$("QuoteGeneration_Grid").clearAll();
            $$("QuoteGeneration_Grid").clearAll();
            $$("QuoteGeneration_Grid").parse(modified_data);
            $$("QuoteGeneration_Grid").refresh();
            quote_generate_grid1 = quote_generate_grid;

        }
    });
    var gridval = $$("QuoteGeneration_Grid").serialize();
    var TotNt = 0;
    var TotTrf = 0;
    for (i = 0; i < gridval.length; i++) {
        var TotalNights = parseInt(gridval[i].RoomID) * parseInt(gridval[i].Nights);
        var TotalTariff = parseInt(gridval[i].RoomID) * parseInt(gridval[i].NetTariff);
        TotNt = TotNt + parseInt(TotalNights);
        TotTrf = TotTrf + parseInt(TotalTariff);
    }
    $$("TotalNights").define('label', TotNt);
    $$("TotalNights").refresh();
    $$("TotalTariff").define('label', parseFloat(TotTrf).toFixed(2));
    $$("TotalTariff").refresh();
}


//function BanquetWorkSheet(e) {
//    BQGridTotal(e);

//    //var DefaultPropertyNm = $("#DefaultProperty").data('kendoDropDownList').text();
//    var DefaultPropertyNm = $$("DefaultProperty_Load").getInputNode().innerText;

//    var window = $("#BanqWorksheetPopup");
//    var kWnd = window.data("kendoWindow");
//    kWnd.setOptions({
//        title: "WorkSheet" + " - " + DefaultPropertyNm,
//        color: "white"
//    })
//    kWnd.refresh();
//    kWnd.center().open();
//}
//function FandBWorkSheet(e) {
//    FBGridTotal(e);

//    //var DefaultPropertyNm = $("#DefaultProperty").data('kendoDropDownList').text();
//    var DefaultPropertyNm = $$("DefaultProperty_Load").getInputNode().innerText;
//    var window = $("#FandBsheetPopup");
//    var kWnd = window.data("kendoWindow");
//    kWnd.setOptions({
//        title: "WorkSheet" + " - " + DefaultPropertyNm,
//        color: "white"
//    })
//    kWnd.refresh();
//    kWnd.center().open();
//}
//function QuoteGenerate() {

//    // var DefaultProperty = $("#DefaultProperty").data('kendoDropDownList').value();
//    var DefaultProperty = $$("DefaultProperty_Load").getValue();
//    var A10_IND = '<%=Session["A10_IND"]%>';
//    if (A10_IND == "1") {
//        if (DefaultProperty == "") {
//           alert(" Select any one Property. ");
//            return false;
//        }
//    }
//    TotalGrossAmountCompute();
//    CommonDropLoad();
//    //var DefaultPropertyNm = $("#DefaultProperty").data('kendoDropDownList').text();
//    var DefaultPropertyNm = $$("DefaultProperty_Load").getInputNode().innerText;
//    var window = $("#QuoteGenerationPopup");
//    var kWnd = window.data("kendoWindow");
//    kWnd.setOptions({
//        title: "WorkSheet" + " - " + DefaultPropertyNm,
//        color: "white"
//    });
//    kWnd.refresh();
//    kWnd.center().open();
//}
//function OffLineQuoteGenerate() {

//    // var DefaultProperty = $("#DefaultProperty").data('kendoDropDownList').value();
//    var DefaultProperty = $$("DefaultProperty_Load").getValue();
//    var A10_IND = '<%=Session["A10_IND"]%>';
//    if (A10_IND == "1") {
//        if (DefaultProperty == "") {
//            $("#AlertMessageHdn").val(" Select any one Property. ");
//            $("#alertType").val('fail');
//            AlertMesaage();
//            return false;
//        }
//    }
//    //var DefaultPropertyNm = $("#DefaultProperty").data('kendoDropDownList').text();
//    var DefaultPropertyNm = $$("DefaultProperty_Load").getInputNode().innerText;
//    var window = $("#QuoteGenerationPopup");
//    var kWnd = window.data("kendoWindow");
//    kWnd.setOptions({
//        title: "WorkSheet" + " - " + DefaultPropertyNm,
//        color: "white"
//    })
//    kWnd.refresh();
//    kWnd.center().open();
//}



function DateCalLoad() {
    var FOWSGridList = $$("QuoteGeneration_Grid").serialize();
    var BQWSGridList = $$("BanqWorksheet_Grid").serialize();
    var FBWSGridList = $$("FandBsheet_Grid").serialize();
    var FODate = '0';
    var FBDate = '0';
    var BQDate = '0';
    var FODate1 = '';
    var FBDate1 = '';
    var BQDate1 = '';
    debugger;
    $.each(FOWSGridList, function (i, value) {
        var date = (value.ArraivalDt == null || value.ArraivalDt == undefined ? "" : value.ArraivalDt);
        date = date.split('/')[2] + "-" + date.split('/')[1] + "-" + date.split('/')[0];
        var d = new Date(date);
        if (FODate == '0') {
            FODate = Date.parse(d);
            FODate1 = date
        }
        else {
            if (FODate > Date.parse(d)) {
                FODate = Date.parse(d);
                FODate1 = date
            }
        }

    });
    $.each(BQWSGridList, function (i, value) {
        var date = convertDate(value.DATE == null || value.DATE == undefined ? "" : value.DATE).toString();
        date = date.split('/')[2] + "-" + date.split('/')[1] + "-" + date.split('/')[0];
        var d = new Date(date);
        if (BQDate == '0') {
            BQDate = Date.parse(d);
            BQDate1 = date
        }
        else {
            if (BQDate > Date.parse(d)) {
                BQDate = Date.parse(d);
                BQDate1 = date
            }
        }
    });
    $.each(FBWSGridList, function (i, value) {
        var date = convertDate(value.DATE == null || value.DATE == undefined ? "" : value.DATE).toString();
        date = date.split('/')[2] + "-" + date.split('/')[1] + "-" + date.split('/')[0];
        var d = new Date(date);
        if (FBDate == '0') {
            FBDate = Date.parse(d);
            FBDate1 = date
        }
        else {
            if (FBDate > Date.parse(d)) {
                FBDate = Date.parse(d);
                FBDate1 = date
            }
        }
    });

    if (BQDate <= FODate || FBDate == "0" && BQDate == "0") {
        if (FBDate <= FODate)
            $$("Real_Dt").setValue(FODate1);
        else
            $$("Real_Dt").setValue(FODate1);
    }
    else if (FODate <= BQDate || FBDate == "0" && FODate == "0") {
        if (FBDate <= BQDate && FBDate != "0")
            $$("Real_Dt").setValue(BQDate1);
        else
            $$("Real_Dt").setValue(BQDate1);
    }
    else if (FODate <= FBDate || FODate == "0" && BQDate == "0") {
        if (BQDate <= FBDate)
            $$("Real_Dt").setValue(FBDate1);
        else
            $$("Real_Dt").setValue(FBDate1);
    }
    else {
        var get = $$("Expected_Closure_Date").getValue();
        $$("Real_Dt").setValue(get);
    }
}
