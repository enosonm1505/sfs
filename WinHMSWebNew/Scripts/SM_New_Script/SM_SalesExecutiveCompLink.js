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
function PageLoadFn() {
    debugger;
    var wid_25 = ((screen.width - 100) * 0.25);
    var wid_10 = ((screen.width - 100) * 0.1);
    var searchicon = "<span class='fa fa-search ' ></span>";
    var Filtericon = "<span class='fa fa-filter'></span>";    
    var ddlProperty = PropertyNM_New();
    var DefaultPropertyList = LoadDropDown("SalesAndMarket", "DefaultProperty");
    var date = new Date();
    date.setDate(date.getDate() + 1);
    date.toLocaleDateString();
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
        //minWidth: 900,
        minHeight: 520,
        elements: [
            {
                rows: [                    
                     {
                         width: 500,
                         cols: [
                         {
                             width: 300,
                             view: 'text',
                             label: 'Sales Executive',
                             id: 'TxtSalesExec',
                             labelWidth: 120,
                             inputWidth: 300,
                             minWidth: 300,                          
                         },
                           {
                               view: 'button',
                               type: "icon",
                               icon: "wxi-search",
                               css: 'webix_primary',
                               id: 'BtnSearch1',
                               width: 30,
                               minwidth: 30,
                               inputwidth: 30,
                               on: {
                                   onItemClick: function () {
                                       $$("SalesExecSearchPOP").show();
                                   }
                               }
                           },
                          
    ]
                     },
                    {
                       // hidden: true,
                        id :"rowCombo",
                        cols: [
                              
                                {
                                    view: 'datepicker',
                                    label: 'Start Date',
                                    id: 'Start_Dt', 
                                    labelWidth: 120,
                                    inputWidth: 250,
                                    minWidth: 300,
                                    stringResult: true,
                                    format: "%d/%m/%Y",
                                    value: date
                                },                             
                        ]
                    },
                    {
                    cols: [

                            {
                                view: 'datepicker',
                                label: 'End Date',
                                id: 'End_Dt',
                                labelWidth: 120,
                                inputWidth: 250,
                                minWidth: 300,
                                stringResult: true,
                                format: "%d/%m/%Y",
                                value: date
                            },


                        ]
                    },
                    {
                        paddingX: 10,
                        cols: [
                         
                            { width: 530 ,},
                              {
                                  view: "button",
                                  type: "icon",
                                  icon: "wxi-plus",
                                  label: "",
                                  css: 'webix_primary',
                                  id: "BtnAdd",
                                  width: 30,
                                  click: function () {
                                      debugger;
                                    
                                      $$("SaveGrid").refresh();
                                      var data = $$("SaveGrid").serialize();
                                      if (data.length > 0) {
                                          var bool = false;
                                          $.each(data, function (key, value) {
                                              if (value.CompNm == "") {
                                                  alert("Row Cannot be Empty Value...!");
                                                  bool = true;
                                              }
                                          });
                                          if (bool == true)
                                              return false;
                                      }
                                      var addrow = { CompNm: '', CompId: '' };
                                      $$("SaveGrid").add(addrow);
                                      $$("SaveGrid").refresh();
                                  },
                                  align: "right"
                              },
                                    {
                                        view: "button",
                                        type: "icon",
                                        css:'webix_primary',
                                        icon: "wxi-trash",
                                        label: "",
                                        id: "BtnDel",
                                        width: 30,
                                        click: function () {
                                            debugger;
                                            if ($$("SaveGrid").getSelectedId() != undefined) {
                                                var id = $$("SaveGrid").getSelectedId();
                                                var getitem = $$("SaveGrid").getItem(id);
                                                $$("SaveGrid").remove($$("SaveGrid").getSelectedId());
                                                $$("SaveGrid").refresh();
                                               
                                            }
                                        },
                                        align: "right"
                                    }
                        ]

                    },




                  

                    {
                        cols: [{

                            id: "SaveGrid",
                            name: "SaveGrid",
                            select: "row",
                            view: "datatable",
                            columns: [
                                { id: "CompNm", header: 'Applicable Companies', width: 380, css: { 'text-align': 'left ! important' } },
                                { id: "SELECT", header: ' ', template: searchicon, width: 30, css: { 'text-align': 'center ! important' } },
                                { id: "CompId", hidden: true },
                                { id: "C_ID", hidden: true },

                             
                            ],
                            editable: true,
                            data: [],
                            height: 400,
                            width:600,
                            on: {
                               
                                onItemClick: function (id) {
                                    if (id.column == 'SELECT') {
                                        $$("CompanySearchPOP").show();
                                     
                                    }

                                }
                            }

                        }]




                    },
               
                ]
            }
            ]
    });
    
    SalesexecutiveLoadfn();
    CompanyLoadfn();
}

