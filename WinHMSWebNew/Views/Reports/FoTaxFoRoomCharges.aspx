<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<FoAnalysisReports.Models.ClsContribution>" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="Microsoft.Reporting.WebForms" %>
<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    FoTaxFoRoomCharges
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="FeaturedContent" runat="server">
    <div class="content-wrapper">
        <link href="../../Content/Contribute.css" rel="stylesheet" />
        <link href="../../Content/sidemenu-custom.css" rel="stylesheet" />
        <link href="../../Content/SideMenu-Kendo.css" rel="stylesheet" />


        <div style="margin-top: 35px!important;" class="row new_hdr mb-2">
            <div class="col-sm-3">

        <%using (Html.BeginForm("FoTaxFoRoomCharges", "Reports", FormMethod.Post, new { enctype = "multipart/form-data" }))
    {%>
        <div class="TextWidth" id="divPropbox">
            <%:Html.Kendo().DropDownList()
                       .Name("Property")                
                       .DataTextField("Text")
                       .DataValueField("Value")
                            .HtmlAttributes(new {Style="width:220px; height:35px; z-index:1"})
                                                     .DataSource(source => { source.Read(read => { read.Action("PropertyNM", "TravelAgentBlock"); }); })
            %>
            <%--  .HtmlAttributes(new { onchange = "this.form.submit()",Style="width:220px; height:25px; z-index:1"})
                                                   .DataSource(source => { source.Read(read => { read.Action("PropertyNM", "TravelAgentBlock"); }); })%>--%>
        </div>
        <%} %>
        </div>
            <div class="col-sm-5 text-center">

            <div class="wc_hdr_tlt"> Fo Room Charges </div>

                </div>
                <div class="col-sm-4">
                    <div class="card-tools text-right">

            
                <%--  <%= Html.Kendo().Button()
                .Name("Print")    
                .HtmlAttributes(new { id="Print", onclick="$find('ctl00_FeaturedContent_RptViewerGrid').exportReport('PDF');", Style="color:black; width:60px; height:22px; margin-left:5px; margin-top:0px;"  })               
                .Content("Print")%> --%>
                <%= Html.Kendo().Button()
                .Name("Excel")    
                .HtmlAttributes(new { id="Excel", onclick="$find('ctl00_FeaturedContent_RptViewerGrid').exportReport('EXCELOPENXML');" , @class="wc_hdr_btn1 wc_fnt18 far fa-1x fa-file-excel"  })               
                .Content("")%>
                <%= Html.Kendo().Button()
                .Name("Excel")    
                .HtmlAttributes(new { id="Back" , @class="wc_hdr_btn1 fas fa-arrow-left" })               
                .Content("")%>
            </div>
        </div>
 </div>



        <div id="MAIN" class="FullwidthDIV">
            <div id="pageload" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; fit-position: 100%; z-index: 10000">
                <img src="../../Images/Inprogress.GIF" style="position: absolute; left: 50%; top: 45%; height: 100px; width: 100px;" />
            </div>
            <style>
                .width250 {
                    width: 250px !important;
                    color: red !important;
                    text-align: center;
                }

                .width80 {
                    width: 80px !important;
                    color: green !important;
                    text-align: right;
                }

                .width10 {
                    width: 250px !important;
                    color: yellow !important;
                }

                #CmnGridPOP .k-grid-content {
                    height: 310px;
                }

                .ColHWidth1 {
                    width: 100px !important;
                }


                .ColHWidth1a {
                    width: 6% !important;
                }

                .ColCWidth1a {
                    width: 6% !important;
                    background-color: #ede7e7 !important;
                    font-weight: bold !important;
                }

                .ColHWidth2 {
                    width: 20% !important;
                }

                .ColCWidth2 {
                    width: 20% !important;
                    background-color: #ede7e7 !important;
                    font-weight: bold !important;
                }

                .ColumnHeaderWidth {
                    width: 300px !important;
                }

                .widthCell {
                    width: 300px !important;
                    background-color: #ede7e7 !important;
                    font-weight: bold !important;
                }



                .FullwidthDIV {
                    width: 100%;
                    float: left;
                    padding-bottom: 5px;
                }

                .rowme {
                    text-align: right;
                }

                .Rowstring {
                    text-align: left;
                }

                .RowInt {
                    text-align: right;
                }

                .TotalB {
                    font-weight: bold;
                    text-align: right;
                }

                .RowBorder {
                    text-align: left;
                    font-size: large;
                }

                .boc-col {
                    display: block;
                    float: left;
                    padding: 0px 1em 1em 0;
                }

                .date-col {
                    display: block;
                    float: left;
                    padding: 0px 1em 1em 0px;
                }

                .k-loading-image {
                    background-image: url('../Images/EditButton.png');
                    background-repeat: no-repeat;
                    width: 200px;
                    height: 200px;
                }

                .borderstyle {
                    width: 40%;
                    float: left;
                    padding-bottom: 5px;
                    border-color: black;
                    border-style: solid;
                    border-right-width: 1px;
                    border-left-width: 1px;
                    border-top-width: 1px;
                    border-bottom-width: 1px;
                }

                .Fielsetstyle {
                    border-color: black;
                    border-style: solid;
                    border-right-width: 0px;
                    border-left-width: 0px;
                    border-top-width: 1px;
                    border-bottom-width: 0px;
                }


                .gridRowBorder {
                    border-right-width: 1px !important;
                    text-align: right;
                }



                .VacantColor {
                    font-weight: bolder;
                    background-color: #a7a3a3;
                    text-align: left;
                }

                .rowNegtvColor {
                    background-color: #f84545;
                    text-align: center;
                }


                .fontWeightGrid {
                    background-color: #f8f167;
                    font-size: 9px !important;
                    text-align: right;
                }

                .rowHeadColor {
                    font-weight: bold;
                    background-color: #f6b2f4;
                    text-align: left;
                }



                .k-tabstrip-items .k-item, .k-tabstrip-items .k-link {
                    background-color: #C0EAF7 !important;
                    color: black !important;
                }

                .rowColor {
                    color: black;
                    background-color: #FFCCCC;
                }

                .DisColor {
                    color: black;
                    background-color: #E0E0E0;
                }

                .rollback {
                    color: red;
                }

                .Pagefalse {
                    pointer-events: none;
                    opacity: 0.6;
                }

                .FieldFalse {
                    pointer-events: none;
                    opacity: 0.3;
                }

                .k-grid tbody .k-button, .k-ie8 .k-grid tbody button.k-button {
                    width: 30px !important;
                    height: 12px !important;
                }

                .k-tabstrip-items .k-state-active {
                    font-weight: bold;
                }

                .k-header .k-link {
                    text-align: center !important;
                    font-size: 12px;
                }
            </style>
            <%using (Html.BeginForm("FoTaxFoRoomCharges", "Reports", FormMethod.Post, new { enctype = "multipart/form-data" }))
    {%>
            <div id="divPage" style=" margin-top:5px;">

                <div class="container-fluid">
                <div class="fulwidth">

                    <div style="width: 100%">

                        <div>
                            <div style="float: left"  class="control-lable">
                                <span>Revenue</span>
                            </div>
                            <div style="width: 10px; padding-top: 2px; float: left">
                                <input type="checkbox" id="ChkRevenue" checked />
                            </div>
                            <div id="divRoomCharge" class="txtbx60" style="text-align: right; display: none; width: 3%">
                                <img src="../../Images/search_icon.png" id="RoomSearch" style="width: 20px; height: 20px; margin-top: 0px; margin-left: -10px; cursor: pointer;" title=" Search" />
                            </div>

                        </div>
                        <div style="width: 45%; margin-left: 200px; float: left">

                            <div class="valbx0 control-lable">From</div>
                            <div class="valbx110">
                                <div id="divFromDate">
                                    <%:Html.Kendo().DatePickerFor(model=>model.FromDate)
                      .Name("FromDate")
                      .Value(Model.FromDate)
                      .Format("dd/MM/yyyy")
                      .Events(e=>e.Change("FromDateChange"))  
                      .HtmlAttributes(new { style = "width:105px",ID="FromDate",@class = "form-control"} )
                                    %>
                                </div>
                            </div>

                            <div class="valbx0 control-lable">To</div>

                            <div class="valbx110">
                                <div id="divToDate">
                                    <%:Html.Kendo().DatePickerFor(model=>model.ToDate)
                     .Name("ToDate") 
                       .Value(Model.ToDate)
                       .Format("dd/MM/yyyy")
                       .Events(e=>e.Change("ToDateChange")) 
                     .HtmlAttributes(new { style = "width:105px",ID="ToDate",@class = "form-control"})
                                    %>
                                </div>
                            </div>

                            <div class="txtbx60">
                                <input type="submit" id="btnDisplay" class="btn-sm btn-primary" value="Display" />
                            </div>

                        </div>

                        <div style="width: 20%; float: left" class="control-lable">
                            <div style="width: 100%; float: left" >
                                <div style="width: 150px; float: left" >
                                    <span id="spUnbilled" >SGST, CGST, IGST Total</span>
                                </div>
                                <div>
                                    <input type="checkbox" id="chkSgcgigtolal" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <form runat="server" id="MyForm">
                    <asp:ScriptManager ID="scrptMngr" runat="server" EnablePartialRendering="true"></asp:ScriptManager>
                    <div id="Div2" runat="server" style="width: 100%; float: left; margin-top: 5px;">
                        <rsweb:ReportViewer ID="RptViewerGrid" runat="server" AsyncRendering="false" Style="border: 1px; border-style: groove" Width="100%" Height="450px"></rsweb:ReportViewer>
                    </div>
                </form>

                <script runat="server">

    public void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            System.Data.DataTable dts = (System.Data.DataTable)Session["RPTAX"];
            if (dts != null && dts.Rows.Count > 0)
            {
                try
                {
                    RptViewerGrid.ProcessingMode = ProcessingMode.Local;
                    RptViewerGrid.LocalReport.ReportPath = Server.MapPath("~/FoReports/FoRoomchargesRpt.rdlc");
                    RptViewerGrid.LocalReport.EnableHyperlinks = true;
                    RptViewerGrid.LocalReport.DataSources.Clear();
                    ReportDataSource rdc = new ReportDataSource("RmCharges", dts);
                    RptViewerGrid.LocalReport.DataSources.Add(rdc);
                    RptViewerGrid.LocalReport.Refresh();
                    RptViewerGrid.ShowToolBar = false;
                }
                catch (Exception ex)
                {

                }
            }
        }
    }

                </script>

                <%--<div class="fulwidth" id="DivRdlc">
        <form runat="server" id="MyForm">
       
            <asp:ScriptManager ID="scrptMngr" runat="server" EnablePartialRendering="true"></asp:ScriptManager>
            <div id="Div2" runat="server" style="width: 100%; float: left; margin-top: 5px;">
                     <div id="RptGrid"></div>
               
            </div>
        </form>
        
    </div>--%>
