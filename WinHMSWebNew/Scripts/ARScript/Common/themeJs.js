
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/**         The Page Control Querires           **/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


var ChangeTheme = function (divnm) {
    if ($.trim(divnm) == "bluethmes") {
        CurrThemes = "#28c5e6";
        $('.navbar-inverse').attr("style", "background-color: #28c5e6")
        $('.panel-info > .panel-heading').attr("style", "color: #1d1d1d;  background-color: rgb(40, 197, 230);  border-color: #28c5e6;")
        $('.panel-default > .panel-heading').attr("style", "background-color: rgb(40, 197, 230);");
        $('.panel-default').attr("style", "border-color: #28c5e6; ");
        $('cust-defaul').attr("style", "padding:2px");
        $('.modal-header').attr("style", "background: rgb(12, 146, 175); border: 1px solid #fffdfd;");
        $('.close').attr("style", "color:#000000; opacity: 0.6;");
        $('.modal-title').attr("style", "color:#000000;");
        $('.with-nav-tabs.panel-info .nav-tabs > li.active > a, .with-nav-tabs.panel-info .nav-tabs > li.active > a:hover').attr("style", "color: #31708f; background-color: #fff; border-color: #bce8f1; border-bottom-color: transparent;");
        //$('.with-nav-tabs.panel-info .nav-tabs > li.active > a').attr("style", "color: #31708f; background-color: #fff; border-color: #bce8f1; border-bottom-color: transparent;");
        //$('.with-nav-tabs.panel-info .nav-tabs > li > a').attr("style", "color: #ffffff; background-color: #2884b3; border-color: #2884b3;");
        //  $('.k-state-selected').attr("style", "color: #ffffff; background-color: #28c5e6; border-color: #28c5e6; z-index:10");
        $('.k-grid tbody tr:hover').attr("style", "background: #28c5e6;color: white;");

    }
    else if ($.trim(divnm) == "defthmes") {
        CurrThemes = "#2884b3";
        $('.navbar-inverse').attr("style", "background-color: #2884b3");
        $('.panel-info > .panel-heading').attr("style", "color: #3a87ad;  background-color: rgb(40, 132, 179);  border-color: #2884b3;");
        $('.panel-default > .panel-heading ').attr("style", "background-color: rgba(11, 116, 169, 0.88);");
        $('.panel-default').attr("style", "border-color: #3285ae;");
        $('cust-defaul').attr("style", "padding:2px");
        $('.modal-header').attr("style", "background: rgb(20, 67, 90); border: 1px solid #f3efef;");
        $('.close').attr("style", "color:#ffffff; opacity: 0.6;");
        $('.modal-title').attr("style", "color:#ffffff;");
        //$('.with-nav-tabs.panel-info .nav-tabs > li.active > a').attr("style", "color: #31708f; background-color: #fff; border-color: #bce8f1; border-bottom-color: transparent;");
        //$('.with-nav-tabs.panel-info .nav-tabs > li > a:hover').attr("style", "color: #ffffff; background-color: #2884b3; border-color: #2884b3;");
        //$('.k-state-selected').attr("style", "color: #ffffff; background-color: #2884b3; border-color: #2884b3; z-index:10;");
        $('.k-grid tbody tr:hover').attr("style", "background: #2884b3;color: white;");
    }
    else if ($.trim(divnm) == "greenthmes") {
        CurrThemes = "#4caf50";
        $('.navbar-inverse').attr("style", "background-color: #4caf50");
        $('.panel-info > .panel-heading').attr("style", "color: #4caf50;  background-color: rgb(76, 175, 80);  border-color: #4caf50;");
        $('.panel-default > .panel-heading ').attr("style", "background-color: rgb(76, 175, 80);");
        $('.panel-default').attr("style", "border-color: #4caf50;");
        $('cust-defaul').attr("style", "padding:2px");
        $('.modal-header').attr("style", "background: rgb(3, 132, 9); border: 1px solid #f3efef;");
        $('.close').attr("style", "color:#ffffff; opacity: 0.6;");
        // $('.k-state-selected').attr("style", "color: #ffffff; background-color: #4caf50; border-color: #4caf50; z-index:10;");
        $('.k-grid tbody tr:hover').attr("style", "background: #4caf50; color: white;");
    }

    else if ($.trim(divnm) == "merthmes") {
        CurrThemes = "#715328";
        $('.navbar-inverse').attr("style", "background-color: #715328");
        $('.panel-info > .panel-heading').attr("style", "color: #715328;  background-color: rgb(113, 83, 40);  border-color: #715328;");
        $('.panel-default > .panel-heading ').attr("style", "background-color: rgb(113, 83, 40);");
        $('.panel-default').attr("style", "border-color: #715328;");
        $('cust-defaul').attr("style", "padding:2px");
        $('.modal-header').attr("style", "background: rgb(142, 86, 5); border: 1px solid #f3efef;");
        $('.close').attr("style", "color:#ffffff; opacity: 0.6;");
        $('.modal-title').attr("style", "color:#ffffff;");
        //$('.with-nav-tabs.panel-info .nav-tabs > li.active > a').attr("style", "color: #715328; background-color: #f7f7f7; border-color: #715328; border-bottom-color: transparent;");
        $('.k-grid tbody tr:hover').attr("style", "background: #715328; color: white;");
    }

    $("#loading").css("display", "none");
}
