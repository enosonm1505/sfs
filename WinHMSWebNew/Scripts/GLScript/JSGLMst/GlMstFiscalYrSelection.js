
var app = angular.module('GLMApp', ['webix']);

app.controller("GLMasterController", function ($scope) {
    //debugger;

    $("#LoadDIv").hide();
    debugger;
    fnLoadDefFYearData();
    var DefCompany= fnLoadDefCompany();  
    var dataProp = fnPropertyLoad();
    window.LastFyear=$("#hdnFiscalYr").val()
    var DefFyear = fnLoadDefFYear(window.LastCmpId);
  
    var Filter3 = dataProp.filter(function (dataProp) {
        return (dataProp.id == $.trim($("#hdnCompId").val()));
    });

    $scope.frmFiscalYrSelection = {

        id: "frmFiscalYrSelection",
        view: 'form',
        minWidth: 1200,
        maxWidth: 5000,
        minHeight: 550,
        elements: [
        {
            rows: [
              
                {
                    padding: { top: 10},
                    cols: [
                    {
                        view: "datatable",
                        id: "GrdCompany",
                        select: "row",
                        data: DefCompany,
                        width: 350,
                        height: 430,
                      //  editable: true,
                        hover: "gridHover",
                        tooltip: true,
                        scroll: true,
                        tooltip: function (obj, common) {
                        },
                        columns: [
                                { header: "", id: "ixCompId", hidden: true },
                                { header: "Company", id: "ixCompNm", width: 320, css: { 'text-align': 'left ! important' }, tooltip: false },
                               
                                      
                        ],
                        scheme: {
                            $change: function (item) {
                                debugger;
                                if (window.LastCmpId != "")
                                {
                                    var selRow = $$("GrdCompany").getItem(item.id);
                                    var CmpId = selRow.ixCompId;
                                    if (CmpId == window.LastCmpId) {
                                        $$("GrdCompany").select(item.id, "ixCompNm", true);
                                    }
                                }
                               
                               
                            },

                        },
                        on: {

                            'onItemClick': function (id) {
                                debugger;
                                var selRow = $$("GrdCompany").getItem(id);
                                var CmpId = selRow.ixCompId;
                                window.LastFyear = "";
                                fnLoadDefFYear(CmpId);
                                var row_id = $$("GrdFYear").getFirstId();
                                $$("GrdFYear").select(row_id, "ixFYrNm", true);
                                //  $$("GrdFYear").addSelectArea(row_id, "ixFYrNm", true, "", "Selrow");
                            },

                        },
                       
                    },
                    {width:10,},
                    {
                        view: "datatable",
                        id: "GrdFYear",
                        select: "row",
                        data: DefFyear,
                        width: 230,
                        height: 430,
                     //   editable: true,
                        hover: "gridHover",
                        tooltip: true,
                        scroll: true,
                        tooltip: function (obj, common) {
                        },
                        columns: [
                                { header: "", id: "ixFYrId", hidden: true },
                                { header: "Fiscal Year", id: "ixFYrNm", width: 150, css: { 'text-align': 'left ! important' }, tooltip: false },
                                { header: "", id: "ixCloseInd", width: 60, css: { 'text-align': 'left ! important' }, tooltip: false },
                               

                        ],
                        scheme: {
                            $change: function (item) {

                                if (item.ixCloseInd =="Closed") {
                                   // debugger;
                                    var Columns = $$('GrdFYear').config.columns;
                                    var ColCnt = Columns.length;
                                    var rowid = item.id;
                                   // debugger;
                                    if (item.ixCloseInd == "Closed") {
                                      //  debugger;
                                        $$("GrdFYear").removeCellCss(rowid, "ixCloseInd", "Closed");
                                        $$("GrdFYear").addCellCss(rowid, "ixCloseInd", "Closed");
                                    }
                                }
                                if (window.LastFyear != "") {
                                    var selRow = $$("GrdFYear").getItem(item.id);
                                    var Fyr = selRow.ixFYrId;
                                    if (Fyr == window.LastFyear) {
                                        $$("GrdFYear").select(item.id, "ixFYrNm", true);
                                    }
                                }
                            },

                        },
                    },
                    ]
                },
                   {
                       cols: [

                           { width: 500, labelWidth: 450, view: "checkbox", id: "ChkUpdate", label: "Want to update  Fiscal Year as Default Log in to all users, Yes", customCheckbox: false, },


                       ]

                   },
                
                  {
                      width: 500, view: "label", label: "Note :Selected Company/Fiscal year  will be referred henceforth in all forms/reports."
                 }
               
               
                    
                  
                  

            ],
        }
        ]
    };
   // window.LastCmpId = "";
   
});

