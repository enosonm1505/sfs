<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<FoAnalysisReports.Models.ClsContribution>" %>

 <script>
     $(document).ready(function () {
         webix.ui({
             view: "window",
             close: true,
             modal: true,
             id: "RptRoomTpSrchPopUp",
             head: "Room Type Search",
             position: "center",
             css: "WebIxStyle",
             height: 500,
             width: 383,
             move: true,
             body: {
                 rows: [
                    {
                        view: "datatable",
                        id: "RoomTpgrid",
                        select: 'row',
                        //editable: true,
                        css: "webix_header_border",
                        scrollX: false,
                        columns: [
                                { id: "NM", header: ['Room Type', { content: "textFilter", }], width: 335, css: { 'text-align': 'left ! important' }, },
                                { id: "SorceChk", editor: "Checkbox", header: [{ content: "masterCheckbox", checked: "on", css: { 'padding': '0px ! important' } }], width: 30, css: "check_box", template: "{common.checkbox()}" },
                                { id: "ID", hidden: true },
                        ],
                        data: [],

                    },
                 {
                     margin: 10,
                     padding: { top: 5, bottom: 5, right: 5 },
                     cols: [
                         {
                             view: "button",
                             //type: "icon",
                             //icon: "wxi-check",
                             label: "Ok",
                             inputWidth: 60,
                             css: "webix_primary",
                             click: function () {
                                 
                                 var vSourceNm = "";
                                 var vSourceId = "";

                                 $$("RoomTpgrid").data.each(function (obj) {
                                     debugger;
                                     if (obj.SorceChk) {
                                         if (vSourceNm != "") {
                                             vSourceNm = vSourceNm + "," + obj.NM
                                         }
                                         else {
                                             vSourceNm = obj.NM
                                         }

                                         if (vSourceId != "") {
                                             vSourceId = vSourceId + ",'" + obj.ID + "'"
                                         }
                                         else {
                                             vSourceId = "'" + obj.ID + "'"
                                         }
                                     }
                                 });

                                 

                                 if (vSourceId != "") {                                     
                                     $("#RoomTyId").val(vSourceId);
                                     $$("RptRoomTpSrchPopUp").hide();
                                     fnHeader();
                                 }                    

                                 else {
                                        //$("#AlertMessageHdn").val("Pelase Select any One. ");
                                        //$("#alertType").val('fail');
                                        //AlertMesaage();
                                        webix.alert({ text: "Pelase Select any One. ", type: "alert-warning" });
                                    }

                             },
                             align: "right"
                         }
                     ]
                 }],
             }
         });

     });
</script>
<style>

/*.animated {
        -webkit-animation-duration: 1s;
        animation-duration: 0.4s!important;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }*/

</style>
<script type="text/javascript">
    //debugger;

    function fnLoadRoomTpPop(vCmpId, CHKPM, W10_IND) {
        debugger;
        $$("RoomTpgrid").clearAll();
        var rowDatad = "";
        
        $.ajax({
            type: "POST",
            async: false,
            url: "/Reports/fnLoadRoomTypeAll",
            data: "CmpId=" + vCmpId + "&W10_IND=" + W10_IND + "&CHKPM=" + CHKPM + "&RMTYID=" + "",            
            

            success: function (d) {
                //debugger;
                if (d != "") {
                    rowDatad = JSON.parse(d);

                    var Sa = rowDatad;
                    var Rows = [];

                    $.each(Sa, function (key, value) {
                        var set = {};
                        set = { NM: value.value, SorceChk: true, ID: value.id };
                        Rows.push(set);
                    });
                    $$("RoomTpgrid").getColumnConfig("SorceChk").header[0].checked = true;
                    $$("RoomTpgrid").refreshColumns();

                    $$("RoomTpgrid").parse(Rows);
                    $$("RoomTpgrid").refresh();

                }
            }
        });
    }
</script>

