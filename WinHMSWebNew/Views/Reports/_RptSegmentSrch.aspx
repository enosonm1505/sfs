<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<FoAnalysisReports.Models.ClsContribution>" %>

 <script>
     $(document).ready(function () {
         webix.ui({
             view: "window",
             close: true,
             modal: true,
             id: "RptSegmentSrchPopUp",
             head: "Segment Search",
             position: "center",
             css: "WebIxStyle",
             height: 500,
             width: 383,
             move: true,
             body: {
                 rows: [
                    {
                        view: "datatable",
                        id: "Segmentgrid",
                        select: 'row',
                        //editable: true,
                        css: "webix_header_border",
                        scrollX: false,
                        columns: [
                                { id: "NM", header: ['Segment', { content: "textFilter", }], width: 335, css: { 'text-align': 'left ! important' }, },
                                { id: "SegChk", editor: "Checkbox", header: [{ content: "masterCheckbox", checked: "on", css: { 'padding': '0px ! important' } }], width: 30, css: "check_box", template: "{common.checkbox()}" },
                                { id: "ID", hidden: true },
                        ],
                        data: [],

                    },
                    {
                        rows: [
                            {
                                cols: [                                  
                                        
                                     {
                                         padding:{right:10},
                                         rows:[         
                                                { view: "label", id: "lblGroup", labelWidth: 100, label: "Group", "align": "right", },
                                                {},
                                                {}
                                         ]
                                     },                                        
                                    
                                    {
                                        type:"space",
                                        rows: [
                                            
                                            { view: "checkbox", id: "ChkConsolidate", labelWidth: 130, label: "Datewise", customCheckbox: false, click: function () { ChkConsolidate_Click(); } },
                                            { view: "checkbox", id: "ChkSegmntwise", labelWidth: 130, label: "Segment Datewise", customCheckbox: false,click: function () { ChkSegmntwise_Click(); } },
                                            { view: "checkbox", id: "ChkSummary", labelWidth: 130, label: "Segmentwise", customCheckbox: false, click: function () { ChkSummary_Click(); }},
                                        ]
                                    }
                                ]
                            },
                            ]
                    },
                    
                 {
                     margin: 10,
                     padding: { top: 5, bottom: 5, right: 5 },
                     cols: [
                         {
                             view: "button",
                             //type: "icon",
                             //icon: "wxi-check",
                             label: "Ok",
                             inputWidth: 60,
                             css: "webix_primary",
                             click: function () {
                                 
                                 var vSegNm = "";
                                 var vSegId = "";

                                 $$("Segmentgrid").data.each(function (obj) {
                                     debugger;
                                     if (obj.SegChk) {
                                         if (vSegNm != "") {
                                             vSegNm = vSegNm + "," + obj.NM
                                         }
                                         else {
                                             vSegNm = obj.NM
                                         }

                                         if (vSegId != "") {
                                             vSegId = vSegId + ",'" + obj.ID + "'"
                                         }
                                         else {
                                             vSegId = "'" + obj.ID + "'"
                                         }
                                     }
                                 });

                                 

                                 if (vSegId != "") {                                     
                                     $("#SegmntId").val(vSegId);
                                     $$("RptSegmentSrchPopUp").hide();
                                     var CHK_CONSOLID = $$("ChkConsolidate").getValue();
                                     var CHK_SEGMENT = $$("ChkSegmntwise").getValue();
                                     var CHK_SUMMARY = $$("ChkSummary").getValue();
                                     $("#CHK_CONSOLID").val(CHK_CONSOLID);
                                     $("#CHK_SEGMENT").val(CHK_SEGMENT);
                                     $("#CHK_SUMMARY").val(CHK_SUMMARY);
                                     fnHeader();
                                 }                    

                                 else {
                                        //$("#AlertMessageHdn").val("Pelase Select any One. ");
                                        //$("#alertType").val('fail');
                                        //AlertMesaage();
                                        webix.alert({ text: "Pelase Select any One. ", type: "alert-warning" });
                                    }

                             },
                             align: "right"
                         }
                     ]
                 }],
             }
         });

     });

     function ChkConsolidate_Click(){
         var vConsolid=$$("ChkConsolidate").getValue();
         var vSegment=$$("ChkSegmntwise").getValue();
         var vSummary=$$("ChkSummary").getValue();
         if (vConsolid ==1) {
             $$("ChkSummary").setValue(0);
             $$("ChkSegmntwise").setValue(0);
         }
         if (vSummary == 0 && vConsolid==0 && vSegment==0)  $$("ChkConsolidate").setValue(1);
     }

     function ChkSegmntwise_Click(){
         var vConsolid=$$("ChkConsolidate").getValue();
         var vSegment=$$("ChkSegmntwise").getValue();
         var vSummary=$$("ChkSummary").getValue();
         if (vSegment ==1) {
             $$("ChkSummary").setValue(0);
             $$("ChkConsolidate").setValue(0);
         }
         if (vSummary == 0 && vConsolid==0 && vSegment==0)  $$("ChkSegmntwise").setValue(1);
     }

     function ChkSummary_Click(){
         var vConsolid=$$("ChkConsolidate").getValue();
         var vSegment=$$("ChkSegmntwise").getValue();
         var vSummary=$$("ChkSummary").getValue();
         if (vSummary ==1) {
             $$("ChkSegmntwise").setValue(0);
             $$("ChkConsolidate").setValue(0);
         }
         if (vSummary == 0 && vConsolid==0 && vSegment==0)  $$("ChkSummary").setValue(1);
     }
     
</script>
<style>

/*.animated {
        -webkit-animation-duration: 1s;
        animation-duration: 0.4s!important;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }*/

</style>
<script type="text/javascript">
    //debugger;

    function fnLoadSegmentPop(vCmpId, TYPETAG,SUBTYPE) {
        debugger;
        $$("Segmentgrid").clearAll();
        var rowDatad = "";
        
        $.ajax({
            type: "POST",
            async: false,
            url: "/Reports/fnLoadSearchAll",
            data: "CmpId=" + vCmpId + "&TYPETAG=" + TYPETAG + "&SUBTYPE=" + SUBTYPE ,
            

            success: function (d) {
                debugger;
                if (d != "") {
                    rowDatad = JSON.parse(d);

                    var Sa = rowDatad;
                    var Rows = [];

                    $.each(Sa, function (key, value) {
                        var set = {};
                        set = { NM: value.value, SegChk: true, ID: value.id };
                        Rows.push(set);
                    });
                    $$("Segmentgrid").getColumnConfig("SegChk").header[0].checked = true;
                    $$("Segmentgrid").refreshColumns();

                    $$("Segmentgrid").parse(Rows);
                    $$("Segmentgrid").refresh();

                }
            }
        });
    }
</script>