function fnLoadDefCompany() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_DEFFISCALYRCOMPANY";
    dataparam["PROGNAME"] = "";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });

    return rowData;
}
function fnLoadDefFYear(CmpId) {
    debugger;
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_DEFFISCALYR";
    dataparam["PROGNAME"] = "";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["StrCmpId"] = CmpId.trim();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
               if( $.trim(window.LastFyear)==""){
                    $$("GrdFYear").clearAll();
                    $$("GrdFYear").parse(rowData);
                    $$("GrdFYear").refresh();
                }
               
              
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });
   
  
    return rowData;
}
function fnLoadDefFYearData() {
    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_DEFFISCALYRDATA";
    dataparam["PROGNAME"] = "";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                window.LastCmpId = $.trim(rowData[0].Last_Company_Id);
                window.LastFYear = $.trim(rowData[0].Last_Fiscal_Year);
                
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });

    // return rowData;
}
function fnSave() {
    debugger;
    $("#LoadDIv").show();
    if ($$("ChkUpdate").getValue() == "1")
    {
        webix.confirm({
            title: "Alert ?",
            ok: "Yes", cancel: "No",
            text: "Are you sure you want to update Accounting Company and Fiscal Year?"
        })
       .then(function () {
           fnSaveDefYear();
       })
       .fail(function () {
           fnSaveDefYear();
       });
    }
    else {
        fnSaveDefYear();
    }
   



    
    $("#LoadDIv").hide();
}

function fnSaveDefYear()
{
    var chkalluser = $$("ChkUpdate").getValue();
    var rowid = $$("GrdCompany").getSelectedId();
    var getval = $$("GrdCompany").getItem(rowid.row);
    var data = $$("GrdCompany").serialize();
    var LastCompId = "";
    var LastFiscalyr = "";
    if (data.length > 0) {
        LastCompId = getval.ixCompId;
    }

    rowid = $$("GrdFYear").getSelectedId();
    getval = $$("GrdFYear").getItem(rowid.row);
    data = $$("GrdFYear").serialize();
    if (data.length > 0) {
        LastFiscalyr = getval.ixFYrId;
    }


    var dataparam = {};
    dataparam["REQTYPE"] = "GET_DEFFISCALYRSAVE";
    dataparam["PROGNAME"] = "";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["LastFiscalyr"] = $.trim(LastFiscalyr);
    dataparam["LastCompId"] = $.trim(LastCompId);
    dataparam["chkalluser"] = $.trim(chkalluser);

    var DataVal = JSON.stringify(dataparam);
    var requestData = encodeURIComponent(DataVal);

    $.ajax({
        type: 'POST',
        async: true,

        //url: "/GLMaster/COMAPI_CALL",
        url: "/GLMaster/DEFFISCALAPI_CALL",
        data: "request=" + requestData,
        success: function (objRes) {
            //debugger;
            if (objRes != "") {
                rowData = JSON.parse(objRes);
                SuccessMsg('Updated Successfully');

            }
            else {
                AlertMessage("Save Failed!");
            }

            $("#LoadDIv").hide();


        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });
}


function fnPropertyLoad() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}

function fnLoadProperty() {
    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "combo",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        label: "Property",
        labelwidth: 80,
        inputwidth: 180,
        width: 350,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                //debugger;
                $("#hdnCompId").val(newval);

                var Filter3 = dataProp.filter(function (dataProp) {
                    return (dataProp.id == $.trim(newval));
                });

               

               


            }
        }
    });
}


function AlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    }).then(function (result) {

    })
}
function SuccessMsg(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Message",
        text: Text,
        modal: true,
    }).then(function (result) {
        //window.location.reload();
    })
}



webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;
    if (choice == "1") {
        var offset = $("#divGrid").offset();


        $$("divGrid").define("height", ((vheight - offset.top - 10)));
        $$("divGrid").adjust();

        $$("gridRpt").define("height", ((vheight - offset.top - 100)));
        $$("gridRpt").adjust();
    }





}

webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;
    if (choice == "1") {
        var offset = $("#frmFiscalYrSelection").offset();


        $$("frmFiscalYrSelection").define("height", ((vheight - offset.top - 10)));
        $$("frmFiscalYrSelection").adjust();

        $$("gridRpt").define("height", ((vheight - offset.top - 100)));
        $$("gridRpt").adjust();
    }
}






