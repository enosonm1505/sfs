<%@ Page Language="C#" MasterPageFile="~/Views/Shared/BQSite.Master" Inherits="System.Web.Mvc.ViewPage<System.Web.Mvc.HandleErrorInfo>" %>

<asp:Content ID="errorTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Error 
</asp:Content>

<asp:Content ID="errorContent" ContentPlaceHolderID="MainContent" runat="server">
    <hgroup class="title">
        <h1 class="error">Error.</h1>
        <h2 class="error">An error occurred while processing your request.</h2>
    </hgroup>
</asp:Content>
