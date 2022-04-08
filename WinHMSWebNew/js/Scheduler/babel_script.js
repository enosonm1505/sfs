'use strict';

var tab = 'sbe';

var showGrid = 'numbers';
var weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

var bookingType = '';

var bookingObj = {};
var copied = null;
var Weekof1 = 0;
var Weekof2 = 0;

$.ajax({
    type: "POST",
    url: "/FO/HolidaysLoad",
    cache: false,
    async: false,
    charset: 'utf-8',
    data: "",
    success: function (data) {
        Weekof1 = data.w.Weekoff1;
        Weekof2 = data.w.Weekoff2;
    }
});

var dp = new DayPilot.Scheduler("dp");
var ScheduleDt = $("#ScheduleDt").val();

dp.theme = "scheduler_8";
dp.clipBoard = null;

dp.rowHeaderWidth = 130;
dp.rowHeaderScrolling = true;
dp.cellWidth = 50;
dp.eventHeight = 35;
dp.headerHeight = 40;
// dp.rowMarginTop = 27;
dp.headerHeight = 35;
//dp.startDate = new DayPilot.Date().firstDayOfMonth();\
dp.startDate = ScheduleDt;
var cacheStart = dp.startDate;
dp.days = 90;
dp.cellDuration = 8;
dp.scale = 'Day';

dp.treeImageMarginTop = 20;
dp.treeAutoExpand = true;
dp.messageHideAfter = 2000;
dp.eventResizeMargin = 10;
dp.autoScroll = 'Drag';
dp.dynamicLoading = false;
//dp.selectArea = true;
dp.cornerHtml =" <span style='margin-top:2px; display:none; margin-left:10px' class='ui icon buttons' style='border: 1px solid rgba(0,0,0,0.1)'>" +
   "<button class='ui icon button' id='scroll-back'><i class='chevron left icon'></i></button>" +
    " <button class='ui icon button' id='scroll-today'><i class='circle icon'></i></button>" +
   "<button class='ui icon button' id='scroll-next'><i class='chevron right icon'></i></button> </span>"+

"<span id='colorbtn' style='margin-top:5px; margin-left:10px;'>" +   
    "<button type='button' style='margin:2px;height:28px !important;' class='btn btn-sm btn-social-icon btn-blue'  onclick='RoomChartSearch()'  title='Filter'><i style='left:2px' class='fa fa-filter'></i>  </button>" +
    "<button type='button' style='margin:2px;height:28px !important;' class='btn btn-sm btn-social-icon btn-success' onclick='NewReservation()'  title='New Reservation'><i style='left:2px' class='fa fa-plus'></i>  </button>" +
    "</span>";

dp.timeHeaders = [{
    groupBy: 'Month',
    format: 'MMMM yyyy'
}, {
    groupBy: 'Cell',
    format: 'ddd d'
}];

dp.separators = [{
    color: "#f798fa",
    location: new DayPilot.Date(),
    width: 1
}];

dp.heightSpec = "Max";
dp.height = window.screen.height - 300;
dp.width = '98%';

dp.businessBeginsHour = 10;
dp.businessEndsHour = 19;

$.ajax({
    async: false,
    url: "/FO/RoomResource",
    type: 'POST',
    data: "",
    success: function (data) {
        dp.resources = data.v;
        dp.events.list = data.w;
        dp.init();
        dp.update();
    }
});

document.querySelector('#scroll-next').addEventListener('click', function () {
    if (dp.getViewPort().end.addDays(-1).value === dp.getDate().value) {
        dp.days += 100;
        dp.scrollTo(dp.getDate(dp.getScrollX()).addDays(-100));
        dp.update();
    }
    scroll(1, 7, 21, 1);
});

document.querySelector('#scroll-back').addEventListener('click', function () {
    if (dp.getViewPort().start === cacheStart) {
        cacheStart = dp.startDate = dp.getViewPort().start.addDays(-100);
        dp.days += 100;
        dp.scrollTo(dp.getDate(dp.getScrollX()).addDays(100));
        dp.update();
    }
    scroll(-1, -7, -21, -1);
});



function NewReservation() {
    newreswindow();
};

function RoomChartSearch() {
    var window = $("#RoomChartFilter");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
};

function LegendSearch() {
    var window = $("#RoomChartLegend");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
};

document.querySelector('#scroll-today').addEventListener('click', function () {
    // cacheStart = dp.startDate = (new DayPilot.Date()).addDays(-10)
    dp.scrollTo(new DayPilot.Date(), false, 'middle');
    dp.update();
});

