var Mon_data = [
    { sales: "20", sales1: "25", month: "Jan" },
    { sales: "30", sales1: "35", month: "Feb" },
    { sales: "40", sales1: "45", month: "Mar" },
    { sales: "50", sales1: "55", month: "Apr" },
    { sales: "60", sales1: "65", month: "May" },
]

function FoFlashDetPopUp(Mon_data1) {
    
    var rowDatad = [];
    rowDatad = JSON.parse(Mon_data1);
    debugger;
    webix.ui({
      
            
            view: "chart",
            id: "PieNight",
            container: "StatisticPieChart",
            type: "pie",
            data: rowDatad,
            value: "#VALUES#", //"#Nights#",
            height: 450,
            radius: 170,
            width: 550,
            pieInnerText: "#VALUES#",
            //label: "#SNM#",
            color: "#COLOR#",       
            borderless: true,
            css:{ "background-color":"#f3f3f3"},
            //border:0,
            //legend: {
            //    template: "#NAME#",
            //    valign: "bottom",
            //    align: "center",
            //    width: 150,
            //    layout: "x"
            //},
            
       
    });
}