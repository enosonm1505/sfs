function OrgSerarchPopupFn(LOP) {
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
        close:true,
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
                            data: {},
                            //dataType:JSON,
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
                        'onAfterLoad': function () {
                            if (window.name == "NewLeadCreation" || window.name == "NewCreation") {
                                if (LeadOppPageID == "3") {
                                    if (orgid != "") {
                                        debugger;
                                        var item = $$("OrganizationName1").find(function (obj) {
                                            return obj.OrganizationId.toString().trim() == orgid.trim();
                                        });
                                        if (item.length > 0) {
                                            $$("OrganizationName1").select(item[0].id);
                                            if (Dbl_Click == true) {
                                                debugger;
                                                set_Org_details($$("OrganizationName1").getSelectedId());
                                                Dbl_Click = false;
                                            }
                                        }
                                    }
                                    $("#OrgSearch").hide();
                                    $("#NewOrg").hide();
                                }
                            }
                        },
                        'onItemDblClick': function (id) {
                            debugger;
                            if (LOP == 'LOP') {
                                var selectedRows = $$("OrganizationName1").getSelectedItem(id.row);

                                var OrganizationId = selectedRows[0].OrganizationId.toString().trim();
                                var Organization = selectedRows[0].Organization.toString().trim();
                                $$('Organization').setValue(Organization);
                                $("#ORGID").val(OrganizationId);
                                //Added by S.VijayaLakshmi//18.5.20
                                var Individual = "2";
                                $.ajax({
                                    type: "POST",
                                    url: "/SalesAndMarket/OrganaizationID",
                                    data: "orgId=" + OrganizationId + "&Organization=" + Organization + "&Individual=" + Individual,
                                    async: false,
                                    success: function (data) {
                                       // $("#ContCompanyNm").data("kendoDropDownList").dataSource.read();
                                       
                                        //$$("MobilePhone").setValue("");
                                        //$$("Email1pop").setValue("");
                                        if (data != null && data != "" && data != undefined) {
                                            //var dtval = JSON.parse(data.v);
                                            //if (dtval.Mob != "" && dtval.Mob != null)
                                            //    //$("#cMobId").text("[M: " + dtval.Mob + "]");
                                            //    $$("MobilePhone").setValue("[M: " + dtval.Mob + "]");
                                            //if (dtval.Email != "" && dtval.Email != null)
                                            //    //$("#cEmilId").text("[E: " + dtval.Email + "]");
                                            //    $$("Email1pop").setValue("[M: " + dtval.Mob + "]");
                                        }
                                    }
                                });
                                $$("OrganizationSearchpop").hide();
                            }
                            else {
                                set_Org_details(id);
                            }
                                
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
                                               onChange:function(){
                                                  
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
                                       }
                                    ]
                                },
                                {
                                    cols: [
                                        {},
                                        {},
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Refresh',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    OrgSerachloadfn();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'close',
                                            width: 100,
                                            align: "right",
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
function set_Org_details(id) {
    debugger;
    var selectedRows = $$("OrganizationName1").getSelectedItem(id.row);
   
            var OrganizationId = selectedRows[0].OrganizationId.toString().trim();
            var Organization = selectedRows[0].Organization.toString().trim();

            var Citynm = selectedRows[0].Citynm.toString().trim();
            if (selectedRows[0].CityId != null)
                var CityId = selectedRows[0].CityId.toString().trim();
            else
                var CityId = selectedRows[0].CityId;

            var CountryId = selectedRows[0].CountryId.toString().trim();

            if (selectedRows[0].Groupid != null)
                var Groupid = selectedRows[0].Groupid.toString().trim();
            else
                var Groupid = selectedRows[0].Groupid;

            if (selectedRows[0].Memberof != null)
                var Memberof = selectedRows[0].Memberof.toString().trim();
            else
                var Memberof = selectedRows[0].Memberof;

            if (selectedRows[0].Assignedtoid != null)
                var Assignedtoid = selectedRows[0].Assignedtoid.toString().trim();
            else
                var Assignedtoid = selectedRows[0].Assignedtoid;

            if (selectedRows[0].Ogid != null)
                var Ogid = selectedRows[0].Ogid.toString().trim();
            else
                var Ogid = selectedRows[0].Ogid;

            if (selectedRows[0].CompanyLinkId != null)
                var CompanyLinkId = selectedRows[0].CompanyLinkId.toString().trim();
            else
                var CompanyLinkId = selectedRows[0].CompanyLinkId;

            if (selectedRows[0].Source != null)
                var Source = selectedRows[0].Source.toString().trim();
            else
                var Source = selectedRows[0].Source;

            if (selectedRows[0].Segment != null)
                var Segment = selectedRows[0].Segment.toString().trim();
            else
                var Segment = selectedRows[0].Segment;

            if (selectedRows[0].Notes != null)
                var Notes = selectedRows[0].Notes.toString().trim();
            else
                var Notes = selectedRows[0].Notes

            if (selectedRows[0].Website != null)
                var Website = selectedRows[0].Website.toString().trim();
            else
                var Website = selectedRows[0].Website;

            if (selectedRows[0].Phone1 != null)
                var Phone1 = selectedRows[0].Phone1.toString().trim();
            else
                var Phone1 = selectedRows[0].Phone1;

            if (selectedRows[0].Phone2 != null)
                var Phone2 = selectedRows[0].Phone2.toString().trim();
            else
                var Phone2 = selectedRows[0].Phone2;

            if (selectedRows[0].Address1 != null)
                var Address1 = selectedRows[0].Address1.toString().trim();
            else
                var Address1 = selectedRows[0].Address1;

            if (selectedRows[0].Address2 != null)
                var Address2 = selectedRows[0].Address2.toString().trim();
            else
                var Address2 = selectedRows[0].Address2;

            if (selectedRows[0].Address3 != null)
                var Address3 = selectedRows[0].Address3.toString().trim();
            else
                var Address3 = selectedRows[0].Address3;

            if (selectedRows[0].Activeind != null)
                var Activeind = selectedRows[0].Activeind.toString().trim();
            else
                var Activeind = selectedRows[0].Activeind;


            $("#CityIDD").val(CityId);
            $$("City").setValue(Citynm);
            $$('Country').setValue(CountryId);
            $$("Source").setValue(Source);
            $$("Industry").setValue(Segment);
            $$("Area").setValue(Ogid);

            if (OrganizationId != "") {
                $.ajax({
                    type: "POST",
                    url: "/SalesAndMarket/MultipleSalesPerson_Load",
                    cache: false,
                    async: false,
                    charset: 'utf-8',
                    data: "OrganizationId=" + OrganizationId,
                    success: function (data) {
                        $("#AssignedID").val(data.v);
                        $$("Assigned_To").setValue(data.w);
                    },
                });
            }

            $$("Group").setValue(Memberof);
            $('#GroupID').val(Groupid);
            $$("Primary_Ph").setValue(Phone1);
            $$('Phone2').setValue(Phone2);
            $$("Website").setValue(Website);
            $$('Notes').setValue(Notes);
            $$("Address1").setValue(Address1);
            $$('Address2').setValue(Address2);
            $$('Address3').setValue(Address3);
            $("#ORGID").val(OrganizationId);
            $("#ORGIDCONTACT").val(OrganizationId);

            $$("Organization").setValue(Organization);
            $("#OrganizationContact").val(Organization);
            $("#OrganizationActivity").val(Organization);
            if (Activeind == "1") {
                $$("Active").setValue(1)
            }
            else {
                $$("Active").setValue(0)
            }
            if (OrganizationId != "") {
                var Individual = "2";
                $.ajax({
                    type: "POST",
                    url: "/SalesAndMarket/OrganaizationID",
                    data: "orgId=" + OrganizationId + "&Organization=" + Organization + "&Individual=" + Individual,
                    async: false,
                    success: function (data) {
                        //Load_ActivityInfo();
                    }
                });
            }
            
            $.ajax({
                async: false,
                url: "/SalesAndMarket/ContactGridLoad_New",
                type: 'POST',
                data: "ORG_ID=" + OrganizationId,
                success: function (data) {
                    if (data != "") {
                        $$("ContactGrid").clearAll();
                        $$("ContactGrid").parse(JSON.parse(data));
                        $$("ContactGrid").refresh();
                    }
                }
            });
            $.ajax({
                async: false,
                url: "/SalesAndMarket/OpenOrgInformationLoad",
                type: 'POST',
                data: "ORG_ID=" + OrganizationId,
                success: function (data) {
                    $$("OrgInfoGrid").clearAll();
                    $$("OrgInfoGrid").parse(data.Data);
                    $$("OrgInfoGrid").refresh();
                }
            });
            Load_ActivityInfoORG();
            $.ajax({
                async: false,
                url: "/SalesAndMarket/OrgLeadOppHistoryLoad_New",
                type: 'POST',
                data: "ORG_ID=" + OrganizationId,
                success: function (d) {
                    if (d != "") {
                        rowDatad = JSON.parse(d);
                        $$("LOGrid").clearAll();
                        $$("LOGrid").parse(rowDatad);
                        $$("LOGrid").refresh();

                    }
                }
            });
            
    $$("OrganizationSearchpop").hide();
}
function Load_ActivityInfoORG() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/ActivityGridLoadORG",
        data: {},
        async: false,
        success: function (d) {
            if (d != "") {
                debugger;
                rowDatad = JSON.parse(d);
            }
        }
    });
    $$("Activity_Grid").clearAll();
    $$("Activity_Grid").parse(rowDatad);
    $$("Activity_Grid").refresh();
}
function OrgSerachloadfn() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/OrgSearch",
        data: {},
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad =JSON.parse(d);
                $$("OrganizationName1").clearAll();
                $$("OrganizationName1").parse(rowDatad.data);
                $$("OrganizationName1").refresh();
            }
        }
    });
    return rowDatad;
}

function AssignLoadfn() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Sales Person Search",
        id: 'SalesPersonSearchPOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    id: "SalesPersonSearch",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "Emp_Nm", header: 'Assigned To', width: 300, css: { 'text-align': 'left ! important' } },
                            { header: { content: "masterCheckbox", css: { 'padding': '0px ! important' } }, id: "Select", template: "{common.checkbox()}", width: 80, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                            { id: "Emp_Id", hidden: true },
                            { id: "ACTIVE_IND", hidden: true },
                            { id: "ID", hidden: true },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [],
                    on: {
                    },
                },
                {
                    view: 'form',
                    elements:[
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
                                    view: 'button',
                                    type: "icon",
                                    icon: "wxi-file",
                                    label: 'Ok',
                                    width: 100,
                                    align: "right",
                                    on: {
                                        onItemClick: function () {
                                            var data = $$("SalesPersonSearch").serialize();
                                            var lenval = data.length;
                                            var AssignedTo = '';
                                            var Assignedtoid = '';
                                            if (lenval != 0) {
                                                for (i = 0; i < lenval; i++) {
                                                    debugger;
                                                    if (data[i].Select == "1") {
                                                        if (AssignedTo == "") {
                                                            AssignedTo = $.trim(data[i].Emp_Nm);
                                                        }
                                                        else {
                                                            AssignedTo += ',' + $.trim(data[i].Emp_Nm);
                                                        }
                                                        if (Assignedtoid == "") {
                                                            Assignedtoid = $.trim(data[i].Emp_Id);
                                                        }
                                                        else {
                                                            Assignedtoid += ',' + $.trim(data[i].Emp_Id);
                                                        }
                                                    }
                                                }
                                            }
                                            $$("Assigned_To").setValue(AssignedTo);
                                            $("#AssignedID").val(Assignedtoid);
                                            $$("SalesPersonSearchPOP").hide();
                                        }
                                    }
                                },
                                {
                                    view: 'button',
                                    type: "icon",
                                    icon: "wxi-close",
                                    label: 'Cancel',
                                    minWidth: 100,
                                    align: "right",
                                    on: {
                                        onItemClick: function () {
                                            $$("SalesPersonSearchPOP").hide();
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
      var dataval = AssignSerachloadfn();
}
function AssignSerachloadfn() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/OrgMultiSalesPerson_New",
        data: {},
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("SalesPersonSearch").clearAll();
                $$("SalesPersonSearch").parse(rowDatad);
                $$("SalesPersonSearch").refresh();
            }
        }
    });
    return rowDatad;
}

