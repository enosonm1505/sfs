<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<FoAnalysisReports.Models.ClsContribution>" %>


<asp:Content ID="Content2" ContentPlaceHolderID="TitleContent" runat="server">
InFoUnBilled
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="FeaturedContent" runat="server">
    <link href="../../Content/sidemenu-custom.css" rel="stylesheet" />
    <link href="../../Content/SideMenu-Kendo.css" rel="stylesheet" />
    <div class="content-wrapper">
    
        
           <div style="margin-top: 30px!important;" class="row new_hdr">
            <div class="col-sm-3">
       
        <%using (Html.BeginForm("InFoUnBilled", "Reports", FormMethod.Post, new { enctype = "multipart/form-data" }))
          {%>
        <div class="TextWidth" id="divPropbox">
            <%:Html.Kendo().DropDownList()
                       .Name("Property")                
                       .DataTextField("Text")
                       .DataValueField("Value")
                          .HtmlAttributes(new {Style="width:220px; height:35px; z-index:1"})
                                                     .DataSource(source => { source.Read(read => { read.Action("PropertyNM", "TravelAgentBlock"); }); })  %>
                     <%--  .HtmlAttributes(new { onchange = "this.form.submit()",Style="width:220px; height:25px; z-index:1"})
                                                 .DataSource(source => { source.Read(read => { read.Action("PropertyNM", "TravelAgentBlock"); }); })--%>
                                                   
                                                 
        </div>
        <%} %>
        </div>
            <div class="col-sm-5 text-center">
                <strong>
            <label style="color: black; font-weight: bold"class="wc_hdr_tlt"><strong>Unbilled & charged Taxes</strong>  </label>
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
<div id="pageload" style=" position:absolute; left:0px; top:0px; width:100%; height:100%; margin:0px; fit-position:100%; z-index:10000">
<img src="../../Images/Inprogress.GIF" style="position:absolute; left:50%; top:45%; height:100px; width:100px;" />
</div> 
       <%-- <div id="LoadDIv" style="display: block; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; fit-position: 100%; z-index: 1000">
            <img src="../../Images/Inprogress.GIF" style="position: absolute; left: 50%; top: 45%; height: 100px; width: 80px;" />
        </div>--%>
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
                      .HtmlAttributes(new { style = "width:105px",ID="FromDate",@class = "form-control"} )
                            %>
                        </div>
                    </div>

                    <div class="valbx0 control-lable" style="display:none" >To</div>

                   <div class="valbx110" style="display:none">
                        <div id="divToDate">
                            <%:Html.Kendo().DatePickerFor(model=>model.ToDate)
                     .Name("ToDate") 
                       .Value(Model.ToDate)
                       .Format("dd/MM/yyyy")
                     .HtmlAttributes(new { style = "width:105px",ID="ToDate",@class = "form-control"})
                            %>
                        </div>
                    </div>

                    <div class="txtbx60">
                        <input type="button" id="btnDisplay" class="btn-sm btn-primary" value="Display" />
                    </div>         
                              
                </div>

                <div style="width: 20%; float: left; ">
                    <div style="width: 100%; float: left">
                        <div style="width: 150px; float: left" class="control-lable">
                            <span id="spUnbilled">SGST, CGST Total</span>
                        </div>
                        <div>
                            <input type="checkbox"  class="control-lable" id="chkSgcgigtolal" />
                        </div>
                    </div>

                    <div style="width: 100%; float: left">
                        <div style="width: 150px; float: left" class="control-lable">
                            <span id="strSummarty">Summary</span>
                        </div>
                        <div>
                            <input type="checkbox"  class="control-lable" id="chkSummary" />
                        </div>
                    </div>
                </div>    
                
                
                          

            </div>
        </div>


        <div class="fulwidth" id="DivRdlc">
        <form runat="server" id="MyForm">
       
            <asp:ScriptManager ID="scrptMngr" runat="server" EnablePartialRendering="true"></asp:ScriptManager>
            <div id="Div2" runat="server" style="width: 100%; float: left; margin-top: 5px;">
                     <div id="RptGrid" style="text-align:right"></div>
               
            </div>
        </form>
        
    </div>

    </div>
          </div>
        </div>
    <input type="hidden" id="AlertMessageHdn" />
    <input type="hidden" id="alertType" />
    <input type="hidden" id="Log" />
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
            debugger;
              $("#MenuName").val('FOMNUREP2TAXRPT');   
            $("#MenuLvl").val('FOMNUREP');	    
            $("#MenuLvl1").val('');		

            $("#divPage").removeClass("Pagefalse");
            $("#pageload").hide();


       
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
            var frmdt = '<%=Session["FromDate"]%>';
            $("#FromDate").val(frmdt);

            var todt = '<%=Session["ToDate"]%>';
            $("#ToDate").val(todt);
            emptygrid();
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


            var GrdscrFilter = function () {
                //debugger;
                var datsource = new kendo.data.DataSource({
                    data: [],
                    batch: true,
                    schema: {
                        model: {
                            fields: {
                                PO_TERMS_TY_ID: { validation: { required: true }, type: "string" },
                                PO_TERMS_ID: { type: "string" },
                                PO_TERMS_1: { type: "string" },
                            },


                        }
                    }, pageSize: 8,
                });

                $("#GridScrTerm").kendoGrid({

                    dataSource: datsource,
                    selectable: "row",
                    scrollable: true,
                    navigatable: true,
                    // change: Footerrowcalc,
                    columns: [
                        {

                            field: "PO_TERMS_1", title: 'PR NO', width: 150, attributes: { style: "text-align:left" }, filterable: {
                                cell: {
                                    showOperators: false, operator: "contains",
                                    suggestionOperator: "contains"
                                }
                            }
                        },
                        {
                            //field: "PO_TERMS_1", title: 'PR NO', width: 150, attributes: { style: "text-align:left; display:none" }, filterable: {
                            //    cell: {
                            //        showOperators: false, operator: "contains",
                            //        suggestionOperator: "contains"
                            //    }
                            //},

                            title: 'Select', width: 40,
                            template: "<input type='checkBox' id='chkTemscnt' onclick='fntemscnt();'  height=15px; width=15px;  />", attributes: { style: "text-align:Center" },
                        },
                    ],
                    //header
                    editable: false
                    // change: SelectItems
                });
            }


            function emptygrid() {
                event = [];
                var newrow = {};
                newrow["Date"] = "";
                newrow["Reg_No"] = "";
                newrow["Room_No"] = "";
                newrow["Revenue"] = "";
                newrow["Charged_Amt"] = "";
                event.push(newrow);

                $("#RptGrid").empty().kendoGrid({
                    dataSource: {
                        data: event,
                        dataBound: OnGridBound,
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

            $("#btnDisplay").click(function (e) {
                debugger;
                try{
                    $("#divTheme").addClass("Pagefalse")
                    $("#pageload").show();
                    // var TRN = $("#MAIN");
                    // kendo.ui.progress(TRN, false);
                    var Sgcgigtolal = "";
                    var StrSummary = "";
                    var frmdt = $("#FromDate").val();
                    var todt = $("#ToDate").val();
                    var comp = $("#Property").data('kendoDropDownList').value();

                    if ($("#chkSgcgigtolal")[0].checked == true) {
                        Sgcgigtolal = "1";
                    }
                    else
                        Sgcgigtolal = "";


                    if ($("#chkSummary")[0].checked == true) {
                        StrSummary = "1";
                    }
                    else
                        StrSummary = "";

                    var param = JSON.stringify({
                        comp: comp, frmdt: frmdt, todt: todt, Sgcgigtolal: Sgcgigtolal, StrSummary: StrSummary
                    });

                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        accepts: "application/json",
                        dataType: "json",
                        url: "/Reports/TaxFoUnbilledGid",
                        cache: false,
                        async: false,
                        charset: 'utf-8',
                        data: param,
                        success: function (data) {
                            $("#divTheme").removeClass("Pagefalse")
                            $("#pageload").hide();
                            debugger;
                            var grid = JSON.parse(data.v);
                            $("#RptGrid").empty().kendoGrid({
                                scrollable: true,
                                editable: false,
                                height: 500,
                                width: 1000,
                                dataBound: OnGridBound,
                                excelExport: excelExport,
                //                   .DataBound("ColorChange"))
                // .Events(e=> e
                //.ExcelExport("ExcelExport"))

                                dataSource: {
                                    data: grid,

                                    pageSize: 10000
                                },
                                pageable: false,
                                sortable: false,
                                resizable: true
                            });

                        }
                    })
                }
                catch(e)
                {
                    $("#divTheme").removeClass("Pagefalse")
                    $("#pageload").hide();
                }

            });
          

            function excelExport(e) {
                debugger;
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


                    if ($("#chkSummary")[0].checked == false) {
                        if (i > 5) {
                            e.workbook.sheets[0].rows[0].cells[i].value = e.workbook.sheets[0].rows[0].cells[i].value.replace("_F", " ").replace("PP", "%").replace("AND", "&").replace("DD", ".").replace("On", " ").replace("Sc", "").replace("_", " (").replace("1_C_", "%)").replace("On", " ").replace("Sc", "").replace("ON", " ").replace("SC", "").replace("on", " ").replace("sc", "").replace("F_", " ").replace("FF", "F").replace("B_", "B").replace("TotalSGST", "Total SGST").replace("TotalCGST", "Total CGST");
                        }
                        else
                            e.workbook.sheets[0].rows[0].cells[i].value = e.workbook.sheets[0].rows[0].cells[i].value.replace("_", " ");
                    }
                    else {
                        if (i > 1) {
                            e.workbook.sheets[0].rows[0].cells[i].value = e.workbook.sheets[0].rows[0].cells[i].value.replace("_F", " ").replace("PP", "%").replace("AND", "&").replace("DD", ".").replace("On", " ").replace("Sc", "").replace("_", " (").replace("1_C_", "%)").replace("On", " ").replace("Sc", "").replace("ON", " ").replace("SC", "").replace("on", " ").replace("sc", "").replace("F_", " ").replace("FF", "F").replace("B_", "B").replace("TotalSGST", "Total SGST").replace("TotalCGST", "Total CGST");
                        }
                        else
                            e.workbook.sheets[0].rows[0].cells[i].value = e.workbook.sheets[0].rows[0].cells[i].value.replace("_", " ");
                    }
                    
                }
            }


            function OnGridBound(e) {
                debugger;

                var col = new Array();

                var grid = $("#RptGrid").data("kendoGrid");
                var data = grid.dataSource.data();


                for (var i = 0; i < grid.columns.length; i++) {

                    debugger;
                    if (grid.columns.length > 7)
                        grid.autoFitColumn(i);

                    var ColNm = grid.columns[i].field;

                    if ($("#chkSummary")[0].checked == false) {
                        if (i > 5) {
                            //  dttax.Rows[c]["TAX_NM"].ToString().Trim().Replace(" ", "_F").Replace("%", "PP").Replace("&", "AND").Replace(".", "DD") + "_" + stravra[0].Trim() + "1_C_";
                            var chagcol = grid.columns[i].field.replace("_F", " ").replace("PP", "%").replace("AND", "&").replace("DD", ".").replace("On", " ").replace("Sc", "").replace("_", " (").replace("1_C_", "%)").replace("On", " ").replace("Sc", "").replace("ON", " ").replace("SC", "").replace("on", " ").replace("sc", "").replace("F_", " ").replace("FF", "F").replace("B_", "B").replace("TotalSGST", "Total SGST").replace("TotalCGST", "Total CGST");
                            //.Replace(" ", "_F").Replace("%", "PP").Replace("&", "AND").Replace(".", "DD") + "_" + stravra[0].Trim() + "1_C_"

                            // var chagcol = grid.columns[i].field.replace("_E", " ").replace("C_2", "").replace("C_1", "").replace("_H", "%").replace("C_3", "").replace("C_4", "").replace("C_5", "").replace("C_6", "").replace("_F", " ").replace("_G", "(").replace("1_", " %)").replace("_", " (").replace("(E", " ").replace("_E", " ")
                            // .replace("_B1", "").replace("_B2", "").replace("_B3", "").replace("_B4", "").replace("_B5", "").replace("_B6", "").replace("_B7", "").replace("_B8", "").replace("_B9", "").replace("W", " ");
                        }
                        else
                            var chagcol = grid.columns[i].field.replace("_", " ");
                    }
                    else {
                        if (i > 1) {
                            var chagcol = grid.columns[i].field.replace("_F", " ").replace("PP", "%").replace("AND", "&").replace("DD", ".").replace("On", " ").replace("Sc", "").replace("_", " (").replace("1_C_", "%)").replace("On", " ").replace("Sc", "").replace("ON", " ").replace("SC", "").replace("on", " ").replace("sc", "").replace("F_", " ").replace("FF", "F").replace("B_", "B").replace("TotalSGST", "Total SGST").replace("TotalCGST", "Total CGST");
                            //var chagcol = grid.columns[i].field.replace("_F", " ").replace("PP", "%").replace("AND", "&").replace("DD", ".").replace("on", " ").replace("SC", "").replace("_", " (").replace("1_C_", ")");
                            //var chagcol = grid.columns[i].field.replace("_F", " (").replace("PP", "%").replace("AND", "&").replace("DD", ".").replace("on", " ").replace("SC", "").replace("_", "");
                            //  var chagcol = grid.columns[i].field.replace("_E", " ").replace("C_2", "").replace("C_1", "").replace("_H", "%").replace("C_3", "").replace("C_4", "").replace("C_5", "").replace("C_6", "").replace("_F", " ").replace("_G", "(").replace("1_", " %)").replace("_", " (").replace("(E", " ").replace("_E", " ")
                            // .replace("_B1", "").replace("_B2", "").replace("_B3", "").replace("_B4", "").replace("_B5", "").replace("_B6", "").replace("_B7", "").replace("_B8", "").replace("_B9", "").replace("W", " ");
                        }
                        else
                            var chagcol = grid.columns[i].field.replace("_", " ");
                    }
                    $("#RptGrid th[data-field= " + ColNm + "]").html(chagcol);
                }
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
