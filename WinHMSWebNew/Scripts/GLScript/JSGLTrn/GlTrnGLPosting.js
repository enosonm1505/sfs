
var app = angular.module('GLTApp', ['webix']);
var LoadTrnTy = "";
var LoadLinkRev = "";
app.controller("GLTransController", function ($scope) {
    
    
    $("#LoadDIv").hide();
    var date = new Date();
    date.setDate(date.getDate() );
    date.toLocaleDateString();  
    fnLoadDefault();
    var searchicon = "<span class='fa fa-search ' ></span>";
    $scope.frmGLPosting = {

        id: "frmGLPosting",
        view: 'form',
        minWidth: "1100",
        maxWidth: "5000",
        paddingX: 40,
        elements: [
            {
                paddingX: 10,
                PaddingY: 10,
                rows: [
                   {
                       rows: [
                           {
                               cols: [
                                       {
                                           view: "text",
                                           id: "TxtFYear",
                                           stringResult: true,
                                           label: "Fiscal Year",
                                           disabled: true,
                                           labelAlign: "Right",
                                           value: window.FiscalYrNm,
                                           labelWidth: 120,
                                           inputWidth: 350,
                                           width: 350,
                                       },
                               ]

                           },
                            {
                                cols: [
                                    {
                                        view: "combo",
                                        id: "ddlTrnTy",
                                        value: $("#hdnVchTy").val(),
                                        label: "Transaction Type",
                                        labelAlign: "Right",
                                        labelWidth: 120,
                                        inputWidth: 350,
                                        width: 350,
                                        options: LoadTrnTy,
                                        on: {
                                            onChange: function (newval, oldval) {
                                                debugger;
                                           

                                            }
                                        }
                                    },
                                    {width:30},
                                      {
                                          view: 'datepicker',
                                          label: 'Date',
                                          id: 'TrnDt',
                                          minWidth: 190,
                                          labelWidth: 40,
                                          inputWidth: 170,
                                          width: 170,
                                          stringResult: true,
                                          format: "%d/%m/%Y",
                                          value: date
                                      }


                                ]
                            },
                           {
                               cols: [
                                    
                                   {
                                       view: "text",
                                       id: "TxtFileNm",
                                       stringResult: true,
                                       label: "GL Export File",
                                       disabled: true,
                                       labelAlign: "Right",
                                    //   value: ($.trim($("#hdnTrnTy").val()) == "R" ? "Accounts Receivable" : "Accounts Payable"),
                                       labelWidth: 120,
                                       inputWidth: 350,
                                       width: 350,
                                   },
                                   {
                                       view: 'uploader',
                                       //  link: "Filelist",
                                       link: "doclist",
                                       accept: "text/plain",
                                       autosend: true, multiple: false,
                                      
                                       label: "E",
                                      // type: "icon",
                                      // icon: "wxi-search",
                                       id: 'BtnUpload',
                                       width: 30,
                                       minwidth: 30,
                                       inputwidth: 30,
                                       on: {
                                           onItemClick: function () {
                                             //  $$("btnDisplay").disable();
                                           },
                                           'onBlur': function () {
                                               // $$("ExcelImport").remove($$("ExcelImport").getFirstId());
                                               //$$("ExcelImport").refresh();
                                           },
                                           'onAfterFileAdd': function (upload) {
                                               //onBeforeFileAdd
                                           //    $$("ExcelImport").clearAll();
                                               $$("GridData").clearAll();
                                           
                                               debugger;
                                               var reader = new FileReader;
                                             
                                               reader.readAsText(upload.file);
                                               var Rows = [];
                                               var rows = reader.result.split("\n");
                                               for (var i = 0; i < rows.length; i++) {
                                                   var cells = rows[i].split("|");
                                                   var res = $.trim(cells[0]);
                                                   if (res == "GLID") {
                                                       var dt = $.trim(cells[3]);
                                                       if (dt != "")
                                                       {
                                                           dt = dt.substring(0, 8);
                                                           var dt1 = dt.substring(0, 4);
                                                           var dt2 = dt.substring(4, 6);
                                                           var dt3 = dt.substring(6, 8);
                                                        

                                                           dt = dt1 + "/" + dt2 + "/" + dt3;
                                                           dt = new Date(parseInt(dt1), parseInt(dt2)-1, parseInt(dt3));
                                                           $$("TrnDt").setValue(dt);
                                                       }

                                                   }
                                                   else if (res === "TND" || res == "MID") {
                                                       //for (var j = 0; j < cells.length; j++) {
                                                       var RevId = $.trim(cells[3]);
                                                       var RevNm = $.trim(cells[7]);
                                                       var Dr = "";
                                                       var Cr = "";
                                                       var newData = "";
                                                       if (res === "TND")
                                                       {
                                                           
                                                           Dr = $.trim(cells[5]);
                                                           var vData = LoadLinkRev;
                                                           if (RevId !== "") {
                                                               newData = vData.filter(function (el) {
                                                                   return $.trim(el.A_CODE) == $.trim(RevId);


                                                               });
                                                               var W_CODE = ""; var AC_TY = ""; var AC_CD = ""; var AC_NM = ""; var ANA_ID = "";

                                                               if (newData.length > 0) {
                                                                   W_CODE = $.trim(newData[0].W_CODE);
                                                                   AC_TY = $.trim(newData[0].AC_TY);
                                                                   AC_CD = $.trim(newData[0].AC_CD);
                                                                   AC_NM = $.trim(newData[0].AC_NM);
                                                                   ANA_ID = $.trim(newData[0].ANA_ID);


                                                               }
                                                               if (ANA_ID != "")
                                                                   var ANA_NM = "";
                                                               {
                                                                   newData = "";
                                                                   vData = $$("grdAnalysis").serialize();
                                                                   newData = vData.filter(function (el) {
                                                                       if (el.L_ID == "1") return $.trim(el.TC_ID) == ANA_ID;
                                                                   });
                                                                   if (newData.length > 0) {
                                                                       ANA_NM = $.trim(newData[0].TC_NM);
                                                                   }

                                                               }

                                                           }
                                                       }
                                                     


                                                       var set = {};                                                   
                                                       set = {
                                                           ixRevId: RevId, ixRev: RevNm, ixId: W_CODE, ixCd: AC_CD, ixNm: AC_NM, ixTy: AC_TY, ixAnaId: ANA_ID,
                                                           ixAnaNm: ANA_NM, ixDR:Dr, ixCR: '', ixNar: '', ixBIllDt: '', ixRefNm: '', ixFty: 'R'
                                                       };
                                                       Rows.push(set);

                                                       //}

                                                   }
                                                   //else {
                                                   //    break;
                                                   //}
                                                  
                                                 
                                               }
                                               $$("GridData").clearAll();
                                               $$("GridData").parse(Rows);
                                               $$("GridData").refresh();

                                               $$("TxtFileNm").setValue(upload.name);
                                               $$("btnDisplay").enable();
                                              //  return false;
                                           },
                                       }
                 
                                   },
                                   {
                                      
                                       id: "btnDisplay",
                                       view: 'button',
                                       label: 'Display',
                                       inputWidth: 80,
                                       labelWidth: 30,                                     
                                       width: 80,
                                      //  disabled: true,
                                       on: {
                                           onItemClick: function () {
                                               // fnLoadGridData();
                                               $$("GridData").add({
                                                   ixRevId: '', ixRev: '', ixId: '', ixCd: '', ixNm: '', ixTy: '', ixAnaId: '',
                                                   ixAnaNm: '', ixDR: '', ixCR: '', ixNar: '', ixBIllDt: '', ixRefNm: '', ixFty: ''
                                               });
                                               $$("GridData").refresh();
                                           }
                                       }
                                   },
                                 
                               ]
                           },
                          

                       ]
                   },
                   {
                       paddingY: 20,

                       cols: [
                          
                           {
                               view: "datatable",
                               id: "GridData",
                            //   hidden:true,
                               select: "row",
                               data: [],
                               minWidth: 500,
                               minHeight: 500,
                               editable: true,
                               hover: "gridHover",
                               tooltip: true,
                               scroll: true,
                               tooltip: function (obj, common) {
                                   //debugger;
                                   //if (common.column.id == "CommNarr")
                                   //    return "<i>" + obj[common.column.id] + "</i>";
                               },
                               columns: [
                                     { header: "RevId", id: "ixRevId", hidden: true },
                                    { header: "Revenue/Debtor", id: "ixRev", width: 200, css: { 'text-align': 'left ! important' }, tooltip: false },
                                    { header: "AC_ID", id: "ixId", hidden: true },
                                    { header: "AC_CD", id: "ixCd", hidden: true },
                                    { header: "Account", id: "ixNm", width: 200, css: { 'text-align': 'left ! important' }, tooltip: false },
                                    { id: "ixSelAc", header: ' ', template: searchicon, width: 30, css: { 'text-align': 'center ! important' } },
                                    { header: "ACTY", id: "ixTy", hidden: true },
                                    { header: "AnaId", id: "ixAnaId", hidden: true },
                                    { header: "Analysis", id: "ixAnaNm", width: 200, css: { 'text-align': 'left ! important' }, tooltip: false },
                                    { id: "ixSelAna", header: ' ', template: searchicon, width: 30, css: { 'text-align': 'center ! important' } },
                                    { header: "Dr", id: "ixDR", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false },
                                    { header: "Cr", id: "ixCR", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false },
                                    { header: "Narration", id: "ixNar", editor: "text", width: 150, css: { 'text-align': 'left ! important' }, tooltip: false },
                                    { header: "Bill Date", id: "ixBIllDt", width: 100,  editor: "text",css: { 'text-align': 'center ! important' }, tooltip: false },
                                    { header: "Ref Nm", id: "ixRefNm", hidden: true },
                                    { header: "FTy", id: "ixFty", hidden: true },

                              
                                     
                                  

                               ],
                               on: {
                     
                                  
                                   'onItemClick': function (id, index, cell) {
                                       if (id.column == 'ixSelAc') {
                                           var getval = this.getItem(id.row);

                                         
                                          var Dr = getval.ixDR;
                                          var Cr = getval.ixCR;
                                          var Drcr = "";
                                          if (Dr != "") Drcr = "1"; else Drcr = "2";
                                          var TrnTy=$$("ddlTrnTy").getValue();
                                          fnLoadAccountNm(TrnTy, Drcr);
                                           $$("AcNmSearchPop").show();
                                       }
                                       if (id.column == 'ixSelAna') {
                                           var getval = this.getItem(id.row);
                                           //fnLoadAnalysis();
                                           $$("AnalysisPop").show();
                                       }
                                      

                                   },
                                   'onBlur': function () {
                                       ////debugger;
                                       //$$("grdLoadBills").editStop();
                                       //$$("grdLoadBills").refresh();
                                   },
                               },
                               scheme: {
                                   $change: function (item) {

                                       if (item.ixNm != "" && item.ixNm != null) {
                                           debugger;
                                          
                                           var rowid = item.id;
                                           if (item.ixNm == "Total") {
                                               debugger;
                                              
                                               $$("GridData").addCellCss(rowid, "ixNm", "DatewiseTotal");
                                               $$("GridData").addCellCss(rowid, "ixDR", "DatewiseTotal");
                                               $$("GridData").addCellCss(rowid, "ixCR", "DatewiseTotal");
                                              
                                           }
                                           
                                          
                                       }
                                   },

                               },

                           }
                       ]
                   },
                   {
                       rows: [
                           {
                               cols: [
                                   {
                                       
                                   },
                                   {
                                      
                                   },
                                   {
                                        
                                     },
                               ]
                           }
                       ]
                   }
                ],
            }
        ]
    };

    fnCallAnalysisSearch();
    fnCallAcNmSearch();
  
   
   
 

});

