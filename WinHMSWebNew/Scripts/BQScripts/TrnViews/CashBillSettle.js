var Cash_Appl="0";var CC_Appl ="0";var Com_Appl ="0";var Room_Appl="0";var Cheque_Appl ="0";var Staff_Appl="0";
var Compli_Appl="0";var FExch_Appl ="0";var Mem_Appl ="0";var Void_Appl ="0";var Cur_Comp_Id ="";var Cur_CC_Comp_Id="";
var Cur_Staff_Id ="";var Cur_Mem_Id ="";var Cur_Eemp_Id = "";var PB_Company_Id = "";var Cur_Room_No ="";var Cur_Reg_No ="";
var From_Room_No="";var C_Reg_Ty = "";var Covers = "";var SSesid ="";var chkFinalBill = "0";var Ret_GSNo = "";
var BillLoadedTime = "";var SettleSelectedColumn = "";var OnClearSet = "0";var SrchType = "";var Md_Cash = "1";
var Md_Comp = "3"; var Md_CC = "2"; var Md_Staff = "6"; var Md_Chq = "5"; var Md_Compli = "7"; var Md_Void = "V"; var AuthUSer = "";
var Md_Mem = "9";var Md_Forn = "8";var Md_ToRoom = "4";var Md_Pay = "M";var Md_CCoupon = "C";var Md_FundsTransf = "B";
var Md_PayBill = "Q"; var Md_CashCard = "G"; var MembCrVal = ""; var CreditAuthorz = ""; var SmsBillAlert = ""; var N2_ind = "";
var splinstr = ""; var Forn_Tariff_Appl_Ind = ""; var gTotPaidAmt = 0; var Current_Mode = "";Memb_Update_Ind="";var AuthDesc="";
var InitVariables = function () {    
    window.W2_IND = ""; window.M_TAX = ""; window.BASE_CURRENCY = ""; window.CURR_DT = ""; window.CURRENCY_FORMAT = "";
    window.CURRENCY_DELIMIT = ""; window.CURRENCY_DECIMLIMIT = ""; window.AccDt103 = ""; window.NAccDate103 = "";
    window.Allow_canc = ""; window.TaxBiAppl = ""; window.ST_IND = ""; window.ST_AMT = ""; window.ST_MAD = "";
    window.RevenueWisePostAppl = ""; window.oprIntrfAppl = ""; window.oprIntrfTaxExcl = "";window.Curappl = "";
    window.SMSAppl = ""; window.CoupID = ""; window.BN_OUTLET_ID = ""; window.Bn_Out_Rev_Id = "";window.Bn_Outlet_nm = "";
    window.Bn_Out_Rev_Nm = ""; window.Ret_Orig_BillNo = ""; window.Ret_Dummy_BillNo = "", window.SHOWTGL="0";
    window.Ret_Guest_Nm = "";window.Ret_Guest_Id = "";window.Ret_Guest_Type = "";window.Ret_Reserve_No = "";
    window.Ret_ResBlk_Ind = ""; window.CPN_MOD_RES = ""; window.CCInd = "";window.Usr_log_ind="";  
    chkFinalBill = "0"; Cash_Appl="0"; CC_Appl ="0"; Com_Appl ="0"; Room_Appl="0"; Cheque_Appl ="0";  Staff_Appl="0";
    Compli_Appl="0"; FExch_Appl ="0"; Mem_Appl ="0"; Void_Appl ="0";Cur_Comp_Id =""; Cur_CC_Comp_Id=""; Cur_Staff_Id ="";
    Cur_Mem_Id =""; Cur_Room_No =""; Cur_Reg_No =""; From_Room_No=""; C_Reg_Ty = ""; Covers = ""; SSesid = "";
    Ret_GSNo = ""; MembCrVal = ""; CreditAuthorz = ""; SmsBillAlert = ""; N2_ind = ""; splinstr = ""; BillLoadedTime = ""; gTotPaidAmt = 0;
    Forn_Tariff_Appl_Ind = ""; Current_Mode = ""; Memb_Update_Ind = ""; AuthUSer = "";AuthDesc="";     
}
var ClearControls = function(){
    $$("gridCCoupTp").clearAll(); $$("gridSettleMode").clearAll(); $$("gridSettle").clearAll(); $$("gridCurr").clearAll();
    $$("txtBillNo").setValue(""); $$("txtGuestTy").setValue(""); $$("txtBlockType").setValue("");
    $$("txtCur").setValue(""); $$("txtFAmt").setValue(""); $$("txtGuestNm").setValue(""); $$("txtResNo").setValue("");
    $$("txtBillDt").setValue(""); $$("txtBillInstr").setValue(""); $$("txtBillAmt").setValue(""); $$("txtPaidOut").setValue("");
    $$("txtLessAdv").setValue(""); $$("txtPayableAmt").setValue(""); $$("txtCash_Narr").setValue(""); $$("txtPANNo").setValue(""); $$("txtPANNo").hide();
    fnDisableAllMode();
    $$("fmCancel").hide();
    fnAddRow();
    fnClearCont();
}
var PageLoad = function () {
    debugger;
    GridDesign();
    webix.ui({ container: "divPropbox", view: "richselect", id: "Property", on: { onChange: function (newVal, OldVal) { fnPropChange(newVal); } } });
    webix.ui({
        container: "divBillNo", view: "search", labelWidth: 70, id: "txtBillNo", label: "Bill No", readonly: true, icon: "wxi-search", maxWidth: 200,
        on: {
            onSearchIconClick: function () {
                debugger;
                fnBillSrchBtnClick();
            }
        }
    });
    webix.ui({ container: "divGstTp", view: "text", id: "txtGuestTy", labelWidth: 70, label: "Type", readonly: true, });
    webix.ui({ container: "divBlkTp", view: "text", id: "txtBlockType", labelWidth: 70, label: " ", readonly: true });
    webix.ui({ container: "divCurr", id: "Layout2",
        rows: [
            {id: "fmCurr", hidden: true,
                cols: [
                    { view: "text", labelWidth: 70, id: "txtCur", label: "Currency", readonly: true },
                    { view: "text", labelWidth: 70, id: "txtFAmt", label: "Forn Amt", readonly: true, css: { "text-align": "right" } },
                ],
            },
        ]
    });
    
    webix.ui({ container: "divGstName", view: "text", id: "txtGuestNm", labelWidth: 70, label: "Name", readonly: true, });
    webix.ui({ container: "divResNo", view: "text", id: "txtResNo", labelWidth: 70, label: "No", readonly: true, maxWidth:200}); 
    webix.ui({ container: "divPANDet", view: "text", id: "txtPANNo", labelWidth: 70, label: "xxxx", attributes: { maxlength: 20 }, maxWidth:200});    

    webix.ui({
        container: "divBillDt",
        position: "flex",
        id: "Layout2",
        cols: [
            {
                view: "search", label: "Bill Date", labelWidth: 100, name: "BillDt", id: "txtBillDt", icon: "wxi-angle-up", readonly: true,maxWidth:250,
                on: {
                    onSearchIconClick: function () {
                        debugger;
                        if (window.SHOWTGL == "0") return false;
                        //this.setValue("");
                        if (this.config.icon == "wxi-angle-down") {
                            this.define("icon", "wxi-angle-up");
                            this.setValue(window.AccDt103);
                        }
                        else if (this.config.icon == "wxi-angle-up") {
                            this.define("icon", "wxi-angle-down");
                            this.setValue(window.NAccDate103);
                        }

                        this.refresh();
                        this.focus();

                        fnClearCont();

                    }
                }
            },

        ]

    });

    webix.ui({ container: "divBillIns", view: "text", id: "txtBillInstr", labelWidth: 70, label: "Bill Inst", readonly: true, });
    webix.ui({ container: "divBillDet",
             view:"fieldset", label:"Bill Detail", body:{
                rows:[
                    {
                        view: "text", id: "txtBillAmt", type: "text", label: "BILL AMOUNT", labelWidth: 150, format: "111.00", readonly: true, width: 300, inputAlign: "right",
                        
                    },
                    {
                        view: "text", id: "txtPaidOut", type: "text", label: "PAIDOUTS", format: "111.00", readonly: true, labelWidth: 150, width: 300, inputAlign: "right",                        
                    },
                    {
                        view: "text", id: "txtLessAdv", label: "LESS ADVANCE", readonly: true, format: "111.00", labelWidth: 150, width: 300, inputAlign: "right",
                        
                    },
                    {
                        view: "text", id: "txtPayableAmt", label: "PAYABLE AMOUNT", readonly: true, format: "111.00", labelWidth: 150, width: 300, inputAlign: "right",
                        
                    }
                ]
            },
    });

    webix.ui({
        container: "divSettle",
        rows:[
        {view: "fieldset", label: "Cash", width: 400, id: "fmCash", body: {
            rows: [
                {
                    view: "text", id: "txtCash_Narr", label: "Narration", labelWidth: 100, width: 350, attributes: { maxlength: 60 },  on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_Cash);
                        },
                    }
                },
                
            ]
        },},
        {view: "fieldset", label: "CreditCard", width: 400, id: "fmCreditCard",  body: {
            rows: [
                {
                    view: "search", id: "txtCC_Company", label: "Company", labelWidth: 100, readonly: true, width: 300, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_CC);
                        },
                        onSearchIconClick: function () {
                            fnBtnCreditCardSrchClick();
                        }
                    }
                },
                {
                    view: "text", id: "txtCC_CardNo", label: "Card No.", labelWidth: 100, attributes: { maxlength: 16 }, width: 300, readonly: false, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_CC);
                        },
                    }
                },
                {
                    view: "datepicker", id: "scCCExpDt", type: "month", label: "Expiry Date", labelWidth: 100, width: 200, format: "%M-%Y", stringResult: true, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_CC);
                        },
                    }
                },
                {
                    view: "text", id: "txtCCAuthNo", label: "Approval Code", labelWidth: 100, attributes: { maxlength: 10 }, width: 300, readonly: false, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_CC);
                        },
                    }
                },
            ]
        },},
        {view: "fieldset", label: "Cheque", width: 400, id: "fmCheque",  body: {
            rows: [
                {
                    view: "text", id: "txtCHQ_ChqNo", label: "CHQ NO", labelWidth: 100,attributes: { maxlength: 16 }, width: 300, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_Chq);
                        },
                    }
                },
                {
                    view: "text", id: "txtCHQ_Bank", label: "Bank", labelWidth: 100,attributes: { maxlength: 30 }, width: 300, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_Chq);
                        },
                    }
                },
                {
                    view: "datepicker", id: "scChqDt", label: "Cheque Date", labelWidth: 100, width: 250, format: "%d/%m/%Y", stringResult: true, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_Chq);
                        },
                    }
                },
                {
                    view: "richselect", label: "Currency", id: "ddlCrCurr", labelWidth: 100, width: 300, on: {
                        onChange: function () {
                            fnddlCrCurrChange();
                            if (OnClearSet == "0") fnStoreToSpread(Md_Chq);
                        },
                    }
                },
                {
                    cols: [{
                        view: "text", id: "txtCrCurrEq", label: "Forign Amt",inputAlign: "right",attributes: { maxlength: 12 }, labelWidth: 100, width: 200, on: {
                            onChange: function () {
                                debugger;                                
                                if (OnClearSet == "0") fnStoreToSpread(Md_Chq);
                            },
                            "onTimedKeyPress": function (code, e) { fnFrnAmtChange(); },
                            "onKeyPress": function (code, e) { return fnFloatText(code, e, this.getValue()); } 
                        }
                    }, {
                        view: "text", id: "txtconvrt", label: "Conv.Rate",inputAlign: "right",readonly:true, labelWidth: 100, width: 200, on: {
                            onChange: function () {
                                if (OnClearSet == "0") fnStoreToSpread(Md_Chq);
                            },
                        }
                    }]
                },
                {
                    cols: [{
                        view: "text", id: "txtCC_BaseValue", label: "Base Amt",format: "11.00",inputAlign: "right",readonly:true, labelWidth: 100, width: 200, on: {
                            onChange: function () {
                                if (OnClearSet == "0") fnStoreToSpread(Md_Chq);
                            },
                        }
                    }, {
                        view: "text", id: "txtCC_ExtrAmt", label: "Excess Amt",format: "11.00",inputAlign: "right",readonly:true,labelWidth: 100, width: 200, on: {
                            onChange: function () {
                                if (OnClearSet == "0") fnStoreToSpread(Md_Chq);
                            },
                        }
                    }]
                },
            ]
        },},

        {view: "fieldset", label: "To Room", id: "fmToRoom", width: 400, body: {
            rows: [
                {
                    view: "search", id: "txtRoom_No", label: "Room No",readonly:true, labelWidth: 100, width: 200, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_ToRoom);
                        },
                        onSearchIconClick: function () {
                            fnBtnToRoomSrchClick();
                        }                        
                    }
                },
                {
                    view: "text", id: "txtRoom_Guest", label: "Guest", labelWidth: 100, readonly: true, width: 350, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_ToRoom);
                        },
                    }
                },
                
            ]
        },},

         { view: "fieldset", label: "Cash Card", id: "fmcashcard", width: 400,  body: {
            rows: [
                {
                    view: "text", id: "txtcashcardno", label: "Cash Card No",attributes: { maxlength: 30}, labelWidth: 100, width: 200, on: {
                        onChange: function (newv, oldv) {
                            if (OnClearSet == "0") {
                                fnGetCashCardDet(newv);
                                fnStoreToSpread(Md_CashCard);
                            }
                        },
                    }
                },
                {
                    view: "text", id: "txtcashcardname", label: "Name", labelWidth: 100,attributes: { maxlength: 60 }, readonly: true, width: 350, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_CashCard);
                        },
                    }
                },
                {
                    cols: [{
                        view: "text", id: "txtCash_CardFrom", label: "Valid From", labelWidth: 100, readonly: true, width: 200, on: {
                            onChange: function () {
                                if (OnClearSet == "0") fnStoreToSpread(Md_CashCard);
                            },
                        }
                    }, {
                        view: "text", id: "txtCash_CardTo", label: "To", labelWidth: 50, readonly: true, width: 150, on: {
                            onChange: function () {
                                if (OnClearSet == "0") fnStoreToSpread(Md_CashCard);
                            },
                        }
                    }]
                },
                {
                    view: "text", id: "txtCash_CardBalAmt", label: "Balance Amt",format: "11.00",inputAlign: "right", labelWidth: 100, readonly: true, width: 200, on: {
                        onChange: function (newv, oldv) {                            
                            if (OnClearSet == "0") fnStoreToSpread(Md_CashCard);
                        },
                    }
                },
            ]
         },},

         { view: "fieldset", label: "Company", id: "fmCompany", width: 400,  body: {
            rows: [
                {
                    view: "search", id: "txtComp_Comp", label: "Company",readonly:true, labelWidth: 100, width: 300, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_Comp);
                        },
                        onSearchIconClick: function () {
                            fnBtnCompSrchClick();
                        }                        
                    }
                },
                {
                    view: "textarea", id: "txtComp_Narr", label: "Narration", labelWidth: 100,attributes: { maxlength: 60 }, width: 350, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_Comp);
                        },
                    }
                },
            ]
         },},
         { view: "fieldset", label: "Complimentary", id: "fmCompli", width: 400,  body: {
            rows: [                     
                {
                    view: "textarea", id: "txtCompli_Narr", label: "Narration",attributes: { maxlength: 60 }, labelWidth: 100, width: 350, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_Compli);
                        },
                    }
                },

                ]
            },
         },
         {view: "fieldset", label: "Member", id: "fmMember", width: 400, body: {
            rows: [
                {
                    view: "search", id: "txtMem_Nm", label: "Member", labelWidth: 100, readonly:true, width: 300, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_Mem);
                        },                        
                        onSearchIconClick: function () {
                            fnBtnMemberSrchClick();
                        }
                    }
                },
                {
                    view: "textarea", id: "txtMem_Narr", label: "Narration",attributes: { maxlength: 60 }, labelWidth: 100, width: 350, on: {
                        onChange: function () {
                            if (OnClearSet == "0") fnStoreToSpread(Md_Mem);
                        },
                    }
                },
            ]
         },},
         {view: "fieldset", label: "Staff", id: "fmStaff", width: 400,  body: {
                 rows: [
                     {
                         view: "search", id: "txtStaff_Nm", label: "Staff", labelWidth: 100,readonly:true, width: 300, on: {
                             onChange: function () {
                                 if (OnClearSet == "0") fnStoreToSpread(Md_Staff);
                             },
                             onSearchIconClick: function () {
                                 fnBtnStaffSrchClick();
                             }                             
                         }
                     },
                     {
                         view: "textarea", id: "txtStaff_Narr", label: "Narration",attributes: { maxlength: 60 }, labelWidth: 100, width: 350, on: {
                             onChange: function () {
                                 if (OnClearSet == "0") fnStoreToSpread(Md_Staff);
                             },
                         }
                     },
                 ]
             },
         },

         {view: "fieldset", label: "Void", id: "fmVoid", width: 400,  body: {
                 rows: [
                     {
                         view: "textarea", id: "txtVoid_Narr", label: "Narration",attributes: { maxlength: 60 }, labelWidth: 100, width: 350, on: {
                             onChange: function () {
                                 if (OnClearSet == "0") fnStoreToSpread(Md_Void);
                             },
                         }
                     },
                 ]
             },
         },

         {
             view: "fieldset", label: "Foreign Exchange", width: 400, id: "fmFExch",  body: {
                rows: [
                     {
                         view: "text", id: "txtFEX_Vouch", label: "Vouch #", labelWidth: 100,attributes: { maxlength: 6 }, width: 300, inputAlign: "right", on: {
                             onChange: function () {
                                 debugger;                                 
                                 if (OnClearSet == "0") fnStoreToSpread(Md_Forn);

                             },
                             "onKeyPress": function (code, e) { return fnNumericText(code, e, this.getValue()); } 
                         }
                     },
                     {
                         view: "richselect", label: "Currency", id: "ddlCurr", labelWidth: 100, width: 300, on: {
                             onChange: function () {
                                 debugger;
                                 fnddlCurrChange();
                                 if (OnClearSet == "0") fnStoreToSpread(Md_Forn);
                             },
                         }
                     },
                     {
                         cols: [{
                             view: "text", id: "txtFEX_ConvRate", label: "Conv.Rate", readonly: true,format: "11.00", inputAlign: "right", labelWidth: 100, width: 200, on: {
                                 onChange: function () {
                                     if (OnClearSet == "0") fnStoreToSpread(Md_Forn);
                                 },
                             }
                         }, {
                             view: "text", id: "txtEqvAmt", label: "Equivalent Amt", readonly: true,format: "11.00", inputAlign: "right", labelWidth: 100, width: 200, on: {
                                 onChange: function () {
                                     if (OnClearSet == "0") fnStoreToSpread(Md_Forn);
                                 },
                             },                                                          
                         }]
                     },
                     {
                         cols: [{
                             view: "text", id: "txtFEX_FornAmt", label: "Forn Amt", labelWidth: 100,attributes: { maxlength: 12 }, inputAlign: "right",format: "11.00", width: 200, on: {
                                 onChange: function () {
                                     if (OnClearSet == "0") fnStoreToSpread(Md_Forn);
                                 },
                                 "onTimedKeyPress": function (code, e) { fnFExFrnAmtChange() },
                                 "onKeyPress": function (code, e) { return fnFloatText(code, e, this.getValue()); } 
                             }
                         }, {
                             view: "text", id: "txtCurno", label: "Currency No.", labelWidth: 100, width: 200, on: {
                                 onChange: function () {
                                     if (OnClearSet == "0") fnStoreToSpread(Md_Forn);
                                 },

                             }
                         }]
                     },
                     {
                         cols: [{
                             view: "text", id: "txtFEX_BaseValue", label: "Base Amt", readonly: true, inputAlign: "right",format: "11.00", labelWidth: 100, width: 200, on: {
                                 onChange: function () {
                                     if (OnClearSet == "0") fnStoreToSpread(Md_Forn);
                                 },  
                                 
                             }
                         }, {
                             view: "text", id: "txtFEX_ExtrAmt", label: "Excess Amt", readonly: true,format: "11.00", inputAlign: "right", labelWidth: 100, width: 200, on: {
                                 onChange: function () {
                                     if (OnClearSet == "0") fnStoreToSpread(Md_Forn);
                                 }, 
                                 
                             }
                         }]
                     },
                 ]
             },
         },

         {
             view: "fieldset", label: "PayBill", width: 400, id: "fmPayBill",  body: {
                 rows: [
                     {
                         view: "search", id: "txtPB_Company", label: "Pay Bill Company", labelWidth: 110, readonly: true, width: 300, on: {
                             onChange: function () {
                                 debugger;                                 
                                 if (OnClearSet == "0") fnStoreToSpread(Md_PayBill);
                             },
                             onSearchIconClick: function () {
                                 fnBtnPBCompSrchClick();
                             },                             
                         }
                     },
                     {
                         view: "text", id: "txtPB_TrnID", label: "Transaction ID", labelWidth: 110,attributes: { maxlength: 10 }, width: 250, on: {
                             onChange: function () {
                                 debugger;                                 
                                 if (OnClearSet == "0") fnStoreToSpread(Md_PayBill);
                             },
                         }
                     },
                     {
                         view: "datepicker", id: "scDepDt", label: "Deposit Date", labelWidth: 110, width: 250, format: "%d/%m/%Y", stringResult: true, on: {
                             onChange: function () {
                                 debugger;                                 
                                 if (OnClearSet == "0") fnStoreToSpread(Md_PayBill);
                             },
                         }
                     },
                     {
                         view: "text", id: "txtPB_Mob", label: "Mobile No", labelWidth: 110,attributes: { maxlength: 16 }, width: 250, on: {
                             onChange: function () {
                                 debugger;                                 
                                 if (OnClearSet == "0") fnStoreToSpread(Md_PayBill);
                             },
                         }
                     },
                     {
                         view: "text", id: "txtPB_Depstr", label: "Depositor", labelWidth: 110,attributes: { maxlength: 40 }, width: 300, on: {
                             onChange: function () {                                 
                                 if (OnClearSet == "0") fnStoreToSpread(Md_PayBill);
                             },
                         }
                     },
                 ]
             },
         },

         {
             view: "fieldset", label: "Cancel Reason", id: "fmCancel", width: 400,  body: {
                 rows: [
                     { view: "text", id: "txtCancReason", label: "", width: 350, },
                 ]
             },
         },

         {
             view: "fieldset", label: "Funds Transfer", width: 400, id: "fmFund",  body: {
                 rows: [
                     {
                         view: "text", id: "txtBankNm", label: "Bank Name", labelWidth: 100, attributes: { maxlength: 30 }, width: 300, on: {
                             onChange: function () {                                
                                 if (OnClearSet == "0") fnStoreToSpread(Md_FundsTransf);
                             },
                         }
                     },
                     {
                         view: "text", id: "txtBankAcNo", label: "A/C No.", labelWidth: 100,attributes: { maxlength: 20 }, width: 300, on: {
                             onChange: function () {                                 
                                 if (OnClearSet == "0") fnStoreToSpread(Md_FundsTransf);
                             },
                         }
                     },
                     {
                         view: "datepicker", id: "scDepositDt", label: "Deposit Dt", labelWidth: 100, width: 250, format: "%d/%m/%Y", stringResult: true, on: {
                             onChange: function () {                                 
                                 if (OnClearSet == "0") fnStoreToSpread(Md_FundsTransf);
                             },
                         }
                     },
                 ]
             },
         },

         {
             view: "fieldset", label: "Credit Coupon", id: "fmCCoupon", width: 400,  body: {
                 rows: [
                     {
                         view: "richselect", label: "Credit Coupon", id: "ddlCCoupon", labelWidth: 100, width: 300, on: {
                             onChange: function (newVal, OldVal) {                                 
                                 if (OnClearSet == "0") fnStoreToSpread(Md_CCoupon);
                             }
                         }
                     },
                     {
                         view: "search", id: "txtC_CouponNo", label: "Coupon No.",readonly:true, labelWidth: 100, width: 300, on: {                             
                             onSearchIconClick: function () {
                                 fnBtnCCSrchClick();
                             },
                             onChange: function () {                                 
                                 if (OnClearSet == "0") fnStoreToSpread(Md_CCoupon);
                             },
                         }
                     },
                     
                 ]
             },
         },

         {
             view: "fieldset", label: "Temp Folio", id: "fmPayMaster", width: 400,  body: {
                 rows: [
                     {
                         cols: [{
                             view: "text", id: "txtPmNo", label: "Folio No", labelWidth: 100, width: 200, readonly: true,
                                 on: {
                                     onChange: function () {                                         
                                         if (OnClearSet == "0") fnStoreToSpread(Md_Pay);
                                     },
                                 }
                             },
                             {
                                 view: "search", id: "txtPmNm", labelWidth: 0, width: 200,readonly:true,
                                 on: {
                                     onSearchIconClick: function () {
                                         debugger;
                                         fnBtnPayMatClick();
                                     },
                                     onChange: function () {                                         
                                         if (OnClearSet == "0") fnStoreToSpread(Md_Pay);
                                     },
                                 }
                             },
                         ]
                     },
                     {
                         view: "text", id: "txtPmNarr", label: "Narration", labelWidth: 100, width: 400,attributes: { maxlength: 20 },
                         on: {
                             onChange: function () {                                 
                                 if (OnClearSet == "0") fnStoreToSpread(Md_Pay);
                             },
                         }
                     },
                 ]
             },
         },

        ]
    });

    webix.ui({ view: "text", id: "txtTaxes", hidden: true });
    webix.ui({ view: "text", id: "txtDisc", hidden: true });
    webix.ui({ view: "text", id: "txtBillValue", hidden: true });   
    

};
var GridDesign = function () {
    var Trashicon = "<span class='fa fa-trash ' ></span>";
    webix.ui({
        id: "gridSettle",
        container: "divSettleGrid",
        select: 'row',
        view: "datatable",
        rowLineHeight: 23,
        autoConfig: true,        
        footer: true,
        editable: true,        
        height: 150,
        position: "flex",
        //scroll: "auto",
        css: "webix_header_border",
        data: [],
        columns: [
                {
                    id: "ixModeCombo",  editor: "richselect", header: { text: " Settle Mode", }, fillspace: true, css: { 'text-align': 'left ! important', }, footer: ["Balance Amount" ],
                    template: function (obj, common, val, config) {
                        //debugger;
                        if (val != "" && val != null) {
                            var data = config.collection;
                            var newData = data.filter(function (el) {
                                return el.id == val;
                            });
                            if (newData.length > 0) return newData[0].value + "<span style='float:right;font-size:30px' class='webix_input_icon wxi-menu-down'></span>";
                            else return "<span style='float:right;font-size:30px' class='webix_input_icon wxi-menu-down'></span>";
                        }
                        else return "<span style='float:right;font-size:30px' class='webix_input_icon wxi-menu-down'></span>";
                    },
                },
                {
                    id: "ixAmt", header: 'Amount', width: 120, css: { 'text-align': 'right ! important;', }, editor: "text", liveEdit: true, editaction: "dblclick",
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                    editParse: function (value) {
                        return webix.Number.parse(value, webix.i18n);
                    },
                    editFormat: function (value) {                        
                        return fnCurrFormat(value);
                    },
                    footer: { content: 'totalColumn', columns: ["ixAmt"] },
                    
                },
                {
                    id: "ixTips", header: 'Tips', width: 90, css: { 'text-align': 'right ! important;', }, editor: "text", liveEdit: true, editaction: "dblclick",
                    format: function (value) {
                        return fnCurrFormat(value);
                    },
                    editParse: function (value) {
                        return webix.Number.parse(value, webix.i18n);
                    },
                    editFormat: function (value) {                        
                        return fnCurrFormat(value);
                    },
                },
                { id: "ixRemBut", header: '', width: 30, template: Trashicon, },
                { id: "ixRevId", header: 'RevId', hidden: true, },
                { id: "ixExtrAmt", header: 'Extra Amt', hidden: true, },
                { id: "ixPartyTyId", header: 'Party Type Id', hidden: true, },
                { id: "ixPartyId", header: 'Party Id', hidden: true, },
                { id: "ixRoomNo", header: 'Room No', hidden: true, },
                { id: "ixChqNo", header: 'Cheque No', hidden: true, },
                { id: "ixBankNm", header: 'Bank Name', hidden: true, },
                { id: "ixVouchNo", header: 'Voucher No', hidden: true, },
                { id: "ixNarr", header: 'Narration', hidden: true, },
                { id: "ixTrnsRoom", header: 'Trans Room', hidden: true, },
                { id: "ixTrnsReg", header: 'Trans Reg', hidden: true, },
                { id: "ixcurid", header: 'CurId', hidden: true, },
                { id: "ixFornAmt", header: 'ForignAmt', hidden: true, },
                { id: "ixConvRate", header: 'ConvRt', hidden: true, },
                { id: "ixCCInd", header: 'CCInd', hidden: true, },
                { id: "ixPartyNm", header: 'PartyNm', hidden: true, },
                { id: "ixSetlModeId", header: 'SettleModeId', hidden: true, },
                { id: "ixCurno", header: 'CurrNo', hidden: true, },
                { id: "ixcashcard", header: 'CardNo', hidden: true, },
                { id: "ixcashcardnm", header: 'SessionId', hidden: true, },
                { id: "ixNarr1", header: 'Narr1', hidden: true, },
                
        ],
        data: [],

        on: {
            'onItemClick': function (id) {
                debugger;
                if (id.column == "ixRemBut") {
                    //fnVenBtnClick(id);
                    $$("gridSettle").remove(id.row);
                    var grid = $$("gridSettle").serialize();
                    if (grid.length == 0) fnAddRow();

                }
            },
            
            onAfterEditStart: function (id) {
                var getColumn = id.column;
                SettleSelectedColumn = getColumn;
                if (getColumn == "ixAmt" || getColumn == "ixTips") {
                    this.getEditor().getInputNode().setAttribute("maxlength", 14);
                    this.getEditor().getInputNode().style.textAlign = "right";
                }
            },

            onAfterEditStop: function (id,editor) {
                debugger;
                var getColumn = editor.column;
                if (getColumn == "ixModeCombo") {
                    if (id.value != id.old) {
                        fnSettleModeChange(editor.row);
                    }
                }
                if (getColumn == "ixAmt") {
                    fngridAmtChange()
                }
            },

            "onKeyPress": function (code, e) {
                debugger;
                var selRow = this.getSelectedItem();
                var rowid = selRow.id;                
                var charCode = e.which || e.keyCode;

                var LastRowId = this.getLastId();
                if (charCode == 40 && rowid == LastRowId) {
                    return fnKeyDownPress(rowid);                    
                }
                if (SettleSelectedColumn == "ixAmt" || SettleSelectedColumn == "ixTips") {
                    if (e.shiftKey == true) return false;
                    if (e.ctrlKey == true) return false;
                    if (charCode == 46 || charCode == 190 || charCode == 110 || charCode == 189 || charCode == 37 || charCode == 39) {
                        return true
                    }
                    if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }  


            },
            onSelectChange: function () {
                debugger;
                var SelId = $$("gridSettle").getSelectedId(false);
                if (SelId != undefined) {
                    var RowId = SelId.row;
                    var SelRow = $$("gridSettle").getItem(RowId);
                    var SettleMode = SelRow.ixModeCombo;
                    OnClearSet = "1";
                    fnDisDet(SettleMode);
                    if (SettleMode != "") {
                        fnGetFromSpread(RowId,SettleMode)
                    }
                    OnClearSet = "0";
                }

            },
                        
            'onBeforeEditStart': function (id) {
                //debugger;
                var row = this.getItem(id.row);
                var col = this.getColumnConfig(id.column);
                var SettleModes = $$("gridSettleMode").serialize();
                col.collection = SettleModes;               
                

            },

            onBlur: function (prev_view) {
                this.editStop();
                this.refresh();
            },

            onBeforeClose: function () {
                return false;
            },

        }
    });

    webix.ui({
        id: "gridSettleMode",        
        view: "datatable",
        fixedRowHeight: false,
        data: [],
        hidden: true,
        columns: [
                { id: "value", header: "SM_NM", },
                { id: "id", header: "SM_ID", },
                { id: "REVENUE_ID", header: "REVENUE_ID", },
                { id: "PARTY_TY_ID", header: "PARTY_TY_ID", },
        ],
        data: [],

    });
    webix.ui({
        id: "gridCurr",
        container: "divCurr",
        view: "datatable",
        fixedRowHeight: false,
        data: [],
        hidden: true,
        columns: [
                { id: "id", header: "CURRID", },
                { id: "value", header: "CURRNM", },
                { id: "SHRT_NM", header: "SHRT_NM", },
                { id: "SALE_CONV_RATE", header: "SALE_CONV_RATE", },
                { id: "VAL_DECIM_LIMIT", header: "VAL_DECIM_LIMIT", },
                
        ],
        data: [],

    });

    webix.ui({
        id: "gridCCoupTp",
        container: "divCurr",
        view: "datatable",
        fixedRowHeight: false,
        data: [],
        hidden: true,
        columns: [
                { id: "id", header: "CID", },
                { id: "value", header: "CNM", },
                { id: "BAL_IND", header: "BAL_IND", },
                { id: "C_IND", header: "C_IND", },                

        ],
        data: [],

    });


    
};
var fnLoadCur = function (CompId) {
    debugger;
    Request = {
        REQ_NM: "FNLOADCUR",
        COMPID: CompId,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnLoadFoTarCur = function (CompId) {
    debugger;
    Request = {
        REQ_NM: "FNLOADFOTARCUR",
        COMPID: CompId,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var LoadInds = function (CompId) {
    debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = CompId;
    reqobj["REQ_NM"] = "FNGETLOADCONT";
    var dataparam = JSON.stringify(reqobj);

    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            var Detemp = JSON.parse(d);
                                    
            
            window.BASE_CURRENCY = Detemp.RA[0].BASE_CURRENCY_ID.toString().trim();
            window.CURR_DT = Detemp.RA[0].CURDT1;
            window.ST_IND = Detemp.RA[0].ST_IND
            window.ST_AMT = Detemp.RA[0].ST_AMT;
            window.ST_MAD = Detemp.RA[0].ST_MAD;
            window.M_TAX = Detemp.RA[0].M_TAX;
            window.CPN_MOD_RES = Detemp.RA[0].CPN_MOD_RES; 
            window.CCInd = Detemp.RA[0].C6_IND;  
            
            window.CURRENCY_FORMAT = Detemp.RA[0].CURRENCY_FORMAT;
            window.CURRENCY_DELIMIT = Detemp.RA[0].CURRENCY_DELIMIT;
            window.CURRENCY_DECIMLIMIT = Detemp.RA[0].VAL_DECIM_LIMIT;
            window.Usr_log_ind= Detemp.RA[0].R4_ID;

            window.W2_IND = Detemp.RA3[0].W2_IND;
            window.TaxBiAppl = Detemp.RA3[0].L4_IND;
            window.RevenueWisePostAppl = Detemp.RA3[0].M4_IND; 
            window.oprIntrfAppl = Detemp.RA3[0].O3_IND;
            window.oprIntrfTaxExcl = Detemp.RA3[0].N4_IND;
            window.Curappl = Detemp.RA3[0].P_IND;
            window.SMSAppl = Detemp.RA3[0].N3_IND;
            window.CoupID = Detemp.RA3[0].COUP_ID.toString().trim();            
            window.BN_OUTLET_ID = Detemp.RA3[0].BN_OUTLET_ID.toString().trim(); 
            
            

            //var AccDate = Detemp.RA2[0].CUR_DT;
            //window.AccDt=AccDate;
            //var AccDatePic = $("#dateAccount").data("kendoDatePicker");
            //AccDatePic.value(AccDate);

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });

    debugger;
    var MemCont = [];
    MemCont = fnLoadMembCont(CompId);
    if (MemCont != null && MemCont != undefined && MemCont != "") {
        MembCrVal = MemCont[0].L1_IND;
        if (MemCont[0].K1_IND == "0"){
            splinstr = 1;
        }
        CreditAuthorz = MemCont[0].U1_IND;
        SmsBillAlert = MemCont[0].BILL_SMS_IND;
        N2_ind = MemCont[0].N2_IND;
    }

    var FoCont = [];
    FoCont = fnLoadFoCont(CompId);
    if (FoCont != null && FoCont != undefined && FoCont != "") {
        Forn_Tariff_Appl_Ind = FoCont[0].FORN_TARIFF_APPL_IND;
    }
    var PSCont = [];
    PSCont = fnLoadPSCont(CompId);
    if (PSCont != null && PSCont != undefined && PSCont != "") {
        Memb_Update_Ind = PSCont[0].MEMB_UPDATE_IND;        
    }
    
    if (window.CCInd  != 0)
    {
        $$("txtCC_CardNo").config.attributes.maxlength = 4;        
        if (window.CCInd == 1) {            
            $$("scCCExpDt").hide();            
            $$("txtCCAuthNo").hide();
        }
    }


};
var AccDtLoad = function (CompId) {
    debugger;
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["REQ_NM"] = "FNACCOUNTDT";
    var dataparam = JSON.stringify(reqobj);
    var Detemp = [];
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            Detemp = JSON.parse(d);

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return Detemp;

};
var fnGetApplUser = function (CompId) {
    debugger;
    Request = {
        REQ_NM: "FNGETAPPLUSER",
        COMPID: CompId,
        PRGRMLNKID: "BQMNUCASBILLSETT"
    }

    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData == "0") rowData = "1";
                else rowData = "0";
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnIsValidDt = function () {
    debugger;
    if ($$("txtBillDt").getValue() == "") {
        webix.message({ type: 'warning', text: 'Bill Date cannot be empty' });
        webix.UIManager.setFocus($$("txtBillDt"));
        return false;
    }

    var vBillDt = $$("txtBillDt").getValue();

    CompId = $$("Property").getValue();

    var vAccLd = AccDtLoad(CompId);
    var vAccDt = vAccLd.Acc_Dt103;
    vAccDt = formatDate(vAccDt);
    vAccDt = vAccDt.replace("-", "");
    vAccDt = vAccDt.replace("-", "");
    vAccDt = parseFloat(vAccDt);

    vBillDt = formatDate(vBillDt);
    vBillDt = vBillDt.replace("-", "");
    vBillDt = vBillDt.replace("-", "");
    vBillDt = parseFloat(vBillDt);

    if (vBillDt < vAccDt) {
        webix.message({ type: 'warning', text: 'Night Audit Started. Please Reload the screen.' });
        return false
    }
    return true;
};
var formatDate = function (StrDt) {
    debugger;
    var Parts = StrDt.split("/");
    var Dt = Parts[0];
    var Mn = Parts[1];
    var Yr = Parts[2];
    var Str = Yr + "-" + Mn + "-" + Dt;
    return Str;
};
var fnLoadBnOutletRevId = function (CompId) {
    debugger;
    Request = {
        REQ_NM: "FNLOADBNOUTLETREVID",
        COMPID: CompId,
        BN_OUTLET_ID: window.BN_OUTLET_ID,
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                window.Bn_Out_Rev_Id = rowData.Bn_Out_Rev_Id;
                window.Bn_Outlet_nm = rowData.Bn_Outlet_nm;
                window.Bn_Out_Rev_Nm = rowData.Bn_Out_Rev_Nm;
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;

};
var fnLoadSettleModes = function (CompId) {
    debugger;
    $$("gridSettleMode").clearAll();
    Request = {
        REQ_NM: "FNLOADSETTLEMODES",
        COMPID: CompId,        
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                $$("gridSettleMode").parse(rowData);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;

};
var fnBillSrchBtnClick = function (RowId) {
    debugger;
    //var bVal = fnIsValidDt();
    //if (bVal == false) return;
    if (fnChkSessVal() == false) return;
    fnClearCont();   

    var vCompId = $$("Property").getValue();
    var ACC_DT = $$("txtBillDt").getValue();
    var vData = BillSrchLoadData(vCompId,ACC_DT,"1");
    $$("BillSrchPop").show();

};
var fnRefresh = function () {
    if (fnChkSessVal() == false) return;
    fnClearCont();
}
var fnClearCont = function () {
    debugger;    
    window.Ret_Dummy_Bill_No = ""; window.Ret_Original_Bill_No = ""; window.Ret_Guest_Nm = "";  window.Ret_Guest_Type = "";
    window.Ret_Guest_Id = ""; window.Ret_Reserve_No = ""; window.Ret_ResBlk_Ind = "";
    chkFinalBill = "0"; Cash_Appl = "0"; CC_Appl = "0"; Com_Appl = "0"; Room_Appl = "0"; Cheque_Appl = "0"; Staff_Appl = "0";
    Compli_Appl="0"; FExch_Appl ="0"; Mem_Appl ="0"; Void_Appl ="0"; Cur_Comp_Id =""; Cur_CC_Comp_Id="";
    Cur_Staff_Id =""; Cur_Mem_Id =""; Cur_Room_No =""; Cur_Reg_No ="";  From_Room_No="";   C_Reg_Ty = "";AuthDesc="";
    Covers = ""; SSesid = ""; Ret_GSNo = ""; BillLoadedTime = ""; SettleSelectedColumn = ""; OnClearSet = "0"; AuthUSer = "";
    Cur_Eemp_Id = ""; PB_Company_Id = ""; gTotPaidAmt = 0; Current_Mode = "";
    $$("txtCur").hide(); $$("txtFAmt").hide();$$("txtCur").setValue("");$$("txtFAmt").setValue(""); $$("txtBillAmt").setValue("0");
    $$("txtTaxes").setValue(""); $$("txtDisc").setValue(""); $$("txtBillValue").setValue(""); $$("txtLessAdv").setValue("0");
    $$("txtPaidOut").setValue(0);$$("txtPayableAmt").setValue("0"); $$("txtGuestNm").setValue(""); $$("txtGuestTy").setValue("");
    $$("txtBlockType").setValue("");$$("txtResNo").setValue(""); $$("txtBillNo").setValue(""); $$("gridSettle").clearAll();
    $$("txtPANNo").setValue(""); $$("txtPANNo").hide(); $$("ChkCloseRes").setValue(0); $$("txtBillInstr").setValue("");
    document.getElementById("btnSave").disabled = true;
    document.getElementById("btnCancel").disabled = true;
    document.getElementById("btnSettle").disabled = true;
    document.getElementById("btnAddRow").disabled = true;
    $$("gridSettle").disable();
    fnDisableAllMode();
    fnAddRow();   

};
var fnAddRow = function () {
    debugger;
    var set = {};
    set = {
        ixModeCombo: "", ixAmt: "", ixTips: "", ixRevId: "", ixExtrAmt: "", ixPartyTyId: "", ixPartyId: "", ixcashcard: "",
        ixRoomNo: "", ixChqNo: "", ixBankNm: "", ixVouchNo: "", ixNarr: "", ixTrnsRoom: "",ixTrnsReg:"",ixcurid: "",
        ixFornAmt: "", ixConvRate: "", ixCCInd: "", ixPartyNm: "", ixSetlModeId: "",ixCurno:"",ixcashcardnm:"",ixNarr1:"",
    };
    $$("gridSettle").add(set);
    $$("gridSettle").select($$("gridSettle").getLastId());
    $$("gridSettle").refresh();
    webix.UIManager.setFocus($$("gridSettle"));

};
var BillSrchWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "BillSrchPop",
        head: " Bill Search",
        position: "center",
        css: "WebIxStyle",
        height: 400,
        width: 580,
        move: true,
        body: {
            rows: [
                {
                    view: "datatable",
                    id: "gridBillSrch",
                    select: 'row',                    
                    css: "webix_header_border",                    
                    columns: [
                            { id: "ixDummyBillNo", header: ['Bill No',{ content: "textFilter" }], width: 70, css: { 'text-align': 'center ! important' }, },
                            { id: "ixGuestNm", header: ['Guest',{ content: "textFilter" }], css: { 'text-align': 'left ! important' },fillspace:true, },
                            {
                                id: "ixBillAmt", header: ['Amount', { content: "textFilter",css:"AlignRight"}], width: 100, css: { 'text-align': 'right ! important' },
                                format: function (value) {
                                    return fnCurrFormat(value);
                                },
                            },
                            { id: "ixVenueNm", header: 'Venue', width: 150, css: { 'text-align': 'left ! important' }, },
                            { id: "ixOrigBillNo", header: 'OrgBillNo', hidden: true },                            
                            { id: "ixGuestType", header: 'Guest Type', hidden: true },
                            { id: "ixGuestId", header: 'GuestId', hidden: true },
                            { id: "ixReserveNo", header: 'ResNo', hidden: true },
                            { id: "ixResBlkInd", header: 'ResBkId', hidden: true },
                    ],
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            debugger;
                            $$("BillSrchPop").hide();
                            BillSrchRet(id);                            
                        },
                    },
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
                                inputWidth: 80,
                                click: function () {
                                    if ($$("gridBillSrch").count()) {
                                        var selRow = $$("gridBillSrch").getSelectedItem();
                                        var id = selRow.id;
                                        BillSrchRet(id);
                                    }
                                    $$("BillSrchPop").hide();
                                },
                                align: "right"
                            }
                    ]
                }
            ],
        }
    });
};
var BillSrchLoadData = function (CompId,ACC_DT, PAGEIND) {
    debugger;
    $$("gridBillSrch").clearAll();
    $$("gridBillSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";					
        }
    });
    Request = {
        REQ_NM: "FNLOADPENDBILL",
        COMPID: CompId,
        ACC_DT: ACC_DT,
        PAGEIND: PAGEIND,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                $$("gridBillSrch").parse(rowData);
                $$("gridBillSrch").refresh();
                if ($$("gridBillSrch").count()) {
                    $$("gridBillSrch").select($$("gridBillSrch").getFirstId());
                }
                webix.UIManager.setFocus($$("gridBillSrch"));
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });    
};
var BillSrchRet = function (RowId) {
    var selRow = $$("gridBillSrch").getItem(RowId);
    var R_DummyBill_No = selRow.ixDummyBillNo;
    var R_OrigBill_No = selRow.ixOrigBillNo;
    var R_Guest_Nm = selRow.ixGuestNm;
    var R_Guest_Type = selRow.ixGuestType;
    var R_Guest_Id = selRow.ixGuestId;
    var R_Reserve_No = selRow.ixReserveNo;
    var R_ResBlk_Ind = selRow.ixResBlkInd;
    fnloadBillDet(R_DummyBill_No, R_OrigBill_No, R_Guest_Nm, R_Guest_Type, R_Guest_Id, R_Reserve_No, R_ResBlk_Ind);

    

}
function CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal) {
    //debugger;
    if (value == null || value == undefined) return "";
    if (isNaN(value)) return "";

    if (value.toString() != "") {
        if (Currfrmt == "L") {
            var x = parseFloat(value).toFixed(CurrDecimal);
            var neg = false;
            if (value < 0) {
                neg = true;
                //x = math.abs(x);
            }
            x = x.toString();
            var afterPoint = '';
            if (x.indexOf('.') > 0) {
                ////afterPoint = x.substring(x.indexOf('.') + 1, x.length);
                ////afterPoint = CurrDelimit + afterPoint
                var vArr = x.split('.');
                x = vArr[0].toString().trim();
                afterPoint = vArr[1].toString().trim();
                afterPoint = CurrDelimit + afterPoint
            }
            //x = Math.floor(x);                   

            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '' && otherNumbers != '-')
                lastThree = ',' + lastThree;
            if (afterPoint != "") return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
            else return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        }
        else {
            var x = parseFloat(value).toFixed(CurrDecimal);
            var neg = false;
            if (value < 0) {
                neg = true;
                //x = math.abs(x);
            }

            x = x.toString();

            //var res = x.replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,")  //+ afterPoint;
            //var res = x.replace(/(\d{3})/g, "1,")
            var res = x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

            if (res.indexOf('.') > 0) {

                res = res.replace(".", CurrDelimit)
            }


            return res;
        }
    }
    else {
        return value;
    }
};
function fnCurrFormat(value) {

    var Currfrmt = window.CURRENCY_FORMAT;
    var CurrDelimit = window.CURRENCY_DELIMIT;
    var CurrDecimal = window.CURRENCY_DECIMLIMIT;
    return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);

};
var CloseResWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "CloseResPop",
        head: "Close Resevation",
        position: "center",
        css: "WebIxStyle",
        height: 200,
        width: 350,
        move: true,
        body: {
            rows: [
                
                {
                    padding:{left:10,right:10,top:10},
                    rows: [
                        { view: "checkbox", id: "ChkCloseRes", labelWidth: 150, label: "Close the Reservation", customCheckbox: false, },                        
                    ],
                },
                {
                    margin: 10,
                    padding: { top: 5, bottom: 5, right: 5 },
                    cols: [{
                        view: "button", type: "icon", icon: "wxi-check", label: "Ok", inputWidth: 80, click: function () {
                            $$("CloseResPop").hide();
                            if ($$("ChkCloseRes").getValue() == 1) chkFinalBill = "1";
                            else chkFinalBill = "0";
                        }, align: "right"
                    }
                    ]
                },

            ],
        }
    });
};
var fnEnableFinal = function (Ret_ResBlk_Ind,Ret_Reserve_No) {
    debugger;
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNENABLEFINAL",
        COMPID: CompId,
        Ret_Reserve_No: Ret_Reserve_No,
        Ret_ResBlk_Ind:Ret_ResBlk_Ind
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (!rowData) rowData = "0";                
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            return false;
        }
    });
    return true;

}
var fnloadBillDet = function (R_DummyBill_No, R_OrigBill_No, R_Guest_Nm, R_Guest_Type, R_Guest_Id, R_Reserve_No, R_ResBlk_Ind) {
    debugger;
    window.Ret_Dummy_Bill_No = R_DummyBill_No;
    window.Ret_Original_Bill_No = R_OrigBill_No;
    window.Ret_Guest_Nm = R_Guest_Nm;
    window.Ret_Guest_Type = R_Guest_Type;
    window.Ret_Guest_Id = R_Guest_Id;
    window.Ret_Reserve_No = R_Reserve_No;
    window.Ret_ResBlk_Ind = R_ResBlk_Ind;

    $$("txtGuestNm").setValue(R_Guest_Nm);
    $$("txtGuestTy").setValue(R_Guest_Type);

    
    switch (R_Guest_Type) {
        case "G":
            $$("txtGuestTy").setValue("Guest");
            break;
        case "C":                
            $$("txtGuestTy").setValue("Company");
            break;
        case "O":                
            $$("txtGuestTy").setValue("Individual");
            break;
    case "M":
            $$("txtGuestTy").setValue("Member");                
            break;
        default:
            $$("txtGuestTy").setValue("");
    }
    switch (R_ResBlk_Ind) {
        case "R":
            $$("txtBlockType").setValue("Reservation");
            break;
        case "2":                
            $$("txtBlockType").setValue("Blocked");
            break;                      
        
        default:
            $$("txtBlockType").setValue("");
    } 
    
    fnLoadBillInstruction(R_Reserve_No);
    $$("txtBillNo").setValue(R_DummyBill_No);
    $$("txtResNo").setValue(R_Reserve_No);
    
    fnLoadBillInfo(R_DummyBill_No, R_OrigBill_No, R_Guest_Nm, R_Guest_Type, R_Guest_Id, R_Reserve_No, R_ResBlk_Ind);

    document.getElementById("btnSettle").disabled = false;
    chkFinalBill = "0";
    var AllowFin = fnEnableFinal(R_ResBlk_Ind, R_Reserve_No);
    if (AllowFin == "1") {
        $$("CloseResPop").show();
    }
    debugger;
    if (window.Allow_canc=="1")
        document.getElementById("btnCancel").disabled = true;
    else
        document.getElementById("btnCancel").disabled = false;

};
var fnLoadBillInfo = function (R_DummyBill_No, R_OrigBill_No, R_Guest_Nm, R_Guest_Type, R_Guest_Id, R_Reserve_No, R_ResBlk_Ind) {
    debugger;
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNLOADBILLINFO",
        COMPID: CompId,
        Ret_Orig_BillNo: R_OrigBill_No,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                Ret_GSNo = rowData[0]["gs_bill"].toString().trim();
                BillLoadedTime = rowData[0]["Update_Dt"].toString().trim();
                var T_Bill_Amt = parseFloat(rowData[0]["Bill_Amt"].toString().trim());
                $$("txtBillAmt").setValue(T_Bill_Amt);
                $$("txtTaxes").setValue(rowData[0]["taxes"].toString().trim());
                $$("txtDisc").setValue(rowData[0]["disc_amt"].toString().trim());
                $$("txtBillValue").setValue(rowData[0]["bill_val"].toString().trim());
                Covers = rowData[0]["c_no"].toString().trim();
                SSesid = rowData[0]["s_id"].toString().trim();
                var PaidOut = parseFloat(rowData[0]["Adj_PaidOut_Amt"].toString().trim());
                var LessAdv = parseFloat(rowData[0]["Adj_Adv_Amt"].toString().trim());
                $$("txtLessAdv").setValue(LessAdv);
                $$("txtPaidOut").setValue(PaidOut);
                var Total_Bal_Amt = T_Bill_Amt + PaidOut - LessAdv;
                $$("txtPayableAmt").setValue(Total_Bal_Amt);

                var SelRowId = $$("gridSettle").getFirstId();
                var SelRow = $$("gridSettle").getItem(SelRowId);
                SelRow.ixAmt = "0";
                $$("gridSettle").updateItem(SelRowId, SelRow);
                $$("gridSettle").refresh();

                var vFornCur = rowData[0]["forn_cur"].toString().trim();
                if (vFornCur != "" && window.Curappl == "1") {
                    $$("txtCur").show();
                    $$("txtFAmt").show();
                    $$("txtCur").setValue(rowData[0]["forn_cur"].toString().trim());
                    $$("txtFAmt").setValue(parseFloat(rowData[0]["forn_amt"].toString().trim()));
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
};
var fnLoadBillInstruction = function (R_Reserve_No) {
    $$("txtBillInstr").hide();
    $$("txtBillInstr").setValue("");
    $("#divBillInstr").hide();
    debugger;
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNLOADBILLINSTRUCTION",
        COMPID: CompId,
        Ret_Reserve_No: R_Reserve_No,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData != "") {
                    $$("txtBillInstr").setValue(rowData);                    
                    $("#divBillInstr").show();
                    $$("txtBillInstr").show();
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    
    
    return rowData;
};
var fnDisableAllMode = function () {
    debugger;
    $$("fmCash").hide()
    $$("fmcashcard").hide();
    $$("fmCreditCard").hide();
    $$("fmCompany").hide();
    $$("fmToRoom").hide();
    $$("fmCheque").hide();
    $$("fmStaff").hide();
    $$("fmCompli").hide();
    $$("fmFExch").hide();
    $$("fmMember").hide();
    $$("fmVoid").hide();
    $$("fmPayMaster").hide();
    $$("fmCCoupon").hide();
    $$("fmFund").hide();
    $$("fmPayBill").hide();
    $$("fmCancel").hide();
};
var fnDisDet = function (settleMde) {
    debugger;
    fnDisableAllMode();
    
    switch (settleMde) {
        case Md_Cash:
            $$("fmCash").show()
            $$("txtCash_Narr").setValue("");
            break;
        case Md_CashCard:
            $$("fmcashcard").show();
            $$("txtcashcardno").setValue("");
            $$("txtcashcardname").setValue("");
            $$("txtCash_CardFrom").setValue("");
            $$("txtCash_CardTo").setValue("");
            $$("txtCash_CardBalAmt").setValue("");
            break;
        case Md_Comp:
            $$("fmCompany").show();
            $$("txtComp_Comp").setValue();
            $$("txtComp_Narr").setValue();
            Cur_Comp_Id = "";
            break;
        case Md_CC:
            $$("fmCreditCard").show();
            $$("txtCC_CardNo").setValue("");
            $$("txtCC_Company").setValue("");
            $$("scCCExpDt").setValue("");
            $$("txtCCAuthNo").setValue("");
            
            Cur_CC_Comp_Id = "";
            break;
        case Md_ToRoom:
            $$("fmToRoom").show();
            $$("txtRoom_Guest").setValue();
            $$("txtRoom_No").setValue();
            Cur_Room_No = "";
            Cur_Reg_No = "";
            break;
        case Md_Chq:
            $$("fmCheque").show();
            $$("txtCHQ_Bank").setValue("");
            $$("txtCHQ_ChqNo").setValue("");
            $$("scChqDt").setValue("");
            $$("ddlCrCurr").setValue("");
            $$("txtCrCurrEq").setValue("");
            $$("txtconvrt").setValue("");
            $$("txtCrCurrEq").hide();
            $$("txtconvrt").hide();
            $$("txtCC_BaseValue").hide();
            $$("txtCC_ExtrAmt").hide();
            break;
        case Md_Mem:
            $$("fmMember").show();
            $$("txtMem_Nm").setValue("");
            $$("txtMem_Narr").setValue("");
            Cur_Mem_Id = "";
            break;
        case Md_CCoupon:
            $$("fmCCoupon").show();
            $$("txtC_CouponNo").setValue("");
            $$("ddlCCoupon").setValue("");
            break;
        case Md_Void:
            $$("fmVoid").show();
            $$("txtVoid_Narr").setValue();
            break;
        case Md_Staff:
            $$("fmStaff").show();
            $$("txtStaff_Nm").setValue("");
            $$("txtStaff_Narr").setValue("");
            Cur_Staff_Id = "";
            break;
        case Md_Compli:
            $$("fmCompli").show();
            $$("txtCompli_Narr").setValue("");
            break;
        case Md_PayBill:
            $$("fmPayBill").show();
            $$("txtPB_Company").setValue("");
            $$("txtPB_TrnID").setValue("");
            $$("scDepDt").setValue("");
            $$("txtPB_Mob").setValue("");
            $$("txtPB_Depstr").setValue("");
            break;
        case Md_FundsTransf:
            $$("fmFund").show();
            $$("txtBankNm").setValue("");
            $$("txtBankAcNo").setValue("");
            $$("scDepositDt").setValue("");
            break;
        case Md_Pay:
            $$("fmPayMaster").show();
            $$("txtPmNm").setValue("");
            $$("txtPmNarr").setValue("");
            $$("txtPmNo").setValue("");
            break;
        case Md_Forn:
            $$("fmFExch").show();            
            $$("txtFEX_ConvRate").setValue("");
            $$("ddlCurr").setValue("");
            $$("txtFEX_ExtrAmt").setValue("");
            $$("txtFEX_FornAmt").setValue("");
        default:
    }


};
var fnSettleModeChange = function (RowId) {
    debugger;
    var SelRow = $$("gridSettle").getItem(RowId);
    var SettleMode = SelRow.ixModeCombo;
    if (SettleMode == "V") {
        $$("gridSettle").clearAll();
        var set = {};
        set = {
            ixModeCombo: "V", ixAmt: "", ixTips: "", ixRevId: "", ixExtrAmt: "", ixPartyTyId: "", ixPartyId: "", ixcashcard: "",
            ixRoomNo: "", ixChqNo: "", ixBankNm: "", ixVouchNo: "", ixNarr: "", ixTrnsRoom: "", ixTrnsReg: "", ixcurid: "",
            ixFornAmt: "", ixConvRate: "", ixCCInd: "", ixPartyNm: "", ixSetlModeId: "", ixCurno: "", ixcashcardnm: ""
        };
        $$("gridSettle").add(set);
        $$("gridSettle").select($$("gridSettle").getFirstId());
        $$("gridSettle").refresh();

        RowId = $$("gridSettle").getFirstId();
        SelRow = $$("gridSettle").getItem(RowId);       
        
    }
    debugger;    
    SelRow.ixPartyId = "";
    SelRow.ixPartyTyId = "";
    SelRow.ixPartyNm = "";
    SelRow.ixRoomNo = "";
    SelRow.ixTrnsReg = "";
    SelRow.ixTrnsRoom = "";
    SelRow.ixVouchNo = "";
    SelRow.ixNarr = "";
    SelRow.ixChqNo = "";
    SelRow.ixBankNm = "";
    SelRow.ixcurid = "";
    SelRow.ixFornAmt = "";
    SelRow.ixConvRate = "";
    SelRow.ixCurno = "";
    SelRow.ixCCInd = "";
    SelRow.ixcashcard = "";
    SelRow.ixcashcardnm = "";
    $$("gridSettle").updateItem(RowId, SelRow);
    $$("gridSettle").refresh();    
    fnDisDet(SettleMode);
    
}
var fnChkValidCashCard = function (CARD_NO) {
    debugger;
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNCHKVALIDCASHCARD",
        COMPID: CompId,
        CARD_NO: CARD_NO,
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (!rowData) rowData = "";
                if (rowData != "") {
                    webix.message({ type: 'warning', text: rowData });
                    $$("gridSettle").select(RowId);
                    webix.UIManager.setFocus($$("gridSettle"));
                    return false;
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            return false;
        }
    });
    return true;
};
var fnGetCashCardDet = function (CARD_NO) {
    debugger;
    if (CARD_NO == "") return;
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNGETCASHCARDDET",
        COMPID: CompId,
        CARD_NO: CARD_NO,
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData != "") {
                    var A_Ind = "0";
                    var S_Dt = "";
                    var Expired = "0";
                    if (rowData[0].A_IND) A_Ind = rowData[0].A_IND.toString().trim();
                    if (rowData[0].S_Dt) S_Dt = rowData[0].S_Dt.toString().trim();
                    if (rowData[0].Expired) Expired = rowData[0].Expired.toString().trim();
                    if (A_Ind == "0") {
                        webix.message({ type: 'warning', text: "Inactive Cash Card" });                        
                        return false;
                    }

                    if (S_Dt == "") {
                        webix.message({ type: 'warning', text: "Inactive Cash Card" });                        
                        return false;
                    }
                    if (S_Dt == "") {
                        webix.message({ type: 'warning', text: "Inactive Cash Card" });                        
                        return false;
                    }
       
                    if (Expired == "1") {
                        webix.message({ type: 'warning', text: "Expired Cash Card" });                        
                        return false;
                    }
                    
                    $$("txtCash_CardFrom").setValue(S_Dt);
                    if(rowData[0]["E_Dt"]) $$("txtCash_CardTo").setValue(rowData[0]["E_Dt"].toString().trim());
                    if(rowData[0]["N_N"])$$("txtcashcardname").setValue(rowData[0]["N_N"].toString().trim()); 
                    var vAmt=fnGetCashCardAmt(CARD_NO);
                    $$("txtCash_CardBalAmt").setValue(vAmt);                    
                    fnStoreToSpread(Md_CashCard);
                }
                else
                {
                    webix.message({ type: 'warning', text: "Invalid Cash Card" });                        
                    return false;
                }
            }
            else
            {
                webix.message({ type: 'warning', text: "Invalid Cash Card" });                        
                return false;
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            return false;
        }
    });
    return true;
};
var fnGetCashCardAmt = function (CARD_NO) {
    debugger;
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNGETCASHCARDAMT",
        COMPID: CompId,
        CARD_NO: CARD_NO,
    }
    var rowData = 0;
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (!rowData) rowData = "";
                if (rowData == "") rowData = 0;
                rowData = parseFloat(rowData);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnValidCoupon = function () {
    var bVal = "1";
    var vData = $$("gridSettle").serialize();
    var newData = vData.filter(function (el) {
        return el.ixModeCombo == Md_CCoupon;
    });
    if (newData.length == 0) return true;

    var MembId = window.Ret_Guest_Id;
    var Membcat = 0;
    if (window.Ret_Guest_Type == "M") Membcat = 1;

    var rsTemp = [];
    var hash = {};
    for (var i = 0; i < newData.length; i++) {
        var PartyId = newData[i].ixPartyId;
        var Cno = newData[i].ixChqNo;
        var SetlAmount = newData[i].ixAmt;
        var tips = newData[i].ixTips;
        if (SetlAmount == "") SetlAmount = 0;
        if (tips == "") tips = 0;
        SetlAmount = parseFloat(SetlAmount);
        tips = parseFloat(tips);
        var vData = [];
        var t = 0;
        var fRow = 0;
        if (rsTemp.length > 0) {
            vData = rsTemp.filter(function (el) {
                return el.ixModeCombo == Md_CCoupon;
            });
        }
        if (vData.length == 0) {
            hash = {};
            hash = {
                cty: PartyId,
                cno: Cno,
                amt: SetlAmount + tips,
                sRow: t,
            }
            rsTemp.push(hash);
            t = t + 1;
        }
        else {
            fRow = vData[0].sRow;
            rsTemp[fRow].amt = rsTemp[fRow].amt + Val(SetlAmount) + Val(tips)
        }
    }
    bVal = "1";
    if (rsTemp.length > 0) {
        for (var j = 0; j < rsTemp.length; j++) {
            var vCTY = rsTemp[j].cty;
            var vCNo = rsTemp[j].cno;
            var vAmt = rsTemp[j].amt;
            if (fnIsValidCoupon(vCTY, vCNo, window.Ret_Guest_Id, vAmt, Membcat) == false) {
                bVal = "0";
                return false;
            }
        }
        debugger;
        if (bVal == "0") return false;
    }

    return true;

};
var fnIsValidCoupon = function (CTY, C_NO, MEMB_ID, PAY_AMT, PARTY_IND, DEPID, BALCHK, BILLNO, ReSetBillNo, RSBillNo) {
    debugger;
    var cVal = "1";
    DEPID = DEPID || "";
    BALCHK = BALCHK || "";
    BILLNO = BILLNO || "";
    ReSetBillNo = ReSetBillNo || "";
    RSBillNo = RSBillNo || "";
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNISVALIDCOUPON",
        COMPID: CompId,
        CTY: CTY,
        C_NO: C_NO,
        MEMB_ID: MEMB_ID,
        PAY_AMT: PAY_AMT,
        PARTY_IND: PARTY_IND,
        DEPID: DEPID,
        BALCHK: BALCHK,
        BILLNO: BILLNO,
        ReSetBillNo: ReSetBillNo,
        RSBillNo: RSBillNo,
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (!rowData) rowData = "";
                if (rowData != "") {
                    webix.message({ type: 'warning', text: rowData });
                    //$$("gridSettle").select(RowId);
                    webix.UIManager.setFocus($$("gridSettle"));
                    cVal = "0";
                    return false;
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            cVal = "0";
            return false;
        }
    });

    if (cVal == "0") return false;
    else return true;

};
var fnIsValid = function (RowId) {
    debugger;
    var SelRow = $$("gridSettle").getItem(RowId);
    var vModeText = SelRow.ixModeCombo;
    var vPartyId = "";
    var vCCNo = "";
    var vChqNo = "";
    var vRoomNo = "";
    var vAmt = SelRow.ixAmt;
    var vBankNm = "";
    var vVouchNo = "";
    var VCurId = "";
    var vFornAmt = "";
    var vConvRate = "";
    var vNarr = "";
    if (vModeText == "") {
        webix.message({ type: 'warning', text: 'Settle Mode can not be Empty' });
        $$("gridSettle").select(RowId);
        webix.UIManager.setFocus($$("gridSettle"));
        return false;
    }
    if (vAmt == "") vAmt = 0
    vAmt = parseFloat(vAmt);
    var vBillAmt = $$("txtBillAmt").getValue();
    if (vBillAmt == "") vBillAmt = 0;
    vBillAmt = parseFloat(vBillAmt);
    var vPayaleAmt = $$("txtPayableAmt").getValue();
    if (vPayaleAmt == "") vPayaleAmt = 0;
    vPayaleAmt = parseFloat(vPayaleAmt);

    vTips = SelRow.ixTips;
    if (vTips == "") vTips = 0;
    vTips = parseFloat(vTips);

    if (vBillAmt != 0 && vPayaleAmt != 0) {
        if (vAmt == 0) {
            webix.message({ type: 'warning', text: 'Amount can not be Empty' });
            $$("gridSettle").select(RowId);
            webix.UIManager.setFocus($$("gridSettle"));
            return false;
        }
    }

    switch (vModeText) {
        case Md_Cash:
            return true;
            break;
        case Md_CashCard:
            vPartyId = SelRow.ixcashcard
            if (vPartyId == "") {
                webix.message({ type: 'warning', text: 'Card No. can not be Empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }

            if ((vAmt + vTips) > fnGetCashCardAmt(vPartyId)) {
                webix.message({ type: 'warning', text: 'Not enough Cash Credit' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }

            if (fnChkValidCashCard(vPartyId) == false) return false;            
            break;
        case Md_Comp:
            vPartyId = SelRow.ixPartyId;
            if (vPartyId == "") {
                webix.message({ type: 'warning', text: 'Company can not be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            break;
        case Md_CC:
            vCCNo = SelRow.ixChqNo;
            vPartyId = SelRow.ixPartyId;
            if (vPartyId == "") {
                webix.message({ type: 'warning', text: 'CC Company can not be empty ' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }

            if (vCCNo == "") {
                webix.message({ type: 'warning', text: 'CC No can not be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            
            break;
        case Md_Staff:
            vPartyId = SelRow.ixPartyId;
            if (vPartyId == "") {
                webix.message({ type: 'warning', text: 'Staff Name can not be empty ' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            break;
        case Md_Chq:
            vChqNo = SelRow.ixChqNo;
            vBankNm = SelRow.vBankNm;
            VCurId = SelRow.ixcurid;
            vFornAmt = SelRow.ixFornAmt;
            vConvRate = SelRow.ixConvRate;
            vPartyId = SelRow.ixPartyId;
            if (vChqNo == "") {
                webix.message({ type: 'warning', text: 'Chque No can not be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            if (vBankNm == "") {
                webix.message({ type: 'warning', text: 'Bank Name can not be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            debugger;
            if (VCurId != "" && VCurId != window.BASE_CURRENCY) {
                if (vFornAmt == "") vFornAmt = 0;
                vFornAmt = parseFloat(vFornAmt);
                if (vFornAmt == 0) {
                    webix.message({ type: 'warning', text: 'Foreign Amt can not be empty' });
                    $$("gridSettle").select(RowId);
                    webix.UIManager.setFocus($$("gridSettle"));
                    return false;
                }

                if (vConvRate == "") {
                    webix.message({ type: 'warning', text: 'Conversion Rate can not be empty' });
                    $$("gridSettle").select(RowId);
                    webix.UIManager.setFocus($$("gridSettle"));
                    return false;
                }
            }
            break;
        case Md_Compli:
            return true;
            break;
        case Md_Mem:
            vPartyId = SelRow.ixPartyId;
            if (vPartyId == "") {
                webix.message({ type: 'warning', text: 'Member Name can not be empty ' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            break;
        case Md_Forn:
            vVouchNo = SelRow.ixVouchNo;
            VCurId = SelRow.ixcurid;
            vFornAmt = SelRow.ixFornAmt;
            vConvRate = SelRow.ixConvRate;
            vPartyId = SelRow.ixPartyId;
            if (vVouchNo == "") {
                webix.message({ type: 'warning', text: 'Voucher No can not be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            if (VCurId == "") {
                webix.message({ type: 'warning', text: 'Currency ID can not be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }

            if (vFornAmt == "") vFornAmt = 0;
            vFornAmt = parseFloat(vFornAmt);
            if (vFornAmt == 0) {
                webix.message({ type: 'warning', text: 'Foreign Amt can not be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }

            if (vConvRate == "") {
                webix.message({ type: 'warning', text: 'Conversion Rate can not be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            break;
        case Md_ToRoom:
            vRoomNo = SelRow.ixTrnsRoom;
            if (vRoomNo == "") {
                webix.message({ type: 'warning', text: 'Room No can not be empty ' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            break;
        case Md_Pay:
            vPartyId = SelRow.ixPartyId;
            if (vPartyId == "") {
                webix.message({ type: 'warning', text: 'Temp.Folio cannot be empty ' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            break;
        case Md_CCoupon:
            vCCNo = SelRow.ixChqNo;
            vPartyId = SelRow.ixPartyId;

            if (window.CPN_MOD_RES == "1" && window.CoupID == "") {
                webix.message({ type: 'warning', text: 'Applicable Coupon Type not defined for Invoice Category' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }

            if (vPartyId == "") {
                webix.message({ type: 'warning', text: 'Credit Coupon can not be empty ' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            if (vCCNo == "") {
                webix.message({ type: 'warning', text: 'Coupon No can not be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            if (fnValidCoupon() == false) {
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            break;
        case Md_Void:
            if ($$("txtVoid_Narr").getValue() == "") {
                webix.message({ type: 'warning', text: 'Narration can not be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("txtVoid_Narr"));
                return false;
            }
            break;
        case Md_FundsTransf:
            vChqNo = SelRow.ixChqNo;
            vBankNm = SelRow.ixBankNm;
            if (vBankNm == "") {
                webix.message({ type: 'warning', text: 'Bank Name cannot be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            if (vChqNo == "") {
                webix.message({ type: 'warning', text: 'A/C No cannot be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }
            break;
        case Md_PayBill:
            vChqNo = SelRow.ixChqNo;
            vBankNm = SelRow.ixBankNm;
            vNarr = SelRow.ixNarr;
            vPartyId = SelRow.ixPartyId;

            if (vPartyId == "") {
                webix.message({ type: 'warning', text: 'Pay Bill Company can not be empty ' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }

            if (vNarr == "") {
                webix.message({ type: 'warning', text: 'Deposit Date can not be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }

            if (vChqNo == "") {
                webix.message({ type: 'warning', text: 'Transaction ID can not be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }

            if (vBankNm == "") {
                webix.message({ type: 'warning', text: 'Mobile No can not be empty' });
                $$("gridSettle").select(RowId);
                webix.UIManager.setFocus($$("gridSettle"));
                return false;
            }




        default:
            return true;
    }
    return true;


};
var fnStoreToSpread = function (vModeText) {
    //debugger;
    
    var SelRow = $$("gridSettle").getSelectedItem();
    var RowId = SelRow.id;
    SelRow.ixPartyId = "";
    SelRow.ixPartyTyId = "";
    SelRow.ixPartyNm = "";
    SelRow.ixRoomNo = "";
    SelRow.ixTrnsReg = "";
    SelRow.ixTrnsRoom = "";
    SelRow.ixVouchNo = "";
    SelRow.ixNarr = "";
    SelRow.ixChqNo = "";
    SelRow.ixBankNm = "";
    SelRow.ixcurid = "";
    SelRow.ixFornAmt = "";
    SelRow.ixConvRate = "";
    SelRow.ixCurno = "";
    SelRow.ixCCInd = "";
    SelRow.ixcashcard = "";
    SelRow.ixcashcardnm = "";
    $$("gridSettle").updateItem(RowId, SelRow);

    var vSettMode = $$("gridSettleMode").serialize();


    var newData = vSettMode.filter(function (el) {
        return el.id == vModeText;
    });
    var vRevId = "";
    if (newData.length > 0) vRevId = newData[0].REVENUE_ID;

    switch (vModeText) {
        case Md_Cash:
            SelRow.ixNarr = $$("txtCash_Narr").getValue();
            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            break;
        case Md_CashCard:
            vPartyId = SelRow.ixcashcard
            SelRow.ixcashcard = $$("txtcashcardno").getValue();
            SelRow.ixcashcardnm = $$("txtcashcardname").getValue();
            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            break;
        case Md_Comp:
            SelRow.ixPartyId = Cur_Comp_Id;
            SelRow.ixPartyTyId = "C";
            SelRow.ixPartyNm = $$("txtComp_Comp").getValue();
            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            SelRow.ixNarr = $$("txtComp_Narr").getValue();
            break;
        case Md_CC:
            SelRow.ixPartyId = Cur_CC_Comp_Id;
            SelRow.ixPartyTyId = "C"
            SelRow.ixRevId = vRevId;
            SelRow.ixChqNo = $$("txtCC_CardNo").getValue();
            SelRow.ixPartyNm = $$("txtCC_Company").getValue();
            SelRow.ixBankNm = $$("txtCCAuthNo").getValue();
            var myformat = webix.Date.dateToStr("%d/%m/%Y");
            var textStr = $$("scCCExpDt").config.value;
            var textStr1 = myformat(textStr);            
            SelRow.ixSetlModeId = vModeText;
            SelRow.ixNarr1 = textStr;
            SelRow.ixNarr = textStr1;
            var vCardNo=$$("txtCC_CardNo").getValue();
            var Str="*";

            if (window.W2_Ind == "1")
            {
                if (textStr1 != "" && window.CCInd == "0")
                {
                    if (window.Usr_log_ind == "1" || window.Usr_log_ind == "2") 
                    {
                        if (vCardNo.length > 4)
                        {
                            textStr1= textStr1 + " " + Str.repeat(vCardNo.length-4) + vCardNo.substring(vCardNo.length-3,4);
                            SelRow.ixNarr = textStr1;
                        }
                    }
                    else
                    {
                        textStr1= textStr1 + " " + vCardNo ;
                        SelRow.ixNarr = textStr1;
                        
                    }
                }
                else
                {
                    if (window.Usr_log_ind == "1" || window.Usr_log_ind == "2") 
                    {
                        if (vCardNo.length > 4)
                        {
                            textStr1= Array(10).fill('\xa0').join('') + Str.repeat(vCardNo.length-4) + vCardNo.substring(vCardNo.length-3,4);
                            SelRow.ixNarr = textStr1;
                            
                        }
                        else
                        {
                            textStr1= Array(10).fill('\xa0').join('')  + " " + vCardNo ;
                            SelRow.ixNarr = textStr1;                            
                        }
                    }
                }
            }
            else
            {
                if (window.CCInd == "0")
                {
                    SelRow.ixNarr = textStr1;
                }
            }



            break;
        case Md_ToRoom:
            SelRow.ixRoomNo = Cur_Room_No;
            SelRow.ixTrnsRoom = $$("txtRoom_No").getValue();
            SelRow.ixTrnsReg = Cur_Reg_No;
            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            SelRow.ixPartyNm = $$("txtRoom_Guest").getValue();
            break;
        case Md_Chq:
            SelRow.ixChqNo = $$("txtCHQ_ChqNo").getValue();
            SelRow.ixBankNm = $$("txtCHQ_Bank").getValue();
            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            var myformat = webix.Date.dateToStr("%d/%m/%Y");
            var textStr = $$("scChqDt").config.value;
            SelRow.ixNarr1 = textStr;
            var textStr1 = myformat(textStr);
            SelRow.ixNarr = textStr1;
            SelRow.ixFornAmt = $$("txtCrCurrEq").getValue();
            SelRow.ixcurid = $$("ddlCrCurr").getValue();
            SelRow.ixConvRate = $$("txtconvrt").getValue();
            break;
        case Md_Staff:
            SelRow.ixPartyId = Cur_Staff_Id;
            SelRow.ixPartyTyId = "E";
            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            SelRow.ixPartyNm = $$("txtStaff_Nm").getValue();
            SelRow.ixNarr = $$("txtStaff_Narr").getValue();
            break;
        case Md_Compli:
            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            SelRow.ixNarr = $$("txtCompli_Narr").getValue();
            break;
        case Md_Forn:
            SelRow.ixFornAmt = $$("txtFEX_FornAmt").getValue();
            SelRow.ixcurid = $$("ddlCurr").getValue();
            SelRow.ixConvRate = $$("txtFEX_ConvRate").getValue();
            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            SelRow.ixExtrAmt = $$("txtFEX_ExtrAmt").getValue();
            SelRow.ixVouchNo = $$("txtFEX_Vouch").getValue();
            SelRow.ixCurno = $$("txtCurno").getValue();
            break;
        case Md_Mem:
            SelRow.ixPartyId = Cur_Mem_Id;
            SelRow.ixPartyTyId = "L";
            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            SelRow.ixPartyNm = $$("txtMem_Nm").getValue();
            SelRow.ixNarr = $$("txtMem_Narr").getValue();
            break;
        case Md_Void:
            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            SelRow.ixNarr = $$("txtVoid_Narr").getValue();
            break;
        case Md_CCoupon:
            SelRow.ixPartyId = $$("ddlCCoupon").getValue();
            SelRow.ixPartyTyId = "";
            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            SelRow.ixChqNo = $$("txtC_CouponNo").getValue();
            SelRow.ixBankNm = $$("ddlCCoupon").getText();
            break;
        case Md_FundsTransf:
            SelRow.ixChqNo = $$("txtBankAcNo").getValue();
            SelRow.ixBankNm = $$("txtBankNm").getValue();
            //SelRow.ixNarr = $$("scDepositDt").getValue();
            //SelRow.ixNarr1 = $$("scDepositDt").config.value;

            var myformat = webix.Date.dateToStr("%d/%m/%Y");
            var textStr = $$("scDepositDt").config.value;
            var textStr1 = myformat(textStr);

            SelRow.ixNarr = textStr1;
            SelRow.ixNarr1 = textStr;

            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            break;
        case Md_PayBill:
            SelRow.ixPartyId = PB_Company_Id;
            SelRow.ixPartyTyId = "C";
            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            SelRow.ixChqNo = $$("txtPB_TrnID").getValue();
            SelRow.ixPartyNm = $$("txtPB_Company").getValue();
            SelRow.ixBankNm = $$("txtPB_Mob").getValue();
            SelRow.ixNarr1 = $$("scDepDt").config.value;
            var myformat = webix.Date.dateToStr("%d/%m/%Y");
            var textStr = $$("scDepDt").config.value;
            var DepDt = myformat(textStr);
            if (DepDt != "" && $$("txtPB_Depstr").getValue() != "")
                SelRow.ixNarr = DepDt + " " + $$("txtPB_Depstr").getValue();
            else if (DepDt != "")
                SelRow.ixNarr = DepDt;
            else if ($$("txtPB_Depstr") != "")
                SelRow.ixNarr = $$("txtPB_Depstr").getValue();

            SelRow.ixVouchNo = $$("txtPB_Depstr").getValue();
            break;
        case Md_Pay:
            SelRow.ixPartyId = Cur_Eemp_Id;
            SelRow.ixRevId = vRevId;
            SelRow.ixSetlModeId = vModeText;
            SelRow.ixPartyNm = $$("txtPmNm").getValue();
            SelRow.ixNarr = $$("txtPmNarr").getValue();
            SelRow.ixVouchNo = $$("txtPmNo").getValue();
            break;
        default:
    }
    debugger;
    $$("gridSettle").updateItem(RowId, SelRow);
    $$("gridSettle").refresh();

};
var fnGetFromSpread = function (RowId, vModeText) {
    debugger;
    var SelRow = $$("gridSettle").getItem(RowId);
    switch (vModeText) {
        case Md_Cash:
            var vCashNarr = SelRow.ixNarr;
            $$("txtCash_Narr").setValue(vCashNarr);
            break;
        case Md_CashCard:
            var vCashNarr = SelRow.ixcashcard;
            $$("txtcashcardno").setValue(vCashNarr);
            fnGetCashCardDet(vCashNarr)
            break;
        case Md_CC:
            var vCC_CompID = SelRow.ixPartyId;
            var vCC_CardNo = SelRow.ixChqNo;
            var vParty_Nm = SelRow.ixPartyNm

            var vBankNm = SelRow.ixBankNm;
            var vCashNarr = SelRow.ixNarr1;
            Cur_CC_Comp_Id = vCC_CompID;
            $$("txtCC_CardNo").setValue(vCC_CardNo);
            $$("txtCC_Company").setValue(vParty_Nm);
            $$("txtCCAuthNo").setValue(vBankNm);
            if(vCashNarr!="") $$("scCCExpDt").setValue(vCashNarr);            
            break;
        case Md_Comp:
            var vComp_CompId = SelRow.ixPartyId;
            var vParty_Nm = SelRow.ixPartyNm;
            var vComp_Narr = SelRow.ixNarr;
            Cur_Comp_Id = vComp_CompId;
            $$("txtComp_Comp").setValue(vParty_Nm);
            $$("txtComp_Narr").setValue(vComp_Narr);
            break;
        case Md_ToRoom:
            var vTrnsRoom = SelRow.ixTrnsRoom;
            var vTrnsReg = SelRow.ixTrnsReg;
            var vParty_Nm = SelRow.ixPartyNm;
            $$("txtRoom_No").setValue(vTrnsRoom);
            Cur_Reg_No = vTrnsReg;
            $$("txtRoom_Guest").setValue(vParty_Nm);
            break;
        case Md_Chq:
            var vChqNo = SelRow.ixChqNo;
            var vBankNm = SelRow.ixBankNm;
            var vCashNarr = SelRow.ixNarr1;
            var vFornAmt = SelRow.ixFornAmt;
            var VCurId = SelRow.ixcurid;
            var vConvRate = SelRow.ixConvRate;
            $$("txtCrCurrEq").setValue(vFornAmt);
            $$("txtconvrt").setValue(vConvRate);
            if (VCurId != "")
                $$("ddlCrCurr").setValue(VCurId);
            else
                $$("ddlCrCurr").setValue(VCurId);

            $$("txtCHQ_ChqNo").setValue(vChqNo);
            $$("txtCHQ_Bank").setValue(vBankNm);
            $$("scChqDt").setValue(vCashNarr);
            break;
        case Md_Staff:
            var vStaffId = SelRow.ixPartyId;
            var vParty_Nm = SelRow.ixPartyNm;
            var vCashNarr = SelRow.ixNarr;
            Cur_Staff_Id = vStaffId;
            $$("txtStaff_Nm").setValue(vParty_Nm);
            $$("txtStaff_Narr").setValue(vCashNarr);
            break;
        case Md_Compli:
            var vCashNarr = SelRow.ixNarr;
            $$("txtCompli_Narr").setValue(vCashNarr);
            break;
        case Md_Forn:
            var vFornAmt = SelRow.ixFornAmt;
            var VCurId = SelRow.ixcurid;
            var vConvRate = SelRow.ixConvRate;
            var vExtrAmt = SelRow.ixExtrAmt;
            var vVouchNo = SelRow.ixVouchNo;
            var vBankNm = SelRow.ixCurno;
            $$("txtFEX_FornAmt").setValue(vFornAmt);
            $$("txtFEX_ConvRate").setValue(vConvRate);
            $$("txtCurno").setValue(vBankNm);
            vBankNm = "";
            $$("ddlCurr").setValue(VCurId);
            $$("txtFEX_ExtrAmt").seValue(vExtrAmt);
            $$("txtFEX_Vouch").setValue(vVouchNo);
            break;
        case Md_Mem:
            var vComp_CompId = SelRow.ixPartyId;
            var vParty_Nm = SelRow.ixPartyNm;
            var vCashNarr = SelRow.ixNarr;
            Cur_Mem_Id = vComp_CompId;
            $$("txtMem_Nm").setValue(vParty_Nm);
            $$("txtMem_Narr").setValue(vCashNarr);
            break;
        case Md_Void:
            var vCashNarr = SelRow.ixNarr;
            $$("txtVoid_Narr").setValue(vCashNarr);
            break;
        case Md_Pay:
            var vComp_CompId = SelRow.ixPartyId;
            var vParty_Nm = SelRow.ixPartyNm;
            var vComp_Narr = SelRow.ixNarr;
            var vTempFolio = SelRow.ixVouchNo;

            $$("txtPmNm").setValue(vParty_Nm);
            Cur_Eemp_Id = vComp_CompId;
            $$("txtPmNarr").setValue(vComp_Narr);
            $$("txtPmNo").setValue(vTempFolio);
            break;
        case Md_CCoupon:
            var vCC_CardNo = SelRow.ixChqNo;
            var vParty_Nm = SelRow.ixBankNm;
            var vParty_Id = SelRow.ixPartyId;
            $$("txtC_CouponNo").setValue(vCC_CardNo);
            $$("ddlCCoupon").setValue(vParty_Id);
            break;
        case Md_FundsTransf:
            var vChqNo = SelRow.ixChqNo;
            var vBankNm = SelRow.ixBankNm;
            var vCashNarr = SelRow.ixNarr1;

            $$("txtBankAcNo").setValue(vChqNo);
            $$("txtBankNm").setValue(vBankNm);
            $$("scDepositDt").setValue(vCashNarr);
        case Md_PayBill:
            var vComp_CompId = SelRow.ixPartyId;
            var Party_Nm = SelRow.ixPartyNm;
            var vComp_Narr = SelRow.ixNarr1;
            var vChqNo = SelRow.ixChqNo;
            var vBankNm = SelRow.ixBankNm;
            var vDep = SelRow.ixVouchNo;
            $$("txtPB_Company").setValue(Party_Nm);
            PB_Company_Id = vComp_CompId;
            $$("scDepDt").setValue(vComp_Narr);
            $$("txtPB_Depstr").setValue(vDep);
            
            $$("txtPB_TrnID").setValue(vChqNo);
            $$("txtPB_Mob").setValue(vBankNm);

    }


};
var PayMstSrchRet = function (RowId) {
    var selRow = $$("gridPayMstSrch").getItem(RowId);
    var vPmId = selRow.ixPmId;
    var vPmNm = selRow.ixPmNm;
    var vAmt = selRow.ixAmt;
    var vReason = selRow.ixReason;
    var vPmNo = selRow.ixPmNo;
    var vRegNo = selRow.ixRegNo;

    Cur_Eemp_Id = vPmId;
    $$("txtPmNm").setValue(vPmNm)
    $$("txtPmNarr").setValue("");
    $$("txtPmNo").setValue(vPmNo);   

}
var PayMstSrchWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PayMstSrchPop",
        head: " Temp Folio Search",
        position: "center",
        css: "WebIxStyle",
        height: 450,
        width: 730,
        move: true,
        body: {
            rows: [
                {
                    view: "datatable",
                    id: "gridPayMstSrch",
                    select: 'row',
                    //editable: true,
                    css: "webix_header_border",
                    //scrollX: false,
                    columns: [                        
                            { id: "ixPmNo", header: ['Folio No.',{ content: "textFilter" }],width: 80, css: { 'text-align': 'center ! important' }, },
                            { id: "ixPmNm", header: ['Temp Folio Name',{ content: "textFilter" }], width: 170, css: { 'text-align': 'left ! important' }, },
                            { id: "ixReason", header: 'Narration', width: 180, fillspace: true, css: { 'text-align': 'left ! important' }, },
                            { id: "ixCreateBy", header: 'Create By', width: 90, css: { 'text-align': 'left ! important' },},
                            { id: "ixCreateDt", header: 'Create Dt', width: 90, css: { 'text-align': 'center ! important' },},
                            {
                                id: "ixAmt", header: 'Bal.Amt', width: 100, css: { 'text-align': 'right ! important' }, format: function (value) {
                                    return fnCurrFormat(value);
                                },
                            },
                            { id: "ixPmId", header: 'PmId', hidden: true },
                            { id: "ixRegNo", header: 'RegNo', hidden: true },
                    ],
                    data: [],
                    on: {

                        'onItemDblClick': function (id) {
                            debugger;
                            PayMstSrchRet(id);
                            $$("PayMstSrchPop").hide();
                        },
                    },
                },                
            ],
        }
    });
};
var PayMstSrchLoadData = function () {
    debugger;
    $$("gridPayMstSrch").clearAll();
    $$("gridPayMstSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNLOADPAYMASTER",
        COMPID: CompId,
        Qry: "",
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData.length > 0) {
                    var Rows = [];
                    $.each(rowData, function (key, value) {
                        debugger;
                        var set = {};
                        var vPmNm = "";
                        var vReason = "";
                        var vPmId = "";
                        var vPmNo = "";
                        var vCreateBy = "";
                        var vCreateDt = "";
                        var vAmt = "";
                        var vRegNo = "";
                        var bVal = false;
                        if (value.PM_NO != null && value.PM_NO != undefined) vPmId = value.PM_NO.toString().trim();
                        if (value.T_N != null && value.T_N != undefined) vPmNo = value.T_N.toString().trim();
                        if (value.PM_NM != null && value.PM_NM != undefined) vPmNm = value.PM_NM.toString().trim();
                        if (value.CHR_AMT != null && value.CHR_AMT != undefined) vAmt = value.CHR_AMT.toString().trim();
                        if (value.CREATE_BY != null && value.CREATE_BY != undefined) vCreateBy = value.CREATE_BY.toString().trim();
                        if (value.C_DT1 != null && value.C_DT1 != undefined) vCreateDt = value.C_DT1.toString().trim();
                        if (value.REASON != null && value.REASON != undefined) vReason = value.REASON.toString().trim();
                        if (value.RG_N != null && value.RG_N != undefined) vRegNo = value.RG_N.toString().trim();                       
                        
                        set = {
                            ixPmNo: vPmNo, ixPmNm: vPmNm, ixReason: vReason, ixCreateBy:vCreateBy, ixCreateDt: vCreateDt,
                            ixAmt: vAmt,ixPmId:vPmId,ixRegNo:vRegNo
                        };
                        Rows.push(set);                      
                        
                    });
                    $$("gridPayMstSrch").parse(Rows);
                    $$("gridPayMstSrch").refresh();
                    if ($$("gridPayMstSrch").count()) {
                        $$("gridPayMstSrch").select($$("gridPayMstSrch").getFirstId());
                        $$("gridPayMstSrch").adjustRowHeight("ixReason", true);
                    }
                    $$("gridPayMstSrch").refresh();
                    webix.UIManager.setFocus($$("gridPayMstSrch"));
                    

                }                
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnBtnPayMatClick = function () {
    if (fnChkSessVal() == false) return;
    PayMstSrchLoadData();
    $$("PayMstSrchPop").show();

};
var fnAddbtnClick = function () {
    debugger;
    if (fnChkSessVal() == false) return;
    $$("gridSettle").editStop();
    $$("gridSettle").refresh();
    var SelRow = $$("gridSettle").getLastId();
    if (! SelRow) return
    fnKeyDownPress(SelRow);
}
var fnKeyDownPress = function (rowid) {
    $$("gridSettle").editStop();
    $$("gridSettle").refresh();
    if (fnIsValid(rowid) == true) {
        debugger;
        var SelRow = $$("gridSettle").getItem(rowid);
        var vModeText = SelRow.ixModeCombo;
        if (vModeText == "V") return false;
        var SumAmt = fnSumColum("ixAmt");
        var TotalAmt = 0;
        if ($$("txtPayableAmt") != null && $$("txtPayableAmt") != undefined) {
            TotalAmt = $$("txtPayableAmt").getValue();
        }
        if (TotalAmt == "") TotalAmt = 0;
        var BalAmt = TotalAmt - SumAmt;
        if (BalAmt < 0) {
            webix.message({ type: "warning", text: "Total Settlement Amt Can not be greater than Bill Amt" });
            return false;
        }
        if (BalAmt > 0) {
            fnAddRow();
        }
        return true;
    }
    else { return false; }
};
var CompSrchWindowLoad = function () {
    debugger;
    webix.ui({
        view: "window",
        //close: true,
        modal: true,
        id: "CompSrchPop",
        head: {            
            
            view: "toolbar", css: "webix_toolar webix_win_head",  elements: [                
                { id: "CmpSrchWindowTiltle", template: "Company Search", css: "webix_view webix_header webix_win_title windowHead " },
                {
                    view: "icon", icon: "wxi-close", click: function () {
                        $$("CompSrchPop").hide();
                    }
                }
            ]            
        },
        position: "center",
        css: "WebIxStyle",
        height: 350,
        width: 450,
        move: true,
        
        body: {                        
            rows: [                
                {
                    view: "datatable",
                    id: "gridCompSrch",
                    select: 'row',                    
                    css: "webix_header_border",                    
                    columns: [
                            { id: "ixCompId", header: [{ content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, },
                            { id: "ixCompNm", header: [{ content: "textFilter", }], fillspace:true, css: { 'text-align': 'left ! important' }, },
                            { id: "ixPId",  hidden:true },                            
                            { id: "ixDepend", hidden: true },
                            { id: "ixDpSrno",  hidden: true },
                    ],
                    data: [],
                    on: {

                        'onItemDblClick': function (id) {
                            debugger;
                            CompSrchRet(id);
                            $$("CompSrchPop").hide();
                        },
                    },
                },
            ],
        }
    });
};
var CompSrchLoadData = function (PARTY_TYPE, UnApproveInd) {
    debugger;
    $$("gridCompSrch").clearAll();
    $$("gridCompSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNLOADCOMPSRCHDATA",
        COMPID: CompId,
        PARTY_TYPE: PARTY_TYPE,        
        UnApproveInd:UnApproveInd,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData.length > 0) {                    
                    $$("gridCompSrch").parse(rowData);
                    $$("gridCompSrch").refresh();
                    if ($$("gridCompSrch").count()) {
                        $$("gridCompSrch").select($$("gridCompSrch").getFirstId());
                    }
                    webix.UIManager.setFocus($$("gridCompSrch"));
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnBtnCreditCardSrchClick = function () {
    if (fnChkSessVal() == false) return;
    CompSrchLoadData("CREDITCARD", "1");
    SrchType = "CREDITCARD";
    debugger;    
    $$("CmpSrchWindowTiltle").setHTML("Company Search");  
    $$("CompSrchPop").show();
};
var CompSrchRet = function (RowId) {
    debugger;
    var selRow = $$("gridCompSrch").getItem(RowId);
    var vId = selRow.ixCompId;
    var vNm = selRow.ixCompNm;
    var vSId = selRow.ixPId;
    var vDepNm = selRow.ixDepend;
    var vDepSrNo = selRow.ixDpSrno;

    if (SrchType == "CREDITCARD") {        
        Cur_CC_Comp_Id = vId;
        $$("txtCC_Company").setValue(vNm)
        $$("txtCC_CardNo").setValue("");        
        //fnStoreToSpread(Md_CC);        
    }
    else if (SrchType == "STAFF") {
        Cur_Staff_Id = vId;
        $$("txtStaff_Nm").setValue(vNm);
        var vNarr = " STF:" + vNm;
        $$("txtStaff_Narr").setValue(vNarr);
        //fnStoreToSpread(Md_CC);
    }
    else if (SrchType == "PARTY") {
        Cur_Comp_Id = vId;
        $$("txtComp_Comp").setValue(vNm)
        var vNarr = $$("txtGuestNm").getValue() + " (Cmp Id:" + vId + ")";
        $$("txtComp_Narr").setValue(vNarr);
        //fnStoreToSpread(Md_CC);
    }
    else if (SrchType == "GUEST") {
        if (fnChkValidToRmGst(vId) == false) return;        
        Cur_Room_No = vId;
        $$("txtRoom_Guest").setValue(vNm);
        $$("txtRoom_No").setValue(vId);        
    }
    else if (SrchType == "PAY BILL") {
        PB_Company_Id = vId;
        $$("txtPB_Company").setValue(vNm)       
        //fnStoreToSpread(Md_CC);
    }
    else if (SrchType == "MEMBER") {        
        Cur_Mem_Id = vSId;
        Det = [];
        Det = fnGetMembDet(Cur_Mem_Id);
        $$("txtMem_Nm").setValue(vNm)
        $$("txtMem_Narr").setValue(vNm);
        debugger;
        if (Det != null && Det != undefined) {
            var MemStat = "";
            var MemBared = "";
            var BarDt ="";
            var SPlinstruction = "";
            var membno = "";
            if(Det[0].MEMB_STATUS_NM) MemStat = Det[0].MEMB_STATUS_NM;
            if(Det[0].BARED) MemBared = Det[0].BARED;
            if(Det[0].BAR_DT1) BarDt = Det[0].BAR_DT1;
            if(Det[0].INSTRUCTION) SPlinstruction = Det[0].INSTRUCTION;
            if(Det[0].MEMB_NO) membno = Det[0].MEMB_NO;
            if (BarDt != "" && MemBared == "1") {
                debugger;
                webix.alert({
                    title: MemStat,
                    text: "Member is barred from " + BarDt,
                    type: "alert-warning"
                });
                Cur_Mem_Id = "";
                $$("txtMem_Nm").setValue("");
                $$("txtMem_Narr").setValue("");
            }
            
            var MembBal = fnGetMembCloseBal(Cur_Mem_Id);            
            if (splinstr == 1) {
                if (SPlinstruction != "" || MembBal != 0) {
                    
                    $$("txtSplInstr").setValue(SPlinstruction);
                    $$("txtMemBal").setValue(MembBal);
                    if (MembBal< 0){
                        $$("txtMemBal").setValue(MembBal * -1);                        
                        $$("lblCrDr").setValue("Credit");                        
                        webix.html.addCss($$("lblCrDr").$view, "css_ForeBlue");
                    }
                    else if (MembBal > 0) {
                        $$("lblCrDr").setValue("Debit");
                        webix.html.addCss($$("lblCrDr").$view, "css_ForeRed");
                        //$$("lblCrDr").addCss("css_ForeBlue");
                        //$$("lblCrDr").define("css", "css_ForeRed");
                    }

                    $$("SplInsPop").show();
                }
            }

        }

                     

    }

};
var fnChkValidToRmGst = function (ROOM_NO) {
    debugger;
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNCHKVALIDTORMGST",
        COMPID: CompId,
        ROOM_NO: ROOM_NO,
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (!rowData) rowData = "";
                if (rowData.Valid == "0") {
                    webix.message({ type: 'warning', text: rowData.Message });
                    $$("gridSettle").select(RowId);
                    webix.UIManager.setFocus($$("gridSettle"));
                    return false;
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            return false;
        }
    });
    return true;

}
var fnGetMembDet = function (MEMB_ID) {
    debugger;
    $$("gridCompSrch").clearAll();
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNGETMEMBDET",
        COMPID: CompId,
        MEMB_ID: MEMB_ID,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnGetAllowedCrLimt = function (MEMB_ID) {
    debugger;    
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNGETALLOWEDCRLIMT",
        COMPID: CompId,
        MEMB_ID: MEMB_ID, 
    }
    var rowData = 0;
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (!rowData) rowData = 0;
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
}
var fnGetMembCloseBal = function (C_Memb_Id, Appl, LedgTy, InvNo, Suprinv) {
    debugger;
    Appl = Appl || "0";
    InvNo = InvNo || "0";
    Suprinv = Suprinv || "0";
    LedgTy = LedgTy || "";
    $$("gridCompSrch").clearAll();
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNGETMEMBCLOSEBALANCE",
        COMPID: CompId,
        C_Memb_Id: C_Memb_Id,
        Appl: Appl,
        LedgTy: LedgTy,
        InvNo: InvNo,
        Suprinv: Suprinv,

    }
    var rowData = 0;
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (!rowData) rowData = 0;
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnBtnMemberSrchClick = function () {
    if (fnChkSessVal() == false) return;
    CompSrchLoadData("MEMBER", "1");
    SrchType = "MEMBER";
    debugger;
    $$("CmpSrchWindowTiltle").setHTML("Member Search");
    $$("CompSrchPop").show();
};
var fnLoadMembCont = function (CompId) {
    Request = {
        REQ_NM: "FNLOADMEMBCONT",
        COMPID: CompId,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;

};
var fnLoadFoCont = function (CompId) {
    Request = {
        REQ_NM: "FNLOADFOCONT",
        COMPID: CompId,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;

};
var fnLoadPSCont = function (CompId) {
    Request = {
        REQ_NM: "FNLOADPSCONT",
        COMPID: CompId,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;

};
var fnBtnStaffSrchClick = function () {
    if (fnChkSessVal() == false) return;
    CompSrchLoadData("STAFF", "1");
    SrchType = "STAFF";
    debugger;
    $$("CmpSrchWindowTiltle").setHTML("Staff Search");
    $$("CompSrchPop").show();
};
var fnBtnCompSrchClick = function () {
    if (fnChkSessVal() == false) return;
    CompSrchLoadData("PARTY", "1");
    SrchType = "PARTY";
    debugger;
    $$("CmpSrchWindowTiltle").setHTML("Company Search");
    $$("CompSrchPop").show();
};
var fnBtnPBCompSrchClick = function () {
    if (fnChkSessVal() == false) return;
    CompSrchLoadData("PAY BILL", "1");
    SrchType = "PAY BILL";
    debugger;
    $$("CmpSrchWindowTiltle").setHTML("Pay Bill");
    $$("CompSrchPop").show();
};
var fnBtnToRoomSrchClick = function () {
    if (fnChkSessVal() == false) return;
    CompSrchLoadData("GUEST", "1");
    SrchType = "GUEST";
    debugger;
    $$("CmpSrchWindowTiltle").setHTML("Guest");
    $$("CompSrchPop").show();
};
var SplitInsWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "SplInsPop",
        head: "Special Instruction",
        position: "center",
        css: "WebIxStyle",
        height: 330,
        width: 420,
        move: true,
        body: {
            rows: [
                { view: "textarea", id: "txtSplInstr", label: "", width: 350, },
                {
                cols: [
                    { view: "text", id: "txtMemBal", type: "text", label: "Member Outstanding Balance", labelWidth: 180, format: "111.00", readonly: true, width: 310, inputAlign: "right", },
                    { view: "label", id: "lblCrDr", },
                ],  
                },
                {
                    margin: 10,
                    padding: { top: 5, bottom: 5, right: 5 },
                    cols: [{ view: "button", type: "icon", icon: "wxi-check", label: "Ok", inputWidth: 80, click: function () { $$("SplInsPop").hide(); }, align: "right" }
                    ]
                },

            ],
        }
    });
};
var fnLoadCreditCouponType = function (CompId) {
    Request = {
        REQ_NM: "FNLOADCREDITCOUPONTYPE",
        COMPID: CompId,
        CPN_MOD_RES: window.CPN_MOD_RES,
        CoupID: window.CoupID,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;

};
var fnLoadCCouponGstType = function(CompId){
    Request = {
        REQ_NM: "FNLOADCCOUPONGSTTYPE",
        COMPID: CompId,        
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;

};
var CouponSrchWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "CCSrchPop",
        head: " Coupon Search",
        position: "center",
        css: "WebIxStyle",
        height: 550,
        width: 400,
        move: true,
        body: {
            rows: [                
                {
                    padding: { top: 20, left: 30, bottom: 10, right: 10 },
                    rows: [
                        {
                            view: "richselect", id: "ddlCCGstType", label: "Guest Type", labelWidth: 100, width: 250, on: {
                                onChange: function (newVal, OldVal) {
                                    $$("txtCCGst").setValue("");
                                    $$("gridCCSrch").clearAll();
                                }
                            }
                        },
                        { view: "search", labelWidth: 70, label: "Guest ", id: "txtCCGst", readonly: true, icon: "wxi-search", labelWidth: 100, width: 350,
                            on: {
                                onSearchIconClick: function () {
                                    debugger;
                                    fnGstSrchBtnClick();
                                }
                            }
                        },
                    ]
                },
                {
                    view: "datatable",
                    id: "gridCCSrch",
                    select: 'row',
                    width: 400,
                    css: "webix_header_border",                    
                    columns: [
                            { id: "ixcno", header: 'Coupon No.', width: 200, css: { 'text-align': 'center ! important' }, },
                            { id: "ixBal", header: 'Balance', fillspace:true, css: { 'text-align': 'right ! important' }, },                            
                            { id: "ixID", header: 'PmId', hidden: true },
                            
                    ],
                    data: [],
                    on: {

                        'onItemDblClick': function (id) {
                            debugger;
                            CoupSrchRet(id);
                            $$("CCSrchPop").hide();
                        },
                    },
                },
            ],
        }
    });
};
var MembSrchWindowLoad = function () {    
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "MembSrchPop",
        head: " Member Search",
        position: "center",
        css: "WebIxStyle",
        height: 550,
        width: 400,
        move: true,
        body: {
            rows: [                
                {
                    view: "datatable",
                    id: "gridMembSrch",
                    select: 'row',                    
                    css: "webix_header_border",
                    columns: [
                            { id: "ixId", header: ['Member No.', { content: "textFilter" }], width: 120, css: { 'text-align': 'center ! important' }, },
                            { id: "ixNm", header: ['Member Name',{ content: "textFilter"}], fillspace: true, css: { 'text-align': 'left ! important' }, },
                            { id: "ixHId", header: 'PartyId', hidden: true },

                    ],
                    data: [],
                    on: {

                        'onItemDblClick': function (id) {
                            debugger;
                            MembSrchRet(id);
                            $$("MembSrchPop").hide();
                        },
                    },
                },
            ],
        }
    });
};
var ApplSrchWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "ApplSrchPop",
        head: " Applicant Search",
        position: "center",
        css: "WebIxStyle",
        height: 550,
        width: 400,
        move: true,
        body: {
            rows: [
                {
                    view: "datatable",
                    id: "gridApplSrch",
                    select: 'row',
                    css: "webix_header_border",
                    columns: [
                            { id: "ixId", header: 'Appl No.', width: 120, css: { 'text-align': 'center ! important' }, },
                            { id: "ixNm", header: 'Member Name', fillspace: true, css: { 'text-align': 'left ! important' }, },
                            { id: "ixHId", header: 'PartyId', hidden: true },

                    ],
                    data: [],
                    on: {

                        'onItemDblClick': function (id) {
                            debugger;
                            ApplSrchRet(id);
                            $$("ApplSrchPop").hide();
                        },
                    },
                },
            ],
        }
    });
};
var DependSrchWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "DependSrchPop",
        head: " Dependent Search",
        position: "center",
        css: "WebIxStyle",
        height: 550,
        width: 450,
        move: true,
        body: {
            rows: [
                {
                    view: "datatable",
                    id: "gridDependSrch",
                    select: 'row',
                    css: "webix_header_border",
                    columns: [
                            { id: "ixId", header: ['Member No.', { content: "textFilter" }], width: 90, css: { 'text-align': 'center ! important' }, },
                            { id: "ixNm", header: ['Member Name',{ content: "textFilter" }], width: 170, css: { 'text-align': 'left ! important' }, },
                            { id: "ixDepNm", header: ['Dependent Name',{ content: "textFilter" }], fillspace: true, css: { 'text-align': 'left ! important' }, },
                            { id: "ixHId", header: 'PartyId', hidden: true },
                            { id: "ixDepSrno", header: 'DepSrno', hidden: true },

                    ],
                    data: [],
                    on: {

                        'onItemDblClick': function (id) {
                            debugger;
                            DependSrchRet(id);
                            $$("DependSrchPop").hide();
                        },
                    },
                },
            ],
        }
    });
};
var WalkinSrchWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "WalkinSrchPop",
        head: " Walkin Search",
        position: "center",
        css: "WebIxStyle",
        height: 350,
        width: 550,
        move: true,
        body: {
            rows: [
                {                   
                    view: "datatable",
                    id: "gridWalkInSrch",
                    select: 'row',
                    css: "webix_header_border",
                    columns: [
                            { id: "ixGuestID", header: 'Guest ID', hidden: true },
                            { id: "ixGuestNm", header: ['Guest Name',{ content: "textFilter" }], width: 200, css: { 'text-align': 'left ! important' }, },
                            { id: "ixGstAddr", header: ['Address',{ content: "textFilter" }], fillspace: true, css: { 'text-align': 'left ! important' }, },
                            { id: "ixGstMcid", header: 'mcid', hidden: true },
                            { id: "ixGstGsid", header: 'GsId', hidden: true },                            

                    ],
                    data: [],
                    on: {

                        'onItemDblClick': function (id) {
                            debugger;
                            WalkinSrchRet(id);
                            $$("WalkinSrchPop").hide();
                        },
                    },
                },
            ],
        }
    });
};
var PosGstSrchWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PosGstSrchPop",
        head: " Guest Search",
        position: "center",
        css: "WebIxStyle",
        height: 350,
        width: 650,
        move: true,
        body: {            
            rows: [
                {
                    view: "datatable",
                    id: "gridPGstSrch",
                    select: 'row',
                    css: "webix_header_border",
                    columns: [
                            { id: "ixGsTitle", header: "Title", width: 50, css: { 'text-align': 'center ! important' }, },
                            { id: "ixGsNm", header: ['Guest Name',{ content: "textFilter"}], width: 200, css: { 'text-align': 'left ! important' }, },
                            { id: "ixGsComp", header: "Company", width: 170, hidden: true, css: { 'text-align': 'left ! important' }, },
                            { id: "ixGsAddrs", header: ['Address', { content: "textFilter" }], width: 250,fillspace:true, css: { 'text-align': 'left ! important' }, },
                            { id: "ixGsId", header: "GsId", hidden: true },
                            { id: "ixGsTyId", header: "GsTyId", hidden: true },
                            { id: "ixMobile", header: ['Mobile', { content: "textFilter" } ], width: 100, css: { 'text-align': 'center ! important' }, },
                            { id: "ixGstTitleID", header: "TitleId", hidden: true },

                    ],
                    data: [],
                    on: {

                        'onItemDblClick': function (id) {
                            debugger;
                            PosGstSrchRet(id);
                            $$("PosGstSrchPop").hide();
                        },
                    },
                },
            ],
        }
    });
};
var PosGstSrchRet = function (RowId) {
    var selRow = $$("gridPGstSrch").getItem(RowId);
    var vId = selRow.ixGsId;
    var vNm = selRow.ixGsNm;
    $$("gridCCSrch").clearAll();
    $$("txtCCGst").setValue(vNm);
    var vGstTyId = $$("ddlCCGstType").getValue();
    fnLoadCouponDet(vGstTyId,vId);
};
var MembSrchRet = function (RowId) {
    var selRow = $$("gridMembSrch").getItem(RowId);
    var vId = selRow.ixHId;
    var vNm = selRow.ixNm;
    $$("gridCCSrch").clearAll();
    $$("txtCCGst").setValue(vNm);
    var vGstTyId = $$("ddlCCGstType").getValue();
    fnLoadCouponDet(vGstTyId,vId);
};
var DependSrchRet = function (RowId) {
    var selRow = $$("gridDependSrch").getItem(RowId);
    var vId = selRow.ixHId;
    var vNm = selRow.ixDepNm;
    var vDepSrno = selRow.ixDepSrno;
    $$("gridCCSrch").clearAll();
    $$("txtCCGst").setValue(vNm);
    var vGstTyId = $$("ddlCCGstType").getValue();
    fnLoadCouponDet(vGstTyId, vId, vDepSrno);
};
var fnRetCrCouponBal = function (CTY, CNO) {
    debugger;
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNRETCRCOUPONBAL",
        COMPID: CompId,
        CTY: CTY,
        CNO: CNO
    }
    var rowData = 0;
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (!rowData) rowData = "";
                if (rowData == "") rowData = 0;
                rowData = parseFloat(rowData);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;


};
var CpnBalAlertWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "CpnAlertPop",
        head: "Credit Coupon Balance",
        position: "center",
        css: "WebIxStyle",
        height: 330,
        width: 420,
        move: true,
        body: {
            padding: {left:10, top: 5, bottom: 5, right: 5 },
            rows: [                    
                    { view: "text", id: "txtCpnBal", type: "text", label: "Coupon Balance Amount", labelWidth: 180, format: "111.00", readonly: true, width: 310, inputAlign: "right", },
                    { view: "text", id: "txtCpnBillAmt", type: "text", label: "Bill Amount", labelWidth: 180, format: "111.00", readonly: true, width: 310, inputAlign: "right", },
                    { view: "text", id: "txtCpnNetBalAmt", type: "text", label: "Net Bal Amount", labelWidth: 180, format: "111.00", readonly: true, width: 310, inputAlign: "right", },
                    
                {
                    margin: 10,
                    padding: { top: 5, bottom: 5, right: 5 },
                    cols: [{ view: "button", type: "icon", icon: "wxi-check", label: "Ok", inputWidth: 80, click: function () { $$("CpnAlertPop").hide(); }, align: "right" }
                    ]
                },

            ],
        }
    });
};
var CoupSrchRet = function (RowId) {
    var selRow = $$("gridCCSrch").getItem(RowId);
    var selRow1 = $$("gridSettle").getSelectedItem();
    var vId = selRow.ixID;
    var vNo = selRow.ixcno;
    var vBal = selRow.ixBal;
    var vCpTpId = $$("ddlCCoupon").getValue();
    $$("txtC_CouponNo").setValue(vId);
    var vGstTyId = "";
    var vSettleAmt = 0; 
    var vGstId = "";
    vGstId = window.Ret_Guest_Id;
    if (selRow1.ixAmt) vSettleAmt = selRow1.ixAmt;
    if (vSettleAmt == "") vSettleAmt = 0;

    if (window.Ret_Guest_Type == "M") {
        if (vGstId != "") vGstId = fnGetGstRegNo(window.Ret_Guest_Type, vGstId);
        vGstTyId = "1";
    }

    if (fnIsValidCoupon(vCpTpId, vId, vGstId, vSettleAmt, vGstTyId, "", "1", "", "") == false) return false;
    var BalAmt = fnRetCrCouponBal(vCpTpId, vId)
    var NetBalAmt = BalAmt - vSettleAmt;
    $$("txtCpnBal").setValue(BalAmt);
    $$("txtCpnBillAmt").setValue(vSettleAmt);
    $$("txtCpnNetBalAmt").setValue(NetBalAmt);
    $$("CpnAlertPop").show();
    
}
var fnBtnCCSrchClick = function () {    
    debugger;
    if (fnChkSessVal() == false) return;
    $$("gridCCSrch").clearAll();
    $$("ddlCCGstType").setValue("");
    $$("txtCCGst").setValue("");
    var vCpTpId = $$("ddlCCoupon").getValue();
    var GstAppl = 0;
    var vGstTp = "";
    var vGstId="";
    if (vCpTpId == "") {
        webix.message({type:'warning', text:"Select Credit Coupon Type"})
        return;
    }
    var gridCpTp = $$("gridCCoupTp").serialize();
    if (gridCpTp.length > 0) {
        var newData = gridCpTp.filter(function (el) {
            return el.id == vCpTpId;
        });
        if (newData.length > 0) {
            GstAppl = newData[0].C_IND;
        }
    }
    if (GstAppl == "1") {        
        $$("ddlCCGstType").define("readonly", true);
        $$("txtCCGst").define("icon", "");
    }
    else {        
        $$("ddlCCGstType").define("readonly", false);        
        $$("txtCCGst").define("icon", "wxi-search");
    }
    vGstId=window.Ret_Guest_Id;
    if (window.Ret_Guest_Type == "M") {
        vGstTp = "1";
        if (vGstId != "") vGstId = fnGetGstRegNo(window.Ret_Guest_Type, vGstId);
    }
    if (vGstTp != "") {
        $$("ddlCCGstType").setValue(vGstTp);
        fnLoadCouponDet(vGstTp,vGstId);
        $$("txtCCGst").setValue(window.Ret_Guest_Nm);        
    }      
    $$("CCSrchPop").show();
};
var fnGetGstRegNo= function(GUEST_TYPE, GUEST_ID){
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNGETGSTREGNO",
        COMPID: CompId,
        GUEST_TYPE: GUEST_TYPE,
        GUEST_ID: GUEST_ID,
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (!rowData) rowData = "";
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;


}
var fnGstSrchBtnClick = function () {
    debugger;
    if ($$("ddlCCGstType").getValue() == "") return;
    if ($$("ddlCCGstType").getValue() == "1") {
        fnMembSrchLoadData();
        $$("MembSrchPop").show();
    }
    else if ($$("ddlCCGstType").getValue() == "7") {
        fnApplSrchLoadData();
        $$("ApplSrchPop").show();
    }
    else if ($$("ddlCCGstType").getValue() == "3") {
        fnDepndSrchLoadData();
        $$("DependSrchPop").show();
    }
    else if ($$("ddlCCGstType").getValue() == "2") {
        fnWalkInSrchLoadData();
        $$("WalkinSrchPop").show();
    }
    else if ($$("ddlCCGstType").getValue() == "5") {
        fnPosGstSrchLoadData();
        $$("PosGstSrchPop").show();
    }
};
var fnMembSrchLoadData = function () {
    debugger;
    $$("gridMembSrch").clearAll();
    $$("gridMembSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    var CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNMEMBSRCHLOADDATA",
        COMPID: CompId,        
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData.length > 0) {
                    var Rows = [];
                    $.each(rowData, function (key, value) {
                        debugger;
                        var set = {};
                        var vMNm = "";                        
                        var vMId = "";
                        var vPId = "";                        
                        if (value.PARTY_NM) vMNm = value.PARTY_NM.toString().trim();
                        if (value.MEMB_NO) vMId = value.MEMB_NO.toString().trim();
                        if (value.PARTY_ID) vPId = value.PARTY_ID.toString().trim();
                        set = {
                            ixId: vMId, ixNm: vMNm, ixHId: vPId
                        };
                        Rows.push(set);

                    });
                    $$("gridMembSrch").parse(Rows);
                    $$("gridMembSrch").refresh();
                    if ($$("gridMembSrch").count()) $$("gridMembSrch").select($$("gridMembSrch").getFirstId());
                    webix.UIManager.setFocus($$("gridMembSrch"));
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });    
};
var fnApplSrchLoadData = function () {
    debugger;
    $$("gridApplSrch").clearAll();
    $$("gridApplSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    var CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNAPPLSRCHLOADDATA",
        COMPID: CompId,        
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData.length > 0) {
                    var Rows = [];
                    $.each(rowData, function (key, value) {
                        debugger;
                        var set = {};
                        var vMNm = "";
                        var vMId = "";
                        var vPId = "";
                        if (value.MEMB_NM) vMNm = value.MEMB_NM.toString().trim();
                        if (value.APPL_SNO) vMId = value.APPL_SNO.toString().trim();
                        if (value.APPL_ID) vPId = value.APPL_ID.toString().trim();
                        set = {
                            ixId: vMId, ixNm: vMNm, ixHId: vPId
                        };
                        Rows.push(set);

                    });
                    $$("gridApplSrch").parse(Rows);
                    $$("gridApplSrch").refresh();
                    if ($$("gridApplSrch").count()) $$("gridApplSrch").select($$("gridApplSrch").getFirstId());
                    webix.UIManager.setFocus($$("gridApplSrch"));
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });    
};
var fnDepndSrchLoadData = function () {
    debugger;
    $$("gridDependSrch").clearAll();
    $$("gridDependSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    var CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNDEPNDSRCHLOADDATA",
        COMPID: CompId,        
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData.length > 0) {
                    var Rows = [];
                    $.each(rowData, function (key, value) {
                        debugger;
                        var set = {};
                        var vMNm = "";
                        var vMId = "";
                        var vPId = "";
                        var vDepNm = "";
                        var vDepSno = "";
                        if (value.PARTY_NM) vMNm = value.PARTY_NM.toString().trim();
                        if (value.MEMB_NO) vMId = value.MEMB_NO.toString().trim();
                        if (value.PARTY_ID) vPId = value.PARTY_ID.toString().trim();
                        if (value.DEPEND_SRNO) vDepSno = value.DEPEND_SRNO.toString().trim();
                        if (value.DEPEND_NM) vDepNm = value.DEPEND_NM.toString().trim();
                        set = {
                            ixId: vMId, ixNm: vMNm, ixDepNm: vDepNm, ixHId: vPId, ixDepSrno: vDepSno
                        };
                        Rows.push(set);

                    });
                    $$("gridDependSrch").parse(Rows);
                    $$("gridDependSrch").refresh();
                    if ($$("gridDependSrch").count()) $$("gridDependSrch").select($$("gridDependSrch").getFirstId());
                    webix.UIManager.setFocus($$("gridDependSrch"));
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnWalkInSrchLoadData = function () {
    debugger;
    $$("gridWalkInSrch").clearAll();
    $$("gridWalkInSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    var CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNWALKINSRCHLOADDATA",
        COMPID: CompId,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData.length > 0) {
                    var Rows = [];
                    $.each(rowData, function (key, value) {
                        debugger;
                        var set = {};
                        var vMNm = "";
                        var vGsId = "";
                        var vPId = "";                        
                        var vMcId = "";
                        var vAdd1 = "";
                        var vAdd2 = "";
                        var vAdd3 = "";
                        var vAddr = "";
                        if (value.GS_NM) vMNm = value.GS_NM.toString().trim();
                        if (value.GS_ID) vGsId = value.GS_ID.toString().trim();
                        if (value.GS_ID) vPId = value.GS_ID.toString().trim();
                        if (value.MC_ID) vMcId = value.MC_ID.toString().trim();
                        if (value.ADD1) vAdd1 = value.ADD1.toString().trim();
                        if (value.ADD2) vAdd2 = value.ADD2.toString().trim();
                        if (value.ADD3) vAdd3 = value.ADD3.toString().trim();
                        vAddr = vAdd1 + " " + vAdd2 + " " + vAdd3;
                        set = {
                            ixGuestID: vGsId, ixGuestNm: vMNm, ixGstAddr: vAddr, ixGstMcid: vMcId, ixGstGsid: vPId
                        };
                        Rows.push(set);

                    });
                    $$("gridWalkInSrch").parse(Rows);
                    $$("gridWalkInSrch").refresh();
                    if ($$("gridWalkInSrch").count()) $$("gridWalkInSrch").select($$("gridWalkInSrch").getFirstId());
                    webix.UIManager.setFocus($$("gridWalkInSrch"));
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnPosGstSrchLoadData = function () {
    debugger;
    $$("gridPGstSrch").clearAll();
    $$("gridPGstSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    var CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNPOSGSTSRCHLOADDATA",
        COMPID: CompId,
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData.length > 0) {
                    var Rows = [];
                    $.each(rowData, function (key, value) {
                        debugger;
                        var set = {};
                        var vMNm = ""; var vGsId = ""; var vPNm = "";var vGsTp = "";
                        var vTitle = ""; var vAdd1 = "";var vAdd2 = ""; var vAdd3 = "";
                        var vAddr = ""; var vPlace = ""; var vMobile = "";
                        if (value.GS_NM) vMNm = value.GS_NM.toString().trim();
                        if (value.GS_ID) vGsId = value.GS_ID.toString().trim();
                        if (value.PARTY_NM) vPNm = value.PARTY_NM.toString().trim();
                        if (value.GS_TYPE) vGsTp = value.GS_TYPE.toString().trim();
                        if (value.ADD1) vAdd1 = value.ADD1.toString().trim();
                        if (value.ADD2) vAdd2 = value.ADD2.toString().trim();
                        if (value.ADD3) vAdd3 = value.ADD3.toString().trim();
                        if (value.PLACE) vPlace = value.PLACE.toString().trim();
                        if (value.MOBILE) vMobile = value.MOBILE.toString().trim();
                        if (value.GS_TITLE) vTitle = value.GS_TITLE.toString().trim();
                        vAddr = vAdd1;
                        if (vAdd2 != "") {
                            if (vAddr.trim() != "") vAddr = vAddr + ",";
                            vAddr = vAddr + vAdd2;
                        }
                        if (vAdd3 != "") {
                            if (vAddr.trim() != "") vAddr = vAddr + ",";
                            vAddr = vAddr + vAdd3;
                        }
                        if (vPlace != "") {
                            if (vAddr.trim() != "") vAddr = vAddr + ",";
                            vAddr = vAddr + vPlace;
                        }                        
                        set = {
                            ixGsTitle: vTitle, ixGsNm: vMNm,ixGsComp:vPNm, ixGsAddrs: vAddr, ixGsId: vGsId, ixGsTyId: vGsTp,
                            ixMobile:vMobile,
                        };
                        Rows.push(set);                      

                    });
                    $$("gridPGstSrch").parse(Rows);
                    $$("gridPGstSrch").refresh();
                    if ($$("gridPGstSrch").count()) $$("gridPGstSrch").select($$("gridPGstSrch").getFirstId());
                    webix.UIManager.setFocus($$("gridPGstSrch"));
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;
};
var fnLoadCouponDet = function (vGstTyId, GstId, DepSrNo) {
    DepSrNo = DepSrNo || "";
    debugger;
    if (GstId == "") return;
    $$("gridCCSrch").clearAll();
    $$("gridCCSrch").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });

    var CompId = $$("Property").getValue();    
    var vCoupId = $$("ddlCCoupon").getValue();
    Request = {
        REQ_NM: "FNLOADCOUPONDET",
        COMPID: CompId,
        GST_TYPE: vGstTyId,
        GST_ID: GstId,
        DEP_SRNO: DepSrNo,
        CoupID: vCoupId
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (rowData.length > 0) {
                    var Rows = [];
                    $.each(rowData, function (key, value) {
                        debugger;
                        var set = {};
                        var vCPRF = "";
                        var vCCNo = "";
                        var vBal = 0;                     
                        
                        if (value.CC_PRF) vCPRF = value.CC_PRF.toString().trim();
                        if (value.CC_NO) vCCNo = value.CC_NO.toString().trim();
                        if (value.BAL) vBal = value.BAL;
                        
                        set = {
                            ixcno: vCPRF, ixBal: vBal, ixID: vCCNo
                        };
                        Rows.push(set);

                    });
                    $$("gridCCSrch").parse(Rows);
                    $$("gridCCSrch").refresh();
                    if ($$("gridCCSrch").count()) $$("gridCCSrch").select($$("gridCCSrch").getFirstId());
                    webix.UIManager.setFocus($$("gridCCSrch"));
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;


};
var fnddlCurrChange = function () {
    var Temp_Bal_Amt = "";
    var Temp_Cur_Amt = "";
    var Temp_Mode_Text = "";
    var vCurrId = $$("ddlCurr").getValue();
    var newData = [];
    var SelRow = $$("gridSettle").getSelectedItem();
    var Temp_Mode_Text = SelRow.ixModeCombo;
    var SumAmt = fnSumColum("ixAmt");
    var TotalAmt = 0;
    if ($$("txtPayableAmt") != null && $$("txtPayableAmt") != undefined) {
        TotalAmt = $$("txtPayableAmt").getValue();
    }
    if (TotalAmt == "") TotalAmt = 0;
    var Temp_Bal_Amt = TotalAmt - SumAmt;
    if (Temp_Mode_Text != Md_Forn) return;
    var vFrnAmt = "";
    var vFExConvRt = "";
    var vBaseFexVal = 0;
    var Temp_Cur_Amt = 0;
    if (SelRow.ixAmt) Temp_Cur_Amt = SelRow.ixAmt;   

    if (vCurrId != "") {
        var gridCurr = $$("gridCurr").serialize();
        if (gridCurr.length > 0) {
            newData = gridCurr.filter(function (el) {
                return el.id == vCurrId;
            });
        }

        if (newData.length > 0) {
            debugger;
            var vConvRate = 0;
            var vDecLen = 0;
            if (newData[0].SALE_CONV_RATE) vConvRate = newData[0].SALE_CONV_RATE;
            $$("txtFEX_ConvRate").setValue(vConvRate);
            if (newData[0].VAL_DECIM_LIMIT) vDecLen = newData[0].VAL_DECIM_LIMIT;

            if ($$("txtFEX_FornAmt").getValue()) vFrnAmt = $$("txtFEX_FornAmt").getValue();
            if ($$("txtFEX_ConvRate").getValue()) vFExConvRt = $$("txtFEX_ConvRate").getValue();

            //txtFEX_ConvRate.Precision = 8
            //txtFEX_ConvRate.Skale = 8

            //txtFEX_FornAmt.Skale = cmbCurr.SubItem(3)
            //txtFEX_ExtrAmt.Skale = CurrencyDecLength          

            if (vFrnAmt != "" && vFExConvRt != "") {
                vBaseFexVal = vFrnAmt * vFExConvRt;
                $$("txtFEX_BaseValue").setValue(vBaseFexVal);
                if (Temp_Bal_Amt + Temp_Cur_Amt < vBaseFexVal) {
                    $$("txtFEX_ExtrAmt").setValue(vBaseFexVal - (Temp_Bal_Amt + Temp_Cur_Amt));
                }
                else $$("txtFEX_ExtrAmt").setValue("");


                if (Temp_Bal_Amt + Temp_Cur_Amt < vBaseFexVal) {
                    SelRow.ixAmt = Temp_Bal_Amt + Temp_Cur_Amt;
                }
                else {
                    SelRow.ixAmt = vBaseFexVal;

                }


            }
        }
    }

    if (OnClearSet == "0") {
        fnStoreToSpread(Md_Forn);
        var vBaseFexVal = 0;
        if ($$("txtFEX_BaseValue").getValue()) vBaseFexVal = $$("txtFEX_BaseValue").getValue();
        if (Temp_Bal_Amt + Temp_Cur_Amt < vBaseFexVal) {
            SelRow.ixAmt = Temp_Bal_Amt + Temp_Cur_Amt;
        }
        else {
            SelRow.ixAmt = vBaseFexVal;

        }
    }
};
var fnFExFrnAmtChange = function () {
    debugger;
    var vFrnAmt = "";
    var vFExConvRt = "";
    if ($$("txtFEX_FornAmt").getValue()) vFrnAmt = $$("txtFEX_FornAmt").getValue();
    if ($$("txtFEX_ConvRate").getValue()) vFExConvRt = $$("txtFEX_ConvRate").getValue();
    var SelRow = $$("gridSettle").getSelectedItem();
    if (!SelRow) return;
    var Temp_Mode_Text = SelRow.ixModeCombo;
    var SumAmt = fnSumColum("ixAmt");
    var TotalAmt = 0;
    var Temp_Cur_Amt = 0;
    if ($$("txtPayableAmt") != null && $$("txtPayableAmt") != undefined) {
        TotalAmt = $$("txtPayableAmt").getValue();
    }
    if (TotalAmt == "") TotalAmt = 0;
    var Temp_Bal_Amt = TotalAmt - SumAmt;
    if (SelRow.ixAmt) Temp_Cur_Amt = SelRow.ixAmt;
    if (vFrnAmt == "") vFrnAmt = 0;

    if (vFExConvRt != "") {

        if (Temp_Mode_Text != Md_Chq) return;
        var vBaseFexVal = 0;
        vBaseFexVal = vFrnAmt * vFExConvRt;
        $$("txtFEX_BaseValue").setValue(vBaseFexVal);
        if (Temp_Bal_Amt + Temp_Cur_Amt < vBaseFexVal) {
            $$("txtFEX_ExtrAmt").setValue(vBaseFexVal - (Temp_Bal_Amt + Temp_Cur_Amt));
        }
        else $$("txtFEX_ExtrAmt").setValue("");


        if (Temp_Bal_Amt + Temp_Cur_Amt < vBaseFexVal) {
            SelRow.ixAmt = Temp_Bal_Amt + Temp_Cur_Amt;
        }
        else {
            SelRow.ixAmt = vBaseFexVal;

        }
    }

    if (OnClearSet == "0") {
        fnStoreToSpread(Md_Chq);
        var vBaseFexVal = 0;
        if ($$("txtFEX_BaseValue").getValue()) vBaseFexVal = $$("txtFEX_BaseValue").getValue();
        if (Temp_Bal_Amt + Temp_Cur_Amt < vBaseFexVal) {
            SelRow.ixAmt = Temp_Bal_Amt + Temp_Cur_Amt;
        }
        else {
            SelRow.ixAmt = vBaseFexVal;

        }
    }

};
var fnddlCrCurrChange = function () {
    debugger;
    var Temp_Bal_Amt = "";
    var Temp_Cur_Amt = "";
    var Temp_Mode_Text = "";
    var vCurrId = $$("ddlCrCurr").getValue();
    var newData = [];
    var vFrnAmt = "";
    var vFExConvRt = "";
    var vBaseFexVal = 0;
    var Temp_Cur_Amt = 0;
    var vConvRate = 0;
    var vDecLen = 0;

    var SelRow = $$("gridSettle").getSelectedItem();
    if (!SelRow) return;
    var SumAmt = fnSumColum("ixAmt");
    var TotalAmt = 0;
    if ($$("txtPayableAmt") != null && $$("txtPayableAmt") != undefined) {
        TotalAmt = $$("txtPayableAmt").getValue();
    }
    if (TotalAmt == "") TotalAmt = 0;
    var Temp_Bal_Amt = TotalAmt - SumAmt;
    if (SelRow.ixAmt) Temp_Cur_Amt = SelRow.ixAmt;

    if (vCurrId != "") {
        var gridCurr = $$("gridCurr").serialize();
        if (gridCurr.length > 0) {
            newData = gridCurr.filter(function (el) {
                return el.id == vCurrId;
            });
        }

        if (newData.length > 0) {
            debugger;            
            if (newData[0].SALE_CONV_RATE) vConvRate = newData[0].SALE_CONV_RATE;
            $$("txtconvrt").setValue(vConvRate);
            if (newData[0].VAL_DECIM_LIMIT) vDecLen = newData[0].VAL_DECIM_LIMIT;
            //$$("txtconvrt").define("format", "111.0000");
            //$$("txtconvrt").refresh();
            //$$("txtCrCurrEq").define("format", "111.0000");
            //$$("txtCrCurrEq").refresh();
            if (vCurrId != window.BASE_CURRENCY)
            {
                $$("txtCrCurrEq").show();
                $$("txtconvrt").show();
                $$("txtCC_BaseValue").show();
                $$("txtCC_ExtrAmt").show();
            }
            else {
                $$("txtCrCurrEq").hide();
                $$("txtconvrt").hide();
                $$("txtCC_BaseValue").hide();
                $$("txtCC_ExtrAmt").hide();
            }

            
            //txtconvrt.Precision = 8
            //txtconvrt.Skale = 8

            //txtCrCurrEq.Skale = cmbCurr.SubItem(3)
            //txtCrCurrEq.Skale = CurrencyDecLength
            
            var Temp_Mode_Text = SelRow.ixModeCombo;            
            if (Temp_Mode_Text != Md_Chq) return;            

            if ($$("txtCrCurrEq").getValue()) vFrnAmt = $$("txtCrCurrEq").getValue();
            if ($$("txtconvrt").getValue()) vFExConvRt = $$("txtconvrt").getValue();
            if (vFrnAmt == "") vFrnAmt = 0;
            if (vFExConvRt != "") {
                vBaseFexVal = vFrnAmt * vFExConvRt;
                $$("txtCC_BaseValue").setValue(vBaseFexVal);
                if (Temp_Bal_Amt + Temp_Cur_Amt < vBaseFexVal) {
                    $$("txtCC_ExtrAmt").setValue(vBaseFexVal - (Temp_Bal_Amt + Temp_Cur_Amt));
                }
                else $$("txtCC_ExtrAmt").setValue("");


                if (Temp_Bal_Amt + Temp_Cur_Amt < vBaseFexVal) {
                    SelRow.ixAmt = Temp_Bal_Amt + Temp_Cur_Amt;
                }
                else {
                    SelRow.ixAmt = vBaseFexVal;

                }
            }
        }
    }

    if (OnClearSet == "0" && vCurrId != "") {
        fnStoreToSpread(Md_Chq);
        var vBaseFexVal = 0;        
        if ($$("txtCC_BaseValue").getValue()) vBaseFexVal = $$("txtCC_BaseValue").getValue();
        if (Temp_Bal_Amt + Temp_Cur_Amt < vBaseFexVal) {
            SelRow.ixAmt = Temp_Bal_Amt + Temp_Cur_Amt;
        }
        else {
            SelRow.ixAmt = vBaseFexVal;

        }
    }
};
var fnFrnAmtChange = function () {
    debugger;
    var vFrnAmt = "";
    var vFExConvRt = "";
    if ($$("txtCrCurrEq").getValue()) vFrnAmt = $$("txtCrCurrEq").getValue();
    if ($$("txtconvrt").getValue()) vFExConvRt = $$("txtconvrt").getValue();
    var SelRow = $$("gridSettle").getSelectedItem();
    if (!SelRow) return;
    var Temp_Mode_Text = SelRow.ixModeCombo;
    var SumAmt = fnSumColum("ixAmt");
    var TotalAmt = 0;
    var Temp_Cur_Amt = 0;
    if ($$("txtPayableAmt") != null && $$("txtPayableAmt") != undefined) {
        TotalAmt = $$("txtPayableAmt").getValue();
    }
    if (TotalAmt == "") TotalAmt = 0;
    var Temp_Bal_Amt = TotalAmt - SumAmt;
    if (SelRow.ixAmt) Temp_Cur_Amt = SelRow.ixAmt;
    if (vFrnAmt == "") vFrnAmt = 0;

    if (vFExConvRt != "") {

        if (Temp_Mode_Text != Md_Chq) return;

        var vBaseFexVal = 0;

        vBaseFexVal = vFrnAmt * vFExConvRt;
        $$("txtCC_BaseValue").setValue(vBaseFexVal);
        if (Temp_Bal_Amt + Temp_Cur_Amt < vBaseFexVal) {
            $$("txtCC_ExtrAmt").setValue(vBaseFexVal - (Temp_Bal_Amt + Temp_Cur_Amt));
        }
        else $$("txtCC_ExtrAmt").setValue("");


        if (Temp_Bal_Amt + Temp_Cur_Amt < vBaseFexVal) {
            SelRow.ixAmt = Temp_Bal_Amt + Temp_Cur_Amt;
        }
        else {
            SelRow.ixAmt = vBaseFexVal;

        }
    }

    if (OnClearSet == "0") {
        fnStoreToSpread(Md_Chq);
        var vBaseFexVal = 0;
        if ($$("txtCC_BaseValue").getValue()) vBaseFexVal = $$("txtCC_BaseValue").getValue();
        if (Temp_Bal_Amt + Temp_Cur_Amt < vBaseFexVal) {
            SelRow.ixAmt = Temp_Bal_Amt + Temp_Cur_Amt;
        }
        else {
            SelRow.ixAmt = vBaseFexVal;

        }
    }

};
var fngridAmtChange = function () {
    debugger;    
    if ($$("fmFExch").isVisible() == false) return;
    var SelRow = $$("gridSettle").getSelectedItem();
    var SumAmt = fnSumColum("ixAmt");
    var TotalAmt = 0;
    var Temp_Cur_Amt = 0;
    if ($$("txtPayableAmt") != null && $$("txtPayableAmt") != undefined) {
        TotalAmt = $$("txtPayableAmt").getValue();
    }
    if (TotalAmt == "") TotalAmt = 0;
    var B_Amt1 = TotalAmt - SumAmt;
    var B_Amt = 0;
    if (SelRow.ixAmt) B_Amt = SelRow.ixAmt;
    B_Amt = B_Amt + B_Amt1;
    var vConvRate = 0;
    if ($$("txtFEX_ConvRate").getValue()) vConvRate = $$("txtFEX_ConvRate").getValue();

    if (vConvRate != 0) {
        var vRetAmt = B_Amt / vConvRate;
        vRetAmt = vRetAmt.toFixed(2);
        $$("txtEqvAmt").setValue(vRetAmt);
    }
};
function fnNumericText(code, e) {
    debugger;
                    
    var charCode = e.which || e.keyCode;
    if (e.shiftKey == true) return false;
    if (e.ctrlKey == true) return false;
    if (charCode == 46 || charCode == 37 || charCode == 39) {
        return true
    }
    if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
        return false;
    }
    else {
        debugger;                       
        return true;
    }
};
function fnFloatText(code, e, vText) {
    debugger;

    var charCode = e.which || e.keyCode;
    if (e.shiftKey == true) return false;
    if (e.ctrlKey == true) return false;
    //var dotPos = vText.indexOf(".");

    if (charCode == 46 || charCode == 37 || charCode == 39 || charCode == 190 || charCode == 110) {
         return true;
    }
    if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
        return false;
    }
    else {
        debugger;
        //if (e.target.selectionStart >= dotPos+3 && dotPos==3) {
        //    return false;
        //}
        //else
        return true;
    }
};
var fnSumColum = function (ColId) {
    debugger;
    var sum = 0;
    var value = 0;
    rowData = $$("gridSettle").serialize();
    if (rowData.length > 0) {
        for (var i = 0; i < rowData.length; i++) {
            debugger;
            value = rowData[i][ColId] * 1;
            if (!isNaN(value))
                sum += value;
        }
    }
    return sum;
};
var fnCheckMandatory = function () {
    var vColumn = $$("gridSettle").getColumnConfig("ixAmt");
    var vBalAmt = vColumn.footer[0].value;
    var bVal = 1;

    if (vBalAmt != 0) {
        webix.message({ type: 'warning', text: 'Settle Amt is not not matching with Bill Amt' });
        webix.UIManager.setFocus($$("gridSettle"));
        return false;
    }
    if (fnIsValidDt() == false) return false;

    if (!($$("txtBillNo").getValue())){        
        webix.message({ type: 'warning', text: 'Bill No can not be empty' });
        webix.UIManager.setFocus($$("txtBillNo"));
        return false;
    }
    var vPayAmt=0;
    if($$("txtPayableAmt").getValue()) vPayAmt=$$("txtPayableAmt").getValue();    
    if (vPayAmt < 0)
    {      
        webix.message({ type: 'warning', text: 'Please Refund' + Math.abs(vPayAmt).toString() + " Before Settlement" });
        webix.UIManager.setFocus($$("txtBillNo"));
        return false;
    }
    var gridSettle = $$("gridSettle").serialize();

    $$("gridSettle").eachRow(function (row) {
        debugger;
        var SelRow = $$("gridSettle").getItem(row);

        if (fnIsValid(row) == false) {
            debugger;
            var vModeText = "";
            if (SelRow.ixModeCombo) vModeText = SelRow.ixModeCombo;
            if (vModeText != "") {
                OnClearSet = true;
                fnDisDet(vModeText);
                fnGetFromSpread(row, vModeText);
                OnClearSet = false;
            }
            bVal = 0;
            return false;
            
        }
    });

    if (bVal == 0) return false;


    if (window.M_TAX = "1") {
        var newData = gridSettle.filter(function (el) {
            return el.ixModeCombo == Md_ToRoom;
        });
        if (newData.length > 0 && gridSettle.length > 1) {            
            webix.message({ type: 'warning', text: "For 'To Room' Posting only one Settlement is allowed." });
            webix.UIManager.setFocus($$("txtBillNo"));
            return false;
        }
    }

};
var fnbtnCancelClick = function () {
    debugger;
    if (fnChkSessVal() == false) return;
    if (!($$("txtBillNo").getValue())) {
        webix.message({ type: 'warning', text: 'Bill No can not be empty' });
        webix.UIManager.setFocus($$("txtBillNo"));
        return false;
    }
    
    document.getElementById("btnSettle").disabled = true;
    document.getElementById("btnCancel").disabled = true;
    document.getElementById("btnSave").disabled = false;
    ///$$("gridSettle").enable();

    Current_Mode = "CANCEL";
    $$("txtCancReason").setValue("");
    $$("fmCancel").show();

};
var fnbtnSettleClick = function () {
    if (fnChkSessVal() == false) return;
    debugger;
    $$("gridSettle").editStop();
    $$("gridSettle").refresh();
    if (!($$("txtBillNo").getValue())) {
        webix.message({ type: 'warning', text: 'Bill No can not be empty' });
        webix.UIManager.setFocus($$("txtBillNo"));
        return false;
    }
    var Total_Pay_Amt = 0;
    var Bill_Amt = 0;
    if ($$("txtPayableAmt").getValue()) Total_Pay_Amt = $$("txtPayableAmt").getValue();
    if ($$("txtBillAmt").getValue()) Bill_Amt = $$("txtBillAmt").getValue();
    var SelRowId = $$("gridSettle").getFirstId();
    var SelRow = $$("gridSettle").getItem(SelRowId);
    SelRow.ixAmt = Total_Pay_Amt;
    $$("gridSettle").updateItem(SelRowId, SelRow);
    $$("gridSettle").refresh();

    document.getElementById("btnSettle").disabled = true;
    document.getElementById("btnCancel").disabled = true;
    document.getElementById("btnSave").disabled = false;
    document.getElementById("btnAddRow").disabled = false;
    $$("gridSettle").enable();

    Current_Mode = "SETTLE";

    if (window.ST_IND == "1") {
        if (Total_Bal_Amt > window.ST_AMT) {
            $$("txtPANNo").show();
            $$("txtPANNo").config.label = window.ST_NARR;

        }
    }
    if ($$("txtPANNo").isVisible())
    {
        var vPan = fnGetGuestPAN(window.Ret_Guest_Type, window.Ret_Guest_Id);
        $$("txtPANNo").setValue(vPan);
    }
    if (Total_Pay_Amt == 0 && Bill_Amt == 0) fnCreateSettle();

};
var fnGetGuestPAN = function (GUEST_TY, GUEST_ID) {
    debugger;
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNGETGUESTPAN",
        COMPID: CompId,
        GUEST_TY: GUEST_TY,
        GUEST_ID: GUEST_ID
    }
    var rowData = 0;
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (!rowData) rowData = "";              
                
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
    return rowData;


};
var fnCreateSettle = function () {
    debugger;

    $$("gridSettle").editStop();
    $$("gridSettle").refresh();

    if (!($$("txtBillNo").getValue())) {
        webix.message({ type: 'warning', text: 'Bill No can not be empty' });
        webix.UIManager.setFocus($$("txtBillNo"));
        return false;
    }
    var gridSettle = $$("gridSettle").serialize();
    if (Current_Mode == "") 
    {
        webix.message({ type: 'warning', text: "Mode Cannot be Empty." });
        //webix.UIManager.setFocus($$("gridSettle"));
        return false;        
    }    
    var vPayAmt = 0;
    if ($$("txtPayableAmt").getValue()) vPayAmt = $$("txtPayableAmt").getValue();

    var vBillAmt = 0;
    if ($$("txtBillAmt").getValue()) vBillAmt = $$("txtBillAmt").getValue();
    if (Current_Mode == "SETTLE") {
        if (vPayAmt != 0 || vBillAmt != 0) {
            if (fnCheckMandatory() == false) return false;
        }
        if (window.ST_MAD = "2" && $$("txtPANNo").isVisible() == true) {
            if ($$("txtPANNo").setValue() = "") {
                var PanCap = $$("txtPANNo").config.label;
                webix.message({ type: 'warning', text: PanCap + " Cannot be Empty." });
                webix.UIManager.setFocus($$("txtPANNo"));
                return false;
            }
        }

        if (!($$("txtLessAdv").getValue()) && $$("txtLessAdv").getValue()!=0) {
            vModeId = gridSettle[0].ixModeCombo;
            if (vModeId == Md_Void) {                
                webix.confirm(
                   {
                       title: 'Confirmation',
                       ok: 'yes',
                       cancel: 'No',
                       text: 'Reservation Advance Adjusted.Proceed to Void?',
                       callback: function (result) {
                           if (result) {
                               debugger;
                               fnCallMemSetlValid();
                           }
                           else {
                               return false;
                           }
                       }
                   }
                 );
            }
            else fnCallMemSetlValid();
        }
        else fnCallMemSetlValid();        
    }
    else if (Current_Mode == "CANCEL") {
        if (!($$("txtCancReason").getValue())) {
            webix.message({ type: 'warning', text: 'Cancel Reason can not be empty' });
            webix.UIManager.setFocus($$("txtCancReason"));
            return false;
        }
        fnCancel();
    }
}

var fnCancel = function()
{
    debugger;
    CompId = $$("Property").getValue();
    var bSuc = 0;
    $("#loading").show();
    Request = {
        REQ_NM: "FNBILLCANCELMAIN",
        COMPID: CompId,
        Ret_Orig_BillNo: window.Ret_Original_Bill_No,
        Ret_ResBlk_Ind: window.Ret_ResBlk_Ind,
        Cancel_Reason: $$("txtCancReason").getValue(),
        BN_OUTLET_ID: window.BN_OUTLET_ID,
    }
    var rowData = 0;
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: true,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                debugger;
                rowData = JSON.parse(data);
                if (!rowData) rowData = "";
                if (rowData == "1") {
                    webix.message({
                        type: 'warning',
                        text: "One of the Split Bill is Settled. Cannot cancel this Bill"
                    })                    
                    $("#loading").hide();
                }
                else if (rowData == "2") {
                    webix.message({
                        type: 'warning',
                        text: "Error on Cacellation"
                    })
                    $("#loading").hide();
                }
                else if (rowData == "0") {
                    webix.message({
                        type: 'success',
                        text: " Bill Cancelled Successfully",
                    })                    
                    $("#loading").hide();
                    fnClearCont();
                }
                $("#loading").hide();
            }
            $("#loading").hide();
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            $("#loading").hide();
        }
    });
    return rowData;
}


var fnCallMemSetlValid = function () {

    debugger;
    vData = $$("gridSettle").serialize();
    var newData = vData.filter(function (el) {
        return el.ixModeCombo == Md_Mem;
    });
    if (newData.length > 0) {
        if (Memb_Update_Ind == "1" && MembCrVal == "1") {
            fnIsvalidMembSetl();
        }
        else {
            fnSave();
        }
    }
    else {
        fnSave();
    }

}

var fnSave = function () {
    var gridSettle = $$("gridSettle").serialize();

    $.each(gridSettle, function (key, sVal) {
        debugger;
        $.each(sVal, function (key, value) {
            debugger;
            if (value != null && value != undefined) sVal[key] = value.toString();            
        });
    });

    var txtPayableAmt=$$("txtPayableAmt").getValue();
    var txtBillAmt=$$("txtBillAmt").getValue();    
    var SETLE_DT=$$("txtBillDt").getValue();
    var txtBillValue=$$("txtBillValue").getValue();
    var txtDisc=$$("txtDisc").getValue();
    var txtTaxes=$$("txtTaxes").getValue();    
    var txtLessAdv="";
    if($$("txtLessAdv").isVisible==true) txtLessAdv =$$("txtLessAdv").getValue();
    var PanNoVis="0";
    if($$("txtPANNo").isVisible==true)PanNoVis="1"; 
    var PanNo=$$("txtPANNo").getValue();    
    debugger;
    CompId = $$("Property").getValue();
    var bSuc = 0;
    $("#loading").show();
    Request = {
        REQ_NM: "FNSAVESETTLE",
        COMPID: CompId,
        Ret_GSNo: Ret_GSNo,
        SETLE_DT:SETLE_DT,
        Ret_Orig_BillNo: window.Ret_Original_Bill_No,
        Ret_Dummy_BillNo: window.Ret_Dummy_Bill_No,
        Ret_Reserve_No: window.Ret_Reserve_No,
        Ret_ResBlk_Ind: window.Ret_ResBlk_Ind,
        Ret_Guest_Type: window.Ret_Guest_Type,
        Ret_Guest_Id: window.Ret_Guest_Id,
        chkFinalBill: chkFinalBill,        
        txtPayableAmt:txtPayableAmt,
        txtBillAmt:txtBillAmt,
        txtLessAdv:txtLessAdv,
        txtDisc:txtDisc,
        txtTaxes:txtTaxes,
        gridSettle:gridSettle,
        AuthUSer:AuthUSer,
        AuthDesc:AuthDesc,
        PanNoVis:PanNoVis,
        PanNo:PanNo,
    }
    var rowData = 0;
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: true,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                debugger;
                rowData = JSON.parse(data);
                if (!rowData) rowData = "";
                if (rowData.STATUS == "0") {
                    webix.message({
                        type: 'warning',
                        text: rowData.Message,
                    })
                    bSuc = 0;
                    $("#loading").hide();
                }
                else if (rowData.STATUS == "1")
                {
                    webix.message({
                        type: 'success',
                        text: rowData.Message,
                    })
                    bSuc = 0;
                    $("#loading").hide();
                    fnClearCont();
                }                   
                $("#loading").hide();
            }
            $("#loading").hide();
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            $("#loading").hide();
        }
    });
    return rowData;
}

var MembCrLmtAlertWindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "MembCrLmtAlertPop",
        head: "Credit Limit Exceed Alert",
        position: "center",
        css: "WebIxStyle",
        height: 350,
        width: 420,
        move: true,
        body: {
            padding: { left: 10, top: 5, bottom: 5, right: 5 },
            rows: [
                    { view: "text", id: "txtMembBal", type: "text", label: "Member Outstanding Balance", labelWidth: 180, format: "111.00", readonly: true, width: 310, inputAlign: "right", },
                    { view: "text", id: "txtMembBillAmt", type: "text", label: "Bill Amount", labelWidth: 180, format: "111.00", readonly: true, width: 310, inputAlign: "right", },
                    { cols: [{ view: "label", css: "lines",height:50, label: "Charge Amount Exceeds Current Balance By", width: 180 }, { view: "text", id: "txtExdAmt", type: "text", format: "111.00", readonly: true, width: 130, inputAlign: "right", }, ] },

                {
                    margin: 10,
                    padding: { top: 5, bottom: 5, right: 5 },
                    cols: [{ view: "button",id: "btnAuthoriz", label: "Authorize to Exceed", inputWidth: 110,height:40, click: function () { $$("CreditAuthorizPop").show(); } }, { view: "button", type: "icon", height:30, icon: "wxi-check", label: "Ok", inputWidth: 80, click: function () { fnbtnMemCrLmtOkClick();}, align: "right" }
                    ]
                },

            ],
        }
    });
};
var CreditAuthorizwindowLoad = function () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "CreditAuthorizPop",
        head: "Authorization",
        position: "center",
        css: "WebIxStyle",
        height: 250,
        width: 420,
        move: true,
        body: {
            padding: { left: 10, top: 5, bottom: 5, right: 5 },
            rows: [
                    { view: "text", id: "txtPswd", type: "password", label: "Authorization Code", labelWidth: 180, width: 310, attributes: { maxlength: 15 }, },

                {
                    margin: 10,
                    padding: { top: 5, bottom: 5, right: 5 },
                    cols: [{ view: "button", type: "icon", icon: "wxi-check", label: "Ok", inputWidth: 80, click: function () { fnbtnCreditAuthorizOkClick(); }, align: "right" }
                    ]
                },

            ],
        }
    });

}
var fnbtnCreditAuthorizOkClick = function () {
    if ($$("txtPswd").getValue() == ""){        
        webix.message({ type: 'warning', text: "Authorization Code Cannot be Empty." });
        webix.UIManager.setFocus($$("txtPANNo"));
        return false;
    }
    if (fnMemCrLmtAuthChk($$("txtPswd").getValue()) == true) {
        $$("CreditAuthorizPop").hide();
        
    }
}
var fnMemCrLmtAuthChk = function (PSWD) {
    debugger;
    CompId = $$("Property").getValue();
    Request = {
        REQ_NM: "FNMEMCRLMTAUTHCHK",
        COMPID: CompId,
        PSWD: PSWD,
    }
    var rowData = "";
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    $.ajax({
        async: false,
        url: "/BQBill/API_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if (data != "") {
                rowData = JSON.parse(data);
                if (!rowData) rowData = "";
                if (rowData.Valid == "0") {
                    webix.message({ type: 'warning', text: rowData.Message });
                    webix.UIManager.setFocus($$("txtPswd"));
                    return false;
                }
                else AuthUSer = rowData.USER;
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
            return false;
        }
    });
    return true;
};
var fnbtnMemCrLmtOkClick = function () {
    debugger;
    if (CreditAuthorz == "1") {
        if (AuthUSer != "") fnSave();
    }
    $$("MembCrLmtAlertPop").hide();

};
var fnIsvalidMembSetl = function () {
    vData = $$("gridSettle").serialize();
    var newData = vData.filter(function (el) {
        return el.ixModeCombo == Md_Mem;
    });
    if (newData.length == 0) {        
        return true;
    }
    var MembId = window.Ret_Guest_Id;
    var Membcat = 0;
    if (window.Ret_Guest_Type == "M") Membcat = 1;

    var rsTemp = [];
    var hash = {};
    for (var i = 0; i < newData.length; i++) {
        var PartyId = newData[i].ixPartyId;        
        var SetlAmount = newData[i].ixAmt;
        var tips = newData[i].ixTips;
        if (SetlAmount == "") SetlAmount = 0;
        if (tips == "") tips = 0;
        SetlAmount = parseFloat(SetlAmount);
        tips = parseFloat(tips);
        var vData = [];
        var t = 0;
        var fRow = 0;
        if (rsTemp.length > 0) {
            vData = rsTemp.filter(function (el) {
                return el.membid == PartyId;
            });
        }
        if (vData.length == 0) {
            hash = {};
            hash = {
                membid: PartyId,
                amt: SetlAmount + tips,
                sRow: t,
            }
            rsTemp.push(hash);
            t = t + 1;
        }
        else {
            fRow = vData[0].sRow;
            rsTemp[fRow].amt = rsTemp[fRow].amt + Val(SetlAmount) + Val(tips)
        }
    }

    if (rsTemp.length > 0) {
        for (var j = 0; j < rsTemp.length; j++) {
            AuthUSer = "";
            var vMemId = rsTemp[j].membid;
            var vAmt = rsTemp[j].amt;
            var Lbal1 = fnGetMembCloseBal(vMemId);
            var Lbal = Lbal1 * -1;
            var CrLmt = fnGetAllowedCrLimt(vMemId)
            var BillAmt1 = vAmt + CrLmt;
            if (Lbal < BillAmt1) {
                $$("btnAuthoriz").hide();
                var vBalAmt = (BillAmt1 - Lbal);
                vBalAmt = Math.abs(vBalAmt);
                if(CreditAuthorz=="1")
                {
                    $$("btnAuthoriz").show();
                }
                $$("txtMembBal").setValue(Lbal1);
                $$("txtMembBillAmt").setValue(vAmt);
                $$("txtExdAmt").setValue(vBalAmt);
                $$("MembCrLmtAlertPop").show();
            }            
        }
    }
    else {
        fnSave();
    }

};

webix.ui.datafilter.totalColumn = webix.extend({
    refresh: function (master, node, value) {
        //debugger;
        var TotalAmt = 0;
        if ($$("txtPayableAmt") != null && $$("txtPayableAmt") != undefined) {
            TotalAmt = $$("txtPayableAmt").getValue();
        }
        if (TotalAmt == "") TotalAmt = 0;
        var sum1 = this.getColumnSum(master, value.columns[0]);
        var TotBalAmt = (TotalAmt - sum1).toFixed(2)
        node.firstChild.innerHTML = fnCurrFormat(TotBalAmt);
    },
    getColumnSum: function (master, column) {
        var sum = 0;
        master.mapCells(null, column, null, 1, function (value) {
            value = value * 1;
            if (!isNaN(value))
                sum += value;
            return value;
        });
        return sum;
    }
}, webix.ui.datafilter.summColumn);

function fnChkSessVal() {
    debugger;
    var bVal = "0";
    $.ajax({       
        async: false,
        url: "/BQBill/fnChkSessionval",
        type: 'POST',
        success: function (data) {
            debugger;
            if (data == "1") {
                bVal = "1";
            }
        },
        error: function (request, status, error) {
            bVal = "0";
        }
    });
    if (bVal == "1") return true;
    else {
        debugger;
        var Host = window.location.host;
        var LoadingUrl = "http://" + Host + "/Login.aspx";
        window.location.href = LoadingUrl;
    }

};



        

                    
