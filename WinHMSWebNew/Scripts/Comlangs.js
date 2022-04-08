var GridSearchPay = function () {
    debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    BLACK_LIST_IND: { type: "string" },
                    PARTY_ID: { validation: { required: true }, type: "string" },
                    PARTY_NM: { type: "string" }
                },
            }
        },
    });

    $("#GridCredit").kendoGrid({

        dataSource: datsource,
        filterable:
            {
                mode: "row"
            },
        selectable: "row",
        scrollable: true,
        navigatable: true,
        columns: [
            {
                width: 50,
                field: "PARTY_ID", title: 'PR NO', width: 50, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
            {
                width: 150,
                field: "PARTY_NM", title: 'PR DT', width: 100, attributes: { style: "text-align:left" }, filterable: {
                    cell: {
                        showOperators: false, operator: "contains",
                        suggestionOperator: "contains"
                    }
                }
            },
        ],
        //header
        editable: false,

    });
}