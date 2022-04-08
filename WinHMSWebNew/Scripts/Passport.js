



function PassportPoupcall( ) {
    debugger;
    var Passporthtml = '<div id="RemoveCd" class="container">' +
       ' <div class="d-flex justify-content-center">' +
           ' <div class="card my-5" style="width: 450px; height: 400px"> ' +
               ' <div class="card-header"> ' +
                  '  <h4>Passport-Image</h4> ' +
                '</div> ' +
               ' <div class="card-body"  style="height: 250px;"> ' +
                    '<img class="profile-user-img img-responsive img-fluid mb-2"  id="ImgPassPortA"   style="height: 100%; width:100%;border: 1px solid #ccc"> ' +
                '</div> ' +
                '<div class="card-footer"> ' +
                   ' <input id="PassPort" type="file" onchange=encodeImageFileAsURL();  fileread="uploadme" />' +
                   ' <div class="buttons" style="text-align: right"> ' +
                       ' <button style="width: 70px !important;padding: 5px;" type="button" onclick="BtnDeleteIm();" class="btn"><i class="fas fa-trash" id="BtnDeleteImg"  style="color: firebrick"></i><span style="padding-left:3px" class="ml-1">Delete</span></button>' +
                      '  <button style="width: 70px !important;padding: 5px;" id="BtnSaveImg" type="button" class="btn"><i class="fas fa-file" onclick="BtnSaveImgjs();"   style="color: green"></i><span style="padding-left:3px" class="ml-1">Save</span></button> ' +
                   ' </div>' +

                '</div> ' +
           ' </div> ' +
        '</div> ' +
    '</div>';

    $("#RemoveCd").remove();


    var PassportPoup = webix.ui({
        //  container: "WebixGustSearchPopAdvance",
        view: "window",
        close: true,
        modal: true,
        id: "WebixPassportImageSave",
        head: "Image Upload",
        position: "center",
        height: 500,
        width: 500,
        body: {
            view: "form",
            cols: [
            {

                template: Passporthtml
            }
            ]
        }
    });
}


//$("#BtnDeleteImg").click(function ()
//{

    function BtnDeleteIm(){
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "FOPASSPORTURLDELETE";
    reqobj["PropID"] = $("#ddlProperty").val();
    reqobj["USRID"] = $("#UserId").val();
    reqobj["COMPID"] = $("#CompanyId").val();
    reqobj["CONSTRING"] = $("#ConnStr").val();
    reqobj["GEUSTID"] = $("#hdnGuestIds").val();
    reqobj["DTYID"] = $("#ddlDocPassport").val();
    var url = window.location.pathname;

    var split = url.split('/');
    var urlSpl = "";
    if (split.length > 2)
        urlSpl = split[2];
    else
        urlSpl = url.replace('/', '');
    //alert(urlSpl);

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: urlSpl + "/FnImgPassPort",
        data: JSON.stringify({ request: dataparam }),
        dataType: "json",
        acceptType: "application/json;charset=utf-8",
        success: function (d) {
            var Encimg = d.d;
            //Encimg = JSON.parse(Encimg);
            debugger;
           
            $("#ImgPassPortA").attr("src", "");
        }
    });
}



function encodeImageFileAsURL() {
    debugger;
    $("#BtnSaveImg").show();
    var Fileselected = document.getElementById('PassPort').files;
    if (Fileselected.length > 0) {
        var fileToLoad = Fileselected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var srcDate = fileLoadedEvent.target.result;
            //var newImage = document.createElement('img');
            //newImage.src = srcDate;
            $("#ImgUrlEncode").val("");
            $("#ImgPassPortA").val("");
            $("#ImgUrlEncode").val(srcDate);
            $("#ImgPassPortA").attr("src", srcDate);
            //   document.getElementById('ImgPassPort') = srcDate;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

//$("#BtnSaveImg").click(function () {
function BtnSaveImgjs(){
    debugger;
    var rowDatad = [];
    var reqobj = {};
    //encodeImageFileAsURL();

    reqobj["REQTYPE"] = "FOPASSPORTURL";
    reqobj["PropID"] = $("#ddlProperty").val();
    reqobj["USRID"] = $("#UserId").val();
    reqobj["COMPID"] = $("#CompanyId").val();
    reqobj["CONSTRING"] = $("#ConnStr").val();
    reqobj["URLPATH"] = $("#ImgUrlEncode").val();
    reqobj["GEUSTID"] = $("#hdnGuestIds").val();
    reqobj["DTYID"] = $("#ddlDocPassport").val();


    var url = window.location.pathname;

    var split = url.split('/');
    var urlSpl = "";
    if (split.length > 2)
        urlSpl = split[2];
    else
        urlSpl = url.replace('/', '');
    //alert(urlSpl);

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: urlSpl + "/FnImgPassPort",
        data: JSON.stringify({ request: dataparam }),
        dataType: "json",
        acceptType: "application/json;charset=utf-8",
        success: function (d) {

            debugger;
            if (d.d != "") {

            }

        }
    });
    $$('WebixPassportImageSave').close();



}

function ImgOpenPath() {
    debugger;
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "FOPASSPORTURLOPEN";
    reqobj["PropID"] = $("#ddlProperty").val();
    reqobj["USRID"] = $("#UserId").val();
    reqobj["COMPID"] = $("#CompanyId").val();
    reqobj["CONSTRING"] = $("#ConnStr").val();
    reqobj["GEUSTID"] = $("#hdnGuestIds").val();
    reqobj["DTYID"] = $("#ddlDocPassport").val();
    reqobj["URLIMG"] = $("#ImgUrlPath").val();

    var url = window.location.pathname;

    var split = url.split('/');
    var urlSpl = "";
    if (split.length > 2)
        urlSpl = split[2];
    else
        urlSpl = url.replace('/', '');
    //alert(urlSpl);

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: urlSpl + "/FnImgPassPort",
        data: JSON.stringify({ request: dataparam }),
        dataType: "json",
        acceptType: "application/json;charset=utf-8",
        success: function (d) {
            var Encimg = d.d;
            //Encimg = JSON.parse(Encimg);
            debugger;
            if (Encimg != "") {
                $("#ImgUrlEncode").val("");
                $("#ImgPassPortA").val("");
                $("#ImgPassPortA").attr("src", Encimg);
                $("#BtnSaveImg").hide();
            }

        }
    });
   



}
    