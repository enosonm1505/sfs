<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

             <% Html.Kendo().Window().Name("Alert")
    .Title("Alert")
    .Visible(false)
    .Modal(true)
    .Draggable(true)
    .Width(450)
    .Height(115)   
    .Content(() =>
                    { %>

            <div>
                <div class="FullwidthDIV">
          <div style="width:50px; margin-left:10px; float:left"><img src="../../Images/AlertImage.png" style="width:32px; height:32px;" id="alertimg" />
              <img src="../../Images/SaveImage.png" style="width:32px; height:32px;" id="saveimg" />
          </div>
                    <div><p style="text-align:left; margin-top:12px;"><label id="alertMeg"></label></p>  </div><br />
              </div>
                      <div style="text-align:right;  margin-top:0px; margin-right:10px;">
      <%= Html.Kendo().Button()
    .Name("OKK")
    .Tag("a")  
    .HtmlAttributes(new { id="okkk", Style="color:black;width:55px;"  })
    .Content("OK")%>
            
        </div>
            </div>

                <% }).Render();%>

     <script type="text/javascript">
         $("#okkk").click(function () {            
             var window = $("#Alert");
             var kWnd = window.data("kendoWindow");
             kWnd.center().close();           
             var alertty = $("#alertType").val();
             if (alertty != 'fail') { 
                 document.location.reload(true);              
             }
         });
         </script>    