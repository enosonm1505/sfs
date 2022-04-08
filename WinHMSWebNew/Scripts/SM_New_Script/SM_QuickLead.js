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
function TileLoadfn() {
    var DataRow = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/PersonTitle_New",
        data: {},
        async: false,
        success: function (data) {
            debugger;
            if (data != "") {
                DataRow = JSON.parse(data);
            }
        }
    });
    return DataRow;
}


function PageLoadFn() {
    debugger;
    var wid_25 = ((screen.width - 100) * 0.25);
    var wid_10 = ((screen.width - 100) * 0.1);
    var searchicon = "<span class='fa fa-search ' ></span>";
    var Filtericon = "<span class='fa fa-filter'></span>";
    var ddlProperty = PropertyNM_New();
    var TitleTxt_list = TileLoadfn();
    var Source_List = LoadDropDown("SalesAndMarket", "SourceLoad");
    var Assigned_List = LoadDropDown("SalesAndMarket", "AssignedToLoad");
    var Status_List = [{ id: "1", value: "Open" }, { id: "9", value: "Cancelled" }];
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
    var mode = $("#hdnMode").val();
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
                         paddingX:40,
                         cols: [
                                  {
                                      view: 'text',
                                      label: 'Lead',
                                      name: 'LOText',
                                      id: 'TxtLead',
                                      labelWidth: 100,
                                      inputWidth: 430,
                                      width: 430,
                                      required:true ,
                                      attributes: { maxlength: 40 },


                                  },
                                  {
                                      view: 'label',
                                      width: 30,
                                      id:'HidLbl'
                                  },
                             
                               {
                                   view: 'button',
                                   type: "icon",
                                   icon: "wxi-search",
                                   id: 'LeadSrch',
                                   width: 30,
                                   minwidth: 30,
                                   inputwidth: 30,
                                   hidden: true,
                                   on: {
                                       onItemClick: function () {
                                           QuickLeadSearchLoadFn();
                                           
                                       }
                                   }
                               },
                               {width:350},
                                {
                                    view: "richselect",
                                    options: Status_List,
                                    label: 'Status',
                                    id: 'Status',
                                    name: 'Status',
                                    labelWidth: 70,
                                    width: 200,
                                    value:"1"
                                },
                        
                     ]
                     },
                      {
                          paddingX: 40,

                          cols: [

                              {
                                  view: 'label', label: 'Contact', width: 100
                              },
                              {
                                  view: 'richselect',
                                  label: ' Title',
                                  id: 'TitleTxt',
                                  labelWidth: 100,
                                  labelPosition: "top",
                                  inputWidth: 80,
                                  width: 80,
                                  options: TitleTxt_list,
                                  value: TitleTxt_list[0].id,
                                 
                              },
                              {
                                  view: 'text',
                                  id: 'LastName',
                                  required: true,
                                  label: '  LastName',
                                  labelPosition: "top",
                                  labelWidth: 10,
                                  width: 250,
                                  attributes: { maxlength: 39 }
                              },
                              {
                                  view: 'text',
                                  id: 'FirstName',
                                  label: '  FirstName',
                                  labelPosition: "top",
                                  labelWidth: 10,
                                  width: 250,
                                  attributes: { maxlength: 40 }
                              }

                          ]
                      },
                    {
                        paddingX: 40,
                        cols: [
                                {
                                    view: "text",
                                    label: 'Mobile',
                                    id: 'Mobile',
                                    labelWidth: 100,
                                    width: 350,
                                    inputWidth: 330,
                                    required: true,
                                    pattern: { mask: '#################################', allow: /[0-9]/g },
                                    attributes: { maxlength: 40 }
                                },
                                
                                  
                        ]
                    },
                    {
                        paddingX: 40,
                        cols:[
                             {
                                 view: "text",
                                 label: 'Email ',
                                 id: 'Email',
                                 labelWidth: 100,
                                 width: 350,
                                 inputWidth: 330,
                                 attributes: { maxlength: 40 }
                             }
                        ]
                         
                    },
                       {
                           paddingX: 40,
                           cols: [
                           {
                               view: "combo",
                               options: Source_List,
                               label: 'Source',
                               id: 'Source',
                               name: 'Source',
                               labelWidth: 100,
                               required: true,
                               inputWidth: 330,
                               width: 330,
                           },
                           ]
                       },
                         {

                             paddingX: 40,
                             cols:[
                               {
                                   view: "combo",
                                   label: 'Assigned To',
                                   id: 'AssignedTo',
                                   name: 'AssignedTo',
                                   labelWidth: 100,
                                   width: 330,
                                   inputWidth: 330,
                                   required: true,
                                   options: Assigned_List,
                                   on: {
                                       onChange: function (newval, oldval) {

                                       }
                                   }
                               }

                             ]
                            
                         },
                         {
                             paddingX: 40,
                             cols:[
                                 {
                                     view: "textarea",
                                     label: 'Comments',
                                     id: 'Comments',
                                     name: 'Comments',
                                     labelWidth: 100,
                                     width: 680,
                                     height: 120,
                                     attributes: { maxlength: 2000 },
                                 }

                             ]
                            
                         },

                  

              
               
                ]
            }
            ]
    });
    FnQuickLeadPopupLoad();
}

