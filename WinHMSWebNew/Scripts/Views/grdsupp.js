var GridPopsupp = function () {
    debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    ID: { type: "string" },
                    NM: { type: "string" },
                }
            }
        },
    });

    $("#CmnSuppGrid").kendoGrid({

        dataSource: datsource,

        filterable:

        {

            mode: "row"

        },
        selectable: "row",
        //scrollable: true,
        //// navigatable: true,
        // change: Footerrowcalc,
        columns: [
            //{ field: "QUOTE_ID", title: 'QUOTE_ID', width: 20, attributes: { style: "text-align:left" } },
            {
                field: "ID", title: 'Party Id', width: 30, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            {
                field: "NM", title: 'Party Name', width: 70, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            //{ field: "PARTY_ID", title: 'PARTY_ID', width: 70, attributes: { style: "text-align:left" } },
            
        ],
        //header
        editable: false,
    });
}

var GridPopBatch = function () {
    debugger;
    var datsource = new kendo.data.DataSource({
        data: [],
        batch: true,
        schema: {
            model: {
                fields: {
                    BATCH_ID: { type: "string" },
                    BATCH_REF: { type: "string" },
                    BATCH_DESC: { type: "string" },
                }
            }
        },
    });

    $("#CmnSuppGrid").kendoGrid({

        dataSource: datsource,

        filterable:

        {

            mode: "row"

        },
        selectable: "row",
        //scrollable: true,
        //// navigatable: true,
        // change: Footerrowcalc,
        columns: [
            //{ field: "QUOTE_ID", title: 'QUOTE_ID', width: 20, attributes: { style: "text-align:left" } },
            {
                field: "BATCH_ID", title: 'Batch No', width: 30, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            {
                field: "BATCH_REF", title: 'Ref No', width: 30, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            {
                field: "BATCH_DESC", title: 'Descrption', width: 70, attributes: { style: "text-align:left" },
                filterable: {

                    cell: {

                        showOperators: false, operator: "contains",

                        suggestionOperator: "contains"

                    }

                }
            },
            //{ field: "PARTY_ID", title: 'PARTY_ID', width: 70, attributes: { style: "text-align:left" } },

        ],
        //header
        editable: false,
    });
}