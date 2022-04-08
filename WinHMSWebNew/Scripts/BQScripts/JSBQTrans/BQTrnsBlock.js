
var app = angular.module('BQTApp', ['webix']);

app.controller("BQTransController", function ($scope) {

    var searchicon = "<span class='webix_icon wxi-search'></span>";

    var Delicon = "<span class='webix_icon wxi-trash'></span>";

    var fnExtTm = [{ "id": "00:00", "value": "00:00" }, { "id": "01:00", "value": "01:00" }, { "id": "02:00", "value": "02:00" }, { "id": "03:00", "value": "03:00" },
     { "id": "04:00", "value": "04:00" }];

    var DropValues=fnLoadDefDropValue();

    var TblPlan = DropValues.TBLPLAN;

    var TblPlan1 = DropValues.TBLPLAN1;

    var fnVenueSet = DropValues.TBLVENUE;

    var fnSessionSet = DropValues.TBLSESSION;

    var TblBlckTy = DropValues.TBLBLOCKTY;

    $("#LoadDIv").hide();

    fnAccountDt();
    fnLoadMstCompany();

    fnLoadBNControl();

    $scope.frmBQTrnsBlock = {

        id: "frmBQTrnsBlock",
        view: 'form',
        minWidth: 900,
        //maxWidth: 1100,
        disabled: true,
        elements: [
            {
                paddingX:10,
                rows: [
                   {
                       cols:[
                           {
                               width: 850,
                               minWidth: 850,
                               rows:[
                                   {
                                       view: "richselect",
                                       id: "ddlBlockTy",
                                       label: " Block Type",
                                       labelAlign: "Left",
                                       labelWidth: 80,
                                       inputWidth: 260,
                                       width: 330,
                                       minWidth:330,
                                       options : TblBlckTy,
                                       on: {
                                           onChange: function (newval, oldval) {

                                               if ($.trim(newval) == "1") {
                                                  
                                                   $$("txtReminder").hide();
                                                   $$("txtRDate").hide();
                                                   $$("txtRTm").hide();
                                                   $$("txtReConfDt").hide();
                                                   $$("ChkReconf").hide();
                                                   
                                                   $$("txtBooker").hide();
                                                   $$("btnBkrSrch").hide();
                                                   $$("btnBkrSrchClr").hide();

                                                   $$("ddlTit").hide();
                                                   $$("ddlGuestType").hide();
                                                   $$("btnGstProf").hide();
                                                   $$("txtGstName").hide();
                                                   $$("txtFirstNm").hide();
                                                   $$("btnGstSrch").hide();
                                                   $$("txtHostBy").hide();

                                                   $$("ddlPlan").disable();
                                                   $$("ddlPlanItem").disable();

                                                   $$("txtRate").setValue("");
                                                   $$("txtGPax").setValue("");
                                                   $$("txtExPax").setValue("");

                                                   $$("txtRate").disable();
                                                   $$("txtGPax").disable();
                                                   $$("txtExPax").disable();

                                                   $$("ddlFunTy").disable();

                                                   $$("ddlMarkSeg").disable();

                                                   $$("ddlBusSrc").disable();

                                                   $$("ddlSalesPer").disable();
                                               }
                                               else if ($.trim(newval) == "2" || $.trim(newval) == "3") {

                                                   $$("ddlTit").show();
                                                   $$("ddlGuestType").show();
                                                   $$("btnGstProf").show();
                                                   $$("txtGstName").show();
                                                   $$("txtFirstNm").show();
                                                   $$("btnGstSrch").show();
                                                   $$("txtHostBy").show();

                                                   $$("ddlPlan").enable();
                                                   $$("ddlPlanItem").enable();

                                                   $$("txtReminder").show();

                                                   if ($$("txtReminder").getValue() != "") {
                                                       $$("txtRDate").show();
                                                       $$("txtRTm").show();
                                                   }

                                                   $$("txtReConfDt").show();

                                                   if ($("#hdnBkrAppl").val() == "1") {
                                                       $$("txtBooker").show();
                                                       $$("btnBkrSrch").show();
                                                       $$("btnBkrSrchClr").show();
                                                   }

                                                   if ($("#hdnCurMode").val() != "V") {

                                                       $$("txtRate").enable();
                                                       $$("txtGPax").enable();
                                                       $$("txtExPax").enable();

                                                       $$("ddlFunTy").enable();

                                                       $$("ddlMarkSeg").enable();

                                                       $$("ddlBusSrc").enable();

                                                       $$("ddlSalesPer").enable();
                                                   }
                                               }
                                           }
                                       }
                                   },
                                   {
                       
                                       cols: [
                                           {
                                               view: "richselect",
                                               id: "ddlGuestType",
                                               label: " Guest Type",
                                               labelAlign: "Left",
                                               labelWidth: 80,
                                               inputWidth: 200,
                                               width: 250,
                                               minWidth: 250,
                                               on: {
                                                   onChange: function (newval, oldval) {

                                                       $$("btnGstProf").hide();

                                                       $$("txtHostBy").setValue("");
                                                       $$("ddlTit").setValue("1");
                                                       $$("txtGstName").setValue("");
                                                       $$("txtFirstNm").setValue("");

                                                       if ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2") {
                                                           $$("txtFirstNm").show();
                                                           $$("txtGstName").define("width", 200);
                                                           $$("txtGstName").define("inputWidth", 200);
                                                           $$("txtGstName").resize();
                                                       }
                                                       else {
                                                           $$("txtFirstNm").hide();
                                                           $$("txtGstName").define("width", 350);
                                                           $$("txtGstName").define("inputWidth", 350);
                                                           $$("txtGstName").resize();
                                                       }

                                                       if (newval == "C") {
                                                           $$("txtHostBy").show();
                                                           $$("txtFirstNm").hide();
                                                           $$("txtGstName").define("width", 350);
                                                           $$("txtGstName").define("inputWidth", 350);
                                                           $$("txtGstName").define("placeholder", "")
                                                           $$("txtGstName").define("readonly", true);
                                                           $$("txtGstName").resize();
                                                           $$("txtGstName").refresh();
                                                           $$("ddlTit").hide();
                                                           $$("btnGstProf").hide();

                                                       }
                                                       else {

                                                           $$("txtHostBy").hide();
                                                           $$("txtGstName").define("placeholder", ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2" ? "Last Name" : "Name"));
                                                           $$("txtGstName").define("readonly", false);
                                                           $$("txtGstName").refresh();
                                                           $$("ddlTit").show();
                                                           $$("btnGstProf").show();
                                                       }
                                                   }
                                               }
                                           },
                                           {
                                               view: "richselect",
                                               id: "ddlTit",
                                               label: " Title",
                                               labelAlign: "Right",
                                               labelWidth: 50,
                                               inputWidth: 130,
                                               width: 130,
                                               minWidth: 130,
                                               on: {
                                                   onChange: function (newval, oldval) {
                                                   }
                                               }
                                           },
                                           {
                                               view: "text",
                                               id: "txtGstName",
                                               disable: true,
                                               labelAlign: "Right",
                                               inputWidth: ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2" ? 200 : 350),
                                               placeholder: ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2" ? "Last Name" : "Name"),
                                               width: ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2" ? 200 : 350),
                                               attributes: { maxlength: 40 },
                                               on: {
                                                   onBlur: function () {
                                                       if ($$("txtGstName").getValue() != "" && $$("ddlGuestType").getValue() == "O")
                                                           $$("btnGstProf").show();
                                                       else
                                                           $$("btnGstProf").hide();
                                                   },
                                                   onChange: function (newval, oldval) {

                                                       //if ($("#hdnGstId").val() == "") {
                                                       //    FnGuestCreate();
                                                       //    return;
                                                       //}
                                                   }
                                               }
                                           },
                                           {
                                               view: "text",
                                               id: "txtFirstNm",
                                               labelAlign: "Right",
                                               inputWidth: 200,
                                               placeholder: "First Name",
                                               hidden: ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2" ? false : true),
                                               width: 200,
                                               disable:true,
                                               minWidth: 200,
                                               attributes: { maxlength: 40 },
                                               on: {
                                                   onChange: function (newval, oldval) {
                                                       //if ($("#hdnGstId").val() == "") {
                                                       //    FnGuestCreate();
                                                       //    return;
                                                       //}
                                                   },
                                                   "onBlur": function (prev_view) {

                                                       $$('txtFirstNm').blockEvent();
                                                       var Nextid = webix.UIManager.getNext($$("txtFirstNm"));
                                                       webix.UIManager.setFocus(Nextid);
                                                       $$('txtFirstNm').unblockEvent();

                                                       var hdnGstApi = "/BQTrans/CALL_ALLAPI";


                                                       fnNewGstCreatePopLoad($("#hdnCompId").val(), $("#hdnUserId").val(), $("#hdnConnStr").val(), "BQR", hdnGstApi, false, $$('txtGstName').getValue(), $$('txtFirstNm').getValue(), $$("ddlTit").getValue(), $$("ddlTit").getText());
                                                   }
                                               }
                                           },
                                           {
                                               view: "button",
                                               id: 'btnGstSrch',
                                               minWidth: 250,
                                               labelWidth: 0,
                                               width: 30,
                                               height: 28,
                                               type: 'icon',
                                               icon: 'wxi-search',
                                               css: "Ar_search",
                                               on: {
                                                   onItemClick: function () {
                                                       fnCallPopUpGstSearch();
                                                   }
                                               }
                                           },
                                           {
                                               view: "button",
                                               id: 'btnGstProf',
                                               minWidth: 250,
                                               labelWidth: 0,
                                               width: 30,
                                               height: 20,
                                               type: 'icon',
                                               icon: 'fa fa-users',
                                               on: {
                                                   onItemClick: function () {
                                                       debugger;

                                                       if ($.trim($("#hdnGstId").val()) != "") {
                                                           var hdnGstApi = "/BQTrans/CALL_ALLAPI";

                                                           $$("GuestProfilePop").show();
                                                           fnLoadGuestProf($("#hdnCompId").val(), $("#hdnUserId").val(), $("#hdnConnStr").val(), "BQR", hdnGstApi, false, $("#hdnGstId").val(), $("#hdnGstId").val(), null, false);
                                                       }
                                                   }
                                               }
                                           },
                                       ]
                                   },
                                   {
                                       view: "text",
                                       id: "txtHostBy",
                                       stringResult: true,
                                       label: "Host By",
                                       labelAlign: "Left",
                                       labelWidth: 80,
                                       inputWidth: 300,
                                       width: 300,
                                       minWidth: 300,
                                       hidden: true,
                                       attributes: { maxlength: 40 },
                                   },
                               ]
                           },
                           {
                               rows:[
                                   {
                                       view: "datepicker",
                                       id: "txtCrDate",
                                       disable: true,
                                       stringResult: true,
                                       label: "Create Dt",
                                       format: "%d/%m/%Y",
                                       readonly: true,
                                       labelAlign: "Left",
                                       labelWidth: 70,
                                       inputWidth: 200,
                                       width: 600,
                                       minWidth: 600,
                                   },
                                   {
                                       view: "datepicker",
                                       id: "txtFrmDate",
                                       stringResult: true,
                                       label: "From Dt",
                                       format: "%d/%m/%Y",
                                       readonly: true,
                                       labelAlign: "Left",
                                       labelWidth: 70,
                                       inputWidth: 200,
                                       width: 600,
                                       minWidth: 600,
                                       hidden:true,
                                   },
                                   {
                                       view: "datepicker",
                                       id: "txtToDt",
                                       disable: true,
                                       stringResult: true,
                                       label: "To Dt",
                                       format: "%d/%m/%Y",
                                       readonly: true,
                                       labelAlign: "Left",
                                       labelWidth: 70,
                                       inputWidth: 200,
                                       width: 600, hidden: true,
                                       minWidth: 600,
                                   },
                                   { 
                                       cols: [
                                            {
                                                view: "text",
                                                id: "txtBlockNo",
                                                stringResult: true,
                                                label: "Block No",
                                                labelAlign: "Left",
                                                readonly: true,
                                                labelWidth: 70,
                                                inputWidth: 170,
                                                width: 170,
                                                minWidth: 170,
                                            },
                                            {
                                                view: "button",
                                                id: 'txtBlckSrc',
                                                minWidth: 250,
                                                labelWidth: 0,
                                                width: 30,
                                                height: 28,
                                                type: 'icon',
                                                icon: 'wxi-search',
                                                css: "Ar_search",
                                                hidden: true,
                                                on: {
                                                    onItemClick: function () {

                                                        if ($$("ddlBlockTy").getValue() == "") {
                                                            AlertMessage("Block Type cannot be empty !");
                                                            return false;
                                                        }
                                                        else {
                                                            fnCallReservationPop();
                                                        }
                                                    }
                                                }
                                            }
                                       ]
                                   }
                               ]
                           }
                       ]
                   },
                   {
                       height:5,
                   },
                   {
                       minWidth: 900,
                       width: 1100,
                       height: 465,
                       id: "BQTabView",
                       view: "tabview",
                       type: "space",
                       cells: [
                         {
                             header: "<span class='fa fa-home'></span>Details",
                             body: {
                                 id: "Details",
                                 view: "form",
                                 select: true, 
                                 elements: [
                                     {
                                         rows: [
                                             {
                                                 cols: [
                                                     {
                                                         width: 105,
                                                         minWidth: 105,
                                                     },
                                                     {
                                                         view: "datatable",
                                                         id: "grdVenue",
                                                         select: "row",
                                                         data: [],
                                                         height: 180,
                                                         minWidth: 450,
                                                         editable: true,
                                                         scroll: true,
                                                         columns: [
                                                                 { header: "RowId", id: "RowId", width: 30, hidden: true, },
                                                                 { header: "Date", id: "vDate", width: 90, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), stringResult: true, liveEdit: true, css: { 'text-align': 'left ! important' } },
                                                                 { header: "Session", id: "vSessionId", width: 55, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return fnSessionSet; } },
                                                                 { header: "Venue", id: "vVenueId", width: 200, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return fnVenueSet; } },
                                                                 { header: "S.Tm", id: "vStm", width: 60, editor: 'text', liveEdit: true, css: { 'text-align': 'Center ! important' } },
                                                                 { header: "E.Tm", id: "vEtm", width: 60, editor: 'text', liveEdit: true, css: { 'text-align': 'Center ! important' } },
                                                                 { header: "Ext.Tm", id: "vnExtTm", width: 75, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return fnExtTm; } },
                                                                 { header: "VenueId", id: "vVenueNm", hidden: true, },
                                                                 { header: "vSessionId", id: "vSessionNm", hidden: true, },
                                                                 { header: "", id: "btnVDel", width: 40, template: Delicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                                         ],
                                                         rules: {
                                                             vDate: webix.rules.isNotEmpty,
                                                             vSessionId: webix.rules.isNotEmpty,
                                                             vVenueId: webix.rules.isNotEmpty,
                                                             vStm: webix.rules.isNotEmpty,
                                                             vEtm: webix.rules.isNotEmpty,
                                                         },
                                                         on: {
                                                             'onItemClick': function (id, value) {

                                                                 var RowIndex = $$("grdVenue").getIndexById(id.row);

                                                                 if (id.column == 'btnVDel') {

                                                                     webix.confirm({
                                                                         title: "Confirmation !",
                                                                         ok: "Yes", cancel: "No",
                                                                         text: "Are you sure to Delete this line Item !"
                                                                     })
                                                                   .then(function () {
                                                                       $$("grdVenue").editCancel();
                                                                       $$("grdVenue").remove($$("grdVenue").getSelectedId());
                                                                       $$("grdVenue").refresh();
                                                                   })
                                                                   .fail(function () {

                                                                   });
                                                                 }
                                                             },
                                                             'onAfterEditStop': function (state, editor) {
                                                                 if (editor.column == 'vDate') {

                                                                     if (!fnValidVenueSession())
                                                                         return false;

                                                                     if ($$("txtFrmDate").getValue() == "")
                                                                         $$("txtFrmDate").setValue(state.value);

                                                                     if ($.trim(state.value) != $.trim($$("txtFrmDate").getValue()))
                                                                         $$("txtToDt").setValue(state.value);
                                                                     else {
                                                                         if ($.trim($$("txtToDt").getValue()) == "") {
                                                                             $$("txtToDt").setValue(state.value);
                                                                         }
                                                                     }

                                                                 }
                                                             },
                                                             'onEditorChange': function (id, value, row) {

                                                                 var getval = this.getItem(id);

                                                                if (id.column == 'vSessionId') {

                                                                     var Filter1 = fnSessionSet.filter(function (fnSessionSet) {
                                                                         return fnSessionSet.id == $.trim(value);
                                                                     });

                                                                     if (Filter1.length > 0) {
                                                                         getval.vStm = Filter1[0]["S_T"];
                                                                         getval.vEtm = Filter1[0]["E_T"];
                                                                         getval.vSessionNm = Filter1[0]["value"];
                                                                         getval.vSessionId = value;
                                                                     }
                                                                 }
                                                                 else if (id.column == 'vVenueId') {

                                                                     if (!fnValidVenueSession())
                                                                         return false;

                                                                     var Filter2 = fnVenueSet.filter(function (fnVenueSet) {
                                                                         return fnVenueSet.id == $.trim(value);
                                                                     });

                                                                     getval.vVenueNm = Filter2[0]["value"];
                                                                     getval.vVenueId = value;
                                                                     $$("grdVenue").refresh();
                                                                 }

                                                                 $$("grdVenue").refresh();
                                                             },
                                                             'onBlur': function () {
                                                                 $$("grdVenue").refresh();
                                                             },
                                                             'onKeyPress': function (e, id) {

                                                                 if (e == 40) {
                                                                     fnVenueRowAdd('1');
                                                                 }
                                                             }
                                                         }
                                                     },
                                                     {
                                                         width: 100,
                                                         minWidth: 100,
                                                         rows:[
                                                             {
                                                                 view: "button",
                                                                 id: 'txtAddRow',
                                                                 label:"Add",
                                                                 labelWidth: 60,
                                                                 width: 60,
                                                                 height: 30,
                                                                 labelAlign: "Left",
                                                                 on: {
                                                                     onItemClick: function () {
                                                                         fnVenueRowAdd('1');
                                                                     }
                                                                 }
                                                             }
                                                         ]
                                                     },
                                                     {
                                                       
                                                         rows: [
                                                             {
                                                                 height:10,
                                                             },
                                                             {
                                                                 paddingX: 50,
                                                                 cols: [
                                                                     {
                                                                         view: "richselect",
                                                                         id: "ddlPlan",
                                                                         label: "",
                                                                         inputWidth: 80,
                                                                         width: 80,
                                                                         minWidth: 80,
                                                                         on: {
                                                                             onChange: function (newval, oldval) {

                                                                                 if (TblPlan.length > 0) {

                                                                                     if ($$("ddlPlan").getValue() == "P") {
                                                                                         $$("ddlPlanItem").define("options", TblPlan);
                                                                                     }
                                                                                     else {
                                                                                         $$("ddlPlanItem").define("options", TblPlan1);
                                                                                     }

                                                                                     $$("ddlPlanItem").refresh();
                                                                                 }
                                                                             }
                                                                         }
                                                                     },
                                                                     {
                                                                         view: "richselect",
                                                                         id: "ddlPlanItem",
                                                                         label: "",
                                                                         inputWidth: 200,
                                                                         width: 200,
                                                                         minWidth: 200,
                                                                         on: {
                                                                             onChange: function (newval, oldval) {

                                                                                 if (TblPlan.length > 0) {
                                                                                     if ($$("ddlPlan").getValue() == "P") {

                                                                                         if(TblPlan.length>0)
                                                                                         {
                                                                                             var Filter1 = TblPlan.filter(function (TblPlan) {
                                                                                                 return TblPlan.id == $.trim($$("ddlPlanItem").getValue());
                                                                                             });

                                                                                             if (Filter1.length > 0) {
                                                                                                 var vrate = (Filter1[0].Rate==null || Filter1[0].Rate == "" ? 0 : parseFloat(Filter1[0].Rate)).toFixed(2)
                                                                                                 $$("txtRate").setValue(vrate);
                                                                                             }
                                                                                         }
                                                                                     }
                                                                                     else {

                                                                                         if(TblPlan1.length>0)
                                                                                         {
                                                                                             var Filter1 = TblPlan1.filter(function (TblPlan1) {
                                                                                                 return TblPlan1.id == $.trim($$("ddlPlanItem").getValue());
                                                                                             });

                                                                                             if (Filter1.length > 0) {
                                                                                                 var vrate = (Filter1[0].Rate == null || Filter1[0].Rate == "" ? 0 : parseFloat(Filter1[0].Rate)).toFixed(2)
                                                                                                 $$("txtRate").setValue(vrate);
                                                                                             }
                                                                                         }
                                                                                     }
                                                                                 }
                                                                             }
                                                                         }
                                                                     },
                                                                 ]
                                                             },
                                                             {
                                                                 view: "text",
                                                                 id: "txtRate",
                                                                 stringResult: true,
                                                                 label: "Rate",
                                                                 inputAlign: "right",
                                                                 labelAlign: "Right",
                                                                 labelWidth: 130,
                                                                 inputWidth: 250,
                                                                 width: 250,
                                                                 minWidth: 250,
                                                                 attributes: { maxlength: 20 },
                                                                 on: {
                                                                     onKeyPress: function (code, evt) {

                                                                         evt = (evt) ? evt : window.event;
                                                                         var charCode = (evt.which) ? evt.which : evt.keyCode;
                                                                         if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                                             return false;
                                                                         }
                                                                         return true;
                                                                     }
                                                                 }
                                                             },
                                                             {
                                                                 view: "text",
                                                                 id: "txtGPax",
                                                                 label: "Guaranteed Pax",
                                                                 inputAlign: "right",
                                                                 labelAlign: "Right",
                                                                 labelWidth: 130,
                                                                 inputWidth: 250,
                                                                 width: 250,
                                                                 minWidth: 250,
                                                                 attributes: { maxlength: 20 },
                                                                 on: {
                                                                     onKeyPress: function (code, evt) {
                                                                         debugger;
                                                                         var specialKeys = new Array();
                                                                         specialKeys.push(8); //Backspace
                                                                         var keyCode = evt.which ? evt.which : evt.keyCode
                                                                         var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)
                                                                             || keyCode == 46 ||keyCode == 9 || specialKeys.indexOf(keyCode) != -1);
                                                                         return ret;
                                                                     }
                                                                 }
                                                             },
                                                             {
                                                                 view: "text",
                                                                 id: "txtExPax",
                                                                 label: "Expected Pax",
                                                                 inputAlign: "right",
                                                                 labelAlign: "Right",
                                                                 labelWidth: 130,
                                                                 inputWidth: 250,
                                                                 width: 250,
                                                                 minWidth: 250,
                                                                 attributes: { maxlength: 20 },
                                                                 on: {
                                                                     onKeyPress: function (code, evt) {
                                                                         debugger;
                                                                         var specialKeys = new Array();
                                                                         specialKeys.push(8); //Backspace
                                                                         var keyCode = evt.which ? evt.which : evt.keyCode
                                                                         var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)
                                                                             || keyCode == 46 || keyCode == 9 || specialKeys.indexOf(keyCode) != -1);
                                                                         return ret;
                                                                     }
                                                                 }
                                                             },
                                                              {
                                                                  view: "datepicker",
                                                                  id: "txtReConfDt",
                                                                  stringResult: true,
                                                                  label: "Reconfirmation Date",
                                                                  format: "%d/%m/%Y",
                                                                  labelAlign: "Right",
                                                                  labelWidth: 130,
                                                                  inputWidth: 250,
                                                                  width: 250, minWidth: 250,
                                                                  on: {
                                                                      onChange: function (newval, oldval) {

                                                                          if ($$("txtReConfDt").getValue() != "")
                                                                              $$("ChkReconf").show();
                                                                          else
                                                                              $$("ChkReconf").hide();
                                                                      }
                                                                  }
                                                              },
                                                              {
                                                                  cols: [
                                                                      {
                                                                          id: "ChkReconf",
                                                                          view: "checkbox",
                                                                          label: "Reconfirmed,Yes",
                                                                          labelAlign: "Right",
                                                                          labelWidth: 130,
                                                                          width: 170, minWidth: 170,
                                                                          hidden:true,
                                                                          on: {
                                                                              "onChange": function () {

                                                                              }
                                                                          }
                                                                      },
                                                                     
                                                                  ]
                                                              },
                                                         ]
                                                     },
                                                 ]
                                             },
                                             {
                                                 cols:[
                                                     {
                                                         view: "richselect",
                                                         id: "ddlFunTy",
                                                         label: "Function Type",
                                                         labelAlign: "Right",
                                                         labelWidth: 105,
                                                         inputWidth: 350,
                                                         width: 400, minWidth: 400,
                                                         on: {
                                                             onChange: function (newval, oldval) {

                                                             }
                                                         }
                                                     },
                                                     {
                                                         view: "richselect",
                                                         id: "ddlMarkSeg",
                                                         label: "Market Segment",
                                                         labelAlign: "Right",
                                                         labelWidth: 105,
                                                         inputWidth: 340,
                                                         width: 340, minWidth: 340,
                                                         on: {
                                                             onChange: function (newval, oldval) {

                                                             }
                                                         }
                                                     },
                                                     {
                                                          view: "text",
                                                          id: "txtBookedBy",
                                                          stringResult: true,
                                                          label: "Booked By",
                                                          labelAlign: "Left",
                                                          labelWidth: 70,
                                                          inputWidth: 270,
                                                          //hidden: true,
                                                          width: 350, minWidth: 350,
                                                          attributes: { maxlength: 40 },
                                                     },
                                                 ]
                                             },
                                             {
                                                 cols:[
                                                     {
                                                         view: "richselect",
                                                         id: "ddlBusSrc",
                                                         label: "Business Source",
                                                         labelAlign: "Right",
                                                         labelWidth: 105,
                                                         inputWidth: 350,
                                                         width: 400, minWidth: 400,
                                                         on: {
                                                             onChange: function (newval, oldval) {
                                                             }
                                                         }
                                                     },
                                                     {
                                                         view: "richselect",
                                                         id: "ddlSalesPer",
                                                         label: " Sales Person",
                                                         labelAlign: "Right",
                                                         labelWidth: 105,
                                                         inputWidth: 340,
                                                         width: 340, minWidth: 340,
                                                         hidden: ($("#hdnSpAppl").val() == "1" ? false : true),
                                                         on: {
                                                             onChange: function (newval, oldval) {

                                                             }
                                                         }
                                                     }
                                                 ]
                                             },
                                             {
                                                 cols: [
                                                     {
                                                         view: "text",
                                                         id: "txtBooker",
                                                         stringResult: true,
                                                         label: "Booker",
                                                         labelAlign: "Right",
                                                         labelWidth: 105,
                                                         inputWidth: 350,
                                                         width: 350, minWidth: 350,
                                                         readonly: true,
                                                         hidden: ($("#hdnBkrAppl").val() == "1" ? false : true),
                                                     },
                                                     {
                                                         view: "button",
                                                         id: 'btnBkrSrch',
                                                         minWidth: 250,
                                                         labelWidth: 0,
                                                         width: 30,
                                                         height: 28,
                                                         type: 'icon',
                                                         icon: 'wxi-search',
                                                         css: "Ar_search",
                                                         hidden: ($("#hdnBkrAppl").val() == "1" ? false : true),
                                                         on: {
                                                             onItemClick: function () {
                                                                 fnCallPopUpBookerSearch('RES');

                                                             }
                                                         }
                                                     },
                                                     {
                                                         view: "button",
                                                         id: 'btnBkrSrchClr',
                                                         minWidth: 250,
                                                         labelWidth: 0,
                                                         width: 30,
                                                         height: 28,
                                                         type: 'icon',
                                                         icon: 'wxi-close',
                                                         css: "Ar_search",
                                                         hidden: ($("#hdnBkrAppl").val() == "1" ? false : true),
                                                         on: {
                                                             onItemClick: function () {
                                                                 $$("txtBooker").setValue("");
                                                                 $("#hdnBookerId").val("");
                                                             }
                                                         }
                                                     },
                                                 ]
                                             },
                                              {
                                                  cols: [
                                                      {
                                                          view: "text",
                                                          id: "txtReminder",
                                                          stringResult: true,
                                                          label: "Reminder",
                                                          labelAlign: "Right",
                                                          labelWidth: 105,
                                                          inputWidth: 350,
                                                          width: 380, minWidth: 380,
                                                          attributes: { maxlength: 80 },
                                                          on: {
                                                              onBlur: function () {
                                                                  if ($$("txtReminder").getValue() != "") {
                                                                      $$("txtRDate").show();
                                                                      $$("txtRTm").show();
                                                                  }
                                                                  else {
                                                                      $$("txtRDate").hide();
                                                                      $$("txtRTm").hide();
                                                                  }
                                                              },

                                                          }
                                                      },
                                                      {
                                                          view: "datepicker",
                                                          id: "txtRDate",
                                                          disable: true,
                                                          stringResult: true,
                                                          label: "Reminder Date",
                                                          format: "%d/%m/%Y",
                                                          value: $("#hdnCurrentDt").val(),
                                                          labelAlign: "left",
                                                          labelWidth: 90,
                                                          inputWidth: 210,
                                                          hidden: true,
                                                          width: 240, minWidth: 240,
                                                      },
                                                      {
                                                          view: "datepicker",
                                                          format: "%H:%i",
                                                          id: "txtRTm",
                                                          label: "Time",
                                                          labelAlign: "left",
                                                          labelWidth: 40,
                                                          inputWidth: 125,
                                                          width: 125, minWidth: 125,
                                                          hidden: true,
                                                          suggest: {
                                                              type: "calendar",
                                                              body: {
                                                                  type: "time",
                                                                  calendarTime: "%H:%i"
                                                              }
                                                          }
                                                      },
                                                  ]
                                              },
                                              {
                                                   view: "textarea",
                                                   id: "txtNarration",
                                                   stringResult: true,
                                                   label: "Narration",
                                                   labelAlign: "Right",
                                                   labelWidth: 105,
                                                   inputWidth: 800,
                                                   height: 50,
                                                   width: 800, minWidth: 800,
                                                   attributes: { maxlength: 1000 },
                                              },
                                         ]
                                     }
                                 ]
                             }
                         },
                         {
                             header: "<span class='fa fa-list'></span>Guest Details",
                             body: {
                                 id: "GstForm",
                                 view: "form",
                                 elements: [
                                     {
                                         rows: [
                                             {
                                                 view: "text",
                                                 id: "txtAddress",
                                                 labelAlign: "Right",
                                                 label: "Address",
                                                 labelWidth: 150,
                                                 inputWidth: 500,
                                                 width: 500,
                                                 attributes: { maxlength: 40 },
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtAddress1",
                                                 labelAlign: "Right",
                                                 label: " ",
                                                 labelWidth: 150,
                                                 inputWidth: 500,
                                                 width: 500, attributes: { maxlength: 40 },
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtAddress2",
                                                 labelAlign: "Right",
                                                 label: " ",
                                                 labelWidth: 150,
                                                 inputWidth: 500,
                                                 width: 500, attributes: { maxlength: 40 },
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtCity",
                                                 labelAlign: "Right",
                                                 label: "City",
                                                 labelWidth: 150,
                                                 inputWidth: 350,
                                                 width: 350, attributes: { maxlength: 40 },
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtPincode",
                                                 labelAlign: "Right",
                                                 label: "Pin Code",
                                                 labelWidth: 150,
                                                 inputWidth: 350,
                                                 width: 350, attributes: { maxlength: 10 },
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtPhone",
                                                 labelAlign: "Right",
                                                 label: "Phone",
                                                 labelWidth: 150,
                                                 inputWidth: 350,
                                                 width: 350, attributes: { maxlength: 40 },
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtMobile",
                                                 labelAlign: "Right",
                                                 label: "Mobile",
                                                 labelWidth: 150,
                                                 inputWidth: 350,
                                                 width: 350, attributes: { maxlength: 40 },
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtEmail",
                                                 labelAlign: "Right",
                                                 label: "Email",
                                                 labelWidth: 150,
                                                 inputWidth: 500,
                                                 width: 500, attributes: { maxlength:200 },
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtEmail2",
                                                 labelAlign: "Right",
                                                 label: "Email2",
                                                 labelWidth: 150,
                                                 inputWidth: 500,
                                                 width: 500, attributes: { maxlength: 200 },
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtContactP",
                                                 labelAlign: "Right",
                                                 label: "Contact Person",
                                                 labelWidth: 150,
                                                 inputWidth: 500,
                                                 width: 500, attributes: { maxlength: 40 },
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtCPDesig",
                                                 labelAlign: "Right",
                                                 label: "Contact Person Desig",
                                                 labelWidth: 150,
                                                 inputWidth: 500,
                                                 width: 500, attributes: { maxlength: 40 },
                                             },
                                             {
                                                 view: "text",
                                                 id: "txtCPPhone",
                                                 labelAlign: "Right",
                                                 label: "Contact Person Phone",
                                                 labelWidth: 150,
                                                 inputWidth: 500, attributes: { maxlength: 40 },
                                                 width: 500,
                                             },
                                         ]
                                     }
                                 ]
                             }
                         },
                       ]
                   }
                ]
            }
        ]
    };
                     
});

