
      
        $(document).ready(function () {

            //// START Transaction Date Load 

            var grid = $("#grid").data("kendoGrid");
            //grid._data[0].attr("readonly", true);     
            
            $.ajax({
                type: "POST",
                url: '<%= Url.Content("~/") %>' + "GLTransaction/Date",                   
                data: "",
                success: function (data) {                       
                    $("#Date").val(data.d);
                }
            });

            //// END Transaction Date Load 


            //// START GRID Values SAVE function 
            $("#save").click(function () {            
                debugger;
                var grid = $("#grid").data('kendoGrid');
                var projectPermissionType = 1;
                var postUrl;
                var paramValue;
                var gridValue = $("#grid").data("kendoGrid").dataSource.data();
                //if (projectPermissionType == 1) {

                //    var gridData = $("#grid").data('kendoGrid').dataSource.data();

                //    // set model data
                //    for (var i = 0; i < gridData.length; i++) {
                //        gridData[i].AC_NM = $("#AC_NM").val();
                //    }
                //    paramValue = JSON.stringify({ GMlist: gridData });
                //}
                $.ajax({
                    type: "POST",
                    url: '<%= Url.Content("~/") %>' + "GLTransaction/Create",
                    cache: false,
                    charset: 'utf-8',
              
                    data: JSON.stringify({ GMlist: gridValue }),
                    success: function (data) {
                        alert(id);

                    }
                });
            });
            //// END GRID Values SAVE function 


            //// START Transaction Type Change Function 
            $("#Trantype").change(function () {
                debugger;
                var grid = $("#grid").data('kendoGrid');
                var id = $("#Trantype").val();               
                $.ajax({
                    type: "POST",
                    url: '<%= Url.Content("~/") %>' + "GLTransaction/TransactionChange",
                    cache: false,
                    charset: 'utf-8',
                    data: "dropid=" + id,
                    success: function (data) {                       
                        $("#DCHidden").val(data.d);
                        $("#grid").data('kendoGrid').cancelChanges();
                    }

                });
            });
            //// END Transaction Type Change Function 
      
            var grid = $("#grid").data("kendoGrid");

            //// START NEW Button Click Function 

            $("#new").click(function () {
                debugger;
                var dropdownval = $("#DCHidden").val();
                // alert(dropval);
               
                var dataSource = grid.dataSource;
                // grid.addRow();               
                var total = grid.dataSource._total;
                if (total != 0) {
                    var no = (total - 1);
                }
                if (total != 0) {
                    var Amount1 = "0";
                    for (item = 0; item < total; item++) {

                        var value = grid.dataSource._data[item].Depit;
                        if (value != null) {
                            Amount1 = Number(Amount1) + Number(value);
                        }
                    }
                    var Amount2 = "0";
                    for (item2 = 0; item2 < total; item2++) {

                        var value2 = grid.dataSource._data[item2].Credit;
                        if (value2 != null) {
                            Amount2 = Number(Amount2) + Number(value2);
                        }
                    }

                    if (Amount1 != null && Amount2 != null) {

                        TotalValue = (Amount1 - Amount2)
                    }
                    //  alert(TotalValue);
                }

                if (grid.dataSource._total == 0 && dropdownval != "") {

                    dataSource.add({ DC: dropdownval,Depit: 0,Credit: 0 });
                }
                else if (grid.dataSource._total == 0 && dropdownval == "") {

                    alert('Please Select Transaction Type!');
                }
                    
                else if (0 >= TotalValue && grid.dataSource._data[no].AC_NM != null && grid.dataSource._data[no].DC != ""  ) {
                    dataSource.add({ DC: "DR", Depit: 0, Credit: 0 });
                }

                else if (0 < TotalValue && grid.dataSource._data[no].AC_NM != null && grid.dataSource._data[no].DC != "" ) {
                    dataSource.add({ DC: "CR", Depit: 0, Credit: 0 });
                }

                else if (grid.dataSource._data[no].DC == "" && grid.dataSource._data[no].AC_NM == null ) {
                    alert('Please Select D/C & Account Name and Enter Depit & Credit value');

                }
                else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM == null ) {
                    alert('Please Select Account Name and Enter Depit & Credit value');

                }
                else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM != null ) {
                    alert('Please Enter Depit or Credit value');
                }
               
                //else if (grid.dataSource._data[no].DC == "DR" && grid.dataSource._data[no].AC_NM != null) {
                //    dataSource.add({ DC: "CR" });                   
                //}
                //else if (grid.dataSource._data[no].DC == "CR" && grid.dataSource._data[no].AC_NM != null) {
                //    dataSource.add({ DC: "DR" });                   
                //}

                //else if (grid.dataSource._data[no].DC == "" && grid.dataSource._data[no].AC_NM == null) {
                //  alert('Please Select D/C & Account Name');
                                     
                //}
                //else if (grid.dataSource._data[no].DC != "" && grid.dataSource._data[no].AC_NM == null) {
                //    var answer = confirm('Please Select Account Name');

                //}
                //else if (grid.dataSource._data[no].DC == "" && grid.dataSource._data[no].AC_NM != null) {
                //    var answer = confirm('Please Select D/C');
                //}

            })
            //// END NEW Button Click Function 

            //// START Cancel Button Click Function 
            $("#cancel").click(function () {
                debugger;
                $("#grid").data('kendoGrid').cancelChanges();
                //grid.select().each(function () {
                //    var dataItem = grid.dataItem($(this));
                //    grid.removeRow($(dataItem)); 
                //    grid.dataSource.remove(dataItem);
                //})
            })
        })
