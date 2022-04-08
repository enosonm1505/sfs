function FormLoad()
{
    $("#pageload").hide();
    webix.ui({ container: "divPropbox", view: "richselect", id: "Property", on: { onChange: function (newVal, OldVal) { PropChange(newVal); } } });
    webix.ui({
        view: 'form',
        id: 'DivForm',
        container: 'DivForm',
        minWidth: 900,
        maxWidth:5000,
        minHeight: 520,
        elements: [
            {
                rows: [
                   {
                       cols: [
                        {
                            view: "checkbox", id: "ChkFo", labelWidth: 50, labelRight: "FO", value: "1", customCheckbox: false, width: 120, on: {
                                onChange: function (newVal, OldVal) {
                                    if (newVal == 0)
                                    {
                                        $$("ChkNights").show(); $$("LblNights").hide();
                                        $$("ChkARR").show(); $$("LblARR").hide();
                                        $$("ChkNights").define("labelRight", "Covers"); $$("ChkNights").refresh();
                                        $$("ChkARR").define("labelRight", "APC"); $$("ChkARR").refresh();
                                        if ($$("ChkBq").getValue() == "0") $$("ChkBq").setValue("1")
                                    }
                                    else
                                    {
                                        if($$("ChkBq").getValue()=="1")
                                        {
                                            $$("ChkNights").hide(); $$("LblNights").show();
                                            $$("ChkARR").hide(); $$("LblARR").show();
                                        }
                                    }
                                  
                                }
                            }
                        },
                       { view: "checkbox", id: "ChkNights", hidden: true, labelWidth: 50, labelRight: "Nights", value: "1", customCheckbox: false, width: 350 },
                         { view: "label", id: "LblNights", label: "", width: 350 },
                       {
                           view: "datepicker", label: "From", labelWidth: 50,  width: 170,labelAlign: "right", id: "FromDt", format: "%M %Y", type: "month", stringResult: true,
                           on: { onChange: function (newVal, OldVal) { SMFromDateChange(); } }
                       },
                       {
                           view: "datepicker", label: "To", labelWidth: 50, width: 170, labelAlign: "right", id: "ToDt", format: "%M %Y", type: "month", stringResult: true,
                           on: { onChange: function (newVal, OldVal) { SMToDateChange(); } }
                       },
                       { view: "button", id: "btnDispay", css:'webix_primary', inputWidth: 60, label: "Display", click: function () { fnLoadGrid(); } }
                       ]
                   },
                     {
                         cols:[
                             {
                                 view: "checkbox", id: "ChkBq", labelWidth: 50, labelRight: "Banquet", value: "1", customCheckbox: false, width: 120,
                                 on: {
                                     onChange: function (newVal, OldVal) {
                                         debugger;
                                         if (newVal == 0) {
                                             $$("ChkNights").show(); $$("LblNights").hide();
                                             $$("ChkARR").show(); $$("LblARR").hide();
                                             $$("ChkNights").define("labelRight", "Nights"); $$("ChkNights").refresh();
                                             $$("ChkARR").define("labelRight", "ARR"); $$("ChkARR").refresh();
                                             if ($$("ChkFo").getValue() == "0") $$("ChkFo").setValue("1")
                                         }
                                         else {
                                             if ($$("ChkFo").getValue() == "1") {
                                                 $$("ChkNights").hide(); $$("LblNights").show();
                                                 $$("ChkARR").hide(); $$("LblARR").show();
                                             }
                                         }
                                     }
                                 }
                             },
                            { view: "checkbox", id: "ChkRev", labelWidth: 50, labelRight: "Revenue", value: "1", customCheckbox: false, width: 350 },
                                                     ]                       
                     },
                     {
                         cols: [
                             { width: 120 },
                             { view: "checkbox", id: "ChkARR", labelWidth: 50, hidden:true,labelRight: "ARR", value: "1", customCheckbox: false, width: 350 },
                                  { view: "label", id: "LblARR", label: "", width: 350 },
                             ]
                     },
                   {
                       id: "gridRpt",
                       select: 'row',
                       view: "datatable",
                       fixedRowHeight: false,
                       rowLineHeight: 23,
                       autoConfig: true,
                       resizeColumn: true,
                       resizeRow: true,
                       spans: true,
                       position: "flex",
                       //css: "webix_header_border",
                       data: [],
                       //width: 4000,
                       height:400,
                       columns: [
                           
                               { id: "SpNm", header: { text: "Name", height: 36 }, width: 200, },
                                   { id: "Type", header: { text: "Name" }, width: 130, },
                                { id: "SpId", hidden: true },
                               { id: "CLR", hidden: true },
                       ],
                       data: [],
                       scheme: {
                           $init: function (item) {
                               debugger;
                              
                               if ($.trim(item.CLR) == "TotSPRow" || $.trim(item.CLR) == "SPRow")
                               {
                                   $$("gridRpt").addCellCss(item.id, "SpNm", $.trim(item.CLR));
                               }
                               else 
                               {
                                   item.$css = item.CLR;
                               }
                           },                         
                       },
                   }                 
                ]
            } 
        ]
    });
}
function LoadProperty() {
    debugger;
    var rowData = [];
    try {
        $.ajax({
            async: false,
            type: "POST",
            url: "/SalesAndMarket/fnLoadProperty",
            data: "",
            success: function (d) {
                debugger;
                if (d != "") {
                    rowDatad = JSON.parse(d);
                    $$("Property").define("options", rowDatad);
                    $$("Property").refresh();
                }
            },
        });
    }
    catch (e) {
        console.log(e.message)
    }
};
function PropChange(vProperty) {
    debugger;
    clearGrid();
    LoadDate();
    fnLoadHeader();
};
function fnLoadHeader() {
    debugger;
    $$("gridRpt").clearAll();
    var ColVal = [];
    $$("gridRpt").config.columns = ColVal;
    $$("gridRpt").refreshColumns();
    var rowData = [];
    var FromDate =  fnMnthConvDate( $$("FromDt").getValue());
    var ToDate = fnMnthConvDate($$("ToDt").getValue());
    var vColumn = $$("gridRpt").config.columns;
    try {
        $.ajax({
            async: false,
            type: "POST",
            url: "/SalesAndMarket/fnSMSPContMonHeader",
            data: "FromDt=" + FromDate + "&ToDt=" + ToDate,
            success: function (d) {
                debugger;
                if (d != "") {
                    rowData = JSON.parse(d);
                    var set = {
                        id: "SpNm", header: { text: "Name", height: 36 }, width: 200, css: { 'text-align': 'left ! important', },
                    };
                    vColumn.push(set);
                    var set = {
                        id: "Type", header: { text: "", height: 36 }, width: 130, css: { 'text-align': 'left ! important', },
                    };
                    vColumn.push(set);

                    var set = {
                        id: "SpId", hidden: true
                    };
                    vColumn.push(set);

                    var set = {
                        id: "CLR", hidden: true
                    };
                    vColumn.push(set);

                    $.each(rowData, function (key, value) {
                        var Hdr = $.trim(value.DATE_NM);
                        var vid = $.trim(value.DATE_ID);
                        var set = {
                            id: $.trim(vid), header: { text: Hdr, css: "multiline" }, width: 100, css: { 'text-align': 'right ! important', },
                        };
                        vColumn.push(set);
                    });
                    $$("gridRpt").refreshColumns();
                    $$("gridRpt").refresh();
                }
            },

        });
    }
    catch (e) {
        console.log(e.message)
    }
    //return rowData;
};
function fnLoadGrid() {
    debugger;
    clearGrid();
    $("#pageload").show();    
    var FromDate = $$("FromDt").getValue();
    var ToDate = $$("ToDt").getValue();
    FromDate = fnMnthConvDate(FromDate);
    ToDate = fnMnthConvDate(ToDate);
    var ChkFo = "";
    if ($$("ChkFo").getValue() == "1") ChkFo = "1";   
    var ChkRev = "";
    if ($$("ChkRev").getValue() == "1") ChkRev = "1";      
    var ChkBq = "";
    if ($$("ChkBq").getValue() == "1") ChkBq = "1";
    var ChkNights = "";
    if ($$("ChkNights").getValue() == "1") ChkNights = "1";
    var ChkARR = "";
    if ($$("ChkARR").getValue() == "1") ChkARR = "1";
    debugger;
    Request = {
        COMP_ID: $$("Property").getValue(),
        FromDate: FromDate,
        ToDate: ToDate,
        ChkFo: ChkFo,
        ChkRev: ChkRev,
        ChkBq: ChkBq,
        ChkNights: ChkNights,
        ChkARR: ChkARR,        
    }
    var rowData = [];
    requestData = JSON.stringify(Request);
    requestData = encodeURIComponent(requestData);
    if (FromDate != "" && ToDate != "") {
        $.ajax({
            async: true,
            url: "/SalesAndMarket/fnRptSMSPContDisplay",
            type: 'POST',
            data: Request,
            success: function (data) {
                debugger;
                if (data != "") {
                    rowData = JSON.parse(data);
                    $$("gridRpt").parse(rowData);
                    $$("gridRpt").refresh();
                    $("#pageload").hide();                
                }
                else {
                    $("#pageload").hide();
                }
            },
            complete: function () {
                $("#pageload").hide();
            },
            error: function (request, status, error) {
                console.log("Error Failure");
                $("#pageload").hide();
            }
        });
    }
};
function clearGrid() {
    $$("gridRpt").clearAll();
   
}
function LoadDate() {
    debugger;

    var COMPID = $$("Property").getValue();

    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/GetFrmMnthToMnth",
        cache: false,
        async: false,
        charset: 'utf-8',
        data: "COMPID=" + COMPID + "&ADDDAY=" + "-3" + "&ADDTP=" + "M",

        success: function (data) {
            debugger;
            var data1 = JSON.parse(data);

            $$("FromDt").setValue(new Date(data1[0].TODATE));
            $$("ToDt").setValue(new Date(data1[0].FROMDATE));

        },
    });
};
function fnMnthConvDate(StrDt) {
    //debugger;
    var Parts = StrDt.split(" ");
    var MN = FnRetMonth(Parts[0]);
    var YR = Parts[1];
    var Str = "01" + "/" + MN + "/" + YR;
    return Str;
};
function FnRetMonth(StrMnNm) {
    //debugger;
    var UStr = StrMnNm.toUpperCase();
    var str = "";

    switch (UStr) {
        case "JAN": str = "01"; break;
        case "FEB": str = "02"; break;
        case "MAR": str = "03"; break;
        case "APR": str = "04"; break;
        case "MAY": str = "05"; break;
        case "JUN": str = "06"; break;
        case "JUL": str = "07"; break;
        case "AUG": str = "08"; break;
        case "SEP": str = "09"; break;
        case "OCT": str = "10"; break;
        case "NOV": str = "11"; break;
        case "DEC": str = "12"; break;
    }
    return str;
};
function SMFromDateChange(e) {
    debugger;
    clearGrid();
    fnLoadHeader();
    var From = $$("FromDt").getValue();
    var To = $$("ToDt").getValue();

    From = fnMnthConvDate(From);
    To = fnMnthConvDate(To);
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/FTDateValidation",
        cache: false,
        charset: 'utf-8',
        data: "F=" + From + "&T=" + To + "&CurrDtChk=" + "1", 
        success: function (data) {
            if (data.d != "") {
                debugger;
                if (data.d == "2") $$("FromDt").setValue(new Date(formatDate(To)));
                else $$("ToDt").setValue(new Date(formatDate(From)));
            }
        }
    });
}
function SMToDateChange(e) {
    debugger;
    clearGrid();
    fnLoadHeader();
    var From = $$("FromDt").getValue();
    var To = $$("ToDt").getValue();

    From = fnMnthConvDate(From);
    To = fnMnthConvDate(To);

    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/FTDateValidation",
        cache: false,
        charset: 'utf-8',
        data: "F=" + From + "&T=" + To + "&CurrDtChk=" + "1",
        success: function (data) {
            if (data.d != "") {
                debugger;
                if (data.d == "2") $$("ToDt").setValue(new Date(formatDate(From)));
                else  $$("FromDt").setValue(new Date(formatDate(To))); 
               
            }
        }
    });
}
function formatDate(StrDt) {
    debugger;
    var Parts = StrDt.split("/");
    var Dt = Parts[0];
    var Mn = Parts[1];
    var Yr = Parts[2];
    var Str = Yr + "-" + Mn + "-" + Dt;
    return Str;
}
function PropertyNM_New() {
    read_ORG_Data = "true";
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/PropertyNM_New",
        data: {},
        async: false,
        success: function (d) {
            if (d != "") {
                rowDatad = JSON.parse(d);
            }
        }
    });
    return rowDatad;
}