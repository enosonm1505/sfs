
var app = angular.module('BQTApp', ['webix']);

app.controller("BQTransController", function ($scope) {
  
    $("#LoadDIv").hide();
    fnAccountDt();

    $scope.frmBQTransFP = {
        id: "frmBQTransFP",
        view: 'form',
        minWidth: 900,
        elements: [
            {
                rows: [
                   {
                       cols: [
                           {
                               minwidth: 320
                           },
                           {
                               view: "datepicker",
                               id: "FromDt",
                               stringResult: true,
                               label: "Assign F.P Date As",
                               format: "%d/%m/%Y",
                               labelAlign: "left",
                               inputWidth: 240,
                               labelWidth: 120,
                               minWidth: 200,
                               value: $("#hdnCurrentDt").val(),
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
                               minWidth: 100,
                               width: 100,
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
                       height: 460,
                       minWidth:900,
                       css: "webix_header_border wingrd_hight",
                       data: [],
                       columns: [
                           //{ id: "ixFPNo", header: 'F.P.No', width: 70, css: { 'text-align': 'center ! important', }, },
                               {
                                   id: "ixBlkNo", header: ['Res#', { content: "textFilter", }], minWidth: 70,css: { 'text-align': 'center ! important', },
                                   template:function (obj, common, value, config){
                                       if (obj.ixGrpFirst == "1") return value;
                                       else return "";
                                   },
                               },
                               {
                                   id: "ixGstTy", header: 'Type', minWidth: 90,
                                   template:function (obj, common, value, config){
                                       if (obj.ixGrpFirst == "1") return value;
                                       else return "";
                                   },
                               },
                               {
                                   id: "ixGuest",header: ['Guest/Company', { content: "textFilter", }], minWidth: 230,
                                   template:function (obj, common, value, config){
                                       if (obj.ixGrpFirst == "1") return value;
                                       else return "";
                                   },
                               },
                               {
                                   id: "ixFun", header: 'Function', minWidth: 100,
                                   template:function (obj, common, value, config){
                                       if (obj.ixGrpFirst == "1") return value;
                                       else return "";
                                   },
                               },
                               { id: "ixDt", header: { text: "Date", }, minWidth: 90,  css: { 'text-align': 'center ! important', } },
                               { id: "ixVenue", header: 'Venue', minWidth: 100, },
                               { id: "ixSess", header: 'Session', minWidth: 100, },
                               { id: "ixGpax", header: 'Grn.Pax', minWidth: 80, css: { 'text-align': 'right ! important;', },},
                               { id: "ixrate", header: 'Rate', minWidth: 90,css: { 'text-align': 'right ! important;',  },numberFormat: "111.00", },
                               {
                                   id: "ixSingle", header: { text: "Single Fp", }, editor: "Checkbox", minWidth: 90,
                                   template: function (obj, common, value, config) {
                                       if (obj.ixSFpChk == "1") return common.checkbox(obj, common, value, config);
                                       else return "";
                                   },
                                   css: { 'text-align': 'center ! important', 'padding': '0px ! important','margin':'0px !important' }
                               },
                               {
                                   id: "ixSelect",header:"Select", editor: "Checkbox", minWidth: 50, css: {'text-align': 'center ! important', 'padding': '0px ! important', } ,
                                   template: function (obj, common, value, config) {
                                       if (obj.ixResNoHddn != "" && obj.ixResNoHddn != "undefined" && obj.ixResNoHddn != null) return common.checkbox(obj, common, value, config);
                                       else return "";
                                   },
                               },
                               { id: "ixVenueHddn", header: 'VenueId', hidden:true, },
                               { id: "ixSessHddn", header: 'SessionId', hidden:true, },
                               { id: "ixResNoHddn", header: 'ResNo', hidden:true, },
                               { id: "ixsingleSel", header: 'SingleSel',hidden:true,  },
                               { id: "ixSelRow", header: 'SelRow',  hidden:true,},
                               { id: "ixSFpChk", header: 'FpChk', hidden:true, },
                               { id: "ixGrpFirst", header: 'GrpFirst', hidden:true, },

                       ],
                       data: [],

                       on: {
                           'onCheck': function (row, col, state) {
                               var vData = $$("gridMain").serialize();
                               var RowLen =0;
                               var frstId = $$("gridMain").getFirstId();
                               //var vRowNo = $$("gridMain").getIndexById(row);
                               var SelRow=this.getItem(row);
                               var vResNo= SelRow.ixResNoHddn;
                               if (col == "ixSelect" || col == "ixSingle") {
                                   var newData = vData.filter(function (el) {
                                       return el.ixResNoHddn == vResNo;
                                   });

                                   var newData1 = vData.filter(function (el) {
                                       return el.ixResNoHddn == vResNo && el.ixSelect==1 ;
                                   });

                                   var newData2 = vData.filter(function (el) {
                                       return el.ixResNoHddn == vResNo && el.ixSingle==1 ;;
                                   });

                                   if(newData.length>0){
                                       RowLen=newData.length;
                                       var vFrstRowId=newData[0].id;

                                       for(var i=0;i<RowLen;i++){
                                           var NewId=newData[i].id;
                                           var NewRow=this.getItem(NewId);
                                           NewRow.ixsingleSel= 0;
                                           NewRow.ixSelRow= 0;
                                           NewRow.ixSFpChk= 0;
                                           NewRow.ixSingle= 0;
                                           this.updateItem(NewId, NewRow);

                                           $$("gridMain").refresh();
                                       }

                                   }

                                   if(newData1.length>0){
                                       RowLen=newData1.length;
                                       var vFrstRowId=newData1[0].id;
                                       var FirsrtRow=this.getItem(vFrstRowId);
                                       for(var i=0;i<RowLen;i++){
                                           var NewId=newData1[i].id;
                                           var NewRow=this.getItem(NewId);
                                           if(RowLen>1 && newData2.length>0) NewRow.ixsingleSel= 2;
                                           else  NewRow.ixsingleSel= 1;

                                           if(RowLen>1 && i==0){
                                               NewRow.ixSFpChk=1;
                                               if(newData2.length>0){
                                                   NewRow.ixSingle=1;
                                                   NewRow.ixSelRow=1;
                                               }
                                           }
                                           this.updateItem(NewId, NewRow);

                                           $$("gridMain").refresh();
                                       }

                                       $$("gridMain").refresh();
                                   }

                                   $$("gridMain").refresh();

                               }
                           },
                       }
                   }
                ]
            }
        ]
    }
});

function fnGetApplUser(){
    Request = {
        PROGNM: "GET_COMFUNCCLASS",
        REQTYPE: "GET_APPLICABLEUSER",
        COMPID: $("#hdnCompId").val(),
        PRGRMLNKID: "BQMNUTRNFP"
    }

    var rowData = [];
    var options =[];

    requestData = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            if(data != ""){
                rowData = JSON.parse(data);
                $("#FPCrApp").val(rowData);

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
};

function fnLoadGrid(){
    $$("gridMain").clearAll();
    Request = {
        PROGNAME: "GET_BQFPLOAD",
        COMPID:$("#hdnCompId").val(),
    }

    var rowData = [];
    $("#vUserVenue").val("");
    $("#FP_PRIOR_DAY").val("");

    var requestData = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + requestData,
        success: function (data) {
            if(data != ""){
                rowData = JSON.parse(data);
                $$("gridMain").parse(rowData.gridMain);
                $$("gridMain").refresh();
                $("#vUserVenue").val(rowData.vUserVenue);
                $("#FP_PRIOR_DAY").val(rowData.FP_PRIOR_DAY);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failure");
        }
    });
};

function fnCallSave(){
    $("#LoadDIv").show();
    var bValid =fnValidation();
    var data = $$("gridMain").serialize();
    var lenval = data.length;
    var bVal = false;

    if (bValid == false) {
        $("#LoadDIv").hide();
        return false;
    }

    var newData = data.filter(function (el) {
        return el.ixSelect==1 ;
    });
    var vAssDt=$$("FromDt").getValue();
    vAssDt=vAssDt.substring(0, 10);
    try {
        Request = {
            PROGNAME: "FNCREATEFNPROSPECTUS",
            COMPID:$("#hdnCompId").val(),
            AssDt:vAssDt,
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
                if(data != ""){
                    rowData = JSON.parse(data);
                    if(rowData !=""){
                        if (rowData.Status == "1") {

                            fnCallPrint();

                            $("#hdnPResNo").val(rowData.ResNo);
                            $("#hdnPFbNo").val(rowData.FbNo);

                            fnLoadGrid();
                            $("#LoadDIv").hide();
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

function fnCallPrint() {

    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "PopupSuccess",
        head: "Message",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        move: true,
        height: 150,
        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,
            height: 150,
            elements: [
                {
                    rows: [
                        {
                            paddingY:10,
                            cols: [
                                {
                                    width: 110,
                                },
                                {
                                    view: "label",
                                    id: "lblSuccMsg",
                                    label: "Saved Successfully",
                                    labelAlign: "Center",
                                }
                            ]
                        },
                        {
                            height:5,
                        },
                        {
                            cols: [
                                {
                                    width:50,
                                },
                                {
                                    id: "ChkPrint",
                                    view: "checkbox",
                                    labelRight:"Print" ,
                                    labelwidth: 100,
                                    inputWidth: 150, width: 150,
                                    
                                    on: {
                                        "onChange": function () {
                                        }
                                    }
                                },
                                {
                                    view: 'button',
                                    label: 'Ok', type: "icon", icon: "wxi-check",
                                    maxWidth: 75,
                                    inputWidth: 70,
                                    on: {
                                        onItemClick: function () {
                                            
                                            var PrinRt = "1";

                                            debugger
                                            if ($$("ChkPrint").getValue() == "1") {

                                                var ixResNoHddn = $("#hdnPResNo").val().split(',');

                                                var ixBlkHddn = $("#hdnPFbNo").val().split(',');

                                                if (ixResNoHddn.length > 0) {
                                                    for (var i = 0; i < ixResNoHddn.length; i++) {

                                                        var ResNoHddn = ixResNoHddn[i];

                                                        var BlkNo = ixBlkHddn[i];

                                                        var CompId = $("#hdnCompId").val().toString().trim();

                                                        var Host = window.location.host;
                                                        var PageUrl = "http://" + Host.toString().trim() + "/BQ/BQPdfOpen.aspx";

                                                        var Mleft = (screen.width / 2) - (840 / 2);
                                                        var Mtop = (screen.height / 2) - (550 / 2);

                                                        window.open(PageUrl + "?RESERVENO=" + ResNoHddn + "&FBNO=" + BlkNo + "&PRINTRATE=" + PrinRt + "&COMPID=" + CompId + "&RPT=" + "BQFP", "_blank", "width=840px,height=550,scrollbars=yes,top=\"" + Mtop + "\,left=\"" + Mleft + "\"", 0);
                                                        sleep(3000);
                                                    }
                                                }
                                            }

                                            $$("PopupSuccess").hide();
                                        }
                                    }
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    });

    $$("PopupSuccess").show();
}




function fnValidation() {
    var data = $$("gridMain").serialize();
    var lenval = data.length;
    var bVal = true;

    var vAssDt=$$("FromDt").getValue();
    vAssDt=vAssDt.substring(0, 10);

    if (lenval == 0) {
        //webix.alert("No Data found to Save");
        webix.AlertMessage("No Data found to Save");
        return false;
    }

    if (vAssDt != "") {
        vAssDt=vAssDt.replace('-','');
        vAssDt=vAssDt.replace('-','');
        vAssDt= parseFloat(vAssDt);
        var CurrDt = $("#hdnCurrentDt").val();
        CurrDt=CurrDt.replace('/','');
        CurrDt=CurrDt.replace('/','');
        CurrDt= parseFloat(CurrDt);
        if (vAssDt > CurrDt) {
            AlertMessage("F.P Date cannot be greater than System Date");
            webix.UIManager.setFocus($$("FromDt"));
            return false;

        }
    }

    var newData = data.filter(function (el) {
        return el.ixSelect==1 ;
    });

    if(newData.length==0){
        AlertMessage("Select Function Prospectous");
        return false;
    }
    RowLen=newData.length;

    for(var i=0;i<RowLen;i++){
        var NewId=newData[i].id;
        var SelRow = $$("gridMain").getItem(NewId);

        var vSel = SelRow.ixSelect;
        var vResNo = SelRow.ixResNoHddn;
        var rowData = [];
        if (vSel == 1 ) {
            var vFnDt = SelRow.ixDt;
            var vSesId = SelRow.ixSessHddn;
            var vVenID = SelRow.ixVenueHddn;

            try {

                Request = {
                    PROGNAME: "FNCHKALREADYCREATE",
                    COMPID: $("#hdnCompId").val(),
                    vFnDt:vFnDt,
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
                        if(data != ""){
                            rowData = JSON.parse(data);
                            if (rowData == "1") {
                                AlertMessage("FP Already Generated for this Function");
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
                $("#LoadDIv").hide();
            }
        }
    };
    if(bVal==false) return false;

    FP_PRIOR_DAY=$("#FP_PRIOR_DAY").val();
    FPCrApp=$("#FPCrApp").val();

    if (FP_PRIOR_DAY != 0 && FPCrApp == "0") {

        for(var i=0;i<RowLen;i++){
            var NewId=newData[i].id;
            var SelRow = $$("gridMain").getItem(NewId);
            var vSel = SelRow.ixSelRow;
            if(vSel==1){
                var vDate = SelRow.ixSelRow;
                //vDate=formatDate(vDate);
                vDate=vDate.replace('-','');
                vDate=vDate.replace('-','');
                vDate=parseFloat(vDate);
                var CurrDt = $("#hdnCurrentDt").val();
                CurrDt=CurrDt.replace('/','');
                CurrDt=CurrDt.replace('/','');
                CurrDt= parseFloat(CurrDt);

                if ((CurrDt - vDate) > FP_PRIOR_DAY) {
                    AlertMessage("F.P creation not allowed before " + FP_PRIOR_DAY + " days prior from Function Date");
                    return false;
                    break;
                }
            }
        };

    }
    return true;
}

function formatDate(StrDt) {
    var Parts = StrDt.split("/");
    var Dt = Parts[0];
    var Mn= Parts[1];
    var Yr = Parts[2];
    var Str = Yr + "-" + Mn + "-" + Dt;
    return Str;
}

function sidebarFn() {
    $$("frmBQTransFP").resize();
    $$("frmBQTransFP").adjust();
    $$("gridMain").resize();
    $$("gridMain").adjust();
}


function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
