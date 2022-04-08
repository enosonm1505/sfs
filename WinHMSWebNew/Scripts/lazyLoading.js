var page = 0,
    inCallback = false,
    isReachedScrollEnd = false;

var scrollHandlerDrop = function (url, req,dropID) {
    if (isReachedScrollEnd == false &&
        ($(document).scrollTop() <= $(document).height() - $(window).height()))
    {
        loadProjectDataDrop(url, req, dropID);
    }
}

var scrollHandlerGrid = function (url, req,grdID) {
    if (isReachedScrollEnd == false &&
        ($(document).scrollTop() <= $(document).height() - $(window).height())) {
       loadProjectData(url, req, grdID);
    }
}

function loadProjectData(loadMoreRowsUrl, req, grdID) {
    //debugger;
    if (page > -1 && !inCallback) {
        inCallback = true;
        page++;
        //$("div#loading").show();

        $.ajax({
            type: 'POST',
            url: loadMoreRowsUrl,
            data: "pageNum=" + page+"&Req=" + req,
            success: function (data, textstatus) {
                debugger;
                if (data != '') {
                    //$("table.infinite-scroll > tbody").append(data);
                    //$("table.infinite-scroll > tbody > tr:even").addClass("alt-row-class");
                    //$("table.infinite-scroll > tbody > tr:odd").removeClass("alt-row-class");
                    $.each(data, function (key, value) { $$(grdID).add(value); });
                    
                }
                else {
                    page = -1;
                }

                inCallback = false;
               // $("div#loading").hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}

function loadProjectDataDrop(loadMoreRowsUrl, req, dropID) {
    //debugger;
    if (page > -1 && !inCallback) {
        inCallback = true;
        page++;
        //$("div#loading").show();

        $.ajax({
            type: 'POST',
            url: loadMoreRowsUrl,
            data: "pageNum=" + page + "&Req=" + req,
            success: function (data, textstatus) {
                debugger;
                if (data != '') {
                    $.each(data, function (key, value) { $$(dropID).add(value); });
                }
                else {
                    page = -1;
                }

                inCallback = false;
                // $("div#loading").hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
            
        });
    }
}