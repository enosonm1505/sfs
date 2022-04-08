<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<FoAnalysisReports.Models.ClsContribution>" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>


<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    FOTaxReport
</asp:Content>


    <asp:Content ID="Content3" ContentPlaceHolderID="FeaturedContent" runat="server">
        <div class="content-wrapper">
        <link href="../../Content/Contribute.css" rel="stylesheet" />
        <link href="../../Content/sidemenu-custom.css" rel="stylesheet" />
            <link href="../../Content/SideMenu-Kendo.css" rel="stylesheet" />

        <div style="margin-top: 30px!important;" class="row new_hdr">
            <div class="col-sm-3">

                <%using (Html.BeginForm("FOTaxReport", "Reports", FormMethod.Post, new { enctype = "multipart/form-data" }))
                    {%>
                <div class="TextWidth" id="divPropbox">
                    <%:Html.Kendo().DropDownList()
                       .Name("Property")                
                       .DataTextField("Text")
                       .DataValueField("Value")
                       .HtmlAttributes(new {Style="width:220px; height:35px; z-index:1"})
                                                     .DataSource(source => { source.Read(read => { read.Action("PropertyNM", "TravelAgentBlock"); }); })
                    %>
                    <%--   .HtmlAttributes(new { onchange = "this.form.submit()",Style="width:220px; height:25px; z-index:1"})
                                                   .DataSource(source => { source.Read(read => { read.Action("PropertyNM", "TravelAgentBlock"); }); })%>--%>
                </div>
                <%} %>
            </div>
            <div class="col-sm-5 text-center">
                <strong>
                    <label style="color: black; font-weight: bold" class="wc_hdr_tlt"><strong>Tax Reports </strong></label>
                    </strong>
                </div>
                <div class="col-sm-4">
                    <div class="card-tools text-right">

                    <%= Html.Kendo().Button()
                .Name("Print")    
                .HtmlAttributes(new { id="Print", @class="wc_hdr_btn1 wc_fnt18 fas fa-1x  fa-print"  })               
                .Content("")%>
                    <%= Html.Kendo().Button()
                .Name("Excel")    
                .HtmlAttributes(new { id="Excel",  @class="wc_hdr_btn1 wc_fnt18 far fa-1x fa-file-excel"   })               
                .Content("")%>
                    <%-- <%= Html.Kendo().Button()
                    .Name("Refresh")
                    .HtmlAttributes( new {id="Refresh", @class="printACBook"})               
                    .Content("Refresh")%>--%>
                </div>
            </div>

        </div>

        <div id="MAIN" class="FullwidthDIV">
            <div id="LoadDIv" style="display: block; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; fit-position: 100%; z-index: 189">
                <img src="../../Images/progress.GIF" style="position: absolute; left: 50%; top: 45%; height: 100px; width: 80px;" />
            </div>


            <style>
                .TotalB {
                    font-weight: bold;
                    text-align: right;
                }

                .RowInt {
                    text-align: right;
                }

                .k-grid-header th.k-header {
                    text-align: center !important;
                }
            </style>
            <div id="divPage" style=" margin-top:5px;">

                <div class="fulwidth">
                    <div style="width: 100%">

                        <div style="width: 19%; float: left" class="control-lable">
                            <div>
                                <span id="spDatewise">
                                    <input type="checkbox" id="chkdatawise" />DateWise</span>
                            </div>
                            <div style="width: 50%">
                                <span id="spchkMntwie">
                                    <input type="checkbox" id="chkMothwise" />MonthWise</span>
                            </div>
                            <div style="float: left; width: 70%">
                                <span id="spchkTaxAmt">
                                    <input type="checkbox" id="chkTaxOnAmount" />Tax on Amount</span>
                            </div>
                        </div>

                        <div style="width: 14%; float: left" class="control-lable">
                            <div>
                                <div style="width: 85px; float: left">
                                    <span id="spchkTariff">Tariff</span>

                                </div>
                                <div>
                                    <input type="checkbox" id="chkTariff" />
                                </div>
                            </div>

                            <div style="width: 100%; float: left">
                                <div style="width: 85px; float: left">
                                    <span id="spchMiscellan">Misc</span>
                                </div>
                                <div>
                                    <input type="checkbox" id="chkMiscellan" />
                                </div>
                            </div>

                            <div style="width: 100%; float: left">
                                <div style="width: 85px; float: left">
                                    <span id="spchkPlan">Plan</span>
                                </div>
                                <div>
                                    <input type="checkbox" id="chkPlan" />
                                </div>
                            </div>
                        </div>


                        <div style="width: 45%; float: left" >
                            <div class="valbx0 control-lable" >From</div>
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
                                <div id="divFromMthDate" style="display: none">
                                    <%:Html.Kendo().DatePicker()
                       .Name("FromMthDate")
                       .Value(Model.FromMthDate)
                       .Start(CalendarView.Year)
                       .Depth(CalendarView.Year)
                       .Format("MMM yyyy")     
                       .HtmlAttributes(new { style = "width:105px;",ID="FromMthDate",@class = "form-control"} )
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
                                <div id="divToMthDate" style="display: none">
                                    <%:Html.Kendo().DatePicker()
                     .Name("ToMthDate") 
                       .Value(Model.ToMthDate)
                       .Start(CalendarView.Year)
                      .Depth(CalendarView.Year)
                       .Format("MMM yyyy")     
                     .HtmlAttributes(new { style = "width:105px;",ID="ToMthDate",@class = "form-control"})
                                    %>
                                </div>


                            </div>

                            <div class="txtbx60">
                                <input type="button" id="btnDisplay" class="btn-sm btn-primary" value="Display" />
                            </div>

                            <div class="txtbx60 ml-3" style="text-align: right; width: 5%">
                                <img src="../../Images/search_icon.png" id="FilterSearch" class="bt_ico_btn" cursor: pointer;" title=" Search" />
                            </div>
                        </div>

                        <div style="width: 20%; float: left">

                            <div style="width: 100%; float: left;">
                                <div style="width: 100px; float: left" class="control-lable">
                                    <span id="spUnbilled">Unbilled</span>
                                </div>
                                <div>
                                    <input type="checkbox" id="chkunbiled" />
                                </div>
                            </div>
                            <div id="divGstTax" style="display:none">
                                <div style="width: 100px; float: left" class="control-lable">
                                    <span id="spchgsttaxlist">GST Tax List</span>

                                </div>
                                <div>
                                    <input type="checkbox" id="chkgsttaxlist" />
                                </div>
                            </div>

                            <div style="width: 100%; float: left; display: none">
                                <div style="width: 100px; float: left" class="control-lable">
                                    <span id="spchRmCharg">Room Charges</span>
                                </div>
                                <div>
                                    <input type="checkbox" id="chkrmCharg" />
                                </div>
                            </div>

                            <div style="width: 100%; float: left;display:none" id="divINVwiseRev">
                                <div style="width: 100px; float: left" class="control-lable">
                                    <span id="spchInvWseRev">INV.wise Revenue</span>
                                </div>
                                <div>
                                    <input type="checkbox" id="chkInvWsRev" />
                                </div>
                            </div>

                        </div>
                        <div>
                        </div>

                    </div>

                </div>


                <div class="fulwidth" id="DivRdlc">
                    <form runat="server" id="MyForm">
                        <asp:ScriptManager ID="scrptMngr" runat="server" EnablePartialRendering="true"></asp:ScriptManager>
                        <div id="RptGrid"></div>
                    </form>

                </div>

            </div>
        </div>
            </div>
        <input type="hidden" id="AlertMessageHdn" />
        <input type="hidden" id="alertType" />
        <input type="hidden" id="Log" />
        <%: Html.Partial("_RptTaxRptFilter") %>
        <%: Html.Partial("_CommonMeaasgeWindow") %>

        <%--     <%: Html.Partial("_MessageWindowSave") %>            
            <%: Html.Partial("_AlertMessageWindow") %><%: Html.Partial("_GstDetlsPopup") %>--%>
        <style>
            .Pagefalse {
                pointer-events: none;
                opacity: 0.6;
            }
        </style>

        <script>    


