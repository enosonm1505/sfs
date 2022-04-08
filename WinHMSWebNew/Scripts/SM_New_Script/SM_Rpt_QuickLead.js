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

function PageLoadFn() {
    debugger;
    var wid_25 = ((screen.width - 100) * 0.25);
    var wid_10 = ((screen.width - 100) * 0.1);
    var searchicon = "<span class='fa fa-search ' ></span>";
    var Filtericon = "<span class='fa fa-filter'></span>";
    var ddlProperty = PropertyNM_New();
    $("#LoadDIv").hide();
    var date = new Date();
    date.toLocaleDateString();
    var Source_List = LoadDropDown("SalesAndMarket", "SourceLoad");
    var Assigned_List = LoadDropDown("SalesAndMarket", "AssignedToLoad");
    loadOptionPopWindow("1");
    webix.ui({
        view: 'richselect',
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
                         paddingX: 40,
                         cols: [

                          
                                 {
                                     rows: [{
                                         view: "richselect",
                                         options: Source_List,
                                         label: 'Source',
                                         id: 'Source',
                                         name: 'Source',
                                         labelWidth: 100,
                                         required: true,
                                         inputWidth: 330,
                                         width: 340,
                                     },
                                     { cols:[{
                                         view: "richselect",
                                         label: 'Assigned To',
                                         id: 'AssignedTo',
                                         name: 'AssignedTo',
                                         labelWidth: 100,
                                         width: 340,
                                         inputWidth: 330,
                                         required: true,
                                         options: Assigned_List,
                                         on: {
                                             onChange: function (newval, oldval) {

                                             }
                                         }
                                     },
                                     {
                                         view: "button",
                                         id: "optionsSrch",
                                         type: 'icon',
                                         icon: "wxi-filter",
                                         tooltip: "Options",
                                        css: "webix_primary ",
                                        //  inputWidth: 40,
                                         //  icon: Filtericon,
                                         //template:Filtericon,
                                         width: 32,
                                        

                                         on: {

                                             onItemClick: function () {
                                                 debugger;
                                                 loadOptionPopWindow("2");
                                             }
                                         }
                                     },
                                     ]
                                     },                             
                                     ]
                                 },
                                       {
                                           rows:[{
                                               view: "datepicker",
                                               id: "txtFrmDate",
                                               stringResult: true,
                                               label: "Create From",
                                               format: "%d/%m/%Y",
                                               labelAlign: "Left",
                                               labelWidth: 90,
                                               inputWidth: 220,
                                               width: 230,
                                               minWidth: 200,
                                               value: date,
                                           }]},
                                                  {
                                                      rows:[{
                                                          view: "datepicker",
                                                          id: "txtToDt",
                                                          disable: true,
                                                          stringResult: true,
                                                          label: "To",
                                                          format: "%d/%m/%Y",
                                                          labelAlign: "Left",
                                                          labelWidth: 30,
                                                          inputWidth: 160,
                                                          width: 170,
                                                          minWidth: 160,
                                                          value: date,
                                                      }]
                                                  },
                                 
                                {
                                    rows:[{
                                        view: "button",
                                        id: 'btnDisplay',
                                        label: "Display", labelAlign: "left",
                                        labelWidth: 0,
                                        inputWidth: 100,
                                        css: 'webix_primary',
                                        width: 110,
                                        minWidth: 100,
                                        on: {
                                            onItemClick: function () {
                                                display();
                                            }
                                        }
                                    }]  
                                },

                                {
                                    view: "fieldset",  label: "Status", css: "webix_fieldset_label2", body: {
                                        rows: [
                                        {

                                            view: "checkbox",
                                            id: "chkOpen",
                                            label: "Open",
                                            labelAlign: "Left",
                                            labelWidth: 80,
                                            width: 120,
                                            value:1,
                                        },
                                        {

                                            view: "checkbox",
                                            id: "chkConvrt",
                                            label: "Converted",
                                            labelAlign: "Left",
                                            labelWidth: 80,
                                            width: 120,
                                        },
                                        {

                                            view: "checkbox",
                                            id: "chkCanceled",
                                            label: "Cancelled",
                                            labelAlign: "Left",
                                            labelWidth: 80,
                                            width: 120,
                                        },


                                        ]

                                    },
                                },
                              
                         ]
                     },

                     {height:10,},
                               {

                                   id: "QuickLdGrid",
                                   select: 'row',
                                   view: "datatable",
                                   fixedRowHeight: false,
                                   rowLineHeight: 23,
                                   autoConfig: true,
                                   resizeColumn: true,
                                   resizeRow: true,
                                   spans: true,
                                   height: 410,
                                   navigation: true,
                                   position: "flex",
                                  // css: "webix_header_border",
                                   //scroll: true,
                                   rowHeight: 20,
                                   data: [],
                                   scheme: {
                                       $change: function (item) {
                                           var Columns = $$('QuickLdGrid').config.columns;
                                           var ColCnt = Columns.length;
                                           if (item.STATUS == "1") {
                                               item.STATUS = "Open";
                                           }
                                           else if (item.STATUS == "9") {
                                               item.STATUS = "Cancelled";
                                           }
                                           else if (item.STATUS == "5" && item.A_TY == "O") {
                                               item.STATUS = "Opertunity";
                                           }
                                           else if (item.STATUS == "5" && item.A_TY == "L") {
                                               item.STATUS = "Lead";
                                           }                                          
                                           $$("QuickLdGrid").refresh();
                                       }
                                   },
                                   columns: [
                                       { header: "Lead", id: "LEAD_NM", width: 120, css: { 'text-align': 'left ! important' } },
                                       { header: "Source", id: "MAST_DATA_TXT", width: 150, css: { 'text-align': 'left ! important' } },
                                       { header: "Assign To", id: "EMP_NM", width: 150, css: { 'text-align': 'left ! important' } },
                                       {
                                           header: "Create By", id: "C_BY", width: 100, css: { 'text-align': 'right ! important' },
                                       },
                                        { header: "Create Date", id: "CREATE_DT", width: 100, css: { 'text-align': 'left ! important' } },
                                       { header: "Stage", id: "STATUS", width: 100, css: { 'text-align': 'left ! important' } },
                                        { header: "Organization", id: "CONT_NM", width: 150, css: { 'text-align': 'left ! important' } },
                                        { header: "Oppertunity Status", id: "SAG_NM", width: 150, css: { 'text-align': 'left ! important' } },
                                       
                                       { header: "Closure Value", id: "C_PROJ_VAL", width: 120, css: { 'text-align': 'left ! important' } },
                                       { header: "Closure Date", id: "CUR_PROJ_DT", width: 100, css: { 'text-align': 'left ! important' } },
                                       {
                                           header: "Comments", id: "COMMENTS", width: 120, css: { 'text-align': 'right ! important' },hidden:true,
                                       },
                                        {
                                            header: "aty", id: "A_TY", width: 90, css: { 'text-align': 'right ! important' }, hidden: true,
                                        },
                                   ],
                                   data: [],
                               },
                ]
            }
        ]
    });
}



