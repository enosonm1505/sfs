$(function () {
    $("div[id^='prompt']").on("keyblur", "thead > tr.k-filter-row > th input.k-input", function (e) {        
        var _grid = e.delegateTarget.id;
        var _Filter_Fields = e.currentTarget.attributes[2].value;
        var _Filter_Val = e.currentTarget.value
        var _gridData = $("#" + _grid).data("kendoGrid");
        $filter = KendoRowFilter(_grid, _Filter_Fields, _Filter_Val);
        _gridData.dataSource.filter($filter);
    });

    var KendoRowFilter = function (grid, _Fields, _Value) {
        $filter = new Array();
        $filter.push({ field: _Fields, operator: "startswith", value: _Value });
        return $filter;
    }


    $(".filtertxt").on('keyup', function (e) {      
        var grid = this.dataset.parentgrid;
        var filterid = this.dataset.filter;
        var filterval = (this.value);
        var $grid = $("#" + grid).data("kendoGrid");
        $grid.dataSource.filter(KendoRowFilter(grid, filterid, filterval));
        $grid.dataSource.pageSize(1000);
        $grid.refresh();
    });


});