</script>
          <script type="text/javascript">


        $(document).ready(function () {

            $("#MenuName").val('FOMNUREP2TAXRPT');
            $("#MenuLvl").val('FOMNUREP');	    
            $("#MenuLvl1").val('');		     


            $("#divPage").removeClass("Pagefalse");

            $(document).ajaxStart(function () {
                $("#LoadDIv").css("display", "");
            });
            $(document).ajaxComplete(function () {
                $("#LoadDIv").css("display", "none");
            });

            var propchk = '<%=Session["MLTPROPHISHIND"]%>';
            if (propchk == "1") $("#divPropbox").show();
            else if (propchk == "0") $("#divPropbox").hide();
            var compid = '<%=Session["COMPIDD"]%>';
            $("#Property").data('kendoDropDownList').value(compid);
            var pageMethod = '<%=Session["PageMethod"]%>';

            var text = "";
            var frmdt = '<%=Session["FromDate"]%>';
            $("#FromDate").val(frmdt);
        
            window.filter = "";
            var todt = '<%=Session["ToDate"]%>';
            $("#ToDate").val(todt);

            <%--var IN_GST_IND = '<%=Session["IN_GST_IND"]%>';
            var M_TAX = '<%=Session["M_TAX"]%>';

            if (IN_GST_IND == "1")
                $("#divGstTax").show();
            else
                $("#divGstTax").hide();

            if (IN_GST_IND == "1" || M_TAX == "2")
                $("#divINVwiseRev").show();
            else
                $("#divINVwiseRev").hide();--%>

            LoadCurrDet(compid);
            emptygrid();

            $("#chkTariff")[0].checked = true;
            $("#chkdatawise")[0].checked = true;
            $.ajax({
                type: "POST",
                url: "/Reports/Getdatefrto",
                cache: false,
                async: false,
                charset: 'utf-8',
                data: "text=" + text,
                success: function (data) {
                    //debugger;
                    var data1 = JSON.parse(data.v);
                    $("#FromDate").val(data1[0].FROMDATE);
                    $("#ToDate").val(data1[0].TODATE);
                    $("#ToMthDate").val(data1[0].Mnths);
                    $("#FromMthDate").val(data1[0].Mnths);
                },
            });

            function emptygrid() {
                events = [];

                var ddf = "";
                var valobj = {};

                //valobj["Date"] = ddf;

                events.push(valobj);

                $("#RptGrid").empty().kendoGrid({
                    dataSource: {
                        data: events,
                        pageSize: 10000,
                        width: 100,
                        //width: 120,
                        //  dataBound: dfa,

                    },
                });
            }

            $("#chkdatawise").click(function () {
                //debugger;
                emptygrid();
            })

            $("#chkTaxOnAmount").click(function () {
                //debugger;
                emptygrid();
            })
            $("#chkMiscellan").click(function () {
                //debugger;
                emptygrid();
            })
            $("#chkTariff").click(function () {
                //debugger;
                emptygrid();
            })

            $("#chkMothwise").click(function () {
                //debugger;
                emptygrid();
            })

            $("#chkPlan").click(function () {
                //debugger;
                emptygrid();
            })


            $("#chkrmCharg").click(function () {
                if ($("#chkrmCharg")[0].checked == true) {
                    //sessionReassign();
                    window.location.href = "FoTaxFoRoomCharges"
                }
            })



            $("#chkInvWsRev").click(function () {
                if ($("#chkInvWsRev")[0].checked == true) {
                    //sessionReassign();
                    window.location.href = "InvoiceWiseRevenue"
                }
            })



            $("#chkunbiled").click(function () {
                if ($("#chkunbiled")[0].checked == true) {
                    //sessionReassign();
                    window.location.href = "InFoUnBilled"
                }
            })


            $("#chkgsttaxlist").click(function () {

                if ($("#chkgsttaxlist")[0].checked == true) {
                    //sessionReassign();
                    window.location.href = "../FO/FoRptGstTaxList.aspx";
                }
            })


            // FoRptGstTaxList.aspx

            $("#FromDate, #FromMthDate, #ToDate, #ToMthDate").change(function () {
                emptygrid();
            })



           

            $("#Excel").click(function (e) {

                $("#RptGrid").data("kendoGrid").saveAsExcel();
            });

            $("#Print").click(function (e) {
                debugger;
                var gridElement = $('#RptGrid');
                //var currdt = <% System.DateTime.Now.ToString("dd/mm/yyyy"); %>
                        printableContent = '',
                        win = window.open('', '', 'width=800, height=500'),
                        doc = win.document.open();

                    var htmlStart =
                            '<!DOCTYPE html>' +
                            '<html>' +
                            '<head>' +
                            '<meta charset="utf-8" />' +
                            '<title>WINHMS</title>' +
                            '<link href="/Content/kendo/2015.3.930/kendo.common.min.css" rel="stylesheet" /> ' +
                            '<style>' +
                            'html { font: 11pt sans-serif; }' +
                            '.k-grid { border-top-width: 0; }' +
                            '.k-grid, .k-grid-content { height: auto !important; }' +
                            '.k-grid-content { overflow: visible !important; }' +
                            'div.k-grid table { table-layout: auto; width: 100% !important; }' +
                            '.k-grid .k-grid-header th { border-top: 1px solid;font-weight:bold}' +
                            '.k-grid table tbody tr td{border-bottom:1px solid;}'+
                            '.k-grid-toolbar, .k-grid-pager > .k-link { display: none; }' +
                            '</style>' +
                            '</head>' +
                            '<body onload="window.print()">' +
                             '<b><center>Tax Report</center></b><br>' +

                            '<br>';

                    var htmlEnd =
                            '</body>' +
                            '</html>';

                    var gridHeader = gridElement.children('.k-grid-header');
                    if (gridHeader[0]) {
                        var thead = gridHeader.find('thead').clone().addClass('k-grid-header');
                        printableContent = gridElement
                            .clone()
                                .children('.k-grid-header').remove()
                            .end()
                                .children('.k-grid-content')
                                    .find('table')
                                        .first()
                                            .children('tbody').before(thead)
                                        .end()
                                    .end()
                                .end()
                            .end()[0].outerHTML;
                    } else {
                        printableContent = gridElement.clone()[0].outerHTML;
                    }

                    doc.write(htmlStart + printableContent + htmlEnd);
                    doc.close();
                    //// win.print();
              
            });
            $("#btnDisplay").click(function () {
                //debugger;
                var frmdate = "";
                var todate = "";
                var TaxonAmount = "";

                var Tariff = "";
                var Miscellaneous = "";
                var Plan = "";


                var frmdt = $("#FromDate").val();
                var todt = $("#ToDate").val();
                var frmn = $("#FromMthDate").val();
                var tomn = $("#ToMthDate").val();
                var comp = $("#Property").data('kendoDropDownList').value();

                if ($("#chkdatawise")[0].checked == true) {
                    frmdate = "1";
                }
                else
                    frmdate = "";

                if ($("#chkMothwise")[0].checked == true) {
                    todate = "1";
                }
                else
                    todate = "";

                if ($("#chkTaxOnAmount")[0].checked == true) {
                    TaxonAmount = "1";
                }
                else
                    TaxonAmount = "";

                if ($("#chkTariff")[0].checked == true) {
                    Tariff = "1";
                }
                else
                    Tariff = "";

                if ($("#chkMiscellan")[0].checked == true) {
                    Miscellaneous = "1";
                }
                else
                    Miscellaneous = "";

                if ($("#chkPlan")[0].checked == true) {
                    Plan = "1";
                }
                else
                    Plan = "";
                //var filter = window.filter;
               // window.filter = "";
                var frmdt = $("#FromDate").val();
                var todt = $("#ToDate").val();
                var tomn = $("#ToMthDate").val();
                var frmn = $("#FromMthDate").val();

                var param = JSON.stringify({
                    comp: comp, frmdate: frmdate, todate: todate, TaxonAmount: TaxonAmount, Tariff: Tariff,
                    Miscellaneous: Miscellaneous, Plan: Plan, frmdt: frmdt, todt: todt, frmn: frmn, tomn: tomn, filter: filter
                });

                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    accepts: "application/json",
                    dataType: "json",
                    url: "/Reports/TaxDisplay",
                    cache: false,
                    async: false,
                    charset: 'utf-8',
                    data: param,
                    success: function (data) {
                        //debugger;
                        var grid = JSON.parse(data.v);
                        if (grid != "") {
                            $("#RptGrid").empty().kendoGrid({
                                scrollable: true,
                                editable: false,
                                height: 480,
                                width: 1000,
                                dataBound: OnGridBound,
                                excelExport: excelExport,                               

                                dataSource: {
                                    data: grid,

                                    pageSize: 10000
                                },
                                pageable: false,
                                sortable: false,
                                resizable: true
                            });
                        }
                        else
                            emptygrid();

                    },
                });
            })


            $("#RptGrid").kendoGrid({
                execel: {
                    fileName: "Tax Report",
                    filterable: true,
                    allPage:false
                },
            });

            function excelExport(e) {
                //debugger;
               // alert(0);

                var col = new Array();

                var from = $("#FromDate").val();
                var To = $("#ToDate").val();
              
                //var sheet = e.workbook.sheets[0];
                //sheet.freezePane.rowSplit = 5;
                //e.workbook.sheets[0].rows.unshift(
                //{
                //    cells: [{ value: "From: " + from }, { value: "To: " + To }]
                //});

                var grid = $("#RptGrid").data("kendoGrid");
                var data = grid.dataSource.data();

                for (var i = 0; i < grid.columns.length; i++) {
                    if ($("#chkTaxOnAmount")[0].checked == true) {
                        if (grid.columns.length > 8)
                            e.workbook.sheets[0].rows[0].cells[i].value = e.workbook.sheets[0].rows[0].cells[i].value.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("AND", "&").replace("PP", "%").replace("_DD", ".").replace("DD", ".");
                    }
                    

                   

                    e.workbook.sheets[0].rows[0].cells[i].value = e.workbook.sheets[0].rows[0].cells[i].value.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("AND", "&").replace("PP", "%").replace("_DD", ".").replace("DD", ".");

                    //var chagcol = grid.columns[i].field.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("AND", "&").replace("PP", "%").replace("_DD", ".").replace("DD", ".");

                  //  $("#RptGrid th[data-field= " + ColNm + "]").html(chagcol);
                }

                ////debugger;
                //$.each(data, function (i, row) {
                //    // //debugger;
                //    var grid = $("#RptGrid").data("kendoGrid");

                //    var element = $('tr[data-uid="' + row.uid + '"]  ');
                //    if (i > 1)
                //        $(element).addClass("RowInt");
                //    var i = 1;
                //    if (element[0].cells.length > 0) {
                //        for (; i < element[0].cells.length; i++) {
                //            var element2 = $('tr[data-uid="' + row.uid + '"] td:nth-child(' + i + ')');

                //            if (element2[0].innerText == "Total") {
                //                // //debugger;
                //                $(element).addClass("TotalB");

                //            }

                //            if (i > 1) {
                //              //  //debugger;
                //                $(element).addClass("RowInt");
                //            }
                //        }
                //    }

                //});
            } 

            function OnGridBound(e) {
                debugger;


                var col = new Array();

                var grid = $("#RptGrid").data("kendoGrid");
                var data = grid.dataSource.data();

                for (var i = 0; i < grid.columns.length; i++) {
                    if ($("#chkTaxOnAmount")[0].checked == true) {
                        if (grid.columns.length > 8)
                            grid.autoFitColumn(i);
                    }
                    else if (grid.columns.length > 8)
                        grid.autoFitColumn(i);

                    var ColNm = grid.columns[i].field;

                    var chagcol = grid.columns[i].field.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("AND", "&").replace("PP", "%").replace("_DD", ".").replace("DD", ".");
                  //  var chagcol = grid.columns[i].field.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("1", " ").replace("2", " ").replace("3", " ").replace("4", " ").replace("5", " ");

                    $("#RptGrid th[data-field= " + ColNm + "]").html(chagcol);

                    grid.columns[i].format = "{0:n2}";

                }
                //debugger;

                //for (var c = 0; c < grid.Cols.length; c++) {
                //    grid.Cols[c].template = "#= FormatValue(" + grid.Cols[c].field + ")#";
                //}

                $.each(data, function (i, row) {
                   // //debugger;
                    var grid = $("#RptGrid").data("kendoGrid");

                    var element = $('tr[data-uid="' + row.uid + '"]  ');
                    if (i > 1)
                        $(element).addClass("RowInt");
                    var i = 1;
                    if (element[0].cells.length > 0) {
                        for (; i < element[0].cells.length; i++) {

                            var element2 = $('tr[data-uid="' + row.uid + '"] td:nth-child(' + i + ')');


                            if (element2[0].innerText == "Total") {
                               // //debugger;
                                $(element).addClass("TotalB");

                            }

                            if (i > 1) {
                              // //debugger;
                                $(element).addClass("RowInt");
                            }
                        }
                    }

                });


            }

           


            function FormatValue(value) {
                return kendo.toString(value, "c0")//currency formatting 
            }


            function SMFromDateChange(e) {
                //debugger; 
                var From = $("#FromDate").val();
                var To = $("#ToDate").val();

            
                $.ajax({
                    type: "POST",
                    url: "/Reports/FTDateValidation",
                    cache: false,
                    charset: 'utf-8',
                    data: "F=" + From + "&T=" + To,
                    success: function (data) {
                        if (data.d != "") {
                            AlertMesaageDate();
                            $("#FromDate").val(To);
                        }
                    }
                });

            }

            function AlertMesaageDate() {
                var window = $("#CommonAlert");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
            }
            function SMToDateChange(e) {
                //debugger;
                var From = $("#FromDate").val();
                var To = $("#ToDate").val();

                $.ajax({
                    type: "POST",
                    url: "/Reports/FTDateValidation",
                    cache: false,
                    charset: 'utf-8',
                    data: "F=" + From + "&T=" + To,
                    success: function (data) {
                        if (data.d != "") {
                            AlertMesaageDate();
                            $("#FromDate").val(To);
                        }
                    }
                });
            }


            function AlertMesaage() {
                var meg = $("#AlertMessageHdn").val();
                $("#alertMeg").text(meg);
                var alertty = $("#alertType").val();
                if (alertty == 'fail') {
                    $("#alertimg").show();
                    $("#saveimg").hide();
                }
                else {
                    $("#saveimg").show();
                    $("#alertimg").hide();
                }
                var window = $("#Alert");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
            }
            function DelAlertMesaage() {
                var meg = $("#AlertMessageHdn").val();
                $("#alertMeg1").text(meg);
                var alertty = $("#alertType").val();
                if (alertty == 'fail') {
                    $("#alertimg1").show();
                    $("#saveimg1").hide();
                }
                else {
                    $("#saveimg1").show();
                    $("#alertimg1").hide();
                }
                var window = $("#DEAlert");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
            }


            $("#chkMothwise").click(function () {
                if ($("#chkMothwise")[0].checked == true) {
                    //debugger;
                    document.getElementById("divFromMthDate").style.display = "";
                    document.getElementById("divToMthDate").style.display = "";

                    document.getElementById("divFromDate").style.display = "none";
                    document.getElementById("divToDate").style.display = "none";
                    $("#chkdatawise")[0].checked = false;
                    $("#chkMothwise")[0].checked = true;
                    $("#spchkTaxAmt").hide();
                }
                else {
                    $("#chkdatawise")[0].checked = true;
                    $("#chkMothwise")[0].checked = false;
                    $("#spchkTaxAmt").show();
                }
            })


            $("#chkdatawise").click(function () {

                if ($("#chkdatawise")[0].checked == true) {
                    //debugger;
                    document.getElementById("divFromMthDate").style.display = "none";
                    document.getElementById("divToMthDate").style.display = "none";

                    document.getElementById("divFromDate").style.display = "";
                    document.getElementById("divToDate").style.display = "";
                    $("#chkdatawise")[0].checked = true;
                    $("#chkMothwise")[0].checked = false;
                    $("#spchkTaxAmt").show();
                }
                else {
                    $("#chkdatawise")[0].checked = false;
                    $("#chkMothwise")[0].checked = true;
                    $("#spchkTaxAmt").hide();
                }


            })


            $("#FilterSearch").click(function () {
                //debugger;
                if (filter == "")
                $("#LocationSeacrh_grid").data("kendoGrid").dataSource.read();

                var window = $("#LocalSearch");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();


            });



        });

        $("#Property").change(function (e) {
            debugger;
            var PropertyId = $("#Property").val();
            var countrydrop = $("#Property").data('kendoDropDownList');
            LoadCurrDet(PropertyId);
            $.ajax({
                type: "POST",
                url: "/Reports/PeopertySessionReAssign",
                data: "PropertyId=" + PropertyId,
                success: function (data) {
                    if (data != null && data != "" && data != undefined) {
                       
                        $("#btnDisplay").click();
                    }
                }
            });

        });

        function LoadCurrDet(vProperty) {

            var rowDatad = [];
            try {
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "/Reports/GetCurrFormatDetails",
                    data: "CmpId=" + vProperty,
                    success: function (d) {
                        if (d != "") {
                            rowDatad = JSON.parse(d);

                            if (rowDatad.IN_GST_IND == "1")
                                $("#divGstTax").show();
                            else
                                $("#divGstTax").hide();

                            if (rowDatad.IN_GST_IND == "1" || rowDatad.M_TAX == "2")
                                $("#divINVwiseRev").show();
                            else
                                $("#divINVwiseRev").hide();

                        }
                    }
                });

            }
            catch (e) {
                console.log(e.message)
            }
        };

        function sessionReassign() {
            var PropertyId = $("#Property").val();
            var countrydrop = $("#Property").data('kendoDropDownList');
            $.ajax({
                type: "POST",
                url: "/Reports/PeopertySessionReAssign",
                data: "PropertyId=" + PropertyId,
                success: function (data) {
                    if (data != null && data != "" && data != undefined) {
                       // $("#btnDisplay").click();
                        //this.form.submit();
                    }
                }
            });
        }

    </script>
    </asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="MainContent" runat="server">
    <input type="hidden" id="hdnRevpar" /><input type="hidden" id="hdnRevpor" />
      <%: Html.Partial("_HeaderMenuFoMaster") %>
    <%-- <%@ Register Src="~/FO/FOMasterSMLOC.ascx" TagName="MENUFO" TagPrefix="MN" %>
        <div><MN:MENUFO ID="Menu" runat="server"></MN:MENUFO></div>--%>

   

  
</asp:Content>