function fnLoadMstCompany() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_MSTCOMPANY";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnGstNmInd").val(rowData[0].GstNm_Ind);
                //$("#hdnBaseCurId").val(rowData[0].BASE_CURRENCY_ID);
            }
        },
    });
}

function fnLoadBNControl() {
    //debugger;
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_BNCONTROL";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                if (rowData.length > 0) {
                    $("#hdnPkApplInd").val(rowData[0].H3_IND);
                    $("#hdnSpAppl").val(rowData[0].H2_IND);
                    $("#hdnBkrAppl").val(rowData[0].J2_IND);

                    //$("#hdnbsman").val(rowData[0].Z2_IND);
                    //$("#hdnspman").val(rowData[0].Y2_IND);
                }
            }
        },
    });
}

function fnLoadMstCompany() {
    var rowData = fnMstCompany();

    if (rowData.length > 0) {
        $("#hdnGstNmInd").val(rowData[0].GstNm_Ind);
        $("#hdnBaseCurId").val(rowData[0].BASE_CURRENCY_ID);
        $("#hdnCountryId").val(rowData[0].COUNTRY_ID);
    }
}

function fnRemoveClass() {
    $("#btnNew").removeClass("ClickBtn");
    $("#btnOpen").removeClass("ClickBtn");
    $("#btnSave").removeClass("ClickBtn");
    $("#btnRef").removeClass("ClickBtn");

    $('#btnNew').prop('disabled', false);
    $('#btnOpen').prop('disabled', false);
    $('#btnSave').prop('disabled', true);
}

