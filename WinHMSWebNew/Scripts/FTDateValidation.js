function FromDateChange(e) {
    var From = $("#From").val();
    var To = $("#To").val();

    $.ajax({
        type: "POST",
        url: "/GLTransaction/FTDateValidation",
        cache: false,
        charset: 'utf-8',
        data: "F=" + From +"&T="+To,
        success: function (data) {
            if (data.d != "") {
                AlertMesaageDate();
                $("#From").val(To);
            }           
        }
    });
       
}
function ToDateChange(e) {   
    var From = $("#From").val();
    var To = $("#To").val();

    $.ajax({
        type: "POST",
        url: "/GLTransaction/FTDateValidation",
        cache: false,
        charset: 'utf-8',
        data: "F=" + From + "&T=" + To,
        success: function (data) {
            if (data.d != "") {
                AlertMesaageDate();
                $("#From").val(To);
            }
        }
    });
}
function AlertMesaageDate() {   
    var window = $("#CommonAlert");
    var kWnd = window.data("kendoWindow");
    kWnd.center().open();
}