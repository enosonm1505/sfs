
var app = angular.module('MISTApp', ['webix']);
var LoadTrnTy = "";
app.controller("MISTransController", function ($scope) {
    
    
    $("#LoadDIv").hide();
    var dataProp = fnPropertyLoad();
   
    var ddlLG = [{ "id": "G", "value": "G" }, { "id": "L", "value": "L" } , { "id": "", "value": "" } ];
  
    var Filter3 = dataProp.filter(function (dataProp) {
        return (dataProp.id == $.trim($("#hdnCompId").val()));
    });

    var searchicon = "<span class='fa fa-search ' ></span>";
    $scope.frmMISMstTemplate = {

        id: "frmMISMstTemplate",
        view: 'form',
        minWidth: 1100,
     //   maxWidth: "auto",
        paddingX: 5,
        borderless: true,
        elements: [
            {
                paddingX: 5,
                PaddingY: 5,
                rows: [
                   {
                       rows: [
                           {
                               cols: [
                                    {
                                        view: "text",
                                        id: "TxtTemplate",
                                        stringResult: true,
                                        label: "Template Name",
                                        labelAlign: "Left",
                                        labelWidth: 120,
                                        inputWidth: 400,
                                        width: 400,
                                    },
                                   {
                                       view: "button",
                                       id: 'SrchTemplate',
                                       minWidth: 250,
                                       labelWidth: 0,
                                       width: 30,
                                       height: 28,
                                       type: 'icon',
                                       icon: 'wxi-search',
                                       css: "Ar_search",
                                       hidden:true,
                                       on: {
                                           onItemClick: function () {
                                               $$("TxtTemplate").setValue("");
                                               window.TemplId = "";
                                               debugger;
                                               fnTemplLoad();
                                               $$("TemplPopup").show();
                                              
                                           }
                                       }
                                   },
      
                                 
                                  
                               ]
                           },
                           {
                               cols: [
                                 
                                    {
                                     //   view: "text",
                                        view: "search",
                                        id: "TxtDept",
                                        stringResult: true,
                                        label: "Department",
                                        labelAlign: "Left",
                                        labelWidth: 120,
                                        inputWidth: 400,
                                        readonly: true,
                                        width: 400,
                                        on: { onChange: function (newVal, OldVal) { } },
                                        on: {
                                            onSearchIconClick: function () {
                                                debugger;
                                                window.GridDepLoad = "";
                                                btnDeptSrchClick("");
                                            }
                                        }
                                    },
                                   {
                                      
                                       width: 30,
                                      
                                   },
                                   {
                                      // width: 100
                                   },
                                    {

                                        id: "HidCopy",
                                        label: '',
                                        //inputWidth: 80,
                                        labelWidth: 30,
                                        width: 80,
                                       
                                    },
                                   {

                                        id: "btnCopy",
                                        view: 'button',
                                        label: 'Copy',
                                        inputWidth: 80,
                                        labelWidth: 30,
                                        width: 80,
                                        hidden:true,
                                        on: {
                                            onItemClick: function () {
                                                if (window.TemplId != "") $$("CopyPopup").show();
                                               
                                            }  
                                                

                                                   
                                                
                                            },
                                      
                                   },
                                    {

                                        id: "btnDup",
                                        view: 'button',
                                        label: 'Duplicate',
                                        inputWidth: 80,
                                        labelWidth: 30,
                                        width: 80,
                                        disabled: true,
                                        on: {
                                            onItemClick: function () {
                                                //  fnLoadGridData();
                                            }
                                        }
                                    },
                                     {

                                         id: "btnLedger",
                                         view: 'button',
                                         label: 'Ledger Not Linked',
                                         inputWidth: 120,
                                         width: 120,
                                         disabled: true,
                                         on: {
                                             onItemClick: function () {
                                                
                                             }
                                         }
                                     },
                                     {

                                         id: "btnDept",
                                         view: 'button',
                                         label: 'Department Not Linked',
                                         inputWidth: 170,
                                         width: 170,
                                         disabled: true,
                                         on: {
                                             onItemClick: function () {
                                                
                                             }
                                         }
                                     },
                                      {
                                          view: "checkbox",
                                          id: "ChkLastChk",
                                          labelRight: "By Default Last Year to be Check ",
                                          labelWidth: 1,
                                          width: 250,
                                          //  value: "1",
                                          click: function () {
                                          }
                                      },
                               ]
                           },
                           {
                               cols: [
                                     {
                                         view: "text",
                                         id: "TxtSeqNo",
                                         stringResult: true,
                                         label: "Seq No",
                                         labelAlign: "Left",
                                         labelWidth: 120,
                                         inputWidth: 180,
                                         width: 180,

                                     },
                                     {width:250,},
                                      {

                                          id: "btnInsertRow",
                                          view: 'button',
                                          label: 'Insert Row',
                                          inputWidth: 80,
                                          width: 80,
                                          on: {
                                              onItemClick: function () {

                                                  debugger;
                                              
                                                  var rowid = $$("GridData").getSelectedId();
                                                  var data = $$("GridData").serialize();
                                                  var i = 0;
                                                  if (data.length > 0) {
                                                      $.each(data, function (key, value) {
                                                          i = i + 1;
                                                          if (value.id == rowid.id) {
                                                              if (i != "0") {
                                                                  $$("GridData").add({
                                                                      ixParticular: '',
                                                                      ixFormula: '',
                                                                      ixFormulaPercent: '',
                                                                      ixDeptId: '',
                                                                      ixLG: '',
                                                                      ixLedGroup: '',
                                                                      ixLedGroupId: '',
                                                                      ixDeptNM: '',
                                                                      ixIncExp: '',
                                                                      ixBold: 'N',
                                                                      ixItalic: 'N',
                                                                      ixHidden: 'N',
                                                                      ixShadow: 'N',
                                                                  }, i - 1);
                                                                  $$("GridData").refresh();
                                                                  return false;
                                                              }

                                                          }

                                                      });

                                                    
                                                  }
                                                  else {
                                                      $$("GridData").add({
                                                          ixParticular: '',
                                                          ixFormula: '',
                                                          ixFormulaPercent: '',
                                                          ixDeptId: '',
                                                          ixLG: '',
                                                          ixLedGroup: '',
                                                          ixLedGroupId: '',
                                                          ixDeptNM: '',
                                                          ixIncExp: '',
                                                          ixBold: 'N',
                                                          ixItalic: 'N',
                                                          ixHidden: 'N',
                                                          ixShadow: 'N',
                                                      });
                                                      $$("GridData").refresh();
                                                  }
                                                 
                                                     
                                                 
                                                 
                                               
                                               
                                                 
                                              }
                                          }
                                      },
                                  
                                     {

                                         id: "btnShadow",
                                         view: 'button',
                                         label: 'S',
                                         inputWidth: 30,
                                         tooltip: "Shadow",
                                         width: 30,
                                         on: {
                                             onItemClick: function () {
                                                 debugger;
                                                 var rowid = $$("GridData").getSelectedId();
                                                 var data = $$("GridData").serialize();

                                                 if (data.length > 0) {

                                                     if ($.trim(rowid.ixShadow) != "Y" ||  rowid.ixShadow == undefined) {
                                                         rowid.ixShadow = "Y";
                                                         $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellHidden");
                                                         $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellUnHidden");
                                                         $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellUnShadow");
                                                         $$("GridData").addCellCss(rowid.id, "ixParticular", "CellShadow");
                                                         $$("GridData").updateItem(rowid.id, rowid);
                                                         //  $$("GridData").refresh();

                                                     }
                                                     else {
                                                         rowid.ixShadow = "N";
                                                         $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellShadow");
                                                         $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellHidden");
                                                         $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellUnHidden");
                                                         $$("GridData").addCellCss(rowid.id, "ixParticular", "CellUnShadow");
                                                         $$("GridData").updateItem(rowid.id, rowid);
                                                         //   $$("GridData").refresh();

                                                     }
                                                     $$("GridData").refresh();

                                                 }

                                             }
                                         }
                                     },
                                      {

                                          id: "btnBold",
                                          view: 'button',
                                          label: 'B',
                                          inputWidth: 30,                                        
                                          width: 30,
                                          tooltip:"Bold",
                                          on: {
                                              onItemClick: function () {
                                                  debugger;
                                                  var rowid = $$("GridData").getSelectedId();
                                                  var data = $$("GridData").serialize();
                                                  var i = 0;
                                                  if (data.length > 0) {
                                                      

                                                      if (rowid.ixBold == "" || rowid.ixBold == "N" || rowid.ixBold == undefined)
                                                      {                                                    
                                                          rowid.ixBold = "Y";
                                                          $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellUnBold", true);
                                                          $$("GridData").addCellCss(rowid.id, "ixParticular", "CellBold",true);
                                                          $$("GridData").updateItem(rowid.id, rowid);
                                                        //  $$("GridData").refresh();
                                                        
                                                        }
                                                        else {
                                                            rowid.ixBold = "N";
                                                            $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellBold", true);
                                                            $$("GridData").addCellCss(rowid.id, "ixParticular", "CellUnBold",true);
                                                            $$("GridData").updateItem(rowid.id, rowid);
                                                         //   $$("GridData").refresh();
                                                         
                                                        }
                                                              

                                                      $$("GridData").refresh();
                                                  }
                                                

                                              }
                                          }
                                      },
                                       {

                                           id: "btnItalic",
                                           view: 'button',
                                           label: 'I',
                                           inputWidth: 30,
                                           tooltip:"Italic",
                                           width: 30,
                                           on: {
                                               onItemClick: function () {
                                                   debugger;
                                                   var rowid = $$("GridData").getSelectedId();
                                                   var data = $$("GridData").serialize();
                                                  
                                                   if (data.length > 0) {
                                                       if (rowid.ixItalic == "" || rowid.ixItalic == "N" || rowid.ixItalic == undefined) {
                                                           rowid.ixItalic = "Y";
                                                           $$("GridData").removeCellCss(rowid, "ixParticular", "CellUnItalic");
                                                           $$("GridData").addCellCss(rowid, "ixParticular", "CellItalic");
                                                           $$("GridData").updateItem(rowid.id, rowid);
                                                        //   $$("GridData").refresh();
                                                         
                                                       }
                                                       else {
                                                           rowid.ixItalic = "N";
                                                           $$("GridData").removeCellCss(rowid, "ixParticular", "CellItalic");
                                                           $$("GridData").addCellCss(rowid, "ixParticular", "CellUnItalic");
                                                           $$("GridData").updateItem(rowid.id, rowid);
                                                        //   $$("GridData").refresh();
                                                          
                                                       }

                                                       $$("GridData").refresh();
                                                   }
                                                 

                                               }
                                           }
                                       },
                                        {

                                            id: "btnHidden",
                                            view: 'button',
                                            label: 'H',
                                            inputWidth: 30,
                                            tooltip: "Hidden",
                                            width: 30,
                                            on: {
                                                onItemClick: function () {
                                                    debugger;
                                                    var rowid = $$("GridData").getSelectedId();
                                                    var data = $$("GridData").serialize();
                                                   
                                                    if (data.length > 0) {
                                                       
                                                        if ($.trim(rowid.ixHidden) !="Y") {
                                                            rowid.ixHidden = "Y";
                                                            $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellUnHidden");
                                                            $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellShadow");
                                                            $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellUnShadow");
                                                            $$("GridData").addCellCss(rowid.id, "ixParticular", "CellHidden");
                                                            $$("GridData").updateItem(rowid.id, rowid);
                                                          //  $$("GridData").refresh();
                                                           
                                                        }
                                                        else {
                                                            rowid.ixHidden = "N";
                                                            $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellHidden");
                                                            $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellShadow");
                                                            $$("GridData").removeCellCss(rowid.id, "ixParticular", "CellUnShadow");
                                                            $$("GridData").addCellCss(rowid.id, "ixParticular", "CellUnHidden");
                                                            $$("GridData").updateItem(rowid.id, rowid);
                                                         //   $$("GridData").refresh();
                                                           
                                                        }
                                                        $$("GridData").refresh();

                                                    }
                                                  

                                                }
                                            }
                                        },

                                        { width: 400, },
                                          {

                                              id: "btnAddRow",
                                              view: 'button',
                                              tooltip: 'Add',
                                              type: "icon",
                                              icon: "wxi-plus",
                                              label: "",
                                              inputWidth: 30,
                                              width: 30,
                                              on: {

                                                  onItemClick: function () {


                                                      $$("GridData").add({
                                                          ixParticular: '',
                                                          ixFormula: '',
                                                          ixFormulaPercent: '',
                                                          ixDeptId: '',
                                                          ixLG: '',
                                                          ixLedGroup: '',
                                                          ixLedGroupId: '',
                                                          ixDeptNM: '',
                                                          ixIncExp: '',
                                                          ixBold: 'N',
                                                          ixItalic: 'N',
                                                          ixHidden: 'N',
                                                          ixShadow: 'N',
                                                      });
                                                      $$("GridData").refresh();
                                                  }
                                              }
                                          },
                                      {

                                          id: "btnDeleteRow",
                                          view: 'button',
                                          tooltip: 'Delete',
                                          type: "icon",
                                          icon: "wxi-trash",
                                          label: "",
                                          inputWidth: 30,
                                          width: 30,
                                          on: {
                                              onItemClick: function () {

                                                  $$("GridData").editCancel();
                                                  $$("GridData").remove($$("GridData").getSelectedId());

                                              }
                                          }
                                      },
                                       

                                     
                                  
                               ]
                           }
                       ]
                   },
                   {
                       paddingY: 10,

                       cols: [

                           {
                               view: "datatable",
                               id: "GridData",
                               select: "row",
                               data: [],
                               //  width: 1200,
                               minwidth:900,
                               height: 430,//350,
                               editable: true,
                               hover: "gridHover",
                               tooltip: true,
                               scroll: true,
                               tooltip: function (obj, common) {
                                 
                                  
                               },
                               columns: [

                                        { header: "Particulars", id: "ixParticular", width: 250, editor: "text", css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Formula", id: "ixFormula", width: 200, editor: "text", css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Formula (%)", id: "ixFormulaPercent", editor: "text",width: 100, liveEdit: true, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "L/G", id: "ixLG", width: 50, css: { 'text-align': 'left ! important' }, liveedit: true, editor: "select", collection: function (id) { return ddlLG; } },
                                        { header: "Ledger/Group", id: "ixLedGroup", width: 200, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "AcId", id: "ixLedGroupId", hidden: true },
                                        { id: "ixLedGroupSel", header: ' ', template: searchicon, width: 30, css: { 'text-align': 'center ! important' } },
                                        { header: "Department", id: "ixDeptNM", width: 200, css: { 'text-align': 'left ! important' }, tooltip: false },
                                        { header: "Department ID", id: "ixDeptId", hidden: true },
                                        { id: "ixDeptSel", header: ' ', template: searchicon, width: 30, css: { 'text-align': 'center ! important' } },
                                        { header: "Inc/Exp", id: "ixIncExp", hidden: true },
                                        { header: "", id: "ixBold", hidden: true },
                                        { header: "", id: "ixItalic", hidden: true },
                                        { header: "", id: "ixHidden", hidden: true },
                                         { header: "", id: "ixShadow", hidden: true },


                                    
                               ],
                               on: {
                     
                                  
                                  
                                   
                                   //'onSelectChange': function () {
                                   //    debugger;
                                   //    //if (id.column == 'ixLG') {
                                      
                                   //      var id = $$("GridData").getSelectedId();
                                   //      if (id != undefined) {
                                   //          var getval = $$("GridData").getItem(id.row);

                                   //          getval.ixDeptId = "";
                                   //          getval.ixDeptNM = "";
                                   //          getval.ixLedGroupId = "";
                                   //          getval.ixLedGroup = "";
                                   //          getval.ixIncExp = "";
                                   //          this.updateItem(getval.id, getval)
                                   //      }
                                          
                                   //   //}
                                   //},
                                   'onAfterEditStop': function (state, editor) {
                                       debugger;
                                       if (editor.column == 'ixLG') {
                                           var id = $$("GridData").getSelectedId();
                                           if (id != undefined) {
                                               var getval = $$("GridData").getItem(id.row);

                                               getval.ixDeptId = "";
                                               getval.ixDeptNM = "";
                                               getval.ixLedGroupId = "";
                                               getval.ixLedGroup = "";
                                               getval.ixIncExp = "";
                                               if (getval.ixLG == "L")
                                               {
                                                   $$("ddlgroup").show();
                                                   $$("ddlgroup").setValue("");
                                               }

                                               else
                                               {
                                                   $$("ddlgroup").setValue("");
                                                   $$("ddlgroup").hide();
                                               }
                                                  
                                               this.updateItem(getval.id, getval)
                                           }
                                       }
                                   },
                                   'onItemClick': function (id, index, cell) {
                                       //    debugger;
                                       if (id.column == 'ixDeptSel') {
                                           debugger;
                                           window.GridDepLoad = "1";
                                           var getval = this.getItem(id.row);
                                           var Dept = getval.ixDeptId;
                                           btnDeptSrchClick(Dept);
                                       }
                                       if (id.column == 'ixLedGroupSel') {
                                           debugger;
                                           var getval = this.getItem(id.row);
                                           
                                    
                                           var AcId = getval.ixLedGroupId;
                                           var Ty = $.trim(getval.ixLG);
                                           if (Ty == "") {
                                               AlertMessage('Please Select Ledger or Group');
                                               return false;
                                           }
                                           btnLedGrpSrchClick(AcId, Ty);

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
                                       debugger;
                                       if (window.clr == "1")
                                       {
                                           if (item.ixParticular != "" && item.ixParticular != null) {
                                               debugger;

                                               var rowid = item.id;
                                               if (item.ixItalic == "Y") {
                                                   debugger;
                                                   $$("GridData").addCellCss(rowid, "ixParticular", "CellItalic");
                                               }

                                               else {
                                                   debugger;
                                                   $$("GridData").addCellCss(rowid, "ixParticular", "CellUnItalic");
                                               }

                                               if (item.ixBold == "Y") {
                                                   debugger;
                                                   $$("GridData").addCellCss(rowid, "ixParticular", "CellBold");
                                               }

                                               else {
                                                   debugger;
                                                   $$("GridData").addCellCss(rowid, "ixParticular", "CellUnBold");
                                               }

                                               if (item.ixShadow == "Y") {
                                                   debugger;

                                                   $$("GridData").addCellCss(rowid, "ixParticular", "CellShadow");
                                                   //    $$("GridData").updateItem(rowid, item);

                                               }

                                               else {
                                                   debugger;

                                                   $$("GridData").addCellCss(rowid, "ixParticular", "CellUnShadow");

                                               }

                                               if (item.ixHidden == "Y") {
                                                   debugger;
                                                   $$("GridData").addCellCss(rowid, "ixParticular", "CellHidden");
                                               }

                                               else {
                                                   debugger;
                                                   $$("GridData").addCellCss(rowid, "ixParticular", "CellUnHidden");
                                               }



                                           }
                                       }
                                       window.clr = "";

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
 

});

function sidebarFn() {
    $$("frmMISMstTemplate").resize();
    $$("frmMISMstTemplate").adjust();
    $$("GridData").resize();
    $$("GridData").adjust();
}


function TemplPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "TemplPopup",
        head: "Template",
        position: "center",
        minWidth: 340,
        maxWidth: 340,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "dtTemplPop",
                select: "row",
                data: [],
                css: "webix_header_border",
                height: 450,
                columns: [
                       { header: ["Template Name", { content: "textFilter" }], id: "value", width: 320, css: { 'text-align': 'left ! important' } },
                       { header: "TemplId", id: "id", hidden: true },
                     
                ],
                data: [{}],
                on: {
                    'onItemDblClick': function (id, e, node) {
                        //debugger;
                        var selectedRows = this.getSelectedItem(id.row);
                        GridClear();
                        $$("TxtTemplate").setValue("");
                        window.TemplId = "";

                        var vNm = $.trim(selectedRows[0].value);
                    //    var vId = "'" + $.trim(selectedRows[0].id) + "'";
                        var vId = $.trim(selectedRows[0].id);
                       

                        if (vId != "") {
                            window.TemplId = vId;
                            $$("TxtTemplate").setValue(vNm);
                            FnLoadGridTemplate();
                            window.clr = "1";
                            $$("TemplPopup").hide();

                        }



                    }

                }
            },
            {
                margin: 10,
                padding: { top: 5, bottom: 5, right: 5 },
                cols: [

                    {

                        view: "button",
                        label: "Close",
                        inputWidth: 80,
                        click: function () {
                            GridClear();
                        
                            $$("TxtTemplate").setValue("");
                            window.TemplId = "";
                            $$("TemplPopup").hide();

                        },
                        align: "right"
                    },


                ]

            }
            ],

        }
    });
};
function DeptPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "DeptPopup",
        head: "Department",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        autowidth: true,
        body: {
            rows: [{
                view: "datatable",
                id: "dtDeptPop",
                select: "row",
                css: "webix_header_border",
                data: [],
                height: 450,
                columns: [
                       { header: ["Department Name", { content: "textFilter" }], id: "value", width: 320, css: { 'text-align': 'left ! important' } },
                       { header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "CHK", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },
                       { header: "DeptId", id: "id", hidden: true },
                     
                ],
                data: [{}],
                on: {
                    'onKeyPress': function (code, e) {
                        debugger;
                        var selRow = this.getSelectedItem();
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
                    },
                    'onBeforeFilter': function () {
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    },
                    'onAfterFilter': function () {
                        //debugger;
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    }
                }
            },
            {
                margin: 10,
                padding: { top: 5, bottom: 5, right: 5 },
                cols: [
                    {
                        view: "button",
                        type: "icon",
                        icon: "wxi-check",
                        label: "Ok",
                        inputWidth: 80,
                        click: function () {
                            debugger;
                          
                            var vDeptNm = "";
                            var vDeptId = "";
                           
                            if (window.GridDepLoad != "1")
                            {
                                window.DeptIds = "";
                                $$("TxtDept").setValue("");
                            }
                              
                            $$("dtDeptPop").data.each(function (obj) {
                              //  debugger;
                                if (obj.CHK == "1") {
                                    if (vDeptNm != "") {
                                        vDeptNm = vDeptNm + "," + obj.value
                                    }
                                    else {
                                        vDeptNm = obj.value
                                    }
                                    if (vDeptId != "") {
                                        vDeptId = $.trim(vDeptId) + ",'" + $.trim(obj.id) + "'"
                                    }
                                    else {
                                        vDeptId = "'" + $.trim(obj.id )+ "'"
                                    }
                                }
                            });
                            if (vDeptId != "") {
                                if (window.GridDepLoad == "1")
                                {
                                    var dataval = $$("GridData").getSelectedItem();
                                    dataval.ixDeptNM = vDeptNm;
                                    dataval.ixDeptId = $.trim(vDeptId);
                                    $$("GridData").refresh();
                                   
                                }
                                else
                                {
                                    //GridClear();
                                    window.DeptIds = vDeptId;
                                    $$("TxtDept").setValue(vDeptNm);
                                  
                                }
                               
                                $$("DeptPopup").hide();
                              

                            }
                            else {
                                $$("DeptPopup").hide();

                            }
                        },
                        align: "right"
                    },


                ]

            }
            ],

        }
    });
};
function LedGrpPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "LedGrpPopup",
        head: "MIS Ledger",
        position: "center",
        minWidth: 400,
        maxWidth: 400,
        autowidth: true,
        body: {
            rows: [
                {
                    cols: [
                        {
                            view: "checkbox",
                            id: "ChkIncome",
                            labelRight: "Income ",
                            labelWidth: 1,
                            width: 100,
                            //  value: "1",
                            on: {
                                onChange: function (newval, oldval) {
                                    //debugger;
                                    if (newval == 1) $$("ChkExpense").setValue("0");
                                    else $$("ChkExpense").setValue("1");
                                    fnLedGrpLoad(window.Ty);
                                    fnMISGLGrpLoad(window.Ty);
                                   
                                }
                            },
                        },
                         {
                             view: "checkbox",
                             id: "ChkExpense",
                             labelRight: "Expenses ",
                             labelWidth: 1,
                             width: 100,
                             value: "1",
                             on: {
                                 onChange: function (newval, oldval) {
                                     //debugger;
                                     if (newval == 1) $$("ChkIncome").setValue("0");
                                     else $$("ChkIncome").setValue("1");
                                     fnLedGrpLoad(window.Ty);
                                     fnMISGLGrpLoad(window.Ty);
                                   
                                 }
                             },
                         },

                          {
                              view: "checkbox",
                              id: "ChkStat",
                              labelRight: "Statistics ",
                              labelWidth: 1,
                              width: 100,
                              hidden:true,
                              click: function () {
                              }
                          },
                          { width: 100, },
                          { width: 100, },

                    ]
                },
                {
                    view: "combo",
                    id: "ddlgroup",
                //    value:"<ALL>",
                    label: "Group",
                    labelAlign: "Right",
                    labelWidth: 80,
                    inputWidth: 320,
                    width: 350,
              //      options: PartGrpData,
                    on: {
                        onChange: function (newval, oldval) {
                            fnLedGrpLoad(window.Ty);
                        }
                    }
                },
                {
                view: "datatable",
                id: "dtLedGrpPop",
                select: "row",
                css: "webix_header_border",
                data: [],
                height: 450,
                columns: [
                       { header: ["Account Name", { content: "textFilter" }], id: "value", width: 320, css: { 'text-align': 'left ! important' } },
                       { header: ["Select", { content: "masterCheckbox", css: { 'padding': '0px ! important', } }], id: "CHK", editor: 'check', template: "{common.checkbox()}", width: 60, css: { 'text-align': 'center ! important', 'height': '20px', 'width': '20px' } },
                       { header: "AcId", id: "id", hidden: true },

                ],
                data: [{}],
                on: {
                    'onKeyPress': function (code, e) {
                        debugger;
                        var selRow = this.getSelectedItem();
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
                    },
                    'onBeforeFilter': function () {
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    },
                    'onAfterFilter': function () {
                        //debugger;
                        this.select(this.getFirstId());
                        webix.UIManager.setFocus(this);
                        this.refresh();
                    },
                    
                }
            },
            {
                margin: 10,
                padding: { top: 5, bottom: 5, right: 5 },
                cols: [
                    {
                        view: "button",
                        type: "icon",
                        icon: "wxi-check",
                        label: "Ok",
                        inputWidth: 80,
                        click: function () {
                            debugger;

                            var vAcNm = "";
                            var vAcId = "";
                            var vArrAcId = "";
                            //var rowid = $$("GridData").getSelectedId();
                            $$("dtLedGrpPop").data.each(function (obj) {
                                //  debugger;
                                if (obj.CHK == "1") {
                                   
                                    vArrAcId = "'" + $.trim(obj.id) + "'";
                                    var vArrAcNm = $.trim(obj.value);
                                    var dataval = $$("GridData").getSelectedItem();
                                    
                                    var data = $$("GridData").serialize();
                                    var i = 0;
                                    if (data.length > 0) {
                                        var bool = false;
                                        $.each(data, function (key, value) {
                                            i = i + 1;
                                            if (dataval.id != value.id)
                                            {
                                                if (dataval.ixLG == value.ixLG)
                                                {
                                                    var led = $.trim(value.ixLedGroupId);
                                                    var n = led.includes(vArrAcId);
                                                    if (n == true) {
                                                        alert(vArrAcNm.trim() + " Already Exist  in row " + i + "...!");
                                                        bool = true;
                                                        return false;

                                                    }
                                                }
                                                else
                                                {

                                                }
                                               



                                            }

                                        });

                                        if (bool == true)
                                            return false;
                                    }


                                    if (vAcNm != "") {
                                        vAcNm = vAcNm + "," + obj.value
                                    }
                                    else {
                                        vAcNm = obj.value
                                    }
                                    if (vAcId != "") {
                                       
                                        vAcId = $.trim(vAcId) + ",'" + $.trim(obj.id) + "'"
                                    }
                                    else {
                                        vAcId = "'" + $.trim(obj.id) + "'"
                                    }
                                }
                            });
                            if (vAcId != "") {
                                debugger;
                                    var dataval = $$("GridData").getSelectedItem();
                                    dataval.ixLedGroup = vAcNm;
                                    dataval.ixLedGroupId = $.trim(vAcId);
                                    if ($$("ChkIncome").getValue() == "1")
                                    {
                                        dataval.ixIncExp = "I";
                                    }
                                    else if($$("ChkExpense").getValue() == "1")
                                    {
                                        dataval.ixIncExp = "E";
                                    }
                                    else if ($$("ChkStat").getValue() == "1")
                                    {
                                        dataval.ixIncExp = "S";
                                    }
                                      
                                    $$("GridData").refresh();

                             

                                    $$("LedGrpPopup").hide();


                            }
                            else {
                                $$("LedGrpPopup").hide();

                            }
                        },
                        align: "right"
                    },


                ]

            }
            ],

        }
    });
};