function fnVenueRowAdd(option) {

    var grdVenue = $$("grdVenue").serialize();

    var Venlen = grdVenue.length;

    var vDate1 = ""; var vRowId = 0;

    if (grdVenue.length != 0) {

        var getval = $$("grdVenue").getItem($$("grdVenue").getFirstId());
        vDate1 = getval.vDate;

        vRowId = grdVenue[grdVenue.length - 1].RowId + 1;
    }

    var addrow = {
        RowId: vRowId, vDate: vDate1, vSessionId: '', vVenueId: '', vVenueNm: '', vStm: '', vEtm: '',  vnExtTm: '',
    };

    if ($.trim(option) == "0") {
        if (Venlen == 0)
            $$("grdVenue").add(addrow);
    }
    else if ($.trim(option) == "1") {

        if (Venlen != 0) {

            for (i = 0; i < Venlen; i++) {

                if (grdVenue[i].vDate == "") {
                    AlertMessage("Date Cannot be empty");
                    return false;
                }
                if (grdVenue[i].vSessionId == "") {
                    AlertMessage("Session Cannot be Exits");
                    return false;
                }

                if (grdVenue[i].vVenueId == "") {
                    AlertMessage("Venue Cannot be Exits");
                    return false;
                }
            }
            $$("grdVenue").add(addrow);
        }
        else if (Venlen == 0)

            $$("grdVenue").add(addrow);
    }


    $$("grdVenue").refresh();
}

