<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%--<link href="../../Content/bluetheme.css" rel="stylesheet" />
<link href="../../Content/Home.css" rel="stylesheet" />--%>

    
 <%-- <%@ Register Src="~/FO/FOMasterSMLOC.ascx" TagName="MENUFO" TagPrefix="MN" %>--%>
  <%@ Register Src="~/FO/FOMasterSMMVC.ascx" TagName="MENUFO" TagPrefix="MN" %>
        <div><MN:MENUFO ID="Menu" runat="server"></MN:MENUFO></div>

<%--<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>WinCloud</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="../plugins/fontawesome-free/css/all.min.css" />
    <link rel="stylesheet" href="../plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css"/>
    <link rel="stylesheet" href="../plugins/icheck-bootstrap/icheck-bootstrap.min.css"/>
    <link rel="stylesheet" href="../dist/css/adminlte.min.css"/>
    <link rel="stylesheet" href="../plugins/overlayScrollbars/css/OverlayScrollbars.min.css"/>
    <link rel="stylesheet" href="../plugins/daterangepicker/daterangepicker.css"/>
    <link href="../../Content/sidemenu-custom.css" rel="stylesheet" />
    <style>
  
        .nav-link {
    display: block;
}
.nav-sidebar .nav-treeview>.nav-item>.nav-link>.nav-icon {
    width: 10px;
    
}
.nav-sidebar>.nav-item {
    margin-bottom: 0;
    width: 235px;
}
.nav-sidebar .nav-link>.right, .nav-sidebar .nav-link>p>.right {
    position: absolute;
    right: 1rem;
    top: 0.7rem;
}
.nav-sidebar .nav-treeview>.nav-item>.nav-link>.nav-icon
{ width: 1.6rem; }

.nav-sidebar {
    font-size: inherit;
}
.nav-link {
    display: block;
    padding: .5rem .5rem;
}
.nav-sidebar .nav-link>.right, .nav-sidebar .nav-link>p>.right {
    position: absolute;
    right: 1rem;
    top: 0.5rem;
}

.nav-sidebar>.nav-item .nav-icon {
    margin-left: .05rem!important;
    font-size: 1.2rem!important;
    margin-right: .2rem!important;
    text-align: center!important;
    width: 1.6rem!important;
}

.nav-sidebar { font-size: 16!important;
}
.nav-link {
    display: block;
  padding: .5rem 1rem!important;
}

    </style>
