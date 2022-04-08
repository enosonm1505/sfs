var Rpage = "";
var fileName = "";
var Doc = "";
$(document).ready(function () {
    //header part
    debugger;
    Rpage = $("#Rpage").val();
    if (Rpage == "1")
    {
        fileName = "DayBook";
        Doc = "Day Book";
    }
    else
    {
        fileName = "ReversalEntry";
        Doc = " Reversal Entry ";
    }

    
    var _Data = PropertyLoad();
    //DefLoadData();
    webix.ui({
        view: "richselect", id: "ddlProperty", container: "divProperty", options: DropLoad("LoadProperty", 0, setDef), value: _Data,
        on: { onItemChange: function (newval, oldval) { PropertyLoad(newval) } }
    });
    webix.ui({
        view: "button", id: "btnExcel", container: "divExcel", label: '<span class="fa fa-file-excel-o pr-0"></span>', tooltip: true, value: "Excel", width:40,
        click: function () {
            var FullData = $$("RevrslEntryGrd").serialize();
            var len = FullData.length;
            if (len > 0) {
                webix.toExcel($$("RevrslEntryGrd"), {
                    filename: fileName,
                    styles: true,
                    name: Doc,
                    docHeader: Doc,
                });
            }
            else {
                alert("Records not present in Report");
            }
        }
    });
    webix.ui({
        view: "button", id: "btnPrint",  container: "divPrint",
        tooltip: true, value: "Print",
        css: 'webix_secondary',
        width: 40,
        label: '<span class="fa fa-print pr-0"></span>',
        click: function () {
            var FullData = $$("RevrslEntryGrd").serialize();
            var len = FullData.length;
            if (len > 0) {
                webix.print($$("RevrslEntryGrd"), {
                    //docHeader: { text: Doc, fontSize: 25 },
                    docHeader:Doc,
                    fit: "page",
                    scroll: false,
                    mode: "landscape"
                });
            }
            else {
                alert("Records not present in Report");
            }
        }
    });

    //Form
    creatingForm();    
    creatingWPeriod();
    FiscalYrPeriod();
    DefLoadData();
    
    Rpage = $("#Rpage").val();
    if (Rpage == "1")
        $("#lblHeadrev").text(" Day Book ");
    else
        $$("Mymenu").attachTo($$("RevrslEntryGrd"));

    debugger;
    
    var vTrnId = $("#TRNID").val();
    var vTrnIdSrno = $("#TRNIDSRNO").val();
    var vTrnTyId = $("#TRNTYID").val();
    var vAsOn = $("#ASON").val();
    

    if(Rpage=="1" &&  vTrnId != "")
    {
        debugger;
        vAsOn = formatDateWebix(vAsOn);
        $$("dateFrm").setValue(vAsOn);
        $$("dateTo").setValue(vAsOn);

        $$("ddlVoucher").setValue(vTrnTyId);
        $$("ddlOpt").setValue("B");

        DisplayDataLoadInit(vTrnId, vTrnIdSrno);
        //$("#divMenuHead").hide();
        //var elem = document.getElementById("divHeaderTop");
        //elem.style.marginTop = "0px";
       

    }

    

});

var setDef = JSON.stringify({
    "Load": "0",
});
function PropertyLoad(val) {
    var _Data = "";
    if ($("#NewCmpId").val() != "") _Data = $("#NewCmpId").val();
     else _Data = DataLoad("AssignProperty", 0, ((val == undefined || val == null) ? "" : val));
    return _Data;
}

function DefLoadData(val) {
    var _Data = DataLoad("PageLoadData", 0, ((val == undefined || val == null) ? "" : val));
    if (_Data != "{}" && _Data != undefined && _Data != null && _Data != "") {
        debugger;
        var d = JSON.parse(_Data);
        if (d.TrnTy[0].DIV_APPL_IND == "1")
        {
            $$("divRow").show();
            $$("ddlDiv").show();
           
        }
          
    }

    return _Data;
}

function DropLoad(id, num, req) {
    var _Data = "";
    
    $.ajax({
        type: "POST",
        url: "/GLTransaction/" + id,
        async: false,
        data: "pageNum=" + parseInt(num == "" ? 0 : num) + "&Req=" + req,
        success: function (data) {
            if (data != "")
                _Data = data;
            else _Data = [];
        }
    });
    return _Data
}
function DataLoad(id, num, req) {
    var _Data = "";
    debugger;
    $.ajax({
        type: "POST",
        url: "/GLTransaction/" + id,
        async: false,
        data: "pageNum=" + parseInt(num == "" ? 0 : num) + "&Req=" + req,
        success: function (data) {
            if (data != "")
                _Data = data;
            else _Data = [];
        }
    });
    return _Data
}

