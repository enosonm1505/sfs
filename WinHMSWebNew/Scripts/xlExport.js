


function checkZero(data) {
    if (data.length == 1) {
        data = "0" + data;
    }
    return data;
};

function fnComExcelExport(grid, Name, DocHeader, styles, CompanyNm,CurrDate,CurrTime, FromDt, ToDt, AsOn) {
    debugger;   

    ToDt = ToDt || "";
    FromDt = FromDt || "";
    AsOn = AsOn || "";
    DocHeader = DocHeader || "";
    CompanyNm = CompanyNm || "";
    var ColId = "";
    var vRows = 0;
    
    var vColmns = grid.config.columns;        
    
    grid.spans = true;

    var HeadRow = vColmns[0].header.length;
    for (var i = 0; i < HeadRow; i++) {
        vRows += 1;
        grid.add({}, i);        
        var row = grid.getIdByIndex(i);
        var SelRow = grid.getItem(row);
        grid.addRowCss(row, "webix_ss_header");
        $.each(vColmns, function (key, value) {
            debugger;
            ColId = value.id;
            grid.addCellCss(row, ColId, "webix_hcell");
            if (value.header[i]) {
                SelRow[value.id] = value.header[i].text;
                if (value.header[i].colspan) {
                    if (value.header[i].colspan > 1) {
                        grid.addSpan(row, ColId, value.header[i].colspan, 1, null, "webix_ss_header webix_hcell");
                    }
                }
            }               
            
        })
        if (i == 0) FrzRow = row;
        SelRow["CLR"] = "ExcelHead";
        grid.updateItem(row, SelRow);
    }

    
    if (AsOn) {
        vRows += 1;
        grid.add({}, 0);
        var SelRow = grid.getItem(grid.getFirstId());
        var vCenterCol = Math.floor(vColmns.length / 2)
        var row = grid.getFirstId();        
        ColId = vColmns[0].id;
        SelRow[ColId] = "AsOn :  " + AsOn;            
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextBold xltextCenter xlHdRemBorder");
        
        SelRow["CLR"] = "ExcelHead";
        grid.updateItem(row, SelRow);

    }
    else if (FromDt || ToDt) {
        vRows += 1;
        grid.add({}, 0);
        var SelRow = grid.getItem(grid.getFirstId());
        var vCenterCol = Math.floor(vColmns.length / 2)
        var row = grid.getFirstId();

        var DtString = "";
        DtString = "From : " + FromDt + "       To : " + ToDt;        
        ColId = vColmns[0].id;
        SelRow[ColId] = DtString;            
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextBold xltextCenter xlHdRemBorder");
        
        SelRow["CLR"] = "ExcelHead";
        grid.updateItem(row, SelRow);
    }
    

    grid.add({}, 0);
    vRows += 1;
    var SelRow = grid.getItem(grid.getFirstId());
    var row = grid.getFirstId();    
    if (DocHeader != "") {
        ColId = vColmns[vCenterCol-1].id;        
        ColId = vColmns[0].id;
        SelRow[ColId] = DocHeader;

        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextBold xltextCenter xlHdRemBorder");
        
    }

    SelRow["CLR"] = "ExcelHead";    
    grid.updateItem(row, SelRow);

    grid.add({}, 0);
    vRows += 1;
    var SelRow = grid.getItem(grid.getFirstId());
    var row = grid.getFirstId();
    if (CompanyNm != "") {
        ColId = vColmns[0].id;
        SelRow[ColId] = CompanyNm + "  , " + CurrDate + "  , " + CurrTime;        
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextLeft xltextBold xlHdRemBorder");        

    }
    SelRow["CLR"] = "ExcelHead";
    grid.updateItem(row, SelRow);        
    grid.refresh();
    
    var data = webix.toExcel(grid, {
        filename: Name,
        filterHTML: true,
        styles: styles,
        spans: true,
        name: Name,
        docHeader: "",
        rawValues: true,
        header: false,
    });
    for (var j = 1; j <= vRows; j++) {
        grid.remove(grid.getFirstId());
    }
    grid.refresh();
};

