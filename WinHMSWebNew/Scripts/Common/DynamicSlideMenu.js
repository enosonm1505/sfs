//var data = "";
//$(function () {
//    $.ajax({
//        url: "http://www.yourDomain.com/yourController/yourMethod",
//        dataType: "json",
//        type: "get",
//        beforeSend: function (xhr, settings) {
//            $("#Li2").find("ul").remove();
//        },
//        success: function (data, status, xhr) {
//            if (data["d"]) {
//                if (data["d"].length) {
//                    var items = data["d"],
//                        ul = $("<ul />").appendTo($("#Li2"));
//                    for (x in items) {
//                        var li = $("<li />").appendTo(ul);
//                        li.append($("<a />", { href: items[x].ReportUrl, text: items[x].ReportName }));
//                    }
//                }
//            }
//        }
//    })
//})
////OR if the JSON is a variable in your JS then you would just use $.each() with same type setup:

//$(function () {
//    var $ul = $("<ul />").appendTo($("#Li2"));
//    $.each(data.d, function (index, item) {
//        var li = $("<li />").appendTo($ul);
//        li.append($("<a />", { href: item.ReportUrl, text: item.ReportName }));
//    })
//})
////And just for thoroughness, a combo of the 2:

//$(function () {
//    $.ajax({
//        url: "http://www.yourDomain.com/yourController/yourMethod",
//        dataType: "json",
//        type: "get",
//        beforeSend: function (xhr, settings) {
//            $("#Li2").find("ul").remove();
//        },
//        success: function (data, status, xhr) {
//            if (data["d"]) {
//                if (data["d"].length) {
//                    var ul = $("<ul />").appendTo($("#Li2"));
//                    $.each(data.d, function (index, item) {
//                        var li = $("<li />").appendTo(ul);
//                        li.append($("<a />", { href: items[x].ReportUrl, text: items[x].ReportName }));
//                    });
//                }
//            }
//        }
//    })
//})

//transcation
var Finance = function (Menu, Div) {
    var menu = JSON.parse(Menu);
    debugger;
    $("#" + Div).find("ul").remove();
    if (menu.length > 0) {
        var sno = "";
        ul = $("<ul />").appendTo($("#" + Div));
        ul.attr("class", "sidebar-menu");
        ul.attr("id", "programmenu");
        ul.attr("data-widget", "tree");
        for (x in menu) {
            if (menu[x].MENU_LEVEL == "1" && menu[x].PARENT_SEQ_NO == "0" ) {
                sno = menu[x].SEQ_NO;
                var li = $("<li />").appendTo(ul).addClass("treeview");
                var a = $("<a />", { href: menu[x].W_LINK }).appendTo(li);
                var i = $("<i />").addClass("fa text-white " + menu[x].MNU_ICON).appendTo(a);
                var sp = $("<span />", { text: menu[x].MENU_NM }).addClass("MenuFont  ").appendTo(a);
                var sp1 = $("<span />").addClass("pull-right-container").appendTo(a);
                var i1 = $("<i />").addClass("fa fa-angle-down pull-right").appendTo(sp1);

                var ul1 = $("<ul />").addClass("treeview-menu").appendTo(li);
                for (x1 in menu) {
                    if (sno == menu[x1].PARENT_SEQ_NO) {
                    if (menu[x1].MENU_LEVEL != "1" && menu[x1].PARENT_SEQ_NO != "0") {                       
                            var li1 = $("<li />").appendTo(ul1);
                            var a1 = $("<a />", { href: menu[x1].W_LINK }).appendTo(li1);
                            var i2 = $("<i />").addClass("fa " + menu[x1].MNU_ICON).appendTo(a1);
                            var i3 = $("<i />", { text: menu[x1].MENU_NM }).addClass("MenuFont ").appendTo(a1);
                        }
                    }
                }
            }
        }
    }
}

