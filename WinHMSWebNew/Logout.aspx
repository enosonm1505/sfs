<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Logout.aspx.cs" Inherits="WinLogin.Logout" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
      <meta http-equiv='refresh' content='60' />
    <title></title>
    <script src="/Scripts/jquery-1.7.1.min.js"></script>
    <script src="/Scripts/boostrap.js"></script>
    <script>
        function fnGetData() {
            debugger;
            //var dnconstrng = document.getElementById('hdnpropNm').value;
            //alert(window.localStorage.getItem("PROPERTYNAME"));
            // document.getElementById('HdnPropNnm').value = window.localStorage.getItem("PROPERTYNAME");
            var propNm = window.localStorage.getItem('PROPERTYNAME');
            document.getElementById('HdnPropNnm').value = propNm;
            var btncanc = document.getElementById('btnRedir');
            btncanc.click();
        } 
    </script>
</head>
    
<body>
    <form id="form1" runat="server">
    <div>
        <asp:HiddenField ID="HdnPropNnm" runat="server" />
        <asp:Button ID="btnRedir" runat="server" OnClick="btnRedir_Click" />
    </div>
    </form>
</body>
</html>



<%--
property name=Login.aspx
Connection String for loading property=Server=Fairy;User Id=sa;Password=infosqlwinsar;Database=hmsdeveloptest;Max pool size=100;Pooling=yes;Connection Timeout=900;Date :22/10/2018 10:02:39 AM
Connection string based on property=Server=Fairy;User Id=sa;Password=infosqlwinsar;Database=hmsdeveloptest;Max pool size=100;Pooling=yes;Connection Timeout=900;Date :22/10/2018 10:02:40 AM


property name=Login.aspx
Connection String for loading property=Server=Fairy;User Id=sa;Password=infosqlwinsar;Database=hmsdeveloptest;Max pool size=100;Pooling=yes;Connection Timeout=900;Date :22/10/2018 10:03:18 AM
Connection string based on property=Server=Fairy;User Id=sa;Password=infosqlwinsar;Database=hmsdeveloptest;Max pool size=100;Pooling=yes;Connection Timeout=900;Date :22/10/2018 10:03:18 AM

property name=PROP1
Connection String for loading property=Server=Fairy;User Id=sa;Password=infosqlwinsar;Database=hmsdeveloptest;Max pool size=100;Pooling=yes;Connection Timeout=900;Date :22/10/2018 10:03:23 AM
Connection string based on property=Server=HULK;Database= HMSDEMOLIVE;User ID=sa;Password=infosqlwinsar;Max pool size=100;Pooling=yes;Connection Timeout=900;Date :22/10/2018 10:03:28 AM

property name=PROPFAIRY
Connection String for loading property=Server=Fairy;User Id=sa;Password=infosqlwinsar;Database=hmsdeveloptest;Max pool size=100;Pooling=yes;Connection Timeout=900;Date :22/10/2018 10:04:09 AM
Connection string based on property=Server=fairy;Database= hmsdeveloptest;User ID=sa;Password=infosqlwinsar;Max pool size=100;Pooling=yes;Connection Timeout=900;--%>