function CityLoadFn() {
    var DataVal = [];
    $.ajax({
        async: false,
        url: "/SalesAndMarket/Applicale_CityFn",
        type: 'POST',
        data: "request=" + "",
        success: function (d) {
            if (d != "")
                DataVal = JSON.parse(d);
        },
    });
    return DataVal;
}
function StateLoadFn() {
    var DataVal = [];
    $.ajax({
        async: false,
        url: "/SalesAndMarket/StateLoadFn",
        type: 'POST',
        data: "request=" + "",
        success: function (d) {
            if (d != "")
                DataVal = JSON.parse(d);
        },
    });
    return DataVal;
}
function FnCityPopupLoad() {
    var DataVal = CityLoadFn();
    var ddlVal = StateLoadFn();
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "CityPopup",
        head: "City Search",
        position: "center",
        minWidth: 350,
        maxWidth: 350,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "CityGrid",
                select: "row",
                data: DataVal,
                height: 450,
                columns: [
                       { header: ["City", { content: "textFilter" }], id: "city_nm", width: 330, css: { 'text-align': 'left ! important' } },
                       { header: "Zipcode", id: "z_id", hidden: true },
                       { header: "CityId", id: "city_id", hidden: true },
                       { header: "CountryId", id: "country_id", hidden: true },
                        { header: "Rg_Id", id: "Rg_Id", hidden: true },
                ],
                on: {
                    'onItemDblClick': function (id) {
                        var selectedRows = this.getItem(id.row);
                        $("#CityIDD").val(selectedRows.CityId);
                        $('#ZipID').val(selectedRows.z_id);
                        $('#Reg_ID').val(selectedRows.Rg_Id);
                        $$("City").setValue(selectedRows.city_nm);
                        $("#Checkclick").val("1");
                        $$("CityPopup").hide();
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
            {
                view: 'form',
                elements:[
                    {
                        cols: [
                            {
                                view: 'button',
                                value: 'New',
                                on: {
                                    'onItemClick': function () {
                                        $$("CityNewEdit").show();
                                        $$("CityName").setValue("");
                                        $$("StateId").setValue("");
                                        $$("ZipCode").setValue("");
                                        $$("CityId").setValue("");
                                        $("#CitySaveMethod").val("NEW");
                                    }
                                }
                            },
                            {
                                view: 'button',
                                value: 'Modify',
                                on: {
                                    'onItemClick': function () {
                                        $$("CityNewEdit").show();
                                        var GetItem = $$("CityGrid").getSelectedItem();
                                        $$("CityId").setValue($.trim(GetItem.city_id));
                                        $$("CityName").setValue($.trim(GetItem.city_nm));
                                        $$("StateId").setValue($.trim(GetItem.Rg_Id));
                                        $$("ZipCode").setValue($.trim(GetItem.z_id));
                                        $("#CitySaveMethod").val("MODIFY");
                                    }
                                }
                            },
                            {
                                view: 'button',
                                value: 'Refresh',
                                on: {
                                    onItemClick: function () {
                                        var DataVal = CityLoadFn();
                                        $$("CityGrid").clearAll();
                                        $$("CityGrid").parse(DataVal);
                                        $$("CityGrid").refresh();
                                        $$("CityGrid").select($$("CityGrid").getFirstId());
                                        webix.UIManager.setFocus($$("CityGrid"));
                                        $$("CityGrid").refresh();

                                    }
                                }
                            },
                            {
                                view: 'button',
                                value: 'Ok',
                                on: {
                                    onItemClick: function () {
                                        var selectedRows = $$("CityGrid").getSelectedItem();
                                        $("#CityIDD").val(selectedRows.CityId);
                                        $('#ZipID').val(selectedRows.z_id);
                                        $('#Reg_ID').val(selectedRows.Rg_Id);
                                        $$("City").setValue(selectedRows.city_nm);
                                        $("#Checkclick").val("1");
                                        $$("CityPopup").hide();
                                    }
                                }
                            },
                            {
                                view: 'button',
                                value: 'Cancel',
                                on: {
                                    onItemClick: function () {
                                        $$("CityPopup").hide();
                                    }
                                }
                            }
                        ]
                    }
                    ]
            }
            ],

        }
    });
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "CityNewEdit",
        head: "City Creation/Amendment",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        autowidth: true,
        body: {
            view: 'form',
            elements: [{
                rows: [
                    {
                        view: 'text',
                        label: 'City',
                        id: 'CityName'
                    },
                     {
                         view: 'text',
                         label: 'City',
                         id: 'CityId',
                         hidden: true,
                     },
                     {
                         cols: [
                             {
                                 view: 'combo',
                                 label: 'State',
                                 options: ddlVal,
                                 id: 'StateId',
                                 width: 340
                             }, {
                                 view: 'button',
                                 value: 'N',
                                 on: {
                                     onItemClick: function () {
                                         $$("StateNewEdit").show();
                                     }
                                 },
                                 width: 30
                             }
                         ]

                     },
                      {
                          view: 'text',
                          label: 'ZipCode',
                          id: 'ZipCode'
                      },
                      {
                          cols: [{ view: 'label', label: ' ', width: 200 },
                                                      {
                                                          view: 'button',
                                                          value: 'Save',
                                                          on: {
                                                              onItemClick: function () {
                                                                  var reqobj = {};
                                                                  reqobj["BTN_TYPE"] = $("#BTN_TYPE").val();
                                                                  reqobj["PageID"] = "";
                                                                  reqobj["CountryIDD"] = $("#CountryIDD").val();
                                                                  reqobj["CityIDD"] = $$("CityId").getValue();
                                                                  reqobj["STATEID"] = $$("StateId").getValue();
                                                                  reqobj["CityNew"] = $$("CityName").getValue();
                                                                  reqobj["Zipcode"] = $$("ZipCode").getValue();
                                                                  reqobj["CitySaveMethod"] = $("#CitySaveMethod").val();
                                                                  var dataparam = JSON.stringify(reqobj);
                                                                  alert(dataparam);
                                                                  $.ajax({
                                                                      async: false,
                                                                      url: "/SalesAndMarket/SaveCityFn",
                                                                      type: 'POST',
                                                                      data: "request=" + dataparam,
                                                                      success: function (d) {
                                                                          if (d == "1") {
                                                                              if ($("#CitySaveMethod").val() == "NEW") {
                                                                                  $("#alertType").val('success');
                                                                                  $("#AlertMessageHdn").val("Created Successfully.");
                                                                                  AlertMesaage();
                                                                              }
                                                                              else {
                                                                                  $("#alertType").val('success');
                                                                                  $("#AlertMessageHdn").val("Updated Successfully.");
                                                                                  AlertMesaage();
                                                                              }
                                                                              var DataVal = CityLoadFn();
                                                                              $$("CityGrid").clearAll();
                                                                              $$("CityGrid").parse(DataVal);
                                                                              $$("CityGrid").refresh();
                                                                              //$$("CityGrid").eachColumn(function (id, col) {
                                                                              //    var filter = this.getFilter(id);
                                                                              //    if (filter) {
                                                                              //        if (filter.setValue) filter.setValue("")	
                                                                              //        else filter.value = "";					
                                                                              //    }
                                                                              //});
                                                                              $$("CityGrid").select($$("CityGrid").getFirstId());
                                                                              webix.UIManager.setFocus($$("CityGrid"));
                                                                              $$("CityGrid").refresh();
                                                                              $$("CityGrid").filterByAll();
                                                                              $$("CityNewEdit").hide();
                                                                          }
                                                                          else {
                                                                              $("#alertType").val('fail');
                                                                              $("#AlertMessageHdn").val(d);
                                                                              AlertMesaage();
                                                                          }
                                                                      },
                                                                  });


                                                              }
                                                          }
                                                      },
                                                      {
                                                          view: 'button',
                                                          value: 'Cancel',
                                                          on: {
                                                              onItemClick: function () {
                                                                  $$("CityNewEdit").hide();
                                                              }
                                                          }
                                                      },
                          ]
                      }
                ]
            }]
        }
    });
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "StateNewEdit",
        head: "State",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        autowidth: true,
        body: {
            view: 'form',
            elements: [{
                rows: [
                {
                    view: 'text',
                    label: 'State',
                    id: 'StateName'
                },
                {
                    cols: [{ view: 'label', label: ' ', width: 200 },
                                                      {
                                                          view: 'button',
                                                          value: 'Save',
                                                          on: {
                                                              onItemClick: function () {
                                                                  var reqobj = {};
                                                                  reqobj["BTN_TYPE"] = $("#BTN_TYPE").val();
                                                                  reqobj["PageID"] = "";
                                                                  reqobj["CountryIDD"] = $("#CountryIDD").val();
                                                                  reqobj["CityIDD"] = $$("CityId").getValue();
                                                                  reqobj["State"] = $$("StateName").getValue();
                                                                  var dataparam = JSON.stringify(reqobj);
                                                                  $.ajax({
                                                                      async: false,
                                                                      url: "/SalesAndMarket/SaveStateFn",
                                                                      type: 'POST',
                                                                      data: "request=" + dataparam,
                                                                      success: function (d) {
                                                                          if (d == "Created Successfully.") {
                                                                              $("#alertType").val('success');
                                                                              $("#AlertMessageHdn").val(d);
                                                                              AlertMesaage();
                                                                              var ddlVal = StateLoadFn();
                                                                              $("#StateId").empty();
                                                                              $$("StateId").define("options", ddlVal);
                                                                              $$("StateId").refresh();
                                                                          }
                                                                          else {
                                                                              $("#alertType").val('fail');
                                                                              $("#AlertMessageHdn").val(d);
                                                                              AlertMesaage();
                                                                          }
                                                                      },
                                                                  });
                                                              }
                                                          }
                                                      },
                                                      {
                                                          view: 'button',
                                                          value: 'Cancel',
                                                          on: {
                                                              onItemClick: function () {
                                                                  $$("StateNewEdit").hide();

                                                              }
                                                          }
                                                      },
                    ]
                }
                ]
            }]
        }
    });
}

