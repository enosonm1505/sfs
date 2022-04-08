
var app = angular.module('BQTApp', ['webix']);

app.controller("BQMasterController", function ($scope) {

    $("#LoadDIv").hide();
    fnLoadBNControl();

    $scope.frmMstOpenItem = {

        id: "frmMstOpenItem",
        view: 'form',
        minWidth: 1340,
        maxWidth: 1340,
        height: 450,
        elements: [
            {
                rows: [
                      {
                          cols: [
                              {
                                  view: "richselect",
                                  id: "ddlBGroup",
                                  label: "Banquet Group",
                                  labelAlign: "right",
                                  labelWidth: 135,
                                  inputWidth: 350,
                                  width: 450,
                                  on: {
                                      onChange: function (newval, oldval) {

                                          var Type = "";
                                          var Dataset = fnLoadDropval("N");

                                          var Opendata = fnLoadOpenData();

                                          var TblGrp = Dataset.TBLPRDGRP;
                                          if (TblGrp.length > 0) {

                                              var Filter4 = Opendata.filter(function (Opendata) {
                                                  return $.trim(Opendata.BN_GR_ID) == $.trim(newval);
                                              });

                                              var ProdId = "";

                                              if (Filter4.length > 0) {
                                                  ProdId = Filter4[0].P_GR_ID;
                                              }

                                              var Filter5 = TblGrp.filter(function (TblGrp) {
                                                  return $.trim(TblGrp.id) == $.trim(ProdId);
                                              });

                                              if (Filter5.length > 0)
                                              {
                                                  $$("txtGroup").setValue(Filter5[0].value);
                                                  $("#hdnGroupid").val(Filter5[0].id);
                                              }
                                          }

                                          var TblGrp = Dataset.TBLGROUP;
                                          if (TblGrp.length > 0) {

                                              var Filter1 = TblGrp.filter(function (TblGrp) {
                                                  return TblGrp.id == $.trim(newval);
                                              });

                                              if (Filter1.length > 0) {
                                                  Type = Filter1[0]["ITEM_TYPE"];
                                                  $("#hdnRevId").val($.trim(Filter1[0]["REVENUE_ID"]));
                                              }
                                          }

                                          var TblRev = Dataset.TBLREVENUE;
                                          if (TblRev.length > 0) {

                                              var Filter1 = TblRev.filter(function (TblRev) {
                                                  return TblRev.REVENUE_ID == $.trim($("#hdnRevId").val());
                                              });

                                              if (Filter1.length > 0) {
                                                  $$("txtItem").setValue($.trim(Filter1[0]["REVENUE_NM"]));
                                              }
                                          }

                                          if ($.trim(Type) == "B") {
                                              $$("txtItemTy").setValue("Banquet Item Master");
                                              $$("txtRevenue").show();
                                              $$("txtGroup").hide();
                                              $$("ddlSubGrp").hide();
                                          }
                                          else if ($.trim(Type) == "P") {
                                              $$("txtItemTy").setValue("POS - Outlet Item Master");
                                              $$("txtRevenue").hide();
                                              $$("txtGroup").show();
                                              $$("ddlSubGrp").show();
                                          }
                                          else {
                                              $$("txtItemTy").setValue("");
                                          }

                                          var Filter7 = Opendata.filter(function (Opendata) {
                                              return $.trim(Opendata.BN_GR_ID) == $.trim(newval);
                                          });

                                          $$("ddlItem").define("options", Filter7);
                                          $$("ddlItem").refresh();

                                      }
                                  }
                              },
                              {
                                  view: "text",
                                  id: "txtItemTy",
                                  label: "Item Type",
                                  labelAlign: "right",
                                  labelWidth: 135,
                                  inputWidth: 320,
                                  width: 320,
                                  readonly: true,
                              },
                          ]
                      },
                      {
                          view: "text",
                          id: "txtItem",
                          label: "Item",
                          labelAlign: "right",
                          labelWidth: 135,
                          inputWidth: 450,
                          width: 450,
                          attributes: { maxlength: 30 },
                      },
                      {
                          view: "richselect",
                          id: "ddlItem",
                          label: "Item",
                          labelAlign: "right",
                          labelWidth: 135,
                          inputWidth: 450,
                          width: 450,
                          hidden: true,
                          on: {
                              onChange: function (newval, oldval) {

                                  fnLoadDropval("O");

                                  var Opendata = fnLoadOpenData();

                                  var Filter4 = Opendata.filter(function (Opendata) {
                                      return $.trim(Opendata.BN_GR_ID) == $.trim($$("ddlBGroup").getValue()) && $.trim(Opendata.IT_NM) == $.trim(newval);
                                  });

                                  if (Filter4.length > 0) {
                                      debugger;
                                      //$$("txtItemTy").setValue(I_TYPE);
                                      //$$("txtItem").setValue("");

                                      $$("txtSRate").setValue(Filter4[0].S_RATE);
                                      $$("ddlItemMgrp").setValue($.trim(Filter4[0].G_I));
                                      $$("txtSCost").setValue(Filter4[0].S_COST_PER);

                                      $$("ddlTaxStruct").setValue($.trim(Filter4[0].T_STRUCT_ID));

                                      var Dataset = fnLoadDropval("N");
                                      var TblGrp = Dataset.TBLPRDGRP;

                                      if (TblGrp.length > 0) {

                                          var Filter5 = TblGrp.filter(function (TblGrp) {
                                              return $.trim(TblGrp.id) == $.trim(Filter4[0].P_GR_ID);
                                          });

                                          if (Filter5.length > 0) {
                                              $$("txtGroup").setValue(Filter5[0].value);
                                              $("#hdnGroupid").val(Filter5[0].id);
                                          }
                                      }

                                      $$("txtRevenue").setValue(Filter4[0].R_ID);
                                      $$("ddlSubGrp").setValue(Filter4[0].P_SUB_G_ID);
                                  }
                              }
                          }
                      },
                      {
                          cols: [
                              {
                                  view: "text",
                                  id: "txtSRate",
                                  label: "Sale Rate",
                                  labelAlign: "right",
                                  labelWidth: 135,
                                  inputWidth: 250,
                                  width: 250,
                                  on: {
                                      onKeyPress: function (code, evt) {
                                          var specialKeys = new Array();
                                          specialKeys.push(8); //Backspace
                                          var keyCode = evt.which ? evt.which : evt.keyCode
                                          var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || specialKeys.indexOf(keyCode) != -1);
                                          return ret;
                                      }
                                  }
                              },
                              {
                                  view: "richselect",
                                  id: "ddlItemMgrp",
                                  label: "Item Menu Group",
                                  labelAlign: "right",
                                  labelWidth: 135,
                                  inputWidth: 400,
                                  width: 400,
                                  hidden: ($("#hdnMenuGrpAppl").val() == "1" ? false : true),
                                  on: {
                                      onChange: function (newval, oldval) {
                                      }
                                  }
                              },
                          ]
                      },
                      {
                          view: "text",
                          id: "txtSCost",
                          label: "Sale Cost %",
                          labelAlign: "right",
                          labelWidth: 135,
                          inputWidth: 250,
                          width: 250,
                          on: {
                              onKeyPress: function (code, evt) {
                                  var specialKeys = new Array();
                                  specialKeys.push(8); //Backspace
                                  var keyCode = evt.which ? evt.which : evt.keyCode
                                  var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || specialKeys.indexOf(keyCode) != -1);
                                  return ret;
                              }
                          }
                      },
                      {
                          view: "richselect",
                          id: "ddlTaxStruct",
                          label: "Tax Structure",
                          labelAlign: "right",
                          labelWidth: 135,
                          inputWidth: 550,
                          width: 550,
                          on: {
                              onChange: function (newval, oldval) {
                              }
                          }
                      },
                      {
                           view: "text",
                           id: "txtRevenue",
                           label: "Revenue",
                           labelAlign: "right",
                           labelWidth: 135,
                           inputWidth: 350,
                           width: 350,
                           hidden:true,
                      },
                      {
                           view: "text",
                           id: "txtGroup",
                           label: "Group",
                           labelAlign: "right",
                           labelWidth: 135,
                           inputWidth: 350,
                           width: 350,
                      },
                      {
                          view: "richselect",
                          id: "ddlSubGrp",
                          label: "Sub Group",
                          labelAlign: "right",
                          labelWidth: 135,
                          inputWidth: 370,
                          width: 370,
                          on: {
                              onChange: function (newval, oldval) {
                              }
                          }
                      },
                ]
            }
        ]
    }
});

