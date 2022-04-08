<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<link href="http://localhost:50892/Content/bluetheme.css" rel="stylesheet" />
               <%@ Register TagName="MENUWFO" TagPrefix="MN" Src="~/FO/FOMaster.ascx" %>
      <div>
        <MN:MENUWFO ID="Menu" runat="server"></MN:MENUWFO>
    </div>