</head>
<body class="hold-transition sidebar-mini layout-fixed">
    <div>
        
        <nav class="main-header navbar navbar-expand navbar-white navbar-light fixed-top text-sm" style="background-color: #bec7e0;">
           
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
                <li class="col-sm-12 mt-1">
                    <asp:Label runat="server" ID="lblprop" Style="font-size: 13px; font-weight: 700;" CssClass=""></asp:Label>
                </li>
               
            </ul>

           
            <ul class="navbar-nav ml-auto">
               
               
              
                <li class="nav-item"></li>
                <li class="nav-item" style="margin-left: 20px;">
                    <asp:HyperLink ID="HlkDash" runat="server" ToolTip="Dashboard" NavigateUrl="~/Dashboard.aspx" Style="float: right; padding-right: 5px;margin-right: 10px;"><img src="../Images/dashboard.png" width="18" height="18" alt="Dashboard" ToolTip="Dashboard"></asp:HyperLink>
                     <asp:HyperLink ID="hlkImg" runat="server" ToolTip="Favorites" NavigateUrl="/FO/FAVfaovarites.aspx" Style="float: right; padding-right: 5px;margin-right: 10px;"><img src="../Images/favoriteadd2.png" width="18" height="18" alt="Favorites" ToolTip="Favorites"></asp:HyperLink>
                     <asp:HyperLink ID="hlkLnk" runat="server" ToolTip="Flash" NavigateUrl="/FoTrans/FOFlashTools" Style="float: right; padding-right: 5px;margin-right: 10px;"><img src="../Images/flash.png" width="18" height="18" alt="Flash" ToolTip="Flash"></asp:HyperLink>
                </li>
                 <li class="nav-item">
                 <a href="../Logout.aspx" class="nav-link active">
                         <i class="fas fa-1x text-dark fa-sign-out-alt pl-1" title="Logout"></i>
                    </a>
                     </li>
            </ul>
        </nav>

        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <a href="../FO/FoHome.aspx" class="brand-link">
                <img src="../dist/img/winhmslogonew.png" alt="WINCLOUD" class="brand-image elevation-3"
                    style="opacity: .8">
                <span class="brand-text font-weight-light">WINCLOUD</span>
            </a>

            <div class="sidebar">
                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <img src="../dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
                    </div>
                    <div class="info">
                        <a href="#" class="d-block">
                            <asp:Label runat="server" ID="lblUId" CssClass=""></asp:Label>
                        </a>
                    </div>
                </div>

                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column nav-child-indent nav-compact" data-widget="treeview" id="DynMenuLoad" role="menu" data-accordion="false">
                    </ul>
                   
                </nav>
            </div>
        </aside>

        
    </div>
   
      <script src="../jquery/jquery.min.js"></script>
    <script src="../jquery-ui/jquery-ui.min.js"></script>
     <script src="../bootstrap/js/bootstrap.bundle.min.js"></script>
     <script src="../plugins/moment/moment.min.js"></script>
    <script src="../plugins/daterangepicker/daterangepicker.js"></script>
    <script src="../plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
    <script src="../plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
    <script src="../dist/js/adminlte.js"></script>

    <input type="hidden" id="MenuName" />
    <input type="hidden" id="MenuLvl" />
     <input type="hidden" id="MnSel" />
    <script>
        $(document).ready(function () {
             var Menu = GetMenuValueFn();
             var UserId =  '<%=Session["UNM"]%>';// '@Request.RequestContext.HttpContext.Session["UNM"]';
            var Property = '<%=Session["COMPANPID"]%>';// '@Request.RequestContext.HttpContext.Session["COMPANPID"]';
            $('#lblUId').text(UserId);
            $('#lblprop').text(Property);
        });

        function MenuHDClick(id, level) {
            debugger;
            var menusel = $("#MnSel").val();
            if (menusel != "1") {
                var node = document.getElementsByName('MenuHeader');
                for (i = 0; i < node.length; i++) {
                    if (id == node[i].id) {
                        var idval = node[i].id;
                       
                    }
                }
                var node1 = document.getElementsByName('MenuHeaderUL');
                var node2 = document.getElementsByName('MenuHeaderUL1');
                if (node2.length > 0 && id!='FOMNUMST1') {
                    for (j = 0; j < node1.length; j++) {
                        if (id != node1[j].id) {
                            document.getElementsByName('MenuHeaderUL')[j].style.display = "none";
                        }
                    }
                }
                else {
                     document.getElementsByName('MenuHeaderUL')[j].style.display = "block";
                }
                
            }
             $("#MnSel").val("");
        }

        function MenuHDClick1(id, level) {
            debugger;
           
            var node = document.getElementsByName('MenuHeader1');
            for (i = 0; i < node.length; i++) {
                if (id == node[i].id) {
                }
            }
            var node1 = document.getElementsByName('MenuHeaderUL1');
            for (j = 0; j < node1.length; j++) {
                if (id != node1[j].id) {
                    document.getElementsByName('MenuHeaderUL1')[j].style.display = "none";

                }
            }
        }

        function GetMenuValueFn() {
            debugger;

            var rowDatad = [];
            var reqobj = {};

            var dataparam = JSON.stringify(reqobj);
            $.ajax({
                type: "POST",
                url: "/TravelAgentBlock/API_CALLSM",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ request: dataparam }),
                dataType: "json",
                acceptType: "application/json;charset=utf-8",
                success: function (d) {
                    debugger;
                    if (d != "") {
                        rowDatad = JSON.parse(d);
                        var div = 'Loadmenu';
                        LoadMenuFn(rowDatad, div);
                        debugger;
                        if ($("#MenuName").val() != "") {
                            $("#" + $.trim($("#MenuName").val())).addClass("active");
                            
                            $("#FOMNURSV").addClass("mm-collapse mm-show");

                        }

                        if ($("#MenuLvl").val() != "") {
                            $("#" + $.trim($("#MenuLvl").val())).addClass("menu-open");
                            // $("#" + $.trim($("#MenuLvl").val())).addClass("nav-link active");
                            $("#" + $.trim($("#MenuLvl").val())).addClass("Menu_lvl");
                        }
                    }
                }
            });
            return rowDatad;
        }

        var LoadMenuFn = function (Menu, Div) {
            var lphide = "";
            var menu = Menu;
            
            debugger;
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
                        li1.attr("id", menu[x].PROGRAM_LINK_ID + '1');
                        $("#MnSel").val("");
                        li1.attr("onclick", 'MenuHDClick(this.id),'+menu[x].MENU_LEVEL+'');
                        var a1 = $("<a />").appendTo(li1);
                        a1.attr("class", "nav-link");
                        a1.attr("href", "#");
                        var i1 = $("<i />").appendTo(a1);
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

                                    if (menu[x1].W_LINK != null) {
                                        var li2 = $("<li />").appendTo(ul1);
                                        li2.attr("class", "nav-item");
                                        var a2 = $("<a />").appendTo(li2);
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
                                        li2.attr("id", menu[x1].PROGRAM_LINK_ID + '1');
                                         li2.attr("onclick", 'MenuHDClick1(this.id,'+menu[x1].MENU_LEVEL+')');
                                        var a2 = $("<a />").appendTo(li2);
                                        a2.attr("class", "nav-link");
                                        a2.attr("href", "#");
                                        var i2 = $("<i />").appendTo(a2);
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



       
    </script>

</body>
</html>--%>