function fnLoadBNControl() {
    var dataparam = {};
    var rowData = "";
    dataparam["REQTYPE"] = "GET_BNCONTROL";
    dataparam["PROGNAME"] = "GET_COMFUNCCLASS";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQTrans/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
                $("#hdnMenuGrpAppl").val(rowData[0].S2_IND);
            }
        },
    });
}

function fnDisable() {
    $$("ddlBGroup").disable();
    $$("txtItemTy").disable();
    $$("txtItem").disable();
    $$("ddlItem").disable();

    $$("txtSRate").disable();
    $$("ddlItemMgrp").disable();
    $$("txtSCost").disable();

    $$("ddlTaxStruct").disable();
    $$("txtGroup").disable();
    $$("ddlSubGrp").disable();
    $$("txtRevenue").disable();
    
}

function fnEnable() {
    $$("ddlBGroup").enable();
    $$("txtItemTy").enable();
    $$("txtItem").enable();
    $$("ddlItem").enable();
    $$("txtSRate").enable();
    $$("ddlItemMgrp").enable();
    $$("txtSCost").enable();

    $$("ddlTaxStruct").enable();
    $$("txtGroup").enable();
    $$("ddlSubGrp").enable();
    $$("txtRevenue").enable();
}

function fnLoadDropval(Mode) {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_DROPVALUE";
    dataparam["PROGNAME"] = "GET_MST_OPENITEM";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);

                if ($.trim(Mode) == "N") {
                    $$("ddlBGroup").define("options", rowData.TBLGROUP);
                    $$("ddlBGroup").refresh();
                }

                $$("ddlItemMgrp").define("options", rowData.TBLMENUGRP);
                $$("ddlItemMgrp").refresh();

                $$("ddlTaxStruct").define("options", rowData.TBLTAX);
                $$("ddlTaxStruct").refresh();

                $$("ddlSubGrp").define("options", rowData.TBLSUBGRP);
                $$("ddlSubGrp").refresh();
            }
        }
    });
    return rowData;
}

