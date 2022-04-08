<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<FoAnalysisReports.Models.ClsContribution>" %>
 <% Html.Kendo().Window().Name("LocalSearch")
    .Title("Revenue Search")
    .Visible(false)
    .Modal(true)
    .Draggable(false)
    .Width(400)
    .Height(515)   
    .Content(() =>
                    { %>

             <div style="width:50%; float:left; margin-top:5px;">
                <%: Html.Kendo().Grid<FoAnalysisReports.Models.TravelAgentBlkcls>()
        .Name("LocationSeacrh_grid")      
        .Columns(columns =>
        {
            columns.Bound(x => x.TAX_ID).Hidden();
            columns.Bound(x => x.REVENUE_ID).Hidden();
            columns.Bound(x => x.TAX_SHRT_NM).Width(100).Title("Revenue Name").HeaderHtmlAttributes(new { style = "text-align:center" }).Filterable(ftb => ftb.Cell(cell => cell.Operator("contains").ShowOperators(false)));
            columns.Template(x => x.Select).ClientTemplate("<input type='checkbox' #=Select?  checked='checked':''#  id='chkbx' />").Title("Active")
        .Width(25)
        .HtmlAttributes(new { style = "text-align:center; height:0px;" }).HeaderHtmlAttributes(new { Style = "text-align:center;" });
            columns.Bound(x => x.REVENUE_ID).Hidden();
            columns.Bound(x => x.Select1).Hidden();              
               })        
                .HtmlAttributes(new { style = "height:430px; width:380px;" })          
                .Scrollable(scrollable => scrollable.Height(365).Virtual(true))
                .Sortable()  
                .Selectable(selectable => selectable
                .Mode(GridSelectionMode.Single)
                .Type(GridSelectionType.Row)) 
                .Navigatable()    
                .Filterable(ftb => ftb.Mode(GridFilterMode.Row))
                .DataSource(dataSource => dataSource
                .Ajax()     
                .ServerOperation(false)              
                .Read(read => read.Action("TaxRepotChargeGustrm", "Reports"))
                .PageSize(500)
                .Events(events => events.Error("error_handler"))
                .Model(model =>
                {
                    model.Id(p => p.TAX_ID);                       
                })            
                )%>
            </div>

<div  style="float:left; width:100%">
    <div style="float:left; margin-left:10px; margin-top:15px;">
         <div style="flex-align:center">
    <input type="radio" name="Radio" value="All" id="ChkAllDA_ass"  data-bind="checked: radioValue"  />Select All
             </br>
             <input type="radio" name="Radio" value="All" id="ClearAllDA_Ass"  data-bind="checked: radioValue"  />Clear All
              </div>
    </div>
    <div style=" float:right; margin-right:20px; margin-top:10px;">
            <%= Html.Kendo().Button()
            .Name("OkLocal")
            .Tag("a")  
            .HtmlAttributes(new { id="OkLocal", Style="color:black; width:60px;"  })
            .Content("Ok")%>
            <%= Html.Kendo().Button()
            .Name("CanLocal")
            .Tag("a")   
            .HtmlAttributes(new { id="CanLocal", Style="color:black; width:65px; margin-left:0px"  })
            .Content("Cancel")%>      
         </div>
</div>

   

<script type="text/javascript">
    $(window).load(function (e) {
        debugger;
        var wind_mode = [<%=Session["LOC_WNDW"]%>];
        if (wind_mode.length) {
            var grid = $("#LocationSeacrh_grid").data("kendoGrid");
            try {
                debugger;
                if (wind_mode[0][0] !== undefined) {
                    var lod_id = wind_mode[0][0];
                    var select_all = wind_mode[0][1];
                    var select_clear = wind_mode[0][2];
                    $("#Locationhdn_id").text(lod_id);
                    (select_all == "True") ? ($("#ChkAllDA_ass").prop("checked", true)) : ($("#ChkAllDA_ass").prop("checked", false));
                    (select_clear == "True") ? ($("#ClearAllDA_Ass").prop("checked", true)) : ($("#ClearAllDA_Ass").prop("checked", false));

                    var spltlod = lod_id.split(",");
                    var dataSource = grid.dataSource;
                    var total = grid.dataSource.data().length;
                    debugger;
                    if (total != 0) {
                        var no = (total - 1);
                        var item = 0;
                        for (var i = 0; spltlod.length > i; i++) {
                            var split_agin = spltlod[i].split("'");
                            for (; item < total; item++) {
                                if (grid.dataSource._data[item].Locationid == split_agin[1]) {
                                    debugger;
                                    grid.dataSource._data[item].Select = true;
                                    grid.dataSource._data[item].Select1 = true;
                                }
                            }
                            $("#LocationSeacrh_grid").data("kendoGrid").refresh();
                        }
                    }
                }
            }
            catch (errorMesg) {
                console.log(errorMesg);
            }
        }
    });


    $("#LocationSeacrh_grid table").on("change", "td", function (e) {
        debugger;
        var grid = $("#LocationSeacrh_grid").data("kendoGrid");
        var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;
        var no = rowIndex;
        document.getElementById("chkbx");
        var dataSource = grid.dataSource;
        if (grid._current[0].childNodes[0].checked == true) {
            grid.dataSource._data[no].Select = true;
        }
        else if (grid._current[0].childNodes[0].checked == false) {
            grid.dataSource._data[no].Select = false;
        }
    });

    $("#CanLocal").click(function () {
        var window = $("#LocalSearch");
        var kWnd = window.data("kendoWindow");
        kWnd.close();
    })

    $("#OkLocal").click(function (e) {
        debugger;
        var grid = $("#LocationSeacrh_grid").data("kendoGrid");
        var dataSource = grid.dataSource;
        var total = grid.dataSource.data().length;
        //window.filter = "";

        var Id = "";
        var Value = "";
        if (total != 0) {
            var no = (total - 1);
            var item = 0;
            for (; item < total; item++) {
                if (grid.dataSource._data[item].Select == true) {
                    var Location = grid.dataSource._data[item].TAX_ID;
                    var Locationid = grid.dataSource._data[item].TAX_ID;

                    if (Value == "") {
                        Value = Locationid;
                    }
                    else {
                        Value = Value + "," + Locationid;
                    }

                    if (Id == "") {
                        Id = "'" + Locationid + "'";
                    }
                    else {
                        Id = Id + "," + "'" + Locationid + "'";
                    }
                }
            }
            filter = Id;
        }

        if (Id != "") {
            console.log(Id);
            //$("#Locationhdn_id").text(Id);
            locationid = Id;
            var Pop_window = new Array();
            Pop_window[0] = $("#Locationhdn_id").text();
            Pop_window[1] = $("#ChkAllDA_ass")[0].checked;
            Pop_window[2] = $("#ClearAllDA_Ass")[0].checked;
            localStorage.setItem("location_wndw", JSON.stringify(Pop_window));

            var window = $("#LocalSearch");
            var kWnd = window.data("kendoWindow");
            kWnd.close();
        }
        else {
            var window = $("#LocalSearch");
            var kWnd = window.data("kendoWindow");
            kWnd.close();
        }

    })

    $("#ChkAllDA_ass").click(function () {
        var grid = $("#LocationSeacrh_grid").data("kendoGrid");
        if (this.checked) {
            debugger;
            $("#LocationSeacrh_grid tbody tr input:checkbox").attr("checked", true);
            var total = grid.dataSource.data().length;
            if (total != 0) {
                var no = (total - 1);
                var item = 0;
                for (; item < total; item++) {
                    grid.dataSource._data[item].Select = true;
                }
            }
        }
        // grid.refresh();
    });

    $("#ClearAllDA_Ass").click(function () {
        var grid = $("#LocationSeacrh_grid").data("kendoGrid");
        if (this.checked) {
            $("#LocationSeacrh_grid tbody tr input:checkbox").attr("checked", false);
            var total = grid.dataSource.data().length;
            if (total != 0) {
                var no = (total - 1);
                var item = 0;
                for (; item < total; item++) {
                    grid.dataSource._data[item].Select = false;
                }
            }
        }
        grid.refresh();
    });


</script>

<script>
    function error_handler(e) {
        if (e.errors) {
            var message = "Errors:\n";
            $.each(e.errors, function (key, value) {
                if ('errors' in value) {
                    $.each(value.errors, function () {
                        message += this + "\n";
                    });
                }
            });
            alert(message);
        }
    }
</script>

           <% }).Render();%>
