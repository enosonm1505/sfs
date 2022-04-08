

function LedgerPopFn(UserId, ConStr, CompId, FclYr) {
    debugger;
    document.getElementById('btnAccLed').blur();
    webix.ui({
        view: "window",
        close: true,
        modal:true,
        id:"LedgerPopup",
        head: "Ledger",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        autowidth:true,
        body: {
                rows:[{
                view: "datatable",
                id: "LedgerGrid",
                select: "row",
                data: [],
                height: 450,
                columns: [
                       { header: ["Account Code", { content: "textFilter" }], id: "AC_CD", width: 120, css: { 'text-align': 'center ! important' } },
                       { header: ["Account Name", { content: "textFilter" }], id: "P_NM", width: 260, css: { 'text-align': 'left ! important' } },
                       { header: "AC_ID", id: "AC_ID", hidden: true },
                ],
                on: {
                    'onItemClick': function (id) {
                        var getval = this.getItem(id.row);
                            debugger;
                            document.getElementById("hdnLedgerId").value = getval.AC_ID;
                            document.getElementById("hdnLedgerName").value = getval.P_NM;
                            document.getElementById("txtAccLed").value = getval.P_NM;
                            document.getElementById("hdnac_code").value = getval.AC_CD;
                            var btn = document.getElementById('btnLedSrchOk');
                            btn.click();
                            $$("LedgerPopup").hide();
                    },
                    'onKeyPress': function (e) {
                        debugger;
                        if (e == '13') {
                            var valid = this.getSelectedId(true);
                            var id = { row: valid[0].row };
                            this.callEvent("onItemClick", [id]);
                        }
                    },
                    'onBeforeFilter': function () {
                        debugger;
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    },
                    'onAfterFilter': function () {
                        debugger;
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    }
                }
                }],
               
        }
    });
    DropDownLoad(UserId, ConStr, CompId, FclYr);
}

function DropDownLoad(UserId, ConStr, CompId, FclYr) {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["USRID"] = UserId;
    reqobj["CONSTRING"] = ConStr;
    reqobj["COMPID"] = CompId;
    reqobj["FCLYR"] = FclYr;
    var dataparam = JSON.stringify(reqobj);
       $.ajax({
           type: "POST",
           async: false,
        url: "LedgerPopServices.asmx/GetRequestFn",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ request: dataparam }),
        dataType: "json",
        acceptType: "application/json;charset=utf-8",
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d.d);
                $$("LedgerGrid").clearAll();
                $$("LedgerGrid").parse(rowDatad);
                $$("LedgerGrid").refresh();
                $$("LedgerPopup").show();
                $$("LedgerGrid").select($$("LedgerGrid").getFirstId());
                webix.UIManager.setFocus($$("LedgerGrid"));
                $$("LedgerGrid").refresh();
                $$("LedgerGrid").eachColumn(function (id, col) {
                    var filter = this.getFilter(id);
                    if (id == "AC_CD") {
                        filter.autofocus = true;
                    }
                });
                $$("LedgerGrid").refresh();
            }
        }
       })
      
}