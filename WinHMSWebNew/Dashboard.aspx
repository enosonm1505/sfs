<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="WinLogin.Dashboard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9" />
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="-1" />
    <link href="/CSS/dashboard.css" rel="stylesheet" />

</head>
<body>
    <form id="form1" runat="server">
        <div class="header">
            <div style="float: left; text-align: center; width: 21%; padding-left: 2%">
                <asp:Label ID="lblProperty" runat="server" ForeColor="white"></asp:Label>
            </div>
            <div style="float: left; width: 75%; padding-left: 2%">
                <span style="color: white;">
                    <asp:Label ID="lblHeader" runat="server" Text="<%$Resources:Strings,PropertyManagementSystem%>"></asp:Label></span>
            </div>

            <div style="float: left; text-align: center; width: 15%;">
                <asp:Label runat="server" ID="lblLoginProp" ForeColor="white"></asp:Label>
            </div>

            <div style="float: left; width: 8%; text-align: center">
                <asp:Label ID="lblUser" runat="server" ForeColor="white"></asp:Label>
            </div>

            <div style="float: right; width: 8%; text-align: center" class="hovera">
                <asp:LinkButton ID="lnkLogOut" runat="server" Font-Underline="false" ForeColor="white" Text="<%$Resources:Strings,Logout%>" OnClick="lnkLogOut_Click"></asp:LinkButton>
            </div>
        </div>
        <div class="fullwidth">
            <div class="box1 color3" id="FO" runat="server" style="display: none;">
                <a href="/FO/FOHome.aspx?id=FO">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/fonew1.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label1" runat="server" Text="<%$ Resources:Strings,FrontOffice%>" />
                            </div>
                            <%-- <div class="btncont">
                                <img src="images/arrow.png" />
                            </di--%>
                        </div>
                    </div>
                </a>
            </div>
            <div class="box1 color4" id="HK" runat="server" style="display: none;">
                <a href="/HK/HkHome.aspx?id=HK">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/housekeepingnew.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label2" runat="server" Text="<%$ Resources:Strings,HouseKeeping%>" />
                            </div>
                            <%-- <div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>
            <div class="box1 color7" id="PO" runat="server" style="display: none;">
                <a href="/POS/PosHome.aspx?id=PO">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/posnew.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label3" runat="server" Text="<%$ Resources:Strings,PointofSale%>" />
                            </div>
                            <%--<div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>
            <div class="box1 color1" id="PU" runat="server" style="display: none;">
                <a href="/PU/Home.aspx?id=PU">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/purchasenew.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label4" runat="server" Text="<%$ Resources:Strings,Purchase%>" />
                            </div>
                            <%--  <div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>
            <div class="box1 color2" id="IN" runat="server" style="display: none;">
                <a href="/INV/INVHome.aspx?id=IN">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/materialnew.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label5" runat="server" Text="<%$ Resources:Strings,MaterialManagement%>" />
                            </div>
                            <%-- <div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>

            <div class="box1 color10" id="TE" runat="server" style="display: none;">
                <a href="/CM/CMHome.aspx?id=TE">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/callmonitornew.png" />
                        </div>
                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label6" runat="server" Text="<%$ Resources:Strings,CallMonitoring%>" />
                            </div>
                            <%--div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>



            <div class="box1 color8" id="GP" runat="server" style="display: none;">
                <a href="GPHome.aspx?id=GP">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/fonew1.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label7" runat="server" Text="<%$ Resources:Strings,GatePass%>"></asp:Label>
                            </div>
                            <%--<div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>
            <div class="box1 color9" id="GL" runat="server" style="display: none;">
                <a href="/GL/GLHome.aspx?id=GL">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/glnew.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label8" runat="server" Text="<%$ Resources:Strings,GeneralLedger%>"></asp:Label>
                            </div>
                            <%-- <div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>
            <div class="box1 color13" id="BP" runat="server" style="display: none;">
                <a href="/BP/BPHome.aspx?id=BP">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/billpassingnew.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label9" runat="server" Text="<%$ Resources:Strings,BillPassing%>"></asp:Label>
                            </div>
                            <%--<div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>

            <div class="box1 color14" id="SPA" runat="server" style="display: none;">
                <a href="/SPA/SPAHome.aspx?id=SP">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/spanew.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label10" runat="server" Text="<%$ Resources:Strings,SPA%>"></asp:Label>
                            </div>
                            <%-- <div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>

            <div class="box1 color15" id="FB" runat="server" style="display: none;">
                <a href="/FB/FBHome.aspx?id=FB">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/fandb.png" />
                        </div>
                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label12" runat="server" Text="<%$ Resources:Strings,FoodBeverage%>"></asp:Label>
                            </div>
                            <%-- <div class="btncont">
                                <img src="images/arrow.png"/>
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>

            <div class="box1 color16" id="WSM" runat="server" style="display: none;">
                <%--  <a href="/WSM/SMHome.aspx?id=WSM">--%>
                <a runat="server" id="LinkWSM" href="../SalesAndMarket/SMHome">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/salesnew.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label13" runat="server" Text="<%$ Resources:Strings,salesandmarketing%>"></asp:Label>
                            </div>
                            <%-- <div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>

            <div class="box1 color11" id="ARAP" runat="server" style="display: none;">
                <a href="/ARAP/ArapHome.aspx?id=ARAP">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/arapnew.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label14" runat="server" Text="<%$ Resources:Strings,arap%>"></asp:Label>
                            </div>
                            <%-- <div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>


            <div class="box1 color12" id="PYRL" runat="server" style="display: none;">
                <a href="/PR/PRHome.aspx?id=PR">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/payrollnew.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label15" runat="server" Text="<%$ Resources:Strings,payroll%>"></asp:Label>
                            </div>
                            <%--<div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>

            <div class="box1 color21" id="CPOS" runat="server" style="display: none;">
                <a href="/CPOS/CposHome.aspx?id=CPOS">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="Images/cpos.png" />
                        </div>
                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label16" runat="server" Text="<%$ Resources:Strings,ConsolidatedPOS%>"> </asp:Label>
                            </div>
                            <%-- <div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>

            <div class="box1 color22" id="BQ" runat="server" style="display: none;">
                <a href="../BQ/BQHome.aspx">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="Images/banquet1.png" />
                        </div>
                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label17" runat="server" Text="<%$ Resources:Strings,Banquet%>"> </asp:Label>
                            </div>
                            <%-- <div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>

            <div class="box1 color12" id="DivPAR" runat="server" style="display: none;">
                <a href="/PAR/PARHome.aspx?id=PR">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/Par.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label18" runat="server" Text="<%$ Resources:Strings,ProformaRecivable%>"></asp:Label>
                            </div>
                            <%--<div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>
            <div class="box1 color12" id="DivCD" runat="server" style="display: none;">
                <a href="/CD/CDHome.aspx?id=CD">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/Par.png" />
                        </div>

                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label19" runat="server" Text="<%$ Resources:Strings,CardManagement%>"></asp:Label>
                            </div>
                            <%--<div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>

            <div class="box1 color24" id="DivMI" runat="server" style="display: none;">
                <a href="/GLMI/MIHome.aspx?id=GLMI">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/MIS.png" />
                        </div>
                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label20" runat="server" Text="MIS & Budget Control"> </asp:Label>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
              <div class="box1 color25" id="DivAR" runat="server" style="display: none;">
                <a href="/AR/ARHome.aspx?id=AR">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/AR.png" />
                        </div>
                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="lblARHdr" runat="server" Text="Accounts Receivable"> </asp:Label>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="box1 color5" id="MT" runat="server" style="display: none;">
                <a href="/MT/MTHome.aspx?id=MT">
                    <div class="box2">
                        <div class="imgbx">
                            <img style="width: 162%;" src="images/mastersnew.png" />
                        </div>
                        <div class="txtbx2">
                            <div class="txtbx">
                                <asp:Label ID="Label11" runat="server" Text="<%$ Resources:Strings,Masters%>"> </asp:Label>
                            </div>
                            <%-- <div class="btncont">
                                <img src="images/arrow.png" />
                            </div>--%>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <asp:HiddenField runat="server" ID="LOGIN_USRID_SESSION" />
        <div class="footer">
            <img src="images/Logo.png" />
        </div>
    </form>
    <script src="../../Scripts/jquery-1.7.1.js"></script>
    <script src="../../Scripts/jquery-1.7.1.min.js"></script>
    <script src="../../Scripts/PosChartCall.js"></script>
</body>

    <script>

        $(document).ready(function (e) {
            var USRID = document.getElementById("LOGIN_USRID_SESSION").value;
            localStorage.removeItem("LOGIN_USRID");
            localStorage.setItem("LOGIN_USRID", USRID);
            sessionStorage.removeItem("LOGIN_USRID");
            sessionStorage.setItem("LOGIN_USRID", USRID);
        });

    </script>
</html>