function fnClearData() {

    var EmptySet = [];

    $$("ddlPlan").define("options", EmptySet);
    $$("ddlPlan").refresh();

    $$("ddlPlanItem").define("options", EmptySet);
    $$("ddlPlanItem").refresh();

    $$("ddlBlockTy").define("options", EmptySet);
    $$("ddlBlockTy").refresh();

    $$("ddlGuestType").define("options", EmptySet);
    $$("ddlGuestType").refresh();

    $$("ddlTit").define("options", EmptySet);
    $$("ddlTit").refresh();

    $$("txtGstName").setValue("");
    $$("txtFirstNm").setValue("");
    $$("txtHostBy").setValue("");
    $$("txtFrmDate").setValue("");
    $$("txtToDt").setValue("");
    $$("txtCrDate").setValue("");

    $$("ddlFunTy").setValue("");

    $$("ddlMarkSeg").setValue("");

    $$("ddlBusSrc").setValue("");

    $$("ddlSalesPer").setValue("");

    $$("txtBooker").setValue("");
    $$("txtReminder").setValue("");
    $$("txtRDate").setValue($("#hdnCurrentDt").val());
    $$("txtRTm").setValue("");
    $$("txtRTm").hide();
    $$("txtRDate").hide();
    $$("txtNarration").setValue("");

    $$("txtBlockNo").setValue("");
    $$("txtRate").setValue("");
    $$("txtGPax").setValue("");
    $$("txtExPax").setValue("");

    $$("txtReConfDt").setValue("");
    $$("ChkReconf").setValue("");

    //Venue Tap

    $$("grdVenue").clearAll();
    $$("grdVenue").refresh();

    $$("txtAddress").setValue("");
    $$("txtAddress1").setValue("");
    $$("txtAddress2").setValue("");
    $$("txtCity").setValue("");
    $$("txtPincode").setValue("");
    $$("txtPhone").setValue("");
    $$("txtMobile").setValue("");

    $$("txtEmail").setValue("");
    $$("txtEmail2").setValue("");
    $$("txtContactP").setValue("");

    $$("txtCPDesig").setValue("");
    $$("txtCPPhone").setValue("");
}

