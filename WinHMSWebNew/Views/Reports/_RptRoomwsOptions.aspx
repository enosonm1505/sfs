<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<FoAnalysisReports.Models.ClsContribution>" %>
 <script>
     $(document).ready(function () {
         webix.ui({
             view: "window",
             close: true,
             modal: true,
             id: "RmwsIncomAnalOpt",
             head: "Analysis By",
             position: "center",
             css: "WebIxStyle",
             height: 500,
             width: 300,
             move: true,
             body: {
                 padding: { top: 20, left: 30, bottom: 20, right: 10 },
                 rows: [
                    { view: "checkbox", id: "chkRev", labelWidth: 5, labelRight: "Revenue", customCheckbox: false, },
                    { view: "checkbox", id: "chkARR", labelWidth: 5, labelRight: "ARR", customCheckbox: false, },
                    { view: "checkbox", id: "chkNtWComp", labelWidth: 5, labelRight: "Nights with Comp", customCheckbox: false, },
                    { view: "checkbox", id: "chkNtWoutComp", labelWidth: 5, labelRight: "Nights without Comp", customCheckbox: false, },                    
                    { cols: [{}, { view: "button", type: "icon", id: "Okoptions", icon: "wxi-check", label: "OK", inputWidth: 80, width: 80, click: function () { fnOkClick(); } }], }
                 ]
             }
         });
     });

     function fnOkClick() {

         var vchkRev = $$("chkRev").getValue();
         var vchkARR = $$("chkARR").getValue();
         var vchkNtWComp = $$("chkNtWComp").getValue();
         var vchkNtWoutComp = $$("chkNtWoutComp").getValue();         

         if (vchkRev == "" && vchkARR == "" && vchkNtWComp == "" && vchkNtWoutComp == "") {
             webix.message("Select atleast one Analysis By", "warning", 500);             
             return;
         }

         var CHKREV = $$("chkRev").getValue();         
         var CHKARR = $$("chkARR").getValue();
         var CHKRN = $$("chkNtWComp").getValue();
         var CHKRNWO = $$("chkNtWoutComp").getValue();

         $("#CHK_REV").val(CHKREV);
         $("#CHK_ARR").val(CHKARR);
         $("#CHK_RN").val(CHKRN);
         $("#CHK_RNWO").val(CHKRNWO);

         $$("RmwsIncomAnalOpt").hide();
         $("#btnDisplay").click();
     }

</script>
