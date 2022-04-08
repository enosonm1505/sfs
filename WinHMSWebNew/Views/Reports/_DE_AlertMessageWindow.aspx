<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

             <% Html.Kendo().Window().Name("DEAlert")
    .Title("Alert")
    .Visible(false)
    .Modal(true)
    .Draggable(true)
    .Width(420)
    .Height(115)   
    .Content(() =>
    { %>
     <div>
         <div class="FullwidthDIV">
          <div style="width:50px; margin-left:10px; float:left"><img src="../../Images/AlertImage.png" style="width:32px; height:32px;" id="alertimg1" />
              <img src="../../Images/SaveImage.png" style="width:32px; height:32px;" id="saveimg1" />
          </div>
                                 <div><p style="text-align:left; margin-top:12px;"><label id="alertMeg1"></label></p>  </div><br />
              </div>
                      <div style="text-align:right;  margin-top:10px; margin-right:10px;">
      <%= Html.Kendo().Button()
    .Name("DEYES")
    .Tag("a")  
    .HtmlAttributes(new { id="DeYes", Style="color:black;width:55px;"  })
    .Content("Yes")%>

                           <%= Html.Kendo().Button()
    .Name("DENO")
    .Tag("a")  
    .HtmlAttributes(new { id="DeNO", Style="color:black;width:55px;"  })
    .Content("No")%>            
        </div>
            </div>

                <% }).Render();%>

<style>
    .SelectColor{
        background-color:red;
        font-weight:bold;
    }

</style>
     <script type="text/javascript">
         $("#DeYes").click(function (e) {            
            var window = $("#DEAlert");
             var kWnd = window.data("kendoWindow");
             kWnd.center().close();
             DeleteMAinGridRowValues(e)
            
         });
         $("#DeNO").click(function (e) {           
             var window = $("#DEAlert");
             var kWnd = window.data("kendoWindow");
             kWnd.center().close();           
         });

         function DeleteMAinGridRowValues(e) {          
             var grid = $("#grid").data("kendoGrid");
             var rowIndex = grid.selectable.userEvents.currentTarget.rowIndex;
             var no = rowIndex;          
             grid.dataSource._data[no].DeleteSts = "1";
             var uid = grid._data[no].uid;
             var row = grid.table.find('tr[data-uid="' + uid + '"]');
             $(row).addClass("SelectColor");
             grid.select(row);
         }

         </script>    