function fnsave() {
    var dataparam = {};
    if ($("#hdnMode").val() == "Open")
    {
        if ($("#hdnLeadId").val() == "") {
            alert("Lead Id Cannot be Empty");
            return false;
        }

    }
    if ($$("TxtLead").getValue() == "") {
        alert("Lead Cannot be Empty");
        return false;
    }
    if ($$("TitleTxt").getValue() == "") {
        alert("Title Cannot be Empty");
        return false;
    }
    if ($$("LastName").getValue() == "") {
        alert("Last Name Cannot be Empty");
        return false;
    }
    //if ($$("FirstName").getValue() == "") {
    //    alert("First Name Cannot be Empty");
    //    return false;
    //}
    if ($$("Mobile").getValue() == "") {
        alert("Mobile Cannot be Empty");
        return false;
    }
    //if ($$("Email").getValue() == "") {
    //    alert("Email Cannot be Empty");
    //    return false;
    //}

    if ($$("Source").getValue() == "") {
        alert("Source Cannot be Empty");
        return false;
    }

    if ($$("AssignedTo").getValue() == "") {
        alert("Assigned To Cannot be Empty");
        return false;
    }
    $("#btnConvert").attr("disabled", true)
    if ($("#hdnMode").val() == "Open") dataparam["LeadId"] = $("#hdnLeadId").val();
    else dataparam["LeadId"] = "";
    

    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_QUICKLEADSAVE";
    dataparam["TxtLead"] = $$("TxtLead").getValue();
    dataparam["TitleTxt"] = $$("TitleTxt").getValue();
    dataparam["LastName"] = $$("LastName").getValue();
    dataparam["FirstName"] = $$("FirstName").getValue();
    dataparam["Mobile"] = $$("Mobile").getValue();
    dataparam["Email"] = $$("Email").getValue();
    dataparam["Source"] = $$("Source").getValue();
    dataparam["AssignedTo"] = $$("AssignedTo").getValue();
    dataparam["Mode"] = $("#hdnMode").val();
    dataparam["Comments"] = $$("Comments").getValue();
    dataparam["Status"] = $$("Status").getValue();
    var paramValue = JSON.stringify(dataparam);

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/SalesAndMarket/QuickLead_Save",
        async: false,
        data: "request=" + encodeURIComponent(paramValue),
        success: function (data) {
            debugger;
            var alertVal = data.v.ErrorMeg;
            if (alertVal == "Success") {
                if ($("#hdnMode").val() == "New")
                    alert("Saved Successfully");
                else if ($("#hdnMode").val() == "Open")
                    alert("Updated Successfully");

                fnRefresh();
            }
            else {
                alert(alertVal);
            }
        }
    });

}
function QuickLeadSearchLoadFn(QuickLeadId) {
    debugger;
    var DataVal = [];
    var Sts="";
    if ($$("ChkOpen").getValue() == "1") Sts = "1"; else Sts = "9"
    var QLeadId = "";
    if (QuickLeadId != "" && QuickLeadId!=undefined) QLeadId = QuickLeadId;

    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/QuickLeadSearchLoad",
        cache: false,
        async: false,
        charset: 'utf-8',
        data: "Status=" + Sts + "&QuickLeadId=" + QLeadId,
        success: function (data) {
            if (data != "")
                DataVal = JSON.parse(data);
                if (QLeadId != "")
                {
                    $("#hdnLeadId").val(QLeadId);
                    $$("Status").setValue($.trim(DataVal[0].Status));
                    $$("LastName").setValue(DataVal[0].LastName);
                    $$("FirstName").setValue(DataVal[0].FirstName);
                    $$("TitleTxt").setValue($.trim(DataVal[0].Title));
                    $$("TxtLead").setValue(DataVal[0].LeadNm);
                    $$("Source").setValue($.trim(DataVal[0].Source));
                    $$("Mobile").setValue(DataVal[0].Mobile);
                    $$("Email").setValue(DataVal[0].Email);
                    $$("AssignedTo").setValue($.trim(DataVal[0].AssignedTo));
                    $$("Comments").setValue(DataVal[0].Comments);
                    if ($.trim(DataVal[0].Status) == "1") $("#btnConvert").show(); else $("#btnConvert").hide();
                }
                else {
                    $$("QuickLeadGrid").clearAll();
                    $$("QuickLeadGrid").parse(DataVal);
                    $$("QuickLeadGrid").refresh();
                    $$("QuickLeadPop").show();

                }
              
        },
    });
    //$$("QuickLeadPop").show();
