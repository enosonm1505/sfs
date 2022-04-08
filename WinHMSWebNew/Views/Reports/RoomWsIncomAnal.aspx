<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<FoAnalysisReports.Models.ClsContribution>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    FOTaxReport
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="FeaturedContent" runat="server">
     <div class="content-wrapper">
    <link href="../../Content/Contribute.css" rel="stylesheet" />

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
    </style>
    <div id="divPage">

        <div class="fulwidth">
            <div style="width: 100%">               
                <div style="width: 5%; float: left; margin-left: 10px;"><div id="divRmTpLbl"></div></div>
                <div style="width: 17%; float: left;">                    
                    <div id="divRoomTp"></div> 
                </div>

                <div style="width: 32%; float: left">
                    <div class="valbx0" style="padding-right:2px;">From</div>
                    <div class="valbx110">                        
                        <div id="divFromMthDate" >                            
                        </div>
                    </div>
                    <div class="valbx0" style="width:20px;padding-right:2px;">To</div>
                    <div class="valbx110" >                        
                        <div id="divToMthDate" >                            
                        </div>
                    </div>

                    <div class="txtbx60" style="padding-top:3px">
                        <input type="button" id="btnDisplay" class="btnButton" value="Display" />
                    </div>                   

                </div>

                <div style="width: 10%; float: left">
                    <div>
                        <span id="spRoomWs">
                            <input type="checkbox" id="chkRoomWs" />Room Wise</span>
                    </div> 
                    <div> 
                        <span id="spRoomTp">
                            <input type="checkbox" id="chkRoomTp" />Room Type</span>
                    </div>                    
                </div>

                <div style="width: 10%; float: left" id="dvPM">
                    <div>
                        <div>
                             <span id="spChkPM">
                            <input type="checkbox" id="chkPM"  />PM</span>
                        </div>                                               
                    </div>                        
                   
                </div>

                <div style="width: 20%; float: left" id="divAnalMn">                 
                    
                    <div style="width: 100%; float: left">
                        <div  style="float: left;">
                            <span id="spOptAnalysis">Analysis</span>
                        </div>
                        <div>
                            <img src="../../Images/search_icon.png" id="btnOptions" style="width: 20px; height: 20px; margin-top: 0px; margin-left: 10px; cursor: pointer;" title=" Search" />
                        </div>
                    </div>                                          
                </div>          
                <div>
                </div>
            </div>
        </div>        

    </div>
        <div class="fulwidth">
            <div id="gridRptt" style="width: 100%; height: 500px"></div>
        </div>

   </div>
    <input type="hidden" id="AlertMessageHdn" />
    <input type="hidden" id="alertType" />
    <input type="hidden" id="Log" />
    <input type="hidden" id="W10_IND" />
    <input type="hidden" id="J15_IND" />
    <input type="hidden" id="COMPID" />
    <input type="hidden" id="CURRENCY_FORMAT" />
    <input type="hidden" id="CURRENCY_DELIMIT" />
    <input type="hidden" id="CURRENCY_DECIMLIMIT" />
    <input type="hidden" id="CHK_REV" VALUE="1"/>
    <input type="hidden" id="CHK_ARR" VALUE="1"/>
    <input type="hidden" id="CHK_RN" VALUE="1"/>
    <input type="hidden" id="CHK_RNWO" VALUE="1"/>