function fnDefBlockNewMode() {

    $$("txtBlckSrc").hide();
    $$("BQTabView").getTabbar().setValue("Details");
    $$("txtCrDate").setValue($("#hdnCurrentDt").val());
    fnVenueRowAdd('0');

    var rowData = fnLoadDefDropValue();

    ////--------------------------

    var TblBlckTy = rowData.TBLBLOCKTY;

    $$("ddlBlockTy").define("options", TblBlckTy);
    $$("ddlBlockTy").refresh();

    if (TblBlckTy.length > 0) {
        $$("ddlBlockTy").setValue(TblBlckTy[0].id);
    }

    //---------------

    var TblGstTy = rowData.TBLGUESTTY;

    $$("ddlGuestType").define("options", TblGstTy);
    $$("ddlGuestType").refresh();

    if ($("#hdnCurMode").val() == "N") {
        $$("ddlGuestType").setValue("O");
    }

    //------
    var TblFunct = rowData.TBLFUNCT;

    $$("ddlFunTy").define("options", TblFunct);
    $$("ddlFunTy").refresh();

    //------
    var TblMarket = rowData.TBLMARKET;

    $$("ddlMarkSeg").define("options", TblMarket);
    $$("ddlMarkSeg").refresh();

    //------
    var TblBuss = rowData.TBLBUSS;

    $$("ddlBusSrc").define("options", TblBuss);
    $$("ddlBusSrc").refresh();

    //------
    var TblTit = rowData.TBLTITLE;

    $$("ddlTit").define("options", TblTit);
    $$("ddlTit").refresh();

    if ($("#hdnCurMode").val() == "N") {
        $$("ddlTit").setValue("1");
    }

    //Sales Person
    var TblSales = rowData.TBLSALES;

    $$("ddlSalesPer").define("options", TblSales);
    $$("ddlSalesPer").refresh();

    var Plan = [{ "id": "P", "value": "PLN" }, { "id": "2", "value": "PCK" }];

    if ($("#hdnPkApplInd").val() != "1") {
        Plan = fnRemoveArry(Plan, 'id', '2');
    }

    $$("ddlPlan").define("options", Plan);
    $$("ddlPlan").refresh();

    if (Plan.length > 0) {
        $$("ddlPlan").setValue(Plan[0].id);
    }

    var TblPlan = rowData.TBLPLAN;

    var TblPlan1 = rowData.TBLPLAN1;

    if (TblPlan.length > 0) {

        if ($$("ddlPlan").getValue() == "P") {
            $$("ddlPlanItem").define("options", TblPlan);
        }
        else {
            $$("ddlPlanItem").define("options", TblPlan1);
        }

        $$("ddlPlanItem").refresh();
    }
}