function fnLoadGridData()
{
    debugger;
    $("#LoadDIv").show();
    var grid = $$("ExcelImport").serialize();
    var Rows = [];
    var vdt = "";
    var VchTy = "";
    var Prev = "";
    var Curr = "";
    var TotDr = "0"; var TotCr = "0";
    $.each(grid, function (key, value) {
        if ($.trim(value.ixCd) !== "" || $.trim(value.ixNm) !== "" || $.trim(value.ixDR) != "" || $.trim(value.ixCR) != "") {
            var set = {};
            var dt1 = value.ixDt;
            var A1 = ""; var A2 = ""; var A3 = ""; var A4 = ""; var A5 = ""; var A6 = "";
            if (dt1 != "" && dt1 != undefined) {
                dt1 = dt1.split('/');
                dt1 = new Date(parseInt(dt1["2"]), parseInt(dt1["1"]) - 1, parseInt(dt1["0"]));
                $$("VchDt").setValue(dt1);
                vdt = value.ixDt;
                Curr = vdt;

                if (Curr.trim() != Prev.trim() && Prev.trim() != "")
                {
                    set = {
                        ixNm: "Total", ixId: "*", ixDR: $.trim(TotDr), ixCR: $.trim(TotCr), ixhidvdt: "*"


                    };
                    Rows.push(set);
                    TotDr = "0"; TotCr = "0";
                   
                }
                Prev = Curr.trim();
                    
           
              

            }

            var newData = "";

            vData = LoadTrnTy//$$("ddlTrnTy").config.data;
            if ($.trim(value.ixVtyid) !== "") {
                newData = vData.filter(function (el) {
                    return $.trim(el.value) == $.trim(value.ixVtyid);


                });
                if (newData.length > 0) {
                    VchTy = $.trim(newData[0].id);
                    $$("ddlTrnTy").setValue(VchTy);

                }
            }


            if (value.data11 != "" && value.data11 != undefined) $$("TxtNarration").setValue(value.data11);
            var newData = "";
            vData = $$("grdAnalysis").serialize();
            if ($.trim(value.ixA1) !== "" || $.trim(value.ixA2) !== "" || $.trim(value.ixA3) !== "" || $.trim(value.ixA4) !== "" || $.trim(value.ixA5) !== "" || $.trim(value.ixA6) !== "")
                newData = vData.filter(function (el) {
                    if (el.L_ID == "1") return $.trim(el.TC_ID) == $.trim(value.ixA1);
                    else if (el.L_ID == "2") return $.trim(el.TC_ID) == $.trim(value.ixA2);
                    else if (el.L_ID == "3") return $.trim(el.TC_ID) == $.trim(value.ixA3);
                    else if (el.L_ID == "4") return $.trim(el.TC_ID) == $.trim(value.ixA4);
                    else if (el.L_ID == "5") return $.trim(el.TC_ID) == $.trim(value.ixA5);
                    else if (el.L_ID == "6") return $.trim(el.TC_ID) == $.trim(value.ixA6);


                });
            if (newData.length > 0) {
                A1 = (newData[0].TC_NM);
                if (newData[1] != undefined) A2 = (newData[1].TC_NM);
                if (newData[2] != undefined) A3 = (newData[2].TC_NM);
                if (newData[3] != undefined) A4 = (newData[3].TC_NM);
                if (newData[4] != undefined) A5 = (newData[4].TC_NM);
                if (newData[5] != undefined) A6 = (newData[5].TC_NM);
            }

            vData = $$("GrdAcNm").serialize();
            newData = "";
            var AcId = "";
            var AcNm = "";
            var AcCd = "";
            var BillAppl = "";
            var Aind = "";
            var Bind = "";
            var Cind = "";
            var Dind = "";
            var Eind = "";
            var Find = "";
            var Lind = "";
            var Mind = "";
            var Nind = "";
            var Oind = "";
            var AnaAppl = "";
            if ($.trim(value.ixCd) !== "") {
                AcCd = $.trim(value.ixCd);
                newData = vData.filter(function (el) {
                    return $.trim(el.AC_CD) == $.trim(value.ixCd);

                });
                if (newData.length > 0) {
                    AcId = (newData[0].AC_ID);
                    AcNm = $.trim(newData[0].AC_NM);
                    BillAppl = $.trim(newData[0].BILL_DETAIL_IND);
                    Aind = $.trim(newData[0].A_IND);
                    Bind = $.trim(newData[0].B_IND);
                    Cind = $.trim(newData[0].C_IND);
                    Dind = $.trim(newData[0].D_IND);
                    Eind = $.trim(newData[0].E_IND);
                    Find = $.trim(newData[0].F_IND);
                    Lind = $.trim(newData[0].L_IND);
                    Mind = $.trim(newData[0].M_IND);
                    Nind = $.trim(newData[0].N_IND);
                    Oind = $.trim(newData[0].O_IND);
                    if (Aind == "1" || Bind == "1" || Cind == "1" || Dind == "1" || Eind == "1" || Find == "1" || Lind == "1") AnaAppl = "1";
                }


            }

            if ($.trim(value.ixNm) !== "" && newData.length == 0) {
                newData = vData.filter(function (el) {
                    return $.trim(el.AC_NM) == $.trim(value.ixNm);

                });
                if (newData.length > 0) {
                    AcId = $.trim(newData[0].AC_ID);
                    AcCd = $.trim(newData[0].AC_CD);
                    AcNm = $.trim(newData[0].AC_NM);
                    BillAppl = $.trim(newData[0].BILL_DETAIL_IND);
                    Aind = $.trim(newData[0].A_IND);
                    Bind = $.trim(newData[0].B_IND);
                    Cind = $.trim(newData[0].C_IND);
                    Dind = $.trim(newData[0].D_IND);
                    Eind = $.trim(newData[0].E_IND);
                    Find = $.trim(newData[0].F_IND);
                    Lind = $.trim(newData[0].L_IND);
                    Mind = $.trim(newData[0].M_IND);
                    Nind = $.trim(newData[0].N_IND);
                    Oind = $.trim(newData[0].O_IND);
                    if (Aind == "1" || Bind == "1" || Cind == "1" || Dind == "1" || Eind == "1" || Find == "1" || Lind == "1") AnaAppl = "1";
                }
            }

            var drcr = "";
            if (parseFloat(value.ixDR) > 0)
            {
                drcr = "DR";
                TotDr = parseFloat(TotDr) + parseFloat(value.ixDR)
            }
            else
            {
                drcr = "CR";
                TotCr = parseFloat(TotCr) + parseFloat(value.ixCR)
            }
          

            set = {
                ixVtyid: VchTy, ixDt: value.ixDt, ixDRCR: drcr, ixCd: AcCd, ixNm: AcNm, ixId: AcId, ixDR: value.ixDR, ixCR: value.ixCR, ixRefNm: value.ixRefNm,
                ixRefDt: value.ixRefDt, ixNar: value.ixNar, ixComnar: value.ixComnar, ixA1: A1, ixA2: A2, ixA3: A3, ixA4: A4, ixA5: A5, ixA6: A6, ixHidA1: value.ixA1, ixHidA2: value.ixA2, ixHidA3: value.ixA3, ixHidA4: value.ixA4, ixHidA5: value.ixA5, ixHidA6: value.ixA6, ixhidvdt: vdt,
                ixBillAppl: BillAppl, ixAind: Aind, ixBind: Bind, ixCind: Cind, ixDind: Dind, ixEind: Eind, ixFind: Find, ixLind: Lind, ixMind: Mind, ixNind: Nind, ixOind: Oind, ixAnaappl: AnaAppl
            };
            Rows.push(set);
        }
    });


    set = {
        ixNm: "Total", ixId: "*", ixDR: $.trim(TotDr), ixCR: $.trim(TotCr), ixhidvdt: "*"


    };
    Rows.push(set);
    TotDr = "0"; TotCr = "0";
 
    $$("GridData").clearAll();
    $$("GridData").parse(Rows);
    $$("GridData").refresh();
    $("#LoadDIv").hide();
}