function creatingForm() {
    webix.ui({
        view: "form",
        id: "FrmReversal",
        borderless:true,
        container: "divReversalEntry",
        elements: [
            {
                cols: [{ rows: [row1, row2, row3], },
                    //{
                    //    view: "fieldset",
                    //    css:'ml-2',
                    //    id: "fldSort", label: "Sort On",
                    //    body: {
                    //        rows: [{
                    //            cols: [{
                    //                view: "radio", id: "chkSort", value: "D", width: 320, options: [{ id: "D", value: "Date" }, { id: "R", value: "Ref/Chq#" }, { id: "V", value: "Type/Voucher#" }],
                    //            }],

                    //        }]
                    //    }
                    //}
                  
                   
                ]
            },
            {
                rows: [row4]
            }

        ]

    });


    //filter Form

    webix.ui({
        view: "window",
        id: "frmFilter",
        close: true,
        modal: true,
        move :true,
        head: "Advance Filter",
        position: "center",
        width: 600,
        body: {
            paddingX: 30,
            cols: [{
                rows: [
                    {
                        view: "label",
                        label: "Filter",
                        width: 80,
                        css: "LblUL",
                    },
                    {
                        cols:[
                            { view: "search",
                                id: "TxtGroup",
                                readonly: true,
                                width: 370, labelWidth: 110,
                                label: "Group",
                                on: {
                                    onSearchIconClick: function () {
                                        debugger;
                                      
                                        btnGrpSrchClick();
                                    }
                                }

                            },
                              {
                                  view: "button",
                                  type: "icon",
                                  icon: "wxi-trash",
                                  label: "",
                                  id: "GrpDel",
                                  css: "webix_primary",
                                  width: 30,
                                  //  inputwidth: 30,
                                  //  minWidth: 5,
                                  click: function () {
                                     
                                      debugger;
                                      $$("TxtGroup").setValue("");
                                      window.GroupIds = "";
                                      window.LevelIds = "";
                                      
                                  }
                              }
                        ]
                       
                    
                    }, {
                        cols: [
                            {
                                view: "search",
                                id: "TxtLedger",
                                readonly: true,
                                width: 370, labelWidth: 110,
                                label: "Ledger",
                                on: {
                                    onSearchIconClick: function () {
                                        debugger;
                                        // if (window.GroupIds == "") return;
                                     
                                        btnLedgerSrchClick();
                                    }
                                }
                            },
                        {
                            view: "button",
                            type: "icon",
                            icon: "wxi-trash",
                            css: "webix_primary",
                            label: "",
                            id: "LedDel",
                            width: 30,
                            //  inputwidth: 30,
                            //  minWidth: 5,
                            click: function () {
                                     
                                debugger;
                                $$("TxtLedger").setValue("");
                                window.PartyIds = "";
                              
                                      
                            }
                        }
                        ]
                 
                   
                }, {
                    cols: [{
                        view: "datepicker",
                        id: "dateCFrm",
                        width: 220, labelWidth: 110,
                        label: "Create From",
                        format: "%d/%m/%Y",
                        //hidden: true,
                        //value: new Date(), format: "%d/%m/%Y",
                    }, {
                        view: "datepicker",
                        id: "dateCTo",
                        width: 150, labelWidth: 30,
                        label: "To",
                        format: "%d/%m/%Y",
                        //hidden: true,
                        //value: new Date(), format: "%d/%m/%Y",
                    }],
                },
                {
                    view: "datepicker",
                    id: "dateVouch",
                    width: 220, labelWidth: 110,
                    label: "Voucher Dt",
                    format: "%d/%m/%Y",
                },

                {
                    cols: [{
                        view: "text",
                        id: "txtAmt",
                        width: 220,
                        labelWidth: 110,
                        label: "Amount",
                    }, { view: "radio", id: "chkDrCr", value: "1", height: '35', labelwidth: 30, options: [{ id: "1", value: "DR", height: '50', }, { id: "2", value: "CR", height: '50', }], }]

                }, {
                    cols: [{
                        view: "text",
                        id: "txtFromVouch",
                        width: 220, labelWidth: 110,
                        label: "VouchNo From",
                    }, {
                        view: "text",
                        id: "txtToVouch",
                        width: 150, labelWidth: 30,
                        label: "To",
                    }]
                }, {
                    view: "text",
                    id: "txtRefNo",
                    width: 300, labelWidth: 110,
                    label: "Chq/Ref No",
                    hidden: true,
                }, {
                    view: "text",
                    id: "txtNarr",
                    width: 300, labelWidth: 110,
                    label: "Narration",
                },
                {
                    view: "label",
                    label: "Sort On",
                    width: 80,
                    css: "LblUL",
                },
                {
                    view: "radio", id: "chkSort", value: "D", width: 200, height:120, vertical: true, options: [{ id: "D", value: "Date" },
                        { id: "R", value: "Ref/Chq#" }, { id: "V", value: "Type/Voucher#" }],
                },
                   
                {
                    view: "button",
                    id: "btnFok",
                    width: 60, labelWidth: 80,
                    label: "ok",
                    align: "right",
                    on: {
                        'onItemClick': function () {
                            DisplayDataLoad();
                            $$("frmFilter").hide();
                        },
                    }
                }
                ],
            }],
        },
    });
}
function fnReversalGroupLoad() {
    debugger;
    var rowDatad = [];
    $.ajax({
        type: "POST",
        async: false,
        url: "/GLTransaction/LoadReversalGroup",
        data: [],
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);
                $$("dtGroupPop").clearAll();
                $$("dtGroupPop").parse(rowDatad);
                $$("dtGroupPop").refresh();
                //$$("GroupPopup").show();
                //$$("dtGroupPop").select($$("dtGroupPop").getFirstId());
                //webix.UIManager.setFocus($$("dtGroupPop"));
                //$$("dtGroupPop").refresh();
              
               
            }
        }
    })

}

