    
var app = angular.module('BQTApp', ['webix']);


app.controller("BQMasterController", function ($scope) {
 
    var valid = [
        { "id": "1", "value": "0" },
        { "id": "2", "value": "1" },
        { "id": "3", "value": "2" },
        { "id": "4", "value": "3" },
        { "id": "5", "value": "4" }, ];
    var BRSDrop = [
        { "id": "1", "value": "30" },
        { "id": "2", "value": "60" },
        { "id": "3", "value": "90" },
        { "id": "4", "value": "120" },
        { "id": "5", "value": "150" },
        { "id": "6", "value": "180" },
        { "id": "7", "value": "210" },
        { "id": "8", "value": "240" },
    ]

    $("#LoadDIv").hide();
    $scope.frmMstBanquetSetting = {

        id: "frmMstBanquetSetting",
        view: 'form',
        minWidth: 1250,     
        height: 950,

        elements: [
            {
                rows: [
                   {
                       height: 550,
                       id: "BQTabView",
                       view: "tabview",                   
                       type: "space",
                       cells: [
                         {
                             header: "<span class=''></span>Main",
                             body: {
                                 id: "Mainfrm",
                                 view: "form",
                                 scroll: true,
                                 // height:500,
                                 elements: [
                                     {
                                         rows: [
                                             {                                               
                                                 cols: [
                                                       {
                                                           view: "richselect",
                                                           id: "ddlGuestTy",
                                                           label: " Default Outlet",
                                                           labelAlign: "Left",
                                                           labelWidth: 250,
                                                           inputWidth: 400,
                                                           width: 400,
                                                           minwidth: 400,
                                                           on: {
                                                               onChange: function (newval, oldval) {
                                                               }
                                                           }
                                                       },
                                                       {
                                                           cols: [
                                                        {
                                                            id: "ChkKOTBeGenerated",
                                                            view: "checkbox",
                                                            label: "KOT No To Be Generated,Yes",
                                                            labelAlign: "left",
                                                            labelWidth: 170,
                                                            inputWidth: 200,
                                                            width: 200,
                                                            minwidth: 200,
                                                            on: {
                                                                onChange: function (newval, oldval) {
                                                                    if ($.trim(newval) == "1") {
                                                                        $$("txtFirstNm").show();
                                                                        $$("txtLastNCKOT").show();
                                                                    }
                                                                    else {
                                                                        $$("txtFirstNm").hide();
                                                                        $$("txtLastNCKOT").hide();
                                                                    }
                                                                    {
                                                                        if ($.trim(newval) == "0") {
                                                                            $$("OptGrpVenu").show();
                                                                            $$("ChckValidate").show();
                                                                        }
                                                                        else if ($.trim(newval) == "1") {
                                                                            $$("OptGrpVenu").hide();
                                                                            $$("ChckValidate").hide();
                                                                        }
                                                                    }
                                                                }

                                                            }
                                                           
                                                        },
                                                        {
                                                            id: "OptGrpVenu",
                                                            view: "radio",
                                                            labelAlign: "left",
                                                            labelWidth: 80,
                                                            inputWidth: 450,
                                                            width: 450,
                                                            minwidth: 450,
                                                            hidden:true,
                                                            vertical: false,
                                                            value: "",
                                                            customRadio: false,
                                                            options: [{ value: "Venu wise Book Audit", id: 1 },
                                                                         { value: "Common Venu Book Audit", id: 2 },
                                                                         { value: "No Book Audit", id: 3 }, ]
                                                        }, ]
                                                       },

                                                        {
                                                            view: "text",
                                                            id: "txtFirstNm",
                                                            label: "Last KOT No",                                                           
                                                            labelAlign: "left",
                                                            labelWidth: 80,
                                                            inputWidth: 150,
                                                            width: 250,
                                                            minwidth: 250,
                                                            hidden:true,
                                                           
                                                           
                                                            on: {
                                                                onChange: function (newval, oldval) {
                                                                }
                                                            }
                                                        },
                                                 ]
                                             },
                                        
                                                 {
                                                     cols:[
                                                            {
                                                                view: "checkbox",
                                                                id: "ChckFunction",
                                                                label: "Function Prospectous to be Prints yes",
                                                                labelAlign: "Left",
                                                                labelWidth: 250,
                                                                inputWidth: 300,
                                                                width: 400,
                                                                minwidth: 400,
                                                               
                                                               
                                                        
                                                            },
                                                            {
                                                                view: "text",
                                                                id: "txtLastNCKOT",
                                                                label: "Last NC_ KOT No",
                                                                labelAlign: "Left",
                                                                labelWidth: 170,
                                                                inputWidth: 230,
                                                                width: 250,
                                                                minwidth: 250,
                                                                hidden:true,
                                                            }, {
                                                                view: "checkbox",
                                                                id: "ChckValidate",
                                                                label: "Validate Unique KOT NO",
                                                                labelAlign: "left",
                                                                labelWidth: 170,
                                                                inputWidth: 300,
                                                                width: 300,
                                                                minwidth: 300,
                                                                hidden: true,
                                                            },
                                                     ]

                                                 },
                                                 {
                                                     view: "text",
                                                     id: "txtFPsigna",
                                                     label: "FP-Signatory",
                                                     labelAlign: "Left",
                                                     labelWidth: 250,
                                                     inputWidth: 950,
                                                     width: 950,
                                                     minwidth: 950,
                                                     attributes: { maxlength: 200 },
                                                    
                                                 },
                                                    {
                                                        view: "text",
                                                        id: "txtFPLastLinNarr",
                                                        label: "FPLast Line Narration",
                                                        labelAlign: "Left",
                                                        labelWidth: 250,
                                                        inputWidth: 950,
                                                        width: 950,
                                                        minwidth: 950,
                                                        attributes: { maxlength: 80 },
                                                    },

                                                        {
                                                            view: "text",
                                                            id: "txtChallanSig",
                                                            label: "Challan Signatory",
                                                            labelAlign: "Left",
                                                            labelWidth: 250,
                                                            inputWidth: 950,
                                                            width: 950,
                                                            minwidth: 950,
                                                            attributes: { maxlength: 200 },
                                                        },
                                                         {
                                                             view: "text",
                                                             id: "txtBillSig",
                                                             label: "Bill Signatory",
                                                             labelAlign: "Left",
                                                             labelWidth: 250,
                                                             inputWidth: 950,
                                                             width: 950,
                                                             minwidth: 950,
                                                             attributes: { maxlength: 200 },
                                                         },
                                                          {
                                                              cols:[
                                                                  {
                                                                      view: "text",
                                                                      id: "txtFBPrint",
                                                                      label: "FB Print Program",
                                                                      labelAlign: "Left",
                                                                      labelWidth: 250,
                                                                      inputWidth: 450,
                                                                      width: 450,
                                                                      attributes: { maxlength: 25 },
                                                                      minwidth: 450,
                                                                      
                                                                  },
                                                                  {
                                                                      view: "text",
                                                                      id: "txtGuetsBillReceprint",
                                                                      label: "Guest Bill Receipt print Program",
                                                                      labelAlign: "left    ",
                                                                      labelWidth: 300,
                                                                      inputWidth: 500,
                                                                      width: 500,
                                                                      minwidth: 500,
                                                                      attributes: { maxlength: 25 },
                                                                  },]

                                                          },

                                                             {
                                                                 cols:[
                                                                 {
                                                                     view: "text",
                                                                     id: "txtChlPrinPrg",
                                                                     label: "Challan Print Program",
                                                                     labelAlign: "Left",
                                                                     labelWidth: 250,
                                                                     inputWidth: 450,
                                                                     width: 450,
                                                                     minwidth: 450,

                                                                     attributes: { maxlength: 25 },
                                                                 },
                                                                 {
                                                                     view: "text",
                                                                     id: "txtKOTorintPrg",
                                                                     label: "KOT Print Program",
                                                                     labelAlign: "left",
                                                                     labelWidth: 300,
                                                                     inputWidth: 500,
                                                                     width: 500,
                                                                     minwidth: 500,
                                                                     attributes: { maxlength: 30 },
                                                                     
                                                                 },
                                                                 ]
                                                             },
                                                             {
                                                                 view: "text",
                                                                 id: "txtPrintPrg",
                                                                 label: "Bill Print Program",
                                                                 labelAlign: "Left",
                                                                 labelWidth: 250,
                                                                 inputWidth: 450,
                                                                 width: 450,
                                                                 minwidth: 450,
                                                                 attributes: { maxlength: 25 },
                                                             }  ,
                                                             {
                                                                 id: "ChkKOTBe",
                                                                 view: "checkbox",
                                                                 label: "KOT Print Applicable,Yes",
                                                                 labelAlign: "Left",
                                                                 labelWidth: 250,
                                                                 inputWidth: 300,
                                                                 width: 450,
                                                                 minwidth: 450,
                                                                
                                                             },
                                                                 {
                                                                     id: "ChkAllKOT",
                                                                     view: "checkbox",
                                                                     label: "Allow KOT Item Edit,Yes",
                                                                     labelAlign: "Left",
                                                                     labelWidth: 250,
                                                                     inputWidth: 300,
                                                                     width: 450,
                                                                     minwidth: 450,

                                                                 },
                                                                 {
                                                                     cols:[
                                                                         {
                                                                             id: "ChkAmenprint",
                                                                             view: "checkbox",
                                                                             label: "Amendment Print",
                                                                             labelAlign: "Left",
                                                                             labelWidth: 250,
                                                                             inputWidth: 300,
                                                                             width: 450,
                                                                             minwidth: 450,
                                                                             on: {
                                                                                 "onChange": function (newval, oldvalue) {

                                                                                     if ($.trim(newval) == "1") {
                                                                                         $$("txtAmendPrintPrg").show();

                                                                                     }
                                                                                     else {
                                                                                         $$("txtAmendPrintPrg").hide();

                                                                                     }
                                                                                 }
                                                                             }
                                                                         },
                                                                         {
                                                                             view: "text",
                                                                             id: "txtAmendPrintPrg",
                                                                             label: "Amend Print Program",
                                                                             labelAlign: "Left",
                                                                             labelWidth: 300,
                                                                             inputWidth: 450,
                                                                             width: 450,
                                                                             minwidth: 450,
                                                                             hidden:true,
                                                                             
                                                                         }
                                                                     ]
                                                                 },

                                                                 {
                                                                     cols:[
                                                                         {
                                                                             id: "CHKMulOutAppli",
                                                                             view: "checkbox",
                                                                             label: "Multiple Outlets Applicable",
                                                                             labelAlign: "Left",
                                                                             labelWidth: 250,
                                                                             inputWidth: 300,
                                                                             width: 450,
                                                                             minwidth: 450,
                                                                         },
                                                                         {
                                                                             id: "ChkMenuGrpApplica",
                                                                             view: "checkbox",
                                                                             label: "Menu Group Applicable,Yes",
                                                                             labelAlign: "Left",
                                                                             labelWidth: 300,
                                                                             inputWidth: 450,
                                                                             width: 450,
                                                                             minwidth: 450,
                                                                         },
                                                                     ]

                                                                 },
                                                                 {
                                                                     cols:[
                                                                         {
                                                                             id: "ChkPrintPrgFP",
                                                                             view: "checkbox",
                                                                             label: "Print Program Formate as FP Preview",
                                                                             labelAlign: "Left",
                                                                             labelWidth: 250,
                                                                             inputWidth: 300,
                                                                             width: 450,
                                                                             minwidth: 450,

                                                                         },
                                                                         {

                                                                             id: "ChckEmailtelemadBooker",
                                                                             view: "checkbox",
                                                                             label: "Email,Telephone Mandatory for Booker/Guest Contact,Yes",
                                                                             labelAlign: "Left",
                                                                             labelWidth: 300,
                                                                             inputWidth: 400,
                                                                             width: 400,
                                                                             minwidth: 400,
                                                                          
                                                                         }
                                                                     ]

                                                                 },
                                                                    {
                                                                        id: "ChkFunctionDetails",
                                                                        view: "checkbox",
                                                                        label: "Function Details at Profile Applicable,yes",
                                                                        labelAlign: "Left",
                                                                        labelWidth: 250,
                                                                        inputWidth: 300,
                                                                        width: 450,
                                                                        minwidth: 450,
                                                                    

                                                                    },
                                                                    {
                                                                        id: "ChkInKOTCrationDefault",
                                                                        view: "checkbox",
                                                                        label: "In KOT Creation, Default Category is'KOT'",
                                                                        labelAlign: "Left",
                                                                        labelWidth: 250,
                                                                        inputWidth: 300,
                                                                        width: 450,
                                                                        minwidth: 450,
                                                                        
                                                                    },
                                                                       {
                                                                           id: "ChkUsrWisevenPrivAppli",
                                                                           view: "checkbox",
                                                                           label: "User wise Venue Privilege Appicable",
                                                                           labelAlign: "Left",
                                                                           labelWidth: 250,
                                                                           inputWidth: 300,
                                                                           width: 450,
                                                                           minwidth: 450,
                                                                       },
                                                                       {
                                                                           id: "ChkDefaultscreenVenue",
                                                                           view: "checkbox",
                                                                           label: "DefaultScreen WhileLogin,VenueQuery",
                                                                           labelAlign: "Left",
                                                                           labelWidth: 250,
                                                                           inputWidth: 300,
                                                                           width: 450,
                                                                           minwidth: 450,
                                                                           on: {
                                                                               "onChange": function (newval, oldval) {
                                                                                   if (newval == "1") {
                                                                                       $$("ChkFlasRep").setValue("0")
                                                                                   }
                                                                                   else {
                                                                                      // $$("ChkFlasRep").setValue("1")
                                                                                   }
                                                                               }
                                                                           }
                                                                       },
                                                                        {
                                                                            id: "ChkFlasRep",
                                                                            view: "checkbox",
                                                                            label: "Flash Report",
                                                                            labelAlign: "Left",
                                                                            labelWidth: 250,
                                                                            inputWidth: 300,
                                                                            width: 450,
                                                                            minwidth: 450,
                                                                            on: {
                                                                                "onChange": function (newval, oldval) {
                                                                                    if (newval == "1") {
                                                                                        $$("ChkDefaultscreenVenue").setValue("0")
                                                                                    }
                                                                                    else {
                                                                                        //$$("ChkDefaultscreenVenue").setValue("1")
                                                                                    }
                                                                                }
                                                                            }
                                                                        },

                                         ]

                                     }
                                 ]
                             }
                         },

                         {
                             header: "<span class=''></span>Revenue",
                             body: {
                                 id: "Revenue frm",
                                 view: "form",
                                 select: true,
                                 height: 500,
                                 elements: [
                                     {
                                         rows: [
                                             {
                                                 cols: [
                                                       {
                                                           view: "richselect",
                                                           id: "ddlAdvanRevenue",
                                                           label: "Advance Revenue",
                                                           labelAlign: "Left",
                                                           labelWidth: 150,
                                                           inputWidth: 350,
                                                           width: 350,
                                                           minwidth: 350,
                                                           on: {
                                                               onChange: function (newval, oldval) {

                                                               }
                                                           }
                                                       },
                                                 ]

                                             },
                                         {
                                             view: "richselect",
                                             id: "ddlPaidRevenue",
                                             label: " PaidOut Revenu",
                                             labelAlign: "Left",
                                             labelWidth: 150,
                                             inputWidth: 350,
                                             width: 350,
                                             minwidth: 350,
                                             on: {
                                                 onChange: function (newval, oldval) {

                                                 }
                                             }
                                         },
                                         {
                                             view: "richselect",
                                             id: "ddlRoundrevenue",
                                             label: " RoundOff Revenue",
                                             labelAlign: "Left",
                                             labelWidth: 150,
                                             inputWidth: 350,
                                             width: 350,
                                             minwidth: 350,
                                             on: {
                                                 onChange: function (newval, oldval) {

                                                 }
                                             }
                                         },
                                         {
                                             view: "richselect",
                                             id: "ddlDepositeReve",
                                             label: " Deposit Revenue",
                                             labelAlign: "Left",
                                             labelWidth: 150,
                                             inputWidth: 350,
                                             width: 350,
                                             minwidth: 350,
                                             on: {
                                                 onChange: function (newval, oldval) {

                                                 }
                                             }

                                         },
                                         {
                                             
                                             view: "richselect",
                                             id: "ddlBillrounOff",
                                             label: " Bill Round Off",
                                             labelAlign: "Left",
                                             labelWidth: 150,
                                             inputWidth: 350,
                                             width: 350,
                                             minwidth: 350,
                                             on: {
                                                 onChange: function (newval, oldval) {

                                                 }
                                             }

                                         },
                                         {
                                             view: "text",
                                             id: "txtLastBillNO",
                                             label: "Last Bill No",
                                             labelAlign: "Left",
                                             labelWidth: 150,
                                             inputWidth: 350,
                                             width: 350,
                                             minwidth: 350,
                                             attributes: { maxlength: 10 },
                                         }, {
                                             view: "text",
                                             id: "txtLastNCBillNO",
                                             label: "Last Nc Bill No",
                                             labelAlign: "Left",
                                             labelWidth: 150,
                                             inputWidth: 350,
                                             width: 350,
                                             minwidth: 350,
                                             attributes: { maxlength: 10 },
                                         },
                                         ]
                                     }
                                 ]
                             }
                         },
                         {
                             header: "<span class=''></span>Cashier",
                             body: {
                                 id: "Cashier frm",
                                 view: "form",
                                 select: true,
                                 scroll: true,
                                 height:500,
                                 elements: [
                                     {
                                         rows: [
                                             {
                                                 cols: [
                                                       {
                                                           view: "text",
                                                           id: "txtPaidprintPrg",
                                                           label: "Paidout Print Program",
                                                           labelAlign: "Left",
                                                           labelWidth: 350,
                                                           inputWidth: 550,
                                                           width: 550,
                                                           minwidth: 550,
                                                           attributes: { maxlength: 30 },
                                                       },
                                                 ]
                                             },
                                         {
                                             view: "text",
                                             id: "txtReservationAdvanc",
                                             label: "Reservation Advance",
                                             labelAlign: "Left",
                                             labelWidth: 350,
                                             inputWidth: 550,
                                             width: 550,
                                             minwidth: 550,
                                             attributes: { maxlength: 30 },

                                         },
                                         {
                                             view: "text",
                                             id: "txtAdvanceRef",
                                             label: "AdvanceRefund",
                                             labelAlign: "Left",
                                             labelWidth: 350,
                                             inputWidth: 550,
                                             width: 550,
                                             minwidth: 550,
                                             attributes: { maxlength: 30 },
                                         },
                                         {
                                             view: "text",
                                             id: "txtProPrintPrg",
                                             label: "ProfomaPrint Program",
                                             labelAlign: "Left",
                                             labelWidth: 350,
                                             inputWidth: 550,
                                             width: 550,
                                             minwidth: 550,
                                             attributes: { maxlength: 30 },
                                         },
                                          {
                                              id: "ChkProBillMadatory",
                                              view: "checkbox",
                                              label: "Provisional Bill Madatory,Yes",
                                              labelAlign: "Left",
                                              labelWidth: 350,
                                              inputWidth: 400,
                                              width: 400,
                                              minwidth: 400,


                                          },
                                           {
                                               id: "ChkVATApplicable",
                                               view: "checkbox",
                                               label: "VAT Applicable,Yes",
                                               labelAlign: "Left",
                                               labelWidth: 350,
                                               inputWidth: 550,
                                               width: 550,
                                               minwidth: 400,
                                           },
                                            {
                                                view: "richselect",
                                                id: "ddlApplicabVATtax",
                                                label: " Applicable VAT tax",
                                                labelAlign: "Left",
                                                labelWidth: 350,
                                                inputWidth: 550,
                                                width: 550,
                                                minwidth: 550,
                                                on: {
                                                    onChange: function (newval, oldval) {

                                                    }
                                                }
                                            },
                                            {
                                                id: "ChkDiscountConsider",
                                                view: "checkbox",
                                                label: "Discount to be Considered,Yes",
                                                labelAlign: "Left",
                                                labelWidth: 350,
                                                inputWidth: 400,
                                                width: 400,
                                                minwidth: 400,
                                            },
                                                  {
                                                      id: "ChkAcceptLoyaMebers",
                                                      view: "checkbox",
                                                      label: "Accept Loyalty Members,Yes",
                                                      labelAlign: "Left",
                                                      labelWidth: 350,
                                                      inputWidth: 400,
                                                      width: 400,
                                                      minwidth: 400,
                                                  },
                                                  {
                                                      id: "ChkDiplomatTaxApplicable",
                                                      view: "checkbox",
                                                      label: "Diplomat(NO Tax)Applicable,Yes",
                                                      labelAlign: "Left",
                                                      labelWidth: 350,
                                                      inputWidth: 400,
                                                      width: 400,
                                                      minwidth: 400,
                                                      value:"",
                                                      on: {
                                                          "onChange": function (newval, oldVal) {
                                                              if (newval == "1") {
                                                                  $$("ChkZeroApplicable").setValue("0");
                                                              }
                                                              else {
                                                                  $$("ChkZeroApplicable").setValue("1");
                                                              }
                                                          }
                                                      }
                                                  },
                                                              {
                                                                  id: "ChkZeroApplicable",
                                                                  view: "checkbox",
                                                                  label: "Zero Tax Applicable,Yes",
                                                                  labelAlign: "Left",
                                                                  labelWidth: 350,
                                                                  inputWidth: 400,
                                                                  width: 400,
                                                                  minwidth: 400,
                                                                  on: {
                                                                      "onChange": function (newval, oldval) {
                                                                          if (newval == "1") {
                                                                              $$("ChkDiplomatTaxApplicable").setValue("0")
                                                                          }
                                                                          else {
                                                                              $$("ChkDiplomatTaxApplicable").setValue("1")
                                                                          }
                                                                      }
                                                                  }
                                                              },
                                                                    {
                                                                        id: "ChkAcceptBackDatesForcast",
                                                                        view: "checkbox",
                                                                        label: "Accept Back Dates for ForcastRep",
                                                                        labelAlign: "Left",
                                                                        labelWidth: 350,
                                                                        inputWidth: 400,
                                                                        width: 400,
                                                                        minwidth: 400,
                                                                    },
                                                                         
                                      {
                                          id: "ChkAllowBillingF_P",
                                          view: "checkbox",
                                          label: "Allow Billing Only after F_P Creation,Yes",
                                          labelAlign: "Left",
                                          labelWidth: 350,
                                          inputWidth: 400,
                                          width: 400,
                                          minwidth: 400,
                                      },
                                      {
                                          id: "ChkAcceptPlanItems",
                                          view: "checkbox",
                                          label: "AcceptPlanItems for M.T/ E.T ,Yes",
                                          labelAlign: "Left",
                                          labelWidth: 350,
                                          inputWidth: 400,
                                          width: 400,
                                          minwidth: 400,
                                      }, {
                                          id: "ChkAdditional",
                                          view: "checkbox",
                                          label: "Additional Charges Applicable ,Yes",
                                          labelAlign: "Left",
                                          labelWidth: 350,
                                          inputWidth: 400,
                                          width: 400,
                                          minwidth: 400,
                                      },
                                                 {
                                                     id: "ChkAllowMultipleOutletKOT",
                                                     view: "checkbox",
                                                     label: "Allow MultipleOutletKOT's In Single Bill  ,Yes",
                                                     labelAlign: "Left",
                                                     labelWidth: 350,
                                                     inputWidth: 400,
                                                     width: 400,
                                                     minwidth: 400,
                                                 },                                  
                                      {
                                          cols:[
                                      {
                                          id: "ChkTax",
                                          view: "checkbox",
                                          label: "Tax Inclusive of Item Rate,Yes",
                                          labelAlign: "Left",
                                          labelWidth: 350,
                                          inputWidth: 400,
                                          width: 400,
                                          minwidth: 400,
                                          on: {
                                              "onChange": function (newval, oldvalue) {

                                                  if ($.trim(newval) == "1") {
                                                      $$("OptGrps").show();
                                                  }
                                                  else {
                                                      $$("OptGrps").hide();
                                                  }
                                              }
                                          }
                                      },
                                       {
                                           id: "OptGrps",
                                           view: "radio",
                                           labelAlign: "Right",
                                           labelWidth: 200,
                                           inputWidth: 300,
                                           width: 300,
                                           minwidth: 300,
                                           hidden:true,
                                           height: 60,
                                           value: 1,
                                           customRadio: false,
                                           options: [{ value: "Discount is based on Basic Rate,excluding all Taxes", id: 1 },
                                                        { value: "Discount is based on Gross value Inclusive of all Taxes", id: 2 },
                                                      
                                       
                                     
                                           ]},]},
                                        {
                                            id: "ChkDefaultPrint",
                                            view: "checkbox",
                                            label: "By Default Print to be Enabled,Yes",
                                            labelAlign: "Left",
                                            labelWidth: 350,
                                            inputWidth: 400,
                                            width: 400,
                                            minwidth: 400,
                                        },
                                          {
                                              view: "richselect",
                                              id: "ddlNoBillCopies",
                                              label: " No Of Bill Copies",
                                              labelAlign: "Left",
                                              labelWidth: 350,
                                              inputWidth: 450,
                                              width: 500,
                                              minwidth: 500,
                                              value:"",
                                              options: valid,
                                              on: {
                                                  onChange: function (newval, oldval) {

                                                  }
                                              }
                                          },
                                          {
                                              cols:[
                                          {
                                              id: "ChkService",
                                              view: "checkbox",
                                              label: "Service Charge Optional,Yes",
                                              labelAlign: "Left",
                                              labelWidth: 350,
                                              inputWidth: 400,
                                              width: 400,
                                              minwidth: 400,
                                              hidden:true,
                                          },
                                          
                                                 {
                                                     id: "ChkServiceChargeExempted",
                                                     view: "checkbox",
                                                     label: "Service Charge Exempted As a Default Setting,Yes",
                                                     labelAlign: "Left",
                                                     labelWidth: 350,
                                                     inputWidth: 400,
                                                     width: 400,
                                                     minwidth: 400,
                                                 },
                                              ]
                                          },
                                          {
                                              view: "text",
                                              id: "txtGuestMessage",
                                              label: "Guest Message(ReplaceDefault)",
                                              labelAlign: "Left",
                                              labelWidth: 350,
                                              inputWidth: 900,
                                              width: 900,
                                              minwidth: 900,
                                              attributes: { maxlength: 200 },
                                          },
                                            {
                                                id: "ChkToRoomSetlement",
                                                view: "checkbox",
                                                label: "ToRoomSetlement Shouldpost Taxes/Service Charge Also,Yes",
                                                labelAlign: "Left",
                                                labelWidth: 350,
                                                inputWidth: 400,
                                                width: 400,
                                                minwidth: 400,
                                                on: {
                                                    "onChange": function (newval, oldval) {
                                                        if (newval == "1") {
                                                            $$("ChkRevenuewise").setValue("0");
                                                            //$$("ChkTaxSeparatly").show();
                                                        }
                                                        else {
                                                           // $$("ChkRevenuewise").setValue("1");
                                                            $$("ChkTaxSeparatly").hide();
                                                        }
                                                    }
                                                }
                                            },


                                               { cols:[{
                                                   id: "ChkRevenuewise",
                                                   view: "checkbox",
                                                   label: "RevenuewisePostingtoFoGuestLedgerFolio,Yes",
                                                   labelAlign: "Left",
                                                   labelWidth: 350,
                                                   inputWidth: 400,
                                                   width: 400,
                                                   minwidth: 400,
                                                   on: {
                                                       "onChange": function (newval, oldval) {
                                                           if (newval == "1") {
                                                               $$("ChkToRoomSetlement").setValue("0");
                                                               $$("ChkTaxSeparatly").show();
                                                           }
                                                           else {
                                                              // $$("ChkToRoomSetlement").setValue("1");
                                                               $$("ChkTaxSeparatly").hide();
                                                           }
                                                       }
                                                   }
                                               },
                                               {
                                                   id: "ChkTaxSeparatly",
                                                   view: "checkbox",
                                                   label: "Tax to be Posted Separatly",
                                                   labelAlign: "Left",
                                                   labelWidth: 250,
                                                   inputWidth: 400,
                                                   width: 400,
                                                   minwidth: 400,
                                                   hidden:true,
                                               },
                                               ]
                                               },
                                         ]
                                     }
                                 ]
                             }
                         },
                         {
                             header: "<span class=''></span>Others",
                             body: {
                                 id: "Others frm",
                                 view: "form",
                                 select: true,
                                 scroll: true,
                                 //height: 400,
                                 minWidth: 1200,
                                 elements: [
                                     {
                                         rows: [
                                             {
                                                 id: "ChkEventApplicable",
                                                 view: "checkbox",
                                                 label: "EventApplicable,Yes",
                                                 labelAlign: "Left",
                                                 labelWidth: 300,
                                                 inputWidth: 450,
                                                 width: 500,
                                                 minwidth: 500,
                                             },
                                             {
                                                 id: "ChkAcceptSteward",
                                                 view: "checkbox",
                                                 label: "Accept Steward atKot",
                                                 labelAlign: "Left",
                                                 labelWidth: 300,
                                                 inputWidth: 450,
                                                 width: 500,
                                                 minwidth: 500,
                                             },
                                               {
                                                   id: "ChkCreditCard",
                                                   view: "checkbox",
                                                   label: "Credit Card No to be moved to settlement narration ,Yes",
                                                   labelAlign: "Left",
                                                   labelWidth: 300,
                                                   inputWidth: 450,
                                                   width: 500,
                                                   minwidth: 500,
                                               },
                                        {
                                            id: "ChkBanquetAreaTo",
                                            view: "checkbox",
                                            label: "Banquet AreaTo be Accepted,Yes",
                                            labelAlign: "Left",
                                            labelWidth: 300,
                                            inputWidth: 450,
                                            width: 500,
                                            minwidth: 500,
                                        },
                                        
                                            { cols:[
                                                {
                                                    id: "ChkDynamicF1",
                                                    view: "checkbox",
                                                    label: "Dynamic Field 1",
                                                    labelAlign: "Left",
                                                    labelWidth: 300,
                                                    inputWidth: 350,
                                                    width: 350,
                                                    minwidth: 350,
                                                  
                                                    value: "",
                                                    on: {
                                                        "onChange": function (newval, oldvalue) {

                                                            if ($.trim(newval) == "1") {
                                                                $$("txtD1").show();

                                                            }
                                                            else {
                                                                $$("txtD1").hide();

                                                            }
                                                        }
                                                    }
                                                    
                                                },
                                                {
                                                    view: "text",
                                                    id: "txtD1",
                                                    labelAlign: "Right",
                                                    labelWidth: 220,
                                                    inputWidth: 250,
                                                    width: 330,
                                                    minWidth: 550,
                                                    hidden:true,
                                                    minwidth: 500,
                                                    attributes: { maxlength: 20 },
                                                },
                                            ]
                                            },
                                            {
                                                cols:[
                                                   {
                                                       id: "ChkDynamicF2",
                                                       view: "checkbox",
                                                       label: "Dynamic Field 2",
                                                       labelAlign: "Left",
                                                       labelWidth: 300,
                                                       inputWidth: 350,
                                                       width: 350,
                                                       minwidth: 350,
                                                       value: "",
                                                       on: {
                                                           "onChange": function (newval, oldvalue) {

                                                               if ($.trim(newval) == "1") {
                                                                   $$("txtD2").show();

                                                               }
                                                               else {
                                                                   $$("txtD2").hide();

                                                               }
                                                           }
                                                       }
                                                   },
                                                   {
                                                       view: "text",
                                                       id: "txtD2",
                                                       labelAlign: "Right",
                                                       labelWidth: 220,
                                                       inputWidth: 250,
                                                       width: 330,
                                                       minWidth: 550,
                                                       hidden: true,
                                                       attributes: { maxlength: 20 },
                                                   },
                                               
                                                ]},
                                              
                                           
                                           {
                                               cols:[{
                                                        
                                                   id: "ChkDynamicF3",
                                                   view: "checkbox",
                                                   label: "Dynamic Field 3",
                                                   labelAlign: "Left",
                                                   labelWidth: 300,
                                                   inputWidth: 350,
                                                   width: 350,
                                                   minwidth: 350,
                                                   value: "",
                                                   on: {
                                                       "onChange": function (newval, oldvalue) {

                                                           if ($.trim(newval) == "1") {
                                                               $$("txtD3").show();

                                                           }
                                                           else {
                                                               $$("txtD3").hide();

                                                           }
                                                       }
                                                   }
                                               },
                                                {
                                                    view: "text",
                                                    id: "txtD3",
                                                    labelAlign: "Right",
                                                    labelWidth: 220,
                                                    inputWidth: 250,
                                                    width: 330,
                                                    minWidth: 550,
                                                    hidden: true,
                                                    attributes: { maxlength: 20 },
                                                },
                                               ]},
                                              
                                          {
                                              cols:
                                                  [
                                                 {
                                                     id: "ChkDynamicF4",
                                                     view: "checkbox",
                                                     label: "Dynamic Field 4",
                                                     labelAlign: "Left",
                                                     labelWidth: 300,
                                                     inputWidth: 350,
                                                     width: 350,
                                                     minwidth: 350,
                                                     value: "",
                                                     on: {
                                                         "onChange": function (newval, oldvalue) {

                                                             if ($.trim(newval) == "1") {
                                                                 $$("txtD4").show();

                                                             }
                                                             else {
                                                                 $$("txtD4").hide();

                                                             }
                                                         }
                                                     }
                                                 },
                                                   {
                                                       view: "text",
                                                       id: "txtD4",
                                                       labelAlign: "Right",
                                                       labelWidth: 220,
                                                       inputWidth: 250,
                                                       width: 330,
                                                       minWidth: 550,
                                                       hidden: true,
                                                       attributes: { maxlength: 20 },
                                                   },
                                                  ]},
                                                 
                                                  {
                                                      id: "ChkDisplayToolTip",
                                                      view: "checkbox",
                                                      label: "Display Tool Tip in Venu Query",
                                                      labelAlign: "Left",
                                                      labelWidth: 300,
                                                      inputWidth: 450,
                                                      width: 500,
                                                      minwidth: 500,
                                                  },
                                                   {
                                                       id: "ChkGuestFeedback",
                                                       view: "checkbox",
                                                       label: "GuestFeedbackApplicable",
                                                       labelAlign: "Left",
                                                       labelWidth: 300,
                                                       inputWidth: 450,
                                                       width: 500,
                                                       minwidth: 500,
                                                   },
                                        
                                                     {
                                                         view: "richselect",
                                                         id: "ddlVenueBooking",
                                                         label: " Venue Booking Row Count",
                                                         labelAlign: "Left",
                                                         labelWidth: 300,
                                                         inputWidth: 450,
                                                         width: 500,
                                                         minwidth: 500,
                                                         options: valid,
                                                     },
                                                    {
                                                        cols:
                                                                   [
                                                    
                                                                {
                                                                    id: "ChkFBCreation",
                                                                    view: "checkbox",
                                                                    label: "FB Creation Prior Days Restriction",
                                                                    labelAlign: "Left",
                                                                    labelWidth: 300,
                                                                    inputWidth: 350,
                                                                    width: 350,
                                                                    minwidth: 350,
                                                                    value: "",
                                                                    on: {
                                                                        "onChange": function (newval, oldvalue) {

                                                                            if ($.trim(newval) == "1") {
                                                                                $$("textDays").show();
                                                                                $$("lblDays").show()

                                                                            }
                                                                            else {
                                                                                $$("textDays").hide();
                                                                                $$("lblDays").hide()
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                 {
                                                                     id: "textDays",
                                                                     view: "text",                                                          
                                                                     labelAlign: "Left",                                                     
                                                                     labelWidth: 50,
                                                                     inputWidth: 50,
                                                                     width: 50,
                                                                     minwidth: 50,
                                                                     hidden: true,
                                                                     pattern: { mask: "####", allow: /[0-9]/g },
                                                                 },
                                                                 {
                                                        
                                                                     view: "label",
                                                                     id: "lblDays",
                                                                     labelAlign: "Left",
                                                                     label: "Days",
                                                                     labelWidth: 50,
                                                                     width: 50,
                                                                     hidden:true,
                                                                     minwidth: 50,
                                                                 },
                                                                   ]
                                                    },
                                                 {
                                                     view: "datepicker",
                                                     id: "txtYearStart",
                                                     label: "Year Start Date",
                                                     format: "%d/%m/%Y",
                                                     readonly: false,
                                                     stringResult: false,
                                                     labelAlign: "Left",
                                                     labelWidth: 300,
                                                     inputWidth: 450,
                                                     width: 500,
                                                     minwidth: 500,
                                                     //type: "section",
                                                     //fillspace: true,
                                                     //autoheight: true,
                                                     //scroll:false,
                                                     on: {
                                                         onChange: function (newval, oldval) {

                                                         }
                                                     }
                                                 }, 
                                         ]
                                     }
                                 ]
                             }
                         },
                         {
                             header: "<span class=''></span>Reservation",
                             
                             body: {
                                 id: "Reservation frm",
                                 view: "form",
                                 select: true,
                                 scroll: true,
                                 height:500,
                              
                                 elements: [
                                     {
                                         rows: [
                                             {
                                                 cols: [
                                                        {
                                                            id: "ChkAuditTrail",
                                                            view: "checkbox",
                                                            label: "Audit Trail Mandatory for Reservation Amendment,Yes",
                                                            labelAlign: "Left",
                                                            labelWidth: 300,
                                                            inputWidth: 450,
                                                            width: 500,
                                                             minWidth: 550,
                                                        },
                                                        {
                                                            id: "ChkStageSetting",
                                                            view: "checkbox",
                                                            label: "Stage Setting Applicable",
                                                            labelAlign: "left",
                                                            labelWidth: 210,
                                                            inputWidth: 350,
                                                            width: 400,
                                                            minWidth: 400,
                                                            disabled: true,
                                                        }
                                                        
                                                 ]
                                             },
                                             {
                                                 cols:[
                                            {
                                                id: "ChkFBCreationAccept",
                                                view: "checkbox",
                                                label: "Accept Plan/Venue Inclusive of Tax",
                                                labelAlign: "Left",
                                                labelWidth: 300,
                                                inputWidth: 450,
                                                width: 500,
                                                minWidth: 500,
                                            },
                                            {
                                                 
                                                view: "richselect",
                                                id: "ddlExtendent",
                                                label: " Extendent Venue Time, Upto",
                                                labelAlign: "left",
                                                labelWidth: 210,
                                                inputWidth: 300,
                                                width: 400,
                                                minWidth: 400,
                                                options: valid,
                                                on: {
                                                    onChange: function (newval, oldval) {
                                                    }
                                                }

                                            },
                                            
                                                 ]},

                                               {
                                                   cols: [
                                               {
                                                   id: "rbtnRpt",
                                                   view: "radio",
                                                   label: "Default Reservation Status",
                                                   value: "",
                                                   labelAlign: "Left",
                                                   labelWidth: 300,
                                                   inputWidth: 450,
                                                   width: 500,
                                                   minWidth: 500,
                                                   customRadio: false,
                                                   vertical: true,
                                                   options: [
                                                                  { "id": 1, "value": "Confirmed" },
                                                                  { "id": 2, "value": " Tentative" },

                                                   ],

                                               },
                                               {
                                                   
                                                   id: "ChkF&BPlane",
                                                   view: "checkbox",
                                                   label: "F&B Plan mandatory",
                                                   labelAlign: "left",
                                                   labelWidth: 210,
                                                   inputWidth: 400,
                                                   width: 400,
                                                   minWidth: 400,
                                               }

                                                   ]
                                               },
                                               {
                                                   cols:[
                                              {
                                                  id: "ChkChannel",
                                                  view: "checkbox",
                                                  label: "Channel Applicable Yes",
                                                  labelAlign: "Left",
                                                  labelWidth: 300,
                                                  inputWidth: 450,
                                                  width: 500,
                                                  minWidth: 500,
                                              },
                                              {
                                                  id: "ChkCancelBooking",
                                                  view: "checkbox",
                                                  label: "N.A will Cancel Tentative Due Dt Bookings",
                                                  labelAlign: "left",
                                                  labelWidth: 212,
                                                  inputWidth: 350,
                                                  width: 450,
                                                  minWidth: 450,
                                              },
                                                   ] },

                                                   {
                                                       cols:[
                                              {
                                                  id: "ChkBooker",
                                                  view: "checkbox",
                                                  label: "Booker Applicable Yes",
                                                  labelAlign: "Left",
                                                  labelWidth: 300,
                                                  inputWidth: 450,
                                                  width: 500,
                                                  minWidth: 500,
                                              },
                                             {
                                                 cols: [{
                                                     id: "ChkPreparation",
                                                     view: "checkbox",
                                                     label: "[Preparation ]Break Shift Prior",
                                                     labelAlign: "left",
                                                     labelWidth: 210,
                                                     inputWidth: 350,
                                                     width: 350,
                                                     minWidth: 350,
                                                     on: {
                                                         "onChange": function (newval, oldvalue) {

                                                             if ($.trim(newval) == "1") {
                                                                 $$("ddlmintsBSP").show();
                                                                 $$("mints1").show();
                                                             }
                                                             else {
                                                                 $$("ddlmintsBSP").hide();
                                                                 $$("mints1").hide();
                                                             }
                                                         }
                                                     }
                                                 },

                                                 {
                                                     cols:[{
                                                         view: "richselect",
                                                         id: "ddlmintsBSP",
                                                         labelAlign: "Right",
                                                         labelWidth: 50,
                                                         inputWidth: 80,
                                                         width: 100,
                                                         minWidth: 100,
                                                         value: "",
                                                         hidden:true,
                                                         options: BRSDrop,
                                                         on: {
                                                             onChange: function (newval, oldval) {
                                                             }
                                                         }
                                                     },
                                                     {

                                                         view: "label",
                                                         id:"mints1",
                                                         label: "mints",
                                                         labelAlign: "Right",
                                                         labelWidth: 100,
                                                         inputWidth: 100,
                                                         width: 100,
                                                         minWidth: 100,
                                                         hidden:true,
                                                     },]
                                                    },
                                                 ]
                                             },
                                                       ]
                                                   },

                                                  
                                                  {
                                                      cols: [
                                                  {
                                                      id: "ChkSales",
                                                      view: "checkbox",
                                                      label: "Sales Person Applicable Yes",
                                                      labelAlign: "Left",
                                                      labelWidth: 300,
                                                      inputWidth: 350,
                                                      width: 350,
                                                      minWidth: 350,
                                                      on: {
                                                          "onChange": function (newval, oldvalue) {

                                                              if ($.trim(newval) == "1") {
                                                                  $$("ChkMandatory").show();
                                                                  
                                                              }
                                                              else {
                                                                  $$("ChkMandatory").hide();
                                                                 

                                                              }
                                                          }
                                                      }
                                                  },
                                                  {
                                                      id: "ChkMandatory",
                                                      view: "checkbox",
                                                      label: " Mandatory",
                                                      labelAlign: "right",
                                                      labelWidth: 60,
                                                      inputWidth: 150,
                                                      width:150 ,
                                                      minWidth: 250,
                                                      hidden:true,
                                                  },
                                                      ]
                                                  },
                                                     
                                               {  cols:[ {
                                                   id: "ChkBusiness",
                                                   view: "checkbox",
                                                   label: "Business Source Mandatory",
                                                   labelAlign: "Left",
                                                   labelWidth: 300,
                                                   inputWidth: 450,
                                                   width: 500,
                                                   minWidth: 500,
                                               },

                                              {
                                                  cols: [{
                                                      id: "ChkClearence",
                                                      view: "checkbox",
                                                      label: "[Clearence] Break Shift After",
                                                      labelAlign: "left",
                                                      labelWidth: 210,
                                                      inputWidth: 350,
                                                      width: 350,
                                                      minWidth: 350,
                                                      on: {
                                                          "onChange": function (newval, oldvalue) {

                                                              if ($.trim(newval) == "1") {
                                                                  $$("ddlmintsBRA").show();
                                                                  $$("mints").show();
                                                              }
                                                              else {
                                                                  $$("ddlmintsBRA").hide();
                                                                  $$("mints").hide();

                                                              }
                                                          }
                                                      }
                                                  },
                                                  {
                                                        
                                                      cols:[{
                                                          view: "richselect",
                                                          id: "ddlmintsBRA",
                                                          labelAlign: "Right",
                                                          labelWidth: 50,
                                                          inputWidth: 80,
                                                          width: 100,
                                                          minWidth: 100,
                                                          value: "",
                                                          hidden:true,
                                                          options: BRSDrop,
                                                          on: {
                                                              onChange: function (newval, oldval) {
                                                              }
                                                          }
                                                      }, {
                                                          view: "label",
                                                          id:"mints",
                                                          label: "mints",
                                                          labelAlign: "Right",
                                                          labelWidth: 100,
                                                          inputWidth: 100,
                                                          width: 100,
                                                          minWidth: 100,
                                                          hidden:true,
                                                      }, ]
                                                        },
                                                 ]
                                                 
                                              },
                                               ]},
                                                  
                                                  {
                                                      id: "ChkMemeber",
                                                      view: "checkbox",
                                                      label: "Memeber Applicable Yes",
                                                      labelAlign: "Left",
                                                      labelWidth: 300,
                                                      inputWidth: 450,
                                                      width: 500,
                                                      minWidth: 500,
                                                  },
                                               

                                                  {
                                                      id: "ChkKids",
                                                      view: "checkbox",
                                                      label: "Kids Applicable Yes",
                                                      labelAlign: "Left",
                                                      labelWidth: 300,
                                                      inputWidth: 450,
                                                      width: 500,
                                                      minWidth: 500,
                                                  },
                                                     {
                                                         id: "ChkDrivers",
                                                         view: "checkbox",
                                                         label: "Drivers Applicable Yes",
                                                         labelAlign: "Left",
                                                         labelWidth: 300,
                                                         inputWidth: 450,
                                                         width: 500,
                                                         minWidth: 500,
                                                     },
                                                     {
                                                         id: "ChkFood",
                                                         view: "checkbox",
                                                         label: "Food Preparation  Applicable Yes",
                                                         labelAlign: "Left",
                                                         labelWidth: 300,
                                                         inputWidth: 450,
                                                         width: 500,
                                                         minWidth: 500,
                                                     },
                                                     {
                                                         id: "ChkAccept",
                                                         view: "checkbox",
                                                         label: "Accept Multiple Plans",
                                                         labelAlign: "Left",
                                                         labelWidth: 300,
                                                         inputWidth: 450,
                                                         width: 500,
                                                         minWidth: 500,
                                                     },
                                                     {
                                                         id: "ChkReservationGuestPhone",
                                                         view: "checkbox",
                                                         label: "Reservation Guest Phone Mandatory ",
                                                         labelAlign: "Left",
                                                         labelWidth: 300,
                                                         inputWidth: 450,
                                                         width: 500,
                                                         minWidth: 500,
                                                     },
                                                     {
                                                         id: "ChkReservationGuestMobile",
                                                         view: "checkbox",
                                                         label: "Reservation Guest Mobile Mandatory",
                                                         labelAlign: "Left",
                                                         labelWidth: 300,
                                                         inputWidth: 450,
                                                         width: 500,
                                                         minWidth: 500,
                                                     },
                                                      {
                                                          id: "ChkContactPersonPhone",
                                                          view: "checkbox",
                                                          label: "Contact Person Phone Mandatory",
                                                          labelAlign: "Left",
                                                          labelWidth: 300,
                                                          inputWidth: 450,
                                                          width: 500,
                                                          minWidth: 500,
                                                      },
                                                        {
                                                            id: "ChkGuestAddress",
                                                            view: "checkbox",
                                                            label: "Guest Address Mandatory Yes",
                                                            labelAlign: "Left",
                                                            labelWidth: 300,
                                                            inputWidth: 450,
                                                            width: 500,
                                                            minWidth: 500,
                                                        },
                                                         {
                                                             id: "ChkAfternoonTea",
                                                             view: "checkbox",
                                                             label: "Afternoon Tea",
                                                             labelAlign: "Left",
                                                             labelWidth: 300,
                                                             inputWidth: 450,
                                                             width: 500,
                                                             minWidth: 500,
                                                             on: {
                                                                 "onChange": function (newval, oldval) {
                                                                     if (newval == "1") {
                                                                         $$("ChkEveningTea").setValue("0")
                                                                     }
                                                                     else {
                                                                         $$("ChkEveningTea").setValue("1")
                                                                     }
                                                                 }
                                                             }
                                                         },
                                                            {
                                                                id: "ChkEveningTea",
                                                                view: "checkbox",
                                                                label: "Evening Tea",
                                                                labelAlign: "Left",
                                                                labelWidth: 300,
                                                                inputWidth: 450,
                                                                width: 500,
                                                                minWidth: 500,
                                                                on: {
                                                                    "onChange": function (newval, oldval) {
                                                                        if (newval == "1") {
                                                                            $$("ChkAfternoonTea").setValue("0")
                                                                        }
                                                                        else {
                                                                            $$("ChkAfternoonTea").setValue("1")
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                cols: [{
                                                                    view: "text",
                                                                    id: "txtDefaultcut",
                                                                    label: "Default cut off Date for tentative",
                                                                    labelAlign: "Left",
                                                                    labelWidth: 300,
                                                                    inputWidth: 450,
                                                                    width: 500,
                                                                    minWidth: 500,
                                                                    attributes: { maxlength: 2 },
                                                                    pattern: { mask: "##", allow: /[0-9]/g },
                                                                },
                                                                {
                                                                    id: "rbtnRptsAfter",
                                                                    view: "radio",
                                                                    labelWidth: 180,
                                                                    inputWidth: 350,
                                                                    value: "",
                                                                    labelAlign: "Right",
                                                                    width: 300,
                                                                    minWidth: 500,
                                                                    customRadio: false,
                                                                    vertical: true,
                                                                    height:10,
                                                                    options: [
                                                                                   { "id": 1, "value": "Days After Reservation Creation  Date" },
                                                                                   { "id": 2, "value": " Prior to Function Date" },

                                                                       
    

                                                                    ],

                                                                }, ]
                                                            },

                                                            
                                                                {
                                                                    id: "ChkAllowWL",
                                                                    view: "checkbox",
                                                                    label: "Allow W.L to be Confirmed Even Tentative Is avaliable",
                                                                    labelAlign: "Left",
                                                                    labelWidth: 300,
                                                                    inputWidth: 450,
                                                                    width: 500,
                                                                    minWidth: 500,
                                                                },
                                                             {
                                                                 id: "ChkPlaneItem",
                                                                 view: "checkbox",
                                                                 label: "Plane Item Validation Applicable,yes",
                                                                 labelAlign: "Left",
                                                                 labelWidth: 300,
                                                                 inputWidth: 450,
                                                                 width: 500,
                                                                 minWidth: 500,
                                                             },
                                                              
                                                              
                                                              {
                                                                  cols:[{
                                                                  id: "ChkMiniumAdvance",
                                                                  view: "checkbox",
                                                                  label: "Minium Advance Validation Applicable,yes",
                                                                  labelAlign: "Left",
                                                                  labelWidth: 300,
                                                                  inputWidth: 450,
                                                                  width: 500,
                                                                  minWidth: 500,
                                                              },
                                                              {
                                                                  view: "text",
                                                                  id: "txtMiniumAdvance",
                                                                  label: "Minium Advance %",
                                                                  labelAlign: "left",
                                                                  labelWidth: 210,
                                                                  inputWidth: 350,
                                                                  width: 400,
                                                                  minWidth: 500,
                                                                  pattern: { mask: "####", allow: /[0-9]/g },
                                                              },
                                                              ]
                                                              },
                                                                      {
                                                                          cols: [{
                                                                              id: "ChkGuaranteePax",
                                                                              view: "checkbox",
                                                                              label: "Guarantee Pax Validation Applicable,yes",
                                                                              labelAlign: "Left",
                                                                              labelWidth: 300,
                                                                              inputWidth: 450,
                                                                              width: 500,
                                                                              minWidth: 500,
                                                                          },
                                                                      {
                                                                          view: "text",
                                                                          id: "txtMax",
                                                                          label: "Max Difference %",
                                                                          labelAlign: "left",
                                                                          labelWidth: 210,
                                                                          inputWidth: 350,
                                                                          width: 400,
                                                                          minWidth: 500,
                                                                          pattern: { mask: "####", allow: /[0-9]/g },
                                                                      },
                                                                          ]
                                                                      },
                                                                       {
                                                                           view: "checkbox",
                                                                           id: "ChkAlert",
                                                                           label: "Alert on Minimum Pax is below The Stand Minimum Pax",
                                                                           labelAlign: "Left",
                                                                           labelWidth: 300,
                                                                           inputWidth: 450,
                                                                           width: 500,
                                                                           minWidth: 500,
                                                                       },
                                                                       {
                                                                           cols:[{
                                                                               view: "checkbox",
                                                                               id: "ChkTentativeCutoff",
                                                                               label: "Tentative Cutoff Date  Validation  Applicable ,Yes",
                                                                               labelAlign: "Left",
                                                                               labelWidth: 300,
                                                                               inputWidth: 450,
                                                                               width: 500,
                                                                               minWidth: 500,
                                                                           },
                                                                           {
                                                                               view: "text",
                                                                               id: "txtMinimumCut",
                                                                               label: "Minimum Cut Off Days Prior  to Function",
                                                                               labelAlign: "left",
                                                                               labelWidth: 210,
                                                                               inputWidth: 350,
                                                                               width: 400,
                                                                               minWidth: 500,
                                                                               pattern: { mask: "####", allow: /[0-9]/g },
                                                                           },
                                                                           {
                                                                               
                                                                               view: "label",
                                                                               label: "Days",
                                                                               labelAlign: "Right",
                                                                               labelWidth: 100,
                                                                               inputWidth: 100,
                                                                               width: 100,
                                                                               minWidth: 100,
                                                                           },]
                                                                       }
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
    }
});

function fnDisable() {
    $$("ddlGuestTy").disable();
    $$("ChkKOTBeGenerated").disable();
    $$("OptGrpVenu").disable(); 
    $$("ChckValidate").disable(); 
    $$("ChckFunction").disable();
    $$("txtLastNCKOT").disable()
    $$("txtFPsigna").disable();
    $$("txtFPLastLinNarr").disable();
    $$("txtChallanSig").disable();
    $$("txtFBPrint").disable();
    $$("txtBillSig").disable();
    $$("txtGuetsBillReceprint").disable();
    $$("txtChlPrinPrg").disable();
    $$("txtKOTorintPrg").disable();
    $$("txtPrintPrg").disable();
    $$("ChkKOTBe").disable();
    $$("ChkAllKOT").disable();
    $$("ChkAmenprint").disable();  
    $$("CHKMulOutAppli").disable();
    $$("ChkMenuGrpApplica").disable();
    $$("ChkPrintPrgFP").disable();
    $$("ChckEmailtelemadBooker").disable();
    $$("ChkFunctionDetails").disable();
    $$("ChkInKOTCrationDefault").disable();
    $$("ChkUsrWisevenPrivAppli").disable();
    $$("ChkDefaultscreenVenue").disable();
    $$("ChkFlasRep").disable();
    $$("txtAmendPrintPrg").disable();  
    $$("ddlAdvanRevenue").disable();
    $$("ddlPaidRevenue").disable();
    $$("ddlRoundrevenue").disable();
    $$("ddlDepositeReve").disable();
    $$("ddlBillrounOff").disable();
    $$("txtLastBillNO").disable()
    $$("txtLastNCBillNO").disable();
    $$("txtPaidprintPrg").disable();
    $$("txtReservationAdvanc").disable();
    $$("txtFBPrint").disable();
    $$("txtBillSig").disable();
    $$("txtAdvanceRef").disable();
    $$("txtProPrintPrg").disable();
    $$("ChkProBillMadatory").disable();
    $$("ChkVATApplicable").disable();
    $$("ddlApplicabVATtax").disable();
    $$("ChkDiscountConsider").disable();
    $$("ChkAcceptLoyaMebers").disable();
    $$("ChkDiplomatTaxApplicable").disable();
    $$("ChkZeroApplicable").disable();
    $$("ChkAcceptBackDatesForcast").disable();
    $$("ChkAllowBillingF_P").disable();
    $$("ChkAcceptPlanItems").disable();
    $$("ChkDefaultPrint").disable();
    $$("ddlNoBillCopies").disable();
    $$("ChkService").disable();
    $$("ChkServiceChargeExempted").disable();
    $$("txtGuestMessage").disable();
    $$("ChkToRoomSetlement").disable();
    $$("ChkRevenuewise").disable();
     $$("ChkTax").disable();
    $$("ChkAdditional").disable();
    $$("ChkAllowMultipleOutletKOT").disable();
    $$("ChkEventApplicable").disable();
    $$("ChkAcceptSteward").disable();
    $$("ChkCreditCard").disable();
    $$("ChkBanquetAreaTo").disable();
    $$("ChkDynamicF1").disable();
    $$("ChkDynamicF2").disable();
    $$("ChkDynamicF3").disable();
    $$("ChkDynamicF4").disable();
    $$("ChkGuestFeedback").disable();
    $$("ddlVenueBooking").disable();
    $$("ChkFBCreation").disable();
    $$("textDays").disable();
    $$("lblDays").disable();
    $$("ChkAuditTrail").disable();
    $$("ChkStageSetting").disable();
    $$("ChkFBCreation").disable();
    $$("ddlExtendent").disable();
    $$("rbtnRpt").disable();
    $$("ChkF&BPlane").disable();
    $$("ChkChannel").disable();
    $$("ChkCancelBooking").disable();
    $$("ChkBooker").disable();
    $$("ChkPreparation").disable();
    $$("ChkSales").disable();
    $$("ChkMandatory").disable();
    $$("ChkBusiness").disable();
    $$("ChkClearence").disable();
    $$("ChkMemeber").disable();
    $$("ChkKids").disable();
    $$("ChkDrivers").disable();
    $$("ChkFood").disable();
    $$("ChkAccept").disable();
    $$("ChkReservationGuestPhone").disable();
    $$("ChkReservationGuestMobile").disable();
    $$("ChkContactPersonPhone").disable();
    $$("ChkGuestAddress").disable();
    $$("ChkAfternoonTea").disable();
    $$("ChkEveningTea").disable();
    $$("txtDefaultcut").disable();
    $$("rbtnRpt").disable();
    $$("ChkAllowWL").disable();
    $$("ChkPlaneItem").disable();
    $$("ChkMiniumAdvance").disable();
    $$("txtMiniumAdvance").disable();
    $$("ChkGuaranteePax").disable();
    $$("txtMax").disable();
    $$("ChkAlert").disable();
    $$("ChkTentativeCutoff").disable();
    $$("txtMax").disable();
    $$("txtMinimumCut").disable();
    $$("ChkFBCreationAccept").disable();
    $$("txtD4").disable();
    $$("txtD3").disable();
    $$("txtD2").disable();
    $$("txtD1").disable();
    $$("txtYearStart").disable();
    $$("ChkDisplayToolTip").disable();
    $$("OptGrpVenu").disable();
}

function fnEnable()
{   
    $$("ddlGuestTy").enable();
    $$("ChkKOTBeGenerated").enable();
    $$("OptGrpVenu").enable();
    $$("ChckValidate").enable();
    $$("txtFirstNm").enable();
    $$("ChckFunction").enable();
    $$("txtLastNCKOT").enable()
    $$("txtFPsigna").enable();
    $$("txtFPLastLinNarr").enable();
    $$("txtChallanSig").enable();
    $$("txtFBPrint").enable();
    $$("txtBillSig").enable();
    $$("txtGuetsBillReceprint").enable();
    $$("txtChlPrinPrg").enable();
    $$("txtKOTorintPrg").enable();
    $$("txtPrintPrg").enable();
    $$("ChkKOTBe").enable();
    $$("ChkAllKOT").enable();
    $$("ChkAmenprint").enable();
    $$("CHKMulOutAppli").enable();
    $$("ChkMenuGrpApplica").enable();
    $$("ChkPrintPrgFP").enable();
    $$("ChckEmailtelemadBooker").enable();
    $$("ChkFunctionDetails").enable();
    $$("ChkInKOTCrationDefault").enable();
    $$("ChkUsrWisevenPrivAppli").enable();
    $$("ChkDefaultscreenVenue").enable();
    $$("ChkFlasRep").enable();
    $$("txtAmendPrintPrg").enable();
    $$("ddlAdvanRevenue").enable();
    $$("ddlPaidRevenue").enable();
    $$("ddlRoundrevenue").enable();
    $$("ddlDepositeReve").enable();
    $$("ddlBillrounOff").enable();
    $$("txtLastBillNO").enable()
    $$("txtLastNCBillNO").enable();
    $$("txtPaidprintPrg").enable();
    $$("txtReservationAdvanc").enable();
    $$("txtFBPrint").enable();
    $$("txtBillSig").enable();
    $$("txtAdvanceRef").enable();
    $$("txtProPrintPrg").enable();
    $$("ChkProBillMadatory").enable();
    $$("ChkVATApplicable").enable();
    $$("ddlApplicabVATtax").enable();
    $$("ChkDiscountConsider").enable();
    $$("ChkAcceptLoyaMebers").enable();
    $$("ChkDiplomatTaxApplicable").enable();
    $$("ChkZeroApplicable").enable();
    $$("ChkAcceptBackDatesForcast").enable();
    $$("ChkAllowBillingF_P").enable();
    $$("ChkAcceptPlanItems").enable();
    $$("ChkDefaultPrint").enable();
    $$("ddlNoBillCopies").enable();
    $$("ChkService").enable();
    $$("ChkServiceChargeExempted").enable();
    $$("txtGuestMessage").enable();
    $$("ChkToRoomSetlement").enable();
    $$("ChkRevenuewise").enable();
    $$("ChkAcceptPlanItems").enable();
    $$("ChkAdditional").enable();
    $$("ChkAllowMultipleOutletKOT").enable();
    $$("ChkEventApplicable").enable();
    $$("ChkAcceptSteward").enable();
    $$("ChkCreditCard").enable();
    $$("ChkBanquetAreaTo").enable();
    $$("ChkDynamicF1").enable();
    $$("ChkDynamicF2").enable();
    $$("ChkDynamicF3").enable();
    $$("ChkDynamicF4").enable();
    $$("ChkGuestFeedback").enable();
    $$("ddlVenueBooking").enable();
    $$("txtMinimumCut").enable();
    $$("textDays").enable();
    $$("ChkAuditTrail").enable();
   // $$("ChkStageSetting").enable();
    $$("ChkFBCreation").enable();
    $$("ddlExtendent").enable();
    $$("rbtnRpt").enable();
    $$("ChkF&BPlane").enable();
    $$("ChkChannel").enable();
    $$("ChkCancelBooking").enable();
    $$("ChkBooker").enable();
    $$("ChkPreparation").enable();
    $$("ChkSales").enable();
    $$("ChkMandatory").enable();
    $$("ChkBusiness").enable();
    $$("ChkClearence").enable();
    $$("ChkMemeber").enable();
    $$("ChkKids").enable();
    $$("ChkDrivers").enable();
    $$("ChkFood").enable();
    $$("ChkAccept").enable();
    $$("ChkReservationGuestPhone").enable();
    $$("ChkReservationGuestMobile").enable();
    $$("ChkContactPersonPhone").enable();
    $$("ChkGuestAddress").enable();
    $$("ChkAfternoonTea").enable();
    $$("ChkEveningTea").enable();
    $$("txtDefaultcut").enable();
    $$("rbtnRpt").enable();
    $$("ChkAllowWL").enable();
    $$("ChkPlaneItem").enable();
    $$("ChkMiniumAdvance").enable();
    $$("txtMiniumAdvance").enable();
    $$("ChkGuaranteePax").enable();
    $$("txtMax").enable();
    $$("ChkAlert").enable();
    $$("ChkTentativeCutoff").enable();
    $$("txtMax").enable();
    $$("txtD4").enable();
    $$("txtD3").enable();
    $$("txtD2").enable();
    $$("txtD1").enable();
    $$("ChkDisplayToolTip").enable();
    $$("ChkFBCreationAccept").enable();
    $$("ChkTax").enable();
    $$("txtYearStart").enable(); 
    $$("OptGrpVenu").enable(); 
}

function ClearData() {
    debugger;
    $$("ddlGuestTy").setValue("");
    $$("ChkKOTBeGenerated").setValue("");
    $$("OptGrpVenu").setValue("");
    $$("ChckValidate").setValue("");
    $$("ChkDisplayToolTip").setValue("");
    $$("ChckFunction").setValue("");
    $$("txtLastNCKOT").setValue("")
    $$("txtFPsigna").setValue("");
    $$("txtFPLastLinNarr").setValue("");
    $$("txtChallanSig").setValue("");
    $$("txtFBPrint").setValue("");
    $$("txtBillSig").setValue("");
    $$("txtGuetsBillReceprint").setValue("");
    $$("txtChlPrinPrg").setValue("");
    $$("txtKOTorintPrg").setValue("");
    $$("txtPrintPrg").setValue("");
    $$("ChkKOTBe").setValue("");
    $$("ChkAllKOT").setValue("");
    $$("ChkAmenprint").setValue("");
    $$("CHKMulOutAppli").setValue("");
    $$("ChkMenuGrpApplica").setValue("");
    $$("ChkPrintPrgFP").setValue("");
    $$("ChckEmailtelemadBooker").setValue("");
    $$("ChkFunctionDetails").setValue("");
    $$("ChkInKOTCrationDefault").setValue("");
    $$("ChkUsrWisevenPrivAppli").setValue("");
    $$("ChkDefaultscreenVenue").setValue("0");
    $$("ChkFlasRep").setValue("0");
    $$("txtAmendPrintPrg").setValue("");
    $$("ddlAdvanRevenue").setValue("");
    $$("ddlPaidRevenue").setValue("");
    $$("ddlRoundrevenue").setValue("");
    $$("ddlDepositeReve").setValue("");
    $$("ddlBillrounOff").setValue("");
    $$("txtLastBillNO").setValue("")
    $$("txtLastNCBillNO").setValue("");
    $$("txtPaidprintPrg").setValue("");
    $$("txtReservationAdvanc").setValue("");
    $$("txtFBPrint").setValue("");
    $$("txtBillSig").setValue("");
    $$("txtAdvanceRef").setValue("");
    $$("txtProPrintPrg").setValue("");
    $$("ChkProBillMadatory").setValue("");
    $$("ChkVATApplicable").setValue("");
    $$("ddlApplicabVATtax").setValue("");
    $$("ChkDiscountConsider").setValue("");
    $$("ChkAcceptLoyaMebers").setValue("");
    $$("ChkDiplomatTaxApplicable").setValue("");
    $$("ChkZeroApplicable").setValue("");
    $$("ChkAcceptBackDatesForcast").setValue("");
    $$("ChkAllowBillingF_P").setValue("");
    $$("ChkAcceptPlanItems").setValue("");
    $$("ChkDefaultPrint").setValue("");
    $$("ddlNoBillCopies").setValue("");
    $$("ChkService").setValue("");
    $$("ChkServiceChargeExempted").setValue("");
    $$("txtGuestMessage").setValue("");
    $$("ChkToRoomSetlement").setValue("");
    $$("ChkRevenuewise").setValue("");
    $$("ChkTax").setValue("");
    $$("ChkAdditional").setValue("");
    $$("ChkAllowMultipleOutletKOT").setValue("");
    $$("ChkEventApplicable").setValue("");
    $$("ChkAcceptSteward").setValue("");
    $$("ChkCreditCard").setValue("");
    $$("ChkBanquetAreaTo").setValue("");
    $$("ChkDynamicF1").setValue("");
    $$("ChkDynamicF2").setValue("");
    $$("ChkDynamicF3").setValue("");
    $$("ChkDynamicF4").setValue("");
    $$("ChkGuestFeedback").setValue("");
    $$("ddlVenueBooking").setValue("");
    $$("OptGrpVenu").setValue("");
    $$("textDays").setValue("");
    $$("lblDays").setValue("");
    $$("ChkAuditTrail").setValue("");
    //$$("ChkStageSetting").setValue("");
    $$("ChkFBCreation").setValue("");
    $$("ddlExtendent").setValue("");
    $$("rbtnRpt").setValue("");
    $$("ChkF&BPlane").setValue("");
    $$("ChkChannel").setValue("");
    $$("ChkCancelBooking").setValue("");
    $$("ChkBooker").setValue("");
    $$("ChkPreparation").setValue("");
    $$("ChkSales").setValue("");
    $$("ChkMandatory").setValue("");
    $$("ChkBusiness").setValue("");
    $$("ChkClearence").setValue("");
    $$("ChkMemeber").setValue("");
    $$("ChkKids").setValue("");
    $$("ChkDrivers").setValue("");
    $$("ChkFood").setValue("");
    $$("ChkAccept").setValue("");
    $$("ChkReservationGuestPhone").setValue("");
    $$("ChkReservationGuestMobile").setValue("");
    $$("ChkContactPersonPhone").setValue("");
    $$("ChkGuestAddress").setValue("");
    $$("ChkAfternoonTea").setValue("");
    $$("ChkEveningTea").setValue("");
    $$("txtDefaultcut").setValue("");
    $$("rbtnRpt").setValue("");
    $$("ChkAllowWL").setValue("");
    $$("ChkPlaneItem").setValue("");
    $$("ChkMiniumAdvance").setValue("");
    $$("txtMiniumAdvance").setValue("");
    $$("ChkGuaranteePax").setValue("");
    $$("txtMax").setValue("");
    $$("ChkAlert").setValue("");
    $$("ChkTentativeCutoff").setValue("");
    $$("txtMax").setValue("");
    $$("txtMinimumCut").setValue("");
    $$("ChkFBCreationAccept").setValue("");
    $$("txtD4").setValue("");
    $$("txtD3").setValue("");
    $$("txtD2").setValue("");
    $$("txtD1").setValue("");
}

function fnLoadBanquetSetting() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_BQSETTINGOPEN";
    dataparam["PROGNAME"] = "Get_MST_BANQUET_SETTING";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                ($$("txtFPsigna").setValue($.trim(rowData[0]["FP_SIGNATORY"]))); 
                ($$("txtFPLastLinNarr").setValue($.trim(rowData[0]["FP_NARRATION"])));
                ($$("txtChallanSig").setValue($.trim(rowData[0]["CHAL_SIGNATORY"])));
                ($$("txtBillSig").setValue($.trim(rowData[0]["BILL_SIGNATORY"])));
                ($$("txtFBPrint").setValue($.trim(rowData[0]["FP_PROG_NM"])));
                ($$("txtChlPrinPrg").setValue($.trim(rowData[0]["CHAL_PROG_NM"])));
                ($$("txtPrintPrg").setValue($.trim(rowData[0]["BILL_PROG_NM"]))); 
                ($$("txtAmendPrintPrg").setValue($.trim(rowData[0]["A3_NM"])));
                ($$("txtKOTorintPrg").setValue($.trim(rowData[0]["A_NM"])));
                ($$("txtAmendPrintPrg").setValue($.trim(rowData[0]["A3_NM"]))); 
                ($$("txtPaidprintPrg").setValue($.trim(rowData[0]["B_NM"])));
                ($$("txtReservationAdvanc").setValue($.trim(rowData[0]["C_NM"])));
                ($$("txtAdvanceRef").setValue($.trim(rowData[0]["D_NM"])));
                ($$("txtProPrintPrg").setValue($.trim(rowData[0]["E_NM"])));
                $$("txtDefaultcut").setValue($.trim(rowData[0]["DEF_CT_DAY"])); 
                $$("txtMiniumAdvance").setValue($.trim(rowData[0]["MIN_ADV"]));
                $$("txtMax").setValue($.trim(rowData[0]["T3_IND"])); 
                $$("txtMinimumCut").setValue($.trim(rowData[0]["MIN_CT_DAY"]));
                $$("txtD1").setValue($.trim(rowData[0]["DYN_CAP1"]));
                $$("txtD2").setValue($.trim(rowData[0]["DYN_CAP2"]));
                $$("txtD3").setValue($.trim(rowData[0]["DYN_CAP3"]));
                $$("txtD4").setValue($.trim(rowData[0]["DYN_CAP4"]));
                $$("ddlVenueBooking").setValue($.trim(rowData[0]["RC_CNT"]));
                $$("txtGuetsBillReceprint").setValue($.trim(rowData[0]["RCPT_PRINT_PROG"]));
                $$("txtMax").setValue($.trim(rowData[0]["MAX_DIFF"]));
                $$("textDays").setValue($.trim(rowData[0]["FP_PRIOR_DAY"]));
                $$("ddlNoBillCopies").setValue($.trim(rowData[0]["X1_IND"]));
                $$("txtGuestMessage").setValue($.trim(rowData[0]["GUEST_MSG"]));
                $$("ddlExtendent").setValue($.trim(rowData[0]["E4_IND"]));

                $$("txtYearStart").setValue($.trim(rowData[0]["YEAR_START_DATE"]));

                $$("ddlmintsBSP").setValue($.trim(rowData[0]["BRK_PR"]));
                $$("ddlmintsBRA").setValue($.trim(rowData[0]["BRK_AR"]));

                $$("ddlGuestTy").setValue($.trim(rowData[0]["BN_OUTLET_ID"]));
                $$("ddlAdvanRevenue").setValue($.trim(rowData[0]["ADV_REVENUE_ID"]));
                $$("ddlPaidRevenue").setValue($.trim(rowData[0]["PAID_REVENUE_ID"]));

                $$("ddlRoundrevenue").setValue($.trim(rowData[0]["ROUNDOFF_REVENUE_ID"]));

                //$$("ddlDepositeReve").setValue($.trim(rowData[0]["DEP_REVENUE_ID"]));
                $$("ddlBillrounOff").setValue($.trim(rowData[0]["BILL_NET_ROUND_IND"])); 
                $$("ddlApplicabVATtax").setValue($.trim(rowData[0]["V_ID1"]));

                if (rowData[0]["D_IND"] ==' 1')
                {
                    $$("ChckFunction").setValue("1");
                }
                else
                {
                    $$("ChckFunction").setValue("0");
                }
                if(rowData[0]["A_IND"]=='1')
                {
                    $$("ChkKOTBeGenerated").setValue("1");
                }
                else
                {
                  $$("ChkKOTBeGenerated").setValue("0");
                }
                if (rowData[0]["B_IND"] == '1')
                {
                    $$("ChkKOTBe").setValue("1");
                }
                else
                {
                    $$("ChkKOTBe").setValue("0"); 
                }
                if (rowData[0]["C_IND"] == '1') {
                    $$("ChkAllKOT").setValue("1");
                }
                else {
                    $$("ChkAllKOT").setValue("0");
                }
                if (rowData[0]["C2_IND"] == '1')
                {
                    $$("ChkAmenprint").setValue("1");
                }
                else {
                    $$("ChkAmenprint").setValue("0");
                }
                if (rowData[0]["D2_IND"] == '1')
                {
                    $$("CHKMulOutAppli").setValue("1");
                }
                else {
                    $$("CHKMulOutAppli").setValue("0");
                }
                if (rowData[0]["N2_IND"] == '1') {
                    $$("ChkPrintPrgFP").setValue("1");
                }
                else {
                    $$("ChkPrintPrgFP").setValue("0"); 
                }
                if (rowData[0]["L2_IND"] == '1') {
                    $$("ChkFunctionDetails").setValue("1");
                }
                else {
                    $$("ChkFunctionDetails").setValue("0"); 
                }
                if (rowData[0]["M2_IND"] == '1') {
                    $$("ChkInKOTCrationDefault").setValue("1");
                }
                else {
                    $$("ChkInKOTCrationDefault").setValue("0"); 
                }
                if (rowData[0]["P3_IND"] == '1') {
                    $$("ChkDefaultscreenVenue").setValue("1");
                }
                else {
                    $$("ChkDefaultscreenVenue").setValue("0");
                }
                if (rowData[0]["S2_IND"] == '1') {
                    $$("ChkMenuGrpApplica").setValue("1");
                }
                else {
                    $$("ChkMenuGrpApplica").setValue("0");
                }
                if (rowData[0]["P3_IND"] == '1') {
                    $$("ChkFlasRep").setValue("1");
                }
                else {
                    $$("ChkFlasRep").setValue("0"); 
                }
                if (rowData[0]["K3_iND"] == '1') {
                    $$("ChkUsrWisevenPrivAppli").setValue("1");
                }
                else {
                    $$("ChkUsrWisevenPrivAppli").setValue("0");
                }
                if (rowData[0]["V2_IND"] == '1') {
                    $$("ChkEventApplicable").setValue("1");
                }
                else {
                    $$("ChkEventApplicable").setValue("0");
                }
                if (rowData[0]["AA_ID"] == '1') {
                    $$("ChkAcceptSteward").setValue("1");
                }
                else {
                    $$("ChkAcceptSteward").setValue("0"); 
                }
                if (rowData[0]["W2_IND"] == '1') {
                    $$("ChkCreditCard").setValue("1");
                }
                else {
                    $$("ChkCreditCard").setValue("0"); 
                }
                if (rowData[0]["X2_IND"] == '1') {
                    $$("ChkBanquetAreaTo").setValue("1");
                }
                else {
                    $$("ChkBanquetAreaTo").setValue("0"); 
                }
                if (rowData[0]["I4_IND"] == '1') {
                    $$("ChkToRoomSetlement").setValue("1");
                }
                else  {
                    $$("ChkToRoomSetlement").setValue("0");
                }






                if (rowData[0]["M3_IND"] == '1') {
                    $$("ChkGuestFeedback").setValue("1");
                }
                else {
                    $$("ChkGuestFeedback").setValue("0");
                }
                if (rowData[0]["FP_PRIOR_DAY"] == '1') {
                    $$("ChkFBCreation").setValue("1");
                }
                else {
                    $$("ChkFBCreation").setValue("0");
                }

                if (rowData[0]["L2_IND"] == '1') {
                    $$("ChkProBillMadatory").setValue("1");
                }
                else {
                    $$("ChkProBillMadatory").setValue("0");
                }
                if (rowData[0]["E_IND"] == '1') {
                    $$("ChkVATApplicable").setValue("1");
                }
                else {
                    $$("ChkVATApplicable").setValue("0");
                }
                if (rowData[0]["V_D_IND"] == '1') {
                    $$("ChkDiscountConsider").setValue("1");
                }
                else {
                    $$("ChkDiscountConsider").setValue("0");
                }
                if (rowData[0]["G_IND"] == '1') {
                    $$("ChkAcceptLoyaMebers").setValue("1");
                }
                else {
                    $$("ChkAcceptLoyaMebers").setValue("0");
                }
                if (rowData[0]["H_IND"] == '1') {
                    $$("ChkDiplomatTaxApplicable").setValue("1");
                }
                else if  (rowData[0]["H_IND"] == '2') {
                    $$("ChkZeroApplicable").setValue("1");
                }
                if (rowData[0]["S1_IND"] == '1') {
                    $$("ChkServiceChargeExempted").setValue("1");
                }
                else {
                    $$("ChkServiceChargeExempted").setValue("0");
                }

                if (rowData[0]["P2_IND"] == '1') {
                    $$("ChkAllowBillingF_P").setValue("1");
                }
                else {
                    $$("ChkAllowBillingF_P").setValue("0");
                }
                if (rowData[0]["K_IND"] == '1') {
                    $$("ChkAcceptPlanItems").setValue("1");
                }
                else {
                    $$("ChkAcceptPlanItems").setValue("0"); 
                }
                if (rowData[0]["I_IND"] == '1') {
                    $$("ChkAdditional").setValue("1");
                }
                else {
                    $$("ChkAdditional").setValue("0");
                }
                if (rowData[0]["O4_IND"] == '1') {
                    $$("ChkAllowMultipleOutletKOT").setValue("1");
                }
                else {
                    $$("ChkAllowMultipleOutletKOT").setValue("0");
                }
                if (rowData[0]["I3_iND"] == '1') {
                    $$("ChkTax").setValue("1");
                }
                else {
                    $$("ChkTax").setValue("0");
                }
                if (rowData[0]["J3_iND"] == '1') {
                    $$("ChkDefaultPrint").setValue("1");
                }
                else {
                    $$("ChkDefaultPrint").setValue("0"); 
                }
                if (rowData[0]["R1_IND"] == '1') {
                    $$("ChkService").setValue("1");
                }
                else {
                    $$("ChkService").setValue("0");
                } 
                if (rowData[0]["J_IND"] == '1') {
                    $$("ChkAcceptBackDatesForcast").setValue("1");
                }
                else {
                    $$("ChkAcceptBackDatesForcast").setValue("0");
                } 
                
                if (rowData[0]["F_IND"] == '1') {
                    $$("ChkAuditTrail").setValue("1");
                }
                else {
                    $$("ChkAuditTrail").setValue("0"); 
                }
                if (rowData[0]["K2_IND"] == '1') {
                    $$("ChkStageSetting").setValue("1");
                }
                else {
                    $$("ChkStageSetting").setValue("0");
                }
                if (rowData[0]["K2_IND"] == '1') {
                    $$("ChkFBCreationAccept").setValue("1");
                }
                else {
                    $$("ChkFBCreationAccept").setValue("0"); 
                }
                if (rowData[0]["I2_IND"] == '1') {
                    $$("ChkChannel").setValue("1");
                }
                else {
                    $$("ChkChannel").setValue("0");
                }
                if (rowData[0]["J2_IND"] == '1') {
                    $$("ChkBooker").setValue("1");
                }
                else {
                    $$("ChkBooker").setValue("0"); 
                }
                if (rowData[0]["Y2_IND"] == '1') {
                    $$("ChkSales").setValue("1");
                }
                else {
                    $$("ChkSales").setValue("0");
                }
                if (rowData[0]["Z2_IND"] == '1') {
                    $$("ChkBusiness").setValue("1");
                }
                else {
                    $$("ChkBusiness").setValue("0");
                }
                if (rowData[0]["A2_IND"] == '1') {
                    $$("ChkMemeber").setValue("1");
                }
                else {
                    $$("ChkMemeber").setValue("0");
                }
                if (rowData[0]["I_IND"] == '1') {
                    $$("ChkKids").setValue("1");
                }
                else {
                    $$("ChkKids").setValue("0");
                }
                if (rowData[0]["M_IND"] == '1') {
                    $$("ChkDrivers").setValue("1");
                }
                else {
                    $$("ChkDrivers").setValue("0");
                }
                if (rowData[0]["N_IND"] == '1') {
                    $$("ChkFood").setValue("1");
                }
                else {
                    $$("ChkFood").setValue("0");
                }
                if (rowData[0]["O_IND"] == '1') {
                    $$("ChkAccept").setValue("1");
                }
                else {
                    $$("ChkAccept").setValue("0");
                }
                if (rowData[0]["A3_IND"] == '1') {
                    $$("ChkReservationGuestPhone").setValue("1");
                }
                else {
                    $$("ChkReservationGuestPhone").setValue("0");
                }
                if (rowData[0]["L3_IND"] == '1') {
                    $$("ChkReservationGuestMobile").setValue("1");
                }
                else {
                    $$("ChkReservationGuestMobile").setValue("0");
                }
                if (rowData[0]["F4_IND"] == '1') {
                    $$("ChkContactPersonPhone").setValue("1");
                }
                else {
                    $$("ChkContactPersonPhone").setValue("0");
                }
               

                if (rowData[0]["T2_IND"] == '1') {
                    $$("ChkGuestAddress").setValue("1");
                }
                else {
                    $$("ChkGuestAddress").setValue("0"); 
                }
                if (rowData[0]["B3_IND"] == '1') {
                    $$("ChkAfternoonTea").setValue("1");
                }
                else {
                    $$("ChkAfternoonTea").setValue("0"); 
                }
                if (rowData[0]["D3_IND"] == '1') {
                    $$("ChkEveningTea").setValue("1");
                }
                else {
                    $$("ChkEveningTea").setValue("0"); 
                }
                if (rowData[0]["Q3_IND"] == '1') {
                    $$("ChkAllowWL").setValue("1");
                }
                else {
                    $$("ChkAllowWL").setValue("0"); 
                }
                if (rowData[0]["R3_IND"] == '1') {
                    $$("ChkPlaneItem").setValue("1");
                }
                else {
                    $$("ChkPlaneItem").setValue("0"); 
                }
                if (rowData[0]["MIN_ADV"] == '1') {
                    $$("ChkMiniumAdvance").setValue("1");
                }
                else {
                    $$("ChkMiniumAdvance").setValue("0"); 
                }
                if (rowData[0]["T3_IND"] == '1') {
                    $$("ChkGuaranteePax").setValue("1");
                }
                else {
                    $$("ChkGuaranteePax").setValue("0"); 
                }
                if (rowData[0]["U3_IND"] == '1') {
                    $$("ChkAlert").setValue("1");
                }
                else {
                    $$("ChkAlert").setValue("0"); 
                }
                if (rowData[0]["G4_IND"] == '1') {
                    $$("ChkF&BPlane").setValue("1");
                }
                else {
                    $$("ChkF&BPlane").setValue("0"); 
                }
                if (rowData[0]["I4_IND"] == '1') {
                    $$("ChkCancelBooking").setValue("1");
                }
                else {
                    $$("ChkCancelBooking").setValue("0"); 
                }
                if (rowData[0]["S3_IND"] == '1') {
                    $$("ChkMiniumAdvance").setValue("1");
                }
                else {
                    $$("ChkMiniumAdvance").setValue("0"); 
                }
                if (rowData[0]["V3_IND"] == '1') {
                    $$("ChkTentativeCutoff").setValue("1");
                }
                else {
                    $$("ChkTentativeCutoff").setValue("0"); 
                }
                if (rowData[0]["E2_IND"] == '1') {
                    $$("rbtnRpt").setValue("1");
                }
                else if (rowData[0]["E2_IND"] == '2') {
                    $$("rbtnRpt").setValue("2");
                }
                if (rowData[0]["K4_IND"] == '1') {
                    $$("OptGrps").setValue("2");
                }
                else if (rowData[0]["K4_IND"] == '' || rowData[0]["K4_IND"] == null) {
                    $$("OptGrps").setValue("1");
                } 
                if (rowData[0]["F2_IND"] == '1') {
                    $$("ChckEmailtelemadBooker").setValue("1");
                }
                else {
                    $$("ChckEmailtelemadBooker").setValue("2");
                } 
                if (rowData[0]["G3_iND"] == '1') {
                    $$("ChkDisplayToolTip").setValue("1");
                }
                else {
                    $$("ChkDisplayToolTip").setValue("2"); 
                }
                if (rowData[0]["U2_IND"] == '1') {
                    $$("ChckValidate").setValue("1");
                }
                else {
                    $$("ChckValidate").setValue("2"); 
                }
                if (rowData[0]["B4_IND"] == '1') {
                    $$("rbtnRptsAfter").setValue("2");
                }
                else {
                    $$("rbtnRptsAfter").setValue("1");
                } 
                if (rowData[0]["O2_IND"] == '1') {
                    $$("OptGrpVenu").setValue("1");
                }
                else if (rowData[0]["O2_IND"] == '2') {
                    $$("OptGrpVenu").setValue("2");
                }
                else if (rowData[0]["O2_IND"] == '3') {
                    $$("OptGrpVenu").setValue("3");
                }

                if (rowData[0]["M4_IND"] == '1') {
                    $$("ChkRevenuewise").setValue("1");

                }
                else if (rowData[0]["M4_IND"] == '2') {
                    $$("ChkRevenuewise").setValue("2");
                    $$("ChkTaxSeparatly").setValue("2");
                }

                //if (rowData[0]["M4_IND"] == '1') {
                //    $$("ChkTaxSeparatly").setValue("1");
                //}
                //else {
                //    $$("ChkTaxSeparatly").setValue("0");
                //} 
            } 
        }
    });
    return rowData; 
}

function fnBanquetSettingOpenSave() {
    debugger;
    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_BQSETTINGOPENSAVE";
    dataparam["PROGNAME"] = "Get_MST_BANQUET_SETTING";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();
    dataparam["ddlGuestTy"] = $.trim($$("ddlGuestTy").getValue());
    dataparam["ChkKOTBeGenerated"] = $.trim($$("ChkKOTBeGenerated").getValue());
    dataparam["OptGrpVenu"] = $.trim($$("OptGrpVenu").getValue());
    dataparam["ChckFunction"] = $.trim($$("ChckFunction").getValue());
    dataparam["txtLastNCKOT"] = $.trim($$("txtLastNCKOT").getValue());
    dataparam["txtFPsigna"] = $.trim($$("txtFPsigna").getValue());
    dataparam["txtFPLastLinNarr"] = $.trim($$("txtFPLastLinNarr").getValue());
    dataparam["txtChallanSig"] = $.trim($$("txtChallanSig").getValue());
    dataparam["txtFBPrint"] = $.trim($$("txtFBPrint").getValue());
    dataparam["txtBillSig"] = $.trim($$("txtBillSig").getValue());
    dataparam["txtGuetsBillReceprint"] = $.trim($$("txtGuetsBillReceprint").getValue());
    dataparam["txtChlPrinPrg"] = $.trim($$("txtChlPrinPrg").getValue());
    dataparam["txtKOTorintPrg"] = $.trim($$("txtKOTorintPrg").getValue());
    dataparam["txtPrintPrg"] = $.trim($$("txtPrintPrg").getValue());
    dataparam["ChkKOTBe"] = $.trim($$("ChkKOTBe").getValue());
    dataparam["ChkAllKOT"] = $.trim($$("ChkAllKOT").getValue());
    dataparam["ChkAmenprint"] = $.trim($$("ChkAmenprint").getValue());
    dataparam["txtPrintPrg"] = $.trim($$("txtPrintPrg").getValue());
    dataparam["CHKMulOutAppli"] = $.trim($$("CHKMulOutAppli").getValue());
    dataparam["ChkMenuGrpApplica"] = $.trim($$("ChkMenuGrpApplica").getValue());
    dataparam["ChckEmailtelemadBooker"] = $.trim($$("ChckEmailtelemadBooker").getValue());
    dataparam["ChkFunctionDetails"] = $.trim($$("ChkFunctionDetails").getValue());
    dataparam["ChkInKOTCrationDefault"] = $.trim($$("ChkInKOTCrationDefault").getValue());
    dataparam["ChkUsrWisevenPrivAppli"] = $.trim($$("ChkUsrWisevenPrivAppli").getValue());
    dataparam["ChkDefaultscreenVenue"] = $.trim($$("ChkDefaultscreenVenue").getValue());
    dataparam["ChkFlasRep"] = $.trim($$("ChkFlasRep").getValue());
    dataparam["txtAmendPrintPrg"] = $.trim($$("txtAmendPrintPrg").getValue());
    dataparam["ddlAdvanRevenue"] = $.trim($$("ddlAdvanRevenue").getValue());
    dataparam["ddlPaidRevenue"] = $.trim($$("ddlPaidRevenue").getValue());
    dataparam["ddlRoundrevenue"] = $.trim($$("ddlRoundrevenue").getValue());
   // dataparam["ddlDepositeReve"] = $.trim($$("ddlDepositeReve").getValue());
    dataparam["ddlBillrounOff"] = $.trim($$("ddlBillrounOff").getValue());
    dataparam["txtLastBillNO"] = $.trim($$("txtLastBillNO").getValue());
    dataparam["txtLastNCBillNO"] = $.trim($$("txtLastNCBillNO").getValue());
    dataparam["txtPaidprintPrg"] = $.trim($$("txtPaidprintPrg").getValue());
    dataparam["txtAdvanceRef"] = $.trim($$("txtAdvanceRef").getValue());
    dataparam["txtProPrintPrg"] = $.trim($$("txtProPrintPrg").getValue());
    dataparam["ChkProBillMadatory"] = $.trim($$("ChkProBillMadatory").getValue());
    dataparam["ChkVATApplicable"] = $.trim($$("ChkVATApplicable").getValue());
    dataparam["ddlApplicabVATtax"] = $.trim($$("ddlApplicabVATtax").getValue());
    dataparam["ChkDiscountConsider"] = $.trim($$("ChkDiscountConsider").getValue());
    dataparam["ChkAcceptLoyaMebers"] = $.trim($$("ChkAcceptLoyaMebers").getValue());
    dataparam["ChkDiplomatTaxApplicable"] = $.trim($$("ChkDiplomatTaxApplicable").getValue());
    dataparam["ChkZeroApplicable"] = $.trim($$("ChkZeroApplicable").getValue());
    dataparam["ChkAcceptBackDatesForcast"] = $.trim($$("ChkAcceptBackDatesForcast").getValue());
    dataparam["ChkPrintPrgFP"] = $.trim($$("ChkPrintPrgFP").getValue());
    dataparam["ChkAllowBillingF_P"] = $.trim($$("ChkAllowBillingF_P").getValue());
    dataparam["ChkAcceptPlanItems"] = $.trim($$("ChkAcceptPlanItems").getValue());
    dataparam["ChkAdditional"] = $.trim($$("ChkAdditional").getValue());
    dataparam["ChkTax"] = $.trim($$("ChkTax").getValue());
    dataparam["ChkDefaultPrint"] = $.trim($$("ChkDefaultPrint").getValue());
    dataparam["ddlNoBillCopies"] = $.trim($$("ddlNoBillCopies").getValue());
    dataparam["ChkService"] = $.trim($$("ChkService").getValue());
    dataparam["ChkServiceChargeExempted"] = $.trim($$("ChkServiceChargeExempted").getValue());
    dataparam["ChkToRoomSetlement"] = $.trim($$("ChkToRoomSetlement").getValue());
    dataparam["ChkRevenuewise"] = $.trim($$("ChkRevenuewise").getValue());
    dataparam["ChkAcceptPlanItems"] = $.trim($$("ChkAcceptPlanItems").getValue());
    dataparam["ChkAllowMultipleOutletKOT"] = $.trim($$("ChkAllowMultipleOutletKOT").getValue());
    dataparam["ChkEventApplicable"] = $.trim($$("ChkEventApplicable").getValue());
    dataparam["ChkAcceptSteward"] = $.trim($$("ChkAcceptSteward").getValue());
    dataparam["ChkCreditCard"] = $.trim($$("ChkCreditCard").getValue());
    dataparam["ChkBanquetAreaTo"] = $.trim($$("ChkBanquetAreaTo").getValue());
    dataparam["ChkDynamicF1"] = $.trim($$("ChkDynamicF1").getValue());
    dataparam["ChkDynamicF2"] = $.trim($$("ChkDynamicF2").getValue());
    dataparam["txtD1"] = $.trim($$("txtD1").getValue());
    dataparam["txtD2"] = $.trim($$("txtD2").getValue());
    dataparam["txtD3"] = $.trim($$("txtD3").getValue());
    dataparam["txtD4"] = $.trim($$("txtD4").getValue());
    dataparam["txtGuestMessage"] = $.trim($$("txtGuestMessage").getValue());
    dataparam["ChkDynamicF4"] = $.trim($$("ChkDynamicF4").getValue());
    dataparam["ChkGuestFeedback"] = $.trim($$("ChkGuestFeedback").getValue());
    dataparam["ddlVenueBooking"] = $.trim($$("ddlVenueBooking").getValue());
    dataparam["ChkFBCreation"] = $.trim($$("ChkFBCreation").getValue());
    dataparam["textDays"] = $.trim($$("textDays").getValue());
    dataparam["ChkAuditTrail"] = $.trim($$("ChkAuditTrail").getValue());
    dataparam["ChkStageSetting"] = $.trim($$("ChkStageSetting").getValue());
    dataparam["ChkFBCreationAccept"] = $.trim($$("ChkFBCreationAccept").getValue());
    dataparam["ddlExtendent"] = $.trim($$("ddlExtendent").getValue());
    dataparam["rbtnRpt"] = $.trim($$("rbtnRpt").getValue());
    dataparam["ChkChannel"] = $.trim($$("ChkChannel").getValue());
    dataparam["ChkCancelBooking"] = $.trim($$("ChkCancelBooking").getValue());
    dataparam["ChkBooker"] = $.trim($$("ChkBooker").getValue());
    dataparam["ChkPreparation"] = $.trim($$("ChkPreparation").getValue());
    dataparam["ChkSales"] = $.trim($$("ChkSales").getValue());
    dataparam["ChkMandatory"] = $.trim($$("ChkMandatory").getValue());
    dataparam["ChkBusiness"] = $.trim($$("ChkBusiness").getValue());
    dataparam["ChkKids"] = $.trim($$("ChkKids").getValue());
    dataparam["ChkDrivers"] = $.trim($$("ChkDrivers").getValue());
    dataparam["ChkFood"] = $.trim($$("ChkFood").getValue());
    dataparam["ChkAccept"] = $.trim($$("ChkAccept").getValue());
    dataparam["ChkReservationGuestPhone"] = $.trim($$("ChkReservationGuestPhone").getValue());
    dataparam["ChkReservationGuestMobile"] = $.trim($$("ChkReservationGuestMobile").getValue());
    dataparam["ChkContactPersonPhone"] = $.trim($$("ChkContactPersonPhone").getValue());
    dataparam["ChkGuestAddress"] = $.trim($$("ChkGuestAddress").getValue());
    dataparam["ChkAfternoonTea"] = $.trim($$("ChkAfternoonTea").getValue());
    dataparam["ChkEveningTea"] = $.trim($$("ChkEveningTea").getValue());
    dataparam["txtDefaultcut"] = $.trim($$("txtDefaultcut").getValue());
    dataparam["OptGrps"] = $.trim($$("OptGrps").getValue());
    dataparam["ChkAllowWL"] = $.trim($$("ChkAllowWL").getValue());
    dataparam["ChkPlaneItem"] = $.trim($$("ChkPlaneItem").getValue());
    dataparam["ChkMiniumAdvance"] = $.trim($$("ChkMiniumAdvance").getValue());
    dataparam["txtMiniumAdvance"] = $.trim($$("txtMiniumAdvance").getValue());
    dataparam["ChkGuaranteePax"] = $.trim($$("ChkGuaranteePax").getValue());
    dataparam["txtMax"] = $.trim($$("txtMax").getValue());
    dataparam["ChkAlert"] = $.trim($$("ChkAlert").getValue());
    dataparam["ChkTentativeCutoff"] = $.trim($$("ChkTentativeCutoff").getValue());
    dataparam["txtMinimumCut"] = $.trim($$("txtMinimumCut").getValue()); 
    dataparam["ChkDisplayToolTip"] = $.trim($$("ChkDisplayToolTip").getValue());
    dataparam["ddlmintsBSP"] = $.trim($$("ddlmintsBSP").getValue());
    dataparam["ddlmintsBRA"] = $.trim($$("ddlmintsBRA").getValue()); 
    dataparam["ChckValidate"] = $.trim($$("ChckValidate").getValue()); 
    dataparam["OptGrpVenu"] = $.trim($$("OptGrpVenu").getValue()); 
    dataparam["rbtnRptsAfter"] = $.trim($$("rbtnRptsAfter").getValue());
    dataparam["txtYearStart"] = $.trim($$("txtYearStart").getText());
    dataparam["txtReservationAdvanc"] = $.trim($$("txtReservationAdvanc").getValue());
    dataparam["ChkTaxSeparatly"] = $.trim($$("ChkTaxSeparatly").getValue());
    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/BQMaster/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                rowData = JSON.parse(objRes);
                $$("BQTabView").getTabbar().setValue("Mainfrm");
                if ($.trim(rowData) == "True") {

                    if ($("#hdnCurMode").val() == "N") {
                        AlertMessage("created Successfully");
                        $("#btnRef").click();
                    }
                    else {
                        AlertMessage("Updated Successfully");
                        $("#btnRef").click();
                    }

                    $("#LoadDIv").hide();
                    return;
                }
                else {
                    AlertMessage("Save Failed");
                    $("#LoadDIv").hide();
                    return;
                }

            }

        },
    });
}

function fnBQValidate() {

    if ($("#hdnCurMode").val() == "O") {

        if ($.trim($$("txtFPsigna").getValue()) == "") {
            AlertMessage("FP-Signatory cannot be empty !");
            return false;
        }
    }
    if ($.trim($$("txtChallanSig").getValue()) == "") {
        AlertMessage("Challan Signatory cannot be empty !");
        return false;
    }
    if ($.trim($$("txtBillSig").getValue()) == "") {
        AlertMessage("Bill Signatory  cannot be empty !");
        return false;
    }
    if ($.trim($$("txtFBPrint").getValue()) == "") {
        AlertMessage("FB Print Program  cannot be empty !");
        return false;
    }
    if ($.trim($$("txtChlPrinPrg").getValue()) == "") {
        AlertMessage("Challan Print Program  cannot be empty !");
        return false;
    }
    if ($.trim($$("txtPrintPrg").getValue()) == "") {
        AlertMessage("Bill Print Program  cannot be empty !");
        return false;
    }
    if ($.trim($$("txtGuetsBillReceprint").getValue()) == "") {
        AlertMessage("Guest Bill Receipt print Program  cannot be empty !");
        return false;
    }
    if ($.trim($$("txtKOTorintPrg").getValue()) == "") {
        AlertMessage("KOT Print Program  cannot be empty !");
        return false;
    }
    if ($.trim($$("txtAmendPrintPrg").getValue()) == "") {
        AlertMessage("Amend Print Program  cannot be empty !");
        return false;
    }

    return true;
}


function fnLoadOutLet() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_BNOUTLET";
    dataparam["PROGNAME"] = "Get_MST_BANQUET_SETTING";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("ddlGuestTy").define("options", rowData);
                //($$("ddlGuestTy").setValue(rowData[0].id));
            }
        }
    });

    return rowData;
}

function fnLoadRevenuLoad() {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_BQSETTINGOPENREVENUEPADIOUT";
    dataparam["PROGNAME"] = "Get_MST_BANQUET_SETTING";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("ddlAdvanRevenue").define("options", rowData);
               //($$("ddlAdvanRevenue").setValue(rowData[0].id));
                $$("ddlPaidRevenue").define("options", rowData);
                //($$("ddlPaidRevenue").setValue(rowData[0].id));
                $$("ddlRoundrevenue").define("options", rowData);
                //($$("ddlRoundrevenue").setValue(rowData[0].id));
                $$("ddlDepositeReve").define("options", rowData);
                //($$("ddlDepositeReve").setValue(rowData[0].id));

               

                      
            }
        }
    });

    return rowData;
} 

