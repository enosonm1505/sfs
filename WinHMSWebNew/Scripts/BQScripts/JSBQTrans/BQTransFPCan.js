
var app = angular.module('BQTApp', ['webix']);

app.controller("BQTransController", function ($scope) {
  
    $("#LoadDIv").hide();

    var Reserve = [{ "id": "P", "value": "Pending" }, { "id": "C", "value": "Completed" }];

    $scope.frmBQTransFPCan = {
        id: "frmBQTransFPCan",
        view: 'form',
        minWidth: 900,
        elements: [
            {
                rows: [
                   {
                       cols: [
                           {
                               minWidth:250,
                           },
                           {
                               view: "richselect",
                               id: "ddlReserve",
                               label: " Reservation",
                               labelAlign: "Left",
                               labelWidth: 80,
                               inputWidth: 260,
                               width: 310,
                               minWidth:310,
                               options: Reserve,
                               value:"P",
                               on: {
                                   onChange: function (newval, oldval) {
                                       fnLoadGrid();
                                   }
                               }
                           },
                           {
                               view: "button",
                               id: 'btnDisplay',
                               label: "Display", labelAlign: "left",
                               minWidth: 100, width: 100,
                               on: {
                                   onItemClick: function () {
                                       fnLoadGrid();
                                   }
                               }
                           }, {
                               minWidth: 500,
                           }
                       ]
                   },
                   {
                       height:10,
                   },
                   {
                       id: "gridMain",
                       select: 'row',
                       view: "datatable",
                       fixedRowHeight: false,
                       rowLineHeight: 23,
                       editable: true,
                       height: 430,
                       minWidth:900,
                       position: "flex",
                       css: "webix_header_border wingrd_hight",
                       data: [],
                       columns: [

                               {id: "ixFPNo", header: 'F.P.No', minWidth: 70,css: { 'text-align': 'center ! important', },},
                               {id: "ixRes", header: ['Res#', { content: "textFilter", }], minWidth: 70,css: { 'text-align': 'center ! important', },},
                               {id: "ixGType", header: 'Type', minWidth: 90,},
                               {id: "ixGnm",header: ['Guest/Company', { content: "textFilter", }], minWidth: 230,},
                               { id: "ixFDt", header: { text: "FunctionDt", }, minWidth: 90,  css: { 'text-align': 'center ! important', } },
                               { id: "ixVenue", header: 'Venue', minWidth: 100, },
                               { id: "ixSess", header: 'Session', minWidth: 100, },
                               {id: "ixBill", header: { text: "Bill Print", },  minWidth: 90,css: { 'text-align': 'center ! important', } },
                               {id: "ixSel",header:"Select", editor: "Checkbox", minWidth: 50, css: {'text-align': 'center ! important', 'padding': '0px ! important', } ,
                                   template: function (obj, common, value, config) {
                                       // debugger;
                                       if (obj.ixGrpFirst == 1) return common.checkbox(obj, common, value, config);
                                       else return "";
                                   },
                               },
                               { id: "ixvid", header: 'VenueId', hidden:true, },
                               { id: "ixsid", header: 'SessionId', hidden:true, },
                               { id: "ixHidRes", header: 'ResNo', hidden:true, },
                               { id: "ixHiddenFpNo", header: 'SingleSel',hidden:true,  },
                               { id: "ixGrpFirst", header: 'GrpFirst', hidden:true, },

                       ],
                       data: [],
                   },
                   {
                       view: "text",
                       id: "txtNarr",
                       stringResult: true,
                       label: "Cancel Reason",
                       labelAlign: "Left",
                       labelWidth: 110,
                       inputWidth: 700,
                       minWidth:700,
                   }
                ]
            }
        ]
    }
});


function fnLoadGrid(){
    debugger;
    $$("gridMain").clearAll();
    $("#LoadDIv").show();

    debugger;
    Request = {
        PROGNAME: "FNFPCANCELGRDLOAD",
        COMPID:$("#hdnCompId").val(),
        vStatus: $$("ddlReserve").getValue(),
    }

    var requestData = JSON.stringify(Request);
    requestData=encodeURIComponent(requestData);
    $.ajax({
        async: true,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            debugger;
            if(data != ""){
               var rowData = JSON.parse(data);
                $$("gridMain").parse(rowData.gridMain);
                $$("gridMain").refresh();
                $("#LoadDIv").hide();

            }
        },
        error: function (request, status, error) {
            console.log("Error Failure");
            $("#LoadDIv").hide();
        }
    });
};