//compliants
var Compliants = function (Menu, Div) {
    var menu = JSON.parse(Menu);
    debugger;
    $("#" + Div).find("ul").remove();
    if (menu.length > 0) {
        var sno = "";
        ul = $("<ul />").appendTo($("#" + Div));
        ul.attr("class", "sidebar-menu");
        ul.attr("id", "programmenu");
        ul.attr("data-widget", "tree");
        for (x in menu) {
            if (menu[x].MENU_LEVEL == "1" && menu[x].PARENT_SEQ_NO == "0" ) {
                sno = menu[x].SEQ_NO;
                var li = $("<li />").appendTo(ul).addClass("treeview");
                var a = $("<a />", { href: menu[x].W_LINK }).appendTo(li);
                var i = $("<i />").addClass("fa text-white " + menu[x].MNU_ICON).appendTo(a);
                var sp = $("<span />", { text: menu[x].MENU_NM }).addClass("MenuFont ").appendTo(a);
                var sp1 = $("<span />").addClass("pull-right-container").appendTo(a);
                var i1 = $("<i />").addClass("fa fa-angle-down pull-right").appendTo(sp1);

                var ul1 = $("<ul />").addClass("treeview-menu").appendTo(li);
                for (x1 in menu) {
                    if (sno == menu[x1].PARENT_SEQ_NO) {
                        if (menu[x1].MENU_LEVEL != "1" && menu[x1].PARENT_SEQ_NO != "0") {
                            var li1 = $("<li />").appendTo(ul1);
                            var a1 = $("<a />", { href: menu[x1].W_LINK }).appendTo(li1);
                            var i2 = $("<i />").addClass("fa " + menu[x1].MNU_ICON).appendTo(a1);
                            var i3 = $("<i />", { text: menu[x1].MENU_NM }).addClass("MenuFont ").appendTo(a1);
                        }
                    }
                }
            }
        }
    }
}

//Masters
var Masters = function (Menu, Div) {
    debugger;
    var menu = JSON.parse(Menu);
    debugger;
    $("#" + Div).find("ul").remove();
    if (menu.length > 0) {
        var sno = "";
        ul = $("<ul />").appendTo($("#" + Div));
        ul.attr("class", "sidebar-menu");
        ul.attr("id", "programmenu");
        ul.attr("data-widget", "tree");
        for (x in menu) {
            if (menu[x].MENU_LEVEL == "1" && menu[x].PARENT_SEQ_NO == "0" ) {
                sno = menu[x].SEQ_NO;
                var li = $("<li />").appendTo(ul).addClass("treeview");
                var a = $("<a />", { href: menu[x].W_LINK }).appendTo(li);
                var i = $("<i />").addClass("fa text-white " + menu[x].MNU_ICON).appendTo(a);
                var sp = $("<span />", { text: menu[x].MENU_NM }).addClass("MenuFont ").appendTo(a);
                var sp1 = $("<span />").addClass("pull-right-container").appendTo(a);
                var i1 = $("<i />").addClass("fa fa-angle-down pull-right").appendTo(sp1);

                var ul1 = $("<ul />").addClass("treeview-menu").appendTo(li);
                for (x1 in menu) {
                    if (sno == menu[x1].PARENT_SEQ_NO) {
                        if (menu[x1].MENU_LEVEL != "1" && menu[x1].PARENT_SEQ_NO != "0") {
                            var li1 = $("<li />").appendTo(ul1);
                            var a1 = $("<a />", { href: menu[x1].W_LINK }).appendTo(li1);
                            var i2 = $("<i />").addClass("fa " + menu[x1].MNU_ICON).appendTo(a1);
                            var i3 = $("<i />", { text: menu[x1].MENU_NM }).addClass("MenuFont ").appendTo(a1);
                        }
                    }
                }
            }
        }
    }
}

//Hostel
var Hostel = function (Menu, Div) {
    var menu = JSON.parse(Menu);
    debugger;
    $("#" + Div).find("ul").remove();
    if (menu.length > 0) {
        var sno = "";
        ul = $("<ul />").appendTo($("#" + Div));
        ul.attr("class", "sidebar-menu");
        ul.attr("id", "programmenu");
        ul.attr("data-widget", "tree");
        for (x in menu) {
            if (menu[x].MENU_LEVEL == "1" && menu[x].PARENT_SEQ_NO == "0" ) {
                sno = menu[x].SEQ_NO;
                var li = $("<li />").appendTo(ul).addClass("treeview");
                var a = $("<a />", { href: menu[x].W_LINK }).appendTo(li);
                var i = $("<i />").addClass("fa text-white " + menu[x].MNU_ICON).appendTo(a);
                var sp = $("<span />", { text: menu[x].MENU_NM }).addClass("MenuFont ").appendTo(a);
                var sp1 = $("<span />").addClass("pull-right-container").appendTo(a);
                var i1 = $("<i />").addClass("fa fa-angle-down pull-right").appendTo(sp1);

                var ul1 = $("<ul />").addClass("treeview-menu").appendTo(li);
                for (x1 in menu) {
                    if (sno == menu[x1].PARENT_SEQ_NO) {
                        if (menu[x1].MENU_LEVEL != "1" && menu[x1].PARENT_SEQ_NO != "0") {
                            var li1 = $("<li />").appendTo(ul1);
                            var a1 = $("<a />", { href: menu[x1].W_LINK }).appendTo(li1);
                            var i2 = $("<i />").addClass("fa " + menu[x1].MNU_ICON).appendTo(a1);
                            var i3 = $("<i />", { text: menu[x1].MENU_NM }).addClass("MenuFont ").appendTo(a1);
                        }
                    }
                }
            }
        }
    }
}