function CopyPopWindowLoad() {
    //debugger;
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        move: true,
        id: "CopyPopup",
        head: "Copy Template",
        position: "center",
        minWidth: 450,
        maxWidth: 450,
        autowidth: true,
        body: {
            rows: [
               
              
                {
                
                    padding: { top: 5, bottom: 5, right: 5 },
                    cols: [
                        {
                            view: "text",
                            id: "TxtNewTemplate",
                            stringResult: true,
                            label: "New MIS Template",
                            labelAlign: "Left",
                            labelWidth: 120,
                            inputWidth: 400,
                            width: 400,
                        },
                        ]
            },
            {
               // margin: 10,
                padding: { top: 5, bottom: 5, right: 5 },
                cols: [
                    {
                        view: "button",
                        //type: "icon",
                        //icon: "wxi-check",
                        label: "Save",
                        align: "right",
                        inputWidth: 80,
                        click: function () {
                            debugger;
                            FnSaveCopyTemplate();
                            $$("CopyPopup").hide();

                        },
                      
                    },


                ]

            }
            ],

        }
    });
};

function fnDeptLoad() {
    debugger;
    var rowDatad = [];
    var CompId = $$("ddlProperty").getValue();
    var GridDepLoad = window.GridDepLoad;
    var DeptIds = "";
    if (GridDepLoad == "1" && window.DeptIds !=undefined) DeptIds = window.DeptIds;

 
    Request = {
        PROGNAME: "GET_MISDEPTLOAD",
        COMPID: CompId,
        DeptIds: DeptIds
     
    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/MISTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);
                $$("dtDeptPop").clearAll();
                $$("dtDeptPop").parse(rowDatad);
                $$("dtDeptPop").refresh();

            }
        }
    })

};
function fnLedGrpLoad(Ty) {
    debugger;
    var rowDatad = [];
    var CompId = $$("ddlProperty").getValue();
    var IncExp = "";
    var Inc = $$("ChkIncome").getValue();
    var Exp = $$("ChkExpense").getValue();
    var Stat = $$("ChkStat").getValue();
    var GrpId = $$("ddlgroup").getValue();
    if (Inc == "1") 
    {
        IncExp = "I";
    }
    else if (Exp == "1") 
    {
        IncExp = "E";
    }
    else if (Stat == "S") {
        IncExp = "S";
    }
        
   

    Request = {
        PROGNAME: "GET_MISLEDGRPLOAD",
        COMPID: CompId,
        Ty: Ty,
        FiscalYear: window.FiscalYear,
        IncExp: IncExp,
        GrpId:GrpId,
        


    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/MISTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);
                $$("dtLedGrpPop").clearAll();
                $$("dtLedGrpPop").parse(rowDatad);
                $$("dtLedGrpPop").refresh();

            }
        }
    })

};
function fnMISGLGrpLoad(Ty) {
    debugger;
    var rowDatad = [];
    var CompId = $$("ddlProperty").getValue();
    var IncExp = "";
    var Inc = $$("ChkIncome").getValue();
    var Exp = $$("ChkExpense").getValue();
    var Stat = $$("ChkStat").getValue();
    if (Inc == "1") {
        IncExp = "I";
    }
    else if (Exp == "1") {
        IncExp = "E";
    }
    else if (Stat == "S") {
        IncExp = "S";
    }



    Request = {
        PROGNAME: "GET_MISGLGROUPLOAD",
        COMPID: CompId,
        Ty: Ty,
        FiscalYear: window.FiscalYear,
        IncExp: IncExp,



    }

    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/MISTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "" && d != undefined && d != null) {
                rowDatad = JSON.parse(d);
                $$("ddlgroup").define("options", rowDatad);
                $$("ddlgroup").refresh();

            }
        }
           
    })
   

};
function btnDeptSrchClick(CurrDept) {
    debugger;
    fnDeptLoad();
    $$("dtDeptPop").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    $$("dtDeptPop").filterByAll();
    var ids = "";
    if (window.GridDepLoad == "1")
    {
        ids = $.trim(CurrDept);
    }
    else {
        ids = window.DeptIds;
    }
    
    var str = [];
    if (ids != null && ids != undefined && ids != "") {
        ids = ids.replace(/'/g, '');
        str = ids.split(',');
    }

    $$("dtDeptPop").data.each(function (obj) {
        debugger;

        if (str.length > 0) {
            var newData = str.filter(function (el) {
                debugger;
                return el == obj.id;
            });
            if (newData.length > 0) obj.CHK = "1";
            else obj.CHK = "0";
        }
        else obj.CHK = "0";

        $$("dtDeptPop").updateItem(obj.id, obj)

    })
    $$("dtDeptPop").refresh();

    $$("DeptPopup").show();
    $$("dtDeptPop").select($$("dtDeptPop").getFirstId());
    webix.UIManager.setFocus($$("dtDeptPop"));
    $$("dtDeptPop").moveSelection("top");

}
function btnLedGrpSrchClick(CurrAcId,Ty) {
    debugger;
    fnMISGLGrpLoad(Ty);
    fnLedGrpLoad(Ty);
    window.Ty = Ty;
    debugger;
    $$("dtLedGrpPop").eachColumn(function (id, col) {
        var filter = this.getFilter(id);
        if (filter) {
            if (filter.setValue) filter.setValue("");
            else filter.value = "";
        }
    });
    $$("dtLedGrpPop").filterByAll();
    var ids = "";
    
    ids = $.trim(CurrAcId);

  
    
    var str = [];
    if (ids != null && ids != undefined && ids != "") {
        ids = ids.replace(/'/g, '');
        str = ids.split(',');
    }

    $$("dtLedGrpPop").data.each(function (obj) {
        debugger;

        if (str.length > 0) {
            var newData = str.filter(function (el) {
                debugger;
                return el == obj.id;
            });
            if (newData.length > 0) obj.CHK = "1";
            else obj.CHK = "0";
        }
        else obj.CHK = "0";

        $$("dtLedGrpPop").updateItem(obj.id, obj)

    })
    $$("dtLedGrpPop").refresh();

    $$("LedGrpPopup").show();
    $$("dtLedGrpPop").select($$("dtLedGrpPop").getFirstId());
    webix.UIManager.setFocus($$("dtLedGrpPop"));
    $$("dtLedGrpPop").moveSelection("top");

}
function GridClear() {
    $$("GridData").clearAll();
}

function fnPropChange() {
    debugger;
    FnRefresh();

};
function fnTemplLoad() {
    debugger;
    var dataparam = {};
    var rowData = [];
    var options = [];
    var CompId = $$("ddlProperty").getValue();
    Request = {
        PROGNAME: "GET_MISTEMPLLOAD",
        COMPID: CompId
      //  FISCALYEAR: window.FiscalYear
    }
    var DataVal = JSON.stringify(Request);
    $.ajax({
        async: false,
        url: "/MISTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            debugger;
            if (d != "") {
                rowData = JSON.parse(d);

                $$("dtTemplPop").clearAll();
                $$("dtTemplPop").parse(rowData);
                $$("dtTemplPop").refresh();



            }
        },
    });

    //return rowData;
};
function fnPropertyLoad() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_PROPERTYLOAD";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = "";
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/MISTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            //debugger;
            if (d != "") {
                rowData = JSON.parse(d);
            }
        },
    });

    return rowData;
}
function fnLoadProperty() {
    var dataProp = fnPropertyLoad();

    if ($$("ddlPropertyCont"))
        $$("ddlPropertyCont").destructor();

    webix.ui({
        view: "combo",
        id: "ddlProperty",
        container: "ddlPropertyCont",
        label: "",//Property
        labelwidth: 80,
        inputwidth: 180,
        width: 350,
        value: $("#hdnCompId").val(),
        options: dataProp,
        on: {
            onChange: function (newval, oldval) {
                debugger;
                $("#hdnCompId").val(newval);

                var Filter3 = dataProp.filter(function (dataProp) {
                    return (dataProp.id == $.trim(newval));
                });
                fnPropChange();

            //    $$("txtCompany").setValue(Filter3[0].value);

               

            }
        }
    });
}