//   return DataVal;
}
function FnQuickLeadPopupLoad() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "QuickLeadPop",
        head: "Quick Lead Search",
        position: "center",
        width:400,
       // autowidth: true,
        body: {
            rows: [
               
                {
                    cols:[
                   {
                       view: 'checkbox',
                       label: 'Open',
                       name: 'Open',
                       id: 'ChkOpen',
                       labelWidth: 80,
                       width: 150,
                       value: 1,
                       on: {
                           onChange: function (newval, oldval) {
                               if (newval == 1) $$("ChkCancel").setValue("0"); else $$("ChkCancel").setValue("1");
                              
                               QuickLeadSearchLoadFn();
                           }
                       }
                   },
                     {
                         view: 'checkbox',
                         label: 'Cancelled',
                         name: 'Cancelled',
                         id: 'ChkCancel',
                         labelWidth: 80,
                         width: 150,
                         value: 0,
                         on: {
                             onChange: function (newval, oldval) {
                                 if (newval == 1) $$("ChkOpen").setValue("0"); else $$("ChkOpen").setValue("1");

                                 QuickLeadSearchLoadFn();
                             }
                         }
                     }
                    ]
                 
                },
                {
                view: "datatable",
                id: "QuickLeadGrid",
                select: "row",
                data: [],
                height: 450,
                width: 350,
                columns: [
                       { header: ["Lead", { content: "textFilter" }], id: "LeadNm", width: 330, css: { 'text-align': 'left ! important' } },
                       { header: "", id: "LeadId", hidden: true },
                       { header: "", id: "Status", hidden: true },
                        { header: "", id: "Title", hidden: true },
                       { header: "", id: "LastName", hidden: true },
                      { header: "", id: "FirstName", hidden: true },
                       { header: "", id: "Mobile", hidden: true },
                       { header: "", id: "Email", hidden: true },
                      { header: "", id: "Source", hidden: true },
                       { header: "", id: "AssignedTo", hidden: true },
                      { header: "", id: "Comments", hidden: true },

                ],
                on: {
                    'onItemDblClick': function (id) {
                        debugger;
                        var selectedRows = this.getItem(id.row);
                        $("#hdnLeadId").val(selectedRows.LeadId);
                        $$("Status").setValue($.trim(selectedRows.Status));
                        $$("LastName").setValue(selectedRows.LastName);
                        $$("FirstName").setValue(selectedRows.FirstName);
                        $$("TitleTxt").setValue($.trim(selectedRows.Title));
                        $$("TxtLead").setValue(selectedRows.LeadNm);
                        $$("Source").setValue($.trim(selectedRows.Source));
                        $$("Mobile").setValue(selectedRows.Mobile);
                        $$("Email").setValue(selectedRows.Email);
                        $$("AssignedTo").setValue($.trim(selectedRows.AssignedTo));
                        $$("Comments").setValue(selectedRows.Comments);
                        if ($.trim(selectedRows.Status) == "1") $("#btnConvert").show(); else $("#btnConvert").hide();
                        $$("QuickLeadPop").hide();
                    },
                    'onBeforeFilter': function () {
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    },
                    'onAfterFilter': function () {
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    }
                }
            },

            ],

        }
    });
  
   

    
}

function fnOpen()
{
    $("#btnAdd").attr("disabled", true);
    $$("LeadSrch").show();
    $$("HidLbl").hide();
    $("#btnConvert").hide()
}

function fnNew()
{
    $("#btnModify").attr("disabled", true);
    $$("HidLbl").show();
    $$("LeadSrch").hide();
    $("#btnConvert").hide()
}

function fnRefresh() {
    $("#btnAdd").attr("disabled", false)
    $("#btnModify").attr("disabled", false)
    $("#btnSave").attr("disabled", false)
    $("#btnConvert").attr("disabled", false)
    $$("TxtLead").setValue("");
    $$("Status").setValue("1");
    $$("LastName").setValue("");
    $$("FirstName").setValue("");
    $$("AssignedTo").setValue("");
    $$("Comments").setValue("");
    $$("Source").setValue("");
    $$("Email").setValue("");
    $$("Mobile").setValue("");
    $$("HidLbl").show();
    $$("LeadSrch").hide();
    $$("TitleTxt").setValue("");
    $("#btnConvert").hide();



}

function fnConvert() {
    var QuickLead = $("#hdnLeadId").val();
    if (QuickLead== "") {
        alert("Lead Cannot be Empty");
        return false;
    }
    $("#btnSave").attr("disabled", true)
    fnRefresh();
    var SW = Number(screen.width) - 20;
    var Sh = Number(screen.height) - 100;
    var Window1 = window.open("/SalesAndMarket/SMLeadOpportunity?Page=1&PARTIAL=1&QuickLeadId=" + $.trim(QuickLead), "", "width=" + SW + ",height=" + Sh + ",left=10,top=20 ");
 

}








