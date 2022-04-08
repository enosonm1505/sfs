function GetMenuValueFn() {

    var rowDatad = [];
    var reqobj = {};

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        url: "/MISTrans/API_CALLSM",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ request: dataparam }),
        dataType: "json",
        acceptType: "application/json;charset=utf-8",
        success: function (d) {
            if (d != "") {
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