function GroupLoadfn() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Group Search",
        id: 'GroupSearchPOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    id: "GroupSearch",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "GRP_NAME", header: 'Group', width: 380, css: { 'text-align': 'left ! important' } },
                            { id: "grp_id", hidden: true },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [],
                    on: {
                        'onItemClick': function (id) {
                            var getval = this.getItem(id.row);
                            $$("Group").setValue(getval.GRP_NAME);
                            $('#GroupID').val(getval.grp_id);
                            $$("GroupSearchPOP").hide();
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
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Ok',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var data = $$("GroupSearch").getSelectedItem();
                                                    $$("Group").setValue(data.GRP_NAME);
                                                    $('#GroupID').val(data.grp_id);
                                                    $$("GroupSearchPOP").hide();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("GroupSearchPOP").hide();
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
    var dataval = GroupSearchloadfn();
}
function GroupSearchloadfn() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/MemberofLoad_New",
        data: {},
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("GroupSearch").clearAll();
                $$("GroupSearch").parse(rowDatad);
                $$("GroupSearch").refresh();
            }
        }
    });
    return rowDatad;
}

function DateTimeChanceCalc(e) {
    debugger;
    //Added by S.VijayaLakshmi''16.5.20
    
    var date = $$("DatePOP").getValue();
    //S.VijayaLakshmi''26/5/20
    date = date.substring(0, 10).toString();
    date = date.split('-')[2] + "/" + date.split('-')[1] + "/" + date.split('-')[0];
    var Time = $$("TimePop").getValue();
    
     // var DurationTime = $$("DurationPop").getValue();
    var DurationTime = $$("DurationPop").getValue();
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/TimeCalculation",
        cache: false,
        async: false,
        charset: 'utf-8',
        data: "DateTimeValue=" + date + "&Time=" + Time + "&CC_IND=" + DurationTime,
        success: function (data) {
            $$("ToPop").setValue(data.v);
        },
    });
}

