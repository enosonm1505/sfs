<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ErrorPage.aspx.cs" Inherits="WinLogin.ErrorPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <!-- error starts -->
<div style=" display:block font-family:Cambria, 'Hoefler Text', 'Liberation Serif', Times, 'Times New Roman', serif; margin:10% 0%; text-align:center; width:100%;border:solid px; height:auto;">

<div style=" color:#8F8F8F; padding:0.5% 0% 0.5%  0%">
<img src="Images/error.png" width="80"/></div>
<div  id ="err" runat ="server" style="font-size:2em; color:#A70002; padding:0.5% 0% 0.2%  0%"> This is my custom friendly error page.</div>
<div style="font-size:15px; color:#8F8F8F; padding:0.1% 0% 1%  0%">I am afraid we are currently having problems on this site. An email has sent to the site owner to report the problem.<a style="color:#0094ff" href="../Login.aspx">Back to Login</a></div>

</div>

<!-- error ends -->
   <%-- <form id="form1" runat="server">
    <div runat ="server" id ="err" style="height:100px;font-size :large ;color:red ;text-align :center;width:100%">
    This is my custom friendly error page.
    </div>
        
        I am afraid we are currently having problems on this site. An email has sent to the site owner to report the problem.
    </form>--%>
</body>
</html>