function fnComPrintGrid(grid, Name, DocHeader, styles, CompanyNm, CurrDate, CurrTime, FromDt, ToDt, AsOn) {
    debugger;

    ToDt = ToDt || "";
    FromDt = FromDt || "";
    AsOn = AsOn || "";
    DocHeader = DocHeader || "";
    CompanyNm = CompanyNm || "";
    var ColId = "";
    var vRows = 0;

    var vColmns = grid.config.columns;

    grid.spans = true;

    var HeadRow = vColmns[0].header.length;
    for (var i = 0; i < HeadRow; i++) {
        vRows += 1;
        grid.add({}, i);
        var row = grid.getIdByIndex(i);
        var SelRow = grid.getItem(row);
        grid.addRowCss(row, "webix_ss_header");
        $.each(vColmns, function (key, value) {
            debugger;
            ColId = value.id;
            grid.addCellCss(row, ColId, "webix_hcell");
            if (value.header[i]) {
                SelRow[value.id] = value.header[i].text;
                if (value.header[i].colspan) {
                    if (value.header[i].colspan > 1) {
                        grid.addSpan(row, ColId, value.header[i].colspan, 1, null, "webix_ss_header webix_hcell");
                    }
                }
            }

        })
        if (i == 0) FrzRow = row;
        SelRow["CLR"] = "ExcelHead";
        grid.updateItem(row, SelRow);
    }


    if (AsOn) {
        vRows += 1;
        grid.add({}, 0);
        var SelRow = grid.getItem(grid.getFirstId());
        var vCenterCol = Math.floor(vColmns.length / 2)
        var row = grid.getFirstId();
        ColId = vColmns[0].id;
        SelRow[ColId] = "AsOn :  " + AsOn;
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextBold xltextCenter xlHdRemBorder");

        SelRow["CLR"] = "ExcelHead";
        grid.updateItem(row, SelRow);

    }
    else if (FromDt || ToDt) {
        vRows += 1;
        grid.add({}, 0);
        var SelRow = grid.getItem(grid.getFirstId());
        var vCenterCol = Math.floor(vColmns.length / 2)
        var row = grid.getFirstId();

        var DtString = "";
        DtString = "From : " + FromDt + "       To : " + ToDt;
        ColId = vColmns[0].id;
        SelRow[ColId] = DtString;
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextBold xltextCenter xlHdRemBorder");

        SelRow["CLR"] = "ExcelHead";
        grid.updateItem(row, SelRow);
    }


    grid.add({}, 0);
    vRows += 1;
    var SelRow = grid.getItem(grid.getFirstId());
    var row = grid.getFirstId();
    if (DocHeader != "") {
        ColId = vColmns[vCenterCol - 1].id;
        ColId = vColmns[0].id;
        SelRow[ColId] = DocHeader;
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextBold xltextCenter xlHdRemBorder");

    }

    SelRow["CLR"] = "ExcelHead";
    grid.updateItem(row, SelRow);

    grid.add({}, 0);
    vRows += 1;
    var SelRow = grid.getItem(grid.getFirstId());
    var row = grid.getFirstId();
    if (CompanyNm != "") {
        ColId = vColmns[0].id;
        SelRow[ColId] = CompanyNm + "  , " + CurrDate + "  , " + CurrTime;
        grid.addSpan(row, ColId, vColmns.length, 1, null, "xltextLeft xltextBold xlHdRemBorder");

    }
    grid.updateItem(row, SelRow);
    grid.refresh();

    var data = webix.print(grid, {
        filename: Name,
        filterHTML: true,
        styles: styles,
        spans: true,
        name: Name,
        docHeader: "",
        rawValues: true,
        header: false,
    });
    for (var j = 1; j <= vRows; j++) {
        grid.remove(grid.getFirstId());
    }
    grid.refresh();
};
