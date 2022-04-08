
    $(document).ready(function () {
        $("#pageload").hide();//S.VijayaLakshmi''4/3/20
        
           
        webix.ready(function () {
            debugger;
          //  GridDesign();
            var VouchTy = LoadDropDown("GLTransaction", "fnVoucherTy")
            debugger;
            webix.ui({
                view: "richselect",

                label: "Voucher Type",
                labelWidth: 100,
                inputWidth:300,
                id: "ddlVchType",
                container: "DivVchType",              
                value:"<--ALL-->",
                options: VouchTy,
                on: {
                    onChange: function (newv, oldv) {
                        fnChkMultiLvl();
                        $$("GridVchType").clearAll();
                    }

                }
            });
            webix.ui(
            {
                view: "button",
                type: "image",
                image: "../../Images/FilterButton.png",
                label: "",
                container: "FilterOptions",
                id: "FilterOpt",
                width: 30,
                on: {
                    onItemClick: function () {
                        debugger;
                        FilterPopup();

                    }
                }

            });
           
            webix.ui(
               
                {

                view: "button",
                name: "btnDisplay",
                value: "Display",
                id:"btnFiltDisplay",
                width: 70,
                container: "btnDisplay",
                align: "right",
                on: {
                    onItemClick: function () {
                        $$("GridVchType").clearAll();
                        DisplayVoucherAppr();
                    }
                }
            });

            webix.ui({
                id: "GridVchType",
                container: "DivGrid",
                select: 'row',
                view: "datatable",
                rowHeight: 30,
                fixedRowHeight: false,
                rowLineHeight: 23,
                //css: "WebIxStyle",
                columns: [
                        { id: "VOUCHDT", header: 'Vouch Dt', width: 100, css: { 'text-align': 'center ! important' } },
                        { id: "VOUCHTY", header: 'Voucher Type', width: 100, css: { 'text-align': 'left ! important' } },
                        { id: "VOUCHNO", header: 'Vouch No', width: 100, css: { 'text-align': 'left ! important' } },
                        { id: "NARR", header: 'Narration', width: 200, css: { 'text-align': 'left ! important' } },
                        { id: "LEDGER", header: 'Ledger', width: 200, css: { 'text-align': 'left ! important' } },
                        { id: "DIV", header: 'Division', width: 100, css: { 'text-align': 'left ! important' } },
                        { id: "CBY", header: 'Create By', width: 100, css: { 'text-align': 'left ! important' } },
                        { id: "CDT", header: 'Create Dt', width: 100, css: { 'text-align': 'center ! important' } },
                        { id: "AMT", header: 'Amount', width: 100, css: { 'text-align': 'Right ! important' } },
                        //{ id: "LEVEL", header: 'Level', width: 100, css: { 'text-align': 'left ! important' } },
                        { id: "LEVEL", hidden: true },
                        { id: "APPROVE", header: 'Approve', width: 100, css: { 'text-align': 'center ! important' } , template:"{common.checkbox()}" },
                        { id: "LVID", hidden: true },
                        { id: "MAXLVL", hidden: true },
                        { id: "TRNIDHID", hidden: true },
                        { id: "CLASSTYID", hidden: true },
                        { id: "TRNCAT", hidden: true },
                        { id: "DIVID", hidden: true },
                        { id: "TRNTYPID", hidden: true },
                ],
                scroll: "xy",
                height: 450,
                data: [],
                on: {
                    'onItemDblClick': function (id) {
                        //debugger;
                        //var selectedRows = this.getSelectedItem(id.row);
                        //var TRN_IDD = selectedRows[0].TRNIDHID;
                        //$("#TRN_IDD").val(TRN_IDD);
                        //$.ajax({
                        //    type: "POST",
                        //    url: "/GLTransaction/OpenTransaction",
                        //    cache: false,
                        //    charset: 'utf-8',
                        //    data: "ID=" + TRN_IDD,
                        //    success: function (data) {
                        //        Window1 = window.open("/GLTransaction/Transaction?Page=2", "PopupWindow", "width=1100,height=560,left=30,top=50");
                        //        return true;
                        //    }
                        //});
                    }
                }
            });

            webix.ui({
            view: 'label',
                //label: 'Note:Double Click on Voucher to View',
            label: ' ',
            container: "DivLabel",
            name: 'Label',
            id: 'LblNote',
            labelWidth: 100,
            });

            webix.ui({
            view: 'checkbox',
            labelRight: 'Select All',
            container: "ChkDivSel",
            id: 'ChkSelAll',
            labelWidth: 20,
            on: {
                onChange: function (newv, oldv) {
                    debugger;
                    var data = $$("GridVchType").serialize();
                    if (newv == "1") {                        
                        for (var no = 0; no < data.length; no++)
                        {
                            data[no].APPROVE = 1;
                        }
                    }
                    else {
                        for (var no = 0; no < data.length; no++) {
                            data[no].APPROVE = 0;
                        }
                       
                    }
                    $$("GridVchType").refresh();

                }
            }
            });

            webix.ui({
                view: "button",
                name: "btnSave",
                value: "Save",
                id: "btnSave",
                width: 70,
                container: "DivSave",
                align: "right",
                on: {
                    onItemClick: function () {
                        FnVoucherApprSave();

                    }
                }
            });

           


        });
        debugger;
     
        
    });
    
    function LoadGLTransaction() {
        debugger;
        //var grid = $("#DayBookgrid").data("kendoGrid");
        //var TRN_IDD = grid.selectable._downTarget[0].childNodes['10'].innerHTML;
        //var Narration = grid.selectable._downTarget[0].childNodes['3'].innerHTML;
        //var AC_NM = grid.selectable._downTarget[0].childNodes['2'].innerHTML;
        //var VouchNo = grid.selectable._downTarget[0].childNodes['4'].innerHTML;
        //var VouchType = grid.selectable._downTarget[0].childNodes['5'].innerHTML;
        //var Date = grid.selectable._downTarget[0].childNodes['0'].innerHTML;
        //var AC_ID = grid.selectable._downTarget[0].childNodes['11'].innerHTML;
        //// var Date = convert(dd);        
        //$("#TRN_IDD").val(TRN_IDD);
        //$("#AC_ID").val(AC_ID);
        //$("#Narration").val(Narration);
        //$("#VouchNo").val(VouchNo);
        //$("#VouchType").val(VouchType);
        //$("#Date").val(Date);
        var selectedRows = this.getSelectedItem(id.row);       
        var TRN_IDD = selectedRows[0].TRN_ID;       
        $.ajax({
            type: "POST",
            url: "/GLTransaction/OpenTransaction",
            cache: false,
            charset: 'utf-8',
            data: "ID=" + TRN_IDD,
            success: function (data) {
                Window1 = window.open("/GLTransaction/Transaction?Page=2", "PopupWindow", "width=1100,height=560,left=30,top=50");
                return true;
            }
        });
    }
    function FilterPopup() {
        //S.VijayaLakshmi //24/6/20
        debugger;
        var LoadDiv = LoadDropDown("GLTransaction", "fnVoucherApprDiv")
        webix.ui({
            view: "window",
            move: true,
            position: "center",
            head: "Advance Filter",
            id: 'OptFilterPop',
            modal: true,
            autowidth: true,
            close: true,
            body: {
                rows: [
                    {

                        view: 'richselect',
                        label: 'Division',
                        labelWidth: 70,
                        options: LoadDiv,
                        id: 'ddlDiv',
                        inputWidth: 250,
                        value: "<--ALL-->",
                        // width: 340
                    },
                    {
                        // paddingX: 5,
                        cols: [
                        {
                            view: "datepicker",
                            label: 'Voucher Dt',
                            id: 'VchDt',
                            labelWidth: 70,
                            minWidth: 250,
                            width:250,
                            inputWidth: 250,
                            format: "%d/%m/%Y",
                           // format: webix.Date.dateToStr("%d/%m/%y")
                        },
                         {
                             view: "button",
                             type: "icon",
                             icon: "wxi-trash",
                             label: "",
                             id: "DelVouchDt",
                             width: 30,

                             click: function () {
                                 debugger;
                                 $$("VchDt").setValue("");
                           
                             }
                         },
                        ]},
                    {
                       
                        cols: [
                        {
                        view: 'checkbox',
                        label: 'Create By',
                        id: 'ChkCby',
                        labelWidth: 70,
                        width:100,
                        align: "right",
                        value:1,
                        on: {
                            onChange: function (newv, oldv) {
                                if( newv==1) {
                                    $$("CdtSrch").hide();
                                }
                                else {
                                    $$("CdtSrch").show();
                                }
                            }
                        }
                        },

                        {
                            view: 'label',
                            label: 'ALL',
                            id: 'AllUser',
                            align: "left",
                            width: 30,
                           
                           
                        },
                            
                         {
                             view: 'button',
                             type: "icon",
                             icon: "wxi-search",
                             name: 'CDT',
                             id: 'CdtSrch',
                             inputWidth: 30,
                             hidden:true,
                             minWidth: 5,
                             width: 30,
                             on: {
                                 onItemClick: function () {
                                     debugger;
                                     UserPopup();
                                 }
                             }
                         },
                    ]},
                    {

                       
                      

                        view: 'button',
                        name: "btnOk",
                        id:"btnOk",
                        value: "Ok",
                        width: 50,
                        align: "right",
                        on: {
                            onItemClick: function () {
                                $$("OptFilterPop").hide();
                            }
                        }
                    },
     
                ]
            }
        }).show();
     // $$("OptFilterPop").show();
    }
    function UserPopup() {

        debugger;
        var LoadUser = LoadVoucherApprUser();
        webix.ui({
            view: "window",
            close: true,
            modal: true,
            id: "UserPop",
            head: "User",
            position: "center",
            move: true,
            //minWidth: 500,
            //maxWidth: 500,
            autowidth: true,
            body: {
                rows: [{

                    view: "datatable",
                    id: "dtUser",
                    select: "row",
                    //  data: [],
                    data:LoadUser,
                    height: 300,
                    columns: [
                 { header: ["Create By", { content: "textFilter" }], id: "CBY", width: 180, css: { 'text-align': 'left ! important' } },
               { header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "CHK", editor: 'check', template: "{common.checkbox()}", width: 100, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },              
               { header: "CID", id: "CID", hidden: true },
                    ],
                   // data: [{}],
                    on: {
                        
                        'onKeyPress': function (e) {
                            debugger;
                            if (e == '13') {
                                var valid = this.getSelectedId(true);
                                var id = { row: valid[0].row };
                                this.callEvent("onItemClick", [id]);
                            }
                        },
                        'onBeforeFilter': function () {
                            debugger;
                            this.select(this.getFirstId());
                            webix.UIManager.setFocus(this);
                            this.refresh();
                        },
                        'onAfterFilter': function () {
                            debugger;
                            this.select(this.getFirstId());
                            webix.UIManager.setFocus(this);
                            this.refresh();
                        }
                    }
                },
                {
                    cols: [
                        {},
                        {},
                        {
                            view: 'button',
                            label: 'Ok',
                            width: 100,
                            id: "btnokUser",
                            on: {
                                onItemClick: function () {
                                    debugger;
                                    $$("UserPop").hide();
                                   
                                }
                            }
                        }
                    ]

                }
                ],

            }
        })
        $$("UserPop").show();
      //  BindGroupGrid();


    }

    