function fnLoadProperty() {

    var dataProp = fnPropertyLoad("1");

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "combo",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        label: "Property",
        labelwidth: 80,
        inputwidth: 180,
        width: 350,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                //debugger;
                $("#hdnCompId").val(newval);
            }
        }
    });
}

function fnLoadDefault() {
    debugger;

    //$("#LoadDIv").show();

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FNLOADDEFAULT";
    dataparam["PROGNAME"] = "GET_GLTRNGLPOSTING";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["GL_COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
 
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                window.FiscalYrNm = $.trim(rowData.FiscalYrNm); 
                LoadLinkRev = rowData.dtLinkRev;
                LoadTrnTy = rowData.dtTy;
                var lenval = rowData.dtTy.length;
                if (lenval != 0) {
                    for (i = 0; i < lenval; i++) {
                        if ($.trim(rowData.dtTy[i].value )== "Sales") {
                            $("#hdnVchTy").val($.trim(rowData.dtTy[i].id));
                            break;
                        }
                    }
                }
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });

    return rowData;
}

function fnGetAnaNm(lno,AnaId) {
    debugger;

    //$("#LoadDIv").show();

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FNVCHANANM";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["GL_COMPID"] = $("#hdnCompId").val();
    dataparam["LNO"] = lno;
    dataparam["ANAID"] = AnaId;
    //dataparam["TrnTy"] = $("#hdnTrnTy").val();
    //   dataparam["Option"] = "1";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);

                var lenval = rowData.length;
                if (lenval != 0) {
                   
                }
            }
        },
        error: function () {
            //$("#LoadDIv").hide();
        },
        complete: function () {
            //$("#LoadDIv").hide();
        }
    });

    return rowData;
}
function fnLoadAnalysis() {

    debugger;
    var rowData = "";
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_ANALYSISSEARCH";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["PLEVEL"] = "1";
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
   

    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                 rowData = JSON.parse(d);
                $$(grdAnalysis).clearAll();
                $$(grdAnalysis).parse(rowData);
                $$(grdAnalysis).refresh();
            }
        },
        error: function () {
           
        },
        complete: function () {
        
        }
    });
    return rowData;
}
function fnLoadAccountNm(TrnTy,DrCr) {

    debugger;
    var rowData = "";
    var dataparam = {};
    dataparam["REQTYPE"] = "GET_ACCOUNTNMSEARCH";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnTy"] = TrnTy;
    dataparam["DrCr"] = DrCr;


    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/GLTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
                $$("GrdAcNm").clearAll();
                $$("GrdAcNm").parse(rowData);
                $$("GrdAcNm").refresh();
            }
        },
        error: function () {

        },
        complete: function () {

        }
    });
    return rowData;
}


