
function fnPopupPass() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupPassword",
        head: "Cashier Password",
        position: "center",
        minWidth: 250,
        maxWidth: 250,
        move: true,
        height: 200,
        body: {
            view: 'form',
            minWidth: 250,
            maxWidth: 250,
            height: 110,
            elements: [
                {
                    rows: [
                        {
                            view: "text",
                            type: "password", id: "txtPwd",
                            width: 250,
                        },
                        {
                            height:20,
                        },
                        {
                            cols: [
                                 {
                                     width:85,
                                 },
                                 {
                                     view: 'button',
                                     label: 'Ok',
                                     maxWidth: 75,
                                     inputWidth: 70,
                                     on: {
                                         onItemClick: function () {
                                             fnSveCasheir();
                                         }
                                     }
                                 },
                            ]
                        },
                    ]
                }
            ]
        }
    });

    $$("PopupPassword").show();
}

function fnPopupCCNoView() {
    var rowData = [];
    var dataparam = {};
    dataparam["CCNo"] = $("#hdnCCFullNo").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARTrans/GETCCNoDec",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (data) {
            rowData = JSON.parse(data);
        }
    });

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupCCNo",
        head: "Credit Card No",
        position: "center",
        minWidth: 450,
        maxWidth: 450,
        move: true,
        height: 200,
        body: {
            view: 'form',
            minWidth: 450,
            maxWidth: 450,
            elements: [
                {
                    rows: [
                        {
                            view: "text",
                            id: "txtCCNo1",
                            label: "C.Card No.",
                            inputWidth: 350,
                            labelWidth: 120,
                            labelAlign: "Right",
                            width: 200, attributes: { maxlength: 17 },
                            readonly: true,
                            value: rowData,
                        },
                        {
                            view: "text",
                            id: "txtACCNo",
                            label: "Amend C.Card No.",
                            inputWidth: 350,
                            labelWidth: 120,
                            labelAlign: "Right",
                            width: 200, attributes: { maxlength: 17 }
                        },
                        {
                            height: 20,
                        },
                        {
                            minWidth: 250,
                            cols: [
                                {
                                },
                                {
                                     view: 'button',
                                     label: 'Save',
                                     maxWidth: 75,
                                     inputWidth: 70,
                                     on: {
                                         onItemClick: function () {
                                             $$("PopupCCNo").hide();
                                             fnChangCCNO();
                                         }
                                     }
                                 },
                                 {
                                     view: 'button',
                                     label: 'Close',
                                     maxWidth: 75,
                                     inputWidth: 70,
                                     on: {
                                         onItemClick: function () {
                                             $$("PopupCCNo").hide();
                                         }
                                     }
                                 },
                            ]
                        },
                    ]
                }
            ]
        }
    });

    $$("PopupCCNo").show();
}

function fnSveCasheir() {
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_VERIFYPASSWORD";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["txtPwd"] = $$("txtPwd").getValue();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/ARTrans/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (data) {
            if (data != "") {
                if (JSON.parse(data) == "Success") {
                    $$("PopupPassword").hide();

                    if ($.trim($$("txtPwd").getValue()) != "")
                        fnPopupCCNoView();
                }
                else {
                    webix.alert("Invalid password", "alert-warning");
                    $$("txtPwd").setValue(""); $$("PopupPassword").hide();
                }
            }
            else {
                $$("txtPwd").setValue("");
                $$("PopupPassword").hide();
            }
        }
    });
}