var app = angular.module('GPApp', ['webix']);
app.controller("GPController", function ($scope) {

    webix.editors.myeditor = webix.extend({
        render: function () {
            return webix.html.create("div", {
                "class": "webix_dt_editor"
            }, "<input type='text'  maxlength='10'/>");
        }
    }, webix.editors.text);

    var dataProp = ddlPropertyLoadFn();

    $scope.ddlProperty = {
        view: "combo",
        id: "ddlProperty",
        value: "WS",
        label: "Property",
        disabled: false,
        options: dataProp,
        labelwidth: 130,
        on: {
            onChange: function (newval, oldval) {
                var grid = fnGetRoomSold(newval);
                $$("grdRoomSold").clearAll();
                $$("grdRoomSold").parse(grid);
                $$("grdRoomSold").refresh();
            }
        }
    };

    var Roomsold = fnGetRoomSold("WS");

        $scope.DivForm = {
        view: 'form',
        minWidth: 900,
        MinHeight: 700,
        id: 'DivForm',
      
        elements: [
            {
                rows: [
                   {
                        view: "treetable",
                        id: "grdRoomSold",
                        select: "row",
                        data: Roomsold,
                        height: 475,
                        width: 700,
                        editable: true,
                        columns: [
                          { header: "Seg Id", id: "IXSegId", width: 5, css: { 'text-align': 'left ! important' }, hidden: true },
                          { header: "", id: "IXSno", width: 100, css: { 'text-align': 'left ! important' } },
                          { header: "Segment", id: "IXSegNm", width: 200, css: { 'text-align': 'Center ! important' } },
                          { header: "Account Code", id: "IXAcc", width: 150, css: { 'text-align': 'left ! important' }, editor: 'myeditor', liveEdit: true, maxlength: 10, },
                          { header: "Analysis Code1", id: "IXA1", width: 150, css: { 'text-align': 'left ! important' }, editor: 'myeditor', liveEdit: true, },
                          { header: "Analysis Code2", id: "IXA2", width: 150, css: { 'text-align': 'left ! important' }, editor: 'myeditor', liveEdit: true, },
                          { header: "Analysis Code6", id: "IXA6", width: 150, css: { 'text-align': 'left ! important' }, editor: 'myeditor', liveEdit: true, },
                          
                        ],
                        ready: function () {
                            this.openAll();
                        }
                    }

                   
                ]
            }
        ]
    }

    
});

function fnGetRoomSold(CompId)
{
    var dataparam = {};
    var rowData = "";
    dataparam["COMPID"] = CompId;
    dataparam["REQTYPE"] = "GET_ROOMSOLDOPEN";
    dataparam["L_TY"] = "3";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "") {
                rowData = JSON.parse(d);

            }
        },
    });
    return rowData;
}

function fnGetRoomSoldSave()
{
    var dataparam = {};
    var grdRoomSold = $$("grdRoomSold").serialize();
    var GrdLen = grdRoomSold.length;

    if (GrdLen == 0) {
        alert('Grid is empty');
        return false;
    }

    for (var i = 0; i < GrdLen; i++)
    {
        if (grdRoomSold[i].IXAcc == "" || grdRoomSold[i].IXAcc == null) {
            alert("Account Code should be Valid");
            return false;
        }
    }

    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_ROOMSOLDSAVE";
    dataparam["GRIDRMSOLD"] = grdRoomSold;
    dataparam["L_TY"] = "3";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "") {
                rowData = JSON.parse(d);
                if ($.trim(rowData) == "True") {
                    alert('Updated Successfully');
                    
                }
            }
        },
    });
}

function ddlPropertyLoadFn() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "ddlPropertyLoadFn";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/SUN_MST/API_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {

            if (d != "")
                rowData = JSON.parse(d);
        },
    });
    return rowData;
}

