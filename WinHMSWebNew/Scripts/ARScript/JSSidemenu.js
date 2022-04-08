

function MenuHDClick(id, level) {
    var menusel = $("#MnSel").val();
    if (menusel != "1") {
        var node = document.getElementsByName('MenuHeader');
        for (i = 0; i < node.length; i++) {
            if (id == node[i].id) {
                var idval = node[i].id;
                // $('#' + idval).removeClass('menu-open');

            }
        }
        var node1 = document.getElementsByName('MenuHeaderUL');
        var node2 = document.getElementsByName('MenuHeaderUL1');
        if (node2.length > 0 && id != 'FOMNUMST1') {
            for (j = 0; j < node1.length; j++) {
                if (id != node1[j].id) {
                    document.getElementsByName('MenuHeaderUL')[j].style.display = "none";
                }
            }
        }
        else {
            document.getElementsByName('MenuHeaderUL')[j].style.display = "block";
        }

        var node = document.getElementsByName('MenuHeaderActive');
        for (i = 0; i < node.length; i++) {

            var idval = node[i].id;
            $('#' + idval).removeClass('active');

        }
        var Splitval = id.split("_");
        $("#" + Splitval[0] + '_2').addClass("active");

    }
    $("#MnSel").val("");
}

function MenuHDClick1(id, level) {
    var node = document.getElementsByName('MenuHeader1');
    for (i = 0; i < node.length; i++) {
        if (id == node[i].id) {
            $("#MnSel").val("1");
            var idval = node[i].id;
            // $('#' + idval).removeClass('menu-open');
        }
    }
    var node1 = document.getElementsByName('MenuHeaderUL1');
    for (j = 0; j < node1.length; j++) {
        if (id != node1[j].id) {
            document.getElementsByName('MenuHeaderUL1')[j].style.display = "none";

        }
    }
    var node = document.getElementsByName('MenuHeader1Active');
    for (i = 0; i < node.length; i++) {

        var idval = node[i].id;
        $('#' + idval).removeClass('active');

    }
    var Splitval = id.split("_");
    $("#" + Splitval[0] + '_2').addClass("active");

}

function GetMenuValueFn() {
    debugger;
    var rowDatad = [];
    var reqobj = {};

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/ARTrans/API_CALLSM",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ request: dataparam }),
        dataType: "json",
        acceptType: "application/json;charset=utf-8",
        success: function (d) {
            if (d != "") {
                debugger;

                rowDatad = JSON.parse(d);
                var div = 'Loadmenu';
                LoadMenuFn(rowDatad, div);

                if ($("#MenuName").val() != "") {
                    $("#" + $.trim($("#MenuName").val()) + '_1').addClass("active");
                }
                if ($("#MenuLvl").val() != "") {
                    $("#" + $.trim($("#MenuLvl").val()) + '_1').addClass("menu-open");
                    $("#" + $.trim($("#MenuLvl").val()) + '_2').addClass("active");
                }
                if ($("#MenuLvl1").val() != "") {
                    $("#" + $.trim($("#MenuLvl1").val()) + '_1').addClass("menu-open");
                    $("#" + $.trim($("#MenuLvl1").val()) + '_2').addClass("active");
                }
            }
        }
    });
    return rowDatad;
}

