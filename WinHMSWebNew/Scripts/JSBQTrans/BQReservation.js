
var app = angular.module('BQTApp', ['webix']);

app.controller("BQTransController", function ($scope) {
    
    var currentURL = window.location.href;

    $("#hdnVBPageTy").val(getParameterByName("PageTy", currentURL));

    if ($("#hdnVBPageTy").val() == "VB") {

        $("#hdnVBProperty").val(getParameterByName("Property", currentURL));

        var Date = getParameterByName("ResDt", currentURL).split('/')

        var vdate = Date[2] + '/' + Date[1] + '/' + Date[0];

        $("#hdnVBDate").val(vdate);
    
        $("#hdnVBResvNo").val(getParameterByName("ResvNo", currentURL));

        $("#hdnVBBlockTy").val(getParameterByName("BlockTy", currentURL));

        $("#hdnVBVenueId").val(getParameterByName("VenueId", currentURL));

        $("#hdnVBVenueNm").val(getParameterByName("VenueNm", currentURL));

        $("#hdnVBSessId").val(getParameterByName("SessId", currentURL));

        $("#hdnVBSessNm").val(getParameterByName("SessNm", currentURL));

        $("#hdnVBSTm").val(getParameterByName("STm", currentURL));

        $("#hdnVBETm").val(getParameterByName("ETm", currentURL));
    }

    var searchicon = "<span class='webix_icon wxi-search'></span>";

    var Delicon = "<span class='webix_icon wxi-trash'></span>";

    //-------------------------------------------------- Venue Tap
    var VenueDataSet = fnDefaultVenue();

    var fnVenueSet = VenueDataSet.TBLVENUE;
  
    var fnSessionSet = VenueDataSet.TBLSESSION;

    var fnSetting = VenueDataSet.TBLSEAT;

    var fnOutDoor = VenueDataSet.TBLOUTDOOR;

    var fnDepart = VenueDataSet.TBLDEPART;

    //--------------------------------------------------- FB Tap

    var FVDataSet = fnDefaultFBTap();

    var fnFBPlan = FVDataSet.TBLPLAN;

    var fnFBPkg = FVDataSet.TBLPKG;

    var fnFBPkg1 = FVDataSet.TBLPKG1;

    var fnVenCap = FVDataSet.TBLVENCAP;

    var fnVenCap1 = FVDataSet.TBLVENCAP1;
    
    //---------------------------------------------------Menu tap
    var FnMenutap=fnLoadDefMenu();
    
    var MenuGrp = FnMenutap.TBLBNGRP;

    $("#LoadDIv").hide();
 
    fnAccountDt();
    fnLoadMstCompany();
    fnLoadBNControl();
    $scope.frmBQReservation = {

        id: "frmBQReservation",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        disabled:true,
        elements: [
            {
                rows: [
                   {
                       width: 1320,
                       height: 550,
                       id:"BQTabView",
                       view: "tabview",
                       type: "space",
                       cells: [
                         {
                             header: "<span class='fa fa-home'></span>Reserve",
                             body: {
                                 id: "ReserveFrm",
                                 view: "form",
                                 select: true,
                                 elements: [
                                     {
                                         rows: [
                                             {
                                                 cols: [
                                                     {
                                                         width: 850,
                                                         rows: [
                                                             {
                                                                 cols: [
                                                                     {
                                                                         view: "richselect",
                                                                         id: "ddlGuestTy",
                                                                         label: " Guest Type",
                                                                         labelAlign: "Right",
                                                                         labelWidth: 130,
                                                                         inputWidth: 230,
                                                                         width: 230,
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
                                                                                 else
                                                                                 {
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
                                                                                     ;$$("txtGstName").define("placeholder", "")
                                                                                     $$("txtGstName").define("readonly", true);
                                                                                     $$("txtGstName").resize();
                                                                                     $$("txtGstName").refresh();
                                                                                     $$("ddlTit").hide();
                                                                                 }
                                                                                 else
                                                                                 {
                                                                                     $$("txtHostBy").hide();
                                                                                     $$("txtGstName").define("placeholder", ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2" ? "Last Name" : "Name"));
                                                                                     $$("txtGstName").define("readonly", false);
                                                                                     $$("txtGstName").refresh();
                                                                                     $$("ddlTit").show();
                                                                                 }
                                                                                 if (newval == "C" || newval == "G") {
                                                                                     $$("btnCmpSrch").show();
                                                                                 }
                                                                                 else {
                                                                                     $$("btnCmpSrch").hide();
                                                                                 }
                                                                             }
                                                                         }
                                                                     },
                                                                     {
                                                                         view: "button",
                                                                         id: 'btnCmpSrch',
                                                                         minWidth: 250,
                                                                         labelWidth: 0,
                                                                         width: 30,
                                                                         height: 28,
                                                                         type: 'icon',
                                                                         icon: 'wxi-search',
                                                                         css: "Ar_search",
                                                                         hidden:true,
                                                                         on: {
                                                                             onItemClick: function () {
                                                                                 fnCallPopUpCmpSrch();
                                                                             }
                                                                         }
                                                                     },
                                                                     {width:20,
                                                                     },
                                                                     {
                                                                         view: "richselect",
                                                                         id: "ddlTit",
                                                                         label: " Title",
                                                                         labelAlign: "Right",
                                                                         labelWidth: 50,
                                                                         inputWidth: 130,
                                                                         width: 130,
                                                                         on: {
                                                                             onChange: function (newval, oldval) {
                                                                             }
                                                                         }
                                                                     },
                                                                     {
                                                                         view: "text",
                                                                         id: "txtGstName",
                                                                         labelAlign: "Right",
                                                                         inputWidth: ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2" ? 200 : 350),
                                                                         placeholder: ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2" ? "Last Name" : "Name"),
                                                                         width: ($("#hdnGstNmInd").val() == "1" || $("#hdnGstNmInd").val() == "2" ? 200 : 350),
                                                                         on: {
                                                                             onBlur: function () {
                                                                                 if ($$("txtGstName").getValue() != "" && $$("ddlGuestTy").getValue() == "O")
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
                                                                         on: {
                                                                             onChange: function (newval, oldval) {

                                                                                 //if ($("#hdnGstId").val() == "") {
                                                                                 //    FnGuestCreate();
                                                                                 //    return;
                                                                                 //}
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
                                                                                 if ($$("ddlGuestTy").getValue() != "M")
                                                                                     fnCallPopUpGstSearch();
                                                                                 else
                                                                                     fnCallMemberSearch();
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
                                                                         hidden: true,
                                                                         icon: 'fa fa-users',
                                                                         on: {
                                                                             onItemClick: function () {
                                                                                  fnCallGuestProfile($("#hdnCompId").val(), $$("ddlGuestTy").getValue(), $("#hdnGstId").val(), $$("ddlTit").getValue(), $$("txtFirstNm").getValue(), $$("txtGstName").getValue(), $("#hdnGstNmInd").val());
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
                                                                  labelAlign: "Right",
                                                                  labelWidth: 130,
                                                                  inputWidth: 450,
                                                                  hidden:true,
                                                                  width: 450,
                                                              },
                                                             {
                                                                 cols: [
                                                                    {
                                                                        view: "datepicker",
                                                                        id: "txtFrmDate",
                                                                        disable: true,
                                                                        stringResult: true,
                                                                        label: "Function From Dt",
                                                                        format: "%d/%m/%Y",
                                                                        readonly: true,
                                                                        labelAlign: "Right",
                                                                        inputWidth: 250,
                                                                        labelWidth: 130,
                                                                        width: 250,
                                                                        icons: false,
                                                                    },
                                                                    {
                                                                        view: "datepicker",
                                                                        id: "txtToDt",
                                                                        disable: true,
                                                                        stringResult: true,
                                                                        label: "To Dt",
                                                                        format: "%d/%m/%Y",
                                                                        readonly: true,
                                                                        labelAlign: "Right",
                                                                        inputWidth: 190,
                                                                        labelWidth: 60,
                                                                        width: 190,
                                                                        icons: false,
                                                                    }
                                                                 ]
                                                             },
                                                             {
                                                                 view: "richselect",
                                                                 id: "ddlFunTy",
                                                                 label: "Function Type",
                                                                 labelAlign: "Right",
                                                                 labelWidth: 130,
                                                                 inputWidth: 400,
                                                                 width: 400,
                                                                 on: {
                                                                     onChange: function (newval, oldval) {

                                                                         //if ($("#hdnGstId").val() == "") {
                                                                         //    FnGuestCreate();
                                                                         //    return;
                                                                         //}
                                                                     }
                                                                 }
                                                             },
                                                             {
                                                                 view: "richselect",
                                                                 id: "ddlMarkSeg",
                                                                 label: "Market Segment",
                                                                 labelAlign: "Right",
                                                                 labelWidth: 130,
                                                                 inputWidth: 400,
                                                                 width: 400,
                                                                 on: {
                                                                     onChange: function (newval, oldval) {

                                                                     }
                                                                 }
                                                             },
                                                             {
                                                                 view: "richselect",
                                                                 id: "ddlBusSrc",
                                                                 label: "Business Source",
                                                                 labelAlign: "Right",
                                                                 labelWidth: 130,
                                                                 inputWidth: 400,
                                                                 width: 400,
                                                                 on: {
                                                                     onChange: function (newval, oldval) {
                                                                     }
                                                                 }
                                                             },
                                                             {
                                                                 view: "richselect",
                                                                 id: "ddlSetMode",
                                                                 label: " Settlement Mode",
                                                                 labelAlign: "Right",
                                                                 labelWidth: 130,
                                                                 inputWidth: 400,
                                                                 width: 400,
                                                                 on: {
                                                                     onChange: function (newval, oldval) {
                                                                     }
                                                                 }
                                                             },
                                                              {
                                                                  view: "richselect",
                                                                  id: "ddlBillInst",
                                                                  label: " Billing Instruction",
                                                                  labelAlign: "Right",
                                                                  labelWidth: 130,
                                                                  inputWidth: 400,
                                                                  width: 400,
                                                                  on: {
                                                                      onChange: function (newval, oldval) {

                                                                      }
                                                                  }
                                                              },
                                                             {
                                                                 view: "richselect",
                                                                 id: "ddlChannel",
                                                                 label: " Channel",
                                                                 labelAlign: "Right",
                                                                 labelWidth: 130,
                                                                 inputWidth: 400,
                                                                 width: 400,
                                                                 hidden:($("#hdnChAppl").val()=="1"?false:true),
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
                                                                 labelWidth: 130,
                                                                 inputWidth: 400,
                                                                 width: 400,
                                                                 hidden:($("#hdnSpAppl").val()=="1"?false:true),
                                                                 on: {
                                                                     onChange: function (newval, oldval) {

                                                                     }
                                                                 }
                                                             },
                                                             {
                                                                 cols: [
                                                                     {
                                                                         view: "text",
                                                                         id: "txtBooker",
                                                                         stringResult: true,
                                                                         label: "Booker",
                                                                         labelAlign: "Right",
                                                                         labelWidth: 130,
                                                                         inputWidth: 400,
                                                                         readonly:true,
                                                                         width: 400,
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
                                                                         labelWidth: 130,
                                                                         inputWidth: 400,
                                                                         width: 400,
                                                                         on: {
                                                                             onBlur: function ()
                                                                             {
                                                                                 if ($$("txtReminder").getValue() != "")
                                                                                 {
                                                                                     $$("txtRDate").show();
                                                                                     $$("txtRTm").show();
                                                                                     $$("ChkClsRem").show();
                                                                                 }
                                                                                 else
                                                                                 {
                                                                                     $$("txtRDate").hide();
                                                                                     $$("txtRTm").hide();
                                                                                     $$("ChkClsRem").hide();
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
                                                                         labelAlign: "Right",
                                                                         inputWidth: 240,
                                                                         labelWidth: 110,
                                                                         hidden:true,
                                                                         width: 240,
                                                                     },
                                                                     {
                                                                         view: "datepicker",
                                                                         format: "%H:%i",
                                                                         id: "txtRTm",
                                                                         label: "Time",
                                                                         labelAlign: "Right",
                                                                         labelWidth: 50,
                                                                         inputWidth: 135,
                                                                         width: 135,
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
                                                                  labelWidth: 130,
                                                                  inputWidth: 700,
                                                                  height:80,
                                                                  width: 700,
                                                              },
                                                              {
                                                                  view: "richselect",
                                                                  id: "ddlCurId",
                                                                  label: " Currency",
                                                                  labelAlign: "Right",
                                                                  labelWidth: 130,
                                                                  inputWidth: 400,
                                                                  width: 400,
                                                                  hidden:($("#hdnFornCurAppl").val()=="1"?false:true),
                                                              },
                                                              {
                                                                  cols: [
                                                                      {
                                                                          view: "label",
                                                                          id: "lblAdvAmt",
                                                                          stringResult: true,
                                                                          label: "Advance Amt:",
                                                                          labelAlign: "Right",
                                                                          labelWidth: 200,
                                                                          hidden:true,
                                                                          width: 200,
                                                                      },
                                                                      {
                                                                          view: "label",
                                                                          id: "txtAdvAmt",
                                                                          stringResult: true,
                                                                          labelAlign: "Right",
                                                                          labelWidth: 100,
                                                                          inputWidth: 100,
                                                                          hidden:true,
                                                                          width: 100,
                                                                      },
                                                                      {
                                                                          view: "label",
                                                                          id: "lblDisAmt",
                                                                          stringResult: true,
                                                                          label: "Deposit Amt:",
                                                                          labelAlign: "Right",
                                                                          labelWidth: 80,
                                                                          width: 130,
                                                                          hidden:true,
                                                                      },
                                                                      {
                                                                          view: "label",
                                                                          id: "txtDisAmt",
                                                                          stringResult: true,
                                                                          labelAlign: "Right",
                                                                          labelWidth: 1,
                                                                          inputWidth: 100,
                                                                          hidden:true,
                                                                          width: 200,
                                                                      }
                                                                  ]
                                                              },
                                                         ]
                                                     },
                                                     //Right Panel
                                                     {
                                                         width: 500,
                                                         rows: [
                                                                {
                                                                    cols: [
                                                                       {
                                                                           view: "text",
                                                                           id: "txtResvNo",
                                                                           stringResult: true,
                                                                           label: "Reservation No",
                                                                           labelAlign: "Right",
                                                                           readonly:true,
                                                                           labelWidth: 140,
                                                                           inputWidth: 250,
                                                                           width: 250,
                                                                       },
                                                                       {
                                                                           view: "button",
                                                                           id: 'txtResvSrc',
                                                                           minWidth: 250,
                                                                           labelWidth: 0,
                                                                           width: 30,
                                                                           height: 28,
                                                                           type: 'icon',
                                                                           icon: 'wxi-search',
                                                                           css: "Ar_search",
                                                                           hidden:true,
                                                                           on: {
                                                                               onItemClick: function () {
                                                                                   fnCallReservationPop('RESV');
                                                                               }
                                                                           }
                                                                       }
                                                                    ]
                                                                },
                                                              {
                                                                  view: "datepicker",
                                                                  id: "txtResvDt",
                                                                  disable: true,
                                                                  stringResult: true,
                                                                  label: "Reservation Dt",
                                                                  format: "%d/%m/%Y",
                                                                  value: $("#hdnCurrentDt").val(),
                                                                  labelAlign: "Right",
                                                                  inputWidth: 260,
                                                                  labelWidth: 140,
                                                                  width: 250,
                                                              },
                                                              {
                                                                   view: "richselect",
                                                                   id: "ddlStatus",
                                                                   label: " Status",
                                                                   labelAlign: "Right",
                                                                   labelWidth: 140,
                                                                   inputWidth: 250,
                                                                   width: 250,
                                                                   //options: Staus,
                                                                   //value:"R",
                                                                   on: {
                                                                       onChange: function (newval, oldval) {
                                                                           if ($.trim(newval) == "2")
                                                                               $$("txtCutdt").show();
                                                                           else
                                                                               $$("txtCutdt").hide();
                                                                       }
                                                                   }
                                                               },
                                                               {
                                                                   view: "datepicker",
                                                                   id: "txtCutdt",
                                                                   disable: true,
                                                                   stringResult: true,
                                                                   label: "Cut-Off Date",
                                                                   format: "%d/%m/%Y",
                                                                   value: $("#hdnCurrentDt").val(),
                                                                   labelAlign: "Right",
                                                                   inputWidth: 260,
                                                                   labelWidth: 140,
                                                                   width: 250,
                                                                   hidden:true,
                                                               },
                                                               {
                                                                   view: "text",
                                                                   id: "txtGPax",
                                                                   label: "Guaranteed Pax",
                                                                   labelAlign: "Right",
                                                                   labelWidth: 140,
                                                                   inputWidth: 200,
                                                                   width: 200,
                                                                   hidden:true,
                                                               },
                                                               {
                                                                   view: "text",
                                                                   id: "txtCGst",
                                                                   stringResult: true,
                                                                   label: "Chief Guest",
                                                                   labelAlign: "Right",
                                                                   labelWidth: 140,
                                                                   inputWidth: 400,
                                                                   width: 400,
                                                                   on:{
                                                                       onKeyPress:function(code, e)
                                                                       {
                                                                           if($$("txtCGst").getValue()=="")
                                                                               $$("txtArrTm").hide();
                                                                           else
                                                                               $$("txtArrTm").show();

                                                                           $$("txtCGst").attachEvent("onChange", function(newv, oldv){

                                                                               if($$("txtCGst").getValue()=="")
                                                                                   $$("txtArrTm").hide();
                                                                               else
                                                                                   $$("txtArrTm").show();
                                                                           });
                                                                       },
                                                                   }
                                                               },
                                                               {
                                                                   view: "datepicker",
                                                                   format: "%H:%i",
                                                                   id: "txtArrTm",
                                                                   label: "Arrival Time",
                                                                   labelAlign: "Right",
                                                                   labelWidth: 140,
                                                                   inputWidth: 240,
                                                                   width: 240,
                                                                   hidden:true,
                                                                   suggest: {
                                                                       type: "calendar",
                                                                       body: {
                                                                           type: "time",
                                                                           calendarTime: "%H:%i"
                                                                       }
                                                                   }
                                                               },
                                                                {
                                                                    view: "text",
                                                                    id: "txtBaner",
                                                                    stringResult: true,
                                                                    label: "Banner Head",
                                                                    labelAlign: "Right",
                                                                    labelWidth: 140,
                                                                    inputWidth: 400,
                                                                    width: 400,
                                                                },
                                                                {
                                                                    view: "text",
                                                                    id: "txtBookRef",
                                                                    stringResult: true,
                                                                    label: "Booking Reference",
                                                                    labelAlign: "Right",
                                                                    labelWidth: 140,
                                                                    inputWidth: 400,
                                                                    width: 400,
                                                                },
                                                                {
                                                                    cols: [
                                                                        {
                                                                            id: "ChkLMusic",
                                                                            view: "checkbox",
                                                                            label: "Loud Music",
                                                                            labelAlign: "Right",
                                                                            labelWidth: 140,
                                                                            width: 200,
                                                                            hidden:($("#hdnLoudMusAppl").val()=="1"?false:true),
                                                                            on: {
                                                                                "onChange": function () {
                                                                                }
                                                                            }
                                                                        },
                                                                        
                                                                    ]
                                                                },
                                                                 {
                                                                     id: "ChkClsRem",
                                                                     view: "checkbox",
                                                                     label: "Close Reminder",
                                                                     labelAlign: "Right",
                                                                     labelWidth: 140,
                                                                     hidden:true,
                                                                     width: 200,
                                                                     on: {
                                                                         "onChange": function () {

                                                                         }
                                                                     }
                                                                 },
                                                                 {
                                                                     cols: [
                                                                         {
                                                                             view: "checkbox",
                                                                             id: "chkComappl",
                                                                             stringResult: true,
                                                                             label: "Commision Applicable",
                                                                             labelAlign: "Right",
                                                                             labelWidth: 140,
                                                                             inputWidth: 180,
                                                                             width: 180,
                                                                             hidden:($("#hdnComisnAppl").val()=="1"?false:true),
                                                                             on: {
                                                                                 "onChange": function (newval,oldvalue) {

                                                                                     if($.trim(newval)=="1")
                                                                                     {
                                                                                         $$("txtApprBy").show();
                                                                                         $$("txtComNar").show();
                                                                                     }
                                                                                     else
                                                                                     {
                                                                                         $$("txtApprBy").hide();
                                                                                         $$("txtComNar").hide();
                                                                                     }
                                                                                 }
                                                                             }
                                                                         },
                                                                         {
                                                                             view: "text",
                                                                             id: "txtApprBy",
                                                                             label: "Approved By",
                                                                             labelAlign: "Right",
                                                                             labelWidth: 80,
                                                                             inputWidth: 220,
                                                                             width: 230,
                                                                             hidden:true,
                                                                         }
                                                                     ]
                                                                 },
                                                                 {
                                                                     view: "textarea",
                                                                     id: "txtComNar",
                                                                     stringResult: true,
                                                                     label: "Commission Narration",
                                                                     labelAlign: "Right",
                                                                     labelWidth: 140,
                                                                     inputWidth: 400,
                                                                     hidden:true,
                                                                     width: 400,
                                                                     height:55,
                                                                 },
                                                                 {
                                                                     cols: [
                                                                         {
                                                                             rows: [
                                                                                 {
                                                                                     view: "checkbox",
                                                                                     id: "ChkStgSetup",
                                                                                     stringResult: true,
                                                                                     label: "Stage Setup Required",
                                                                                     labelAlign: "Right",
                                                                                     labelWidth: 140,
                                                                                     inputWidth: 180,
                                                                                     hidden:($("#hdnStageAppl").val()=="1"?false:true),
                                                                                     width: 180,
                                                                                     on: {
                                                                                         "onChange": function (newval,oldvalue) {

                                                                                             if($.trim(newval)=="1")
                                                                                                 $$("txtChf").show();
                                                                                             else
                                                                                                 $$("txtChf").hide();
                                                                                         }
                                                                                     }
                                                                                 },
                                                                                 {
                                                                                     view: "checkbox",
                                                                                     id: "ChkShiftPri",
                                                                                     stringResult: true,
                                                                                     label: "Break Shift Prior",
                                                                                     labelAlign: "Right",
                                                                                     labelWidth: 140,
                                                                                     inputWidth: 180,
                                                                                     width: 180,
                                                                                     value: ( $("#hdnBrshiftAppl").val()=="1"?"1":"0"),
                                                                                     hidden:( $("#hdnBrshiftAppl").val()=="1"?false:true),
                                                                                 },
                                                                                 {
                                                                                     view: "checkbox",
                                                                                     id: "ChkShiftAft",
                                                                                     stringResult: true,
                                                                                     label: "Break Shift After",
                                                                                     labelAlign: "Right",
                                                                                     labelWidth: 140,
                                                                                     inputWidth: 180,
                                                                                     value: ( $("#hdnBrshiftAppl").val()=="1"?"1":"0"),
                                                                                     hidden:( $("#hdnBrshiftAppl").val()=="1"?false:true),
                                                                                     width: 180,
                                                                                 },
                                                                             ]
                                                                         },
                                                                         {
                                                                             view: "textarea",
                                                                             id: "txtChf",
                                                                             //label: "",
                                                                             labelAlign: "Right",
                                                                             placeholder: "Setup Narration",
                                                                             labelWidth: 30,
                                                                             inputWidth: 220,hidden:true,
                                                                             width: 220,
                                                                         }
                                                                     ]
                                                                 },
                                                         ]
                                                     }
                                                 ]
                                             }
                                         ]
                                     }
                                 ]
                             }
                         },
                         {
                             header: "<span class='fa fa-street-view'></span>Venue",
                             body: {
                                 id: "VenueFrm",
                                 view: "form",
                                 elements: [
                                     {
                                         rows: [
                                             {
                                                 cols: [
                                                    {
                                                        view: "datatable",
                                                        id: "grdVenue",
                                                        select: "row",
                                                        data: [],
                                                        height: 450,
                                                        width: 600,
                                                        editable: true,
                                                        scroll: "y",
                                                        //scroll: true,
                                                        columns: [
                                                                { header: "RowId", id: "RowId", width: 30, hidden: true, },
                                                                {
                                                                    header: "Date", id: "vDate", width: 85, editor: 'date', format: webix.Date.dateToStr("%d/%m/%Y"), stringResult: true, liveEdit: true, css: { 'text-align': 'left ! important' },
                                                                },
                                                                { header: "Session", id: "vSessionId", width: 60, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return fnSessionSet; } },
                                                                { header: "Venue", id: "vVenueId", width: 150, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return fnVenueSet; } },
                                                                { header: "S.Tm", id: "vStm", width: 60, editor: 'text', liveEdit: true, css: { 'text-align': 'Center ! important' } },
                                                                { header: "E.Tm", id: "vEtm", width: 60, editor: 'text', liveEdit: true, css: { 'text-align': 'Center ! important' } },
                                                                { header: "Main", id: "vChkmain", checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 40, css: { 'text-align': 'center ! important' } },
                                                                { header: "Linked", id: "vChklink", checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 50, css: { 'text-align': 'center ! important' } },
                                                                { header: "Ext.Time", id: "vnExtTm", width: 100, hidden:true, css: { 'text-align': 'center ! important' }, editor: "select", liveEdit: true, collection: function (id) { return fnVenueSet; } },
                                                                { header: "Hold", id: "vChkHold", checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 40, css: { 'text-align': 'left ! important' } },
                                                                { header: "vHoldRes", id: "vHoldRes", hidden: true, },
                                                                { header: "VenueId", id: "vVenueNm", hidden: true, },
                                                                { header: "vSessionId", id: "vSessionNm", hidden: true, },
                                                                { header: "vSeatId", id: "vSeatId", hidden: true, },
                                                                { header: "vODLocID", id: "vODLocID", hidden: true, },
                                                                { header: "vF_NO", id: "vF_NO", hidden: true, },
                                                                { header: "vD_NO", id: "vD_NO", hidden: true, },
                                                                { header: "vF_ind", id: "vF_ind", hidden: true, },
                                                                { header: "vf_sno", id: "vf_sno", hidden: true, },
                                                                { header: "vsnsTm", id: "vsnsTm", hidden: true, },
                                                                { header: "vsnEtm", id: "vsnEtm", hidden: true, },
                                                                { header: "vPgStm", id: "vPgStm", hidden: true, },
                                                                { header: "vpgEtm", id: "vpgEtm", hidden: true, },
                                                                { header: "vEventNm", id: "vEventNm", hidden: true, },
                                                                { header: "vMvid", id: "vMvid", hidden: true, },
                                                               
                                                                { header: "", id: "btnVDel", width: 40, template: Delicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                                        ],
                                                        rules:{
                                                            vDate: webix.rules.isNotEmpty,
                                                            vSessionId: webix.rules.isNotEmpty,
                                                            vVenueId: webix.rules.isNotEmpty,
                                                            vStm: webix.rules.isNotEmpty,
                                                            vEtm: webix.rules.isNotEmpty,
                                                            //email: webix.rules.isEmail,
                                                            //password: webix.rules.isNumber,
                                                            //accept: webix.rules.isChecked
                                                        },
                                                        on: {
                                                            onSelectChange: function () {

                                                                var SelId = $$("grdVenue").getSelectedId();

                                                                if (SelId != undefined) {

                                                                    var RowId = SelId.row;
                                                                    var getval = $$("grdVenue").getItem(RowId);

                                                                    if (getval.vSeatId != "")
                                                                        $$("ddlSeating").setValue(getval.vSeatId);
                                                                    else
                                                                        $$("ddlSeating").setValue("");

                                                                    var Filter3 = fnVenCap.filter(function (fnVenCap) {
                                                                        return (fnVenCap.VENUE_ID == $.trim(getval.vVenueId)) && (fnVenCap.S_ID == $.trim(getval.vSeatId));
                                                                    });

                                                                    if (Filter3.length > 0) {
                                                                        $$("txtMinPax").setValue(Filter3[0]["MIN_PAX"]);
                                                                        $$("txtMaxPax").setValue(Filter3[0]["MAX_PAX"]);
                                                                    }

                                                                    if (getval.vsnsTm != "") {

                                                                        $$("txtSnackPicTm").setValue(getval.vsnsTm);
                                                                    }
                                                                    else
                                                                        $$("txtSnackPicTm").setValue("");

                                                                    if (getval.vPgStm != "") {

                                                                        $$("txtServerTm").setValue(getval.vPgStm);
                                                                    }
                                                                    else
                                                                        $$("txtServerTm").setValue("");

                                                                    if (getval.vEventNm != "")
                                                                        $$("txtEventNM").setValue(getval.vEventNm);
                                                                    else
                                                                        $$("txtEventNM").setValue("");

                                                                    if (getval.vsnEtm != "") {
                                                                        $$("txtEventTm").setValue(getval.vsnEtm);
                                                                    }
                                                                    else
                                                                        $$("txtEventTm").setValue("");

                                                                    if (getval.vpgEtm != "") {
                                                                        $$("txtEndTm").setValue(getval.vpgEtm);
                                                                    }
                                                                    else
                                                                        $$("txtEndTm").setValue("");

                                                                    var dtdepart = $$("grdDepartShow").serialize();

                                                                    if (dtdepart.length != 0) {

                                                                        var Dept = dtdepart.filter(function (dtdepart) {
                                                                            return dtdepart.hdnSessionId == getval.vSessionId;
                                                                        });

                                                                        if (Dept.length != 0) {
                                                                            $$("grdDepart").clearAll();
                                                                            $$("grdDepart").parse(Dept);
                                                                            $$("grdDepart").refresh();
                                                                        }
                                                                        else {
                                                                            fnDepartRowAdd('0');
                                                                        }
                                                                    }
                                                                    else {
                                                                        fnDepartRowAdd('0');
                                                                    }
                                                                }
                                                            },
                                                            'onItemClick': function (id, value) {

                                                                var RowIndex = $$("grdVenue").getIndexById(id.row);

                                                                if (id.column == 'btnVDel') {

                                                                    webix.confirm({
                                                                        title: "Confirmation !",
                                                                        ok: "Yes", cancel: "No",
                                                                        text: "Are you sure to Delete this line Item !"
                                                                    })
                                                                  .then(function () {
                                                                      var getval = $$("grdVenue").getItem(id);

                                                                      $$("grdVenue").editCancel();
                                                                      $$("grdVenue").remove($$("grdVenue").getSelectedId());
                                                                      $$("grdVenue").refresh();

                                                                      fnCallVenueDelete(getval.RowId);
                                                                  })
                                                                  .fail(function () {
                                                                        
                                                                  });
                                                                }
                                                            },
                                                            'onAfterEditStop': function (state, editor) {

                                                                if (editor.column == 'vDate') {

                                                                    $$("txtFrmDate").setValue(state.value);
                                                                    $$("txtToDt").setValue(state.value);
                                                                }

                                                                if (editor.column == 'vSessionId' || editor.column == 'vVenueId' || editor.column == 'vDate') {
                                                                    fnCallDepartStore();
                                                                }
                                                            },
                                                            'onEditorChange': function (id, value, row) {

                                                                var getval = this.getItem(id);

                                                                if (id.column == 'vSessionId') {

                                                                    var Filter1 = fnSessionSet.filter(function (fnSessionSet) {
                                                                        return fnSessionSet.id == $.trim(value);
                                                                    });

                                                                    getval.vStm = Filter1[0]["S_T"];
                                                                    getval.vEtm = Filter1[0]["E_T"];
                                                                    getval.vSessionNm = Filter1[0]["value"];
                                                                    getval.vSessionId = value;

                                                                    if (!fnValidVenueSession())
                                                                        return false;

                                                                    var data = $$("grdDepart").serialize();
                                                                    if (data.length > 0) {

                                                                        var getval = $$("grdDepart").getItem($$("grdDepart").getFirstId());

                                                                        var Departid = getval.Departid;

                                                                        var AidsId = getval.AidsId;

                                                                        if ($.trim(Departid) == "" && $.trim(AidsId) == "") {
                                                                            fnDepartRowAdd('0');
                                                                        }
                                                                    }
                                                                    else {
                                                                        fnDepartRowAdd('0');
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

                                                                    var filterOD = fnVenCap1.filter(function (fnVenCap1) {
                                                                        return fnVenCap1.VENUE_ID == value;
                                                                    });

                                                                    $("#hdnODLocId").val(filterOD[0]["DIND"]);

                                                                    if (filterOD[0]["DIND"] == "1")
                                                                        $$("ddlODLoc").show();
                                                                    else
                                                                        $$("ddlODLoc").hide();
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
                                                        width:10,
                                                    },
                                                    {
                                                        rows:[
                                                            {
                                                                cols: [
                                                                   {
                                                                       view: "richselect",
                                                                       id: "ddlSeating",
                                                                       label: "Seating",
                                                                       labelAlign: "Left",
                                                                       labelWidth: 110,
                                                                       inputWidth: 350,
                                                                       width: 360,
                                                                       options: fnSetting,
                                                                       value:"00",
                                                                       on: {
                                                                           onChange: function (newval, oldval) {

                                                                               var id = $$("grdVenue").getSelectedId();

                                                                               var id1 = $$("grdVenue").getSelectedId(true);

                                                                               if(id != undefined)
                                                                               {
                                                                                   var item = $$("grdVenue").getItem(id.row);
                                                                                   item.vSeatId = newval;

                                                                                   var Filter3 = fnVenCap.filter(function (fnVenCap) {
                                                                                       return (fnVenCap.VENUE_ID == $.trim(item.vVenueId)) && (fnVenCap.S_ID == $.trim(newval));
                                                                                   });

                                                                                   if (Filter3.length > 0) {
                                                                                       $$("txtMinPax").setValue(Filter3[0]["MIN_PAX"]);
                                                                                       $$("txtMaxPax").setValue(Filter3[0]["MAX_PAX"]);
                                                                                   }

                                                                                   $$("grdVenue").updateItem(id.row, item);
                                                                                   $$("grdVenue").refresh();
                                                                               }
                                                                           }
                                                                       },
                                                                   },
                                                                   {
                                                                       view: "text",
                                                                       id: "txtMinPax",
                                                                       label: "Min Pax ",
                                                                       labelAlign: "Left",
                                                                       labelWidth: 65,
                                                                       inputWidth: 150,
                                                                       width: 160,
                                                                       readonly:true,
                                                                   },
                                                                   {
                                                                       view: "text",
                                                                       id: "txtMaxPax",
                                                                       label: "Max Pax ",
                                                                       labelAlign: "Left",
                                                                       labelWidth: 75,
                                                                       inputWidth: 170,
                                                                       width: 180,
                                                                       readonly:true,

                                                                   }
                                                                ]
                                                            },
                                                            {
                                                                cols: [
                                                                    {
                                                                        view: "text",
                                                                        id: "txtSnackPicTm",
                                                                        label: "Snacks Pickup Tm",
                                                                        labelAlign: "Left",
                                                                        labelWidth: 110,
                                                                        inputWidth: 190,
                                                                        width: 200,
                                                                    },
                                                                    {
                                                                        view: "text",
                                                                        id: "txtServerTm",
                                                                        label: "Serve Tm",
                                                                        labelAlign: "Left",
                                                                        labelWidth: 70,
                                                                        inputWidth: 150,
                                                                        width: 160,
                                                                    },

                                                                  //{
                                                                  //    view: "datepicker",
                                                                  //    format: "%H:%i",
                                                                  //    id: "txtSnackPicTm",
                                                                  //    label: "Snacks Pickup Tm",
                                                                  //    labelAlign: "Right",
                                                                  //    labelWidth: 110,
                                                                  //    inputWidth: 190,
                                                                  //    width: 190,
                                                                  //    suggest: {
                                                                  //        type: "calendar",
                                                                  //        body: {
                                                                  //            type: "time",
                                                                  //            calendarTime: "%H:%i"
                                                                  //        }
                                                                  //    },
                                                                  //    on:{
                                                                  //        'onBlur': function (newv) {

                                                                  //            var id = $$("grdVenue").getSelectedId();

                                                                  //            if (id != undefined) {

                                                                  //                var item = $$("grdVenue").getItem(id.row);

                                                                  //                if (newv != "") {
                                                                  //                    var TimeFm1 = new Date(newv);
                                                                  //                    item.vsnsTm = TimeFm1.getHours() + ":" + TimeFm1.getMinutes();

                                                                  //                    $$("grdVenue").updateItem(id.row, item);
                                                                  //                    $$("grdVenue").refresh();
                                                                  //                }
                                                                  //            }
                                                                  //        }
                                                                  //    }
                                                                  //},
                                                                  //{
                                                                  //    view: "datepicker",
                                                                  //    format: "%H:%i",
                                                                  //    id: "txtServerTm",
                                                                  //    label: "Server Tm",
                                                                  //    labelAlign: "Right",
                                                                  //    labelWidth: 80,
                                                                  //    inputWidth: 160,
                                                                  //    width: 160,
                                                                  //    suggest: {
                                                                  //        type: "calendar",
                                                                  //        body: {
                                                                  //            type: "time",
                                                                  //            calendarTime: "%H:%i"
                                                                  //        }
                                                                  //    },
                                                                  //    on:{
                                                                  //        'onblur': function (value) {
                                                                  //            var id = $$("grdVenue").getSelectedId(); 
                                                                  //            if(id != undefined)
                                                                  //            {
                                                                  //                var item = $$("grdVenue").getItem(id.row);
                                                                  //                item.vPgStm = $$("txtServerTm").getValue();
 
                                                                  //                $$("grdVenue").updateItem(id.row, item);
                                                                  //                $$("grdVenue").refresh();
                                                                  //            }
                                                                  //            else{
                                                                  //                //AlertMessage("Please Select Venue Row !");
                                                                  //                //return;
                                                                  //            }
                                                                  //        }
                                                                  //    }
                                                                  //},
                                                                  {
                                                                      view: "text",
                                                                      id: "txtFPNo",
                                                                      label: "F.P No",
                                                                      labelAlign: "Left",
                                                                      labelWidth: 65,
                                                                      inputWidth: 150,
                                                                      width: 160,
                                                                      readonly:true,
                                                                      on:{
                                                                          'onblur': function (value) {
                                                                              //var id = $$("grdVenue").getSelectedId(); 
                                                                              //if(id != undefined)
                                                                              //{
                                                                              //    var item = $$("grdVenue").getItem(id.row);
                                                                              //    item.vSeatId = $$("txtFPNo").getValue();
 
                                                                              //    $$("grdVenue").updateItem(id.row, item);
                                                                              //    $$("grdVenue").refresh();
                                                                              //}
                                                                              //else{
                                                                              //AlertMessage("Please Select Venue Row !");
                                                                              //return;
                                                                              //}
                                                                          }
                                                                      }
                                                                  },
                                                                  {
                                                                      view: "text",
                                                                      id: "txtEventNM",
                                                                      label: "Event Name",
                                                                      labelAlign: "Left",
                                                                      labelWidth: 75,
                                                                      inputWidth: 170,
                                                                      width: 180,
                                                                      on:{
                                                                          'onblur': function (value) {
                                                                              var id = $$("grdVenue").getSelectedId(); 
                                                                              if(id != undefined)
                                                                              {
                                                                                  var item = $$("grdVenue").getItem(id.row);
                                                                                  item.vEventNm = $$("txtEventNM").getValue();
 
                                                                                  $$("grdVenue").updateItem(id.row, item);
                                                                                  $$("grdVenue").refresh();
                                                                              }
                                                                              else{
                                                                                  //AlertMessage("Please Select Venue Row !");
                                                                                  //return;
                                                                              }
                                                                          }
                                                                      }
                                                                  },
                                                                ]
                                                            },
                                                            {
                                                                cols: [
                                                                     {
                                                                         view: "text",
                                                                         id: "txtEventTm",
                                                                         label: "Event Start Tm",
                                                                         labelAlign: "Left",
                                                                         labelWidth: 110,
                                                                         inputWidth: 190,
                                                                         width: 200,
                                                                     },
                                                                    {
                                                                        view: "text",
                                                                        id: "txtEndTm",
                                                                        label: "End Tm",
                                                                        labelAlign: "Left",
                                                                        labelWidth: 70,
                                                                        inputWidth: 150,
                                                                        width: 160,
                                                                    },
                                                                  //{
                                                                  //    view: "datepicker",
                                                                  //    format: "%H:%i",
                                                                  //    id: "txtEventTm",
                                                                  //    label: "Event Start Tm",
                                                                  //    labelAlign: "Right",
                                                                  //    labelWidth: 110,
                                                                  //    inputWidth: 190,
                                                                  //    width: 190,
                                                                  //    suggest: {
                                                                  //        type: "calendar",
                                                                  //        body: {
                                                                  //            type: "time",
                                                                  //            calendarTime: "%H:%i"
                                                                  //        }
                                                                  //    },
                                                                  //    on:{
                                                                  //        'onblur': function (value) {
                                                                  //            var id = $$("grdVenue").getSelectedId(); 
                                                                  //            if(id != undefined)
                                                                  //            {
                                                                  //                var item = $$("grdVenue").getItem(id.row);
                                                                  //                item.vsnEtm = $$("txtEventTm").getValue();
 
                                                                  //                $$("grdVenue").updateItem(id.row, item);
                                                                  //                $$("grdVenue").refresh();
                                                                  //            }
                                                                  //            else{
                                                                  //                //AlertMessage("Please Select Venue Row !");
                                                                  //                //return;
                                                                  //            }
                                                                  //        }
                                                                  //    }
                                                                  //},
                                                                  //{
                                                                  //    view: "datepicker",
                                                                  //    format: "%H:%i",
                                                                  //    id: "txtEndTm",
                                                                  //    label: "End Tm",
                                                                  //    labelAlign: "Right",
                                                                  //    labelWidth: 80,
                                                                  //    inputWidth: 160,
                                                                  //    width: 160,
                                                                  //    suggest: {
                                                                  //        type: "calendar",
                                                                  //        body: {
                                                                  //            type: "time",
                                                                  //            calendarTime: "%H:%i"
                                                                  //        }
                                                                  //    },
                                                                  //    on:{
                                                                  //        'onblur': function (value) {
                                                                  //            var id = $$("grdVenue").getSelectedId(); 
                                                                  //            if(id != undefined)
                                                                  //            {
                                                                  //                var item = $$("grdVenue").getItem(id.row);
                                                                  //                item.vpgEtm = $$("txtEndTm").getValue();
 
                                                                  //                $$("grdVenue").updateItem(id.row, item);
                                                                  //                $$("grdVenue").refresh();
                                                                  //            }
                                                                  //            else{
                                                                  //                //AlertMessage("Please Select Venue Row !");
                                                                  //                //return;
                                                                  //            }
                                                                  //        }
                                                                  //    }
                                                                  //},
                                                                  {
                                                                      view: "text",
                                                                      id: "txtFPDt",
                                                                      label: "F.P Date",
                                                                      labelAlign: "Left",
                                                                      labelWidth: 65,
                                                                      inputWidth: 150,
                                                                      width: 160,
                                                                      readonly:true,
                                                                      on:{
                                                                          'onblur': function (value) {
                                                                              //var id = $$("grdVenue").getSelectedId(); 
                                                                              //if(id != undefined)
                                                                              //{
                                                                              //    var item = $$("grdVenue").getItem(id.row);
                                                                              //    item.vSeatId = $$("txtFPDt").getValue();
 
                                                                              //    $$("grdVenue").updateItem(id.row, item);
                                                                              //    $$("grdVenue").refresh();
                                                                              //}
                                                                              //else{
                                                                              //AlertMessage("Please Select Venue Row !");
                                                                              //return;
                                                                              //}
                                                                          }
                                                                      }
                                                                  },
                                                                ]
                                                            },
                                                            {
                                                                height:5,
                                                            },
                                                            {
                                                              
                                                                view: "richselect",
                                                                id: "ddlODLoc",
                                                                label: "OutDoor Location",
                                                                labelAlign: "Left",
                                                                labelWidth: 110,
                                                                inputWidth: 330,
                                                                minwidth: 640,
                                                                options: fnOutDoor,
                                                                hidden:($("#hdnODLocId").val()=="1"?false: true),
                                                                value: "00",
                                                                on: {
                                                                    onChange: function (newval, oldval) {
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                minwidth:890,
                                                                paddingY: 5,
                                                                view: "datatable",
                                                                id: "grdDepart",
                                                                editable: true,
                                                                select: "row",
                                                                data: [],
                                                                height: 355,
                                                                width:500,
                                                                scroll: "y",
                                                                //scroll: true,
                                                                columns: [
                                                                    { header: "RowId", id: "DRowId", width: 60, hidden: true, },
                                                                    { header: "Department", id: "Departid", width: 150, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return fnDepart; } },
                                                                    { header: "Aids/Instruction", id: "AidsNm", width: 180,  css: { 'text-align': 'left ! important' } },
                                                                    { header: "", id: "btnAidsSrch", width: 40, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                                                    { header: "Qty", id: "Qty", width: 50, editor: 'text', liveEdit: true, css: { 'text-align': 'Center ! important' } },
                                                                    { header: "Narration", id: "Narration", width: 210, editor: 'text',liveEdit: true,css: { 'text-align': 'left ! important' } },
                                                                    { header: "AidsId", id: "AidsId", width: 150, hidden: true, },
                                                                    { header: "DepartNm", id: "DepartNm", width: 150, hidden: true, },
                                                                    { header: "hdnSessionId", id: "hdnSessionId", width: 100, hidden: true, },
                                                                    { header: "", id: "btnDDel", width: 40, template: Delicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                                                ],
                                                                on: {
                                                                    'onAfterEditStop': function (state, editor) {
                                                                        fnCallDepartStore();
                                                                        $$("grdDepart").refresh();
                                                                    },
                                                                    'onKeyPress': function (e, id) {
                                                                        if (e == 40) {
                                                                            fnDepartRowAdd('1');
                                                                        }
                                                                    },
                                                                    'onItemClick': function (id, e, node, trg) {

                                                                        if (id.column == 'btnAidsSrch') {
                                                                            var getval = this.getItem(id);

                                                                            if ($.trim(getval.Departid) == "") {
                                                                                AlertMessage("Select Department First !");
                                                                                return false;
                                                                            }
                                                                        
                                                                            var data = $$("grdDepart").serialize();
                                                                            var ColDeptIds = "";

                                                                            for (i = 0; i < data.length; i++) {
                                                                                if (data[i].AidsId != getval.AidsId) {
                                                                                    if (ColDeptIds == "")
                                                                                        ColDeptIds = $.trim(data[i].AidsId);
                                                                                    else
                                                                                        ColDeptIds = ColDeptIds + "','" + $.trim(data[i].AidsId);
                                                                                }
                                                                            }

                                                                            var RowIndex = $$("grdDepart").getIndexById(id.row);

                                                                            fnCallAidsSearch(getval.Departid, getval.DepartNm, getval.Qty, getval.Narration, ColDeptIds, RowIndex);
                                                                        }
                                                                        else if (id.column == 'btnDDel') {

                                                                            webix.confirm({
                                                                                title: "Confirmation !",
                                                                                ok: "Yes", cancel: "No",
                                                                                text: "Are you sure to Delete this line Item !"
                                                                            })
                                                                         .then(function () {

                                                                             $$("grdDepart").editCancel();
                                                                             $$("grdDepart").remove($$("grdDepart").getSelectedId());
                                                                             $$("grdDepart").refresh();

                                                                             var data = $$("grdDepart").serialize();

                                                                             if (data.length == 0) {
                                                                                 fnDepartRowAdd('0');
                                                                             }

                                                                             fnCallDepartStore();

                                                                         })
                                                                         .fail(function () {
                                                                         });
                                                                        }
                                                                    },
                                                                    'onEditorChange': function (id, value,row) {
                                                                        var getval = this.getItem(id);
                                                                        if (id.column == 'Departid') {

                                                                            var FilterDep = fnDepart.filter(function (fnDepart) {
                                                                                return fnDepart.id == $.trim(value);
                                                                            });

                                                                            getval.DepartNm = FilterDep[0].value;
                                                                            getval.Departid=value;
                                                                            getval.AidsNm="";
                                                                            getval.AidsId="";
                                                                        }

                                                                        $$("grdDepart").refresh();
                                                                    },
                                                                    'onBlur': function (prev_view) {
                                                                        $$("grdDepart").refresh();
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                paddingY: 5,
                                                                view: "datatable",
                                                                id: "grdDepartShow",
                                                                editable: true,
                                                                select: "row",
                                                                data: [],
                                                                height: 200,
                                                                width: 655,
                                                                scroll: true,
                                                                hidden:true,
                                                                columns: [
                                                                    { header: "RowId", id: "DRowId", width: 30, },
                                                                    { header: "Department", id: "Departid", width: 150, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return fnDepart; } },
                                                                    { header: "Aids/Instruction", id: "AidsNm", width: 180, css: { 'text-align': 'left ! important' } },
                                                                    { header: "Qty", id: "Qty", width: 50, css: { 'text-align': 'Center ! important' } },
                                                                    { header: "Narration", id: "Narration", width: 190, css: { 'text-align': 'left ! important' } },
                                                                    { header: "AidsId", id: "AidsId", width: 50, css: { 'text-align': 'left ! important' } },
                                                                    { header: "DepartNm", id: "DepartNm", width: 100, css: { 'text-align': 'left ! important' } },
                                                                    { header: "hdnSessionId", id: "hdnSessionId", width: 100, css: { 'text-align': 'left ! important' } },
                                                                ],
                                                            },

                                                        ]
                                                    }
                                                 ]
                                             },
                                         ]
                                     }
                                 ]
                             }
                         },
                         {
                             header: "<span class='fa fa-cutlery'></span>F&B",
                             body: {
                                 id: "FBFrm",
                                 view: "form",
                                 readonly:true,
                                 elements: [
                                     {
                                         rows: [
                                             {
                                                 cols:[
                                                     {
                                                         view: "button",
                                                         id: 'btnAddPlan',
                                                         labelWidth: 0,
                                                         label: "Additional  Plan/s",
                                                         width: 160,
                                                         height:35,
                                                         hidden:true,//($("#hdnMultiPln").val()=="1"?false:true),pending
                                                         on: {
                                                             onItemClick: function () {
                                                             }
                                                         }
                                                     },
                                                     {
                                                         id: "chkTaxInc",
                                                         view: "checkbox",
                                                         label: "Tax inclusive Plan Rate",
                                                         labelAlign: "Right",
                                                         labelWidth: 140,
                                                         width: 170,
                                                         hidden:(($("#hdnTaxIncAppl").val()=="1" && $("#hdnTaxInclusiveAppl").val()=="0")==true?false:true),
                                                         on: {
                                                             "onChange": function () {
                                                             }
                                                         }
                                                     },
                                                     {
                                                         view: "text",
                                                         id: "txtnumTaxInc",
                                                         labelAlign: "Right",
                                                         inputWidth: 100,
                                                         width: 100,
                                                         hidden:(($("#hdnTaxIncAppl").val()=="1" && $("#hdnTaxInclusiveAppl").val()=="0")==true?false:true),
                                                     },
                                                     {
                                                         view: "button",
                                                         id: 'btnPlanInc',
                                                         label: "C",
                                                         minWidth: 250,
                                                         labelWidth: 4,
                                                         width: 30,
                                                         height: 28,
                                                         hidden:(($("#hdnTaxIncAppl").val()=="1" && $("#hdnTaxInclusiveAppl").val()=="0")==true?false:true),
                                                         on: {
                                                             onItemClick: function () {
                                                             }
                                                         }
                                                     },
                                                     {
                                                         id: "chkVenueTax",
                                                         view: "checkbox",
                                                         label: "Tax inclusive Venue Rate",
                                                         labelAlign: "Right",
                                                         labelWidth: 200,
                                                         inputwidth:230,
                                                         width: 230,
                                                         hidden:(($("#hdnTaxIncAppl").val()=="1" && $("#hdnTaxInclusiveAppl").val()=="0")==true?false:true),
                                                         on: {
                                                             "onChange": function () {
                                                             }
                                                         }
                                                     },
                                                     {
                                                         view: "text",
                                                         id: "txtnumVTaxInc",
                                                         labelAlign: "Right",
                                                         inputWidth: 100,
                                                         width: 100,
                                                         hidden:(($("#hdnTaxIncAppl").val()=="1" && $("#hdnTaxInclusiveAppl").val()=="0")==true?false:true),
                                                     },
                                                     {
                                                         view: "button",
                                                         id: 'btnVenInc',
                                                         label: "C",
                                                         minWidth: 250,
                                                         labelWidth: 4,
                                                         width: 30,
                                                         height: 28,
                                                         hidden:(($("#hdnTaxIncAppl").val()=="1" && $("#hdnTaxInclusiveAppl").val()=="0")==true?false:true),
                                                         on: {
                                                             onItemClick: function () {
                                                             }
                                                         }
                                                     },
                                                     {
                                                         width:(($("#hdnTaxIncAppl").val()=="1" && $("#hdnTaxInclusiveAppl").val()=="0")==true?500:0),
                                                     },
                                                 ]
                                             },
                                             {
                                                 paddingY: 10,
                                                 view: "datatable",
                                                 id: "grdFB",
                                                 editable: true,
                                                 select: "row",
                                                 data: [],
                                                 height: 420,
                                                 scroll:true,
                                                 columns: [
                                                     { header: "RowId", id: "FRowId", width: 30, hidden: true, },
                                                     { header: "Date", id: "vFBDate", width: 90, editor: "select", liveEdit: false, format: webix.Date.dateToStr("%d/%m/%Y"), stringResult: true, css: { 'text-align': 'left ! important' } },
                                                     { header: "Session", id: "vSessionid", width: 50, css: { 'text-align': 'center ! important' }, },
                                                     { header: "Venue", id: "nVenueNm", width: 180, css: { 'text-align': 'left ! important' },},
                                                     { header: "", id: "btnFBPSrch", width: 35, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                                     { header: "", id: "vPlanId", width: 60, css: { 'text-align': 'center ! important' }, editor: "select", liveEdit: true, collection: function (id) { return fnFBPlan; } },
                                                     { header: "Plan", id: "hdnPlnPkgId", width: 130, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return fnFBPkg; } },
                                                     { header: "Plan Rate", id: "vFBRate", width: 90, css: { 'text-align': 'right ! important' }, editor: 'text', liveEdit: true },
                                                     { header: "Guar Pax", id: "vActPax", width: 75, css: { 'text-align': 'center ! important' }, editor: 'text', liveEdit: true },
                                                     { header: "Exp. Pax", id: "vExpPax", width: 75, css: { 'text-align': 'center ! important' }, editor: 'text', liveEdit: true },
                                                     { header: "Venue Capacity", id: "VenueCap", width: 110, css: { 'text-align': 'center ! important' }, editor: 'text', liveEdit: true },
                                                     { header: "Fd.Pick Up Tm", id: "vFdPTm", width: 105, css: { 'text-align': 'left ! important' }, editor: 'text', liveEdit: true },
                                                     { header: "Serve Tm", id: "vServerTm", width: 80, css: { 'text-align': 'center ! important' }, editor: 'text', liveEdit: true },
                                                     { header: "MT", id: "ChkMT", tooltip: false, checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 35, css: { 'text-align': 'center ! important' } },
                                                     { header: "Time", id: "MTTime", width: 60, css: { 'text-align': 'center ! important' }, editor: 'text', liveEdit: true },
                                                     { header: "AT", id: "ChkAT", tooltip: false, checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 35, css: { 'text-align': 'center ! important' } },
                                                     { header: "Time", id: "ATTime", width: 60, css: { 'text-align': 'center ! important' }, editor: 'text', liveEdit: true },
                                                     { header: "Venue Rate", id: "vVenRate", width: 100, css: { 'text-align': 'right ! important' }, editor: 'text', liveEdit: true },
                                                     { header: "ChkTaxInx", id: "chkTaxInd", checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 40, hidden:true, css: { 'text-align': 'center ! important' } },
                                                     { header: "TaxAmt", id: "vTaxAmt", width: 60, css: { 'text-align': 'center ! important' }, hidden: true, },
                                                    
                                                     { header: "ChkVentaxInd", id: "ChkVentaxInd", checkValue: "1", uncheckValue: "0", template: "{common.checkbox()}", width: 40,hidden:true,css: { 'text-align': 'center ! important' },  },
                                                     { header: "vVentaxAmt", id: "vVentaxAmt", width: 60, hidden: true,css: { 'text-align': 'center ! important' },  },
                                                     { header: "hdnvDSV", id: "hdnvDSV", width: 60, css: { 'text-align': 'center ! important' }, hidden: true, },
                                                     { header: "hdnVenueId", id: "hdnVenueId", width: 60, css: { 'text-align': 'center ! important' }, hidden: true, },
                                                     { header: "hdnfbkids", id: "hdnfbkids", hidden: true,css: { 'text-align': 'center ! important' },  },
                                                     { header: "hdndriver", id: "hdndriver", hidden: true, css: { 'text-align': 'center ! important' }, },
                                                     { header: "hdnPkgNm", id: "hdnPkgNm", hidden: true, css: { 'text-align': 'center ! important' }, },
                                                     
                                                     { header: "", id: "btnFBDel", width: 40, template: Delicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                                 ],
                                                 rules:{
                                                     vSessionid: webix.rules.isNotEmpty,
                                                     nVenueNm: webix.rules.isNotEmpty,
                                                     vExpPax: webix.rules.isNotEmpty,
                                                     vActPax: webix.rules.isNotEmpty,
                                                 },
                                                 on: {
                                                     'onItemClick': function (id, e, node, trg) {

                                                         var getval = $$("grdFB").getItem(id.row);

                                                         if (id.column == 'btnFBPSrch') {
                                                             fnCallVenueSelect('FB');
                                                         }
                                                         else if (id.column == 'btnFBDel') {
                                                             webix.confirm({
                                                                 title: "Confirmation !",
                                                                 ok: "Yes", cancel: "No",
                                                                 text: "Are you sure to Delete this line Item !"
                                                             })
                                                             .then(function () {

                                                                 $$("grdFB").editCancel();
                                                                 $$("grdFB").remove($$("grdFB").getSelectedId());
                                                                 $$("grdFB").refresh();

                                                                 fnCallMenuDelete(getval.FRowId, '1');

                                                                 var curGrid = $$("grdFB").serialize();

                                                                 if(curGrid.length==0)
                                                                     fnFBRowAdd('0');

                                                              })
                                                              .fail(function () {

                                                              });
                                                         }
                                                     },
                                                     'onEditorChange': function (id, value,row) {
                                                         var getval = this.getItem(id);

                                                         if (id.column == 'vPlanId') {

                                                             var Options = this.getColumnConfig("hdnPlnPkgId").collection;
                                                             Options.clearAll();

                                                             if($.trim(value)=="PCK")
                                                                 Options.parse(fnFBPkg1);
                                                             else
                                                                 Options.parse(fnFBPkg);
                                                         }
                                                         else  if (id.column == 'hdnPlnPkgId') {

                                                             getval.hdnPlnPkgId=value;

                                                             if(getval.vPlanId=="PLN")
                                                             {
                                                                 var Filter5 = fnFBPkg.filter(function (fnFBPkg) {
                                                                     return fnFBPkg.id == $.trim(value);
                                                                 });

                                                                 getval.vFBRate = (Filter5[0]["Rate"] == "" || Filter5[0]["Rate"] == null  ? 0 : parseFloat(Filter5[0]["Rate"])).toFixed(2);
                                                                 getval.hdnPkgNm = Filter5[0]["value"];
                                                             }
                                                             else
                                                             {
                                                                 var Filter5 = fnFBPkg1.filter(function (fnFBPkg1) {
                                                                     return fnFBPkg1.id == $.trim(value);
                                                                 });

                                                                 //var Filter= filterItems(fnFBPkg1, value);

                                                                 getval.vFBRate = (Filter5[0]["Rate"] == "" || Filter5[0]["Rate"] ==null ? 0 : parseFloat(Filter5[0]["Rate"])).toFixed(2);
                                                                 getval.hdnPkgNm = Filter5[0]["value"];
                                                             }

                                                             var Filter6 = fnVenCap1.filter(function (fnVenCap1) {
                                                                 return fnVenCap1.VENUE_ID == $.trim(getval.hdnVenueId);
                                                             });

                                                             var VenCap = fnVenCap.filter(function (fnVenCap) {
                                                                 return (fnVenCap.VENUE_ID == $.trim(getval.hdnVenueId) && fnVenCap.S_ID == $.trim(getval.vSessionid));
                                                             });

                                                             if(VenCap.length>0)
                                                             {
                                                                 if(VenCap[0]["MAX_PAX"]!="")
                                                                     getval.VenueCap=parseFloat(VenCap[0]["MAX_PAX"]).toFixed(2);
                                                                 else
                                                                     getval.VenueCap = parseFloat(Filter6[0]["H_C"]).toFixed(2);
                                                             }
                                                             else
                                                                 getval.VenueCap = parseFloat(Filter6[0]["H_C"]).toFixed(2);
                                                            
                                                             getval.vVenRate = (Filter6[0]["V_AMT"] == "" || Filter6[0]["V_AMT"]== null ? 0 : parseFloat(Filter6[0]["V_AMT"])).toFixed(2);
                                                         }

                                                         $$("grdFB").refresh();
                                                     },
                                                     'onKeyPress': function (e, id) {
                                                         if (e == 40) {
                                                             fnFBRowAdd('1');
                                                         }
                                                     }
                                                 }
                                             }
                                         ]
                                     }
                                 ]
                             }
                         },
                         {
                             header: "<span class='fa fa-list'></span>Menu",
                             body: {
                                 id: "MenuFrm",
                                 view: "form",
                                 //scroll: true,
                                 minheight:1400,
                                 elements: [
                                     {
                                         rows: [
                                             {
                                                 cols:[
                                                     {
                                                         view: "richselect",
                                                         id: "ddlPlanItem",
                                                         label: " Plan",
                                                         labelAlign: "Right",
                                                         labelWidth: 60,
                                                         inputWidth: 300,
                                                         disabled:true,
                                                         options:fnFBPkg,
                                                         width: 345,
                                                     },
                                                     {
                                                         view: "text",
                                                         id: "txtPreparation",
                                                         stringResult: true,
                                                         label: "Preparation",
                                                         labelAlign: "Right",
                                                         readonly:true,
                                                         labelWidth: 130,
                                                         inputWidth: 350,
                                                         width: 350,
                                                         hidden:($("#hdnFoodPrep").val()=="1"?false:true),
                                                     },
                                                     {
                                                         view: "button",
                                                         id: 'txtPrepSrch',
                                                         minWidth: 250,
                                                         labelWidth: 0,
                                                         inputwidth:200,
                                                         width: 30,
                                                         height: 20,
                                                         type: 'icon',
                                                         icon: 'wxi-search',
                                                         css: "Ar_search",
                                                         hidden:($("#hdnFoodPrep").val()=="1"?false:true),
                                                         on: {
                                                             onItemClick: function () {
                                                                 fnFoorPrepSearch();
                                                             }
                                                         }
                                                     },
                                                     {
                                                         width:50
                                                     },
                                                     {
                                                          view: "label",
                                                          id: "lblPlanItem",
                                                          label: "Plan Item",
                                                          labelAlign: "Right",
                                                          inputWidth: 100,
                                                          width: 100,
                                                          width:true,//($("#hdnODLocId").val()=="1"?false:true),pending
                                                     },
                                                     {
                                                         view: "button",
                                                         id: 'btnPlanItem',
                                                         label: "Plan Item",
                                                         labelWidth: 100,
                                                         width: 100,
                                                         hidden:true,//($("#hdnPlnItem").val()=="1"?false:true),pending
                                                         on: {
                                                             onItemClick: function () {
                                                             }
                                                         }
                                                     },{
                                                         width:30
                                                     },
                                                     {
                                                         view: "button",
                                                         id: 'btnPlanAvl',
                                                         label: "Plan Availed",
                                                         labelWidth: 100,
                                                         hidden:true,//($("#hdnPlnAvail").val()=="1"?false:true),pending
                                                         width: 100,
                                                         on: {
                                                             onItemClick: function () {
                                                             }
                                                         }
                                                     },{
                                                         width:100
                                                     },
                                                 ]
                                             },
                                             {
                                                 cols:[
                                                      {
                                                          view: "datatable",
                                                          id: "grdMenu",
                                                          select: "row",
                                                          data: [],
                                                          height: 420,
                                                          width: 360,
                                                          editable: true,
                                                          scroll:"y",
                                                          //scroll: true,
                                                          columns: [
                                                              { header: "MRowId", id: "MRowId", width: 30, hidden: true, },
                                                              { header: "Date", id: "MFBDate", width: 85, format: webix.Date.dateToStr("%d/%m/%Y"), stringResult: true, css: { 'text-align': 'left ! important' } },
                                                              { header: "Ses.", id: "MSessionid", width: 40, css: { 'text-align': 'center ! important' }, },
                                                              { header: "Venue", id: "MVenueNm", width: 150, css: { 'text-align': 'left ! important' }, },
                                                              { header: "", id: "btnMSrch", width: 35, template: searchicon, css: { 'text-align': 'letf ! important', 'padding': '0px ! important' } },
                                                              { header: "hdnVenueId", id: "hdnVenueId", width: 60, hidden: true },
                                                              { header: "hdnPlanId", id: "hdnPlanId", width: 60, hidden: true },
                                                              { header: "hdnPlanNM", id: "hdnPlanNM", width: 60, hidden: true },
                                                              //{ header: "hdnPkg", id: "hdnPkg", width: 60, hidden: true },
                                                              { header: "SNO", id: "SNO", width: 60, hidden: true },

                                                              { header: "", id: "btnMDel", width: 35, template: Delicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                                          ],
                                                          on: {
                                                              'onKeyPress': function (e, id) {
                                                                  if (e == 40) {
                                                                      fnMenuRowAdd('1');
                                                                  }
                                                              },
                                                              onSelectChange: function () {
                                                                  var id = $$("grdMenu").getSelectedId();

                                                                  if (id != undefined) {
                                                                      var getval = $$("grdMenu").getItem(id.row);

                                                                      debugger;
                                                                      if (getval.vSeatId != "")
                                                                          $$("ddlPlanItem").setValue(getval.hdnPlanId);
                                                                      else
                                                                          $$("ddlPlanItem").setValue("");

                                                                      fnFillMenuGrids(getval.MRowId);
                                                                  }
                                                              },
                                                              onItemClick: function (id, e, node, trg) {

                                                                  var getval = $$("grdMenu").getItem(id.row);

                                                                  var vGrdidRowId = getval.MRowId;

                                                                  if (id.column == 'btnMSrch') {

                                                                      fnCallVenueSelect('MENU');
                                                                  }
                                                                  else if (id.column == 'btnMDel') {

                                                                      webix.confirm({
                                                                          title: "Confirmation !",
                                                                          ok: "Yes", cancel: "No",
                                                                          text: "Are you sure to Delete this line Item !"
                                                                      })
                                                                     .then(function () {
                                                                         $$("grdMenu").editCancel();
                                                                         $$("grdMenu").remove($$("grdMenu").getSelectedId());
                                                                         $$("grdMenu").refresh();

                                                                         fnCallMenuDelete(vGrdidRowId, '0');

                                                                         var data = $$("grdMenu").serialize();

                                                                         if (data.length == 0) {
                                                                             fnMenuRowAdd('0');
                                                                         }

                                                                         $$("grdMenu").select($$("grdMenu").getFirstId());

                                                                     })
                                                                      .fail(function () {

                                                                      });
                                                                  }
                                                              },
                                                              'onBlur': function (prev_view) {
                                                                  $$("grdMenu").refresh();
                                                              }
                                                          }
                                                      },
                                                      {
                                                          width:5,
                                                      },
                                                      {
                                                          rows:[
                                                              {
                                                                  cols:[
                                                                  {
                                                                      view: "datatable",
                                                                      id: "grdPlan",
                                                                      editable: true,
                                                                      select: "row",
                                                                      data: [],
                                                                      height: 270,
                                                                      width:200,
                                                                      scroll:"y",
                                                                      columns: [
                                                                          { header: "MRowId", id: "MRowId", width: 60, hidden: true },
                                                                          { header: "Plan Item", id: "ITEM_NM", width: 130,   stringResult: true, css: { 'text-align': 'left ! important' } },
                                                                          { header: "Qty", id: "QTY", width: 50, css: { 'text-align': 'center ! important' }, },
                                                                          { header: "PVenId", id: "hdnPVenId", width: 50, hidden:true },
                                                                          { header: "PSessId", id: "hdnPSessId", width: 50, hidden: true },
                                                                          { header: "PPlnId", id: "hdnPPlnId", width: 50, hidden: true },
                                                                      ],
                                                                      on: {
                                                                          'onItemClick': function (id, e, node,trg) {
                                                                          },
                                                                      }

                                                                  },
                                                                  {
                                                                      width:5,
                                                                  },
                                                                  {
                                                                      view: "datatable",
                                                                      id: "grdItem",
                                                                      editable: true,
                                                                      select: "row",
                                                                      data: [],
                                                                      height: 270,
                                                                      width:720,
                                                                      scroll:"y",
                                                                      columns: [
                                                                          { header: "MRowId", id: "MRowId", width: 30, hidden: true },
                                                                          { header: "Item Name", id: "MItemNM", width: 205,  stringResult: true, css: { 'text-align': 'left ! important' } },
                                                                          { header: "", id: "btnItemSrch", width: 40, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                                                          { header: "Qty", id: "MMenuQty", width: 50, css: { 'text-align': 'center ! important' },editor: "text", liveEdit: true, },
                                                                          { header: "Narration", id: "MMenuNarr", width: 150, css: { 'text-align': 'left ! important' }, editor: 'text', liveEdit: true },
                                                                          { header: ($("#hdnMgrpAppl").val()=="1"?"Menu_Group":"Seq#"), id: "MMenuSeqNo", width: 100, css: { 'text-align': 'left ! important' }},
                                                                          { header: "Group Menu", id: "MPlanNm", width: 120, css: { 'text-align': 'left ! important' } },
                                                                          { header: "", id: "btnIDel", width: 35, template: Delicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                                                                          { header: "hdnmItemId", id: "hdnIItemId", width: 60, hidden: true },
                                                                          { header: "hdnmVenId", id: "hdnIVenId", width: 60, hidden: true },
                                                                          { header: "hdnmSessId", id: "hdnISessId", width: 60, hidden: true },
                                                                          { header: "hdnmPlnId", id: "hdnIPlnId", width: 60, hidden: true },//menu Type
                                                                      ],
                                                                      on: {
                                                                          'onKeyPress': function (e, id) {
                                                                              if (e == 40) {
                                                                                  fnMItemRowAdd('1');
                                                                              }
                                                                          },
                                                                          'onItemClick': function (id, e, node, trg) {

                                                                              var getval = this.getItem(id);

                                                                              if (id.column == 'btnItemSrch') {

                                                                                  var RowIndex = $$("grdItem").getIndexById(id.row);

                                                                                  fnCallPopupProdSrch(RowIndex);

                                                                              }
                                                                              else if (id.column == 'btnIDel') {
                                                                                  webix.confirm({
                                                                                      title: "Confirmation !",
                                                                                      ok: "Yes", cancel: "No",
                                                                                      text: "Are you sure to Delete this line Item !"
                                                                                  })
                                                                               .then(function () {
                                                                                   $$("grdItem").editCancel();
                                                                                   $$("grdItem").remove($$("grdItem").getSelectedId());
                                                                                   $$("grdItem").refresh();

                                                                                   fnCallMenuDetStore();
                                                                               })
                                                                                .fail(function () {

                                                                                });
                                                                              }
                                                                          },
                                                                          'onAfterEditStop': function (state, editor) {
                                                                              fnCallMenuDetStore();
                                                                          }
                                                                      }
                                                                  }
                                                                  ]
                                                              },
                                                              {
                                                                  cols:[
                                                                      {
                                                                          widh:300,
                                                                      },
                                                                      {
                                                                          view: "label",
                                                                          id: "lblAdvAmt",
                                                                          label: "Add on (Snacks/Beverages)",
                                                                          labelAlign: "center",
                                                                          labelWidth: 200,
                                                                      },
                                                                  ]
                                                              },
                                                              {
                                                                  view: "datatable",
                                                                  id: "grdOthers",
                                                                  editable: true,
                                                                  select: "row",
                                                                  data: [],
                                                                  height: 150,
                                                                  width: 690,
                                                                  scroll:"y",
                                                                  columns: [
                                                                      { header: "MRowId", id: "MRowId", width: 30, hidden: true },
                                                                      { header: "Item Group", id: "OTyId", width: 120, css: { 'text-align': 'left ! important' }, editor: "select", liveEdit: true, collection: function (id) { return MenuGrp; } },
                                                                      { header: "Item Name", id: "MItemNM", width: 280, css: { 'text-align': 'left ! important' } },
                                                                      { header: "", id: "btnISrch", width: 40, template: searchicon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' } },
                                                                      { header: "ReqdQty", id: "MMenuQty", width: 70, css: { 'text-align': 'center ! important' }, editor: "text", liveEdit: true, },
                                                                      {
                                                                          header: "Rate", id: "Rate",
                                                                          width: 90, css: { 'text-align': 'right ! important' }, editor: 'text', liveEdit: true
                                                                      },
                                                                      { header: "Disc%", id: "Disc", width: 80, css: { 'text-align': 'center ! important' }, editor: 'text', liveEdit: true },
                                                                      { header: "DiscAmt", id: "DiscAmt", width: 80, css: { 'text-align': 'center ! important' }, },
                                                                      { header: "SaleRate", id: "SaleRate", width: 100, css: { 'text-align': 'right ! important' }, editor: 'text', liveEdit: true },
                                                                      { header: "", id: "btnIDel", width: 35, template: Delicon, css: { 'text-align': 'left ! important', 'padding': '0px ! important' } },
                                                                      { header: "hdnOVenId", id: "hdnIVenId", width: 60, hidden: true },
                                                                      { header: "hdnItemId", id: "hdnIItemId", width: 60, hidden: true },
                                                                      { header: "hdnOSessId", id: "hdnISessId", width: 60, hidden: true },
                                                                      { header: "hdnOPlnId", id: "hdnIPlnId", width: 60, hidden: true },//menu Type
                                                                  ],
                                                                  rules: {
                                                                      OTyId: webix.rules.isNotEmpty,
                                                                      MItemNM: webix.rules.isNotEmpty,
                                                                  },
                                                                  on: {
                                                                      'onKeyPress': function (e, id) {
                                                                          if (e == 40) {
                                                                              fnMOtherRowAdd('1');
                                                                          }
                                                                      },
                                                                      'onEditorChange': function (id, value, row) {
                                                                          //var getval = this.getItem(id);
                                                                          $$("grdOthers").refresh();
                                                                      },
                                                                      'onItemClick': function (id, e, node, trg) {

                                                                          var getval = this.getItem(id);

                                                                          $("#hdnGrdMOthColNM").val(id.column);

                                                                          $$("grdOthers").refresh();

                                                                          if (id.column == 'btnISrch') {
                                                                              fnCallOthertProdSrch('');
                                                                          }
                                                                          else if (id.column == 'btnIDel') {

                                                                              webix.confirm({
                                                                                  title: "Confirmation !",
                                                                                  ok: "Yes", cancel: "No",
                                                                                  text: "Are you sure to Delete this line Item !"
                                                                              })
                                                                             .then(function () {
                                                                                 $$("grdOthers").editCancel();
                                                                                 $$("grdOthers").remove($$("grdOthers").getSelectedId());
                                                                                 $$("grdOthers").refresh();

                                                                                 var data = $$("grdOthers").serialize();

                                                                                 if (data.length == 0) {
                                                                                     fnMOtherRowAdd('0');
                                                                                 }

                                                                                 fnCallMenuDetStore();

                                                                             })
                                                                              .fail(function () {
                                                                              });
                                                                          }
                                                                      },
                                                                      'onAfterEditStop': function (state, editor) {
                                                                          var dtOthers = $$("grdOthers").getSelectedItem(true);

                                                                          if (editor.column == 'Disc' || editor.column == 'Rate'||editor.column == 'SaleRate') {

                                                                              var vRate = (dtOthers[0].Rate == "" ? 0 : parseFloat(dtOthers[0].Rate));
                                                                              var vDisc = (dtOthers[0].Disc == "" ? 0 : parseFloat(dtOthers[0].Disc));

                                                                              dtOthers[0].DiscAmt = ((vRate * vDisc) / 100).toFixed(2);

                                                                              dtOthers[0].Rate = vRate.toFixed(2);

                                                                              dtOthers[0].SaleRate = (parseFloat(dtOthers[0].SaleRate) - parseFloat((vRate * vDisc) / 100)).toFixed(2);
                                                                          }

                                                                          fnCallMenuDetStore();

                                                                          $$("grdOthers").refresh();
                                                                      },
                                                                  }
                                                              }
                                                          ]
                                                      }
                                                 ]
                                             },
                                             {
                                                 minheight:500,
                                                 cols: [
                                                     {
                                                         view: "datatable",
                                                         id: "grdPlanStore",
                                                         editable: true,
                                                         select: "row",
                                                         data: [],
                                                         height: 250,
                                                         width: 350,
                                                         scroll: true,
                                                         hidden: true,
                                                         columns: [
                                                             { header: "MRowId", id: "MRowId", width: 30, },
                                                             { header: "Plan Item", id: "ITEM_NM", width: 130, stringResult: true, css: { 'text-align': 'left ! important' } },
                                                             { header: "Qty", id: "QTY", width: 50, css: { 'text-align': 'center ! important' }, },
                                                             { header: "PVenId", id: "hdnPVenId", width: 50, css: { 'text-align': 'center ! important' }, },
                                                             { header: "PSessId", id: "hdnPSessId", width: 50, css: { 'text-align': 'center ! important' }, },
                                                             { header: "PPlnId", id: "hdnPPlnId", width: 100, css: { 'text-align': 'center ! important' }, },
                                                         ],
                                                         on: {
                                                             'onItemClick': function (id, e, node, trg) {
                                                             },
                                                         }
                                                     },
                                                     {
                                                         view: "datatable",
                                                         id: "grdMenuDetails",
                                                         editable: true,
                                                         select: "row",
                                                         data: [],
                                                         height: 250,
                                                         width: 950,
                                                         scroll: true,
                                                         hidden:true,
                                                         columns: [
                                                             { header: "MRowId", id: "MRowId", width: 30, },
                                                             { header: "Item Name", id: "MItemNM", width: 205, css: { 'text-align': 'left ! important' } },
                                                             { header: "Qty", id: "MMenuQty", width: 50, css: { 'text-align': 'center ! important' }, editor: "text", },
                                                             { header: "Narration", id: "MMenuNarr", width: 150, css: { 'text-align': 'left ! important' }, editor: 'text', },
                                                             { header: "Group Menu", id: "MPlanNm", width: 120, css: { 'text-align': 'left ! important' } },
                                                             { header: "mItemId", id: "hdnIItemId", width: 50, css: { 'text-align': 'left ! important' } },
                                                             { header: "mVenId", id: "hdnIVenId", width: 50, css: { 'text-align': 'left ! important' } },
                                                             { header: "mSessId", id: "hdnISessId", width: 50, css: { 'text-align': 'left ! important' } },
                                                             { header: "mPlnId", id: "hdnIPlnId", width: 50, css: { 'text-align': 'left ! important' } },//menu Type
                                                             { header: "SNo", id: "SNo", width: 50, css: { 'text-align': 'left ! important' } },
                                                             { header: "Menu_Group", id: "MMenuSeqNo", width: 100, css: { 'text-align': 'left ! important' } },

                                                             //Other Grid Details
                                                             { header: "TyName", id: "TyName", width: 100, css: { 'text-align': 'left ! important' } },
                                                             { header: "TyId", id: "OTyId", width: 100, css: { 'text-align': 'left ! important' } },
                                                             { header: "VRT", id: "Rate", width: 100, css: { 'text-align': 'left ! important' } },
                                                             { header: "VDispRate", id: "SaleRate", width: 100, css: { 'text-align': 'left ! important' } },
                                                             { header: "vDiscPer", id: "Disc", width: 100, css: { 'text-align': 'left ! important' } },
                                                             { header: "vDiscAmt", id: "DiscAmt", width: 100, css: { 'text-align': 'left ! important' } },
                                                             { header: "GrdId", id: "GrdId", width: 40, css: { 'text-align': 'left ! important' } },
                                                         ],
                                                         on: {
                                                         }
                                                     },
                                                 ]
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
                                              },
                                              {
                                                  view: "text",
                                                  id: "txtAddress1",
                                                  labelAlign: "Right",
                                                  label: " ",
                                                  labelWidth: 150,
                                                  inputWidth: 500,
                                                  width: 500,
                                              },
                                              {
                                                  view: "text",
                                                  id: "txtAddress2",
                                                  labelAlign: "Right",
                                                  label: " ",
                                                  labelWidth: 150,
                                                  inputWidth: 500,
                                                  width: 500,
                                              },
                                              {
                                                  view: "text",
                                                  id: "txtCity",
                                                  labelAlign: "Right",
                                                  label: "City",
                                                  labelWidth: 150,
                                                  inputWidth: 350,
                                                  width: 350,
                                              },
                                              {
                                                  view: "text",
                                                  id: "txtPincode",
                                                  labelAlign: "Right",
                                                  label: "Pin Code",
                                                  labelWidth: 150,
                                                  inputWidth: 350,
                                                  width: 350,
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
                                                  id: "txtPhone",
                                                  labelAlign: "Right",
                                                  label: "Phone",
                                                  labelWidth: 150,
                                                  inputWidth: 350,
                                                  width: 350,
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
                                                   id: "txtMobile",
                                                   labelAlign: "Right",
                                                   label: "Mobile",
                                                   labelWidth: 150,
                                                   inputWidth: 350,
                                                   width: 350,
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
                                                  id: "txtEmail",
                                                  labelAlign: "Right",
                                                  label: "Email",
                                                  labelWidth: 150,
                                                  inputWidth: 500,
                                                  width: 500,
                                              },
                                              {
                                                  view: "text",
                                                  id: "txtEmail2",
                                                  labelAlign: "Right",
                                                  label: "Email2",
                                                  labelWidth: 150,
                                                  inputWidth: 500,
                                                  width: 500,
                                              },
                                              {
                                                  view: "text",
                                                  id: "txtContactP",
                                                  labelAlign: "Right",
                                                  label: "Contact Person",
                                                  labelWidth: 150,
                                                  inputWidth: 500,
                                                  width: 500,
                                              },
                                              {
                                                  view: "text",
                                                  id: "txtCPDesig",
                                                  labelAlign: "Right",
                                                  label: "Contact Person Desig",
                                                  labelWidth: 150,
                                                  inputWidth: 500,
                                                  width: 500,
                                              },
                                              {
                                                  view: "text",
                                                  id: "txtCPPhone",
                                                  labelAlign: "Right",
                                                  label: "Contact Person Phone",
                                                  labelWidth: 150,
                                                  inputWidth: 500,
                                                  width: 500,
                                              },
                                          ]
                                      }
                                  ]
                              }
                         },
                       ],
                       tabbar: {
                           on: {
                               onAfterTabClick: function () {

                                   //if ($.trim(this.getValue()) == "FBFrm") {
                                   //    fnCallDepartStore();
                                   //}
                                   //else if ($.trim(this.getValue()) == "MenuFrm") {

                                   //    var data = $$("grdMenu").serialize();
                                   //    var lenval = data.length;

                                   //    if ($("#hdnCurMode").val() == "N" && lenval == 0) {
                                   //        fnMenuRowAdd('0');
                                   //    }
                                   //}
                               }
                           }
                       }
                   },
                ]
            }
        ]
    };
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function prcSaveBQTrans() {

    if (!fnBQSaveValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

     var dataparam = {};
    dataparam["REQTYPE"] = "GET_BQRESVSAVE";
    dataparam["PROGNAME"] = "GET_BQRESCODE01";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    //******************* Reserve *********************************
    dataparam["GuestId"] = $("#hdnGstId").val();
    dataparam["cmbTitleTag"] = $("#cmbTitleTag").val();
    dataparam["cbnBlkSrchTag"] = $("#hdnBlkSrchTag").val();
    dataparam["ddlGuestTy"] = $.trim($$("ddlGuestTy").getValue());
    dataparam["ddlGstTit"] = $.trim($$("ddlTit").getValue());
    dataparam["txtGstName"] = $.trim($$("txtGstName").getValue());
    dataparam["txtFirstNm"] = $.trim($$("txtFirstNm").getValue());
    dataparam["txtHostBy"] = $.trim($$("txtHostBy").getValue());

    dataparam["txtFromDt"] = $.trim($$("txtFrmDate").getValue());
    dataparam["txtToDt"] = $.trim($$("txtToDt").getValue());
    dataparam["ddlFuncTy"] = $.trim($$("ddlFunTy").getValue());
    dataparam["ddlMarkSeg"] = $.trim($$("ddlMarkSeg").getValue());
    dataparam["ddlBusSrc"] = $.trim($$("ddlBusSrc").getValue());
    dataparam["ddlSetMode"] = $.trim($$("ddlSetMode").getValue());
    dataparam["ddlBillInst"] = $.trim($$("ddlBillInst").getValue());
    dataparam["ddlChannel"] = $.trim($$("ddlChannel").getValue());
    dataparam["ddlSalesPer"] = $.trim($$("ddlSalesPer").getValue());

    dataparam["txtBooker"] = $.trim($("#hdnBookerId").val());
    dataparam["txtReminder"] = $.trim($$("txtReminder").getValue());
    dataparam["txtRDate"] = $.trim($$("txtRDate").getValue());
    dataparam["WLSaveInd"] = $.trim(($("#hdnSaveTag").val()));

    if ($$("txtRTm").getValue() != "") {
        var TimeFm1 = new Date($$("txtRTm").getValue());
        dataparam["txtRTm"] = (TimeFm1.getHours().toString().length == 1 ? "0" + TimeFm1.getHours() : TimeFm1.getHours()) + ":"
            + (TimeFm1.getMinutes().toString().length == 1 ? "0" + TimeFm1.getMinutes() : TimeFm1.getMinutes());
    }
    else {
        dataparam["txtRTm"] = "00:00";
    }

    dataparam["txtNarration"] = $.trim($$("txtNarration").getValue());

    //Right Panel

    dataparam["txtResvNo"] = $.trim($$("txtResvNo").getValue());
    dataparam["txtResvDt"] = $.trim($$("txtResvDt").getValue());
    dataparam["ddlStatus"] = $.trim($$("ddlStatus").getValue());
    dataparam["OldStatus"] = $.trim($("#hdnOldStatus").val());
    dataparam["txtCutdt"] = $.trim($$("txtCutdt").getValue());
    dataparam["txtGPax"] = $.trim($$("txtGPax").getValue());
    dataparam["txtCGst"] = $.trim($$("txtCGst").getValue());

    if ($$("txtArrTm").getValue() != "") {

        var TimeFm2 = new Date($$("txtArrTm").getValue());
        dataparam["txtArrTm"] = (TimeFm2.getHours().toString().length == 1 ? "0" + TimeFm2.getHours() : TimeFm2.getHours()) + ":"
           + (TimeFm2.getMinutes().toString().length == 1 ? "0" + TimeFm2.getMinutes() : TimeFm2.getMinutes());
    }
    else {
        dataparam["txtArrTm"] = "00:00";
    }

    dataparam["txtBaner"] = $.trim($$("txtBaner").getValue());
    dataparam["txtBookRef"] = $.trim($$("txtBookRef").getValue());
    dataparam["ChkClsRem"] = $.trim($$("ChkClsRem").getValue());

    dataparam["ChkLMusic"] = $.trim($$("ChkLMusic").getValue());
    dataparam["lblAdvAmt"] = $.trim($$("lblAdvAmt").getValue());
    dataparam["txtAdvAmt"] = $.trim($$("txtAdvAmt").getValue());
    dataparam["lblDisAmt"] = $.trim($$("lblDisAmt").getValue());
    dataparam["txtDisAmt"] = $.trim($$("txtDisAmt").getValue());

    dataparam["chkComappl"] = $.trim($$("chkComappl").getValue());
    dataparam["txtApprBy"] = $.trim($$("txtApprBy").getValue());
    dataparam["txtComNar"] = $.trim($$("txtComNar").getValue());
    dataparam["ChkStgSetup"] = $.trim($$("ChkStgSetup").getValue());
    dataparam["ChkShiftPri"] = $.trim($$("ChkShiftPri").getValue());
    dataparam["ChkShiftAft"] = $.trim($$("ChkShiftAft").getValue());
    dataparam["txtChf"] = $.trim($$("txtChf").getValue());
    dataparam["ddlCurId"] = $.trim($$("ddlCurId").getValue());

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

    var dsgrdDepart = $$("grdDepartShow").serialize();
    var GridDepart = JSON.stringify(dsgrdDepart);
    dataparam["TBLDEPART"] = GridDepart;

    ////******************************* F & B Tap ******************************
    var dsgrdFB = $$("grdFB").serialize();
    var GridFB = JSON.stringify(dsgrdFB);
    dataparam["TBLFB"] = GridFB;

    //******************************* Menu Tap ******************************
    var dsgrdMenu = $$("grdMenu").serialize();
    var GridMenu = JSON.stringify(dsgrdMenu);
    dataparam["TBLMENU"] = GridMenu;

    var dsgrdItem = $$("grdMenuDetails").serialize();
    var GridItem = JSON.stringify(dsgrdItem);
    dataparam["TBLITEM"] = GridItem;

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
               var rowData = JSON.parse(objRes);

                $$("BQTabView").getTabbar().setValue("ReserveFrm");

                var Mode = $("#hdnCurMode").val();

                if (rowData.vRetMsg == "1") {

                    if ($("#hdnSaveTag").val() == "2" || $("#hdnSaveTag").val() == "0"|| $("#hdnSaveTag").val() == "") {
                        $("#btnRef").click();
                    }

                    if ($.trim(Mode) == "N") {

                        if ($("#hdnSaveTag").val() == "1") {
                            if ($$("RbtnStatus").getValue() != "2") {
                                fnPopSuccess("Updated Successfully", rowData.vReserveNo, "1");
                                $$("txtResvNo").setValue(rowData.vReserveNo);
                                $("#btnOpen").click();
                               
                            }
                            else {
                                $$("txtResvNo").setValue(rowData.vReserveNo);
                            }
                            $$("txtResvSrc").hide();
                            $("#hdnSaveTag").val("0");
                            $("#hdnCurMode").val("O");
                        }
                        else if ($("#hdnSaveTag").val() == "2") {
                            $$("txtResvNo").setValue(rowData.vReserveNo);
                            fnPopSuccess("Saved Successfully", rowData.vReserveNo, "1");
                        }
                    }
                    else
                        fnPopSuccess("Updated Successfully", "", "2");

                    $("#hdnGstId").val("");
                }
                else {
                    if (rowData.vRetMsg == "0") {
                        fnPopSuccess("Save Failed !", "", "2");
                    }
                    else {
                        AlertMessage(rowData.vRetMsg);
                        $("#LoadDIv").hide();
                        return ;
                    }
                }

                $("#LoadDIv").hide();
            }
        },
    });
}
