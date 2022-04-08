<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="WinLogin.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9" />
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="-1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />
    <link href="/CSS/boostrap.css" rel="stylesheet" />
    <link type="text/css" rel="stylesheet" href="/CSS/nlogin.css" />
    <style>
        .propText {
            font-size: 20px;
        }

        .Modalclose {
            color: White;
            background-color: #2CAED3;
            text-decoration: none;
            text-align: center;
            border-radius: 6px;
            height: 30px;
            padding: 0px 15px;
            font-size: 17px;
        }

        .login-dialog {
            top: 140px;
        }

        .login-content {
            width: 80%;
            left: 10%;
            height: 220px;
            border-radius: 20px;
            z-index: 1;
        }

        .modal-con {
            border-radius: 25px;
            top: 5px;
            text-align: center;
            padding-bottom: 20px;
        }

        .btn-ok {
            padding: 6px 25px !important;
        }

        .underline {
            text-decoration: underline;
            color: #5dded9;
        }
    </style>
    <script src="/Scripts/jquery-1.7.1.min.js"></script>
    <script src="/Scripts/boostrap.js"></script>
    <script>
        function showModal() {
            $('#myModal').modal('show');
            // $('.loginbox').css({ 'pointer-events': 'none' });
        }

        function hideModal() {
            $('#myModal').modal('hide');
            var btncanc = document.getElementById('btncanc');
            btncanc.click();
        }

    </script>
    <script lang="javascript">




        function fnCheckSession() {
            debugger;
            if (confirm('Your previous Session was not Logged out properly. Click Ok to Abort the previous Session and continue with the application or click Cancel to cancel this Session.')) {
                document.getElementById('form1').MODE.value = 'ULog';
                document.getElementById('form1').action = "Login.aspx";
                document.getElementById('form1').submit();
                return true;
            }
            else
                return false;
        }

        function removeQuote(i) {

            if (i.value.length > 0) {

                i.value = i.value.replace(/'/gi, '');

                i.value = i.value.replace(/"/gi, '');

                i.value = i.value.replace(/#/gi, '');

                i.value = i.value.replace(/&/gi, '');

            }

        }

        function fnClearCvr() {
            document.getElementById('lblsecAlert').value = '';
            document.getElementById('lblsecAlert').innerText = '';
            return false;
        }


        $(document).keypress(function (e) {

            if (e.which == 13) {
                // alert('You pressed enter!');
                // $("#btnSubmit").click();
                var submit = document.getElementById('btnSubmit');
                var dnconstrng = document.getElementById('hdnpropNm').value;
                localStorage.setItem("PROPERTYNAME", dnconstrng);
                //alert(dnconstrng);
                submit.click();
            }
        });

        // added by monisha on 17/10/2019
        $(document).ready(function (e) {
            $('#divMainAlrt').modal('hide');
            $('#myModal').hide();
        });

        function hidemainAlrt() {
            $('#divMainAlrt').modal('hide');
            window.location = document.getElementById('hdnAltUrl').value;
            return false;
        }
        function relocate() {
            window.location = document.getElementById('hdnAltUrl').value;
        }
        // end


    </script>
</head>
<body ondrop="blur();return false;">
    <form id="form1" runat="server" autocomplete="off">
        <input name="MODE" type="hidden" />
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>


        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
                <%--<div class="title">Hotel Management Software
                   <%-- <asp:Label ID="lblProName" runat="server" Text="<%$ Resources:Strings,HotelManagementsystem%> "></asp:Label>
                </div>--%>

                <div class="container">

                    <div class="content">
                        <div style="width: 89%; float: left; text-align: center; /* padding-bottom: 6%; *//* position: fixed; *//* bottom: 0; *//* background-color: #fff; */">
                          <asp:Image ID="imgLogo" runat="server"  Width="110" style="padding: 1.5%;  border-radius: 25px; margin-right: 5%; padding-bottom: 10px;" />
                               <%--<img src="images/GroupLogo.png" width="110" style="padding: 1.5%; border: solid 1px #E1E1E1; border-radius: 25px; margin-right: 5%; padding-bottom: 10px; /* background-color: #fff; */">--%>
                        </div>

                        <div class="loginbox">
                            <div class="topbrdr">
                            </div>

                            <div id="ImgProp" runat="server" style="width: 99%; background-repeat: no-repeat; float: left; height: 40px; background-image: url(../Images/tltbg.png); padding: 0% 1%; text-align: center; font-size: 25px; font-family: 'VAG Rounded'; color: #696969;">
                                <strong>
                                    <asp:Label ID="prop" CssClass="propText" runat="server"></asp:Label></strong>

                            </div>

                            <div class="fbx" runat="server" id="propertyDiv" style="">
                                <asp:TextBox ID="txtProp" placeholder="<%$ Resources:Strings,PropertyName%>" runat="server" OnTextChanged="chkProp_TextChanged" AutoPostBack="true"></asp:TextBox>
                                <%--<asp:Label ID="lblPropAlert" runat="server" Text="" CssClass="alerttxt"></asp:Label>--%>
                                <%--<asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ErrorMessage="<%$ Resources:Strings,pleaseEnterProp%>" ControlToValidate="txtProp" CssClass="alerttxt" SetFocusOnError="true"></asp:RequiredFieldValidator>--%>
                            </div>
                            <div class="fbx" style="height: 33px;" id="DivLocation" runat="server">
                                <asp:DropDownList ID="ddlLocation" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddlLocation_SelectedIndexChanged">
                                </asp:DropDownList>
                            </div>
                            </br>
                            </br>
                            <div class="fbx" style="margin-top: 15px;">
                                <%--<asp:Label ID="lblUserName" runat="server" Text="<%$ Resources:Strings,UserName%> "></asp:Label>--%>
                                <asp:TextBox ID="txtUsernm" placeholder="<%$ Resources:Strings,UserName%>" runat="server" OnTextChanged="txtUsernm_TextChanged" AutoPostBack="true"></asp:TextBox>
                                <asp:Label ID="lblUserNameAlert" runat="server" Text="" CssClass="alerttxt"></asp:Label>
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="<%$ Resources:Strings,PleaseEneterUsrnm%>" ControlToValidate="txtUsernm" CssClass="alerttxt" SetFocusOnError="true"></asp:RequiredFieldValidator>
                            </div>
                            <div class="fbx">
                                <%--<asp:Label ID="lblPassword" runat="server" Text="<%$ Resources:Strings,Password%> "></asp:Label>--%>
                                <asp:TextBox ID="txtPwd" placeholder="<%$ Resources:Strings,Password%>" runat="server" TextMode="Password"></asp:TextBox>
                                <asp:Label ID="lblPwdAlert" runat="server" Text="" CssClass="alerttxt"></asp:Label>
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ErrorMessage="<%$ Resources:Strings,pleaseEnterPassword%>" ControlToValidate="txtPwd" CssClass="alerttxt" SetFocusOnError="true"></asp:RequiredFieldValidator>

                            </div>
                            <div class="fbx" id="divComp" runat="server">
                                <%-- <asp:Label ID="lblCompany" runat="server" Text="<%$ Resources:Strings,Company%> "></asp:Label>--%>
                                <asp:DropDownList ID="ddlCompany" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddlCompany_SelectedIndexChanged">
                                </asp:DropDownList>

                            </div>
                            <div class="fbx" style="margin-top: 7px;" id="DivCaptcha" runat="server">
                                <asp:Label Text="<%$ Resources:Strings,securtychk%>" ID="lblsec" runat="server"></asp:Label>
                                <asp:Label ID="lblStopSpam" Style="margin-left: 3%;" runat="server"></asp:Label>= 
                                <asp:TextBox runat="server" ID="txtStopSpam" Width="15%" MaxLength="3" onblur="return fnClearCvr();" />
                                <asp:Label ID="lblsecAlert" ForeColor="Red" runat="server"></asp:Label>
                                <%-- <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ErrorMessage="Please Enter Your Answer" ControlToValidate="txtStopSpam" CssClass="alerttxt" SetFocusOnError="true"></asp:RequiredFieldValidator>--%>
                                <asp:CompareValidator ID="CompareValidator1" ErrorMessage="<%$ Resources:Strings,invalidtextformat%>"
                                    CssClass="alerttxt" SetFocusOnError="true" ControlToValidate="txtStopSpam" runat="server"
                                    Operator="DataTypeCheck" Type="Integer" />
                            </div>
                            <div style="font-family: 'Times New Roman'; display: none;" id="DivFoSett" runat="server">
                                <asp:RadioButton ID="chkSett" runat="server" GroupName="FOSETNG" />
                                <asp:Label ID="LblEss" Text="Express" runat="server"></asp:Label>

                                <asp:RadioButton ID="ChkStandard" runat="server" GroupName="FOSETNG" Style="margin-left: 20px;" />
                                <asp:Label ID="LblStandard" Text="Standard" runat="server"></asp:Label>

                                <asp:RadioButton ID="ChkPremier" runat="server" GroupName="FOSETNG" Checked="true" Style="margin-left: 20px;" />
                                <asp:Label ID="lblPremier" Text="Premier" runat="server"></asp:Label>
                            </div>
                            <div class="fbx">
                                <asp:Label ID="lblAlert" runat="server" Text="" CssClass="alerttxt"></asp:Label>
                            </div>
                            <div class="btnbx" style="height: 28px;">
                                <%--<asp:Button Text="<%$ Resources:Strings,Login%>" ID="btnSubmit" runat="server" CssClass="ButtonClass" OnClick="btnSubmit_Click" />--%>
                                <asp:LinkButton ID="btnSubmit" runat="server" Font-Underline="false" Style="text-align: center; border-radius: 6px; height: 28px; font-size: 20px;" ForeColor="White" BackColor="#2caed3" Text="<%$ Resources:Strings,Login%>" CssClass="btnbx" OnClick="btnSubmit_Click"></asp:LinkButton>
                            </div>
                        </div>
                    </div>
                </div>
                <%--<div class="footer">
                    <img src="images/winhmslogo.png" style="float:left;padding-top:15px;" width="210">
                    <%--<img src="images/citrus_logo_color.png" style="float:right" width="120">
                </div>--%>
                <div id="myModal" class="modal fade" runat="server" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title" style="color: red; text-align: center; color: red; font-size: 22px; letter-spacing: 3px; /* font-weight: bold !important; */">!Attention</h4>
                            </div>
                            <div class="modal-body" style="font-size: 17px; letter-spacing: 3px; padding: 10px 0px 10px 0px !important;">
                                <p style="text-align: center; margin: unset !important;" id="alertText" runat="server"></p>
                            </div>
                            <div class="modal-footer">
                                <input id="btnalertclose" type="button" class="Modalclose" value="Close" onclick="return hideModal();">
                                <%--<asp:Button ID="btncanc" runat="server" Style="visibility: hidden;" CausesValidation="false" OnClick="btncanc_Click" />--%>
                            </div>
                        </div>

                    </div>
                    <asp:HiddenField ID="HdnDbConstr" runat="server" />
                    <asp:HiddenField ID="hdnpropNm" runat="server" />
                </div>
                <%--Maintanance Alert popup--%>
                <%--<div class="modal-poup" id="divMainAlrt" runat="server" style="display:none">
                    <div class="modal-dialog login-dialog" runat="server">
                        <div class="modal-content login-content" runat="server">
                            <div class="modal-body" runat="server">
                                <div class="container modal-con" runat="server">
                                    <img src="Images/cloud.png" width="100"  runat="server" />
                                    <h3 style="margin: 0">MAINTENANCE ALERT</h3>
                                    <p>Sorry. Server Maintenance going on.. Kindly use below URL</p>
                                    <label class="underline" id="lblurl" runat="server" onclick="relocate();"></label><br/>
                                    <button id="btnok" type="button" class="btn btn-primary btn-ok" runat="server" onclick="return hidemainAlrt();">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <asp:HiddenField ID="hdnAltUrl" runat="server" />
                </div>--%>
                <%--End--%>
            </ContentTemplate>
        </asp:UpdatePanel>
    </form>
</body>
</html>