function SourceLoadfn() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Source",
        id: 'SourcePOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    view: 'form',
                    elements: [
                        {
                            rows: [
                                {
                                    view: 'text',
                                    label: 'Source',
                                    id: 'SourceTxt',
                                    labelWidth: 80,
                                    minWidth: 300,
                                    inputWidth:370,

                                }
                            ]
                        }]
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
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Save',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var Val = $$("SourceTxt").getValue();
                                                    SourceSavefn(Val);
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("SourcePOP").hide();
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
}
function SourceSavefn(val) {
    var rowDatad = [];
    var BTN_TYPE = $("#BTN_TYPE").val();
    if (val != "") {
        $.ajax({
            type: "POST",
            url: "/SalesAndMarket/SaveSource",
            data: "BTN_TYPE=" + BTN_TYPE + "&Source=" + val,
            success: function (data) {
                var alertVal = data.v.ErrorMeg;
                if (alertVal == "Operation Failed.") {
                    alert(alertVal);
                }
                else if (alertVal == "Source already Exists.") {
                    alert(alertVal);
                }
                else if (alertVal == "Created Successfully.") {
                    var Source_List = LoadDropDown("SalesAndMarket", "SourceLoad");
                    $$("Source").define("options", Source_List);
                    $$("Source").refresh();
                    $$("SourcePOP").hide();
                    $$("Source").setValue(data.v.Source);
                }
            }
        });
    }
    else {
        alert("Source is Empty...");
    }
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
function DesignationLoadfn() {
    var DataRow = [];
    $.ajax({
        type: "POST",
        async: false,
        url: "/SalesAndMarket/DesignationLoad_New",
        data: {},
        success: function (data) {
            if (data != "") {
                DataRow = JSON.parse(data);
            }
        }
    });
    return DataRow;
}
function AssigntoLoadfn() {
    var DataRow = [];
    $.ajax({
        type: "POST",
        async: false,
        url: "/SalesAndMarket/AssignedToLoad_New",
        data: {},
        success: function (data) {
            if (data != "") {
                DataRow = JSON.parse(data);
            }
        }
    });
    return DataRow;
}

function ContactAddLoadfn() {
    debugger;
    var TitleTxt_list = TileLoadfn();
    var Designation_list = DesignationLoadfn();
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Contact Person Profile",
        id: 'ContactPersonPOP',
        modal: true,
        width: 800,
        close: true,
        body: {
            rows: [
                {
                    view: 'form',
                    elements: [
                        {
                            rows: [
                                {
                                    cols:
                                        [
                                            {
                                            view: 'text',
                                            label: 'Organization',
                                            id: 'OrganizationTxt',
                                            labelWidth: 100,
                                            inputWidth: 370,
                                            minWidth: 450,
                                            disabled: true,
                                            },
                                             {
                                                 view: 'checkbox',
                                                 labelRight: 'Active',
                                                 id: 'ChkActivepop',
                                                 labelWidth: 20,
                                                 value:1,
                                             },
                                        ]
                                },
                                {view:'label',label:' '

                                }, {
                                    cols: [
                                        {
                                            view: 'combo',
                                            label: 'Name',
                                            id: 'TitleTxt',
                                            labelWidth: 100,
                                            inputWidth: 220,
                                            minWidth: 100,
                                            options: TitleTxt_list,
                                            value: TitleTxt_list[0].id,
                                            height:20
                                        },
                                        {
                                            view: 'text',
                                            id: 'LastName',
                                            label: 'LastName',
                                            labelPosition:"top",
                                            labelWidth: 10,
                                            inputWidth: 270,
                                            minWidth: 280,
                                            attributes: { maxlength: 40 }
                                        },
                                        {
                                            view: 'text',
                                            id: 'FirstName',
                                            label: 'FirstName',
                                            labelPosition: "top",
                                            labelWidth: 10,
                                            inputWidth: 270,
                                            minWidth: 270,
                                            attributes: { maxlength: 40 }
                                        }

                                    ]
                                },
                                {
                                    cols: [
                                             {
                                                 view: "combo",
                                                 options: Designation_list,
                                                 label: 'Designation',
                                                 id: 'Designation',
                                                 labelWidth: 100,
                                                 minWidth: 350,
                                                 inputWidth: 370,
                                             },
                                               {
                                                   view: 'button',
                                                   value: 'N',
                                                   name: 'Designation_Btn',
                                                   id: 'Designation_Btn',
                                                   inputWidth: 30,
                                                   minWidth: 30,
                                                   on: {
                                                       onItemClick: function () {
                                                           DesignationLoadPopfn();
                                                       }
                                                   }
                                               }
                                    ]
                                },
                                {
                                    cols: [
                                             {
                                                 view: "text",
                                                 label: 'Mobile Phone',
                                                 id: 'MobilePhone',
                                                 labelWidth: 100,
                                                 minWidth: 350,
                                                 inputWidth: 330,
                                                 attributes: { maxlength: 40 }
                                             },
                                             {},
                                               {
                                                   view: "text",
                                                   label: 'Email 1',
                                                   id: 'Email1pop',
                                                   labelWidth: 70,
                                                   minWidth: 350,
                                                   inputWidth: 330,
                                                   attributes: { maxlength: 40 }
                                               }
                                    ]
                                },
                                {
                                    cols: [
                                             {
                                                 view: "text",
                                                 label: 'Official Phone',
                                                 id: 'OfficialPhonepop',
                                                 labelWidth: 100,
                                                 minWidth: 350,
                                                 inputWidth: 330,
                                                 attributes: { maxlength: 40 }
                                             },
                                             {},
                                               {
                                                   view: "text",
                                                   label: 'Email 2',
                                                   id: 'Email2pop',
                                                   labelWidth: 70,
                                                   minWidth: 350,
                                                   inputWidth: 330,
                                                   attributes: { maxlength: 40 }
                                               }
                                    ]
                                },
                                {
                                    
                                    view: "datepicker",
                                    label: 'DOB',
                                    id: 'DOB',
                                    labelWidth: 100,
                                    minWidth: 350,
                                    inputWidth: 250,
                                    format: "%d/%m/%Y",
                                },
                                 {
                                     view: "datepicker",
                                     label: 'Anniversary',
                                     id: 'Anniversary',
                                     labelWidth: 100,
                                     minWidth: 350,
                                     inputWidth: 250,
                                     format: "%d/%m/%Y",
                                 },
                                 {
                                     view: "textarea",
                                     label: 'Notes',
                                     id: 'Notespop',
                                     attributes: { maxlength:250 },
                                     labelWidth: 100,
                                     minWidth: 350,
                                     inputWidth: 450,
                                 },
                                   




                            ]
                        }]
                },
                {
                    view: 'form',
                    elements: [
                        {
                            cols: [
                                {},
                                {},
                                {},
                                {
                                    cols: [
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Save',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    debugger;
                                                    // var OrganizationContact = $$("OrganizationTxt").getValue();
                                                    var OrganizationContact="";
                                                    var Title = $$("TitleTxt").getText();
                                                    var Titleid = $$("TitleTxt").getValue();
                                                    var LastName = $$("LastName").getValue();
                                                    if (LastName == "") {
                                                        alert("LastName Cannot be Empty.");
                                                        webix.UIManager.setFocus($$('LastName'));
                                                        return false;
                                                    }
                                                    var FirstName = $$("FirstName").getValue();
                                                    if (FirstName == "") {
                                                        alert("FirstName Cannot be Empty.");
                                                        webix.UIManager.setFocus($$('FirstName'));
                                                        return false;
                                                    }
                                                    var Designation = $$("Designation").getText();
                                                    var DesignationId = $$("Designation").getValue();
                                                    //if (DesignationId == "") {
                                                    //    alert("Designation Cannot be Empty.");
                                                    //    webix.UIManager.setFocus($$('Designation'));
                                                    //    return false;
                                                    //}
                                                    var MobilePhone = $$("MobilePhone").getValue();
                                                    if (MobilePhone == "") {
                                                        alert("Mobile Phone Cannot be Empty.");
                                                        webix.UIManager.setFocus($$('MobilePhone'));
                                                        return false;
                                                    }
                                                    var Email1pop = $$("Email1pop").getValue();
                                                    if (Email1pop == "") {
                                                        alert("Email1 Cannot be Empty.");
                                                        webix.UIManager.setFocus($$('Email1pop'));
                                                        return false;
                                                    }
                                                    var OfficialPhonepop = $$("OfficialPhonepop").getValue();
                                                    //if (OfficialPhonepop == "") {
                                                    //    alert("Official Phone Cannot be Empty.");
                                                    //    webix.UIManager.setFocus($$('OfficialPhonepop'));
                                                    //    return false;
                                                    //}
                                                    var Email2pop = $$("Email2pop").getValue();
                                                    var DOB = $$("DOB").getValue();
                                                    //if (DOB == "") {
                                                    //    alert("DOB Cannot be Empty.");
                                                    //    webix.UIManager.setFocus($$('DOB'));
                                                    //    return false;
                                                    //}
                                                    var Anniversary = $$("Anniversary").getValue();
                                                    //if (Anniversary == "") {
                                                    //    alert("Anniversary Cannot be Empty.");
                                                    //    webix.UIManager.setFocus($$('Anniversary'));
                                                    //    return false;
                                                    //}
                                                    var Notespop = $$("Notespop").getValue();
                                                    //if (Notespop == "") {
                                                    //    alert("Notes Cannot be Empty.");
                                                    //    webix.UIManager.setFocus($$('Notespop'));
                                                    //    return false;
                                                    //}
                                                    debugger;
                                                    var ChkActivepop = $$("ChkActivepop").getValue();
                                                    debugger;
                                                    var ContactType = $("#ContactType").val();
                                                    if (ContactType == "" || ContactType==undefined ) {
                                                        if ($('#ContactRow').val() != "") {
                                                            var selectedRows = $$('ContactGrid').getSelectedItem($('#ContactRow').val());
                                                            selectedRows[0].Title = Title;
                                                            selectedRows[0].LastName = LastName;
                                                            selectedRows[0].FirstName = FirstName;
                                                            selectedRows[0].DesignationTxt = Designation;
                                                            selectedRows[0].OfficialPhone = OfficialPhonepop;
                                                            selectedRows[0].Emailid = Email1pop;
                                                            selectedRows[0].TitleID = Titleid;
                                                            selectedRows[0].Designation = DesignationId;
                                                            selectedRows[0].ActiveContact = ChkActivepop;
                                                            selectedRows[0].StrDate = DOB;
                                                            selectedRows[0].StringDate = Anniversary;
                                                        }
                                                        else {
                                                            var addrow = {
                                                                Title: Title, LastName: LastName, FirstName: FirstName,
                                                                DesignationTxt: Designation, OfficialPhone: OfficialPhonepop, Emailid: Email1pop,
                                                                Mobileno: MobilePhone, Email2: Email2pop, ContactNotes: Notespop,
                                                                TitleID: Titleid, Designation: DesignationId, ActiveContact: ChkActivepop,
                                                                StrDate: DOB, StringDate: Anniversary
                                                            };
                                                            $$("ContactGrid").add(addrow);
                                                        }
                                                        $$('ContactGrid').refresh();
                                                    }
                                                    else//else Part Added by S.VijayaLakshmi''29/5/20
                                                    {
                                                        var ORGID = $("#ORGID").val();
                                                        var ContPersonID = $$("Contact_Name").getValue();
                                                        var Individual = "2";
                                                        if ($$("Individual").getValue(1)) {
                                                            Individual = "1";
                                                        }
                                                        var paramValue = JSON.stringify({
                                                            Title: Title, LastName: LastName, FirstName: FirstName, OrganizationContact: OrganizationContact,
                                                            DesignationTxt: Designation, OfficialPhone: OfficialPhonepop, Emailid: Email1pop, Mobileno: MobilePhone, Email2: Email2pop,
                                                            ContactNotes: Notespop, TitleID: Titleid, Designation: DesignationId, ORGID: ORGID, Individual: Individual,
                                                            ActiveContact: ChkActivepop, ContPersonID: ContPersonID, DOB: DOB, Anniversary: Anniversary
                                                        });
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json",
                                                            accepts: "application/json",
                                                            dataType: "json",
                                                            url: "/SalesAndMarket/ContactPerson_Save",
                                                            cache: false,
                                                            charset: 'utf-8',
                                                            data: paramValue,
                                                            success: function (data) {
                                                                var Contper = LoadDropDown("SalesAndMarket", "ContactPersonDropDown");
                                                                if (Contper != "") {
                                                                    $$("Contact_Name").define('options', Contper)
                                                                    $$("Contact_Name").refresh();
                                                                }
                                                                $$("Contact_Name").setValue(data.v.ID);
                                                            }
                                                        })
                                                    }
                                                    
                                                    $$("ContactPersonPOP").hide();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("ContactPersonPOP").hide();
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
}
function ActivityAddLoadfn() {
    debugger;
    var Assignto_list = AssigntoLoadfn();
    var DurationTime = LoadDropDown("SalesAndMarket", "DurationTimeLoad");
    var StatusLoad = LoadDropDown("SalesAndMarket", "StatusLoad");
    var ActioTypeload = LoadDropDown("SalesAndMarket", "ActioTypeload");   
    var PriorityLoad = LoadDropDown("SalesAndMarket", "PriorityLoad");
    var ContactPersonDropDown = LoadDropDown("SalesAndMarket", "ContactPersonDropDown");
    var dateval = CurrentDateLoad();


    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Activity - Creation",
        id: 'ActivityPOP',
        modal: true, 
        width: 800,
        close: true,
        body: {
            rows: [
                {
                    view: 'form',
                    elements: [
                        {
                            rows: [
                                {
                                    cols:
                                        [
                                            {
                                                view: 'text',
                                                label: 'Organization',
                                                id: 'ActiveOrganizationTxt',
                                                labelWidth: 110,
                                                inputWidth: 370,
                                                minWidth: 450,
                                                disabled:true,
                                            },
                                             {
                                                 view: 'checkbox',
                                                 labelRight: 'Notification',
                                                 id: 'ActiveChkActivepop',
                                                 labelWidth: 20,
                                             },
                                        ]
                                },
                                 {
                                     cols: [
                                              {
                                                  view: "combo",
                                                  label: 'Prior To',
                                                  id: 'PriorTo',
                                                  labelWidth: 110,
                                                  minWidth: 350,
                                                  inputWidth: 330,
                                                  options: PriorityLoad,
                                                  hidden: true,
                                              },
                                              {},
                                                {
                                                    view: "combo",
                                                    id: 'ActivityType',
                                                    labelWidth: 10,
                                                    minWidth: 350,
                                                    inputWidth: 330,
                                                    options: ActioTypeload,
                                                    hidden: true,
                                                }
                                     ]
                                 },
                                  {
                                      cols: [
                                               {
                                                   view: "text",
                                                   label: 'OrganizationActivity',
                                                   id: 'OrganizationActivity',
                                                   labelWidth: 70,
                                                   minWidth: 350,
                                                   inputWidth: 330,
                                                   hidden: true,
                                               },
                                               {},
                                                 {
                                                     view: "text",
                                                     label: 'Opportunity',
                                                     id: 'Opportunity',
                                                     labelWidth: 70,
                                                     minWidth: 350,
                                                     inputWidth: 330,
                                                     hidden: true,
                                                 }
                                      ]
                                  },
                                        {
                                            view: 'text',
                                            label: 'ToDo',
                                            id: 'ToDoTxt',
                                            labelWidth: 110,
                                            minWidth: 350,
                                            inputWidth: 370,
                                            attributes: { maxlength: 50 }
                                        },
                                     
                                
                                {
                                    cols: [
                                             {
                                                 view: "combo",
                                                 label: 'Assigned To',
                                                 id: 'Assigned_Topop',
                                                 labelWidth: 110,
                                                 minWidth: 350,
                                                 inputWidth: 330,
                                                 options: Assignto_list,
                                                 value: SALE_PER_ID
                                             },
                                             {},
                                               {
                                                   view: "text",
                                                   label: 'Subject',
                                                   id: 'Subjectpop',
                                                   labelWidth: 70,
                                                   minWidth: 350,
                                                   inputWidth: 330,
                                                   attributes: { maxlength: 50 }
                                               }
                                    ]
                                },
                                {
                                    cols: [
                                        {
                                            view: "datepicker",
                                            label: 'Date',
                                            id: 'DatePOP',
                                            labelWidth: 110,
                                            minWidth: 270,
                                            inputWidth: 250,
                                            value: dateval,
                                            stringResult: true,
                                            format:"%d/%m/%Y"  //"dd/MM/yyyy"


                                        },
                                        {
                                            view: "combo",
                                            options: DurationTime,
                                            //options: [],
                                            label: 'Time',
                                            id: 'TimePop',
                                            labelWidth: 50,
                                            minWidth: 90,
                                            inputWidth: 140,
                                            //S.VijayaLakshmi''16/5/20
                                            value: DurationTime[5].id,
                                            
                                            on: {
                                                onChange: function () {
                                                    DateTimeChanceCalc();
                                                }
                                            }
                                           
                                          
                                        },
                                        {
                                            view: "combo",
                                            options: DurationTime,
                                            label: 'Duration ',
                                            id: 'DurationPop',
                                            labelWidth: 70,
                                            minWidth: 150,//170,
                                            inputWidth:150,// 170,
                                            value: DurationTime[5].id,
                                            on: {
                                                onChange: function () {
                                                    DateTimeChanceCalc();
                                                }
                                            }
                                        }, {
                                            view: 'label',
                                            label: "Hrs",
                                            labelWidth: 40,
                                            minWidth: 40,
                                            maxWidth: 60,
                                        },
                                        { 
                                            view: "combo",
                                            //options: [],
                                            options:DurationTime,
                                            label:'To',
                                            id: 'ToPop',
                                            labelWidth: 30,//30,
                                            minWidth: 150,
                                            inputWidth: 130,
                                           // labelAlign: 'left',
                                            value: DurationTime[5].id,
                                        },
                                    ]
                                },
                                {
                                    view: "combo",
                                    label: 'Status',
                                    id: 'Statuspop',
                                    labelWidth: 110,
                                    minWidth: 350,
                                    inputWidth: 330,
                                    hidden: true,
                                    options: StatusLoad,
                                    value:1
                                },
                                {
                                    cols: [
                                             {
                                                 view: "combo",
                                                 label: 'Type',
                                                 id: 'Typepop',
                                                 labelWidth: 110,
                                                 minWidth: 350,
                                                 inputWidth: 330,
                                                 options: ActioTypeload
                                             },
                                             {},
                                               {
                                                   view: "combo",
                                                   label: 'Priority',
                                                   id: 'Prioritypop',
                                                   labelWidth:70,
                                                   minWidth: 350,//350,
                                                   inputWidth:200,// 330,
                                                   options: PriorityLoad,
                                                   value: PriorityLoad[0].id
                                               }
                                    ]
                                },
                                {
                                    cols: [
                                             {
                                                 view: "combo",
                                                 options: ContactPersonDropDown,
                                                 label: 'Contact Name',
                                                 id: 'Contact_Name',
                                                 labelWidth: 110,
                                                 minWidth: 350,
                                                 inputWidth: 370,

                                             },
                                               {
                                                   view: 'button',
                                                   value: 'N',
                                                   name: 'Contact_Name_Btn',
                                                   id: 'Contact_Name_Btn',
                                                   inputWidth: 30,
                                                   minWidth: 30,
                                                   on: {
                                                       onItemClick: function () {
                                                           // SourceLoadfn();
                                                           ContactAddLoadfn();
                                                           $("#ContactType").val("1");//S.VijayaLakshmi''29/5/20
                                                           $$("OrganizationTxt").setValue($$("Organization").getValue());//S.VijayaLakshmi''29/5/20
                                                       }
                                                   }
                                               }
                                    ]
                                },
                                 {
                                     view: "text",
                                     label: 'Location',
                                     id: 'Locations',
                                     labelWidth: 110,
                                     minWidth: 350,
                                     inputWidth: 450,
                                     hidden: true,
                                     attributes: { maxlength: 50 }
                                 },
                                
                                 {
                                     view: "textarea",
                                     label: 'Comments',
                                     id: 'Commentspop',
                                     labelWidth: 110,
                                     minWidth: 350,
                                     inputWidth: 450,
                                     attributes: { maxlength: 2000 }
                                 },
                                  {
                                      view: 'checkbox',
                                      labelRight: 'Closed Activity',
                                      id: 'ClosedActivity',
                                      labelWidth: 20,
                                      hidden:true
                                  },
                                  {
                                      view: 'checkbox',
                                      labelRight: 'Canceled Activity',
                                      id: 'CanceledActivity',
                                      labelWidth: 20,
                                      hidden: true
                                  },





                            ]
                        }]
                },
                {
                    view: 'form',
                    elements: [
                        {
                            cols: [
                                {},
                                {},
                                {},
                                {
                                    cols: [
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Save',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    debugger;
                                                    var BTN_TYPE = $("#BTN_TYPE").val();
                                                    var OrganaizationType = $("#OrganaizationType").val();
                                                    if (BTN_TYPE == "NEW") {
                                                        if (OrganaizationType == "2") {
                                                            BTN_TYPE = "OPEN";
                                                        }
                                                    }
                                                    var R = $('#PageGetId').val();
                                                    
                                                    var LeadOpp = $$("OrganizationActivity").getValue();
                                                    debugger;
                                                    //===S.Vijayalakshmi //20/5/20
                                                    //var Organization = $$("OrganizationActivity").getValue();
                                                    var Organization = $$("ActiveOrganizationTxt").getValue();
                                                    var AlertonDueDt = $$("ActiveChkActivepop").getValue();
                                                    //
                                                    
                                                    var subject = $$("Subjectpop").getValue();
                                                    var date = $$("DatePOP").getValue();
                                                    var Time = $$("TimePop").getValue();
                                                    var AssignedTo = $$("Assigned_Topop").getText();
                                                    var Status = $$("Statuspop").getText();
                                                    var OrgType = $$("Typepop").getText();
                                                    var StatusID = $$("Statuspop").getValue();
                                                    var Assignedtoid = $$("Assigned_Topop").getValue();
                                                    var Comments = $$("Commentspop").getValue();
                                                    var Locations = $$("Locations").getValue();
                                                    var ContType = $$("Typepop").getValue();
                                                    var ContPersonID = $$("Contact_Name").getValue();                                                    
                                                    if (ContPersonID == "" || ContPersonID == undefined || ContPersonID == null || ContPersonID == "0") {
                                                        alert(" Contact Name Cannot be Empty.");
                                                        return false;
                                                    }

                                                    var ContPersonNM = $$("Contact_Name").getText();
                                                    var PriorityId = $$("Prioritypop").getValue();
                                                    if (PriorityId == "" || PriorityId == undefined || PriorityId == null) {
                                                       alert(" Priority Cannot be Empty.");
                                                        return false;
                                                    }

                                                   

                                                    var Activity_S_NO = $("#Activity_S_NO").val();
                                                    var Activity_S_ID = $("#Activity_S_ID").val();
                                                    var OrganizationId = $("#ORGID").val();

                                                    var DurationTime = $$("DurationPop").getValue();
                                                    if (DurationTime == "" || DurationTime == undefined || DurationTime == null || DurationTime == "0") {
                                                        alert(" Duration Cannot be Empty.");
                                                        return false;
                                                    }
                                                    var ToTime = $$("ToPop").getValue();

                                                    var DateValidation = "";
                                                    var Stringdate = "";
                                                    var StatusValidate = "";
                                                    var ClosedActivity = "";
                                                    if ($$("ClosedActivity").getValue() == 1) {
                                                        ClosedActivity = "1";
                                                        $$("Statuspop").setValue("7");
                                                    }
                                                    else if ($$("CanceledActivity").getValue() == 1) {
                                                        $$("Statuspop").setValue("9");
                                                    }
                                                    else {
                                                        $$("Statuspop").setValue("1");
                                                    }
                                                    if (date != "") {
                                                        if (ClosedActivity == "1") {
                                                            $.ajax({
                                                                type: "POST",
                                                                url: "/SalesAndMarket/ActivityDateValidation",
                                                                data: "Date=" + date,
                                                                success: function (data) {
                                                                    if (data.v.ID == "2") {
                                                                        SavenewActivities();
                                                                    } else {
                                                                        alert(" Close Activity Date Cannot be greater than Today's Date.");
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            SavenewActivities();
                                                            //$$("ActivityPOP").hide();
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("ActivityPOP").hide();
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
    $$("ToPop").disable();
}

function DesignationLoadPopfn() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Designation",
        id: 'DesignationPOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    view: 'form',
                    elements: [
                        {
                            rows: [
                                {
                                    view: 'text',
                                    label: 'Designation',
                                    id: 'DesignTxt',
                                    labelWidth: 100,
                                    minWidth: 300,
                                    inputWidth: 350,

                                }
                            ]
                        }]
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
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Save',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var Val = $$("DesignTxt").getValue();
                                                    DesingationSavefn(Val);
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("DesignationPOP").hide();
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
}
function DesingationSavefn(val) {
    var rowDatad = [];
    var BTN_TYPE = $("#BTN_TYPE").val();
    if (val != "") {
        $.ajax({
            type: "POST",
            url: "/SalesAndMarket/SaveDesignation",
            data: "BTN_TYPE=" + BTN_TYPE + "&Designation=" + val,
            success: function (data) {
                var alertVal = data.v.ErrorMeg;
                if (alertVal == "Operation Failed.") {
                    alert(alertVal);
                }
                else if (alertVal == "Designation already Exists.") {
                    alert(alertVal);
                }
                else if (alertVal == "Created Successfully.") {
                    debugger;
                    var Designation_list = DesignationLoadfn();
                    $$("Designation").define("options", Designation_list);
                    $$("Designation").refresh();
                    
                    $$("DesignationPOP").hide();
                    $$("Designation").setValue(data.v.Source);
                    $$("Designation").setValue(data.v.Designation);//S.VijayaLakshmi''29/5/20
                }
            }
        });
    }
    else {
        alert("Designation is Empty...");
    }
}

function gridSearchLoad() {
    debugger;
    var rowDatad = [];
    var Inact = $$("InactiveSalesPer").getValue();//S.VijayaLakshmi''28/5/20
    if (Inact = "0") Inact = "";
    var FromUpDate = "";
    var UptoDate = "";
    var Closecheck = "";
    if ($$("ChkClose").getValue(1))
    {
        Closecheck = "1";
        UptoDate = $$("From_Date").getValue();
        if (UptoDate != "")
        {
            UptoDate = UptoDate.substring(0, 10).toString();
            UptoDate = UptoDate.split('-')[2] + "/" + UptoDate.split('-')[1] + "/" + UptoDate.split('-')[0];
        }
       

      
    }
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/LeadOpportunityLGridLoad",
        // data: {},
        data: "InactiveUser=" + Inact + "&FromUpDate=" + FromUpDate + "&UptoDate=" + UptoDate + "&Closecheck=" + Closecheck,
        async: false,
        success: function (d) {
            if (d != "") {
                rowDatad = d;
                $$("LeadOpportunityLGrid1").clearAll();
                $$("LeadOpportunityLGrid1").parse(rowDatad);
                $$("LeadOpportunityLGrid1").refresh();
            }
        }
    });
    return rowDatad;
}
function LOPopUpLoadfn(AA_IND, BB_IND, A10_IND, AF_IND) {
    var LeadOppPageID = $("#LeadOppPageID").val();
    var title = LeadOppPageID == 1 || LeadOppPageID == 3 ? "Lead Search" : "Opportunity Search";
    //var dataval = gridSearchLoad();
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: title,
        id: 'LOSearchPOP',
        modal: true,
        width: 1200,
        close: true,
        body: {
            rows: [
                {
                    cols: [
                        {
                            view: 'checkbox',
                            labelRight: 'Inactive SalesPerson',
                            id:'InactiveSalesPer',//S.VijayaLakshmi''28/5/20
                            labelWidth: 30,

                            on: {
                                onChange: function (valnew, oldval) {
                                    gridSearchLoad();//S.VijayaLakshmi''28/5/20
                                }}
                        },
                        {},
                        {},
                        {
                            view: 'checkbox',
                            labelRight: 'Closed',
                            id:'ChkClose',
                            labelWidth: 30,
                            on: {
                                onChange: function () {
                                    gridSearchLoad();
                                    if (this.getValue() == 1) {
                                        $$("From_Date").enable();
                                    }
                                    else {
                                        $$("From_Date").disable();
                                    }
                                }
                            }
                        },
                    {
                        view: 'datepicker',
                        label: 'From Dt',
                        id: 'From_Date',
                        labelWidth: 60,
                        inputWidth: 190,
                        disabled:true,
                        minWidth: 190,
                        //S.VijayaLakshmi''25/5/20
                        stringResult: true,
                        format: "%d/%m/%Y",
                        on: {
                            onChange: function () {
                                gridSearchLoad();
                            }
                        }
                        //
                    }
                    ]
                },
                {
                    type: "space",
                    responsive: true,
                    id: "LeadOpportunityLGrid1",
                    container: "LeadOpportunityLGrid",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "Lead", header: [LeadOppPageID == "2" || LeadOppPageID == "5" ? 'Opportunity' : 'Lead', { content: "textFilter" }], width: 260, },
                            { id: "Organization", header: ['Organization', { content: "textFilter" }], width: 240, css: { 'text-align': 'left ! important' } },
                            { id: "Status", header: ['Status', { content: "textFilter" }], width: 80, css: { 'text-align': 'center ! important' } },
                            { id: "StrDate", header: ['CloseDt', { content: "textFilter" }], width: 100, css: { 'text-align': 'left ! important' } },
                            { id: "AssignedTo", header: ['AssignedTo', { content: "textFilter" }], width: 130, },
                            { id: "City", header: ['Area', { content: "textFilter" }], width: 150, },
                            { id: "Stage", header: ['Stage', { content: "textFilter" }], width: 130, css: { 'text-align': 'left ! important' } },
                            { id: "Probility", header: ['Probability', { content: "textFilter" }], width: 90, },
                            { id: "Citynm", hidden: true },
                            { id: "OrganizationId", hidden: true },
                            { id: "Leadid", hidden: true },
                            { id: "StatusID", hidden: true },
                            { id: "Assignedtoid", hidden: true },
                            { id: "Source", hidden: true },
                            { id: "CityId", hidden: true },
                            { id: "Stageid", hidden: true },
                            { id: "Probilityid", hidden: true },
                            { id: "Notes", hidden: true },
                            { id: "ClientType", hidden: true },
                            { id: "DueDate", hidden: true },
                            { id: "Phone1", hidden: true },
                            { id: "Designation", hidden: true },
                            { id: "Website", hidden: true },
                            { id: "PriorityId", hidden: true },
                            { id: "Product", hidden: true },
                            { id: "ProjectedValue", hidden: true },
                            { id: "ClosureDate", hidden: true },
                            { id: "ProjectionValue", hidden: true },
                            { id: "ProjectionDate", hidden: true },
                            { id: "Consultant", hidden: true },
                            { id: "Consultantid", hidden: true },
                            { id: "Activeind", hidden: true },
                            { id: "Area", hidden: true },
                            { id: "ProposalDate", hidden: true },
                            { id: "Activeind", hidden: true },
                            { id: "Area", hidden: true },
                            { id: "ReferenceNo", hidden: true },
                            { id: "RMT_ID", hidden: true },
                            { id: "Lost_Reason", hidden: true },
                            { id: "Lost_TO_ID", hidden: true },
                            { id: "Lost_TO_NM", hidden: true },
                            { id: "PoNo", hidden: true },
                            { id: "Podt", hidden: true },
                            { id: "AdvanceAmt", hidden: true },
                            { id: "AdvanceDt", hidden: true },
                    ],
                    
                    // data: dataval,
                    data:[],
                    height: 460,
                    on: {
                        'onItemDblClick': function (id) {
                            debugger;
                            
                            var selectedRows = this.getSelectedItem(id.row);
                            var LeadOppPageID = $("#LeadOppPageID").val();
                            var OrganizationId = selectedRows[0].OrganizationId;
                            var Organization = selectedRows[0].Organization;
                            var Lead = selectedRows[0].Lead;
                            Lead_id = selectedRows[0].Leadid;
                            var Leadid = selectedRows[0].Leadid;
                            var Status = selectedRows[0].Status;
                            var StatusID = selectedRows[0].StatusID;
                            var StrDate = selectedRows[0].StrDate;
                            var DueDate = selectedRows[0].DueDate;

                            var AssignedTo = selectedRows[0].AssignedTo;
                            var City = selectedRows[0].Citynm;
                            var CityId = selectedRows[0].CityId;
                            var Stage = selectedRows[0].Stage;
                            var Stageid = selectedRows[0].Stageid;
                            var Probility = selectedRows[0].Probility;
                            var Probilityid = selectedRows[0].Probilityid;

                            var Assignedtoid = selectedRows[0].Assignedtoid;
                            var Notes = selectedRows[0].Notes;
                            var ClientType = selectedRows[0].ClientType;
                            var Source = selectedRows[0].Source;
                            var Phone1 = selectedRows[0].Phone1;
                            var Designation = selectedRows[0].Designation;
                            var Website = selectedRows[0].Website;
                            var PriorityId = selectedRows[0].PriorityId;
                            var Product = selectedRows[0].Product;
                            var ProjectedValue = selectedRows[0].ProjectedValue;
                            var ClosureDate = selectedRows[0].ClosureDate;
                            var ProjectionValue = selectedRows[0].ProjectionValue;
                            var ProjectionDate = selectedRows[0].ProjectionDate;
                            var Consultant = selectedRows[0].Consultant;
                            var Consultantid = selectedRows[0].Consultantid;
                            var Activeind = selectedRows[0].Activeind;
                            var Area = selectedRows[0].Area;
                            var ProposalDate = selectedRows[0].ProposalDate;
                            var ReferenceNo = selectedRows[0].ReferenceNo;
                            debugger;
                            var RMT_ID = selectedRows[0].RMT_ID;

                            var Lost_Reason = selectedRows[0].Lost_Reason;
                            var Lost_TO_ID = selectedRows[0].Lost_TO_ID;
                            var Lost_TO_NM = selectedRows[0].Lost_TO_NM;

                            var PoNo = selectedRows[0].PoNo;
                            var Podt = selectedRows[0].Podt;
                            var AdvanceAmt = selectedRows[0].AdvanceAmt;
                            var AdvanceDt = selectedRows[0].AdvanceDt;


                            var PopUp = $("#PopUp").val();
                            var BTN_TYPE = $("#BTN_TYPE").val();
                            debugger;
                            if (PopUp == "1") {
                                $("#ORGID").val(OrganizationId);
                                $$("Organization").setValue(Organization);
                                $("#OrganizationActivity").val(Organization);
                                $$("LOText").setValue(Lead);
                                $("#LeadOpprtunityID").val(Leadid);
                                $("#AreaID").val(Area);
                                //  $("#LOArea").data("kendoDropDownList").value(Area);
                                if ($$("LOArea_Load") != null || $$("LOArea_Load") != undefined)
                                    $$("LOArea_Load").setValue(Area);
                                if (Activeind == "1") {
                                    $$("Individual").setValue(1);

                                } else {
                                    $$("Individual").setValue(0);
                                }
                                var Individual = "2";
                                if (Activeind == "1") Individual = "1";
                                $.ajax({
                                    type: "POST",
                                    url: "/SalesAndMarket/OrganaizationID",
                                    data: "orgId=" + OrganizationId + "&Organization=" + Organization + "&Individual=" + Individual,
                                    cache: false,
                                    charset: 'utf-8',
                                    success: function (data) {
                                        $("#ContCompanyNm").data("kendoDropDownList").dataSource.read();
                                    }
                                });
                            }
                            else {
                                var A10_IND = A10_IND;
                                if (A10_IND == "1") {
                                    $$("Property").enable();
                                    $$("Property").setValue(RMT_ID);
                                    $("#Property").show();
                                }
                                else {
                                    $$("Property").disable();
                                    $$("Property").setValue("");
                                    $("#Property").hide();
                                }
                                //Lead Opportunity AMenment Apliicable based on Setting
                                if (StatusID == "5" || StatusID == "8") {
                                    var AF_IND = AF_IND;

                                    if (AF_IND == "1") $$('LOBtn2').hide();
                                    else { $$('LOBtn2').show(); }
                                  
                                    $$("Stage").setValue(Stageid);
                                    if (Stageid == "14") {
                                        $$("POFrm").show();
                                        $$("Won_CommentsFrm").show();
                                        $$("Lost_CommentsFrm").hide();
                                    }
                                    else if (Stageid == "13") {
                                        $$("Lost_CommentsFrm").show();
                                        $$("POFrm").hide();
                                        $$("Won_CommentsFrm").hide();
                                    }
                                    else {
                                        $$("POFrm").hide();
                                        $$("Won_CommentsFrm").hide();
                                        $$("Lost_CommentsFrm").hide();
                                    }

                                    if (StatusID == "5") {
                                        $$("Won_Comments").setValue(Lost_Reason);
                                        $$("PO_No").setValue(PoNo);
                                        $$("PO_Dt").setValue(Podt);
                                        $$("Advance_Amt").setValue(AdvanceAmt);
                                        $$("POAMtDt").setValue(AdvanceDt);
                                    }
                                    else {
                                        $$("Lost_To").setValue(Lost_TO_NM);
                                        $("#Lost_TO_ID").val(Lost_TO_ID);
                                        $$("Lost_Reason").setValue(Lost_Reason);
                                    }
                                }
                                else { $$('LOBtn2').show(); }
                                $$("Property").setValue(RMT_ID);
                                $$("Phone1").setValue(Phone1);
                                $$("Website").setValue(Website);
                                $$("LeadDesignation").setValue(Designation);
                                $$("Consultant").setValue(Consultant);
                                $('#ConsultantID').val(Consultantid);
                                // $("#PriorityLead").data("kendoDropDownList").value(PriorityId);
                                $$("Prioritfy").setValue(PriorityId);
                                $$("Probability").setValue(Product);
                                var dt1 = ClosureDate;
                                dt1 = dt1.split('/');
                                dt1 = new Date(parseInt(dt1["2"]), parseInt(dt1["1"]) - 1, parseInt(dt1["0"]));
                                ClosureDate = dt1;
                                $$("Expected_Closure_Date").setValue(ClosureDate);
                                $$("Projection_Value").setValue(ProjectionValue);
                                if (ProjectionValue != "" && ProjectionValue != null && ProjectionValue != undefined) {
                                    $$("Projection_Value").setValue(ProjectionValue.toFixed(2));
                                }
                                $("#OLDPROJVALUE").val(ProjectionValue);
                                debugger;
                                 dt1 = ProjectionDate;
                                dt1 = dt1.split('/');
                                dt1 = new Date(parseInt(dt1["2"]), parseInt(dt1["1"]) - 1, parseInt(dt1["0"]));
                                ProjectionDate = dt1;
                                $$("Projected_Closure_Date").setValue(ProjectionDate);
                                $$("Reference_No").setValue(ReferenceNo);
                                $$("First_Proposal_Dat").setValue(ProposalDate);
                              //  $$("ProjectionDate").setValue(ProjectionDate);
                                //$("#CityIDD").val(CityId);
                                //$$("City").setValue(City);
                                //S.VijayaLakshmi''21/5/20
                                debugger;
                                var dt = DueDate
                                dt = dt.split('/');
                                dt = new Date(parseInt(dt["2"]), parseInt(dt["1"]) - 1, parseInt(dt["0"]));
                                DueDate = dt;
                                //
                                $$("Due_Date").setValue(DueDate);
                                $("#ORGID").val(OrganizationId);
                                $$("Organization").setValue(Organization);
                                $("#OrganizationActivity").val(Organization);
                                if ($$("Area") != null || $$("Area") != undefined)
                                    $$("Area").setValue(Area);
                                $$("LOText").setValue(Lead);
                                $("#LeadOpprtunityID").val(Leadid);
                                $$("Comments").setValue(Notes);
                                //
                                if (ClientType == "1") {
                                    $$("Type").setValue(2);
                                } else {
                                    $$("Type").setValue(1);
                                }
                                if (Activeind == "1") {
                                    $$("Individual").setValue(1);
                                    $("#orglabelNm").text("Individual");

                                   
                                    $$("Individual").enable();
                                    $("#INDIVORGID").val(OrganizationId);
                                    $("#INDIVNAME").val(Organization);
                                 
                                } else {
                                    $$("Individual").setValue(0);
                                    $("#orglabelNm").text("Organization");
                                   
                                    $$("Individual").disable();
                                    $("#INDIVORGID").val("");
                                    $("#INDIVNAME").val("");
                                }
                                $$("Stage").setValue(Stageid);
                                $$('Source').setValue(Source);
                                $$("Assigned_To").blockEvent();
                                $$("Assigned_To").setValue(Assignedtoid);
                                $$("Assigned_To").unblockEvent();
                                if (Leadid != "") {
                                    var Individual = "2";
                                    if (Activeind == "1") Individual = "1";
                                    $.ajax({
                                        type: "POST",
                                        url: "/SalesAndMarket/OrganaizationID",
                                        data: "orgId=" + OrganizationId + "&Organization=" + Organization + "&Individual=" + Individual,
                                        cache: false,
                                        async: false,
                                        charset: 'utf-8',
                                        success: function (data) {
                                        }
                                    });

                                    $.ajax({
                                        type: "POST",
                                        url: "/SalesAndMarket/LeadOppIDARG",
                                        data: "LeadOppID=" + Leadid + "&LeadOppNM=" + Lead + "&ORGID=" + OrganizationId + "&Organization=" + Organization,
                                        cache: false,
                                        charset: 'utf-8',
                                        async: false,
                                        success: function (data) {
                                            Load_ActivityInfo();
                                            if (LeadOppPageID == "2") {
                                                Load_ProductInfo();
                                            }
                                        }
                                    });

                                    //$.ajax({
                                    //    type: "POST",
                                    //    url: "/SalesAndMarket/LogIDArgs",
                                    //    data: "LogID=" + Leadid,
                                    //    async: false,
                                    //    success: function (data) {
                                    //        if (data.v != 0) {
                                    //            $("#Log").removeClass("btnButton");
                                    //            $("#Log").removeClass("btnNoCount");
                                    //            $("#Log").addClass("btnCount");
                                    //        }
                                    //        else {
                                    //            $("#Log").removeClass("btnButton");
                                    //            $("#Log").removeClass("btnCount");
                                    //            $("#Log").addClass("btnNoCount");
                                    //        }
                                    //    }
                                    //});
                                }

                                
                                $.ajax({
                                    type: "POST",
                                    url: "/SalesAndMarket/LeadSecAssignedLoad",
                                    data: "LeadOppID=" + Leadid + "&LeadOppNM=" + Lead + "&ORGID=" + OrganizationId + "&Organization=" + Organization,
                                    cache: false,
                                    charset: 'utf-8',
                                    async: false,
                                    success: function (data) {
                                        //
                                        $$("SecAssigned").clearAll();
                                        $$("SecAssigned").parse(data.v);
                                    }
                                });
                            }
                            //S.VijayaLakshmi''28/5/20
                            $$("Organization_Btn1").hide();
                            $$("Organization_Btn2").hide();
                            $$("LOSearchPOP").hide();
                            this.clearAll();
                        },
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
                                     view: 'label',
                                     label: ' ',
                                     name: 'label1',
                                     id: 'label1',
                                     labelWidth: 100,
                                 },
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
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Refresh',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                   
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("LOSearchPOP").hide();
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
    var dataval = gridSearchLoad();//S.VijayaLakshmi''28/5/20
    
}

function LOLoadPopfn() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Amend Lead/Opportunity Name",
        id: 'AmendLOPOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    view: 'form',
                    elements: [
                        {
                            rows: [
                                {
                                    view: 'text',
                                    label: 'Existing',
                                    id: 'ExistingTxt',
                                    labelWidth: 100,
                                    minWidth: 300,
                                    inputWidth: 350,

                                },
                                 {
                                     view: 'text',
                                     label: 'Amend To',
                                     id: 'Amend_To_Txt',
                                     labelWidth: 100,
                                     minWidth: 300,
                                     inputWidth: 350,

                                 }
                            ]
                        }]
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
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Save',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                
                                                onItemClick: function () {
                                                    debugger;
                                                    
                                                    fnAmendLeadOpp();//S.VijayaLakshmi''28.5.20
                                                }
                                                     }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("AmendLOPOP").hide();
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
}
function fnAmendLeadOpp()
{
    debugger;
    //Added by S.VijayaLakshmi''28/5/20
    var rowDatad = [];
    var BTN_TYPE = $("#BTN_TYPE").val();
    var AmendName = $$("Amend_To_Txt").getValue();
    var LeadOpprtunityID = $("#LeadOpprtunityID").val();
    var LeadOppPageID = $("#LeadOppPageID").val();
    if (AmendName != "") {
        $.ajax({
            type: "POST",
            url: "/SalesAndMarket/LeadOppoNmAmend",
            data: "AmendName=" + AmendName + "&LeadOpprtunityID=" + LeadOpprtunityID + "&LeadOppPageID=" + LeadOppPageID,
            success: function (data) {
                if (data.v.ErrorMeg == "Updated Successfully.") {
                    $$("LOText").setValue(AmendName);
                    $$("Amend_To_Txt").getValue();
                    $$("AmendLOPOP").hide();
                }
            }
        });

    }
    else {

        alert(" Amend To Cannot be Empty. ");
    }

}
function LOSavefn(val) {
    debugger;
    var rowDatad = [];
    var BTN_TYPE = $("#BTN_TYPE").val();
    if (val != "") {
        $.ajax({
            type: "POST",
            url: "/SalesAndMarket/SaveDesignation",
            data: "BTN_TYPE=" + BTN_TYPE + "&Designation=" + val,
            success: function (data) {
                var alertVal = data.v.ErrorMeg;
                if (alertVal == "Operation Failed.") {
                    alert(alertVal);
                }
                else if (alertVal == "Designation already Exists.") {
                    alert(alertVal);
                }
                else if (alertVal == "Created Successfully.") {
                    var Designation_list = DesignationLoadfn();
                    $$("Designation").define("options", Designation_list);
                    $$("Designation").refresh();
                    $$("DesignationPOP").hide();
                    $$("Designation").setValue(data.v.Source);
                }
            }
        });
    }
    else {
        alert("Designation is Empty...");
    }
}

function ConsultantLoadfn() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Consultant Search",
        id: 'ConsultantSearchPOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    id: "ConsultantSearch",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "GRP_NAME", header: 'Consultant', width: 380, css: { 'text-align': 'left ! important' } },
                            { id: "grp_id", hidden: true },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            var getval = this.getItem(id.row);
                            $$("Consultant").setValue(getval.GRP_NAME);
                            $('#ConsultantID').val(getval.grp_id);
                            $$("ConsultantSearchPOP").hide();
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
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Ok',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var data = $$("GroupSearch").getSelectedItem();
                                                    $$("Consultant").setValue(data.GRP_NAME);
                                                    $('#ConsultantID').val(data.grp_id);
                                                    $$("ConsultantSearchPOP").hide();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("ConsultantSearchPOP").hide();
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
    var dataval = ConsultantSearchloadfn();
}
function ConsultantSearchloadfn() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/ConsultantLoad_New",
        data: {},
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("ConsultantSearch").clearAll();
                $$("ConsultantSearch").parse(rowDatad);
                $$("ConsultantSearch").refresh();
            }
        }
    });
    return rowDatad;
}

function ProductSearchPOPLoadfn() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Product Search",
        id: 'ProductSearchPOP',
        modal: true,
        width: 650,
        close: true,
        body: {
            rows: [
                {
                    id: "ProductSearch",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "prod_Gr_nm", header: ['Product', { content: "textFilter" }], width: 320, css: { 'text-align': 'left ! important' } },
                            { id: "OP_TY_TXT", header: ['Type', { content: "textFilter" }], width: 250, css: { 'text-align': 'left ! important' } },
                            { header: ['Select', { content: "masterCheckbox", css: { 'padding': '0px ! important' } }], id: "Select", template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                            { id: "prod_Gr_id", hidden: true },
                            { id: "OP_TY_ID", hidden: true },
                            { id: "QUOTE_ID", hidden: true },
                            { id: "B_IND", hidden: true },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [{ProductType:''}],
                    on: {
                        
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
                                {},
                                {
                                    cols: [
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Ok',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    debugger;
                                                    var data1 = $$("Product_Grid").serialize();
                                                    var data = $$("ProductSearch").serialize();
                                                    for (var no = 0; no < data.length; no++) {
                                                        if (data[no].Select == true) {

                                                            var ProductType = data[no].prod_Gr_nm;
                                                            var ProductTypeId = data[no].prod_Gr_id;
                                                            var ProdtTy = data[no].OP_TY_TXT;
                                                            var ProdtTyId = data[no].OP_TY_ID;
                                                            var ProdtInd = data[no].B_IND;
                                                            var UnitTyID = data[no].QUOTE_ID;

                                                            //var datasource = $("#ProductGrid").data("kendoGrid").dataSource;
                                                            var Dupilcate = false;
                                                            for (var n = 0; n < data1.length; n++) {
                                                                if (data1[n].ProductTypeId == ProductTypeId && data1[n].ProdtTyId == ProdtTyId) {
                                                                    Dupilcate = true;
                                                                }
                                                            }
                                                            if (Dupilcate == false) {
                                                                var CalcTY = "";
                                                                if (ProdtInd == "1") {
                                                                    if (UnitTyID == "1") CalcTY = "ARR";
                                                                    else if (UnitTyID == "2") CalcTY = "APC";
                                                                    else if (UnitTyID == "3") CalcTY = "APC";
                                                                    else if (UnitTyID == "4") CalcTY = "PerUnit";
                                                                }

                                                                $$("Product_Grid").add({
                                                                    ProductType: ProductType,
                                                                    ProductTypeId: ProductTypeId,
                                                                    ProdtTy: ProdtTy,
                                                                    ProdtTyId: ProdtTyId,
                                                                    ProdtInd: ProdtInd,
                                                                    ProductValue: "",
                                                                    ProductQty: "",
                                                                    CalcTY: CalcTY,
                                                                    UnitTyID: UnitTyID
                                                                });
                                                                $$("Product_Grid").refresh();
                                                                $$("ProductSearchPOP").hide();
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("ProductSearchPOP").hide();
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
   var dataval = ProductSearchloadfn();
}
function ProductSearchloadfn() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/ProductGrade_New",
        data: {},
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("ProductSearch").clearAll();
                $$("ProductSearch").parse(rowDatad);
                $$("ProductSearch").refresh();
            }
        }
    });
    return rowDatad;
}

function CompetitorLoadfn() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Competitor Search",
        id: 'CompetitorSearchPOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    id: "CompetitorSearch",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "GRP_NAME", header: 'Competitor', width: 380, css: { 'text-align': 'left ! important' } },
                            { id: "grp_id", hidden: true },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            var getval = this.getItem(id.row);
                            var dataval = $$("Competitor_Grid").getSelectedItem();
                            dataval.CompetitorTy = getval.GRP_NAME;
                            dataval.CompetitorTyId = getval.grp_id;
                            $$("Competitor_Grid").refresh();
                            $$("CompetitorSearchPOP").hide();
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
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Ok',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var data = $$("CompetitorSearch").getSelectedItem();
                                                    var dataval = $$("Competitor_Grid").getSelectedItem();
                                                    dataval.CompetitorTy = data.GRP_NAME;
                                                    dataval.CompetitorTyId = data.grp_id;
                                                    $$("Competitor_Grid").refresh();
                                                    $$("CompetitorSearchPOP").hide();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("CompetitorSearchPOP").hide();
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
    var dataval = CompetitorSearchloadfn();
}
function CompetitorSearchloadfn() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/CompetitorLoad_New",
        data: {},
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("CompetitorSearch").clearAll();
                $$("CompetitorSearch").parse(rowDatad);
                $$("CompetitorSearch").refresh();
            }
        }
    });
    return rowDatad;
}

function CompetitorCreation() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Competitor Creation",
        id: 'CompetitorCreationPOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    view: 'form',
                    elements: [
                        {
                            rows: [
                                {
                                    view: 'text',
                                    label: 'Competitor Name',
                                    id: 'CompetitorName',
                                    labelWidth: 80,
                                    minWidth: 300,
                                    inputWidth: 370,

                                }
                            ]
                        }]
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
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Save',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var Val = $$("CompetitorName").getValue();
                                                    CompetitorCreationSavefn(Val);
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("CompetitorCreationPOP").hide();
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
}
function CompetitorCreationSavefn(val) {
   
    var CompetitorName = val;
    if (CompetitorName != "") {
        var Table = {};
        Table["CompetitorName"] = CompetitorName;
        var paramValue = JSON.stringify(Table);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            accepts: "application/json",
            dataType: "json",
            url: "/SalesAndMarket/CompetitorNameSave",
            cache: false,
            charset: 'utf-8',
            data: paramValue,
            async: false,
            success: function (data) {
                var CompetitorId = data;
                if (CompetitorId != "Competitor Name Already Exist.") {
                    var GetItem = $$("Competitor_Grid").getSelectedItem();
                    GetItem.CompetitorTy = CompetitorName;
                    GetItem.CompetitorTyId = CompetitorId;
                    $$("Competitor_Grid").refresh();
                    $$("CompetitorCreationPOP").hide();
                }
                else {
                    alert(CompetitorId);
                }
            }
        });
    }
    else {

    }
}

function Load_ActivityInfo() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/LeadActivityGridLoad",
        data: {},
        async: false,
        success: function (d) {
            if (d != "") {
                debugger;
                rowDatad = JSON.parse(d);
            }
        }
    });
    $$("Activity_Grid").clearAll();
    $$("Activity_Grid").parse(rowDatad);
    $$("Activity_Grid").refresh();
}
function Load_ProductInfo() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/ProductGridLoad",
        data: {},
        async: false,
        success: function (d) {
            if (d != "") {
                rowDatad = JSON.parse(d);
            }
        }
    });
    $$("Product_Grid").clearAll();
    $$("Product_Grid").parse(rowDatad);
    $$("Product_Grid").refresh();
}