function fnGridPrint() {
    debugger;
    var vHeader = "Quick Lead Status";
    var FullData = "";

    FullData = $$("QuickLdGrid").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.print($$("QuickLdGrid"), {
            docHeader: vHeader,
            fontSize: 25,
            textAlign: "left",
            mode: "landscape",
            fit: "data"
        });
    }
    else {
        AlertMessage("Records not present in Report");
    }

};

function fnExcelExport() {
    debugger;
    var vHeader = "Quick Lead Status";
    var FullData = "";
    FullData = $$("QuickLdGrid").serialize();
    var len = FullData.length;
    if (len > 0) {
        webix.toExcel($$("QuickLdGrid"), {
            filename: vHeader,
            styles: true,
            name: vHeader,
            docHeader: vHeader,
            rawValues: true,
        });
    }
    else {
        AlertMessage("Records not present in Report");
    }
};

function validateDate() {
    debugger;
    var efromdt = $$("txtFrmDate").getText();
    var etodt = $$("txtToDt").getText();
    var efdate = new Date(efromdt.split('/')[2], efromdt.split('/')[1] - 1, efromdt.split('/')[0]);
    var etdate = new Date(etodt.split('/')[2], etodt.split('/')[1] - 1, etodt.split('/')[0]);
    if (efdate > etdate) {
        AlertMessage('From Date can not be greater than To date');
        return false;
    }
    return true;
}

