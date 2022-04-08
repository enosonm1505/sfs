var TotRoomCnt = 0;
var OccRoomCnt = 0;
var AccDt = "";
var AccMonth = "";
var AccDtStr = "";
var StrStDt = "";
var StrEndDt = "";
var vJ_Ind = 0;
var V18_Ind = 0;
var vCurrDt = "";
var ForecastFromDt = "";
var ForecastToDt = "";
var Top10AgentAmt = [];
var MaxTop10AgentAmt = 100000;
var Top10AgentAmtStep = 10000;

$(document).ready(function () {
    
   // alert(UserId);

    //$("#UserId").val('Admin');
    //$("#CompanyId").val('WS');
    //$("#ConnStr").val('Server=192.168.1.129;User Id=sa;Password=infosqlwinsar;Database=telfair;');

    FoFlashScreenLoad();
});
function FoFlashScreenLoad() {

    var rowDatad = "";
    var reqobj = {};
    reqobj["REQTYPE"] = "FnFoPopUpFlashLoad";
    reqobj["COMPID"] = CompanyId; //$("#CompanyId").val();
    reqobj["CONSTRING"] = ConnStr;// $("#ConnStr").val();
    reqobj["USRID"] = UserId; //$("#UserId").val();
    var dataparam = JSON.stringify(reqobj);
    var url = window.location.pathname;

    var split = url.split('/');
    var urlSpl = "";
    if (split.length > 2)
        urlSpl = split[2];
    else
        urlSpl = url.replace('/', '');
    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: urlSpl + "/GetGuestSearchDet",
        data: JSON.stringify({ request: dataparam }),
        dataType: "json",
        acceptType: "application/json;charset=utf-8",
        success: function (d) {
            rowDatad = JSON.parse(d.d);
            //if (rowDatad.length > 0) {
            AccDt = rowDatad.AccDt == null ? "" : $.trim(rowDatad.AccDt);
            vCurrDt = rowDatad.vCurrDt == null ? "" : $.trim(rowDatad.vCurrDt);
            AccMonth = rowDatad.AccMonth == null ? "" : $.trim(rowDatad.AccMonth);
            AccDtStr = rowDatad.AccDtStr == null ? "" : $.trim(rowDatad.AccDtStr);
            StrStDt = rowDatad.StrStDt == null ? "" : $.trim(rowDatad.StrStDt);
            StrEndDt = rowDatad.StrEndDt == null ? "" : $.trim(rowDatad.StrEndDt);
            ForecastFromDt = rowDatad.ForecastFromDt == null ? "" : $.trim(rowDatad.ForecastFromDt);
            ForecastToDt = rowDatad.ForecastToDt == null ? "" : $.trim(rowDatad.ForecastToDt);
            TotRoomCnt = rowDatad.TotRoomCnt == null ? "0" : $.trim(rowDatad.TotRoomCnt);
            OccRoomCnt = rowDatad.OccRoomCnt == null ? "0" : $.trim(rowDatad.OccRoomCnt);

            //}
        },
    });


    var reqobj = {};
    reqobj["REQTYPE"] = "GetMultiValueFromQry";
    reqobj["CaseArg"] = "TOP10AGENT";
    reqobj["StartDt"] = StrStDt;
    reqobj["EndDt"] = StrEndDt;
    reqobj["COMPID"] = CompanyId; //$("#CompanyId").val();
    reqobj["CONSTRING"] = ConnStr;// $("#ConnStr").val();
    reqobj["USRID"] = UserId; //$("#UserId").val();

    var url = window.location.pathname;
    var split = url.split('/');
    var urlSpl = "";
    if (split.length > 2)
        urlSpl = split[2];
    else
        urlSpl = url.replace('/', '');

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: urlSpl + "/GetGuestSearchDet",
        data: JSON.stringify({ request: dataparam }),
        dataType: "json",
        acceptType: "application/json;charset=utf-8",
        success: function (d) {

            Top10AgentAmt = JSON.parse(d.d);

            MaxTop10AgentAmt = Top10AgentAmt[0].Total == null ? "" : $.trim(Top10AgentAmt[0].Total);
        },
    });

    debugger;
    Top10AgentAmtStep = parseInt(MaxTop10AgentAmt / 10);


    webix.ui({
        view: "window",
        container: "ChartPopUp",
        modal: true,
        id: "FoFlashScreenLoad",
        head: AccDtStr,
        close: true,
        position: "center",
        height: 650,
        width: 1300,
        body: {
            view: "form",
            elements: [
                {
                    cols: [
                        {
                            rows: [
                             {
                                 template: "<div style='width:100%;text-align:center'>Occupancy Forecast</div>",
                                 height: 20
                             },
                            {
                                view: "chart",
                                id: "BusinessOnDys",
                                type: "line",
                                value: "#Rms#",
                                label: "#Rms#",
                                barwidth: 65,
                                radius: 0,
                                hidden: false,
                                gradient: "rising",
                                css: "LineCHART",
                                xAxis: {
                                    template: "#DtNo#",
                                },
                                yAxis: {
                                    title: "Rooms Occupied",
                                    start: 0,
                                    step: 10,
                                    end: TotRoomCnt,
                                    template: function (value) {
                                        return value % 20 ? "" : value
                                    },
                                },
                                tooltip: {
                                    template: "#Rms#"
                                },
                                //offset: false,
                                //preset: "plot",
                                //padding:
                                //{
                                //   top: 30,
                                //  bottom: 40
                                //},
                                //data:Occupency_Count,
                            },
                            ]
                        },
                        {
                            cols: [

                                {
                                    view: "chart",
                                    id: "OccupancyPie",
                                    type: "pie3D",
                                    value: "#statCnt#",
                                    //label: "#DeptName#",
                                    hidden: false,
                                    pieInnerText: "#statCnt#",
                                    color: "#color#",
                                    height: 250,
                                    radius: 100,
                                    legend: {
                                        template: "#StatNm#",
                                        valign: "middle",
                                        align: "right",
                                        width: 110,
                                        layout: "y"
                                    },
                                    tooltip: {
                                        template: "#StatNm#"
                                    },
                                    width: 435,
                                },
                                {
                                    view: "gage",
                                    id: "OccupMeter",
                                    value: OccRoomCnt,
                                    minRange: 0,
                                    maxRange: TotRoomCnt,
                                    label: "Occupancy",
                                    placeholder: "No of Rooms",
                                    height: 100,
                                    hidden: false,
                                    width: 200,
                                },
                            ]
                        },

                    ]
                },
                {
                    cols: [
                        {
                            rows: [
                                {
                                    template: "<div style='width:100%;text-align:center'>Market Segment " + AccMonth + "</div>",
                                    height: 20
                                },
                                {
                                    view: "chart",
                                    id: "MarketSegment",
                                    //type: "pie",
                                    type: "donut",
                                    value: "#total#",
                                    //label: "#total#",
                                    hidden: false,
                                    pieInnerText: "#total#",
                                    //innerRadius:100,
                                    gradient: true,
                                    shadow: 0,
                                    legend: {
                                        template: "#guest_inform_nm#",
                                        valign: "middle",
                                        align: "right",
                                        width: 200,
                                        //layout:"y"
                                    },
                                    tooltip: {
                                        template: "#guest_inform_nm#"
                                    },

                                },
                            ]
                        },
                        {
                            rows: [
                                {
                                    template: "<div style='width:100%;text-align:center'>Top 10 Agent " + AccMonth + "</div>",
                                    height: 20
                                },
                                {
                                    view: "chart",
                                    id: "Top10Agent",
                                    type: "bar",
                                    value: "#Total#",
                                    label: "#Total#",
                                    barwidth: 55,
                                    radius: 0,
                                    //height: 528,
                                    hidden: false,
                                    gradient: "3d",
                                    xAxis: {
                                        template: "#TRV_AGENT_NM#"
                                    },
                                    yAxis: {
                                        title: "Revenue",
                                        start: 0,
                                        //step: Top10AgentAmtStep,
                                        end: MaxTop10AgentAmt,
                                        template: function (value) {
                                            return value % 20 ? "" : value
                                        },
                                    },
                                    padding:
                                        {
                                            top: 10,
                                            bottom: 80,
                                            left: 80
                                        },
                                    //data: TopAgents,
                                },
                            ]
                        },
                    ]
                },

            ]
        },
    });


    $$("Top10Agent").clearAll();
    $$("BusinessOnDys").clearAll();
    $$("OccupancyPie").clearAll();
    $$("MarketSegment").clearAll();

    var reqobj = {};
    reqobj["REQTYPE"] = "GetMultiValueFromQry";
    reqobj["CaseArg"] = "OCCFORECAST";
    reqobj["StartDt"] = ForecastFromDt;
    reqobj["EndDt"] = ForecastToDt;
    reqobj["COMPID"] = CompanyId; //$("#CompanyId").val();
    reqobj["CONSTRING"] = ConnStr;// $("#ConnStr").val();
    reqobj["USRID"] = UserId; //$("#UserId").val();
    var rowDatad = [];
    var url = window.location.pathname;
    var split = url.split('/');
    var urlSpl = "";
    if (split.length > 2)
        urlSpl = split[2];
    else
        urlSpl = url.replace('/', '');

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: urlSpl + "/GetGuestSearchDet",
        data: JSON.stringify({ request: dataparam }),
        dataType: "json",
        acceptType: "application/json;charset=utf-8",
        success: function (d) {
            rowDatad = JSON.parse(d.d);
            debugger;
            $$("BusinessOnDys").parse(rowDatad);
        },
    });


    //var reqobj = {};
    //reqobj["REQTYPE"] = "GetMultiValueFromQry";
    //reqobj["CaseArg"] = "TOP10AGENT";
    //reqobj["StartDt"] = StrStDt;
    //reqobj["EndDt"] = StrEndDt;
    //reqobj["COMPID"] = $("#CompanyId").val();
    //reqobj["CONSTRING"] = $("#ConnStr").val();
    //reqobj["USRID"] = $("#UserId").val();
    //var rowDatad = [];
    //var url = window.location.pathname;
    //var split = url.split('/');
    //var urlSpl = "";
    //if (split.length > 2)
    //    urlSpl = split[2];
    //else
    //    urlSpl = url.replace('/', '');

    //var dataparam = JSON.stringify(reqobj);
    //$.ajax({
    //    async: false,
    //    type: "POST",
    //    contentType: "application/json;charset=utf-8",
    //    url: urlSpl + "/GetGuestSearchDet",
    //    data: JSON.stringify({ request: dataparam }),
    //    dataType: "json",
    //    acceptType: "application/json;charset=utf-8",
    //    success: function (d) {
    //        rowDatad = JSON.parse(d.d);
    //        debugger;
    //        $$("Top10Agent").parse(rowDatad);
    //    },
    //});


    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "fnFlashRoomStatus";
    reqobj["vFrom"] = StrStDt;
    reqobj["vTo"] = StrEndDt;
    reqobj["COMPID"] = CompanyId; //$("#CompanyId").val();
    reqobj["CONSTRING"] = ConnStr;// $("#ConnStr").val();
    reqobj["USRID"] = UserId; //$("#UserId").val();
    var url = window.location.pathname;
    var split = url.split('/');
    var urlSpl = "";
    if (split.length > 2)
        urlSpl = split[2];
    else
        urlSpl = url.replace('/', '');

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: urlSpl + "/GetGuestSearchDet",
        data: JSON.stringify({ request: dataparam }),
        dataType: "json",
        acceptType: "application/json;charset=utf-8",
        success: function (d) {
            rowDatad = JSON.parse(d.d);
            debugger;
            $$("OccupancyPie").parse(rowDatad);
        },
    });

    var reqobj = {};
    reqobj["REQTYPE"] = "GetMultiValueFromQry";
    reqobj["CaseArg"] = "MARKET_SEGMENT";
    reqobj["StartDt"] = StrStDt;
    reqobj["EndDt"] = StrEndDt;
    reqobj["COMPID"] = CompanyId; //$("#CompanyId").val();
    reqobj["CONSTRING"] = ConnStr;// $("#ConnStr").val();
    reqobj["USRID"] = UserId; //$("#UserId").val();
    var rowDatad = [];
    var url = window.location.pathname;
    var split = url.split('/');
    var urlSpl = "";
    if (split.length > 2)
        urlSpl = split[2];
    else
        urlSpl = url.replace('/', '');

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: urlSpl + "/GetGuestSearchDet",
        data: JSON.stringify({ request: dataparam }),
        dataType: "json",
        acceptType: "application/json;charset=utf-8",
        success: function (d) {
            rowDatad = JSON.parse(d.d);
            debugger;
            $$("MarketSegment").parse(rowDatad);
        },
    });

    $$("Top10Agent").parse(Top10AgentAmt);

    $$("FoFlashScreenLoad").show();

}
