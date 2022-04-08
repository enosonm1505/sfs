<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

             <% Html.Kendo().Window().Name("CommonAlert")
    .Title("Alert")
    .Visible(false)
    .Modal(true)
    .Draggable(true)
    .Width(430)
    .Height(115)   
    .Content(() =>
                    { %>

            <div>
                <div class="FullwidthDIV">
          <div style="width:50px; margin-left:10px; float:left"><img src="../../Images/AlertImage.png" style="width:32px; height:32px;"  />
            
          </div>
                    <div><p style="text-align:left; margin-top:12px;"><label>From Date Cannot be Greater than To Date.  </label></p>  </div><br />
              </div>
                      <div style="text-align:right;  margin-top:10px; margin-right:10px;">
      <%= Html.Kendo().Button()
    .Name("OKCommon")
    .Tag("a")  
    .HtmlAttributes(new { id="OKCommon", Style="color:black;width:55px;"  })
    .Content("OK")%>
            
        </div>
            </div>

                <% }).Render();%>

     <script type="text/javascript">
         $("#OKCommon").click(function () {
             var window = $("#CommonAlert");
             var kWnd = window.data("kendoWindow");
             kWnd.center().close();  
         });
         </script>    