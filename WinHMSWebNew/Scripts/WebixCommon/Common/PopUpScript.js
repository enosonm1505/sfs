function ConfirmYesNo(Text) {
    return webix.confirm({
        ok: "Yes",
        cancel:"No",
        width: 350,
        title: "Confirm Message",
        text: Text,
        modal: true,
    });
}
function AlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    });
}

function SuccessMessage(Text) {
    return webix.alert({
        id:btnokpop,
        ok: "Ok",
        width: 350,
        title: "Success",
        text: Text,
        modal: true,
    });
}

function Message(Text,Type) {
    return webix.message({
        text: Text,
        type: Type,
        expire: 10000,
    });
}