//// END Cancel Button Click Function 

//// START AccountName POPUP & Narration POPUP Click Function 
$('#grid').on("dblclick", "td.k-state-selected", function (e) {
    // debugger;           
    var grdd = document.getElementById("AC_NM");
    var grdd1 = document.getElementById("Narration");          
    var grid = $("#grid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    $("#accidhidden").val(rowIndex);
    if (grdd != null) {
        if (grdd.id == "AC_NM" && grdd != null && grdd1 == null) {
            var window = $("#AccName");
            var kWnd = window.data("kendoWindow");
            kWnd.center().open();
        }
    }
    else if (grdd1 != null)
    {
        if (grdd1.id == "Narration" && grdd1 != null && grdd == null) {
            var no = rowIndex;
            var acid = $("#accvaluehidden").val();
            if ($("#accidhidden").val() == rowIndex) {
                $("#NarrationValue").val(grid._data[no].Narration);                      
            }
            var window = $("#Narrationpop");
            var kWnd = window.data("kendoWindow");
            kWnd.center().open();
        }
    }
});

//// END AccountName POPUP & Narration POPUP Click Function 


//// START POPUP  Value Assign Function 
function getval(e) {
    // debugger;
    var grid = $("#grid").data("kendoGrid");

    var selected = $.map(this.select(), function (item) {
        return $(item).text();
    });

    $.ajax(
        {
            type: "GET",
            url: '<%= Url.Content("~/") %>' + "GLTransaction/GL_AccNameValue",
            data: "id=" + selected,
            success: function (data) {
                $("#accvaluehidden").val(data.d);
            }
        });
    var rowIndex = grid._rowVirtualIndex;
    $("#accidhidden").val(rowIndex);
    var no = rowIndex;
    var acid = $("#accvaluehidden").val();
    if ($("#accidhidden").val() == rowIndex) {
        grid._data[no].AC_NM = selected;
        grid._data[no].AC_CD = acid;
    }
}
//// END POPUP  Value Assign Function 

//// START POPUP  CLOSE

$('#grid2').on("dblclick", "td.k-state-selected", function (e) {
    //  debugger;
    var grid = $("#grid").data("kendoGrid");
    var selected = $("#CommonNarration").val();
    var window = $("#AccName");
    var kWnd = window.data("kendoWindow");
    kWnd.center().close();
    $('#grid').data("kendoGrid").refresh();
});

$(document).ready(function () {
    $("#narration").click(function () {
        debugger;
        var grid = $("#grid").data("kendoGrid");
        var narration = $("#NarrationValue").val();
        $("#narrationhidden").val(narration);
        var rowIndex = grid._rowVirtualIndex;
        $("#accidhidden").val(rowIndex);
        var no = rowIndex;
        var narrvalue = $("#narrationhidden").val();
        if ($("#accidhidden").val() == rowIndex) {
            grid._data[no].Narration = narrvalue;

        }
        var window = $("#Narrationpop");
        var kWnd = window.data("kendoWindow");
        kWnd.center().close();
        $('#grid').data("kendoGrid").refresh();

    })
});

//// END POPUP  CLOSE
     
//// START Depit & Credit Editable False Function 

function edit(e) {
    $(e.container).find('input[name="Narration"]').attr("readonly", true);
    $(e.container).find('input[name="AC_NM"]').attr("readonly", true);
    $(e.container).find('input[name="AC_CD"]').attr("readonly", true);            

    var grid = $("#grid").data("kendoGrid");
    var rowIndex = grid._rowVirtualIndex;
    var no = rowIndex;
    debugger;
    var dataSource = grid.dataSource;
    // grid.addRow();               
          
    if (grid.dataSource._data[no].DC == "CR") {

        $(e.container).find('input[name="Depit"]').attr("readonly", true);
    }
    else if(grid.dataSource._data[no].DC == "DR") {

        $(e.container).find('input[name="Credit"]').attr("readonly", true);
    }
}

//// END Depit & Credit Editable False Function 
         
      



    //register custom validation rules
    (function ($, kendo) {
        $.extend(true, kendo.ui.validator, {
            rules: { // custom rules
                AccountNamevalidation: function (input, params) {
                    //check for the rule attribute 
                    if (input.filter("[data-val-AccountNamevalidation]").length && input.val()) {
                        return /^[A-Z]/.test(input.val());
                    }
                    return true;
                }
            },
            messages: { //custom rules messages
                AccountNamevalidation: function (input) {
                    // return the message text
                    return input.attr("data-val-AccountNamevalidation");
                }
            }
        });
    })(jQuery, kendo);

function error_handler(e) {
    if (e.errors) {
        var message = "Errors:\n";
        $.each(e.errors, function (key, value) {
            if ('errors' in value) {
                $.each(value.errors, function () {
                    message += this + "\n";
                });
            }
        });
        alert(message);
    }
}