function fnLoadDefDropValue() {

    var rowData = [];

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_LOADBLOCKDROP";
    dataparam["PROGNAME"] = "GET_BQRESCODE02";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        }
    });
    return rowData;
}

function fnCallPopUpGstSearch() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupGuestDet",
        head: $$("ddlGuestType").getText() + " Search",
        position: "center",
        minWidth: 1050,
        maxWidth: 1050,
        move: true,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,

        body: {
            view: 'form',
            minWidth: 1050,
            maxWidth: 1050,

            elements: [
                {
                    view: "datatable",
                    id: "grdGuestDet",
                    select: "row",
                    data: [],
                    height: 400,
                    scroll: "y",
                    scheme: {
                        $change: function (item) {
                            if ($.trim(item.ColInd) == "R" && $$("ddlGuestType").getValue() == "C") {
                                item.$css = "CompanyRowRed";
                            }
                        },
                    },
                    columns: [
                            { header: "Title", hidden: ($$("ddlGuestType").getValue() == "C" ? true : false), id: "TitleNm", width: 50, css: { 'text-align': 'Center ! important' } },
                            { header: [($("#hdnGstNmInd").val() == "0" ? "Name" : "Last Name"), { content: "textFilter" }], id: "GuestNm", width: ($$("ddlGuestType").getValue() == "C" ? 350 : ($("#hdnGstNmInd").val() == "0" ? 280 : 200)), css: { 'text-align': 'left ! important' } },
                            { header: ["First Name", { content: "textFilter" }], id: "GuestNmF", hidden: ($("#hdnGstNmInd").val() == "0" ? true : false), width: 130, css: { 'text-align': 'left ! important' } },
                            { header: ["Mobile", { content: "textFilter" }], id: "Mob", width: 110, css: { 'text-align': 'left ! important' } },
                            { header: ["Address", { content: "textFilter" }], id: "GstAddr", width: ($("#hdnGstNmInd").val() == "0" ? 250 : 200), css: { 'text-align': 'left ! important' } },
                            { header: ["City", { content: "textFilter" }], id: "Place", width: 130, css: { 'text-align': 'left ! important' } },
                            { header: ["Contact Name", { content: "textFilter" }], id: "Contact", width: 180, css: { 'text-align': 'left ! important' } },
                            { header: "TitleId", id: "TitleId", hidden: true },
                            { header: "GuestId", id: "GuestId", hidden: true },
                             { header: "GstAddr1", id: "GstAddr1", hidden: true },
                            { header: "GstAddr2", id: "GstAddr2", hidden: true },
                            { header: "GstAddr3", id: "GstAddr3", hidden: true },
                            { header: "PinCode", id: "PinCode", hidden: true },
                             { header: "Email", id: "Email", hidden: true },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            $("#LoadDIv").show();

                            var selectedRows = this.getSelectedItem(id.row);

                            $("#hdnGstId").val($.trim(selectedRows[0].GuestId));
                            $$("ddlTit").setValue(selectedRows[0].TitleId);

                            if ($$("ddlGuestType").getValue() == "C") {
                                $$("txtGstName").setValue(selectedRows[0].GuestNm);
                            }
                            else {
                                $$("txtGstName").setValue(selectedRows[0].GuestNm);
                                $$("txtFirstNm").setValue(selectedRows[0].GuestNmF);
                            }
                            $$("txtAddress").setValue($.trim(selectedRows[0].GstAddr1));
                            $$("txtAddress1").setValue($.trim(selectedRows[0].GstAddr2));
                            $$("txtAddress2").setValue($.trim(selectedRows[0].GstAddr3));
                            $$("txtCity").setValue($.trim(selectedRows[0].Place));
                            $$("txtPincode").setValue($.trim(selectedRows[0].PinCode));
                            $$("txtMobile").setValue($.trim(selectedRows[0].Mob));
                            $$("txtEmail").setValue($.trim(selectedRows[0].Email));
                            $$("txtContactP").setValue($.trim(selectedRows[0].Contact));
                            $$('PopupGuestDet').hide();
                            $("#LoadDIv").hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 950,
                             paddingX: 950,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopupGuestDet').hide();
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

    fnLoadGuestDetLoad();
    $$("PopupGuestDet").show();
}

function fnLoadGuestDetLoad() {

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BQGUESTSRCH";
    dataparam["PROGNAME"] = "GET_BQRESCODE02";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["GuestTy"] = $$("ddlGuestType").getValue();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdGuestDet").clearAll();
                $$("grdGuestDet").parse(rowData);
                $$("grdGuestDet").refresh();
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });
}

function fnOpenMode() {
    $$("txtBlckSrc").show();
    $$("BQTabView").getTabbar().setValue("Details");

    var rowData = fnLoadDefDropValue();

    var TblBlckTy = rowData.TBLBLOCKTY;

    $$("ddlBlockTy").define("options", TblBlckTy);
    $$("ddlBlockTy").refresh();

    if (TblBlckTy.length > 0) {
        $$("ddlBlockTy").setValue(TblBlckTy[0].id);
    }
}

function fnCallReservationPop() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopReserveSrch",
        head: "Block Search",
        position: "center",
        minWidth: 1050,
        maxWidth: 1050,
        resizeColumn: true,
        move: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 600,

        body: {
            view: 'form',
            minWidth: 1050,
            maxWidth: 1050,
            elements: [
                {
                    view: "datatable",
                    id: "grdResvSrch",
                    select: "row",
                    data: [],
                    height: 450,
                    scroll: "y",
                    columns: [
                            { header: ["Block#", { content: "textFilter" }, ], id: "RsvNo", width: 70, css: { 'text-align': 'Center ! important' } },
                            { header: "Type", id: "GuestTy", width: 80, css: { 'text-align': 'left ! important' } },
                            { header: ["Guest Name", { content: "textFilter" }], id: "GuestNm", width: 300, css: { 'text-align': 'left ! important' } },
                            { header: "Pax", id: "Gpax", width: 69, css: { 'text-align': 'Center ! important' } },
                            { header: "Function", id: "Function", width: 140, css: { 'text-align': 'left ! important' } },
                            { header: "Start Dt", id: "startDt", width: 85, css: { 'text-align': 'left ! important' } },
                            { header: "End Dt", id: "EndDt", width: 85, css: { 'text-align': 'left ! important' } },
                            { header: "Venue", id: "venueNM", width: 170, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            $("#LoadDIv").show();
                            var selectedRows = this.getSelectedItem(id.row);
                            fnClearData();

                            $$("txtBlockNo").setValue(selectedRows[0].RsvNo);
                            fnDefBlockNewMode();
                            fnOpenBlockDet(selectedRows[0].RsvNo);
                            $$('PopReserveSrch').hide();
                            $("#LoadDIv").hide();
                            
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 1050,
                             paddingX: 950,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             type: "icon",
                                             icon: "wxi-close-circle",
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$('PopReserveSrch').hide();
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

    fnLoadBlockDet();
    $$("PopReserveSrch").show();
}

function fnLoadBlockDet() {
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BQBLOCKSRCH";
    dataparam["PROGNAME"] = "GET_BQRESCODE02";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["BlockTy"] = $$("ddlBlockTy").getValue();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                var rowData = JSON.parse(d);
                $$("grdResvSrch").clearAll();
                $$("grdResvSrch").parse(rowData);
                $$("grdResvSrch").refresh();
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });
}

function fnOpenBlockDet(BlockNo) {
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BQBLOCKFILLDATA";
    dataparam["PROGNAME"] = "GET_BQRESCODE02";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["BlockNo"] = BlockNo;
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                debugger;
                var Filter = JSON.parse(d);

                $$("txtBlckSrc").show();

                var TblBlkData = Filter.TBLBLKDATA;

                var SelVenData = Filter.TBLVENDATA;

                $$("txtCrDate").setValue($.trim(TblBlkData[0].BLOCKDT));

                $("#hdnGstId").val($.trim(TblBlkData[0].GUEST_ID));

                $$("ddlGuestType").setValue($.trim(TblBlkData[0].GUEST_TYPE));

                $$("txtExPax").setValue($.trim(TblBlkData[0].NO_OF_PAX) != "" ? TblBlkData[0].NO_OF_PAX : 0);

                $$("txtGPax").setValue($.trim(TblBlkData[0].G_PAX) != "" ? TblBlkData[0].G_PAX : 0);

                $$("ddlFunTy").setValue($.trim(TblBlkData[0].FUNCTION_ID));

                $$("ddlMarkSeg").setValue($.trim(TblBlkData[0].MARKET_ID));

                $$("txtNarration").setValue($.trim(TblBlkData[0].NARRATION));

                var Rate = (TblBlkData[0].RATE != null && TblBlkData[0].RATE != "" ? parseFloat($.trim(TblBlkData[0].RATE)) : 0).toFixed(2);

                $$("txtRate").setValue(Rate);

                

                if ($.trim(TblBlkData[0].BLOCK_TY_ID) == "G" || $.trim(TblBlkData[0].BLOCK_TY_ID) == "O") {
                    $$("ddlTit").setValue($.trim($.trim(TblBlkData[0].GS_TI)));
                }

                if ($.trim(TblBlkData[0].RM_N) != "") {
                    $$("txtReminder").setValue($.trim(TblBlkData[0].RM_N));
                    $$("txtRDate").setValue(TblBlkData[0].RM_DT1);

                    var TimeFm1 = new Date('01/01/2020 ' + TblBlkData[0].RM_DTM)

                    $$("txtRTm").setValue(TimeFm1);

                    $$("txtRDate").show();
                    $$("txtRTm").show();
                }
                else {
                    $$("txtRDate").hide();
                    $$("txtRTm").hide();
                }

                $$("ddlBusSrc").setValue($.trim(TblBlkData[0].A1_ID));

                $$("txtReConfDt").setValue(TblBlkData[0].CNDT);

                $$("ChkReconf").setValue(TblBlkData[0].CNIND);

                if ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2") {
                    $$("txtFirstNm").show();
                    $$("txtGstName").define("width", 200);
                    $$("txtGstName").define("inputWidth", 200);
                    $$("txtGstName").resize();
                }
                else {
                    $$("txtFirstNm").hide();
                    $$("txtGstName").define("width", 350);
                    $$("txtGstName").define("inputWidth", 350);
                    $$("txtGstName").resize();
                }

                if ($.trim(TblBlkData[0].GUEST_TYPE) == "C") {
                    $$("txtHostBy").show();
                    $$("txtHostBy").setValue(TblBlkData[0].HS_B);
                    $$("txtFirstNm").hide();
                    $$("txtGstName").define("width", 350);
                    $$("txtGstName").define("inputWidth", 350);
                    $$("txtGstName").resize();
                    $$("ddlTit").hide();
                }
                else {
                    $$("ddlTit").show();
                }

                $$("txtGstName").setValue(TblBlkData[0].GUEST_NM);

                if (($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2") && $.trim(TblBlkData[0].GUEST_TYPE) != "C") {

                    if ($.trim(TblBlkData[0].GS_NM2) != "")
                        $$("txtGstName").setValue(TblBlkData[0].GS_NM2);

                    if ($.trim(TblBlkData[0].GS_NM1) != "")
                        $$("txtFirstNm").setValue(TblBlkData[0].GS_NM1);
                }

                $$("txtAddress").setValue($.trim(TblBlkData[0].ADD1));
                $$("txtAddress1").setValue($.trim(TblBlkData[0].ADD2));
                $$("txtAddress2").setValue($.trim(TblBlkData[0].ADD3));
                $$("txtCity").setValue($.trim(TblBlkData[0].PLACE));
                $$("txtPincode").setValue($.trim(TblBlkData[0].PIN_CD));
                $$("txtPhone").setValue($.trim(TblBlkData[0].TEL));
                $$("txtMobile").setValue($.trim(TblBlkData[0].MOBILE));
                $$("txtEmail").setValue($.trim(TblBlkData[0].EMAIL));
                $$("txtEmail2").setValue($.trim(TblBlkData[0].EMAIL2));
                $$("txtContactP").setValue($.trim(TblBlkData[0].CONTACT_PERSON));
                $$("txtCPDesig").setValue($.trim(TblBlkData[0].CONTACT_DESIGNATION));
                $$("txtCPPhone").setValue($.trim(TblBlkData[0].CONTACT_TEL));
               
                $$("txtFrmDate").setValue(TblBlkData[0].FROMDT);

                $$("txtToDt").setValue(TblBlkData[0].TODT);
               
                if (TblBlkData[0].B2_ID != "")
                    $$("ddlSalesPer").setValue($.trim(TblBlkData[0].B2_ID));

                if ($.trim(TblBlkData[0].P_IND) == "1")
                    $$("ddlPlan").setValue("2");
                else
                    $$("ddlPlan").setValue("P");
              
                var rowData = fnLoadDefDropValue();

                var TblPln = rowData.TBLPLAN;

                var TblPl1 = rowData.TBLPLAN1;

                if (TblPln.length > 0) {

                    if ($$("ddlPlan").getValue() == "P") {
                        $$("ddlPlanItem").define("options", TblPln);
                    }
                    else {
                        $$("ddlPlanItem").define("options", TblPl1);
                    }

                    $$("ddlPlanItem").refresh();
                }

                $$("ddlPlanItem").setValue($.trim(TblBlkData[0].PLAN_ID));

                if (SelVenData.length > 0) {
                    //Venue Tap Seeting SelVenData
                    $$("grdVenue").clearAll();
                    $$("grdVenue").parse(SelVenData);
                    $$("grdVenue").refresh();
                }
                else {
                    $$("grdVenue").clearAll();
                    $$("grdVenue").refresh();
                    fnVenueRowAdd('0');
                }

                $$("ddlBlockTy").setValue($.trim(TblBlkData[0].BLOCK_TY_ID));
            }
        },
    });
}

