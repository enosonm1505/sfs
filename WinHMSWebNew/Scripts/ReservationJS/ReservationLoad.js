
function rowClickSaveReservervation() {
    var grid = $("#GrdReservation").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    var rowindx = grid.select()[0].rowIndex;
    var no = rowindx;
    var ReservationRowHidden = $("#ReservationRowHidden").val();
    debugger;
    $("#PageLoadVal").val("");
    if (ReservationRowHidden != "") {
        if (Number(ReservationRowHidden) != Number(no)) {
            debugger;
            var meg = 2;
            $("#ReservationRowHidden").val(no);
            LastSelectedRowSave(meg, ReservationRowHidden);
        }
    }
    $("#ReservationRowHidden").val(no);
   
    var PageLoadVal = $("#PageLoadVal").val();
    if (PageLoadVal == "") {
        GetLocalStorageData(no);
        var RESNO = grid.dataSource._data[no].RESNO;
        var R_NO = grid.dataSource._data[no].RNO;
        if (RESNO != "" && RESNO != null && RESNO != undefined) $("#txtResno").val(RESNO);
        if (R_NO != "" && R_NO != null && R_NO != undefined) $("#txtResId").val(R_NO);
    }
    var roww = $("#GrdReservation").data("kendoGrid").table.find('tr:eq(' + no + ')');
    $("#GrdReservation").data("kendoGrid").select(roww);
}

function GetLocalStorageData(no) {
    debugger;
    var grid = $("#GrdReservation").data("kendoGrid");
    var GUID = $("#GUID").val();
    if (grid.dataSource._data[no].LOAD_STS == "0" || grid.dataSource._data[no].LOAD_STS == "") {
        var RowIndex = "";
        var AllControls = "";
        var GusestGrid = "";
        var PackageGrid = "";
        var PromtTariffEditGrid = "";
        var getindex = localStorage.getItem("RowIndex" + no + GUID);
        if (getindex != null) {
            RowIndex = localStorage.getItem("RowIndex" + no + GUID);
            AllControls = localStorage.getItem("AllControls" + no + GUID);
            GusestGrid = localStorage.getItem("GrdGuest" + no + GUID);
            PromtTariffEditGrid = localStorage.getItem("PromtTariffEditGrid" + no + GUID);
            PackageGrid = localStorage.getItem("PackageGrid" + no + GUID);
        }
        if (AllControls != "" && AllControls != null) {
            var PageValues = [];
            PageValues = JSON.parse(AllControls);
            if (PageValues != null) {
                FillPageControls(PageValues);
            }
        }      
        if (GusestGrid != "" && GusestGrid != "[]" && GusestGrid != null) {
            GusestGrid = JSON.parse(GusestGrid);
            var Guest = $("#GrdGuest").data("kendoGrid");
            Guest.dataSource.data([]);
            Guest.dataSource.data(GusestGrid);
        }
        if (PromtTariffEditGrid != "" && PromtTariffEditGrid != "[]" && PromtTariffEditGrid != null)
        { 
            PromtTariffEditGrid = JSON.parse(PromtTariffEditGrid);
            var GridTariff = $("#PromtTariffEditGrid").data("kendoGrid");
            GridTariff.dataSource.data([]);
            GridTariff.dataSource.data(PromtTariffEditGrid);
        }
        if (PackageGrid != "" && PackageGrid != "[]" && PackageGrid != null) {
            PackageGrid = JSON.parse(PackageGrid);
            var GridPackage = $("#PromptPackageDeatilsSearch").data("kendoGrid");
            GridPackage.dataSource.data([]);
            GridPackage.dataSource.data(PackageGrid);
        }
    }
}

