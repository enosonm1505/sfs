var app = angular.module('TestApp', ['webix']);
app.controller("TestController", function ($scope) {
    $scope.HeaderBtn = {
        cols: [
            {
                view: "button",
                id: "SearchBtn",
                type: "icon",
                icon: "wxi-plus",
                width: 40,
                label: "xdsg",
                css:"page-title-btn",
            },
             {
                 view: "button",
                 width: 40,
                 type: "icon",
                 icon: "wxi-pencil",
                 label: "xdsg",
                 css: "page-title-btn",
             },
              {
                  view: "button",
                  width: 40,
                  type: "icon",
                  icon: "wxi-eye",
                  css: "page-title-btn",
              },
               {
                   view: "button",
                   width: 40,
                   type: "icon",
                   icon: "wxi-trash",
                   css: "page-title-btn",
               },
                {
                    view: "button",
                    width: 40,
                    type: "icon",
                    icon: "wxi-file",
                    css: "page-title-btn",
                },
                 {
                     view: "button",
                     width: 40,
                     type: "icon",
                     icon: "wxi-sync",
                     css: "page-title-btn",
                 },
        ]

    };

    $scope.Prp_name = {
        view: "combo",
        id: "Prp_name",
        placeholder: "Select Property",
        // label: "Consddtry",
        options: [{ value: "Propert Name1", id: "ds" }, { value: "Propert Name1", id: "dssd" }],
        minWidth: "100",
    };

    $scope.acc_dt = {
        view: "text",
        id: "acc_dt",
        label: "Account Dt",
        labelWidth: 80,
        lableAlign: "left",        
    };

    $scope.Resv_No = {
        view: "text",
        id: "Resv_No",
        label: "Reservatoin No",
        labelWidth:100,
        lableAlign: "right",

    };


    $scope.Resv_id = {
        view: "text",
        id: "Resv_id",
        label: "Rsr-id",
        labelWidth: 100,
        lableAlign: "right",
    };


    $scope.CRS_no = {
        view: "text",
        id: "CRS_no",
        label: "CRS No",
        lableAlign: "right",
        labelWidth: 100,
    };


    $scope.add_btn = {
        view: "button",
         label: "Add",
        width: 70,
        type:"icon",
        icon: "wxi-plus",
        on: {
            onItemClick: function () {
                webix.message({ type: "success", text: "dfhdgsdjwrftgjmrfgtjyrfgtjyrftgjr" });
            }
        }
    };

    $scope.GridTest = {
        view: "datatable",
        id: "GridTest",
        select: "row",
        data: [],
        height: 85,
        columns: [
               { header: "xxxxxxxx", id: "MRNo", width: 100, css: { 'text-align': 'center ! important' } },
               { header: "xxxxxxxx", id: "MRdate", width: 100, css: { 'text-align': 'center ! important' } },
               { header: "xxxxxxxxxxxxxx", id: "Narration", width: 100, css: { 'text-align': 'left ! important' } },
                { header: "xxxxxxxxxxxxxx", id: "Narration1", width: 100, css: { 'text-align': 'left ! important' } },
                { header: "xxxxxxxxxxxxxx", id: "Narration2", width: 100, css: { 'text-align': 'left ! important' } },
                { header: "xxxxxxxxxxxxxx", id: "Narration3", width: 100, css: { 'text-align': 'left ! important' } },
                { header: "xxxxxxxxxxxxxx", id: "Narration4", width: 100, css: { 'text-align': 'left ! important' } },

        ],
    };
    $scope.GridTest = {
        view: "datatable",
        id: "GridTest",
        select: "row",
        data: [],
        height: 85,
        columns: [
               { header: "xxxxxxxx", id: "MRNo", width: 100, css: { 'text-align': 'center ! important' } },
               { header: "xxxxxxxx", id: "MRdate", width: 100, css: { 'text-align': 'center ! important' } },
               { header: "xxxxxxxxxxxxxx", id: "Narration", width: 100, css: { 'text-align': 'left ! important' } },
                { header: "xxxxxxxxxxxxxx", id: "Narration1", width: 100, css: { 'text-align': 'left ! important' } },
                { header: "xxxxxxxxxxxxxx", id: "Narration2", width: 100, css: { 'text-align': 'left ! important' } },
                { header: "xxxxxxxxxxxxxx", id: "Narration3", width: 100, css: { 'text-align': 'left ! important' } },
                { header: "xxxxxxxxxxxxxx", id: "Narration4", width: 100, css: { 'text-align': 'left ! important' } },

        ],
    };

    $scope.Traffic_Disc = {
        view: "text",
        id: "Traffic_Disc",
        label: "Traffic Disc%",
        
    };

    $scope.Disc_amnt = {
        view: "text",
        id: "Disc_amnt",
        label: "Traffic Disc%",
    };

    $scope.Net_Traffic = {
        view: "text",
        id: "Traffic_Disc",
        label: "Traffic Disc%",
    };



    $scope.Planaa = {
        view: "text",
        id: "Planaa",
        label: "Plan Amt Adult",
    };

    $scope.child = {
        view: "text",
        id: "child",
        label: "Child",
    };

    $scope.pln_disk = {
        view: "text",
        id: "pln_disk",
        label: "Plan Disc%",
    };

    $scope.pln_dsc = {
        view: "text",
        id: "pln_dsc",
        label: "Plan Disc Amt",
    };

    $scope.curr = {
        view: "combo",
        id: "curr",
        label: "Currency",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };






    $scope.G_S = {
        view: "combo",
        id: "G_S",
        label: "Guest Status",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }],
        minWidth: "10",
    };


    $scope.G_T = {
        view: "combo",
        id: "G_T",
        label: "Guest Type",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


    $scope.Seg = {
        view: "combo",
        id: "Seg",
        label: "Segment",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


      $scope.P_M = {
        view: "combo",
        id: "P_M",
        label: "Pay Mode",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


    $scope.Channel = {
        view: "combo",
        id: "Channel",
        label: "Channel",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


    $scope.curr = {
        view: "combo",
        id: "curr",
        label: "Currency",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


    $scope.S_P = {
        view: "combo",
        id: "S_P",
        label: "Sales Person",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


    $scope.R_M = {
        view: "combo",
        id: "R_M",
        label: "Reserve Mode",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


    $scope.B_I = {
        view: "combo",
        id: "B_I",
        label: "Billing Inst",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


    $scope.B_S = {
        view: "combo",
        id: "B_S",
        label: "Business Source",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


    $scope.G_E = {
        view: "combo",
        id: "G_E",
        label: "Guest Event",
        placeholder: "Select ",
        icon: "wxi-search",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


    $scope.Res_in = {
        view: "combo",
        id: "Res_in",
        label: "Reservation Ins",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


    $scope.GSI = {
        view: "combo",
        id: "GSI",
        label: "Guest Special Ins",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


    $scope.Check_in = {
        view: "combo",
        id: "Check_in",
        label: "Check In",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };

        $scope.Check_out = {
        view: "combo",
        id: "Check_out",
        label: "Check Out",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


    
        $scope.Upgrade = {
        view: "combo",
        id: "Upgrade",
        label: "Upgrade",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


        $scope.GC = {
        view: "combo",
        id: "GC",
        label: "Currency",
        placeholder: "Guest Catg",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


        $scope.VN = {
        view: "combo",
        id: "VN",
        label: "Voucher No",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


        $scope.visit1 = {
        view: "combo",
        id: "visit1",
        label: "Visit",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };



        $scope.Skp_trrif = {
            view: "switch",
            id: "Skp_trrif",
            label: "Skip Tarrif",        
            left: 480,
            top: 350,
            width: 200,
            value: 1,
       
    };


        $scope.Ref_no = {
        view: "combo",
        id: "Ref_no",
        label: "Ref No",
        placeholder: "Select Property",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }]
    };


        $scope.visit = {
             
    view: "textarea",
        id: "visit",
        label: "POS Ins",
        placeholder: "POS Ins",
        icon: "wxi-search",
        options: [{ value: "$ Dollor", id: "ds" }, { value: "Euro", id: "dssd" }, { value: "Euro", id: "dssd" }],
            height:40,
    };
        
        $scope.Traffic_btn1 = {
            view: "button",
            width: 30,
            type: "icon",
            icon: "wxi-plus",
            on: {
                onItemClick: function () {
                    webix.message({ type: "success", text: "dfhdgsdjwrftgjmrfgtjyrfgtjyrftgjr" });
                }
            }
        };
        $scope.Traffic_btn2 = {
            view: "button",
            width: 30,
            type: "icon",
            icon: "wxi-plus",
            on: {
                onItemClick: function () {
                    webix.message({ type: "success", text: "dfhdgsdjwrftgjmrfgtjyrfgtjyrftgjr" });
                }
            }
        };
        $scope.Traffic_btn3 = {
            view: "button",
            width: 30,
            type: "icon",
            icon: "wxi-plus",
            on: {
                onItemClick: function () {
                    webix.message({ type: "success", text: "dfhdgsdjwrftgjmrfgtjyrfgtjyrftgjr" });
                }
            }
        };
        $scope.PopUp1Btn = {
           view: "button",
           value:"Popup",
            width: 100,
            on: {
                onItemClick: function () {
                     $$("Popup1").show();
                 }
                 }
              };

        $scope.Popup1 = {
            view: "window",
            close: true,
            modal: true,
            id: "Popup1",
            head: "Popup ",
            position: "center",
            width: 1000,
            height: 400,
            body: {
                view: "form",
                elements: [
                {}]
            }
        };


//    $scope.HeaderLbl = {
//        view: "label",
//        label: "Page Name",
//    };
    
//$scope.Form02 = {
//view: "text",
//id: "text1",
//label: "Last Name",
//};
   
  
//    $scope.Form03 = {
//        view: "combo",
//        id: "combo2",
//        label: "Consddtry",
//        options: [{ value: "sdgdsghfh", id: "ds" }, { value: "sdgdsgghfh", id: "dssd" }]
//    };
   
//    $scope.Form04 = {
//        view: "combo",
//        id: "combo1",
//        label: "Consddtry",
//        options: [{ value: "sdgdsghfh", id: "ds" }, { value: "sdgdsgghfh", id: "dssd" }]
//        };
//    $scope.Form3 = {
//                   view: "radio",
//                   id: "MRDateRadio",
//                   value: 1,
//                   options: [
//                      { value: "sdgdsfhdfhdfh", id: 1 },
//                      { value: "dfhdfghdfghdf", id: 2 }
//                   ],
//                   height: 70,
//                   vertical: true,
                  
//               };
//    $scope.Form4 = {
//        view: "checkbox",
//        id: "ChKUpdateStk1",
//        labelRight: "dgydfhjufgj",
//        labelWidth: 0,
//    };
//    $scope.Form5 = {
//        view: "checkbox",
//        id: "ChKUpdateStk",
//        labelRight: "dgydfhjufgj",
//        labelWidth: 0,
//    };
//    $scope.Form6 = {
//        view: "counter",
//        min: "1",
//        max: "10",
//        value: "1",
//        label: "hydfjsfgj",
//        id: "ProdIdCont",
//        width: 270,
//    };
//    $scope.Form7 = {
//          view: "button",
//          width: 40,
//          value:"Popup",
//          width: 100,
//          on: {
//              onItemClick: function () {
//                  $$("Popup1").show();
//              }
//          }
//    };
//    $scope.Form12 = {
//        view: "button",
//        width: 40,
//        value: "Confirm",
//        width: 100,
//        on: {
//            onItemClick: function () {
//                return webix.confirm({
//                    ok: "Yes",
//                    cancel: "No",
//                    width: 400,
//                    title: "dshzdfjfgjfgjkg",
//                    text: "sdgzdfhxsgfjgfjdfgjgfjdgfj\ndgyzasdfhgf",
//                    modal:true
//                });
//            }
//        }
//    };
//    $scope.Form11 = {
//        view: "button",
//        width: 40,
//        value: "Alert",
//        width: 100,
//        on: {
//            onItemClick: function () {
//                return webix.alert({
//                    ok: "Ok",
//                    width: 400,
//                    text: "dsgdfghdfjfgjdxgfjsfgjdghkghg\n dfhsfgjgtfj",
//                    title: "dsbhdcbhcdvbcv",
//                    modal:true
//                });
//            }
//        }
//    };
//    $scope.Form8 = {
//        view: "window",
//        close: true,
//      //  modal:true,
//        id:"Popup1",
//        head: "Popup ",
//        position: "center",
//        width: 1000,
//        height: 400,
//        body: {
//            view: "form",
//            elements: [
//            {}]
//        }
//    };
});
