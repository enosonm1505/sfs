function LoadDropDown(controller, action) {
    var ddlVal = [];
    $.ajax({
        type: "POST",
        url: "/" + controller + "/" + action,
        cache: false,
        async: false,
        charset: 'utf-8',
        data: "text=" + "",
        success: function (data) {
            if (data != null) {
                $.each(data, function (key, value) {
                    var set = { value: value.Text, id: value.Value };
                    ddlVal.push(set);
                });
            }
        }
    });
    return ddlVal;
}

function PropertyNM_New() {
    read_ORG_Data = "true";
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/PropertyNM_New",
        data: {},
        async: false,
        success: function (d) {
            if (d != "") {
                rowDatad = JSON.parse(d);
            }
        }
    });
    return rowDatad;
}


function PageLoadFn() {
    debugger;
    var wid_25 = ((screen.width - 100) * 0.25);
    var wid_10 = ((screen.width - 100) * 0.1);
    var searchicon = "<span class='fa fa-search ' ></span>";
    var Filtericon = "<span class='fa fa-filter'></span>";
    
    var ddlProperty = PropertyNM_New();
    var DefaultPropertyList = LoadDropDown("SalesAndMarket", "DefaultProperty");
    webix.ui({
        view: 'combo',
        id: 'ddlProperty',
        container: 'ddlProperty',
        value: ddlProperty[0].id,
        options: ddlProperty,
        on: {
            onChange: function () {
                alert();
            }
        }

    });
    var mode = $("#hdnMode").val();
    webix.ui({
        view: 'form',
        id: 'DivForm',
        container: 'DivForm',
        minWidth: 900,
        minHeight: 520,
        elements: [
            {
                rows: [
                    
                     {
                         width: 500,
                         cols: [
                         {
                             view: 'combo',
                             label: 'Property',
                             name: 'Property',
                             id: 'Property',
                             labelWidth: 150,
                             inputWidth: 350,
                             minWidth: 350,
                             options: DefaultPropertyList,
                             on: {
                                 onChange: function (newval, oldval) {
                                     if (newval != "") {
                                         var rowData = RoomTypeLoad("");
                                         $$("ddlRmty").define("options", rowData);
                                     }
                                     $$("ddlRmty").setValue("");
                                     $$("txtRmTyDet").setValue("");
                                     $$("txtRmTyId").setValue("");
                                     $$("txtRmtyName").setValue("");
                                     $$("ChkActive").setValue("1")
                                 }
                             }
                         },
                          {
                              view: "checkbox",
                              id: "ChkActive",
                              value:1,
                              labelRight: "Active",
                              labelWidth: 100,
                              minWidth: 170,
                              align: "left",
                          },
    ]
                     },
                    {
                        hidden: true,
                        id :"rowCombo",
                        cols: [
                               {
                                   
                                   view: 'combo',
                                   name: 'ddlRmty',
                                   label : 'Room Type Id',
                                   id: 'ddlRmty',
                                   labelWidth: 150,
                                   inputWidth: 350,
                                   minWidth: 350,
                                   on: {
                                       onChange: function (newval, oldval) {
                                           if (newval != "") {
                                               var rowData = RoomTypeLoad("1");
                                               if (rowData[0].NAR1 != "" && rowData[0].NAR1 != null)
                                                   $$("txtRmTyDet").setValue(rowData[0].NAR1);
                                               else
                                                   $$("txtRmTyDet").setValue("");

                                               $$("txtRmTyId").setValue("");

                                               if (rowData[0].RM_TY_NM != "" && rowData[0].RM_TY_NM != null)
                                                   $$("txtRmtyName").setValue(rowData[0].RM_TY_NM);
                                               else
                                                   $$("txtRmtyName").setValue("");
                                                   
                                               if (rowData[0].A_IND == "1")
                                                   $$("ChkActive").setValue("1")
                                               else
                                                   $$("ChkActive").setValue("0")

                                           }
                                           else {
                                               $$("ChkActive").setValue("0");
                                               $$("txtRmTyId").setValue("");
                                               $$("txtRmTyDet").setValue("");
                                               $$("txtRmtyName").setValue("");
                                           }
                                       }
                                   }
                                   
                                   
                               },

                             
                               
                             
                             
                        ]
                    },
                     {
                         
                         view: 'text',
                         label: 'Room Type Id',
                         id: 'txtRmTyId',
                         labelWidth: 150,
                         inputWidth: 350,
                         minWidth: 350,
                         attributes: { maxlength: 8 },
                         
                     },
                    {
                        view: 'text',
                        label: 'Room Type Name',
                        id: 'txtRmtyName',
                        labelWidth: 150,
                        inputWidth: 350,
                        minWidth: 350,
                        attributes: { maxlength:25 },
                    },

                     {
                         view: 'textarea',
                         label: 'Room Type Details',
                         id: 'txtRmTyDet',
                         labelWidth: 150,
                         minWidth: 300,
                         height: 400,
                         width:800,
                        
                     },
               
                ]
            }
            ]
    });
}

