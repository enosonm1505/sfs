$(document).ready(function () {   

    document.onkeydown = function (event) {
        event = (event || window.event);    
        if (event.keyCode == 117) {
            PosCharCall();
        }
    };

    function PosCharCall() {
        var SW = Number(screen.width) - 20;
        var Sh = Number(screen.height) - 100;        
        Window1 = window.open("/MIS/POS_DashBoard", "PosChart", "width=" + SW + ",height=" + Sh + ",left=10,top=20 ");
    };

});