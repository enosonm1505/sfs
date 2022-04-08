
function fnNumKeypad(keyType) {
    var Header = "";

    var DotInd = 0;

    if (keyType == 1) {
        Header = "Enter Employee ID";
        DotInd = 1;
    }
    else if (keyType == 2) {
        Header = "Covers";
        DotInd = 1;
    }

    webix.ui({
        view: "window",
        //close: true,
        modal: true,
        id: "PopupSrch",
        move: true,
        css: "webix_header_border",
        width: 240,
        height: 315,
        head: Header,
        autofit: false,
        body: {

            width: 240,
            height: 315,
            paddingX: 10,

            rows: [
                 {
                     paddingY: 7,
                     cols: [
                         {
                             view: "text", id: "txtNumber", width: 220, height: 40, type: (keyType == 1 ? "password" : "text"), on: {
                                 'onKeyPress': function (e, id) {
                                     //debugger;
                                     if (e == 13) {
                                         if ($.trim(keyType) == "1") {
                                             fnNumPassEnter($$("txtNumber").getValue());
                                         }
                                     }
                                     else if (e == 27) {
                                         $$("txtNumber").setValue("");
                                         $$("PopupSrch").hide();
                                     }
                                 },
                             }
                         }
                     ]
                 },
                 {
                     cols: [
                        {
                            view: "button", id: "btnOne", label: "1", css: "webix_primary", width: 55, height: 55, on: {
                                onItemClick: function () {
                                    fnCallNumLogic("btnOne");
                                }
                            }
                        },
                        {
                            view: "button", id: "btnTwo", label: "2", css: "webix_primary", width: 55, height: 55, on: {
                                onItemClick: function () {
                                    fnCallNumLogic("btnTwo");
                                }
                            }
                        },
                        {
                            view: "button", id: "btnThree", label: "3", css: "webix_primary", width: 55, height: 55, on: {
                                onItemClick: function () {
                                    fnCallNumLogic("btnThree");
                                }
                            }
                        },
                        {
                            view: "button", id: "btnClear", label: "⤆", css: "webix_primary", width: 55, height: 55, on: {
                                onItemClick: function () {
                                    fnCallNumLogic("btnClear");
                                }
                            }
                        },
                     ]
                 },
                 {
                     cols: [
                           {
                               view: "button", id: "btnFour", label: "4", css: "webix_primary", width: 55, height: 55, on: {
                                   onItemClick: function () {
                                       fnCallNumLogic("btnFour");
                                   }
                               }
                           },
                           {
                               view: "button", id: "btnFive", label: "5", css: "webix_primary", width: 55, height: 55, on: {
                                   onItemClick: function () {
                                       fnCallNumLogic("btnFive");
                                   }
                               }
                           },
                           {
                               view: "button", id: "btnSix", label: "6", css: "webix_primary", width: 55, height: 55, on: {
                                   onItemClick: function () {
                                       fnCallNumLogic("btnSix");
                                   }
                               }
                           },
                           {
                               view: "button", id: "btnAllC", label: "C", css: "webix_primary", width: 55, height: 55, on: {
                                   onItemClick: function () {
                                       $$("txtNumber").setValue("");
                                   }
                               }
                           },
                     ]
                 },
                 {
                     cols: [
                       {
                           rows: [
                               {
                                   cols: [
                                     {
                                         view: "button", id: "btnSeven", label: "7", css: "webix_primary", width: 55, height: 55, on: {
                                             onItemClick: function () {
                                                 fnCallNumLogic("btnSeven");
                                             }
                                         }
                                     },
                                     {
                                         view: "button", id: "btnEight", label: "8", css: "webix_primary", width: 55, height: 55, on: {
                                             onItemClick: function () {
                                                 fnCallNumLogic("btnEight");
                                             }
                                         }
                                     },
                                     {
                                         view: "button", id: "btnNine", label: "9", css: "webix_primary", width: 55, height: 55, on: {
                                             onItemClick: function () {
                                                 fnCallNumLogic("btnNine");
                                             }
                                         }
                                     },
                                   ]
                               },
                               {
                                   cols: [
                                     {
                                         view: "button", id: "btnDot", label: ".", css: "webix_primary", width: 55, height: 55,
                                         hidden: (DotInd == 1 ? true : false),
                                         on: {
                                             onItemClick: function () {
                                                 fnCallNumLogic("btnDot");
                                             }
                                         }
                                     },
                                     {
                                         view: "button", id: "btnZero", label: "0", css: "webix_primary",
                                         width: (DotInd == 1 ? 110 : 55), height: 55, on: {
                                             onItemClick: function () {
                                                 fnCallNumLogic("btnZero");
                                             }
                                         }
                                     },
                                     {
                                         view: "button", id: "btnClose", label: "X", css: "webix_primary", width: 55, height: 55,
                                         on: {
                                             onItemClick: function () {
                                                 $$("PopupSrch").hide();
                                             }
                                         }
                                     },
                                   ]
                               }
                           ]
                       },
                       {
                           view: "button", id: "btnOK", label: "OK", css: "webix_primary", width: 55, height: 110,
                           on: {
                               onItemClick: function () {
                                   debugger;

                                   if ($.trim(keyType) == "1") {
                                       fnNumPassEnter($$("txtNumber").getValue());
                                   } else if ($.trim(keyType) == "2") {
                                       $("#hdnCovers").val(parseInt($$("txtNumber").getValue()));

                                       if ($.trim($$("txtNumber").getValue()) != "0")
                                           document.location = "/TPosTrans/TPosItemSelect";
                                       else
                                       {
                                           $$("PopupSrch").hide();
                                           return;
                                       }
                                   }
                               }
                           }

                       },
                     ]
                 },
            ]
        }
    }).show({
        x: 150, 	// left offset from the right side
        y: 100 	// top offset
    });

    $$("PopupSrch").show();
    $$("txtNumber").focus();
}

function fnCallNumLogic(ClickId) {
    //debugger;
    var AmtVal = "";

    if ($.trim(ClickId) == "btnClear") {

        AmtVal = $$("txtNumber").getValue().toString().substring(0, $.trim($$("txtNumber").getValue()).length - 1);
        $$("txtNumber").setValue(AmtVal);
    }
    else if ($.trim(ClickId) == "btnDot") {
        var Chck = $.trim($$("txtNumber").getValue().toString());

        if (Chck.includes(".") == false) {
            AmtVal = Chck.toString() + ".";
            $$("txtNumber").setValue(AmtVal);
        }
    }
    else {
        var LogicVal = "";

        if ($.trim(ClickId) == "btnOne")
            LogicVal = "1";
        else if ($.trim(ClickId) == "btnTwo")
            LogicVal = "2";
        else if ($.trim(ClickId) == "btnThree")
            LogicVal = "3";
        else if ($.trim(ClickId) == "btnFour")
            LogicVal = "4";
        else if ($.trim(ClickId) == "btnFive")
            LogicVal = "5";
        else if ($.trim(ClickId) == "btnSix")
            LogicVal = "6";
        else if ($.trim(ClickId) == "btnSeven")
            LogicVal = "7";
        else if ($.trim(ClickId) == "btnEight")
            LogicVal = "8";
        else if ($.trim(ClickId) == "btnNine")
            LogicVal = "9";
        else if ($.trim(ClickId) == "btnZero")
            LogicVal = "0";

        AmtVal = $$("txtNumber").getValue().toString() + LogicVal;

        $$("txtNumber").setValue(AmtVal);
    }
}


