
var app = angular.module('GLTApp', ['webix']);
var LoadTrnTy = "";
app.controller("GLTransController", function ($scope) {
    
    
    $("#LoadDIv").hide();
    var TrnTy = fnTrnTyLoad();
    var searchicon = "<span class='fa fa-search ' ></span>";
    $scope.frmImpExlVouch = {

        id: "frmImpExlVouch",
        view: 'form',
        minWidth: 1200,
        maxWidth: 5000,
        minHeight: 550,
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
                                       id: "TxtExcelNm",
                                       stringResult: true,
                                       label: "Excel File",
                                       disabled: true,
                                       labelAlign: "Right",
                                    //   value: ($.trim($("#hdnTrnTy").val()) == "R" ? "Accounts Receivable" : "Accounts Payable"),
                                       labelWidth: 120,
                                       inputWidth: 350,
                                       width: 350,
                                   },
                                   {
                                       view: 'uploader',//button
                                       link: "Filelist",
                                       label: "E",
                                       //type: "icon",
                                       //icon: "wxi-search",
                                       id: 'BtnUpload',
                                       width: 30,
                                       minwidth: 30,
                                       inputwidth: 30,
                                       on: {
                                           onItemClick: function () {
                                               $$("btnDisplay").disable();
                                           },
                                           'onBlur': function () {
                                                $$("ExcelImport").remove($$("ExcelImport").getFirstId());
                                               $$("ExcelImport").refresh();
                                           },
                                           onBeforeFileAdd: function (upload) {
                                               $$("ExcelImport").clearAll();
                                               $$("GridData").clearAll();
                                               debugger;
                                               var MapColumn = [                                     
                                            { header: "Vouch Ty", id: "ixVtyid", width: 100, map: "#data" + "0" + "#" },
                                             { header: "Vouch Dt", id: "ixDt", width: 100,map: "#data" + "1" + "#" },
                                            { header: "D/C", id: "ixDRCR", width: 50, map: "#data" + "2" + "#" },
                                               { header: "AC_CD", id: "ixCd", width: 100, map: "#data" + "3" + "#" },
                                               { header: "Ac_Name", id: "ixNm", width: 200, map: "#data" + "4" + "#" },                                               
                                               { header: "Dr", id: "ixDR", width: 100, map: "#data" + "6" + "#" },
                                                { header: "Cr", id: "ixCR", width: 100, map: "#data" + "7" + "#" },
                                                  { header: "Ref#", id: "ixRefNm", width: 100, map: "#data" + "8" + "#" },
                                                { header: "Ref Date", id: "ixRefDt", width: 100, map: "#data" + "9" + "#" },
                                                 { header: "Narration", id: "ixNar", width: 150, map: "#data" + "10" + "#" },
                                                   { header: "Common Narration", id: "ixComnar", width: 150, map: "#data" + "11" + "#" },
                                               
                                                  { header: "Ana1", id: "ixA1", width: 100, map: "#data" + "12" + "#" },
                                                { header: "Ana2", id: "ixA2", width: 100, map: "#data" + "13" + "#" },
                                                { header: "Ana3", id: "ixA3", width: 100, map: "#data" + "14" + "#" },
                                                { header: "Ana4", id: "ixA4", width: 100, map: "#data" + "15" + "#" },
                                                 { header: "Ana5", id: "ixA5", width: 100, map: "#data" + "16" + "#" },
                                                    { header: "Ana6", id: "ixA6", width: 100, map: "#data" + "17" + "#" },
                                                

                                                ];
                                               debugger;
                                               $$("ExcelImport").config.columns = MapColumn;                                            
                                               $$("ExcelImport").refreshColumns();                                              
                                               $$("ExcelImport").parse(upload.file, "excel");
                                               $$("TxtExcelNm").setValue(upload.name);
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
                                        disabled: true,
                                       on: {
                                           onItemClick: function () {
                                               fnLoadGridData();
                                           }
                                       }
                                   },
                                    {
                                            view: "text",
                                            id: "txtVouchNo",
                                            stringResult: true,
                                            label: "Voucher No",
                                            labelAlign: "Right",
                                            labelWidth: 90,
                                            inputWidth: 180,
                                            width: 180,
                                           
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
                                       inputWidth: 320,
                                       width: 350,
                                       options: TrnTy,
                                       on: {
                                           onChange: function (newval, oldval) {
                                               debugger;
                                               var TrnTy = newval;
                                               fnLoadAccountNm(TrnTy, "");
                                               
                                           }
                                       }
                                   },
                                   {
                                      
                                       width: 30,
                                   },
                                  
                                   {
                                       width: 80,
                                   },
                                   {
                                       view: 'datepicker',
                                       label: 'Voucher Date',
                                       id: 'VchDt',                                     
                                       minWidth: 190,
                                       labelWidth: 90,
                                       inputWidth: 210,
                                       labelAlign: "Right",
                                       width: 220,
                                       stringResult: true,
                                       format: "%d/%m/%Y",
                                       // value: date
                                   }
                               ]
                           },
                           {
                               cols: [
                                   {
                                       view: "text",
                                       id: "TxtNarration",
                                       stringResult: true,
                                       label: "Narration",
                                       labelAlign: "Right",
                                       labelWidth: 120,
                                       inputWidth: 350,
                                        width: 350,
                                   },
                                   {
                                       
                                   },
                                   {
                                       
                                   },
                                   {
                                       
                                    },
                                    {
                                          
                                    },
                               ]
                           }
                       ]
                   },
                   {
                       paddingY: 20,

                       cols: [
                           {
                               view: "datatable",
                               id: "ExcelImport",
                               select: "row",
                               data: [],
                               width: 1200,
                               height: 430,//350,
                               hidden:true,
                               editable: true,
                               hover: "gridHover",
                               tooltip: true,
                               scroll: true,
                               tooltip: function (obj, common) {
                                   debugger;
                                   if (common.column.id == "CommNarr")
                                       return "<i>" + obj[common.column.id] + "</i>";
                               },
                               columns: [
                                    { header: "Voucher Ty", id: "ixVtyid", hidden: true },
                                        { header: "Vouch Dt", id: "ixDt", hidden: true },
                                       { header: "D/C", id: "ixDRCR", width: 50, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "AC_CD", id: "ixCd", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                       { header: "Ac_Name", id: "ixNm", width: 200, css: { 'text-align': 'center ! important' }, tooltip: false },
                                        { header: "Dr", id: "ixDR", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false },
                                        { header: "Cr", id: "ixCR", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false },
                                        { header: "Ref#", id: "ixRefNm", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Ref Date", id: "ixRefDt", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "Narration", id: "ixNar", width: 150, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Common Narration", id: "ixComnar", width: 150, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Ana1", id: "ixA1", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Ana2", id: "ixA2", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Ana3", id: "ixA3", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                       { header: "Ana4", id: "ixA4", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                       { header: "Ana5", id: "ixA5", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Ana6", id: "ixA6", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                      
                               ],
                           },
                           {
                               view: "datatable",
                               id: "GridData",
                            //   hidden:true,
                               select: "row",
                               data: [],
                               //width: 1100,
                               height: 430,//350,
                               editable: true,
                               hover: "gridHover",
                               tooltip: true,
                               scroll: true,
                               tooltip: function (obj, common) {
                                   debugger;
                                   if (common.column.id == "CommNarr")
                                       return "<i>" + obj[common.column.id] + "</i>";
                               },
                               columns: [
                                    { header: "Voucher Ty", id: "ixVtyid", hidden: true },
                                        { header: "Vouch Dt", id: "ixDt", hidden: true },
                                       { header: "D/C", id: "ixDRCR", width: 50, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "AC_CD", id: "ixCd", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                       { header: "Ac_Name", id: "ixNm", width: 200, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "AC_ID", id: "ixId", hidden: true },
                                        { id: "Select", header: ' ', template: searchicon, width: 30, css: { 'text-align': 'center ! important' } },
                                        { header: "Dr", id: "ixDR", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false },
                                        { header: "Cr", id: "ixCR", width: 100, css: { 'text-align': 'right ! important' }, tooltip: false },
                                        { header: "Ref#", id: "ixRefNm", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Ref Date", id: "ixRefDt", width: 100, css: { 'text-align': 'center ! important' }, tooltip: false },
                                       { header: "Narration", id: "ixNar", width: 150, css: { 'text-align': 'left ! important' }, tooltip: false },
                                       { header: "Common Narration", id: "ixComnar", width: 150, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Ana1", id: "ixA1", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Ana2", id: "ixA2", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Ana3", id: "ixA3", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                       { header: "Ana4", id: "ixA4", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                       { header: "Ana5", id: "ixA5", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                       { header: "Ana6", id: "ixA6", width: 100, css: { 'text-align': 'left ! important' }, tooltip: false },
                                       { header: "Ana7", id: "ixA7", hidden: true },
                                       { header: "Ana8", id: "ixA8", hidden: true },
                                       { header: "Ana9", id: "ixA9", hidden: true },
                                       { header: "Ana10", id: "ixA10", hidden: true },
                                       { header: "HidVdt", id: "ixhidvdt", hidden: true },
                                        { header: "AnaAppl", id: "ixAnaappl", hidden: true },
                                         { header: "Cby", id: "ixCBy", hidden: true },
                                       { header: "AcId", id: "ixacid", hidden: true },
                                         { header: "BillAppl", id: "ixBillAppl", hidden: true },
                                           { header: "A_IND", id: "ixAind", hidden: true },
                                            { header: "B_IND", id: "ixBind", hidden: true },
                                             { header: "C_IND", id: "ixCind", hidden: true },
                                              { header: "D_IND", id: "ixDind", hidden: true },
                                               { header: "E_IND", id: "ixEind", hidden: true },
                                                { header: "F_IND", id: "ixFind", hidden: true },
                                             { header: "L_IND", id: "ixLind", hidden: true },
                                              { header: "M_IND", id: "ixMind", hidden: true },
                                               { header: "N_IND", id: "ixNind", hidden: true },
                                                  { header: "O_IND", id: "ixOind", hidden: true },


                                     { header: "", id: "ixHidA1", hidden: true },
                                       { header: "", id: "ixHidA2", hidden: true },
                                       { header: "", id: "ixHidA3", hidden: true },
                                       { header: "", id: "ixHidA4", hidden: true },
                                       { header: "", id: "ixHidA5", hidden: true },
                                        { header: "", id: "ixHidA6", hidden: true },

                               ],
                               on: {
                     
                                  
                                   'onItemClick': function (id, index, cell) {
                                       if (id.column == 'Select') {
                                           var getval = this.getItem(id.row);

                                         
                                          var Dr = getval.ixDR;
                                          var Cr = getval.ixCR;
                                          var Drcr = "";
                                          if (Dr != "") Drcr = "1"; else Drcr = "2";
                                          var TrnTy=$$("ddlTrnTy").getValue();
                                          fnLoadAccountNm(TrnTy, Drcr);
                                           $$("AcNmSearchPop").show();
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
    fnLoadAccountNm( $("#hdnVchTy").val(), "");
 
    //gridResize("1");
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

function fnTrnTyLoad() {
    //debugger;

    //$("#LoadDIv").show();

    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_FNVCHAPPRTRNTY";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["GL_COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
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
                LoadTrnTy = JSON.parse(d);
                var lenval = rowData.length;
                if (lenval != 0) {
                    for (i = 0; i < lenval; i++) {
                        if (i == 0) {
                            $("#hdnVchTy").val(rowData[i].id);
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
                //$$(grdAnalysis).clearAll();
                //$$(grdAnalysis).parse(rowData);
                //$$(grdAnalysis).refresh();
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
    var Analist = fnLoadAnalysis();
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
                    data:Analist,// [],
                    height: 350,
                    scroll: "y",
                    columns: [
                            { header: "TC_ID", id: "TC_ID", hidden: true },
                             { header: "LID", id: "L_ID", hidden: true },
                            { header: ["Analysis Name.", { content: "textFilter" }], id: "TC_NM", width: 390, css: { 'text-align': 'left ! important' } },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                           
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

    if ($$("TxtExcelNm").getValue() == "") {
        AlertMessage('File not found');
        return false;
    }

    if ($$("ddlTrnTy").getValue() == "") {
        AlertMessage('Voucher type Cannot be empty');
        return false;
    }

    if ($$("VchDt").getValue() == "") {
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
                AlertMessage("Account id cannot be empty for "+  data[i].ixNm);
                return false;
            }

            if ($.trim(data[i].ixAnaappl) == "1") {
               
                if (data[i].ixA1 == "" && data[i].ixA2 == "" && data[i].ixA3 == "" && data[i].ixA4 == "" && data[i].ixA5 == "" && data[i].ixA6 == "")
                {
                    AlertMessage("Analysis code not defined");
                    return false;
                }

                if (data[i].ixAind == "1" && data[i].ixA1 == "") {
                    AlertMessage("Analysis code 1 not defined");
                    return false;
                }
                if (data[i].ixBind == "1" && data[i].ixA2 == "") {
                    AlertMessage("Analysis code2 not defined");
                    return false;
                }

                if (data[i].ixCind == "1" && data[i].ixA3 == "") {
                    AlertMessage("Analysis code3 not defined");
                    return false;
                }
                if (data[i].ixDind == "1" && data[i].ixA4 == "") {
                    AlertMessage("Analysis code4 not defined");
                    return false;
                }
                if (data[i].ixEind == "1" && data[i].ixA5 == "") {
                    AlertMessage("Analysis code5 not defined");
                    return false;
                }
                if (data[i].ixFind == "1" && data[i].ixA6 == "") {
                    AlertMessage("Analysis code6 not defined");
                    return false;
                }
                
            }
           
            

           
            //vData = $$("GrdAcNm").serialize();
            //var   newData = vData.filter(function (el) {
            //    return $.trim(el.AC_ID) == $.trim(data[i].ixId);

            //});
          //  var BillAppl = "";
            //if (newData.length > 0) {                
            //    BillAppl = $.trim(newData[0].BILL_DETAIL_IND);
            //}
            if ( $.trim(data[i].ixBillAppl) == "1")
            {
                if ($.trim(data[i].ixRefNm) == "") {

                    AlertMessage("Ref Name cannot be empty");
                    return false;
                }
                for (j = 0; j < lenvalref; j++) {
                    if (i != j)
                    {
                        if ($.trim(data[i].ixRefNm) == $.trim(data[j].ixRefNm) && $.trim(data[i].ixId) == $.trim(data[j].ixId))
                        {
                            AlertMessage("Reference Name already  exists");
                            return false;
                        }
                    }

                }
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

    dataparam["REQTYPE"] = "GET_IMPORTVOUCHERSAVE";
    dataparam["PROGNAME"] = "GET_GLTRNIMPORTVOUCHER";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["txtVouchDt"] = $.trim($$("VchDt").getText());
    
    dataparam["txtVouchNo"] = $.trim($$("txtVouchNo").getValue());
   
    
    dataparam["TrnTy"] = $.trim($$("ddlTrnTy").getValue());// $.trim($("#hdnVchTy").val());
    dataparam["txtNarr"] = $.trim($$("TxtNarration").getValue());
    
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
                    $$("ExcelImport").clearAll();
                    $$("TxtExcelNm").setValue("");
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
    $$("frmImpExlVouch").define("width", vWidth);
    $$("frmImpExlVouch").resize();
    var vheight = window.innerHeight
           || document.documentElement.clientHeight
           || document.body.clientHeight;


    $$("frmImpExlVouch").define("height", vheight - 100);
    $$("frmImpExlVouch").resize();
    var vWidth = $("#divform").width();
    $$("frmImpExlVouch").define("width", vWidth);
    $$("frmImpExlVouch").resize();
    if (choice == "1") {
        var offsetTop = $$("GridData").getNode().offsetTop;


        $$("GridData").define("height", ((vheight - offsetTop - 160)));
        $$("GridData").adjust();
    }





}
