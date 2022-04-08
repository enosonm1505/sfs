<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

             <% Html.Kendo().Window().Name("MessageSave")
    .Title("Message")
    .Visible(false)
    .Modal(true)
    .Draggable(true)
    .Width(420)
    .Height(125)    
    .Content(() =>
                    { %>

            <div style="margin-top:20px; margin-left:10px;">
                <div style=" width:50px; float:left" >
              <img src="../../Images/SaveImage.png" style="width:32px; height:32px;"  />
          </div>
                    <div style=" width:300px; float:left" ><p style="text-align:left; color:maroon; font-weight:bold; margin-top:12px;"><label id="alertMegsave"></label></p>  </div>
              </div>
                      <div style="text-align:right;  margin-top:70px; margin-right:50px;">
      <%= Html.Kendo().Button()
    .Name("OKK")
    .Tag("a")
    .HtmlAttributes(new { id = "okkksave", Style = "color:black;width:55px;" })
    .Content("OK")%>
            
        </div>
        

                <% }).Render();%>

     <script type="text/javascript">
         $("#okkksave").click(function () {           
             var window = $("#Alert");
             var kWnd = window.data("kendoWindow");
             kWnd.center().close();            
                 document.location.reload(true);              
            
         });
         </script>    