function btnGrpSrchClick() {
    $$("dtGroupPop").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    //$$("dtGroupPop").filterByAll();

    fnReversalGroupLoad();

    var ids = window.GroupIds;
    var str = [];
    if (ids != null && ids != undefined && ids != "") {
        ids = ids.replace(/'/g, '');
        str = ids.split(',');
    }

    $$("dtGroupPop").data.each(function (obj) {
        debugger;

        if (str.length > 0) {
            var newData = str.filter(function (el) {
                debugger;
                return el == obj.id;
            });
            if (newData.length > 0) obj.CHK = "1";
            else obj.CHK = "0";
        }
        else obj.CHK = "0";

        $$("dtGroupPop").updateItem(obj.id, obj)

    })
    $$("dtGroupPop").refresh();

    $$("GroupPopup").show();
    $$("dtGroupPop").select($$("dtGroupPop").getFirstId());
    webix.UIManager.setFocus($$("dtGroupPop"));


};

function GroupPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "GroupPopup",
        head: "Group",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        autowidth: true,
        css:'webix_windowzind',
        body: {
            rows: [{
                view: "datatable",
                id: "dtGroupPop",
                select: "row",
                data: [],
                css: "webix_header_border",
                height: 450,
                columns: [
                       { header: ["Account Name", { content: "textFilter" }], id: "value", width: 320, css: { 'text-align': 'left ! important' } },
                       { header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "CHK", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },
                       { header: "Account Code", id: "AC_CD", hidden: true, css: { 'text-align': 'center ! important' } },
                       { header: "AC_ID", id: "id", hidden: true },
                       { header: "LEVEL_NO", id: "LEVEL_NO", hidden: true },
                ],
                data: [{}],
                on: {
                    'onKeyPress': function (code, e) {
                        debugger;
                        var selRow = this.getSelectedItem();
                        var rowid = selRow.id;
                        var charCode = e.which || e.keyCode;
                        if (charCode == '13') {
                            var valid = this.getSelectedId(true);
                            var id = { row: valid[0].row };
                            this.callEvent("onItemClick", [id]);
                        }
                        if (e.ctrlKey == false && e.altKey == false && e.shiftKey == false && charCode == 32) {
                            var vChk = selRow.CHK;
                            if (vChk == "1") selRow.CHK = "0";
                            else selRow.CHK = "1";
                            this.updateItem(rowid, selRow)
                        }
                    },
                    'onBeforeFilter': function () {
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    },
                    'onAfterFilter': function () {
                        //debugger;
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    }
                }
            },
            {
                margin: 10,
                padding: { top: 5, bottom: 5, right: 5 },
                cols: [
                    {
                        view: "button",
                        type: "icon",
                        icon: "wxi-check",
                        label: "Ok",
                        inputWidth: 60,
                        labelWidth: 60,
                        css: "webix_primary",
                        click: function () {
                            debugger;
                           // GridClear();
                            var vGrpNm = "";
                            var vGrpId = "";
                            var vLvlId = "";
                            window.GroupIds = "";
                            window.LevelIds = "";
                            $$("TxtGroup").setValue("");
                          //  window.PartyIds = "";
                            //$$("TxtLedger").setValue("");
                            $$("dtGroupPop").data.each(function (obj) {
                                debugger;
                                if (obj.CHK == "1") {
                                    if (vGrpNm != "") {
                                        vGrpNm = vGrpNm + "," + obj.value
                                    }
                                    else {
                                        vGrpNm = obj.value
                                    }

                                    if (vGrpId != "") {
                                        vGrpId = vGrpId + ",'" + obj.id + "'";
                                        vLvlId = vLvlId + ",'" + obj.LEVEL_NO + "'";
                                    }
                                    else {
                                        vGrpId = "'" + obj.id + "'";
                                        vLvlId = "'" + obj.LEVEL_NO + "'";
                                    }
                                }
                            });
                            if (vGrpId != "") {
                                window.GroupIds = vGrpId;
                                window.LevelIds = vLvlId;
                                $$("GroupPopup").hide();
                                $$("TxtGroup").setValue(vGrpNm);

                            }
                            else {
                                $$("GroupPopup").hide();

                            }
                        },
                        align: "right"
                    },


                ]

            }
            ],

        }
    });
};
function btnLedgerSrchClick() {
    fnReversalLedgerLoad();
    $$("PartyPopup").show();
    $$("dtPartyPop").select($$("dtPartyPop").getFirstId());
    webix.UIManager.setFocus($$("dtPartyPop"));
};
function fnReversalLedgerLoad() {
    debugger;
    var rowDatad = [];
    var GrpIds = window.GroupIds;
    $.ajax({
        type: "POST",
        async: false,
        url: "/GLTransaction/LoadReversalLedger",
        data: "GrpIds=" + GrpIds,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);
                $$("dtPartyPop").clearAll();
                $$("dtPartyPop").parse(rowDatad);
                $$("dtPartyPop").refresh();
               
            


            }
        }
    })

}
function LedgerPopWindowLoad() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "PartyPopup",
        head: "Account Search",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        resizeRow: true,
        css: 'webix_windowzind',
        height: 550,

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,


            elements: [
                 {
                     paddingX: 200,
                     view: "checkbox",
                     id: "ChkInactive",
                     width: 300, labelWidth: 80,
                     label: "Filter Inactive",
                     hidden: true
                 },
                {
                    view: "datatable",
                    id: "dtPartyPop",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "AC_ID", id: "AC_ID", hidden: true },
                             { header: "AC_CD", id: "AC_CD", hidden: true },
                            { header: ["Account Name.", { content: "textFilter" }], id: "AC_ALT_NM", width: 390, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            //debugger;
                            var selectedRows = this.getSelectedItem(id.row);
                            var AcNm = $.trim(selectedRows[0].AC_ALT_NM);
                           
                           
                            window.PartyIds = "'" + $.trim(selectedRows[0].AC_ID) + "'",
                            $$("TxtLedger").setValue(AcNm);
                            $$("PartyPopup").hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 300,
                             paddingX: 300,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$("TxtLedger").setValue("");
                                                     $$("PartyPopup").hide();
                                                     window.PartyIds = "";
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

    //var PartyGrp = $$("ddlPartyGrp").getValue();
    //fnLoadParty(PartyGrp, "grdParty", "2");
    //$$("PartyPopup").show();
}

var row1 = {
    cols: [{
        view: "richselect",
        id: "ddlOpt",
        width: 260, labelWidth: 60,
        label: "Options",
        options: DropLoad("OptionLoad", 0, setDef),
        value: "C",
        on: {
            onChange: function (newval, oldval) {
                $$("RevrslEntryGrd").clearAll();
                var Opt = [];
                debugger;
                if (newval == "S")
                {
                    var setDef1 = JSON.stringify({
                        "Load": "0", "Opt": "S",
                    });
                    Opt= DropLoad("VoucherLoad", 0, setDef1);
                }
                else
                {
                    Opt =DropLoad("VoucherLoad", 0, setDef);
                }
                $$("ddlVoucher").define("options", Opt);
                $$("ddlVoucher").refresh();
             
            },
        }
    },
    {
        //view: "button", id: "imgFilter", css: "webix_primary", value: "Filters", width: 30, label: '<span class="fa fa-filter"></span>', tooltip: true,

        //click: function () {
            
        //    $$("frmFilter").show();
        //},
        width: 30,
    },
    {
        rows: [{
            cols: [{
                view: "datepicker",
                id: "dateFrm",
                width: 155, labelWidth: 38,
                label: "From",
                //value: new Date(),
                format: "%d/%m/%Y",
                on: {
                    'onChange': function (e) {
                        $$("RevrslEntryGrd").clearAll();
                    },
                }
            }, {
                view: "datepicker",
                id: "dateTo",
                width: 140, labelWidth: 25,
                label: "To",
                //value: new Date(),
                format: "%d/%m/%Y",
                on: {
                    'onChange': function (e) {
                        $$("RevrslEntryGrd").clearAll();
                    },
                }
            },
             {
                 view: "button", id: "imgPeriod", css: "webix_primary ", value: "Search", width: 30, labelWidth: 30, label: '<span class="fa fa-search"></span>', tooltip: true,


                 click: function () {
                     $$("WFiscalPeriod").show();
                 },
             },
             {
                 view: "button", id: "imgFilter", css: "webix_primary ", value: "Filters", width: 30, labelWidth:30, label: '<span class="fa fa-filter"></span>', tooltip: true,

                 click: function () {

                     $$("frmFilter").show();
                 },
             },
              
            ]
        }]
    }, ]
}
var row2 = {
    cols: [{
        view: "richselect",
        id: "ddlVoucher",
        width: 260, labelWidth: 60,
        label: "Voucher",
        options: DropLoad("VoucherLoad", 0, setDef),
        value: "All",
        on: {
            'onChange': function (e) {
                $$("RevrslEntryGrd").clearAll();
            },
            //onAfterScroll: function () {
                
            //    var url = "/GLTransaction/VoucherLoad";
            //    var set = {
            //        "Load": "1",
            //    };
            //    scrollHandlerDrop(url, JSON.stringify(set), "ddlVoucher");
            //    $$("ddlVoucher").refresh();
            //},
        }
    },

 {width:150,},

{
    view: "button",
    id: "btnDisplay",
    // css: "webix_primary float-right mr-4 pr-1",
    css:"webix_primary",
    width: 100, labelWidth: 90,
    label: "Display",
    on: {
        'onItemClick': function () {
            DisplayDataLoad();
        },
    }
}],
}
debugger;
var row3 = {
    id:"divRow",
    hidden: true,
    cols: [{
        view: "richselect",
        id: "ddlDiv",
        width: 260, labelWidth: 60,
        label: "Division",
        options: DropLoad("DivisionLoad", 0, setDef),
        hidden: true
    }, {
        view: "checkbox",
        id: "chkDiv",
        width: 300, labelWidth: 80,
        label: "Print Div Id",
        hidden: true
    }]
   
}

function CurrencyFormat()
{ return webix.Number.numTostr({ groupDelimiter: ",", groupSize: 3, decimalDelimiter: ".", decimalSize: 2 }) }

var row4 = {
    view: "datatable",
    id: "RevrslEntryGrd",
    select: 'row',
   // height: 450,
    //areaselect: true,
    minHeight: 400,
    scroll: "xy",
    data:[],
    columns: [
        { id: "Date", header: "Date", width: 100 },
        { id: "AcCode", header: "A/C_Code", width: 100 },
        { id: "LName", header: "Ledger Name", width: 200 },
        { id: "Narration", header: "Narration", width: 300 },
        { id: "VouchNo", header: "Voucher No", width: 90 },
        { id: "VouchType", header: "Voucher Type", width: 120 },
        { id: "RefNo", header: "Ref / chq No", width: 100 },
        { id: "Dr", header: "Dr", width: 100, css: { 'text-align': 'right ! important' }, format: webix.Number.numToStr({ groupDelimiter: ",", groupSize: 3, decimalDelimiter: ".", decimalSize: 2 }) },
        { id: "Cr", header: "Cr", width: 100, css: { 'text-align': 'right ! important' }, format: webix.Number.numToStr({ groupDelimiter: ",", groupSize: 3, decimalDelimiter: ".", decimalSize: 2 }) },
        { id: "TrnId", hidden: true },
        { id: "FsYr ", hidden: true },
    ],
    on: {
        'onItemDblClick': function () {
            Rpage = $("#Rpage").val();
            if (Rpage == "1") {
                var dataItems = $$("RevrslEntryGrd").getSelectedItem();
                if (dataItems.TrnId != undefined && dataItems.TrnId != "" && dataItems.TrnId != null) {
                    localStorage.clear();
                    localStorage.setItem("TRN_IDD", dataItems.TrnId);
                    localStorage.setItem("Date", dataItems.Date);
                    localStorage.setItem("Narration", dataItems.Narration);
                    localStorage.setItem("VouchNo", dataItems.VouchNo);
                    localStorage.setItem("FsYr", dataItems.FsYr);
                    localStorage.setItem("LAmt", dataItems.Dr);

                    $("#TRN_IDD").val(dataItems.TrnId);
                    $("#Date").val(dataItems.Date);
                    $("#Narration").val(dataItems.Narration);
                    $("#VouchNo").val(dataItems.VouchNo);
                    var NewCmpId = "";
                    if(  $("#NewCmpId").val()!="") NewCmpId=$("#NewCmpId").val();
                    $.ajax({
                        type: "POST",
                        url: "/GLTransaction/OpenTransaction",
                        cache: false,
                        charset: 'utf-8',
                        data: "ID=" + dataItems.TrnId,
                        success: function (data) {
                            //if (NewCmpId != "") Window1 = window.open("/GLTransaction/Transaction?Page=2&NewCmpId="+NewCmpId+"", "PopupWindow", "width=1100,height=560,left=30,top=50");
                            //else Window1 = window.open("/GLTransaction/Transaction?Page=2", "PopupWindow", "width=1100,height=560,left=30,top=50");
                            var PageUrl = "";
                            if (NewCmpId != "") PageUrl = "/GLTrans/GLTransaction?Page=2&PARTIAL=1&NewCmpId=" + NewCmpId + "";
                            else PageUrl = "/GLTrans/GLTransaction?Page=2&PARTIAL=1";
                            GlDrillDownWindowLoad(PageUrl);
                            return true;
                        }
                    });
                }
            }
        },

      //  'onAfterScroll': function () {
            //var pos = this.getScrollState();
            
            //var url = "/GLTransaction/LoadReversalData";
            //var dateVouch = ""; var dateCFrm = ""; var dateCTo = "";
            //var dateFrm = dateFormat($$("dateFrm").getValue(), "mm/dd/yyyy");
            //var dateTo = dateFormat($$("dateTo").getValue(), "mm/dd/yyyy");
            //if ($$("dateVouch").getValue() != "" && $$("dateVouch").getValue() != null && $$("dateVouch").getValue() != undefined)
            //    dateVouch = dateFormat($$("dateVouch").getValue(), "mm/dd/yyyy");
            //if ($$("dateCFrm").getValue() != "" != "" && $$("dateCFrm").getValue() != null && $$("dateCFrm").getValue() != undefined)
            //    dateCFrm = dateFormat($$("dateCFrm").getValue(), "mm/dd/yyyy");
            //if ($$("dateCTo").getValue() != "" != "" && $$("dateCTo").getValue() != null && $$("dateCTo").getValue() != undefined)
            //    dateCTo = dateFormat($$("dateCTo").getValue(), "mm/dd/yyyy");

            //var set = {
            //    "FRDT": dateFrm,
            //    "TODT": dateTo,
            //    "OPTION": $$("ddlOpt").getValue(),
            //    "DIVISION": $$("ddlDiv").getValue(),
            //    "VOUCHERTYPE": $$("ddlVoucher").getValue(),
            //    //ddlGroup, dateCFrm dateCTo    
            //    "DATECFRM": dateCFrm,
            //    "DATECTO": dateCTo,
            //    "ORDERBY": $$("chkSort").getValue(),
            //    "TRN_ID": "",//$$("dateFrm").getValue(),
            //    "TRN_ID_SRNO": "",//$$("dateFrm").getValue(),
            //    "FVouchDate": dateVouch,
            //    "FTxtAmount": $$("txtAmt").getValue(),
            //    "FDebitAmount": $$("chkDrCr").getValue() == "1" ? "D" : "C",
            //    "FCredititAmount": $$("chkDrCr").getValue() == "1" ? "D" : "C",
            //    "FVouchFrom": $$("txtFromVouch").getValue(),
            //    "FVouchTo": $$("txtToVouch").getValue(),
            //    "FNarration": $$("txtNarr").getValue(),
            //    "Load": "1",//$$("dateFrm").getValue(),
            //};

            //scrollHandlerGrid(url, JSON.stringify(set), "RevrslEntryGrd");
            //$$("RevrslEntryGrd").refresh();
       // },
        onAfterContextMenu: function (id, e, node) {
            webix.delay(function () { this.select(id.row); }, this);
        }
    }
}
var reversalTrnId = "";
webix.ui({
    view: "contextmenu",
    id: "Mymenu",
    data: ["Copy Transaction", "Reversal Transaction"],
    css: { "background": "#828384 !important;color:White;" },
    on: {
        onItemClick: function (id) {
            reversalTrnId = "";
            var dataItems = $$("RevrslEntryGrd").getSelectedItem();
            if (dataItems.TrnId != undefined && dataItems.TrnId != "" && dataItems.TrnId != null) {
                localStorage.clear();
                localStorage.setItem("TRN_IDD", dataItems.TrnId);
                localStorage.setItem("Date", dataItems.Date);
                localStorage.setItem("Narration", dataItems.Narration);
                localStorage.setItem("VouchNo", dataItems.VouchNo);
                localStorage.setItem("FsYr", dataItems.FsYr);
                localStorage.setItem("LAmt", dataItems.Dr);
                var NewCmpId = "";
                if ($("#NewCmpId").val() != "") NewCmpId = $("#NewCmpId").val();
                
                if (this.getItem(id).value == "Copy Transaction") {
                    $.ajax({
                        type: "POST",
                        url: "/GLTransaction/OpenTransaction",
                        cache: false,
                        charset: 'utf-8',
                        data: "ID=" + dataItems.TrnId,
                        success: function (data) {
                         
                            //if (NewCmpId != "") Window1 = window.open("/GLTrans/GLTransaction?Page=4&PARTIAL=1&NewCmpId=" + NewCmpId + "", "PopupWindow", "width=1300,height=560,left=30,top=50");
                            //else Window1 = window.open("/GLTrans/GLTransaction?Page=4&PARTIAL=1", "PopupWindow", "width=1350,height=600,left=30,top=50");
                            var PageUrl = "";
                            if (NewCmpId != "") PageUrl = "/GLTrans/GLTransaction?Page=4&PARTIAL=1&NewCmpId=" + NewCmpId + "";
                            else Window1 =PageUrl="/GLTrans/GLTransaction?Page=4&PARTIAL=1";
                            GlDrillDownWindowLoad(PageUrl)
                            return true;
                        }
                    });
                }
                else if (this.getItem(id).value == "Reversal Transaction") {
                    reversalTrnId = dataItems.TrnId;
                    fiscalYr = dataItems.FsYr;
                    $$("txtRevReason").setValue("");
                    debugger;
                    if (ReversalCheck(reversalTrnId, fiscalYr) == true)
                        $$("FrmRevReason").show();

                }
            }
            else WAlertMessage("Select any row..!!")
        }
    }
});

function GlDrillDownWindowLoad(PageUrl) {
    //debugger;
    webix.ready(function () {
        webix.ui({
            view: "window",
            close: true,
            modal: true,
            move: true,
            id: "DrillTransPopup",
            head: "",
            position: "center",
            autowidth: true,
            on: {
                onShow: function () {
                    debugger;
                    var vWidth = window.innerWidth
                                   || document.documentElement.clientWidth
                                   || document.body.clientWidth;
                    var vHeight = window.innerHeight
                                   || document.documentElement.clientHeight
                                   || document.body.clientHeight;
                    if (vWidth > 800) vWidth = vWidth - 20;
                    if (vHeight > 550) vHeight = vHeight - 20;

                    $$('DrillTransPopup').define("width", vWidth);
                    $$('DrillTransPopup').define("height", vHeight)
                    $$('DrillTransPopup').resize();
                }
            },
            body: {
                rows: [{
                    view: "iframe",
                    id: "frame-Trans",
                    //css: { "margin-top": "-50px !important" },
                    src: PageUrl,
                }
                ],

            }
        }).show();

    })
};
var DisplayDataLoad = function () {
    debugger;
    var dateVouch = ""; var dateCFrm = ""; var dateCTo = "";
    var dateFrm = dateFormat($$("dateFrm").getValue(), "mm/dd/yyyy");
    var dateTo = dateFormat($$("dateTo").getValue(), "mm/dd/yyyy");
    if ($$("dateVouch").getValue() != "" && $$("dateVouch").getValue() != null && $$("dateVouch").getValue() != undefined)
        dateVouch = dateFormat($$("dateVouch").getValue(), "mm/dd/yyyy");
    if ($$("dateCFrm").getValue() != "" != "" && $$("dateCFrm").getValue() != null && $$("dateCFrm").getValue() != undefined)
        dateCFrm = dateFormat($$("dateCFrm").getValue(), "mm/dd/yyyy");
    if ($$("dateCTo").getValue() != "" != "" && $$("dateCTo").getValue() != null && $$("dateCTo").getValue() != undefined)
        dateCTo = dateFormat($$("dateCTo").getValue(), "mm/dd/yyyy");

    var set = {
        "FRDT": dateFrm,
        "TODT": dateTo,
        "OPTION": $$("ddlOpt").getValue(),
        "DIVISION": $$("ddlDiv").getValue(),
        "VOUCHERTYPE": $$("ddlVoucher").getValue(),
        //ddlGroup, dateCFrm dateCTo    
        "DATECFRM": dateCFrm,
        "DATECTO": dateCTo,
        "ORDERBY": $$("chkSort").getValue(),
        "TRN_ID": "",//$$("dateFrm").getValue(),
        "TRN_ID_SRNO": "",//$$("dateFrm").getValue(),
        "FVouchDate": dateVouch,
        "FTxtAmount": $$("txtAmt").getValue(),
        "FDebitAmount": $$("chkDrCr").getValue() == "1" ? "D" : "C",
        "FCredititAmount": $$("chkDrCr").getValue() == "1" ? "D" : "C",
        "FVouchFrom": $$("txtFromVouch").getValue(),
        "FVouchTo": $$("txtToVouch").getValue(),
        "FNarration": $$("txtNarr").getValue(),
        "Load": "0",//$$("dateFrm").getValue(),
        "GrpIds":  window.GroupIds,
        "PartyIds": window.PartyIds,
       
    };

    
    var retData = DataLoad("LoadReversalData", "", JSON.stringify(set));
    //rowDatad = JSON.parse(data);
    $$("RevrslEntryGrd").clearAll();
    $$("RevrslEntryGrd").parse(retData);
    $$("RevrslEntryGrd").refresh();
    page = 0;
};

webix.ui({
    view: "window",
    id: "FrmRevReason",
    close: true,
    modal: true,
    head: "Search",
    position: "center",
    width: 500,
    body: {
        cols: [{
            paddingX: 30,
            rows: [{
                view: "textarea",
                id: "txtRevReason",
                width: 400, labelWidth: 50,
                label: "Reason",
                height: 100,
                attributes: {maxlength:60}
            }, {
                view: "button",
                id: "btnRevReasonOk",
                align: "right",
                width: 60,
                label: "Ok",
                on: {
                    'onItemClick': function () {
                        if ($$("txtRevReason").getValue() != "") {
                            var NewCmpId = "";
                            if ($("#NewCmpId").val() != "") NewCmpId = $("#NewCmpId").val();
                            localStorage.setItem("RevReason", $$("txtRevReason").getValue());
                            $$("FrmRevReason").hide();
                            $.ajax({
                                type: "POST",
                                url: "/GLTransaction/OpenTransaction",
                                cache: false,
                                charset: 'utf-8',
                                data: "ID=" + reversalTrnId,
                                success: function (data) {
                                
                                    //if (NewCmpId != "") Window1 = window.open("/GLTrans/GLTransaction?Page=3&PARTIAL=1&NewCmpId=" + NewCmpId + "", "PopupWindow", "width=1100,height=560,left=30,top=50");
                                    //else Window1 = window.open("/GLTrans/GLTransaction?Page=3&PARTIAL=1", "PopupWindow", "width=1100,height=600,left=30,top=50");
                                    var PageUrl = "";
                                    if (NewCmpId != "") PageUrl = "/GLTrans/GLTransaction?Page=3&PARTIAL=1&NewCmpId=" + NewCmpId + "";
                                    else Window1 = PageUrl = "/GLTrans/GLTransaction?Page=3&PARTIAL=1";
                                    GlDrillDownWindowLoad(PageUrl);
                                    return true;
                                }
                            });
                        }
                        else WAlertMessage("Enter reason to proceed.")
                    },
                }
            }],
        }]
    }
})
function ReversalCheck(trnId, fiscalYr) {
    var bool = true;

    $.ajax({
        type: "POST",
        url: "/GLTransaction/ReversalCheck",
        cache: false,
        async: false,
        charset: 'utf-8',
        data: "fiscalYr=" + fiscalYr + "&trnid=" + trnId,
        success: function (_Data) {
            if (_Data != "{}" && _Data != undefined && _Data != null && _Data != "") {
                var d = JSON.parse(_Data);
                if (d != "0") {
                    bool = false;
                    WAlertMessage("Bills already adjusted by Voucher No: " + d + ".Reversal not Allowed.");
                }
            }
        }
    });
    return bool;
}
function FiscalYrPeriod() {
    var bool = true;

    $.ajax({
        type: "POST",
        url: "/GLTransaction/FiscalYrPeriod",
        cache: false,
        async: false,
        charset: 'utf-8',
        data: {},
        success: function (_Data) {
            if (_Data != "{}" && _Data != undefined && _Data != null && _Data != "") {
                var d = JSON.parse(_Data);
                $$("FiscalYrPrdGrd").clearAll();
                $$("FiscalYrPrdGrd").parse(d.TrnTy);
                debugger;
                var dt = new Date(d.TrnTy[0].PSDT);
                var dt1 = new Date(d.TrnTy[(d.TrnTy.length - 1)].PEDT);
                $$("dateFrm").setValue(dt);
                $$("dateTo").setValue(dt1);
            }
        }
    });
    return bool;
}
function WAlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    });
}
function creatingWPeriod() {
    webix.ui({
        view: 'window',
        id: "WFiscalPeriod",
        close: true,
        modal: true,
        head: "Fiscal Period",
        position: "center",
        width: 450,
        body: {
            paddingX: 30,
           
                cols: [{
                    view: "datatable",
                    id: "FiscalYrPrdGrd",
                    select:'row',
                    areaselect: true, //multiselect: true,
                    height: 400,
                    columns: [
                        { id: "PERIOD_NM", header: "Period Nm", width: 120 },
                        { id: "PERIOD_START_DT", header: "Period Start Date", width: 120 },
                        { id: "PERIOD_END_DT", header: "Period End Date", width: 120 },
                        { id: "PSDT", hidden:true },
                        { id: "PEDT", hidden: true }
                    ],
                    on: {
                        'onItemdblClick': function (id) {
                            var getval = this.getItem(id.row);
                            var dateFrm = new Date(getval.PSDT);
                            var dateTo = new Date(getval.PEDT);
                            $$("dateFrm").setValue(dateFrm);
                            $$("dateTo").setValue(dateTo);
                            $$("WFiscalPeriod").hide();
                        },
                        'onAfterBlockSelect': function () {

                            var vArr = $$("FiscalYrPrdGrd").getSelectArea();
                            vStartRow = vArr.start.row;
                            vERow = vArr.end.row;
                            debugger;
                  
                            var getval = this.getItem(vStartRow);
                            var getval1 = this.getItem(vERow);
                            var dateFrm = new Date(getval.PSDT);
                            var dateTo = new Date(getval1.PEDT);
                            $$("dateFrm").setValue(dateFrm);
                            $$("dateTo").setValue(dateTo);
                            $$("WFiscalPeriod").hide();
                        }

                    }
                }]
       
        }

    });
   // gridResize("1");
}



