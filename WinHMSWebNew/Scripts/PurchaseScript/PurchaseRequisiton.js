function addDaysToDate(date, days) {
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
}
function PageLoadFn(COMPID) {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    var EditIcon = "<span class='webix_icon wxi-pencil' style='margin-top: 5px;'></span>";
    var ViewIcon = "<span class='webix_icon wxi-eye' style='margin-top: 5px;'></span>";
    var SearchIcon = "<span class='webix_icon wxi-search' style='margin-top: 5px;'></span>";
    var CloseIcon = "<span class='webix_icon wxi-close' style='margin-top: 5px;'></span>";
    var DeleteIcon = "<span class='webix_icon wxi-trash' style='margin-top: 5px;'></span>";
    var Roweditcss = "";
    
    var wid_35 = ((screen.width - 100) * 0.35);
    var wid_30 = ((screen.width - 100) * 0.30);
    var wid_20 = ((screen.width - 100) * 0.20);
    var wid_17 = ((screen.width - 100) * 0.17);
    var wid_15 = ((screen.width - 100) * 0.15);
    var wid_12 = ((screen.width - 100) * 0.12);
    var wid_11 = ((screen.width - 100) * 0.11);
    var wid_10 = ((screen.width - 100) * 0.1);
    var wid_9 = ((screen.width - 100) * 0.09);
    var wid_7 = ((screen.width - 100) * 0.07);
    var wid_8 = ((screen.width - 100) * 0.08);
    var wid_6 = ((screen.width - 100) * 0.06);
    var wid_5 = ((screen.width - 100) * 0.05);
    var wid_4 = ((screen.width - 100) * 0.04);
    var wid_3 = ((screen.width - 100) * 0.03);
    var ddlId = ['ddlProperty', 'ddlUOM'];
    var DDLVal = DropdownLoad(ddlId);
    var types = DDLVal.ddlUOM;
    webix.ui({
        container: "divPropbox",
        view: "richselect",
        maxWidth: 400,
        id: "ddlProperty",
        options: DDLVal.ddlProperty,
        value: COMPID,
        on: {
            onChange: function () {
                var reqobj = {};
                reqobj["COMPID"] = $$("ddlProperty").getValue();
                var dataparam = JSON.stringify(reqobj);
                $.ajax({
                    async: false,
                    url: "/MaterialCtrl/PeropertyChange",
                    type: 'POST',
                    data: "request=" + dataparam,
                    success: function (d) {
                        
                    },
                });
               
                ChangePrperty();
              //  SRNOLoadFn();
            }
        }
    });
   
   
    webix.ui({
        container: "DivUnit",
        view: 'richselect',
        id: 'UnitDDL',
        value: '',
        options: [],
        maxWidth: 400,
        on: {
            onChange: function () {
               // SRNOLoadFn();
            }
        }
    });
    
    webix.ui({
        container: "DivPOType",
        view: 'combo',
        label: 'PO Type',
        id: 'POTypeDDL',
        value: '',
        options: [],
        labelWidth: 100,
        //inputWidth: 300,
        gravity: 1,
        on: {
            onChange: function () {
                DDlPOTypeChangeLoad();
                DDlPOTypeChangeLoad1();
            }
        }
    });
    webix.ui({
        container: "DivCostCenter",
        view: 'combo',
        label: 'Cost Center',
        id: 'CostCenterDDL',
        value: '',
        options: [],
        labelWidth: 100,
        //inputWidth: 300,
        gravity: 1,
        on: {
            onChange: function () {
                DDlReqCatLoad();
               // ListProductIdLoad();
               // ListProductNameLoad();
            }
        }
    });
    webix.ui({
        container: "DivRequestCategory",
        view: 'combo',
        label: 'Req Category',
        id: 'RequestCategoryDDL',
        value: '',
        options: [],
        labelWidth: 100,
        //inputWidth: 300,
        gravity: 1,
        on: {
            onChange: function () {
               
            }
        }
    });
    webix.ui({
        container: "DivRequestNo",
        view: 'text',
        label: 'Request No',
        id: 'RequestNo',
        labelWidth: 100,
        inputWidth: 250,
        labelHeight: 30,
        on: {
            onItemClick: function () {
                PRSearchPopup();
            }
        }
    });
    webix.ui({
        container: "DivRequestName",
        view: 'text',
        label: 'Request Name',
        labelWidth: '100',
        id: 'RequestName',
        labelWidth: 100,
        //inputWidth: 335,
        attributes: { maxlength: 40 },
        gravity: 1,
        on: {
            onChange: function () {

            }
        }
    });
    var datefm = new Date();
    var dateto = addDaysToDate(datefm, 1);
    webix.ui({
        container: "DivDate",
        view: 'datepicker',
        label: 'Date',
        id: 'Date',
        labelWidth: 100,
        inputWidth: 250,
        stringResult: true,
        value: datefm,
        format: "%d/%m/%Y",
        on: {
            onChange: function () {

            }
        }
    });
    webix.ui({
        container: "DivNeedDate",
        view: 'datepicker',
        label: 'Need By Date',
        id: 'NeedDate',
        labelWidth: 100,
        inputWidth: 250,
        value: dateto,
        stringResult: true,
        format: "%d/%m/%Y",
        on: {
            onChange: function () {

            }
        }
    });
    webix.ui({
        container: "trash",
        view: "button",
        type: "htmlbutton",
        css: "mp_iconbtn",
        label: "<span class='fas fa-trash'>",
        on: {
            onItemClick: function () {
                $$("RequestGrid").editStop();
                $$("RequestGrid").editCancel();
                var getval = $$("RequestGrid").getSelectedItem();
                if (getval.Modetype == "OPEN") {
                    webix.confirm({
                        title: "Confirmation !",
                        ok: "Yes", cancel: "No",
                        text: "Are you sure to Delete this line Item !"
                    })
                  .then(function () {
                      
                      getval.ModeDelete = '1';
                      getval.$css = "highlight";
                      $$("RequestGrid").refresh();
                      $$("RequestGrid").unselectAll();
                      var data = $$("RequestGrid").serialize();
                      var lenval = data.length;
                      totMrVal = 0;
                      var totMrQty = 0;
                      if (lenval != 0) {
                          for (i = 0; i < lenval; i++) {
                              if (data[i].ProdId != "" && data[i].ModeDelete!=1) {
                                  var mrQty1 = data[i].ProdMRQty;
                                  var rate1 = data[i].ProdRate;
                                  var totMrQty1 = (mrQty1) * (rate1);
                                  totMrVal = (totMrVal) + (totMrQty1);
                              }
                          }
                      }
                      $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                      $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));
                  })
                    .fail(function () {

                    });
                }
                else {
                    getval.ModeDelete = '0';
                    $$("RequestGrid").editCancel();
                    $$("RequestGrid").remove($$("RequestGrid").getSelectedId());
                    $$("RequestGrid").refresh();
                    var data = $$("RequestGrid").serialize();
                    var lenval = data.length;
                    totMrVal = 0;
                    var totMrQty = 0;
                    if (lenval != 0) {
                        for (i = 0; i < lenval; i++) {
                            if (data[i].ProdId != "") {
                                var mrQty1 = data[i].ProdMRQty;
                                var rate1 = data[i].ProdRate;
                                var totMrQty1 = (mrQty1) * (rate1);
                                totMrVal = (totMrVal) + (totMrQty1);
                            }
                        }
                    }
                    $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                    $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));
                }
            }
        }
    });
    webix.ui({
        container: "Advanceoption", view: "switch", value: 0, id: 'AdvancedOpt', label: "Advanced Option", labelWidth: 120, css: 'mt-1', on: {
            onChange: function (newValue, oldValue, config) {
                if (newValue == 1) {
                    $("#POTapView").show();
                }
                else {
                    $("#POTapView").hide();
                }
            }
        }
    });

    
    webix.ui({
        container: "DivBasicDDl",
        view: 'richselect',
        label: 'Basis :',
        id: 'BasisDDL',
        labelWidth: 100,
       // height: '25',
        value:'G',
        inputWidth: 250,
        options: [{ 'id': 'G', 'value': 'Goods' }, { 'id': 'S', 'value': 'Services' }],
        on: {
            onChange: function () {
                LoadHideGridColumns();
                FnddlCostcenter();
            }
        }
    });
    
    webix.ui({
        container: "DivStatus",
        view: 'text',
        label: 'Status',
        id: 'StatusDDL',
        value: '',
        labelWidth: 100,
        inputWidth: 250,
        on: {
            onChange: function () {

            }
        }
    });
   
    webix.ui({
        container: "DivPRValue",
        view: 'text',
        label: 'PR Value',
        id: 'PRValue',
        labelWidth: 100,
        inputWidth: 150,
        on: {
            onChange: function () {

            }
        }
    });
   
    webix.ui({
        container: "Narration", id: 'Narration', css: 'mp_txtbtn', view: "button", width: 100, value: 1,
        label: '<span class="mp_iconclr fas fa-plus mr-1"></span>' + '<span class="text"> Narration</span>',
        click: function () { $$("Narrationpop").show(); }
    });
    function fnNarrationPopup() {
        webix.ui({
            view: "window",
            height: 380,
            width: 360,
            head: "Narration",
            id: 'Narrationpop',
            position: "center",
            body: {
                //template: "<div class=''>erewrew eewrdfds sdfdsfdsf</div>"
                rows: [
                     {
                         view: 'textarea',
                         label: 'Narration',
                         id: 'NarrationTxt',
                         labelPosition: "top",
                         labelWidth: 360,
                         //labelHeight: 30,width: 360,
                         minWidth: 300,
                         attributes: { maxlength: 400 },
                         height: 60,
                         on: {
                             onChange: function () {

                             }
                         }
                     },
                    {
                        view: 'textarea',
                        label: 'Supplier Narration',
                        id: 'SupNarrationTxt',
                        labelPosition: "top",
                        labelWidth: 360,
                        minWidth: 300,
                        attributes: { maxlength: 400 },
                        height: 60,
                        on: {
                            onChange: function () {

                            }
                        }
                    },
                {
                    view: "button",
                    id: 'ok',
                    type: "htmlbutton",
                    css: "mp_btn",
                    label: "Ok",
                    autowidth: true,
                    align: 'right',
                    click: function () {
                        $$("Narrationpop").hide();
                        //$$("draft").setValue("0")
                    }
                },

                ]
            }
        });
    }
  
    webix.ui({
        container: "Documents", id: 'Documents', css: 'mp_txtbtn', view: "button", width: 120, value: 1, label:
        '<span class="mp_iconclr fas fa-plus mr-1"></span>' + '<span class="text"> Documents</span>', click: function () { fndocupPopup(); },
    });
    function fndocupPopup() {


        webix.ui({
            view: "window",
            height: 350,
            width: 300,
            head: "Documents Upload",
            id: 'Documentspop',
            position: "center",
            body: {

                //template: "<div class=''>erewrew eewrdfds sdfdsfdsf</div>"
                rows: [

          {

              view: "uploader", value: 'Upload Documents', css: 'mp_btn', link: "mytemplate",
              upload: "//docs.webix.com/samples/21_upload/php/upload.php", width: 300,
              name: "files", id: "files"

          },


          {
              id: "mytemplate", autoheight: true,
              template: function (data) {
                  var names = [];
                  if (data.each)
                      data.each(function (obj) {
                          if (obj.status == "server")
                              names.push("<a target='__blank' href='//docs.webix.com/samples/21_upload/php/files/" + obj.name + "'>" + obj.name + "</a>");
                          else
                              names.push(obj.name);
                      });
                  return names.join(", &nbsp;&nbsp;&nbsp; ");
              },
              borderless: true
          }, {

              view: "text",
              //label: 'PR Value',
              id: 'text1',
              width: 300,
              labelWidth: 100,
              //inputWidth: 150,
              gravity: 1,
              placeholder: "File Details"

          },
{
    view: "button",
    id: 'ok',
    type: "htmlbutton",
    css: "mp_btn",
    label: "Ok",
    autowidth: true,
    align: 'right',
    click: function () {
        $$("Documentspop").hide();
        // $$("draft").setValue("0")
    }
},




                ]
            }
        }).show();
    }

    webix.ui({
        container: "Template", id: 'Template', css: 'mp_txtbtn', view: "button", width: 100, value: 1, label:
        '<span class="mp_iconclr fas fa-plus mr-1"></span>' + '<span class="text"> Template</span>', click: function () { fntemplatePopup(); },

    });
    function fntemplatePopup() {
        webix.ui({
            view: "window",
            height: 350,
            width: 300,
            head: "Template",
            id: 'Templatespop',
            position: "center",
            body: {
                //template: "<div class=''>erewrew eewrdfds sdfdsfdsf</div>"
                rows: [

          {
              view: "combo",
              //label: 'PR Value',
              id: 'PRValue',
              width: 300,
              labelWidth: 100,
              //inputWidth: 150,
              gravity: 1,
              placeholder: "Select Template"

          },


         {
             view: "button",
             id: 'ok',
             type: "htmlbutton",
             css: "mp_btn",
             label: "Ok",
             autowidth: true,
             align: 'right',
             click: function () {
                 $$("Templatespop").hide();
                 // $$("draft").setValue("0")
             }
         },




                ]
            }
        }).show();
    }

    webix.ui({
        container: "Reorderprocess", id: 'Reorderprocess', css: 'mp_txtbtn', view: "button", width: 220, value: 1, icon: "fal fa-plus-circle",
        label:
        '<span class="mp_iconclr fas fa-plus mr-1"></span>' + '<span class="text">Generate Reorder Items</span>', click: function () { fnRecorderPopup(); }
    });

    function fnRecorderPopup() {
        webix.ui({
            view: "window",
            modal: true,
            fullscreen: true,
            move: true,
            close: true,
            head: "Generate Reorder Stock Items",
            id: 'reor',
            position: "center",
            body: {

                //template: "<div class=''>erewrew eewrdfds sdfdsfdsf</div>"
                rows: [

{
    cols: [
{

    view: 'combo',
    label: 'Store',
    id: 'CostCenterDDL1',
    value: '',
    options: [],
    labelWidth: 100,
    gravity: 1,
},

{

    view: 'combo',
    label: 'Reorder Item Group',
    id: 'ItemGrpDDL',
    value: '',
    css: 'ml-4',
    options: [],
    labelWidth: 150,
    gravity: 1,
},
{
    align: 'center',
    view: "button",
    id: "my_button",
    value: "Generate",
    css: "mp_btn",
    inputWidth: 100,
    click: function () {
        ReorderProcessLoad();
    }
},
    ]
},
              {
                  view: 'form',
                  // width: 768,
                  elements: [
                      {
                          rows: [

                              {
                                  view: "datatable",
                                  id: "PRreorderGrid",
                                  name: 'PRreorderGrid',
                                  select: 'row',
                                  scrollX: true,
                                  columns: [
                                           { header: "Sno", id: "SNRO", width: 50, css: { 'text-align': 'center ! important' } },
                                           { header: "Prod ID", id: "PRODID", width: 100, css: { 'text-align': 'center ! important' } },
                                           { header: "Prod Name", id: "PRODNM", width: 250, css: { 'text-align': 'center! important' } },
                                           { header: "Uom", id: "PRODUOM", width: 100, css: { 'text-align': 'center! important' } },
                                           { header: "Reodrder Level", id: "REORDER_LEVEL", width: 150, css: { 'text-align': 'center! important' } },
                                           { header: "Max Stock Qty",  id: "MAXSTKQTY", width: 100, css: { 'text-align': 'center! important' }, numberFormat: "1.00", },
                                           { header: "Stock Qty", id: "STKQTY", width: 100, css: { 'text-align': 'center! important' }, numberFormat: "1.00", },
                                           { header: "Reorder Qty", id: "REORDERQTY", width: 100, css: { 'text-align': 'center! important' }, numberFormat: "1.00", },
                                           { header: { content: "masterCheckbox", contentId: "AcptInd" }, id: "ACCEPT_IND", width: 50, css: { 'text-align': 'center! important' }, template: "{common.checkbox()}" },
                                           { header: "Final Qty", id: "FINALQTY", width: 100, editor: "text", liveEdit: true, css: { 'text-align': 'center! important', fillspace: 2, }, numberFormat: "1.00", },
                                           { header: "Rate",  id: "PRODRATE", width: 100, css: { 'text-align': 'right! important' }, numberFormat: "1.00", },
                                           { header: "Amount", id: "AMOUNT", width: 100, css: { 'text-align': 'right! important' }, numberFormat: "1.00", },
                                           { header: "To UOM", id: "TOUOM", width: wid_8, css: { 'text-align': 'center ! important' }, hidden: true, },
                                           { header: "", id: "DECLEN", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                                           { header: "", id: "AVGRATE", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, numberFormat: "1.00", },
                                           { header: "", id: "CONVFACT", width: wid_8, editor: "text", css: { 'text-align': 'right ! important' }, hidden: true, },
                                           { header: "", id: "PROD_GR_ID", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                                           { header: "", id: "UOM_NAME", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                                  ],

                                  editable: true,
                                  minWidth: 550,
                                  fixedRowHeight: false,
                                  rowLineHeight: 28,
                                  rowHeight: 28,
                                  height: 400,
                                  data: [],
                                  on: {
                                      onHeaderClick: function (header, event, target) {
                                          
                                          if (header.column == "ACCEPT_IND") {
                                              var control = $$("PRreorderGrid").getHeaderContent("AcptInd");
                                              var state = control.isChecked();
                                              if (state == true) {
                                                  var dataval = $$("PRreorderGrid").serialize();
                                                  if (dataval.length > 0) {
                                                      for (i = 0; i < dataval.length; i++) {
                                                          dataval[i].FINALQTY = dataval[i].REORDERQTY;
                                                          dataval[i].AMOUNT = parseFloat(dataval[i].REORDERQTY) * parseFloat(dataval[i].PRODRATE);
                                                      }
                                                  }
                                                  $$("PRreorderGrid").refresh();
                                              }
                                              else {
                                                  var dataval = $$("PRreorderGrid").serialize();
                                                  if (dataval.length > 0) {
                                                      for (i = 0; i < dataval.length; i++) {
                                                          dataval[i].FINALQTY = '0';
                                                          dataval[i].AMOUNT = '0';
                                                      }
                                                  }
                                                  $$("PRreorderGrid").refresh();
                                              }
                                          }
                                      },
                                      onCheck: function (row, col, val) {
                                          
                                          var getval = this.getItem(row);
                                          if (col == "ACCEPT_IND") {
                                              if (val == 1) {
                                                  getval.FINALQTY = getval.REORDERQTY;
                                                  getval.AMOUNT = parseFloat(getval.REORDERQTY) * parseFloat(getval.PRODRATE);
                                              }
                                              else {
                                                  getval.FINALQTY = '0';
                                                  getval.AMOUNT = '0';
                                              }
                                              this.refresh();
                                          }
                                      },
                                      onLiveEdit: function (state, editor) {
                                          var getval = this.getItem(editor.row);
                                          if (editor.column == "FINALQTY") {
                                              if (state.value != state.old) {
                                                  if (isNaN(state.value) == false) {
                                                      if (isNaN(state.value) == true) {
                                                          getval.FINALQTY = '0';
                                                          getval.AMOUNT = '0';
                                                      }
                                                      else if (isNaN(state.value) == false) {
                                                          if (state.value != "") {
                                                              getval.FINALQTY = state.value;
                                                              getval.AMOUNT = parseFloat(state.value) * parseFloat(getval.PRODRATE);
                                                          }
                                                      }
                                                  }
                                              }
                                              else if (isNaN(state.value) == true) {
                                                  getval.FINALQTY = '0';
                                                  getval.AMOUNT = '0';
                                              }
                                          }
                                          this.refresh();
                                      },
                                      onAfterEditStop: function (state, editor) {
                                          var getval = this.getItem(editor.row);
                                          if (editor.column == "FINALQTY") {
                                              if (state.value != state.old) {
                                                  if (isNaN(state.value) == false) {
                                                      if (isNaN(state.value) == true) {
                                                          getval.FINALQTY = '0';
                                                          getval.AMOUNT = '0';
                                                      }
                                                      else if (isNaN(state.value) == false) {
                                                          if (state.value != "") {
                                                              getval.FINALQTY = state.value;
                                                              getval.AMOUNT = parseFloat(state.value) * parseFloat(getval.PRODRATE);
                                                          }
                                                      }
                                                  }
                                              }
                                              else if (isNaN(state.value) == true) {
                                                  getval.FINALQTY = '0';
                                                  getval.AMOUNT = '0';
                                              }
                                          }
                                          this.refresh();
                                      }
                                  },

                              },


                          ]
                      }
                  ]
              },




                {
                    view: "button",
                    id: 'ok',
                    type: "htmlbutton",
                    css: "mp_btn",
                    label: "Ok",
                    autowidth: true,
                    align: 'right',
                    click: function () {
                        $$("reor").hide();
                        //$$("draft").setValue("0")
                    }
                },

                ]
            }
        }).show();
        FnddlCostcenter1();
        FnddlItemGroup();
    }


    webix.ui({
        container: "Shortclose", view: "switch", value: 0, id: 'Shortclose', label: "Short close", labelWidth: 80, css: 'mt-1 text-success', on: {
            onChange: function (newValue, oldValue, config) {
                if (newValue == 1) {
                    //("#POTapView").show();
                    $$("CancelReq").setValue('0');
                    fnShortclosePopup();
                }
                else {
                    // $("#POTapView").hide();
                    $$("Shortclosepop").hide();
                    $$("RequestGrid").hideColumn('CHECKIND');
                    var getval = $$("RequestGrid").serialize();
                    for (i = 0; i < getval.length; i++) {
                        getval[i].CHECKIND = 0;

                    }
                    $$("RequestGrid").refresh();
                }
            }
        }
    });
    function fnShortclosePopup() {


        webix.ui({
            view: "window",
            height: 350,
            width: 300,
            head: "Short Close",
            id: 'Shortclosepop',
            position: "center",
            body: {
                rows: [
                {
                    width: 300, height: 70, view: "radio", name: "gr1", id: 'ShortCloseChk', value: 1,
                    options: [{ 'id': '1', 'value': 'All items which can be ShortClosed' }, { 'id': '2', 'value': 'Select Item' }],on: {
                        onChange: function (newValue, oldValue, config) {
                            var getval = $$("RequestGrid").serialize();
                            if (newValue == 1) {
                                for (i = 0; i < getval.length; i++) {
                                    if (getval[i].Modetype == "OPEN" && getval[i].STATUS_IND == 2 && (getval[i].TOT_PO_UNIT > 0 || getval[i].TOT_RECPT_UNIT > 0)) {
                                        getval[i].CHECKIND = 1;
                                    }
                                }
                            }
                            else {
                                for (i = 0; i < getval.length; i++) {
                                     getval[i].CHECKIND = 0;
                                    
                                }
                            }
                            $$("RequestGrid").refresh();
                        }
                    }
                   
                },
                {
                    view: 'text',
                    label: 'Reason :',
                    id: 'BasisTxtShrt',
                    labelPosition: "top",
                    labelWidth: 80,
                    // top: 25,
                },
                {
                    view: "button",
                    type: "htmlbutton",
                    css: "mp_btn",
                    label: "Ok",
                    autowidth: true,
                    align: 'right',
                    click: function () {
                        var getval = $$("RequestGrid").serialize();
                        var newValue = $$("ShortCloseChk").getValue();
                        if (newValue == 1) {
                            for (i = 0; i < getval.length; i++) {
                                if (getval[i].Modetype == "OPEN" && getval[i].STATUS_IND == 2 && (getval[i].TOT_PO_UNIT > 0 || getval[i].TOT_RECPT_UNIT > 0)) {
                                    getval[i].CHECKIND = 1;
                                }
                            }
                        }
                        else {
                            for (i = 0; i < getval.length; i++) {
                                getval[i].CHECKIND = 0;

                            }
                        }
                        $$("RequestGrid").refresh();
                        $$("Shortclosepop").hide();
                        $$("RequestGrid").showColumn('CHECKIND');
                    }
                },

                ]
            }
        }).show();
    }

    webix.ui({
        container: "draft", view: "switch", value: 0, id: 'draft', label: "Draft", labelWidth: 70, css: 'mt-1',
        on: {
            onChange: function (newValue, oldValue, config) {
              
            }
        }
    });
    webix.ui({
        container: "Cancelmp", view: "switch", value: 0, id: 'CancelReq', label: "Cancel", labelWidth: 80, css: 'mt-1 text-success', on: {
            onChange: function (newValue, oldValue, config) {
                if (newValue == 1) {
                    //("#POTapView").show();
                    fnCancelPopup();
                    $$("Shortclose").setValue('0');
                }
                else {
                    // $("#POTapView").hide();
                    $$("CancelPop").hide();
                    $$("RequestGrid").hideColumn('CHECKIND');
                    var getval = $$("RequestGrid").serialize();
                    for (i = 0; i < getval.length; i++) {
                        getval[i].CHECKIND = 0;

                    }
                    $$("RequestGrid").refresh();
                }
            }
        }
    });
   
    function fnCancelPopup() {


        webix.ui({
            view: "window",
            height: 350,
            width: 300,
            head: "Cancel",
            id: 'CancelPop',
            position: "center",
            body: {
                rows: [

                {
                    width: 300, height: 70, view: "radio", name: "gr1", id: 'CancelChk', value: 1,
                    options: [{ 'id': '1', 'value': 'All items which can be ShortClosed' }, { 'id': '2', 'value': 'Select Item' }], on: {
                        onChange: function (newValue, oldValue, config) {
                            var getval = $$("RequestGrid").serialize();
                            if (newValue == 1) {
                                for (i = 0; i < getval.length; i++) {
                                    if (getval[i].Modetype == "OPEN" && getval[i].STATUS_IND == 2 && getval[i].TOT_PO_UNIT == 0 && getval[i].TOT_RECPT_UNIT == 0) {
                                        getval[i].CHECKIND = 1;
                                    }
                                }
                            }
                            else {
                                for (i = 0; i < getval.length; i++) {
                                    getval[i].CHECKIND = 0;

                                }
                            }
                            $$("RequestGrid").refresh();
                        }
                    }

                },
                {

                    view: 'text',
                    label: 'Reason :',
                    id: 'BasisTxtCancel',

                    labelPosition: "top",
                    labelWidth: 80,
                    // top: 25,
                },


                {
                    view: "button",
                    type: "htmlbutton",
                    css: "mp_btn",
                    label: "Ok",
                    autowidth: true,
                    align: 'right',
                    click: function () {
                        var getval = $$("RequestGrid").serialize();
                        var newValue = $$("CancelChk").getValue();
                        if (newValue == 1) {
                            for (i = 0; i < getval.length; i++) {
                                if (getval[i].Modetype == "OPEN" && getval[i].STATUS_IND == 2 && getval[i].TOT_PO_UNIT == 0 && getval[i].TOT_RECPT_UNIT == 0) {
                                    getval[i].CHECKIND = 1;
                                }
                            }
                        }
                        else {
                            for (i = 0; i < getval.length; i++) {
                                getval[i].CHECKIND = 0;

                            }
                        }
                        $$("RequestGrid").refresh();
                        $$("CancelPop").hide();
                        $$("RequestGrid").showColumn('CHECKIND');
                    }
                },

                ]
            }
        }).show();
    }


    var totMrVal = 0;
    var AddIcon = ' <button type="button" class="Btnbutton" id="DashBoard"  title="DashBoard" onclick="AddPRTFN()"><i style="font-size: 16px;" class="fa fa-plus"></i></button>';
    var tempalteIcon1 = ' <button type="button" class="Btnbutton" id="DashBoard" title="DashBoard"><i style="font-size: 16px;" class="fa fa-th-large"></i></button>';
    var tempalteIcon2 = ' <button type="button" class="Btnbutton" id="DashBoard" title="DashBoard"><i style="font-size: 16px;" class="fa wxi-filter"></i></button>';
    var tempalteIcon3 = ' <button type="button" class="Btnbutton" id="DashBoard" title="DashBoard"><i style="font-size: 16px;" class="fa fa-random"></i></button>';
    var tempalteIcon = ' <button type="button" class="Btnbutton" id="DashBoard" title="DashBoard"><i style="font-size: 16px;" class="fa fa-file"></i></button>';
    webix.ui({
        view: "popup",
        id: "my_pop",
        width: 150,
        height:300,
        body: {
            view: "list",
            id:'ColList',
            data: [
              { id: "1", value: "Input By" },
              { id: "2", value: "Prod/Category" },
              { id: "3", value: "Details" },
              { id: "4", value: "Instruction" },
              { id: "5", value: "Reason" },
            ],
           
            autoheight: true,
            select: "multiselect",
            multiselect: "touch",
            on: {
                onSelectChange: function () {
                    var vallist = this.getSelectedId(true).join();
                    var splilist = vallist.split(',');
                    if (vallist != '') {
                        $$("RequestGrid").hideColumn('ITEMCAT');
                        $$("RequestGrid").hideColumn('PRODID');
                        $$("RequestGrid").hideColumn('DETAILS');
                        $$("RequestGrid").hideColumn('Instruction');
                        $$("RequestGrid").hideColumn('Reason');
                        for (i = 0; i < splilist.length; i++) {
                            if (splilist[i] == 1) {
                                $$("RequestGrid").showColumn('ITEMCAT');
                            }
                            else if (splilist[i] == 2) {
                                $$("RequestGrid").showColumn('PRODID');
                            }
                            else if (splilist[i] == 3) {
                                $$("RequestGrid").showColumn('DETAILS');
                            }
                            else if (splilist[i] == 4) {
                                $$("RequestGrid").showColumn('Instruction');
                            }
                            else if (splilist[i] == 5) {
                                $$("RequestGrid").showColumn('Reason');
                            }
                        }
                    }
                    else {
                        $$("RequestGrid").hideColumn('ITEMCAT');
                        $$("RequestGrid").hideColumn('PRODID');
                        $$("RequestGrid").hideColumn('DETAILS');
                        $$("RequestGrid").hideColumn('Instruction');
                        $$("RequestGrid").hideColumn('Reason');
                    }
                }
            }
        }
    });

    webix.ui({

        container: "DivAddBtnPR",
        view: "button",
        type: "htmlbutton",
        label: "<span class='fas fa-plus'>",
        id: 'PRAdd_Btn',
        css: "mp_iconbtn",
        align: "right",
        on: {
            onItemClick: function () {
                AddPRTFN()
            }
        }
    });

    //webix.ui({
    //    container: "DivBtnPRFilter",
    //    view: "button",
    //    type: "htmlbutton",
    //    css: "mp_iconbtn",
    //    label: "<span class='fas fa-filter'>",
    //    id: 'PRFilter_Btn',
    //    css: "mp_iconbtn",
    //    //label: 'Filter',
    //    popup: 'my_pop'
    //});
    var ProIDFilter = {
            view:"suggest",
            data: [],
            id: 'ProdIdFilter',
            //css:'FilterProd',
            width: 150,
            height:200,
            body:{
                dataFeed: function(text) {
                    if (text.length > 2) {
                        return ListProductIdLoad(text);
                    }
                    else {
                        return [];
                    }
                }
            }
    };
    var ProNMFilter = {
        view: "suggest",
        data: [],
        id: 'ProdNmFilter',
        //css: 'FilterProd',
        width: 150,
        height: 200,
        body: {
            dataFeed: function (text) {
                if (text.length > 2) {
                    return ListProductNameLoad(text);
                }
                else {
                    return [];
                }
            }
        }
    };
    webix.ui({
        container: "DivReqTab1",
        view: "datatable",
        id: "RequestGrid",
        name: 'RequestGrid',
        select: 'row',
        leftSplit: 6, 
        columns: [{ header: " ", id: "CHECKIND", width: wid_4, css: { 'text-align': 'center ! important' }, template: "{common.checkbox()}", hidden: true, },
                 { header: "SNo.", id: "SNRO", width: wid_4, css: { 'text-align': 'center ! important' } },
                 { header: "Inp By", id: "ITEMCAT", width: wid_5, css: { 'text-align': 'center ! important' }, editor: "richselect", options: [{ 'id': '1', 'value': 'Item' }, { 'id': '2', 'value': 'Category' }] },
                 { header: "ID / Category", id: "PRODID", width: wid_8, css: { 'text-align': 'center ! important' }, editor: "text",suggest: ProIDFilter},
                 { header: "Prod Name", id: "PRODNM", width: wid_20, css: { 'text-align': 'left ! important' }, editor: "text", suggest: ProNMFilter },
                 { header: "", id: "PRODSRCHMODE", width: wid_3, template: SearchIcon, css: { 'text-align': 'center ! important', 'padding': '0px ! important' }, hidden: false, },
                 { header: "Details", id: "DETAILS", width: wid_10, css: { 'text-align': 'left ! important' }, hidden: false, editor: "popup", },
                 { header: "Line Type", id: "LINETYPE", width: wid_7, css: { 'text-align': 'center ! important' }, editor: "richselect", options: [{ 'id': 'Q', 'value': 'Qty' }, { 'id': 'F', 'value': 'Fixed Amount' }] },
                 { header: "UOM", id: "ProdUOM", width: wid_7, editor: "text", css: { 'text-align': 'center ! important' }, editor: "richselect", options: types },
                 { header: "Qty", id: "ProdMRQty", width: wid_6, css: { 'text-align': 'center ! important' }, editor: "text", liveEdit: true, numberFormat: "1.00", },
                 { header: "Rate", id: "ProdRate", width: wid_6, css: { 'text-align': 'right ! important' }, editor: "text", liveEdit: true, numberFormat: "1.00", },
                 { header: "Amount", id: "Amount", width: wid_6, css: { 'text-align': 'right ! important' }, numberFormat: "1.00", },
                 { header: "Cost Center", id: "CCenter", width: wid_10, css: { 'text-align': 'left ! important' },editor: "richselect",options:[] },
                 { header: "Instruction", id: "PO_REM", width: wid_10, css: { 'text-align': 'left ! important' }, hidden: false, editor: "popup", },
                 { header: "Reason", id: "ITEM_NARRATION", width: wid_10, css: { 'text-align': 'left ! important' }, hidden: false, editor: "popup", },
                 { header: "To UOM", id: "TOUOM", width: wid_8, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "ProdUOMHd", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "declen", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "Modetype", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "STATUS_IND", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "ModeDelete", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "INDENT_TRN_UID", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "INDENT_PROD_UID", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "PROD_SNO", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "PROD_GR_ID", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "UOM_NAME", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "TOT_PO_UNIT", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "TOT_RECPT_UNIT", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "K_INDENT_PROD_UID", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: " ", id: "Change_Ind", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, },
                 { header: "h13", id: "AvgRate", width: wid_5, css: { 'text-align': 'center ! important' }, hidden: true, numberFormat: "1.00", },
                 { header: "Conv Factor", id: "ConvFact", width: wid_8, editor: "text", css: { 'text-align': 'right ! important' }, hidden: true, },
        ],
        editable: true,
        ready: function () {

        },
        scheme: {
            $change: function (item) {
                if (item.ModeDelete == 1 && item.Modetype == "OPEN")
                    item.$css = "highlight";
                if (item.Modetype == "OPEN" && (item.STATUS_IND == 5 || item.STATUS_IND == 6 || item.STATUS_IND == 8 || item.STATUS_IND == 9)) {
                    item.$css = "GrayClr";
                }
            }
        },
        css: "wrap",
        data: [],
        on: {
            onLiveEdit: function (state, editor) {
                //AlertMessage("1");
                
                var getval = this.getItem(editor.row);
                if (editor.column == "ProdMRQty") {
                    if (state.value != state.old) {
                        if (isNaN(state.value) == false) {
                            var rate = getval.ProdRate;
                            var totMrQty = (state.value) * (rate);
                            getval.Amount = parseFloat(totMrQty).toFixed(getval.declen);
                            this.refresh();
                            if (isNaN(state.value) == true) {
                                getval.ProdMRQty = "";
                            }
                            else if (isNaN(state.value) == false) {
                                if (state.value != "") {
                                    getval.ProdMRQty = parseFloat(state.value).toFixed(getval.declen);

                                    this.refresh();
                                    var data = this.serialize();
                                    var lenval = data.length;
                                    var totMrQty = 0;
                                    totMrVal = 0;
                                    if (lenval != 0) {
                                        for (i = 0; i < lenval; i++) {
                                            
                                            if (data[i].ProdId != "") {
                                                var mrQty1 = data[i].ProdMRQty;
                                                var rate1 = data[i].ProdRate;
                                                var totMrQty1 = (mrQty1) * (rate1);
                                                totMrVal = (totMrVal) + (totMrQty1);
                                            }
                                        }
                                    }
                                    $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                                    $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));
                                }
                                else {
                                    getval.ProdMRQty = "";
                                }
                            }
                        }
                        else if (isNaN(state.value) == true) {
                            var totMrVal = 0;
                            var getval = this.getItem(editor.row);
                            getval.ProdUOMHd = getval.ProdUOM;
                            getval.Amount = '0.00';
                            getval.ProdMRQty = '0.00';
                            $('#DivProdValue').text('0:00');
                            $$("PRValue").setValue('0:00');

                        }
                    }
                    
                }
                if (editor.column == 'ProdRate') {
                    
                    if (state.value != state.old) {
                        var getval = this.getItem(editor.row);

                        if (isNaN(state.value) == true) {
                            getval.Amount = "";
                        }
                        else if (isNaN(state.value) == false) {
                            if (state.value != "") {
                                var totMrQty = (state.value) * (getval.ProdMRQty);
                                getval.Amount = parseFloat(totMrQty).toFixed(getval.declen);
                                getval.ProdRate = parseFloat(state.value).toFixed(getval.declen);
                                this.refresh();
                                var data = this.serialize();
                                var lenval = data.length;
                                totMrVal = 0;
                                var totMrQty = 0;
                                if (lenval != 0) {
                                    for (i = 0; i < lenval; i++) {
                                        
                                        if (data[i].ProdId != "") {
                                            var mrQty1 = data[i].ProdMRQty;
                                            var rate1 = data[i].ProdRate;
                                            var totMrQty1 = (mrQty1) * (rate1);
                                            totMrVal = (totMrVal) + (totMrQty1);
                                        }
                                    }
                                }
                                $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                                $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));
                            }
                            else {
                                getval.Amount = "";
                            }
                        }
                    }
                    else if (isNaN(state.value) == true) {
                        if (state.value != "") {
                            var totMrQty = (state.value) * (getval.ProdMRQty);
                            getval.Amount = parseFloat(totMrQty).toFixed(getval.declen);
                            getval.ProdRate = parseFloat(state.value).toFixed(getval.declen);
                            this.refresh();
                            var data = this.serialize();
                            var lenval = data.length;
                            var totMrQty = 0;
                            totMrVal = 0;
                            if (lenval != 0) {
                                for (i = 0; i < lenval; i++) {
                                    
                                    if (data[i].ProdId != "") {
                                        var mrQty1 = data[i].ProdMRQty;
                                        var rate1 = data[i].ProdRate;
                                        var totMrQty1 = (mrQty1) * (rate1);
                                        totMrVal = (totMrVal) + (totMrQty1);
                                    }
                                }
                            }
                            $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                            $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));
                        }
                        else {
                            getval.Amount = "";
                        }
                    }
                }
            },
            'onKeyPress': function (e) {
                // 
                if (e == '40') {
                    var nodeid = $$("RequestGrid").getSelectedId(true);
                    var lastid = $$("RequestGrid").getLastId();
                    if (nodeid[0].row == lastid) {
                        AddRequestTemplateRow();
                    }
                }
            },
            'onCheck': function (row, col, val) {
                var getval = this.getItem(row);
                if (col == "CHECKIND") {
                    if ((getval.Modetype == "OPEN" && getval.ModeDelete == 1) || getval.STATUS_IND == 5 || getval.STATUS_IND == 6 || getval.STATUS_IND == 8 || getval.STATUS_IND == 9) {
                        this.blockEvent();
                        getval.CHECKIND = getval.CHECKIND ? 0 : 1;
                        this.updateItem(row, getval);
                        this.unblockEvent();
                        return false;
                    }
                    if ($$("Shortclose").getValue() == 1) {
                        if (getval.Modetype == "OPEN" && getval.STATUS_IND == 2 && (getval.TOT_PO_UNIT > 0 || getval.TOT_RECPT_UNIT > 0)) {

                        }
                        else {
                            this.blockEvent();
                            getval.CHECKIND = getval.CHECKIND ? 0 : 1;
                            this.updateItem(row, getval);
                            this.unblockEvent();
                            return false;
                        }
                    }
                    else if ($$("CancelReq").getValue() == "1") {
                        if (getval.Modetype == "OPEN" && getval.STATUS_IND == 2 && getval.TOT_PO_UNIT == 0 && getval.TOT_RECPT_UNIT == 0) {

                        }
                        else {
                            this.blockEvent();
                            getval.CHECKIND = getval.CHECKIND ? 0 : 1;
                            this.updateItem(row, getval);
                            this.unblockEvent();
                            return false;
                        }
                    }
                }
            },
            'onBeforeEditStart': function (id) {
                var getval = this.getItem(id.row);
                if ((getval.Modetype == "OPEN" && getval.ModeDelete == 1) || getval.STATUS_IND == 5 || getval.STATUS_IND == 6 || getval.STATUS_IND == 8 || getval.STATUS_IND == 9) {
                    this.unselectAll();
                    return false;
                }
                if (getval.Modetype == "OPEN" &&  getval.K_INDENT_PROD_UID != "") {
                    getval.$css = "GrayClr";
                    this.unselectAll();
                    return false;
                }
                if (getval.Modetype == "OPEN" && getval.STATUS_IND == 2) {

                    if ($("#N1_IND").val() != "1") {
                        getval.$css = "GrayClr";
                        this.unselectAll();
                        return false;
                    }
                    else {
                        if (getval.TOT_PO_UNIT > 0 && getval.TOT_RECPT_UNIT > 0) {
                            getval.$css = "GrayClr";
                            this.unselectAll();
                            return false;
                        }
                    }
                }
                
                if (id.column == 'CHECKIND') {
                    if (getval.Modetype == "OPEN" && getval.STATUS_IND == 2 && (getval.TOT_PO_UNIT > 0 || getval.TOT_RECPT_UNIT > 0)) {
                        if ($$('ShortCloseChk').getValue() == 2) {

                        }
                        else {
                            this.unselectAll();
                            return false;
                        }
                    }
                    else if (getval.Modetype == "OPEN" && getval.STATUS_IND == 2 && getval.TOT_PO_UNIT == 0 && getval.TOT_RECPT_UNIT == 0) {
                        if ($$('CancelChk').getValue() == 2) {

                        }
                        else {
                            this.unselectAll();
                            return false;
                        }
                    }
                    else {
                        this.unselectAll();
                        return false;
                    }
                }
                if (id.column == 'ProdUOM') {
                    if (getval.ITEMCAT == 1) {
                        var Options = this.getColumnConfig("ProdUOM").collection;
                        var reqobj1 = {};
                        var UOMHd = "";
                        var UOMSTR = [];
                        reqobj1["REQTYPE"] = "FNUOMLoad";
                        reqobj1["prodId"] = getval.PRODID;
                        reqobj1["hdnUOM"] = getval.ProdUOM;
                        var dataparam1 = JSON.stringify(reqobj1);
                        $.ajax({
                            async: false,
                            url: "/PurchaseCtrl/MPAPI_CALL",
                            type: 'POST',
                            data: "request=" + dataparam1,
                            success: function (d) {

                                if (d != "[]") {

                                    Options.clearAll();
                                    UOMHd = JSON.parse(d);
                                    UOMHd.push({ id: getval.ProdUOMHd, value: getval.ProdUOMHd });
                                    Options.parse(UOMHd);
                                }
                                else {
                                    Options.clearAll();
                                    UOMSTR = { id: getval.ProdUOMHd, value: getval.ProdUOMHd };
                                    Options.parse(UOMSTR);
                                }
                            },
                        });
                    }
                    return true;
                }

                else if (id.column == 'ProdMRQty') {
                    
                    if ($("#Mode_type").val() != "VIEW") {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (id.column == 'PRODID') {
                    $('#ProdIdVal').text('');
                    $('#ProdNameVal').text('');
                    $('#ProdUOMVal').text('');
                }
                else if (id.column == 'PRODNM') {
                    $('#ProdIdVal').text('');
                    $('#ProdNameVal').text('');
                    $('#ProdUOMVal').text('');
                }
            },
            'onAfterEditStart': function (id) {
                if (id.column == 'ProdUOM') {
                    var Options = this.getColumnConfig("ProdUOM").collection;
                    Options.clearAll();
                    UOMSTR = types;
                    Options.parse(UOMSTR);
                    $$("RequestGrid").refresh();
                    return true;
                }
                else if (id.column == 'ProdId') {
                    this.getEditor().getInputNode().setAttribute("maxlength", 10);
                }
                else if (id.column == 'ProdMRQty') {
                    this.getEditor().getInputNode().setAttribute("maxlength", 8);
                }
               
            },
            'onItemClick': function (id) {
                
                var getval1 = this.getItem(id.row);
                $('#ProdIdVal').text(getval1.PRODID);
                $('#ProdNameVal').text(getval1.PRODNM);
                $('#ProdUOMVal').text(getval1.UOM_NAME);
                if (id.column == 'DELETEMODE') {
                   
                }
                else if (id.column == 'PRODSRCHMODE') {
                    var getval = this.getItem(id.row);
                    getval.PRODID = '';
                    getval.PRODNM = '';
                    getval.TOUOM = '';
                    getval.ConvFact = '';
                    getval.ProdUOMHd = '';
                    getval.ProdUOM = '';
                    getval.ProdMRQty = '';
                    getval.DETAILS = '';
                    getval.ProdRate = '';
                    getval.AvgRate = '0';
                    if (getval.ITEMCAT == 1) {
                        ProdSearchPopup();
                    }
                    else if (state.value == 2) {
                        FnProdCategoryLoad();
                        $$("RequestGrid").getColumnConfig("PRODNM").suggest = [];
                        $$("RequestGrid").refreshColumns();
                    }
                }

            },
            'onAfterEditStop': function (state, editor) {
                
                var getvalset = this.getItem(editor.row);
                if (getvalset.Modetype == "OPEN" && getvalset.STATUS_IND == "2") {
                    getvalset.Change_Ind = 1;
                }
                if (editor.column == 'ITEMCAT') {
                    var getval = this.getItem(editor.row);
                    getval.PRODID = '';
                    getval.PRODNM = '';
                    getval.TOUOM = '';
                    getval.ConvFact = '';
                    getval.ProdUOMHd = '';
                    getval.ProdUOM = '';
                    getval.ProdMRQty = '';
                    getval.DETAILS = '';
                    getval.ProdRate = '';
                    getval.AvgRate = parseFloat(0).toFixed(getval.declen);
                    if (state.value == 1) {
                        $$("RequestGrid").getColumnConfig("PRODID").suggest = ProIDFilter;
                        $$("RequestGrid").getColumnConfig("PRODNM").suggest = ProNMFilter;
                        $$("RequestGrid").refreshColumns();
                    }
                    else if (state.value == 2) {
                        FnProdCategoryLoad();
                        $$("RequestGrid").getColumnConfig("PRODNM").suggest = ProNMFilter;
                        $$("RequestGrid").refreshColumns();
                    }

                }
                if (editor.column == 'ProdRate') {
                    
                    var getval = this.getItem(editor.row);
                    if (state.value != state.old) {
                        if (isNaN(state.value) == true) {
                            getval.Amount = "";
                        }
                        else if (isNaN(state.value) == false) {
                            if (state.value != "") {
                                var totMrQty = (state.value) * (getval.ProdMRQty);
                                getval.Amount = parseFloat(totMrQty).toFixed(getval.declen);
                                getval.ProdRate = parseFloat(state.value).toFixed(getval.declen);
                                this.refresh();
                                var data = this.serialize();
                                var lenval = data.length;
                                totMrVal = 0;
                                var totMrQty = 0;
                                if (lenval != 0) {
                                    for (i = 0; i < lenval; i++) {
                                        
                                        if (data[i].ProdId != "") {
                                            var mrQty1 = data[i].ProdMRQty;
                                            var rate1 = data[i].ProdRate;
                                            var totMrQty1 = (mrQty1) * (rate1);
                                            totMrVal = (totMrVal) + (totMrQty1);
                                        }
                                    }
                                }
                                $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                                $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));
                            }
                            else {
                                getval.Amount = "";
                            }
                        }
                    }
                    else if (isNaN(state.value) == true) {
                        if (state.value != "") {
                            var totMrQty = (state.value) * (getval.ProdMRQty);
                            getval.Amount = parseFloat(totMrQty).toFixed(getval.declen);
                            getval.ProdRate = parseFloat(state.value).toFixed(getval.declen);
                            this.refresh();
                            var data = this.serialize();
                            var lenval = data.length;
                            var totMrQty = 0;
                            totMrVal = 0;
                            if (lenval != 0) {
                                for (i = 0; i < lenval; i++) {
                                    
                                    if (data[i].ProdId != "") {
                                        var mrQty1 = data[i].ProdMRQty;
                                        var rate1 = data[i].ProdRate;
                                        var totMrQty1 = (mrQty1) * (rate1);
                                        totMrVal = (totMrVal) + (totMrQty1);
                                    }
                                }
                            }
                            $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                            $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));
                        }
                        else {
                            getval.Amount = "";
                        }
                    }
                }
                if (editor.column == 'ProdMRQty') {
                    
                    var getval = this.getItem(editor.row);
                    if (state.value == state.old || state.value != state.old) {

                        var rate = getval.ProdRate;
                        var totMrQty = (state.value) * (rate);
                        getval.Amount = parseFloat(totMrQty).toFixed(getval.declen);

                        if (isNaN(state.value) == true) {
                            getval.ProdMRQty = "";
                        }
                        else if (isNaN(state.value) == false) {
                            if (state.value != "") {
                                getval.ProdMRQty = parseFloat(state.value).toFixed(getval.declen);
                                this.refresh();
                                var data = this.serialize();
                                var lenval = data.length;
                                totMrVal = 0;
                                var totMrQty = 0;
                                if (lenval != 0) {
                                    for (i = 0; i < lenval; i++) {
                                        
                                        if (data[i].ProdId != "") {
                                            var mrQty1 = data[i].ProdMRQty;
                                            var rate1 = data[i].ProdRate;
                                            var totMrQty1 = (mrQty1) * (rate1);
                                            totMrVal = (totMrVal) + (totMrQty1);
                                        }
                                    }
                                }
                                $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                                $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));
                            }
                            else {
                                getval.ProdMRQty = "";
                            }
                        }
                    }
                    else if (isNaN(state.value) == true) {
                        if (state.value != "") {
                            getval.ProdMRQty = parseFloat(state.value).toFixed(getval.declen);
                            this.refresh();
                            var data = this.serialize();
                            var lenval = data.length;
                            var totMrQty = 0;
                            totMrVal = 0;
                            if (lenval != 0) {
                                for (i = 0; i < lenval; i++) {
                                    
                                    if (data[i].ProdId != "") {
                                        var mrQty1 = data[i].ProdMRQty;
                                        var rate1 = data[i].ProdRate;
                                        var totMrQty1 = (mrQty1) * (rate1);
                                        totMrVal = (totMrVal) + (totMrQty1);
                                    }
                                }
                            }
                            $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                            $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));
                        }
                        else {
                            getval.ProdMRQty = "";
                        }
                    }
                }
                if (editor.column == 'PRODID') {
                    
                    var getval = this.getItem(editor.row);
                    if (state.value != "" && getval.ITEMCAT==1) {
                        var splitval = state.value.split(' ');
                        if (splitval[0] != $.trim(getval.PRODID)) {
                            var rowDatap = [];
                            var reqobj = {};
                            var setfocusval = "";
                            reqobj["REQTYPE"] = "ProductOnGrigLoad";
                            reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();
                            reqobj["Mode_type"] = $("#Mode_type").val();
                            reqobj["Base_Currency_ID"] = $("#Base_Currency_ID").val();
                            reqobj["D_IND"] = $("#D_IND").val();
                            reqobj["txtProdIdpop"] = state.value;
                            reqobj["txtProdNmpop"] = '';

                            var dataparam = JSON.stringify(reqobj);
                            $.ajax({
                                async: false,
                                url: "/PurchaseCtrl/MPAPI_CALL",
                                type: 'POST',
                                data: "request=" + dataparam,
                                success: function (d) {
                                    
                                    if (d != "[]") {
                                        setfocusval = "1";
                                        rowDatap = JSON.parse(d);
                                        var prodId = rowDatap[0].PRODID;
                                        var prodNm = rowDatap[0].PRODNM;
                                        var popUom = rowDatap[0].UOM;
                                        var toUom = rowDatap[0].TOUOM;
                                        var convF = rowDatap[0].CONV_FACT_BASE;
                                        var decLen = rowDatap[0].UOMDECLEN;
                                        getval.PRODID = prodId;
                                        getval.PRODNM = prodNm;
                                        getval.TOUOM = toUom;
                                        getval.PROD_GR_ID = rowDatap[0].PROD_GR_ID;
                                        getval.DETAILS = rowDatap[0].DETAILS;
                                        var prodRte = (parseFloat(rowDatap[0].PRODRATE) * convF);
                                        getval.ProdRate = prodRte;
                                        getval.AvgRate = parseFloat(rowDatap[0].AVGRATE);
                                        getval.ConvFact = convF;
                                        getval.ProdUOMHd = popUom;
                                        getval.ProdUOM = popUom;
                                        getval.UOM_NAME = rowDatap[0].UOM_NAME;
                                        $('#ProdIdVal').text(prodId);
                                        $('#ProdNameVal').text(prodNm);
                                        $('#ProdUOMVal').text(rowDatap[0].UOM_NAME);
                                        getval.declen = decLen;
                                        if (getval.ProdMRQty != "" && getval.ProdMRQty != undefined) {
                                            var rate = prodRte;
                                            var totMrQty1 = (getval.ProdMRQty) * (rate);
                                            getval.Amount = parseFloat(totMrQty1).toFixed(getval.declen);
                                            getval.ProdMRQty = parseFloat(getval.ProdMRQty).toFixed(getval.declen);
                                            $$("RequestGrid").refresh();
                                            var data = $$("RequestGrid").serialize();
                                            var lenval = data.length;
                                            totMrVal = 0;
                                            var totMrQty = 0;
                                            if (lenval != 0) {
                                                for (i = 0; i < lenval; i++) {
                                                    
                                                    if (data[i].ProdId != "") {
                                                        var mrQty1 = data[i].ProdMRQty;
                                                        var rate1 = data[i].ProdRate;
                                                        var totMrQty1 = (mrQty1) * (rate1);
                                                        totMrVal = (totMrVal) + (totMrQty1);
                                                    }
                                                }
                                            }
                                            $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                                            $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));

                                        }


                                        var valFloat = '';
                                        for (i = 0; i < getval.declen; i++) {
                                            valFloat += '0';
                                        }
                                        $$("RequestGrid").getColumnConfig("ProdMRQty").numberFormat = '1.' + valFloat;
                                        var ratedec = $("#RATE_DECIM_LEN").val();
                                        var valFloat1 = '';
                                        for (i = 0; i < ratedec; i++) {
                                            valFloat1 += '0';
                                        }
                                        $$("RequestGrid").getColumnConfig("ProdRate").numberFormat = '1.' + valFloat1;
                                        $$("RequestGrid").getColumnConfig("Amount").numberFormat = '1.' + valFloat1;
                                        $$("RequestGrid").getColumnConfig("AvgRate").numberFormat = '1.' + valFloat1;
                                        $$("RequestGrid").refreshColumns();
                                    }
                                    else {
                                        setfocusval = "0";
                                        getval.PRODID = '';
                                        getval.PRODNM = '';
                                        getval.TOUOM = '';
                                        getval.ConvFact = '';
                                        getval.ProdUOMHd = '';
                                        getval.ProdUOM = '';
                                        getval.ProdMRQty = '';
                                        getval.declen = '';
                                        getval.ProdRate = '';
                                        getval.AvgRate = '0';
                                        getval.DETAILS = '';
                                        getval.Amount = '';
                                    }

                                },
                            });


                            if (setfocusval == "1") {
                                var itemval = $$("RequestGrid").getSelectedItem();
                                $$("RequestGrid").editCell(editor.row, "ProdMRQty", false, true);
                                $$("RequestGrid").refresh();

                            }
                            else {
                                var itemval = $$("RequestGrid").getSelectedItem();
                                $$("RequestGrid").editCell(editor.row, "PRODID", false, true);
                                $$("RequestGrid").refresh();
                            }
                            this.adjustRowHeight("PRODNM");
                        }
                    }
                }
                if (editor.column == 'ProdUOM') {
                    var getval = this.getItem(editor.row);
                    if (state.value != "") {
                        getval.ProdUOM = state.value;
                        var reqobj = {};
                        reqobj["REQTYPE"] = "UOMChangeLoadFN";
                        reqobj["prodId"] = getval.PRODID;
                        reqobj["hdnUOM"] = state.value;
                        reqobj["ToUOM"] = getval.TOUOM;
                        reqobj["Mode_type"] = $("#Mode_type").val();
                        var dataparam = JSON.stringify(reqobj);
                        $.ajax({
                            async: false,
                            url: "/PurchaseCtrl/MPAPI_CALL",
                            type: 'POST',
                            data: "request=" + dataparam,
                            success: function (d) {
                                
                                if (d != "") {
                                    data = JSON.parse(d);
                                    getval.ConvFact = data.ConvFact;
                                    getval.declen = data.declen;
                                    getval.UOM_NAME = data.UOM_NAME;
                                    $('#ProdUOMVal').text(data.UOM_NAME);
                                    if (getval.ProdMRQty != "" && getval.ProdMRQty != undefined) {
                                        getval.ProdMRQty = parseFloat(getval.ProdMRQty).toFixed(data.declen);
                                        var prodRte = parseFloat(getval.AvgRate) * parseFloat(data.ConvFact);
                                        getval.ProdRate = parseFloat(prodRte).toFixed(data.declen);
                                        var rate = getval.ProdRate;
                                        var totMrQty = (getval.ProdMRQty) * (rate);
                                        getval.Amount = parseFloat(totMrQty).toFixed(data.declen);

                                    }
                                    else {
                                        var prodRte = parseFloat(getval.AvgRate) * parseFloat(data.ConvFact);
                                        getval.ProdRate = parseFloat(prodRte).toFixed(data.declen);
                                    }
                                    $$("RequestGrid").refresh();
                                    var data = $$("RequestGrid").serialize();
                                    var lenval = data.length;
                                    totMrVal = 0;
                                    var totMrQty = 0;
                                    if (lenval != 0) {
                                        for (i = 0; i < lenval; i++) {
                                            
                                            if (data[i].ProdId != "") {
                                                var mrQty1 = data[i].ProdMRQty;
                                                var rate1 = data[i].ProdRate;
                                                var totMrQty1 = (mrQty1) * (rate1);
                                                totMrVal = (totMrVal) + (totMrQty1);
                                            }
                                        }
                                    }
                                    $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                                    $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));
                                    var valFloat = '';
                                    for (i = 0; i < getval.declen; i++) {
                                        valFloat += '0';
                                    }
                                    $$("RequestGrid").getColumnConfig("ProdMRQty").numberFormat = '1.' + valFloat;
                                    var ratedec = $("#RATE_DECIM_LEN").val();
                                    var valFloat1 = '';
                                    for (i = 0; i < ratedec; i++) {
                                        valFloat1 += '0';
                                    }
                                    $$("RequestGrid").getColumnConfig("ProdRate").numberFormat = '1.' + valFloat1;
                                    $$("RequestGrid").getColumnConfig("Amount").numberFormat = '1.' + valFloat1;
                                    $$("RequestGrid").getColumnConfig("AvgRate").numberFormat = '1.' + valFloat1;
                                    $$("RequestGrid").refreshColumns();
                                }
                            },
                        });
                    }
                    if (editor.column == 'ProdUOM') {
                        var Options = this.getColumnConfig("ProdUOM").collection;
                        Options.clearAll();
                        UOMSTR = types;
                        Options.parse(UOMSTR);
                        $$("RequestGrid").refresh();
                    }
                }
                if (editor.column == 'PRODNM') {
                    
                    var getval = this.getItem(editor.row);
                    if (state.value != "" && getval.ITEMCAT == 1) {
                        var rowDatap = [];
                        var reqobj = {};
                        var setfocusval = "";
                        reqobj["REQTYPE"] = "ProductOnGrigLoad";
                        reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();
                        reqobj["Mode_type"] = $("#Mode_type").val();
                        reqobj["Base_Currency_ID"] = $("#Base_Currency_ID").val();
                        reqobj["D_IND"] = $("#D_IND").val();
                        reqobj["txtProdIdpop"] = '';
                        reqobj["txtProdNmpop"] = encodeURIComponent(state.value);

                        var dataparam = JSON.stringify(reqobj);
                        $.ajax({
                            async: false,
                            url: "/PurchaseCtrl/MPAPI_CALL",
                            type: 'POST',
                            data: "request=" + dataparam,
                            success: function (d) {
                                
                                if (d != "[]") {
                                    
                                       
                                        rowDatap = JSON.parse(d);
                                        if ($.trim(getval.PRODID) != $.trim(rowDatap[0].PRODID)) {
                                            setfocusval = "1";
                                        var prodId = rowDatap[0].PRODID;
                                        var prodNm = rowDatap[0].PRODNM;
                                        var popUom = rowDatap[0].UOM;
                                        var toUom = rowDatap[0].TOUOM;
                                        var convF = rowDatap[0].CONV_FACT_BASE;
                                        var decLen = rowDatap[0].UOMDECLEN;
                                        getval.PRODID = prodId;
                                        getval.PRODNM = prodNm;
                                        getval.TOUOM = toUom;
                                        getval.ConvFact = convF;
                                        getval.PROD_GR_ID = rowDatap[0].PROD_GR_ID;
                                        getval.DETAILS = rowDatap[0].DETAILS;
                                        var prodRte = (parseFloat(rowDatap[0].PRODRATE) * convF);
                                        getval.ProdRate = prodRte;
                                        getval.AvgRate = parseFloat(rowDatap[0].AVGRATE);
                                        getval.ProdUOMHd = popUom;
                                        getval.ProdUOM = popUom;
                                        getval.UOM_NAME = rowDatap[0].UOM_NAME;
                                        $('#ProdIdVal').text(prodId);
                                        $('#ProdNameVal').text(prodNm);
                                        $('#ProdUOMVal').text(rowDatap[0].UOM_NAME);
                                        getval.declen = decLen;
                                        if (getval.ProdMRQty != "" && getval.ProdMRQty != undefined) {
                                            var rate = prodRte;
                                            var totMrQty1 = (getval.ProdMRQty) * (rate);
                                            getval.Amount = parseFloat(totMrQty1).toFixed(getval.declen);
                                            getval.ProdMRQty = parseFloat(getval.ProdMRQty).toFixed(getval.declen);
                                            $$("RequestGrid").refresh();
                                            var data = $$("RequestGrid").serialize();
                                            var lenval = data.length;
                                            totMrVal = 0;
                                            var totMrQty = 0;
                                            if (lenval != 0) {
                                                for (i = 0; i < lenval; i++) {
                                                    
                                                    if (data[i].ProdId != "") {
                                                        var mrQty1 = data[i].ProdMRQty;
                                                        var rate1 = data[i].ProdRate;
                                                        var totMrQty1 = (mrQty1) * (rate1);
                                                        totMrVal = (totMrVal) + (totMrQty1);
                                                    }
                                                }
                                            }
                                            $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                                            $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));

                                        }
                                        var valFloat = '';
                                        for (i = 0; i < getval.declen; i++) {
                                            valFloat += '0';
                                        }
                                        $$("RequestGrid").getColumnConfig("ProdMRQty").numberFormat = '1.' + valFloat;
                                        var ratedec = $("#RATE_DECIM_LEN").val();
                                        var valFloat1 = '';
                                        for (i = 0; i < ratedec; i++) {
                                            valFloat1 += '0';
                                        }
                                        $$("RequestGrid").getColumnConfig("ProdRate").numberFormat = '1.' + valFloat1;
                                        $$("RequestGrid").getColumnConfig("Amount").numberFormat = '1.' + valFloat1;
                                        $$("RequestGrid").getColumnConfig("AvgRate").numberFormat = '1.' + valFloat1;
                                        $$("RequestGrid").refreshColumns();
                                    }
                                }
                                else {
                                    setfocusval = "0";
                                    getval.PRODID = '';
                                    getval.PRODNM = '';
                                    getval.TOUOM = '';
                                    getval.ConvFact = '';
                                    getval.ProdUOMHd = '';
                                    getval.ProdUOM = '';
                                    getval.DETAILS = ''
                                    getval.ProdMRQty = '';
                                    getval.declen = '';
                                    getval.ProdRate = '';
                                    getval.AvgRate = '0';
                                    getval.Amount = '';
                                }

                            },
                        });


                        if (setfocusval == "1") {
                            var itemval = $$("RequestGrid").getSelectedItem();
                            $$("RequestGrid").editCell(editor.row, "ProdMRQty", false, true);
                            $$("RequestGrid").refresh();

                        }
                       
                        this.adjustRowHeight("PRODNM");
                    }
                }
                if (editor.column == 'DETAILS') {
                    this.adjustRowHeight("DETAILS");
                }
                var getval1 = this.getItem(editor.row);
                $('#ProdIdVal').text(getval1.PRODID);
                $('#ProdNameVal').text(getval1.PRODNM);
                $('#ProdUOMVal').text(getval1.UOM_NAME);
            },
        }
    });
    $("#POTapView").hide();
    $("#vReqClass").val('N');
      // gridResize("1");
    $("#DELETE").prop('disabled', true);
    
    fnNarrationPopup();
    fnLoadDef();
    FnPODefultLoad();
    DDlUnitLoad();
    DDlPOTypeLoad();
    DDlReqCatLoad();
    FnddlCostcenter();
    fnDisable();
    LoadHideGridColumns();
    
    $$('ColList').select([1, 2, 3, 4, 5, 6], true);
    if ($("#FnType").val() == 'ShortClose' || $("#FnType").val() == 'Cancel') {
        fnOpen();
    }
}
function AddPRTFN() {
    if ($("#Mode_type").val() == "NEW") {
       
        var POTypeDDL = $$("POTypeDDL").getValue();
        if (POTypeDDL == "") {
            alert('PO Type should be selected');
            return false;
        }
        var RequestCategoryDDL = $$("RequestCategoryDDL").getValue();
        if (RequestCategoryDDL == "") {
            alert('Request Category should be selected');
            return false;
        }
    }

    AddRequestTemplateRow();
    //ListProductIdLoad();
    //ListProductNameLoad();
    if ($("#INDENT_CC_APPL_IND") == "3" || ($("#DP_IND").val == "3" && $("#vReqClass").val() == "N")) {
        FnddlCostcenterGrd();
    }
   
}
function ProdSearchPopup() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 32; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: 'Product Search',
        id: 'ProdSearchPopup',
        modal: true,
        width: 500,
        close: true,
        body: {
            view: 'form',
            width: 500,
            elements: [
                {
                    rows: [
                        {
                            view: 'richselect',
                            label: 'Group',
                            id: 'ddlGroup',
                            options: [],
                            value: '',
                            labelWidth: 120,
                            inputWidth: 400,
                            on: {
                                onChange: function () {
                                    FnddlSubGroup();
                                    FnProductSearchLoad();
                                }
                            }
                        },
                        {
                            view: 'richselect',
                            label: 'Sub Group',
                            id: 'ddlSubGroup',
                            options: [],
                            value: '',
                            labelWidth: 120,
                            inputWidth: 400,
                            on: {
                                onChange: function () {
                                    FnProductSearchLoad();
                                }
                            }
                        },
                        {
                            view: "datatable",
                            id: "ProdSearchGrid",
                            name: 'ProdSearchGrid',
                            select: 'row',
                            scrollX: false,
                            columns: [
                                     { header: ["Product Id", { content: "textFilter" }], id: "PROD_ID", width: 100, css: { 'text-align': 'center ! important' } },
                                      { header: ["Product Name", { content: "textFilter" }], id: "PROD_NM", width: 360, css: { 'text-align': 'left ! important' } },

                            ],
                            editable: true,
                            minWidth: 450,
                            fixedRowHeight: false,
                            rowLineHeight: 28,
                            rowHeight:28,
                            height: 350,
                            data: [],
                            on: {
                                'onItemDblClick': function (id) {
                                    
                                    var getval = $$("RequestGrid").getSelectedItem();
                                    var getval1 = this.getItem(id.row);
                                    if (getval1.PROD_ID != "") {
                                        var rowDatap = [];
                                        var reqobj = {};
                                        var setfocusval = "";
                                        reqobj["REQTYPE"] = "ProductOnGrigLoad";
                                        reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();
                                        reqobj["Mode_type"] = $("#Mode_type").val();
                                        reqobj["Base_Currency_ID"] = $("#Base_Currency_ID").val();
                                        reqobj["D_IND"] = $("#D_IND").val();
                                        reqobj["txtProdIdpop"] = getval1.PROD_ID;
                                        reqobj["txtProdNmpop"] = '';

                                        var dataparam = JSON.stringify(reqobj);
                                        $.ajax({
                                            async: false,
                                            url: "/PurchaseCtrl/MPAPI_CALL",
                                            type: 'POST',
                                            data: "request=" + dataparam,
                                            success: function (d) {
                                                
                                                if (d != "[]") {
                                                    setfocusval = "1";
                                                    rowDatap = JSON.parse(d);
                                                    var prodId = rowDatap[0].PRODID;
                                                    var prodNm = rowDatap[0].PRODNM;
                                                    var popUom = rowDatap[0].UOM;
                                                    var toUom = rowDatap[0].TOUOM;
                                                    var convF = rowDatap[0].CONV_FACT_BASE;
                                                    var decLen = rowDatap[0].UOMDECLEN;
                                                    getval.PRODID = prodId;
                                                    getval.PRODNM = prodNm;
                                                    getval.TOUOM = toUom;
                                                    getval.DETAILS = rowDatap[0].DETAILS;
                                                    var prodRte = (parseFloat(rowDatap[0].PRODRATE) * convF);
                                                    getval.ProdRate = prodRte;
                                                    getval.AvgRate = parseFloat(rowDatap[0].AVGRATE);
                                                    getval.ConvFact = convF;
                                                    getval.ProdUOMHd = popUom;
                                                    getval.ProdUOM = popUom;
                                                    getval.UOM_NAME = rowDatap[0].UOM_NAME;
                                                    $('#ProdIdVal').text(prodId);
                                                    $('#ProdNameVal').text(prodNm);
                                                    $('#ProdUOMVal').text(rowDatap[0].UOM_NAME);
                                                    getval.PROD_GR_ID = rowDatap[0].PROD_GR_ID;
                                                    getval.declen = decLen;
                                                    if (getval.ProdMRQty != "" && getval.ProdMRQty != undefined) {
                                                        var rate = prodRte;
                                                        var totMrQty1 = (getval.ProdMRQty) * (rate);
                                                        getval.Amount = parseFloat(totMrQty1).toFixed(getval.declen);
                                                        getval.ProdMRQty = parseFloat(getval.ProdMRQty).toFixed(getval.declen);
                                                        $$("RequestGrid").refresh();
                                                        var data = $$("RequestGrid").serialize();
                                                        var lenval = data.length;
                                                        totMrVal = 0;
                                                        var totMrQty = 0;
                                                        if (lenval != 0) {
                                                            for (i = 0; i < lenval; i++) {
                                                                
                                                                if (data[i].ProdId != "") {
                                                                    var mrQty1 = data[i].ProdMRQty;
                                                                    var rate1 = data[i].ProdRate;
                                                                    var totMrQty1 = (mrQty1) * (rate1);
                                                                    totMrVal = (totMrVal) + (totMrQty1);
                                                                }
                                                            }
                                                        }
                                                        $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                                                        $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));

                                                    }
                                                    var valFloat = '';
                                                    for (i = 0; i < getval.declen; i++) {
                                                        valFloat += '0';
                                                    }
                                                    $$("RequestGrid").getColumnConfig("ProdMRQty").numberFormat = '1.' + valFloat;
                                                    var ratedec = $("#RATE_DECIM_LEN").val();
                                                    var valFloat1 = '';
                                                    for (i = 0; i < ratedec; i++) {
                                                        valFloat1 += '0';
                                                    }
                                                    $$("RequestGrid").getColumnConfig("ProdRate").numberFormat = '1.' + valFloat1;
                                                    $$("RequestGrid").getColumnConfig("Amount").numberFormat = '1.' + valFloat1;
                                                    $$("RequestGrid").getColumnConfig("AvgRate").numberFormat = '1.' + valFloat1;
                                                    $$("RequestGrid").refreshColumns();
                                                }
                                                else {
                                                    setfocusval = "0";
                                                    alert("Product Id not valid!");
                                                    getval.PRODID = '';
                                                    getval.PRODNM = '';
                                                    getval.TOUOM = '';
                                                    getval.ConvFact = '';
                                                    getval.ProdUOMHd = '';
                                                    getval.ProdUOM = '';
                                                    getval.ProdMRQty = '';
                                                    getval.declen = '';
                                                    getval.ProdRate = '';
                                                    getval.AvgRate = '0';
                                                    getval.DETAILS = '';
                                                }

                                            },
                                        });


                                            var itemval = $$("RequestGrid").getSelectedItem();
                                            $$("RequestGrid").editCell(getval.id, "ProdMRQty", false, true);
                                            $$("RequestGrid").refresh();
                                            $$("RequestGrid").adjustRowHeight("PRODNM");
                                    }
                                    $$('ProdSearchPopup').hide();
                                }
                            }
                        },
                        {
                            view: 'checkbox',
                            labelRight: 'Word Search',
                            id: 'WordSearchChk',
                            labelWidth: 0,
                            value: 0,
                            width: 300,
                            on: {
                                onChange: function (newValue, oldValue, config) {

                                }
                            }
                        },
                        {
                            view: 'checkbox',
                            labelRight: 'Show 2nd line of Item Description',
                            id: 'Item2LineChk',
                            labelWidth: 0,
                            value: 0,
                            width: 300,
                            on: {
                                onChange: function (newValue, oldValue, config) {
                                    if (newValue == 1) {
                                        $$("ProdSearchGrid").config.rowLineHeight = 20;
                                        $$("ProdSearchGrid").config.css = "wrap";
                                        $$("ProdSearchGrid").config.rowHeight = 40;
                                        $$("ProdSearchGrid").resize();
                                        $$("ProdSearchGrid").refresh();
                                        $$("ProdSearchGrid").adjustRowHeight("PROD_NM");
                                    }
                                    else {
                                        $$("ProdSearchGrid").config.rowLineHeight = 28;
                                        $$("ProdSearchGrid").config.css = "";
                                        $$("ProdSearchGrid").config.rowHeight = 28;
                                        $$("ProdSearchGrid").resize();
                                        $$("ProdSearchGrid").refresh();
                                        $$("ProdSearchGrid").adjustRowHeight("PROD_NM");
                                    }
                                }
                            }
                        },
                        {
                            paddingY: 5,
                            cols: [
                                {},
                                {
                                    view: 'button',
                                    label: 'Ok',
                                    width: 100,
                                    align: "center",
                                    css: 'webix_primary',
                                    on: {
                                        onItemClick: function () {
                                            var getval = $$("RequestGrid").getSelectedItem();
                                            var getval1 = $$("ProdSearchGrid").getSelectedItem();
                                            if (getval1.PROD_ID != "") {
                                                var rowDatap = [];
                                                var reqobj = {};
                                                var setfocusval = "";
                                                reqobj["REQTYPE"] = "ProductOnGrigLoad";
                                                reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();
                                                reqobj["Mode_type"] = $("#Mode_type").val();
                                                reqobj["Base_Currency_ID"] = $("#Base_Currency_ID").val();
                                                reqobj["D_IND"] = $("#D_IND").val();
                                                reqobj["txtProdIdpop"] = getval1.PROD_ID;
                                                reqobj["txtProdNmpop"] = '';

                                                var dataparam = JSON.stringify(reqobj);
                                                $.ajax({
                                                    async: false,
                                                    url: "/PurchaseCtrl/MPAPI_CALL",
                                                    type: 'POST',
                                                    data: "request=" + dataparam,
                                                    success: function (d) {
                                                        
                                                        if (d != "[]") {
                                                            setfocusval = "1";
                                                            rowDatap = JSON.parse(d);
                                                            var ff = rowDatap.length;
                                                            var FullData = $$("RequestGrid").serialize();
                                                            var len = FullData.length;
                                                            if (len != 1) {
                                                                for (i = 0; i < len; i++) {
                                                                    var itemId = $.trim(FullData[i].PRODID);
                                                                    if ($.trim(rowDatap[0].PRODID) == itemId && $.trim(FullData[i].id) != editor.row) {
                                                                        alert("This product is already added!...");
                                                                        getval.PRODID = '';
                                                                        getval.PRODNM = '';
                                                                        getval.TOUOM = '';
                                                                        getval.DETAILS = '';
                                                                        getval.ConvFact = '';
                                                                        getval.ProdUOMHd = '';
                                                                        getval.ProdUOM = '';
                                                                        getval.ProdMRQty = '';
                                                                        getval.declen = '';
                                                                        getval.ProdRate = '';
                                                                        getval.AvgRate = '0';
                                                                        var itemval = $$("RequestGrid").getSelectedItem();
                                                                        $$("RequestGrid").editCell(editor.row, "PRODID", false, true);
                                                                        $$("RequestGrid").refresh();
                                                                        return false;
                                                                    }
                                                                }
                                                            }
                                                            var prodId = rowDatap[0].PRODID;
                                                            var prodNm = rowDatap[0].PRODNM;
                                                            var popUom = rowDatap[0].UOM;
                                                            var toUom = rowDatap[0].TOUOM;
                                                            var convF = rowDatap[0].CONV_FACT_BASE;
                                                            var decLen = rowDatap[0].UOMDECLEN;
                                                            getval.PRODID = prodId;
                                                            getval.PRODNM = prodNm;
                                                            getval.TOUOM = toUom;
                                                            getval.DETAILS = rowDatap[0].DETAILS;
                                                            var prodRte = (parseFloat(rowDatap[0].PRODRATE) * convF);
                                                            getval.ProdRate = prodRte;
                                                            getval.AvgRate = parseFloat(rowDatap[0].AVGRATE);
                                                            getval.ConvFact = convF;
                                                            getval.ProdUOMHd = popUom;
                                                            getval.ProdUOM = popUom;
                                                            getval.UOM_NAME = rowDatap[0].UOM_NAME;
                                                            $('#ProdIdVal').text(prodId);
                                                            $('#ProdNameVal').text(prodNm);
                                                            $('#ProdUOMVal').text(rowDatap[0].UOM_NAME);
                                                            getval.PROD_GR_ID = rowDatap[0].PROD_GR_ID;
                                                            getval.declen = decLen;
                                                            if (getval.ProdMRQty != "" && getval.ProdMRQty != undefined) {
                                                                var rate = prodRte;
                                                                var totMrQty1 = (getval.ProdMRQty) * (rate);
                                                                getval.Amount = parseFloat(totMrQty1).toFixed(getval.declen);
                                                                getval.ProdMRQty = parseFloat(getval.ProdMRQty).toFixed(getval.declen);
                                                                $$("RequestGrid").refresh();
                                                                var data = $$("RequestGrid").serialize();
                                                                var lenval = data.length;
                                                                totMrVal = 0;
                                                                var totMrQty = 0;
                                                                if (lenval != 0) {
                                                                    for (i = 0; i < lenval; i++) {
                                                                        
                                                                        if (data[i].ProdId != "") {
                                                                            var mrQty1 = data[i].ProdMRQty;
                                                                            var rate1 = data[i].ProdRate;
                                                                            var totMrQty1 = (mrQty1) * (rate1);
                                                                            totMrVal = (totMrVal) + (totMrQty1);
                                                                        }
                                                                    }
                                                                }
                                                                $$("PRValue").setValue(parseFloat(totMrVal).toFixed(2));
                                                                $('#DivProdValue').text(parseFloat(totMrVal).toFixed(2));

                                                            }
                                                            var valFloat = '';
                                                            for (i = 0; i < getval.declen; i++) {
                                                                valFloat += '0';
                                                            }
                                                            $$("RequestGrid").getColumnConfig("ProdMRQty").numberFormat = '1.' + valFloat;
                                                            var ratedec = $("#RATE_DECIM_LEN").val();
                                                            var valFloat1 = '';
                                                            for (i = 0; i < ratedec; i++) {
                                                                valFloat1 += '0';
                                                            }
                                                            $$("RequestGrid").getColumnConfig("ProdRate").numberFormat = '1.' + valFloat1;
                                                            $$("RequestGrid").getColumnConfig("Amount").numberFormat = '1.' + valFloat1;
                                                            $$("RequestGrid").getColumnConfig("AvgRate").numberFormat = '1.' + valFloat1;
                                                            $$("RequestGrid").refreshColumns();
                                                        }
                                                        else {
                                                            setfocusval = "0";
                                                            alert("Product Id not valid!");
                                                            getval.PRODID = '';
                                                            getval.PRODNM = '';
                                                            getval.TOUOM = '';
                                                            getval.ConvFact = '';
                                                            getval.ProdUOMHd = '';
                                                            getval.ProdUOM = '';
                                                            getval.ProdMRQty = '';
                                                            getval.declen = '';
                                                            getval.ProdRate = '';
                                                            getval.AvgRate = '0';
                                                            getval.DETAILS = '';
                                                        }

                                                    },
                                                });



                                                var itemval = $$("RequestGrid").getSelectedItem();
                                                $$("RequestGrid").editCell(getval.id, "ProdMRQty", false, true);
                                                $$("RequestGrid").refresh();
                                               
                                            }
                                            $$('ProdSearchPopup').hide();

                                        }
                                    }
                                },
                               {
                                   view: 'button',
                                   label: 'Cancel',
                                   width: 100,
                                   align: "center",
                                   css: 'webix_primary',
                                   on: {
                                       onItemClick: function () {
                                           $$('ProdSearchPopup').hide();
                                       }
                                   }
                               }
                            ]
                        },
                    ]
                }
            ]
        }
    }).show();
    FnddlGroup();
    FnddlSubGroup();
    FnProductSearchLoad();
}
function PRSearchPopup() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 32; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');

    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: 'Request Search',
        id: 'PRSearchPopup',
        modal: true,
        width: 600,
        close: true,
        body: {
            view: 'form',
            width: 600,
            elements: [
                {
                    rows: [
                       
                        {
                            view: "datatable",
                            id: "PRSearchGrid",
                            name: 'PRSearchGrid',
                            select: 'row',
                            scrollX: false,
                            columns: [
                                     { header: ["Request No", { content: "textFilter" }], id: "DISP_NO", width: 100, css: { 'text-align': 'center ! important' } },
                                     { header: ["Request Name", { content: "textFilter" }], id: "INDENT_NM", width: 360, css: { 'text-align': 'left ! important' } },
                                     { header: ["Date", { content: "textFilter" }], id: "DATE", width: 100, css: { 'text-align': 'left ! important' } },
                                      { header: [" ", { content: "textFilter" }], id: "INDENT_NO", width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                                      { header: [" ", { content: "textFilter" }], id: "INDENT_TRN_UID", width: 100, css: { 'text-align': 'left ! important' }, hidden: true },
                            ],
                            editable: true,
                            minWidth: 550,
                            fixedRowHeight: false,
                            rowLineHeight: 28,
                            rowHeight: 28,
                            height: 400,
                            data: [],
                            on: {
                                'onItemDblClick': function (id) {
                                    
                                    var getval = $$("RequestGrid").getSelectedItem();
                                    var getval1 = this.getItem(id.row);
                                    if (getval1.INDENT_TRN_UID != "") {
                                        FnPrOpenLoad(getval1.INDENT_NO, getval1.INDENT_TRN_UID);
                                    }
                                    $$('PRSearchPopup').hide();
                                }
                            }
                        },
                        {
                            view: 'checkbox',
                            labelRight: 'Show 2nd line of Item Description',
                            id: 'Item2LineChk',
                            labelWidth: 0,
                            value: 0,
                            width: 300,
                            on: {
                                onChange: function (newValue, oldValue, config) {
                                    if (newValue == 1) {
                                        $$("PRSearchGrid").config.rowLineHeight = 20;
                                        $$("PRSearchGrid").config.css = "wrap";
                                        $$("PRSearchGrid").config.rowHeight = 40;
                                        $$("PRSearchGrid").resize();
                                        $$("PRSearchGrid").refresh();
                                        $$("PRSearchGrid").adjustRowHeight("INDENT_NM");
                                    }
                                    else {
                                        $$("PRSearchGrid").config.rowLineHeight = 28;
                                        $$("PRSearchGrid").config.css = "";
                                        $$("PRSearchGrid").config.rowHeight = 28;
                                        $$("PRSearchGrid").resize();
                                        $$("PRSearchGrid").refresh();
                                        $$("PRSearchGrid").adjustRowHeight("INDENT_NM");
                                    }
                                }
                            }
                        },
                        {
                          
                            cols: [
                                {},
                                {
                                    view: 'button',
                                    label: 'Ok',
                                    width: 100,
                                    align: "center",
                                    css: 'webix_primary',
                                    on: {
                                        onItemClick: function () {
                                            var getval = $$("RequestGrid").getSelectedItem();
                                            var getval1 = $$("ProdSearchGrid").getSelectedItem();
                                            if (getval1.INDENT_TRN_UID != "") {
                                                
                                                FnPrOpenLoad(getval1.INDENT_NO, getval1.INDENT_TRN_UID);
                                            }
                                            $$('PRSearchPopup').hide();

                                        }
                                    }
                                },
                               {
                                   view: 'button',
                                   label: 'Cancel',
                                   width: 100,
                                   align: "center",
                                   css: 'webix_primary',
                                   on: {
                                       onItemClick: function () {
                                           $$('PRSearchPopup').hide();
                                       }
                                   }
                               }
                            ]
                        },
                    ]
                }
            ]
        }
    }).show();
   
    FnPrSearchLoad();
}
function HDClr(value, config) {
    if (config.INACTIVE_IND == "Active") {
        return "Greencolor";
    }
    else
        return "redcolor";
}
function AddRequestTemplateRow() {
    
    var data = $$("RequestGrid").serialize();
    var lenval = data.length;
    var indx = "";
    var sno = 0;
    var PROD_SNO = 0;
    var  INDENT_TRN_UID='';
    if (lenval != 0) {
        for (i = 0; i < lenval; i++) {
            
            indx = i;
            sno = data[i].SNRO;
            INDENT_TRN_UID = data[i].INDENT_TRN_UID;
            PROD_SNO = data[i].PROD_SNO;
        }
        if ($("#Mode_type").val() != "NEW" && INDENT_TRN_UID != "" && INDENT_TRN_UID != undefined) {
            PROD_SNO = SRNOLoadFn(INDENT_TRN_UID);
            var addrow = {
                CHECKIND: 0, AvgRate:0,SNRO: sno + 1, ITEMCAT: '1', LINETYPE: 'Q', PRODID: '', PRODNM: '', Modetype: 'NEW', ModeDelete: '0', Change_Ind: 0, PROD_SNO: PROD_SNO, STATUS_IND: 0, ITEM_NARRATION: '', PO_REM: '',PROD_GR_ID:''
            };
        }
        else {
            var addrow = {
                CHECKIND: 0, AvgRate: 0, SNRO: sno + 1, ITEMCAT: '1', LINETYPE: 'Q', PRODID: '', PRODNM: '', Modetype: 'NEW', ModeDelete: '0', Change_Ind: 0, PROD_SNO: PROD_SNO + 1, STATUS_IND: 0, ITEM_NARRATION: '', PO_REM: '', PROD_GR_ID: ''
            };
        }
        $$("RequestGrid").add(addrow);
        $$("RequestGrid").select($$("RequestGrid").getLastId());
        webix.UIManager.setFocus($$("RequestGrid"));
        var itemval = $$("RequestGrid").getSelectedItem();
        $$("RequestGrid").editCell(itemval.id, "PRODID", false, true);
        $$("RequestGrid").refresh();
    }
    else {
        var addrow = {
            CHECKIND: 0, AvgRate: 0, SNRO: 1, ITEMCAT: '1', PRODID: '', LINETYPE: 'Q', PRODNM: '', Modetype: 'NEW', ModeDelete: '0', Change_Ind: 0, PROD_SNO: 1, STATUS_IND: 0, ITEM_NARRATION: '', PO_REM: '', PROD_GR_ID: ''
        };
        $$("RequestGrid").add(addrow);
        $$("RequestGrid").select($$("RequestGrid").getLastId());
        webix.UIManager.setFocus($$("RequestGrid"));
        var itemval = $$("RequestGrid").getSelectedItem();
        $$("RequestGrid").editCell(itemval.id, "PRODID", false, true);
        $$("RequestGrid").refresh();
    }

};
function fnLoadDef() {
    //

    var response = "";
    var reqobj = {};
    reqobj["REQTYPE"] = "FnDefultLoad";
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            response = JSON.parse(d);
            var ithInd = response.ithInd;
                $("#LOC_ID").val(response.LOC_ID);
                $("#mrdInd").val(response.mrdInd);
                $("#cirInd").val(response.cirInd);
                $("#matEmulateInd").val(response.matEmulateInd);
                $("#costLinkDept").val(response.costLinkDept);
                $("#vUserDeptInd").val(response.vUserDeptIND);
                $("#User_Privld_Ind").val(response.User_Privld_Ind);
                $("#vMjGrpAppl").val(response.vMjGrpAppl);
                $("#Base_Currency_ID").val(response.Base_Currency_ID);
                $("#DEF_DT_FORMAT").val(response.DEF_DT_FORMAT);
                if ($("#costLinkDept").val() == "")
                    $("#costLinkDept").val("0");
                if (response.DEF_DT_FORMAT == 1) {
                    $$("Date").define("format", '%d/%m/%Y');
                    $$('Date').refresh();
                    $$("NeedDate").define("format", '%d/%m/%Y');
                    $$('NeedDate').refresh();
                }
                else if (response.DEF_DT_FORMAT == 2) {
                    $$("Date").define("format", '%m/%d/%Y');
                    $$('Date').refresh();
                    $$("NeedDate").define("format", '%m/%d/%Y');
                    $$('NeedDate').refresh();
                }
          },
    });
}
function FnPODefultLoad() {
    //

    var response = "";
    var reqobj = {};
    reqobj["REQTYPE"] = "FnPODefultLoad";
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            response = JSON.parse(d);
            $("#vStrInd").val(response.vStrInd);
            $("#vResStr").val(response.vResStr);
            $("#vResDept").val(response.vResDept);
            $("#V2lineInd").val(response.V2lineInd);
            $("#vDefPoTyID").val(response.vDefPoTyID);
            $("#VNF1_IND").val(response.VNF1_IND);
            $("#vDprApp").val(response.vDprApp);
            $("#vAuditInd").val(response.vAuditInd);
            $("#vUserGrpRes").val(response.vUserGrpRes);
            $("#DOC_ATTACH_IND").val(response.DOC_ATTACH_IND);
            $("#vUserUnitRes").val(response.vUserUnitRes);
            $("#vCstItmRes").val(response.vCstItmRes);
            $("#vBoqInd").val(response.vBoqInd);
            $("#vRqCatCCLink").val(response.vRqCatCCLink);
            $("#vOthLngId").val(response.vOthLngId);
            $("#vShowAuditLog").val(response.vShowAuditLog);
            $("#UomNameAppl").val(response.UomNameAppl);
         },
    });
}
function DDlUnitLoad() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlUnitLoad";
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["vUserUnitRes"] = $("#vUserUnitRes").val() == "" ? "0" : $("#vUserUnitRes").val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            $$("UnitDDL").define("options", rowDatad);
            $$("UnitDDL").refresh();
            $$("UnitDDL").setValue(rowDatad[0].id);
            $$("UnitDDL").hide();
            if (rowDatad.length > 1) {
                $$("UnitDDL").show();
            }
        },
    });
}
function DDlPOTypeLoad() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlPOTypeLoad";
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["VNF1_IND"] = $("#VNF1_IND").val() == "" ? "0" : $("#VNF1_IND").val();
    reqobj["GS_IND"] = $$("BasisDDL").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            $$("POTypeDDL").define("options", rowDatad);
            $$("POTypeDDL").refresh();
            $$("POTypeDDL").setValue(rowDatad[0].id);
        },
    });
}
function DDlReqCatLoad() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlReqCatLoad";
    reqobj["vMjGrpAppl"] = $("#vMjGrpAppl").val() == "" ? "0" : $("#vMjGrpAppl").val();
    reqobj["vRqCatCCLink"] = $("#vRqCatCCLink").val() == "" ? "0" : $("#vRqCatCCLink").val();
    reqobj["CostCenter"] = $$("CostCenterDDL").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            $$("RequestCategoryDDL").define("options", rowDatad);
            $$("RequestCategoryDDL").refresh();
            $$("RequestCategoryDDL").setValue(rowDatad[0].id);
        },
    });
}
function SRNOLoadFn(UID) {
    
    var SRNO = '';
    var reqobj = {};
    reqobj["REQTYPE"] = "SRNOLoadFn";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["UnitDDL"] = $$("UnitDDL").getValue();
    reqobj["UID"] = UID;
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            SRNO=d;
           
        },
    });
    return SRNO;
}
function DDlPOTypeChangeLoad() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlPOTypeChangeLoad";
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["VNF1_IND"] = $("#VNF1_IND").val() == "" ? "0" : $("#VNF1_IND").val();
    reqobj["PO_TY_ID"] =  $$("POTypeDDL").getValue();
   
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            if (rowDatad.length > 0) {
                $("#PROD_GROUP_APPL_IND").val(rowDatad[0]["PROD_GROUP_APPL_IND"]);
                $("#ALT_UOM_APPL_IND").val(rowDatad[0]["ALT_UOM_APPL_IND"]);
                $("#PO_INDENT_DEPART_APPL_IND").val(rowDatad[0]["PO_INDENT_DEPART_APPL_IND"]);
                $("#INDENT_CC_APPL_IND").val(rowDatad[0]["INDENT_CC_APPL_IND"]);
                $("#PO_R_IND").val(rowDatad[0]["PO_R_IND"]);
                $("#RATE_DECIM_LEN").val(rowDatad[0]["RATE_DECIM_LEN"]==""?2:rowDatad[0]["RATE_DECIM_LEN"]);
                $("#A_IND").val(rowDatad[0]["A_IND"]);
                $("#C_IND").val(rowDatad[0]["C_IND"]);
                $("#H1_IND").val(rowDatad[0]["H1_IND"]);
                $("#DP_IND").val(rowDatad[0]["DP_IND"]);
                if (rowDatad[0]["INDENT_CC_APPL_IND"] == "1" || rowDatad[0]["INDENT_CC_APPL_IND"] == "2" || (rowDatad[0]["DP_IND"] == "2" && $("#vReqClass").val() == "N")) {
                    $$("CostCenterDDL").show();
                    $$("RequestGrid").hideColumn('CCenter');
                }
                else if (rowDatad[0]["INDENT_CC_APPL_IND"] == "3" || (rowDatad[0]["DP_IND"] == "3" && $("#vReqClass").val() == "N")) {
                    $$("CostCenterDDL").hide();
                    $$("RequestGrid").showColumn('CCenter');
                }
                else {
                    $$("CostCenterDDL").hide();
                    $$("RequestGrid").hideColumn('CCenter');
                }
            }
        },
    });
}
function DDlPOTypeChangeLoad1() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlPOTypeChangeLoad1";
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["VNF1_IND"] = $("#VNF1_IND").val() == "" ? "0" : $("#VNF1_IND").val();
    reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            if (rowDatad.length > 0) {
                $("#DPR_IND").val(rowDatad[0]["DPR_IND"]);
                $("#D_IND").val(rowDatad[0]["D_IND"]);
                $("#E_IND").val(rowDatad[0]["E_IND"]);
                $("#B1_IND").val(rowDatad[0]["B1_IND"]);
                $("#C1_IND").val(rowDatad[0]["C1_IND"]);
                $("#L1_IND").val(rowDatad[0]["L1_IND"]);
                $("#M1_IND").val(rowDatad[0]["M1_IND"]);
                $("#N1_IND").val(rowDatad[0]["N1_IND"]);
                $("#NK1_ind").val(rowDatad[0]["NK1_ind"]);
                $("#PRS_IND").val(rowDatad[0]["PRS_IND"]);
                $("#DBL_IND").val(rowDatad[0]["DBL_IND"]);
                $("#AD_IND").val(rowDatad[0]["AD_IND"]);
                $("#PRM_IND").val(rowDatad[0]["PRM_IND"]);
                $("#PONM_IND").val(rowDatad[0]["PONM_IND"]);
                $("#C_REQ_APPL").val(rowDatad[0]["C_REQ_APPL"]);
                $("#C_PO_APPL").val(rowDatad[0]["C_PO_APPL"]);
            }
        },
    });
}
function CleraGridValue() {
    $$("RequestGrid").clearAll();
    $$("RequestGrid").refresh();
}
function LoadHideGridColumns() {
    
  
    if ($$("BasisDDL").getValue() != "G") {
        $$("RequestGrid").showColumn('LINETYPE');
    }
    else {
        $$("RequestGrid").hideColumn('LINETYPE');
    }
  }
