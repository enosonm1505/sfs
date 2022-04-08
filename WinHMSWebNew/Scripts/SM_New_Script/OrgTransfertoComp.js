function PageLoadFn(AC_CD_IND) {
    debugger;
  var  wid_45 = ((screen.width - 100) * 0.45);
  var wid_10 = ((screen.width - 100) * 0.1);
  var wid_5 = ((screen.width - 100) * 0.05);
  var searchicon = "<span class='fa fa-search ' ></span>";
  var ddlProperty = PropertyNM_New();
  var ddlOrgSubTy = OrgSubType();
  var ddlSubLedger = AccSubLedger();
  //var GridVal = LoadOrgInfo();
  //var Area_List = LoadDropDown("SalesAndMarket", "CountrywiseAreaLoad");
  //var Segment_List = LoadDropDown("SalesAndMarket", "SegmentLoad");
  //var Source_List = LoadDropDown("SalesAndMarket", "SourceLoad");
  //var CID = $("#CID").val();
  //var Country_List = LoadDropDown("SalesAndMarket", "Applicale_Country");
 
    webix.ui({
        view: 'combo',
        id: 'ddlProperty',
        container: 'ddlProperty',
        value:ddlProperty[0].id,
        options: ddlProperty,
        
        on: {
                onChange: function ()
                {
                    // alert();
                    this.form.submit();
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

                            },
                            {

                            },
                            {

                            },
                            {
                                view: 'button',
                                type: "icon",
                                icon: "wxi-plus",
                                //label: 'Add',
                                name: 'BtnAdd',
                                css:'webix_primary',
                                id: 'BtnAdd',
                             width: 30,
                               // align: "center",
                                click: function () {
                                    debugger;
                                    var data = $$("SaveGrid").serialize();
                                    if (data.length > 0) {
                                        var bool = false;
                                        $.each(data, function (key, value) {
                                            if (value.ORGID == "") {
                                                alert("Organization Cannot be Empty ...!");
                                                bool = true;
                                            }
                                            if (value.SHORTNM == "" && bool == false) {
                                                alert("Short Name Cannot be Empty ...!");
                                                bool = true;
                                            }
                                            if (value.ORGSUBTY == "" && bool == false) {
                                                alert("Party Sub Type Cannot be Empty ...!");
                                                bool = true;
                                            }
                                            if (AC_CD_IND == "1" && bool == false)
                                            {
                                                if (value.SUBLED == "") {
                                                    alert("Sub Ledger Control A/C Cannot be Empty...!");
                                                    bool = true;
                                                }
                                            }
                                        });
                                        if (bool == true)
                                            return false;
                                    }
                                    $$("SaveGrid").add({
                                        ORGNM: '',
                                        ORGID: '',
                                        SHORTNM: '',
                                        ORGSUBTY: '',
                                        SUBLED: '',
                                        APPROVE: '',
                                        ORGID: '',
                                    });
                                    $$("SaveGrid").refresh();
                                },
                               // align: "right"
                                },
                                {
                                    view: "button",
                                    type: "icon",
                                    icon: "wxi-trash",
                                    label: "",
                                    id: "BtnDel",
                                    css: 'webix_primary',
                                    width: 30,
                                    click: function () {
                                        $$("SaveGrid").editCancel();
                                        $$("SaveGrid").remove($$("SaveGrid").getSelectedId());
                                    },
                                  // align: "center"
                                }
                        ]

                    },
                    {
                        cols:[{

                            id: "SaveGrid",
                            name: "SaveGrid",
                            select: "row",
                            view: "datatable",
                            hover: "gridHover",
                            scroll: true,
                            columns: [
                                { id: "ORGNM", header: 'Organization', width: 380, css: { 'text-align': 'left ! important' } },
                                { id: "SELECT", header: ' ', template: searchicon, width: 30, css: { 'text-align': 'center ! important' } },                               
                                { id: "SHORTNM", header: 'Short Name',  maxLength:15,width: 220, hidden: false, css: { 'text-align': 'left ! important' }, editor: "text" },
                                { id: "ORGSUBTY", header: 'Organization Sub Type', width: 200, css: { 'text-align': 'left ! important' }, liveedit: true, editor: "select", collection: function (id) { return ddlOrgSubTy; } },
                                { id: "SUBLED", header: 'Sub Ledger Control A/c', hidden: AC_CD_IND == "1" ? false : true, width: 200, css: { 'text-align': 'left ! important' }, liveedit: true, editor: "select", collection: function (id) { return ddlSubLedger; } },
                                { id: "APPROVE", header: 'Approved Organization', width: 200, hidden: true, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' }, template: "{common.checkbox()}", editor: 'check' },
                                { id: "ORGID", hidden: true },
                                { id: "WEBSITE", hidden: true },
                                { id: "EMAIL", hidden: true },
                              
                            ],
                            editable: true,
                            data: [],
                            height: 450,
                            on: {
                                onAfterEditStart: function (id) {
                                    if (id.column == 'SHORTNM')
                                        this.getEditor().getInputNode().setAttribute("maxlength", 15)
                                },
                                onItemClick: function (id) {
                                    if (id.column == 'SELECT') {
                                        OrgSerarchPopupFn();
                                    }
                                  
                                },
                                'onBlur': function () {
                                    ////debugger;
                                    $$("SaveGrid").editStop();
                                    $$("SaveGrid").refresh();
                                },
                               
                            }

                        }]
                       



                    },
                    {},

                {
                    cols: [{

                    },
                    {},
                    {},
                    {

                    },
                    {
                        view: 'button',
                       // type: "icon",
                       // icon: "wxi-plus",
                        label: 'Create',
                        name: 'BtnCreate',
                        id: 'BtnCreate',
                        inputWidth: 70,
                        css:'webix_primary',
                        minWidth: 30,
                        align: "right",
                        click: function () {
                            Savedata();
                        }
                    },

                    ]

            }]

                

            }
        ]
    });
  
   
    
}
function Savedata()
{
    debugger;
   
    var SaveGriddata = [];
    var Table = {};
    var SaveGrid = $$("SaveGrid").serialize();
   
    if (SaveGrid.length == 0)
    {
        alert("Please fill the data !");
        return false;
    }
    var data = $$("SaveGrid").serialize();
    var bool = false;
    $.each(data, function (key, value) {
        if (value.ORGID == "") {
            alert("Organization Cannot be Empty ...!");
            bool = true;
        }
        if (value.SHORTNM == "" && bool == false) {
            alert("Short Name Cannot be Empty ...!");
            bool = true;
        }
        if (value.ORGSUBTY == "" && bool == false) {
            alert("Party Sub Type Cannot be Empty ...!");
            bool = true;
        }
        if (AC_CD_IND == "1" && bool == false) {
            if (value.SUBLED == "") {
                alert("Sub Ledger Control A/C  Cannot be Empty ...!");
                bool = true;
            }
        }
    });
    if (bool == true)
        return false;
  
   
    $.each(SaveGrid, function (i, value) {
        var obj = {};
        debugger;
       
        var Org = (value.ORGID == null || value.ORGID == undefined ? "" : value.ORGID);
        if (Org != "")
        {
            obj["ORGNM"] = (value.ORGNM == null || value.ORGNM == undefined ? "" : value.ORGNM);
            obj["ORGID"] = (value.ORGID == null || value.ORGID == undefined ? "" : value.ORGID);
            obj["SHORTNM"] = (value.SHORTNM == null || value.SHORTNM == undefined ? "" : value.SHORTNM);
            obj["ORGSUBTY"] = (value.ORGSUBTY == null || value.ORGSUBTY == undefined ? "" : value.ORGSUBTY);
            obj["SUBLED"] = (value.SUBLED == null || value.SUBLED == undefined ? "" : value.SUBLED);
            obj["APPROVE"] = (value.APPROVE == null || value.APPROVE == undefined ? "" : value.APPROVE);
            obj["WEBSITE"] = (value.WEBSITE == null || value.WEBSITE == undefined ? "" : value.WEBSITE);
            obj["EMAIL"] = (value.EMAIL == null || value.EMAIL == undefined ? "" : value.EMAIL);

            SaveGriddata.push(obj);
        }
        
    });
    Table["SaveGridList"] = JSON.stringify(SaveGriddata);
   
    var paramValue = JSON.stringify(Table);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/SalesAndMarket/SaveOrgTransfertoComp",
        async: false,
        data: "request=" + encodeURIComponent(paramValue),
        success: function (data) {
            debugger;
            var alertVal = data.v.ErrorMeg;
            if (alertVal == "Operation Failed.") {
                alert(alertVal);
            }

            else {
                alert(alertVal);
            }
            $$("SaveGrid").clearAll();
            $$("SaveGrid").refresh();
            
        }
        });
}
function OrgSerarchPopupFn() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Organization Search",
        id: 'OrganizationSearchpop',
        modal: true,
        width: 950,
        close: true,
        body: {
            rows: [
                {
                    id: "OrganizationName1",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "Organization", header: ['Organization', { content: "textFilter" }], width: 350, },
                            { id: "Citynm", header: ['City', { content: "textFilter" }], width: 200, css: { 'text-align': 'left ! important' } },
                            { id: "Memberof", header: ['Member of', { content: "textFilter" }], width: 150, css: { 'text-align': 'center ! important' } },
                            { id: "AssignedTo", header: ['Assigned To', { content: "textFilter" }], width: 130, },
                            { id: "Ognm", header: ['Area', { content: "textFilter" }], width: 100, },
                            { id: "StingPhone", hidden: true },
                            { id: "OrganizationId", hidden: true },
                            { id: "CountryId", hidden: true },
                            { id: "CityId", hidden: true },
                            { id: "Ogid", hidden: true },
                            { id: "CompanyLinkId", hidden: true },
                            { id: "ContCompanyNm", hidden: true },
                            { id: "Activeind", hidden: true },
                            { id: "Groupid", hidden: true },
                            { id: "Assignedtoid", hidden: true },
                            { id: "Source", hidden: true },
                            { id: "Segment", hidden: true },
                            { id: "Notes", hidden: true },
                            { id: "Website", hidden: true },
                            { id: "Phone1", hidden: true },
                            { id: "Phone2", hidden: true },
                            { id: "Address1", hidden: true },
                            { id: "Address2", hidden: true },
                            { id: "Address3", hidden: true },
                            { id: "ProjectionValue", hidden: true },
                            { id: "Cat", hidden: true },
                            { id: "EMAIL", hidden: true },
                    ],
                    scroll: "y",
                    datafetch: 50,
                    loadahead: 100,
                    autoConfig: true,
                    url: function () {
                        var rowDatad = [];
                        $.ajax({
                            type: "POST",
                            url: "/SalesAndMarket/OrgSearch",
                           // data: {},
                            data: "OrgTransfer=" + "1",
                            async: false,
                            success: function (d) {
                                debugger;
                                if (d != "") {
                                    rowDatad = d;
                                }
                            }
                        });
                        return rowDatad;
                    },
                    height: 550,
                    on: {
                       
                        'onItemDblClick': function (id) {
                            debugger;
                            var getval = this.getItem(id.row);                            
                            var dataval = $$("SaveGrid").getSelectedItem();
                            var data = $$("SaveGrid").serialize();
                            if (data.length > 0) {
                                var bool = false;
                                $.each(data, function (key, value) {

                                    if (value.ORGID == getval.OrganizationId) {
                                        alert("Organization Already Exist ...!");
                                        bool = true;
                                    }

                                });

                                if (bool == true)
                                    return false;
                            }
                            dataval.ORGNM = getval.Organization;
                            dataval.ORGID = getval.OrganizationId;
                            dataval.WEBSITE = getval.Website;
                            dataval.EMAIL = getval.EMAIL;
                            $$("SaveGrid").refresh();                            
                            $$("OrganizationSearchpop").hide();                           
                        },

                    },


                },
                {
                    view: 'form',
                    elements: [
                        {
                            cols: [
                                {
                                    cols: [
                                       {
                                           view: 'checkbox',
                                           labelRight: 'Active',
                                           name: 'ChkActive',
                                           id: 'ChkActive',
                                           labelWidth: 30,
                                           value: 1,
                                           on: {
                                               onChange: function () {

                                                   var Active = "yes";
                                                   if (this.getValue() == 1) {
                                                       Active = "yes";
                                                   }
                                                   else {
                                                       Active = "no";
                                                   }
                                                   $.ajax({
                                                       type: "POST",
                                                       url: "/SalesAndMarket/ActiveOrganization",
                                                       data: "Active=" + Active,
                                                       async: false,
                                                       success: function (data) {
                                                           OrgSerachloadfn();
                                                       }
                                                   });
                                               }
                                           }
                                       },
                                       {
                                           view: 'checkbox',
                                           labelRight: 'Inactive SalesPerson',
                                           name: 'ChkInActive',
                                           id: 'ChkInActive',
                                           labelWidth: 30,
                                           inputWidth: 400,
                                           on: {
                                               onChange: function () {
                                                   var InactiveUser = "";
                                                   if (this.getValue() == 1) {
                                                       InactiveUser = "1";
                                                   }
                                                   $.ajax({
                                                       type: "POST",
                                                       url: "/SalesAndMarket/InactiveUserArgs",
                                                       data: "InactiveUser=" + InactiveUser,
                                                       async: false,
                                                       success: function (data) {
                                                           OrgSerachloadfn();
                                                       }
                                                   });
                                               }
                                           }
                                       },

                                    ]
                                },
                                {
                                    cols: [
                                        //{},
                                        //{},
                                        {
                                            view: 'checkbox',
                                            labelRight: 'Business',
                                            name: 'ChkBus',
                                            id: 'ChkBus',
                                            labelWidth: 30,
                                            value: 1,
                                            hidden:true,
                                            //on: {
                                            //    onChange: function () {
                                            //        debugger;
                                            //        if ($$("ChkBus").getValue() == "0") $$("ChkInd").setValue("1");
                                            //        var Bus = ""; var Ind = "";
                                            //        if ($$("ChkBus").getValue() == "1") Bus = "1";
                                            //        if ($$("ChkInd").getValue() == "1") Ind = "1";
                                            //        $.ajax({
                                            //            type: "POST",
                                            //            url: "/SalesAndMarket/OrgCategory",
                                            //            data: "Business=" + Bus + "&Individual=" + Ind,
                                            //            async: false,
                                            //            success: function (data) {
                                            //                OrgSerachloadfn();
                                            //            }
                                            //        });
                                            //    }
                                            //}
                                        },
                                 {
                                     //view: 'checkbox',
                                     //labelRight: 'Individual',
                                     //name: 'ChkInd',
                                     //id: 'ChkInd',
                                     //labelWidth: 30,
                                     //value: 1,
                                     //on: {
                                     //    onChange: function () {
                                     //        debugger;
                                     //        if ($$("ChkInd").getValue() == "0") $$("ChkBus").setValue("1");
                                     //        var Bus = ""; var Ind = "";
                                     //        if ($$("ChkBus").getValue() == "1") Bus = "1";
                                     //        if ($$("ChkInd").getValue() == "1") Ind = "1";
                                     //        $.ajax({
                                     //            type: "POST",
                                     //            url: "/SalesAndMarket/OrgCategory",
                                     //            data: "Business=" + Bus + "&Individual=" + Ind,
                                     //            async: false,
                                     //            success: function (data) {
                                     //                OrgSerachloadfn();
                                     //            }
                                     //        });
                                     //    }
                                     //}
                                 },
                                        {
                                            view: 'button',
                                           // type: "icon",
                                           // icon: "wxi-file",
                                            label: 'Refresh',
                                            css:'webix_primary',
                                            width: 70,
                                            align: "center",
                                            on: {
                                                onItemClick: function () {
                                                    OrgSerachloadfn();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                          //  type: "icon",
                                            //  icon: "wxi-close",
                                            css: 'webix_primary',
                                            label: 'close',
                                            width: 80,
                                            align: "center",
                                            on: {
                                                onItemClick: function () {
                                                    $$("OrganizationSearchpop").hide();
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
    }).show();
    // var dataval = OrgSerachloadfn();
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
function OrgSubType() {
    var text = "";
    var dataRec = "";
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/OrgSubTypeLoad",
        cache: false,
        async: false,
        charset: 'utf-8',
        data: "text=" + text,
        success: function (data) {
            debugger;
            dataRec = JSON.parse(data);
        }
    });
    return dataRec;
}
function AccSubLedger() {
    var text = "";
    var dataRec = "";
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/AccSubLedgerLoad",
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
$(document).on('shown.lte.pushmenu', function () {
    var timeoutID;
    function delayedStart() {
        timeoutID = window.setTimeout(resizeAction, 350);
    }

    function resizeAction() {
        sidebarFn(1);
        //  alert("Sidebar is collapsed or expanded!")
        window.clearTimeout(timeoutID);
    }

    delayedStart();

})
       .on('collapsed.lte.pushmenu', function () {
           var timeoutID;
           function delayedStart() {
               timeoutID = window.setTimeout(resizeAction, 350);
           }

           function resizeAction() {
               sidebarFn(2);
               //  alert("Sidebar is collapsed or expanded!")
               window.clearTimeout(timeoutID);
           }

           delayedStart();
       });
function gridResize() {
    var vheight = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
    var offset = $("#divGrid").offset();
    $$("gridRpt").define("height", ((vheight - offset.top - 100)));
    $$("gridRpt").adjust();


};
webix.event(window, "resize", function () {
    gridResize();
})
function sidebarFn(val) {
    //$$("divGrid").resize();
    //$$("gridRpt").resize();
    var vWidth = $("#DivForm").width();
    $$("DivForm").define("width", vWidth);
    $$("DivForm").resize();

}



//function HDClr(value, config) {
//    if (config.StatusID == "1") {
//        //var element = $('tr[data-uid="' + row.uid + '"] td:nth-child(1)');
//        //$(element).addClass("Greencolor");
//        return "Greencolor";
//    } else if (config.StatusID == "6") {
//        // var element = $('tr[data-uid="' + row.uid + '"] td:nth-child(1)');
//        //$(element).addClass("Greencolor");
//        return "Greencolor";
//    } else {
//        //var element2 = $('tr[data-uid="' + row.uid + '"] td:nth-child(1)');
//        //$(element2).addClass("redcolor");
//        return "redcolor";
//    }
//}