function FillPageControls(PageValues)
{
    debugger;
    if(PageValues.ddlgusetsts != null) $("#ddlgusetsts").data("kendoDropDownList").value(PageValues.ddlgusetsts);
    if (PageValues.ddlsalpersn != null) $("#ddlsalpersn").data("kendoDropDownList").value(PageValues.ddlsalpersn);
    if (PageValues.ddlguestyp != null) $("#ddlguestyp").data("kendoDropDownList").value(PageValues.ddlguestyp);
    if (PageValues.ddlresmode != null) $("#ddlresmode").data("kendoDropDownList").value(PageValues.ddlresmode);
    if (PageValues.ddlmarktseg != null) $("#ddlmarktseg").data("kendoDropDownList").value(PageValues.ddlmarktseg);
    if (PageValues.ddlbillng != null) $("#ddlbillng").data("kendoDropDownList").value(PageValues.ddlbillng);
    if (PageValues.ddlpayment != null) $("#ddlpayment").data("kendoDropDownList").value(PageValues.ddlpayment);
    if (PageValues.ddlbussrc != null) $("#ddlbussrc").data("kendoDropDownList").value(PageValues.ddlbussrc);
    if (PageValues.ddlchannl != null) $("#ddlchannl").data("kendoDropDownList").value(PageValues.ddlchannl);
    if (PageValues.txtgustevnt != null) $("#txtgustevnt").val(PageValues.txtgustevnt);
    if (PageValues.txtgustevntID != null) $("#txtgustevntID").val(PageValues.txtgustevntID);
  
    $("#txtareaspl").val(PageValues.txtareaspl);
    $("#txtareaguest").val(PageValues.txtareaguest);
    $("#txtareachkin").val(PageValues.txtareachkin);
    $("#txtareachkout").val(PageValues.txtareachkout);
      
    PageValues.txttarfdiscperc = PageValues.txttarfdiscperc.toString().trim().replace(',', '');
    PageValues.txttarfdiscamnt = PageValues.txttarfdiscamnt.toString().trim().replace(',', '');
    PageValues.txtplanamnt = PageValues.txtplanamnt.toString().trim().replace(',', '');
    PageValues.txtnettrfamnt = PageValues.txtnettrfamnt.toString().trim().replace(',', '');
    PageValues.txtchildamnt = PageValues.txtchildamnt.toString().trim().replace(',', '');
    PageValues.txtplandiscper = PageValues.txtplandiscper.toString().trim().replace(',', '');
    PageValues.txtplandiscamnt = PageValues.txtplandiscamnt.toString().trim().replace(',', '');
    
    $("#txttarfdiscperc").val(Comma(Number(PageValues.txttarfdiscperc).toFixed(2)));
   
    //if (PageValues.txttarfdiscamnt == "") PageValues.txttarfdiscamnt = "0.00";
    //if (PageValues.txtnettrfamnt == "") PageValues.txtnettrfamnt = "0.00";
    //if (PageValues.txtplanamnt == "") PageValues.txtplanamnt = "0.00";
    //if (PageValues.txtchildamnt == "") PageValues.txtchildamnt = "0.00";
    //var netTariffAmt = (Number(PageValues.txtnettrfamnt) - Number(PageValues.txttarfdiscamnt));
    
    //netTariffAmt = (netTariffAmt + Number(PageValues.txtplanamnt) + Number(PageValues.txtchildamnt));
  
    //$("#txttarfdiscamnt").val(Comma(Number(PageValues.txttarfdiscamnt).toFixed(2)));
    //$("#txtnettrfamnt").val(Comma(Number(netTariffAmt).toFixed(2)));

  
    $("#txttarfdiscamnt").val(Comma(Number(PageValues.txttarfdiscamnt).toFixed(2)));

    var txttarfdiscperc = PageValues.txttarfdiscperc;
    var txttarfdiscamnt = PageValues.txttarfdiscamnt;

    if (txttarfdiscperc != "" && txttarfdiscperc != "0.00" && txttarfdiscperc != "0") $("#disclabl").addClass('Narration_norm');
    else {
        if (txttarfdiscperc != "" && txttarfdiscperc != "0.00" && txttarfdiscperc != "0") $("#disclabl").addClass('Narration_norm');
        else $("#disclabl").removeClass('Narration_norm');
    }

    $("#txtnettrfamnt").val(Comma(Number(PageValues.txtnettrfamnt).toFixed(2)));
  
    if (PageValues.chksharp == "1") document.getElementById("chksharp").checked = true;
    else document.getElementById("chksharp").checked = false;
   
    if (PageValues.txtareanarra != "" && PageValues.txtareanarra != null) {
        $(".companylbl").addClass('Narration_norm');
    }
    else {
        $(".companylbl").removeClass('Narration_norm');
    }
    $("#txtareanarra").val(PageValues.txtareanarra);
    $("#txtplanamnt").val(Comma(Number(PageValues.txtplanamnt).toFixed(2)));
    $("#txtchildamnt").val(Comma(Number(PageValues.txtchildamnt).toFixed(2)));
    $("#txtplandiscper").val(Comma(Number(PageValues.txtplandiscper).toFixed(2)));
    $("#txtplandiscamnt").val(Comma(Number(PageValues.txtplandiscamnt).toFixed(2)));

    $("#agent_id").val(PageValues.agent_id);
    $("#txtagent").val(PageValues.txtagent);
    $("#txtagentch").val(PageValues.txtagentch);
    $("#comp_id").val(PageValues.comp_id);
    $("#txtcompany").val(PageValues.txtcompany);
    $("#group_id").val(PageValues.group_id);
    $("#txtgroup").val(PageValues.txtgroup);
    $("#BookerID").val(PageValues.BookerID);
    $("#ddltitle").val(PageValues.ddltitle);
    $("#txtbooker").val(PageValues.txtbooker);
    $("#source_id").val(PageValues.source_id);
    $("#txtsource").val(PageValues.txtsource);
    debugger;
    if (PageValues.ddlupgrade != null) {
        if (PageValues.ddlupgrade != null) $("#ddlupgrade").data("kendoDropDownList").value(PageValues.ddlupgrade.toString().trim());
    }
    if (PageValues.ddlvisitpur != null) $("#ddlvisitpur").data("kendoDropDownList").value(PageValues.ddlvisitpur);
    if (PageValues.txtgustevntID != null) $("#ddlguestcatg").data("kendoDropDownList").value(PageValues.ddlguestcatg);
    if (PageValues.ddlguestcatg == "1") document.getElementById("chkregcrd").checked = true;
    else document.getElementById("chkregcrd").checked = false;
    $("#txtvouch").val(PageValues.txtvouch);
    $("#txtref").val(PageValues.txtref);
    $("#txtareapos").val(PageValues.txtareapos);
}