function prcSaveBQTransBlock() {

    if (!fnBQBlockValidate())
        return false;

    $("#LoadDIv").show();
    var dataparam = {};

    dataparam["REQTYPE"] = "GET_BQTRNBLOCKSAVE";
    dataparam["PROGNAME"] = "GET_BQRESCODE02";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    //******************* Reserve *********************************
    dataparam["GuestId"] = $("#hdnGstId").val();
    dataparam["ddlGuestTy"] = $.trim($$("ddlGuestType").getValue());
    dataparam["ddlGstTit"] = $.trim($$("ddlTit").getValue());
    dataparam["txtGstName"] = $.trim($$("txtGstName").getValue());
    dataparam["txtFirstNm"] = $.trim($$("txtFirstNm").getValue());
    dataparam["txtHostBy"] = $.trim($$("txtHostBy").getValue());
    dataparam["ddlBlockTy"] = $.trim($$("ddlBlockTy").getValue());

    dataparam["txtFromDt"] = $.trim($$("txtFrmDate").getValue());
    dataparam["txtToDt"] = $.trim($$("txtToDt").getValue());
    dataparam["txtCrDate"] = $.trim($$("txtCrDate").getValue());
    dataparam["txtBlockNo"] = $.trim($$("txtBlockNo").getValue());
    dataparam["ddlPlan"] = $.trim($$("ddlPlan").getValue());
    dataparam["ddlPlanItem"] = $.trim($$("ddlPlanItem").getValue());
    dataparam["txtRate"] = $.trim($$("txtRate").getValue());
    dataparam["txtGPax"] = $.trim($$("txtGPax").getValue());
    dataparam["txtExPax"] = $.trim($$("txtExPax").getValue());
    dataparam["txtReConfDt"] = $.trim($$("txtReConfDt").getValue());
    dataparam["ChkReconf"] = $.trim($$("ChkReconf").getValue());


    dataparam["ddlFuncTy"] = $.trim($$("ddlFunTy").getValue());
    dataparam["ddlMarkSeg"] = $.trim($$("ddlMarkSeg").getValue());
    dataparam["ddlBusSrc"] = $.trim($$("ddlBusSrc").getValue());
    dataparam["ddlSalesPer"] = $.trim($$("ddlSalesPer").getValue());

    dataparam["txtBooker"] = $.trim($$("txtBooker").getValue());
    dataparam["txtReminder"] = $.trim($$("txtReminder").getValue());
    dataparam["txtRDate"] = $.trim($$("txtRDate").getValue());

    if ($$("txtRTm").getValue() != "") {
        var TimeFm1 = new Date($$("txtRTm").getValue());
        dataparam["txtRTm"] = (TimeFm1.getHours().toString().length == 1 ? "0" + TimeFm1.getHours() : TimeFm1.getHours()) + ":"
            + (TimeFm1.getMinutes().toString().length == 1 ? "0" + TimeFm1.getMinutes() : TimeFm1.getMinutes());
    }
    else {
        dataparam["txtRTm"] = "00:00";
    }

    dataparam["txtNarration"] = $.trim($$("txtNarration").getValue());

    //***************************************** GUETS Details *******************

    dataparam["txtAddress"] = $.trim($$("txtAddress").getValue());
    dataparam["txtAddress1"] = $.trim($$("txtAddress1").getValue());
    dataparam["txtAddress2"] = $.trim($$("txtAddress2").getValue());

    dataparam["txtCity"] = $.trim($$("txtCity").getValue());
    dataparam["txtPincode"] = $.trim($$("txtPincode").getValue());
    dataparam["txtPhone"] = $.trim($$("txtPhone").getValue());

    dataparam["txtMobile"] = $.trim($$("txtMobile").getValue());
    dataparam["txtEmail"] = $.trim($$("txtEmail").getValue());
    dataparam["txtEmail2"] = $.trim($$("txtEmail2").getValue());

    dataparam["txtContactP"] = $.trim($$("txtContactP").getValue());
    dataparam["txtCPDesig"] = $.trim($$("txtCPDesig").getValue());
    dataparam["txtCPPhone"] = $.trim($$("txtCPPhone").getValue());

    ////***************************************Venue tap***********************
    var dsgrdVenue = $$("grdVenue").serialize();
    var GridDataSet = JSON.stringify(dsgrdVenue);
    dataparam["TBLVENUE"] = GridDataSet;

    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);

    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/BQTrans/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                if (rowData.vRetMsg == "1") {

                    var BlkNo = rowData.BLOCK_NO;

                    $$("BQTabView").getTabbar().setValue("Details");

                    var Mode = $("#hdnCurMode").val();

                    if ($.trim(Mode) == "N") {
                        AlertMessage("Block No:" + BlkNo + " Created Successfully");
                        $("#btnRef").click();
                        return;
                    }
                    else {
                        AlertMessage(" Updated Successfully");
                        $("#btnRef").click();
                        return;
                    }
                }
                else {
                    AlertMessage("Save Failed !");
                }

                $("#LoadDIv").hide();
            }
        },
    });

    $("#LoadDIv").hide();
}

