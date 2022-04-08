var app = angular.module('BPTApp', ['webix']);
app.controller("BPInterfaceController", function ($scope) {
    debugger;
    $("#LoadDIv").hide();
    var searchicon = "<span class='fa fa-search ' ></span>";
  
    var Company = fnCompanyLoad();
  
    var date = new Date();
    date.setDate(date.getDate() );
    date.toLocaleDateString();

    $scope.frmBPTallyXMLPosting = {

        id: "frmBPTallyXMLPosting",
        view: 'form',
        minWidth: 900,
        //maxWidth: "auto",
       // paddingX: 40,
  borderless: true,
        elements: [
            {
              //  paddingX: 10,
              //  PaddingY: 10,
                rows: [
                   {
                       rows: [
                          {
                              cols: [
                                  {
                                      view: "richselect",
                                      id: "ddlCompany",
                                      value:"WS",
                                      label: "Company",
                                      labelAlign: "Right",
                                      labelWidth: 120,
                                      inputWidth: 320,
                                      width: 350,
                                      options: Company,
                                      on: {
                                          onChange: function (newval, oldval) {
                                              

                                          }

                                      }
                                  },
                                
                                

                              ]

                          },
                          {
                              cols: [
                                  {
                                      view: 'datepicker',
                                      label: 'Post Date',
                                      id: 'PostDt',
                                      labelAlign: "Right",
                                      labelWidth: 120,
                                      inputWidth: 250,
                                      width: 350,
                                      stringResult: true,
                                      format: "%d/%m/%Y",
                                      value: date,
                                      on: {
                                          onChange: function (newval, oldval) {
                                           

                                          }

                                      }

                                  },

                              ]
                                
                          }
                       ]
                   },

                ]
            }]
    }
});

function fnSaveValid() {
    debugger;

   

    if ($$("ddlTrnTy").getValue() == "") {
        AlertMessage('Transaction type Cannot be empty');
        return false;
    }

    if ($$("AsOnDt").getValue() == "") {
        AlertMessage('As on date Cannot be empty');
        return false;
    }



    var data = $$("GridData").serialize();
    var lenval = data.length;
    if (lenval == 0) {
        AlertMessage('Bill details Cannot be empty');
        return false;
    }

    var chk = "0";
    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {
            if (data[i].ixAppr == "1") {
                chk = "1";
                break;
            }
        }

        if ($.trim(chk) != "1") {
            AlertMessage("Atleast one row Should be selected");
            return false;
        }


    }




    return true;
}
function fnBPTallyXMLPosting() {

    
    debugger;
    Masterfile();
    Tranfile();
  
}

function Masterfile()
{
    var dataparam = {};

    debugger;


    dataparam["REQTYPE"] = "GET_BPTALLYXMLPOSTINGDATA";
    dataparam["PROGNAME"] = "GET_BPTALLYXMLPOSTING";
    dataparam["CompanyID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["PostDt"] = $.trim($$("PostDt").getText());
    dataparam["SelCompId"] = $.trim($$("ddlCompany").getValue());
    dataparam["DFile"] = "M";
    var dt = $.trim($$("PostDt").getText());
    dt = dt.replace("/", "");
    dt = dt.replace("/", "");
    var FileNm = "Mst" + dt + ".xml";


    var DataVal = JSON.stringify(dataparam);
    var requestData = encodeURIComponent(DataVal);

    $.ajax({
        type: 'POST',
        async: false,
        cache: false,
        url: "/BPInterface/XMLPOSTINGAPI_CALL",
        data: "request=" + requestData,
        success: function (objRes) {
            debugger;
            if (objRes != "") {
                //rowData = JSON.parse(objRes);
                rowData = (objRes);

                var link = document.createElement('a');
                link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(rowData));
                link.setAttribute('download', FileNm );
                link.click();



                //if ($.trim(rowData) == "True") {
                //    SuccessMsg('Posting Successfully');


                //}
                //else {
                //    AlertMessage($.trim(rowData));
                //}
            }
        },
    });
}
function Tranfile() {
    var dataparam = {};

    debugger;


    dataparam["REQTYPE"] = "GET_BPTALLYXMLPOSTINGDATA";
    dataparam["PROGNAME"] = "GET_BPTALLYXMLPOSTING";
    dataparam["CompanyID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["PostDt"] = $.trim($$("PostDt").getText());
    dataparam["SelCompId"] = $.trim($$("ddlCompany").getValue());
    dataparam["DFile"] = "T";
    var dt = $.trim($$("PostDt").getText());
    dt = dt.replace("/", "");
    dt = dt.replace("/", "");
    var FileNm = "TRN" + dt + ".xml";


    var DataVal = JSON.stringify(dataparam);
    var requestData = encodeURIComponent(DataVal);

    $.ajax({
        type: 'POST',
        async: false,
        cache: false,
        url: "/BPInterface/XMLPOSTINGAPI_CALL",
        data: "request=" + requestData,
        success: function (objRes) {
            debugger;
            if (objRes != "") {
                //rowData = JSON.parse(objRes);
                rowData = (objRes);

                var link = document.createElement('a');
                link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(rowData));
                link.setAttribute('download', FileNm);
                link.click();



                //if ($.trim(rowData) == "True") {
                //    SuccessMsg('Posting Successfully');


                //}
                //else {
                //    AlertMessage($.trim(rowData));
                //}
            }
        },
    });
}
function fnCompanyLoad() {
    //debugger;

    //$("#LoadDIv").show();

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FNLOADCOMPANY";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();   
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
   
   
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BPTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
              
                var lenval = rowData.length;
                if (lenval != 0) {
                    for (i = 0; i < lenval; i++) {
                        if (i == 0) {
                            $("#hdnTrnTy").val(rowData[i].id);
                            break;
                        }
                    }
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