function fnLoadOpenData() {

    var dataparam = {};
    var rowData = [];
    dataparam["REQTYPE"] = "GET_MST_OPENITEM_OPEN";
    dataparam["PROGNAME"] = "GET_MST_OPENITEM";
    dataparam["COMPID"] = $("#hdnCompId").val();
    var DataVal = JSON.stringify(dataparam);
    $.ajax({
        async: false,
        url: "/BQMaster/COMAPI_CALL",
        type: 'POST',
        data: "request=" + DataVal,
        success: function (d) {
            if (d != "") {
                rowData = JSON.parse(d);
            }
        }
    });

    return rowData;
}

function fnSaveOItemData() {

    if (!fnBQValidate()) {
        $("#LoadDIv").hide();
        return false;
    }

    $("#LoadDIv").show();

    var dataparam = {};
    dataparam["REQTYPE"] = "GET_MST_OPENITEMSAVE";
    dataparam["PROGNAME"] = "GET_MST_OPENITEM";
    dataparam["COMPID"] = $("#hdnCompId").val();
    dataparam["CurMode"] = $("#hdnCurMode").val();

    dataparam["BnGrId"] = $.trim($$("ddlBGroup").getValue());
    dataparam["ItemNm"] = ($("#hdnCurMode").val() == "N" ? $.trim($$("txtItem").getValue()) : $.trim($$("ddlItem").getValue()));
    dataparam["ProdGrId"] = $("#hdnGroupid").val();
    dataparam["SubdGrId"] = $.trim($$("ddlSubGrp").getValue());
    dataparam["Revenue"] = $("#hdnRevId").val();
    dataparam["SaleRate"] = $.trim($$("txtSRate").getValue());
    dataparam["CostPer"] = $.trim($$("txtSCost").getValue());
    dataparam["TStructId"] = $.trim($$("ddlTaxStruct").getValue());
    dataparam["MenuGrId"] = $.trim($$("ddlItemMgrp").getValue());

    var DataVal = JSON.stringify(dataparam);
    DataVal = encodeURIComponent(DataVal);
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        url: "/BQMaster/COMAPI_CALL",
        data: "request=" + DataVal,
        success: function (objRes) {
            if (objRes != "") {
                rowData = JSON.parse(objRes);

                if ($.trim(rowData) == "True") {

                    if ($("#hdnCurMode").val() == "N") {
                        AlertMessage("created Successfully");
                        $("#btnRef").click();
                    }
                    else {
                        AlertMessage("Updated Successfully");
                        $("#btnRef").click();
                    }

                    $("#LoadDIv").hide();
                    return;
                }
                else {
                    AlertMessage("Save Failed");
                    $("#LoadDIv").hide();
                    return;
                }
            }
        },
    });
}