function fnOpen()
{
    $$("rowCombo").show();
    $$("txtRmTyId").hide();
    $$("ddlRmty").setValue("");
    $("#btnAdd").attr("disabled", true);
}

function fnNew()
{
    $$("rowCombo").hide();
    $$("txtRmTyId").show();
    $("#btnModify").attr("disabled", true);

}

function fnsave()
{
    var dataparam = {};
    
    if ($$("ddlProperty").getValue() == "") {
        alert("Property Cannot be Empty");
        return false;
    }
    else if ($("#hdnMode").val() == "New") {
        if ($$("txtRmTyId").getValue() == "") {
            alert("Room Type Cannot be Empty");
            return false;
        }
    }
    else if ($("#hdnMode").val() == "Open") {
        if ($$("ddlRmty").getValue() == "") {
            alert("Room Type Cannot be Empty");
            return false;;
        }
    }
    else if ($$("txtRmtyName").getValue() == "") {
        alert("Room Type Cannot be Empty");
        return false;
    }

    dataparam["COMPID"] = $$("ddlProperty").getValue();
    dataparam["REQTYPE"] = "GET_ROOMTYPESAVE";
    dataparam["PROPERTY_ID"] = $$("Property").getValue();
    dataparam["NAR1"] = $$("txtRmTyDet").getValue();
    if ($("#hdnMode").val() == "New")
        dataparam["RM_TY_ID"] = $$("txtRmTyId").getValue();
    else if ($("#hdnMode").val() == "Open")
        dataparam["RM_TY_ID"] = $$("ddlRmty").getValue();
    dataparam["RM_TY_NM"] = $$("txtRmtyName").getValue();
    dataparam["MODE"] = $("#hdnMode").val();
    dataparam["A_IND"] = $$("ChkActive").getValue();
    var paramValue = JSON.stringify(dataparam);

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/SalesAndMarket/RoomType_Save",
        async: false,
        data: "request=" + encodeURIComponent(paramValue),
        success: function (data) {
            debugger;
            var alertVal = data.v.ErrorMeg;
            if (alertVal == "Success") {
                if ($("#hdnMode").val() == "New")
                    alert("Saved Successfully");
                else if ($("#hdnMode").val() == "Open")
                    alert("Updated Successfully");

                fnRefresh();
            }
            else {
                alert(alertVal);
            }
        }
    });
            
}

function RoomTypeLoad(choice)
{
    if ($$("ddlProperty").getValue() != "") {
        read_ORG_Data = "true";
        var dataparam = {};
        dataparam["COMPID"] = $$("ddlProperty").getValue();
        dataparam["REQTYPE"] = "ROOMTYPELOAD";
        dataparam["PROPERTY_ID"] = $$("Property").getValue();
        dataparam["Choice"] = choice;
        if ($("#hdnMode").val() == "Open")
            dataparam["RM_TY_ID"] = $$("ddlRmty").getValue();
        var paramValue = JSON.stringify(dataparam);
        $.ajax({
            type: "POST",
            url: "/SalesAndMarket/RoomTypeLoad",
            data: "Request=" + encodeURIComponent(paramValue),
            async: false,
            success: function (d) {
                if (d != "") {
                    rowDatad = JSON.parse(d);
                }
            }
        });
        return rowDatad;
    }
    else {
        alert("Property Cannot be Empty");
    }
}


function fnRefresh()
{
    $("#btnAdd").attr("disabled", false)
    $("#btnModify").attr("disabled", false)
    $$("rowCombo").hide();
    $$("txtRmTyId").show();
    $$("txtRmTyDet").setValue("");
    $$("txtRmTyId").setValue("");
    $$("txtRmtyName").setValue("");
    $$("ChkActive").setValue("1");
    $$("ddlRmty").setValue("");
    $$("Property").setValue("");
   
   
    
}





