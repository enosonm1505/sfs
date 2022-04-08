<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<FoAnalysisReports.Models.ClsContribution>" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<asp:Content ID="Content2" ContentPlaceHolderID="TitleContent" runat="server">
    InvoiceWiseRevenue
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="FeaturedContent" runat="server">
    <link href="../../Content/sidemenu-custom.css" rel="stylesheet" />
    <link href="../../Content/SideMenu-Kendo.css" rel="stylesheet" />
    <div class="content-wrapper">


        <div style="margin-top: 30px!important;" class="row new_hdr">
            <div class="col-sm-3">

                <%using (Html.BeginForm("InvoiceWiseRevenue", "Reports", FormMethod.Post, new { enctype = "multipart/form-data" }))
                    {%>
                <div class="TextWidth"  id="divPropbox">
                    <%:Html.Kendo().DropDownList()
                       .Name("Property")                
                       .DataTextField("Text")
                       .DataValueField("Value")
                        .HtmlAttributes(new {Style="width:230px; height:35px; z-index:1"})
                                                     .DataSource(source => { source.Read(read => { read.Action("PropertyNM", "TravelAgentBlock"); }); })
                    %>

                    <%-- .HtmlAttributes(new { onchange = "this.form.submit()",Style="width:220px; height:25px; z-index:1"})
                                                   .DataSource(source => { source.Read(read => { read.Action("PropertyNM", "TravelAgentBlock"); }); })%>--%>
                </div>
                <%} %>
            </div>
            <div class="col-sm-5 text-center">
                <strong>
                    <label style="color: black; font-weight: bold" class="wc_hdr_tlt"><strong> Invoice Wise Revenue </strong> </label>
                </strong>
            </div>
            <div class="col-sm-4">
                <div class="card-tools text-right">
                    <%= Html.Kendo().Button()
                .Name("Excel")    
                .HtmlAttributes(new { id="Excel" , @class="wc_hdr_btn1 wc_fnt18 far fa-1x fa-file-excel"  })               
                .Content("")%>
                </div>
            </div>
        </div>

        
        
        <link href="../../Content/Contribute.css" rel="stylesheet" />
      <div id="MAIN" class="FullwidthDIV">
        <div id="LoadDIv" style="display: block; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; fit-position: 100%; z-index: 1000">
            <img src="../../Images/progress.GIF" style="position: absolute; left: 50%; top: 45%; height: 100px; width: 80px;" />
        </div>
    <style>

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
    <div id="divPage" style="margin-top:5px;">
        <div class="fulwidth">

            <div style="width: 100%">

                <div style="width: 45%;margin-left:200px; float: left">

                    <div class="valbx0 control-lable">From</div>
                    <div class="valbx110">
                        <div id="divFromDate"> 
                            <%:Html.Kendo().DatePickerFor(model=>model.FromDate)
                      .Name("FromDate")
                      .Value(Model.FromDate)
                      .Format("dd/MM/yyyy")
                      .Events(e=>e.Change("FromDateChange"))                      

                      .HtmlAttributes(new { style = "width:105px",ID="FromDate",@class = "form-control"} )

                      .HtmlAttributes(new { style = "width:105px",ID="FromDate"} )
                    .HtmlAttributes(new { style = "width:120px",ID="FromDate"} )

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

                     .HtmlAttributes(new { style = "width:105px",ID="ToDate"})

                     .HtmlAttributes(new { style = "width:120px",ID="ToDate"})

                            %>
                        </div>
                    </div>

                    <div class="txtbx60" style="margin-left:20px;margin-top:5px;">
                        <input type="button" id="btnDisplay" class="btn-sm btn-primary" value="Display" />
                    </div>         
                              
                </div>

                <div style="width: 20%; float: left; display:none">
                    <div style="width: 100%; float: left">
                        <div style="width: 150px; float: left">
                            <span id="spUnbilled" class="control-lable">SGST, CGST, IGST Total</span>
                        </div>
                        <div>
                            <input type="checkbox" class="control-lable" id="chkSgcgigtolal" />
                        </div>
                    </div>
                </div>               

            </div>
        </div>


        <div class="fulwidth" id="DivRdlc">
        <form runat="server" id="MyForm">
       
            <asp:ScriptManager ID="scrptMngr" runat="server" EnablePartialRendering="true"></asp:ScriptManager>
            <div id="Div2" runat="server" style="width: 100%; float: left; margin-top: 5px;">
                     <div id="RptGrid"></div>
               
            </div>
        </form>
        
    </div>

    </div>
          </div>
    <input type="hidden" id="AlertMessageHdn" />
    <input type="hidden" id="alertType" />
    <input type="hidden" id="Log" />
        </div>
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
     



  

    <style>
        .rightaligh{
            text-align:right !important;
            font-weight:bold!important;
        }

    </style>

    <script type="text/javascript">

        $(document).ready(function () {
            // debugger;
              $("#MenuName").val('FOMNUREP2TAXRPT');   
            $("#MenuLvl").val('FOMNUREP');	    
            $("#MenuLvl1").val('');		
            $("#divPage").removeClass("Pagefalse");


            $(document).ajaxStart(function () {
                $("#LoadDIv").css("display", "block");
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

            var todt = '<%=Session["ToDate"]%>';
            $("#ToDate").val(todt);

            $.ajax({
                type: "POST",
                url: "/Reports/Getdatefrto",
                cache: false,
                async: false,
                charset: 'utf-8',
                data: "text=" + text,
                success: function (data) {
                    // debugger;
                    var data1 = JSON.parse(data.v);
                    $("#FromDate").val(data1[0].TODATE);
                    $("#ToDate").val(data1[0].TODATE);
                },
            });


            function emptygrid() {
                event = [];
                var newrow = {};
                newrow["Date"] = ""
                event.push(newrow);

                $("#RptGrid").empty().kendoGrid({



                    dataSource: {
                        data: grid,

                        pageSize: 10000
                    },
                    pageable: false,
                    sortable: false,
                    resizable: true
                });

            }


            $("#Excel").click(function (e) {

                $("#RptGrid").data("kendoGrid").saveAsExcel();

            });
            $("#btnDisplay").click(function () {
                //debugger;
                var Sgcgigtolal = "";
                var frmdt = $("#FromDate").val();
                var todt = $("#ToDate").val();
                var comp = $("#Property").data('kendoDropDownList').value();

                if ($("#chkSgcgigtolal")[0].checked == true) {
                    Sgcgigtolal = "1";
                }
                else
                    Sgcgigtolal = "";

                var param = JSON.stringify({
                    comp: comp, frmdt: frmdt, todt: todt
                });

                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    accepts: "application/json",
                    dataType: "json",
                    url: "/Reports/TaxFoInvoiceWiseRev",
                    cache: false,
                    async: false,
                    charset: 'utf-8',
                    data: param,
                    success: function (data) {
                        debugger;
                        var grid = JSON.parse(data.v);
                        $("#RptGrid").empty().kendoGrid({
                            scrollable: true,
                            editable: false,
                            height: 500,
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

                    },
                });

            })

            function excelExport(e) {
                debugger;
               // alert(0);

                var col = new Array();

                var from = $("#FromDate").val();
                var To = $("#ToDate").val();

                var grid = $("#RptGrid").data("kendoGrid");
                var data = grid.dataSource.data();

                for (var i = 0; i < grid.columns.length; i++) {
                    if (i > 5) {
                        e.workbook.sheets[0].rows[0].cells[i].value = e.workbook.sheets[0].rows[0].cells[i].value.replace("_O", "( ").replace("_C", "%)").replace("_", " ").replace("X", " ");

                    }
                    else
                        e.workbook.sheets[0].rows[0].cells[i].value = e.workbook.sheets[0].rows[0].cells[i].value.replace("_", " ");
                }               
            }

            function OnGridBound(e) {
                debugger;

                var col = new Array();

                var grid = $("#RptGrid").data("kendoGrid");
                var data = grid.dataSource.data();


                for (var i = 0; i < grid.columns.length; i++) {
            
                    debugger;
                    if (grid.columns.length > 6)
                        grid.autoFitColumn(i);
                    var ColNm = grid.columns[i].field;

                    if (i > 5) {
                        var chagcol = grid.columns[i].field.replace("_O", "( ").replace("_C", "%)").replace("_", " ").replace("X", " ");

                    }
                    else
                        var chagcol = grid.columns[i].field.replace("_", " ");

                    $("#RptGrid th[data-field= " + ColNm + "]").html(chagcol);
                }


                //$.each(data, function (i, row) {
                //    debugger;
                //    var grid = $("#RptGrid").data("kendoGrid");
                //    var element = $('tr[data-uid="' + row.uid + '"]  ');
                //    var i = 1;
                //    if (element[0].cells.length > 0) {
                //        for (; i < element[0].cells.length; i++) {
                //            var element2 = $('tr[data-uid="' + row.uid + '"] td:nth-child(' + i + ')');
                //            if (element2[0].innerText == "Sub Total") {
                //                debugger;
                //                $(element).addClass("TotalB");
                //            }

                //            if (element2[0].innerText == "Grand Total") {
                //                debugger;
                //                $(element).addClass("TotalB");
                //            }

                //            if (i > 5) {
                //                debugger;
                //                $(element2).addClass("RowInt");
                //            }
                //        }
                //    }
                //});
            }
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
</asp:Content>

<asp:Content ID="Content5" ContentPlaceHolderID="MainContent" runat="server">
    <input type="hidden" id="hdnRevpar" /><input type="hidden" id="hdnRevpor" />
  <%: Html.Partial("_HeaderMenuFoMaster") %>
 <%-- <%@ Register Src="~/FO/FOMasterSMLOC.ascx" TagName="MENUFO" TagPrefix="MN" %>
        <div><MN:MENUFO ID="Menu" runat="server"></MN:MENUFO></div>--%>

   

    <style>
        .rightaligh{
            text-align:right !important;
            font-weight:bold!important;
        }

    </style>

  

</asp:Content>