function fnCallSave(){
    debugger;
    $("#LoadDIv").show();
    var data = $$("gridMain").serialize();
    var lenval = data.length;
    var bVal = false;

    vNarr=$$("txtNarr").getValue();
    var newData = data.filter(function (el) {
        return el.ixSel==1 ;
    });

    try {
        Request = {
            PROGNAME: "FNCANCELFNPROSPECTUS",
            COMPID:$("#hdnCompId").val(),
            vNarr:vNarr,
            gridMain:newData,

        }
        var rowData = [];
        requestData = JSON.stringify(Request);
        requestData=encodeURIComponent(requestData);
        $.ajax({
            async: true,
            url: "/BQTrans/COMAPI_CALL",
            type: 'POST',
            data: "request=" + requestData,
            success: function (data) {
                debugger;
                if(data != ""){
                    rowData = JSON.parse(data);
                    if(rowData !=""){
                        if(rowData.Status =="1"){
                            webix.message({ type: 'success', text: rowData.Message.toString()});
                            fnLoadGrid();
                            $("#LoadDIv").hide();
                            $$("txtNarr").setValue("");
                        }
                        else{
                            webix.message({ type: 'warning', text: rowData.Message.toString()});
                            $("#LoadDIv").hide();
                        }
                    }

                }
            },
            error: function (request, status, error) {
                console.log("Error Failrue");
                $("#LoadDIv").hide();
            }
        });

    }
    catch (e) {
        console.log(e.message)
        $("#LoadDIv").hide();
    }
}

function fnValidation() {
    debugger;
    var data = $$("gridMain").serialize();
    var lenval = data.length;
    var bVal = true;
    var vNarr="";

    if (lenval == 0) {
        //webix.alert("No Data found to Save");
        webix.message({ type: 'warning', text: 'No Data found to Save' });
        return false;
    }

    var newData = data.filter(function (el) {
        return el.ixSel==1 ;
    });

    if(newData.length==0){
        webix.message({ type: 'warning', text: "Select Atleast one row" });
        return false;
    }
    RowLen=newData.length;

    vNarr=$$("txtNarr").getValue();
    if(vNarr==""){
        webix.message({ type: 'warning', text: "Cancel Reason can not be Empty" });
        webix.UIManager.setFocus($$("txtNarr"));
        return false;
    }

    webix.confirm({
        title:"Confirmation",
        ok:"Yes", cancel:"No",
        text:"Are you sure you want to Cancel?",
    })
    .then(function(result){
        debugger;
        if(result==true){

            for(var i=0;i<RowLen;i++){
                debugger;
                var NewId=newData[i].id;
                // debugger;
                var SelRow = $$("gridMain").getItem(NewId);

                var vSel = SelRow.ixSel;
                var vResNo = SelRow.ixHidRes;
                var rowData = [];
                if (vSel == 1 ) {
                    var vSesId = SelRow.ixsid;
                    var vVenID = SelRow.ixvid;

                    try {

                        Request = {
                            PROGNAME: "FNCHKKOTEXIST",
                            COMPID:$("#hdnCompId").val(),
                            vSesId:vSesId,
                            vVenID:vVenID,
                            vResNo:vResNo,

                        }
                        var rowData = [];
                        requestData = JSON.stringify(Request);
                        requestData=encodeURIComponent(requestData);
                        $.ajax({
                            async: false,
                            url: "/BQTrans/COMAPI_CALL",
                            type: 'POST',
                            data: "request=" + requestData,
                            success: function (data) {
                                debugger;
                                if(data != ""){
                                    rowData = JSON.parse(data);
                                    if(rowData =="1"){
                                        webix.message({ type: 'warning', text: "KOT Exist. Cancellation Not Allowed." });
                                        $$("gridMain").select(NewId);
                                        webix.UIManager.setFocus($$("gridMain"));
                                        bVal= false;
                                    }
                                }
                            },
                            error: function (request, status, error) {
                                console.log("Error Failrue");
                            }
                        });
                        if(bVal==false) break;

                    }
                    catch (e) {
                        console.log(e.message)
                        $("#LoadDIv").hide();
                    }
                }
            };
            if(bVal==false) return false;

            fnCallSave();
        }

    });
}

function formatDate(StrDt) {
    debugger;
    var Parts = StrDt.split("/");
    var Dt = Parts[0];
    var Mn= Parts[1];
    var Yr = Parts[2];
    var Str = Yr + "-" + Mn + "-" + Dt;
    return Str;
}

function sidebarFn() {
    $$("frmBQTransFPCan").resize();
    $$("frmBQTransFPCan").adjust();
    $$("gridMain").resize();
    $$("gridMain").adjust();
}