function fnBQValidate() {

    var Dataset = fnLoadOpenData();

    if ($.trim($$("ddlBGroup").getValue()) == "") {
        AlertMessage("Banquet Group cannot be empty !");
        return false;
    }

    if ($("#hdnCurMode").val() == "N") {

        if ($.trim($$("txtItem").getValue()) == "") {
            AlertMessage("Item Name cannot be empty !");
            return false;
        }

        var Filter3 = Dataset.filter(function (Dataset) {
            return $.trim(Dataset.IT_NM) == $.trim($$("txtItem").getValue());
        });

        if (Filter3.length != 0) {
            AlertMessage("Record Already exisit !");
            return false;
        }
    }
    else {

        if ($.trim($$("ddlItem").getValue()) == "") {
            AlertMessage("Item Name cannot be empty !");
            return false;
        }
    }

    if ($.trim($$("txtSRate").getValue()) == "") {
        AlertMessage("Sale Rate cannot be empty !");
        return false;
    }

    if ($("#hdnMenuGrpAppl").val() == "1") {
        if ($.trim($$("ddlItemMgrp").getValue()) == "") {
            AlertMessage("Item Menu Group Cannot be empty !");
            return false;
        }
    }

    if ($.trim($$("txtSCost").getValue()) == "") {
        AlertMessage("Sale Cost cannot be empty !");
        return false;
    }

    if ($.trim($$("ddlTaxStruct").getValue()) == "") {
        AlertMessage("Tax Structure cannot be empty !");
        return false;
    }

    var BQType = "";
    var Filter4 = Dataset.filter(function (Dataset) {
        return $.trim(Dataset.Bn_Gr_Id) == $.trim($$("ddlBGroup").getValue());
    });

    if (Filter4.length > 0)
    {
        BQType = Filter4[0].I_TYPE;
    }
    //----------------------------------------
    if ($.trim($$("txtGroup").getValue()) == "" && $.trim(BQType) == "P") {
        AlertMessage("Group cannot be empty !");
        return false;
    }

    if ($.trim($$("ddlSubGrp").getValue()) == "" && $.trim(BQType) == "P") {
        AlertMessage("Sub Group cannot be empty !");
        return false;
    }

    if ($.trim($$("txtRevenue").getValue()) == "" && $.trim(BQType) == "B") {
        AlertMessage("Revenue cannot be empty !");
        return false;
    }

    return true;
}