function fnCallAnalysisSearch() {
    debugger;
    //var Analist = fnLoadAnalysis();
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        hidden:true,
        id: "AnalysisPop",
        head: "Analysis Search",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,
        

        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,


            elements: [
                {
                    view: "datatable",
                    id: "grdAnalysis",
                    select: "row",
                    data:[],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "TC_ID", id: "TC_ID", hidden: true },
                             { header: "LID", id: "L_ID", hidden: true },
                            { header: ["Analysis Name.", { content: "textFilter" }], id: "TC_NM", width: 390, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            var getval = this.getItem(id.row);

                            var dataval = $$("GridData").getSelectedItem();
                            dataval.ixAnaNm = getval.TC_NM;
                            dataval.ixAnaId = getval.TC_ID;
                            $$("GridData").refresh();

                            $$("AnalysisPop").hide();
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 300,
                             paddingX: 300,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$("AnalysisPop").hide();
                                                   
                                                 }
                                             }
                                         },


                                     ]
                                 }
                             ]
                         }
                    ]
                }
            ]
        }
    });

   
   
}

function fnCallAcNmSearch() {
    debugger;
  
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        hidden: true,
        id: "AcNmSearchPop",
        head: "Account Search",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,


        body: {
            view: 'form',
            minWidth: 400,
            maxWidth: 400,


            elements: [
                {
                    view: "datatable",
                    id: "GrdAcNm",
                    select: "row",
                    data: [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: ["Code", { content: "textFilter" }], id: "AC_CD", width: 100, css: { 'text-align': 'left ! important' } },
                            { header: ["Account", { content: "textFilter" }], id: "AC_NM", width: 390, css: { 'text-align': 'left ! important' } },
                            { header: "AC_ID", id: "AC_ID", hidden: true },
                            { header: "BILL_DETAIL_IND", id: "BILL_DETAIL_IND", hidden: true },
                            { header: "A_IND", id: "A_IND", hidden: true },
                            { header: "B_IND", id: "B_IND", hidden: true },
                            { header: "C_IND", id: "C_IND", hidden: true },
                            { header: "D_IND", id: "D_IND", hidden: true },
                            { header: "E_IND", id: "E_IND", hidden: true },
                            { header: "F_IND", id: "F_IND", hidden: true },
                            { header: "L_IND", id: "L_IND", hidden: true },
                            { header: "M_IND", id: "M_IND", hidden: true },
                            { header: "N_IND", id: "N_IND", hidden: true },
                            { header: "O_IND", id: "O_IND", hidden: true },

                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                                var getval = this.getItem(id.row);
                          
                                var dataval = $$("GridData").getSelectedItem();
                                dataval.ixNm = getval.AC_NM;
                                dataval.ixId = getval.AC_ID;
                                dataval.ixCd = getval.AC_CD;
                                $$("GridData").refresh();
                          
                            $$("AcNmSearchPop").hide();

                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 300,
                             paddingX: 300,
                             rows: [
                                 {
                                     cols: [
                                         {
                                             view: 'button',
                                             label: 'Close',
                                             maxWidth: 70,
                                             on: {
                                                 onItemClick: function () {
                                                     $$("AcNmSearchPop").hide();

                                                 }
                                             }
                                         },


                                     ]
                                 }
                             ]
                         }
                    ]
                }
            ]
        }
    });



}
function fnSaveValid() {
    debugger;

    if ($$("TxtFileNm").getValue() == "") {
        AlertMessage('File not found');
        return false;
    }

    if ($$("ddlTrnTy").getValue() == "") {
        AlertMessage('Voucher type Cannot be empty');
        return false;
    }

    if ($$("TrnDt").getValue() == "") {
        AlertMessage('Voucher date Cannot be empty');
        return false;
    }
    

    
    var data = $$("GridData").serialize();
    var dataref = $$("GridData").serialize();
    var lenval = data.length;
    var lenvalref = dataref.length;
    if (lenval == 0) {
        AlertMessage('Voucher details Cannot be empty');
        return false;
    }

    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {
            if ($.trim(data[i].ixNm) == "") {
                AlertMessage("Account Name cannot be empty");
                return false;
            }
            if ($.trim(data[i].ixId) == "") {
                var Acnm = data[i].ixNm;
                AlertMessage("Account id cannot be empty for " + data[i].ixNm);
                return false;
            }
            if ($.trim(data[i].ixAnaId) == "") {
                var Acnm = data[i].ixNm;
                AlertMessage("Analysis Code cannnot be empty !...");
                return false;
            }

        }
       
    }




    return true;
}
function fnSaveVoucher() {
    $("#LoadDIv").show();
    if (fnSaveValid() == false) {
        $("#LoadDIv").hide();
        return false;
    }
    debugger;
    
    var BillData = $$("GridData").serialize(true);
    var lenval = BillData.length;

    var DataStore = [];

    var dataparam = {};

    debugger;

    if (lenval > 0) {
        
        DataStore = BillData;
    }

    dataparam["REQTYPE"] = "GET_GLPOSTINGSAVE";
    dataparam["PROGNAME"] = "GET_GLTRNGLPOSTING";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TrnDt"] = $.trim($$("TrnDt").getText());
    
  
   
    
    dataparam["TrnTy"] = $.trim($$("ddlTrnTy").getValue());
 
    dataparam["grdData"] = BillData;

    

    var DataVal = JSON.stringify(dataparam);
    var requestData = encodeURIComponent(DataVal);

    $.ajax({
        type: 'POST',
        async: true,
       // cache: false,
        url: "/GLTrans/COMAPI_CALL",
        data: "request=" + requestData,
        success: function (objRes) {
            //debugger;
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                if ($.trim(rowData) == "True") {
                    SuccessMsg('Saved Successfully');
                
                    $$("GridData").clearAll();
                    //$$("ExcelImport").clearAll();
                    $$("TxtFileNm").setValue("");
                }
                else {
                    AlertMessage($.trim(rowData));
                }

                $("#LoadDIv").hide();
            }


        },
        error: function () {
            $("#LoadDIv").hide();
        },
        complete: function () {
            $("#LoadDIv").hide();
        }
    });
    $("#LoadDIv").hide();
}


