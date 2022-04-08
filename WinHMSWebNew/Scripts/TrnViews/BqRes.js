var GridIndGuest = function () {
    debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    Title: { validation: { required: true }, type: "string", editable: false },
                    LastName: { type: "string", editable: false },
                    FirstName: { type: "string", editable: false },
                    mobileno: { type: "string", editable: false },
                    Address: { type: "string", editable: false },
                    City: { type: "string", editable: false, Hidden: true },
                    ContactPersonName: { type: "string", editable: false, hidden: true },
                    Name: { type: "string", editable: false, hidden: true },
                    Address2: { type: "string", editable: false },
                    Address3: { type: "string", editable: false },
                    ContacPersonPhone: { type: "string", editable: false },
                    ContactPersonDesig: { type: "string", editable: false },
                    PostalCode: { type: "string", editable: false },
                    PhoneNo: { type: "string", editable: false },
                    Email1: { type: "string", editable: false },
                    Email2: { type: "string", editable: false },
                    GuestType: { type: "string", editable: false },
                    GuestTypeId: { type: "string", editable: false },
                    TitleId: { type: "string", editable: false },
                    MarketSegment: { type: "string", editable: false },
                    BusinessSource: { type: "string", editable: false },
                }
            }
        },
    });

    $("#IndividualGuestGrid").kendoGrid({
        dataSource: datsource,
        filterable:
           {
               mode: "row"
           },
        selectable: "row",
        //scrollable: true,
        // pageSize: 150,
        //scrollable: {
        //    virtual: true,
        //},
        //// navigatable: true,
        // change: Footerrowcalc,
        columns: [
            {
                field: "Title", title: 'Title', width: 60, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                field: "LastName", title: 'Last Name', width: 60, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
             {
                 field: "FirstName", title: 'First Name', width: 70, attributes: { style: "text-align:left" }, filterable: {
                     cell: {
                         showOperators: false, operator: "contains",
                         suggestionOperator: "contains"
                     }
                 }
             },
             {
                 field: "mobileno", title: 'Mobile', width: 60, attributes: { style: "text-align:left" }, filterable: {
                     cell: {
                         showOperators: false, operator: "contains",
                         suggestionOperator: "contains"
                     }
                 }
             },
             {
                 field: "Address", title: 'Address', width: 70, attributes: { style: "text-align:left" }, filterable: {
                     cell: {
                         showOperators: false, operator: "contains",
                         suggestionOperator: "contains"
                     }
                 }
             },
              {
                  field: "City", title: 'City', width: 70, attributes: { style: "text-align:left" }, filterable: {
                      cell: {
                          showOperators: false, operator: "contains",
                          suggestionOperator: "contains"
                      }
                  }
              },
               {
                   field: "ContactPersonName", title: 'Contact Name', width: 70, attributes: { style: "text-align:left" }, filterable: {
                       cell: {
                           showOperators: false, operator: "contains",
                           suggestionOperator: "contains"
                       }
                   }
               },
        ],
        //header


        //filterable: true,  
        //editable: true,
    });
}

function gridIndividualGuestLoad(GuestTy) {
    ////debugger;
    var Table = {};
    Table["GuestTy"] = GuestTy;
    var paramValue = JSON.stringify(Table);
    $.ajax({
        type: "POST",
        async:false,
        contentType: "application/json",
        accepts: "application/json",
        dataType: "json",
        url: "/BQ/GuestDetailsLoad1",
        cache: false,
        charset: 'utf-8',
        data: paramValue,
                success: function (data) {
                    if (data != "") {
              
                        var gridInd = $("#IndividualGuestGrid").data("kendoGrid");
                        gridInd.dataSource.data(data);
                    }
                    else {
                        alert("error");

                    }
                },
                error: function (request, status, error) {
                    console.log("Error Failrue");
                }
            });
        }