function DDLStoreCgangefn() {
    var reqobj = {};
    reqobj["REQTYPE"] = "FnStoreidLoad";
    reqobj["iA1Ind"] = $("#iA1Ind").val();
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["ddlStore"] = $$("ddlStore").getValue();
    reqobj["Mode_type"] = $("#Mode_type").val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            fnLoadStoreId(rowDatad);
        },
    });
}
function FnddlCostcenterGrd() {
    
    $("#hdnShowCC").val("0");
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlCostCenterLoad";
    reqobj["deptInd"] = $("#vUserDeptInd").val();
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["GSInd"] = $$("BasisDDL").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("RequestGrid").getColumnConfig("CCenter").options = rowDatad;
                $$("RequestGrid").refreshColumns();
            }
        },
    });
}
function FnddlCostcenter() {
    
    $("#hdnShowCC").val("0");
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlCostCenterLoad";
    reqobj["deptInd"] = $("#vUserDeptInd").val();
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["GSInd"] = $$("BasisDDL").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("CostCenterDDL").define("options", rowDatad);
                $$("CostCenterDDL").refresh();
            }
        },
    });
}
function FnddlItemGroup() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlItemGroupLoad";
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("ItemGrpDDL").define("options", rowDatad);
                $$("ItemGrpDDL").refresh();
            }
        },
    });
}
function ReorderProcessLoad() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "ReorderProcessLoad";
    reqobj["POTypeDDL"] = $$("POTypeDDL").getValue();
    reqobj["RequestCategoryDDL"] = $$("RequestCategoryDDL").getValue();
    reqobj["CostCenter"] = $$("CostCenterDDL1").getValue();
    reqobj["ItemGrp"] = $$("ItemGrpDDL").getValue();
    reqobj["PROD_GROUP_APPL_IND"] = $("#PROD_GROUP_APPL_IND").val();
    reqobj["Base_Currency_ID"] = $("#Base_Currency_ID").val();
    reqobj["D_IND"] = $("#D_IND").val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            if (d != "") {
                rowDatad = JSON.parse(d);
                if (rowDatad.length > 0) {
                    var arrayset = [];
                    for (i = 0; i < rowDatad.length; i++) {
                        var getval = {};
                        var prodId = rowDatad[i].PRODID;
                        var prodNm = rowDatad[i].PRODNM;
                        var popUom = $.trim(rowDatad[i].UOM);
                        var toUom = rowDatad[i].TOUOM;
                        var convF = rowDatad[i].CONV_FACT_BASE;
                        var decLen = rowDatad[i].UOMDECLEN == null ? 2 : rowDatad[i].UOMDECLEN;
                        getval.PRODID = prodId;
                        getval.PRODNM = prodNm;
                        getval.TOUOM = toUom;
                        getval.SNRO = i + 1;
                        var prodRte = (parseFloat(rowDatad[i].PRODRATE) * convF);
                        getval.PRODRATE = prodRte.toFixed($("#RATE_DECIM_LEN").val());
                        getval.AVGRATE = parseFloat(rowDatad[i].AVGRATE);
                        getval.CONVFACT = convF;
                        getval.PRODUOMHD = popUom;
                        getval.PRODUOM = popUom;
                        getval.PROD_GR_ID = rowDatad[i].PROD_GR_ID;
                        getval.STKQTY = (parseFloat(rowDatad[i].STKQTY) / convF);
                        getval.DECLEN = decLen;
                        getval.ACCEPT_DESC_IND = rowDatad[i].ACCEPT_DESC_IND == null ? 0 : rowDatad[i].ACCEPT_DESC_IND;
                        getval.REORDERQTY = (parseFloat(rowDatad[i].REORDERQTY) / convF);
                        getval.FINALQTY = '0';
                        getval.REORDER_LEVEL = rowDatad[i].REORDER_LEVEL;
                        getval.MAXSTKQTY = (parseFloat(rowDatad[i].MAXSTKQTY) / convF);
                        getval.ACCEPT_IND = 0;
                        getval.UOM_NAME = rowDatad[i].UOM_NAME;

                        var totMrQty = (getval.PRODRATE) * (getval.FINALQTY);
                        getval.AMOUNT = parseFloat(totMrQty).toFixed($("#RATE_DECIM_LEN").val());

                        var valFloat = '';
                        for (j = 0; j < decLen; j++) {
                            valFloat += '0';
                        }
                        $$("PRreorderGrid").getColumnConfig("REORDERQTY").numberFormat = '1.' + valFloat;
                        $$("PRreorderGrid").getColumnConfig("FINALQTY").numberFormat = '1.' + valFloat;
                        $$("PRreorderGrid").getColumnConfig("STKQTY").numberFormat = '1.' + valFloat;
                        $$("PRreorderGrid").getColumnConfig("MAXSTKQTY").numberFormat = '1.' + valFloat;

                        var ratedec = $("#RATE_DECIM_LEN").val();
                        var valFloat1 = '';
                        for (k = 0; k < ratedec; k++) {
                            valFloat1 += '0';
                        }
                        $$("PRreorderGrid").getColumnConfig("PRODRATE").numberFormat = '1.' + valFloat1;
                        $$("PRreorderGrid").getColumnConfig("AMOUNT").numberFormat = '1.' + valFloat1;
                        $$("PRreorderGrid").getColumnConfig("AVGRATE").numberFormat = '1.' + valFloat1;
                        $$("PRreorderGrid").refreshColumns();
                        arrayset.push(getval);
                    }
                    $$("PRreorderGrid").clearAll();
                    $$("PRreorderGrid").parse(arrayset);
                    $$("PRreorderGrid").refresh();
                }
            }
        },
    });
}
function FnddlCostcenter1() {
    
    $("#hdnShowCC").val("0");
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlCostCenterLoad";
    reqobj["deptInd"] = $("#vUserDeptInd").val();
    reqobj["Mode_type"] = $("#Mode_type").val();
    reqobj["GSInd"] = $$("BasisDDL").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("CostCenterDDL1").define("options", rowDatad);
                $$("CostCenterDDL1").refresh();
            }
        },
    });
}
function FnddlMRTemplate() {
    
  
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "FnddlMRTemplate";
    reqobj["store"] = $$("ddlStore").getValue();
    reqobj["ccApplInd"] = $("#ccApplInd").val() == "" ? "0" : $("#ccApplInd").val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            $$("TemplateNameDDL").define("options", rowDatad);
            $$("TemplateNameDDL").refresh();
        },
    });
}
function FnProdCategoryLoad() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "FnProdCategoryLoad";
    reqobj["Mode_type"] = $("#Mode_type").val();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            $$("RequestGrid").getColumnConfig("PRODID").suggest = rowDatad;
            $$("RequestGrid").refreshColumns();
        },
    });
}
function ListProductIdLoad(ProdIdFilter) {
    var rowDatap = [];
    if ($("#INDENT_CC_APPL_IND").val() == 2 || ($("#DP_IND").val() == 2 && $("#vReqClass").val() == "N")) {
        if ($$("CostCenterDDL").getValue() == "") {
            return false;
        }
    }
    if ($$("RequestCategoryDDL").getValue() == "") {
        return false;
    }
    var reqobj = {};
    reqobj["REQTYPE"] = "ListProductIdLoad";
    reqobj["vCstItmRes"] = $("#vCstItmRes").val();
    reqobj["VProdAppInd"] = $("#VProdAppInd").val();
    reqobj["vStrInd"] = $("#vStrInd").val();
    reqobj["A1IND"] = $("#B1_IND").val();
    reqobj["cmnCostId"] = $$("CostCenterDDL").getValue();
    reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();
    reqobj["ReqCatDDL"] = $$("RequestCategoryDDL").getValue();
    reqobj["INDENT_CC_APPL_IND"] = $("#INDENT_CC_APPL_IND").val();
    reqobj["DP_IND"] = $("#DP_IND").val();
    reqobj["PROD_GROUP_APPL_IND"] = $("#PROD_GROUP_APPL_IND").val();
    reqobj["vReqClass"] = $("#vReqClass").val();
    if (ProdIdFilter != '' && ProdIdFilter != undefined) {
        reqobj["ProdIdFilter"] = ProdIdFilter;
    }
    else {
        reqobj["ProdIdFilter"] = '';
    }
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            if (d != "") {
                rowDatap = JSON.parse(d);
                //$$("RequestGrid").getColumnConfig("PRODID").suggest = rowDatap;
                //$$("RequestGrid").refreshColumns();
            }
            

        },
    });
    return rowDatap;
    
}
function ListProductNameLoad(ProdNmFilter) {
    var rowDatap = [];
    if ($("#INDENT_CC_APPL_IND").val() == 2 || ($("#DP_IND").val() == 2 && $("#vReqClass").val() == "N")) {
        if ($$("CostCenterDDL").getValue() == "") {
            return false;
        }
    }
    if ($$("RequestCategoryDDL").getValue() == "") {
        return false;
    }
    var reqobj = {};
    reqobj["REQTYPE"] = "ListProductNameLoad";
    reqobj["vCstItmRes"] = $("#vCstItmRes").val();
    reqobj["VProdAppInd"] = $("#VProdAppInd").val();
    reqobj["vStrInd"] = $("#vStrInd").val();
    reqobj["A1IND"] = $("#B1_IND").val();
    reqobj["cmnCostId"] = $$("CostCenterDDL").getValue();
    reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();
    reqobj["ReqCatDDL"] = $$("RequestCategoryDDL").getValue();
    reqobj["INDENT_CC_APPL_IND"] = $("#INDENT_CC_APPL_IND").val();
    reqobj["DP_IND"] = $("#DP_IND").val();
    reqobj["PROD_GROUP_APPL_IND"] = $("#PROD_GROUP_APPL_IND").val();
    reqobj["vReqClass"] = $("#vReqClass").val();
    if (ProdNmFilter != '' && ProdNmFilter != undefined) {
        reqobj["ProdNmFilter"] = ProdNmFilter;
    }
    else {
        reqobj["ProdNmFilter"] = '';
    }
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            if (d != "") {
                rowDatap = JSON.parse(d);
                //$$("RequestGrid").getColumnConfig("PRODNM").suggest = rowDatap;
                //$$("RequestGrid").refreshColumns();
            }
            

        },
    });
    return rowDatap;
    
}
function OpenMRTLoad() {
    var rowDatap = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "OpenMRTLoad";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["ddlStore"] = $$("ddlStore").getValue();
    reqobj["Tmplt_No"] = $$("TemplateNameDDL").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            if (d != "") {
                rowDatap = JSON.parse(d);
                if (rowDatap.MRTDt.length > 0) {
                    $$("Narration").setValue(rowDatap.MRTDt[0].NARRATION);
                    
                }
                if (rowDatap.PRODdt.length > 0) {
                    var SetVal = [];
                    $$("CostCenterDDL").setValue($.trim(rowDatap.PRODdt[0].COST_ID));
                    for (i = 0; i < rowDatap.PRODdt.length; i++) {
                        var getval = {};
                        var prodId = rowDatap.PRODdt[i].PRODID;
                        var prodNm = rowDatap.PRODdt[i].PRODNM;
                        var popUom = rowDatap.PRODdt[i].UOM;
                        var toUom = rowDatap.PRODdt[i].TOUOM;
                        var convF = rowDatap.PRODdt[i].CONV_FACT_BASE;
                        var decLen = '';
                        var reqobj = {};
                        reqobj["REQTYPE"] = "UOMChangeLoadFN";
                        reqobj["prodId"] = prodId;
                        reqobj["hdnUOM"] = popUom;
                        reqobj["ToUOM"] = toUom;
                        reqobj["Mode_type"] = $("#Mode_type").val();
                        var dataparam = JSON.stringify(reqobj);
                        $.ajax({
                            async: false,
                            url: "/PurchaseCtrl/MPAPI_CALL",
                            type: 'POST',
                            data: "request=" + dataparam,
                            success: function (d) {
                                if (d != "") {
                                    data = JSON.parse(d);
                                    convF = data.ConvFact;
                                    decLen = data.declen;
                                   
                                }
                            },
                        });
                        var ProdMRQty = rowDatap.PRODdt[i].MR_QTY;
                        getval.PRODID = prodId;
                        getval.PRODNM = prodNm;
                        getval.TOUOM = toUom;
                        getval.ConvFact = parseFloat(convF).toFixed(decLen);;
                        getval.ProdUOMHd = popUom;
                        getval.ProdUOM = popUom;
                        getval.ProdMRQty = parseFloat(ProdMRQty).toFixed(decLen);
                        getval.declen = decLen;
                        SetVal.push(getval);
                    }
                    $$("RequestGrid").clearAll();
                    $$("RequestGrid").parse(SetVal);
                }
            }


        },
    });

} 
function SavePRTFN() {
    var rowDatap = [];
    $$("RequestGrid").editStop();
    $$("RequestGrid").editCancel();
    var Shortclose = $$("Shortclose").getValue();
    if (Shortclose == 1) {
        var FullData = $$("RequestGrid").serialize();
        var len = FullData.length;
        if (len == 0) {
            alert('Details is empty');
            return false;
        }
        for (i = 0; i < len; i++) {
            var itemId = $.trim(FullData[i].PRODID);
            var mrQty = $.trim(FullData[i].ProdMRQty);

            if (itemId == "") {
                alert("Prod Id is Empty");
                $$("RequestGrid").select(FullData[i].id, "PRODID", false);
                webix.UIManager.setFocus($$("RequestGrid"));
                $$("RequestGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
                $$("RequestGrid").editCancel();
                return false;
            }
            if ($.trim(FullData[i].ProdUOM) == "") {
                alert("UOM is Empty");
                $$("RequestGrid").select(FullData[i].id, "ProdUOM", false);
                webix.UIManager.setFocus($$("RequestGrid"));
                $$("RequestGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
                $$("RequestGrid").editCancel();
                return false;
            }
            if (mrQty == "" || parseFloat(mrQty) <= 0) {
                alert("Qty should be valid");
                $$("RequestGrid").select(FullData[i].id, "ProdMRQty", false);
                webix.UIManager.setFocus($$("RequestGrid"));
                $$("RequestGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
                return false;
            }

        }
        FullData = JSON.stringify(FullData);
        var reqobj = {};
        reqobj["REQTYPE"] = "SaveShortCloseFN";
        reqobj["ddlProperty"] = $$("ddlProperty").getValue();
        reqobj["UnitDDL"] = $$("UnitDDL").getValue();
        reqobj["FullData"] = FullData;
        var dataparam = JSON.stringify(reqobj);
        $.ajax({
            async: false,
            url: "/PurchaseCtrl/MPAPI_CALL",
            type: 'POST',
            data: "request=" + dataparam,
            success: function (d) {
                
                if (d != "") {
                    rowDatap = JSON.parse(d);
                    if (rowDatap.OUTPUT == "SUCCESS") {
                        alert("ShortClose Successfully!...  ");
                        fnRefresh();
                    }
                    else {
                        alert(rowDatap.OUTPUT);
                    }
                }
            },
        });
    }
    else if ($$("CancelReq").getValue() == "1") {
        var FullData = $$("RequestGrid").serialize();
        var len = FullData.length;
        if (len == 0) {
            alert('Details is empty');
            return false;
        }
        for (i = 0; i < len; i++) {
            var itemId = $.trim(FullData[i].PRODID);
            var mrQty = $.trim(FullData[i].ProdMRQty);

            if (itemId == "") {
                alert("Prod Id is Empty");
                $$("RequestGrid").select(FullData[i].id, "PRODID", false);
                webix.UIManager.setFocus($$("RequestGrid"));
                $$("RequestGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
                $$("RequestGrid").editCancel();
                return false;
            }
            if ($.trim(FullData[i].ProdUOM) == "") {
                alert("UOM is Empty");
                $$("RequestGrid").select(FullData[i].id, "ProdUOM", false);
                webix.UIManager.setFocus($$("RequestGrid"));
                $$("RequestGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
                $$("RequestGrid").editCancel();
                return false;
            }
            if (mrQty == "" || parseFloat(mrQty) <= 0) {
                alert("Qty should be valid");
                $$("RequestGrid").select(FullData[i].id, "ProdMRQty", false);
                webix.UIManager.setFocus($$("RequestGrid"));
                $$("RequestGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
                return false;
            }

        }
        FullData = JSON.stringify(FullData);
        var reqobj = {};
        reqobj["REQTYPE"] = "SavePRCancelFN";
        reqobj["ddlProperty"] = $$("ddlProperty").getValue();
        reqobj["UnitDDL"] = $$("UnitDDL").getValue();
        reqobj["FullData"] = FullData;
        var dataparam = JSON.stringify(reqobj);
        $.ajax({
            async: false,
            url: "/PurchaseCtrl/MPAPI_CALL",
            type: 'POST',
            data: "request=" + dataparam,
            success: function (d) {
                
                if (d != "") {
                    rowDatap = JSON.parse(d);
                    if (rowDatap.OUTPUT == "SUCCESS") {
                        alert("Cancel Successfully!...  ");
                        fnRefresh();
                    }
                    else {
                        alert(rowDatap.OUTPUT);
                    }
                }
            },
        });
    }
    else {
        var FullData = $$("RequestGrid").serialize();
        var len = FullData.length;
        if (len == 0) {
            alert('Details is empty');
            return false;
        }
        for (i = 0; i < len; i++) {
            var itemId = $.trim(FullData[i].PRODID);
            var mrQty = $.trim(FullData[i].ProdMRQty);

            if (itemId == "") {
                alert("Prod Id is Empty");
                $$("RequestGrid").select(FullData[i].id, "PRODID", false);
                webix.UIManager.setFocus($$("RequestGrid"));
                $$("RequestGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
                $$("RequestGrid").editCancel();
                return false;
            }
            if ($.trim(FullData[i].ProdUOM) == "") {
                alert("UOM is Empty");
                $$("RequestGrid").select(FullData[i].id, "ProdUOM", false);
                webix.UIManager.setFocus($$("RequestGrid"));
                $$("RequestGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
                $$("RequestGrid").editCancel();
                return false;
            }
            if (mrQty == "" || parseFloat(mrQty) <= 0) {
                alert("Qty should be valid");
                $$("RequestGrid").select(FullData[i].id, "ProdMRQty", false);
                webix.UIManager.setFocus($$("RequestGrid"));
                $$("RequestGrid").editCell(FullData[i].id, "ProdMRQty", false, true);
                return false;
            }

        }
        FullData = JSON.stringify(FullData);

        var RequestName = $$("RequestName").getValue();
        if (RequestName == "") {
            alert('Request Name should be selected');
            return false;
        }

        var reqobj = {};
        reqobj["REQTYPE"] = "SavePRTFN";
        reqobj["ddlProperty"] = $$("ddlProperty").getValue();
        reqobj["UnitDDL"] = $$("UnitDDL").getValue();
        reqobj["DISP_SR_NO"] = $("#DISP_SR_NO").val();
        reqobj["SR_NO"] = $("#SR_NO").val();
        reqobj["RequestNo"] = $$("RequestNo").getValue();
        reqobj["RequestName"] = $$("RequestName").getValue();
        reqobj["Date"] = $$("Date").getValue();
        reqobj["NeedDate"] = $$("NeedDate").getValue();
        reqobj["NarrationTxt"] = $$("NarrationTxt").getValue();
        reqobj["SupNarrationTxt"] = $$("SupNarrationTxt").getValue();
        reqobj["POTypeDDL"] = $$("POTypeDDL").getValue();
        reqobj["RequestCategoryDDL"] = $$("RequestCategoryDDL").getValue();
        reqobj["CostCenter"] = $$("CostCenterDDL").getValue();
        reqobj["StatusDDL"] = $$("StatusDDL").getValue();
        reqobj["Mode_type"] = $("#Mode_type").val();
        reqobj["vReqClass"] = $("#vReqClass").val();
        reqobj["INDENT_CC_APPL_IND"] = $("#INDENT_CC_APPL_IND").val();
        reqobj["DP_IND"] = $("#DP_IND").val();
        reqobj["GSInd"] = $$("BasisDDL").getValue();
        reqobj["PRValue"] = $$("PRValue").getValue();
        reqobj["Draft"] = $$("draft").getValue();
        reqobj["INDENT_TRN_UID"] = $("#INDENT_TRN_UID").val();
        reqobj["LOC_ID"] = $("#LOC_ID").val();
        reqobj["DEF_DT_FORMAT"] = $("#DEF_DT_FORMAT").val();
        reqobj["FullData"] = FullData;
        var dataparam = JSON.stringify(reqobj);
        $.ajax({
            async: false,
            url: "/PurchaseCtrl/MPAPI_CALL",
            type: 'POST',
            data: "request=" + dataparam,
            success: function (d) {
                
                if (d != "") {
                    rowDatap = JSON.parse(d);
                    if (rowDatap.OUTPUT == "SUCCESS") {
                        alert("Saved Successfully!...  Request NO:" + rowDatap.DISP_SR_NO);
                        fnRefresh();
                    }
                    else {
                        alert(rowDatap.OUTPUT);
                    }
                }
            },
        });
    }

}
function fnNew() {
    fnRefresh();
    fnEnable();
    $("#NEW").prop('disabled', false);
    $("#OPEN").prop('disabled', true);
    $("#VIEW").prop('disabled', true);
    $("#DELETE").prop('disabled', true);
    $("#REFRESH").prop('disabled', false);
    $("#SAVE").prop('disabled', false);
    $("#Mode_type").val("NEW");
    $$("RequestNo").disable();
   // SRNOLoadFn();
    DDlPOTypeLoad();
    DDlReqCatLoad();
    var datefm = new Date();
    var dateto = addDaysToDate(datefm, 1);
    $$("Date").setValue(datefm);
    $$("NeedDate").setValue(dateto);
    $("#Cancelmp").hide();
    $("#Shortclose").hide();
}
function fnOpen() {
    fnRefresh();
    fnEnable();   
    $("#NEW").prop('disabled', true);
    $("#OPEN").prop('disabled', false);
    $("#VIEW").prop('disabled', true);
    $("#DELETE").prop('disabled', true);
    $("#REFRESH").prop('disabled', false);
    $("#SAVE").prop('disabled', false);
    $("#Mode_type").val("OPEN");
    $$("RequestNo").enable();
    DDlPOTypeLoad();
    DDlReqCatLoad();
    if ($("#FnType").val() == 'ShortClose') {
        $("#Shortclose").show();
    }
    else {
        $("#Shortclose").hide();
    }
    if ($("#FnType").val() == 'Cancel') {
        $("#Cancelmp").show();
    }
    else {
        $("#Cancelmp").hide();
    }
    
}
function fnView() {
    fnRefresh();
    fnEnable();
    $$("RequestNo").disable();
    $("#NEW").prop('disabled', true);
    $("#OPEN").prop('disabled', true);
    $("#VIEW").prop('disabled', false);
    $("#DELETE").prop('disabled', false);
    $("#REFRESH").prop('disabled', false);
    $("#SAVE").prop('disabled', true);
    $("#Mode_type").val("VIEW");
    DDlPOTypeLoad();
    DDlReqCatLoad();
    $$("RequestNo").enable();
    $("#Cancelmp").hide();
    $("#Shortclose").hide();
   
}
function fnDelete() {
    if ($$("TemplateNameDDL").getValue() != "") {
        $$("RequestGrid").editStop();
        $$("RequestGrid").editCancel();
        webix.confirm({
            title: "Confirmation !",
            ok: "Yes", cancel: "No",
            text: "Are you sure to Delete this Template !"
        })
      .then(function () {
          var reqobj = {};
          reqobj["REQTYPE"] = "DeleteMRTFN";
          reqobj["ddlProperty"] = $$("ddlProperty").getValue();
          reqobj["ddlStore"] = $$("ddlStore").getValue();
          reqobj["TemplateNameDDL"] = $$("TemplateNameDDL").getValue();
          reqobj["Narration"] = $$("Narration").getValue();
          var dataparam = JSON.stringify(reqobj);
          $.ajax({
              async: false,
              url: "/PurchaseCtrl/MPAPI_CALL",
              type: 'POST',
              data: "request=" + dataparam,
              success: function (d) {
                  
                  if (d != "") {
                      rowDatap = JSON.parse(d);
                      if (rowDatap.OUTPUT == "SUCCESS") {
                          alert("Template Deleted!...");
                          fnRefresh();
                      }
                      else {
                          alert(rowDatap.OUTPUT);
                      }
                  }
              },
          });
      })
      .fail(function () {

      });
    }
}
function fnRefresh() {
    fnDisable();
    $$("CostCenterDDL").setValue('');
    $$("RequestNo").setValue('');
    $$("RequestName").setValue('');
    $$("Date").setValue('');
    $$("NeedDate").setValue('');
    $$("NarrationTxt").setValue('');
    $$("POTypeDDL").setValue('');
    $$("SupNarrationTxt").setValue('');
    $$("RequestCategoryDDL").setValue('');
    $$("StatusDDL").setValue('');
    $$("PRValue").setValue('');
    $$('ColList').select('');
    $$("RequestGrid").editCancel();
    $$("RequestGrid").editStop();
    $$("RequestGrid").clearAll();
  
    $("#NEW").prop('disabled', false);
    $("#OPEN").prop('disabled', false);
    $("#VIEW").prop('disabled', false);
    $("#DELETE").prop('disabled', true);
    $("#REFRESH").prop('disabled', false);
    $("#SAVE").prop('disabled', false);
    $("#Mode_type").val("");
    $$("RequestNo").disable();
    $('#ProdIdVal').text('');
    $('#ProdNameVal').text('');
    $('#ProdUOMVal').text('');
    $$("Shortclose").setValue(0);
    $$("CancelReq").setValue(0);
    $$("draft").setValue(0);
    $("#Cancelmp").hide();
    $("#Shortclose").hide();
}
function FnddlGroup() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlGroupLoad";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["ddlStore"] = $$("CostCenterDDL").getValue();
    reqobj["prodGrApplInd"] = $("#PROD_GROUP_APPL_IND").val() == "" ? "0" : $("#PROD_GROUP_APPL_IND").val();
    reqobj["PrdGrpUsrRst"] = $("#vCstItmRes").val() == "" ? "0" : $("#vCstItmRes").val();

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            $$("ddlGroup").define("options", rowDatad);
            $$("ddlGroup").refresh();
        },
    });
}
function FnProductSearchLoad() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "FnProductSearchLoad";
    reqobj["ddlGroup"] = $$("ddlGroup").getValue();
    reqobj["ddlSubGroup"] = $$("ddlSubGroup").getValue();
    reqobj["vCstItmRes"] = $("#vCstItmRes").val();
    reqobj["VProdAppInd"] = $("#VProdAppInd").val();
    reqobj["vStrInd"] = $("#vStrInd").val();
    reqobj["A1IND"] = $("#B1_IND").val();
    reqobj["cmnCostId"] = $$("CostCenterDDL").getValue();
    reqobj["PO_TY_ID"] = $$("POTypeDDL").getValue();
    reqobj["ReqCatDDL"] = $$("RequestCategoryDDL").getValue();
    reqobj["INDENT_CC_APPL_IND"] = $("#INDENT_CC_APPL_IND").val();
    reqobj["DP_IND"] = $("#DP_IND").val();
    reqobj["PROD_GROUP_APPL_IND"] = $("#PROD_GROUP_APPL_IND").val();
    reqobj["vReqClass"] = $("#vReqClass").val();

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            $$("ProdSearchGrid").clearAll();
            $$("ProdSearchGrid").parse(rowDatad);
            $$("ProdSearchGrid").refresh();
        },
    });
}
function FnPrSearchLoad() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "FnPrSearchLoad";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["UnitDDL"] = $$("UnitDDL").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            $$("PRSearchGrid").clearAll();
            $$("PRSearchGrid").parse(rowDatad);
            $$("PRSearchGrid").refresh();
        },
    });
}
function FnPrOpenLoad(INDENT_NO,INDENT_TRN_UID) {
    
    $("#INDENT_TRN_UID").val(INDENT_TRN_UID)
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "FnPrOpenLoad";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["UnitDDL"] = $$("UnitDDL").getValue();
    reqobj["INDENT_NO"] = INDENT_NO;
    reqobj["INDENT_TRN_UID"] = INDENT_TRN_UID;
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            if (rowDatad.IndentDt.length > 0) {
                if (rowDatad.IndentDt[0].COST_ID != "") {
                    $$("CostCenterDDL").setValue($.trim(rowDatad.IndentDt[0].COST_ID));
                }
               
                $$("RequestNo").setValue(rowDatad.IndentDt[0].DISP_NO);
                $$("RequestName").setValue(rowDatad.IndentDt[0].INDENT_NM);
                $$("Date").setValue(rowDatad.IndentDt[0].DATE);
                $$("NeedDate").setValue(rowDatad.IndentDt[0].NEEDDATE);
                $$("NarrationTxt").setValue(rowDatad.IndentDt[0].NARRATION);
                $$("POTypeDDL").setValue(rowDatad.IndentDt[0].PO_TY_ID);
                $$("SupNarrationTxt").setValue(rowDatad.IndentDt[0].PO_NARR);
                $$("RequestCategoryDDL").setValue(rowDatad.IndentDt[0].PR_CAT_ID);
                $$("StatusDDL").setValue('');
                $("#SR_NO").val(rowDatad.IndentDt[0].INDENT_NO);
                $("#DISP_SR_NO").val(rowDatad.IndentDt[0].DISP_NO);
                var STATUS_INDval = rowDatad.IndentDt[0].STATUS_IND == null ? 0 : rowDatad.IndentDt[0].STATUS_IND;
                if (STATUS_INDval == 2) {
                    $$("StatusDDL").setValue('Approved');
                    $$("draft").hide();
                    $$("draft").setValue(0);
                }
                else if(STATUS_INDval == 1) {
                    $$("StatusDDL").setValue('UnApproved');
                    $$("draft").hide();
                    $$("draft").setValue(0);
                }
                else if (STATUS_INDval == 0) {
                    $$("StatusDDL").setValue('UnApproved');
                    $$("draft").show();
                    $$("draft").setValue(1);
                }
                $$("PRValue").setValue(parseFloat(rowDatad.IndentDt[0].INDENT_VAL).toFixed(2));
                $('#DivProdValue').text(parseFloat(rowDatad.IndentDt[0].INDENT_VAL).toFixed(2));
            }
            if (rowDatad.IndentProdDt.length > 0) {
                var arrayset = [];
                for(i=0;i<rowDatad.IndentProdDt.length;i++){
                    var getval = {};
                    var prodId = rowDatad.IndentProdDt[i].PROD_ID;
                    var prodNm = rowDatad.IndentProdDt[i].S_ITEM_NM;
                    var popUom = $.trim(rowDatad.IndentProdDt[i].UOM_ID);
                    var toUom = rowDatad.IndentProdDt[i].UOM_ID_BASE;
                    var convF = rowDatad.IndentProdDt[i].UOM_CONV_FACTOR_BASE;
                    var decLen = rowDatad.IndentProdDt[i].UOM_DECLEN == null ? 2 : rowDatad.IndentProdDt[i].UOM_DECLEN;
                    
                    getval.ITEMCAT = rowDatad.IndentProdDt[i].INP_ITEM_CAT == null ? 1 : rowDatad.IndentProdDt[i].INP_ITEM_CAT;
                    getval.K_INDENT_PROD_UID = rowDatad.IndentProdDt[i].K_INDENT_PROD_UID == null ? "" : rowDatad.IndentProdDt[i].K_INDENT_PROD_UID;
                    getval.PRODID = prodId;
                    getval.PRODNM = prodNm;
                    getval.TOUOM = toUom;
                    getval.SNRO = i + 1;
                    getval.CHECKIND = 0;
                    getval.DETAILS = rowDatad.IndentProdDt[i].PROD_DETAILS;
                    var prodRte = (parseFloat(rowDatad.IndentProdDt[i].PO_R) / convF);
                    getval.ProdRate = rowDatad.IndentProdDt[i].PO_R.toFixed($("#RATE_DECIM_LEN").val());
                    getval.AvgRate = parseFloat(prodRte).toFixed($("#RATE_DECIM_LEN").val());
                    getval.ConvFact = convF;
                    getval.ProdUOMHd = popUom;
                    getval.ProdUOM = popUom;
                    getval.PROD_GR_ID = rowDatad.IndentProdDt[i].PROD_GR_ID;
                    getval.INDENT_TRN_UID = rowDatad.IndentProdDt[i].INDENT_TRN_UID;
                    getval.INDENT_PROD_UID = rowDatad.IndentProdDt[i].INDENT_PROD_UID;
                    getval.ProdMRQty = rowDatad.IndentProdDt[i].TRN_QTY;
                    if (getval.ProdMRQty != "" && getval.ProdMRQty != undefined) {
                        getval.ProdMRQty = parseFloat(getval.ProdMRQty).toFixed(decLen);
                    }
                    else {
                        getval.ProdMRQty = "";
                    }
                    getval.Change_Ind = 0;
                    getval.declen = decLen;
                    getval.ITEM_NARRATION = rowDatad.IndentProdDt[i].ITEM_NARRATION == null ? "" : rowDatad.IndentProdDt[i].ITEM_NARRATION;
                    getval.PO_REM = rowDatad.IndentProdDt[i].PO_REM == null ? "" : rowDatad.IndentProdDt[i].PO_REM;
                    getval.STATUS_IND = rowDatad.IndentProdDt[i].STATUS_IND == null ? 1 : rowDatad.IndentProdDt[i].STATUS_IND;
                    getval.Modetype = "OPEN";
                    getval.ModeDelete = "0";
                    getval.PROD_SNO = rowDatad.IndentProdDt[i].PROD_SNO;
                    getval.LINETYPE = rowDatad.IndentProdDt[i].VALUE_BASIS;
                    getval.TOT_PO_UNIT = rowDatad.IndentProdDt[i].TOT_PO_UNIT == null ? 0 : rowDatad.IndentProdDt[i].TOT_PO_UNIT;
                    getval.TOT_RECPT_UNIT = rowDatad.IndentProdDt[i].TOT_RECPT_UNIT == null ? 0 : rowDatad.IndentProdDt[i].TOT_RECPT_UNIT;
                    var totMrQty = (getval.ProdRate) * (getval.ProdMRQty);
                    getval.Amount = parseFloat(totMrQty).toFixed($("#RATE_DECIM_LEN").val());
                   
                    var valFloat = '';
                    for (j = 0; j < getval.declen; j++) {
                        valFloat += '0';
                    }
                    if (getval.STATUS_IND == 5 || getval.STATUS_IND == 6 || getval.STATUS_IND == 8) {
                        getval.$css = "GrayClr";
                    }
                    if (getval.K_INDENT_PROD_UID != "") {
                        getval.$css = "GrayClr";
                    }
                    $$("RequestGrid").getColumnConfig("ProdMRQty").numberFormat = '1.' + valFloat;
                    var ratedec = $("#RATE_DECIM_LEN").val();
                    var valFloat1 = '';
                    for (k = 0; k < ratedec; k++) {
                        valFloat1 += '0';
                    }
                    $$("RequestGrid").getColumnConfig("ProdRate").numberFormat = '1.' + valFloat1;
                    $$("RequestGrid").getColumnConfig("Amount").numberFormat = '1.' + valFloat1;
                    $$("RequestGrid").getColumnConfig("AvgRate").numberFormat = '1.' + valFloat1;
                    $$("RequestGrid").refreshColumns();
                    arrayset.push(getval);
                }
                $$("RequestGrid").clearAll();
                $$("RequestGrid").parse(arrayset);
                $$("RequestGrid").refresh();
            }
        },
    });
}
function FnddlSubGroup() {
    
    var rowDatad = [];
    var reqobj = {};
    reqobj["REQTYPE"] = "DDlSubGroupLoad";
    reqobj["ddlProperty"] = $$("ddlProperty").getValue();
    reqobj["ddlGroup"] = $$("ddlGroup").getValue();
    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "/PurchaseCtrl/MPAPI_CALL",
        type: 'POST',
        data: "request=" + dataparam,
        success: function (d) {
            
            rowDatad = JSON.parse(d);
            $$("ddlSubGroup").define("options", rowDatad);
            $$("ddlSubGroup").refresh();
        },
    });
}
function fnEnable() {
    $$("CostCenterDDL").enable();
    $$("RequestNo").enable();
    $$("RequestName").enable();
    $$("Date").enable();
    $$("RequestGrid").enable();
    $$("NeedDate").enable();
    $$("NarrationTxt").enable();
    $$("POTypeDDL").enable();
    $$("SupNarrationTxt").enable();
    $$("RequestCategoryDDL").enable();
    $$("StatusDDL").disable();
    $$("PRValue").disable();
    $$("AdvancedOpt").enable();
    $$("draft").enable();
}
function fnresize() {
    $$("StatusDDL").resize();
    $$("UnitDDL").resize();
    $$("ddlProperty").resize();
    $$("RequestGrid").resize();    
}
function fnDisable() {
    $$("CostCenterDDL").disable();
    $$("RequestNo").disable();
    $$("RequestName").disable();
    $$("Date").disable();
    $$("RequestGrid").disable();
    $$("NeedDate").disable();
    $$("NarrationTxt").disable();
    $$("POTypeDDL").disable();
    $$("SupNarrationTxt").disable();
    $$("RequestCategoryDDL").disable();
    $$("StatusDDL").disable();
    $$("PRValue").disable();
    $$("AdvancedOpt").disable();
    $$("draft").disable();
    
}

webix.event(window, "resize", function () {gridResize("1");})

function gridResize(choice) {
    
    var vheight = window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight;
    var offsetTop = $$("DivReqTab1").getNode().offsetTop;
    $$("RequestGrid").define("height", ((vheight - offsetTop - 100)));
    $$("RequestGrid").adjust();


}