var DisplayDataLoadInit = function (TRN_ID, TRN_ID_SRNO) {
    debugger;
    var dateVouch = ""; var dateCFrm = ""; var dateCTo = "";
    var dateFrm = dateFormat($$("dateFrm").getValue(), "mm/dd/yyyy");
    var dateTo = dateFormat($$("dateTo").getValue(), "mm/dd/yyyy");
    if ($$("dateVouch").getValue() != "" && $$("dateVouch").getValue() != null && $$("dateVouch").getValue() != undefined)
        dateVouch = dateFormat($$("dateVouch").getValue(), "mm/dd/yyyy");
    if ($$("dateCFrm").getValue() != "" != "" && $$("dateCFrm").getValue() != null && $$("dateCFrm").getValue() != undefined)
        dateCFrm = dateFormat($$("dateCFrm").getValue(), "mm/dd/yyyy");
    if ($$("dateCTo").getValue() != "" != "" && $$("dateCTo").getValue() != null && $$("dateCTo").getValue() != undefined)
        dateCTo = dateFormat($$("dateCTo").getValue(), "mm/dd/yyyy");

    var set = {
        "FRDT": dateFrm,
        "TODT": dateTo,
        "OPTION": $$("ddlOpt").getValue(),
        "DIVISION": $$("ddlDiv").getValue(),
        "VOUCHERTYPE": $$("ddlVoucher").getValue(),
        //ddlGroup, dateCFrm dateCTo    
        "DATECFRM": dateCFrm,
        "DATECTO": dateCTo,
        "ORDERBY": $$("chkSort").getValue(),
        "TRN_ID": TRN_ID,
        "TRN_ID_SRNO": TRN_ID_SRNO,
        "FVouchDate": dateVouch,
        "FTxtAmount": $$("txtAmt").getValue(),
        "FDebitAmount": $$("chkDrCr").getValue() == "1" ? "D" : "C",
        "FCredititAmount": $$("chkDrCr").getValue() == "1" ? "D" : "C",
        "FVouchFrom": $$("txtFromVouch").getValue(),
        "FVouchTo": $$("txtToVouch").getValue(),
        "FNarration": $$("txtNarr").getValue(),
        "Load": "0",//$$("dateFrm").getValue(),
    };


    var retData = DataLoad("LoadReversalData", "", JSON.stringify(set));
    //rowDatad = JSON.parse(data);
    $$("RevrslEntryGrd").clearAll();
    $$("RevrslEntryGrd").parse(retData);
    $$("RevrslEntryGrd").refresh();
    page = 0;
};

function formatDateWebix(StrDt) {
    debugger;
    var Parts = StrDt.split("/");
    var Dt = Parts[0];
    var Mn = Parts[1];
    var Yr = Parts[2].substring(0, 4);
    var Str = Yr + "-" + Mn + "-" + Dt;
    return Str;
};



webix.event(window, "resize", function () {
    gridResize("1");
})


function gridResize(choice) {
    debugger;
    var vWidth = $("#divform").width();
    $$("FrmReversal").define("width", vWidth);
    $$("FrmReversal").resize();
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;

    $$("FrmReversal").define("height", vheight - 80);
    $$("FrmReversal").resize();
   
    if (choice == "1") {
        var offsetTop = $$("RevrslEntryGrd").getNode().offsetTop;
        $$("RevrslEntryGrd").define("height", ((vheight - offsetTop - 140)));
        $$("RevrslEntryGrd").adjust();
    }

}