function fnOpen()
{
    
  //  $$("ddlRmty").setValue("");
    $("#btnView").attr("disabled", true);
    $("#btnSave").attr("disabled", false);
    $("#btnUpdate").attr("disabled", false);
    $("#BTN_TYPE").val("OPEN");
}

function fnView()
{
   
    $("#btnOpen").attr("disabled", true);
    $("#btnSave").attr("disabled", true);
    $("#btnUpdate").attr("disabled", true);
    $("#BTN_TYPE").val("VIEW");

}
function CompanyLoadfn() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Company Name Search",
        id: 'CompanySearchPOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    cols: [
                        {}, {},
                     {
                         view: 'checkbox',
                         labelRight: 'Not Linked',
                         name: 'ChkLink',
                         id: 'ChkLink',
                         labelWidth: 30,
                         value: 1,
                         on: {
                             onChange: function () {

                                 CompanySearchloadfn();

                             }
                         }
                     },

                    ]
                },

                {
                    id: "CompanyGrid",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "CompNm", header: ['Company Name', { content: "textFilter" }], width: 380, css: { 'text-align': 'left ! important' } },
                            { id: "CompId", hidden: true },
                            { id: "C_ID", hidden: true },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            debugger;

                            var getval = this.getItem(id.row);
                            var dataval = $$("SaveGrid").getSelectedItem();
                           
                            var data = $$("SaveGrid").serialize();
                            if (data.length > 0) {
                                var bool = false;
                                $.each(data, function (key, value) {

                                    if (value.CompId == getval.CompId) {
                                        alert("Company Name Already Exist ...!");
                                        bool = true;
                                    }

                                });

                                if (bool == true)
                                    return false;
                            }
                            dataval.CompId = getval.CompId;
                            dataval.CompNm = getval.CompNm;
                            dataval.C_ID = getval.C_ID;
                            $$("SaveGrid").refresh();
                            $$("CompanySearchPOP").hide();
                        }
                    },
                },
                {
                    view: 'form',
                    elements: [
                        {
                            cols: [
                                {
                                    view: 'label',
                                    label: ' ',
                                    name: 'label1',
                                    id: 'label1',
                                    labelWidth: 100,
                                },
                                {
                                    cols: [
                                        {

                                        },
                                        {
                                            view: 'button',
                                            //type: "icon",
                                            //icon: "wxi-close",
                                            label: 'Cancel',
                                            css:'webix_primary',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("CompanySearchPOP").hide();
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    })
    //.show();
   var dataval = CompanySearchloadfn();
}
function CompanySearchloadfn() {

    var ActiveInd = $$("ChkLink").getValue();
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/CompanySearchLoad",
        data: "ActiveInd=" + ActiveInd,
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("CompanyGrid").clearAll();
                $$("CompanyGrid").parse(rowDatad);
                $$("CompanyGrid").refresh();
            }
        }
    });
    return rowDatad;
}
function SalesexecutiveLoadfn() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Sales Executive Search",
        id: 'SalesExecSearchPOP',
        modal: true,
        width: 400,
        //height:600,
        close: true,
        body: {
            rows: [
                {
                    cols: [
                        {},{},
                     {
                         view: 'checkbox',
                         labelRight: 'Active',
                         name: 'ChkActive',
                         id: 'ChkActive',
                         labelWidth: 30,
                         value: 1,
                         on: {
                             onChange: function () {

                                 SalesExecSearchloadfn();

                             }
                         }
                     },
                     
                ]} ,
                {
                    id: "SalesExecGrid",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "ExecNm", header: ['Executive Name', { content: "textFilter" }], width: 380, css: { 'text-align': 'left ! important' } },
                            { id: "ExecId", hidden: true },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            debugger;                        
                            var getval = this.getItem(id.row);                            
                                $$("TxtSalesExec").setValue(getval.ExecNm);
                                $("#ExecId").val(getval.ExecId);
                                $$("TxtSalesExec").disable();
                                FnSalesExecLoad();  
                                $$("SalesExecSearchPOP").hide();
                        }
                    },
                },
                {
                    view: 'form',
                    elements: [
                        {
                            cols: [
                                {
                                    view: 'label',
                                    label: ' ',
                                    name: 'label1',
                                    id: 'label1',
                                    labelWidth: 100,
                                },
                                {
                                    cols: [
                                        {                                            
                                        },
                                        {
                                            view: 'button',
                                            //type: "icon",
                                            //icon: "wxi-close",
                                            css:'webix_primary',
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("SalesExecSearchPOP").hide();
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    })
        //.show();
    var dataval = SalesExecSearchloadfn();
}
function FnSalesExecLoad() {
    debugger;
    var SalesExecId = $("#ExecId").val();
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/FnSalesExecLoad",
        data: "SID=" + SalesExecId,
        async: false,
        success: function (data) {

            if (data != null && data != "" && data != undefined) {
                if (data.v != "" && data.v != "[]")
                {
                    var dtval = JSON.parse(data.v);

                    var dt1 = dtval[0].S_DT;
                    dt1 = dt1.split('/');
                    dt1 = new Date(parseInt(dt1["2"]), parseInt(dt1["1"]) - 1, parseInt(dt1["0"]));
                    $$("Start_Dt").setValue(dt1);

                    dt1 = dtval[0].E_DT;
                    dt1 = dt1.split('/');
                    dt1 = new Date(parseInt(dt1["2"]), parseInt(dt1["1"]) - 1, parseInt(dt1["0"]));
                    $$("End_Dt").setValue(dt1);

                    $$("SaveGrid").clearAll();
                    $$("SaveGrid").parse(JSON.parse(data.v));
                    $$("SaveGrid").refresh();
                }
                else {
                    $$("SaveGrid").clearAll();
                    $$("SaveGrid").refresh();
                    $$('Start_Dt').setValue('');
                    var dt = new Date();
                    $$('Start_Dt').setValue(dt);

                    $$('End_Dt').setValue('');
                    var dt = new Date();
                    $$('End_Dt').setValue(dt);
                }
               

            }

        }
    });
    return rowDatad;

}
function SalesExecSearchloadfn(Active) {
   
    var ActiveInd = $$("ChkActive").getValue();
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/SalesExecutiveLoad",
        data: "ActiveInd=" + ActiveInd,
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("SalesExecGrid").clearAll();
                $$("SalesExecGrid").parse(rowDatad);
                $$("SalesExecGrid").refresh();
            }
        }
    });
    return rowDatad;
}
function fnsave()
{
    debugger;
    
    var SalesExecId = $("#ExecId").val();
    var BTN_TYPE = $("#BTN_TYPE").val();
    var StartDt = $$("Start_Dt").getText();
    var EndDt = $$("End_Dt").getText();
    var Grid = "";
    var SaveGridList = $$("SaveGrid").serialize();
    if (SaveGridList.length > 0) {
        var SaveGrid = [];
        
        $.each(SaveGridList, function (i, value) {
            var obj = {};
           
            
            var CmpId = (value.CompId == null || value.CompId == undefined ? "" : value.CompIdCm);
            if (CmpId != "") {
                Grid = "1";
                obj["CompId"] = (value.CompId == null || value.CompId == undefined ? "" : value.CompId);
                obj["C_ID"] = (value.C_ID == null || value.C_ID == undefined ? "" : value.C_ID);
            }

            SaveGrid.push(obj);
        });
    }
    var Table = {};
    Table["StartDt"] = StartDt;
    Table["EndDt"] = EndDt;
    Table["BTN_TYPE"] = BTN_TYPE;
    Table["SalesExecId"] = SalesExecId;
    Table["SaveGridList"] = JSON.stringify(SaveGrid);
    var paramValue = JSON.stringify(Table);
    $("#btnView").attr("disabled", true);
    $("#btnOpen").attr("disabled", true);
    $("#btnSave").attr("disabled", true);
    if (SalesExecId != "") {
        if (Grid != "") {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "/SalesAndMarket/SalesExecCompLink_Save",
                async: false,
                data: "request=" + encodeURIComponent(paramValue),
                success: function (data) {
                    debugger;
                    var alertVal = data.v.ErrorMeg;
                    alert(alertVal);
                    fnRefresh();
                  
                }
                });

        }
        else
        {
            alert(" Company Name cannot be Empty.");
        }

    }
    else
    {
        alert(" Sales Executive cannot be Empty.");
       
    }
  
    $("#btnOpen").attr("disabled", false);
    $("#btnSave").attr("disabled", true);
  
            
}
function fnsave_BatchUpdate() {
    debugger;

    var SalesExecId = $("#ExecId").val();
    var BTN_TYPE = $("#BTN_TYPE").val();
    var StartDt = $$("Start_Dt").getText();
    var EndDt = $$("End_Dt").getText();
    var Grid = "";
    var SaveGridList = $$("SaveGrid").serialize();
    if (SaveGridList.length > 0) {
        var SaveGrid = [];

        $.each(SaveGridList, function (i, value) {
            var obj = {};
         
            var CmpId = (value.CompId == null || value.CompId == undefined ? "" : value.CompIdCm);
            if (CmpId != "") {
                Grid = "1";
                obj["CompId"] = (value.CompId == null || value.CompId == undefined ? "" : value.CompId);
                obj["C_ID"] = (value.C_ID == null || value.C_ID == undefined ? "" : value.C_ID);
            }

            SaveGrid.push(obj);
        });
    }
    var Table = {};
    Table["StartDt"] = StartDt;
    Table["EndDt"] = EndDt;
    Table["BTN_TYPE"] = BTN_TYPE;
    Table["SalesExecId"] = SalesExecId;
    Table["SaveGridList"] = JSON.stringify(SaveGrid);
    var paramValue = JSON.stringify(Table);
    $("#btnView").attr("disabled", true);
    $("#btnOpen").attr("disabled", true);
    $("#btnSave").attr("disabled", true);
    if (SalesExecId != "") {
        if (Grid != "") {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "/SalesAndMarket/SalesExecCompLink_BatchUpdate",
                async: false,
                data: "request=" + encodeURIComponent(paramValue),
                success: function (data) {
                    debugger;
                    var alertVal = data.v.ErrorMeg;
                    alert(alertVal);
                    fnRefresh();

                }
            });

        }
        else {
            alert(" Company Name cannot be Empty.");
        }

    }
    else {
        alert(" Sales Executive cannot be Empty.");

    }

    $("#btnOpen").attr("disabled", false);
    $("#btnUpdate").attr("disabled", true);

}




function fnRefresh()
{
    $("#BTN_TYPE").val("OPEN");
    $("#btnView").attr("disabled", false);
    $("#btnOpen").attr("disabled", false);
    $("#btnUpdate").attr("disabled", true);
    $("#btnSave").attr("disabled", true);
    $$('Start_Dt').setValue('');
    var dt = new Date();
    $$('Start_Dt').setValue(dt);

    $$('End_Dt').setValue('');
    var dt = new Date();
    $$('End_Dt').setValue(dt);
   
    $("#ExecId").val("");
    $$("TxtSalesExec").setValue("");
    $$("SaveGrid").clearAll();
   
   
    
}