function fnBQBlockValidate() {

    $$("BQTabView").getTabbar().setValue("Details");

    if ($$("ddlBlockTy").getValue() != "1") {
        if ($("#hdnGstId").val() == "") {
            FnGuestCreate();
            return false;
        }
    }

    if ($("#hdnCurMode").val() == "O") {
        if ($$("txtBlockNo").getValue() == "") {
            AlertMessage("Block No cannot be empty !");
            return false;
        }
    }

    if ($$("ddlBlockTy").getValue() == "") {
        AlertMessage("Block Type cannot be empty !");
        return false;
    }

    if ($$("txtCrDate").getValue() == "") {
        AlertMessage("Block Date cannot be empty !");
        return false;
    }

    if ($$("ddlBlockTy").getValue() != "1")
    {
        if ($.trim($$("ddlBlockTy").getValue()) == "2" || $.trim($$("ddlBlockTy").getValue()) == "3") {

            if ($("#hdnSpAppl").val() == "1" && $("#hdnspman").val() == "1" && $$("ddlSalesPer").getValue() == "") {
                AlertMessage("Sales Person cannot be empty !");
                return false;
            }
        }

        var txtExPax = ($$("txtExPax").getValue() == "" ? 0 : parseInt(txtExPax));

        var txtGPax = ($$("txtGPax").getValue() == "" ? 0 : parseInt(txtGPax));

        if (txtExPax == 0) {
            AlertMessage("Expected Pax cannot be empty !");
            return false;
        }

        if (txtGPax > txtExPax) {
            AlertMessage("Expected Pax should be Greater or equal to Guaranteed Pax");
            return false;
        }

        if ($$("ddlFunTy").getValue() == "") {
            AlertMessage("Function Type cannot be empty !");
            return false;
        }

        if ($$("ddlMarkSeg").getValue() == "") {
            AlertMessage("Market Segment cannot be empty !");
            return false;
        }
    }

    var data = $$("grdVenue").serialize();

    if (data.length != 0) {

        $$("BQTabView").getTabbar().setValue("VenueFrm");

        for (i = 0; i < data.length; i++) {

            var startTime = data[i].vStm;

            var endTime = data[i].vEtm;

            if (data[i].vDate == "") {
                AlertMessage("Date cannot be empty !");
                return false;
            }
            else if (data[i].vSessionId == "") {
                AlertMessage("Session cannot be empty !");
                return false;
            }
            else if (data[i].vVenueId == "") {
                AlertMessage("Venue cannot be empty !");
                return false;
            }
            else if (startTime == "") {
                AlertMessage("Start Time cannot be empty !");
                return false;
            }
            else if (endTime == "") {
                AlertMessage("End Time cannot be empty !");
                return false;
            }
        }
    }

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_BLOCKVALIDATION";
    dataparam["PROGNAME"] = "GET_BQRESCODE02";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();
    dataparam["BlockTy"] = $.trim($$("ddlBlockTy").getValue());
    dataparam["BlockNo"] = $.trim($$("txtBlockNo").getValue());

    var dsgrdVenue = $$("grdVenue").serialize();
    var GridDataSet = JSON.stringify(dsgrdVenue);
    dataparam["TBLVENUE"] = GridDataSet;

    var Output = 0;

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                rowData = JSON.parse(objRes);
                if ($.trim(rowData) != "True") {
                    AlertMessage($.trim(rowData));
                    Output = 1;
                }
            }
        },
    });

    return (Output == 1 ? false : true);
}

function fnValidVenueSession() {
    var grdData = $$("grdVenue").serialize();
    if (grdData.length != 0 && grdData.length != 1) {
        for (i = 0; i < grdData.length; i++) {
            for (j = 0; j < grdData.length; j++) {
                debugger;
                if (i != j) {

                    var vDate1 = grdData[j].vDate;

                    var vDate2 = grdData[i].vDate;

                    if ($.trim(grdData[j].vSessionId) == $.trim(grdData[i].vSessionId) && ($.trim(vDate1) == $.trim(vDate2))) {
                        AlertMessage("Session Duplication Cannot be Allowed !");
                        return false;
                    }
                }
            }
        }
    }
    return true;
}




function fnNewGuestUpdate(GstId, Fnm, Lnm, Title, Mob, Eml) {

    $$("txtGstName").setValue(Lnm);
    $$("txtFirstNm").setValue(Fnm);
    $$("ddlTit").setValue($.trim(Title));
    $("#hdnGstId").val($.trim(GstId));

    //$$('txtFirstNm').define("readonly", true);
    //webix.html.addCss($$("txtFirstNm").getNode(), "ReadOnlyText");
    //$$('txtFirstNm').refresh()
    //$$('txtGstName').define("readonly", true);
    //webix.html.addCss($$("txtGstName").getNode(), "ReadOnlyText");
    //$$('txtGstName').refresh();
    //$$('ddlTit').define("readonly", true);
    //webix.html.addCss($$("ddlTit").getNode(), "ReadOnlyText");
    //$$('ddlTit').refresh();
}