//View Modes
var modesGroupedLabel = document.querySelector('#label-modes-grouped');
// const modesSingleProjectResourceLabel = document.querySelector('#label-modes-single-project-resource')
var modesSingleResourceLabel = document.querySelector('#label-modes-single-resource');
var modesStyle = function modesStyle() {
    return modesGroupedLabel.style.display = arguments.length <= 0 ? undefined : arguments[0], modesSingleResourceLabel.style.display = arguments.length <= 1 ? undefined : arguments[1];
};

var setNewDateRange = function setNewDateRange(args) {
    if (args.e.start() === args.e.end().addDays(-1)) splitdate.config().container = null;else splitdate.setMaxDate(new Date(args.e.end().addDays(-1).value));
    splitdate.setMinDate(new Date(args.e.start().addDays(1).value));

    splitdate.config().onSelect = function (date) {
        dp.events.remove(args.e);
        createTwoEvents(args.e.start(), moment(date).format('YYYY-MM-DD'), args.e.end(), args.e);
        document.querySelector('#eventActions').style.display = 'none';
        showHeatMap();
    };
};

dp.timeRangeClickHandling = "Enabled";
//dp.allowMultiRange = true;

dp.treePreventParentUsage = true;

dp.treeEnabled = true;

dp.onEventClicked = function(args) {
  
    var ARR = args.e.data.FromStr
    var DEP = args.e.data.ToStr;

    var ARRTM = args.e.data.S_TM;
    var DEPTTM = args.e.data.E_TM;

    var Nights = args.e.data.Nights;
    var resource = args.e.data.RoomNO;

    var Ty_ID = args.e.data.Ty_ID;
    var RMTY = args.e.data.Room_TY_ID;
    var RGNO = args.e.data.REG_BLOCK_NO;
    var RESERVE_NO = args.e.data.RESERVE_NO;
    var TariffAmt = args.e.data.TariffAmt;
    var PAX = args.e.data.PAX;
    var text = args.e.data.text;

    var AdvanceAmt = args.e.data.AdvanceAmt;
    var NARR1 = args.e.data.NARR1;
    openPopup(ARR,
        DEP,
        ARRTM,
        DEPTTM,
        Nights,
        resource,
        Ty_ID,
        RMTY,
        RGNO,
        RESERVE_NO,
        TariffAmt,
        NARR1,
        AdvanceAmt,
        PAX,
        text,
        "O");
};

dp.onTimeRangeSelected = function (args) {   
    var dp = this;
    var ARR = args.start.value.toString();
    var DEP = args.end.value.toString();
    var date = new DayPilot.Date(ARR);
    ARR = date.toString("dd/MM/yyyy");
    var date2 = new DayPilot.Date(DEP).addDays(-1);
    DEP = date2.toString("dd/MM/yyyy");
    var days = DayPilot.DateUtil.daysDiff(args.start.value, args.end.value);
    var resource = args.resource;
    var splitval = resource.split('~');
    var RMTY = splitval[0];
    var ROOMNO = splitval[1];

    var ARRTM = "00:00";
    var DEPTTM = "12:00";
    newmodeopen(ARR, DEP, ARRTM, DEPTTM, RMTY, ROOMNO, days);
    var ranges = dp.multirange;
};
dp.onEventClicked= function (args) {
   
    var ARR = args.e.data.FromStr
    var DEP = args.e.data.ToStr;

    var ARRTM = args.e.data.S_TM;
    var DEPTTM = args.e.data.E_TM;

    var Nights = args.e.data.Nights;
    var resource = args.e.data.RoomNO;

    var Ty_ID = args.e.data.Ty_ID;
    var RMTY = args.e.data.Room_TY_ID;
    var RGNO = args.e.data.REG_BLOCK_NO;
    var RESERVE_NO = args.e.data.RESERVE_NO;
    var TariffAmt = args.e.data.TariffAmt;
    var PAX = args.e.data.PAX;
    var text = args.e.data.text;
                    
    var AdvanceAmt = args.e.data.AdvanceAmt;
    var NARR1 = args.e.data.NARR1;
    openPopup(ARR, DEP, ARRTM, DEPTTM, Nights, resource,Ty_ID,RMTY,RGNO,RESERVE_NO,TariffAmt,NARR1,AdvanceAmt,PAX,text, "O");
};
dp.eventClickHandling="Select";
    dp.onEventEdited= function (args) {
        this.message("Event selected: " + args.e.text());
    };