function SavenewActivities() {

    var BTN_TYPE = $("#BTN_TYPE").val();
    var OrganaizationType = $("#OrganaizationType").val();
    if (BTN_TYPE == "NEW") {
        if (OrganaizationType == "2") {
            BTN_TYPE = "OPEN";
        }
    }

    var R =  $('#PageGetId').val();
    

    var LeadOpp = $$("OrganizationActivity").getValue();
    debugger;
    //S.VijayaLakshmi''19.5.20
    //var Organization = $$("OrganizationActivity").getValue();
    var Organization = $$("ActiveOrganizationTxt").getValue();
    var ToDo = $$("ToDoTxt").getValue();
    //
    var subject = $$("Subjectpop").getValue();
    //S.VijayaLakshmi''21/5/20
    date = $$("DatePOP").getValue();
    //if (BTN_TYPE != "OPEN")
    //{
        date = date.substring(0, 10).toString();
        date = date.split('-')[2] + "/" + date.split('-')[1] + "/" + date.split('-')[0];
   // }
   
    //
    //Date = Date.substring(0, 10);
    //var arrDt0 = $("#Date").val().split("-");
    //var arrDt1 = arrDt0[2] + " " + arrDt0[1] + " " + arrDt0[0] + " 00:00:00";
    //var arrDt = new Date(arrDt0["2"], parsseInt(arrDt0["1"]) - 1, arrDt0["0"]);

    var Time = $$("TimePop").getValue();
    var AssignedTo = $$("Assigned_Topop").getText();
    var Status = $$("Statuspop").getText();
    var OrgType = $$("Typepop").getText();
    var StatusID = $$("Statuspop").getValue();
    var Assignedtoid = $$("Assigned_Topop").getValue();
    var Comments = $$("Commentspop").getValue();
    var Locations = $$("Locations").getValue();
    var ContType = $$("Typepop").getValue();
    var ContPersonID = $$("Contact_Name").getValue();
    var ContPersonNM = $$("Contact_Name").getText();
    var PriorityId = $$("Prioritypop").getValue();
    if (PriorityId == "" || PriorityId == undefined || PriorityId == null) {
        alert(" Priority Cannot be Empty.");
        return false;
    }

    var Activity_S_NO = $("#Activity_S_NO").val();
    var Activity_S_ID = $("#Activity_S_ID").val();
    var OrganizationId = $("#ORGID").val();
    var DateValidation = "";
    var Stringdate = "";
    var StatusValidate = "";
    var AlertonDueDt = "";
    var DurationTime = $$("DurationPop").getValue();
    var ToTime = $$("ToPop").getValue();

    if ($$("ActiveChkActivepop").getValue() == 1) AlertonDueDt = "1";

    var PriorTo = "";
    if (AlertonDueDt == "1") {
        var AG_IND = '@Session["AG_IND"]';
        if (AG_IND == "1") {
            PriorTo = $$("PriorTo").getValue();
        }
    }

    var paramValue = JSON.stringify({ R: R, LeadOpp: LeadOpp, Organization: Organization, subject: subject, Date: date, Time: Time, AssignedTo: AssignedTo, Status: Status, OrgType: OrgType, StatusID: StatusID, Assignedtoid: Assignedtoid, Comments: Comments, Locations: Locations, ContType: ContType, ContPersonID: ContPersonID, ContPersonNM: ContPersonNM, PriorityId: PriorityId, Activity_S_NO: Activity_S_NO, Activity_S_ID: Activity_S_ID, OrganizationId: OrganizationId, LeadOpprtunityID: $("#LeadOpprtunityID").val(), AlertonDueDt: AlertonDueDt, DurationTime: DurationTime, ToTime: ToTime, PriorTo: PriorTo });

    if (subject == "") {
        alert("Subject Cannot be Empty.");
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/LeadOppIDARG",
        data: "LeadOppID=" + $("#LeadOpprtunityID").val() + "&LeadOppNM=" + LeadOpp + "&ORGID=" + OrganizationId + "&Organization=" + Organization,
        success: function (data) {
        }
    });
    debugger;
    if (Organization != " ") {
        if (ContPersonID != "") {
            if (AssignedTo != "") {
                if (OrgType != "") {
                    if (Date != "") {
                        if (BTN_TYPE == "OPEN") {
                            $$("ClosedActivity").setValue(0);
                            $$("CanceledActivity").setValue(0);
                            $.ajax({
                                type: "POST",
                                contentType: "application/json",
                                accepts: "application/json",
                                dataType: "json",
                                url: "/SalesAndMarket/Activity_Save",
                                cache: false,
                                charset: 'utf-8',
                                data: paramValue,
                                async: false,
                                success: function (data) {
                                    debugger;
                                    var alertVal = data.v.ErrorMeg;
                                    if (alertVal == "Operation Failed.") {
                                        alert(alertVal);
                                    } else {
                                        $$("ActivityPOP").hide();
                                        $$("ClosedActivity").setValue(0);
                                        $$("CanceledActivity").setValue(0);
                                        if (R == "RG") {
                                            Load_ActivityInfoORG();
                                        }
                                        else {
                                            Load_ActivityInfo();
                                        }
                                        
                                        //read ends
                                        var Activity_S_ID = $("#Activity_S_ID").val();
                                        //$("#LeadOpprtunityID").val(Activity_S_ID);
                                        $("#Activity_S_NO").val("");
                                        $("#Activity_S_ID").val("");
                                        var DateTimeValue = $("#DateTimeValue").val();
                                        $$("DatePOP").setValue(DateTimeValue);

                                    }
                                    $$("ClosedActivity").setValue(0);
                                    $$("CanceledActivity").setValue(0);
                                }
                            });
                        }
                        else {
                            debugger;
                            if ($('#ActivityRow').val() != "") {
                                debugger;
                                var selectedRows = $$('Activity_Grid').getSelectedItem($('#ActivityRow').val());
                                selectedRows[0].R = R;
                                selectedRows[0].LeadOpp = LeadOpp;
                                selectedRows[0].Organization = Organization;
                                selectedRows[0].subject = subject;
                                selectedRows[0].StrDate = date;
                                selectedRows[0].Time = Time;
                                selectedRows[0].AssignedTo = AssignedTo;
                                selectedRows[0].Status = Status;
                                selectedRows[0].OrgType = OrgType;
                                selectedRows[0].StatusID = StatusID;
                                selectedRows[0].Assignedtoid = Assignedtoid;
                                selectedRows[0].Comments = Comments;
                                selectedRows[0].Locations = Locations;
                                selectedRows[0].ContType = ContType;
                                selectedRows[0].ContPersonID = ContPersonID;
                                selectedRows[0].ContPersonNM = ContPersonNM;
                                selectedRows[0].PriorityId = PriorityId;
                                selectedRows[0].Activity_S_NO = Activity_S_NO;
                                selectedRows[0].Activity_S_ID = Activity_S_ID;
                                selectedRows[0].OrganizationId = OrganizationId;
                                selectedRows[0].LeadOpp = LeadOpp;
                                selectedRows[0].AlertonDueDt = AlertonDueDt;
                                selectedRows[0].PriorTo = PriorTo;
                                selectedRows[0].DurationTime = DurationTime;
                                selectedRows[0].ToTime = ToTime;

                            }
                            else
                            {
                                $$("Activity_Grid").add({
                                    R: R,
                                    LeadOpp: LeadOpp,
                                    Organization: Organization,
                                    subject: subject,
                                    StrDate: date,
                                    Time: Time,
                                    AssignedTo: AssignedTo,
                                    Status: Status,
                                    OrgType: OrgType,
                                    StatusID: StatusID,
                                    Assignedtoid: Assignedtoid,
                                    Comments: Comments,
                                    Locations: Locations,
                                    ContType: ContType,
                                    ContPersonID: ContPersonID,
                                    ContPersonNM: ContPersonNM,
                                    PriorityId: PriorityId,
                                    Activity_S_NO: Activity_S_NO,
                                    Activity_S_ID: Activity_S_ID,
                                    OrganizationId: OrganizationId,
                                    LeadOpp: LeadOpp,
                                    AlertonDueDt: AlertonDueDt,
                                    PriorTo: PriorTo,
                                    DurationTime: DurationTime,
                                    ToTime: ToTime
                                });
                            }
                            $$("ActivityPOP").hide();
                            $$("ClosedActivity").setValue(0);
                            $$("CanceledActivity").setValue(0);
                            $$('Activity_Grid').refresh();
                        }
                    } else {
                        alert(" Date Cannot be Empty.");
                    }
                }
                else {
                    alert(" Type Cannot be Empty.");
                }
            }
            else {
                alert(" Please Select Sales Person.");
            }
        }
        else {
            alert(" Contact Name Cannot be Empty.");
        }
    }
    else {
        //    var meg = "";
        //    var ActivityType = $("#ActivityType").val();
        //    if (ActivityType == "RG") meg = "Organization";
        //    else if (ActivityType == "L") meg = "Lead";
        //    else if (ActivityType == "O") meg = "Opportunity";
        //    $("#AlertMessageHdn").val(" Please Select " + meg + ".");
        //    $("#alertType").val('fail');
        //    AlertMesaage();
        //}
        //$("#Typeload").data("kendoDropDownList").value(" ");
        //$("#Typeload").data("kendoDropDownList").text(" ");
        //$("#AssignedTo").data("kendoDropDownList").value(" ");
        //var SALE_PER_ID = '<%=Session["SALE_PER_ID"]%>';
        //$("#AssignedTo").data('kendoDropDownList').value(SALE_PER_ID);
        //$("#Locations").val("");
        //$("#Comments").val("");
        //$("#subject").val("");
        //$("#Status").data("kendoDropDownList").value(1);
        //$("#Priority").data("kendoDropDownList").value(2);
    }
}

function CurrentDateLoad() {
    var rtn = '';
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/CurrentDateLoad",
        data: '',
        async: false,
        success: function (data) {
            rtn = data;
        }
    });
    return rtn;
}