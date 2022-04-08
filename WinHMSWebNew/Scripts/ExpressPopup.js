
var searchicon = "<span class='fa fa-search ExpBkGridIconBtn'  ></span>";
var searchicon1 = "<span class='fa fa-edit ExpBkGridIconBtn' ></span>";
var searchicon2 = "<span class='fa ExpBkGridIconBtn' >P</span>";

//fnGstMobEmlPopWindowLoad();
var PrgStr = "<div  style='display: block; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; fit-position: 100%; z-index: 189'> <img src='../../Images/progress.GIF' style='position: absolute; left: 50%; top: 45%; height: 100px; width: 80px;' /> </div>";
var BkAspxPage = false;
var PageNo = 0; var onFilter = 0; var SortBy = ""; var Dir = ""; var ExpBkSelColumn = "";
var ExpBkCompId = ""; var ExpBkUserId = ""; var ExpBkConnStr = ""; var ExpBkApiUrl = ""; var ExpBkRmtTy = ""; var BkSucessRet = []; var BkSaveMode = "";
var ExpBkC3_IND = "0"; var ExpBkC3_IND = ""; var ExpBkC1_NR = ""; var ExpBkC2_NR = ""; var ExpBkC3_NR = ""; var ExpBkJ1_IND = "0"; var ExpBkR11_IND = "0";var ExpBk_RSRAPPL = "0";
var ExpBkGstValInd = "0"; var ExpBkMailApplInd = "0"; var ExpBkNN_IND = "0";var ExpBkR_NO = "";var ExpBkRESERVE_NO = "";var ExpBkPlanId = "";var ExpBkONM = "";var ExpBkJ11_IND = "0";
var ExpBkG22_IND = "0"; var ExpBkHH = ""; var ExpBk_USER_TARIFF_EDIT_IND = "0"; var Exp_USER_TARIFF_DISC_EDIT_IND = "0"; var ExpBkD21_IND = 0;var ExpBkQ24_IND ="0";
var ExpBkBasCurrId = ""; var ExpBkModify_Tariff = "0"; var ExpBkSingleConsTariff = "0"; var ExpBkRateFixed = false;var ExpBk_Tariff_Edit_Plan_Appl = "0";
var menu_data = []; var ExpBkRateType = []; var ExpBkAdrsTariff = []; var ExpBkbTariffEditModified = false; var ExpBkTotPax = 0; var ExpBkAdrsPK = []; var ExpBkbPckgChg = false;
var ExpBkNew_Packg_Appl = "0"; var ExpBkBIND = "0"; var ExpBkEIND = "0"; var ExpBkF19_IND = "0"; var ExpBkbPckgChg1 = false;var ExpBkS14IND = "0";var ExpBkSTR_SANITIZE_IND="0";
var ExpBkUpgrade_Appl_Ind = "0";var ExpBkFF_IND = "1";var ExpBkRateNoteAppl = "0";var ExpBkMarket_Mand_Ind = "0";var ExpBkGuest_Ty_Ind = 0;var ExpBkCurDecLmt = 0;var ExpBkPrevUpgrd = "";
var ExpBkDefRmUpgrdTy = "";var ExpBkRmUpgrdTy = "";var ExpBkRmUpgrdReas = "";var ExpBkT3_IND = "0";var ExpBkPageId = ""; var ExpBkMode ="";ExpBkTY = "";var ExpBkA17_IND = "0";var ExpBkCopyCrNewRes = "0"
var ExpBkOpenRec = [];var ExpBkSRCAPPL = "0";var ExpBkSRCID = "";var ExpBkC11_IND = "0";var ExpBkJ2IND = "0";var ExpL10IND = "0"; var ExpBkU18IND = "0";var ExpBkL7_IND = "0";
var ExpBkpGrpPaxChng = "0"; var ExpBkpGrpRtCdChng = "0"; var ExpBkpGrpArvlChng = "0"; var ExpBkpGrpDeprChng = "0"; var ExpBk_Plan_Disc_Ind = "0"; var ExpBkCurrFormat = "L"; var ExpBkCurrDeLimit = ".";
var ExpBkbGrpdiscChng = "0"; var ExpBkpGrpAdlChng = "0"; var ExpBkpGrpCh1Chng = "0"; var ExpBkpGrpCh2Chng = "0"; var ExpBk_Plan_Appl_Ind = "0";
var ExpBkpGrpCh3Chng = "0"; var ExpBkpGrpRsrvStsChng = "0"; var ExpBkpGrpPlanIdChng = "0"; var ExpBkpGrpPlanAmtChng = "0"; var ExpBk_Plan_Compute_Type = ""; var ExpBkSelLineResId = "";
var ExpBk_Resrv_Mode_Ind = "0"; var ExpBk_I3_IND = "0"; var ExpBk_D19_IND = "0"; var ExpBk_C17_IND = "0"; var ExpBk_AA_IND = "0"; var ExpBk_AA_CAP = ""; var ExpBkfrmUpgradeChange = "";
var ExpBkCurrencyData = ""; var ExpBk_FORN_TARIFF_APPL_IND = "0"; var ExpBkTitle = ""; var ExpBk_ITINO = ""; var ExpBk_K2_IND = "0"; var ExpBkLastUpdateDt = "";var ExpBk_B17_IND = "0";
var ExpBksaveClick = 0; var ExpBk_Auto_Chrg_Appl = "0";
//webix.event(window, 'resize', function () {
//    MHeight = setHeightInPercentage(80);   
//    $$('frmBkCreat').resize();
   
//});

$(document).ready(function () {
    debugger;
    var dtscript = document.getElementsByTagName("script");
    var bVal = "0";
    var vProtoCall = window.location.protocol;
    var vHost = window.location.host;    
    var src = '../../FO/javascript/AutoChargeTC.js';
    var src1 = '../FO/javascript/AutoChargeTC.js';
    
    if (dtscript.length > 0) {        
        for (var i = 0; i < dtscript.length; i++) {
            if (dtscript[i].getAttribute('src') == src || dtscript[i].getAttribute('src') == src1) {
                bVal = "1";
                break;
            }
        }
    }
    var src = $("<script  src='../FO/javascript/AutoChargeTC.js'>");
    if (bVal == "0") $("head").append(src);

    bVal = "0";
    var src = '../../FO/javascript/FoBookerSearch.js';
    var src1 = '../FO/javascript/FoBookerSearch.js';

    if (dtscript.length > 0) {
        for (var i = 0; i < dtscript.length; i++) {
            if (dtscript[i].getAttribute('src') == src || dtscript[i].getAttribute('src') == src1) {
                bVal = "1";
                break;
            }
        }
    }
    var src = $("<script  src='../FO/javascript/FoBookerSearch.js'>");
    if (bVal == "0") $("head").append(src);
});


function fnInitDataLoad() {
    //
    ExpBkC3_IND = "0";
    ExpBkJ1_IND = "0";
    ExpBkJ11_IND = "0";
    ExpBkC1_NR = "";
    ExpBkC2_NR = "";
    ExpBkC3_NR = "";
    ExpBkR11_IND = "0";
    ExpBkSingleConsTariff = "0";
    ExpBkNew_Packg_Appl = "0";
    ExpBkS14IND = "0";
    ExpBkT3_IND = "0";
    ExpBk_B17_IND = "0";
    ExpBkLastUpdateDt = "";

    ExpBkG22_IND = "0";
    ExpBkHH = "";
    ExpBkD21_IND = "0";
    ExpBkModify_Tariff = "0";
    ExpBkF19_IND = "0";
    ExpBkUpgrade_Appl_Ind = "0";
    ExpBkMarket_Mand_Ind = "0";
    ExpBkGuest_Ty_Ind = "0";
    ExpBkA17_IND = "0";
    ExpBk_RSRAPPL = "0";
    ExpBkGstValInd = "0"; 
    ExpBkL7_IND = "0";
    ExpBkMailApplInd = "0";

    ExpBkSRCAPPL = "0";
    ExpBkC11_IND = "0";
    ExpBkSRCID = "";

    ExpBkJ2IND = "0";
    ExpL10IND = "0"; 
    ExpBkU18IND = "0";

    ExpBk_Plan_Appl_Ind = "0";
    ExpBk_Plan_Compute_Type = "0";
    ExpBk_Plan_Disc_Ind = "0";
    ExpBk_Resrv_Mode_Ind = "0";
    ExpBk_I3_IND = "0";
    ExpBk_D19_IND = "0";
    ExpBk_FORN_TARIFF_APPL_IND = "0";

    ExpBk_Auto_Chrg_Appl = "0";

    ExpBk_C17_IND = "0";
    ExpBk_AA_IND = "0";
    ExpBk_AA_CAP = "";
    ExpBkCurrFormat = "L"; ExpBkCurrDeLimit = ".";

    ExpBk_K2_IND = "0";
    FAC_auto_grid_data = [];
    FAC_Auto_Chrg_Modify = "0";
    ExpBkSelLineResId = "";

    
    var Allow_PM = "0";
    //if (ExpBkMode == "OPEN" && ExpBkTY == "3")
    Allow_PM = "1";

    var rowData = [];   
    Request = {
        REQTYPE: "GET_FNRESINITLOAD",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        PROPID:ExpBkCompId,
        RMT_TY: ExpBkRmtTy,
        ALLOW_PM:Allow_PM,
        
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
                        
            if (d != "") {
                if (BkAspxPage == true) rowData = JSON.parse(d.d);
                else rowData = JSON.parse(d);   
                
                var dtFoCont = rowData.FO_CONT;
                var dtFoControl = rowData.FO_CONTROL;
                var dtMstInstCont = rowData.MST_INST_CONT;
                var dtMstCompany = rowData.MST_COMPANY;

               

                if(dtFoCont.length>0){
                    if (dtFoCont[0].C3_IND != null && dtFoCont[0].C3_IND != "") ExpBkC3_IND = dtFoCont[0].C3_IND.toString().trim();
                    if (dtFoCont[0].J1_IND != null && dtFoCont[0].J1_IND != "") ExpBkJ1_IND = dtFoCont[0].J1_IND.toString().trim();
                    if (dtFoCont[0].C1_NR != null && dtFoCont[0].C1_NR != "") ExpBkC1_NR = dtFoCont[0].C1_NR.toString().trim();
                    if (dtFoCont[0].C2_NR != null && dtFoCont[0].C2_NR != "") ExpBkC2_NR = dtFoCont[0].C2_NR.toString().trim();
                    if (dtFoCont[0].C3_NR != null && dtFoCont[0].C3_NR != "") ExpBkC3_NR = dtFoCont[0].C3_NR.toString().trim();
                    if (dtFoCont[0].NN_IND != null && dtFoCont[0].NN_IND != "") ExpBkNN_IND = dtFoCont[0].NN_IND.toString().trim();
                    if (dtFoCont[0].R11_IND != null && dtFoCont[0].R11_IND != "") ExpBkR11_IND = dtFoCont[0].R11_IND.toString().trim();
                    if (dtFoCont[0].E14_IND != null && dtFoCont[0].E14_IND != "") ExpBkSingleConsTariff = dtFoCont[0].E14_IND.toString().trim();
                    if (dtFoCont[0].M10_IND != null && dtFoCont[0].M10_IND != "") ExpBkNew_Packg_Appl = dtFoCont[0].M10_IND.toString().trim();  
                    if (dtFoCont[0].S14_IND != null && dtFoCont[0].S14_IND != "") ExpBkS14IND = dtFoCont[0].S14_IND.toString().trim();
                    //if (dtFoCont[0].FF_IND != null && dtFoCont[0].FF_IND != "") ExpBkFF_IND = dtFoCont[0].FF_IND.toString().trim(); 
                    if (dtFoCont[0].T3_IND != null && dtFoCont[0].T3_IND != "") ExpBkT3_IND = dtFoCont[0].T3_IND.toString().trim(); 
                    if (dtFoCont[0].J11_IND != null && dtFoCont[0].J11_IND != "") ExpBkJ11_IND = dtFoCont[0].J11_IND.toString().trim();  
                    if (dtFoCont[0].C11_IND != null && dtFoCont[0].C11_IND != "") ExpBkC11_IND = dtFoCont[0].C11_IND.toString().trim();
                    if (dtFoCont[0].F11_IND != null && dtFoCont[0].F11_IND != "") ExpBkSRCAPPL = dtFoCont[0].F11_IND.toString().trim();
                    if (dtFoCont[0].T2_IND != null && dtFoCont[0].T2_IND != "") ExpBkSRCID = dtFoCont[0].T2_IND.toString().trim();
                    if (dtFoCont[0].J2_IND != null && dtFoCont[0].J2_IND != "") ExpBkJ2IND = dtFoCont[0].J2_IND.toString().trim();
                    
                    if (dtFoCont[0].I10_IND != null && dtFoCont[0].I10_IND != "") ExpBk_Auto_Chrg_Appl = dtFoCont[0].I10_IND.toString().trim();
                    if (dtFoCont[0].L10_IND != null && dtFoCont[0].L10_IND != "") ExpL10IND = dtFoCont[0].L10_IND.toString().trim();
                    if (dtFoCont[0].I3_IND != null && dtFoCont[0].I3_IND != "") ExpBk_I3_IND = dtFoCont[0].I3_IND.toString().trim();
                    if (dtFoCont[0].AA_IND != null && dtFoCont[0].AA_IND != "") ExpBk_AA_IND = dtFoCont[0].AA_IND.toString().trim();
                    if (dtFoCont[0].AA_CAP != null && dtFoCont[0].AA_CAP != "") ExpBk_AA_CAP = dtFoCont[0].AA_CAP.toString().trim();
                    if (dtFoCont[0].K2_IND != null && dtFoCont[0].K2_IND != "") ExpBk_K2_IND = dtFoCont[0].K2_IND.toString().trim();
                    
                    
                }
                if(dtFoControl.length>0){
                    if (dtFoControl[0].G22_IND != null && dtFoControl[0].G22_IND != "") ExpBkG22_IND = dtFoControl[0].G22_IND.toString().trim();                 
                    if (dtFoControl[0].DEF_TARIFF_CHRG_ID != null) ExpBkHH = dtFoControl[0].DEF_TARIFF_CHRG_ID.toString().trim();
                    if (dtFoControl[0].D21_IND != null && dtFoControl[0].D21_IND != "") ExpBkD21_IND = dtFoControl[0].D21_IND.toString().trim();
                    if (dtFoControl[0].Q24_IND != null && dtFoControl[0].Q24_IND != "") ExpBkQ24_IND = dtFoControl[0].Q24_IND.toString().trim();
                    if (dtFoControl[0].TARIFF_EDIT_IND != null && dtFoControl[0].TARIFF_EDIT_IND != "") ExpBkModify_Tariff = dtFoControl[0].TARIFF_EDIT_IND.toString().trim();
                    if (dtFoControl[0].Q19_IND != null && dtFoControl[0].Q19_IND != "") ExpBk_Tariff_Edit_Plan_Appl = dtFoControl[0].Q19_IND.toString().trim();
                    if (dtFoControl[0].F19_IND != null && dtFoControl[0].F19_IND != "") ExpBkF19_IND = dtFoControl[0].F19_IND.toString().trim();
                    if (dtFoControl[0].UPGRADE_APPL_IND != null && dtFoControl[0].UPGRADE_APPL_IND != "") ExpBkUpgrade_Appl_Ind = dtFoControl[0].UPGRADE_APPL_IND.toString().trim();
                    if (dtFoControl[0].MARKET_MAND_IND != null && dtFoControl[0].MARKET_MAND_IND != "") ExpBkMarket_Mand_Ind = dtFoControl[0].MARKET_MAND_IND.toString().trim();
                    if (dtFoControl[0].GUEST_TY_IND != null && dtFoControl[0].GUEST_TY_IND != "") ExpBkGuest_Ty_Ind = dtFoControl[0].GUEST_TY_IND.toString().trim();  
                    if (dtFoControl[0].A17_IND != null && dtFoControl[0].A17_IND != "") ExpBkA17_IND = dtFoControl[0].A17_IND.toString().trim();
                    if (dtFoControl[0].B17_IND != null && dtFoControl[0].B17_IND != "") ExpBk_B17_IND = dtFoControl[0].B17_IND.toString().trim();
                    
                    if (dtFoControl[0].Z19_IND != null && dtFoControl[0].Z19_IND != "") ExpBk_RSRAPPL = dtFoControl[0].Z19_IND.toString().trim();
                    if (dtFoControl[0].U18_IND != null && dtFoControl[0].U18_IND != "") ExpBkU18IND = dtFoControl[0].U18_IND.toString().trim();
                    if (dtFoControl[0].L7_IND != null && dtFoControl[0].L7_IND != "") ExpBkL7_IND = dtFoControl[0].L7_IND.toString().trim();
                    if (dtFoControl[0].L7_IND != null && dtFoControl[0].L7_IND != "") ExpBkL7_IND = dtFoControl[0].L7_IND.toString().trim();
                    if (dtFoControl[0].PLAN_APPL_IND != null && dtFoControl[0].PLAN_APPL_IND != "") ExpBk_Plan_Appl_Ind = dtFoControl[0].PLAN_APPL_IND.toString().trim();
                    if (dtFoControl[0].PLAN_COMPUTE_TYPE != null && dtFoControl[0].PLAN_COMPUTE_TYPE != "") ExpBk_Plan_Compute_Type = $.trim(dtFoControl[0].PLAN_COMPUTE_TYPE);
                    if (dtFoControl[0].PLAN_DISC_IND != null && dtFoControl[0].PLAN_DISC_IND != "") ExpBk_Plan_Disc_Ind = $.trim(dtFoControl[0].PLAN_DISC_IND);
                    if (dtFoControl[0].RESRV_MODE_IND != null && dtFoControl[0].RESRV_MODE_IND != "") ExpBk_Resrv_Mode_Ind = $.trim(dtFoControl[0].RESRV_MODE_IND);
                    if (dtFoControl[0].C17_IND != null && dtFoControl[0].C17_IND != "") ExpBk_C17_IND = dtFoControl[0].C17_IND.toString().trim();
                    if (dtFoControl[0].D19_IND != null && dtFoControl[0].D19_IND != "") ExpBk_D19_IND = dtFoControl[0].D19_IND.toString().trim();
                    if (dtFoControl[0].FORN_TARIFF_APPL_IND != null && dtFoControl[0].FORN_TARIFF_APPL_IND != "") ExpBk_FORN_TARIFF_APPL_IND = dtFoControl[0].FORN_TARIFF_APPL_IND.toString().trim();
                                        
                }
                if(dtMstInstCont.length>0){
                    if (dtMstInstCont[0].GST_VAL_IND != null && dtMstInstCont[0].GST_VAL_IND != "") ExpBkGstValInd = $.trim(dtMstInstCont[0].GST_VAL_IND);
                    if (dtMstInstCont[0].MAIL_APPL_IND != null && dtMstInstCont[0].MAIL_APPL_IND != "") ExpBkMailApplInd = $.trim(dtMstInstCont[0].MAIL_APPL_IND);
                    
                }                
                if(dtMstCompany.length>0){
                    if (dtMstCompany[0].BASE_CURRENCY_ID != null && dtMstCompany[0].BASE_CURRENCY_ID != "") ExpBkBasCurrId = dtMstCompany[0].BASE_CURRENCY_ID.toString().trim();
                    if (dtMstCompany[0].VAL_DECIM_LIMIT != null && dtMstCompany[0].VAL_DECIM_LIMIT != "") ExpBkCurDecLmt = dtMstCompany[0].VAL_DECIM_LIMIT.toString().trim();
                    if (dtMstCompany[0].STR_SANITIZE_IND != null && dtMstCompany[0].STR_SANITIZE_IND != "") ExpBkSTR_SANITIZE_IND = dtMstCompany[0].STR_SANITIZE_IND.toString().trim();
                    if (dtMstCompany[0].CURRENCY_FORMAT != null && dtMstCompany[0].CURRENCY_FORMAT != "") ExpBkCurrFormat = dtMstCompany[0].CURRENCY_FORMAT.toString().trim();
                    if (dtMstCompany[0].CURRENCY_DELIMIT != null && dtMstCompany[0].CURRENCY_DELIMIT != "") ExpBkCurrDeLimit = dtMstCompany[0].CURRENCY_DELIMIT.toString().trim();
                }               

                 
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);
    return rowData;
    
};

function BookingCreatePopup(cmpid, ConnStr, UserId, apiCallUrl, RemoteType, IsAspxPage, PageId, ROOMNO, RMTY, RESERVE_NO, ARRDT, DEPTDT, ARRTM, DEPTTM, MODE, TY, GROUPID, GROUPNM, TRVAGID, TRVAGNM, COMPID, COMPNM, BUSSOURCEID, MARKSEGMENTID, COPYCREATENEWRES, ITINO, ITINOBJ, ITIGSTDET) {
    //webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    //webix.skin.set('mini');
    //

    GuestSearchBKPopWindowLoad();
    //DupGstWindowLoad();
    fnSaveMsgWindow();
    fnCancePopWindowLoad();
    fnDiscResPopWindowLoad();
    fnComplNarPopWindowLoad();
    fnLoadTarChangWindow();
    fnUpgrRmTyReasPopWindowLoad();
    
    cmpid = cmpid || "";
    ConnStr = ConnStr || "";
    UserId = UserId || "";
    apiCallUrl = apiCallUrl || "";
    RemoteType = RemoteType || "";
    IsAspxPage = IsAspxPage || false;
    RESERVE_NO = RESERVE_NO || "";    
    PageId = PageId || "";
    MODE = MODE || "";
    TY = TY || "";
    GROUPID = GROUPID || "" ;
    GROUPNM = GROUPNM || "";
    TRVAGID = TRVAGID || "";
    TRVAGNM = TRVAGNM || "";
    COMPID = COMPID || "";
    COMPNM = COMPNM || "";
    BUSSOURCEID = BUSSOURCEID || "";
    MARKSEGMENTID = MARKSEGMENTID || "";
    COPYCREATENEWRES = COPYCREATENEWRES || "";
    ITINO = ITINO || "";
    ITINOBJ = ITINOBJ || "";
    ITIGSTDET = ITIGSTDET || "";

    ExpBkRmtTy = RemoteType;
    //if (ExpBkRmtTy == "") ExpBkRmtTy = "FO";
    ExpBkCompId = cmpid;
    ExpBkConnStr = ConnStr;
    ExpBkUserId = UserId;
    ExpBkApiUrl = apiCallUrl;
    BkAspxPage = IsAspxPage;
    ExpBkBasCurrId = "";
    ExpBkRateType = [];
    ExpBkAdrsTariff = [];
    ExpBkAdrsPK = [];
    ExpBkCurrencyData = [];
    ExpBkbTariffEditModified = false;
    ExpBkbPckgChg = false;
    //ExpBkR_NO = R_NO;
    ExpBkRESERVE_NO = RESERVE_NO;   
    ExpBkPageId =PageId;
    ExpBkMode = MODE;
    ExpBkTY = TY;
    ExpBkCopyCrNewRes = COPYCREATENEWRES;
    ExpBk_ITINO = ITINO;
    
    //if (ExpBkApiUrl == "") ExpBkApiUrl = "/TravelAgentBlock/CALL_ALLAPI"
    //FnExBkLoadFoCont();
    //FnExBkLoadFoControl();
    //FnExBkLoadMstInstCont();
    FnExBkLoadMenuUsrRight();
    //var ExpBkRmTyData = GetRoomTyFn();
    //var ExpBkDiscTyData = fnGetDiscTy();
    //var ExpBkGuestTy = fnLoadGuestTy();
    //var ExpBkUpgrdTy = fnGetUpdgrdTy();
    //var ExpBkvStatus = fnLoadStatus();
    //ExpBkRateType = ExpBkfnGetRateTy();
    //FnExBkLoadMstCompany();
    //fnLoadSegmentExpBk();
    //fnLoadBusSourceExpBk();

    var ExpBkRmTyData = "";var ExpBkDiscTyData = "";var ExpBkGuestTy = "";var ExpBkUpgrdTy = "";var ExpBkvStatus = "";
    var ExpBkMarkSeg = ""; var ExpBkBusSource = ""; ExpBkTitle = "";

    var rowData = fnInitDataLoad();    
    
    ExpBkRmTyData = rowData.ROOM_TYPE;
    ExpBkDiscTyData = rowData.DISC_TYPE;
    ExpBkGuestTy = rowData.GUEST_TYPE;
    ExpBkUpgrdTy = rowData.UPGRADE;
    ExpBkRateType = rowData.RATE_TYPE;
    ExpBkvStatus = rowData.RES_STATUS;                
    ExpBkMarkSeg = rowData.MARK_SEG;
    ExpBkBusSource= rowData.BUS_SOURCE;
    ExpBkTitle = rowData.TITLE;
    ExpBkCurrencyData = rowData.CURRENCY;

    var ExpBkGstStat = rowData.GUEST_STATUS;
    var ExpBkVisitPurp = rowData.VISIT_PURP;
    var ExpBkResMode = rowData.RES_MODE;
    var ExpBkBillIns = rowData.BILL_INS;
    var ExpBkPayMode = rowData.PAY_MODE;
    var ExpBkChannel = rowData.CHANNEL;

    ExpBkOthersWindowLoad(ExpBkResMode,ExpBkGstStat,ExpBkChannel,ExpBkPayMode,ExpBkBillIns,ExpBkVisitPurp);    

    var FoControl = rowData.FO_CONTROL;
    var dateval = ""
    if(FoControl.length>0){
        dateval = FoControl[0].CUR_DT1;
    } 

    ExpBkDefRmUpgrdTy = "";
    ExpBkRmUpgrdTy = "";
    ExpBkRmUpgrdReas = "";
    if(ExpBkUpgrdTy.length>0){
        var newData = ExpBkUpgrdTy.filter(function (el) {
            return el.C_IND == "1";
        });
        if (newData.length > 0) ExpBkDefRmUpgrdTy = newData[0].id;
        
    }    
    

    Routing_data = [];
    Spilt_data = [];
    Edit_split = 0;
    split_add1 = "";
    split_add2 = "";
    split_add3 = "";
    split_add4 = "";
    max_sno = 0;
    bRoutModifyTc = "0";

    //var set = {}

    //set = {
    //    id: "RmPos", icon: "fa fa-building", value: "Room Position",
    //};
    //menu_data.push(set);

    //if (ExpBkNN_IND == "1" || ExpBkNN_IND == "2") {        
    //    set = {
    //        id: "Rout", icon: "fa fa-code-branch", value: "Routing",
    //    },
    //    menu_data.push(set);
    //}
   

    

    //    {
    //        id: "RmPos", icon: "fa fa-building", value: "Room Position",
    //        },
    //{
    //    id: "TarEdit", icon: "fas fa-pencil-ruler", value: "Tarrif Edit",
    //    },
    

    //$$("ddlSegmentExpBk").define("options", ExpBkMarkSeg);
    //$$("ddlSegmentExpBk").setValue(''); 

    //$$("BUSSOURCEIDBK").define("options", ExpBkBusSource);
    //$$("BUSSOURCEIDBK").setValue('');    

    //$$("ddlGuestTyBk").define("options", ExpBkGuestTy);
    //$$("ddlGuestTyBk").refresh();   
    

    $$("ddlDiscTypeResPop").define("options", ExpBkDiscTyData);
    $$("ddlDiscTypeResPop").refresh();
    $$("txtComplNarrPop").setValue('');

    $$("ddlUpgrdReasTypePop").define("options", ExpBkUpgrdTy);
    $$("ddlUpgrdReasTypePop").refresh();
    $$("txtUpgrdReasPop").setValue('');

    $$("ddlUpgrdReasTypePop1").define("options", ExpBkUpgrdTy);
    $$("ddlUpgrdReasTypePop1").refresh();
    $$("txtUpgrdReasPop1").setValue('');    

    var CmpNm = rowData.COMPANY_NM //($$("Property").getText());

    //CmpNm = CmpNm.replace("&amp;", "&");
    CmpNm = CmpNm.replace(/&amp;/g, "&");    

    //var tilteval = TitleGstLoad();
    //
    //var dateval = CurrentDateLoad();
    var Assigned_List = [];
    if (RemoteType == "SM") Assigned_List = LoadDropDown("SalesAndMarket", "AssignedToLoad");
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        // head: "Booking Creation",
        head:{
            view:"toolbar", cols:[
                {
                    maxWidth: 400,
                    css: { "text-align": "left !important" },
                    cols:[
                        {
                    
                            view: "text", label: '', value: CmpNm, id: 'PropertyBK', maxWidth: 280, readonly: true, css: "webix_toolbar", inputAlign: "center",
                        }
                    ]
                      
                },                
                { view: "label", label: "Quick Reservation", css: "ExpBkHeader" },
                {
                    view: 'button', id: 'btnTraceExpBk', label: 'T', width: 30, css: "text-bold webix_toolbar",
                    hidden:ExpBkMailApplInd == "2"?false:true,
                    on: {
                        onItemClick: function () {
                            ExpBkTraceShow();
                        }
                    }
                },
                {
                    view: "button", type: "icon", icon: "wxi-close", css: "webix_toolbar", width: 30, click: function () {
                        $$("gridGstExpBk").blockEvent();
                        $$("gridGstExpBk").editStop();
                        $$("gridGstExpBk").unblockEvent();
                        $$("BookingCreatePopup").hide();
                    }
                }
            ]
        },

        id: 'BookingCreatePopup',
        modal: true,
        //width: 900,
        maxHeight:550,
        //close: true,
        on:{
            onShow:function(){
                FormResizeExpBk();
            }
        },
        body: {
            view: "form",
            id: "frmBkCreat",
            scroll: "auto",           
            padding: { top: 0, bottom: 0, left: 5, right: 1 },
            elements: [                                               
                        {  
                            
                            cols: [
                                    {
                                        //width: 830,
                                        rows: [
                                                {
                                                    cols: [
                                                            {
                                                                minWidth: 436,
                                                                rows: [{
                                                                    view: "richselect",
                                                                    label: 'RoomType',
                                                                    id: 'RoomTypeBK',
                                                                    labelWidth: 110,
                                                                    width: 380,
                                                                    inputWidth: 300,
                                                                    options: ExpBkRmTyData,
                                                                    required: "true",
                                                                    title: "Room Type is required",
                                                                    attributes: { maxlength: 50 },
                                                                    on: {
                                                                        onItemClick: function () {
                                                                            $$("gridGstExpBk").editStop();
                                                                            if (fnExpBkNewGstVisbleOrNot() == true) this.getPopup().hide();
                                                                        },
                                                                        onChange: function (NewVal,OldVal) {

                                                                            fnChangRmTy(NewVal, OldVal);
                                                                            //$$("CompanyBK").setValue('');
                                                                            //$$("CompanyidBK").setValue('');
                                                                            //$$("RateCodeBK").setValue('');
                                                                            //$$("RateCodeidBK").setValue('');
                                                                            //$$("PlanBK").setValue('');
                                                                            ////$("#PlanID").val('');
                                                                            //ExpBkPlanId = '';
                                                                            //$$("RoomNOBK").setValue('');
                                                                            //$$("TariffBK").setValue("0.00");
                                                                            //$$("DiscBK").blockEvent();
                                                                            //$$("AmountBK").blockEvent();
                                                                            //$$("DiscDetBK_Btn").hide();
                                                                            //$$("DiscBK").setValue('');
                                                                            //$$("AmountBK").setValue('');                                                                        
                                                                            //$$("DiscBK").unblockEvent();
                                                                            //$$("AmountBK").unblockEvent();
                                                                            //$$("ddlDiscTypeResPop").blockEvent();
                                                                            //$$("ddlDiscTypeResPop").setValue('');
                                                                            //$$("ddlDiscTypeResPop").unblockEvent();
                                                                            //$$("txtComplNarrPop").setValue('');
                                                                            //fnLoadUpgradeRmTyExpBk();
                                                                            //ExpBkAdrsTariff = [];
                                                                            //if (ExpBkModify_Tariff == "1") {
                                                                            //    fnClearTariffData();
                                                                            //}
                                                                            //webix.html.removeCss($$("btnTarEditExpBk").getNode(), "BtnClr");
                                                                            //$$("btnTarEditExpBk").refresh();
                                                        
                                                                        },
                                                                        
                                                                    }
                                                                }
                                                                ]
                                                            },

                                                            {
                                                                rows: [{
                                                                    view: "richselect",label: 'Status',id: 'StatusBK',name: "StatusBK", required: "true", title: "Status is required",
                                                                    labelWidth: 70, width: 190,inputWidth: 190,
                                                                    options: ExpBkvStatus,                                                                                     
                                                                    on: {
                                                                        onChange: function (newval, oldval) {
                                                                            if (newval == "3") {
                                                                                $$("DueDTBK").show();                                                            
                                                                            }
                                                                            else {
                                                                                $$("DueDTBK").hide();
                                                                            }
                                                                        },
                                                                        onItemClick: function () {
                                                                            $$("gridGstExpBk").editStop();
                                                                            if (fnExpBkNewGstVisbleOrNot() == true) this.getPopup().hide();                                                                            
                                                                        },
                                                                        
                                                                    }
                                                                }
                                                                ]
                                                            },
                                                            {
                                                                id: "divDTBK", width: 205,
                                                                rows: [
                                                                        {
                                                                            view: "datepicker", label: 'Due Date', id: 'DueDTBK',labelWidth: 60,width: 175,inputWidth: 175,
                                                                            value: dateval, stringResult: true, format: "%d/%m/%Y", align: "left", hidden: true,
                                                                            on: {                                                                                
                                                                                onItemClick: function () {
                                                                                    $$("gridGstExpBk").editStop();
                                                                                    if (fnExpBkNewGstVisbleOrNot() == true) this.getPopup().hide();
                                                                                }
                                                                            }

                                                                        },
                                                                ]
                                                            },

                                                            
                                                    ]
                                                },
                                                {
                                                    cols: [                                         

                                                            {
                                                                minWidth: 440,
                                                                cols: [
                                                                        {
                                                                            view: "text",label: 'Room No',id: 'RoomNOBK',labelWidth: 110,width: 210,inputWidth: 210,readonly: true,
                                                                            css: "ReadOnlyText ExpBkRmNoTextBox", inputAlign: "center",
                                                                        },
                                                                    {
                                                                        view: 'button', type: "icon", icon: "wxi-search", id: 'RoomNoBK_Btn',inputWidth: 30, width: 30, align:"left",
                                                                        on: {
                                                                            onItemClick: function () {
                                                                                //fnRoomNoSrchWindowDesign(); 
                                                                                $$("gridGstExpBk").editStop();
                                                                                if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                                $$("RoomNoSrch").show();
                                                                                //$$("RoomNoSrch").setPosition((window.innerWidth - $$("RoomNoSrch").$width) / 2, (window.innerHeight - $$("RoomNoSrch").$height) / 2);
                                                                                var str1 = $$("HHMMBK1").getValue();
                                                                                var res11 = str1.substr(0, 2);
                                                                                var res12 = str1.substr(2, 2);
                                                                                var str2 = $$("HHMMBK2").getValue();
                                                                                var res21 = str2.substr(0, 2);
                                                                                var res22 = str2.substr(2, 2);
                                                                                var ArrivalBK = $$("ArrivalBK").getValue();
                                                                                if (ArrivalBK != "") {
                                                                                    ArrivalBK = ArrivalBK.substring(0, 10).toString();
                                                                                    ArrivalBK = ArrivalBK.split('-')[2] + "/" + ArrivalBK.split('-')[1] + "/" + ArrivalBK.split('-')[0];
                                                                                }
                                                                                var DepatureBK = $$("DepatureBK").getValue();
                                                                                if (DepatureBK != "") {
                                                                                    DepatureBK = DepatureBK.substring(0, 10).toString();
                                                                                    DepatureBK = DepatureBK.split('-')[2] + "/" + DepatureBK.split('-')[1] + "/" + DepatureBK.split('-')[0];
                                                                                }
                                                                                //var apiUrl = "/TravelAgentBlock/FORMSRCH_API_CALL";
                                                                                if(ExpBkTY == "3"){
                                                                                    fnRoomSrchLoad(cmpid, UserId, ConnStr, $$("RoomTypeBK").getValue(), ArrivalBK, res11 + ':' + res12, DepatureBK, res21 + ':' + res22, "GR", ExpBkApiUrl);
                                                                                }
                                                                                else{
                                                                                    fnRoomSrchLoad(cmpid, UserId, ConnStr, $$("RoomTypeBK").getValue(), ArrivalBK, res11 + ':' + res12, DepatureBK, res21 + ':' + res22, "RC", ExpBkApiUrl);
                                                                                }
                                                                                //RoomNoLoadfn();
                                                                                //RoomNoLoadFns();
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        view: "button", type: "icon", id: "RoomNOBKDel", icon: "wxi-trash", inputWidth: 30, width: 80,
                                                                        click: function () {
                                                                            $$("gridGstExpBk").editStop();
                                                                            if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                            fnExpBkHideAllPop();
                                                                            $$("RoomNOBK").setValue('');
                                                                        }
                                                                    },

                                                                {
                                                                    view: "text", label: 'Rooms', id: 'NoOfRoomsBK', labelWidth: 50, width: 110, inputWidth: 110, hidden: true, attributes: { maxlength: 3 },
                                                                    on: {
                                                                        "onKeyPress": function (code, e) {
                                                                            if (e.key == "'") return false;
                                                                            return fnExBkNumericText(code, e);
                                                                        }
                                                                    }
                                                                    //pattern: { mask: '###', allow: /[0-9]/g },
                                                                },

                                                                ]
                                                            },
                                                            { view: "text", label: 'Reserve No',id: 'ReserveNO',labelWidth: 70, width: 190,inputWidth: 190, readonly: true,css: "ReadOnlyText",},
                                                            {  id:"RsridRow",
                                                                width: 140,
                                                                rows:[
                                                                    { view: "text",label: 'RsrId',id: 'RsrId', labelWidth: 40, width: 140,inputWidth: 120,readonly: true,css: "ReadOnlyText",hidden: true,align:"left",},
                                                                ]
                                                            },
                                                    ]
                                                },

                                                {
                                                    cols: [
                                                        {

                                                            rows: [
                                                                {
                                                                    view: "datepicker",label: 'Arrival', id: 'ArrivalBK',labelWidth: 110,width: 230,inputWidth: 230,value: dateval,
                                                                    stringResult: true,format: "%d/%m/%Y", required: "true",
                                                                    on: {
                                                                        onChange: function (NewVal, OldVal) {
                                                                            ArrDtChangeExBk();
                                                                        },
                                                                        
                                                                        onItemClick: function () {
                                                                            $$("gridGstExpBk").editStop();
                                                                            if (fnExpBkNewGstVisbleOrNot() == true) this.getPopup().hide();
                                                                        }
                                                                        
                                                                    }
                                                                },


                                                            ]
                                                        },

                                                        {
                                                            rows: [
                                                                {
                                                                    view: "text", id: 'HHMMBK1',width: 90,inputWidth: 70,placeholder: "HH:MM", pattern: { mask: "##:##", allow: /[0-9]/g },
                                                                    on: {
                                                                        'onKeyPress': function (e, g) {
                                                                            
                                                                            if (e == 9) {
                                                                                var Nextid = webix.UIManager.getNext($$("HHMMBK1"));
                                                                                webix.UIManager.setFocus(Nextid);
                                                                            }
                                                                        },
                                                                        'onFocus': function (Curr, Prev) {
                                                                            
                                                                            var pos = this.getText().length;
                                                                            webix.html.setSelectionRange(this.getInputNode(), pos);
                                                                        },

                                                                    }

                                                                }
                                                            ]
                                                        },
                                                        { view: "text",  label: 'Nights', id: 'NightsBk', width: 120, inputWidth: 110, labelWidth: 50, pattern: { mask: "###", allow: /[0-9]/g },
                                                            on: {
                                                                'onKeyPress': function (e, g) {
                                                                    
                                                                    if (e == 9) {
                                                                        var Nextid = webix.UIManager.getNext($$("NightsBk"));
                                                                        webix.UIManager.setFocus(Nextid);
                                                                    }
                                                                },
                                                                'onFocus': function (Curr, Prev) {
                                                                    
                                                                    var pos = this.getValue().length;
                                                                    webix.html.setSelectionRange(this.getInputNode(), pos);
                                                                },

                                                                onTimedKeyPress: function () {
                                                                    NightsChangeExBk();
                                                                },
                                                                onChange: function (NewVal, OldVal) {
                                                                    if ($$("NightsBk").getValue() == "") $$("NightsBk").setValue('0');
                                                                },

                                                            }
                                                        },

                                                        {
                                                            rows: [
                                                                { view: "datepicker",label: 'Departure',id: 'DepatureBK', labelWidth: 70,width: 190,inputWidth: 190,stringResult: true,                                                   
                                                                    format: "%d/%m/%Y", required: "true",
                                                                    on: {
                                                                        onChange: function (NewVal, OldVal) {
                                                                            DeptDtChangeExBk();
                                                                        },
                                                                        onItemClick: function () {
                                                                            $$("gridGstExpBk").editStop();
                                                                            if (fnExpBkNewGstVisbleOrNot() == true) this.getPopup().hide();
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },

                                                        {
                                                            rows: [
                                                                { view: "text",id: 'HHMMBK2', width: 80,inputWidth: 70, placeholder: "HH:MM",
                                                                    pattern: { mask: "##:##", allow: /[0-9]/g },
                                                                    on: {
                                                                        'onKeyPress': function (e, g) {
                                                                            
                                                                            if (e == 9) {
                                                                                var Nextid = webix.UIManager.getNext($$("HHMMBK2"));
                                                                                webix.UIManager.setFocus(Nextid);
                                                                            }
                                                                        },
                                                                        'onFocus': function (Curr, Prev) {
                                                                            
                                                                            var pos = this.getText().length;
                                                                            webix.html.setSelectionRange(this.getInputNode(), pos);
                                                                        },

                                                                    }
                                                                }
                                                            ]
                                                        },                                        

                                                    ]
                                                },
                                                {
                                                    cols: [                                       
                                                        {
                                                            width: 180,
                                                            cols: [
                                                                { view: "text",label: 'Adult',id: 'AdultBK', labelWidth: 110, width: 180, inputWidth: 170,inputAlign: "center",
                                                                    css: "ExpBkTextBox", attributes: { maxlength: 50 },
                                                                    pattern: { mask: '###', allow: /[0-9]/g },
                                                                    on: {
                                                                        'onKeyPress': function (e, g) {
                                                                            //
                                                                            if (e == 9) {
                                                                                var Nextid = webix.UIManager.getNext($$("AdultBK"));
                                                                                webix.UIManager.setFocus(Nextid);
                                                                                return false;
                                                                            }
                                                                        },
                                                                        'onFocus': function (Curr, Prev) {
                                                                            //
                                                                            var pos = this.getValue().length;
                                                                            webix.html.setSelectionRange(this.getInputNode(), pos);
                                                                        },
                                                                        onTimedKeyPress: function () {
                                                                            
                                                                                                                                                        
                                                                        },
                                                                        onChange: function (NewVal, OldVal) {
                                                                            
                                                                            if ($$("AdultBK").getValue() == "" || $$("AdultBK").getValue() == "0") {
                                                                                $$("AdultBK").blockEvent();
                                                                                $$("AdultBK").setValue(1);
                                                                                $$("AdultBK").unblockEvent();
                                                                            }
                                                                            fnExpBkGuestLoad();
                                                                            RateCodeTariffloadfn(1);
                                                                            var TotPax = fnExpBkPaxChange();
                                                                            if (ExpBkModify_Tariff == "1") {
                                                                                if (parseInt(TotPax == "" ? 0 : TotPax) != parseInt(ExpBkTotPax == "" ? 0 : ExpBkTotPax)) {

                                                                                    if (ExpBkAdrsTariff.length > 0) {

                                                                                        webix.alert({
                                                                                            type: 'warning',
                                                                                            ok: "OK",
                                                                                            text: "'Tariff Edit' is defined previously " + ExpBkTotPax + " Pax"
                                                                                        }).then(function () {
                                                                                            if ($$("TarEdPop")) {
                                                                                                if ($$("TarEdPop").isVisible() == true) {                                                                                                    
                                                                                                    return false;
                                                                                                }
                                                                                            }
                                                                                            fnExBkTariffShow();
                                                                                            $$("TEbtnCancel").disable();
                                                                                            return false;
                                                                                        })
                                                                                    }
                                                                                }
                                                                            }
                                                                            ExpBkTotPax = TotPax;
                                                                        },

                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        { 
                                                            view: "text", label: ExpBkC1_NR != "" ? ExpBkC1_NR : 'Child', id: 'ChildBK',labelWidth: 60, width: 130, inputWidth: 110,
                                                            css: "ExpBkTextBox",inputAlign: "center",attributes: { maxlength: 50 }, pattern: { mask: '###', allow: /[0-9]/g },
                                                            on: {
                                                                'onKeyPress': function (e, g) {
                                                                    //
                                                                    if (e == 9) {
                                                                        var Nextid = webix.UIManager.getNext($$("ChildBK"));
                                                                        webix.UIManager.setFocus(Nextid);
                                                                        return false;
                                                                    }
                                                                },
                                                                'onFocus': function (Curr, Prev) {
                                                                    //
                                                                    var pos = this.getValue().length;
                                                                    webix.html.setSelectionRange(this.getInputNode(), pos);
                                                                },
                                                                onTimedKeyPress: function () {
                                                                    
                                                                    
                                                                },
                                                                onChange: function (NewVal, OldVal) {                                                                    
                                                                    fnExpBkGuestLoad();
                                                                    RateCodeTariffloadfn(1);
                                                                    var TotPax = fnExpBkPaxChange();
                                                                    if (ExpBkModify_Tariff == "1") {
                                                                        if (parseInt(TotPax == "" ? 0 : TotPax) != parseInt(ExpBkTotPax == "" ? 0 : ExpBkTotPax)) {

                                                                            if (ExpBkAdrsTariff.length > 0) {
                                                                                webix.alert({
                                                                                    type: 'warning',
                                                                                    ok: "OK",
                                                                                    text: "'Tariff Edit' is defined previously " + ExpBkTotPax + " Pax"
                                                                                }).then(function () {
                                                                                    if ($$("TarEdPop")) {
                                                                                        if ($$("TarEdPop").isVisible() == true) {                                                                                            
                                                                                            return false;
                                                                                        }
                                                                                    }
                                                                                    fnExBkTariffShow();
                                                                                    $$("TEbtnCancel").disable();
                                                                                    return false;

                                                                                })
                                                                            }
                                                                        }
                                                                    }
                                                                    ExpBkTotPax = TotPax;
                                                                },

                                                            }
                                                        },
                                                        {
                                                            view: "text", label: ExpBkC2_NR != "" ? ExpBkC2_NR : 'CH 2',id: 'ChildBK2',labelWidth: 60,width: 130, inputWidth: 110,
                                                            inputAlign: "center", css: "ExpBkTextBox", attributes: { maxlength: 2 },hidden: ((ExpBkC3_IND == "3" || ExpBkC3_IND == "2") ? false : true),
                                                            pattern: { mask: '##', allow: /[0-9]/g },
                                                            on: {
                                                                'onKeyPress': function (e, g) {
                                                                    //
                                                                    if (e == 9) {
                                                                        var Nextid = webix.UIManager.getNext($$("ChildBK2"));
                                                                        webix.UIManager.setFocus(Nextid);
                                                                        return false;
                                                                    }
                                                                },
                                                                'onFocus': function (Curr, Prev) {
                                                                    //
                                                                    var pos = this.getValue().length;
                                                                    webix.html.setSelectionRange(this.getInputNode(), pos);
                                                                },
                                                                onTimedKeyPress: function () {
                                                                    
                                                                    
                                                                },
                                                                onChange: function (NewVal, OldVal) {
                                                                    fnExpBkGuestLoad();
                                                                    RateCodeTariffloadfn(1);
                                                                    var TotPax = fnExpBkPaxChange();
                                                                    if (ExpBkModify_Tariff == "1") {
                                                                        if (parseInt(TotPax == "" ? 0 : TotPax) != parseInt(ExpBkTotPax == "" ? 0 : ExpBkTotPax)) {

                                                                            if (ExpBkAdrsTariff.length > 0) {

                                                                                webix.alert({
                                                                                    type: 'warning',
                                                                                    ok: "OK",
                                                                                    text: "'Tariff Edit' is defined previously " + ExpBkTotPax + " Pax"
                                                                                }).then(function () {
                                                                                    if ($$("TarEdPop")) {
                                                                                        if ($$("TarEdPop").isVisible() == true) {                                                                                            
                                                                                            return false;
                                                                                        }
                                                                                    }
                                                                                    fnExBkTariffShow();
                                                                                    $$("TEbtnCancel").disable();
                                                                                    return false;

                                                                                })
                                                                            }
                                                                        }
                                                                    }
                                                                    ExpBkTotPax = TotPax;
                                                                },

                                                            }
                                                        },
                                                        {
                                                            view: "text", label: (ExpBkC3_NR != "" ? ExpBkC3_NR : 'CH 3'), id: 'ChildBK3',labelWidth: 60, width: 130,
                                                            inputWidth: 110,inputAlign: "center", css: "ExpBkTextBox",hidden: (ExpBkC3_IND == "3" ? false : true),
                                                            attributes: { maxlength: 2 }, pattern: { mask: '##', allow: /[0-9]/g },
                                                            on: {
                                                                'onKeyPress': function (e, g) {
                                                                    //
                                                                    if (e == 9) {
                                                                        var Nextid = webix.UIManager.getNext($$("ChildBK3"));
                                                                        webix.UIManager.setFocus(Nextid);
                                                                        return false;
                                                                    }
                                                                },
                                                                'onFocus': function (Curr, Prev) {
                                                                    //
                                                                    var pos = this.getValue().length;
                                                                    webix.html.setSelectionRange(this.getInputNode(), pos);
                                                                },
                                                                onTimedKeyPress: function () {
                                                                    //RateCodeTariffloadfn();                                                                    
                                                                },
                                                                onChange: function (NewVal, OldVal) {
                                                                    fnExpBkGuestLoad();
                                                                    RateCodeTariffloadfn(1);
                                                                    var TotPax = fnExpBkPaxChange();
                                                                    if (ExpBkModify_Tariff == "1") {
                                                                        if (parseInt(TotPax == "" ? 0 : TotPax) != parseInt(ExpBkTotPax == "" ? 0 : ExpBkTotPax)) {

                                                                            if (ExpBkAdrsTariff.length > 0) {

                                                                                webix.alert({
                                                                                    type: 'warning',
                                                                                    ok: "OK",
                                                                                    text: "'Tariff Edit' is defined previously " + ExpBkTotPax + " Pax"
                                                                                }).then(function () {
                                                                                    if ($$("TarEdPop")) {
                                                                                        if ($$("TarEdPop").isVisible() == true) {                                                                                            
                                                                                            return false;
                                                                                        }
                                                                                    }
                                                                                    fnExBkTariffShow();
                                                                                    $$("TEbtnCancel").disable();
                                                                                    return false;

                                                                                })
                                                                            }
                                                                        }
                                                                    }
                                                                    ExpBkTotPax = TotPax;
                                                                },                                                                

                                                            }
                                                        },
                                                        {
                                                            view: "text", label: "Infant",id: 'InfantBK',labelWidth: 60, width: 130,inputWidth: 110, css: "ExpBkTextBox",inputAlign: "center",
                                                            hidden: (ExpBkJ1_IND == "1" ? false : true),attributes: { maxlength: 1 }, pattern: { mask: '#', allow: /[0-9]/g },
                                                            on: {
                                                                'onKeyPress': function (e, g) {
                                                                    //
                                                                    if (e == 9) {
                                                                        var Nextid = webix.UIManager.getNext($$("InfantBK"));
                                                                        webix.UIManager.setFocus(Nextid);
                                                                        return false;
                                                                    }
                                                                },
                                                                'onFocus': function (Curr, Prev) {
                                                                    //
                                                                    var pos = this.getValue().length;
                                                                    webix.html.setSelectionRange(this.getInputNode(), pos);
                                                                },
                                                                onTimedKeyPress: function () {
                                                                    //RateCodeTariffloadfn();
                                                                    //fnExpBkGuestLoad();
                                                                },
                                                                onChange: function (NewVal, OldVal) {
                                                                    fnExpBkGuestLoad();
                                                                    RateCodeTariffloadfn(1);
                                                                },
                                                            }
                                                        },

                                                        { view: "text", label: 'Currency', id: 'BKCURRENCY_NM', labelWidth: 70, minWidth: 150, maxWidth: 150, readonly: true },
                                                        { view: "text", id: 'BKCURRENCY_ID', hidden: true, },

                                                    ]
                                                },

                                                {
                                                    cols:[
                                                    {
                                                        id: "gridGstExpBk",                                                    
                                                        //select: 'row',
                                                        select: "cell",
                                                        view: "datatable",
                                                        fixedRowHeight: false,
                                                        resizeColumn:true,
                                                        rowHeight: 26,
                                                        headerRowHeight: 22,
                                                        height: 105,                                                        
                                                        width: 750,                                                        
                                                        autoConfig: true,
                                                        editable: true,                                                    
                                                        spans: true,
                                                        position: "flex",
                                                        css: "webix_header_border ExpBkgrid",
                                                        data: [],
                                                        scrollY: true,
                                                        scrollX: false,                                                        
                                                        columns: [
                                                            { id: "TYPE", header: '', width: 42, css: { 'text-align': 'center ! important' }, },
                                                            {
                                                                id: "TITTLE", header: "Tittle", width: 70, editor: "richselect", 
                                                                suggest: {
                                                                    view: "suggest",
                                                                    css: "ExpBkSugg1",
                                                                    body: {
                                                                        css: "ExpBkSugg",
                                                                        data: ExpBkTitle
                                                                    }
                                                                },
                                                                template: function (obj, common, val, config) {
                                                                    //
                                                                    if (val != "" && val != null) {
                                                                        var data = config.suggest.body.data;
                                                                        var newData = data.filter(function (el) {
                                                                            return el.id == val;
                                                                        });
                                                                        if (newData.length > 0) return "<div style='width:55%;float: left'>" + newData[0].value + "</div><div style='min-width:15px;max-width:20px;float: left'><span style='float:right;font-size:30px' class='webix_input_icon wxi-menu-down'></span></div>";
                                                                        else return "<span style='float:right;font-size:30px' class='webix_input_icon wxi-menu-down'></span>";
                                                                    }
                                                                    else return "<span style='float:right;font-size:30px' class='webix_input_icon wxi-menu-down'></span>";
                                                                },
                                                            },
                                                            
                                                            { id: "LAST_NM", header: 'Last Name', editor: "text", width: 260, css: { 'text-align': 'left ! important' }, },
                                                            { id: "FIRST_NM", header: 'First Name', editor: "text", minWidth: 270,fillspace:true, css: { 'text-align': 'left ! important' }, },
                                                            { id: "ixBtnGst", header: " ", template: searchicon, width: 28, css: 'ExpBkgridbtn', margin: { left: 1, right: 1, top: 1, bottom: 1 } },
                                                            { id: "ixBtnGstEdit", header: " ", template: searchicon1, width: 28, css: 'ExpBkgridbtn', margin: { left: 1, right: 1, top: 1, bottom: 1 } },
                                                            { id: "ixBtnGstTT", header: " ", template: searchicon2, width: 28, css: 'ExpBkgridbtn', margin: { left: 1, right: 1, top: 1, bottom: 1 }, },
                                                            { id: "GUEST_ID", header: 'GUESTID', hidden: true },
                                                            { id: "INT_ID", header: 'INTID', hidden: true },
                                                            { id: "INF_IND", header: 'INF_IND', hidden: true },
                                                            { id: "GUEST_SNO", header: 'GUEST_SNO', hidden: true },
                                                            { id: "ROOM_STAY_NO", header: 'ROOM_STAY_NO', hidden: true },
                                                            { id: "CHECKIN_IND", header: 'CHECKIN_IND', hidden: true },


                                                            { id: "F_IND", header: 'F_IND', hidden: true },
                                                            { id: "AR_PR_FLNO", header: 'AR_PR_FLNO', hidden: true },
                                                            { id: "AR_PR_DT", header: 'AR_PR_DT', hidden: true },
                                                            { id: "AR_PR_TM", header: 'AR_PR_TM', hidden: true },
                                                            { id: "AR_SEC_FLNO", header: 'AR_SEC_FLNO', hidden: true },
                                                            { id: "AR_SEC_DT", header: 'AR_SEC_DT', hidden: true },
                                                            { id: "AR_SEC_TM", header: 'AR_SEC_TM', hidden: true },
                                                            { id: "AR_TR_FLNO", header: 'AR_TR_FLNO', hidden: true },
                                                            //{ id: "AR_TR_ID", header: 'AR_TR_ID', hidden: true },
                                                            //{ id: "AR_TR_NO", header: 'AR_TR_NO', hidden: true },
                                                            { id: "AR_TR_DT", header: 'AR_TR_DT', hidden: true },
                                                            { id: "AR_TR_TM", header: 'AR_TR_TM', hidden: true },
                                                            { id: "AR_AD_CHR", header: 'AR_AD_CHR', hidden: true },
                                                            { id: "AR_CH_CHR", header: 'AR_CH_CHR', hidden: true },                                                            

                                                            { id: "DF_IND", header: 'DF_IND', hidden: true },
                                                            { id: "DP_PR_FLNO", header: 'DP_PR_FLNO', hidden: true },
                                                            { id: "DP_PR_DT", header: 'DP_PR_DT', hidden: true },
                                                            { id: "DP_PR_TM", header: 'DP_PR_TM', hidden: true },
                                                            { id: "DP_SEC_FLNO", header: 'DP_SEC_FLNO', hidden: true },
                                                            { id: "DP_SEC_DT", header: 'DP_SEC_DT', hidden: true },
                                                            { id: "DP_SEC_TM", header: 'DP_SEC_TM', hidden: true },
                                                            { id: "DP_TR_FLNO", header: 'DP_TR_FLNO', hidden: true },
                                                            //{ id: "AR_TR_ID", header: 'AR_TR_ID', hidden: true },
                                                            //{ id: "DP_TR_NO", header: 'DP_TR_NO', hidden: true },                                                            
                                                            { id: "DP_TR_DT", header: 'DP_TR_DT', hidden: true },
                                                            { id: "DP_TR_TM", header: 'DP_TR_TM', hidden: true },
                                                            { id: "DP_AD_CHR", header: 'DP_AD_CHR', hidden: true },
                                                            { id: "DP_CH_CHR", header: 'DP_CH_CHR', hidden: true },
                                                            
                                                        ],
                                                        scheme: {
                                                            $init: function (item) {                                                            
                                                                if (item.CHECKIN_IND == "1") {
                                                                    //item.$css = { "color": "red !important" };
                                                                    $$("gridGstExpBk").addCellCss(item.id, "TYPE", "BKblacklist");
                                                                    $$("gridGstExpBk").addCellCss(item.id, "TITTLE", "BKblacklist");
                                                                    $$("gridGstExpBk").addCellCss(item.id, "LAST_NM", "BKblacklist");
                                                                    $$("gridGstExpBk").addCellCss(item.id, "FIRST_NM", "BKblacklist");
                                                                }
                                                                if (item.F_IND == "2" || item.DF_IND == "2") {
                                                                    $$("gridGstExpBk").addCellCss(item.id, "ixBtnGstTT", "PBtnClr");
                                                                }
                                                            },                       
                                                        },
                                                        on: {
                                                            onAfterLoad: function () {
                                                                webix.delay(function () {
                                                                    fnExpBkLoadContextMenu(this);
                                                                    this.refresh();
                                                                    this.render();
                                                                }, this);
                                                            },
                                                            onBeforeSelect: function (cell) {
                                                                
                                                                vRow = cell.row;
                                                                vCol = cell.column;
                                                                var vItem = this.getItem(vRow);
                                                                var GuestId = vItem.GUEST_ID;
                                                                var CheckInInd = vItem.CHECKIN_IND;
                                                                if (CheckInInd == "1") return false;

                                                                if (vCol == "TITTLE") {
                                                                    this.editStop();
                                                                    if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                    if (GuestId != null && GuestId != "") return false;
                                                                }
                                                            },

                                                            onBeforeEditStart: function (cell) {
                                                                //
                                                                vRow = cell.row;
                                                                vCol = cell.column;
                                                                var vItem = this.getItem(vRow);
                                                                var GuestId = vItem.GUEST_ID;
                                                                var CheckInInd = vItem.CHECKIN_IND;
                                                                if (CheckInInd == "1") return false;
                                                                
                                                                if (vCol == "LAST_NM") {
                                                                    if (GuestId != null && GuestId != "") return false;                                                                

                                                                }
                                                                else if (vCol == "FIRST_NM") {
                                                                    if (GuestId != null && GuestId != "") return false;                                                                
                                                                }
                                                                else if (vCol == "TITTLE") {
                                                                    this.editStop();
                                                                    if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                    if (GuestId != null && GuestId != "") return false;
                                                                }
                                                            },
                                                            //onChange:function() {
                                                            //    
                                                            //},

                                                            onAfterEditStart: function (cell) {
                                                                //
                                                                vRow = cell.row;
                                                                vCol = cell.column;
                                                                ExpBkSelColumn = vCol;
                                                                if (vCol == "LAST_NM" ) {
                                                                    this.getEditor().getInputNode().setAttribute("maxlength", 25);
                                                                
                                                                }
                                                                else if (vCol == "FIRST_NM" ) {
                                                                    this.getEditor().getInputNode().setAttribute("maxlength", 30);                                                                
                                                                }                                                            
                                                            },
                                                        
                                                            onAfterEditStop: function (state, editor) {
                                                                
                                                                var columnId = editor.column;
                                                                var Row = editor.row;
                                                                var SelRow = this.getItem(Row);

                                                                if (columnId == "LAST_NM") {
                                                                    var LstNm = SelRow.LAST_NM;
                                                                    if (LstNm != "") {
                                                                        SelRow.LAST_NM = fnExpBkGuestValid(LstNm);
                                                                        this.updateItem(Row, SelRow);
                                                                    }
                                                                }
                                                                else if (columnId == "FIRST_NM") {
                                                                    var FirstNm = SelRow.FIRST_NM;
                                                                    if (FirstNm != "") {
                                                                        SelRow.FIRST_NM = fnExpBkGuestValid(FirstNm);
                                                                        this.updateItem(Row, SelRow);
                                                                    }

                                                                }
                                                                var SelRow = this.getItem(Row);

                                                                if (columnId == "FIRST_NM") {
                                                                    var GstId = SelRow.GUEST_ID;
                                                                    var LstNm = SelRow.LAST_NM == null ? "" : SelRow.LAST_NM.toString().trim();
                                                                    var Title = SelRow.TITTLE == null ? "" : SelRow.TITTLE.toString().trim();
                                                                    var FirstNm = SelRow.FIRST_NM == null ? "" : SelRow.FIRST_NM.toString().trim();

                                                                    var TittleNm = "";
                                                                    if (Title != "") {
                                                                        var newData = ExpBkTitle.filter(function (el) {
                                                                            return el.id == Title;
                                                                        });
                                                                        if (newData.length > 0) {
                                                                            TittleNm = newData[0].value;
                                                                        }
                                                                    }

                                                                    if (GstId == "" && LstNm != "") {
                                                                        
                                                                        if (fnExpBkNewGstVisbleOrNot() == false) {
                                                                                                                                                        
                                                                            fnNewGstCreatePopLoad(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, BkAspxPage, LstNm, FirstNm, Title, TittleNm);
                                                                            this.blockEvent();
                                                                            this.select(Row, columnId);
                                                                            this.unblockEvent();
                                                                            fnExpBkHideAllPop();
                                                                        }
                                                                    }
                                                                    
                                                                }                                                           
                                                            },
                                                            'onItemClick': function (id) {
                                                                debugger;
                                                                var getval = this.getItem(id.row);
                                                                var getColumn = id.column;                                                                
                                                                var GuestId = getval.GUEST_ID;
                                                                var CheckInInd = getval.CHECKIN_IND;                                                               
                                                            
                                                                if (getColumn == "ixBtnGst") {
                                                                    $$("gridGstExpBk").editStop();
                                                                    if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                    fnExpBkHideAllPop();
                                                                    if (CheckInInd == "1") return false;
                                                                    btnBKGstsrchClick();
                                                                }
                                                                else if (getColumn == "ixBtnGstEdit") {
                                                                    var getval1 = this.getItem(this.getFirstId());
                                                                    var GuestId1 = getval1.GUEST_ID;
                                                                    this.editStop();
                                                                    if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                    fnExpBkHideAllPop();
                                                                    if (GuestId != "") {
                                                                        $$("GuestProfilePop").show();
                                                                        fnLoadGuestProf(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, false, GuestId, GuestId1, null, false);
                                                                    }
                                                                
                                                                }
                                                                else if (getColumn == "ixBtnGstTT") {
                                                                    this.editStop();
                                                                    if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                    fnExpBkHideAllPop();
                                                                    
                                                                    if (CheckInInd == "1") return false;
                                                                    var vArrDt = $$("ArrivalBK").getText();
                                                                    var vDepDt = $$("DepatureBK").getText();
                                                                    var Cur = $$("BKCURRENCY_ID").getValue();
                                                                    if (GuestId != "") {                                                                        
                                                                        PickupDropPopWindowLoad(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, false, vArrDt, vDepDt, Cur, getval);
                                                                    }

                                                                }
                                                            },
                                                            "onKeyPress": function (code, e) {
                                                                
                                                                var selRow = this.getSelectedId(false);
                                                                var rowid = selRow.row;
                                                                var Colid = selRow.column;
                                                                var Item = this.getItem(rowid);
                                                                var charCode = e.which || e.keyCode;

                                                                if (this.getEditor() != null && this.getEditor() != 0) {
                                                                    if (ExpBkSelColumn == "LAST_NM" || ExpBkSelColumn == "FIRST_NM") {
                                                                        if (e.key == "'") return false;
                                                                        return fnExpBkAlphabetText(code, e);
                                                                    }
                                                                }

                                                            },
                                                        }
                                                    },{}
                                                    ]
                                                        
                                                },                                                

                                                {
                                                    hidden:true,
                                                    cols: [                                       
                                                                {

                                                                    rows: [
                                                                        {
                                                                            cols: [

                                                                                    {
                                                                                        rows: [
                                                                                            {
                                                                                                view: "combo", label: 'Guest',id: 'TitleBK',labelWidth: 110, minWidth: 190,inputWidth: 190,                                                                            
                                                                                                css: { "padding-top": "16px" }, required: "true",options:ExpBkTitle,
                                                                                            },
                                                                                        ]
                                                                                    },
                                                                                { 
                                                                                    view: "text", label: 'Last Name', id: 'LastNMBK',labelWidth: 0,minWidth: 240,labelPosition: "top", css: "TopLabel",
                                                                                    inputWidth: 240,attributes: { maxlength: 25 },required: "true",
                                                                                    on: {
                                                                                        "onKeyPress": function (code, e) {
                                                                                            if (e.key == "'") return false;
                                                                                            return fnExpBkAlphabetText(code, e);
                                                                                        },
                                                                                        onChange: function (newVal, OldVal) {
                                                                                            if (newVal != "") $$("LastNMBK").setValue(fnExpBkGuestValid(newVal));

                                                                                        },
                                                                                        
                                                                                    }
                                                                                },
                                                                                {
                                                                                    view: "text",label: 'First Name',id: 'FirstNMBK',labelWidth: 0,labelPosition: "top",css: "TopLabel",
                                                                                    minWidth: 270,inputWidth: 270, attributes: { maxlength: 30 },
                                                                                    on: {
                                                                                        "onBlur": function (prev_view) {
                                                                                            

                                                                                            var GstId = $$("GuestId").getValue();
                                                                                            var LstNm = $$("LastNMBK").getValue();

                                                                                            if (GstId == "" && LstNm != "") {                                                                               
                                                                                                $$('FirstNMBK').blockEvent();
                                                                                                var Nextid = webix.UIManager.getNext($$("FirstNMBK"));
                                                                                                webix.UIManager.setFocus(Nextid);
                                                                                                $$('FirstNMBK').unblockEvent();
                                                                                                if (fnExpBkNewGstVisbleOrNot() == false) {
                                                                                                    fnNewGstCreatePopLoad(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, BkAspxPage, LstNm, $$('FirstNMBK').getValue(), $$("TitleBK").getValue(), $$("TitleBK").getText());
                                                                                                }
                                                                                            }
                                                                                            return true;
                                                                                        },
                                                                                        "onKeyPress": function (code, e) {
                                                                                            if (e.key == "'") return false;
                                                                                            return fnExpBkAlphabetText(code, e);
                                                                                        },
                                                                                        onChange: function (newVal, OldVal) {
                                                                                            if (newVal != "") $$("FirstNMBK").setValue(fnExpBkGuestValid(newVal));

                                                                                        },
                                                                                    }

                                                                                },
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    rows: [
                                                                        {
                                                                            padding: { top: 15 },
                                                                            cols: [
                                                                                {
                                                                                    view: 'button',type: "icon",icon: "wxi-search",id: 'GstBK_Btn',inputWidth: 30,value: "Guest Search",tooltip: true,width: 30,
                                                                                    on: {
                                                                                        onItemClick: function () {                                                                           
                                                                                            btnBKGstsrchClick();
                                                                                        }
                                                                                    }
                                                                                },
                                                                                {
                                                                                    view: 'button', label: '<span class="fa fa-edit"></span>',id: 'btnGstProf', inputWidth: 30,
                                                                                    minWidth: 30,value: "Guest Profile Edit",tooltip: true,
                                                                                    on: {
                                                                                        onItemClick: function () {                                                                           
                                                                                            var GuestId = $$("GuestId").getValue();
                                                                                            if (GuestId != "") {
                                                                                                $$("GuestProfilePop").show();                                                                               
                                                                                                fnLoadGuestProf(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, false, GuestId, GuestId, null, false);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }


                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                    ]

                                                },
                                                {
                                                                           
                                                    cols: [
                                                            {  view: "text", label: 'Travel Agent', id: 'TRVAGNTBK', labelWidth: 110, readonly: true, css: "ReadOnlyText",width: 370,
                                                                inputWidth: 370,attributes: { maxlength: 50 }
                                                            },
                                                            {
                                                                view: 'button', type: "icon", icon: "wxi-search", name: 'TrvAgntBK_Btn', id: 'TrvAgntBK_Btn', inputWidth: 30, minWidth: 30, maxWidth: 30,
                                                                on: {
                                                                    onItemClick: function () {
                                                                        $$("gridGstExpBk").editStop();
                                                                        if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                        fnExpBkHideAllPop();
                                                                        btnTrvAgntSrchClickExpBk();
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                view: "button", type: "icon", id: "TRVAGNTBKDel", icon: "wxi-trash", inputWidth: 30, minWidth: 30, maxWidth: 40,
                                                                click: function () {
                                                                    $$("gridGstExpBk").editStop();
                                                                    if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                    fnExpBkHideAllPop();
                                                                    $$("TRVAGNTBK").setValue('');
                                                                    $$("TRVAGNTIDBK").setValue('');
                                                                }
                                                            },
                                                            { view: "text", label: 'Travel Agent', id: 'TRVAGNTIDBK', hidden: true, },

                                                            {
                                                                rows: [
                                                                    {
                                                                        cols: [
                                                                            { view: "text", label: 'Group', id: 'GroupBK', labelWidth: 80, readonly: true, css: "ReadOnlyText", width: 260, inputWidth: 260,
                                                                                on: {
                                                                                    onChange: function (NewVal,OldVal) {
                                                                                        if (NewVal != null && NewVal != "") {
                                                                                            $$("chkLeaderExpBk").show();
                                                                                        }
                                                                                        else {
                                                                                            $$("chkLeaderExpBk").hide();
                                                                                        }
                                                                                    }
                                                                                }
                                                                            },
                                                                            {
                                                                                view: 'button', type: "icon", icon: "wxi-search", name: 'GroupBK_Btn', id: 'GroupBK_Btn', inputWidth: 30, minWidth: 30, maxWidth: 30,
                                                                                on: {
                                                                                    onItemClick: function () {
                                                                                        $$("gridGstExpBk").editStop();
                                                                                        if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                                        fnExpBkHideAllPop();
                                                                                        btnGrpSrchClickExpBk();
                                                                                    }
                                                                                }
                                                                            },
                                                                            {
                                                                                view: "button", type: "icon", id: "GroupBKDel", icon: "wxi-trash", inputWidth: 30, minWidth: 30, maxWidth: 30,
                                                                                click: function () {
                                                                                    $$("gridGstExpBk").editStop();
                                                                                    if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                                    fnExpBkHideAllPop();
                                                                                    $$("GroupBK").setValue('');
                                                                                    $$("GroupIdBK").setValue('');
                                                                                    $$("chkLeaderExpBk").setValue('0');
                                                                                }
                                                                            },
                                                                            { view: "checkbox", id: "chkLeaderExpBk", width: 70, labelWidth: 5, labelRight: "Leader", customCheckbox: false, hidden:true},
                                                                            {
                                                                                view: "text", label: 'group', id: 'GroupIdBK', hidden: true,
                                                                            },
                                                                        ]
                                                                    }
                                                                ]
                                                            },                                                           
                                                    ]
                                                },
                                                {
                                                    cols: [
                                                            {view: "text",label: 'Company',id: 'CompanyBK',labelWidth: 110,readonly: true,css: "ReadOnlyText",width: 370,inputWidth: 370,attributes: { maxlength: 50 } },
                                                            {
                                                                view: 'button', type: "icon", icon: "wxi-search", name: 'CompanyBK_Btn', id: 'CompanyBK_Btn', inputWidth: 30, minWidth: 30, maxWidth: 30,
                                                                on: {
                                                                        onItemClick: function () {
                                                                        $$("gridGstExpBk").editStop();
                                                                        if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                        fnExpBkHideAllPop();
                                                                        ExpBkCompanyLoadfn();
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                view: "button", type: "icon", id: "CompanyBKDel", icon: "wxi-trash", inputWidth: 30, minWidth: 30, maxWidth: 40,
                                                                click: function () {
                                                                    $$("gridGstExpBk").editStop();
                                                                    if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                    fnExpBkHideAllPop();
                                                                    $$("CompanyBK").setValue('');
                                                                    $$("CompanyidBK").setValue('');
                                                                }
                                                            },
                                                            {
                                                                view: "text", label: 'Company', id: 'CompanyidBK',  hidden: true,
                                                                on: {
                                                                    onChange: function (NewVal, OldVal) {
                                                                        if (NewVal != null && NewVal != "") {
                                                                            debugger;
                                                                            //fnLoadCompDet(NewVal);
                                                                            fnSetCompSegSrc();                                                                            
                                                                            var RateVal = CompanyRateCodeLoadFn(NewVal);
                                                                            if (RateVal.length > 0) {
                                                                                $$("RateCodeidBK").setValue(RateVal[0].RATE_TY_ID);
                                                                                ExpBkPlanId = RateVal[0].PLAN_ID;
                                                                                $$("PlanBK").setValue(RateVal[0].PLAN_NM);
                                                                                RateCodeTariffloadfn();
                                                                                $$("RateCodeBK").setValue(RateVal[0].RATE_TY_NM);
                                                                            }
                                                                            else fnGetUpdateMarketSegment();
                                                                        }
                                                                        else if (OldVal != null && OldVal != "") {
                                                                            var RateVal = CompanyRateCodeLoadFn(OldVal);
                                                                            if (RateVal.length > 0) {
                                                                                $$("RateCodeidBK").setValue('');
                                                                                $$("RateCodeBK").setValue('');
                                                                                $$("TariffBK").setValue("0.00");
                                                                                $$("DiscBK").blockEvent();
                                                                                $$("AmountBK").blockEvent();
                                                                                $$("DiscDetBK_Btn").hide();
                                                                                $$("DiscBK").setValue('');
                                                                                $$("AmountBK").setValue('');
                                                                                $$("DiscBK").unblockEvent();
                                                                                $$("AmountBK").unblockEvent();
                                                                                $$("ddlDiscTypeResPop").blockEvent();
                                                                                $$("ddlDiscTypeResPop").setValue('');
                                                                                $$("ddlDiscTypeResPop").unblockEvent();
                                                                                $$("txtComplNarrPop").setValue('');
                                                                                $$("DiscDetBK_Btn").hide();

                                                                                if (ExpBkNew_Packg_Appl == "1" && ExpBkS14IND == "0") {
                                                                                    if (ExpBkAdrsPK.length > 0) {
                                                                                        ExpBkAdrsPK = [];
                                                                                        if (ExpBkbPckgChg1 == true) ExpBkbPckgChg = true;
                                                                                        else ExpBkbPckgChg = false;
                                                                                        webix.html.removeCss($$("btnPkgExpBk").getNode(), "BtnClr");
                                                                                        $$("btnPkgExpBk").refresh();
                                                                                    }
                                                                                }
                                                                                ExpBkAdrsTariff = [];
                                                                                if (ExpBkModify_Tariff == "1") {
                                                                                    fnClearTariffData();
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }

                                                            },
                                                            {
                                                                //hidden: true,
                                                                cols: [
                                                                        {
                                                                            view: "richselect", label: 'BusSource', id: 'BUSSOURCEIDBK', labelWidth: 80, width: 320, inputWidth: 320, options: ExpBkBusSource,
                                                                            on: {
                                                                                onItemClick: function () {
                                                                                    $$("gridGstExpBk").editStop();
                                                                                    if (fnExpBkNewGstVisbleOrNot() == true) this.getPopup().hide();
                                                                                },
                                                                                
                                                                            }
                                                                        },

                                                                        //{ view: "text", label: 'Source', id: 'BUSSOURCEIDBK',  hidden: true, },
                                                                ]

                                                            },
                                                    ]

                                                },
                                                {
                                                    cols: [
                                                            {
                                                                view: "text", label: 'Rate Code',id: 'RateCodeBK',labelWidth: 110, css: "ReadOnlyText",readonly: true,
                                                                width: 400, inputWidth: 400,required: "true",
                                                                on: {
                                                                    onchange: function (NewVal, OldVal) { 
                                                                        //fnchkTariffMarketSegment();
                                                                        fnGetUpdateMarketSegment();
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                view: 'button', type: "icon",icon: "wxi-search", name: 'RateCodeBK_Btn',id: 'RateCodeBK_Btn',inputWidth: 30,minWidth: 30,width:40,
                                                                on: {
                                                                    onItemClick: function () {
                                                                        //RateCodeLoadfn();
                                                                        //ExpBkRateCodeWindowLoad();
                                                                        $$("gridGstExpBk").editStop();
                                                                        if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                        fnExpBkHideAllPop();
                                                                        var To_Dt = $$("DepatureBK").getText();
                                                                        var Arr_Dt = $$("ArrivalBK").getText();
                                                                        var CurrencyId = $$("BKCURRENCY_ID").getValue();
                                                                        var sRmTy = $$("RoomTypeBK").getValue();
                                                                        if (ExpBkUpgrade_Appl_Ind == "1") {
                                                                            if ($$("ddlRmUpgrdExpBk").getValue() != null && $$("ddlRmUpgrdExpBk").getValue() != "" && $$("ddlRmUpgrdExpBk").getValue() != "#N#") {
                                                                                sRmTy = $$("ddlRmUpgrdExpBk").getValue();
                                                                            }
                                                                        }
                                                                        if (sRmTy == "") {                                                                            
                                                                            webix.message({ type: 'warning', text: "Room Type cannot be empty" });
                                                                            return false;
                                                                        }

                                                                        if (Arr_Dt == "") {
                                                                            webix.message({ type: 'warning', text: "Arrival Date cannot be empty" });
                                                                            return false;
                                                                        }

                                                                        if (To_Dt == "") {
                                                                            webix.message({ type: 'warning', text: "Departure Date cannot be empty" });
                                                                            return false;
                                                                        }

                                                                        RateSrchPopupLoadCom(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, BkAspxPage, sRmTy, To_Dt, CurrencyId);
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                view: "text", id: 'RateCodeidBK', hidden: true,
                                                            },

                                                            {
                                                                view: "search", width: 320, labelWidth: 80, id: 'ExpBkBooker', name: 'ExpBkBooker', label: "Booker", readonly: true, inputWidth: 320,
                                                                on: {
                                                                    onSearchIconClick: function () {
                                                                        debugger;
                                                                        //ExpBkBookerSrchPopupLoad();
                                                                        BookerSrchPopupLoad(ExpBkCompId, ExpBkUserId, ExpBkConnStr, 'TC', ExpBkApiUrl, BkAspxPage);
                                                                    },
                                                                    onKeyPress: function (code, e) {

                                                                        //if (code == 13 || code == 32) ExpBkBookerSrchPopupLoad();

                                                                        if (code == 13 || code == 32) BookerSrchPopupLoad(ExpBkCompId, ExpBkUserId, ExpBkConnStr, 'TC', ExpBkApiUrl, BkAspxPage);
                                                                    },
                                                                }
                                                            },

                                                             
                                                            
                                                            { view: "text", id: 'ExpBkBookerId', hidden: true, },
                                                            
                                                    ]

                                                },
                                                {
                                                    cols: [
                                                        {
                                                            view: "text", label: 'Tariff', id: 'TariffBK',labelWidth: 110,width: 230,inputWidth: 210, attributes: { maxlength: 12 },css: "ReadOnlyText",
                                                            readonly: true,required: "true",inputAlign: "right",
                                                        },
                                                        {
                                                            rows: [{
                                                                view: "text",label: 'Disc %',id: 'DiscBK',labelWidth: 60, width: 150,inputWidth: 150,inputAlign: "right",css: "ExpBkTextBox",                                                 
                                                                on: {
                                                                    onKeyPress: function (code, e) {
                                                                        
                                                                        if (code == 9) return true;                                                         
                                                                        var CurPos = this.getInputNode().selectionStart;
                                                                        var maxLen = parseInt(ExpBkCurDecLmt) + 3;
                                                                        return fnExBkFloatText(code, e, this.getValue(), maxLen, ExpBkCurDecLmt, CurPos);
                                                                    },
                                                                    onChange: function (NewVal, OldVal) {
                                                                        if (NewVal != "") {
                                                                            NewVal = parseFloat(NewVal).toFixed(ExpBkCurDecLmt);
                                                                            if (NewVal > 100) $$("DiscBK").setValue(parseFloat(100).toFixed(ExpBkCurDecLmt));
                                                                            else $$("DiscBK").setValue(NewVal);
                                                                            if ($$("ddlDiscTypeResPop").getValue() == "") {
                                                                                $$("DiscDetResPop").show();                                                                 
                                                                            }
                                                                        }
                                                                    },
                                                                    onTimedKeyPress: function () {
                                                                        
                                                                        if ($$("DiscBK").getValue() != "") {
                                                                            $$("AmountBK").setValue('');
                                                                            $$("DiscDetBK_Btn").show();
                                                                        }
                                                                        else if ($$("AmountBK").getValue() == "" && $$("DiscBK").getValue() == "") {
                                                                            $$("DiscDetBK_Btn").hide();
                                                                        }
                                                                    }
                                                                },
                                                            }
                                                            ]

                                                        },
                                                        {
                                                            view: "text", label: 'Disc Amt',id: 'AmountBK',labelWidth: 60, width: 150, inputWidth: 150, attributes: { maxlength: 12 },
                                                            inputAlign: "right",css: "ExpBkTextBox",                                             
                                                            on: {
                                                                onKeyPress: function (code, e) {
                                                                    
                                                                    if (code == 9) return true;                                                     
                                                                    var CurPos = this.getInputNode().selectionStart;
                                                                    var maxLen = parseInt(ExpBkCurDecLmt) + 9;
                                                                    return fnExBkFloatText(code, e, this.getValue(), maxLen, ExpBkCurDecLmt, CurPos);

                                                                },
                                                                onChange: function (NewVal, OldVal) {
                                                                    if (NewVal != "") {
                                                                        NewVal = parseFloat(NewVal).toFixed(ExpBkCurDecLmt);
                                                                        $$("AmountBK").setValue(NewVal);
                                                                        if ($$("ddlDiscTypeResPop").getValue() == "") {
                                                                            $$("DiscDetResPop").show();                                                             
                                                                        }
                                                                    }
                                                                },
                                                                onTimedKeyPress: function () {
                                                                    
                                                                    if ($$("AmountBK").getValue() != "") {
                                                                        $$("DiscBK").setValue('');
                                                                        $$("DiscDetBK_Btn").show();
                                                                    }
                                                                    else if ($$("AmountBK").getValue() == "" && $$("DiscBK").getValue() == "") {
                                                                        $$("DiscDetBK_Btn").hide();
                                                                    }
                                                                }
                                                            }
                                                        },

                                                        {
                                                            width: 30,
                                                            rows: [
                                                                {
                                                                    view: 'button',label: '<span class="fa fa-edit"></span>', name: 'DiscDetBK_Btn', id: 'DiscDetBK_Btn',inputWidth: 30,
                                                                    width: 30, value: "Discount Type Edit", tooltip: true,
                                                                    on: {
                                                                        onItemClick: function () {
                                                                            $$("gridGstExpBk").editStop();
                                                                            if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                            fnExpBkHideAllPop();
                                                                            if (($$("DiscBK").getValue() != "" && $$("DiscBK").getValue() != "0") || ($$("AmountBK").getValue() != "" && $$("AmountBK").getValue() != "0")) {
                                                                                $$("DiscDetResPop").show();                                                                 
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },

                                                        {
                                                            view: "search", label: 'Plan', id: 'PlanBK', labelWidth: 40, width: 205, readonly: true, inputWidth: 200,
                                                            on: {
                                                                onSearchIconClick: function () {
                                                                    
                                                                    $$("gridGstExpBk").editStop();
                                                                    if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                    fnExpBkHideAllPop();
                                                                    fnBtnPlanSrchClickExpBk();
                                                                },
                                                                onKeyPress: function (code, e) {
                                                                    
                                                                    $$("gridGstExpBk").editStop();
                                                                    if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                    fnExpBkHideAllPop();
                                                                    if (code == 13 || code == 32) fnBtnPlanSrchClickExpBk();
                                                                },
                                                            }
                                                        },                                                        
                                                        //{ view: "text", label: 'Plan Amount', id: 'PlanAmtBK', hidden:true, labelWidth: 50, minWidth: 250, css: "ReadOnlyText", readonly: true, inputWidth: 250, attributes: { maxlength: 50 } },                                                       

                                                        
                                                                                                              
                                                    ]
                                                },
                                                {
                                                    cols: [
                                                        {
                                                            view: "text", label: 'Plan Amount', id: 'PlanAmtBK', labelWidth: 110, width: 230, inputWidth: 210, attributes: { maxlength: 12 }, inputAlign: "right",
                                                            on: {
                                                                onKeyPress: function (code, e) {
                                                                    
                                                                    if (code == 9) return true;
                                                                    var CurPos = this.getInputNode().selectionStart;
                                                                    var maxLen = ExpBkCurDecLmt + 9;
                                                                    return fnExBkFloatText(code, e, this.getValue(), maxLen, ExpBkCurDecLmt, CurPos);
                                                                },
                                                                onChange: function (NewVal, OldVal) {
                                                                    if (NewVal != "") {
                                                                        NewVal = parseFloat(NewVal).toFixed(ExpBkCurDecLmt);
                                                                        this.setValue(NewVal);

                                                                    }
                                                                },
                                                            },
                                                        },
                                                        {
                                                            view: "text", label: 'Ch1', id: 'PlanChild1Bk', labelWidth: 60, width: 150, inputWidth: 150, attributes: { maxlength: 12 }, inputAlign: "right",
                                                            on: {
                                                                onKeyPress: function (code, e) {
                                                                    
                                                                    if (code == 9) return true;
                                                                    var CurPos = this.getInputNode().selectionStart;
                                                                    var maxLen = ExpBkCurDecLmt + 9;
                                                                    return fnExBkFloatText(code, e, this.getValue(), maxLen, ExpBkCurDecLmt, CurPos);
                                                                },
                                                                onChange: function (NewVal, OldVal) {
                                                                    if (NewVal != "") {
                                                                        NewVal = parseFloat(NewVal).toFixed(ExpBkCurDecLmt);
                                                                        this.setValue(NewVal);

                                                                    }
                                                                },
                                                            },
                                                        },
                                                        { view: "text", label: 'Ch2', id: 'PlanChild2Bk', hidden: true, labelWidth: 60, width: 150,  inputWidth: 150, attributes: { maxlength: 12 } },
                                                        { view: "text", label: 'Ch3', id: 'PlanChild3Bk', hidden: true, labelWidth: 60, width: 150, inputWidth: 150, attributes: { maxlength: 12 } },
                                                        {
                                                            view: "text", label: 'Disc %', id: 'PlanDiscBK', labelWidth: 60, width: 150, inputWidth: 150, inputAlign: "right", css: "ExpBkTextBox",
                                                            on: {
                                                                onKeyPress: function (code, e) {
                                                                    
                                                                    if (code == 9) return true;
                                                                    var CurPos = this.getInputNode().selectionStart;
                                                                    var maxLen = ExpBkCurDecLmt + 3;
                                                                    return fnExBkFloatText(code, e, this.getValue(), maxLen, ExpBkCurDecLmt, CurPos);
                                                                },
                                                                onChange: function (NewVal, OldVal) {
                                                                    if (NewVal != "") {
                                                                        NewVal = parseFloat(NewVal).toFixed(ExpBkCurDecLmt);
                                                                        if (NewVal > 100) {
                                                                            $$("PlanDiscBK").blockEvent();
                                                                            $$("PlanDiscBK").setValue(parseFloat(100).toFixed(ExpBkCurDecLmt));
                                                                            $$("PlanDiscBK").unblockEvent();
                                                                        }
                                                                        else {
                                                                            $$("PlanDiscBK").blockEvent();
                                                                            $$("PlanDiscBK").setValue(NewVal);
                                                                            $$("PlanDiscBK").unblockEvent();
                                                                        }
                                                                    }
                                                                },
                                                                onTimedKeyPress: function () {
                                                                    
                                                                    if ($$("PlanDiscBK").getValue() != "") {
                                                                        $$("PlanDiscAmtBK").setValue('');
                                                                    }
                                                                }
                                                            },
                                                        },
                                                       {
                                                           view: "text", label: 'Disc Amt', id: 'PlanDiscAmtBK', labelWidth: 60, width: 150, inputWidth: 150, attributes: { maxlength: 12 },
                                                           inputAlign: "right", css: "ExpBkTextBox",
                                                           on: {
                                                               onKeyPress: function (code, e) {
                                                                   //
                                                                   if (code == 9) return true;
                                                                   var CurPos = this.getInputNode().selectionStart;
                                                                   var maxLen = parseInt(ExpBkCurDecLmt) + 9;
                                                                   return fnExBkFloatText(code, e, this.getValue(), maxLen, ExpBkCurDecLmt, CurPos);

                                                               },
                                                               onChange: function (NewVal, OldVal) {
                                                                   if (NewVal != "") {
                                                                       
                                                                       var PlanAmt = $$("PlanAmtBK").getValue() == "" ? 0 : $$("PlanAmtBK").getValue();
                                                                       var PlanCh1Amt = $$("PlanChild1Bk").getValue() == "" ? 0 : $$("PlanChild1Bk").getValue();
                                                                       var PlanCh2Amt = $$("PlanChild2Bk").getValue() == "" ? 0 : $$("PlanChild2Bk").getValue();
                                                                       var PlanCh3Amt = $$("PlanChild3Bk").getValue() == "" ? 0 : $$("PlanChild3Bk").getValue();

                                                                       var TotPlanAmt = parseFloat(PlanAmt) + parseFloat(PlanCh1Amt) + parseFloat(PlanCh2Amt) + parseFloat(PlanCh3Amt);

                                                                       NewVal = parseFloat(NewVal).toFixed(ExpBkCurDecLmt);
                                                                       if (NewVal > TotPlanAmt) {
                                                                           $$("PlanDiscAmtBK").blockEvent();
                                                                           $$("PlanDiscAmtBK").setValue(TotPlanAmt.toFixed(ExpBkCurDecLmt));
                                                                           $$("PlanDiscAmtBK").unblockEvent();
                                                                       }
                                                                       else {
                                                                           $$("PlanDiscAmtBK").blockEvent();
                                                                           $$("PlanDiscAmtBK").setValue(NewVal);
                                                                           $$("PlanDiscAmtBK").unblockEvent();
                                                                       }
                                                                       

                                                                   }
                                                               },
                                                               onTimedKeyPress: function () {
                                                                   //
                                                                   if ($$("PlanDiscAmtBK").getValue() != "") {
                                                                       $$("PlanDiscBK").setValue('');
                                                                   }
                                                               }
                                                           }
                                                       },
                                                    ]
                                                } ,
                                                {
                                                    cols:[
                                                        {
                                                            view: "richselect", label: 'Guest Type', id: 'ddlGuestTyBk',labelWidth: 110,minWidth: 310, maxWidth: 310,
                                                            inputWidth: 310,                               
                                                            required: "true",
                                                            options:ExpBkGuestTy,
                                                            on: {
                                                                
                                                                onItemClick: function () {
                                                                    $$("gridGstExpBk").editStop();
                                                                    if (fnExpBkNewGstVisbleOrNot() == true) this.getPopup().hide();
                                                                },
                                                                                                                                
                                                                onChange: function (NewVal, OldVal) {
                                                                                                                    
                                                                    var TARIFF_APPL_IND = 0;
                                                                    var OlDTARIFF_APPL_IND = 0;
                                                                    var vData = $$("ddlGuestTyBk").getPopup().getList().serialize();
                                                                    if (vData.length > 0) {
                                                                        var newData = vData.filter(function (el) {
                                                                            return el.id == NewVal;
                                                                        });
                                                                        if (newData.length > 0) TARIFF_APPL_IND = newData[0].TARIFF_APPL_IND;

                                                                        var newData = vData.filter(function (el) {
                                                                            return el.id == OldVal;
                                                                        });
                                                                        if (newData.length > 0) OlDTARIFF_APPL_IND = newData[0].TARIFF_APPL_IND;
                                                                        if (TARIFF_APPL_IND != OlDTARIFF_APPL_IND) {                                                        
                                                                            if (TARIFF_APPL_IND == "1") {
                                                                                webix.confirm({
                                                                                    title: "Confirmation",
                                                                                    ok: "Yes", cancel: "No",
                                                                                    text: "Compliment selection will move zero as tariff. Want to continue? ",
                                                                                    callback: function (result) {
                                                                                        if (result == true) {
                                                                                            
                                                                                            $$("btnTarEditExpBk").disable();
                                                                                            $$("TariffBK").setValue("0.00");
                                                                                            $$("DiscBK").blockEvent();
                                                                                            $$("AmountBK").blockEvent();
                                                                                            $$("DiscDetBK_Btn").hide();
                                                                                            $$("DiscBK").setValue('');
                                                                                            $$("AmountBK").setValue('');                                                                        
                                                                                            $$("DiscBK").unblockEvent();
                                                                                            $$("AmountBK").unblockEvent();
                                                                                            $$("ddlDiscTypeResPop").blockEvent();
                                                                                            $$("ddlDiscTypeResPop").setValue('');
                                                                                            $$("ddlDiscTypeResPop").unblockEvent();
                                                                                            RateCodeTariffloadfn();
                                                                                            $$("txtComplNarrPop").setValue('');

                                                                                            if (ExpBkModify_Tariff == "1") {
                                                                                                if (ExpBkAdrsTariff.length > 0) {
                                                                                                    ExpBkAdrsTariff = [];
                                                                                                    fnClearTariffData();
                                                                                                    //webix.html.removeCss($$("btnTarEditExpBk").getNode(), "BtnClr");
                                                                                                    //$$("btnTarEditExpBk").refresh();
                                                                                                    fnExBkTariffShow("1");
                                                                                                }
                                                                                            }
                                                                                            if(ExpBkNew_Packg_Appl == "1" && ExpBkS14IND == "0"){
                                                                                                if(ExpBkAdrsPK.length>0){
                                                                                                    ExpBkAdrsPK = [];
                                                                                                    if(ExpBkbPckgChg1 == true) ExpBkbPckgChg = true;
                                                                                                    else ExpBkbPckgChg = false;
                                                                                                    webix.alert({ type: 'warning', text: "Package is defined for this tariff.Package will be Cleared." });  
                                                                                                    webix.html.removeCss($$("btnPkgExpBk").getNode(), "BtnClr");
                                                                                                    $$("btnPkgExpBk").refresh();
                                                                                                }
                                                                                            }                                                                       

                                                                                            $$("ComplNarBK_Btn").show();

                                                                                        }
                                                                                        else {
                                                                                            
                                                                                            $$("ddlGuestTyBk").blockEvent();
                                                                                            $$("ddlGuestTyBk").setValue(OldVal)
                                                                                            $$("ddlGuestTyBk").unblockEvent();
                                                                                        }
                                                                                    }
                                                                                });
                                                                            }
                                                                            else {
                                                                                $$("btnTarEditExpBk").enable();
                                                                                $$("ComplNarBK_Btn").hide();
                                                                                RateCodeTariffloadfn();
                                                                                $$("txtComplNarrPop").setValue('');
                                                                                if (ExpBkModify_Tariff == "1") {
                                                                                    if (ExpBkAdrsTariff.length > 0) {
                                                                                        webix.html.removeCss($$("btnTarEditExpBk").getNode(), "BtnClr");
                                                                                        $$("btnTarEditExpBk").refresh();
                                                                                        ExpBkAdrsTariff = [];
                                                                                        fnClearTariffData();
                                                                                        fnExBkTariffShow("1");

                                                                                    }
                                                                                }
                                                                            }
                                                                        }                                                    
                                                                    }                                                                               
                                                                }
                                                            }
                                                        },
                                                        {
                                                            width: 30,
                                                            rows: [
                                                                {
                                                                    view: 'button',label: '<span class="fa fa-edit"></span>',name: 'ComplNarBK_Btn', id: 'ComplNarBK_Btn',inputWidth: 30,width: 30,
                                                                    value: "Compliment Narration Edit",tooltip: true,hidden:true,
                                                                    on: {
                                                                        onItemClick: function () {
                                                                            $$("gridGstExpBk").editStop();
                                                                            if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                            $$("ComplNarPop").show();                                                        
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            view: "richselect", label: 'Upgrade', id: 'ddlRmUpgrdExpBk', labelWidth: 70,minWidth: 260,maxWidth: 260,inputWidth: 260, 
                                                            hidden:ExpBkUpgrade_Appl_Ind == "1"?false:true,
                                                            on:{
                                                                onChange: function (NewVal, OldVal) {                                                
                                                                    fnChangUpgrdRmTy(NewVal,OldVal);
                                                                },
                                                                
                                                                onItemClick: function () {
                                                                    $$("gridGstExpBk").editStop();
                                                                    if (fnExpBkNewGstVisbleOrNot() == true) this.getPopup().hide();
                                                                },
                                                                                                                                
                                                            }
                                                        },
                                                        {
                                                            width: 30,
                                                            rows: [
                                                                {
                                                                    view: 'button', label: '<span class="fa fa-edit"></span>', name: 'btnUpgrdTyEdExpBk',id: 'btnUpgrdTyEdExpBk',inputWidth: 30,width: 30,
                                                                    value: "Upgrade Type Edit", tooltip: true, hidden:true, 
                                                                    on: {
                                                                        onItemClick: function () {
                                                                            $$("gridGstExpBk").editStop();
                                                                            if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                            fnExpBkHideAllPop();
                                                                            fnbtnUpgrdDetClick();                                                        
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                    
                                                    ]

                                                },
                                                { 
                                                    cols:[ 
                                                        {
                                                            view: "richselect", label: 'Segment', id: 'ddlSegmentExpBk', labelWidth: 110, minWidth: 340, maxWidth: 340, inputWidth: 310, options: ExpBkMarkSeg,
                                                            on: {                                                                
                                                                onItemClick: function () {
                                                                    $$("gridGstExpBk").editStop();
                                                                    if (fnExpBkNewGstVisbleOrNot() == true) this.getPopup().hide();
                                                                },
                                                                
                                                            }
                                                        },
                                                        {
                                                            view: "label", label: '', id: 'lblAdvanceExpBk', minWidth: 310, maxWidth: 310, css: "ExpBkAdvLblBack", hidden: true,
                                                            click: function () {
                                                                $$("gridGstExpBk").editStop();
                                                                if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                                FoExpBkAdvDetWindowLoad();
                                                            }
                                                        },
                                                    ]
                                                },
                                                { view: "combo", label: 'Sales Person', id: 'SalesPersonBK', labelWidth: 110, minWidth: 400, inputWidth: 400,options: Assigned_List, },
                                                { view: "text", label: 'Guest Id', id: 'GuestId', hidden: true },                            
                                        ]
                                    },
                            ]
                        },
            
                                
                    {
                        view: 'form',                        
                        height:50,
                        margin:{top:0},
                        css:{"margin" :"0px !important"},                        
                        elements: [
                            {                                 
                                cols: [
                                    //{                                                    
                                    //    width:380,
                                    //    cols: [
                                            { view: 'button',id: 'btnRoomPosExpBk', label: 'Position', width: 65,                                                    
                                                on: {
                                                    onItemClick: function () {
                                                        $$("gridGstExpBk").editStop();
                                                        if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                        fnExpBkHideAllPop();
                                                        var sRoomType = "";
                                                        var sFromDt = $$("ArrivalBK").getText();
                                                        var sToDt = $$("DepatureBK").getText();
                                                        fnLoadRoomStsPop(ExpBkCompId, ExpBkConnStr, ExpBkUserId, ExpBkApiUrl, BkAspxPage, sRoomType, sFromDt, sToDt);
                                                    }
                                                }
                                            },
                                            { view: 'button',  id: 'btnRoutingExpBk', label: 'Routing', width: 65,
                                                on: {
                                                    onItemClick: function () {
                                                        $$("gridGstExpBk").editStop();
                                                        if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                        fnExpBkHideAllPop();
                                                        fnExBkRoutingShow();
                                                    }
                                                }
                                            },
                                            {
                                                view: 'button', id: 'btnTarEditExpBk', label: 'Tariff Edit', width: 80,
                                                on: {
                                                    onItemClick: function () {
                                                        $$("gridGstExpBk").editStop();
                                                        if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                        fnExpBkHideAllPop();
                                                        if ($$("TarEdPop")) {
                                                            if ($$("TarEdPop").isVisible() == true) {                                                                
                                                                return false;
                                                            }
                                                        }
                                                        fnExBkTariffShow();                                                        
                                                    }
                                                }
                                            },
                                            {
                                                view: 'button', id: 'btnPkgExpBk', label: 'Package', width: 70,
                                                on: {
                                                    onItemClick: function () {
                                                        $$("gridGstExpBk").editStop();
                                                        if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                        fnExpBkHideAllPop();
                                                        fnExBkPackageShow();
                                                    }
                                                }
                                            },
                                            {
                                                view: 'button', id: 'btnOthExpBk', label: 'Others', width: 60,
                                                on: {
                                                    onItemClick: function () {
                                                        $$("gridGstExpBk").editStop();
                                                        if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                        fnExpBkHideAllPop();
                                                        ExpBkOtherPopShow();                                                        
                                                    }
                                                }
                                            },                                            

                                            {
                                                view: 'button', id: 'btnLogExpBk', label: 'Log', width: 40,css:"BtnClr",
                                                on: {
                                                    onItemClick: function () {
                                                        $$("gridGstExpBk").editStop();
                                                        if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                        fnExpBkHideAllPop();
                                                        ExpBkFnLogbtnClick();
                                                    }
                                                }
                                            },

                                            {
                                                view: 'button', id: 'btnAutoChrgeExpBk', label: 'Auto Charge', width: 100,
                                                hidden: ExpBk_Auto_Chrg_Appl == "1"?false:true,
                                                on: {
                                                    onItemClick: function () {
                                                        $$("gridGstExpBk").editStop();
                                                        if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                        fnExpBkHideAllPop();
                                                        ExpBkFnAutoChrgbtnClick();
                                                        
                                                    }
                                                }
                                            },
                                            
                                    //    ]
                                    //},
                                    {},
                                    {
                                                    
                                        align:"right",
                                        cols: [
                                            {
                                                view: 'button',id: 'BookIndCancel',hidden: true,label: 'Cancel', width: 70, align: "right",
                                                on: {
                                                    onItemClick: function () {
                                                        $$("gridGstExpBk").editStop();
                                                        if (fnExpBkNewGstVisbleOrNot() == true) return false;
                                                        $$("txtCancReasResPop").setValue('');
                                                        $$("txtCancRqByResPop").setValue('');
                                                        $$("CancelResPop").show();                                                                    
                                                    }
                                                }
                                            },
                                            {
                                                view: 'button', label: 'Save',id: "btnBkCreate",width: 70,align: "right",
                                                on: {
                                                    onItemClick: function () {
                                                        
                                                        $$("gridGstExpBk").editStop();
                                                        if (fnExpBkNewGstVisbleOrNot() == true) return false;


                                                        

                                                        var datval = [];
                                                        //BkSucessRet = [];
                                                        BkSaveMode = "";
                                                        var PrgStr = "<div  style='display: block; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; fit-position: 100%; z-index: 189'> <img src='../../Images/progress.GIF' style='position: absolute; left: 50%; top: 45%; height: 100px; width: 80px;' /> </div>";

                                                        
                                                        webix.extend($$("frmBkCreat"), webix.OverlayBox);
                                                        $$("frmBkCreat").showOverlay(PrgStr);
                                                        webix.html.addCss($$("frmBkCreat").getNode(), "ExpBkPagefalse");
                                                        
                                                        setTimeout(function () {
                                                                        
                                                            if(ExpBkMode == "NEW"){
                                                                datval = PostBookingCreationFn("SAVE");
                                                                BkSaveMode = ExpBkMode;
                                                            }
                                                            else{
                                                                datval = PostBookingCreationFn("OPEN");
                                                                BkSaveMode = ExpBkMode;
                                                            }
                                                                       
                                                            $$("frmBkCreat").hideOverlay();
                                                            webix.html.removeCss($$("frmBkCreat").getNode(), "ExpBkPagefalse");
                                                            if (datval.MsgTXT == "") {
                                                                if (datval.Status == "1") {
                                                                    BkSucessRet = datval;
                                                                    var RegNo = datval.RegNo;
                                                                    var Tariff = datval.Tariff;
                                                                    var ReserveNo = datval.ReserveNo;
                                                                    var TemplateMsg = "";
                                                                    if (ExpBkRESERVE_NO != undefined && ExpBkRESERVE_NO != null && ExpBkRESERVE_NO != "") {
                                                                        TemplateMsg = "Reservation Amended.";
                                                                    }
                                                                    else TemplateMsg = "Reservation Created. Reservation No.:  " + RegNo;
                                                                    if (ExpBkG22_IND == "1") $$("RowChkEmail").show();
                                                                    $$("TempSaveMsg").define("template", TemplateMsg);
                                                                    $$("TempSaveMsg").refresh();
                                                                    $$("chkEmailSend").setValue("0");
                                                                    $$("SaveMsgEmlPop").show();

                                                                }
                                                                else {
                                                                    alert('Booking Creation Failled');
                                                                }
                                                            }
                                                            else {
                                                                if (datval.MsgTXT != "#7#")
                                                                {
                                                                    alert(datval.MsgTXT);
                                                                }                                                                            
                                                            }
                                                            
                                                        }, 0)

                                                       
                                                    }
                                                }
                                            },
                                            {
                                                view: 'button', label: 'Close',width: 70, align: "right",
                                                on: {
                                                    onItemClick: function () {
                                                        $$("gridGstExpBk").blockEvent();
                                                        $$("gridGstExpBk").editStop();
                                                        $$("gridGstExpBk").unblockEvent();
                                                        $$("BookingCreatePopup").hide();
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                        ]
                    }
            ]                   
               
        }
    }).show();
    //TitleGstLoad();

    var FirsId = $$("TitleBK").getPopup().getList().getFirstId();
    if (FirsId) $$("TitleBK").setValue(FirsId);

    if (RemoteType == "FO") $$("SalesPersonBK").hide();
    var VV_Ind = "0";
    //
    if ($("#VV_IND").val()) VV_Ind = $("#VV_IND").val();
    if (VV_Ind == "1") {
        $$("CompanyBK").define("required", true);
        $$("CompanyBK").refresh();
    }
    else {
        $$("CompanyBK").define("required", false);
        $$("CompanyBK").refresh();
    }

    if (ExpBkModify_Tariff == "1") {
        $$("btnTarEditExpBk").show();
        if (ExpBkSingleConsTariff == "1") {
            ExpBkRateFixed = true;
        }
        else ExpBkRateFixed = false;
    }
    else {
        ExpBkRateFixed = false;
        $$("btnTarEditExpBk").hide();
    }

    if(ExpBkNew_Packg_Appl == "1"){
        $$("btnPkgExpBk").show();
    }
    else{
        $$("btnPkgExpBk").hide();        
    }   

    if(ExpBkGuest_Ty_Ind == "1"){
        $$("ddlGuestTyBk").define("required", true);
        $$("ddlGuestTyBk").refresh();
    }
    else{
        $$("ddlGuestTyBk").define("required", false);
        $$("ddlGuestTyBk").refresh();
    }

    if(ExpBkMarket_Mand_Ind == "1"){
        $$("ddlSegmentExpBk").define("required", true);
        $$("ddlSegmentExpBk").refresh();
    }
    else{
        $$("ddlSegmentExpBk").define("required", false);
        $$("ddlSegmentExpBk").refresh();
    } 
    
    //if (ExpBkTY == "3" || ExpBkTY == "4" || ExpBkTY == "5") {
        $$("RoomNOBK").define("required", false);
        $$("RoomNOBK").refresh();
        $$("NoOfRoomsBK").show();
        
    //}
    //else {
    //    $$("RoomNOBK").define("required", true);
    //    $$("RoomNOBK").refresh();
    //    $$("NoOfRoomsBK").hide();
    //}    

    if(ExpBkA17_IND =="0"){
        $$("TRVAGNTBK").show();
        $$("TrvAgntBK_Btn").show();
    }
    else{
        $$("TRVAGNTBK").hide();
        $$("TrvAgntBK_Btn").hide();
    }

    if(ExpBkSRCAPPL =="1") $$("ExpBkSource1").show();            
    else $$("ExpBkSource1").hide();

    if (ExpBk_K2_IND == "3" || ExpBk_K2_IND == "4") $$("gridGstExpBk").showColumn("ixBtnGstTT");
    else $$("gridGstExpBk").hideColumn("ixBtnGstTT");

    
    if (ExpBkJ2IND == "1") {
        $$("ExpBkBooker").show();        
    }
    else $$("ExpBkBooker").hide();

    if(ExpBkU18IND =="1") $$("ExpBkVisitPurp1").hide();            
    else $$("ExpBkVisitPurp1").show();        
    
    $$("ExpBkChannel1").define("required", false);
    if (ExpBkL7_IND == "1" || ExpBkL7_IND == "2") {
        $$("ExpBkChannel1").show();
        if (ExpBkL7_IND == "2") {
            $$("ExpBkChannel1").define("required", true);
            $$("ExpBkChannel1").define("invalidMessage", $$("ExpBkChannel1").config.label + " cannot be empty");
        }
        else $$("ExpBkChannel1").define("required", false);
        $$("ExpBkChannel1").refresh();
    }
    else $$("ExpBkChannel1").hide();

    $$("ExpBkResMode1").define("required", false);
    if (ExpBk_C17_IND == "1") {
        $$("ExpBkResMode1").show();
        if (ExpBk_Resrv_Mode_Ind == "1") {
            $$("ExpBkResMode1").define("required", true);
            $$("ExpBkResMode1").define("invalidMessage", $$("ExpBkResMode1").config.label + " cannot be empty");
        }
        else $$("ExpBkResMode1").define("required", false);
        $$("ExpBkResMode1").refresh();
    }
    else $$("ExpBkResMode1").hide(); 
    if (ExpBk_AA_IND == "1") {
        $$("VouchNoBk1").show();
        if (ExpBk_AA_CAP != "") {
            $$("VouchNoBk1").config.label = ExpBk_AA_CAP;
            $$("VouchNoBk1").refresh();
        }
    }
    else $$("VouchNoBk1").hide();

    $$("ReferenceBk1").define("required", false);
    if (ExpBk_I3_IND == "1") {
        $$("ReferenceBk1").show();
        if (ExpBk_D19_IND == "1") {
            $$("ReferenceBk1").define("required", true);
            $$("ReferenceBk1").define("invalidMessage", $$("ReferenceBk1").config.label + " cannot be empty");
        }
        else $$("ReferenceBk1").define("required", false);
        $$("ReferenceBk1").refresh();
    }
    else $$("ReferenceBk1").hide();

    if (ExpBk_FORN_TARIFF_APPL_IND == "1") $$("BKCURRENCY_NM").show();
    else $$("BKCURRENCY_NM").hide();    

    //C17_IND=0
    //--reseravtion mode mandatory
    //Resrv_Mode_Ind = 1
    //--channel applicable
    //L7_IND = 1 or L7_IND = 2
    //--channel mandatory
    //L7_IND = 2
    //--visit purpose applicable
    //U18_Ind=0
    //--booker applicable
    //J2_IND=1
    //--voucher applicable
    //AA_Ind = 1
    //voucher caption =AA_Cap
    //--Refer applicable
    //I3_IND=1
    //--refer mandatory
    //D19_Ind=1
    //debugger;
    if (ARRTM == "" || DEPTTM == "") {
        var defDtDet = fnGetDefDtTimeExpBk();
        if (ARRTM == "") ARRTM = defDtDet[2].toString().trim();
        if (DEPTTM == "") DEPTTM = defDtDet[3].toString().trim();
    }

    
    fnLoadDetDataExpBk(ROOMNO, RMTY, RESERVE_NO, ARRDT, DEPTDT, ARRTM, DEPTTM, MODE,TY);

    if (ExpBkTY == "3" ) {
        if(MODE == "NEW"){
            $$("GroupIdBK").setValue(GROUPID);
            $$("GroupBK").setValue(GROUPNM);

            $$("TRVAGNTBK").setValue(TRVAGNM);
            $$("TRVAGNTIDBK").setValue(TRVAGID);

            $$("CompanyBK").setValue(COMPNM);
            $$("CompanyidBK").setValue(COMPID);

            $$("BUSSOURCEIDBK").setValue(BUSSOURCEID);
            $$("ddlSegmentExpBk").setValue(MARKSEGMENTID);
        }
        else if(MODE == "OPEN"){
            if(COPYCREATENEWRES == "1"){
                ExpBkMode = "NEW";
                $$("RoomTypeBK").blockEvent();
                $$("RoomTypeBK").setValue('');                
                $$("RoomTypeBK").unblockEvent();

                $$("RoomNOBK").setValue('');
                //$$("ReserveNO").setValue('');
                                
                ExpBkRESERVE_NO = '';
                $$("RsrId").setValue('');
            }
        }
        //
        if (ExpBk_RSRAPPL == "1") {
            $$("RsrId").show();
        }
        else {
            $$("RsrId").hide();
        }
    
    }
    else if (ExpBkTY == "5") {
        
        if (MODE == "NEW") {

            if (ITINOBJ) {                                      

                if (ITINOBJ.TRV_AGENT_ID != null && ITINOBJ.TRV_AGENT_ID.toString().trim() != "") {
                    $$("TRVAGNTBK").blockEvent();
                    $$("TRVAGNTBK").setValue(ITINOBJ.TRV_AGENT_NM);
                    $$("TRVAGNTBK").unblockEvent();
                    $$("TRVAGNTBK").blockEvent();
                    $$("TRVAGNTIDBK").setValue(ITINOBJ.TRV_AGENT_ID.toString().trim());
                    $$("TRVAGNTBK").unblockEvent();
                }

                if (ITINOBJ.GUEST_PARTY_ID != null && ITINOBJ.GUEST_PARTY_ID.toString().trim() != "") {
                    $$("CompanyBK").blockEvent();
                    $$("CompanyBK").setValue(ITINOBJ.GUEST_PARTY_NM);
                    $$("CompanyBK").unblockEvent();
                    $$("CompanyidBK").blockEvent();
                    $$("CompanyidBK").setValue(ITINOBJ.GUEST_PARTY_ID.toString().trim());
                    $$("CompanyidBK").unblockEvent();
                }

                if (ITINOBJ.BUSIN_SOURCE_ID != null && ITINOBJ.BUSIN_SOURCE_ID.toString().trim() != "") {
                    $$("BUSSOURCEIDBK").setValue(ITINOBJ.BUSIN_SOURCE_ID.toString().trim());
                }                
                if (ITINOBJ.GUEST_TY_ID != null && $.trim(ITINOBJ.GUEST_TY_ID.toString()) != "") {
                    $$("ddlGuestTyBk").blockEvent();
                    $$("ddlGuestTyBk").setValue($.trim(ITINOBJ.GUEST_TY_ID.toString()))
                    $$("ddlGuestTyBk").unblockEvent();
                    var TARIFF_APPL_IND = 0;
                    var vData = $$("ddlGuestTyBk").getPopup().getList().serialize();
                    $$("ComplNarBK_Btn").hide();
                    if (vData.length > 0) {
                        var newData = vData.filter(function (el) {
                            return el.id == $.trim(ITINOBJ.GUEST_TY_ID.toString());
                        });
                        if (newData.length > 0) TARIFF_APPL_IND = newData[0].TARIFF_APPL_IND;
                        if (TARIFF_APPL_IND == "1") {
                            $$("ComplNarBK_Btn").show();
                        }
                        if (ITINOBJ.A2_RM != null && ITINOBJ.A2_RM.toString().trim() != "") $$("txtComplNarrPop").setValue(ITINOBJ.A2_RM.toString().trim());
                    }
                }
                if (ExpBk_FORN_TARIFF_APPL_IND == "1") {
                    if (ITINOBJ.CURRENCY_ID != null && ITINOBJ.CURRENCY_ID.toString().trim() != "") {
                        $$("BKCURRENCY_ID").setValue(ITINOBJ.CURRENCY_ID.toString().trim());
                        ExpBkLoadCurrDetails(ITINOBJ.CURRENCY_ID.toString().trim());
                    }
                }
                if (ITINOBJ.MARK_SEGMNT_ID != null && ITINOBJ.MARK_SEGMNT_ID.toString().trim() != "") {
                    $$("ddlSegmentExpBk").blockEvent();
                    $$("ddlSegmentExpBk").setValue($.trim(ITINOBJ.MARK_SEGMNT_ID));
                    $$("ddlSegmentExpBk").unblockEvent();
                }
                if(ITINOBJ.RESERVE_ROOMS != null && ITINOBJ.RESERVE_ROOMS.toString().trim() != "") $$("NoOfRoomsBK").setValue(ITINOBJ.RESERVE_ROOMS.toString().trim());

                if (ITINOBJ.RESV_MODE_ID != null && ITINOBJ.RESV_MODE_ID.toString().trim() != "") $$("ExpBkResMode").setValue(ITINOBJ.RESV_MODE_ID.toString().trim());
                if (ITINOBJ.GUEST_STATUS_ID != null && ITINOBJ.GUEST_STATUS_ID.toString().trim() != "") $$("ExpBkGstStatus").setValue(ITINOBJ.GUEST_STATUS_ID.toString().trim());
                if (ITINOBJ.CHANNEL_ID != null && ITINOBJ.CHANNEL_ID.toString().trim() != "") $$("ExpBkChannel").setValue(ITINOBJ.CHANNEL_ID.toString().trim());
                if (ITINOBJ.PAYMENT_MODE_ID != null && ITINOBJ.PAYMENT_MODE_ID.toString().trim() != "") $$("ExpBkPayMode").setValue(ITINOBJ.PAYMENT_MODE_ID.toString().trim());
                if (ITINOBJ.BILL_INST_ID != null && ITINOBJ.BILL_INST_ID.toString().trim() != "") $$("ExpBkBillIns").setValue(ITINOBJ.BILL_INST_ID.toString().trim());
                if (ITINOBJ.VISIT_PURPOSE != null && ITINOBJ.VISIT_PURPOSE.toString().trim() != "") $$("ExpBkVisitPurp").setValue(ITINOBJ.VISIT_PURPOSE.toString().trim());
                if (ITINOBJ.NARR != null && ITINOBJ.NARR.toString().trim() != "") $$("VouchNoBk").setValue(ITINOBJ.NARR.toString().trim());
                if (ITINOBJ.REFER != null && ITINOBJ.REFER.toString().trim() != "") $$("ReferenceBk").setValue(ITINOBJ.REFER.toString().trim());
                if (ITINOBJ.RESERVATION_INS != null && ITINOBJ.RESERVATION_INS.toString().trim() != "") $$("ReserveInsBK").setValue(ITINOBJ.RESERVATION_INS.toString().trim());
                if (ITINOBJ.GUEST_INS != null && ITINOBJ.GUEST_INS.toString().trim() != "") $$("GuestRequestBK").setValue(ITINOBJ.GUEST_INS.toString().trim());
                if (ITINOBJ.CHECK_IN_INS != null && ITINOBJ.CHECK_IN_INS.toString().trim() != "") $$("CheckInInsBK").setValue(ITINOBJ.CHECK_IN_INS.toString().trim());
                if (ITINOBJ.CHECK_OUT_INS != null && ITINOBJ.CHECK_OUT_INS.toString().trim() != "") $$("CheckOutInsBK").setValue(ITINOBJ.CHECK_OUT_INS.toString().trim());
                if (ITINOBJ.POS_INS != null && ITINOBJ.POS_INS.toString().trim() != "") $$("PosInsBK").setValue(ITINOBJ.POS_INS.toString().trim());
                if (ITINOBJ.BOOKER_ID != null && ITINOBJ.BOOKER_ID.toString().trim() != "") $$("ExpBkBookerId").setValue(ITINOBJ.BOOKER_ID.toString().trim());
                if (ITINOBJ.BOOKER_NM != null && ITINOBJ.BOOKER_NM.toString().trim() != "") $$("ExpBkBooker").setValue(ITINOBJ.BOOKER_NM.toString().trim());
                if (ITINOBJ.SOURCE_ID != null && ITINOBJ.SOURCE_ID.toString().trim() != "") $$("ExpBkSourceId").setValue(ITINOBJ.SOURCE_ID.toString().trim());
                if (ITINOBJ.SOURCE_NM != null && ITINOBJ.SOURCE_NM.toString().trim() != "") $$("ExpBkSource").setValue(ITINOBJ.SOURCE_NM.toString().trim());

                var vChild = 0;
                var vChild2 = 0;
                var vChild3 = 0;
                var vAdult = 0;
                var vInfant = 0;


                $$("AdultBK").blockEvent();
                if (ITINOBJ.ADULT != null && ITINOBJ.ADULT != "") {
                    vAdult = ITINOBJ.ADULT.toString().trim();
                    $$("AdultBK").setValue(vAdult);                    
                }
                $$("AdultBK").unblockEvent();
                
                if ($$("ChildBK").isVisible() == true) {
                    $$("ChildBK").blockEvent();
                    if (ITINOBJ.CHILD != null && ITINOBJ.CHILD != "") {
                        vChild = ITINOBJ.CHILD.toString().trim();
                        $$("ChildBK").setValue(vChild);
                    }
                    $$("ChildBK").unblockEvent();
                }
                if ($$("ChildBK2").isVisible() == true) {
                    $$("ChildBK2").blockEvent();
                    if (ITINOBJ.CH_2 != null && ITINOBJ.CH_2 != "") {
                        vChild2 = ITINOBJ.CH_2.toString().trim();
                        $$("ChildBK2").setValue(vChild2);
                    }
                    $$("ChildBK2").unblockEvent();
                }
                if ($$("ChildBK3").isVisible() == true) {
                    $$("ChildBK3").blockEvent();
                    if (ITINOBJ.CH_3 != null && ITINOBJ.CH_3 != "") {
                        vChild3 = ITINOBJ.CH_3.toString().trim();
                        $$("ChildBK3").setValue(vChild3);
                    }
                    $$("ChildBK3").unblockEvent();
                }
                if ($$("InfantBK").isVisible() == true) {
                    $$("InfantBK").blockEvent();
                    if (ITINOBJ.INFANT != null && ITINOBJ.INFANT != "") {
                        vInfant = ITINOBJ.INFANT.toString().trim();
                        $$("InfantBK").setValue(vInfant);
                    }
                    $$("InfantBK").unblockEvent();
                }                              
                var TotPax = parseInt(vAdult) + parseInt(vChild) + parseInt(vChild2) + parseInt(vChild3);

                if (ITIGSTDET) {
                    var vNewRows = [];
                    var set = {};
                    var IntNo = 0;
                    if (ITIGSTDET.length > 0) {
                        var newData = ITIGSTDET.filter(function (el) {
                            return el.INT_ID == "G";
                        });
                        if (newData.length > 0) {
                            $.each(newData, function (key, SRow) {
                                //
                                IntNo += 1;
                                set = {
                                    TYPE: "Gst " + IntNo, TITTLE: SRow.TITTLE, LAST_NM: SRow.LAST_NM, FIRST_NM: SRow.FIRST_NM, GUEST_ID: SRow.GUEST_ID, INT_ID: SRow.INT_ID, INF_IND: SRow.INF_IND, GUEST_SNO: SRow.GUEST_SNO, CHECKIN_IND: SRow.CHECKIN_IND,
                                    F_IND: SRow.F_IND, AR_PR_FLNO: SRow.AR_PR_FLNO, AR_PR_DT: SRow.AR_PR_DT, AR_PR_TM: SRow.AR_PR_TM, AR_SEC_FLNO: SRow.AR_SEC_FLNO, AR_SEC_DT: SRow.AR_SEC_DT, AR_SEC_TM: SRow.AR_SEC_TM, AR_TR_FLNO: SRow.AR_TR_FLNO,
                                    AR_TR_DT: SRow.AR_TR_DT, AR_TR_TM: SRow.AR_TR_TM, AR_AD_CHR: SRow.AR_AD_CHR, AR_CH_CHR: SRow.AR_CH_CHR, AR_CH_CHR: SRow.AR_CH_CHR, DF_IND: SRow.DF_IND, DP_PR_FLNO: SRow.DP_PR_FLNO,
                                    DP_PR_DT: SRow.DP_PR_DT, DP_PR_TM: SRow.DP_PR_TM, DP_SEC_FLNO: SRow.DP_SEC_FLNO, DP_SEC_DT: SRow.DP_SEC_DT, DP_SEC_TM: SRow.DP_SEC_TM, DP_TR_FLNO: SRow.DP_TR_FLNO,
                                    DP_TR_DT: SRow.DP_TR_DT, DP_TR_TM: SRow.DP_TR_TM, DP_AD_CHR: SRow.DP_AD_CHR, DP_CH_CHR: SRow.DP_CH_CHR
                                }
                                vNewRows.push(set);
                                if (TotPax == IntNo) return false;
                            })
                        }

                        if (vInfant > 0) {
                            IntNo = 0;
                            var newData = ITIGSTDET.filter(function (el) {
                                return el.INT_ID == "INF";
                            });
                            if (newData.length > 0) {
                                $.each(newData, function (key, SRow) {
                                    //
                                    IntNo += 1;
                                    set = {
                                        TYPE: "Inf " + IntNo, TITTLE: SRow.TITTLE, LAST_NM: SRow.LAST_NM, FIRST_NM: SRow.FIRST_NM, GUEST_ID: SRow.GUEST_ID, INT_ID: SRow.INT_ID, INF_IND: SRow.INF_IND, GUEST_SNO: SRow.GUEST_SNO, CHECKIN_IND: SRow.CHECKIN_IND,
                                        F_IND: SRow.F_IND, AR_PR_FLNO: SRow.AR_PR_FLNO, AR_PR_DT: SRow.AR_PR_DT, AR_PR_TM: SRow.AR_PR_TM, AR_SEC_FLNO: SRow.AR_SEC_FLNO, AR_SEC_DT: SRow.AR_SEC_DT, AR_SEC_TM: SRow.AR_SEC_TM, AR_TR_FLNO: SRow.AR_TR_FLNO,
                                        AR_TR_DT: SRow.AR_TR_DT, AR_TR_TM: SRow.AR_TR_TM, AR_AD_CHR: SRow.AR_AD_CHR, AR_CH_CHR: SRow.AR_CH_CHR, DF_IND: SRow.DF_IND, DP_PR_FLNO: SRow.DP_PR_FLNO,
                                        DP_PR_DT: SRow.DP_PR_DT, DP_PR_TM: SRow.DP_PR_TM, DP_SEC_FLNO: SRow.DP_SEC_FLNO, DP_SEC_DT: SRow.DP_SEC_DT, DP_SEC_TM: SRow.DP_SEC_TM, DP_TR_FLNO: SRow.DP_TR_FLNO,
                                        DP_TR_DT: SRow.DP_TR_DT, DP_TR_TM: SRow.DP_TR_TM, DP_AD_CHR: SRow.DP_AD_CHR, DP_CH_CHR: SRow.DP_CH_CHR
                                    };
                                    vNewRows.push(set);
                                })
                            }
                        }
                    }

                    $$("gridGstExpBk").clearAll()
                    $$("gridGstExpBk").parse(vNewRows);
                }

                fnExpBkGuestLoad();               

            }
        }
    }

    $$("PlanBK").hide();
    $$("PlanAmtBK").hide();
    $$("PlanChild1Bk").hide();
    $$("PlanDiscAmtBK").hide();
    if (ExpBk_Plan_Appl_Ind == "1" ) {
        $$("PlanBK").show();
        $$("PlanAmtBK").show();
        if (ExpBk_Plan_Compute_Type != 4) $$("PlanChild1Bk").show();
        if (ExpBk_Plan_Compute_Type != 4) $$("PlanDiscBK").show();
        if (ExpBk_Plan_Compute_Type != 4) $$("PlanDiscAmtBK").show();

        if (ExpBk_Plan_Compute_Type == 4) {
            $$('PlanAmtBK').define("readonly", true);
            webix.html.addCss($$("PlanAmtBK").getNode(), "ReadOnlyText");
            $$('PlanAmtBK').refresh();
        }
        else {
            $$('PlanAmtBK').define("readonly", false);
            webix.html.removeCss($$("PlanAmtBK").getNode(), "ReadOnlyText");
            $$('PlanAmtBK').refresh();
        }
    }
    if (ExpBk_Plan_Disc_Ind == "1"){        
        $$('PlanDiscBK').define("readonly", false);
        webix.html.removeCss($$("PlanDiscBK").getNode(), "ReadOnlyText");
        $$('PlanDiscBK').refresh();
        $$('PlanDiscAmtBK').define("readonly", false);
        webix.html.removeCss($$("PlanDiscAmtBK").getNode(), "ReadOnlyText");
        $$('PlanDiscAmtBK').refresh();
    }
    else {
        $$('PlanDiscBK').define("readonly", true);
        webix.html.addCss($$("PlanDiscBK").getNode(), "ReadOnlyText");
        $$('PlanDiscBK').refresh();
        $$('PlanDiscAmtBK').define("readonly", true);
        webix.html.addCss($$("PlanDiscAmtBK").getNode(), "ReadOnlyText");
        $$('PlanDiscAmtBK').refresh();
    }

    if (ExpBkMode == "OPEN" && ExpBkMailApplInd == "2") ExpBkfnChkTraceAvil();

};
function fnLoadDetDataExpBk(ROOMNO, RMTY, RESERVE_NO, ARRDT, DEPTDT, ARRTM, DEPTTM, MODE,TY){
    ExpBkOpenRec = [];    
    $$("btnLogExpBk").hide();

    if (MODE == "NEW") {
        $$("AdultBK").setValue('');
        $$("ChildBK").setValue('');
        $$("ChildBK2").setValue('');
        $$("ChildBK3").setValue('');
        
                   
        $$("InfantBK").setValue(''); 
        $$("BKCURRENCY_ID").setValue(ExpBkBasCurrId);

        ExpBkLoadCurrDetails($$("BKCURRENCY_ID").getValue());

        $$("TRVAGNTBK").setValue('');
        $$("TRVAGNTIDBK").setValue(''); 

        $$("CompanyBK").setValue('');
        $$("CompanyidBK").blockEvent();
        $$("CompanyidBK").setValue('');
        $$("CompanyidBK").unblockEvent();

        //$$("SOURCEBK").setValue('');
        $$("BUSSOURCEIDBK").setValue(''); 

        $$("txtDiscReasResPop").setValue('');
        $$("ddlDiscTypeResPop").setValue('');
        //$$("MobileBKPop").setValue('');
        //$$("EMailBKPop").setValue('');
        var arr = ARRDT.split('/')[2] + "/" + ARRDT.split('/')[1] + "/" + ARRDT.split('/')[0];
        var dep = DEPTDT.split('/')[2] + "/" + DEPTDT.split('/')[1] + "/" + DEPTDT.split('/')[0];
        $$("DepatureBK").setValue(dep);
        $$("ArrivalBK").setValue(arr);
        $$("HHMMBK1").setValue(ARRTM);
        $$("HHMMBK2").setValue(DEPTTM);
        $$("RoomTypeBK").setValue($.trim(RMTY));                        
        $$("RoomNOBK").setValue(ROOMNO);
        $$("NoOfRoomsBK").setValue('1');
        $$("AdultBK").setValue('1');
        $$("GuestId").setValue('');
        fnLoadUpgradeRmTyExpBk();
        
        $$('BookIndCancel').hide();
        $$("DiscDetBK_Btn").hide();

        $$("ddlGuestTyBk").blockEvent();
        $$("ddlGuestTyBk").setValue('')
        $$("ddlGuestTyBk").unblockEvent();

        fnExpBkGuestLoad();

        $$("PlanBK").setValue('');        
        ExpBkR_NO = '';
        ExpBkRESERVE_NO = '';
        $$("RsrId").setValue('');
        ExpBkPlanId = '';
        ExpBkONM = "";

        if(ExpBkPageId == "TC"){
            $('#O_NM').val('');
            $('#R_NO').val('');
            $('#Reserve_NO').val('');
            $("#PlanID").val('');
        }        
        $$("txtComplNarrPop").setValue('');                    
        $$("PlanAmtBK").setValue('');
        $$("PlanChild1Bk").setValue('');
        $$("PlanChild2Bk").setValue('');                   
        $$("PlanChild3Bk").setValue('');        
        $$("chkLeaderExpBk").setValue('0');        

        //$$('FirstNMBK').define("readonly", false);
        //webix.html.removeCss($$("FirstNMBK").getNode(), "ReadOnlyText");
        //$$('FirstNMBK').refresh()
        //$$('LastNMBK').define("readonly", false);
        //webix.html.removeCss($$("LastNMBK").getNode(), "ReadOnlyText");
        //$$('LastNMBK').refresh();
        //$$('TitleBK').define("readonly", false);
        //webix.html.removeCss($$("TitleBK").getNode(), "ReadOnlyText");
        //$$('TitleBK').refresh();
        //alert(T3_Ind);
                        
                
        if (ExpBkT3_IND == "1") $$("StatusBK").setValue('2');
        else if (ExpBkT3_IND == "2") $$("StatusBK").setValue('3');
        else $$("StatusBK").setValue('1');

        expbkTotPax = fnExpBkPaxChange();
    }
    else if (MODE == "OPEN") {       
        $$("lblAdvanceExpBk").hide();
        if (RESERVE_NO != "") {
            var GetRec = OpenModeBookingLoad(RESERVE_NO, TY);
            //var OpenVal = OpenModeBookingLoad(RESERVE_NO, TY);
            if (GetRec != null) {
                var OpenVal = GetRec.DATA1;
                var OpenVal1 = GetRec.DATA2;
                var AudCnt = GetRec.AudCnt;
                var AddlDepAmt = GetRec.AddlDepAmt;
                var Cur_Shrt_Nm = GetRec.Cur_Shrt_Nm;                

                if (OpenVal.length > 0) {
                    $$("btnLogExpBk").show();
                    $$("txtDiscReasResPop").setValue('');
                    $$("ddlDiscTypeResPop").setValue('');
                    //$$("MobileBKPop").setValue('');
                    //$$("EMailBKPop").setValue('');
                    //$$("ReserveNO").setValue(OpenVal[0].reserve_no); //COMMENTED BY SUTHAHER - RESERVE NO SHOWING WRONGLY
                    //
                    $$("ReserveNO").setValue(OpenVal[0].R_NO);
                    $$("AdultBK").blockEvent();
                    if (OpenVal[0].ADULT != null && OpenVal[0].ADULT != "") $$("AdultBK").setValue(OpenVal[0].ADULT.toString().trim());
                    $$("AdultBK").unblockEvent();
                    $$("ChildBK").blockEvent();
                    if (OpenVal[0].CHILD != null && OpenVal[0].CHILD != "") $$("ChildBK").setValue(OpenVal[0].CHILD.toString().trim());
                    $$("ChildBK").unblockEvent();
                    $$("ChildBK2").blockEvent();
                    if (OpenVal[0].CH_2 != null && OpenVal[0].CH_2 != "") $$("ChildBK2").setValue(OpenVal[0].CH_2.toString().trim());
                    $$("ChildBK2").unblockEvent();
                    $$("ChildBK3").blockEvent();
                    if (OpenVal[0].CH_3 != null && OpenVal[0].CH_3 != "") $$("ChildBK3").setValue(OpenVal[0].CH_3.toString().trim());
                    $$("ChildBK3").unblockEvent();
                    if (OpenVal[0].A4_IND != null && OpenVal[0].A4_IND != "") $$("InfantBK").setValue(OpenVal[0].A4_IND.toString().trim());
                    $$("DepatureBK").setValue(OpenVal[0].DEPARTURE_DT);
                    $$("ArrivalBK").setValue(OpenVal[0].ARRIVAL_DT);
                    $$("RoomTypeBK").blockEvent();
                    $$("RoomTypeBK").setValue($.trim(OpenVal[0].ROOM_TY_ID));
                    fnLoadUpgradeRmTyExpBk();
                    $$("RoomTypeBK").unblockEvent();
                    $$("RoomNOBK").setValue(OpenVal[0].BLOCK_ROOM_NO);
                    $$("NoOfRoomsBK").setValue(OpenVal[0].RESERVE_ROOMS);
                    $$("HHMMBK1").setValue(OpenVal[0].ARRIVAL_TM);
                    $$("HHMMBK2").setValue(OpenVal[0].DEPARTURE_TM);
                    $$("BKCURRENCY_ID").setValue(OpenVal[0].CURRENCY_ID.toString().trim());

                    

                    ExpBkLoadCurrDetails($$("BKCURRENCY_ID").getValue());
                    if (OpenVal[0].DEPOSIT_AMT.toString().trim() != "") {
                        if (parseFloat(OpenVal[0].DEPOSIT_AMT.toString().trim()) > 0) {
                            $$("lblAdvanceExpBk").show();
                            $$("lblAdvanceExpBk").config.label = "Advances : " + fnCurrFormatExpBk(OpenVal[0].DEPOSIT_AMT.toString().trim());
                            $$("lblAdvanceExpBk").refresh();
                        }
                    }

                    if (AddlDepAmt != "") {
                        if (parseFloat(AddlDepAmt) > 0) {
                            $$("lblAdvanceExpBk").show();
                            if (ExpBk_B17_IND == "1") {
                                var advAmt = OpenVal[0].DEPOSIT_AMT.toString().trim() == "" ? "0" : OpenVal[0].DEPOSIT_AMT.toString().trim();
                                advAmt = parseFloat(advAmt);
                                $$("lblAdvanceExpBk").config.label = "Advances : " + fnCurrFormatExpBk(advAmt + parseFloat(AddlDepAmt));
                                $$("lblAdvanceExpBk").refresh();
                            }
                            
                            else {
                                $$("lblAdvanceExpBk").config.label = "Advances : " + Cur_Shrt_Nm + " " + fnCurrFormatExpBk(parseFloat(AddlDepAmt));
                                $$("lblAdvanceExpBk").refresh();
                            }
                        }
                    }

                    if(ExpBkTY != "5") ExpBk_ITINO = OpenVal[0].IT_NO == null ? "" : OpenVal[0].IT_NO.toString().trim();

                    //if(ExpBkBasCurrId != $.trim(OpenVal[0].CURRENCY_ID) && $.trim(OpenVal[0].CURRENCY_ID) !="") ExpBkLoadCurrDec($.trim(OpenVal[0].CURRENCY_ID));

                    $$("ddlDiscTypeResPop").blockEvent();
                    if (OpenVal[0].B2_ID != null && OpenVal[0].B2_ID != "") $$("ddlDiscTypeResPop").setValue($.trim(OpenVal[0].B2_ID));
                    $$("ddlDiscTypeResPop").unblockEvent();
                    if (OpenVal[0].DISC_TY_ID != null) $$("txtDiscReasResPop").setValue($.trim(OpenVal[0].DISC_TY_ID));
                    var IntNo = 0;
                    vNewRows = [];
                    set = {};
                    if (OpenVal1.length > 0) {
                        var newData = OpenVal1.filter(function (el) {
                            return el.INT_ID == "G";
                        });
                        if (newData.length > 0) {
                            $.each(newData, function (key, SRow) {
                                //
                                IntNo += 1;
                                set = {
                                        TYPE: "Gst " + IntNo, TITTLE: SRow.TITTLE, LAST_NM: SRow.LAST_NM, FIRST_NM: SRow.FIRST_NM, GUEST_ID: SRow.GUEST_ID, INT_ID: SRow.INT_ID, INF_IND: SRow.INF_IND, GUEST_SNO: SRow.GUEST_SNO, CHECKIN_IND: SRow.CHECKIN_IND,
                                        F_IND: SRow.F_IND, AR_PR_FLNO: SRow.AR_PR_FLNO, AR_PR_DT: SRow.AR_PR_DT, AR_PR_TM: SRow.AR_PR_TM, AR_SEC_FLNO: SRow.AR_SEC_FLNO, AR_SEC_DT: SRow.AR_SEC_DT, AR_SEC_TM: SRow.AR_SEC_TM, AR_TR_FLNO: SRow.AR_TR_FLNO,
                                        AR_TR_DT: SRow.AR_TR_DT, AR_TR_TM: SRow.AR_TR_TM, AR_AD_CHR: SRow.AR_AD_CHR, AR_CH_CHR: SRow.AR_CH_CHR, AR_CH_CHR: SRow.AR_CH_CHR, DF_IND: SRow.DF_IND, DP_PR_FLNO: SRow.DP_PR_FLNO,
                                        DP_PR_DT: SRow.DP_PR_DT, DP_PR_TM: SRow.DP_PR_TM, DP_SEC_FLNO: SRow.DP_SEC_FLNO, DP_SEC_DT: SRow.DP_SEC_DT, DP_SEC_TM: SRow.DP_SEC_TM, DP_TR_FLNO: SRow.DP_TR_FLNO,
                                        DP_TR_DT: SRow.DP_TR_DT, DP_TR_TM: SRow.DP_TR_TM, DP_AD_CHR: SRow.DP_AD_CHR, DP_CH_CHR: SRow.DP_CH_CHR
                                    }
                                
                                vNewRows.push(set);
                            })
                        }

                        IntNo = 0;
                        var newData = OpenVal1.filter(function (el) {
                            return el.INT_ID == "INF";
                        });
                        if (newData.length > 0) {
                            $.each(newData, function (key, SRow) {
                                //
                                IntNo += 1;
                                set = {
                                    TYPE: "Inf " + IntNo, TITTLE: SRow.TITTLE, LAST_NM: SRow.LAST_NM, FIRST_NM: SRow.FIRST_NM, GUEST_ID: SRow.GUEST_ID, INT_ID: SRow.INT_ID, INF_IND: SRow.INF_IND, GUEST_SNO: SRow.GUEST_SNO, CHECKIN_IND: SRow.CHECKIN_IND,
                                    F_IND: SRow.F_IND, AR_PR_FLNO: SRow.AR_PR_FLNO, AR_PR_DT: SRow.AR_PR_DT, AR_PR_TM: SRow.AR_PR_TM, AR_SEC_FLNO: SRow.AR_SEC_FLNO, AR_SEC_DT: SRow.AR_SEC_DT, AR_SEC_TM: SRow.AR_SEC_TM, AR_TR_FLNO: SRow.AR_TR_FLNO,
                                    AR_TR_DT: SRow.AR_TR_DT, AR_TR_TM: SRow.AR_TR_TM, AR_AD_CHR: SRow.AR_AD_CHR, AR_CH_CHR: SRow.AR_CH_CHR, DF_IND: SRow.DF_IND, DP_PR_FLNO: SRow.DP_PR_FLNO,
                                    DP_PR_DT: SRow.DP_PR_DT, DP_PR_TM: SRow.DP_PR_TM, DP_SEC_FLNO: SRow.DP_SEC_FLNO, DP_SEC_DT: SRow.DP_SEC_DT, DP_SEC_TM: SRow.DP_SEC_TM, DP_TR_FLNO: SRow.DP_TR_FLNO,
                                    DP_TR_DT: SRow.DP_TR_DT, DP_TR_TM: SRow.DP_TR_TM, DP_AD_CHR: SRow.DP_AD_CHR, DP_CH_CHR: SRow.DP_CH_CHR
                                };
                                vNewRows.push(set);
                            })
                        }
                    }

                    $$("gridGstExpBk").clearAll()
                    $$("gridGstExpBk").parse(vNewRows);

                    fnExpBkGuestLoad();

                    //$$("MobileBK").setValue(OpenVal[0].MOBILE);
                    //$$("EMailBK").setValue(OpenVal[0].email);
                    //$$("FirstNMBK").blockEvent();
                    //if(OpenVal[0].TITLEID != null && OpenVal[0].TITLEID != "") $$("TitleBK").setValue(OpenVal[0].TITLEID.toString().trim());
                    //$$("LastNMBK").setValue(OpenVal[0].LAST_NAME);
                    //$$("FirstNMBK").setValue(OpenVal[0].FIRST_NAME);
                    //$$("FirstNMBK").unblockEvent();                

                    //$$("GuestRequestBK").setValue(OpenVal[0].SP_MESSAGE);
                    //$$("StatusBK").setValue($.trim(OpenVal[0].reserve_status));
                    $$("StatusBK").setValue($.trim(OpenVal[0].RESERVE_TY));
                    $$("GuestId").setValue($.trim(OpenVal[0].GUEST_ID));


                    $$("txtComplNarrPop").setValue(OpenVal[0].A2_RM);
                    if (OpenVal[0].GUEST_TY_ID != null && $.trim(OpenVal[0].GUEST_TY_ID) != "") {
                        $$("ddlGuestTyBk").blockEvent();
                        $$("ddlGuestTyBk").setValue($.trim(OpenVal[0].GUEST_TY_ID))
                        $$("ddlGuestTyBk").unblockEvent();
                        var TARIFF_APPL_IND = 0;
                        var vData = $$("ddlGuestTyBk").getPopup().getList().serialize();
                        $$("ComplNarBK_Btn").hide();
                        if (vData.length > 0) {
                            var newData = vData.filter(function (el) {
                                return el.id == $.trim(OpenVal[0].GUEST_TY_ID);
                            });
                            if (newData.length > 0) TARIFF_APPL_IND = newData[0].TARIFF_APPL_IND;
                            if (TARIFF_APPL_IND == "1") {
                                $$("ComplNarBK_Btn").show();
                            }
                        }
                    }
                    $$("btnUpgrdTyEdExpBk").hide();
                    if (ExpBkUpgrade_Appl_Ind == "1") {
                        if ($.trim(OpenVal[0].REGN_ID) != "") {
                            ExpBkRmUpgrdTy = $.trim(OpenVal[0].A6_IND);
                            ExpBkRmUpgrdReas = $.trim(OpenVal[0].N_NM);
                            $$("ddlRmUpgrdExpBk").blockEvent();
                            $$("ddlRmUpgrdExpBk").setValue($.trim(OpenVal[0].REGN_ID));
                            $$("ddlRmUpgrdExpBk").unblockEvent();
                            $$("btnUpgrdTyEdExpBk").show();
                        }
                    }
                    $$("ddlSegmentExpBk").setValue($.trim(OpenVal[0].MARK_SEGMNT_ID));

                    $$("TRVAGNTBK").setValue($.trim(OpenVal[0].TRV_AGENT_NM));
                    $$("TRVAGNTIDBK").setValue($.trim(OpenVal[0].TRV_AGENT_ID));

                    //$$("SOURCEBK").setValue($.trim(OpenVal[0].G_ID));
                    $$("BUSSOURCEIDBK").setValue($.trim(OpenVal[0].BUSIN_SOURCE_ID));

                    $$("GroupIdBK").setValue($.trim(OpenVal[0].GROUP_ID));

                    $$("GroupBK").setValue($.trim(OpenVal[0].GROUP_NM));

                    if (OpenVal[0].C4_ID != null && OpenVal[0].C4_ID != "" && $.trim(OpenVal[0].GROUP_NM) != "") {
                        if (OpenVal[0].C4_ID == "1") $$("chkLeaderExpBk").setValue("1");
                        else $$("chkLeaderExpBk").setValue('0')
                    }
                    else $$("chkLeaderExpBk").setValue('0')

                    $$("CompanyBK").setValue(OpenVal[0].GUEST_PARTY_NM);
                    $$("CompanyidBK").blockEvent();
                    $$("CompanyidBK").setValue(OpenVal[0].GUEST_PARTY_ID);
                    $$("CompanyidBK").unblockEvent();
                    $$("RateCodeBK").blockEvent();
                    $$("RateCodeBK").setValue(OpenVal[0].RATE_TY_NM);
                    $$("RateCodeBK").unblockEvent();
                    $$("RateCodeidBK").setValue(OpenVal[0].RATE_TY_ID);


                    if (OpenVal[0].RESV_MODE_ID != null && OpenVal[0].RESV_MODE_ID != "") $$("ExpBkResMode").setValue(OpenVal[0].RESV_MODE_ID.toString().trim());
                    if (OpenVal[0].GUEST_STATUS_ID != null && OpenVal[0].GUEST_STATUS_ID != "") $$("ExpBkGstStatus").setValue(OpenVal[0].GUEST_STATUS_ID.toString().trim());
                    if (OpenVal[0].CHANNEL_ID != null && OpenVal[0].CHANNEL_ID != "") $$("ExpBkChannel").setValue(OpenVal[0].CHANNEL_ID.toString().trim());
                    if (OpenVal[0].PAYMENT_MODE_ID != null && OpenVal[0].PAYMENT_MODE_ID != "") $$("ExpBkPayMode").setValue(OpenVal[0].PAYMENT_MODE_ID.toString().trim());
                    if (OpenVal[0].BILL_INST_ID != null && OpenVal[0].BILL_INST_ID != "") $$("ExpBkBillIns").setValue(OpenVal[0].BILL_INST_ID.toString().trim());
                    if (OpenVal[0].VISIT_PURPOSE != null && OpenVal[0].VISIT_PURPOSE != "") $$("ExpBkVisitPurp").setValue(OpenVal[0].VISIT_PURPOSE.toString().trim());
                    if (OpenVal[0].VOUCHER != null && OpenVal[0].VOUCHER != "") $$("VouchNoBk").setValue(OpenVal[0].VOUCHER.toString().trim());
                    if (OpenVal[0].REFER != null && OpenVal[0].REFER != "") $$("ReferenceBk").setValue(OpenVal[0].REFER.toString().trim());
                    if (OpenVal[0].RESERVATION_INST != null && OpenVal[0].RESERVATION_INST != "") $$("ReserveInsBK").setValue(OpenVal[0].RESERVATION_INST.toString().trim());
                    if (OpenVal[0].SP_MESSAGE != null && OpenVal[0].SP_MESSAGE != "") $$("GuestRequestBK").setValue(OpenVal[0].SP_MESSAGE.toString().trim());
                    if (OpenVal[0].CHECK_IN_INST != null && OpenVal[0].CHECK_IN_INST != "") $$("CheckInInsBK").setValue(OpenVal[0].CHECK_IN_INST.toString().trim());
                    if (OpenVal[0].CHECK_OUT_INST != null && OpenVal[0].CHECK_OUT_INST != "") $$("CheckOutInsBK").setValue(OpenVal[0].CHECK_OUT_INST.toString().trim());
                    if (OpenVal[0].POS_INST != null && OpenVal[0].POS_INST != "") $$("PosInsBK").setValue(OpenVal[0].POS_INST.toString().trim());
                    if (OpenVal[0].BOOKER != null && OpenVal[0].BOOKER != "") $$("ExpBkBookerId").setValue(OpenVal[0].BOOKER.toString().trim());
                    if (OpenVal[0].BOOKER_NM != null && OpenVal[0].BOOKER_NM != "") $$("ExpBkBooker").setValue(OpenVal[0].BOOKER_NM.toString().trim());
                    if (OpenVal[0].G1_ID != null && OpenVal[0].G1_ID != "") $$("ExpBkSourceId").setValue(OpenVal[0].G1_ID.toString().trim());
                    if (OpenVal[0].SRC_NM != null && OpenVal[0].SRC_NM != "") $$("ExpBkSource").setValue(OpenVal[0].SRC_NM.toString().trim());



                    ExpBkR_NO = OpenVal[0].R_NO;
                    ExpBkRESERVE_NO = OpenVal[0].RESERVE_NO;
                    $$("RsrId").setValue(OpenVal[0].RESERVE_NO);
                    ExpBkPlanId = OpenVal[0].PLAN_ID == null ? "" : OpenVal[0].PLAN_ID.toString().trim();
                    ExpBkONM = OpenVal[0].O_NM == null ? "" : OpenVal[0].O_NM.toString().trim();

                    if (ExpBkPageId == "TC") {
                        $('#O_NM').val(OpenVal[0].O_NM);
                        $('#R_NO').val(OpenVal[0].R_NO);
                        $('#Reserve_NO').val(OpenVal[0].RESERVE_NO);
                        $("#PlanID").val(OpenVal[0].PLAN_ID);
                    }

                    $$("PlanBK").setValue(OpenVal[0].PLAN_NM == null ? "" : OpenVal[0].PLAN_NM);

                    if ($$("BKCURRENCY_ID").getValue() == ExpBkBasCurrId) {
                        if (OpenVal[0].TARIFF != null && OpenVal[0].TARIFF != "") $$("TariffBK").setValue(parseFloat(OpenVal[0].TARIFF).toFixed(ExpBkCurDecLmt));
                        else $$("TariffBK").setValue(parseFloat(0).toFixed(ExpBkCurDecLmt));
                        $$("DiscBK").blockEvent();
                        $$("AmountBK").blockEvent();
                        $$("DiscDetBK_Btn").hide();
                        if (OpenVal[0].TARIFF_DISC_PER != null && OpenVal[0].TARIFF_DISC_PER != "") {
                            $$("DiscBK").setValue(parseFloat(OpenVal[0].TARIFF_DISC_PER).toFixed(ExpBkCurDecLmt));
                            $$("DiscDetBK_Btn").show();
                        }
                        if (OpenVal[0].TARIFF_DISC_AMT != null && OpenVal[0].TARIFF_DISC_AMT != "") {
                            $$("DiscDetBK_Btn").show();
                            $$("AmountBK").setValue(parseFloat(OpenVal[0].TARIFF_DISC_AMT).toFixed(ExpBkCurDecLmt));
                        }
                        $$("DiscBK").unblockEvent();
                        $$("AmountBK").unblockEvent();

                        if (OpenVal[0].PLAN_AMT != null && OpenVal[0].PLAN_AMT != "") {
                            $$("PlanAmtBK").setValue(OpenVal[0].PLAN_AMT);
                        }                        

                        if (OpenVal[0].PL_C != null && OpenVal[0].PL_C != "") {
                            $$("PlanChild1Bk").setValue(OpenVal[0].PL_C);
                        }

                        if (OpenVal[0].P_C2 != null && OpenVal[0].P_C2 != "") {
                            $$("PlanChild2Bk").setValue(OpenVal[0].P_C2);
                        }
                        if (OpenVal[0].P_C3 != null && OpenVal[0].P_C3 != "") {
                            $$("PlanChild3Bk").setValue(OpenVal[0].P_C3);
                        }
                        if (OpenVal[0].PLAN_DISC_PER != null && OpenVal[0].PLAN_DISC_PER != "") $$("PlanDiscBK").setValue(OpenVal[0].PLAN_DISC_PER.toFixed(ExpBkCurDecLmt));
                        if (OpenVal[0].PLAN_DISC_AMT != null && OpenVal[0].PLAN_DISC_AMT != "") $$("PlanDiscAmtBK").setValue(OpenVal[0].PLAN_DISC_AMT.toFixed(ExpBkCurDecLmt));

                    }
                    else {
                        if (OpenVal[0].TARIFF_FORN != null && OpenVal[0].TARIFF_FORN != "") $$("TariffBK").setValue(parseFloat(OpenVal[0].TARIFF_FORN).toFixed(ExpBkCurDecLmt));
                        else $$("TariffBK").setValue(parseFloat(0).toFixed(ExpBkCurDecLmt));
                        $$("DiscBK").blockEvent();
                        $$("AmountBK").blockEvent();
                        $$("DiscDetBK_Btn").hide();
                        if (OpenVal[0].TARIFF_DISC_PER != null && OpenVal[0].TARIFF_DISC_PER != "") {
                            $$("DiscBK").setValue(parseFloat(OpenVal[0].TARIFF_DISC_PER).toFixed(ExpBkCurDecLmt));
                            $$("DiscDetBK_Btn").show();
                        }
                        if (OpenVal[0].FORN_TARIFF_DISC != null && OpenVal[0].FORN_TARIFF_DISC != "") {
                            $$("DiscDetBK_Btn").show();
                            $$("AmountBK").setValue(parseFloat(OpenVal[0].FORN_TARIFF_DISC).toFixed(ExpBkCurDecLmt));
                        }
                        $$("DiscBK").unblockEvent();
                        $$("AmountBK").unblockEvent();

                        if (OpenVal[0].PLAN_AMT_FORN != null && OpenVal[0].PLAN_AMT_FORN != "") {
                            $$("PlanAmtBK").setValue(OpenVal[0].PLAN_AMT_FORN);
                        }

                        if (OpenVal[0].PL_C_F != null && OpenVal[0].PL_C_F != "") {
                            $$("PlanChild1Bk").setValue(OpenVal[0].PL_C_F);
                        }

                        if (OpenVal[0].P_C2 != null && OpenVal[0].P_C2 != "") {
                            $$("PlanChild2Bk").setValue(OpenVal[0].P_C2);
                        }
                        if (OpenVal[0].P_C3 != null && OpenVal[0].P_C3 != "") {
                            $$("PlanChild3Bk").setValue(OpenVal[0].P_C3);
                        }
                        if (OpenVal[0].PLAN_DISC_PER != null && OpenVal[0].PLAN_DISC_PER != "") $$("PlanDiscBK").setValue(OpenVal[0].PLAN_DISC_PER.toFixed(ExpBkCurDecLmt));
                        if (OpenVal[0].FORN_PLAN_DISC != null && OpenVal[0].FORN_PLAN_DISC != "") $$("PlanDiscAmtBK").setValue(OpenVal[0].FORN_PLAN_DISC.toFixed(ExpBkCurDecLmt));

                    }



                    //$$('FirstNMBK').define("readonly", true);
                    //webix.html.addCss($$("FirstNMBK").getNode(), "ReadOnlyText");
                    //$$('FirstNMBK').refresh()
                    //$$('LastNMBK').define("readonly", true);
                    //webix.html.addCss($$("LastNMBK").getNode(), "ReadOnlyText");
                    //$$('LastNMBK').refresh();
                    //$$('TitleBK').define("readonly", true);
                    //webix.html.addCss($$("TitleBK").getNode(), "ReadOnlyText");
                    //$$('TitleBK').refresh();

                    LoadsetRouting_EditSplit_GridData(OpenVal[0].R_NO, RESERVE_NO);
                    debugger;
                    if (ExpBk_Auto_Chrg_Appl == "1") {
                        var Arr_Dt = OpenVal[0].ARRIVAL_DT.split("/");
                        var Dep_Dt = OpenVal[0].DEPARTURE_DT.split("/");;
                        Arr_Dt = Arr_Dt[2] + "/" + Arr_Dt[1] + "/" + Arr_Dt[0];
                        Dep_Dt = Dep_Dt[2] + "/" + Dep_Dt[1] + "/" + Dep_Dt[0];

                        fnFACloadautoCharge(ExpBkCompId, ExpBkUserId, ExpBkConnStr, ExpBkApiUrl, BkAspxPage, RESERVE_NO, Arr_Dt, Dep_Dt);
                        if (FAC_auto_grid_data.length > 0) webix.html.addCss($$("btnAutoChrgeExpBk").getNode(), "BtnClr");
                        $$("btnAutoChrgeExpBk").refresh();
                    }

                    $$('BookIndCancel').show();

                    if (ExpBkNN_IND == "1" || ExpBkNN_IND == "2") {
                        //
                        $$("btnRoutingExpBk").show();
                        if (Routing_data.length > 0) {
                            webix.html.addCss($$("btnRoutingExpBk").getNode(), "BtnClr");
                            $$("btnRoutingExpBk").refresh();
                        }
                    }
                    else $$("btnRoutingExpBk").hide();

                    ExpBkLastUpdateDt = OpenVal[0].LST_UPDATE_DT;


                    ExpBkTotPax = fnExpBkPaxChange();
                    //
                    webix.html.removeCss($$("btnPkgExpBk").getNode(), "BtnClr");
                    $$("btnPkgExpBk").refresh();

                    ExpBkBIND = OpenVal[0].DISC_FOOD == null || OpenVal[0].DISC_FOOD == "" ? "0" : parseInt(OpenVal[0].DISC_FOOD).toString();
                    if (ExpBkBIND == "1" && ExpBkNew_Packg_Appl == "1") {
                        fnLoadSavedPackageDet(RESERVE_NO);
                        ExpBkbPckgChg = false;
                        webix.html.addCss($$("btnPkgExpBk").getNode(), "BtnClr");
                        $$("btnPkgExpBk").refresh();
                    }
                    if (ExpBkBIND == "0" && ExpBkNew_Packg_Appl == "1") {
                        var RmTy = $$("RoomTypeBK").getValue();
                        fnChkPackAppl(RmTy);
                        if (ExpBkBIND == "1" && ExpBkNew_Packg_Appl == "1") {
                            fnLoadPackageDefault();
                            if (ExpBkAdrsPK.length > 0) {
                                webix.html.addCss($$("btnPkgExpBk").getNode(), "BtnClr");
                                $$("btnPkgExpBk").refresh();
                            }
                        }
                    }
                }
            }
        }
    }

};

function fnExpBkAlphabetText(code, e) {
    //

    var charCode = e.which || e.keyCode;
    var newVal = e.key;
    if ((newVal.match(/[a-zA-Z0-9,@.-]/g)) || charCode == 46 || charCode == 35 || charCode == 36 || charCode == 37 || charCode == 39 || charCode == 8 || charCode == 9 || charCode == 32) {
        //
        return true
    }
    else {
        //
        return false;
    }

};
function CurrentDateLoad() {
    var rtn = '';
    //
    Request = {
        REQTYPE: "CurrentDateLoad",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        RMT_TY : ExpBkRmtTy,
    }
    var DataVal = JSON.stringify(Request);    
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            rtn = data;

            
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL",ApiControler:"CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);

    //$.ajax({
    //    type: "POST",
    //    url: "/TravelAgentBlock/CurrentDateLoad",
    //    data: '',
    //    async: false,
    //    success: function (data) {
    //        rtn = data;
    //    }
    //});
    return rtn;
};
function TitleGstLoad() {
    var rowDatad = [];
    $$("TitleBK").define("options", rowDatad);
    //
    Request = {
        REQTYPE: "TitleGstLoad",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        RMT_TY: ExpBkRmtTy,
        PROPID: ExpBkCompId,
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;
            if (data != "") {
                rowDatad = JSON.parse(data);
                $$("TitleBK").define("options", rowDatad);

                var FirsId = $$("TitleBK").getPopup().getList().getFirstId();
                if (FirsId) $$("TitleBK").setValue(FirsId);
            }

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);
    //$.ajax({
    //    type: "POST",
    //    url: "/TravelAgentBlock/TitleGstLoad",
    //    data: { 'PROPID': $$("Property").getValue() },
    //    //dataType:JSON,
    //    async: false,
    //    success: function (d) {
    //        
    //        if (d != "") {
    //            rowDatad = JSON.parse(d);
    //        }
    //    }
    //});
    //return rowDatad;
};
function ExpBkCompanyLoadfnOld() {
    
    //webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    //webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Company Search",
        id: 'ExpBkCompanySearchPOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    id: "ExpBkCompanySearchGrid",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "PARTY_NM", header: ['Company', { content: "textFilter" }], width: 380, css: { 'text-align': 'left ! important' } },
                            { id: "PARTY_ID", hidden: true },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            var getval = this.getItem(id.row);
                            $$("CompanyBK").setValue(getval.PARTY_NM);
                            $$("CompanyidBK").setValue(getval.PARTY_ID);                           

                            var RateVal = CompanyRateCodeLoadFn(getval.PARTY_ID);
                            //
                            if (RateVal.length > 0) {                                
                                $$("RateCodeidBK").setValue(RateVal[0].RATE_TY_ID);                                
                                ExpBkPlanId = RateVal[0].PLAN_ID;
                                $$("PlanBK").setValue(RateVal[0].PLAN_NM);
                                RateCodeTariffloadfn();
                                $$("RateCodeBK").setValue(RateVal[0].RATE_TY_NM);                                
                            }
                            $$("ExpBkCompanySearchPOP").hide();                            
                        },
                        'onBeforeFilter': function (id, value, config) {
                            //
                            //if ($.trim(value).length >= 3) {
                            //    var dataval = CompanySearchloadfn(value);
                            //}
                            //else {
                            //    $$("ExpBkCompanySearchGrid").clearAll();
                            //}                          

                        },
                        'onKeyPress': function (e) {
                            //
                            if (e == '13') {
                                var valid = $$("ExpBkCompanySearchGrid").getSelectedId(true);
                                this.callEvent("onItemDblClick", [valid[0]]);
                                return false;
                            }
                            
                        }
                    },
                    ready:function(){
                        CompanySearchloadfn(); 
                    }
                },
                {
                    view: 'form',
                    elements: [
                        {
                            cols: [
                                {
                                    view: 'label',
                                    label: ' ',
                                    name: 'label1',
                                    id: 'label1',
                                    labelWidth: 100,
                                },
                                {
                                    cols: [
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Ok',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var data = $$("ExpBkCompanySearchGrid").getSelectedItem();
                                                    $$("CompanyBK").setValue(data.PARTY_NM);
                                                    $$("CompanyidBK").setValue(data.PARTY_ID);
                                                    var RateVal = CompanyRateCodeLoadFn(data.PARTY_ID);
                                                    //
                                                    if (RateVal.length > 0) {                                                        
                                                        $$("RateCodeidBK").setValue(RateVal[0].RATE_TY_ID);                                                        
                                                        ExpBkPlanId = RateVal[0].PLAN_ID;
                                                        $$("PlanBK").setValue(RateVal[0].PLAN_NM);
                                                        RateCodeTariffloadfn();
                                                        $$("RateCodeBK").setValue(RateVal[0].RATE_TY_NM);
                                                    }
                                                    $$("ExpBkCompanySearchPOP").hide();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("ExpBkCompanySearchPOP").hide();
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }).show();

     
};
function CompanySearchloadfn(val) {
    $$("ExpBkCompanySearchGrid").clearAll();
    var rowDatad = [];
    //
    Request = {
        REQTYPE: "CompanyLoadMultiParty",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        RMT_TY: ExpBkRmtTy,
        PROPID: ExpBkCompId,
        Value: val
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;
            if (data != "") {
                rowDatad = JSON.parse(data);
                $$("ExpBkCompanySearchGrid").parse(rowDatad);
                $$("ExpBkCompanySearchGrid").refresh();
                if ($$("ExpBkCompanySearchGrid").count()) {
                    $$("ExpBkCompanySearchGrid").select($$("ExpBkCompanySearchGrid").getFirstId());
                }
                webix.UIManager.setFocus($$("ExpBkCompanySearchGrid"));
            }

        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);
};

function ExpBkCompanyLoadfn() {
    //
    var Template = "<div class='row col-12'> " +
                        " <div class='col-6' style='padding-left:0px !important'> " +
                                " <div style='width:100px; float:left; '> <input type='text' style='width: 10px; height: 10px; background-color: darkblue;'  disabled='disabled' /> UnApproved</div> " +
                        " </div> " +                        
                    " </div>"+
                    "<div class='row col-12'> " +                        
                        " <div class='col-6' style='padding-left:0px !important'> " +
                                " <div style='width:80px; float:left;'>  <input type='text' style='width: 10px; height: 10px; background-color: red;'  disabled='disabled' /> Block List</div>" +
                        " </div> " +
                    " </div>";
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        head: "Company Search",
        id: 'ExpBkCompanySearchPOP',
        position: "center",
        css: "WebIxStyle",
        height: 550,
        width: 450,
        move: true,
        on: {
            onShow: function () {
                var vheight = window.innerHeight
                        || document.documentElement.clientHeight
                        || document.body.clientHeight;
                var vWidth = window.innerWidth
                        || document.documentElement.clientWidth
                        || document.body.clientWidth;
                if (vheight > 550) vheight = 550;
                if (vWidth > 450) vWidth = 450;

                $$("ExpBkCompanySearchPOP").define("height", vheight);
                $$("ExpBkCompanySearchPOP").define("width", vWidth);
                $$("ExpBkCompanySearchPOP").adjust();

                var Top = $$("ExpBkCompanySearchGrid").getNode().offsetTop
                $$("ExpBkCompanySearchGrid").define("height", vheight - Top - 100);
                $$("ExpBkCompanySearchGrid").define("width", vWidth - 20);
                $$("ExpBkCompanySearchGrid").resize();
            }
        },
        body: {
            view: "form",
            id: "frmComCompSrch",
            padding: { top: 2, bottom: 2, left: 1, right: 1 },
            
            elements: [
                {
                    view: "datatable",
                    id: "ExpBkCompanySearchGrid",
                    select: 'row',
                    css: "webix_header_border",
                    fixedRowHeight: false,
                    resizeColumn: true,
                    autoConfig: true,
                    ready:function(){
                        ExpBkCompSrchLoadData();
                    },
                    columns: [
                            { id: "id", header: ["CC Id", { content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, hidden: true },
                            { id: "value", header: ["Company Name", { content: "textFilter", }], width: 280, fillspace: true, css: { 'text-align': 'left ! important' }, },
                            { id: "Place", header: ["Place", { content: "textFilter", }], width: 150, css: { 'text-align': 'left ! important' }, hidden: true },

                    ],
                    data: [],
                    on: {

                        'onItemDblClick': function (id) {
                            //
                            ExpBkCompanySrchRet(id.row);
                        },
                        'onKeyPress': function (e) {
                            //
                            var selRow = this.getSelectedItem();
                            if (selRow == null || selRow == undefined) selRow = $$("ExpBkCompanySearchGrid").getFirstId();
                            var rowid = selRow.id;
                            var charCode = e;
                            if (charCode == '13') {
                                ExpBkCompanySrchRet(rowid);
                            }

                        },
                    },
                    scheme: {
                        $init: function (item) {
                            //
                            if (item.CLR != "" && item.CLR != null) {
                                item.$css = { "color": item.CLR };
                            }
                        },
                    },
                },

                {                     
                    cols: [
                        { view: "template", template: Template,height:50,borderless:true },
                        {
                            rows: [
                                {
                                    padding: { top: 10 },
                                    cols: [
                                            {                                                
                                                view: "button", maxWidth: 70, label: "Ok", inputWidth: 60, width: 60, click: function () {
                                                    var selRow = $$("ExpBkCompanySearchGrid").getSelectedItem(false);
                                                    if (selRow == null || selRow == undefined) selRow = $$("ExpBkCompanySearchGrid").getFirstId();
                                                    var id = selRow.id;
                                                    ExpBkCompanySrchRet(id);
                                                }
                                            },
                                            { view: "button", maxWidth: 70, label: "Cancel", inputWidth: 60, width: 60, click: function () { $$("ExpBkCompanySearchPOP").hide(); } }
                                    ]
                                }
                            ]
                        }
                    ],
                },

            ],
        }
    }).show();
    
};
function ExpBkCompSrchLoadData() {
    //
    var sStr = "";
    webix.extend($$("frmComCompSrch"), webix.OverlayBox);
    $$("frmComCompSrch").showOverlay(PrgStr);
    try {
        Request = {
            REQTYPE: "GET_FNLOADCOMPANY",
            COMPID: ExpBkCompId,
            USERID: ExpBkUserId,
            CONSTRING: ExpBkConnStr,
            SkipPartySubTy: sStr,
        }
        var rowData = [];
        requestData = JSON.stringify(Request);
        if (BkAspxPage == false) requestData = encodeURIComponent(requestData);

        var params = {
            async: false,
            url: ExpBkApiUrl,
            type: 'POST',
            success: function (d) {
                if (d != null && d != "") {
                    if (BkAspxPage == true) {
                        var data = d.d;
                    }
                    else var data = d;

                    if (data != "") {
                        rowData = JSON.parse(data);
                        if (rowData.length > 0) {
                            $$("ExpBkCompanySearchGrid").parse(rowData);
                            $$("ExpBkCompanySearchGrid").refresh();
                            if ($$("ExpBkCompanySearchGrid").count()) {
                                $$("ExpBkCompanySearchGrid").select($$("ExpBkCompanySearchGrid").getFirstId());
                            }
                            webix.UIManager.setFocus($$("ExpBkCompanySearchGrid"));
                        }
                    }
                }

            },
            complete: function () {
                $$("frmComCompSrch").hideOverlay();
            },
            error: function (request, status, error) {
                console.log("Error Failrue");
                $$("frmComCompSrch").hideOverlay();
            }
        }

        if (BkAspxPage == true) {
            params.contentType = "application/json;charset=utf-8";
            params.acceptType = "application/json;charset=utf-8";
            params.dataType = "json";
            params.data = JSON.stringify({ request: requestData, URL: "FOAPI", ApiControler: "FoCommon/GetFoJsonReq" });
        }
        else params.data = "request=" + requestData + "&URL= FOAPI&ApiControler=FoCommon/GetFoJsonReq";
        $.ajax(params);        
        
    }
    catch (e) {
        console.log(e.message)
        $$("frmComCompSrch").hideOverlay();
    }

};
function ExpBkCompanySrchRet(RowId) {
    //    
    var selRow = $$("ExpBkCompanySearchGrid").getItem(RowId);
    var vId = selRow.id;
    var vNm = selRow.value;
    var vCLR = selRow.CLR;

    if (vCLR) {
        if (vCLR == "red") {
            webix.alert({ type: 'warning', text: "Black Listed Company" });
            return false;

        }
        //else if (vCLR == "blue") {
        //    webix.alert({ type: 'warning', text: "Unapproved Company" });
        //    return false;
        //}

    }  
    
    $$("CompanyBK").setValue(vNm);
    $$("CompanyidBK").setValue(vId);

    //var RateVal = CompanyRateCodeLoadFn(vId);
    ////
    //if (RateVal.length > 0) {
    //    $$("RateCodeidBK").setValue(RateVal[0].RATE_TY_ID);
    //    ExpBkPlanId = RateVal[0].PLAN_ID;
    //    $$("PlanBK").setValue(RateVal[0].PLAN_NM);
    //    RateCodeTariffloadfn();
    //    $$("RateCodeBK").setValue(RateVal[0].RATE_TY_NM);
    //}
    $$("ExpBkCompanySearchPOP").hide();
};

function CompanyRateCodeLoadFn(ComId) {

    //
    var rowDatad = [];
    var To_Dt = $$("ArrivalBK").getText();
    To_Dt = formatDateBk(To_Dt);
    To_Dt = To_Dt.substring(2, 8);

    var CURRENCY = $$("BKCURRENCY_ID").getValue();
    if (CURRENCY == null || CURRENCY == "") CURRENCY = ExpBkBasCurrId;

    Request = {
        REQTYPE: "CompanyRateCodeLoadFn",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        PROPID: ExpBkCompId,
        RMT_TY: ExpBkRmtTy,
        PartyId: ComId,
        RMTY: $$("RoomTypeBK").getValue(),
        ARRV: $$("ArrivalBK").getValue(),
        To_Dt: To_Dt,
        CURRENCY: CURRENCY
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {

                rowDatad = JSON.parse(data);

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);

    //$.ajax({
    //    type: "POST",
    //    url: "/TravelAgentBlock/CompanyRateCodeLoadFn",
    //    data: { 'PROPID': $$("Property").getValue(), 'PartyId': ComId, 'RMTY': $$("RoomTypeBK").getValue(), 'ARRV': $$("ArrivalBK").getValue() },
    //    //dataType:JSON,
    //    async: false,
    //    success: function (d) {
    //        
    //        if (d != "") {
    //            rowDatad = JSON.parse(d);
    //        }
    //    }
    //});
    return rowDatad;
};
function RoomNoLoadfn() {
    //webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    //webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Room No Search",
        id: 'RoomNoSearchPOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    id: "RoomNoSearch",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "ROOM_NO", header: ['Room No', { content: "textFilter" }], width: 380, css: { 'text-align': 'left ! important' } },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            var getval = this.getItem(id.row);
                            $$("RoomNOBK").setValue(getval.ROOM_NO);
                            $$("RoomNoSearchPOP").hide();
                        },
                        'onKeyPress': function (e) {
                            //
                            if (e == '13') {
                                var valid = $$("RoomNoSearch").getSelectedId(true);
                                this.callEvent("onItemDblClick", [valid[0]]);
                            }
                        }
                    },
                },
                {
                    view: 'form',
                    elements: [
                        {
                            cols: [
                                {
                                    view: 'label',
                                    label: ' ',
                                    name: 'label1',
                                    id: 'label1',
                                    labelWidth: 100,
                                },
                                {
                                    cols: [
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Ok',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var data = $$("RoomNoSearch").getSelectedItem();
                                                    $$("RoomNOBK").setValue(data.ROOM_NO);
                                                    $$("RoomNoSearchPOP").hide();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("RoomNoSearchPOP").hide();
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }).show();

};
function RoomNoLoadFns() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/TravelAgentBlock/RoomNoLoadFn",
        data: { 'PROPID': $$("Property").getValue(), 'RMTY': $$("RoomTypeBK").getValue() },
        //dataType:JSON,
        async: false,
        success: function (d) {
            //
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("RoomNoSearch").clearAll();
                $$("RoomNoSearch").parse(rowDatad);
                $$("RoomNoSearch").refresh();
            }
        }
    });
    return rowDatad;
};

function fnRetFromRateCodeSrch(CurrId, RateId, RateNm, PlanId, PlanNm, CompHuInd) {
    $$("BKCURRENCY_ID").setValue(CurrId);
    ExpBkLoadCurrDetails(CurrId);
    $$("RateCodeidBK").setValue(RateId);

    ExpBkPlanId = PlanId;
    $$("PlanBK").setValue(PlanNm);
    RateCodeTariffloadfn();    
    $$("RateCodeBK").setValue(RateNm);

}

function RateCodeLoadfn() {
    //webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    //webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "RateCode Search",
        id: 'ExpBkRateCodeSearchPOP',
        autoconfig:true,
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    id: "RateCodeSearch",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "RATE_TY_NM", header: ['RateCode', { content: "textFilter" }], width: 380, css: { 'text-align': 'left ! important' } },
                            { id: "RATE_TY_ID", hidden: true },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            var getval = this.getItem(id.row);
                            $$("RateCodeidBK").setValue(getval.RATE_TY_ID);                                                                                  
                            ExpBkPlanId = getval.PLAN_ID;
                            $$("PlanBK").setValue(getval.PLAN_NM);
                            RateCodeTariffloadfn();
                            $$("ExpBkRateCodeSearchPOP").hide();
                            $$("RateCodeBK").setValue(getval.RATE_TY_NM);
                        },
                        'onKeyPress': function (e) {
                           // 
                            if (e == '13') {
                                var valid = $$("RateCodeSearch").getSelectedId(true);
                                this.callEvent("onItemDblClick", [valid[0]]);
                                return false;
                            }
                            
                        }
                    },
                    scheme: {
                        $init: function (item) {
                            //
                            if (item.PK_ID != "" && item.PK_ID != null) {
                                item.$css = "RatePkgCss";
                            }
                        },
                    },
                },
                {
                    view: 'form',
                    elements: [
                        {
                            cols: [
                                {
                                    view: 'label',
                                    label: ' ',
                                    name: 'label1',
                                    id: 'label1',
                                    labelWidth: 100,
                                },
                                {
                                    cols: [
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Ok',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var data = $$("RateCodeSearch").getSelectedItem();
                                                    $$("RateCodeBK").setValue(data.RATE_TY_NM);
                                                    $$("RateCodeidBK").setValue(data.RATE_TY_ID);                                                    
                                                    ExpBkPlanId = data.PLAN_ID;
                                                    $$("PlanBK").setValue(data.PLAN_NM);
                                                    RateCodeTariffloadfn();
                                                    $$("ExpBkRateCodeSearchPOP").hide();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("ExpBkRateCodeSearchPOP").hide();
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }).show();
    var dataval = RateCodeSearchloadfn();
};
var formatDateBk = function (StrDt) {
    //
    var Parts = StrDt.split("/");
    var Dt = Parts[0];
    var Mn = Parts[1];
    var Yr = Parts[2];
    var Str = Yr +  Mn  + Dt;
    return Str;
};

function RateCodeSearchloadfn() {
    $$("RateCodeSearch").clearAll();
    var rowDatad = [];
    //
    var To_Dt = $$("ArrivalBK").getText();
    To_Dt = formatDateBk(To_Dt);
    To_Dt = To_Dt.substring(2, 8);

    var sRmTy = $$("RoomTypeBK").getValue(); 
    if(ExpBkUpgrade_Appl_Ind == "1"){
        if ($$("ddlRmUpgrdExpBk").getValue() != null && $$("ddlRmUpgrdExpBk").getValue() != "" && $$("ddlRmUpgrdExpBk").getValue() != "#N#"){
            sRmTy = $$("ddlRmUpgrdExpBk").getValue();            
        }
    }

    Request = {
        REQTYPE: "RateCodeLoadMultiParty",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        RMT_TY: ExpBkRmtTy,
        PROPID: ExpBkCompId,
        RMTY: sRmTy,
        ARRV: $$("ArrivalBK").getValue(),
        To_Dt: To_Dt
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {

                rowDatad = JSON.parse(data);               
                $$("RateCodeSearch").parse(rowDatad);
                $$("RateCodeSearch").refresh();                
                $$("RateCodeSearch").refresh();
                if ($$("RateCodeSearch").count()) {
                    $$("RateCodeSearch").select($$("RateCodeSearch").getFirstId());
                }
                webix.UIManager.setFocus($$("RateCodeSearch"));
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);


    //$.ajax({
    //    type: "POST",
    //    url: "/TravelAgentBlock/RateCodeSearchloadfn",
    //    data: { 'PROPID': $$("Property").getValue(), 'RMTY': $$("RoomTypeBK").getValue(), 'ARRV': $$("ArrivalBK").getValue() },
    //    async: false,
    //    //dataType:JSON,
    //    success: function (d) {
    //        
    //        if (d != "") {
    //            rowDatad = JSON.parse(d);
    //            $$("RateCodeSearch").clearAll();
    //            $$("RateCodeSearch").parse(rowDatad);
    //            $$("RateCodeSearch").refresh();
    //        }
    //    }
    //});
    //return rowDatad;
};
function RateCodeTariffloadfn(Retain) {
   // 
    var rowDatad = [];
    var ArrivalBK = $$("ArrivalBK").getText();
    var DepatureBK = $$("DepatureBK").getText();

    Retain = Retain || "";

    //var ArrivalBK = $$("ArrivalBK").getValue();
    //if (ArrivalBK != "") {
    //    ArrivalBK = ArrivalBK.substring(0, 10).toString();
    //    ArrivalBK = ArrivalBK.split('-')[1] + "/" + ArrivalBK.split('-')[2] + "/" + ArrivalBK.split('-')[0];
    //}
    //var DepatureBK = $$("DepatureBK").getValue();
    //if (DepatureBK != "") {
    //    DepatureBK = DepatureBK.substring(0, 10).toString();
    //    DepatureBK = DepatureBK.split('-')[1] + "/" + DepatureBK.split('-')[2] + "/" + DepatureBK.split('-')[0];
    //}

    ExpBkBIND = "0"; ExpBkEIND = "0"; ExpBkbPckgChg = false; ExpBkAdrsPK = [];
    webix.html.removeCss($$("btnPkgExpBk").getNode(), "BtnClr");
    $$("btnPkgExpBk").refresh();

    

    $$("TariffBK").setValue('0');
    if (Retain != "1") {
        $$("AmountBK").setValue('');
        $$("DiscBK").setValue('');
        $$("ddlDiscTypeResPop").setValue('');
        $$("txtDiscReasResPop").setValue('');
        $$("DiscDetBK_Btn").hide();


        $$("PlanAmtBK").setValue('');
        $$("PlanChild1Bk").setValue('');
        $$("PlanChild2Bk").setValue('');
        $$("PlanChild3Bk").setValue('');
        $$("PlanBK").setValue('');
        ExpBkPlanId = '';
    }

    
    

    var TARIFF_APPL_IND = 0;
    if ($$("ddlGuestTyBk").getValue() != null && $$("ddlGuestTyBk").getValue() != "") {
        var vData = $$("ddlGuestTyBk").getPopup().getList().serialize();
        if (vData.length > 0) {
            var newData = vData.filter(function (el) {
                return el.id == $.trim($$("ddlGuestTyBk").getValue());
            });
            if (newData.length > 0) TARIFF_APPL_IND = newData[0].TARIFF_APPL_IND;
        }
    }

    if (TARIFF_APPL_IND == "1") return false;

    var sRmTy = $$("RoomTypeBK").getValue();

    if(ExpBkUpgrade_Appl_Ind == "1"){
        if ($$("ddlRmUpgrdExpBk").getValue() != null && $$("ddlRmUpgrdExpBk").getValue() != "" && $$("ddlRmUpgrdExpBk").getValue() != "#N#"){
            sRmTy = $$("ddlRmUpgrdExpBk").getValue();            
        }
    }

    if(ExpBkNew_Packg_Appl == "1"){
        fnChkPackAppl(sRmTy);
    }   

    var To_Dt = $$("ArrivalBK").getText();
    To_Dt = formatDateBk(To_Dt);
    To_Dt = To_Dt.substring(2, 8);

    var vChild = 0;
    var vChild2 = 0;
    var vChild3 = 0;
    if ($$("ChildBK").getValue() != null && $$("ChildBK").getValue() != "") vChild = $$("ChildBK").getValue();
    if ($$("ChildBK2").getValue() != null && $$("ChildBK2").getValue() != "") vChild2 = $$("ChildBK2").getValue();
    if ($$("ChildBK3").getValue() != null && $$("ChildBK3").getValue() != "") vChild3 = $$("ChildBK3").getValue();
    var vAdult = 0;
    if ($$("AdultBK").getValue() != null && $$("AdultBK").getValue() != "") vAdult = $$("AdultBK").getValue();
    if ($$("RoomTypeBK").getValue() == "") return;
    if ($$("RateCodeidBK").getValue() == "") return;
    if (ArrivalBK == "") return;
    if (DepatureBK == "") return;
    if (vAdult == 0 && vChild == 0 && vChild2 == 0 && vChild3 == 0) return;

    var CURRENCY = $$("BKCURRENCY_ID").getValue();
    if (CURRENCY == null || CURRENCY == "") CURRENCY = ExpBkBasCurrId;

    if (ExpBkModify_Tariff == "1") {
        //
        ExpBkAdrsTariff = [];
        fnClearTariffData();        
        fnExBkTariffShow("1");        
    }

   

    Request = {
        REQTYPE: "RateCodeTariffloadfn",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        RMT_TY: ExpBkRmtTy,
        PROPID: ExpBkCompId,
        RMTY:sRmTy,
        ARRV: $$("ArrivalBK").getValue(),
        RATE_TY_ID: $$("RateCodeidBK").getValue(),
        PLAN: ExpBkPlanId,
        CURRENCY:CURRENCY,
        ADLT: vAdult,
        CHLD: vChild,
        CHLD2: vChild2,
        CHLD3: vChild3,
        ARRV: ArrivalBK,
        DEPT: DepatureBK,
        To_Dt: To_Dt
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {
                
                rowDatad = JSON.parse(data);
                var TARDATA = rowDatad.TARDATA;
                if (TARDATA.length > 0) {
                    var vTarif = TARDATA[0].TOT_TRF;
                    if (vTarif == undefined || vTarif == null || vTarif == "") vTarif = 0;
                    $$("TariffBK").setValue(parseFloat(TARDATA[0].TOT_TRF).toFixed(ExpBkCurDecLmt));

                    if (Retain != "1") {
                        if (ExpBk_Plan_Appl_Ind == "1") {
                            //
                            var PlnId = rowDatad.PLAN_ID;
                            var PlnAdultRate = 0;
                            var PlnCh1Rate = 0;
                            var PlnCh2Rate = 0;
                            var PlnCh3Rate = 0;

                            if (TARDATA[0].PA_AMT != null && TARDATA[0].PA_AMT != "") PlnAdultRate = parseFloat(TARDATA[0].PA_AMT, ExpBkCurDecLmt);
                            if (TARDATA[0].PC1_AMT != null && TARDATA[0].PC1_AMT != "") PlnCh1Rate = parseFloat(TARDATA[0].PC1_AMT, ExpBkCurDecLmt);
                            if (TARDATA[0].PC2_AMT != null && TARDATA[0].PC2_AMT != "") parseFloat(TARDATA[0].PC2_AMT, ExpBkCurDecLmt);
                            if (TARDATA[0].PC3_AMT != null && TARDATA[0].PC3_AMT != "") parseFloat(TARDATA[0].PC3_AMT, ExpBkCurDecLmt);

                            if (PlnId != null && PlnId != "") {
                                $$("PlanAmtBK").setValue(PlnAdultRate);
                                $$("PlanChild1Bk").setValue(PlnCh1Rate);
                                $$("PlanChild2Bk").setValue(PlnCh2Rate);
                                $$("PlanChild3Bk").setValue(PlnCh3Rate);

                                var PlanData = []
                                if (PlnId != "") PlanData = fnSetPlanNameExpBk(PlnId, CURRENCY);

                                if (PlanData != null && PlanData.length > 0) {
                                    var vNm = PlanData[0].PLAN_NM;
                                    var vPlnAdl = PlanData[0].SINGLE_PLAN;
                                    var vPlnCh1 = PlanData[0].PL_C;
                                    var vPlnCh2 = PlanData[0].P_C2;
                                    var vPlnCh3 = PlanData[0].P_C3;


                                    $$("PlanBK").setValue(vNm);
                                    $$("PlanAmtBK").setValue(vPlnAdl);
                                    $$("PlanChild1Bk").setValue(vPlnCh1);
                                    $$("PlanChild2Bk").setValue(vPlnCh2);
                                    $$("PlanChild3Bk").setValue(vPlnCh3);
                                }
                                                               
                                ExpBkPlanId = PlnId;
                            }

                        }
                    }
                }

                //ExpBkBIND = rowDatad.B_IND;
                //ExpBkEIND = rowDatad.E_IND;
                
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);

    if (ExpBkBIND == "1" && ExpBkNew_Packg_Appl == "1") {
        fnLoadPackageDefault();        
        webix.html.addCss($$("btnPkgExpBk").getNode(), "BtnClr");
        $$("btnPkgExpBk").refresh();
    }   

    

    //$.ajax({
    //    type: "POST",
    //    url: "/TravelAgentBlock/RateCodeTariffloadfn",
    //    data: { 'PROPID': $$("Property").getValue(), 'RMTY': $$("RoomTypeBK").getValue(), 'ARRV': ArrivalBK, 'DEPT': DepatureBK, 'RATE_TY_ID': $$("RateCodeidBK").getValue(), 'PLAN': $("#PlanID").val(), 'ADLT': $$("AdultBK").getValue(), 'CHLD': $$("ChildBK").getValue() },
    //    async: false,
    //    //dataType:JSON,
    //    success: function (d) {
    //        
    //        if (d != "") {
    //            rowDatad = JSON.parse(d);
    //            $$("TariffBK").setValue(parseFloat(rowDatad[0].TOT_TRF).toFixed(2));
    //        }
    //    }
    //});
    //return rowDatad;
};
function GetRoomTyFn() {
    var rowDatad = [];
    var Allow_PM = "0";
    if(ExpBkMode == "OPEN" && ExpBkTY == "3" ) Allow_PM = "1";

    Request = {
        REQTYPE: "GetRoomTyFn",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,        
        PROPID: ExpBkCompId,
        RMT_TY: ExpBkRmtTy,
        ALLOW_PM:Allow_PM,
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {

                rowDatad = JSON.parse(data);

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);

    //$.ajax({
    //    type: "POST",
    //    async: false,
    //    url: "/TravelAgentBlock/GetRoomTyFn",
    //    data: { 'PROPID': $$("Property").getValue() },
    //    //dataType:JSON,
    //    success: function (d) {
    //        
    //        if (d != "") {
    //            rowDatad = JSON.parse(d);
    //        }
    //    }
    //});
    return rowDatad;
};

function fnChkPackAppl(RmTy) {
    //
    var rowDatad = [];
    ExpBkRateNoteAppl = "0";
    var CURRENCY = $$("BKCURRENCY_ID").getValue();
    if (CURRENCY == null || CURRENCY == "") CURRENCY = ExpBkBasCurrId;
    if(RmTy == null || RmTy == "") return;
    if($$("RateCodeidBK").getValue() == "") return;
    Request = {
        REQTYPE: "GET_FNCHKPACKAPPL",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        PROPID: ExpBkCompId,
        RMT_TY: ExpBkRmtTy,
        RMTY: RmTy,
        ARRV: $$("ArrivalBK").getValue(),
        RATE_TY_ID: $$("RateCodeidBK").getValue(),
        CURRENCY: CURRENCY,
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {
                rowDatad = JSON.parse(data);
                ExpBkBIND = rowDatad.B_IND;
                ExpBkEIND = rowDatad.E_IND;
                ExpBkRateNoteAppl= rowDatad.RATENOTAPPL;
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);
      
};
function fnchkTariffMarketSegment(){
    var rowDatad = [];
    var TarMarLink = "0";
    var MkId = "";
    
    var CURRENCY = $$("BKCURRENCY_ID").getValue();
    if (CURRENCY == null || CURRENCY == "") CURRENCY = ExpBkBasCurrId;
    var sRmTy = $$("RoomTypeBK").getValue();

    if(sRmTy == null || sRmTy == "") return;
    if($$("RateCodeidBK").getValue() == "") return ;

    Request = {
        REQTYPE: "GET_FNCHKTARIFFMARKETSEGMENT",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        PROPID: ExpBkCompId,
        RMT_TY: ExpBkRmtTy,
        RMTY: sRmTy,        
        RATE_TY_ID: $$("RateCodeidBK").getValue(),
        CURRENCY: CURRENCY,
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {
                rowDatad = JSON.parse(data);
                TarMarLink = rowDatad.TARMARLINK;
                MkId = rowDatad.MK_ID;                
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);

    if(TarMarLink == "1" && MkId != ""){
        webix.confirm({
            title: "Confirmation",
            ok: "Yes", cancel: "No",
            text: "Want to move Tariff Market Segment ? ",
            callback: function (result) {
                if (result == true) {
                    $$("ddlSegmentExpBk").setValue(MkId);

                }
            }
        })
    }
};
function fnGetDiscTy() {
    //
    var rowDatad = [];

    Request = {
        REQTYPE: "GET_FNDISCTY",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        PROPID: ExpBkCompId,
        RMT_TY: ExpBkRmtTy,
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {

                rowDatad = JSON.parse(data);

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);

    return rowDatad;
};
function ExpBkfnGetRateTy() {
    var rowDatad = [];

    Request = {
        REQTYPE: "GET_FNGETRATETY",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        PROPID: ExpBkCompId,
        RMT_TY: ExpBkRmtTy,
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {

                rowDatad = JSON.parse(data);

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);

   
    return rowDatad;
};
function fnLoadGuestTy() {
    //
    var rowDatad = [];

    Request = {
        REQTYPE: "GET_FNLOADGUESTTY",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        PROPID: ExpBkCompId,
        RMT_TY: ExpBkRmtTy,
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {

                rowDatad = JSON.parse(data);

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);

    return rowDatad;
};
function fnLoadSegmentExpBk() {
    //
    var rowData = [];
    var options = [];
    $$("ddlSegmentExpBk").define("options", options);

    Request = {
        REQTYPE: "GET_FNLOADMARKSEGMENT",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;
            if (data != "") {
                rowData = JSON.parse(data);
                options = rowData;
                if(options.length>0)
                {
                    var defId =options[0].id;
                    //options.splice(0, 0, { value: "#N#", id: "#N#" });
                    $$("ddlSegmentExpBk").define("options", options);
                    $$("ddlSegmentExpBk").setValue('');                    
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);
    
};

function fnLoadBusSourceExpBk(){

    //
    var rowData = [];
    var options = [];
    $$("BUSSOURCEIDBK").define("options", options);

    Request = {
        REQTYPE: "GET_FNLOADBUSSOURCE",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;
            if (data != "") {
                rowData = JSON.parse(data);
                options = rowData;
                if(options.length>0)
                {
                    var defId =options[0].id;
                    //options.splice(0, 0, { value: "#N#", id: "#N#" });
                    $$("BUSSOURCEIDBK").define("options", options);
                    $$("BUSSOURCEIDBK").setValue('');                    
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);


};

function fnLoadUpgradeRmTyExpBk() {
    //
    var rowData = [];
    var options = [];
    $$("ddlRmUpgrdExpBk").define("options", options);

    Request = {
        REQTYPE: "GET_FNLOADUPGRDRMTY",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        PROPID: ExpBkCompId,
        ROOM_TY: $$("RoomTypeBK").getValue(),
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;
            if (data != "") {
                rowData = JSON.parse(data);
                options = rowData;
                options.splice(0, 0, { value: "None", id: "#N#" });
                $$("ddlRmUpgrdExpBk").define("options", options);
                $$("ddlRmUpgrdExpBk").blockEvent();
                $$("ddlRmUpgrdExpBk").setValue("#N#");
                $$("ddlRmUpgrdExpBk").unblockEvent();                
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);
    
};

function fnChangUpgrdRmTy(NewVal,OldVal){
    //
    if($$("RateCodeBK").getValue() == "") return;
    if(ExpBkUpgrade_Appl_Ind == "0") return;
    if(NewVal == null || NewVal == "" ) return;

    $$("btnUpgrdTyEdExpBk").hide();
    
    var CURRENCY = $$("BKCURRENCY_ID").getValue();
    if (CURRENCY == null || CURRENCY == "") CURRENCY = ExpBkBasCurrId;
    if(ExpBkUpgrade_Appl_Ind == "1" && ExpBkFF_IND == "1"){
        if(NewVal != "#N#"){
            fnChkPackAppl(NewVal);
        }else fnChkPackAppl($$("RoomTypeBK").getValue());
        
        if(ExpBkRateNoteAppl == "0"){
            if ($$("RoomTypeBK").getValue() != "" && $$("RateCodeidBK").getValue() != "" && $$("ArrivalBK").getValue() != ""){
                webix.message({ type: 'warning', text:"Rate Code " + $$("RateCodeBK").getValue() + " is not defined for this Room Type. Please select Rate Code." });
                $$("RateCodeidBK").setValue(''); 
                $$("RateCodeBK").setValue(''); 
                $$("TariffBK").setValue("0.00");
                $$("DiscBK").blockEvent();
                $$("AmountBK").blockEvent();
                $$("DiscDetBK_Btn").hide();
                $$("DiscBK").setValue('');
                $$("AmountBK").setValue('');                                                                        
                $$("DiscBK").unblockEvent();
                $$("AmountBK").unblockEvent();
                $$("ddlDiscTypeResPop").blockEvent();
                $$("ddlDiscTypeResPop").setValue('');
                $$("ddlDiscTypeResPop").unblockEvent();
                $$("txtComplNarrPop").setValue('');

                if (ExpBkNew_Packg_Appl == "1" && ExpBkS14IND == "0") {
                    if (ExpBkAdrsPK.length > 0) {
                        ExpBkAdrsPK = [];
                        if (ExpBkbPckgChg1 == true) ExpBkbPckgChg = true;
                        else ExpBkbPckgChg = false;
                        webix.html.removeCss($$("btnPkgExpBk").getNode(), "BtnClr");
                        $$("btnPkgExpBk").refresh();
                    }
                }
                

                //RateCodeLoadfn();
                //ExpBkRateCodeWindowLoad();
                var To_Dt = $$("DepatureBK").getText();
                var Arr_Dt = $$("ArrivalBK").getText();
                var CurrencyId = CURRENCY;
                var sRmTy = $$("RoomTypeBK").getValue();
                if (ExpBkUpgrade_Appl_Ind == "1") {
                    if ($$("ddlRmUpgrdExpBk").getValue() != null && $$("ddlRmUpgrdExpBk").getValue() != "" && $$("ddlRmUpgrdExpBk").getValue() != "#N#") {
                        sRmTy = $$("ddlRmUpgrdExpBk").getValue();
                    }
                }

                if (sRmTy == "") {
                    webix.message({ type: 'warning', text: "Room Type cannot be empty" });
                    return false;
                }

                if (Arr_Dt == "") {
                    webix.message({ type: 'warning', text: "Arrival Date cannot be empty" });
                    return false;
                }

                if (To_Dt == "") {
                    webix.message({ type: 'warning', text: "Departure Date cannot be empty" });
                    return false;
                }

                RateSrchPopupLoadCom(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, BkAspxPage, sRmTy, To_Dt, CurrencyId);

                return;
            }
        }
        if($$("RoomTypeBK").getValue() != ""){   
            $$("ddlUpgrdReasTypePop1").setValue('');            
            $$("chkTarChange").setValue('0');
            $$("chkTarRetOld").setValue('0');
            $$("txtUpgrdToPop").setValue($$("RoomTypeBK").getText());
            $$("txtUpgrdFromPop").setValue($$("ddlRmUpgrdExpBk").getText());
            if(ExpBkRmUpgrdTy != ""){
                $$("ddlUpgrdReasTypePop1").setValue(ExpBkRmUpgrdTy); 
                $$("txtUpgrdReasPop1").setValue(ExpBkRmUpgrdReas)
            }
            else{
                $$("ddlUpgrdReasTypePop1").setValue(ExpBkDefRmUpgrdTy); 
            }           
            ExpBkfrmUpgradeChange = "U";
            $$("ExpBkchkChangeRoomType").hide();
            $$("btnCloseTarChange").show();
            $$("ExpBkTarChangPop").show();
            ExpBkPrevUpgrd = OldVal;            
        }
    }
    else {
        RateCodeTariffloadfn();
        ExpBkAdrsTariff = [];
        ExpBkAdrsPK = [];
        ExpBkRmUpgrdTy = ExpBkDefRmUpgrdTy;
        ExpBkRmUpgrdReas = ExpBkDefRmUpgrdTy;
        fnClearTariffData();
        fnLoadPackageDefault();                
        if (ExpBkModify_Tariff == "1") {
            fnExBkTariffShow("1");
        }
        if(ExpBkNew_Packg_Appl == "1"){
            fnLoadPackageDefault();        
        }
        if(NewVal != "#N#") $$("btnUpgrdTyEdExpBk").show();
        

    }
};

function fnChangRmTy(NewVal, OldVal) {
        
    ///if (ExpBkUpgrade_Appl_Ind == "0") return;
    if (NewVal == null || NewVal == "") return;
    $$("btnUpgrdTyEdExpBk").hide();

    var CURRENCY = $$("BKCURRENCY_ID").getValue();
    if (CURRENCY == null || CURRENCY == "") CURRENCY = ExpBkBasCurrId;
    if (ExpBkUpgrade_Appl_Ind == "1" && ExpBkFF_IND == "1" && $$("RateCodeBK").getValue() != "") {
        fnChkPackAppl($$("RoomTypeBK").getValue());
        if ((ExpBkMode == "NEW" && $$("ddlRmUpgrdExpBk").getValue() != "#N#") || ExpBkMode == "OPEN") {
            if (ExpBkRateNoteAppl == "0") {
                if ($$("RoomTypeBK").getValue() != "" && $$("RateCodeidBK").getValue() != "" && $$("ArrivalBK").getValue() != "") {
                    webix.message({ type: 'warning', text: "Rate Code " + $$("RateCodeBK").getValue() + " is not defined for this Room Type. Please select Rate Code." });
                    $$("RateCodeidBK").setValue('');
                    $$("RateCodeBK").setValue('');
                    $$("TariffBK").setValue("0.00");
                    $$("DiscBK").blockEvent();
                    $$("AmountBK").blockEvent();
                    $$("DiscDetBK_Btn").hide();
                    $$("DiscBK").setValue('');
                    $$("AmountBK").setValue('');
                    $$("DiscBK").unblockEvent();
                    $$("AmountBK").unblockEvent();
                    $$("ddlDiscTypeResPop").blockEvent();
                    $$("ddlDiscTypeResPop").setValue('');
                    $$("ddlDiscTypeResPop").unblockEvent();
                    $$("txtComplNarrPop").setValue('');
                    $$("DiscDetBK_Btn").hide();

                    $$("PlanAmtBK").setValue('');
                    $$("PlanChild1Bk").setValue('');
                    $$("PlanChild2Bk").setValue('');
                    $$("PlanChild3Bk").setValue('');
                    $$("PlanBK").setValue('');
                    if (ExpBkNew_Packg_Appl == "1" && ExpBkS14IND == "0") {
                        if (ExpBkAdrsPK.length > 0) {
                            ExpBkAdrsPK = [];
                            if (ExpBkbPckgChg1 == true) ExpBkbPckgChg = true;
                            else ExpBkbPckgChg = false;                            
                            webix.html.removeCss($$("btnPkgExpBk").getNode(), "BtnClr");
                            $$("btnPkgExpBk").refresh();
                        }
                    }
                    ExpBkPlanId = '';
                    //RateCodeLoadfn();
                    //ExpBkRateCodeWindowLoad();
                    var To_Dt = $$("DepatureBK").getText();
                    var Arr_Dt = $$("ArrivalBK").getText();
                    var CurrencyId = CURRENCY;
                    var sRmTy = $$("RoomTypeBK").getValue();


                    if (sRmTy == "") {
                        webix.message({ type: 'warning', text: "Room Type cannot be empty" });
                        return false;
                    }

                    if (Arr_Dt == "") {
                        webix.message({ type: 'warning', text: "Arrival Date cannot be empty" });
                        return false;
                    }

                    if (To_Dt == "") {
                        webix.message({ type: 'warning', text: "Departure Date cannot be empty" });
                        return false;
                    }

                    RateSrchPopupLoadCom(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, BkAspxPage, sRmTy, To_Dt, CurrencyId);

                    return;
                }
            }
            if ($$("RoomTypeBK").getValue() != "") {
                if (ExpBkMode == "OPEN" && $$("ddlRmUpgrdExpBk").getValue() == "#N#") {
                    $$("ddlRmUpgrdExpBk").blockEvent();
                    fnLoadUpgradeRmTyExpBk();
                    $$("ddlRmUpgrdExpBk").setValue(OldVal);
                    $$("ddlRmUpgrdExpBk").unblockEvent();
                }
                $$("ddlUpgrdReasTypePop1").setValue('');
                $$("chkTarChange").setValue('0');
                $$("chkTarRetOld").setValue('0');
                $$("ExpBkchkChangeRoomType").setValue('0')
                $$("txtUpgrdToPop").setValue($$("RoomTypeBK").getText());
                $$("txtUpgrdFromPop").setValue($$("ddlRmUpgrdExpBk").getText());
                if (ExpBkRmUpgrdTy != "") {
                    $$("ddlUpgrdReasTypePop1").setValue(ExpBkRmUpgrdTy);
                    $$("txtUpgrdReasPop1").setValue(ExpBkRmUpgrdReas)
                }
                else {
                    $$("ddlUpgrdReasTypePop1").setValue(ExpBkDefRmUpgrdTy);
                }
                ExpBkfrmUpgradeChange = "R";
                $$("ExpBkchkChangeRoomType").show();
                $$("btnCloseTarChange").hide();                
                $$("ExpBkTarChangPop").show();
                ExpBkPrevUpgrd = $$("ddlRmUpgrdExpBk").getValue();                
            }
        }
        else {

            $$("RateCodeBK").setValue('');
            $$("RateCodeidBK").setValue('');
            $$("PlanBK").setValue('');
            //$("#PlanID").val('');
            ExpBkPlanId = '';
            $$("RoomNOBK").setValue('');
            $$("TariffBK").setValue("0.00");
            $$("DiscBK").blockEvent();
            $$("AmountBK").blockEvent();
            $$("DiscDetBK_Btn").hide();
            $$("DiscBK").setValue('');
            $$("AmountBK").setValue('');
            $$("DiscBK").unblockEvent();
            $$("AmountBK").unblockEvent();
            $$("ddlDiscTypeResPop").blockEvent();
            $$("ddlDiscTypeResPop").setValue('');
            $$("ddlDiscTypeResPop").unblockEvent();
            $$("txtComplNarrPop").setValue('');

            if (ExpBkNew_Packg_Appl == "1" && ExpBkS14IND == "0") {
                if (ExpBkAdrsPK.length > 0) {
                    ExpBkAdrsPK = [];
                    if (ExpBkbPckgChg1 == true) ExpBkbPckgChg = true;
                    else ExpBkbPckgChg = false;
                    webix.html.removeCss($$("btnPkgExpBk").getNode(), "BtnClr");
                    $$("btnPkgExpBk").refresh();
                }
            }

            $$("DiscDetBK_Btn").hide();

            $$("PlanAmtBK").setValue('');
            $$("PlanChild1Bk").setValue('');
            $$("PlanChild2Bk").setValue('');
            $$("PlanChild3Bk").setValue('');
            $$("PlanBK").setValue('');
            ExpBkPlanId = '';
            fnLoadUpgradeRmTyExpBk();
            ExpBkAdrsTariff = [];
            if (ExpBkModify_Tariff == "1") {
                fnClearTariffData();
            }

        }
    }
    else {
        $$("RateCodeBK").blockEvent();
        $$("RateCodeidBK").blockEvent();
        $$("RateCodeBK").setValue('');
        $$("RateCodeidBK").setValue('');
        $$("PlanBK").setValue('');
        $$("RateCodeBK").unblockEvent();
        $$("RateCodeidBK").unblockEvent();
        //$("#PlanID").val('');
        ExpBkPlanId = '';
        $$("RoomNOBK").setValue('');
        $$("TariffBK").setValue("0.00");
        $$("DiscBK").blockEvent();
        $$("AmountBK").blockEvent();
        $$("DiscDetBK_Btn").hide();
        $$("DiscBK").setValue('');
        $$("AmountBK").setValue('');
        $$("DiscBK").unblockEvent();
        $$("AmountBK").unblockEvent();
        $$("ddlDiscTypeResPop").blockEvent();
        $$("ddlDiscTypeResPop").setValue('');
        $$("ddlDiscTypeResPop").unblockEvent();
        $$("txtComplNarrPop").setValue('');

        if (ExpBkNew_Packg_Appl == "1" && ExpBkS14IND == "0") {
            if (ExpBkAdrsPK.length > 0) {
                ExpBkAdrsPK = [];
                if (ExpBkbPckgChg1 == true) ExpBkbPckgChg = true;
                else ExpBkbPckgChg = false;
                webix.html.removeCss($$("btnPkgExpBk").getNode(), "BtnClr");
                $$("btnPkgExpBk").refresh();
            }
        }

        $$("DiscDetBK_Btn").hide();

        $$("PlanAmtBK").setValue('');
        $$("PlanChild1Bk").setValue('');
        $$("PlanChild2Bk").setValue('');
        $$("PlanChild3Bk").setValue('');
        $$("PlanBK").setValue('');
        ExpBkPlanId = '';
        fnLoadUpgradeRmTyExpBk();
        ExpBkAdrsTariff = [];
        if (ExpBkModify_Tariff == "1") {
            fnClearTariffData();
        }


    }
};

function fnLoadTarChangWindow(){
    webix.ui({
        view: "window",
        id: "ExpBkTarChangPop",
        width: 450,
        position: "center",
        css: "WebIxStyle",
        move: true,
        modal: true,
        head:"Room Upgrade Alert",
        close:false,
        body: {
            rows: [
                {
                    width: 450,
                    rows: [ 
                        
                        { view: "text", id: "txtUpgrdToPop", label: "Upgrade To", labelWidth: 120, readonly:true,inputWidth:350 },
                        { view: "text", id: "txtUpgrdFromPop", label: "Upgrade From", labelWidth: 120, readonly:true,inputWidth:350 },
                        {view:"label"},                        
                        {
                            view: "richselect", id: "ddlUpgrdReasTypePop1", label: "Upgrade Type", labelWidth: 120, required: true,inputWidth:350,
                            on: {
                                onChange: function (NewVal,OldVal) {
                                    $$("txtUpgrdReasPop1").setValue($$("ddlUpgrdReasTypePop1").getText());                                
                                }
                            }
                        },
                        { view: "text", id: "txtUpgrdReasPop1", label: "Upgrade Reason", labelWidth: 120, attributes: { maxlength: 20 }, required: true,inputWidth:350, },

                        {
                            view: "checkbox", id: "chkTarRetOld", width: 240, labelWidth: 170, label: "Upgrade & Retain Tariff", css: { "text-align": "center !important;" }, customCheckbox: false,
                            click: function() {
                                if($$("chkTarRetOld").getValue()=="1"){
                                    if ($$("ddlUpgrdReasTypePop1").getValue() == "") {
                                        webix.message({ type: 'warning', text: "Upgrade Type cannot be empty" });
                                        webix.UIManager.setFocus($$("ddlUpgrdReasTypePop1"))
                                        $$("chkTarRetOld").blockEvent();
                                        $$("chkTarRetOld").setValue()=="0"
                                        $$("chkTarRetOld").unblockEvent();
                                        return false;
                                    }

                                    if (fnSqlInjectExpBk($$("txtUpgrdReasPop1").getValue().toString().trim(),ExpBkSTR_SANITIZE_IND) == "") {
                                        webix.message({ type: 'warning', text: "Upgrade Reason cannot be empty" });
                                        webix.UIManager.setFocus($$("txtUpgrdReasPop1"));
                                        $$("chkTarRetOld").blockEvent();
                                        $$("chkTarRetOld").setValue()=="0"
                                        $$("chkTarRetOld").unblockEvent();
                                        return false;
                                    }                                    
                                    //RateCodeTariffloadfn();
                                    if (ExpBkModify_Tariff == "1") {
                                        if (ExpBkAdrsTariff.length > 0) {                                                    
                                            fnExBkTariffShow("1");
                                        }
                                    }
                                    if(ExpBkNew_Packg_Appl == "1"){                                                
                                        ExpBkAdrsPK = [];
                                        fnLoadPackageDefault();
                                    }  
                                    
                                    ExpBkRmUpgrdTy = $$("ddlUpgrdReasTypePop1").getValue();
                                    ExpBkRmUpgrdReas = $$("txtUpgrdReasPop1").getValue();

                                    

                                    if (ExpBkfrmUpgradeChange == "R") {
                                        if($$("ddlRmUpgrdExpBk").getValue().toString().trim() == $$("RoomTypeBK").getValue().toString().trim()) fnLoadUpgradeRmTyExpBk();
                                    }

                                    if ($$("ddlRmUpgrdExpBk").getValue() != "#N#" && $$("ddlRmUpgrdExpBk").getValue() != "") $$("btnUpgrdTyEdExpBk").show();

                                    $$("ExpBkTarChangPop").hide();
                                }
                               
                            }
                        },
                        {
                            view: "checkbox", id: "chkTarChange", width: 240, labelWidth: 170, label: "Upgrade & Change Tariff", css: { "text-align": "center !important;" }, customCheckbox: false, 
                            click: function() {
                                if($$("chkTarChange").getValue()=="1") {
                                    if ($$("ddlUpgrdReasTypePop1").getValue() == "") {
                                        webix.message({ type: 'warning', text: "Upgrade Type cannot be empty" });
                                        webix.UIManager.setFocus($$("ddlUpgrdReasTypePop1"));
                                        $$("chkTarChange").blockEvent();
                                        $$("chkTarChange").setValue()=="0"
                                        $$("chkTarChange").unblockEvent();
                                        return false;
                                    }

                                    if ($$("txtUpgrdReasPop1").getValue() == "") {
                                        webix.message({ type: 'warning', text: "Upgrade Reason cannot be empty" });
                                        webix.UIManager.setFocus($$("txtUpgrdReasPop1"));
                                        $$("chkTarChange").blockEvent();
                                        $$("chkTarChange").setValue()=="0"
                                        $$("chkTarChange").unblockEvent();
                                        return false;
                                    }

                                    ExpBkRmUpgrdTy = $$("ddlUpgrdReasTypePop1").getValue();
                                    ExpBkRmUpgrdReas = $$("txtUpgrdReasPop1").getValue();
                                    
                                    RateCodeTariffloadfn();
                                    ExpBkAdrsTariff = [];
                                    ExpBkAdrsPK = [];
                                    fnClearTariffData();
                                    if (ExpBkModify_Tariff == "1") {
                                        fnExBkTariffShow("1");
                                    }
                                    if(ExpBkNew_Packg_Appl == "1"){
                                        fnLoadPackageDefault();        
                                    }                                    
                                    if (ExpBkfrmUpgradeChange == "R") {
                                        if ($$("ddlRmUpgrdExpBk").getValue().toString().trim() == $$("RoomTypeBK").getValue().toString().trim()) fnLoadUpgradeRmTyExpBk();
                                    }
                                    if ($$("ddlRmUpgrdExpBk").getValue() != "#N#" && $$("ddlRmUpgrdExpBk").getValue() != "") $$("btnUpgrdTyEdExpBk").show();

                                    $$("ExpBkTarChangPop").hide();
                                }
                            }
                        },

                        {
                            view: "checkbox", id: "ExpBkchkChangeRoomType", width: 240, labelWidth: 170, label: "Change Room Type", css: { "text-align": "center !important;" }, customCheckbox: false,
                            click: function () {
                                if ($$("ExpBkchkChangeRoomType").getValue() == "1") {
                                    $$("RateCodeBK").blockEvent();
                                    $$("RateCodeidBK").blockEvent();
                                    $$("RateCodeBK").setValue('');
                                    $$("RateCodeidBK").setValue('');
                                    $$("PlanBK").setValue('');
                                    $$("RateCodeBK").unblockEvent();
                                    $$("RateCodeidBK").unblockEvent();
                                    //$("#PlanID").val('');
                                    ExpBkPlanId = '';
                                    $$("RoomNOBK").setValue('');
                                    $$("TariffBK").setValue("0.00");
                                    $$("DiscBK").blockEvent();
                                    $$("AmountBK").blockEvent();
                                    $$("DiscDetBK_Btn").hide();
                                    $$("DiscBK").setValue('');
                                    $$("AmountBK").setValue('');
                                    $$("DiscBK").unblockEvent();
                                    $$("AmountBK").unblockEvent();
                                    $$("ddlDiscTypeResPop").blockEvent();
                                    $$("ddlDiscTypeResPop").setValue('');
                                    $$("ddlDiscTypeResPop").unblockEvent();
                                    $$("txtComplNarrPop").setValue('');
                                    fnLoadUpgradeRmTyExpBk();
                                    ExpBkAdrsTariff = [];
                                    if (ExpBkModify_Tariff == "1") {
                                        fnClearTariffData();
                                    }
                                    $$("ExpBkTarChangPop").hide();
                                }
                            }
                        },

                        {
                            margin: 10,
                            padding: { top: 5, bottom: 5, right: 5 },
                            cols: [                                
                                {
                                    view: "button",
                                    id:"btnCloseTarChange",
                                    type: "icon",
                                    icon:"wxi-close",
                                    label: "Close",
                                    inputWidth: 80,                                    
                                    click: function () {                                       
                                        $$("ddlRmUpgrdExpBk").setValue(ExpBkPrevUpgrd);
                                        $$("ExpBkTarChangPop").hide();
                                    },
                                    align: "right"
                                }
                            ]
                        }

                    ]
                },

            ],
        }
    });
};

function fnbtnUpgrdDetClick(){
    $$("ddlUpgrdReasTypePop").setValue(ExpBkRmUpgrdTy);
    $$("txtUpgrdReasPop").setValue(ExpBkRmUpgrdReas);

    $$("UpdrdDetResPop").show();

};

function fnUpgrRmTyReasPopWindowLoad() {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "UpdrdDetResPop",
        head: "Upgrade Reason ",
        position: "center",
        css: "WebIxStyle",
        height: 200,
        width: 380,
        move: true,
        body: {
            padding: { top: 10, left: 10, bottom: 20, right: 10 },
            rows: [
                    {
                        view: "richselect", id: "ddlUpgrdReasTypePop", label: "Upgrade Type", labelWidth: 120, required: true,
                        on: {
                            onChange: function (NewVal,OldVal) {
                                $$("txtUpgrdReasPop").setValue($$("ddlUpgrdReasTypePop").getText());                                
                            }
                        }
                    },
                    { view: "textarea", id: "txtUpgrdReasPop", label: "Upgrade Reason", labelWidth: 120, attributes: { maxlength: 20 }, required: true, },
                    {
                        cols: [{}, {
                            view: "button", type: "icon", id: "OkUpgdResPop", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80,
                            click: function () {
                                if ($$("ddlUpgrdReasTypePop").getValue() == "") {
                                    webix.message({ type: 'warning', text: "Upgrade Type cannot be empty" });
                                    webix.UIManager.setFocus($$("ddlUpgrdReasTypePop"))
                                    return false;
                                }

                                if (fnSqlInjectExpBk($$("txtUpgrdReasPop").getValue().toString().trim(),ExpBkSTR_SANITIZE_IND) == "") {
                                    webix.message({ type: 'warning', text: "Upgrade Reason cannot be empty" });
                                    webix.UIManager.setFocus($$("txtUpgrdReasPop"))
                                    return false;
                                }

                                ExpBkRmUpgrdTy = $$("ddlUpgrdReasTypePop").getValue();
                                ExpBkRmUpgrdReas = $$("txtUpgrdReasPop").getValue();

                                $$("UpdrdDetResPop").hide();
                            }
                        }],
                    }
            ]
        }
    });
};

function fnGetUpdgrdTy() {
    //
    var rowDatad = [];

    Request = {
        REQTYPE: "GET_FNUPGRDTY",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        PROPID: ExpBkCompId,
        RMT_TY: ExpBkRmtTy,
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {

                rowDatad = JSON.parse(data);

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);

    return rowDatad;
};

function fnLoadCompDet(CompId) {
   // 
    var rowDatad = [];
    Request = {
        REQTYPE: "GET_FNLOADCOMPANYDETAILS",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        PROPID: ExpBkCompId,
        RMT_TY: ExpBkRmtTy,
        PARTY_ID: CompId,
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {

                rowDatad = JSON.parse(data);

                if (rowDatad.length > 0) {

                    if (rowDatad[0].GT_ID != null && rowDatad[0].GT_ID != "") $$("ddlGuestTyBk").setValue($.trim(rowDatad[0].GT_ID));

                }

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);

    
};

function fnExpBkNewGstVisbleOrNot() {
    if ($$("NGCreatPop")) {
        if ($$("NGCreatPop").isVisible() == true) return true;
    }
    if ($$("NGGstMobEmlResPop")) {
        if ($$("NGGstMobEmlResPop").isVisible() == true) return true;
    }
    return false;
};


function PostBookingCreationFn(ModeTy) {
    var rowDatad = [];
    var Params = {};
    
    //
    var P11_Ind = "0";
    var VV_Ind = "0";
    //var GuestId = $$("GuestId").getValue() == null ? "" : $$("GuestId").getValue();

   

    if ($("#P11_IND").val()) P11_Ind = $("#P11_IND").val();
    if ($("#VV_IND").val()) VV_Ind = $("#VV_IND").val();

    var CURRENCY = $$("BKCURRENCY_ID").getValue();
    if (CURRENCY == null || CURRENCY == "") CURRENCY = ExpBkBasCurrId;

    var PlanId = "";
    var PlanAmount = "0";
    var PlanChild1 = "0";
    var PlanChild2 = "0";
    var PlanChild3 = "0";
    var GuestTypeId = "";
    var GuestTypeReason = "";

    var vChild = 0;
    var vChild2 = 0;
    var vChild3 = 0;
    var vAdult = 0;
    var vInfant = 0;
    if ($$("ChildBK").getValue() != null && $$("ChildBK").getValue() != "") vChild = $$("ChildBK").getValue();
    if ($$("ChildBK2").getValue() != null && $$("ChildBK2").getValue() != "") vChild2 = $$("ChildBK2").getValue();
    if ($$("ChildBK3").getValue() != null && $$("ChildBK3").getValue() != "") vChild3 = $$("ChildBK3").getValue();
    if ($$("AdultBK").getValue() != null && $$("AdultBK").getValue() != "") vAdult = $$("AdultBK").getValue();
    if ($$("InfantBK").getValue() != null && $$("InfantBK").getValue() != "") vInfant = $$("InfantBK").getValue();
   
    BkSucessRet = [];
    //alert(P11_Ind);
    Params["REQTYPE"] = "PostBookingCreation";    
    Params["COMPID"] = ExpBkCompId;
    Params["USERID"] = ExpBkUserId;
    Params["USRID"] = ExpBkUserId;
    Params["CONSTRING"] = ExpBkConnStr;
    Params["CONN_STRING"] = ExpBkConnStr;
    Params["PROPID"] = ExpBkCompId;
    Params["RMT_TY"] = ExpBkRmtTy;
    Params["ModeTy"] = ModeTy;
    Params["O_NM"] = ExpBkONM;    
    Params["RoomTy"] = $$("RoomTypeBK").getValue();
    Params["RoomTyNM"] = $$("RoomTypeBK").getText();
    Params["RateCode"] = $$("RateCodeidBK").getValue();
    Params["RateCodeNM"] = $$("RateCodeBK").getValue();
    Params["Company"] = $$("CompanyidBK").getValue();
    Params["CompanyNM"] = $$("CompanyBK").getValue();
    //Params["LastNM"] = $$("LastNMBK").getValue() == null?"" : $$("LastNMBK").getValue();
    //Params["FirstNM"] =  $$("FirstNMBK").getValue()==null?"": $$("FirstNMBK").getValue();
    //Params["TitleBK"] = $$("TitleBK").getValue();
    //Params["TitleNm"] = $$("TitleBK").getText();
    Params["RoomNO"] = $$("RoomNOBK").getValue();
    //Params["GUESTID"] = GuestId;
    Params["CURRENCY"] = CURRENCY;
    Params["BASE_CURRENCY"] = ExpBkBasCurrId;
    Params["LST_UPDATE_DT"] = ExpBkLastUpdateDt;

    var sRateCat = "";
    if (ExpBkRateType.length > 0) {
        var newData = ExpBkRateType.filter(function (el) {
            return el.RATE_TY_ID == $$("RateCodeidBK").getValue();
        });
        if (newData.length > 0) sRateCat = newData[0].RATE_CAT;
    }

    var str1 = $$("HHMMBK1").getValue();
    var CancRes = $$("txtCancReasResPop").getValue();
    var CancRqBy = $$("txtCancRqByResPop").getValue();
    if (ModeTy == "CANCEL") {
        Params["CANC_RES"] = CancRes;
        Params["CANC_REQ_BY"] = CancRqBy;
    }
    else {
        Params["CANC_RES"] = "";
        Params["CANC_REQ_BY"] = "";
    }    
    //if (ExpBkTY != "3" && ExpBkTY != "4" && ExpBkTY != "5" ) {
    //    if ($$("RoomNOBK").getValue() == "") {
    //        var Params1 = {};
    //        webix.UIManager.setFocus($$("RoomNOBK"));
    //        Params1["MsgTXT"] = 'Room No cannot be empty.';
    //        return Params1;
    //    }   
    //}    
    if ($$("NoOfRoomsBK").getValue() == "" || $$("NoOfRoomsBK").getValue() == "0") {
        var Params1 = {};
        webix.UIManager.setFocus($$("NoOfRoomsBK"));
        Params1["MsgTXT"] = 'Room cannot be empty.';
        return Params1;
    }    
    
    if (vAdult == 0 && vChild == 0 && vChild2 == 0 && vChild3 == 0) {
        var Params1 = {};
        webix.UIManager.setFocus($$("AdultBK"));
        Params1["MsgTXT"] = "Adult cannot be empty.";
        return Params1;
    }

    var GstData = $$("gridGstExpBk").serialize();
    if (GstData.length == 0) {        
        var Params1 = {};
        Params1["MsgTXT"] = 'Guest Details cannot be empty.';
        return Params1;
    }

    
    
    $.each(GstData, function (key, sVal) {
        //
        $.each(sVal, function (key, value) {
            //
            if (value != null && value != undefined) sVal[key] = value.toString();
            else sVal[key] = "";
        });
    });

    var Params1 = {};
    var bVal = "0";
    $.each(GstData, function (key, sVal) {
        //
        var LstNm1 = sVal["LAST_NM"] == null ? "" : sVal["LAST_NM"].toString().trim();
        var FstNm1 = sVal["FIRST_NM"] == null ? "" : sVal["FIRST_NM"].toString().trim();
        var GstId1 = sVal["GUEST_ID"] == null ? "" : sVal["GUEST_ID"].toString().trim();
        var Tit1 = sVal["TITTLE"] == null ? "" : sVal["TITTLE"].toString().trim();
        var TitNm1 = "";
        var iRow = sVal.id;
        var newData = ExpBkTitle.filter(function (el) {
            return el.id == Tit1;
        });
        if (newData.length > 0) {
            TitNm1 = newData[0].value;
        }
        if (LstNm1 != "" && GstId1 == "") {
            $$("gridGstExpBk").select(iRow, "LAST_NM");
            webix.UIManager.setFocus($$("gridGstExpBk"));
            Params1["MsgTXT"] = 'Create Guest Profile';
            if (fnExpBkNewGstVisbleOrNot()==false) {
                fnNewGstCreatePopLoad(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, BkAspxPage, LstNm1, FstNm1, Tit1, TitNm1);
            }
            bVal = "1";
            return false;
        }

        if (LstNm1 == "" && FstNm1 != "") {
            $$("gridGstExpBk").select(iRow, "LAST_NM");
            webix.UIManager.setFocus($$("gridGstExpBk"));
            Params1["MsgTXT"] = 'Last Name cannot be empty.';
            bVal = "1";
            return false;
        }

        if (LstNm1 != "" && Tit1 == "") {
            $$("gridGstExpBk").select(iRow, "TITTLE");
            webix.UIManager.setFocus($$("gridGstExpBk"));
            Params1["MsgTXT"] = 'Title cannot be empty.';
            bVal = "1";
            return false;
        }
    });
    if (bVal == "1") return Params1;

    var GuestId = GstData[0].GUEST_ID == null ? "" : GstData[0].GUEST_ID.toString().trim();
    var LastNm = GstData[0].LAST_NM == null ? "" : GstData[0].LAST_NM.toString().trim();
    var FirstNm = GstData[0].FIRST_NM == null ? "" : GstData[0].FIRST_NM.toString().trim();
    var Tittle = GstData[0].TITTLE == null ? "" : GstData[0].TITTLE.toString().trim();


    //if ($$("LastNMBK").getValue() == "" && $$("FirstNMBK").getValue() == "" && $$("TitleBK").getValue() == "") {
    //    var Params1 = {};
    //    Params1["MsgTXT"] = 'Name is empty....';
    //    return Params1;
    //}
    var gridFirstId = $$("gridGstExpBk").getFirstId();    
    if (Tittle == "") {
        var Params1 = {};
        $$("gridGstExpBk").select(gridFirstId, "TITTLE");
        webix.UIManager.setFocus($$("gridGstExpBk"));
        var Params1 = {};
        Params1["MsgTXT"] = 'Title cannot be empty.';        
        return Params1;
    }
    if (fnSqlInjectExpBk(LastNm.toString().trim(), ExpBkSTR_SANITIZE_IND) == "") {
        var Params1 = {};
        $$("gridGstExpBk").select(gridFirstId, "LAST_NM");
        webix.UIManager.setFocus($$("gridGstExpBk"));
        Params1["MsgTXT"] = 'Last Name cannot be empty.';        
        return Params1;
    }
    var TittleNm = "";
    var newData = ExpBkTitle.filter(function (el) {
        return el.id == Tittle;
    });
    if (newData.length > 0) {
        TittleNm = newData[0].value;
    }

    if (GuestId == "") {
        var Params1 = {};
        $$("gridGstExpBk").select(gridFirstId, "LAST_NM");
        webix.UIManager.setFocus($$("gridGstExpBk"));
        Params1["MsgTXT"] = 'Create Guest Profile';
        //fnShowDupGst();
        if (fnExpBkNewGstVisbleOrNot() == false) {
            fnNewGstCreatePopLoad(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, BkAspxPage, LastNm, FirstNm, Tittle, TittleNm);
        }
        return Params1;
    }   

    Params["LastNM"] = LastNm ;
    Params["FirstNM"] = FirstNm;
    Params["TitleBK"] = Tittle;
    Params["TitleNm"] = TittleNm;
    Params["GUESTID"] = GuestId;
    Params["GstList"] = GstData;
    Params["Itin_No"] = ExpBk_ITINO;

    if (ExpBkTY == "5") {        
        Params["Itin_Appl"] = "1";
    }
    else {        
        Params["Itin_Appl"] = "0";
    }   

    if (VV_Ind == "1") {
        if ($$("CompanyBK").getValue() == "") {
            var Params1 = {};
            Params1["MsgTXT"] = 'Company cannot be empty.';
            webix.UIManager.setFocus("CompanyBK_Btn");
            return Params1;
        }
    }

    if (ExpBkGuest_Ty_Ind == "1") {
        if ($$("ddlGuestTyBk").getValue() == "") {
            var Params1 = {};
            Params1["MsgTXT"] = 'Guest Type cannot be empty.';
            webix.UIManager.setFocus("ddlGuestTyBk");
            return Params1;
        }
    }

    if (ExpBkMarket_Mand_Ind == "1") {
        if ($$("ddlSegmentExpBk").getValue() == "") {
            var Params1 = {};
            Params1["MsgTXT"] = 'Segment cannot be empty.';
            webix.UIManager.setFocus("ddlSegmentExpBk");
            return Params1;
        }
    }

    if ($$("RateCodeBK").getValue() == "") {
        var Params1 = {};
        Params1["MsgTXT"] = 'Ratecode cannot be empty.';
        webix.UIManager.setFocus("RateCodeBK");
        return Params1;
    }
    if (str1 == null || str1 == "") {
        var Params1 = {};
        Params1["MsgTXT"] = "Arrival Time cannot be empty. ";
        webix.UIManager.setFocus("HHMMBK1");
        return Params1;
    }

    if (str1.length < 4) {
        var Params1 = {};
        Params1["MsgTXT"] = 'Arrival Time is invalid format.';
        webix.UIManager.setFocus("HHMMBK1");
        return Params1;
    }

    var res11 = str1.substr(0, 2);
    var res12 = str1.substr(2, 2);
    var ArrTm = res11 + ':' + res12;
    var valid = (ArrTm.search(/^\d{2}:\d{2}$/) != -1) &&
            (ArrTm.substr(0, 2) >= 0 && ArrTm.substr(0, 2) <= 23) &&
            (ArrTm.substr(3, 2) >= 0 && ArrTm.substr(3, 2) <= 59) ;

    if (valid == false) {
        var Params1 = {};
        Params1["MsgTXT"] = 'Arrival Time is invalid format.';
        webix.UIManager.setFocus("HHMMBK1");
        return Params1;
    }    
    Params["ArrivalTime"] = ArrTm;

    var str2 = $$("HHMMBK2").getValue();
    if (str2 == null || str2 == "") {
        var Params1 = {};
        Params1["MsgTXT"] = "Departure Time cannot be empty. ";
        webix.UIManager.setFocus("HHMMBK2");
        return Params1;
    }    
    if (str2.length < 4) {
        var Params1 = {};
        Params1["MsgTXT"] = "Departure Time is invalid format.";
        webix.UIManager.setFocus("HHMMBK2");
        return Params1;
    }
    var res21 = str2.substr(0, 2);
    var res22 = str2.substr(2, 2);
    var DepTm = res21 + ':' + res22

    var valid = (DepTm.search(/^\d{2}:\d{2}$/) != -1) &&
            (DepTm.substr(0, 2) >= 0 && DepTm.substr(0, 2) <= 23) &&
            (DepTm.substr(3, 2) >= 0 && DepTm.substr(3, 2) <= 59) ;

    if (valid == false) {
        var Params1 = {};
        Params1["MsgTXT"] = 'Departure Time is invalid format.';        
        webix.UIManager.setFocus("HHMMBK2");
        return Params1;
    }
    var vRComp = $$("CompanyBK").getValue();

    var dtSplit = webix.copy(Spilt_data);
    var dtRout = webix.copy(Routing_data);

    Params["bRoutModify"] = bRoutModifyTc;

    if (dtSplit.length > 0 || dtRout.length > 0) {
        if (dtSplit != null) {
            if (dtSplit.length > 0) {
                var rowDatad1 = [];
                rowDatad1 = $.grep(dtSplit, function (element, index) {
                    return $.trim(element.Bill_Name) == "";
                });

                if (rowDatad1.length > 0) {
                    var Params1 = {};
                    //webix.message({ type: 'warning', text: "Bill Name cannot be empty" });
                    Params1["MsgTXT"] = "Bill Name cannot be empty";
                    return Params1;
                }

                //var rowDatad1 = [];
                //rowDatad1 = $.grep(dtSplit, function (element, index) {
                //    return $.trim(element.Type) == "T" && $.trim(element.Bill_Name) != $.trim(RoutTrv);
                //});

                //if (rowDatad1.length > 0) {
                //    var Params1 = {};
                //    Params1["MsgTXT"] = "Agent cannot be different";
                //    return Params1;
                //}

                var rowDatad1 = [];
                rowDatad1 = $.grep(dtSplit, function (element, index) {
                    return $.trim(element.Type) == "C" && $.trim(element.Bill_Name) != $.trim(vRComp);
                });

                if (rowDatad1.length > 0) {
                    var Params1 = {};
                    //webix.message({ type: 'warning', text: "Agent cannot be different" });
                    Params1["MsgTXT"] = "Company cannot be different";
                    return Params1;
                }

            }
        }
    }


    if (Routing_data.length > 0) {
        $.each(Routing_data, function (key, sVal) {
            //
            $.each(sVal, function (key, value) {
                //
                if (value != null && value != undefined) sVal[key] = value.toString();
                else sVal[key] = "";
            });
        });
    }

    if (Spilt_data.length > 0) {
        $.each(Spilt_data, function (key, sVal) {
            //
            $.each(sVal, function (key, value) {
                //
                if (value != null && value != undefined) sVal[key] = value.toString();
                else sVal[key] = "";
            });
        });
    }

    ExpBkOtherPopShow();
    if (ExpBkOtherbtnOkClick() == false) {
        var Params1 = {};
        Params1["MsgTXT"] = "#7#";
        return Params1;
    }

    var ResMode = $$("ExpBkResMode").getValue();
    var GstStatus = $$("ExpBkGstStatus").getValue();
    var Channel = $$("ExpBkChannel").getValue();
    var PayMode = $$("ExpBkPayMode").getValue();
    var BillIns = $$("ExpBkBillIns").getValue();
    var VisitPurp = $$("ExpBkVisitPurp").getValue();    
    var VouchRef = $$("VouchNoBk").getValue();
    var Refer = $$("ReferenceBk").getValue();    
    var ResIns = $$("ReserveInsBK").getValue();    
    var CheckInIns = $$("CheckInInsBK").getValue();
    var CheckOutIns = $$("CheckOutInsBK").getValue();
    var PosIns = $$("PosInsBK").getValue();
    var Booker = $$("ExpBkBookerId").getValue();
    var Source = $$("ExpBkSourceId").getValue();

    
    

    Params["ResMode"] = ResMode;
    Params["GstStatus"] = GstStatus;
    Params["Channel"] = Channel;
    Params["PayMode"] = PayMode;
    Params["BillIns"] = BillIns;
    Params["VisitPurp"] = VisitPurp;
    Params["Booker"] = Booker;
    Params["Source"] = Source;
    Params["VouchRef"] = VouchRef;
    Params["Refer"] = Refer;    
    Params["ResIns"] = ResIns;    
    Params["CheckInIns"] = CheckInIns;
    Params["CheckOutIns"] = CheckOutIns;
    Params["PosIns"] = PosIns;
   

    Params["WhichForm"] = "RESERVE";
    Params["Rout_App"] = "1";
    Params["guestNm"] = "";
    Params["GstMainId"] = GuestId;
    Params["Split"] = Spilt_data;
    Params["Route"] = Routing_data;

    Params["DepartureTime"] = DepTm;
    //Params["Mobile"] = $$("MobileBK").getValue();
    //Params["ResStatus"] = $$("StatusBK").getValue();
    Params["ResType"] = $$("StatusBK").getValue();
    //Params["EMail"] = $$("EMailBK").getValue();
    Params["Adult"] = vAdult;
    Params["Child"] = vChild;
    Params["Child2"] = vChild2;
    Params["Child3"] = vChild3;
    Params["Infant"] = vInfant;
    Params["NoOfRooms"] = $$("NoOfRoomsBK").getValue();
    Params["R_NO"] = ExpBkR_NO == null ? "" : ExpBkR_NO;
    Params["Reserve_NO"] = ExpBkRESERVE_NO==null?"":ExpBkRESERVE_NO;
    var TariffAmt = 0;
    var DiscPer = "";
    var DiscAmt = "";
    ////if ($$("DiscBK").getValue() != "" && $$("DiscBK").getValue() != "0") {
    ////    var discdt = parseInt($$("DiscBK").getValue()) / 100;
    ////    TariffAmt = parseInt($$("TariffBK").getValue()) - (parseInt($$("TariffBK").getValue()) * discdt);
    ////}
    ////else if ($$("AmountBK").getValue() != "" && $$("AmountBK").getValue() != "0") {
    ////    if (parseInt($$("AmountBK").getValue()) < parseInt($$("TariffBK").getValue())) {
    ////        TariffAmt = parseInt($$("TariffBK").getValue()) - parseInt($$("AmountBK").getValue());
    ////    }
    ////    else {
    ////        var Params1 = {};
    ////        Params1["MsgTXT"] = 'Amount is less then of Tariff';
    ////        return Params1;
    ////    }
    ////}

   

    if ($$("DiscBK").getValue() != "" && $$("DiscBK").getValue() != "0") {
        if (parseInt($$("DiscBK").getValue()) > 100) {
            var Params1 = {};
            Params1["MsgTXT"] = 'Discount % should be less then or equal to 100';
            webix.UIManager.setFocus("DiscBK");
            return Params1;
        }
    }

    if ($$("AmountBK").getValue() != "" && $$("AmountBK").getValue() != "0") {
        if (parseInt($$("AmountBK").getValue()) > parseInt($$("TariffBK").getValue())) {            
            var Params1 = {};
            Params1["MsgTXT"] = 'Discount Amount should be less then or equal to Tariff Amount';
            webix.UIManager.setFocus("AmountBK");
            return Params1;
        }
    }
    var DiscType = "";
    var DiscRs = "";
    if (($$("DiscBK").getValue() != "" && $$("DiscBK").getValue() != "0") || ($$("AmountBK").getValue() != "" && $$("AmountBK").getValue() != "0")) {
        //
        if ($$("ddlDiscTypeResPop").getValue() == "") {
            var Params1 = {};
            Params1["MsgTXT"] = "Discount Type cannot be empty";                        
            $$("DiscDetResPop").show();
            webix.UIManager.setFocus($$("ddlDiscTypeResPop"))
            return Params1;
        }

        if (fnSqlInjectExpBk($$("txtDiscReasResPop").getValue().toString().trim(),ExpBkSTR_SANITIZE_IND)  == "") {
            var Params1 = {};
            Params1["MsgTXT"] = "Discount Reason cannot be empty";                        
            $$("DiscDetResPop").show();
            webix.UIManager.setFocus($$("txtDiscReasResPop"))
            return Params1;
        }
        DiscType = $$("ddlDiscTypeResPop").getValue();
        DiscRs = $$("txtDiscReasResPop").getValue();
    }

    if ($$("ddlGuestTyBk").getValue() != null && $$("ddlGuestTyBk").getValue() != "") {
        var TARIFF_APPL_IND = 0;
        var OlDTARIFF_APPL_IND = 0;
        GuestTypeId = $$("ddlGuestTyBk").getValue();
        var vData = $$("ddlGuestTyBk").getPopup().getList().serialize();
        var newData = vData.filter(function (el) {
            return el.id == GuestTypeId;
        });
        if (newData.length > 0) TARIFF_APPL_IND = newData[0].TARIFF_APPL_IND;

        if (TARIFF_APPL_IND == "1") {            
            if ($$("txtComplNarrPop").getValue() == null || fnSqlInjectExpBk($$("txtComplNarrPop").getValue().toString().trim(),ExpBkSTR_SANITIZE_IND) == "") {
                var Params1 = {};
                Params1["MsgTXT"] = "Compliment Narration cannot be empty";
                $$("ComplNarPop").show();
                webix.UIManager.setFocus($$("txtComplNarrPop"))
                return Params1;
            }
            else {
                GuestTypeReason = $$("txtComplNarrPop").getValue();
            }
        }

    }   
    
    if(ExpBkTY == "3"){
        if($$("GroupIdBK").getValue() == ""){
            var Params1 = {};
            Params1["MsgTXT"] = "Group cannot be empty";            
            webix.UIManager.setFocus($$("GroupBK"))
            return Params1;
        }
    }   


    if ($$("TariffBK").getValue() !=undefined && $$("TariffBK").getValue() != null ) TariffAmt = $$("TariffBK").getValue();
    if ($$("DiscBK").getValue() != undefined && $$("DiscBK").getValue() != null) DiscPer = $$("DiscBK").getValue();
    if ($$("AmountBK").getValue() != undefined && $$("AmountBK").getValue() != null) DiscAmt = $$("AmountBK").getValue();

    PlanId = ExpBkPlanId; //$("#PlanID").val();

    if ($$("PlanAmtBK").getValue() != undefined && $$("PlanAmtBK").getValue() != null) PlanAmount = $$("PlanAmtBK").getValue();
    if ($$("PlanChild1Bk").getValue() != undefined && $$("PlanChild1Bk").getValue() != null) PlanChild1 = $$("PlanChild1Bk").getValue();
    if ($$("PlanChild2Bk").getValue() != undefined && $$("PlanChild2Bk").getValue() != null) PlanChild2 = $$("PlanChild2Bk").getValue();
    if ($$("PlanChild3Bk").getValue() != undefined && $$("PlanChild3Bk").getValue() != null) PlanChild3 = $$("PlanChild3Bk").getValue();

    var PlanDisc = $$("PlanDiscBK").getValue();
    var PlanDiscAmt = $$("PlanDiscAmtBK").getValue();

    var vPlanAmount = parseFloat(PlanAmount == "" ? 0 : PlanAmount);
    var vPlanChild1 = parseFloat(PlanChild1 == "" ? 0 : PlanChild1);
    var vPlanChild2 = parseFloat(PlanChild2 == "" ? 0 : PlanChild1);
    var vPlanChild3 = parseFloat(PlanChild3 == "" ? 0 : PlanChild1);
    var TotPlanAmt = vPlanAmount + vPlanChild1 + vPlanChild2 + vPlanChild3;
    var vPlanDiscAmt = parseFloat(PlanDiscAmt == "" ? 0 : PlanDiscAmt);

    if (TotPlanAmt < vPlanDiscAmt) {
        var Params1 = {};
        Params1["MsgTXT"] = "Plan Discount Amount should be less than Plan Amount";
        webix.UIManager.setFocus($$("PlanDiscAmtBK"))
        return Params1;

    }

    Params["Tariff"] = TariffAmt;
    Params["DiscPer"] = DiscPer;
    Params["DiscAmt"] = DiscAmt;
    Params["GurestReq"] = $$("GuestRequestBK").getValue() == null ? "" : $$("GuestRequestBK").getValue();
    Params["DiscTy"] = DiscType;
    Params["DiscRs"] = DiscRs;

    Params["PlanId"] = PlanId;
    Params["PlanAmount"] = PlanAmount;
    Params["PlanChild1"] = PlanChild1;
    Params["PlanChild2"] = PlanChild2;
    Params["PlanChild3"] = PlanChild3;

    Params["PlanDisc"] = PlanDisc;
    Params["PlanDiscAmt"] = PlanDiscAmt;

    Params["GuestTypeId"] = GuestTypeId;
    Params["GuestTypeReason"] = GuestTypeReason;
        
    var ArrivalBK = $$("ArrivalBK").getText();
    Params["ArrivalDate"] = ArrivalBK;

    var DepatureBK = $$("DepatureBK").getText();
    Params["DepartureDate"] = DepatureBK;

    var DueDTBK = $$("DueDTBK").getText() == null ? "" : $$("DueDTBK").getText();
    Params["DueDate"] = DueDTBK;

    var Tariff_Count = 0; 
    var vTotTPx = 0;
       
    if (ExpBkModify_Tariff == "1" && ModeTy != "CANCEL") {
        //
        var bRet = "1";
        var Params1 = {};
        vTotTPx = parseInt(vAdult) + parseInt(vChild) + parseInt(vChild2) + parseInt(vChild3);
                
        if (ExpBkR11_IND == "1") vAdult = fnCheckAdultChild(vAdult, parseInt(vChild) + parseInt(vChild2) + parseInt(vChild3));
        Tariff_Count = ExpBkfnGetNewTariffCount($.trim($$("RoomTypeBK").getValue()), $.trim(vTotTPx), $.trim(CURRENCY), $.trim($$("RateCodeidBK").getValue()), $.trim(ArrivalBK), $.trim(vAdult), ExpBkR11_IND, ExpBkD21_IND);

        if (ModeTy == "SAVE") {
            if (ExpBkAdrsTariff.length == 0) {
                if (fnExBkTariffShow("1", "1") == false) {
                    Params1["MsgTXT"] = "#7#";
                    bRet = "0";
                    return Params1;
                }
            }
        }
        else if (ModeTy == "OPEN") {
            if (ExpBkAdrsTariff.length == 0) {
                if ($$("TarEdPop")) {
                    if ($$("TarEdPop").isVisible() == true) {                        
                        Params1["MsgTXT"] = "#7#";
                        return Params1;
                    }
                }                
                fnExBkTariffShow();
                Params1["MsgTXT"] = "#7#";
                bRet = "0";
                return Params1;
            }
        }

        if (bRet == "0") return Params1;
        if (ExpBkAdrsTariff.length > 0) {
           

            var vTrADt = ExpBkAdrsTariff[0].A_DT == null ? "" : ExpBkAdrsTariff[0].A_DT;
            var vTrDDt = ExpBkAdrsTariff[0].D_DT == null ? "" : ExpBkAdrsTariff[0].D_DT;
            var vTrDDtTm = ExpBkAdrsTariff[0].D_TM == null ? "" : ExpBkAdrsTariff[0].D_TM;
            var vTrRtRy = ExpBkAdrsTariff[0].RT_T == null ? "" : ExpBkAdrsTariff[0].RT_T;            

            if ($.trim(vTrADt) != $.trim(ArrivalBK) || $.trim(vTrDDt) != $.trim(DepatureBK) || $.trim(vTrDDtTm) != $.trim(DepTm)) {
                bRet = "0";
                if ($$("TarEdPop")) {
                    if ($$("TarEdPop").isVisible() == true) {
                        Params1["MsgTXT"] = "#7#";
                        return Params1;
                    }
                }
                fnExBkTariffShow();
                Params1["MsgTXT"] = "#7#";                
                return Params1;
            }

            if ($.trim(vTrRtRy) != $.trim($$("RateCodeidBK").getValue())) {
                bRet = "0";
                if ($$("TarEdPop")) {
                    if ($$("TarEdPop").isVisible() == true) {
                        Params1["MsgTXT"] = "#7#";
                        return Params1;
                    }
                }
                ExpBkAdrsTariff = [];
                //webix.html.removeCss($$("btnTarEditExpBk").getNode(), "BtnClr");
                //$$("btnTarEditExpBk").refresh();                
                fnClearTariffData();                
                fnExBkTariffShow();
                $$("TEbtnCancel").disable();
                Params1["MsgTXT"] = "#7#";
               
                return Params1;
            }

            if (bRet == "0") return Params1;

            $.each(ExpBkAdrsTariff, function (key, value) {
                //

                var vAdl = value.ADL == null ? "" : value.ADL;
                var vCH1 = value.CHD1 == null ? "" : value.CHD1;
                var vCH2 = value.CHD2 == null ? "" : value.CHD2;
                var vCH3 = value.CHD3 == null ? "" : value.CHD3;

                if ((parseInt(vAdl == "" ? 0 : vAdl) + parseInt(vCH1 == "" ? 0 : vCH1) + parseInt(vCH2 == "" ? 0 : vCH2) + parseInt(vCH3 == "" ? 0 : vCH3)) > 0) {
                    if ((parseInt(vAdl == "" ? 0 : vAdl) + parseInt(vCH1 == "" ? 0 : vCH1) + parseInt(vCH2 == "" ? 0 : vCH2) + parseInt(vCH3 == "" ? 0 : vCH3)) < parseInt(vTotTPx)) {
                        webix.message({ type: 'warning', text: "Total Pax cannot be less than " + $.trim(vTotTPx) });
                        bRet = "0";
                        if ($$("TarEdPop")) {
                            if ($$("TarEdPop").isVisible() == true) {
                                Params1["MsgTXT"] = "#7#";
                                return false;
                            }
                        }
                        fnExBkTariffShow();
                        Params1["MsgTXT"] = "#7#";
                        return false;
                    }
                }

                if (vAdult != "" && vCH1 != "" && vCH2 != "" && vCH3 != "") {
                    if ((parseInt(vAdl == "" ? 0 : vAdl) + parseInt(vCH1 == "" ? 0 : vCH1) + parseInt(vCH2 == "" ? 0 : vCH2) + parseInt(vCH3 == "" ? 0 : vCH3)) == 0) {
                        webix.message({ type: 'warning', text: "Total Pax cannot be zero " });
                        bRet = "0";
                        if ($$("TarEdPop")) {
                            if ($$("TarEdPop").isVisible() == true) {
                                Params1["MsgTXT"] = "#7#";
                                return false;
                            }
                        }
                        fnExBkTariffShow();
                        Params1["MsgTXT"] = "#7#";
                        return false;
                    }
                }
            });
        }
        if (bRet == "0") return Params1;
    }


    if (ExpBkNew_Packg_Appl == "1" && ExpBkBIND == "1"  && ModeTy != "CANCEL") {
        //
        var bRet = "1";
        var Params1 = {};
        if (ExpBkAdrsPK.length > 0) {
            var PrvPkgId = "";
            var Cntr = 0;
            if (ExpBkF19_IND == "1") {
                $.each(ExpBkAdrsPK, function (key, SelRow) {
                    var vPkgId = SelRow.P_ID == null ? "" : SelRow.P_ID;
                    if (vPkgId != "" && vPkgId != PrvPkgId) Cntr += 1;
                    if (vPkgId != "") PrvPkgId = vPkgId;
                });
                if (Cntr > 1) {
                    webix.message({ type: 'warning', text: "Only One Package Selection is Allowed" });
                    bRet = "0";                    
                    Params1["MsgTXT"] = "#7#";
                    return Params1;
                }
            }

            $.each(ExpBkAdrsPK, function (key, SelRow) {
                //
                var CH_TY = SelRow.CH_TY == null ? "" : SelRow.CH_TY;
                var S_DT = SelRow.S_DT == null ? "" : SelRow.S_DT;
                var E_DT = SelRow.E_DT == null ? "" : SelRow.E_DT;
                var H_IND = SelRow.H_IND == null ? "" : SelRow.H_IND;
                var P_ID = SelRow.P_ID == null ? "" : SelRow.P_ID;
                var RV_ID = SelRow.RV_ID == null ? "" : SelRow.RV_ID;
                var IT_ID = SelRow.IT_ID == null ? "" : SelRow.IT_ID;
                var RV_OT = SelRow.RV_OT == null ? "" : SelRow.RV_OT;

                if (H_IND == "P") {
                    if (P_ID == "" || IT_ID == "") {
                        webix.message({ type: 'warning', text: "Package details missing. Pls reselect the package." });
                        bRet = "0";
                        Params1["MsgTXT"] = "#7#";
                        return false;
                    }                    
                }
                else if (H_IND == "R") {
                    if (RV_ID == "" || RV_OT == "") {
                        webix.message({ type: 'warning', text: "Package Revenue details missing. Pls reselect the Revenue." });
                        bRet = "0";
                        Params1["MsgTXT"] = "#7#";
                        return false;
                    }

                }

                if (CH_TY == "13") {
                    if (S_DT == "") {
                        webix.message({ type: 'warning', text: "Package Start Date cannot be empty" });
                        bRet = "0";
                        Params1["MsgTXT"] = "#7#";
                        return false;
                    }

                    if (E_DT == "") {
                        webix.message({ type: 'warning', text: "Package End Date cannot be empty" });
                        bRet = "0";
                        Params1["MsgTXT"] = "#7#";
                        return false;
                    }

                    var S_DT1 = formatDateToValExBk1(S_DT);
                    var E_DT1 = formatDateToValExBk1(E_DT);

                    if (S_DT1 > E_DT1) {
                        webix.message({ type: 'warning', text: "Package Start Date cannot be > than End Date" });
                        bRet = "0";
                        Params1["MsgTXT"] = "#7#";
                        return false;
                    }

                    var FromDt = formatDateToValExBk($$("ArrivalBK").getText());
                    var ToDt = formatDateToValExBk($$("DepatureBK").getText());
                    if (E_DT1 > ToDt || FromDt > S_DT1) {
                        webix.message({ type: 'warning', text: "Package date should between Arrival && Departure Date" });
                        bRet = "0";
                        Params1["MsgTXT"] = "#7#";
                        return false;
                    }

                }
            });
            if (bRet == "0") return Params1;           
        }      
        
    }

    if (ExpBkNew_Packg_Appl == "1"){
        Params["B_IND"] = ExpBkBIND; 
    }

    if(ExpBkUpgrade_Appl_Ind == "1" &&  $$("ddlRmUpgrdExpBk").getValue() != null && $$("ddlRmUpgrdExpBk").getValue() != "" && $$("ddlRmUpgrdExpBk").getValue() != "#N#"){
        if(ExpBkRmUpgrdTy == ""){
            webix.message({ type: 'warning', text: "Upgrade Type cannot be empty" });    
            $$("UpdrdDetResPop").show();
            Params1["MsgTXT"] = "#7#";
            return Params1;
        }

        if(fnSqlInjectExpBk(ExpBkRmUpgrdReas,ExpBkSTR_SANITIZE_IND) == ""){
            webix.message({ type: 'warning', text: "Upgrade Reason cannot be empty" });            
            Params1["MsgTXT"] = "#7#";
            $$("UpdrdDetResPop").show();
            return Params1;
        }
    }

    if(ExpBkUpgrade_Appl_Ind == "1" && $$("ddlRmUpgrdExpBk").getValue() != null && $$("ddlRmUpgrdExpBk").getValue() != "" && $$("ddlRmUpgrdExpBk").getValue() != "#N#"){
        Params["UPGRD_RMTY"] = $$("ddlRmUpgrdExpBk").getValue();
        Params["UPGRD_REAS"] = ExpBkRmUpgrdReas;
        Params["UPGRD_TY"] = ExpBkRmUpgrdTy;
    }
    else{
        Params["UPGRD_RMTY"] = "";
        Params["UPGRD_REAS"] = "";
        Params["UPGRD_TY"] = "";
    }
    Params["MARK_CODE"] = $$("ddlSegmentExpBk").getValue();

    Params["TRV_AGNT_ID"] = $$("TRVAGNTIDBK").getValue();

    Params["GROUP_ID"] = $$("GroupIdBK").getValue();

    Params["BUS_SOURCE_ID"] = $$("BUSSOURCEIDBK").getValue();

    var vChkLeader = "0";

    if ($$("GroupIdBK").getValue() != "") {
        vChkLeader = $$("chkLeaderExpBk").getValue();
    }

    Params["GROUP_LEADER_IND"] = vChkLeader;


    if (ExpBk_Auto_Chrg_Appl == "1" && FAC_Auto_Chrg_Modify == "1" && ModeTy != "CANCEL") {
        if (FAC_auto_grid_data.length > 0) {

            $.each(FAC_auto_grid_data, function (key, sVal) {
                //
                $.each(sVal, function (key, value) {
                    //
                    if (value != null && value != undefined) sVal[key] = value.toString();
                    else sVal[key] = "";
                });
            });

            var ass = "1";
            for (i = 0; i < FAC_auto_grid_data.length; i++) {
                if (FAC_auto_grid_data[i].C_A == "" || FAC_auto_grid_data[i].C_A == undefined || FAC_auto_grid_data[i].C_A == null || FAC_auto_grid_data[i].C_A == "0") {
                    ass = 0;
                    webix.message({ type: 'warning', text: "Charge Amount Cannot be Empty" });
                    webix.UIManager.setFocus($$("FAC_AutoGrid"));                    
                    break;
                }
                if (FAC_auto_grid_data[i].C_ID == "" || FAC_auto_grid_data[i].C_ID == undefined || FAC_auto_grid_data[i].C_ID == null) {
                    ass = 0;
                    webix.message({ type: 'warning', text: "Currency Cannot be Empty" });
                    webix.UIManager.setFocus($$("FAC_AutoGrid"));                    
                    break;
                }
                if (FAC_auto_grid_data[i].R_I == "" || FAC_auto_grid_data[i].R_I == undefined || FAC_auto_grid_data[i].R_I == null) {
                    ass = 0;
                    webix.message({ type: 'warning', text: "Revenue Cannot be Empty" });
                    webix.UIManager.setFocus($$("FAC_AutoGrid"));                    
                    break;
                }
                if (FAC_auto_grid_data[i].A_IND == "" || FAC_auto_grid_data[i].A_IND == undefined || FAC_auto_grid_data[i].A_IND == null || FAC_auto_grid_data[i].A_IND == "0") {
                    ass = 0;
                    webix.message({ type: 'warning', text: "Units Cannot be Empty" });
                    webix.UIManager.setFocus($$("FAC_AutoGrid"));                    
                    break;
                }
                if (FAC_auto_grid_data[i].S_IND == "2") {
                    st_dt = (FAC_auto_grid_data[i].S_DT1).split(' ')[0].split('-');
                    end_dt = FAC_auto_grid_data[i].E_DT1.split(' ')[0].split('-');
                    st_dt = new Date(parseInt(st_dt[0]), parseInt(st_dt[1]) - 1, parseInt(st_dt[2]));
                    end_dt = new Date(parseInt(end_dt[0]), parseInt(end_dt[1]) - 1, parseInt(end_dt[2]));

                    Arr_Dt = FACArrDt.split('/');
                    Dep_Dt = FACDepDt.split('/');
                    Arr_Dt = new Date(parseInt(Arr_Dt[2]), parseInt(Arr_Dt[1]) - 1, parseInt(Arr_Dt[0]));
                    Dep_Dt = new Date(parseInt(Dep_Dt[2]), parseInt(Dep_Dt[1]) - 1, parseInt(Dep_Dt[0]));

                    if (st_dt < Arr_Dt) {
                        webix.message({ type: 'warning', text: "From date cannot be lesser than Arrival date" });
                        webix.UIManager.setFocus($$("FAC_AutoGrid"));                        
                        ass = 0;
                        break;
                    }
                    else if (st_dt > Dep_Dt) {
                        webix.message({ type: 'warning', text: "From date cannot be greater than Departure date" });
                        webix.UIManager.setFocus($$("FAC_AutoGrid"));                        
                        ass = 0;
                        break;
                    }
                    if (end_dt > Dep_Dt) {
                        webix.message({ type: 'warning', text: "To date cannot be greater than Departure date" });
                        webix.UIManager.setFocus($$("FAC_AutoGrid"));                        
                        ass = 0;
                        break;
                    }
                    else if (end_dt < Arr_Dt) {
                        webix.message({ type: 'warning', text: "To date cannot be lesser than Arrival date" });
                        webix.UIManager.setFocus($$("FAC_AutoGrid"));                        
                        ass = 0;
                        break;
                    }
                    if (st_dt > end_dt) {
                        webix.message({ type: 'warning', text: "From date cannot be greater than To date" });
                        webix.UIManager.setFocus($$("FAC_AutoGrid"));                        
                        ass = 0;
                        break;
                    }
                    if (end_dt < st_dt) {

                        webix.message({ type: 'warning', text: "To date cannot be lesser than From date" });
                        webix.UIManager.setFocus($$("FAC_AutoGrid"));                        
                        ass = 0;
                        break;
                    }
                }
            }
            if (ass == "0") {
                ExpBkFnAutoChrgbtnClick();
                Params1["MsgTXT"] = "#7#";
                return Params1;
            }

        }
    }



    var DataVal = JSON.stringify(Params);
    //DataVal = DataVal.replace(/</g, "<'");
    var vRet = "1";
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
    var AjxParam = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',            
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {
                rowDatad = JSON.parse(data);
                if (ExpBkModify_Tariff == "1") {
                    if (rowDatad.Status == "1" && ExpBkbTariffEditModified == true) {
                        var sRmTy = $$("RoomTypeBK").getValue();                        
                        if(ExpBkUpgrade_Appl_Ind == "1"){
                            if ($$("ddlRmUpgrdExpBk").getValue() != null && $$("ddlRmUpgrdExpBk").getValue() != "" && $$("ddlRmUpgrdExpBk").getValue() != "#N#"){
                                sRmTy = $$("ddlRmUpgrdExpBk").getValue();                                
                            }
                        }
                        fnSaveTarEditExpBk(rowDatad.ReserveNo, ArrivalBK, DepatureBK, $.trim(DepTm), CURRENCY, sRmTy, $$("RateCodeidBK").getValue(), sRateCat, Tariff_Count, ModeTy);                        
                    }
                }
                if (rowDatad.Status == "1") {
                    if (ExpBkNew_Packg_Appl == "1") fnSavePackageExpBk(rowDatad.ReserveNo,ArrivalBK, DepatureBK);
                }
                if (rowDatad.Status == "1") {
                    if (ExpBk_Auto_Chrg_Appl == "1" && FAC_Auto_Chrg_Modify == "1") {

                        if (FAC_auto_grid_data.length > 0 && ModeTy == "SAVE") {
                            $.each(FAC_auto_grid_data, function (key, sVal) {                                
                                sVal["R_N"] = rowDatad.ReserveNo;
                            });
                        }

                        fnSaveAutoChrgeExpBk(rowDatad.ReserveNo);
                    }
                }

                var AnyChange = "0"; 
                BkSucessRet = rowDatad;
                //if (ExpBkpGrpTariffChange || adrsDtWsTrChngdOnly.RecordCount > 0) Then bChanges = True

                if (rowDatad.Status == "1") fnLoadResExclAfterSave(rowDatad.ReserveNo);

                if (rowDatad.Status == "1" && ExpBkTY == "3" && ModeTy == "OPEN" && rowDatad.ResCount > 1) { 
                    if(fnIsItPMRoomBk($$("RoomTypeBK").getValue()) == "0"){
                        AnyChange = fnCheckAnyChange(rowDatad.ReserveNo);


                        
                        if (AnyChange == "1" || ExpBkbTariffEditModified == true || FAC_Auto_Chrg_Modify == "1" || ExpBkbPckgChg == true || bRoutModifyTc == "1") {
                            //
                            
                            fnLoadSaveToChangeBk();
                            vRet = "0";
                            
                        }
                    }
                }
            }
                               
        },
        error: function (request, status, error) {
            console.log("Error Failrue");               
        },
        complete: function () {
                
        }
    }

    if (BkAspxPage == true) {
        AjxParam.contentType = "application/json;charset=utf-8";
        AjxParam.acceptType = "application/json;charset=utf-8";
        AjxParam.dataType = "json";
        AjxParam.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else AjxParam.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(AjxParam);

    if(vRet == "0"){
        Params1["MsgTXT"] = "#7#";
        return Params1;
    }    
    
    BkSucessRet = rowDatad;    
       
    return rowDatad;

    
    //$.ajax({
    //    type: "POST",
    //    async: false,
    //    url: "/TravelAgentBlock/PostBookingCreationFn",
    //    data: { 'Params': JSON.stringify(Params) },
    //    //dataType:JSON,
    //    success: function (d) {
    //        
    //        if (d != "") {
    //            rowDatad = JSON.parse(d);
    //        }
    //    }
    //});
   
};



function OpenModeBookingLoad(ReserveNo, ModeIND) {
    //
    var rowDatad = []; 
    var rowDatad1 = []; 
    ExpBkBIND = "0";
    var AudCnt = 0;
    var AddlDepAmt = 0;
    var Cur_Shrt_Nm = "";
    Request = {
        REQTYPE: "BookingGetFn",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        PROPID: ExpBkCompId,
        RMT_TY: ExpBkRmtTy,
        ModeIND: ModeIND,
        ReserveNo: ReserveNo
        
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);   
    var AjxParam = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //
            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {
                var Pdata = JSON.parse(data);
                rowDatad = Pdata.data1;
                ExpBkOpenRec = Pdata.data2;
                rowDatad1 = Pdata.data3;
                AudCnt = Pdata.AudDtCnt;
                AddlDepAmt = Pdata.AddlDepAmt;                
                Cur_Shrt_Nm = Pdata.Cur_Shrt_Nm;
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        AjxParam.contentType = "application/json;charset=utf-8";
        AjxParam.acceptType = "application/json;charset=utf-8";
        AjxParam.dataType = "json";
        AjxParam.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else AjxParam.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(AjxParam);

    if (ExpBkModify_Tariff == "1") {
        fnGetTariffDataExpBk(ReserveNo);
    }
    
    

     

    //$.ajax({
    //    type: "POST",
    //    async: false,
    //    url: "/TravelAgentBlock/OpenModeBookingLoad",
    //    data: { 'PROPID': $$("Property").getValue(), 'ReserveNo': ReserveNo, 'ModeIND': ModeIND },
    //    //dataType:JSON,
    //    success: function (d) {
    //        
    //        if (d != "") {
    //            rowDatad = JSON.parse(d);
    //        }
    //    }
    //});
    return { DATA1: rowDatad, DATA2: rowDatad1, AudCnt: AudCnt, AddlDepAmt: AddlDepAmt, Cur_Shrt_Nm: Cur_Shrt_Nm }
};
function fnLoadResExclAfterSave(ResNo) {
    var rowDatad = [];
    Request = {
        REQTYPE: "GET_PRCLOADRESEXCLAFTERSAVE",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,        
        CONSTRING: ExpBkConnStr,
        RES_NO: ResNo,
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {
                rowDatad = JSON.parse(data);
            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "FO_URL", ApiControler: "TariffEdit/GetFoJsonReq" });
    }
    else params.data = "request=" + DataVal + "&URL= FO_URL&ApiControler=TariffEdit/GetFoJsonReq";
    $.ajax(params);

};
function LoadsetRouting_EditSplit_GridData(Res_no, RNo) {
    
    Routing_data = [];
    Spilt_data = [];
    Edit_split = 0;
    split_add1 = "";
    split_add2 = "";
    split_add3 = "";
    split_add4 = "";
    
    max_sno = 0;
    var reqobj = new Object;
    var DataVal = [];
    reqobj["REQTYPE"] = "LOAD_ROUTE_and_Split_Grid";
    reqobj["Res_no"] = $.trim(Res_no);
    reqobj["RNo"] = $.trim(RNo);
    reqobj["Route_Check"] = "true";
    reqobj["WhichForm"] = "RESERVE";
    reqobj["USRID"] = ExpBkUserId;
    reqobj["COMPID"] = ExpBkCompId;
    reqobj["CONSTRING"] = ExpBkConnStr;
    
              

    var dataparam = JSON.stringify(reqobj);
    if (BkAspxPage == false) dataparam = encodeURIComponent(dataparam);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {
                
                DataVal = JSON.parse(data);

                for (i = 0; i < DataVal.SpiltGrid.length; i++) {
                    if (DataVal.SpiltGrid[i].Type == "T" || DataVal.SpiltGrid[i].Type == "C") {
                        DataVal.SpiltGrid[i].Settlement = 3;
                    }
                }
                Spilt_data = DataVal.SpiltGrid;
                Edit_split = DataVal.SpiltGrid.length;
                Routing_data = DataVal.RouteGrid;
                split_add1 = DataVal.splitAdd1;
                split_add2 = DataVal.splitAdd2;
                split_add3 = DataVal.splitAdd3;
                split_add4 = DataVal.splitAdd4;
                max_sno = DataVal.max_sno;
            }

        },
        error: function () {
            console.log("Error Failrue");
        },
        complete: function () {
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: dataparam, URL: "FO_URL", ApiControler: "Routing/RoutingRequest" });
    }
    else params.data = "request=" + dataparam + "&URL= FO_URL&ApiControler=Routing/RoutingRequest";
    $.ajax(params);

        
   
};
function GuestSearchBKPopWindowLoad() {
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        modal: true,
        id: "GuestSearchBK",
        close: true,
        head: "Guest Search",
        on:{
            onShow:function(){
                var vheight = window.innerHeight
                     || document.documentElement.clientHeight
                     || document.body.clientHeight;
                var vWidth = window.innerWidth
                        || document.documentElement.clientWidth
                        || document.body.clientWidth;

                if (vheight > 550) vheight = 550;
                if (vWidth > 1060) vWidth = 1060;                

                $$("frmExpBkGstSrch").define("height", vheight);
                $$("frmExpBkGstSrch").define("width", vWidth);
                $$("frmExpBkGstSrch").adjust();

                $$("GuestSearchBK").define("height", vheight);
                $$("GuestSearchBK").define("width", vWidth);
                $$("GuestSearchBK").adjust();

                var Top = $$("GuestSearchBKGrid").getNode().offsetTop
                $$("GuestSearchBKGrid").define("height", vheight - Top - 50);
                $$("GuestSearchBKGrid").define("width", vWidth - 20);
                $$("GuestSearchBKGrid").resize();
            }
        },
        body: {
            view: 'form',
            id:"frmExpBkGstSrch",
            elements: [
                {
                    cols: [
                      { view: "label", id: "BKinactive_style", css: "BKinactive_style BKFloatLeft", width: (window.innerWidth / 1.2) * 0.3 },
                      { view: "label", label: "Inactive", id: "BKInactive",css:"BKFloatLeft", width: (window.innerWidth / 1.2) * 0.05 },
                      { view: "label", id: "BKBlacklist_style", css: "BKBlacklist_style BKFloatLeft", width: (window.innerWidth / 1.2) * 0.3 },
                      { view: "label", label: "Blacklist", id: "BKBlacklist",css:"BKFloatLeft",  width: (window.innerWidth / 1.2) * 0.05 },
                      { view: "button", label: "New Guest", type: "icon", icon: "wxi-user", id: "BKNewGuestAdd", align: "right", hidden: true, css: "BKnewguest", width: (window.innerWidth / 1.2) * 0.1 },
                      { view: "button", label: "Advanced", type: "icon", icon: "wxi-checkbox-blank", id: "BKGuestAdvanced", align: "right", hidden: true, css: "btn btn-default btn-popup", width: (window.innerWidth / 1.2) * 0.1 },//css: "advance_guest"
                         {
                             view: "button",
                             id: "BKbtnAdvance",
                             css: "webix_primary BKFloatLeft",
                             value: "Advance",
                             width: 70,                             
                             on: {
                                 onItemClick: function () {
                                     
                                     onFilter = "1";
                                     $$("GuestSearchBKGrid").eachColumn(function (id, col) {
                                         var filter = this.getFilter(id);
                                         if (filter) {
                                             if (filter.setValue) filter.setValue("")	// suggest-based filters 
                                             else filter.value = "";					// html-based: select & text
                                         }
                                     });
                                     webix.html.addCss($$("BKbtnAdvance").$view, "BtnClr");
                                     $$("GuestSearchBKPopAdv").show();
                                     onFilter = "0";
                                 }
                             }
                         },
                         {view:"label"}
                    ]
                },
                {
                    id: "GuestSearchBKGrid",
                    select: 'row',
                    view: "datatable",
                    autoconfig: true,
                    css: "webix_header_border",
                    scheme: {
                        $change: function (item) {
                            if (item.BL_IND == 2) {
                                
                                item.$css = "BKblacklist";
                            }
                            else if (item.BL_IND == 1)
                                item.$css = "BKinactive";
                        }
                    },
                    columns: [
                       { id: "LST_NM", header: ['Last Name', { content: "textFilter" }], width: 200, sort: "string" },
                       { id: "FST_NM", header: ['First Name', { content: "textFilter" }], width: 200, sort: "string" },
                       {
                           id: "PARTY_NM", header: ['Company', { content: "textFilter", }], width: 150, sort: "string"
                       },
                       { id: "PLACE", header: ['Place', { content: "textFilter" }], width: 120, sort: "string" },
                       { id: "COUNTRY_NM", header: ['Country', { content: "textFilter" }], width: 160, sort: "string" },
                       { id: "PASS_NO", header: ['Passport', { content: "textFilter" }], width: 120, sort: "string" },
                       { id: "DOB", header: ['Dob', { content: "textFilter" }], width: 90, sort: "string" },
                       { id: "GUEST_ID", header: 'GUESTID', width: 50, hidden: true },
                       { id: "GUEST_NM", header: 'GUEST_NM', width: 50, hidden: true },
                       { id: "COMPANYID", header: 'COMPANYID', width: 80, hidden: true },
                       { id: "COUNTRY_ID", header: 'CountryID', width: 10, hidden: true },
                       { id: "GUEST_INFORM_NM", header: 'GUEST_INFORM_NM', width: 50, hidden: true },
                       { id: "GUEST_INFORM_ID", header: 'GUEST_INFORM_ID', width: 50, hidden: true },
                       { id: "GUEST_PARTY_ID", header: 'GUEST_PARTY_ID', width: 50, hidden: true },
                       { id: "PARTY_NM1", header: 'PARTY_NM', width: 50, hidden: true },
                       { id: "GEND_ID", header: 'GEND_ID', width: 50, hidden: true },                       
                       { id: "BL_IND", header: 'BL_IND', width: 50, hidden: true },
                       { id: "OFF_TEL", header: 'OFF_TEL', width: 50, hidden: true },
                       { id: "RES_TEL", header: 'RES_TEL', width: 50, hidden: true },
                       { id: "MOBILE", header: 'MOBILE', width: 50, hidden: true },
                       { id: "EMAIL", header: 'EMAIL', width: 50, hidden: true },
                       { id: "DOC_TY_ID", header: 'DOC_TY_ID', width: 50, hidden: true },
                       { id: "ADD1", header: 'ADD1', width: 50, hidden: true },
                       { id: "ADD2", header: 'ADD2', width: 50, hidden: true },
                       { id: "ADD3", header: 'ADD3', width: 50, hidden: true },
                       { id: "A14_Id", header: 'A14_Id', width: 50, hidden: true },
                       { id: "B14_Id", header: 'B14_Id', width: 50, hidden: true },
                       { id: "O_A5", header: 'O_A5', width: 50, hidden: true },
                       { id: "HOTEL_COMMENT", header: 'HOTEL_COMMENT', width: 50, hidden: true },
                       { id: "GUEST_TY_ID", header: 'GUEST_TY_ID', hidden: true },
                       { id: "MARK_SEGMENT_ID", header: 'MARK_SEGMENT_ID', hidden: true },
                       { id: "GUEST_STATUS", header: 'GUEST_STATUS', hidden: true },
                       
                       
                    ],
                    data: [],
                    
                    on: {
                        'onItemDblClick': function (id) {
                            debugger;
                            var selectedItem = this.getItem(id.row);
                            var GID = selectedItem.GUEST_ID;
                            var BL_IND = selectedItem.BL_IND;
                            //if (BL_IND != "2") {
                            //
                            var GUEST_INFORM_NM = selectedItem.GUEST_INFORM_NM == null ? "" : selectedItem.GUEST_INFORM_NM;
                            var GUEST_INFORM_ID = selectedItem.GUEST_INFORM_ID == null ? "" : selectedItem.GUEST_INFORM_ID;
                            var GUEST_ID = selectedItem.GUEST_ID;
                            var GEND_ID = selectedItem.GEND_ID;
                            var LST_NM = selectedItem.LST_NM;
                            var FST_NM = selectedItem.FST_NM;
                            var GUEST_PARTY_ID = selectedItem.GUEST_PARTY_ID == null ? "" : selectedItem.GUEST_PARTY_ID;
                            var PARTY_NM = selectedItem.PARTY_NM == null ? "" : selectedItem.PARTY_NM;

                            var PASS_NO = selectedItem.PASS_NO;
                            var MOBILE = selectedItem.MOBILE == null ? "" : selectedItem.MOBILE;
                            var EMAIL = selectedItem.EMAIL == null ? "" : selectedItem.EMAIL;
                            var ADDRESS = selectedItem.ADD1;
                            var COUNTRY = selectedItem.COUNTRY_ID;
                            var PASS_PLC = selectedItem.PASS_ISS_PLACE;
                            var PASS_ISDT = selectedItem.PASS_ISS_DT;
                            var PASS_EXDT = selectedItem.PASS_EXP_DT;
                            var O_A5 = selectedItem.O_A5;
                            var Hotel_Comment = selectedItem.HOTEL_COMMENT;
                            var GUEST_TY_ID = selectedItem.GUEST_TY_ID == null ? "" : $.trim(selectedItem.GUEST_TY_ID);
                            var MARK_SEGMENT_ID = selectedItem.MARK_SEGMENT_ID == null ? "" : $.trim(selectedItem.MARK_SEGMENT_ID);
                            var GUEST_STATUS = selectedItem.GUEST_STATUS == null ? "" : $.trim(selectedItem.GUEST_STATUS);


                            var RetItemId = $$("gridGstExpBk").getSelectedId(false);
                            var RetRow = RetItemId.row;
                            var RetItem = $$("gridGstExpBk").getItem(RetItemId);
                            var F_Ind = RetItem.F_IND;
                            var DF_Ind = RetItem.DF_IND;
                            if (F_Ind == "2" || DF_Ind == "2") {
                                webix.message("Flight Details will be retained")
                            }

                            RetItem.LAST_NM = LST_NM;
                            RetItem.FIRST_NM = FST_NM;
                            RetItem.GUEST_ID = GUEST_ID;
                            RetItem.TITTLE = GUEST_INFORM_ID.toString().trim();
                            $$("gridGstExpBk").updateItem(RetRow, RetItem);
                            $$("gridGstExpBk").refresh();

                            
                                                       
                            //$$("LastNMBK").setValue(LST_NM);
                            //$$("FirstNMBK").setValue(FST_NM);
                            //$$("TitleBK").setValue($.trim(GUEST_INFORM_ID));
                            //$$("GuestId").setValue($.trim(GUEST_ID));
                            ////$$("MobileBK").setValue($.trim(MOBILE))
                            ////$$("EMailBK").setValue($.trim(EMAIL))
                            //$$('FirstNMBK').define("readonly", true);                            
                            //webix.html.addCss($$("FirstNMBK").getNode(), "ReadOnlyText");
                            //$$('FirstNMBK').refresh()
                            //$$('LastNMBK').define("readonly", true);
                            //webix.html.addCss($$("LastNMBK").getNode(), "ReadOnlyText");
                            //$$('LastNMBK').refresh();
                            //$$('TitleBK').define("readonly", true);
                            //webix.html.addCss($$("TitleBK").getNode(), "ReadOnlyText");
                            //$$('TitleBK').refresh();
                            $$("GuestSearchBK").hide();
                            var RowNo = $$("gridGstExpBk").getIndexById(RetRow);
                            if (RowNo == 0) {
                                //if(GUEST_TY_ID != "") $$("ddlGuestTyBk").setValue(GUEST_TY_ID);
                                //if (MARK_SEGMENT_ID != "") $$("ddlSegmentExpBk").setValue(MARK_SEGMENT_ID);
                                if (GUEST_STATUS != "") $$("ExpBkGstStatus").setValue(GUEST_STATUS);
                                
                                if (GUEST_PARTY_ID != "") {
                                    $$("ddlGuestTyBk").blockEvent();
                                    $$("ddlSegmentExpBk").blockEvent();
                                    $$("CompanyidBK").setValue(GUEST_PARTY_ID);
                                    $$("CompanyBK").setValue(PARTY_NM);
                                    $$("ddlGuestTyBk").unblockEvent();
                                    $$("ddlSegmentExpBk").unblockEvent();
                                }
                                //fnGetUpdateMarketSegment();
                                FoGuestVisitPopupLoadCom(ExpBkCompId, ExpBkUserId, ExpBkConnStr, ExpBkPageId, ExpBkApiUrl, BkAspxPage, $.trim(GUEST_ID));
                            }                            

                        },
                        "onBeforeSort": function (sby, sdir, as) {
                            
                            SortBy = sby; Dir = sdir;
                            $$("GuestSearchBKGrid").clearAll();
                            PageNo = 0;
                            GridBKSrchLoadfn();
                            return false;
                        },
                        'onBeforeFilter': function (id, value, config) {
                            
                            if (onFilter == "1") return false;
                            if (id == "LST_NM") {
                                $$("GuestSearchBKGrid").clearAll();
                                PageNo = 0;
                                GridBKSrchLoadfn();
                            }
                            return false;

                        },

                        'onKeyPress': function (e) {
                            

                            if (e == '13') {
                                var valid = $$("GuestSearchBKGrid").getSelectedId(true);
                                this.callEvent("onItemDblClick", [valid[0]]);
                                return false; 
                            }
                        },
                        'onAfterScroll': function () {
                            //
                            scrollGstSrchGridBK();
                        },
                    }
                }
            ]
        }
    });



    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "GuestSearchBKPopAdv",
        head: "Advance Search",
        position: "center",
        hieght: 250,
        width: 400,
        body: {
            view: "form",
            elements: [
            {
                view: "text",
                id: "BKResTelNoTxt",
                width: 150,
                label: "Res. Tel. No",
                width: 250,
            },
                {
                    view: "text",
                    id: "BKOffTelNoTxt",
                    width: 150,
                    label: "Off. Tel. No",
                    width: 250,

                },
                 {
                     view: "text",
                     id: "BKMobileTxt",
                     width: 150,
                     label: "Mobile",
                     width: 250
                 },
                   {
                       view: "text",                       
                       id: "BKEmailTxt",
                       width: 150,
                       label: "Email",
                       width: 350,
                       
                   },
                 {
                     view: "text",
                     id: "BKAddressTxt",
                     width: 150,
                     label: "Address",
                     width: 350
                 },
                   {
                       view: "text",
                       id: "BKPlaceTxt",
                       width: 150,
                       label: "Place",
                       width: 350,
                       hidden: true,
                   },
                     {
                         view: "text",
                         id: "BKRsrIDTxt",
                         width: 150,
                         label: "Rsr Id",
                         width: 350,
                         hidden: true,
                     },

                   {
                       cols: [{
                           view: "label", label: " ", inputWidth: 70,
                       }, {
                           cols: [{
                               view: "button",  value: "Ok", align: "right", css: "webix_primary", inputWidth: 70, on: {
                                   onItemClick: function () {
                                       $$("GuestSearchBKGrid").clearAll();
                                       PageNo = 0;
                                       GridBKSrchLoadfn();
                                       $$('GuestSearchBKPopAdv').hide();
                                       
                                   }
                               }
                           },
                           {
                               view: "button", value: "Close", align: "right", css: "webix_primary", inputWidth: 70, on: {
                                   onItemClick: function () {

                                       $$('GuestSearchBKPopAdv').hide();
                                   }
                               }
                           },

                           ]
                       }
                       ]
                   }
            ]
        }
    });
};

function fnBkRoomNoChange() {

    var SelId = $$("grdRoomSrch").getSelectedId(false);
    var RowId = SelId.row;
    var ColId = SelId.column;
    var SelRow = $$("grdRoomSrch").getItem(RowId);
    var vVal = SelRow[ColId];
    var array = $.trim(vVal).split('~');
    var RoomNo = array[0].toString();
    var Status = array[1].toString();
    var RmTyid = array[2].toString();
    $$('RoomTypeBK').setValue(RmTyid);
    $$("RoomNOBK").setValue(RoomNo);

};
var scrollGstSrchGridBK = function () {
    //

    //var pos = $$("GuestSearchBKGrid").getScrollState();

    var contentScroll = $$("GuestSearchBKGrid").getScrollState().y + $$("GuestSearchBKGrid").$view.clientHeight;
    //var node = $$("GuestSearchBKGrid").getNode($$("GuestSearchBKGrid").getLastId());
    var height = $$("GuestSearchBKGrid").config.rowHeight || $$("GuestSearchBKGrid").type.height;
    Totheight = (PageNo + 1) * 40 * height

    if (contentScroll >= Totheight) {
        
        PageNo = PageNo + 1;
        GridBKSrchLoadfn();
    }
};
function btnBKGstsrchClick() {
    
    $$("GuestSearchBKGrid").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    PageNo = 0;
    SortBy = ""; Dir = "";
    $$("BKResTelNoTxt").setValue('');
    $$("BKOffTelNoTxt").setValue('');
    $$("BKMobileTxt").setValue('');
    $$("BKEmailTxt").setValue('');
    $$("BKAddressTxt").setValue('');
    $$("BKPlaceTxt").setValue('');
    $$("BKRsrIDTxt").setValue('');

    $$("GuestSearchBKGrid").clearAll();
    $$("GuestSearchBK").show('', { pos: "center" });
    GridBKSrchLoadfn();

   // ComGuestSearchPopWindowLoad(ExpBkCompId,ExpBkUserId,ExpBkConnStr);

};
function GridBKSrchLoadfn() {
       
    
    var Fulldata = [];
    var dataparam = {};
    webix.extend($$("frmExpBkGstSrch"), webix.OverlayBox);
    $$("frmExpBkGstSrch").showOverlay(PrgStr);

    try {
        var LstNm = $$("GuestSearchBKGrid").getFilter("LST_NM").value;
        var FstNm = $$("GuestSearchBKGrid").getFilter("FST_NM").value;
        //var GstNm = $$("GuestSearchBKGrid").getFilter("GUEST_NM").value; 
        var PartyNm = $$("GuestSearchBKGrid").getFilter("PARTY_NM").value;
        var Place = $$("GuestSearchBKGrid").getFilter("PLACE").value;
        var Country = $$("GuestSearchBKGrid").getFilter("COUNTRY_NM").value;
        var PassNo = $$("GuestSearchBKGrid").getFilter("PASS_NO").value;
        var Dob = $$("GuestSearchBKGrid").getFilter("DOB").value;

        dataparam["REQTYPE"] = "GUESTSERACHNEW";
        dataparam["ResTelNo"] = $$("BKResTelNoTxt").getValue();
        dataparam["OffTelNo"] = $$("BKOffTelNoTxt").getValue();
        dataparam["Mobile"] = $$("BKMobileTxt").getValue();
        dataparam["Email"] = $$("BKEmailTxt").getValue();
        dataparam["Address"] = $$("BKAddressTxt").getValue();
        dataparam["FST_NM"] = FstNm;
        dataparam["LST_NM"] = LstNm;
        //dataparam["GUEST_NM"] = GstNm;
        dataparam["PARTY_NM"] = PartyNm;
        dataparam["PLACE"] = Place;
        dataparam["COUNTRY_NM"] = Country;
        dataparam["PASS_NO"] = PassNo;
        dataparam["DOB"] = Dob;
        dataparam["PageNo"] = PageNo;
        dataparam["Top"] = 50;
        dataparam["SortBy"] = SortBy;
        dataparam["Dir"] = Dir;
        dataparam["CheckFilter"] = 1;        
        dataparam["COMPID"] = ExpBkCompId;        
        dataparam["USERID"] = ExpBkUserId;
        dataparam["USRID"] = ExpBkUserId;
        dataparam["CONSTRING"] = ExpBkConnStr;
        dataparam["CONN_STRING"] = ExpBkConnStr;
        var DataVal = JSON.stringify(dataparam);
        if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);       

        var params = {
            async: true,
            url: ExpBkApiUrl,
            type: 'POST',
            success: function (d) {
                

                if (BkAspxPage == true) {
                    var data = d.d;
                }
                else var data = d;

                if (data != "") {
                    Fulldata = JSON.parse(data);

                    $$("GuestSearchBKGrid").parse(Fulldata);
                    if(PageNo == 0){                
                        if ($$("GuestSearchBKGrid").count()) {
                            $$("GuestSearchBKGrid").select($$("GuestSearchBKGrid").getFirstId());
                        }
                        webix.UIManager.setFocus($$("GuestSearchBKGrid"));
                    }

                    
                }

            },
            error: function () {
                console.log("Error Failrue");
                $$("frmExpBkGstSrch").hideOverlay();
            },
            complete: function () {
                $$("frmExpBkGstSrch").hideOverlay();
            }
        }

       
        if (BkAspxPage == true) {
            params.contentType = "application/json;charset=utf-8";
            params.acceptType = "application/json;charset=utf-8";
            params.dataType = "json";
            params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
        }
        else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
        $.ajax(params);       


    }
    catch (e) {
        console.log(e.message)
        $$("frmExpBkGstSrch").hideOverlay();
    }

};

function fnLoadStatus() {
    var rowDatad = [];

    Request = {
        REQTYPE: "FNLOADRESSTATUS",
        COMPID: ExpBkCompId,
        USERID: ExpBkUserId,
        USRID: ExpBkUserId,
        CONSTRING: ExpBkConnStr,
        CONN_STRING: ExpBkConnStr,
        PROPID: ExpBkCompId,
        RMT_TY: ExpBkRmtTy,
    }
    var DataVal = JSON.stringify(Request);
    if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

    var params = {
        async: false,
        url: ExpBkApiUrl,
        type: 'POST',
        success: function (d) {
            //

            if (BkAspxPage == true) {
                var data = d.d;
            }
            else var data = d;

            if (data != "") {

                rowDatad = JSON.parse(data);

            }
        },
        error: function (request, status, error) {
            console.log("Error Failrue");
        }
    }

    if (BkAspxPage == true) {
        params.contentType = "application/json;charset=utf-8";
        params.acceptType = "application/json;charset=utf-8";
        params.dataType = "json";
        params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
    }
    else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
    $.ajax(params);

    return rowDatad;
    
};
function fnSaveMsgWindow () {

    webix.ui({
        view: "window",
        id: "SaveMsgEmlPop",
        width: 400,
        position: "center",
        css: "WebIxStyle",
        move: true,
        modal: true,
        head:"Alert",
        body: {
            rows: [
                {
                    width: 380,

                    rows: [
                        { view: "template",id:"TempSaveMsg", height: 40, template: "Saved Successfully", css: { "text-align": "center !important;", "font-weight": "bold;", "font-size": "16px !important;" } },
                        {
                            height: 40,
                            id: "RowChkEmail",
                            hidden:true,
                            cols: [
                                    {},
                                { view: "checkbox", id: "chkEmailSend", width: 150, labelWidth: 125, label: "Want to send Email", css: { "text-align": "center !important;" }, customCheckbox: false, },
                                {}
                            ]
                        },

                        {
                            margin: 10,
                            padding: { top: 5, bottom: 5, right: 5 },
                            cols: [
                                {
                                    view: "button",
                                    id:"btnSaveMsgOk",
                                    type: "icon",
                                    icon: "wxi-check",
                                    label: "Ok",
                                    inputWidth: 80,

                                    click: function () {
                                        $$("SaveMsgEmlPop").hide();
                                        $$("BookingCreatePopup").hide();
                                        //var DropRoom = $("#RoomTypeType").val();
                                        if(ExpBkPageId == "TC"){
                                            var DropRoom = $$("RoomTypeType").getValue();
                                            if (DropRoom != "") DropRoom = "'" + DropRoom + "'";
                                            //var vDate = $("#StartDate").data("kendoDatePicker").value();                                                               
                                            var vDate = $$("StartDate").getValue();
                                            vDate = convert(vDate);
                                            fnFoRoomChart(vDate, 22, DropRoom);
                                        }
                                        else if(ExpBkPageId == "GROUPRESERVATION"){
                                            
                                            GrpResPopupRet(BkSucessRet.RegNo);
                                        }
                                        else if (ExpBkPageId == "ROOMASSIGN") {
                                            
                                            LoadRmAssGrid();
                                        }
                                        else if (ExpBkPageId == "FLASHEXPARR") {
                                            fnLoadExpArrival();
                                        }
                                        else if(ExpBkPageId == "FLASHROOMPOS")
                                        {
                                            fnMonthLoadRoomSts(1);
                                        }
                                        else if (ExpBkPageId == "ITINERARYBK") {
                                            
                                            var ResDet = BkSucessRet.DetailsDt;
                                            var ItNo = "";
                                            if (ResDet.length > 0) {
                                                if (ResDet[0].IT_NO != null) ItNo = $.trim(ResDet[0].IT_NO);

                                            }

                                            if (ItNo != "") {
                                                $$("txtItinNo").setValue(ItNo);
                                                ItBkResLoadDetails(ItNo);
                                            }
                                        }

                                        if ($$("chkEmailSend").getValue() == "1" ) fnSendMailExBk();
                                        
                                    },
                                    align: "center"
                                }
                            ]
                        }

                    ]
                },

            ],
        }
    });
};
 function fnCancePopWindowLoad () {
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "CancelResPop",
        head: "Cancel Detail",
        position: "center",
        css: "WebIxStyle",
        height: 200,
        width: 350,
        move: true,
        body: {
            padding: { top: 10, left: 10, bottom: 20, right: 10 },
            rows: [
                    { view: "textarea", id: "txtCancReasResPop", label: "Cancel Reason", labelWidth: 100, attributes: { maxlength: 100 }, required: true,},
                    { view: "text", id: "txtCancRqByResPop", label: "Request By", labelWidth: 100, attributes: { maxlength: 40 }, required: true, },
                    {
                        cols: [{}, {
                            view: "button", type: "icon", id: "OkCancelResPop", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80,
                            click: function () {

                                if (fnSqlInjectExpBk($$("txtCancReasResPop").getValue().toString().trim(),ExpBkSTR_SANITIZE_IND)  == "") {
                                    webix.message({ type: 'warning', text: "Cancel Reason cannot be empty" });
                                    webix.UIManager.setFocus($$("txtCancReasResPop"))
                                    return false;
                                }

                                if (fnSqlInjectExpBk($$("txtCancRqByResPop").getValue().toString().trim(),ExpBkSTR_SANITIZE_IND) == "") {
                                    webix.message({ type: 'warning', text: "Request By cannot be empty" });
                                    webix.UIManager.setFocus($$("txtCancRqByResPop"))
                                    return false;
                                }

                                var datval = [];
                                //BkSucessRet = [];
                                //var PrgStr = "<div  style='display: block; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; fit-position: 100%; z-index: 189'> <img src='../../Images/progress.GIF' style='position: absolute; left: 50%; top: 45%; height: 100px; width: 80px;' /> </div>";
                                BkSaveMode = "CANCEL";
                                //webix.extend($$("CancelResPop"), webix.OverlayBox);
                                //$$("CancelResPop").showOverlay(PrgStr); 
                                webix.extend($$("CancelResPop"), webix.ProgressBar);
                                $$("CancelResPop").showProgress({
                                    type: "icon",                                   
                                });
                                webix.html.addCss($$("CancelResPop").getNode(), "ExpBkPagefalse");
                                setTimeout(function () {
                                    datval = PostBookingCreationFn("CANCEL");
                                    if (datval.Status == "1") {
                                        //BkSucessRet = datval;
                                        var RegNo = datval.RegNo;
                                        var TemplateMsg = "";
                                        var vCancelNo = "";

                                        var DetDt = datval.DetailsDt;

                                        if (DetDt.length > 0) {

                                            vCancelNo = DetDt[0].CANC_NO;
                                        }
                                        if (ExpBkG22_IND == "1") $$("RowChkEmail").show();
                                        TemplateMsg = "Reservation Cancelled. Cancellation No.:  " + vCancelNo;
                                        $$("TempSaveMsg").define("template", TemplateMsg);
                                        $$("TempSaveMsg").refresh();
                                        $$("chkEmailSend").setValue("0");
                                        $$("CancelResPop").hideProgress();
                                        webix.html.removeCss($$("CancelResPop").getNode(), "ExpBkPagefalse");
                                        $$("CancelResPop").hide();
                                        $$("SaveMsgEmlPop").show();                                        

                                    }
                                    else {
                                        if (datval.MsgTXT != "#7#") {
                                            //alert('Booking Cancel Failled');
                                            $$("CancelResPop").hideProgress();
                                            webix.html.removeCss($$("CancelResPop").getNode(), "ExpBkPagefalse");
                                            $$("CancelResPop").hide();                                            
                                            
                                        }
                                    }
                                },0)
                            }
                        }],
                    }
            ]
        }
    });
 };
 function ArrDtChangeExBk() {
     var ArrivalBK = $$("ArrivalBK").getText();
     var DepatureBK = $$("DepatureBK").getText();

     if (ArrivalBK == "" || DepatureBK == "") return false;

     var ArrivalBK1 = formatDateToValExBk(ArrivalBK);
     var DepatureBK1 = formatDateToValExBk(DepatureBK);

     if (ArrivalBK1 > DepatureBK1) {
         $$("DepatureBK").blockEvent();
         $$("DepatureBK").setValue(formatDateExBk(ArrivalBK));
         $$("DepatureBK").unblockEvent();         
     }

     var ArrivalBK = $$("ArrivalBK").getText();
     var DepatureBK = $$("DepatureBK").getText();

     RateCodeTariffloadfn(1);
     
     var vdays = fnDateDiffExBk(ArrivalBK, DepatureBK);     
     $$("NightsBk").blockEvent();
     $$("NightsBk").setValue(vdays);
     $$("NightsBk").unblockEvent();

 };
 function DeptDtChangeExBk() {

     var ArrivalBK = $$("ArrivalBK").getText();
     var DepatureBK = $$("DepatureBK").getText();

     if (ArrivalBK == "" || DepatureBK == "") return false;

     var ArrivalBK1 = formatDateToValExBk(ArrivalBK);
     var DepatureBK1 = formatDateToValExBk(DepatureBK);

     if (ArrivalBK1 > DepatureBK1) {
         $$("ArrivalBK").blockEvent();
         $$("ArrivalBK").setValue(formatDateExBk(DepatureBK));
         $$("ArrivalBK").unblockEvent();
     }
     var ArrivalBK = $$("ArrivalBK").getText();
     var DepatureBK = $$("DepatureBK").getText();

     var vdays = fnDateDiffExBk(ArrivalBK, DepatureBK);
     $$("NightsBk").blockEvent();
     $$("NightsBk").setValue(vdays);
     $$("NightsBk").unblockEvent();

 };
 var formatDateExBk = function (StrDt) {
     //
     var Parts = StrDt.split("/");
     var Dt = Parts[0];
     var Mn = Parts[1];
     var Yr = Parts[2];
     var Str = Yr + "-" + Mn + "-" + Dt;
     return Str;
 };
 var formatDateToValExBk = function (StrDt) {
     //
     var Parts = StrDt.split("/");
     var Dt = Parts[0].trim();
     var Mn = Parts[1].trim();
     var Yr = Parts[2].trim();
     var Str = Yr + Mn + Dt;
     var vRet = parseFloat(Str).toFixed(0);
     return Str;
 };
 var formatDateToValExBk1 = function (StrDt) {
     //
     if (StrDt.length > 10) StrDt = StrDt.substring(0, 10);
     var Parts = StrDt.split("-");
     var Yr = Parts[0].trim();
     var Mn = Parts[1].trim();
     var Dt = Parts[2].trim();
     var Str = Yr + Mn + Dt;
     var vRet = parseFloat(Str).toFixed(0);
     return Str;
 };

 function NightsChangeExBk() {
     
     var ArrivalBK = $$("ArrivalBK").getText();
     var DepatureBK = $$("DepatureBK").getText();

     var NightsBK = $$("NightsBk").getValue();

     if (NightsBK == "") {
         //$$("NightsBk").blockEvent();
         //$$("NightsBk").setValue("1");
         //$$("NightsBk").unblockEvent();
         NightsBK = 0;
     }

     //NightsBK = $$("NightsBk").getValue();

     var retDate = fnDateAddExBk(ArrivalBK, NightsBK, "D");
     $$("DepatureBK").blockEvent();
     $$("DepatureBK").setValue(formatDateExBk(retDate));
     $$("DepatureBK").unblockEvent();
 };
 function fnDateAddExBk(vDate, vCount, vType) {
     
     var vRetdate = "";
     var Request = {
         REQTYPE: "GET_FNRETDATEADD",
         COMPID: ExpBkCompId,
         USERID : ExpBkUserId,
         USRID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         CONN_STRING: ExpBkConnStr,
         DATE: vDate,
         DAYS: vCount,
         FORMAT: vType,

     }
     var rowData = "";
     requestData = JSON.stringify(Request);
     if (BkAspxPage == false) requestData = encodeURIComponent(requestData);
     
     params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         success: function (d) {
             
             if (BkAspxPage == true) {
                 var data = d.d;
             }
             else var data = d;
             if (data != "") {
                 rowData = JSON.parse(data);
                               
             }
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
         }
     }

     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: requestData, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
     }
     else params.data = "request=" + requestData + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
     $.ajax(params);

     return rowData;

 };
 function fnDateDiffExBk(vFrmDate, vToDate) {
     
     var vRetdate = "";
     var Request = {
         REQTYPE: "GET_FNRETDATEDIFF",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         USRID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         CONN_STRING: ExpBkConnStr,
         FROMDATE: vFrmDate,
         TODATE: vToDate,
        
     }
     var rowData = "";
     requestData = JSON.stringify(Request);
     if (BkAspxPage == false) requestData = encodeURIComponent(requestData);

     params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         success: function (d) {
             
             if (BkAspxPage == true) {
                 var data = d.d;
             }
             else var data = d;
             if (data != "") {
                 rowData = JSON.parse(data);

             }
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
         }
     }

     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: requestData, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
     }
     else params.data = "request=" + requestData + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
     $.ajax(params);

     return rowData;

 };
 function fnSendMailExBk() {
     var Ltype; var Mode;
     switch (BkSaveMode) {
         case "NEW": {
             Mode = "New";
             Ltype = "R";
             break;
         }
         case "OPEN": {
             Mode = "Amend";
             Ltype = "A";
             break;
         }
         case "CANCEL": {
             Mode = "Cancel";
             Ltype = "C";
             break;
         }
     }

     var Lid = "1";
     var LocId = "";


     var basCur = "";
     var compId = ExpBkCompId;
     var GEmail1 = "", GEmail2 = "", BEmail = ""; var netTariff = 0;
     var CrsNo = BkSucessRet.RegNo;
     var CompDet = BkSucessRet.CompDetDt;
     var GuestDet = BkSucessRet.GuestDetDt;
     var ResDet = BkSucessRet.DetailsDt;
     if (CompDet.length > 0) {
         if (CompDet[0].BASE_CURRENCY_ID != null) basCur = $.trim(CompDet[0].BASE_CURRENCY_ID);
     }

     if (GuestDet.length > 0) {
         if (GuestDet[0].EMAIL != null) GEmail1 = $.trim(GuestDet[0].EMAIL);
         if (GuestDet[0].Q1_NM != null) GEmail2 = $.trim(GuestDet[0].Q1_NM);

     }

     if (ResDet.length > 0) {
         if (ResDet[0].TARIFF != null) netTariff = $.trim(ResDet[0].TARIFF);

     }

     var Host = window.location.host;
     var Protocall = window.location.protocol;
     var sUrl = Protocall + "//" + Host + "/FO/CRSMAIL.aspx?";

     var UrlQryStr = "COMPID=" + ExpBkCompId + "&Mode=1&LocID=" + LocId + "&basCur=" + basCur + "&uid=" + ExpBkUserId + "&GEmail1=" + GEmail1 + "&GEmail2=" + GEmail2 + "&BEmail=" + BEmail +
             "&CrsNo=" + CrsNo + "&Lty=" + Ltype + "&Lid=" + Lid + "&NetTariff=" + netTariff;

     //UrlQryStr = encodeURIComponent(UrlQryStr);

     window.open(sUrl + UrlQryStr, "Email", "height=500,width=850,scrollbars=yes,left=60,top=120")

 };
 function FnExBkLoadFoControl() {
     //
     var rowData = [];
     ExpBkG22_IND = "0";
     ExpBkHH = "";
     ExpBkD21_IND = "0";
     ExpBkModify_Tariff = "0";
     ExpBkF19_IND = "0";
     ExpBkUpgrade_Appl_Ind = "0";
     ExpBkMarket_Mand_Ind = "0";
     ExpBkGuest_Ty_Ind = "0";
     ExpBkA17_IND = "0";
     ExpBk_RSRAPPL = "0";
     Request = {
         REQTYPE: "GET_FOCONTROL",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         USRID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         CONN_STRING: ExpBkConnStr,
         PROPID: ExpBkCompId,
         RMT_TY: ExpBkRmtTy,
     }
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + DataVal,
         success: function (d) {
             //
             if (d != "") {
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);
                 if (rowData[0].G22_IND != null && rowData[0].G22_IND != "") ExpBkG22_IND = $.trim(rowData[0].G22_IND);                 
                 if (rowData[0].DEF_TARIFF_CHRG_ID != null) ExpBkHH = $.trim(rowData[0].DEF_TARIFF_CHRG_ID);
                 if (rowData[0].D21_IND != null && rowData[0].D21_IND != "") ExpBkD21_IND = $.trim(rowData[0].D21_IND);
                 if (rowData[0].Q24_IND != null && rowData[0].Q24_IND != "") ExpBkQ24_IND = $.trim(rowData[0].Q24_IND);
                 if (rowData[0].TARIFF_EDIT_IND != null && rowData[0].TARIFF_EDIT_IND != "") ExpBkModify_Tariff = $.trim(rowData[0].TARIFF_EDIT_IND);
                 if (rowData[0].Q19_IND != null && rowData[0].Q19_IND != "") ExpBk_Tariff_Edit_Plan_Appl = $.trim(rowData[0].Q19_IND);
                 if (rowData[0].F19_IND != null && rowData[0].F19_IND != "") ExpBkF19_IND = $.trim(rowData[0].F19_IND);
                 if (rowData[0].UPGRADE_APPL_IND != null && rowData[0].UPGRADE_APPL_IND != "") ExpBkUpgrade_Appl_Ind = $.trim(rowData[0].UPGRADE_APPL_IND);
                 if (rowData[0].MARKET_MAND_IND != null && rowData[0].MARKET_MAND_IND != "") ExpBkMarket_Mand_Ind = $.trim(rowData[0].MARKET_MAND_IND);
                 if (rowData[0].GUEST_TY_IND != null && rowData[0].GUEST_TY_IND != "") ExpBkGuest_Ty_Ind = $.trim(rowData[0].GUEST_TY_IND);  
                 if (rowData[0].A17_IND != null && rowData[0].A17_IND != "") ExpBkA17_IND = $.trim(rowData[0].A17_IND);  
                 if (rowData[0].Z19_IND != null && rowData[0].Z19_IND != "") ExpBk_RSRAPPL = rowData[0].Z19_IND.toString().trim();  
                     
                 
                 
             }
         },
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
     }
     else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
     $.ajax(params);

 };
 function FnExBkLoadFoCont() {
     //
     var rowData = [];
     ExpBkC3_IND = "0";
     ExpBkJ1_IND = "0";
     ExpBkJ11_IND = "0";
     ExpBkC1_NR = "";
     ExpBkC2_NR = "";
     ExpBkC3_NR = "";
     ExpBkR11_IND = "0";
     ExpBkSingleConsTariff = "0";
     ExpBkNew_Packg_Appl = "0";
     ExpBkS14IND = "0";
     ExpBkT3_IND = "0";
     Request = {
         REQTYPE: "GET_FOCONT",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         USRID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         CONN_STRING: ExpBkConnStr,
         PROPID: ExpBkCompId,
         RMT_TY: ExpBkRmtTy,
     }
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + DataVal,
         success: function (d) {
             //
             if (d != "") {
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);                 
                 if (rowData[0].C3_IND != null && rowData[0].C3_IND != "") ExpBkC3_IND = $.trim(rowData[0].C3_IND);
                 if (rowData[0].J1_IND != null && rowData[0].J1_IND != "") ExpBkJ1_IND = $.trim(rowData[0].J1_IND);
                 if (rowData[0].C1_NR != null && rowData[0].C1_NR != "") ExpBkC1_NR = $.trim(rowData[0].C1_NR);
                 if (rowData[0].C2_NR != null && rowData[0].C2_NR != "") ExpBkC2_NR = $.trim(rowData[0].C2_NR);
                 if (rowData[0].C3_NR != null && rowData[0].C3_NR != "") ExpBkC3_NR = $.trim(rowData[0].C3_NR);
                 if (rowData[0].NN_IND != null && rowData[0].NN_IND != "") ExpBkNN_IND = $.trim(rowData[0].NN_IND);
                 if (rowData[0].R11_IND != null && rowData[0].R11_IND != "") ExpBkR11_IND = $.trim(rowData[0].R11_IND);
                 if (rowData[0].E14_IND != null && rowData[0].E14_IND != "") ExpBkSingleConsTariff = $.trim(rowData[0].E14_IND);
                 if (rowData[0].M10_IND != null && rowData[0].M10_IND != "") ExpBkNew_Packg_Appl = $.trim(rowData[0].M10_IND);  
                 if (rowData[0].S14_IND != null && rowData[0].S14_IND != "") ExpBkS14IND = $.trim(rowData[0].S14_IND);
                 //if (rowData[0].FF_IND != null && rowData[0].FF_IND != "") ExpBkFF_IND = $.trim(rowData[0].FF_IND); 
                 if (rowData[0].T3_IND != null && rowData[0].T3_IND != "") ExpBkT3_IND = $.trim(rowData[0].T3_IND); 
                 if (rowData[0].J11_IND != null && rowData[0].J11_IND != "") ExpBkJ11_IND = $.trim(rowData[0].J11_IND);

                 
                 
             }
         },
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
     }
     else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
     $.ajax(params);
 };

 function FnExBkLoadMenuUsrRight() {
    // 
     var rowData = [];
     ExpBk_USER_TARIFF_EDIT_IND = "0";
     Exp_USER_TARIFF_DISC_EDIT_IND = "0";
     Request = {
         REQTYPE: "GET_MENUUSERRIGHT",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         USRID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         CONN_STRING: ExpBkConnStr,
         PROPID: ExpBkCompId,
         RMT_TY: ExpBkRmtTy,
     }
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + DataVal,
         success: function (d) {
            // 
             if (d != "") {
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);
                 if (rowData.USER_TARIFF_EDIT_IND != null && rowData.USER_TARIFF_EDIT_IND != "") ExpBk_USER_TARIFF_EDIT_IND = $.trim(rowData.USER_TARIFF_EDIT_IND);                 
                 if (rowData.DEF_TARIFF_CHRG_ID != null && rowData.USER_TARIFF_DISC_EDIT_IND != "") Exp_USER_TARIFF_DISC_EDIT_IND = $.trim(rowData.USER_TARIFF_DISC_EDIT_IND);
             }
         },
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
     }
     else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
     $.ajax(params);

 };
 function fnExBkFloatText(code, e, vText, MaxLength, DecLength, CurPos) {
     //

     var NumLen = MaxLength - DecLength - 1;
     var charCode = e.which || e.keyCode;
     if (e.shiftKey == true) return false;
     if (e.ctrlKey == true) return false;
     var dotPos = vText.indexOf(".");
     if (dotPos != -1 && (charCode == 190 || charCode == 110)) return false;

     if ((charCode == 190 || charCode == 110) && DecLength == 0) return false;
     if (dotPos >= 0) {

         var vArr = vText.split('.');
         var afterPoint = vArr[1].toString().trim();
         var befPoint = vArr[0].toString().trim();

         if(charCode == 8 && CurPos == dotPos+1 && afterPoint.length>0) return false;
         if(charCode == 46 && CurPos == dotPos && afterPoint.length>0) return false;

         if (afterPoint.length == DecLength && CurPos > dotPos) {
             if ((charCode >= 96 && charCode <= 105) || (charCode >= 48 && charCode <= 57)) return false;
         }
         if (befPoint.length == NumLen && CurPos <= dotPos) if ((charCode >= 96 && charCode <= 105) || (charCode >= 48 && charCode <= 57)) return false;
     }
     else if (vText.length == NumLen) if ((charCode >= 96 && charCode <= 105) || (charCode >= 48 && charCode <= 57)) return false;

     if (charCode == 46 || charCode == 37 || charCode == 39 || charCode == 190 || charCode == 110) {
         return true;
     }
     if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
         return false;
     }
     else {
         //
         //if (e.target.selectionStart >= dotPos+3 && dotPos==3) {
         //    return false;
         //}
         //else
         return true;
     }
 };
 function fnExBkNumericText(code, e) {
     

     var charCode = e.which || e.keyCode;
     if (e.shiftKey == true) return false;
     if (e.ctrlKey == true) return false;
     if (charCode == 46 || charCode == 37 || charCode == 39) {
         return true
     }
     if (charCode > 31 && (charCode < 48 || (charCode > 57 && (charCode < 96 || charCode > 105)))) {
         return false;
     }
     else {
         
         return true;
     }
 };
 function fnDiscResPopWindowLoad() {
     webix.ui({
         view: "window",
         close: true,
         modal: true,
         id: "DiscDetResPop",
         head: "Discount Detail",
         position: "center",
         css: "WebIxStyle",
         height: 200,
         width: 380,
         move: true,
         body: {
             padding: { top: 10, left: 10, bottom: 20, right: 10 },
             rows: [
                     {
                         view: "richselect", id: "ddlDiscTypeResPop", label: "Discount Type", labelWidth: 120, required: true,
                         on: {
                             onChange: function (NewVal,OldVal) {
                                 $$("txtDiscReasResPop").setValue($$("ddlDiscTypeResPop").getText());
                             }
                         }
                     },
                     { view: "textarea", id: "txtDiscReasResPop", label: "Discount Reason", labelWidth: 120, attributes: { maxlength: 80 }, required: true, },
                     {
                         cols: [{}, {
                             view: "button", type: "icon", id: "OkDiscResPop", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80,
                             click: function () {

                                 if ($$("ddlDiscTypeResPop").getValue() == "") {
                                     webix.message({ type: 'warning', text: "Discount Type cannot be empty" });
                                     webix.UIManager.setFocus($$("ddlDiscTypeResPop"))
                                     return false;
                                 }

                                 if (fnSqlInjectExpBk($$("txtDiscReasResPop").getValue().toString().trim(),ExpBkSTR_SANITIZE_IND) == "") {
                                     webix.message({ type: 'warning', text: "Discount Reason cannot be empty" });
                                     webix.UIManager.setFocus($$("txtDiscReasResPop"))
                                     return false;
                                 }

                                 $$("DiscDetResPop").hide();
                             }
                         }],
                     }
             ]
         }
     });
 };
 function FnExBkLoadMstInstCont() {
     //
     var rowData = [];
     ExpBkGstValInd = "0";
     ExpBkMailApplInd = "0"
     Request = {
         REQTYPE: "GET_MSTINSTCONT",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         USRID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         CONN_STRING: ExpBkConnStr,
         PROPID: ExpBkCompId,
         RMT_TY: ExpBkRmtTy,
     }
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + DataVal,
         success: function (d) {
             //
             if (d != "") {
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);
                 if (rowData[0].GST_VAL_IND != null && rowData[0].GST_VAL_IND != "") ExpBkGstValInd = $.trim(rowData[0].GST_VAL_IND);
             }
         },
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
     }
     else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
     $.ajax(params);
 };
 function FnExBkLoadMstCompany() {
     //
     var rowData = [];
     ExpBkBasCurrId = "";
     ExpBkCurDecLmt = 0;
     ExpBkSTR_SANITIZE_IND = "0";
     Request = {
         REQTYPE: "GET_MSTCOMPANY",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         USRID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         CONN_STRING: ExpBkConnStr,
         PROPID: ExpBkCompId,
         RMT_TY: ExpBkRmtTy,
     }
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + DataVal,
         success: function (d) {
             //
             if (d != "") {
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);
                 if (rowData[0].BASE_CURRENCY_ID != null && rowData[0].BASE_CURRENCY_ID != "") ExpBkBasCurrId = rowData[0].BASE_CURRENCY_ID.toString().trim();
                 if (rowData[0].VAL_DECIM_LIMIT != null && rowData[0].VAL_DECIM_LIMIT != "") ExpBkCurDecLmt = rowData[0].VAL_DECIM_LIMIT.toString().trim();
                 if (rowData[0].STR_SANITIZE_IND != null && rowData[0].STR_SANITIZE_IND != "") ExpBkSTR_SANITIZE_IND = rowData[0].STR_SANITIZE_IND.toString().trim();
             }
         },
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
     }
     else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
     $.ajax(params);
 };

 function ExpBkLoadCurrDec(CurrencyId) {
     //
     var rowDatad = [];
     
     ExpBkCurDecLmt = 0;     
     if (CurrencyId == "") return false;
     Request = {
         REQTYPE: "GET_FNCURRDEC",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         USRID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         CONN_STRING: ExpBkConnStr,
         CURRENCY: CurrencyId
     }
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         success: function (d) {
             if (d != "") {                 
                 if (BkAspxPage == true) rowDatad = JSON.parse(d.d);
                 else rowDatad = JSON.parse(d);
                 ExpBkCurDecLmt = rowDatad;
             }
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
         }
     };

     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
     }
     else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
     $.ajax(params);


 };
 function fnExBkRoutingShow() {
     
     var Mode = "";
     var TRF = "";
     var DiscPer = "";
     var DiscAmt = ""; var Comp = ""; var Trv = ""; var PID = ""; var TrvID = "";
     var RNo = ExpBkR_NO == null ? "" : ExpBkR_NO;
     var Crs_no = ExpBkRESERVE_NO == null ? "" : ExpBkRESERVE_NO;
     //var GId = $$("GuestId").getValue() == null ? "" : $$("GuestId").getValue();
     var stDt = $$("ArrivalBK").getText();
     var enDt = $$("DepatureBK").getText();
     //var GNm1 = $$("LastNMBK").getValue();
     //var GNm2 = "";
     var RmTy = $$("RoomTypeBK").getValue();
     var SrcID = ""; var SrcNm = ""; var indx = 1;
     Trv = $$("TRVAGNTBK").getValue();
     TrvID = $$("TRVAGNTIDBK").getValue();

     SrcID = $$("BUSSOURCEIDBK").getValue();
     SrcNm = $$("BUSSOURCEIDBK").getText();
     //SrcNm = $$("SOURCEBK").getValue();

     var GstData = $$("gridGstExpBk").serialize();     
     if (GstData.length == 0) {         
         webix.message({ type: 'warning', text: "Guest Details cannot be empty." });
         $$("gridGstExpBk").select(grdFirstId, "LAST_NM")
         webix.UIManager.setFocus($$("gridGstExpBk"));
         return false;
     }
     var grdFirstId = $$("gridGstExpBk").getFirstId();

     var GId = GstData[0].GUEST_ID == null ? "" : GstData[0].GUEST_ID.toString().trim();
     var GNm1 = GstData[0].LAST_NM == null ? "" : GstData[0].LAST_NM.toString().trim();
     var GNm2 = GstData[0].FIRST_NM == null ? "" : GstData[0].FIRST_NM.toString().trim();
     var Tittle = GstData[0].TITTLE == null ? "" : GstData[0].TITTLE.toString().trim();


     var PageId = "TC"; var apiCallUrl = ExpBkApiUrl; var IsAspx = BkAspxPage; var whichform = "RESERVE";

     if ($$("TariffBK").getValue() != undefined && $$("TariffBK").getValue() != null) TRF = $$("TariffBK").getValue();
     if ($$("DiscBK").getValue() != undefined && $$("DiscBK").getValue() != null) DiscPer = $$("DiscBK").getValue();
     if ($$("AmountBK").getValue() != undefined && $$("AmountBK").getValue() != null) DiscAmt = $$("AmountBK").getValue();
     
     Mode = ExpBkMode;
     //if (ExpBkRESERVE_NO != undefined && ExpBkRESERVE_NO != null && ExpBkRESERVE_NO != "") {
     //    Mode = "OPEN";
     //}
     //else {
     //    Mode = "NEW";
     //}

     if (Tittle == "") {
         webix.message({ type: 'warning', text: "Tittle cannot be empty." });
         $$("gridGstExpBk").select(grdFirstId,"TITTLE")
         webix.UIManager.setFocus($$("gridGstExpBk"));
         return false;
     }
     //var Title = $$("TitleBK").getText();

     var TittleNm = "";
     var newData = ExpBkTitle.filter(function (el) {
         return el.id == Tittle;
     });
     if (newData.length > 0) {
         TittleNm = newData[0].value;
     }

     if (GNm1 == null || GNm1 == "") {
         webix.message({ type: 'warning', text: "Last Name cannot be empty." });
         $$("gridGstExpBk").select(grdFirstId, "LAST_NM")
         webix.UIManager.setFocus($$("gridGstExpBk"));
         return false;
     }
     if (GId == "") {
         webix.message({ type: 'warning', text: "Create Guest Profile" });
         $$("gridGstExpBk").select(grdFirstId, "LAST_NM")
         webix.UIManager.setFocus($$("gridGstExpBk"));
         fnShowDupGst();
         return false;
     }
     if (TRF == "") {
         webix.message({ type: 'warning', text: "Tariff cannot be empty" });
         return false;
     }

     var usrTyId = "N";

     PID = $$("CompanyidBK").getValue();
     Comp = $$("CompanyBK").getValue();

     var Routprv = "";
     var show = "show";
     RoutingPopUpShowFn(RNo, Crs_no, GId, GNm1, GNm2, stDt, enDt, Comp, Trv, PID, TrvID, SrcID, SrcNm, indx, Routprv, RmTy, TittleNm, Mode, ExpBkConnStr, ExpBkUserId, ExpBkCompId, usrTyId, show, PageId, apiCallUrl, IsAspx, whichform, "");

 }; 
 function fnExBkTariffShow(SaveAuto, BefSave) {

     
     
     SaveAuto = SaveAuto || "0";
     BefSave = BefSave || "0";
     var COMPLIMENTARY = "0";   

     var Mode = "";
     var TRF = "";
     var DiscPer = "";
     var DiscAmt = ""; var Comp = ""; var Trv = ""; var PID = ""; var TrvID = "";
     var RNo = ExpBkR_NO == null ? "" : ExpBkR_NO;
     var Crs_no = ExpBkRESERVE_NO == null ? "" : ExpBkRESERVE_NO;
     var GId = $$("GuestId").getValue() == null ? "" : $$("GuestId").getValue();
     var stDt = $$("ArrivalBK").getText();
     var enDt = $$("DepatureBK").getText();
     //var GNm1 = $$("LastNMBK").getValue();
     var Routprv = "";
     var show = "show";
     var sRateTy = $$("RateCodeidBK").getValue();
     var sRateTyNm = $$("RateCodeBK").getValue();
     var sRmTy = $$("RoomTypeBK").getValue();
     var sRmTyNm = $$("RoomTypeBK").getText(); 
     if(ExpBkUpgrade_Appl_Ind == "1"){
         if ($$("ddlRmUpgrdExpBk").getValue() != null && $$("ddlRmUpgrdExpBk").getValue() != "" && $$("ddlRmUpgrdExpBk").getValue() != "#N#"){
             sRmTy = $$("ddlRmUpgrdExpBk").getValue();
             sRmTyNm = $$("ddlRmUpgrdExpBk").getText();
         }
     }
     var GNm2 = "";
     var SrcID = ""; var SrcNm = ""; var indx = 1;
     Trv = $$("TRVAGNTBK").getValue();
     TrvID = $$("TRVAGNTIDBK").getValue();
     SrcID = $$("BUSSOURCEIDBK").getValue();
     SrcNm = $$("BUSSOURCEIDBK").getText();
     //SrcNm = $$("SOURCEBK").getValue();     
     var str1 = $$("HHMMBK1").getValue();     
     var str2 = $$("HHMMBK2").getValue();

     var TARIFF_APPL_IND = "0";
     if ($$("ddlGuestTyBk").getValue() != "") {
         var vData = $$("ddlGuestTyBk").getPopup().getList().serialize();
         if (vData.length > 0) {
             var newData = vData.filter(function (el) {
                 return el.id == $$("ddlGuestTyBk").getValue();
             });
             if (newData.length > 0) TARIFF_APPL_IND = newData[0].TARIFF_APPL_IND;                      

         }
     }
     

     if (sRmTy == "") {
         webix.message({ type: 'warning', text: "Room Type cannot be empty" });         
         return false;
     }     
     if (sRateTy == "") {
         webix.message({ type: 'warning', text: "Rate Code cannot be empty" });
         webix.UIManager.setFocus("RateCodeBK");
         return false;
     }
     
     if (str1 == null || str1 == "") {         
         webix.message({ type: 'warning', text: "Arrival Time cannot be empty" });
         webix.UIManager.setFocus("HHMMBK1");
         return false;
     }

     if (str1.length < 4) {
         webix.message({ type: 'warning', text: "Arrival Time is invalid format." });         
         webix.UIManager.setFocus("HHMMBK1");
         return false;
     }

     var res11 = str1.substr(0, 2);
     var res12 = str1.substr(2, 2);
     var ArrTm = res11 + ':' + res12;
     var valid = (ArrTm.search(/^\d{2}:\d{2}$/) != -1) &&
             (ArrTm.substr(0, 2) >= 0 && ArrTm.substr(0, 2) <= 23) &&
             (ArrTm.substr(3, 2) >= 0 && ArrTm.substr(3, 2) <= 59);

     if (valid == false) {
         webix.message({ type: 'warning', text: "Arrival Time is invalid format." });
         webix.UIManager.setFocus("HHMMBK1");
         return false;
     }    
         
     if (str2 == null || str2 == "") {
         webix.message({ type: 'warning', text: "Departure Time cannot be empty." });         
         webix.UIManager.setFocus("HHMMBK2");
         return false;
     }
     if (str2.length < 4) {         
         webix.message({ type: 'warning', text: "Departure Time is invalid format." });
         webix.UIManager.setFocus("HHMMBK2");
         return false;
     }
     var res21 = str2.substr(0, 2);
     var res22 = str2.substr(2, 2);
     var DepTm = res21 + ':' + res22

     var valid = (DepTm.search(/^\d{2}:\d{2}$/) != -1) &&
             (DepTm.substr(0, 2) >= 0 && DepTm.substr(0, 2) <= 23) &&
             (DepTm.substr(3, 2) >= 0 && DepTm.substr(3, 2) <= 59);

     if (valid == false) {
         webix.message({ type: 'warning', text: "Departure Time is invalid format." });
         webix.UIManager.setFocus("HHMMBK2");
         return false;
     }     

     if ($$("TariffBK").getValue() != undefined && $$("TariffBK").getValue() != null) TRF = $$("TariffBK").getValue();
     if ($$("DiscBK").getValue() != undefined && $$("DiscBK").getValue() != null) DiscPer = $$("DiscBK").getValue();
     if ($$("AmountBK").getValue() != undefined && $$("AmountBK").getValue() != null) DiscAmt = $$("AmountBK").getValue();
     //if (ExpBkRESERVE_NO != undefined && ExpBkRESERVE_NO != null && ExpBkRESERVE_NO != "") {
     //    Mode = "OPEN";
     //}
     //else {
     //    Mode = "NEW";
     //}   

     Mode = ExpBkMode;
     
     if (TRF == "") {
         webix.message({ type: 'warning', text: "Tariff cannot be empty" });
         return false;
     }


     PID = $$("CompanyidBK").getValue();
     Comp = $$("CompanyBK").getValue();
     var vCurrency = $$("BKCURRENCY_ID").getValue();
     var DiscType = $$("ddlDiscTypeResPop").getValue();
     var DiscRs = $$("txtDiscReasResPop").getValue();     
     var vChild = 0;
     var vChild2 = 0;
     var vChild3 = 0;
     var vAdult = 0;
     var vInfant = 0;
     if ($$("ChildBK").getValue() != null && $$("ChildBK").getValue() != "") vChild = $$("ChildBK").getValue();
     if ($$("ChildBK2").getValue() != null && $$("ChildBK2").getValue() != "") vChild2 = $$("ChildBK2").getValue();
     if ($$("ChildBK3").getValue() != null && $$("ChildBK3").getValue() != "") vChild3 = $$("ChildBK3").getValue();
     if ($$("AdultBK").getValue() != null && $$("AdultBK").getValue() != "") vAdult = $$("AdultBK").getValue();
     if ($$("InfantBK").getValue() != null && $$("InfantBK").getValue() != "") vInfant = $$("InfantBK").getValue();

     if (vAdult == 0 && vChild == 0 && vChild2 == 0 && vChild3 == 0) {
         webix.message({ type: 'warning', text: "Adult cannot be empty." });
         webix.UIManager.setFocus($$("AdultBK"));
         return false;
     }    
     ExpBk_USER_TARIFF_EDIT_IND = "0";
     Exp_USER_TARIFF_DISC_EDIT_IND = "0";

     var sRateCat = "";
     if (ExpBkRateType.length > 0) {
         var newData = ExpBkRateType.filter(function (el) {
             return el.RATE_TY_ID == sRateTy;
         });
         if (newData.length > 0) sRateCat = newData[0].RATE_CAT;
     }

     var TotPax = parseInt(vAdult) + parseInt(vChild) + parseInt(vChild2) + parseInt(vChild3);
     if (ExpBkR11_IND == "1") vAdult = fnCheckAdultChild(vAdult, parseInt(vChild) + parseInt(vChild2) + parseInt(vChild3));

     var Tariff_Count = ExpBkfnGetNewTariffCount($.trim(sRmTy), $.trim(TotPax), $.trim(vCurrency), $.trim(sRateTy), $.trim(stDt), $.trim(vAdult), ExpBkR11_IND, ExpBkD21_IND)
     
     if (BefSave == "1") {
         fnTariffLoad(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, BkAspxPage, Crs_no, sRmTy, sRmTyNm, sRateTy, sRateTyNm, stDt, ArrTm, enDt, DepTm, vCurrency,
             Tariff_Count, TRF, ExpBkHH, TotPax, vAdult, vChild, vChild2, vChild3, true, ExpBkbTariffEditModified, "", sRateCat, ExpBk_USER_TARIFF_EDIT_IND, Exp_USER_TARIFF_DISC_EDIT_IND, DiscPer, DiscAmt, DiscRs, DiscType, TARIFF_APPL_IND, "0", "0", ExpBkAdrsTariff);
         if (SaveAuto == "1") {
            return fnTarEditSaveTE();
         }
         $$("TEbtnCancel").enable();
     }
     else {
        webix.extend($$("frmBkCreat"), webix.OverlayBox);
        $$("frmBkCreat").showOverlay(PrgStr);
        setTimeout(function () {
            fnTariffLoad(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, BkAspxPage, Crs_no, sRmTy, sRmTyNm, sRateTy, sRateTyNm, stDt, ArrTm, enDt, DepTm, vCurrency,
             Tariff_Count, TRF, ExpBkHH, TotPax, vAdult, vChild, vChild2, vChild3, true, ExpBkbTariffEditModified, "", sRateCat, ExpBk_USER_TARIFF_EDIT_IND, Exp_USER_TARIFF_DISC_EDIT_IND, DiscPer, DiscAmt, DiscRs, DiscType, TARIFF_APPL_IND, "0", "0", ExpBkAdrsTariff);
            if (SaveAuto == "1") fnTarEditSaveTE();
            $$("frmBkCreat").hideOverlay();
            $$("TEbtnCancel").enable();
        }, 0);
     }    
    
 };
 function fnExpBkRetainGuestDet(GstId, Fnm, Lnm, Title, Mob, Eml,NewGst) {
     

     var RetItemId = $$("gridGstExpBk").getSelectedId(false);
     var RetRow = RetItemId.row;
     var RetItem = $$("gridGstExpBk").getItem(RetItemId);
     
     RetItem.LAST_NM = Lnm;
     RetItem.FIRST_NM = Fnm;
     RetItem.GUEST_ID = GstId;
     RetItem.TITTLE = Title.toString().trim();
     $$("gridGstExpBk").updateItem(RetRow, RetItem);
     $$("gridGstExpBk").refresh(RetRow);


     //$$("LastNMBK").setValue(Lnm);
     //$$("FirstNMBK").setValue(Fnm);
     //$$("TitleBK").setValue($.trim(Title));
     //$$("GuestId").setValue($.trim(GstId));
     ////$$("MobileBK").setValue($.trim(MOBILE));
     ////$$("EMailBK").setValue($.trim(EMAIL));

     //$$('FirstNMBK').define("readonly", true);
     //webix.html.addCss($$("FirstNMBK").getNode(), "ReadOnlyText");
     //$$('FirstNMBK').refresh()
     //$$('LastNMBK').define("readonly", true);
     //webix.html.addCss($$("LastNMBK").getNode(), "ReadOnlyText");
     //$$('LastNMBK').refresh();
     //$$('TitleBK').define("readonly", true);
     //webix.html.addCss($$("TitleBK").getNode(), "ReadOnlyText");
     //$$('TitleBK').refresh();
     var RowNo = $$("gridGstExpBk").getIndexById(RetRow);
     if (RowNo == 0) {         
         //fnGetUpdateMarketSegment();
         if (NewGst == "0") FoGuestVisitPopupLoadCom(ExpBkCompId, ExpBkUserId, ExpBkConnStr, ExpBkPageId, ExpBkApiUrl, BkAspxPage, $.trim(GstId));
         else fnGetUpdateMarketSegment();
     }     
     //fnGetUpdateMarketSegment();
     
 };

 function fnExpBkGuestProfRet(GstId, Fnm, Lnm, Title) {
     

     var RetItemId = $$("gridGstExpBk").getSelectedId(false);
     var RetRow = RetItemId.row;
     var RetItem = $$("gridGstExpBk").getItem(RetItemId);
     var F_Ind = RetItem.F_IND;
     var DF_Ind = RetItem.DF_IND;
     if (F_Ind == "2" || DF_Ind == "2") {
         webix.message("Flight Details will be retained")
     }

     RetItem.LAST_NM = Lnm;
     RetItem.FIRST_NM = Fnm;
     RetItem.GUEST_ID = GstId;
     RetItem.TITTLE = Title.toString().trim();
     $$("gridGstExpBk").updateItem(RetRow, RetItem);
     $$("gridGstExpBk").refresh(RetRow);


     //$$("LastNMBK").setValue(Lnm);
     //$$("FirstNMBK").setValue(Fnm);
     //$$("TitleBK").setValue($.trim(Title));
     //$$("GuestId").setValue($.trim(GstId));
     ////$$("MobileBK").setValue($.trim(MOBILE));
     ////$$("EMailBK").setValue($.trim(EMAIL));

     //$$('FirstNMBK').define("readonly", true);
     //webix.html.addCss($$("FirstNMBK").getNode(), "ReadOnlyText");
     //$$('FirstNMBK').refresh()
     //$$('LastNMBK').define("readonly", true);
     //webix.html.addCss($$("LastNMBK").getNode(), "ReadOnlyText");
     //$$('LastNMBK').refresh();
     //$$('TitleBK').define("readonly", true);
     //webix.html.addCss($$("TitleBK").getNode(), "ReadOnlyText");
     //$$('TitleBK').refresh();

     var RowNo = $$("gridGstExpBk").getIndexById(RetRow);
     if (RowNo == 0) {
         fnGetUpdateMarketSegment();
     }
     //fnGetUpdateMarketSegment();
     
 };

 function fnCheckAdultChild(iadult, iChild) {
     
     var rAdult = 0;
     if ((iadult == 1 || iadult == 0) && iChild > 0) {
         if (ExpBkQ24_IND == "4") {
             if ((parseInt(iadult) + parseInt(iChild)) > 3) {
                 rAdult = 4;
             }
             else if ((parseInt(iadult) + parseInt(iChild)) > 2) {
                 rAdult = 3;
             }
             else if ((parseInt(iadult) + parseInt(iChild)) > 1) {
                 rAdult = 2;
             }
             else rAdult = 1;

         }
         else if (ExpBkQ24_IND == "3") {
             if ((parseInt(iadult) + parseInt(iChild)) > 2) {
                 rAdult = 3;
             }
             else if ((parseInt(iadult) + parseInt(iChild)) > 1) {
                 rAdult = 2;
             }
             else rAdult = 1;

         }
         else if (ExpBkQ24_IND == 2) {
             if ((parseInt(iadult) + parseInt(iChild)) > 1) rAdult = 2;
             else rAdult = 1;
         }
         else rAdult = 1;

     }
     else rAdult = iadult;


     return rAdult;
 };

 function ExpBkfnGetNewTariffCount(RmTy, TotPax, BasCurrId, RateTy, stDt, vAdult, R11_IND, D21_IND) {
     
     
     var rowData = [];
     var RetTarCnt = "0";
     Request = {
         REQTYPE: "GET_FNGETNEWTARIFFCOUNT",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         RM_TY:RmTy,
         PAX : TotPax,
         CURRENCY : BasCurrId,
         RT_TY : RateTy,
         ADULT : vAdult,
         ARR_DT : stDt,
         R11_IND : R11_IND,
         D21_IND:D21_IND
         
     }     
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + DataVal,
         success: function (d) {
             
             if (d != "") {
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);
                 RetTarCnt = rowData;
                 
             }
         },
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "FO_URL", ApiControler: "TariffEdit/GetFoJsonReq" });
     }
     else params.data = "request=" + DataVal + "&URL= FO_URL&ApiControler=TariffEdit/GetFoJsonReq";
     $.ajax(params);

     return RetTarCnt;

 };

 function fnRetToFromPage(adrsTmp, TPx, btariffMod) {
     
     ExpBkAdrsTariff = webix.copy(adrsTmp);
     ExpBkbTariffEditModified =btariffMod;
     var vTariff = 0;
     var PlnId = "";
     var PlnAdultRate = "";
     var PlnCh1Rate = "";
     var PlnCh2Rate = "";
     var PlnCh3Rate = "";
     var DISCAMT = "";
     var DiscPer = "";
     var DiscRsn = "";
     var DiscTyp = "";
     var vPlanNm = "";
     var vCurrency = $$("BKCURRENCY_ID").getValue();
     if (ExpBkAdrsTariff.length > 0) {
         if (TPx == 1)  vTariff = ExpBkAdrsTariff[0].T1_AMT;
         else if (TPx == 2) vTariff = ExpBkAdrsTariff[0].T2_AMT;         
         else if (TPx == 3) vTariff = ExpBkAdrsTariff[0].T3_AMT;                  
         else if (TPx == 4) vTariff = ExpBkAdrsTariff[0].T4_AMT;                  
         else if (TPx == 5 && ExpBkD21_IND == "1") vTariff = ExpBkAdrsTariff[0].T5_AMT;                  
         else if (TPx == 6 && ExpBkD21_IND == "1") vTariff = ExpBkAdrsTariff[0].T6_AMT;        
         else if (TPx == 0) vTariff = ExpBkAdrsTariff[0].T1_AMT;

         if(vTariff ==undefined || vTariff == null || vTariff == "") vTariff = 0;

         $$("TariffBK").setValue(parseFloat(vTariff).toFixed(ExpBkCurDecLmt));

         DISCAMT = ExpBkAdrsTariff[0].D_AMT;
         DiscPer = ExpBkAdrsTariff[0].D_PER;
         DiscRsn = ExpBkAdrsTariff[0].D_R;
         DiscTyp = ExpBkAdrsTariff[0].D_TY;

         $$("DiscBK").blockEvent();
         $$("AmountBK").blockEvent();
         $$("DiscBK").setValue('');
         $$("AmountBK").setValue('');
         $$("DiscDetBK_Btn").hide();
         var bDisc = "0";
         if (DiscPer != null && DiscPer != "") {
             $$("DiscBK").setValue(parseFloat(DiscPer).toFixed(ExpBkCurDecLmt));
             $$("DiscDetBK_Btn").show();
             bDisc = "1";
         }
         if (DISCAMT != null && DISCAMT != "") {
             $$("DiscDetBK_Btn").show();
             $$("AmountBK").setValue(parseFloat(DISCAMT).toFixed(ExpBkCurDecLmt));
             bDisc = "1";
         }
         $$("DiscBK").unblockEvent();
         $$("AmountBK").unblockEvent();

         if (bDisc == "1") {
             $$("ddlDiscTypeResPop").blockEvent();
             if (DiscTyp != null && DiscTyp != "") $$("ddlDiscTypeResPop").setValue($.trim(DiscTyp));
             $$("ddlDiscTypeResPop").unblockEvent();
             if (DiscRsn != null) $$("txtDiscReasResPop").setValue($.trim(DiscRsn));
         }         

         
         
         //if (ExpBk_Tariff_Edit_Plan_Appl == "1") {
         //    PlnId = ExpBkAdrsTariff[0].P_I;
         //    PlnAdultRate = ExpBkAdrsTariff[0].A_P;
         //    PlnCh1Rate = ExpBkAdrsTariff[0].C1_P;
         //    PlnCh2Rate = ExpBkAdrsTariff[0].C2_P;
         //    PlnCh3Rate = ExpBkAdrsTariff[0].C3_P;

         //    $$("PlanAmtBK").setValue(PlnAdultRate);
         //    $$("PlanChild1Bk").setValue(PlnCh1Rate);
         //    $$("PlanChild2Bk").setValue(PlnCh2Rate);
         //    $$("PlanChild3Bk").setValue(PlnCh3Rate);

         //    if (PlnId != "") vPlanNm = fnSetPlanNameExpBk(PlnId, vCurrency);
         //    $$("PlanBK").setValue(vPlanNm);
         //    //$("#PlanID").val(PlnId);
         //    ExpBkPlanId = PlnId;

         //}
         

     }     
         
     fnClearTariffData();        
     

 };

 function fnSaveTarEditExpBk(RES_NO,ARR_DT,DEP_DT,D_TM,CURRENCY,RM_TY,RATE_TY,RATE_CAT,TARIFF_COUNT,MODE) {
         
    
     var rowData = [];    
     if (ExpBkAdrsTariff.length > 0) {
         $.each(ExpBkAdrsTariff, function (key, sVal) {
             //
             $.each(sVal, function (key, value) {
                 //
                 if (value != null && value != undefined) sVal[key] = value.toString();
                 else sVal[key] = "";
             });
         });
     }
     Request = {
         REQTYPE: "GET_FNSAVETARIFFEDIT",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,        
         RM_TY: RM_TY,
         RATE_TY:RATE_TY,
         RES_NO:RES_NO,
         ARR_DT:ARR_DT,
         DEP_DT:DEP_DT,
         D_TM:D_TM,
         CURRENCY:CURRENCY,
         TPx:TARIFF_COUNT,
         AdrsTmp:ExpBkAdrsTariff,
         D21_IND:ExpBkD21_IND,
         TariffEditPlanInd: ExpBk_Tariff_Edit_Plan_Appl,
         TariffEditModified : ExpBkbTariffEditModified == false?"0":"1"
     }

     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + DataVal,
         success: function (d) {
             
             if (d != "") {
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);                

             }
         },
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "FO_URL", ApiControler: "TariffEdit/GetFoJsonReq" });
     }
     else params.data = "request=" + DataVal + "&URL= FO_URL&ApiControler=TariffEdit/GetFoJsonReq";
     $.ajax(params);
 };
 
 function fnGetTariffDataExpBk(ResNo) {

     ExpBkAdrsTariff = [];
     var rowData = [];
     Request = {
         REQTYPE: "GET_FNGETTARIFFDATA",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         RES_NO:ResNo
     }

     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + DataVal,
         success: function (d) {
             
             if (d != "") {
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);

             }
         },
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "FO_URL", ApiControler: "TariffEdit/GetFoJsonReq" });
     }
     else params.data = "request=" + DataVal + "&URL= FO_URL&ApiControler=TariffEdit/GetFoJsonReq";
     $.ajax(params);

     ExpBkAdrsTariff = rowData;

     fnClearTariffData();

 };

 function fnClearTariffData() {

     if (ExpBkAdrsTariff.length > 0) {
         webix.html.addCss($$("btnTarEditExpBk").getNode(), "BtnClr");
         $$("btnTarEditExpBk").refresh();
         $$('DiscBK').define("readonly", true);
         webix.html.addCss($$("DiscBK").getNode(), "ReadOnlyText");
         $$('DiscBK').refresh();

         $$('AmountBK').define("readonly", true);
         webix.html.addCss($$("AmountBK").getNode(), "ReadOnlyText");
         $$('AmountBK').refresh();
         $$("DiscDetBK_Btn").disable();
     }
     else {
         webix.html.removeCss($$("btnTarEditExpBk").getNode(), "BtnClr");
         $$("btnTarEditExpBk").refresh();

         $$('DiscBK').define("readonly", false);
         webix.html.removeCss($$("DiscBK").getNode(), "ReadOnlyText");
         $$('DiscBK').refresh()

         $$('AmountBK').define("readonly", false);
         webix.html.removeCss($$("AmountBK").getNode(), "ReadOnlyText");
         $$('AmountBK').refresh();
         $$("DiscDetBK_Btn").enable();
     }

 };

 function fnSetPlanNameExpBk(PlanId,CurrId) {
     
     var vPlanNm = "";
     Request = {
         REQTYPE: "GET_FNRETPLANNM",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         PLANID: PlanId,
         CURRENCY:CurrId
     }
     var rowData = [];
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         success: function (d) {
             
             if (d != "") {
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);
                 //if (rowData.length>0) vPlanNm = rowData[0]["PLAN_NM"].toString().trim();
             }
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
         }
     }

     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "FO_URL", ApiControler: "TariffEdit/GetFoJsonReq" });
     }
     else params.data = "request=" + DataVal + "&URL= FO_URL&ApiControler=TariffEdit/GetFoJsonReq";
     $.ajax(params);

     return rowData;

 };

 function fnPkgRetToFromPage(adrsTmp) {
     
     ExpBkAdrsPK = webix.copy(adrsTmp);
     ExpBkbPckgChg = true;     
     var vCurrency = $$("BKCURRENCY_ID").getValue();
     
     if(ExpBkAdrsPK.length>0){
         webix.html.addCss($$("btnPkgExpBk").getNode(), "BtnClr");
         ExpBkBIND = "1";
     }
     else{
         webix.html.removeCss($$("btnPkgExpBk").getNode(), "BtnClr");
         ExpBkBIND = "";
     }
     $$("btnPkgExpBk").refresh();
 };

 function fnComplNarPopWindowLoad() {
     webix.ui({
         view: "window",
         close: true,
         modal: true,
         id: "ComplNarPop",
         head: "Compliment Narration",
         position: "center",
         css: "WebIxStyle",
         height: 200,
         width: 380,
         move: true,
         body: {
             padding: { top: 10, left: 10, bottom: 20, right: 10 },
             rows: [
                    
                     { view: "text", id: "txtComplNarrPop", labelPosition: "top", label: "Compliment/HouseUse Narration", labelWidth: 150, attributes: { maxlength: 60 }, required: true, },
                     {
                         cols: [{}, {
                             view: "button", type: "icon", id: "OkComplNarPop", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80,
                             click: function () {

                                
                                 if (fnSqlInjectExpBk($$("txtComplNarrPop").getValue().toString().trim(),ExpBkSTR_SANITIZE_IND) == "") {
                                     webix.message({ type: 'warning', text: "Narration cannot be empty" });
                                     webix.UIManager.setFocus($$("txtComplNarrPop"))
                                     return false;
                                 }

                                 $$("ComplNarPop").hide();
                             }
                         }],
                     }
             ]
         }
     });
 };

 function fnExpBkPaxChange() {
     var vChild = 0;
     var vChild2 = 0;
     var vChild3 = 0;
     var vAdult = 0;
     if ($$("ChildBK").getValue() != null && $$("ChildBK").getValue() != "") vChild = $$("ChildBK").getValue();
     if ($$("ChildBK2").getValue() != null && $$("ChildBK2").getValue() != "") vChild2 = $$("ChildBK2").getValue();
     if ($$("ChildBK3").getValue() != null && $$("ChildBK3").getValue() != "") vChild3 = $$("ChildBK3").getValue();
     if ($$("AdultBK").getValue() != null && $$("AdultBK").getValue() != "") vAdult = $$("AdultBK").getValue();

     var TotPax = parseInt(vAdult) + parseInt(vChild) + parseInt(vChild2) + parseInt(vChild3);

     return TotPax;


 };

 function fnExpBkGuestLoad() {
     
     var vChild = 0;
     var vChild2 = 0;
     var vChild3 = 0;
     var vAdult = 0;
     var vInfant = 0;
     if ($$("ChildBK").getValue() != null && $$("ChildBK").getValue() != "") vChild = $$("ChildBK").getValue();
     if ($$("ChildBK2").getValue() != null && $$("ChildBK2").getValue() != "") vChild2 = $$("ChildBK2").getValue();
     if ($$("ChildBK3").getValue() != null && $$("ChildBK3").getValue() != "") vChild3 = $$("ChildBK3").getValue();
     if ($$("AdultBK").getValue() != null && $$("AdultBK").getValue() != "") vAdult = $$("AdultBK").getValue();
     if ($$("InfantBK").getValue() != null && $$("InfantBK").getValue() != "") vInfant = $$("InfantBK").getValue();

     var TotPax = parseInt(vAdult) + parseInt(vChild) + parseInt(vChild2) + parseInt(vChild3);

     var ExtRows = $$("gridGstExpBk").serialize();
     var FTitle = ExpBkTitle[0].id;
     var vNewRows = [];
     var set = {};
     var GstNo = 0;
     var GstPax = 0;
     if (ExtRows.length > 0) {

         var vData = ExtRows.filter(function (el) {
             return el.INT_ID == "G" && el.CHECKIN_IND == "1";
         });
         TotPax = parseInt(TotPax) + parseInt(vData.length);

         if (TotPax > 0) {
             var GstData = ExtRows.filter(function (el) {
                 return el.INT_ID == "G";
             });

             if (GstData.length > 0) {
                 $.each(GstData, function (key, SRow) {
                     GstNo += 1;
                     GstPax += 1;
                     set = {
                         TYPE: SRow.TYPE, TITTLE: SRow.TITTLE, LAST_NM: SRow.LAST_NM, FIRST_NM: SRow.FIRST_NM, GUEST_ID: SRow.GUEST_ID, INT_ID: SRow.INT_ID, INF_IND: SRow.INF_IND, GUEST_SNO: SRow.GUEST_SNO, CHECKIN_IND: SRow.CHECKIN_IND,
                         F_IND: SRow.F_IND, AR_PR_FLNO: SRow.AR_PR_FLNO, AR_PR_DT: SRow.AR_PR_DT, AR_PR_TM: SRow.AR_PR_TM, AR_SEC_FLNO: SRow.AR_SEC_FLNO, AR_SEC_DT: SRow.AR_SEC_DT, AR_SEC_TM: SRow.AR_SEC_TM, AR_TR_FLNO: SRow.AR_TR_FLNO,
                         AR_TR_DT: SRow.AR_TR_DT, AR_TR_TM: SRow.AR_TR_TM, AR_AD_CHR: SRow.AR_AD_CHR, AR_CH_CHR: SRow.AR_CH_CHR, DF_IND: SRow.DF_IND, DP_PR_FLNO: SRow.DP_PR_FLNO,
                         DP_PR_DT: SRow.DP_PR_DT, DP_PR_TM: SRow.DP_PR_TM, DP_SEC_FLNO: SRow.DP_SEC_FLNO, DP_SEC_DT: SRow.DP_SEC_DT, DP_SEC_TM: SRow.DP_SEC_TM, DP_TR_FLNO: SRow.DP_TR_FLNO,
                         DP_TR_DT: SRow.DP_TR_DT, DP_TR_TM: SRow.DP_TR_TM, DP_AD_CHR: SRow.DP_AD_CHR, DP_CH_CHR: SRow.DP_CH_CHR
                     };
                     vNewRows.push(set);
                     if (TotPax - GstPax == 0) return false;
                 })
             }
         }
     }
     var PendPax = TotPax - GstPax;
     for (var i = 1; i <= PendPax; i++) {
         GstNo += 1;                  
         set = {
             TYPE: "Gst " + GstNo, TITTLE: FTitle, LAST_NM: "", FIRST_NM: "", GUEST_ID: "", INT_ID: "G", INF_IND: "0", GUEST_SNO: "", CHECKIN_IND: "0",
             F_IND: "0", AR_PR_FLNO: "", AR_PR_DT: "", AR_PR_TM: "", AR_SEC_FLNO: "", AR_SEC_DT: "", AR_SEC_TM: "", AR_TR_FLNO: "",
             AR_TR_DT: "", AR_TR_TM: "", AR_AD_CHR: "", AR_CH_CHR: "", DF_IND: "0", DP_PR_FLNO: "", DP_PR_DT: "", DP_PR_TM: "",
             DP_SEC_FLNO: "", DP_SEC_DT: "", DP_SEC_TM: "", DP_TR_FLNO: "", DP_TR_DT: "", DP_TR_TM: "", DP_AD_CHR: "", DP_CH_CHR: ""
         };
         vNewRows.push(set);
     }

     var InfPax = 0;
     var InfNo = 0;
     if (ExtRows.length > 0) {

         var vData = ExtRows.filter(function (el) {
             return el.INT_ID == "INF" && el.CHECKIN_IND == "1";
         });
         vInfant = parseInt(vInfant) + parseInt(vData.length);
         if (vInfant > 0) {
             var GstData = ExtRows.filter(function (el) {
                 return el.INT_ID == "INF";
             });
             if (GstData.length > 0) {
                 $.each(GstData, function (key, SRow) {
                     //InfPax += 1;
                     InfNo += 1;
                     InfPax += 1;
                     set = {
                         TYPE: SRow.TYPE, TITTLE: SRow.TITTLE, LAST_NM: SRow.LAST_NM, FIRST_NM: SRow.FIRST_NM, GUEST_ID: SRow.GUEST_ID, INT_ID: SRow.INT_ID, INF_IND: SRow.INF_IND, GUEST_SNO: SRow.GUEST_SNO, CHECKIN_IND: SRow.CHECKIN_IND,
                         F_IND: SRow.F_IND, AR_PR_FLNO: SRow.AR_PR_FLNO, AR_PR_DT: SRow.AR_PR_DT, AR_PR_TM: SRow.AR_PR_TM, AR_SEC_FLNO: SRow.AR_SEC_FLNO, AR_SEC_DT: SRow.AR_SEC_DT, AR_SEC_TM: SRow.AR_SEC_TM, AR_TR_FLNO: SRow.AR_TR_FLNO,
                         AR_TR_DT: SRow.AR_TR_DT, AR_TR_TM: SRow.AR_TR_TM, AR_AD_CHR: SRow.AR_AD_CHR, AR_CH_CHR: SRow.AR_CH_CHR, DF_IND: SRow.DF_IND, DP_PR_FLNO: SRow.DP_PR_FLNO,
                         DP_PR_DT: SRow.DP_PR_DT, DP_PR_TM: SRow.DP_PR_TM, DP_SEC_FLNO: SRow.DP_SEC_FLNO, DP_SEC_DT: SRow.DP_SEC_DT, DP_SEC_TM: SRow.DP_SEC_TM, DP_TR_FLNO: SRow.DP_TR_FLNO,
                         DP_TR_DT: SRow.DP_TR_DT, DP_TR_TM: SRow.DP_TR_TM, DP_AD_CHR: SRow.DP_AD_CHR, DP_CH_CHR: SRow.DP_CH_CHR
                     };
                     vNewRows.push(set);
                     if (vInfant - InfPax == 0) return false;
                 })
             }
         }
     }
     var PendInf = vInfant - InfPax;
     for (var i = 1; i <= PendInf; i++) {
         InfNo += 1;
         set = {
             TYPE: "Inf " + InfNo, TITTLE: FTitle, LAST_NM: "", FIRST_NM: "", GUEST_ID: "", INT_ID: "INF", INF_IND: "1", GUEST_SNO: "", CHECKIN_IND: "0",
             F_IND: "0", AR_PR_FLNO: "", AR_PR_DT: "", AR_PR_TM: "", AR_SEC_FLNO: "", AR_SEC_DT: "", AR_SEC_TM: "", AR_TR_FLNO: "",
             AR_TR_DT: "", AR_TR_TM: "", AR_AD_CHR: "", AR_CH_CHR: "",  DF_IND: "0", DP_PR_FLNO: "", DP_PR_DT: "", DP_PR_TM: "",
             DP_SEC_FLNO: "", DP_SEC_DT: "", DP_SEC_TM: "", DP_TR_FLNO: "", DP_TR_DT: "", DP_TR_TM: "", DP_AD_CHR: "", DP_CH_CHR: ""
         };
         vNewRows.push(set);
     }     
     $$("gridGstExpBk").clearAll()
     $$("gridGstExpBk").parse(vNewRows);
 }

 function fnExpBkLoadContextMenu(MasterGrid) {
          
     webix.ui({
         view: "contextmenu",
         id:"ExpBkConMenu",
         data: [],
         on: {
             onMenuItemClick: function (id) {
                 
                 var context = this.getContext();
                 var RowId = context.id.row;
                 var SelRow = MasterGrid.getItem(RowId);                 
                 
                 if (id == "1") {

                     SelRow.LAST_NM = "";
                     SelRow.FIRST_NM = "";
                     SelRow.GUEST_ID = "";
                     SelRow.F_IND = "0";
                     SelRow.AR_PR_FLNO = "";
                     SelRow.AR_PR_DT = "";
                     SelRow.AR_PR_TM = "";
                     SelRow.AR_SEC_FLNO = "";
                     SelRow.AR_SEC_DT = "";
                     SelRow.AR_SEC_TM = "";
                     SelRow.AR_TR_FLNO = "";
                     SelRow.AR_TR_DT = "";
                     SelRow.AR_TR_TM = "";
                     SelRow.AR_AD_CHR = "";
                     SelRow.AR_CH_CHR = "";
                     SelRow.DF_IND = "0";
                     SelRow.DP_PR_FLNO = "";
                     SelRow.DP_PR_DT = "";
                     SelRow.DP_PR_TM = ""
                     SelRow.DP_SEC_FLNO = "";
                     SelRow.DP_SEC_DT = "";
                     SelRow.DP_SEC_TM = "";
                     SelRow.DP_TR_FLNO = "";
                     SelRow.DP_TR_DT = "";
                     SelRow.DP_TR_TM = "";
                     SelRow.DP_AD_CHR = "";
                     SelRow.DP_CH_CHR = "";
                     MasterGrid.updateItem(RowId, SelRow);
                     MasterGrid.refresh();
                     $$("gridGstExpBk").removeCellCss(RowId, "ixBtnGstTT", "PBtnClr");
                 }                 
                 webix.callEvent("onClick", []);
             },
             onBeforeShow: function (id, row) {
                                  
                 this.clearAll();
                 var context = this.getContext();
                 var RowId = context.id.row;
                 var ColId = context.id.column;

                 if (ColId != "TYPE" && ColId != "LAST_NM" && ColId != "FIRST_NM" && ColId != "TITTLE") return false;

                 var SelRow = MasterGrid.getItem(RowId);
                 var SelItems = MasterGrid.getSelectedItem(false);                 
                 var GuestId = SelRow.GUEST_ID;
                 var CheckInInd = SelRow.CHECKIN_IND;
                 var menudata = [];                 
                 if (GuestId == null || GuestId == "") {
                    return false;
                 }                 
                 if (CheckInInd == "1") return false;
                 menudata.push({ value: "Clear", id: "1" });
                 if (menudata.length == 0) return false;
                 this.parse(menudata);
             }
         },
         master: MasterGrid,

     });

 } 

 function fnExBkPackageShow() {
     
     var Mode = "";
     var TRF = "";
     var DiscPer = "";
     var DiscAmt = ""; var Comp = ""; var Trv = ""; var PID = ""; var TrvID = "";
     var RNo = ExpBkR_NO == null ? "" : ExpBkR_NO;
     var Crs_no = ExpBkRESERVE_NO == null ? "" : ExpBkRESERVE_NO;
     //var GId = $$("GuestId").getValue() == null ? "" : $$("GuestId").getValue();
     var stDt = $$("ArrivalBK").getText();
     var enDt = $$("DepatureBK").getText();
     //var GNm1 = $$("LastNMBK").getValue();
     //var GNm2 = "";
     var sRateTy = $$("RateCodeidBK").getValue();
     var sRateTyNm = $$("RateCodeBK").getValue();
     var sRmTy = $$("RoomTypeBK").getValue();
     var sRmTyNm = $$("RoomTypeBK").getText();
     var SrcID = ""; var SrcNm = ""; var indx = 1;
     Trv = $$("TRVAGNTBK").getValue();
     TrvID = $$("TRVAGNTIDBK").getValue();

     SrcID = $$("BUSSOURCEIDBK").getValue();
     SrcNm = $$("BUSSOURCEIDBK").getText();
     //SrcNm = $$("SOURCEBK").getValue();

     var vCurrency = $$("BKCURRENCY_ID").getValue();

     var GstData = $$("gridGstExpBk").serialize();
     if (GstData.length == 0) {
         webix.message({ type: 'warning', text: "Guest Details cannot be empty." });
         $$("gridGstExpBk").select(grdFirstId, "LAST_NM")
         webix.UIManager.setFocus($$("gridGstExpBk"));
         return false;
     }
     var grdFirstId = $$("gridGstExpBk").getFirstId();

     var GId = GstData[0].GUEST_ID == null ? "" : GstData[0].GUEST_ID.toString().trim();
     var GNm1 = GstData[0].LAST_NM == null ? "" : GstData[0].LAST_NM.toString().trim();
     var GNm2 = GstData[0].FIRST_NM == null ? "" : GstData[0].FIRST_NM.toString().trim();
     var Tittle = GstData[0].TITTLE == null ? "" : GstData[0].TITTLE.toString().trim();


     var PageId = "TC"; var apiCallUrl = ExpBkApiUrl; var IsAspx = BkAspxPage; var whichform = "RESERVE";

     if ($$("TariffBK").getValue() != undefined && $$("TariffBK").getValue() != null) TRF = $$("TariffBK").getValue();
     if ($$("DiscBK").getValue() != undefined && $$("DiscBK").getValue() != null) DiscPer = $$("DiscBK").getValue();
     if ($$("AmountBK").getValue() != undefined && $$("AmountBK").getValue() != null) DiscAmt = $$("AmountBK").getValue();

     //if (ExpBkRESERVE_NO != undefined && ExpBkRESERVE_NO != null && ExpBkRESERVE_NO != "") {
     //    Mode = "OPEN";
     //}
     //else {
     //    Mode = "NEW";
     //}

     Mode = ExpBkMode;

     if (sRmTy == "") {
         webix.message({ type: 'warning', text: "Room Type cannot be empty" });
         return false;
     }

     if (Tittle == "") {
         webix.message({ type: 'warning', text: "Tittle cannot be empty." });
         $$("gridGstExpBk").select(grdFirstId, "TITTLE")
         webix.UIManager.setFocus($$("gridGstExpBk"));
         return false;
     }
     //var Title = $$("TitleBK").getText();

     
     if (GNm1 == null || GNm1 == "") {
         webix.message({ type: 'warning', text: "Last Name cannot be empty." });
         $$("gridGstExpBk").select(grdFirstId, "LAST_NM")
         webix.UIManager.setFocus($$("gridGstExpBk"));
         return false;
     }
     if (GId == "") {
         webix.message({ type: 'warning', text: "Create Guest Profile" });
         $$("gridGstExpBk").select(grdFirstId, "LAST_NM")
         webix.UIManager.setFocus($$("gridGstExpBk"));
         fnShowDupGst();
         return false;
     }    

     if (sRateTy == "") {
         webix.message({ type: 'warning', text: "Rate Code cannot be empty" });
         webix.UIManager.setFocus("RateCodeBK");
         return false;
     }
     if (TRF == "") {
         webix.message({ type: 'warning', text: "Tariff cannot be empty" });
         return false;
     }     

     fnPackagePopLoad(ExpBkCompId, ExpBkUserId, ExpBkConnStr, PageId, apiCallUrl, IsAspx, RNo, stDt, enDt, vCurrency, whichform, ExpBkAdrsPK);
 };

 function fnLoadSavedPackageDet(ResNo) {

     ExpBkAdrsPK = [];
     var rowData = [];
     Request = {
         REQTYPE: "GET_FNLOADSAVEDPACKAGEDET",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         RESERVENO: ResNo,  
         WHICHFROM:"RESERVE"
     }

     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + DataVal,
         success: function (d) {
             
             if (d != "") {
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);
             }
         },
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "FO_URL", ApiControler: "Package/GetFoJsonReq" });
     }
     else params.data = "request=" + DataVal + "&URL= FO_URL&ApiControler=Package/GetFoJsonReq";
     $.ajax(params);

     ExpBkAdrsPK = rowData;
     if (ExpBkAdrsPK.length > 0) ExpBkbPckgChg1 = true;

 };

 function fnLoadPackageDefault() {
     var vCurrency = $$("BKCURRENCY_ID").getValue();
     var sRateTy = $$("RateCodeidBK").getValue();
     var stDt = $$("ArrivalBK").getText();
     var sRmTy = $$("RoomTypeBK").getValue();     
     if(ExpBkUpgrade_Appl_Ind == "1"){
         if ($$("ddlRmUpgrdExpBk").getValue() != null && $$("ddlRmUpgrdExpBk").getValue() != "" && $$("ddlRmUpgrdExpBk").getValue() != "#N#"){
             sRmTy = $$("ddlRmUpgrdExpBk").getValue();            
         }
     }

     ExpBkAdrsPK = [];
     var rowData = [];
     Request = {
         REQTYPE: "GET_FNLOADPACKAGEDEFAULT",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         ROOM_TYPE: sRmTy,
         RATE_TY_ID: sRateTy,
         ARRDT: stDt,
         CURRENCY: vCurrency
     }
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + DataVal,
         success: function (d) {
             
             if (d != "") {
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);
             }
         },
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "FO_URL", ApiControler: "Package/GetFoJsonReq" });
     }
     else params.data = "request=" + DataVal + "&URL= FO_URL&ApiControler=Package/GetFoJsonReq";
     $.ajax(params);

     ExpBkAdrsPK = rowData;
     ExpBkbPckgChg = true;

 };

 function fnSavePackageExpBk(RES_NO,ARR_DT,DEP_DT) {
     

     if (ExpBkbPckgChg == false) {
         if (ExpBkbPckgChg1 == true) ExpBkbPckgChg = true;
     }

     var rowData = [];
     if (ExpBkAdrsPK.length > 0) {
         $.each(ExpBkAdrsPK, function (key, sVal) {
             //
             $.each(sVal, function (key, value) {
                 //
                 if (value != null && value != undefined) sVal[key] = value.toString();
                 else sVal[key] = "";
             });
         });
     }
     Request = {
         REQTYPE: "GET_FNCREATEPACKAGE",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,         
         RES_NO: RES_NO,                  
         AdrsTmp: ExpBkAdrsPK,
         B_IND : ExpBkBIND,
         bPckgChg: ExpBkbPckgChg == false ? "0" : "1",
         ARR_DT: ARR_DT,
         DEP_DT: DEP_DT,
     }

     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + DataVal,
         success: function (d) {
             
             if (d != "") {
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);

             }
         },
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "FO_URL", ApiControler: "Package/GetFoJsonReq" });
     }
     else params.data = "request=" + DataVal + "&URL= FO_URL&ApiControler=Package/GetFoJsonReq";
     $.ajax(params);
 };

 function btnTrvAgntSrchClickExpBk() {
     
     TrvAgntPopupLoadCom(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, BkAspxPage);
 };

 function fnTrvAgntGrpSrchRetExpBk(TRVAGNTID, TRVAGNTNM) {
     $$("TRVAGNTBK").setValue(TRVAGNTNM);
     $$("TRVAGNTIDBK").setValue(TRVAGNTID);

     if (ExpBkJ11_IND == "1" && TRVAGNTID != "") {
         var CompNm = fnGetPartyNameGrpRes(TRVAGNTID, "C");
         $$("CompanyBK").setValue(CompNm);
         $$("CompanyidBK").setValue(TRVAGNTID);
     }
 }

 function btnGrpSrchClickExpBk() {
     
     GroupSrchPopupLoad(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, BkAspxPage, "GROUP");
 };

 function fnGrpSrchRetExpBk(GROUPID, GROUPNM) {
     $$("GroupBK").setValue(GROUPNM);
     $$("GroupIdBK").setValue(GROUPID);
 }

 function fnGetPartyNameGrpRes(PARTY_ID,PARTY_TY_ID) {
     
     var vRetNm = "";
     Request = {
         REQTYPE: "GET_FNRETPARTYNM",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         PARTY_ID: PARTY_ID,
         PARTY_TY_ID: PARTY_TY_ID
     }
     var rowData = [];
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         success: function (d) {
             
             if (d != "") {
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);
                 if (rowData.length > 0) {
                     vRetNm = rowData[0]["PARTY_NM"].toString().trim();
                 }                
             }
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
         }
     }

     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "FO_URL", ApiControler: "TariffEdit/GetFoJsonReq" });
     }
     else params.data = "request=" + DataVal + "&URL= FO_URL&ApiControler=TariffEdit/GetFoJsonReq";
     $.ajax(params);

     return vRetNm;

 };

 function fnSqlInjectExpBk(InputString) {  
     
     var OutPutText = "";
     InputString = InputString || "";     
     if (InputString == "") return InputString;     
     var Request = {
         REQTYPE: "GET_FNSQLINJECT",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         INPUT: InputString,        
     }
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + DataVal,
         success: function (d) {
             
             if (d != "") {
                 if (BkAspxPage == true) OutPutText = JSON.parse(d.d);
                 else OutPutText = JSON.parse(d);
             }
         },
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "FOAPI", ApiControler: "FoCommon/GetFoJsonReq" });
     }
     else params.data = "request=" + DataVal + "&URL= FOAPI&ApiControler=FoCommon/GetFoJsonReq";
     $.ajax(params);
         
     return OutPutText;


 };




 function fnCheckAnyChange(ReserveNo){
     var rowDatad = [];
     ExpBkpGrpPaxChng = "0";ExpBkpGrpRtCdChng = "0";ExpBkpGrpArvlChng = "0";ExpBkpGrpDeprChng = "0";
     ExpBkbGrpdiscChng = "0";ExpBkpGrpAdlChng = "0";ExpBkpGrpCh1Chng = "0";ExpBkpGrpCh2Chng = "0";
     ExpBkpGrpCh3Chng = "0";ExpBkpGrpRsrvStsChng = "0";ExpBkpGrpPlanIdChng = "0";ExpBkpGrpPlanAmtChng = "0";
     bAnyChg = "0";
     Request = {
         REQTYPE: "GET_FNCHECKANYCHANGE",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,        
         CONSTRING: ExpBkConnStr,                        
         RESERVE_NO:ReserveNo,
         OLD_DATA:ExpBkOpenRec
     }
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         success: function (d) {
             //
             if (BkAspxPage == true) {
                 var data = d.d;
             }
             else var data = d;

             if (data != "") {
                 rowDatad = JSON.parse(data);
                 ExpBkpGrpPaxChng = rowDatad.pGrpPaxChng;
                 ExpBkpGrpRtCdChng = rowDatad.pGrpRtCdChng;
                 ExpBkpGrpArvlChng = rowDatad.pGrpArvlChng;
                 ExpBkpGrpDeprChng = rowDatad.pGrpDeprChng;
                 ExpBkbGrpdiscChng = rowDatad.bGrpdiscChng;
                 ExpBkpGrpAdlChng = rowDatad.pGrpAdlChng;
                 ExpBkpGrpCh1Chng = rowDatad.pGrpCh1Chng;
                 ExpBkpGrpCh2Chng = rowDatad.pGrpCh2Chng;
                 ExpBkpGrpCh3Chng =  rowDatad.pGrpCh3Chng;
                 ExpBkpGrpRsrvStsChng = rowDatad.pGrpRsrvStsChng;
                 ExpBkpGrpPlanIdChng = rowDatad.pGrpPlanIdChng;
                 ExpBkpGrpPlanAmtChng = rowDatad.pGrpPlanAmtChng;
                 bAnyChg = rowDatad.bAnyChg;

             }
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
         }
     }

     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "FOAPI", ApiControler: "FoCommon/GetFoJsonReq" });
     }
     else params.data = "request=" + DataVal + "&URL= FOAPI&ApiControler=FoCommon/GetFoJsonReq";
     $.ajax(params);

     
     return bAnyChg;

 };
 function fnIsItPMRoomBk(RoomTyId) {
     var CompId = $$("Property").getValue();
     var bRet = "0";
     Request = {
         REQTYPE: "GET_FNISITPMROOM",
         COMPID: CompId,
         ROOM_TY_ID : RoomTyId,
     }

     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         success: function (d) {
             //
             if (BkAspxPage == true) {
                 var data = d.d;
             }
             else var data = d;
             if (data != "") {
                 rowData = JSON.parse(data);

                 if (rowData == "1") {
                     bRet = "1";                    

                 }                
             }
         },
         complete: function () {
             //$("#pageloaddiv").hide();
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
             //$("#pageloaddiv").hide();
         }
     };

     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "FOAPI", ApiControler: "FoCommon/GetFoJsonReq" });
     }
     else params.data = "request=" + DataVal + "&URL= FOAPI&ApiControler=FoCommon/GetFoJsonReq";
     $.ajax(params);
    
     return bRet;

 };

 function fnLoadSaveToChangeBk() {
     webix.ui({
         view: "window",
         close: false,
         modal: true,
         id: "SaveToChangePopBk",
         head: "Save To Change",
         position: "center",
         css: "WebIxStyle",         
         width: 380,
         move: true,
         body: {
             view: "form",
             id: "frmSaveToChangeBk",
             padding: { top: 0, bottom: 0, left: 1, right: 1 },
             elements: [ 
                     {
                         view: "scrollview", scroll: "y", height: 300, width: 300, body: {
                             padding: { top: 10, left: 20, bottom: 10, right: 10 },
                             rows: [
                                 { view: "checkbox", id: "chkThisGstOnlyBk", value:"1", labelWidth: 200, label:"This Guest Only", customCheckbox: false, 
                                     on :{
                                         onChange: function () { fnSaveToChkClick(this); } 
                                     } 
                                 },
                                 { view: "checkbox", id: "chkAllGstBk", labelWidth: 200, label:"All Guest", customCheckbox: false,
                                     on:{
                                         onChange: function(id){ 
                                             fnSaveToChkClick(this);
                                         }
                                     }                                 
                                  },
                                 { view: "checkbox", id: "chkGstArrDtBk", labelWidth: 200, label:"All Guest with same Arrival Dt", customCheckbox: false, 
                                     on:{
                                         onChange: function(id){ 
                                             fnSaveToChkClick(this);
                                         }
                                     }    
                                 },                                            
                                 { view: "checkbox", id: "chkGSTDepDtBk", labelWidth: 200, label:"All Guest with same Departure Dt", customCheckbox: false, 
                                     on:{
                                         onChange: function(id){ 
                                             fnSaveToChkClick(this);
                                         }
                                     }    
                                 },
                                 { view: "checkbox", id: "chkGstRmTyBk", labelWidth: 200, label:"Only Guest with same Room Type", customCheckbox: false,
                                     on:{
                                         onChange: function(id){ 
                                             fnSaveToChkClick(this);
                                         }
                                     }   
                                 },
                                 {
                                     cols:[
                                            { view: "checkbox", id: "chkSpLnResBk", labelWidth: 200, label: "Specific Line Reservation",width:220, customCheckbox: false,
                                                on:{
                                                    onChange: function(id){ 
                                                        fnSaveToChkClick(this);
                                                    }
                                                }    
                                            },
                                            {view: "button", css:"webix_secondary", id:"btnSaveChResSelBk", type:"icon", icon: "wxi-search",hidden:true, inputWidth: 30, width: 30, click: function () {ExpBkSpLnResSrchWindowLoad(); }  },
                                     ]
                                 },
                                 {view: "checkbox", id: "chkSkipPmRmsBk", labelWidth: 200, label: "Skip for PM Rooms",  customCheckbox: false,  click: function () {  }  },                                                                                                  
                             ]
                         }
                     },
                     {padding: { top: 5, right: 20 }, cols: [{}, { view: "button",css:"webix_primary", label: "OK", inputWidth: 70, width: 70, click: function () { btnSaveToChClick(); } }], }
             ]

         }
     }).show();    

 };

 function fnBtnPlanSrchClickExpBk() {
     if (TE_Plan_Compute_Type == "4") {
         $$("gridPlanExpBk").config.columns[3].header = "Plan %";
         $$("gridPlanExpBk").hideColumn("PL_C");
     }
     PlanSrchWindowLoadExpBk();     
 };

 function PlanSrchWindowLoadExpBk() {
     
     webix.ui({
         view: "window",
         close: true,
         modal: true,
         id: "PlanSrchPopExpBk",
         head: "Plan Search",
         position: "center",
         css: "WebIxStyle",
         height: 450,
         width: 550,
         move: true,
         on: {
             onShow: function () {
                 var vheight = window.innerHeight
                         || document.documentElement.clientHeight
                         || document.body.clientHeight;
                 var vWidth = window.innerWidth
                         || document.documentElement.clientWidth
                         || document.body.clientWidth;
                 if (vheight > 450) vheight = 450;
                 if (vWidth > 550) vWidth = 550;

                 $$("PlanSrchPopExpBk").define("height", vheight);
                 $$("PlanSrchPopExpBk").define("width", vWidth);
                 $$("PlanSrchPopExpBk").adjust();

                 var Top = $$("gridPlanExpBk").getNode().offsetTop
                 $$("gridPlanExpBk").define("height", vheight - Top - 50);
                 $$("gridPlanExpBk").define("width", vWidth - 20);
                 $$("gridPlanExpBk").resize();
             }
         },
         body: {

             rows: [
                 {
                     view: "datatable",
                     id: "gridPlanExpBk",
                     select: 'row',
                     css: "webix_header_border",
                     fixedRowHeight: false,
                     resizeColumn: true,
                     autoConfig: true,
                     columns: [
                             { id: "id", header: ["Plan Id", { content: "textFilter", }], width: 80, css: { 'text-align': 'center ! important' }, },
                             { id: "value", header: ["Plan Name", { content: "textFilter", }], width: 280, fillspace:true, css: { 'text-align': 'left ! important' }, },
                             {
                                 id: "SINGLE_PLAN", header: "Adult Amt", width: 90, css: { 'text-align': 'right ! important' },
                                 format: function (value) {
                                     return fnCurrFormatTE(value);
                                 },
                             },
                             {
                                 id: "PL_C", header: "child Amt", width: 90, css: { 'text-align': 'right ! important' },
                                 format: function (value) {
                                     return fnCurrFormatTE(value);
                                 },
                             },
                             { id: "P_C2", header: "Child2 Amt", width: 100, css: { 'text-align': 'right ! important' }, hidden: true },
                             { id: "P_C3", header: "Child3 Amt", width: 100, css: { 'text-align': 'right ! important' }, hidden: true },
                             { id: "S1_AM", header: "Single", width: 1500, css: { 'text-align': 'right ! important' }, hidden: true },
                             { id: "S2_AM", header: "Double", width: 100, css: { 'text-align': 'right ! important' }, hidden: true },
                             { id: "S3_AM", header: "Triple", width: 100, css: { 'text-align': 'right ! important' }, hidden: true },
                             { id: "S4_AM", header: "Qudrable", width: 100, css: { 'text-align': 'right ! important' }, hidden: true },                           
                                                        
                     ],
                     data: [],
                     on: {

                         'onItemDblClick': function (id) {
                             
                             PlanSrchRetExpBk(id);
                         },
                         'onKeyPress': function (e) {
                             
                             if (e == '13') {
                                 PlanSrchRetExpBk(id);

                             }
                         },
                         //"onresize": function () {
                         //    this.adjustRowHeight("Narr", true);                            
                         //}
                     },
                     scheme: {
                         $init: function (item) {
                             
                             if (item.CLR != "" && item.CLR != null) {
                                 item.$css = item.CLR;
                             }
                         },
                     },
                     ready: function () {
                         PlanSrchLoadDataExpBk();
                     }
                 },
                 {
                     cols: [
                            {},
                             {
                                 view: "button", maxWidth: 80, label: "Ok", inputWidth: 70, width: 80, click: function () {
                                     var selRow = $$("gridPlanExpBk").getSelectedItem(false);
                                     if (selRow == null || selRow == undefined) selRow = $$("gridPlanExpBk").getFirstId();
                                     var id = selRow.id;
                                     PlanSrchRetExpBk(id);
                                 }
                             },
                            { view: "button", maxWidth: 80, label: "Close", inputWidth: 70, width: 80, click: function () { $$("PlanSrchPopExpBk").hide(); } }
                     ]
                 }
             ],
         }
     }).show();
 };
 function PlanSrchRetExpBk(RowId) {
     
     var selRow = $$("gridPlanExpBk").getItem(RowId);
     var vId = selRow.id;
     var vNm = selRow.value;
     var vPlnAdl = selRow.SINGLE_PLAN;
     var vPlnCh1 = selRow.PL_C;
     var vPlnCh2 = selRow.P_C2;
     var vPlnCh3 = selRow.P_C3;

     var bFound = "0";
     var dblPlanAmt = 0;
     var dblPlanChildAmt = 0;
     var dblPlanAmtC2 = 0;
     var dblPlanAmtC3 = 0;

     ExpBkPlanId = vId;
     $$("PlanBK").setValue(vNm);
     $$("PlanAmtBK").setValue(vPlnAdl);
     $$("PlanChild1Bk").setValue(vPlnCh1);
     $$("PlanChild2Bk").setValue(vPlnCh2);
     $$("PlanChild3Bk").setValue(vPlnCh3);     
     $$("PlanSrchPopExpBk").hide();
 };
 function PlanSrchLoadDataExpBk() {
     
     $$("gridPlanExpBk").clearAll();
     $$("gridPlanExpBk").eachColumn(function (id, col) {
         var filter = this.getFilter(id);
         if (filter) {
             if (filter.setValue) filter.setValue("");
             else filter.value = "";
         }
     });

     var vCurrency = $$("BKCURRENCY_ID").getValue();
     

     Request = {
         REQTYPE: "GET_FNLOADPLAN",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         CURRENCY: vCurrency,
     }
     var rowData = [];
     requestData = JSON.stringify(Request);
     if (BkAspxPage == false) requestData = encodeURIComponent(requestData);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         success: function (d) {
             

             if (BkAspxPage == true) {
                 var data = d.d;
             }
             else var data = d;

             if (data != "") {
                 rowData = JSON.parse(data);
                 if (rowData.length > 0) {
                     $$("gridPlanExpBk").parse(rowData);
                     //$$("gridCompany").adjustRowHeight("Narr",true);
                     $$("gridPlanExpBk").refresh();
                     if ($$("gridPlanExpBk").count()) {
                         $$("gridPlanExpBk").select($$("gridPlanExpBk").getFirstId());
                     }
                     webix.UIManager.setFocus($$("gridPlanExpBk"));
                 }
             }
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
         }
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: requestData, URL: "FO_URL", ApiControler: "TariffEdit/GetFoJsonReq" });
     }
     else params.data = "request=" + requestData + "&URL= FO_URL&ApiControler=TariffEdit/GetFoJsonReq";
     $.ajax(params);

 };


 function fnClearChk(){
     
     $$("chkThisGstOnlyBk").blockEvent();
     $$("chkAllGstBk").blockEvent();
     $$("chkGstArrDtBk").blockEvent();
     $$("chkGSTDepDtBk").blockEvent();
     $$("chkGstRmTyBk").blockEvent();
     $$("chkSpLnResBk").blockEvent();
     $$("chkThisGstOnlyBk").setValue("0");
     $$("chkAllGstBk").setValue("0");
     $$("chkGstArrDtBk").setValue("0");
     $$("chkGSTDepDtBk").setValue("0");
     $$("chkGstRmTyBk").setValue("0");
     $$("chkSpLnResBk").setValue("0");  
     $$("chkThisGstOnlyBk").unblockEvent();
     $$("chkAllGstBk").unblockEvent();
     $$("chkGstArrDtBk").unblockEvent();
     $$("chkGSTDepDtBk").unblockEvent();
     $$("chkGstRmTyBk").unblockEvent();
     $$("chkSpLnResBk").unblockEvent();
 };
 function fnSaveToChkClick(control){     
     
     var value = control.getValue();
     if(value == "1"){
         fnClearChk();
         control.blockEvent();
         control.setValue("1");
         control.unblockEvent();
         if(control.config.id == "chkSpLnResBk"){
             $$("btnSaveChResSelBk").show();
         }
         else{
             $$("btnSaveChResSelBk").hide();  
         }
     }
     else{ 
         //if(control.config.id == "chkSpLnResBk") $$("btnSaveChResSelBk").hide();    
         //else
         control.blockEvent();
         control.setValue("1");
         control.unblockEvent();
     }
 };

 var ExpBkSpLnResSrchWindowLoad = function () {
     ExpBkSelLineResId = "";
     webix.ui({
         view: "window",
         close: true,
         modal: true,
         id: "ExpBkSpLnResSrchPop",
         head: " Specific Line Reservation Search",
         position: "center",
         css: "WebIxStyle",
         height: 450,
         width: 950,
         move: true,
         body: {
             rows: [

                 {
                     width: 800,
                     padding:{left:15,top:10,bottom:10},
                     cols: [
                         { view: "datepicker",label: 'InHouse Between', id: 'InHouseFrmDtBK', labelWidth: 110, width: 230, inputWidth: 230,
                             stringResult: true, format: "%d/%m/%Y",   on: {
                                 onChange: function (NewVal, OldVal) {
                                     ExpBkSpLnResSrchLoadData();
                                 },
                             }
                         },
                         { view: "datepicker",label: '', id: 'InHouseToDtBK', labelWidth: 0, width: 120, inputWidth: 120,
                              stringResult: true, format: "%d/%m/%Y",   on: {
                                 onChange: function (NewVal, OldVal) {
                                     ExpBkSpLnResSrchLoadData();
                                 },
                             }
                         },                         
                     ],
                 },
                 {
                     view: "datatable",
                     id: "gridLineResSrch",
                     select: 'row',
                     //editable: true,
                     css: "webix_header_border",
                     //scrollX: false,
                     width: 800,
                     columns: [
                           { header: "ResId", id: "RESERVE_NO", width: 70, css: { 'text-align': 'center ! important' }, },
                           { header: "Room Ty", id: "ROOM_TY", width: 70, css: { 'text-align': 'center ! important' }, },
                           { header: " ", id: "SHARER", hidden:true  },
                           { header: "Guest Name", id: "GUEST", width: 200, css: { 'text-align': 'left ! important' }, fillspace: true },
                           { header: "Rooms", id: "ROOMS", width: 60, css: { 'text-align': 'center ! important' }, hidden :true},
                           { header: "Arrival", id: "ARR_DT", width: 80, css: { 'text-align': 'center ! important' },  },
                           { header: "Departure", id: "DEP_DT", width: 80, css: { 'text-align': 'left ! important' }, },
                           { header: "Room No", id: "ROOM_NO", width: 80, css: { 'text-align': 'center ! important' }, hidden: true },
                           { header: "Pax", id: "PAX", width: 70, css: { 'text-align': 'left ! important' }, },
                           { header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "CHK", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },

                     ],
                     data: [],
                     on: {
                         'onKeyPress': function (code, e) {
                             
                             var selRow = this.getSelectedId();
                             if(selRow != undefined && selRow != null){
                                 var rowid = selRow.id;
                                 var charCode = e.which || e.keyCode;
                                 if (charCode == '13') {
                                     var valid = this.getSelectedId(true);
                                     var id = { row: valid[0].row };
                                     this.callEvent("onItemClick", [id]);
                                 }
                                 if (e.ctrlKey == false && e.altKey == false && e.shiftKey == false && charCode == 32) {
                                     var vChk = selRow.CHK;
                                     if (vChk == "1") selRow.CHK = "0";
                                     else selRow.CHK = "1";
                                     this.updateItem(rowid, selRow)
                                 }
                             }
                         },
                         'onBeforeFilter': function () {
                             this.select(this.getFirstId());
                             webix.UIManager.setFocus(this);
                             this.refresh();
                         },
                         'onAfterFilter': function () {
                             //
                             this.select(this.getFirstId());
                             webix.UIManager.setFocus(this);
                             this.refresh();
                         }
                     },
                     scheme: {
                         $init: function (item) {
                             
                             if (item.CLR != "" && item.CLR != null) {
                                 item.$css = item.CLR;
                             }
                         },
                     },
                     ready:function(){
                         
                         //var ArrivalBK = $$("ArrivalBK").getText();                         
                         //var DepatureBK = $$("DepatureBK").getText();
                         //$$("InHouseFrmDtBK").blockEvent();
                         //$$("InHouseFrmDtBK").setValue(formatDateExBk(ArrivalBK));
                         //$$("InHouseFrmDtBK").unblockEvent();
                         //$$("InHouseToDtBK").blockEvent();
                         //$$("InHouseToDtBK").setValue(formatDateExBk(DepatureBK));
                         //$$("InHouseToDtBK").unblockEvent();
                         ExpBkSpLnResSrchLoadData();
                     }
                 },
                 {
                     margin: 10,
                     padding: { top: 5, bottom: 5, right: 5 },
                     cols: [
                         {},
                         {
                             view: "button", type: "icon", icon: "wxi-check", label: "Ok", inputWidth: 80, click: function () {
                                 ExpBkLineResSelRet();
                             },
                             align: "right"
                         },
                     ]
                 }
             ],
         }
     }).show();
 };

 var ExpBkSpLnResSrchLoadData = function () {
     
     
     $$("gridLineResSrch").clearAll();
     //$$("gridLineResSrch").eachColumn(function (id, col) {
     //    var filter = this.getFilter(id);
     //    if (filter) {
     //        if (filter.setValue) filter.setValue("");
     //        else filter.value = "";
     //    }
     //});

     var sFromDt = $$("InHouseFrmDtBK").getText();
     var sToDt = $$("InHouseToDtBK").getText();     

     Request = {
         REQTYPE: "GET_FNLOADLINERESERVE",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         FROM_DT:sFromDt,
         TO_DT:sToDt,
         R_NO: ExpBkR_NO,
         SKIP_RESERVE_NO:ExpBkRESERVE_NO,
     }
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + DataVal,
         success: function (d) {
             
             if (d != "") {
                 var rowData =[];
                 if (BkAspxPage == true) rowData = JSON.parse(d.d);
                 else rowData = JSON.parse(d);
                 if (rowData != "") {                     
                     if (rowData.length > 0) {                         
                         $$("gridLineResSrch").parse(rowData);
                         $$("gridLineResSrch").refresh();
                         if ($$("gridLineResSrch").count()) {
                             $$("gridLineResSrch").select($$("gridLineResSrch").getFirstId());
                         }
                         webix.UIManager.setFocus($$("gridLineResSrch"));
                     }
                 }
             }
         },
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "FOAPI", ApiControler: "FoCommon/GetFoJsonReq" });
     }
     else params.data = "request=" + DataVal + "&URL= FOAPI&ApiControler=FoCommon/GetFoJsonReq";
     $.ajax(params);     
     
 };

 function ExpBkLineResSelRet(){
     var ResId = "";
     ExpBkSelLineResId = "";
     $$("gridLineResSrch").eachColumn(function (id, col) {
         var filter = this.getFilter(id);
         if (filter) {
             if (filter.setValue) filter.setValue("")
             else filter.value = "";
         }
     });
     $$("gridLineResSrch").filterByAll();
     var vGrid = $$("gridLineResSrch").serialize();
     var newData = vGrid.filter(function (el) {
         //
         return el.CHK == "1";
     });
     if (newData.length > 0) {
         $.each(newData, function (key, obj) {
             //
             if (ResId != "") {
                 ResId = ResId + "','" + obj.RESERVE_NO;
             }
             else {
                 ResId = obj.RESERVE_NO;
             }
             
         });
     }
     if (ResId != "") {
         ExpBkSelLineResId = ResId;
         $$("ExpBkSpLnResSrchPop").hide();
     }
     else {
         webix.message({ type: 'warning', text: "No Reservations Selected" });
         return false;
     }
 };
 function btnSaveToChClick(){
     
     var PrgStr = "<div  style='display: block; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; fit-position: 100%; z-index: 189'> <img src='../../Images/progress.GIF' style='position: absolute; left: 50%; top: 45%; height: 100px; width: 80px;' /> </div>";


     webix.extend($$("frmSaveToChangeBk"), webix.OverlayBox);
     $$("frmSaveToChangeBk").showOverlay(PrgStr);
     webix.html.addCss($$("frmSaveToChangeBk").getNode(), "ExpBkPagefalse");
     setTimeout(function () {

         var pOptions = "";
         var pArrvDt = $$("ArrivalBK").getValue();
         var pDepDt = $$("DepatureBK").getValue();
         var pRoomTy = $$("RoomTypeBK").getValue();          
         var bPMRooms = $$("chkSkipPmRmsBk").getValue();

         if($$("chkThisGstOnlyBk").getValue() == "1") pOptions = "1";
         else if($$("chkAllGstBk").getValue() == "1") pOptions = "2";
         else if($$("chkGstArrDtBk").getValue() == "1") pOptions = "3";
         else if($$("chkGSTDepDtBk").getValue() == "1") pOptions = "4";
         else if($$("chkGstRmTyBk").getValue() == "1") pOptions = "5";
         else if($$("chkSpLnResBk").getValue() == "1") pOptions = "6";

         if(pOptions == ""){
             webix.message("Select atleast one Options", "warning");
             $$("frmSaveToChangeBk").hideOverlay();
             webix.html.removeCss($$("frmSaveToChangeBk").getNode(), "ExpBkPagefalse");
             return false;
         }
         if (pOptions == "6") {
             if (ExpBkSelLineResId == "") {
                 webix.message("Select atleast one Reservation", "warning");
                 $$("frmSaveToChangeBk").hideOverlay();
                 webix.html.removeCss($$("frmSaveToChangeBk").getNode(), "ExpBkPagefalse");
                 return false;
             }
         }

         if(pOptions != "1")
         {
             Request = {
                 REQTYPE: "GET_FNUPDATEFOROTHERRESV",
                 COMPID: ExpBkCompId,
                 USERID: ExpBkUserId,        
                 CONSTRING: ExpBkConnStr,                        
                 RESERVE_NO:ReserveNo,
                 OLD_DATA:ExpBkOpenRec,
                 pResNo:ExpBkRESERVE_NO,
                 pConfNo:ExpBkR_NO,
                 pOptions:pOptions,
                 pArrvDt: pArrvDt,
                 pDepDt:pDepDt,
                 pRoomTy:pRoomTy,
                 pSelResrvNos:ExpBkSelLineResId,
                 bPMRooms:bPMRooms,
                 pGrpPlanIdChng: ExpBkpGrpPlanIdChng,
                 pGrpPaxChng:ExpBkpGrpPaxChng,
                 pGrpArvlChng:ExpBkpGrpArvlChng,
                 pGrpDeprChng:ExpBkpGrpDeprChng,
                 bGrpdiscChng: ExpBkbGrpdiscChng,
                 pGrpAdlChng:ExpBkpGrpAdlChng,
                 pGrpCh1Chng:ExpBkpGrpCh1Chng,
                 pGrpCh2Chng:ExpBkpGrpCh2Chng,
                 pGrpCh3Chng:ExpBkpGrpCh3Chng,
                 pGrpTariffChange: ExpBkbTariffEditModified == true?"1":"0",
                 pGrpRsrvStsChng:ExpBkpGrpRsrvStsChng,
                 pGrpPlanAmtChng:ExpBkpGrpPlanAmtChng,
                 pGrpRtCdChng: ExpBkpGrpRtCdChng,
                 bPckgChg:ExpBkbPckgChg == true?"1":"0",
                 CURRENCY_ID:$$("BKCURRENCY_ID").getValue(),
                 C_OLD_CURR:$$("BKCURRENCY_ID").getValue(),
                 BaseCurId: ExpBkBasCurrId,
                 Auto_Chrg_Modify: FAC_Auto_Chrg_Modify,
                 Auto_Chrg_Appl: ExpBk_Auto_Chrg_Appl,
                 bRoutModify: bRoutModifyTc,

             }
     
             var DataVal = JSON.stringify(Request);
             if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

             var params = {
                 async: false,
                 url: ExpBkApiUrl,
                 type: 'POST',
                 success: function (d) {
                     //
                     if (BkAspxPage == true) {
                         var data = d.d;
                     }
                     else var data = d;

                     if (data != "") {
                
                     }
                 },
                 complete:function() {
                     $$("frmSaveToChangeBk").hideOverlay();
                     webix.html.removeCss($$("frmSaveToChangeBk").getNode(), "ExpBkPagefalse");
                 },
                 error: function (request, status, error) {
                     console.log("Error Failrue");
                     $$("frmSaveToChangeBk").hideOverlay();
                     webix.html.removeCss($$("frmSaveToChangeBk").getNode(), "ExpBkPagefalse");
                 }
             }

             if (BkAspxPage == true) {
                 params.contentType = "application/json;charset=utf-8";
                 params.acceptType = "application/json;charset=utf-8";
                 params.dataType = "json";
                 params.data = JSON.stringify({ request: DataVal, URL: "FOAPI", ApiControler: "FoCommon/GetFoJsonReq" });
             }
             else params.data = "request=" + DataVal + "&URL= FOAPI&ApiControler=FoCommon/GetFoJsonReq";
             $.ajax(params);
         }

         datval = BkSucessRet;
         var RegNo = datval.RegNo;
         var Tariff = datval.Tariff;
         var ReserveNo = datval.ReserveNo;
         var TemplateMsg = "";
         if (ExpBkRESERVE_NO != undefined && ExpBkRESERVE_NO != null && ExpBkRESERVE_NO != "") {
             TemplateMsg = "Reservation Amended.";
         }
         else TemplateMsg = "Reservation Created. Reservation No.:  " + RegNo;
         if (ExpBkG22_IND == "1") $$("RowChkEmail").show();
         $$("TempSaveMsg").define("template", TemplateMsg);
         $$("TempSaveMsg").refresh();
         $$("chkEmailSend").setValue("0");
         $$("SaveToChangePopBk").hide();
         $$("SaveMsgEmlPop").show();
     },0)
 };
 
 function ExpBkOthersWindowLoad(ExpBkResMode,ExpBkGstStat,ExpBkChannel,ExpBkPayMode,ExpBkBillIns,ExpBkVisitPurp){
     webix.ui({
         view: "window",
         close: true,
         modal: true,
         id: "ExpBkOthersPop",
         head: " Others",
         position: "center",
         css: "WebIxStyle",
         minHeight: 500,
         width: 950,
         move: true,
         
         body: {                                     
             id: "ExpBkOthers",
             name: "ExpBkOthers",
             view: 'form',   
             //css: "ExpBkForm",
             padding: { bottom: 3, right: 2 },
             //rules: {
             //    //"email": webix.rules.isEmail,
             //    //"login": webix.rules.isNotEmpty,
             //    "ExpBkResMode1": webix.rules.isNotEmpty,
             //    "ExpBkChannel1": webix.rules.isNotEmpty,
             //    "ReferenceBk1": webix.rules.isNotEmpty,
             //    //"accept": webix.rules.isChecked
             //},
             elements: [ 
                         {
                             cols:[
                                 {
                                     width: 380,
                                     rows: [
                                             {
                                                 view: "combo", width: 360, labelWidth: 110, id: "ExpBkResMode1", name: "ExpBkResMode1", label: "Reserve Mode", options: ExpBkResMode, on: { onChange: function (newVal, OldVal) { $$("ExpBkResMode1").validate() } }
                                                    
                                             },
                                             { view: "combo", width: 360, labelWidth: 110, id: "ExpBkGstStatus1", label: "Guest Status", options: ExpBkGstStat, on: { onChange: function (newVal, OldVal) { } }, },
                                             {
                                                 view: "combo", width: 360, labelWidth: 110, id: "ExpBkChannel1", name: "ExpBkChannel1", label: "Channel", options: ExpBkChannel, on: { onChange: function (newVal, OldVal) { $$("ExpBkChannel1").validate() } }
                                                 //invalidMessage: " cannot be empty",
                                             },
                                             { view: "combo", width: 360, labelWidth: 110, id: "ExpBkPayMode1",  label: "Payment Mode", options: ExpBkPayMode,  },
                                             { view: "combo", width: 360, labelWidth: 110, id: "ExpBkBillIns1", label: "Billing Instructions", options: ExpBkBillIns, },
                                             {
                                                 view: "combo", width: 360, labelWidth: 110, id: "ExpBkVisitPurp1", name: "ExpBkVisitPurp1", label: "Visit Purpose", options: ExpBkVisitPurp,                                                 
                                             },
                                             //{
                                             //    view: "search", width: 360, labelWidth: 110, id: "ExpBkBooker1", name: "ExpBkBooker1", label: "Booker", readonly: true, inputWidth: 360,                                                 
                                             //    on: {
                                             //        onSearchIconClick: function () {
                                             //            debugger;
                                             //            //ExpBkBookerSrchPopupLoad();
                                             //            BookerSrchPopupLoad(ExpBkCompId, ExpBkUserId, ExpBkConnStr, 'TC', ExpBkApiUrl, BkAspxPage);
                                             //        },
                                             //        onKeyPress: function (code, e) {
                                                         
                                             //            //if (code == 13 || code == 32) ExpBkBookerSrchPopupLoad();

                                             //            if (code == 13 || code == 32) BookerSrchPopupLoad(ExpBkCompId, ExpBkUserId, ExpBkConnStr, 'TC', ExpBkApiUrl, BkAspxPage);
                                             //        },
                                             //    }
                                             //},
                                             {
                                                 view: "search", width: 360, labelWidth: 110, id: "ExpBkSource1", label: "Source", readonly: true, inputWidth: 360, attributes: { maxlength: 40 },
                                                 on: {
                                                     onSearchIconClick: function () {
                                                         
                                                         ExpBkSourceSrchPopupLoad();
                                                     },
                                                     onKeyPress: function (code, e) {
                                                         
                                                         if (code == 13 || code == 32) ExpBkSourceSrchPopupLoad();
                                                     },
                                                 }
                                             },
                                             { view: "text", label: 'Voucher#', id: 'VouchNoBk1', labelWidth: 110, width: 360, inputWidth: 360, attributes: { maxlength: 40 },},
                                             {
                                                 view: "text", label: 'Refer#', id: 'ReferenceBk1', name: "ReferenceBk1", labelWidth: 110, width: 360, inputWidth: 360, attributes: { maxlength: 40 },
                                                 on: { onChange: function (newVal, OldVal) { $$("ReferenceBk1").validate() } }
                                             },

                                     ]
                                 },
                                    
                                {
                                    width:410,
                                    rows:[
                                        { view:"label", label: "Instructions", css:"ExpBkSubHeadLbl",height:20,},
                                        { view: "textarea", label: 'Reservation',height:60,  id: 'ReserveInsBK1', labelWidth: 90, width: 400, inputWidth: 400, attributes: { maxlength: 1000 }},
                                        { view: "textarea", label: 'Guest Special Request',height:60,css:"wrapLabel",  id: 'GuestSpRequestBK1', labelWidth: 90, width: 400, inputWidth: 400, attributes: { maxlength: 1000 }},
                                        { view: "textarea", label: 'Check In',  id: 'CheckInInsBK1',height:60, labelWidth: 90, width: 400, inputWidth: 400, attributes: { maxlength: 300 }},
                                        { view: "textarea", label: 'Check Out',  id: 'CheckOutInsBK1',height:60, labelWidth: 90, width: 400, inputWidth: 400, attributes: { maxlength: 240 }},
                                        { view: "text", label: 'POS',  id: 'PosInsBK1', labelWidth: 90, width: 400, inputWidth: 400, attributes: { maxlength: 120 }},                                                                
                                                                    
                                    ]
                                }, 
                                { view: "text", id: 'ExpBkResMode', hidden:true,},
                                { view: "text", id: 'ExpBkGstStatus', hidden:true,},
                                { view: "text", id: 'ExpBkPayMode', hidden:true,},
                                { view: "text", id: 'ExpBkChannel', hidden:true,},                                
                                { view: "text", id: 'ExpBkBillIns', hidden:true,},
                                { view: "text", id: 'ExpBkVisitPurp', hidden:true,},
                                //{ view: "text", id: 'ExpBkBooker', hidden:true,},
                                { view: "text", id: 'ExpBkSource', hidden:true,},
                                { view: "text", id: 'VouchNoBk', hidden:true,},
                                { view: "text", id: 'ReserveInsBK', hidden:true,},
                                { view: "text", id: 'GuestRequestBK', hidden: true, },                                
                                { view: "text", id: 'CheckInInsBK', hidden:true,},
                                { view: "text", id: 'CheckOutInsBK', hidden:true,},
                                { view: "text", id: 'PosInsBK', hidden:true,},
                                { view: "text", id: 'ReferenceBk', hidden:true,},                                

                                //{ view: "text", id: 'ExpBkBookerId', hidden:true,},
                                { view: "text", id: 'ExpBkSourceId', hidden:true,},

                                //{ view: "text", id: 'ExpBkBookerId1', hidden:true,},
                                { view: "text", id: 'ExpBkSourceId1', hidden:true,},
                                 
                             ]

                         },                         
                         {
                             margin: 10,
                             padding: { top: 5, bottom: 5, right: 5 },
                             cols: [
                                 {},
                                 {
                                     view: "button", label: "Ok", inputWidth: 70, click: function () {
                                         ExpBkOtherbtnOkClick();
                                     },
                                     align: "right"
                                 },
                             ]
                         }
             ]
         },
     });
 };
 function ExpBkOtherPopShow() {
     
     $$("ExpBkOthers").clearValidation();
     $$("ExpBkResMode1").setValue($$("ExpBkResMode").getValue());
     $$("ExpBkGstStatus1").setValue($$("ExpBkGstStatus").getValue());
     $$("ExpBkChannel1").setValue($$("ExpBkChannel").getValue());
     $$("ExpBkPayMode1").setValue($$("ExpBkPayMode").getValue());
     $$("ExpBkBillIns1").setValue($$("ExpBkBillIns").getValue());
     $$("ExpBkVisitPurp1").setValue($$("ExpBkVisitPurp").getValue());
     //$$("ExpBkBooker1").setValue($$("ExpBkBooker").getValue());
     $$("ExpBkSource1").setValue($$("ExpBkSource").getValue());
     $$("VouchNoBk1").setValue($$("VouchNoBk").getValue());
     $$("ReferenceBk1").setValue($$("ReferenceBk").getValue());     
     $$("ReserveInsBK1").setValue($$("ReserveInsBK").getValue());
     $$("GuestSpRequestBK1").setValue($$("GuestRequestBK").getValue());
     $$("CheckInInsBK1").setValue($$("CheckInInsBK").getValue());
     $$("CheckOutInsBK1").setValue($$("CheckOutInsBK").getValue());
     $$("PosInsBK1").setValue($$("PosInsBK").getValue());
     //$$("ExpBkBookerId1").setValue($$("ExpBkBookerId").getValue());
     $$("ExpBkSourceId1").setValue($$("ExpBkSourceId").getValue());
     
     
     $$("ExpBkOthersPop").show();
     if ($$("ExpBkResMode1").isVisible() == true) webix.UIManager.setFocus($$("ExpBkResMode1"));
     else if ($$("ExpBkGstStatus1").isVisible() == true) webix.UIManager.setFocus($$("ExpBkGstStatus1"));
     
     
 };

 function ExpBkOtherbtnOkClick() {

     
     //var form = $$("ExpBkOthers").getParentView();
     if ($$("ExpBkOthers").validate() == false) {         
         return false;
     }


     $$("ExpBkResMode").setValue($$("ExpBkResMode1").getValue());
     $$("ExpBkGstStatus").setValue($$("ExpBkGstStatus1").getValue());
     $$("ExpBkChannel").setValue($$("ExpBkChannel1").getValue());
     $$("ExpBkPayMode").setValue($$("ExpBkPayMode1").getValue());
     $$("ExpBkBillIns").setValue($$("ExpBkBillIns1").getValue());
     $$("ExpBkVisitPurp").setValue($$("ExpBkVisitPurp1").getValue());
     //$$("ExpBkBooker").setValue($$("ExpBkBooker1").getValue());
     $$("ExpBkSource").setValue($$("ExpBkSource1").getValue());
     $$("VouchNoBk").setValue($$("VouchNoBk1").getValue());
     $$("ReferenceBk").setValue($$("ReferenceBk1").getValue());     
     $$("ReserveInsBK").setValue($$("ReserveInsBK1").getValue());
     $$("GuestRequestBK").setValue($$("GuestSpRequestBK1").getValue());
     $$("CheckInInsBK").setValue($$("CheckInInsBK1").getValue());
     $$("CheckOutInsBK").setValue($$("CheckOutInsBK1").getValue());
     $$("PosInsBK").setValue($$("PosInsBK1").getValue());
     //$$("ExpBkBookerId").setValue($$("ExpBkBookerId1").getValue());
     $$("ExpBkSourceId").setValue($$("ExpBkSourceId1").getValue());     
     $$("ExpBkOthersPop").hide();     
 };

 //Booker Search
 function ExpBkBookerSrchPopupLoad() {
     
     webix.ui({
         view: "window",
         close: true,
         modal: true,
         id: "ExpBkBookerSrch",
         head: "Booker Search",
         position: "center",
         css: "WebIxStyle",
         height: 450,
         width: 750,
         move: true,
         on: {
             onShow: function () {
                 var vheight = window.innerHeight
                         || document.documentElement.clientHeight
                         || document.body.clientHeight;
                 var vWidth = window.innerWidth
                         || document.documentElement.clientWidth
                         || document.body.clientWidth;
                 if (vheight > 450) vheight = 450;
                 if (vWidth > 750) vWidth = 750;

                 $$("ExpBkBookerSrch").define("height", vheight);
                 $$("ExpBkBookerSrch").define("width", vWidth);
                 $$("ExpBkBookerSrch").adjust();

                 var Top = $$("gridExpBkBooker").getNode().offsetTop
                 $$("gridExpBkBooker").define("height", vheight - Top - 50);
                 $$("gridExpBkBooker").define("width", vWidth - 20);
                 $$("gridExpBkBooker").resize();
             }
         },
         body: {
             view: "form",
             id: "frmBookerSrch",
             padding:{top:0,bottom:0,left:1,right:1},
             elements: [            
                 {
                     view: "datatable",
                     id: "gridExpBkBooker",
                     select: 'row',
                     css: "webix_header_border",
                     fixedRowHeight: false,
                     resizeColumn: true,
                     autoConfig: true,
                     columns: [
                             { id: "TITLE", header: ["Title", { content: "textFilter", }], width: 60, css: { 'text-align': 'left ! important' }, },
                             { id: "BK_NM1", header: ["Last Name", { content: "textFilter", }], minWidth: 150, fillspace: true, css: { 'text-align': 'left ! important' }, },
                             { id: "BK_NM2", header: ["First Name", { content: "textFilter", }], width: 150,  css: { 'text-align': 'left ! important' }, },                             
                             { id: "PARTY_NM", header: ["Company", { content: "textFilter", }], width: 150, css: { 'text-align': 'left ! important' }, },
                             { id: "AD4", header: ["City", { content: "textFilter", }], width: 130,hidden:true, css: { 'text-align': 'left ! important' }, },
                             { id: "AD1", header: ["Add1", { content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, hidden: true },
                             { id: "AD2", header: ["Add1", { content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, hidden: true },
                             { id: "AD3", header: ["Add1", { content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, hidden: true },
                             { id: "ZIP", header: ["Zip", { content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, hidden: true },
                             { id: "TL_ID", header: ["Telephone", { content: "textFilter", }], width: 100, css: { 'text-align': 'left ! important' }, },
                             { id: "E_ID", header: ["Email", { content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, hidden: true },
                             { id: "F_ID", header: ["Fax", { content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, hidden: true },                             
                             { id: "C_NM", header: ["Mobile", { content: "textFilter", }], width: 100, css: { 'text-align': 'left ! important' }, },                             
                             { id: "BK_ID",  hidden: true },
                             { id: "CM_ID",  hidden: true },
                             { id: "T_ID",  hidden: true },
                             { id: "C_ID",  hidden: true },

                     ],
                     data: [],
                     on: {

                         'onItemDblClick': function (id) {
                             
                             ExpBkBookerSrchRet(id.row);
                         },
                         'onKeyPress': function (code,e) {
                             
                             var selRow = this.getSelectedItem();
                             if (selRow == null || selRow == undefined) selRow = $$("gridExpBkBooker").getFirstId();
                             var rowid = selRow.id;                             
                             if (code == '13') {
                                 ExpBkBookerSrchRet(rowid);
                             }

                         },

                     },
                     scheme: {
                         $init: function (item) {
                             
                             if (item.CLR != "" && item.CLR != null) {
                                 item.$css = { "color": item.CLR };
                             }
                         },
                     },
                     ready: function () {
                         ExpBkBookerSrchLoadData();
                     }
                 },

                 {
                     padding: { top: 10, left: 0, bottom: 5, right: 5, },
                     cols: [
                         {},
                         {
                             view: "button", type: "icon", maxWidth: 80, icon: "wxi-check", label: "Ok", inputWidth: 80, width: 80, click: function () {
                                 var selRow = $$("gridExpBkBooker").getSelectedItem(false);
                                 if (selRow == null || selRow == undefined) selRow = $$("gridExpBkBooker").getFirstId();
                                 var id = selRow.id;
                                 ExpBkBookerSrchRet(id);
                             }
                         },
                         { view: "button", type: "icon", maxWidth: 80,icon: "wxi-close", label: "Cancel", inputWidth: 80, width: 80, click: function () { $$("ExpBkBookerSrch").hide(); } }
                     ],
                 },

             ],
         }
     }).show();
     
 };
 function ExpBkBookerSrchLoadData() {
         
     var sStr = "";     
     webix.extend($$("frmBookerSrch"), webix.OverlayBox);
     $$("frmBookerSrch").showOverlay(PrgStr);
     try {
         Request = {
             REQTYPE: "GET_FNLOADBOOKER",
             COMPID: ExpBkCompId,
             USERID: ExpBkUserId,
             CONSTRING: ExpBkConnStr,             
         }             

         var DataVal = JSON.stringify(Request);
         if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
         var params = {
             async: true,
             url: ExpBkApiUrl,
             type: 'POST',
             //data: "request=" + DataVal,
             success: function (d) {
                 
                 if (d != "") {
                     var rowData =[];
                     if (BkAspxPage == true) rowData = JSON.parse(d.d);
                     else rowData = JSON.parse(d);
                     if (rowData != "") {                     
                         if (rowData.length > 0) {                         
                             $$("gridExpBkBooker").parse(rowData);
                             $$("gridExpBkBooker").refresh();
                             if ($$("gridExpBkBooker").count()) {
                                 $$("gridExpBkBooker").select($$("gridExpBkBooker").getFirstId());
                             }
                             webix.UIManager.setFocus($$("gridExpBkBooker"));
                         }
                     }
                 }
             },
             complete: function () {
                 $$("frmBookerSrch").hideOverlay();
             },
             error: function (request, status, error) {
                 console.log("Error Failrue");
                 $$("frmBookerSrch").hideOverlay();
             }
         }
         if (BkAspxPage == true) {
             params.contentType = "application/json;charset=utf-8";
             params.acceptType = "application/json;charset=utf-8";
             params.dataType = "json";
             params.data = JSON.stringify({ request: DataVal, URL: "FOAPI", ApiControler: "FoCommon/GetFoJsonReq" });
         }
         else params.data = "request=" + DataVal + "&URL= FOAPI&ApiControler=FoCommon/GetFoJsonReq";
         $.ajax(params); 
     }
     catch (e) {
         console.log(e.message)
         $$("frmBookerSrch").hideOverlay();
     }

 };
 function ExpBkBookerSrchRet(RowId) {
     
     
     var selRow = $$("gridExpBkBooker").getItem(RowId);
     var vId = selRow.BK_ID;
     var vItemNm2 = selRow.BK_NM2 == null?"":selRow.BK_NM2.toString().trim();
     var vItemNm1 = selRow.BK_NM1 == null?"":selRow.BK_NM1.toString().trim();
     var Ret_Nm = vItemNm2.toString().trim() + " " + vItemNm1.toString().trim();

     $$("ExpBkBookerId").setValue(vId);
     $$("ExpBkBooker").setValue(Ret_Nm);
     $$("ExpBkBookerSrch").hide();
 };
//till here

 //Source Search
 function ExpBkSourceSrchPopupLoad() {
     
     webix.ui({
         view: "window",
         close: true,
         modal: true,
         id: "ExpBkSourceSrch",
         head: "Source Search",
         position: "center",
         css: "WebIxStyle",
         height: 550,
         width: 450,
         move: true,
         body: {
             view: "form",
             id: "frmSourceSrch",
             padding:{top:0,bottom:0,left:1,right:1},
             elements: [            
                 {
                     view: "datatable",
                     id: "gridSource",
                     select: 'row',
                     css: "webix_header_border",
                     fixedRowHeight: false,
                     resizeColumn: true,
                     autoConfig: true,
                     columns: [
                            { id: "id", header: ["CC Id", { content: "textFilter", }], width: 100, css: { 'text-align': 'center ! important' }, hidden: true },
                            { id: "value", header: ["Company Name", { content: "textFilter", }], width: 280, fillspace: true, css: { 'text-align': 'left ! important' }, },
                            { id: "Place", header: ["Place", { content: "textFilter", }], width: 150, css: { 'text-align': 'left ! important' }, },

                     ],
                     data: [],
                     on: {

                         'onItemDblClick': function (id) {
                             
                             ExpBkSourceSrchRet(id.row);
                         },
                         'onKeyPress': function (code,e) {
                             
                             var selRow = this.getSelectedItem();
                             if (selRow == null || selRow == undefined) selRow = $$("gridSource").getFirstId();
                             var rowid = selRow.id;                             
                             if (code == '13') {
                                 ExpBkSourceSrchRet(rowid);
                             }

                         },
                     },
                     scheme: {
                         $init: function (item) {
                             
                             if (item.CLR != "" && item.CLR != null) {
                                 item.$css = { "color": item.CLR };
                             }
                         },
                     },
                     ready: function () {
                         ExpBkSourceSrchLoadData();
                     }
                 },

                 {
                     padding: { top: 10, left: 0, bottom: 5, right: 5, },
                     cols: [
                         {},
                         {
                             view: "button", type: "icon", maxWidth: 80, icon: "wxi-check", label: "Ok", inputWidth: 80, width: 80, click: function () {
                                 var selRow = $$("gridSource").getSelectedItem(false);
                                 if (selRow == null || selRow == undefined) selRow = $$("gridSource").getFirstId();
                                 var id = selRow.id;
                                 ExpBkSourceSrchRet(id);
                             }
                         },
                         { view: "button", type: "icon", maxWidth: 80,icon: "wxi-close", label: "Cancel", inputWidth: 80, width: 80, click: function () { $$("ExpBkSourceSrch").hide(); } }
                     ],
                 },

             ],
         }
     }).show();
     
 };
 function ExpBkSourceSrchLoadData() {
         
     var sStr = "";         
     webix.extend($$("frmSourceSrch"), webix.OverlayBox);
     $$("frmSourceSrch").showOverlay(PrgStr);
     try {
         Request = {
             REQTYPE: "GET_FNLOADCOMPANY",
             COMPID: ExpBkCompId,
             USERID: ExpBkUserId,
             CONSTRING: ExpBkConnStr,             
         }             

         var DataVal = JSON.stringify(Request);
         if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);
         var params = {
             async: true,
             url: ExpBkApiUrl,
             type: 'POST',
             //data: "request=" + DataVal,
             success: function (d) {
                 
                 if (d != "") {
                     var rowData =[];
                     if (BkAspxPage == true) rowData = JSON.parse(d.d);
                     else rowData = JSON.parse(d);
                     if (rowData != "") {                     
                         if (rowData.length > 0) {                         
                             $$("gridSource").parse(rowData);
                             $$("gridSource").refresh();
                             if ($$("gridSource").count()) {
                                 $$("gridSource").select($$("gridSource").getFirstId());
                             }
                             webix.UIManager.setFocus($$("gridSource"));
                         }
                     }
                 }
             },
             complete: function () {
                 $$("frmSourceSrch").hideOverlay();
             },
             error: function (request, status, error) {
                 console.log("Error Failrue");
                 $$("frmSourceSrch").hideOverlay();
             }
         }
         if (BkAspxPage == true) {
             params.contentType = "application/json;charset=utf-8";
             params.acceptType = "application/json;charset=utf-8";
             params.dataType = "json";
             params.data = JSON.stringify({ request: DataVal, URL: "FOAPI", ApiControler: "FoCommon/GetFoJsonReq" });
         }
         else params.data = "request=" + DataVal + "&URL= FOAPI&ApiControler=FoCommon/GetFoJsonReq";
         $.ajax(params); 
     }
     catch (e) {
         console.log(e.message)
         $$("frmSourceSrch").hideOverlay();
     }

 };
 function ExpBkSourceSrchRet(RowId) {
          
     var selRow = $$("gridSource").getItem(RowId);
     var vId = selRow.id;
     var vValue = selRow.value;
     var vCLR = selRow.CLR;

     if (vCLR) {
         if (vCLR == "red") {
             webix.alert({ type: 'warning', text: "Black Listed Company" });
             return false;

         }
         //else if (vCLR == "blue") {
         //    webix.alert({ type: 'warning', text: "Unapproved Company" });
         //    return false;
         //}

     }
     

     $$("ExpBkSourceId1").setValue(vId);
     $$("ExpBkSource1").setValue(vValue);
     $$("ExpBkSourceSrch").hide();
 };
//till here


 var fnExpBkGuestValid = function (InputString) {
     
     Request = {
         REQTYPE: "GET_FNRETGUESTNMVALID",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         INPUTSTRING: InputString
     }
     var rowData = "";
     requestData = JSON.stringify(Request);
     if (BkAspxPage == false) requestData = encodeURIComponent(requestData);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + requestData,
         success: function (d) {
             
             if (BkAspxPage == true) {
                 var data = d.d;
             }
             else var data = d;
             if (data != "") {
                 rowData = JSON.parse(data);
             }
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
         }
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: requestData, URL: "FO_URL", ApiControler: "FoGuestProf/GetFoJsonReq" });
     }
     else params.data = "request=" + requestData + "&URL= FO_URL&ApiControler=FoGuestProf/GetFoJsonReq";
     $.ajax(params);

     return rowData;

 };

 webix.UIManager.addHotKey("esc", function (view) {    
     if (view){ 
         
         var top = view.getTopParentView();
         if (top && top.setPosition){
             id = top.config.id;
             if(id=="BookingCreatePopup" || id =="ExpBkSourceSrch" || id =="ExpBkBookerSrch" || id == "ExpBkOthersPop" || id == "ComplNarPop" || 
                 id == "GuestSearchBK" || id== "ExpBkSpLnResSrchPop" || id == "DiscDetResPop" || id == "CancelResPop" || id == "ExpBkCompanySearchPOP" || 
                 id == "UpdrdDetResPop" || id == "ExpBkRateCodeSearchPOP" || id == "ComTracePopup") top.hide();
         }            
     }    
 }); 

 function fnGetUpdateMarketSegment () {
     
     
     var rowDatad = "";
     var CURRENCY = $$("BKCURRENCY_ID").getValue();
     if (CURRENCY == null || CURRENCY == "") CURRENCY = ExpBkBasCurrId;
     var sRateTy = $$("RateCodeidBK").getValue() == null ? "" : $$("RateCodeidBK").getValue();
     var sRmTy = $$("RoomTypeBK").getValue() == null ? "" : $$("RoomTypeBK").getValue();
     if(ExpBkUpgrade_Appl_Ind == "1"){
         if ($$("ddlRmUpgrdExpBk").getValue() != null && $$("ddlRmUpgrdExpBk").getValue() != "" && $$("ddlRmUpgrdExpBk").getValue() != "#N#"){
             sRmTy = $$("ddlRmUpgrdExpBk").getValue();            
         }
     }
     var RCompId = $$("CompanyidBK").getValue();
     var GuestId = $$("GuestId").getValue() == null ? "" : $$("GuestId").getValue();

     Request = {
         REQTYPE: "GET_FNGETUPDATEMARKETSEGMENT",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         USRID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         CONN_STRING: ExpBkConnStr,
         CURRENCY: CURRENCY,
         RATE_TY: sRateTy,
         ROOM_TY: sRmTy,
         R_COMP_ID: RCompId,
         GUEST_ID: GuestId,
     }
     
     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         success: function (d) {
             if (d != "") {
                 if (BkAspxPage == true) rowDatad = JSON.parse(d.d);
                 else rowDatad = JSON.parse(d);
                 if (rowDatad.MARK_SEG_ID != null && rowDatad.MARK_SEG_ID.toString().trim() != "") $$("ddlSegmentExpBk").setValue(rowDatad.MARK_SEG_ID.toString().trim());
                 if (rowDatad.GUEST_TY_ID != null && rowDatad.GUEST_TY_ID.toString().trim() != "") $$("ddlGuestTyBk").setValue(rowDatad.GUEST_TY_ID.toString().trim());
             }
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
         }
     };

     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
     }
     else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
     $.ajax(params);
     
 };

 function fnSetCompSegSrc() {
     

     var rowDatad = "";
     
     var RCompId = $$("CompanyidBK").getValue();
     var GuestId = $$("GuestId").getValue() == null ? "" : $$("GuestId").getValue();

     Request = {
         REQTYPE: "GET_FNSETCOMPSEGSRC",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         USRID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         CONN_STRING: ExpBkConnStr,         
         PARTY_ID: RCompId,
     }

     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         success: function (d) {
             if (d != "") {
                 if (BkAspxPage == true) rowDatad = JSON.parse(d.d);
                 else rowDatad = JSON.parse(d);

                 if (rowDatad != null && rowDatad != "") {
                     if (rowDatad.BUS_SOURCE != null && rowDatad.BUS_SOURCE != "") $$("BUSSOURCEIDBK").setValue(rowDatad.BUS_SOURCE.toString().trim());
                     if (rowDatad.MARK_SEG != null && rowDatad.MARK_SEG != "") $$("ddlSegmentExpBk").setValue(rowDatad.MARK_SEG.toString().trim());
                 }
             }
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
         }
     };

     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "WIN_COM_URL", ApiControler: "CommonWEBAPI/PostRequest" });
     }
     else params.data = "request=" + DataVal + "&URL= WIN_COM_URL&ApiControler=CommonWEBAPI/PostRequest";
     $.ajax(params);
     
 };

 function ExpBkLoadCurrDetails(CurrencyId) {
     //
     var rowDatad = [];
     
     //ExpBkCurDecLmt = 0;
     if (CurrencyId == "") return false;

     var newData = ExpBkCurrencyData.filter(function (el) {
         return el.id == CurrencyId;
     });
     if (newData.length > 0) {         
         //ExpBkCurDecLmt = newData[0].VAL_DECIM_LIMIT;
         $$("BKCURRENCY_NM").setValue(newData[0].SHRT_NM);
     }
 };

 function CurrFormatExpBk(value, Currfrmt, CurrDelimit, CurrDecimal) {
     //
     if (value == null || value == undefined || value == "") return "";
     if (isNaN(value)) return "";

     if (value.toString() != "") {
         if (Currfrmt == "L") {
             var x = parseFloat(value).toFixed(CurrDecimal);
             var neg = false;
             if (value < 0) {
                 neg = true;
                 //x = math.abs(x);
             }
             x = x.toString();
             var afterPoint = '';
             if (x.indexOf('.') > 0) {
                 ////afterPoint = x.substring(x.indexOf('.') + 1, x.length);
                 ////afterPoint = CurrDelimit + afterPoint
                 var vArr = x.split('.');
                 x = vArr[0].toString().trim();
                 afterPoint = vArr[1].toString().trim();
                 afterPoint = CurrDelimit + afterPoint
             }
             //x = Math.floor(x);                   

             x = x.toString();
             var lastThree = x.substring(x.length - 3);
             var otherNumbers = x.substring(0, x.length - 3);
             if (otherNumbers != '' && otherNumbers != '-')
                 lastThree = ',' + lastThree;
             if (afterPoint != "") return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
             else return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
         }
         else {
             var x = parseFloat(value).toFixed(CurrDecimal);
             var neg = false;
             if (value < 0) {
                 neg = true;
                 //x = math.abs(x);
             }

             x = x.toString();

             //var res = x.replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,")  //+ afterPoint;
             //var res = x.replace(/(\d{3})/g, "1,")
             var res = x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

             if (res.indexOf('.') > 0) {

                 res = res.replace(".", CurrDelimit)
             }


             return res;
         }
     }
     else {
         return value;
     }
 };
 function fnCurrFormatExpBk(value) {
     //
     return CurrFormatExpBk(value, ExpBkCurrFormat, ExpBkCurrDeLimit, ExpBkCurDecLmt);
 };

 function fnRetFromFGPD(Obj, UpdateAllGst) {
     debugger;
     if (Obj != undefined && Obj != null && Obj != "") {
         if (UpdateAllGst == "0" || UpdateAllGst == "") {
             var SelRow = $$("gridGstExpBk").getSelectedId(false);
             var rowid = SelRow.row;
             var SelItem = $$("gridGstExpBk").getItem(rowid);
             SelItem.F_IND = Obj.F_IND;
             SelItem.AR_PR_FLNO = Obj.AR_PR_FLNO;
             SelItem.AR_PR_DT = Obj.AR_PR_DT;
             SelItem.AR_PR_TM = Obj.AR_PR_TM;
             SelItem.AR_SEC_FLNO = Obj.AR_SEC_FLNO;
             SelItem.AR_SEC_DT = Obj.AR_SEC_DT;
             SelItem.AR_SEC_TM = Obj.AR_SEC_TM;
             SelItem.AR_TR_FLNO = Obj.AR_TR_FLNO;
             SelItem.AR_TR_DT = Obj.AR_TR_DT;
             SelItem.AR_TR_TM = Obj.AR_TR_TM;
             SelItem.AR_AD_CHR = Obj.AR_AD_CHR;
             SelItem.AR_CH_CHR = Obj.AR_CH_CHR;
             SelItem.DF_IND = Obj.DF_IND;
             SelItem.DP_PR_FLNO = Obj.DP_PR_FLNO;
             SelItem.DP_PR_DT = Obj.DP_PR_DT;
             SelItem.DP_PR_TM = Obj.DP_PR_TM;
             SelItem.DP_SEC_FLNO = Obj.DP_SEC_FLNO;
             SelItem.DP_SEC_DT = Obj.DP_SEC_DT;
             SelItem.DP_SEC_TM = Obj.DP_SEC_TM;
             SelItem.DP_TR_FLNO = Obj.DP_TR_FLNO;
             SelItem.DP_TR_DT = Obj.DP_TR_DT;
             SelItem.DP_TR_TM = Obj.DP_TR_TM;
             SelItem.DP_AD_CHR = Obj.DP_AD_CHR;
             SelItem.DP_CH_CHR = Obj.DP_CH_CHR;
             $$("gridGstExpBk").updateItem(rowid, SelItem);
             $$("gridGstExpBk").refresh(rowid);
             $$("gridGstExpBk").removeCellCss(rowid, "ixBtnGstTT", "PBtnClr");
             if (Obj.F_IND == "2" || Obj.DF_IND == "2") $$("gridGstExpBk").addCellCss(rowid, "ixBtnGstTT", "PBtnClr");
             
         }
         else {             
             $$("gridGstExpBk").eachRow(function (row) {
                                  
                 var SelItem = $$("gridGstExpBk").getItem(row);
                 var CheckInInd = SelItem.CHECKIN_IND;
                 if (CheckInInd != "1") {
                     SelItem.F_IND = Obj.F_IND;
                     SelItem.AR_PR_FLNO = Obj.AR_PR_FLNO;
                     SelItem.AR_PR_DT = Obj.AR_PR_DT;
                     SelItem.AR_PR_TM = Obj.AR_PR_TM;
                     SelItem.AR_SEC_FLNO = Obj.AR_SEC_FLNO;
                     SelItem.AR_SEC_DT = Obj.AR_SEC_DT;
                     SelItem.AR_SEC_TM = Obj.AR_SEC_TM;
                     SelItem.AR_TR_FLNO = Obj.AR_TR_FLNO;
                     SelItem.AR_TR_DT = Obj.AR_TR_DT;
                     SelItem.AR_TR_TM = Obj.AR_TR_TM;
                     SelItem.AR_AD_CHR = Obj.AR_AD_CHR;
                     SelItem.AR_CH_CHR = Obj.AR_CH_CHR;
                     SelItem.DF_IND = Obj.DF_IND;
                     SelItem.DP_PR_FLNO = Obj.DP_PR_FLNO;
                     SelItem.DP_PR_DT = Obj.DP_PR_DT;
                     SelItem.DP_PR_TM = Obj.DP_PR_TM;
                     SelItem.DP_SEC_FLNO = Obj.DP_SEC_FLNO;
                     SelItem.DP_SEC_DT = Obj.DP_SEC_DT;
                     SelItem.DP_SEC_TM = Obj.DP_SEC_TM;
                     SelItem.DP_TR_FLNO = Obj.DP_TR_FLNO;
                     SelItem.DP_TR_DT = Obj.DP_TR_DT;
                     SelItem.DP_TR_TM = Obj.DP_TR_TM;
                     SelItem.DP_AD_CHR = Obj.DP_AD_CHR;
                     SelItem.DP_CH_CHR = Obj.DP_CH_CHR;
                     $$("gridGstExpBk").updateItem(row, SelItem);
                     $$("gridGstExpBk").refresh(row);
                     $$("gridGstExpBk").removeCellCss(row, "ixBtnGstTT", "PBtnClr");
                     if (Obj.F_IND == "2" || Obj.DF_IND == "2") $$("gridGstExpBk").addCellCss(row, "ixBtnGstTT", "PBtnClr");
                     
                 }
             });

         }
     }
 };
 function FormResizeExpBk() {
     //

     var vMheight = window.innerHeight
             || document.documentElement.clientHeight
             || document.body.clientHeight;
     var vMWidth = window.innerWidth
             || document.documentElement.clientWidth
             || document.body.clientWidth;
     var vheight = vMheight;
     var vWidth = vMWidth;
     if (vheight > 520) vheight = 520;
     if (vWidth > 850) vWidth = 850;

     $$("frmBkCreat").define("height", vheight);
     $$("frmBkCreat").define("width", vWidth);
     $$("frmBkCreat").resize();
     
     $$("BookingCreatePopup").define("height", vheight);
     $$("BookingCreatePopup").define("width", vWidth);
     $$("BookingCreatePopup").resize();

     
     
     if ($$("GuestSearchBK")) {
         vheight = vMheight;
         vWidth = vMWidth;
         if (vheight > 550) vheight = 550;
         if (vWidth > 1060) vWidth = 1060;

         $$("frmExpBkGstSrch").define("height", vheight);
         $$("frmExpBkGstSrch").define("width", vWidth);
         $$("frmExpBkGstSrch").adjust();

         $$("GuestSearchBK").define("height", vheight);
         $$("GuestSearchBK").define("width", vWidth);
         $$("GuestSearchBK").adjust();
         
         var Top = $$("GuestSearchBKGrid").getNode().offsetTop
         $$("GuestSearchBKGrid").define("height", vheight - Top - 50);
         $$("GuestSearchBKGrid").define("width", vWidth - 20);
         $$("GuestSearchBKGrid").resize();
     }

     if ($$("PlanSrchPopExpBk")) {
         vheight = vMheight;
         vWidth = vMWidth;
         if (vheight > 450) vheight = 450;
         if (vWidth > 550) vWidth = 550;         

         $$("PlanSrchPopExpBk").define("height", vheight);
         $$("PlanSrchPopExpBk").define("width", vWidth);
         $$("PlanSrchPopExpBk").adjust();

         var Top = $$("gridPlanExpBk").getNode().offsetTop
         $$("gridPlanExpBk").define("height", vheight - Top - 100);
         $$("gridPlanExpBk").define("width", vWidth - 20);
         $$("gridPlanExpBk").resize();
     }

     if ($$("ExpBkBookerSrch")) {
         vheight = vMheight;
         vWidth = vMWidth;
         if (vheight > 450) vheight = 450;
         if (vWidth > 750) vWidth = 750;

         $$("ExpBkBookerSrch").define("height", vheight);
         $$("ExpBkBookerSrch").define("width", vWidth);
         $$("ExpBkBookerSrch").adjust();

         var Top = $$("gridExpBkBooker").getNode().offsetTop
         $$("gridExpBkBooker").define("height", vheight - Top - 100);
         $$("gridExpBkBooker").define("width", vWidth - 20);
         $$("gridExpBkBooker").resize();
     }

     if ($$("ExpBkCompanySearchPOP")) {
         vheight = vMheight;
         vWidth = vMWidth;

         if (vheight > 550) vheight = 550;
         if (vWidth > 450) vWidth = 450;

         $$("ExpBkCompanySearchPOP").define("height", vheight);
         $$("ExpBkCompanySearchPOP").define("width", vWidth);
         $$("ExpBkCompanySearchPOP").adjust();

         var Top = $$("ExpBkCompanySearchGrid").getNode().offsetTop
         $$("ExpBkCompanySearchGrid").define("height", vheight - Top - 100);
         $$("ExpBkCompanySearchGrid").define("width", vWidth - 20);
         $$("ExpBkCompanySearchGrid").resize();
     }
     if ($$("ExpBkRateCodeSearchPOP")) {

         vheight = vMheight;
         vWidth = vMWidth;
         if (vheight > 550) vheight = 550;
         if (vWidth > 1080) vWidth = 1080;

         $$("ExpBkRateCodeSearchPOP").define("height", vheight);
         $$("ExpBkRateCodeSearchPOP").define("width", vWidth);
         $$("ExpBkRateCodeSearchPOP").adjust();

         var Top = $$("ExpBkRateCodeSearch").getNode().offsetTop
         $$("ExpBkRateCodeSearch").define("height", vheight - Top - 100);
         $$("ExpBkRateCodeSearch").define("width", vWidth - 20);
         $$("ExpBkRateCodeSearch").resize();
     }
     if ($$("ComTracePopup")) {
         vheight = vMheight;
         vWidth = vMWidth;
         if (vheight > 600) vheight = 600;
         if (vWidth > 1150) vWidth = 1150;
         $$('ComTracePopup').define("width", vWidth);
         $$('ComTracePopup').define("height", vheight)
         $$('ComTracePopup').resize();
     }

     if ($$("ExpBkAdvDetWindow")) {
         vheight = vMheight;
         vWidth = vMWidth;
         if (vheight > 500) vheight = 500;
         if (vWidth > 800) vWidth = 800;
         $$('ExpBkAdvDetWindow').define("width", vWidth);
         $$('ExpBkAdvDetWindow').define("height", vheight)
         $$('ExpBkAdvDetWindow').resize();

         var Top = $$("gridExpBkAdv").getNode().offsetTop
         $$("gridExpBkAdv").define("height", vheight - Top - 100);
         $$("gridExpBkAdv").define("width", vWidth - 20);
         $$("gridExpBkAdv").resize();
     }

     

 };

 webix.event(window, "resize", function () {
     if ($$("BookingCreatePopup")) FormResizeExpBk();
 })


 function ExpBkTraceShow() {


     var Request = {
         COMP_ID: ExpBkCompId,
         USER_ID: ExpBkUserId,
         REG_NO: ExpBkRESERVE_NO,
         TYPE: ExpBkRESERVE_NO == "" ? "" : "1",
         VIEWMODE: "0",
         FROM_PAGE: "TC",

     }

     TraceWindowLoadExpBk(Request);

 };

 function TraceWindowLoadExpBk(Obj) {
     //
     if ($$("ComTracePopup")) {
         if ($$("ComTracePopup").isVisible() == true) return false;
     }
     var Host = window.location.host;
     var Protocall = window.location.protocol;     
     var LoadingUrl = Protocall + "//" + Host + "/Reports/WinTrace";
     var DataVal = JSON.stringify(Obj);
     DataVal = encodeURIComponent(DataVal);
     webix.ready(function () {         
         webix.ui({
             view: "window",
             close: true,            
             move: true,
             id: "ComTracePopup",
             head: "Trace",
             position: "center",
             modal: true,
             on: {
                 onShow: function () {
                     var vWidth = window.innerWidth
                                    || document.documentElement.clientWidth
                                    || document.body.clientWidth;
                     var vHeight = window.innerHeight
                                    || document.documentElement.clientHeight
                                    || document.body.clientHeight;
                     if (vWidth > 1150) vWidth = 1150;
                     
                     if (vHeight > 600) vHeight = 600;
                     $$('ComTracePopup').define("width", vWidth);
                     $$('ComTracePopup').define("height", vHeight)
                     $$('ComTracePopup').resize();
                 }
             },
             body: {
                 rows: [{
                     view: "iframe",
                     id: "frame-Trace",                     
                     src: LoadingUrl + "?Param=" + DataVal,
                 }
                 ],

             }
         }).show();

     })
 };

 function ExpBkfnChkTraceAvil() {
     
     var rowDatad = "";
     webix.html.removeCss($$("btnTraceExpBk").getNode(), "BtnClr");
    
     Request = {
         REQTYPE: "GET_FNCHECKTRACEAVAIL",
         COMP_ID: ExpBkCompId,
         USER_ID: ExpBkUserId,         
         CONSTRING: ExpBkConnStr,
         REG_NO: ExpBkRESERVE_NO,
         TYPE: "1",
         
     }

     var DataVal = JSON.stringify(Request);
     if (BkAspxPage == false) DataVal = encodeURIComponent(DataVal);

     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         success: function (d) {
             if (d != "") {
                 if (BkAspxPage == true) rowDatad = JSON.parse(d.d);
                 else rowDatad = JSON.parse(d);

                 if (rowDatad != null && rowDatad != "") {
                     if (rowDatad == "1") {
                         webix.html.addCss($$("btnTraceExpBk").getNode(), "BtnClr");
                     }
                 }
             }
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
         }
     };

     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: DataVal, URL: "LOGINURL", ApiControler: "WebLogin/LoginRequest" });
     }
     else params.data = "request=" + DataVal + "&URL= LOGINURL&ApiControler=WebLogin/LoginRequest";
     $.ajax(params);

 }; 

 function ExpBkFnLogbtnClick() {
     if (ExpBkRESERVE_NO != "") FoResAmendAuditLogLoadCom(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "RESERVATION", ExpBkApiUrl, BkAspxPage, ExpBkRESERVE_NO);     
 }

 function ExpBkFnAutoChrgbtnClick() {
     var ArrDt = $$("ArrivalBK").getText();
     var DepDt = $$("DepatureBK").getText();
     if (ArrDt != "" && DepDt != "") {
         fnFACShowautoChrgComPop(ExpBkCompId, ExpBkUserId, ExpBkConnStr, "TC", ExpBkApiUrl, BkAspxPage, ExpBkRESERVE_NO, "0", ArrDt, DepDt);
     }
 }
 
 function FoExpBkAdvDetWindowLoad() {

     
     webix.ready(function () {
         webix.ui({
             view: "window",
             close: true,
             modal: true,
             id: "ExpBkAdvDetWindow",
             head: "Advances",
             position: "center",
             css: "WebIxStyle",
             move: true,
             on: {
                 onShow: function () {
                     FormResizeExpBk();
                 },
             },
             body: {
                 id: "frmExpBkAdv",
                 view: 'form',
                 //css: "MyForm",
                 padding: { left: 1, right: 1, top: 0, bottom: 0 },
                 elements: [
                         {
                             id: "gridExpBkAdv",
                             select: 'row',
                             view: "datatable",
                             fixedRowHeight: false,
                             rowLineHeight: 23,
                             rowHeaderHeight: 30,
                             autoConfig: true,
                             editable: true,
                             //height: fnGridHght(),
                             position: "flex",
                             css: "webix_header_border",
                             data: [],
                             columns: [                                    
                                    { id: "ixTrnDate", header: "Date", width: 90, css: { 'text-align': 'center ! important' }, },
                                    { id: "ixRefNo", header: "Ref No.", width: 70, css: { 'text-align': 'center ! important' }, },
                                    { id: "ixMadeFor", header: 'Narration', minWidth: 100, fillspace: 2, css: { 'text-align': 'left ! important' }, hidden: true },
                                    { id: "ixTrnTy", header: "Narration", minWidth: 100, fillspace: 2, css: { 'text-align': 'left ! important' }, },
                                    { id: "ixTrnAmt", header: 'Amount', width: 100, css: { 'text-align': 'right ! important' }, },
                                    { id: "ixCurr", header: { text: 'Currency', }, minWidth: 70, minWidth: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                                    { id: "ixFornAmt", header: 'Forign Tariff', width: 100, css: { 'text-align': 'right ! important' }, hidden: true },
                                    { id: "ixUser", header: 'User', minWidth: 70, fillspace: 1, css: { 'text-align': 'left ! important' }, },
                                    { id: "CLR", hidden: true, },

                             ],
                             data: [],
                             scheme: {
                                 $init: function (item) {
                                     if (item.CLR != "" && item.CLR != null) {
                                         if (item.CLR == "TOTAL") item.$css = { "font-weight": "bold !important" };
                                     }
                                 },
                             },

                             on: {

                                 'onItemDblClick': function (id) {

                                 },

                                 onBlur: function () {

                                 },
                                 onBeforeClose: function () {
                                     return false;
                                 },
                             }
                         },
                         {
                             padding: { right: 20 },
                             cols: [{}, {
                                 view: "button", label: "OK", inputWidth: 60, width: 60,
                                 click: function () {
                                     $$("ExpBkAdvDetWindow").hide();
                                 }
                             }],
                         }

                 ]

             }

         }).show();
         fnExpBkAdvDetLoad();
     });

 };

 function fnExpBkAdvDetLoad() {
     //
     if (ExpBkRESERVE_NO == "") return false;
     $$("gridExpBkAdv").clearAll();
     webix.extend($$("gridExpBkAdv"), webix.OverlayBox);
     $$("gridExpBkAdv").showOverlay(PrgStr);     

     Request = {
         REQTYPE: "GET_FNADVDATALOAD",
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         RESNO: ExpBkRESERVE_NO,         
     }
     var rowData = [];
     requestData = JSON.stringify(Request);
     if (BkAspxPage == false) requestData = encodeURIComponent(requestData);
     var params = {
         async: true,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + requestData,
         success: function (d) {
             
             if (BkAspxPage == true) {
                 var data = d.d;
             }
             else var data = d;

             if (data != "") {
                 rowData = JSON.parse(data);                 
                 $$("gridExpBkAdv").parse(rowData.GridData);
                 

                 if (rowData.FornFound == "1") {
                     $$("gridExpBkAdv").showColumn("ixCurr");
                     $$("gridExpBkAdv").showColumn("ixFornAmt");
                 }
                 else {
                     $$("gridExpBkAdv").hideColumn("ixCurr");
                     $$("gridExpBkAdv").hideColumn("ixFornAmt");
                 }
                 $$("gridExpBkAdv").refresh();
             }

         },
         error: function () {
             console.log("Error Failrue");             
             $$("gridExpBkAdv").hideOverlay();
         },
         complete: function () {
             $$("gridExpBkAdv").hideOverlay();
         }
     }

     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: requestData, URL: "FOAPI", ApiControler: "FoReports/GetFoJsonReq" });
     }
     else params.data = "request=" + requestData + "&URL= FOAPI&ApiControler=FoReports/GetFoJsonReq";
     $.ajax(params);
     
 };

 function fnExpBkHideAllPop() {

     if($$("BUSSOURCEIDBK")) if($$("BUSSOURCEIDBK").isVisible() == true) if($$("BUSSOURCEIDBK").getPopup()) $$("BUSSOURCEIDBK").getPopup().hide();
     if ($$("RoomTypeBK")) if ($$("RoomTypeBK").isVisible() == true) if ($$("RoomTypeBK").getPopup()) $$("RoomTypeBK").getPopup().hide();
     if ($$("StatusBK")) if ($$("StatusBK").isVisible() == true) if ($$("StatusBK").getPopup()) $$("StatusBK").getPopup().hide();
     if ($$("ArrivalBK")) if ($$("ArrivalBK").isVisible() == true) if ($$("ArrivalBK").getPopup()) $$("ArrivalBK").getPopup().hide();
     if ($$("DepatureBK")) if ($$("DepatureBK").isVisible() == true) if ($$("DepatureBK").getPopup()) $$("DepatureBK").getPopup().hide();
     if ($$("ddlGuestTyBk")) if ($$("ddlGuestTyBk").isVisible() == true) if ($$("ddlGuestTyBk").getPopup()) $$("ddlGuestTyBk").getPopup().hide();
     if ($$("ddlRmUpgrdExpBk")) if ($$("ddlRmUpgrdExpBk").isVisible() == true) if ($$("ddlRmUpgrdExpBk").getPopup()) $$("ddlRmUpgrdExpBk").getPopup().hide();
     if ($$("ddlSegmentExpBk")) if ($$("ddlSegmentExpBk").isVisible() == true) if ($$("ddlSegmentExpBk").getPopup()) $$("ddlSegmentExpBk").getPopup().hide();
     if ($$("DueDTBK")) if ($$("DueDTBK").isVisible() == true) if ($$("DueDTBK").getPopup()) $$("DueDTBK").getPopup().hide();
     
 }

 function fnGetDefDtTimeExpBk() {
     var ArrDt = "";
     var DepDt = "";
     var StTm = "";
     var EndTm = "";
     Request = {
         REQTYPE: "GET_FNLOADRESDEFDTTM",        
         COMPID: ExpBkCompId,
         USERID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,         
     }
     var rowData = [];     
     requestData = JSON.stringify(Request);
     if (BkAspxPage == false) requestData = encodeURIComponent(requestData);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         //data: "request=" + requestData,
         success: function (d) {

             if (BkAspxPage == true) {
                 var data = d.d;
             }
             else var data = d;

             if (data != "") {
                 rowData = JSON.parse(data);
                 ArrDt = rowData.GDate;
                 DepDt = rowData.GDate;
                 StTm = rowData.ResStTm;
                 EndTm = rowData.ResEndTm;
             }
         },
         error: function () {
             console.log("Error Failrue");             
         },
         complete: function () {
             
         }
     }

     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.dataType = "json";
         params.data = JSON.stringify({ request: requestData, URL: "FOAPI", ApiControler: "FoCommon/GetFoJsonReq" });
     }
     else params.data = "request=" + requestData + "&URL= FOAPI&ApiControler=FoCommon/GetFoJsonReq";
     $.ajax(params);

     return [ArrDt,DepDt,StTm,EndTm];
 }


 function fnSaveAutoChrgeExpBk(ResNo) {
     Request = {
         REQTYPE: "RES_AutoChargeSave",
         COMPID: ExpBkCompId,
         USRID: ExpBkUserId,
         CONSTRING: ExpBkConnStr,
         RegNo: ResNo,
         Data: FAC_auto_grid_data,
     }
     var rowData = [];
     requestData = JSON.stringify(Request);
     var params = {
         async: false,
         url: ExpBkApiUrl,
         type: 'POST',
         dataType: "json",
         //data: "request=" + requestData,
         success: function (d) {
             if (BkAspxPage == true) {
                 var data = d.d;
             }
             else var data = d;

             if (data != "") {
                 rowDatad = JSON.parse(data);
             }
         },
         error: function (request, status, error) {
             console.log("Error Failrue");
         }
     }
     if (BkAspxPage == true) {
         params.contentType = "application/json;charset=utf-8";
         params.acceptType = "application/json;charset=utf-8";
         params.data = JSON.stringify({ request: requestData, URL: "FO_URL", ApiControler: "FOAPI/FORequest" });
     }
     else params.data = "request=" + requestData + "&URL= FO_URL&ApiControler=FOAPI/FORequest";
     $.ajax(params);
 }
 