<%--<% Html.Kendo().Window().Name("RptSourceSearchPopUp")
    .Title("Source")
    .Visible(false)
    .Modal(true)
    .Draggable(false)
    .Width(300)
    .Height(400)
    .Content(() =>
        { %>

             <div style="width:100%; float:left; margin-top:5px;">
                <%: Html.Kendo().Grid<SalesAndMarketing.Models.SalesMarketing>()
        .Name("SourceSearchgrid")      
        .Columns(columns =>
        {
            columns.Bound(x => x.Source).Width(100).Title("Source").HeaderHtmlAttributes(new { style = "text-align:center" }).Filterable(ftb => ftb.Cell(cell => cell.Operator("contains").ShowOperators(false)));
            columns.Template(x => x.Select).ClientTemplate("<input type='checkbox'  #=Select1?  checked='checked':''#  name='chklevel'  id='chkbx' />").Title("Active")
           .Width(25)
           .HtmlAttributes(new { style = "text-align:center; height:0px;" }).HeaderHtmlAttributes(new { Style = "text-align:center;" });
            columns.Bound(x => x.Sourceid).Hidden();
            columns.Bound(x => x.ID).Hidden();
            columns.Bound(x => x.Select1).Hidden();          
               })
                .HtmlAttributes(new { style = "height:315px; width:270px;" })          
                .Scrollable(scrollable => scrollable.Height(245).Virtual(false))
                .Sortable()  
                .Selectable(selectable => selectable
                .Mode(GridSelectionMode.Single)
                .Type(GridSelectionType.Row)) 
                .Navigatable()    
                .Filterable(ftb => ftb.Mode(GridFilterMode.Row))                
                .DataSource(dataSource => dataSource
                .Ajax()                                  
                .Read(read => read.Action("SourceGridLoad", "SalesAndMarket"))
                .PageSize(500)
                .Events(events => events.Error("error_handler"))
                .Model(model =>
                {
                model.Id(p => p.ID);                       
                })            
                )%>
            </div>

<div  style="float:left; width:100%">
    <div style="float:left; margin-left:10px; margin-top:15px;">
         <div style="flex-align:center">
    <input type="radio" name="Radio" value="All" id="ChkAllStatus" checked="checked"  data-bind="checked:radioValue"  />Select All
             </br>
             <input type="radio" name="Radio" value="All" id="ClearAllStatus"  data-bind="checked:radioValue"  />Clear All
              </div>
    </div>
    <div style=" float:right; margin-right:20px; margin-top:10px;">
            <%= Html.Kendo().Button()
            .Name("OkSource")
            .Tag("a")  
            .HtmlAttributes(new { id="OkSource", Style="color:black; width:60px;"  })
            .Content("Ok")%>
            <%= Html.Kendo().Button()
            .Name("CancelSource")
            .Tag("a")   
            .HtmlAttributes(new { id="CancelSource", Style="color:black; width:65px; margin-left:0px"  })
            .Content("Cancel")%>      
         </div>
</div>

   

<script type="text/javascript">

    $("#SourceSearchgrid table").on("change", "td", function (e) {
        var grid = $("#SourceSearchgrid").data("kendoGrid");
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

    $("#CancelSource").click(function () {
        var window = $("#SourceSearchPopUp");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();
    })

    $("#OkSource").click(function (e) {

        var grid = $("#SourceSearchgrid").data("kendoGrid");
        var dataSource = grid.dataSource;
        var total = grid.dataSource.data().length;

        var Id = "";
        var Value = "";
        if (total != 0) {
            var no = (total - 1);
            var item = 0;
            for (; item < total; item++) {
                if (grid.dataSource._data[item].Select == true) {
                    var Source = grid.dataSource._data[item].Source;
                    var Sourceid = grid.dataSource._data[item].Sourceid;

                    if (Value == "") {
                        Value = Source;
                    }
                    else {
                        Value = Value + "," + Source;
                    }

                    if (Id == "") {
                        Id = Sourceid;
                    }
                    else {
                        Id = Id + "," + Sourceid;
                    }

                }
            }
        }
        if (Id != "") {
            $("#Source").val(Value);
            $("#Sourceid").val(Id);
            var window = $("#SourceSearchPopUp");
            var kWnd = window.data("kendoWindow");
            kWnd.center().close();
        }
        else {
            $("#AlertMessageHdn").val("Pelase Select any One. ");
            $("#alertType").val('fail');
            AlertMesaage();
        }
    })


    $("#ChkAllStatus").click(function (e) {
        var grid = $("#SourceSearchgrid").data("kendoGrid");
        if (this.checked) {
            debugger;
            $("#SourceSearchgrid tbody tr input:checkbox").attr("checked", true);
            var total = grid.dataSource.data().length;
            if (total != 0) {
                var no = (total - 1);
                var item = 0;
                for (; item < total; item++) {
                    grid.dataSource._data[item].Select = true;
                }
            }
            ChkIDSource(e);
        }
        $("#SourceSearchgrid").data("kendoGrid").dataSource.read();
        document.getElementById("ClearAllStatus").checked = false;
        
    });

    $("#ClearAllStatus").click(function (e) {
        debugger;
        var grid = $("#SourceSearchgrid").data("kendoGrid");
        if (this.checked) {
            $("#SourceSearchgrid tbody tr input:checkbox").attr("checked", false);
            var total = grid.dataSource.data().length;
            if (total != 0) {
                var no = (total - 1);
                var item = 0;
                for (; item < total; item++) {
                    grid.dataSource._data[item].Select = false;
                }
            }
            ChkIDSource(e);
        }
        $("#SourceSearchgrid").data("kendoGrid").dataSource.read();
        document.getElementById("ChkAllStatus").checked = false;
    });


    function ChkIDSource(e) {

        var grid = $("#SourceSearchgrid").data("kendoGrid");
        var dataSource = grid.dataSource;
        var total = grid.dataSource.data().length;

        var Id = "";
        var Value = "";
        if (total != 0) {
            var no = (total - 1);
            var item = 0;
            for (; item < total; item++) {
                if (grid.dataSource._data[item].Select == true) {
                    var Source = grid.dataSource._data[item].Source;
                    var Sourceid = grid.dataSource._data[item].Sourceid;

                    if (Value == "") {
                        Value = Source;
                    }
                    else {
                        Value = Value + "," + Source;
                    }

                    if (Id == "") {
                        Id = Sourceid;
                    }
                    else {
                        Id = Id + "," + Sourceid;
                    }

                }
            }
        }
        $.ajax({
            type: "POST",
            url: "/SalesAndMarket/LoadAvancedSearchIDS",
            data: "SourceID=" + Id + "&Source=" + Source,
            success: function (data) {
            }
        });

    }

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

<% }).Render();%>--%>