</div>
    <%: Html.Partial("_RptRoomwsOptions") %>
    <%: Html.Partial("_CommonMeaasgeWindow") %>  
  
    <%--     <%: Html.Partial("_MessageWindowSave") %>            
            <%: Html.Partial("_AlertMessageWindow") %><%: Html.Partial("_GstDetlsPopup") %>--%>
    <style>
        .Pagefalse {
            pointer-events: none;
            opacity: 0.6;
        }

        .GrpTot1{color: black; font-weight: Bold; font-family:Arial !important;}

        .GrpTot2{ color: black; font-weight: Bold; font-family: Arial !important; }

        .GrpTotBtm{ background-color:lightgray; color: Brown; font-weight: Bold; font-family: Arial !important; }

        .GrpTotGrnd{ background-color:blue; color: white; font-weight: Bold; font-family: Arial !important; }
        .GndTot{ background-color:blue; color: white; font-weight: Bold; font-family: Arial !important; }
        .HideRow{display:none !important }
    </style>

    <script>           
        
        $(document).ready(function () {
            //debugger;
            $("#LoadDIv").hide();


            $("#Excel").click(function () {
                var FullData = $$("gridRpt").serialize();
                var len = FullData.length;
                if (len > 0) {
                    webix.toExcel($$("gridRpt"), {
                        filename: "Room wise Income Analysis",
                        styles: true,
                        name: "Room wise Income Analysis",
                        docHeader: "Room wise Income Analysis",
                        rawValues: true,
                    });
                }
                else {
                    alert("Records not present in Report");
                }
            });
            $("#Print").click(function () {
                var FullData = $$("gridRpt").serialize();
                var len = FullData.length;
                if (len > 0) {
                    webix.print($$("gridRpt"), {
                        docHeader: { text: "Sales Person Realization", fontSize: 25 },
                        fit: "page",
                        scroll: false,
                        mode: "landscape"
                    });
                }
                else {
                    alert("Records not present in Report");
                }
            });

           
            webix.ready(function () {
                GridDesign();
                webix.ui({ container: "divRmTpLbl", view: "label", id: "RoomTyLbl", label: "Room Type", });
                webix.ui({ container: "divRoomTp", view: "richselect", id: "ddlRoomTp", on: { onChange: function () { $$("gridRpt").clearAll(); } } });

                webix.ui({ container: "divFromMthDate", view: "datepicker", name: "FromMthDate", id: "FromMthDate", format: "%M %Y", type: "month", stringResult: true, on: { onChange: function () { $$("gridRpt").clearAll(); } } });
                webix.ui({ container: "divToMthDate", view: "datepicker", name: "ToMthDate", id: "ToMthDate", format: "%M %Y", type: "month", stringResult: true,  on: { onChange: function () { $$("gridRpt").clearAll(); } } });
                        


                webix.ui({
                    container: "divPropbox",
                    view: "richselect",
                    id: "Property",
                    //width: 220,
                    //autowidth:true,
                    options: LoadCompany(),
                    on: {
                        onChange: function (NewVal, OldVal) {
                            if (NewVal != "") {
                                debugger;
                                $$("gridRpt").clearAll();
                                LoadCompChange(NewVal);
                                LoadControl(NewVal);
                                LoadCurrDet(NewVal);
                                fnLoadRoomType();                                

                            }
                        }
                    }

                });             

                var cmpid = '<%=Session["COMPIDD"]%>';
                $$("Property").setValue(cmpid);

                LoadDate();
                $$("chkRev").setValue(1);
                $$("chkARR").setValue(1);
                $$("chkNtWComp").setValue(1);
                $$("chkNtWoutComp").setValue(1);                

                $("#CHK_REV").val("1");
                $("#CHK_ARR").val("1");
                $("#CHK_RN").val("1");
                $("CHK_RNWO").val("1");

            });


        });

        

        function LoadDate() {

            $.ajax({
                type: "POST",
                url: "/Reports/GetFrmMnthToMnth",
                cache: false,
                async: false,
                charset: 'utf-8',
                data: "",
                success: function (data) {
                    //debugger;
                    var data1 = JSON.parse(data.v);

                    var vFromDt = data1[0].FRMMNTH.toString().trim();
                    var vToDt = data1[0].TOMNTH.toString().trim();
                    $$("FromMthDate").setValue(vFromDt);
                    $$("ToMthDate").setValue(vToDt);

                },
            });

        }       

        function LoadCompany() {
            //debugger;
            var rowData = [];            
            try {
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "/Reports/fnLoadProperty",
                    data: "",
                    success: function (d) {
                        debugger;
                        if (d != "") {                           
                            rowData = JSON.parse(d);
                        }
                    },

                });
            }
            catch (e) {
                console.log(e.message)
            }
            return rowData;
        };


        function fnLoadRoomType() {
            //debugger;
            var rowData = [];
            var W10_IND = $("#W10_IND").val();
            var CHKPM = "0";
            var vCmpId = $$("Property").getValue();

            if ($("#chkPM")[0].checked == true) CHKPM = "1";
            if (W10_IND == "") W10_IND = "0";
            try {
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "/Reports/fnLoadRoomType",                   
                    data: "CmpId=" + vCmpId + "&W10_IND=" + W10_IND + "&CHKPM=" + CHKPM,
                    success: function (d) {
                        rowData = JSON.parse(d);

                        $$("ddlRoomTp").define("options", rowData);
                        $$("ddlRoomTp").setValue("<-ALL->");
                    }
                });
            }
            catch (e) {
                console.log(e.message)
            }
            //return rowData;
        };

        

        function LoadCompChange(vProperty) {
            //debugger;
            try {
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "/Reports/PeopertySessionReAssign",
                    data: "PropertyId=" + vProperty,
                    success: function (d) {
                        return true;
                    }
                });

                $.ajax({
                    async: false,
                    type: "POST",
                    url: "/Reports/GetCurrFormatDetails",
                    data: "CmpId=" + vProperty,
                    success: function (d) {
                        return true;
                    }
                });

            }
            catch (e) {
                console.log(e.message)
            }
        };

        function LoadCurrDet(vProperty) {
            //debugger;
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
                            $("#CURRENCY_FORMAT").val(rowDatad.CURRENCY_DECIMLIMIT);
                            $("#CURRENCY_DELIMIT").val(rowDatad.CURRENCY_DELIMIT);
                            $("#CURRENCY_DECIMLIMIT").val(rowDatad.CURRENCY_DECIMLIMIT);
                        }                       
                    }
                });

            }
            catch (e) {
                console.log(e.message)
            }
        };

        function LoadControl(vProperty) {
            //debugger;
            var rowDatad = [];
            try {
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "/Reports/LoadFoControl",
                    data: "CmpId=" + vProperty,
                    success: function (d) {
                        //debugger;
                        if (d != "") {
                            rowDatad = JSON.parse(d);
                            var W10_IND = rowDatad.W10_IND;
                            var J15_IND = rowDatad.J15_IND;

                            $("#W10_IND").val(W10_IND);
                            $("#J15_IND").val(J15_IND);

                            if (W10_IND == "1") {
                                $("#dvPM").show();
                                $("#chkPM")[0].checked = true;
                            }
                            else $("#dvPM").hide();
                        }
                    }
                });
            }
            catch (e) {
                console.log(e.message)
            }
        };



        function GridDesign() {
            webix.ui({
                id: "gridRpt",
                container: "gridRptt",
                select: 'row',
                view: "treetable",
                fixedRowHeight: false,
                rowLineHeight: 23,
                autoConfig: true,
                resizeColumn: true,
                resizeRow: true,
                height: 500,
                minWidth:900,
                css: "webix_header_border",
                data: [],
                columns: [
                        { id: "ROOM_TY_NM", header: { text: "Type", }, width: 100 },
                        { id: "ANALBY", header: { text: "", }, width: 250,  },
                        { id: "ROOM_NO", header: { text: "Room No" }, width: 100, hidden: true, },                       

                        { id: "ROOM_TY_ID", hidden: true },
                        { id: "ANALID", hidden: true },                        
                ],

                scheme: {
                    $change: function (item) {                        
                        if (item.CLR != "" && item.CLR != null) {
                            debugger;
                            if (item.CLR == "HideRow") item.hidden = true;
                            else item.$css = item.CLR;
                        }                            

                    },
                },

                on: {

                    onBeforeClose: function () {
                        return false;

                    },

                },
            });
        };


        function CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal) {
            //debugger;

            if (value == null) return "";

            if (value.toString() != "") {

                <%--var Currfrmt = '<%=Session["CURRENCY_FORMAT"]%>';
                var CurrDelimit = '<%=Session["CURRENCY_DELIMIT"]%>';
                var CurrDecimal = '<%=Session["CURRENCY_DECIMLIMIT"]%>';--%>


                if (Currfrmt == "L") {
                    var x = parseFloat(value).toFixed(CurrDecimal);
                    var neg = false;
                    if (value < 0) {
                        neg = true;
                        //x = math.abs(x);
                    }

                    x = x.toString();
                    var afterPoint = '';
                    if (x.indexOf('.') > 0) {
                        afterPoint = x.substring(x.indexOf('.') + 1, x.length);
                        afterPoint = CurrDelimit + afterPoint
                    }



                    x = Math.floor(x);
                    x = x.toString();
                    var lastThree = x.substring(x.length - 3);
                    var otherNumbers = x.substring(0, x.length - 3);
                    if (otherNumbers != '' && otherNumbers != '-')
                        lastThree = ',' + lastThree;
                    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
                }
                else {
                    var x = parseFloat(value).toFixed(CurrDecimal);
                    var neg = false;
                    if (value < 0) {
                        neg = true;
                        //x = math.abs(x);
                    }

                    x = x.toString();

                    //var res = x.replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,")  //+ afterPoint;
                    //var res = x.replace(/(\d{3})/g, "1,")
                    var res = x.replace(/\B(?=(\d{3})+(?!\d))/g,",")

                    if (res.indexOf('.') > 0) {

                        res = res.replace(".", CurrDelimit)
                    }


                    return res;
                }
            }
            else {
                return value;
            }
        }
       
         
    </script>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="MainContent" runat="server">
    <input type="hidden" id="hdnRevpar" /><input type="hidden" id="hdnRevpor" />
    <%: Html.Partial("_HeaderMenuFoMaster") %>
   <%--  <%@ Register Src="~/FO/FOMasterSMLOC.ascx" TagName="MENUFO" TagPrefix="MN" %>
        <div><MN:MENUFO ID="Menu" runat="server"></MN:MENUFO></div>--%>

    <div class="TopHdr" style="margin-top:30px;">
       
        <%using (Html.BeginForm("FOTaxReport", "Reports", FormMethod.Post, new { enctype = "multipart/form-data" }))
          {%>
        <div class="TextWidth" style="margin-left: 250px;margin-top:5px;" id="divPropbox">
            <%--<%:Html.Kendo().DropDownList()
                       .Name("Property")                
                       .DataTextField("Text")
                       .DataValueField("Value")
                       .HtmlAttributes(new {Style="width:220px; height:25px; z-index:1"})
                                                     .DataSource(source => { source.Read(read => { read.Action("PropertyNM", "TravelAgentBlock"); }); })
                            %>  --%>   
                    <%--   .HtmlAttributes(new { onchange = "this.form.submit()",Style="width:220px; height:25px; z-index:1"})
                                                   .DataSource(source => { source.Read(read => { read.Action("PropertyNM", "TravelAgentBlock"); }); })%>--%>
        </div>
        <%} %>
        <div class="TopHdrMod">
            <label style="color: black; font-weight: bold">Room wise Income Analysis </label>
        </div>
        <div class="HdrBtnBx">

            <%= Html.Kendo().Button()
                .Name("Print")    
                .HtmlAttributes(new { id="Print",  Style="color:black; width:60px; height:22px; margin-left:5px; margin-top:0px;"  })               
                .Content("Print")%>
           <%= Html.Kendo().Button()
                .Name("Excel")    
                .HtmlAttributes(new { id="Excel", Style="color:black; width:60px; height:22px; margin-left:5px; margin-top:0px;"  })               
                .Content("Excel")%>
           <%-- <%= Html.Kendo().Button()
                    .Name("Refresh")
                    .HtmlAttributes( new {id="Refresh", @class="printACBook"})               
                    .Content("Refresh")%>--%>
        </div>
    </div>

    <script type="text/javascript">
        function sidebarFn(val) {
            //debugger;
            //var rowDatad = $$("gridRpt").serialize();

            //if ($$("gridRpt"))
            //    $$("gridRpt").destructor();

            //if ($("#chkRoomWs")[0].checked == true) {
            //    GridDesign();
            //    $$("gridRpt").hideColumn("ANALBY", true);
            //    $$("gridRpt").showColumn("ROOM_NO", true);
            //}
            //if ($("#chkRoomTp")[0].checked == true) {
            //    GridDesign();
            //    $$("gridRpt").showColumn("ANALBY", true);
            //    $$("gridRpt").hideColumn("ROOM_NO", true);

            //}
            //$("#btnDisplay").click();
            //$$("gridRpt").clearAll();
            //$$("gridRpt").parse(rowDatad);
            //$$("gridRpt").show();
            $$("gridRpt").resize();
        }
        
        $(document).ready(function () {
            debugger;
            $("#divPage").removeClass("Pagefalse");            
            $("#LoadDIv").hide();            

            var propchk = '<%=Session["MLTPROPHISHIND"]%>';
            if (propchk == "1") $("#divPropbox").show();
            else if (propchk == "0") $("#divPropbox").hide();
            var compid = '<%=Session["COMPIDD"]%>';
            
            
            var pageMethod = '<%=Session["PageMethod"]%>';
            <%--var W10_IND = '<%=Session["W10_IND"]%>';
            var J15_IND = '<%=Session["J15_IND"]%>';  --%>          

            var text = "";

            $("#chkRoomTp")[0].checked = true;
            $("#divAnalMn").show();

            //if (W10_IND == "1") {
            //    $("#chkPM").show();
            //    $("#chkPM")[0].checked = true;
            //}
            //else $("#chkPM").hide();            
        });

            $("#btnOptions").click(function () {                
                debugger;
                var CHKREV = $("#CHK_REV").val();
                var CHKARR = $("#CHK_ARR").val();
                var CHKRN = $("#CHK_RN").val();
                var CHKRNWO = $("#CHK_RNWO").val();

                if (CHKREV == "1") $$("chkRev").setValue(1);
                else $$("chkRev").setValue(0);

                if (CHKARR == "1") $$("chkARR").setValue(1);
                else $$("chkARR").setValue(0);

                if (CHKRN=="1") $$("chkNtWComp").setValue(1);
                else $$("chkNtWComp").setValue(0);

                if (CHKRNWO == "1") $$("chkNtWoutComp").setValue(1);
                else $$("chkNtWoutComp").setValue(0);

                $$("RmwsIncomAnalOpt").show();

            });

           
            $("#btnDisplay").click(function () {
                debugger;
                $("#LoadDIv").show();
                var frmdate = "";
                var todate = "";                
                var PrcType = "";
                var CHKPM = "";
                var RmTp = "";
                var CHKREV = "";
                var CHKARR = "";
                var CHKRN = "";
                var CHKRNWO = "";
                

                var frmdate = $$("FromMthDate").getValue();
                var todate = $$("ToMthDate").getValue()

                

                if (frmdate == ""){
                    webix.message("From Date can't be empty","warning",500);
                    $("#LoadDIv").hide();
                    return;
                }

                    
                if (todate == "") {
                    webix.message("To Date can't be empty", "warning", 500);
                    $("#LoadDIv").hide();
                    return;
                }

                //var Format = webix.Date.dateToStr("%d/%m/%Y")
                //frmdate = Format(frmdate);
                //todate = Format(todate);

                frmdate = formatDate(frmdate);
                todate = formatDate(todate);  
                var bSucc="1";
                
                $.ajax({
                    type: "POST",
                    url: "/Reports/FTDateValidation",
                    cache: false,
                    charset: 'utf-8',
                    data: "F=" + frmdate + "&T=" + todate,
                    success: function (data) {
                        if (data.d != "") {
                            debugger;
                            webix.message("From Month Should be less than To Month ","warning", 500); 
                            $("#LoadDIv").hide();
                            bSucc="0";
                        }
                    }
                });
                
                if (bSucc=="0") return;                
                var comp = $$("Property").getValue();
                RmTp = $$("ddlRoomTp").getValue();

                if (comp == "") {
                    webix.message("Property can't be empty", "warning", 500);
                    $("#LoadDIv").hide();
                    return;
                }

                if (RmTp == "") {
                    webix.message("Room Type can't be empty", "warning", 500);
                    $("#LoadDIv").hide();
                    return;
                }


                if ($("#chkRoomTp")[0].checked == true) {
                    PrcType = "1";
                    
                    CHKREV = $("#CHK_REV").val();
                    CHKARR = $("#CHK_ARR").val();
                    CHKRN = $("#CHK_RN").val();
                    CHKRNWO = $("#CHK_RNWO").val();


                    if (CHKREV == "" && CHKARR == "" && CHKRN == "" && CHKRNWO == "") {
                        webix.message("Select atleast one Analysis By", "warning", 500);
                        $("#LoadDIv").hide();
                        return;
                    }

                }
                else
                    PrcType = "2";
                

                if ($("#chkPM")[0].checked == true) {
                    CHKPM = "1";
                }
                else
                    CHKPM = "0";

                
                if (RmTp == "<-ALL->") RmTp = "";

                var param = JSON.stringify({
                    comp: comp, frmdate: frmdate, todate: todate, PrcType: PrcType, CHKPM: CHKPM, RMTP: RmTp, CHKREV: CHKREV, CHKARR: CHKARR, CHKRN: CHKRN, CHKRNWO: CHKRNWO
                });                

                var Currfrmt = $("#CURRENCY_FORMAT").val();
                var CurrDelimit = $("#CURRENCY_DELIMIT").val();
                var CurrDecimal = $("#CURRENCY_DECIMLIMIT").val();

                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    accepts: "application/json",
                    dataType: "json",
                    url: "/Reports/RptRoomwsIncomAnal",
                    cache: false,
                    async: true,
                    charset: 'utf-8',
                    data: param,
                    success: function (data) {
                        //debugger;
                        if (data != "") {
                            var rowDatad = JSON.parse(data);
                            $$("gridRpt").clearAll();
                            //$$("gridRpt").destructor();
                            //GridDesign();                            
                            var vColumn = $$("gridRpt").config.columns;
                            vColumn.splice(2, vColumn.length);
                            $$("gridRpt").refreshColumns();


                            $.each(rowDatad.GridCol, function (key, value) {
                                //debugger;
                                var Hdr = value.MNTH_ID.toString().replace("_", " ");
                                var vCss = "";

                                var vWidth = 100;

                                var set = {
                                    id: $.trim(value.MNTH_ID), header: { text: Hdr, }, width: vWidth, css: { 'text-align': 'right ! important' },
                                    //format: function (value) {                                    
                                        
                                    //      return CurrFormat(value);                                        
                                    //},

                                    template:function(obj,common,value,config)
                                    {
                                        //debugger;
                                        if (PrcType == "1")
                                        {
                                            if (obj.ANALID == "ARR" || obj.ANALID == "R") {
                                                return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);
                                            }
                                            else return value;
                                        }
                                        else return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);

                                    },
                                        

                                    exportType: "number",
                                    exportFormat: "#,##0.00",
                                    //adjust:"data"                                
                                };
                                vColumn.push(set);
                            });

                            var set = {
                                id: "Total", header: "Total", css: { 'text-align': 'right ! important' },
                                //format: function (value) {                                   
                                        
                                //    return CurrFormat(value);                                        
                                //},
                                //exportType: "number",
                                //exportFormat: "#,##0.00",

                                template: function (obj, common, value, config) {
                                    //debugger;
                                    
                                    if (PrcType == "1") {
                                        if (obj.ANALID == "ARR" || obj.ANALID == "R") {
                                            return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);
                                        }
                                        else return value;
                                    }
                                    else return CurrFormat(value, Currfrmt, CurrDelimit, CurrDecimal);

                                },


                                exportType: "number",
                                exportFormat: "#,##0.00",
                                    
                                
                            };
                            vColumn.push(set);
                            var set = {
                                id: "CLR", hidden: true
                            };
                            vColumn.push(set);                            
                            $$("gridRpt").refreshColumns();

                            $$("gridRpt").parse(rowDatad.GridOpp);

                        }                       

                    },
                    error: function (err) {
                        $("#LoadDIv").hide();                        
                    },
                    complete: function () {
                        debugger;
                        $("#LoadDIv").hide();
                    }
                });
            })          

                       
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

            $("#chkRoomWs").click(function () {
                $$("gridRpt").clearAll();
                $$("gridRpt").hideColumn("ANALBY", true);
                $$("gridRpt").showColumn("ROOM_NO", true);
                if ($("#chkRoomWs")[0].checked == true) {
                    $("#divAnalMn").hide();
                    if ($("#chkRoomTp")[0].checked == true) {
                        $("#chkRoomTp")[0].checked = false;
                    }
                }
                else {                    
                    if ($("#chkRoomTp")[0].checked == false) {
                        $("#chkRoomWs")[0].checked = true;
                        $("#divAnalMn").hide();
                    }
                }

            });


            $("#chkRoomTp").click(function () {
                $$("gridRpt").clearAll();               
                $$("gridRpt").showColumn("ANALBY", true);
                $$("gridRpt").hideColumn("ROOM_NO", true);
                if ($("#chkRoomTp")[0].checked == true) {
                    $("#divAnalMn").show();
                    if ($("#chkRoomWs")[0].checked == true) {
                        $("#chkRoomWs")[0].checked = false;
                    }
                }
                else {

                    if ($("#chkRoomWs")[0].checked == false) {
                        $("#divAnalMn").show();
                        $("#chkRoomTp")[0].checked = true;
                    }
                }

            });
            
            

            function AlertMesaageDate() {
                var window = $("#CommonAlert");
                var kWnd = window.data("kendoWindow");
                kWnd.center().open();
            }
            function SMToDateChange(e) {
                //debugger;

                var From = $$("FromDate").getValue();
                var To = $$("ToDate").getValue()

                if (From == "") return false;
                if (To == "") return false;                          
                
                From = formatDate(From);
                To = formatDate(To);


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

            function formatDate(StrDt) {
                //debugger;
                var Parts = StrDt.split(" ");
                var MN = FnRetMonth(Parts[0]);
                var YR = Parts[1];                
                var Str = "01" + "/" + MN + "/" + YR;
                return Str;
            }

            function FnRetMonth(StrMnNm) {
                //debugger;
                var UStr=StrMnNm.toUpperCase();
                var str = "";

                switch (UStr) {
                    case "JAN": str = "01"; break;
                    case "FEB": str = "02"; break;
                    case "MAR": str = "03"; break;
                    case "APR": str = "04"; break;
                    case "MAY": str = "05"; break;
                    case "JUN": str = "06"; break;
                    case "JUL": str = "07"; break;
                    case "AUG": str = "08"; break;
                    case "SEP": str = "09"; break;
                    case "OCT": str = "10"; break;
                    case "NOV": str = "11"; break;
                    case "DEC": str = "12"; break;
                }       
                
                return str;
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

          
            
             
       


        ////$("#Property").change(function (e) {
        ////    debugger;
        ////    var PropertyId = $("#Property").val();
        ////    var countrydrop = $("#Property").data('kendoDropDownList');
        ////    $.ajax({
        ////        type: "POST",
        ////        url: "/Reports/PeopertySessionReAssign",
        ////        data: "PropertyId=" + PropertyId,
        ////        success: function (data) {
        ////            if (data != null && data != "" && data != undefined) {
        ////                $("#btnDisplay").click();
        ////                //this.form.submit();
        ////            }
        ////        }
        ////    });

        ////});
        ////function sessionReassign() {
        ////    var PropertyId = $("#Property").val();
        ////    var countrydrop = $("#Property").data('kendoDropDownList');
        ////    $.ajax({
        ////        type: "POST",
        ////        url: "/Reports/PeopertySessionReAssign",
        ////        data: "PropertyId=" + PropertyId,
        ////        success: function (data) {
        ////            if (data != null && data != "" && data != undefined) {
        ////                // $("#btnDisplay").click();
        ////                //this.form.submit();
        ////            }
        ////        }
        ////    });
        ////}

    </script>
</asp:Content>