</div>
               
        </div>
    </div>
    <input type="hidden" id="AlertMessageHdn" />
    <input type="hidden" id="alertType" />
    <input type="hidden" id="Log" />
    <%: Html.Partial("_CommonMeaasgeWindow") %>
    <%: Html.Partial("_RptRoomGustCharge") %>
    <%--     <%: Html.Partial("_MessageWindowSave") %>            
            <%: Html.Partial("_AlertMessageWindow") %><%: Html.Partial("_GstDetlsPopup") %>--%>
    <style>
        .Pagefalse {
            pointer-events: none;
            opacity: 0.6;
        }
    </style>

     <script type="text/javascript">


        $(document).ready(function () {
            debugger;
            //$("#divPage").removeClass("Pagefalse");
            //$("#pageload").hide();


          

            

            $(document).ajaxStart(function () {
                $("#pageload").css("display", "");
            });
            $(document).ajaxComplete(function () {
                $("#pageload").css("display", "none");
            });

            var propchk = '<%=Session["MLTPROPHISHIND"]%>';
            if (propchk == "1") $("#divPropbox").show();
            else if (propchk == "0") $("#divPropbox").hide();
            var compid = '<%=Session["COMPIDD"]%>';
            $("#Property").data('kendoDropDownList').value(compid);
            var pageMethod = '<%=Session["PageMethod"]%>';

            var text = "";



            var chkreveu = '<%=Session["CHKREVENUE"]%>';

            var chksgst = '<%=Session["Stolal"]%>';

            var RoomPageid = '<%=Session["ROOMPAGEIND"]%>';


            if (chksgst == "1")
                $("#chkSgcgigtolal")[0].checked = true;
            else
                $("#chkSgcgigtolal")[0].checked = false;

            var frmdt = '<%=Session["FromDate"]%>';
            $("#FromDate").val(frmdt);

            var todt = '<%=Session["ToDate"]%>';
            $("#ToDate").val(todt);

       

            if (chkreveu == "1") {
                $("#ChkRevenue")[0].checked = false;
                $("#divRoomCharge").show();
            }
            else {
                $("#ChkRevenue")[0].checked = true;
                $("#divRoomCharge").hide();
            }
            //$.ajax({
            //    type: "POST",
            //    url: "/Reports/Getdatefrto",
            //    cache: false,
            //    async: false,
            //    charset: 'utf-8',
            //    data: "text=" + text,
            //    success: function (data) {
            //        // debugger;
            //        var data1 = JSON.parse(data.v);
            //        $("#FromDate").val(data1[0].TODATE);
            //        $("#ToDate").val(data1[0].TODATE);
            //    },
            //});
            $("#ChkRevenue").click(function () {

                if ($("#ChkRevenue")[0].checked == true)
                    $("#divRoomCharge").hide();
                else
                    $("#divRoomCharge").show();
            });

            window.filter = "";

            $("#RoomSearch").click(function () {
                debugger;
                var frmdt = $("#FromDate").val();
                var todt = $("#ToDate").val();

                var param = JSON.stringify({
                   frmdt: frmdt, todt: todt
                });

                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    accepts: "application/json",
                    dataType: "json",
                    url: "/Reports/TaxFoRmChargesFilter",
                    cache: false,
                    async: false,
                    charset: 'utf-8',
                    data: param,
                    success: function (data) {
                        debugger;
                     
                        //   $("#pageload").hide();
                    },
                });


                if (filter == "")
                    $("#LocationSeacrh_grid").data("kendoGrid").dataSource.read();

                var window = $("#LocalSearch");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();


            });


            $("#btnDisplay").click(function () {
                try {
                    $("#divTheme").addClass("Pagefalse")
                    $("#pageload").show();
                    debugger;
                    var chkRevenue = "";
                    var Sgcgigtolal = "";
                    var frmdt = $("#FromDate").val();
                    var todt = $("#ToDate").val();
                    var comp = $("#Property").data('kendoDropDownList').value();

                    if ($("#chkSgcgigtolal")[0].checked == true) {
                        Sgcgigtolal = "1";
                    }
                    else
                        Sgcgigtolal = "0";

                    if ($("#ChkRevenue")[0].checked == true) {
                        filter = "";
                        chkRevenue = "0";
                    }
                    else
                        chkRevenue = "1"

                    RoomPageid = "1";


                    var param = JSON.stringify({
                        comp: comp, frmdt: frmdt, todt: todt, Sgcgigtolal: Sgcgigtolal, filter: filter, chkRevenue: chkRevenue, strRoomPageInd: RoomPageid
                    });

                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        accepts: "application/json",
                        dataType: "json",
                        url: "/Reports/TaxFoRmCharges",
                        cache: false,
                        async: false,
                        charset: 'utf-8',
                        data: param,
                        success: function (data) {
                            debugger;
                            $("#MyForm").submit();
                           $("#pageload").hide();
                        },
                    });
                }
                      catch(e)
                {
                
                   $("#pageload").hide();
                  
                }

            })


            $("#Back").click(function (e) {
                //debugger;
                window.location.href = "FOTaxReport"
            });

            //$("#Excel").click(function (e) {

            //    $("#RptGrid").data("kendoGrid").saveAsExcel();

            //});



            //function excelExport(e) {
            //    debugger;
            //    // alert(0);            

            //    var from = $("#FromDate").val();
            //    var To = $("#ToDate").val();

            //    //var sheet = e.workbook.sheets[0];
            //    //sheet.freezePane.rowSplit = 5;
            //    //e.workbook.sheets[0].rows.unshift(
            //    //{
            //    //    cells: [{ value: "From: " + from }, { value: "To: " + To }]
            //    //});

            //    var grid = $("#RptGrid").data("kendoGrid");
            //    var data = grid.dataSource.data();

            //    for (var i = 0; i < grid.columns.length; i++) {


            //        if (i > 5) {
            //            var strsplit = grid.columns[i].field.split('_')

            //            if (strsplit[0] == "Service") {
            //                e.workbook.sheets[0].rows[0].cells[i].value = e.workbook.sheets[0].rows[0].cells[i].value.replace("_", " ").replace("_", " ").replace("0", "").replace("1", "").replace("2", "").replace("3", "").replace("4", "").replace("5", "").replace("6", "").replace("7", "").replace("8", "").replace("9", "").replace("10", "").replace("PP", "%").replace("AND", "&").replace("DD", ".");
            //            }
            //            else {
            //                e.workbook.sheets[0].rows[0].cells[i].value = e.workbook.sheets[0].rows[0].cells[i].value.replace("_", " (").replace("1_", " %)").replace("_E", " ").replace("C_2", "").replace("C_1", "").replace("_H", "%").replace("C_3", "").replace("C_4", "").replace("C_5", "").replace("C_6", "").replace("_F", " ").replace("_G", "(").replace("(E", " ").replace("_E", " ")
            //          .replace("_B1", "").replace("_B2", "").replace("_B3", "").replace("_B4", "").replace("_B5", "").replace("_B6", "").replace("_B7", "").replace("_B8", "").replace("_B9", "").replace("PP", "%").replace("AND", "&").replace("DD", ".");
            //            }




            //            //if ((dtadd.Columns.Contains(dttax.Rows[c]["TAX_NM"].ToString().Trim().Replace(" ", "_E").Replace("%", "_H") + "C_" + dttax.Rows[c]["PRINT_SEQ_NO"].ToString().Trim()) == true) && cont != 1)
            //        }
            //        else
            //            e.workbook.sheets[0].rows[0].cells[i].value = e.workbook.sheets[0].rows[0].cells[i].value.replace("_", " ");
            //    }
            //}

            //function setColumnWidths(grid, options) {
            //    var lockedCount = 0;
            //    for (var i = 0; i < options.columns.length; i++) {
            //        if (options.columns[i].hasOwnProperty('locked')) {
            //            if (options.columns[i].locked) {
            //                lockedCount++;
            //            }
            //        }
            //    }

            //    for (var i = 0; i < options.columns.length; i++) {
            //        var width = options.columns[i].width;
            //        grid.columns[i].width = width;
            //        if (options.columns[i].hasOwnProperty('locked') && options.columns[i].locked) {
            //            $("#grid .k-grid-header-locked").find("colgroup col").eq(i).width(width);
            //            $("#grid .k-grid-content-locked").find("colgroup col").eq(i).width(width);

            //        } else {
            //            $("#grid .k-grid-header-wrap").find("colgroup col").eq(i - lockedCount).width(width);
            //            $("#grid .k-grid-content").find("colgroup col").eq(i - lockedCount).width(width);
            //        }
            //    }
            //    // Hack to refresh grid visual state
            //    grid.reorderColumn(1, grid.columns[0]);
            //    grid.reorderColumn(1, grid.columns[0]);
            //}


            //function OnGridBound(e) {
            //    debugger;

            //    var col = new Array();

            //    var grid = $("#RptGrid").data("kendoGrid");
            //    var data = grid.dataSource.data();


            //    for (var i = 0; i < grid.columns.length; i++) {
                   
            //        debugger;
            //        if (grid.columns.length > 7)
            //            grid.autoFitColumn(i);

            //        var ColNm = grid.columns[i].field;

            //        // grid.columns[0].htmlAttributes = "style='text-align:right!important'";

            //        if (i > 5) {
            //            var  strsplit  = grid.columns[i].field.split('_')

            //            if (strsplit[0] == "Service") 
            //            {
            //                var chagcol = grid.columns[i].field.replace("_", " ").replace("_", " ").replace("0", "").replace("1", "").replace("2", "").replace("3", "").replace("4", "").replace("5", "").replace("6", "").replace("7", "").replace("8", "").replace("9", "").replace("10", "").replace("PP", "%").replace("AND", "&").replace("DD", ".");
            //            }
            //            else
            //            {
            //                var chagcol = grid.columns[i].field.replace("_"," (").replace("1_", " %)").replace("_E", " ").replace("C_2", "").replace("C_1", "").replace("_H", "%").replace("C_3", "").replace("C_4", "").replace("C_5", "").replace("C_6", "").replace("_F", " ").replace("_G", "(").replace("(E", " ").replace("_E", " ")
            //          .replace("_B1", "").replace("_B2", "").replace("_B3", "").replace("_B4", "").replace("_B5", "").replace("_B6", "").replace("_B7", "").replace("_B8", "").replace("_B9", "").replace("PP", "%").replace("AND", "&").replace("DD", ".");
            //            }
                        
                      
                        

            //            //if ((dtadd.Columns.Contains(dttax.Rows[c]["TAX_NM"].ToString().Trim().Replace(" ", "_E").Replace("%", "_H") + "C_" + dttax.Rows[c]["PRINT_SEQ_NO"].ToString().Trim()) == true) && cont != 1)
            //        }
            //        else
            //            var chagcol = grid.columns[i].field.replace("_", " ");

            //        $("#RptGrid th[data-field= " + ColNm + "]").html(chagcol);
            //    }

            //    //$.each(data, function (i, row) {
            //    //    debugger;
            //    //    var element = $('tr[data-uid="' + row.uid + '"]');

            //    //    element[0].cells['0'].colSpan = element[0].cells.length;

            //    //    for (var j = 0; j < element[0].cells.length; j++) {

            //    //        if (j > 5) {
            //    //            var element3 = $('tr[data-uid="' + row.uid + '"] td:nth-child(' + j + ')');
            //    //            $(element3).addClass("width80");
            //    //        }
            //    //    }
            //    //});


            //    $.each(data, function (i, row) {
            //        debugger;
            //        var grid = $("#RptGrid").data("kendoGrid");
            //        var element = $('tr[data-uid="' + row.uid + '"]  ');
            //        var i = 1;
            //        if (element[0].cells.length > 0) {
            //            for (; i < element[0].cells.length; i++) {
            //                var element2 = $('tr[data-uid="' + row.uid + '"] td:nth-child(' + i + ')');
            //                if (element2[0].innerText == "Sub Total") {
            //                    debugger;
            //                    $(element).addClass("TotalB");
            //                }

            //                if (element2[0].innerText == "Grand Total") {
            //                    debugger;
            //                    $(element).addClass("TotalB");
            //                }

            //                if (i > 5) {
            //                    debugger;
            //                    $(element2).addClass("RowInt");
            //                }
            //            }
            //        }
            //    });

            //    $("#divTheme").removeClass("Pagefalse")
            //    $("#pageload").hide();
            //    kendo.ui.progress(TRN, false);
            //}
        });
        $("#Property").change(function (e) {
            debugger;
            var PropertyId = $("#Property").val();
            var countrydrop = $("#Property").data('kendoDropDownList');
            $.ajax({
                type: "POST",
                url: "/Reports/PeopertySessionReAssign",
                data: "PropertyId=" + PropertyId,
                success: function (data) {
                    if (data != null && data != "" && data != undefined) {
                        $("#btnDisplay").click();
                        //this.form.submit();
                    }
                }
            });

        });
    </script>
    <%}%>
            </div>
</asp:Content>

<asp:Content ID="Content5" ContentPlaceHolderID="MainContent" runat="server">
    <input type="hidden" id="hdnRevpar" /><input type="hidden" id="hdnRevpor" />
    <%: Html.Partial("_HeaderMenuFoMaster") %>
    <%-- <%@ Register Src="~/FO/FOMasterSMLOC.ascx" TagName="MENUFO" TagPrefix="MN" %>
        <div><MN:MENUFO ID="Menu" runat="server"></MN:MENUFO></div>--%>

</asp:Content>