function display() {
    debugger;
   
    if (!validateDate()) {
        return false;
    }
    var dataparam = {};
    fromDate = $$("txtFrmDate").getText();
    toDate = $$("txtToDt").getText();
    dataparam["fromDate"] = fromDate;
    dataparam["toDate"] = toDate;
    dataparam["rdbtnSortOn"] = $$("rdbtnSortOn").getValue();  
    dataparam["Source"] = $$("Source").getValue();
    dataparam["AssignedTo"] = $$("AssignedTo").getValue();
    dataparam["chkOpen"] = $$("chkOpen").getValue();
    dataparam["chkConvrt"] = $$("chkConvrt").getValue();
    dataparam["chkCanceled"] = $$("chkCanceled").getValue();
    var paramValue = JSON.stringify(dataparam);

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/SalesAndMarket/QuickLeadRpt_Load",
        async: false,
        data: "request=" + encodeURIComponent(paramValue),
        success: function (data) {
            debugger;
            if (data!= ""){
                DataVal = JSON.parse(data);
                if (DataVal.length > 0) {
                    $$("QuickLdGrid").clearAll();
                    $$("QuickLdGrid").parse(DataVal);
                    $$("QuickLdGrid").refresh();
                }
                else {
                    $$("QuickLdGrid").clearAll();
                    AlertMessage("No Records Found");
                }

            }
            
            else {
                $$("QuickLdGrid").clearAll();
                AlertMessage("No Records Found");
            }
        }
    });
}

function AlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    });
}


function loadOptionPopWindow(Load) {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "RptOptionsNewsrch",
        head: "Options Search",
        position: "center",
        minWidth: 300,
        maxWidth: 300,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        //css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            elements: [
                {
                    view: "scrollview", scroll: "y", height: 250, width: 250, body: {
                        padding: { top: 0, left: 30, bottom: 20, right: 10 },
                        rows: [
                            {
                                
                                    view: 'label',
                                    id: 'lblsrton',
                                    label:"Sort On",
                                  labelAlign: "Left",
                                  labelWidth: 30,
                                  width: 180,
                                  minWidth: 160,
                            },
                            {
                                view: "radio",
                                id: "rdbtnSortOn",
                                inputWidth: 120,
                                width: 120,
                                height: 150,
                                css: ".webix_Radio_btn",
                                //customRadio: false,
                                options: [{ "id": "CDt", "value": "Create Date" }, { "id": "Asto", "value": "Assign To" }, { "id": "Sc", "value": "Source" }, { "id": "CBy", "value": "Create By" },
                                     ],
                                vertical: true,
                                value: $("#hdnOptsId").val() == "" ? "CDt" : $("#hdnOptsId").val(),
                            },
                            {

                                view: 'label',
                                id: 'lblOpt',
                                label: "Options",
                                labelAlign: "Left",
                                labelWidth: 30,
                                width: 180,
                                minWidth: 160,
                            },
                            {

                                view: "checkbox",
                                id: "chkCmt", 
                                label: "Comments",
                                labelAlign: "Left",
                                labelWidth: 80, 
                                width: 120,
                                
                                value: $("#hdncmdId").val(),
                                on: {
                                               "onChange": function (newval, oldVal) {
                                                   if (newval == "1") {
                                                       $$("QuickLdGrid").refresh();
                                                       $$("QuickLdGrid").showColumn("COMMENTS");
                                                       $$("QuickLdGrid").refresh();
                                                   }
                                                   else {
                                                       $$("QuickLdGrid").hideColumn("COMMENTS");
                                                       $$("QuickLdGrid").refresh();
                                                   }

                                               }
                                           }
                                       },
                        ]
                    }
                },

                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 350,
                             paddingX: 200,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             paddingX: 40,
                                             view: 'button',
                                             label: 'Ok',
                                             css:'webix_primary',
                                             //type: "icon",
                                             //icon: "wxi-check",
                                             width: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     debugger;
                                                     $$('RptOptionsNewsrch').hide();
                                                     var optid = $.trim($$("rdbtnSortOn").getValue());
                                                     $("#hdnOptsId").val("");
                                                     $("#hdnOptsId").val(optid);
                                                     $("#hdncmdId").val("");
                                                     $("#hdncmdId").val($.trim($$("chkCmt").getValue()));
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
   if( Load=="2")
    $$("RptOptionsNewsrch").show();
}


