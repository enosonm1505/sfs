<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MaintenanceAlert.aspx.cs" Inherits="WinLogin.MaintenanceAlert" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="CSS/boostrap.css" rel="stylesheet" />
    <title></title>
    <style>
        .modal-poup {
            text-align: center;
            margin-top: 60px;
        }

        .btn-ok {
            padding: 6px 25px !important;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>

            <div class="modal-poup">
                <div class="login-dialog">
                    <div class="login-content">
                        <div class="container modal-con">
                            <img src="Images/cloud.png" width="22%" />
                            <h3 style="margin: 0">MAINTENANCE ALERT</h3>
                            <%--<p>We are currently performing server maintenance.  We except to have site online another one hour </p>--%>
                            <p>We are currently performing server maintenance.  We expect to have the site operational in the next few minutes.</p>
                            <button type="button" class="btn btn-primary btn-ok">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