dp.onBeforeEventRender = function(args) {
   // args.data.cssClass = "shape";
    //  args.data.html = args.e.text + ":";
};
dp.onEventMove = function(args) {
    dp.rows.find(args.e.data.resource).parent().cells.all().invalidate();
    dp.rows.find(args.newResource).parent().cells.all().invalidate();
};
dp.onEventResize = function(args) {
    dp.rows.find(args.e.data.resource).parent().cells.all().invalidate();
};
dp.onBeforeTimeHeaderRender = function(args) {
       if (args.header.level === 1) {     
        var wek1 = Number(Weekof1) - 1;
        var wek2 = Number(Weekof2) - 1;
        var dayof = args.header.start.getDayOfWeek();       
        if (dayof === wek1 || dayof === wek2) {
            args.header.backColor = "#ead7f6";
            args.header.color = "red!important;";
        }
        if (args.header.start <= DayPilot.Date.today() && DayPilot.Date.today() < args.header.end) {
            args.header.backColor = "antiquewhite";
            args.header.disable = true;
        }
    }
};
dp.onBeforeResHeaderRender = function(args) {
    args.resource.backColor = "white";
    if (args.resource.level == 0) {
        args.resource.cssClass = "ressty";
    }
};

dp.groupConcurrentEvents = false;
dp.groupConcurrentEventsLimit = 1; // don't group if there aren't more than 2 overlapping events

dp.onBeforeRowHeaderRender = function (args) {
    var hasExpanded = args.row.groups.expanded().length > 0;
    var hasCollapsed = args.row.groups.collapsed().length > 0;

    if (hasExpanded && hasCollapsed) {
        args.row.areas = [{
            v: "Visible", right: 14, top: 0, height: 12, width: 12, style: "cursor:pointer", html: "", action: "JavaScript", js: function js(row) {
                row.groups.expandAll();
            }
        }, {
            v: "Visible", right: 0, top: 0, height: 12, width: 12, style: "cursor:pointer", html: "", action: "JavaScript", js: function js(row) {
                row.groups.collapseAll();
            }
        }];
    } else if (hasCollapsed) {
        args.row.areas = [{
            v: "Visible", right: 5, top: 0, height: 12, width: 12, style: "cursor:pointer", html: "<i class='pam'>[+]</i>", action: "JavaScript", js: function js(row) {
                row.groups.expandAll();
            }
        }];
    } else if (hasExpanded) {
        args.row.areas = [{
            v: "Visible", right: 5, top: 0, height: 12, width: 12, style: "cursor:pointer", html: "<i class='pam'>[-]</i>", action: "JavaScript", js: function js(row) {
                row.groups.collapseAll();
            }
        }];
    }
};
dp.timeRangeClickHandling = "Enabled";
dp.allowMultiRange = true;

//dp.onBeforeRowHeaderRender = function(args) {
//    debugger;
//    args.row.backColor = "white";
//};

dp.beforeCellRenderCaching = false;

dp.onBeforeCellRender = function (args) {
    debugger;
    if (args.cell.isParent > 0) {
        if (args.cell.isParent) {
            debugger;
            var children = dp.rows.find(args.cell.resource).children();
            var total = children.length;
            
            //for (var i = 0; i < dp.events.list.length; i++) {

            //    if (args.cell.start.value <= dp.events.list[i].start &&  args.cell.end.value >= dp.events.list[i].end ) {
            //        alert(0);
            //    }
            //}

            var used = children.filter(function (row) {
                debugger;                
              //return !!row.events.forRange(args.cell.start, args.cell.end).length;
            }).length;
            var available = total - used;
            var w = dp.cellWidth / total;
            args.cell.areas = [];
            args.cell.areas.push({
                html: "" + available,
                style: "text-align: center; font-size: 12px; ",
                top: 10,
                left: 0,
                right: 0
            });
            debugger;           
            args.cell.backColor = "#d9ead3";
            if (available === 0) {
                args.cell.backColor = "#fce5cd";
                args.cell.backColor = "#f9cb9c";
            }
        }
    }
    //if (args.cell.start <= DayPilot.Date.today() && DayPilot.Date.today() < args.cell.end) {
    //    args.cell.backColor = "antiquewhite";
    //    args.cell.disable = true;
    //}
        //var wek1 = Number(Weekof1) - 1;
        //var wek2 = Number(Weekof2) - 1;
        //if (args.cell.start.getDayOfWeek() === wek1 || args.cell.start.getDayOfWeek() === wek2) {
        //    args.cell.backColor = "#eff9fb";
        //}
};

$.ajax({
    async: false,
    url: "/FO/RoomResource",
    type: 'POST',
    data: "",
    success: function (data) {
        dp.resources = data.v;
        dp.events.list = data.w;
        dp.init();
        dp.update();
    }
});
