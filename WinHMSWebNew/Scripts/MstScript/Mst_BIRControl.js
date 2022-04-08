var app = angular.module('MSTApp', ['webix']);
app.controller("MSTMasterController", function ($scope) {

    $("#LoadDIv").hide();
    var dataset = fnBIRControlTot();
    var BIRConTot = dataset[0].BIR_Bill_Amt;
    var RestCount = dataset[0].BIR_Bill_Count;

    $scope.frmMstBirCon = {
        id: "MMstBirCon",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        height: 450,
        elements: [
            {
                paddingX: 20,
                rows: [
                  {
                      cols: [
                       {
                           view: "text",
                           id: "txtbircon",
                           label: "BIR Control Total",
                           labelAlign: "left",
                           labelWidth: 135,
                           inputWidth: 250,
                           width: 250,
                           attributes: { maxlength: 9 },
                           value: BIRConTot,
                           inputAlign: "Right",

                       },
                      ]
                  },
               {
                   cols: [
                      {
                          view: "text",
                          id: "txtrestcount",
                          label: "Reset Counter",
                          labelAlign: "left",
                          labelWidth: 135,
                          inputWidth: 250,
                          width: 250,
                          attributes: { maxlength: 5 },
                          value: RestCount,
                          inputAlign: "center",
                      },

                   ],
               },


                ]
            }
        ]
    }

});

function fnBIRControlTot() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_BIRCONTROLTOTAL";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/Master/MSTAPI_CALL",
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

