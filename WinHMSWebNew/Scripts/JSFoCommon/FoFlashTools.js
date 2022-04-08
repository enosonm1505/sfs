
var app = angular.module('FOTApp', ['webix']);

app.controller("FoTransController", function ($scope) {
    debugger;

    $("#hdnColCodeIndF").val("1");
    $("#RmPosViewId").val("0");

    var RmBldData = fnRoomBuidingData();

    fnAccountDt();
    
    var foControl = fnFoControl();
    $("#Upgrade_ind").val($.trim(foControl[0].UPGRADE_APPL_IND));
    

    var focont = fnFoCont();
    $("#hdnA26_ind").val($.trim(focont[0].A26_IND))
    $.trim(focont[0].A26_IND) == "1" ? $("#ChkRmStsPM").val("1") : $("#ChkRmStsPM").val("0");
    $.trim(foControl[0].R19_IND) == "1" ? $("#ChkRmStsSeq").val("1") : $("#ChkRmStsSeq").val("0");
    $("#VV_IND").val($.trim(focont[0].VV_IND));

    $scope.ChkSequence = {
        view: "checkbox",
        id: "ChkSequence",
        label: "Sequence",
        labelWidth: 70,
        width: 120,
        value: $.trim(foControl[0].R19_IND) == "1" ? "1" : "0",
        on: {
            "onChange": function () {
                $("#ChkRmStsSeq").val($$("ChkSequence").getValue());
                fnRoomStatusLoadData();
            }
        }
    }

    $scope.ChkPM1 = {
        view: "checkbox",
        id: "ChkPM1",
        label: "P.M",
        labelWidth: 30,
        width: 80,
        value: $("#hdnA26_ind").val() == "1" ? "1" : "0",
        on: {
            "onChange": function () {
                $("#ChkRmStsPM").val($$("ChkPM1").getValue());
                fnRoomStatusLoadData();
            }
        }
    }
    $scope.ChkRmstsFeat = {
        view: "checkbox",
        id: "ChkRmstsFeat",
        label: "Features",
        labelWidth: 60,
        width: 190,
        on: {
            "onChange": function () {
                if ($$("ChkRmstsFeat").getValue() == "1")
                    fnCallRoomFeaturePopup();
                else {
                    $("#RmFeatids").val("");
                    $$('RoomFeaturePopup').hide();
                    $("#btnRoomSts").click();
                }
            }
        }
    }
  
    $scope.RoomFilter = {
        view: "button",
        id: "RoomFilter",
        label: "<span  class=' fa fa-filter'></span>",
        width: 30,
        height: 30,
        //type: 'button',
        //icon: "wxi-filter",
        css:'webix_primary',
        on: {
            onItemClick: function () {
                fnCallRoomFilterPopup();
            }
        }
    }
    

    $scope.txtRmStsAccDt = {
        view: "datepicker",
        id: "txtRmStsAccDt",
        stringResult: true,
        disabled: true,
        label: "AC Dt.",
        format: "%d/%m/%Y",
        value: $("#hdnAccountDt").val(),
        labelWidth: 50,
        width: 190,

    }

   
});



function fnLoadProperty() {

    $("#LoadDIv").show();

    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        //view: "combo",
        view : "richselect",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        label: "",
        labelwidth: 1,
        width: 250,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                
                $("#hdnCompId").val(newval);
                fnAccountDt();
                $$("txtRmStsAccDt").setValue($("#hdnAccountDt").val());
                LoadCurrDet($("#hdnCompId").val());
                var foControl = fnFoControl();
                if ($.trim(foControl[0].R19_IND) == "1") {
                    $("#ChkRmStsSeq").val("1");
                    $$("ChkSequence").setValue("1");
                }
                else {
                    $("#ChkRmStsSeq").val("0");
                    $$("ChkSequence").setValue("0");
                }

                var focont = fnFoCont();
                $("#hdnA26_ind").val($.trim(focont[0].A26_IND))
                if ( $("#hdnA26_ind").val() == "1")
                    $$("ChkPM1").setValue("1");
                else
                    $$("ChkPM1").setValue("0");

                if ($('#hdnClkBtnId').val() == "1")
                    $("#btnInHouseGst").click();
                else if ($('#hdnClkBtnId').val() == "2")
                    $("#btnRoomSts").click();
                else if ($('#hdnClkBtnId').val() == "3")
                    $("#btnRoomPos").click();
                else if ($('#hdnClkBtnId').val() == "4") {
                    

                    if ($$("txtArrAccDt"))
                        $$("txtArrAccDt").setValue($("#hdnAccountDt").val());

                    $("#btnExpArr").click();
                }
                else if ($('#hdnClkBtnId').val() == "5")
                    $("#btnExpDepart").click();
            }
        }
    });

}

function fnPropertyLoad() {

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

   
    return rowData;
}

function fnAccountDt() {
    //
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FOACCOUNTDT";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //
            if (d != "") {
                //
                rowData = JSON.parse(d);
                $("#hdnAccountDt").val(rowData[0].ACCDT);
                $("#hdnCurrentDt").val(rowData[0].CURDT);
                
            }
        },
    });
    return rowData;
}

function fnFoControl() {
    //
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FOCONTROL";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
           
            if (d != "") {
                //
                rowData = JSON.parse(d);
               
            }
        },
    });
    return rowData;
}

function fnFoCont() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FOCONT";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/FoTrans/COMAPI_CALL",
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