var LoadMenuFn = function (Menu, Div) {
    var lphide = "";
    var menu = Menu;

    $("#DynMenuLoad").find("li").remove();
    if (menu.length > 0) {
        var sno = "";
        var sno1 = "";
        var NODE_KEY1 = "";
        var NODE_KEY2 = "";

        for (x in menu) {
            if (menu[x].MENU_LEVEL == "1" && menu[x].PARENT_SEQ_NO == "0") {
                sno = menu[x].SEQ_NO;
                NODE_KEY1 = menu[x].NODE_KEY;
                var li1 = $("<li />").appendTo($("#DynMenuLoad"));
                li1.attr("class", "nav-item has-treeview");
                li1.attr("name", "MenuHeader");
                li1.attr("id", menu[x].PROGRAM_LINK_ID + '_1');
                $("#MnSel").val("");
                li1.attr("onclick", 'MenuHDClick(this.id),' + menu[x].MENU_LEVEL + '');
                var a1 = $("<a />").appendTo(li1);
                a1.attr("class", "nav-link");
                a1.attr("name", "MenuHeaderActive");
                a1.attr("id", menu[x].PROGRAM_LINK_ID + '_2');
                a1.attr("href", "#");
                var i1 = $("<i />").appendTo(a1);
                // i1.attr("class", "nav-icon fas fa-user-tie");
                i1.attr("class", menu[x].MENU_ICON);
                var p1 = $("<p />").appendTo(a1).text($.trim(menu[x].MENU_NM));
                var i2 = $("<i />").appendTo(p1);
                i2.attr("class", "right fas fa-angle-left");
                var ul1 = $("<ul/>").appendTo(li1);
                ul1.attr("class", "nav nav-treeview");
                ul1.attr("name", "MenuHeaderUL");

                for (x1 in menu) {
                    if (sno == menu[x1].PARENT_SEQ_NO) {
                        lphide = "";
                        if (menu[x1].MENU_LEVEL != "1" && NODE_KEY1 == menu[x1].PARENT_KEY && menu[x1].PARENT_SEQ_NO != "0") {
                            sno1 = menu[x1].SEQ_NO;
                            NODE_KEY2 = menu[x1].NODE_KEY;
                            // if (sno == menu[x1].S_NO) {
                            // NODE_KEY2 = menu[x1].NODE_KEY;

                            if (menu[x1].W_LINK != null) {
                                var li2 = $("<li />").appendTo(ul1);
                                li2.attr("class", "nav-item");
                                var a2 = $("<a />").appendTo(li2);
                                a2.attr("id", menu[x1].PROGRAM_LINK_ID + '_1');
                                a2.attr("class", "nav-link");
                                a2.attr("href", $.trim(menu[x1].W_LINK));
                                var i3 = $("<i />").appendTo(a2);
                                i3.attr("class", "fas fa-circle nav-icon");
                                var p1 = $("<p />").appendTo(a2).text($.trim(menu[x1].MENU_NM));
                            }
                            else {

                                var li2 = $("<li />").appendTo(ul1);
                                li2.attr("class", "nav-item has-treeview");
                                li2.attr("name", "MenuHeader1");
                                li2.attr("id", menu[x1].PROGRAM_LINK_ID + '_1');
                                li2.attr("onclick", 'MenuHDClick1(this.id,' + menu[x1].MENU_LEVEL + ')');
                                var a2 = $("<a />").appendTo(li2);
                                a2.attr("class", "nav-link");
                                a2.attr("name", "MenuHeader1Active");
                                a2.attr("id", menu[x1].PROGRAM_LINK_ID + '_2');
                                a2.attr("href", "#");
                                var i2 = $("<i />").appendTo(a2);
                                // i2.attr("class", "nav-icon fas fa-user-tie");
                                i2.attr("class", "fas fa-circle nav-icon");
                                var p1 = $("<p />").appendTo(a2).text($.trim(menu[x1].MENU_NM));
                                var i3 = $("<i />").appendTo(p1);
                                i3.attr("class", "right fas fa-angle-left");
                                var ul2 = $("<ul/>").appendTo(li2);
                                ul2.attr("class", "nav nav-treeview");
                                ul2.attr("name", "MenuHeaderUL1");

                            }

                            for (x2 in menu) {
                                if (sno1 == menu[x2].PARENT_SEQ_NO) {

                                    if (menu[x2].MENU_LEVEL == "3" && NODE_KEY2 == menu[x2].PARENT_KEY && menu[x2].PARENT_SEQ_NO != "0") {

                                        var li3 = $("<li />").appendTo(ul2);
                                        li3.attr("class", "nav-item");
                                        var a3 = $("<a />").appendTo(li3);
                                        a3.attr("id", menu[x2].PROGRAM_LINK_ID + '_1');
                                        a3.attr("class", "nav-link ");
                                        a3.attr("href", $.trim(menu[x2].W_LINK));
                                        var i4 = $("<i />").appendTo(a3);
                                        i4.attr("class", "far fa-circle nav-icon");
                                        var p1 = $("<p />").appendTo(a3).text($.trim(menu[x2].MENU_NM));

                                    }
                                }
                            }



                        }
                    }
                }

            }
        }
    }
}