//function gridIndividualGuestLoad(GuestTy) {
//    debugger;
//    //debugger;
//    //var  JSON.parse(request);
//   var dataparam = {};
//   dataparam["GuestTy"] = GuestTy; 
//  var DataVal = JSON.stringify(dataparam);
//  $.ajax({
//      asyc: false,
//        type: "POST",
//        contentType: "application/json",
//        accepts: "application/json",
//        dataType: "json",
//        url: "/BQ/GuestDetailsLoad1",
//        charset: 'utf-8',
//        data:"request=" + DataVal,
//        success: function (data) {
//            if (data != "") {
              
//                var gridInd = $("#IndividualGuestGrid").data("kendoGrid");
//                gridInd.dataSource.data(data);
//            }
//            else {
//                alert("error");

//            }
//        },
//        error: function (request, status, error) {
//            console.log("Error Failrue");
//        }
//    });
//}


var GridGuest = function () {
    debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    Name: { validation: { required: true }, type: "string", editable: false },
                    mobileno: { type: "string", editable: false },
                    Address: { type: "string", editable: false },
                    City: { type: "string", editable: false },
                    ContactPersonName: { type: "string", editable: false },
                    Address2: { type: "string", editable: false, Hidden: true },
                    Address3: { type: "string", editable: false, hidden: true },
                    ContacPersonPhone: { type: "string", editable: false, hidden: true },
                    ContactPersonDesig: { type: "string", editable: false },
                    PostalCode: { type: "string", editable: false },
                    PhoneNo: { type: "string", editable: false },
                    Email1: { type: "string", editable: false },
                    Email2: { type: "string", editable: false },
                    GuestType: { type: "string", editable: false },
                    GuestTypeId: { type: "string", editable: false },
                    TitleId: { type: "string", editable: false },

                }
            }
        },
    });

    $("#CompnayGuestGrid").kendoGrid({
        dataSource: datsource,
        filterable:
           {
               mode: "row"
           },
        selectable: "row",
        //scrollable: true,
       // pageSize: 150,
        //scrollable: {
        //    virtual: true,
        //},
        //// navigatable: true,
        // change: Footerrowcalc,
        columns: [
            { field: "Name", title: 'Name', width: 60, attributes: { style: "text-align:left" }, filterable: {
        cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
        }
            } },
            {
                field: "mobileno", title: 'Mobile', width: 60, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
             {
                 field: "Address", title: 'Address', width: 70, attributes: { style: "text-align:left" }, filterable: {
                     cell: {
                         showOperators: false, operator: "contains",
                         suggestionOperator: "contains"
                     }
                 }
             },
             {
                 field: "City", title: 'City', width: 60, attributes: { style: "text-align:left" }, filterable: {
                     cell: {
                         showOperators: false, operator: "contains",
                         suggestionOperator: "contains"
                     }
                 }
             },
             {
                 field: "ContactPersonName", title: 'Contact Name', width: 70, attributes: { style: "text-align:left" }, filterable: {
                     cell: {
                         showOperators: false, operator: "contains",
                         suggestionOperator: "contains"
                     }
                 }
             },
        ],
        //header
       

        //filterable: true,  
        //editable: true,
    });
}