function Fontstyle(value, config) {
    // debugger;
    if ($.trim(config.COL3) == "G") {
        //return { "text-align": "right", "color": "Black", "font-weight": "Bold", "font-family": "Cambria !important;" };
        return { "color": "Black", "font-weight": "Bold" };
    }
    if ($.trim(config.COL3) == "H") {
        //return { "text-align": "right", "color": "Black", "font-weight": "Bold", "font-family": "Cambria !important;" };
        return { "color": "Blue", "font-weight": "Bold", "text-decoration": "Underline" };
    }
};






function LoadDropDown(controller, action) {
    debugger;
    var rowData = [];
    $.ajax({
        type: "POST",
        url: "/" + controller + "/" + action,     
        async: false,
        success: function (d) {
            debugger;
            if (d != "") {
                debugger;
                rowData = JSON.parse(d);


            }

        },
    }
    );
    return rowData;
}

function FnVoucherApprSave() {
    debugger;
    $("#pageload").show();
    var VoucherGrid = [];
    var VoucherGrid_List = $$("GridVchType").serialize();
    var MulLvl = "0";
    if ($("#MultiLvl").val() == "1") MulLvl = "1"
    var Chk = "";
    $.each(VoucherGrid_List, function (i, value) {
        if (value.APPROVE == 1)
        {
            var obj = {};
            debugger;
            obj["TRNID"] = (value.TRNIDHID == null || value.TRNIDHID == undefined ? "" : value.TRNIDHID);
            obj["VNO"] = (value.VOUCHNO == null || value.VOUCHNO == undefined ? "" : value.VOUCHNO);
            obj["LVLID"] = (value.LVID == null || value.LVID == undefined ? "" : value.LVID);
            obj["MAXLVL"] = (value.MAXLVL == null || value.MAXLVL == undefined ? "" : value.MAXLVL);
            obj["AMT"] = (value.AMT == null || value.AMT == undefined ? "" : value.AMT);
            VoucherGrid.push(obj);
            Chk = "1";
        }
       
    });
    if (Chk === "")
    {
        alert("Please Select Voucher !..");
        $("#pageload").hide();
        return false;
    }
    var Table = {};
    Table["MulLvl"] = MulLvl.toString().trim();
    Table["VoucherGridList"] = JSON.stringify(VoucherGrid);
    var paramValue = JSON.stringify(Table);
    $.ajax({
        type: "POST",
        async: true,
        url: "/GLTransaction/FnVoucherApprSave",
        // data: "request=" + paramValue,
        data: "request=" + encodeURIComponent(paramValue),
        success: function (data) {
            debugger;
            var alertVal = data.v.ErroMeg;
            if (alertVal == "Operation Failed.") {
                alert(alertVal);
            }
            else {
                alert(alertVal);
            }
        }
        
    });
    $$("GridVchType").clearAll();
    $("#pageload").hide();
}
function fnChkMultiLvl()
{
    debugger;
    var reqobj = {};
    var rowData = [];
    var Vty = $$("ddlVchType").getValue();
    if (Vty == "<--ALL-->") Vty = "";
    reqobj["Vty"] = Vty.toString().trim();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        async: true,
        url: "/GLTransaction/fnChkMultiLvl",
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            if (d != "" && d != "0" && d != undefined) {               
                rowData = JSON.parse(d);
                $("#MultiLvl").val(rowData.MULTILVL);
                if($("#MultiLvl").val()=="1") 
                    $$("GridVchType").showColumn("LEVEL");
                else
                    $$("GridVchType").hideColumn("LEVEL");

                $$("GridVchType").refresh();

                  
               
            }

        },
       

    });
}
function DisplayVoucherAppr() {
    debugger;
    $("#pageload").show();
  
    var reqobj = {}; 
    var Vty = "";
    var DivId = "";
    var dataG = $$("ddlDiv");
    if (dataG != undefined)  DivId = $$("ddlDiv").getValue();
    if (DivId == "<--ALL-->") DivId = "";
    var VDt = "";
    dataG = $$("VchDt");
    if (dataG != undefined) VDt = $$("VchDt").getText();
   
    Vty = $$("ddlVchType").getValue();
    if (Vty == "<--ALL-->") Vty = "";
    
    var Cby = "";
    dataG = $$("ChkCby");
    if (dataG != undefined)
    {
        Cby = $$("ChkCby").getValue();
      
        if (Cby != "1") {
            Cby = "";
            dataG = $$("dtUser");
            if (dataG != undefined) {
                var data = $$("dtUser").serialize();
                var lenval = data.length;
                if (lenval != 0) {
                    for (i = 0; i < lenval; i++) {
                        indx = i;
                        if (data[i].CHK == "1") {
                            if (Cby == "") {
                                Cby = "'" + data[i].CID + "'";
                            }
                            else {
                                Cby += "," + "'" + data[i].CID + "'";
                            }
                        }
                    }

                }
            }
        }
        else
        {
            Cby = "";
        }
    }
    var MulLvl = "0";
    if ($("#MultiLvl").val() == "1") MulLvl = "1"

    reqobj["Vty"] = Vty.toString().trim();
    reqobj["VDt"] = VDt.toString().trim();
    reqobj["DivId"] = DivId.toString().trim();
    reqobj["Cby"] = Cby.toString().trim();
    reqobj["MulLvl"] = MulLvl.toString().trim();
    
    var dataparam = JSON.stringify(reqobj);
   
   
    
    $.ajax({
        type: "POST",
        async: true,
        url: "/GLTransaction/fnDisplayVoucherAppr",
        data: "request=" + dataparam,
        success: function (d) {
            debugger;
            if (d != "" && d != "0" && d!=undefined) {              
                $$("GridVchType").clearAll();
                $$("GridVchType").parse(JSON.parse(d));
                $$("GridVchType").refresh();

            }

        },
        //S.VijayaLakshmi''4/3/20
        error: function (err) {
            $("#pageload").hide();
                   
        },
        complete: function () {
            $("#pageload").hide();
        }
        //====

    });

           
    //  $("#pageload").hide();
        


   
}

function LoadVoucherApprUser() {
    debugger;

    var rowData = [];


    $.ajax({
        type: "POST",
        async: false,
        url: "/GLTransaction/fnLoadVoucherApprUser",
        success: function (d) {
            debugger;
            if (d != "" && d != "0" && d != undefined) {
                rowData = JSON.parse(d);

            }

        },
        

    });
    return rowData;

}