function fnSaveValid() {
    debugger;

    if ($$("TxtTemplate").getValue() == "") {
        AlertMessage('Template Cannot be empty');
        return false;
    }

    if ($.trim(window.BUDG_IND) == "" ||$.trim(window.BUDG_IND) ==undefined|| $.trim(window.BUDG_IND) == "1" || $.trim(window.BUDG_IND) == "0")
    {
        if (window.DeptIds == "") {
            AlertMessage('Department Cannot be empty');
            return false;
        }
    }
  

  
    

    
    var data = $$("GridData").serialize();
    var dataref = $$("GridData").serialize();
    var lenval = data.length;
    var lenvalref = dataref.length;
    if (lenval == 0) {
        AlertMessage('Template details Cannot be empty');
        return false;
    }

    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {
        }
    }

    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {
            if ($.trim(data[i].ixLG) != "") {
                if ($.trim(data[i].ixParticular) != "" && $.trim(data[i].ixFormula) == "" && $.trim(data[i].ixLedGroupId) == "")
                {
                    AlertMessage("Ledger/Group cannot be empty");
                    return false;
                }
                if ($.trim(data[i].ixParticular) != "" && $.trim(data[i].ixFormula) == "" && $.trim(data[i].ixDeptId) == "")
                {
                    if ($.trim(window.BUDG_IND) == undefined || $.trim(window.BUDG_IND) == "" || $.trim(window.BUDG_IND) == "1" || $.trim(window.BUDG_IND) == "0") {
                        if ($.trim(data[i].ixDeptId) == "") {
                            AlertMessage("DFepartment cannot be empty");
                            return false;
                        }
                    }
                }
              
                
            }
        }
    }

    return true;
}
function FnSaveCopyTemplate() {
    $("#LoadDIv").show();
    debugger;
    if ($.trim(window.TemplId)=="") {
        AlertMessage('Template Cannot be empty');
        $("#LoadDIv").hide();
        return false;
    }
    debugger;

    

    var dataparam = {};

    debugger;


    dataparam["PROGNAME"] = "GET_MISTEMPLATECOPYSAVE";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TemplId"] = window.TemplId;
    dataparam["TemplNm"] = $.trim($$("TxtNewTemplate").getValue());
    dataparam["Mode"] = window.Mode;
    var DataVal = JSON.stringify(dataparam);
    var requestData = encodeURIComponent(DataVal);

    $.ajax({
        type: 'POST',
        async: true,
        // cache: false,
        url: "/MISTrans/COMAPI_CALL",
        data: "request=" + requestData,
        success: function (objRes) {
            //debugger;
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                if ($.trim(rowData) == "True") {
                    SuccessMsg('Saved Successfully');
                    FnRefresh();
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
function FnSaveTemplate() {
    $("#LoadDIv").show();
    if (fnSaveValid() == false) {
        $("#LoadDIv").hide();
        return false;
    }
    debugger;
    
    var GridData = $$("GridData").serialize(true);
    var lenval = GridData.length;

    var DataStore = [];

    var dataparam = {};

    debugger;

    if (lenval > 0) {
        
        DataStore = GridData;
    }

    dataparam["PROGNAME"] = "GET_MISTEMPLATESAVE";
    //dataparam["PROGNAME"] = "GET_GLTRNIMPORTVOUCHER";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TemplId"] = window.TemplId;
    dataparam["DeptIds"] = window.DeptIds;
    dataparam["TemplNm"] = $.trim($$("TxtTemplate").getValue());
    dataparam["SeqNo"] = $.trim($$("TxtSeqNo").getValue());
    dataparam["LastChk"] = $.trim($$("ChkLastChk").getValue());
    dataparam["grdData"] = GridData;
    dataparam["Mode"] = window.Mode;
    var DataVal = JSON.stringify(dataparam);
    var requestData = encodeURIComponent(DataVal);

    $.ajax({
        type: 'POST',
        async: true,
       // cache: false,
        url: "/MISTrans/COMAPI_CALL",
        data: "request=" + requestData,
        success: function (objRes) {
            //debugger;
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                if ($.trim(rowData) == "True") {
                    SuccessMsg('Saved Successfully');
                    FnRefresh();
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
function FnLoadGridTemplate() {
    $("#LoadDIv").show();
  
    debugger;

    var dataparam = {};
    dataparam["PROGNAME"] = "GET_MISTEMPLATELOADGRID";
    //dataparam["PROGNAME"] = "GET_GLTRNIMPORTVOUCHER";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["FiscalYear"] = $("#hdnFiscalYr").val();
    dataparam["TemplId"] = window.TemplId;   
    var DataVal = JSON.stringify(dataparam);
    var requestData = encodeURIComponent(DataVal);

    debugger;
    $.ajax({
        type: 'POST',
        async: false,
        // cache: false,
        url: "/MISTrans/COMAPI_CALL",
        data: "request=" + requestData,
        success: function (data) {
            //debugger;
            if (data != "") {
                debugger
                rowData = JSON.parse(data);
                $$("TxtSeqNo").setValue(rowData.dtTemp[0].SeqNo);
                $$("ChkLastChk").setValue(rowData.dtTemp[0].M_IND);
                window.DeptIds = rowData.DeptId;
                $$("TxtDept").setValue(rowData.DeptNm);
                $$("GridData").clearAll();
                $$("GridData").parse(rowData.dtPart);
                $$("GridData").refresh();
               

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
function FnRefresh() {
    $$("TxtTemplate").setValue("");
    $$("TxtDept").setValue("");
    $$("TxtSeqNo").setValue("");
    window.TemplId = "";
    window.DeptIds = "";
    $$("GridData").clearAll();
    $("#btnSave").attr("disabled", true);
    $("#btnNew").attr("disabled", false);
    $("#btnOpen").attr("disabled", false);
    window.Mode = "New";
    $$("SrchTemplate").hide();
    $$("btnCopy").hide();
    $$("HidCopy").show();

   
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