function gridCompGuestLoad(GuestTy) {
    debugger;
    var Table = {};
    Table["GuestTy"] = GuestTy;
    var paramValue = JSON.stringify(Table);
    $.ajax({
        type: "POST",
        async:false,
        contentType: "application/json",
        accepts: "application/json",
        dataType: "json",
        url: "/BQ/GuestDetailsLoad1",
        cache: false,
        charset: 'utf-8',
        data: paramValue,
        success: function (data) {
            if (data != "") {
              
                var grid = $("#CompnayGuestGrid").data("kendoGrid");
                grid.dataSource.data(data);
            }
            else {
                alert("error");

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}


//    $.ajax({
//        async: false,
//        url: "/BQ/GuestDetailsLoad1",
//        type: 'POST',
//        data: [],
//        contentType: "application/json",
//        accepts: "application/json",
//        dataType: "json",
//        success: function (d) {
//            if (d != "") {
//                //var Detemp = JSON.parse(d);
//                //var Detemp = JSON.parse(d);
//                var grid = $("#CompnayGuestGrid").data("kendoGrid");
//                grid.dataSource.data(d);
//            }
//            else {
//                alert("error");

//            }
//        },
//        error: function (request, status, error) {
//            console.log("Error Failrue");
//        }
//    });
//}

var GridCompAdd = function () {
    debugger;
    var datsource1 = new kendo.data.DataSource({
        data: [],
        pageSize: 100,
        schema: {
            model: {
                fields: {
                    CompanyId: { validation: { required: true }, type: "string", editable: false },
                    CompanyName: { type: "string", editable: false },
                    Address: { type: "string", editable: false },
                    cont_nm: { type: "string", editable: false },
                    Address2: { type: "string", editable: false },
                    Address3: { type: "string", editable: false },
                    Address4: { type: "string", editable: false },
                    CountryId: { type: "string", editable: false },
                    mobileno: { type: "string", editable: false },
                    combAddress: { type: "string", editable: false },
                }
            }
        },
    });

    $("#GridNewComp").kendoGrid({
        dataSource: datsource1,
        height: 480,
        filterable:
           {
               mode: "row"
           },
        selectable: "row",
        scrollable: {
            virtual: true
        },
        columns: [
            {
                field: "CompanyId", title: 'CompanyId', width: 20, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
{
    field: "CompanyName", title: 'CompanyName', width: 60, attributes: { style: "text-align:left" }, filterable: {
        cell: {
            showOperators: false, operator: "contains",
            suggestionOperator: "contains"
        }
    }
},
{
    field: "combAddress", title: 'Address', width: 70, attributes: { style: "text-align:left" }, filterable: {
        cell: {
            showOperators: false, operator: "contains",
            suggestionOperator: "contains"
        }
    }
},
        ],
        //header
    });
}

function gridCompLoad1() {
    debugger;
    //debugger;
    //var  JSON.parse(request);
    var DataVal="";
    $.ajax({
        async: false,
        url: "/BQ/CompanyDetailsLoad",
        type: 'POST',
        data: [],
        contentType: "application/json",
        accepts: "application/json",
        dataType: "json",
        success: function (d) {
            if (d != "") {
                DataVal = d;
            }
        }
    });
    return DataVal;
}

function gridCompLoad(GuestTy) {
    debugger;
    //debugger;
    //var  JSON.parse(request);
    var Table = {};
    Table["GuestTy"] = GuestTy;
    var paramValue = JSON.stringify(Table);
    $.ajax({
        //async: false,
        //url: "/BQ/CompanyDetailsLoad",
        //type: 'POST',
        //data: [],
        //contentType: "application/json",
        //accepts: "application/json",
        //dataType: "json",
        type: "POST",
        async: false,
        contentType: "application/json",
        accepts: "application/json",
        dataType: "json",
        url: "/BQ/CompanyDetailsLoad",
        cache: false,
        charset: 'utf-8',
        data: paramValue,
        success: function (d) {
            if (d != "") {
                //var Detemp = JSON.parse(d);
                //var Detemp = JSON.parse(d);
                var grid = $("#GridNewComp").data("kendoGrid");
                grid.dataSource.data(d);
            }
            else {
                alert("error");

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    });
}


function saveNewCompany(paramValue) {
    debugger;
    var GUSETID = "";
    //debugger;
    //var  JSON.parse(request);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        accepts: "application/json",
        dataType: "json",
        url: "/BQ/NewComp_Save",
        //cache: false,
        async: false,
        charset: 'utf-8',
        data: paramValue,
        success: function (data) {
            debugger;
            GUSETID = data.v;
            if (GUSETID == "") {
                $("#AlertMessageHdn").val("Operation Failed");
                $("#alertType").val('fail');
                AlertMesaage();
            }
            else {
                $('#GuestTypeId').val(GUSETID);
            }
            return GUSETID;
        }

    });
    return GUSETID;

}