function AlertMessage(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Alert Message",
        text: Text,
        modal: true,
    }).then(function (result) {

    })
}

function SuccessMsg(Text) {
    return webix.alert({
        ok: "Ok",
        width: 350,
        title: "Message",
        text: Text,
        modal: true,
    }).then(function (result) {
        //window.location.reload();
    })
}

webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    debugger;
    var vWidth = $("#divform").width();
    $$("frmGLPosting").define("width", vWidth);
    $$("frmGLPosting").resize();
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;


    $$("frmGLPosting").define("height", vheight - 100);
    $$("frmGLPosting").resize();
    var vWidth = $("#divform").width();
    $$("frmGLPosting").define("width", vWidth);
    $$("frmGLPosting").resize();
    if (choice == "1") {
        var offsetTop = $$("GridData").getNode().offsetTop;


        $$("GridData").define("height", ((vheight - offsetTop - 160)));
        $$("GridData").adjust();
    }





}

webix.event(window, "resize", function () {
    gridResize("1");
})
function gridResize(choice) {
    debugger;
    var vWidth = $("#divform").width();
    $$("frmGLPosting").define("width", vWidth);
    $$("frmGLPosting").resize();
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;


    $$("frmGLPosting").define("height", vheight - 100);
    $$("frmGLPosting").resize();
    var vWidth = $("#divform").width();
    $$("frmGLPosting").define("width", vWidth);
    $$("frmGLPosting").resize();
    if (choice == "1") {
        var offsetTop = $$("GridData").getNode().offsetTop;


        $$("GridData").define("height", ((vheight - offsetTop - 160)));
        $$("GridData").adjust();
    }





}