function fnLoadReVenuCashierTax() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_BQSETTINGCASHIERTAX";
    dataparam["PROGNAME"] = "Get_MST_BANQUET_SETTING";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("ddlApplicabVATtax").define("options", rowData);
                //($$("ddlApplicabVATtax").setValue(rowData[0].id));
            }
        }
    });

    return rowData;
}

function fnPayRoundOFF() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_PAYROUNDOFF";
    dataparam["PROGNAME"] = "Get_MST_BANQUET_SETTING";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("txtLastBillNO").setValue($.trim(rowData[0]["DISP_SNO"]));
                $$("txtLastNCBillNO").setValue($.trim(rowData[0]["A_SNO"]));     
            }
        }
    });

    return rowData;
}

function fnBillRoundoff() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_BQSETTINBILL";
    dataparam["PROGNAME"] = "Get_MST_BANQUET_SETTING";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("ddlBillrounOff").define("options", rowData);
                //($$("ddlBillrounOff").setValue(rowData[0].id));
               
            }
        }
    });

    return rowData;
}

function fnKOTNumber() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_KOTNUMBER";
    dataparam["PROGNAME"] = "Get_MST_BANQUET_SETTING";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $$("txtFirstNm").setValue($.trim(rowData[0]["D_SNO"]));
                $$("txtLastNCKOT").setValue($.trim(rowData[0]["A_SNO"]));
            }
        }
    });

    return rowData;
}