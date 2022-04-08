var LoadQuoteNo = function (Request, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;   
    reqobj["REQTYPE"] = Request.REQ_NM;    
    reqobj["DATE"] = Request.DATE;
    
    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var values = JSON.parse(data);

            var grid = $("#CmnGridPOP").data("kendoGrid");
            grid.dataSource.data(values);
            
        }
    });
}


var LoadSupplier = function (Request, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["REQTYPE"] = Request.REQ_NM;
    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var values = JSON.parse(data);
            //debugger;
            var grid = $("#CmnSuppGrid").data("kendoGrid");
            grid.dataSource.data(values.Itm);
        }
    });
}

var LoadDropdownjs = function (Request, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["REQTYPE"] = Request.REQ_NM;
    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var values = JSON.parse(data);
            //debugger;
            if (key == "ddlCurrency")
                $("#" + key).kendoDropDownList({ dataTextField: "CURRENCY_NM", dataValueField: "CURRENCY_ID", dataSource: values, height: 100, optionLabel: "" });

            //$("#ddlCurrency").kendoDropDownList();
            //var ddl = $("#ddlCurrency").data("kendoDropDownList");
            //ddl.dataSource.data(values.Drp);
            //ddl.refresh();

        }
    });
}

var LoadDropdownCommon = function (Request, Glurl,keyddl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["REQTYPE"] = Request.REQ_NM;
    reqobj["TYPE"] = Request.TYPE;
    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {  
            var values = JSON.parse(data);
            //debugger;
            if (keyddl != "")
                $(keyddl).kendoDropDownList({ dataTextField: "NAME", dataValueField: "ID", dataSource: values, height: 100, optionLabel: "<-Select->" });
           
        }
    });
}


var LoadItemsSrh = function (Request, Glurl) {
    //debugger;
    //var  JSON.parse(request);
    var reqobj = {};
    reqobj["COMPID"] = Request.COMPID;
    reqobj["REQTYPE"] = Request.REQ_NM;
    reqobj["PRODGRPID"] = window.DDLProdgrp;
    reqobj["PRODSUBGRPID"] = window.DDLProdsubgrp;
    var ParamVal = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/PurchaseQuote/API_CALL",
        data: "request=" + ParamVal,
        success: function (data) {
            var values = JSON.parse(data);
            //debugger;
            $('#DDLProdgrp').kendoDropDownList({ dataTextField: "PROD_GR_NM", dataValueField: "PROD_GR_ID", dataSource: values.DROPPRODGRP, height: 100, optionLabel: "<all>" });
            $('#DDLProdSubgrp').kendoDropDownList({ dataTextField: "PROD_SUB_GR_NM", dataValueField: "PROD_SUB_GR_ID", dataSource: values.DROPPRODSUBGRP, height: 100, optionLabel: "<all>" });


            var grid = $("#CmnItmGrid").data("kendoGrid");
            grid.dataSource.data(values.DROPPRODGRID);

        }
    });
}