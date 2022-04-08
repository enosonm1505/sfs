function TraceShow(reserveNo, type) {
    debugger;
    var Request = {
        COMP_ID: compId,
        USER_ID: userId,
        REG_NO: reserveNo,
        TYPE: type,
        VIEWMODE: "0",
        FROM_PAGE: "Login",
    }
    ExpBkTraceWindowLoad(Request);
};
function ExpBkTraceWindowLoad(Obj) {
    debugger;

    //added by thillai on 29/11/2021
    if ($$("ComTracePopup")) {
        if ($$("ComTracePopup").isVisible() == true)
            return false;
    }
    var Host = window.location.host;
    var path = window.location.href;
    var split = path.split(':');
    //var Host = "192.168.1.129";
    var LoadingUrl = split[0] + "://" + Host + "/Reports/WinTrace";
    var DataVal = JSON.stringify(Obj);
    DataVal = encodeURIComponent(DataVal);

    webix.ready(function () {
        webix.ui({
            view: "window",
            close: true,
            move: true,
            css: "Trace traceView",
            id: "ComTracePopup",
            modal: true,
            //head: "Trace",
            head: {
                view: "toolbar", css: "traceToolBar", cols: [
                    { view: "label", label: "Trace", css: "WinTraceHeader", maxWidth: 1150, },
                    {
                        view: "button", label: 'X', css: "btnCloseTrace", width: 30, click: function () {
                            $$("ComTracePopup").hide();
                        }
                    },
                ]
            },
            position: "center",
            modal: true,
            on: {
                onShow: function () {
                    var vWidth = window.innerWidth
                                   || document.documentElement.clientWidth
                                   || document.body.clientWidth;
                    var vHeight = window.innerHeight
                                   || document.documentElement.clientHeight
                                   || document.body.clientHeight;
                    if (vWidth > 1150) vWidth = 1150;
                    if (vHeight > 600) vHeight = 600;
                    $$('ComTracePopup').define("width", vWidth);
                    $$('ComTracePopup').define("height", vHeight)
                    $$('ComTracePopup').resize();
                }
            },
            body: {
                rows: [{
                    view: "iframe",
                    id: "frame-profit",
                    src: LoadingUrl + "?Param=" + DataVal,
                }
                ],
            }
        }).show();
    })
};