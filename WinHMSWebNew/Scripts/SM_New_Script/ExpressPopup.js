function BookingCreatePopup() {
    //webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    //webix.skin.set('mini');
    var RmTy = GetRoomTyFn();
    var tilteval = TitleGstLoad();
    debugger;
    var dateval = CurrentDateLoad();
    var Assigned_List = LoadDropDown("SalesAndMarket", "AssignedToLoad");
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Booking Creation",
        id: 'BookingCreatePopup',
        modal: true,
        width: 900,
        height:600,
        close: true,
        body: {
            rows: [
               { view: 'form',
                   elements: [
                    
                           {
                               cols: [
                                   {
                                       view: "text",
                                       label: 'Property',
                                       id: 'PropertyBK',
                                       labelWidth: 110,
                                       minWidth: 380,
                                       inputWidth: 400,
                                       value: $$("Property").getText(),
                                       attributes: { maxlength: 50 }
                                   },
                                   {
                                       view: "combo",
                                       label: 'Sales Person',
                                       id: 'SalesPersonBK',
                                       labelWidth: 110,
                                       minWidth: 380,
                                       inputWidth: 400,
                                       options: Assigned_List,
                                       value:$$("Assigned_To").getValue(),
                                       attributes: { maxlength: 50 }
                                   }
                               ]
                           },
                            {
                                cols: [
                                     {
                                         view: "radio",
                                         label: 'Status',
                                         id: 'StatusBK',
                                         name: 'StatusBK',
                                         labelWidth: 110,
                                         minWidth: 450,
                                         inputWidth: 450,
                                         vertical: false,
                                         value: 2,
                                         options: [{ value: "Confirm", id: 1 },
                                                   { value: "Waiting List", id: 2 },
                                                    { value: "Tentative", id: 3 }],
                                         on: {
                                             onChange: function (newval, oldval) {
                                                 if (newval == "3") {
                                                     $$("DueDTBK").show();
                                                 }
                                                 else {
                                                     $$("DueDTBK").hide();
                                                 }
                                             }
                                         }
                                     },
                                      {
                                          view: "text",
                                          label: 'Reserve No',
                                          id: 'ReserveNO',
                                          labelWidth: 90,
                                          minWidth: 200,
                                          inputWidth: 180,
                                          disabled: true,
                                      },
                                       
                                          {
                                              view: "text",
                                              label: 'Room No',
                                              id: 'RoomNO',
                                              labelWidth: 70,
                                              minWidth: 160,
                                              inputWidth: 160,
                                              disabled: true,
                                          },
                                           {
                                               view: 'button',
                                               type: "icon",
                                               icon: "wxi-search",
                                               id: 'RoomNoBK_Btn',
                                               inputWidth: 30,
                                               minWidth: 30,
                                               hidden:true,
                                               on: {
                                                   onItemClick: function () {
                                                       RoomNoLoadfn();
                                                       RoomNoLoadFns();
                                                   }
                                               }
                                           }
                                       
                                     ]
                            },
                           {
                               cols: [
                                     {
                                         view: "combo",
                                         label: 'RoomType',
                                         id: 'RoomTypeBK',
                                         labelWidth: 110,
                                         minWidth: 380,
                                         inputWidth: 400,
                                         options: RmTy,
                                         attributes: { maxlength: 50 },
                                         on: {
                                             onChange: function () {
                                                 $$("CompanyBK").setValue('');
                                                 $$("CompanyidBK").setValue('');
                                                 $$("RateCodeBK").setValue('');
                                                 $$("RateCodeidBK").setValue('');
                                                 $$("PlanBK").setValue('');
                                                 $("#PlanID").val('');
                                             }
                                         }
                                     },
                                     {

                                         view: "datepicker",
                                         label: 'Due Date',
                                         id: 'DueDTBK',
                                         labelWidth: 110,
                                         minWidth: 270,
                                         inputWidth: 250,
                                         value: dateval,
                                         stringResult: true,
                                         format: "%d/%m/%Y",
                                         hidden:true
                                     },
                               ]
                           },
                           {
                               cols: [
                                   {
                                       view: "datepicker",
                                       label: 'Arrival',
                                       id: 'ArrivalBK',
                                       labelWidth: 110,
                                       minWidth: 270,
                                       inputWidth: 250,
                                       value: dateval,
                                       stringResult: true,
                                       format: "%d/%m/%Y",
                                   },
                                    {
                                        view: "text",
                                        label: 'HH:MM',
                                        id: 'HHMMBK1',
                                        labelWidth: 60,
                                        minWidth: 130,
                                        inputWidth: 130,
                                        value: '12:00',
                                        placeholder: "HH:MM",
                                        pattern: { mask: "##:##", allow: /[0-9]/g }
                                    },
                                   {
                                       view: "datepicker",
                                       label: 'Depature',
                                       id: 'DepatureBK',
                                       labelWidth: 110,
                                       minWidth: 270,
                                       inputWidth: 250,
                                       stringResult: true,
                                       format: "%d/%m/%Y",
                                   },
                                    {
                                        view: "text",
                                        label: 'HH:MM',
                                        id: 'HHMMBK2',
                                        labelWidth: 60,
                                        minWidth: 150,
                                        inputWidth: 130,
                                        value: '11:55',
                                        placeholder: "HH:MM",
                                        pattern: { mask: "##:##", allow: /[0-9]/g }
                                    },
                               ]
                           },
                           {
                               cols: [{
                                   view: "text",
                                   label: 'Rooms',
                                   id: 'NoOfRoomsBK',
                                   labelWidth: 110,
                                   minWidth: 250,
                                   inputWidth: 230,
                                   attributes: { maxlength: 50 },
                                   pattern: { mask: '###', allow: /[0-9]/g },
                               },
                                   {
                                       view: "text",
                                       label: 'Adult',
                                       id: 'AdultBK',
                                       labelWidth: 50,
                                       minWidth: 150,
                                       inputWidth: 150,
                                       attributes: { maxlength: 50 },
                                       pattern: { mask: '###', allow: /[0-9]/g },
                                   },
                                   {
                                       view: "text",
                                       label: 'Child',
                                       id: 'ChildBK',
                                       labelWidth: 50,
                                       minWidth: 150,
                                       inputWidth: 150,
                                       attributes: { maxlength: 50 },
                                       pattern: { mask: '###', allow: /[0-9]/g },
                                   }, {}
                               ]
                           },
                            {
                                view: "text",
                                label: 'Mobile',
                                id: 'MobileBK',
                                labelWidth: 110,
                                minWidth: 400,
                                inputWidth: 400,
                                attributes: { maxlength: 50 },
                                pattern: { mask: '#################################', allow: /[0-9]/g },
                            },
                            {
                                view: "text",
                                label: 'EMail',
                                id: 'EMailBK',
                                labelWidth: 110,
                                minWidth: 400,
                                inputWidth: 400,
                                attributes: { maxlength: 50 }
                            },
                            {
                                cols:[
                                        {
                                            view: "text",
                                            label: 'Guest',
                                            id: 'LastNMBK',
                                            labelWidth: 110,
                                            minWidth: 360,
                                            inputWidth: 360,placeholder:"Last Name" ,
                                            attributes: { maxlength: 50 }
                                        },
                                        {
                                            view: "text",
                                            label: '',
                                            id: 'FirstNMBK',
                                            labelWidth: 1,
                                            minWidth: 260,
                                            inputWidth: 260, placeholder: "First Name",
                                            attributes: { maxlength: 50 }
                                        },
                                        {
                                            view: "combo",
                                            label: ' ',
                                            id: 'TitleBK',
                                            labelWidth: 1,
                                            minWidth: 130,
                                            inputWidth: 130,
                                            options: tilteval,
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-search",
                                            id: 'GstBK_Btn',
                                            inputWidth: 30,
                                            minWidth: 30,
                                            on: {
                                                onItemClick: function () {
                                                    GuestLoadfn();
                                                }
                                            }
                                        }
                                ]
                          
                            },
                            {
                                cols: [
                                        {
                                            view: "text",
                                            label: 'Company',
                                            id: 'CompanyBK',
                                            labelWidth: 110,
                                            disabled: true,
                                            minWidth: 400,
                                            inputWidth: 440, 
                                            attributes: { maxlength: 50 }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-search",
                                            name: 'CompanyBK_Btn',
                                            id: 'CompanyBK_Btn',
                                            inputWidth: 30,
                                            minWidth: 30,
                                            on: {
                                                onItemClick: function () {
                                                    $('#FlrTitle').val('');
                                                    $('#FlrLstNm').val('');
                                                    $('#FlrFstNm').val('');
                                                    CompanyLoadfn();
                                                }
                                            }
                                        },
                                        {
                                            view: "text",
                                            label: 'Company',
                                            id: 'CompanyidBK',
                                            labelWidth: 110,
                                            minWidth: 450,
                                            inputWidth: 450,
                                            hidden:true,
                                        }
                                ]

                            },
                            {
                                cols: [
                                        {
                                            view: "text",
                                            label: 'Rate Code',
                                            id: 'RateCodeBK',
                                            labelWidth: 110,
                                            disabled: true,
                                            minWidth: 400,
                                            inputWidth: 440,
                                            attributes: { maxlength: 50 }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-search",
                                            name: 'RateCodeBK_Btn',
                                            id: 'RateCodeBK_Btn',
                                            inputWidth: 30,
                                            minWidth: 30,
                                            on: {
                                                onItemClick: function () {
                                                    RateCodeLoadfn();
                                                }
                                            }
                                        },
                                       {
                                           view: "text",
                                           label: 'Company',
                                           id: 'RateCodeidBK',
                                           labelWidth: 110,
                                           minWidth: 450,
                                           inputWidth: 450,
                                           hidden: true,
                                       }
                                ]

                            },
                             {
                                 cols: [
                                     {
                                         view: "text",
                                         label: 'Tariff',
                                         id: 'TariffBK',
                                         labelWidth: 110,
                                         minWidth: 230,
                                         inputWidth: 210,
                                         attributes: { maxlength: 50 },
                                         disabled:true,
                                     },
                                     {
                                         view: "text",
                                         label: 'Disc %',
                                         id: 'DiscBK',
                                         labelWidth: 70,
                                         minWidth: 180,
                                         inputWidth: 160,
                                         pattern: {mask:'##', allow: /[0-9]/g },
                                         on: {
                                             onKeyPress: function () {
                                                 $$("AmountBK").setValue('');
                                             }
                                         }
                                     },
                                     {
                                         view: "text",
                                         label: 'Amount',
                                         id: 'AmountBK',
                                         labelWidth: 70,
                                         minWidth: 180,
                                         inputWidth: 160,
                                         attributes: { maxlength: 50 },
                                         pattern: { mask: '#####################', allow: /[0-9]/g },
                                         on: {
                                             onKeyPress: function () {
                                                 $$("DiscBK").setValue('');
                                             }
                                         }
                                     },
                                     {
                                         view: "text",
                                         label: 'Plan',
                                         id: 'PlanBK',
                                         labelWidth: 70,
                                         minWidth: 300,
                                         disabled: true,
                                         inputWidth: 280,
                                         attributes: { maxlength: 50 }
                                     },
                                 ]
                             },
                             {
                                 view: "text",
                                 label: 'Guest Request',
                                 id: 'GuestRequestBK',
                                 labelWidth: 110,
                                 minWidth: 600,
                                 inputWidth: 600,
                                 attributes: { maxlength: 50 }
                             },
                            {
                                view: 'form',
                                elements: [
                                    {
                                cols: [
                                    {
                                        view: 'label',
                                        label: ' ',
                                        name: 'label1',
                                        id: 'label1',
                                        labelWidth: 100,
                                    },
                                    {
                                        cols: [
                                            {
                                                view: 'button',
                                                type: "icon",
                                                id: 'BookIndCancel',
                                                hidden:true,
                                                icon: "wxi-close",
                                                label: 'Booking Cancel',
                                                width: 150,
                                                align: "right",
                                                on: {
                                                    onItemClick: function () {
                                                        var datval = PostBookingCreationFn("CANCEL");
                                                        if (datval.Status == "1") {
                                                            var RegNo = datval.RegNo;
                                                            var Tariff = datval.Tariff;
                                                            var ReserveNo = datval.ReserveNo;
                                                            var RowId = $("#SelectRWID").val();
                                                            var GetVal = $$("QuoteGeneration_Grid").getItem(RowId);
                                                            if (datval.DetailsDt.length > 0) {
                                                                GetVal.GUEST1_TITLE_ID = datval.DetailsDt[0].GUEST1_TITLE_ID;
                                                                GetVal.FIRSTNAME = datval.DetailsDt[0].FIRSTNAME;
                                                                GetVal.LASTNAME = datval.DetailsDt[0].LASTNAME;
                                                                GetVal.ARRIVAL_TM = datval.DetailsDt[0].ARRIVAL_TM;
                                                                GetVal.DEPARTURE_TM = datval.DetailsDt[0].DEPARTURE_TM;
                                                                GetVal.INFANT = datval.DetailsDt[0].INFANT;
                                                                GetVal.FO_RS_STATUS = datval.DetailsDt[0].RESERVE_STATUS;
                                                                GetVal.GUEST_ID = datval.DetailsDt[0].GUEST_ID;
                                                                GetVal.CMP_NM = datval.DetailsDt[0].GUEST_PARTY_NM;
                                                                GetVal.CMP_ID = datval.DetailsDt[0].GUEST_PARTY_ID;

                                                            }
                                                            if (datval.AmtDt.length > 0) {
                                                                for (o = 0; o < datval.AmtDt.length; o++) {
                                                                    if (datval.AmtDt[o].TYPE == "O" && datval.AmtDt[o].REV_GR == "1") {
                                                                        GetVal.CHR_AMT = datval.AmtDt[0].AMT;
                                                                    }
                                                                    if (datval.AmtDt[o].TYPE == "O" && datval.AmtDt[o].REV_GR == "2") {
                                                                        GetVal.PLAN_CHR = datval.AmtDt[o].AMT;
                                                                    }
                                                                    if (datval.AmtDt[o].TYPE == "O" && datval.AmtDt[o].REV_GR == "3") {
                                                                        GetVal.OTH_CHR = datval.AmtDt[o].AMT;
                                                                    }
                                                                    if (datval.AmtDt[o].TYPE == "T" && datval.AmtDt[o].REV_GR == "1") {
                                                                        GetVal.TAX_AMT = datval.AmtDt[o].AMT;
                                                                    }
                                                                    if (datval.AmtDt[o].TYPE == "T" && datval.AmtDt[o].REV_GR == "2") {
                                                                        GetVal.PLAN_TAX = datval.AmtDt[o].AMT;
                                                                    }
                                                                    if (datval.AmtDt[o].TYPE == "T" && datval.AmtDt[o].REV_GR == "3") {
                                                                        GetVal.OTH_TAX = datval.AmtDt[o].AMT;
                                                                    }
                                                                }
                                                            }
                                                            GetVal.Adult = $$("AdultBK").getValue();
                                                            GetVal.Child = $$("ChildBK").getValue();
                                                            var ArrivalBK = $$("ArrivalBK").getValue();
                                                            if (ArrivalBK != "") {
                                                                ArrivalBK = ArrivalBK.substring(0, 10).toString();
                                                                ArrivalBK = ArrivalBK.split('-')[2] + "/" + ArrivalBK.split('-')[1] + "/" + ArrivalBK.split('-')[0];
                                                            }

                                                            var DepatureBK = $$("DepatureBK").getValue();
                                                            if (DepatureBK != "") {
                                                                DepatureBK = DepatureBK.substring(0, 10).toString();
                                                                DepatureBK = DepatureBK.split('-')[2] + "/" + DepatureBK.split('-')[1] + "/" + DepatureBK.split('-')[0];
                                                            }
                                                            GetVal.ArraivalDt = ArrivalBK;

                                                            var Nights = "";
                                                            var Table = {};
                                                            Table["ARRV"] = ArrivalBK;
                                                            Table["DEPART"] = DepatureBK;
                                                            var paramValue = JSON.stringify(Table);
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json",
                                                                accepts: "application/json",
                                                                dataType: "json",
                                                                url: "/SalesAndMarket/NightsCalculate",
                                                                cache: false,
                                                                charset: 'utf-8',
                                                                data: paramValue,
                                                                async: false,
                                                                success: function (data) {
                                                                    Nights = data;
                                                                    debugger;
                                                                    GetVal.NetTariff = parseFloat(parseInt(Tariff) * parseInt(Nights)).toFixed(2);
                                                                }
                                                            });
                                                            GetVal.RoomID = $$("NoOfRoomsBK").getValue();;
                                                            var NoOfRooms = $$("NoOfRoomsBK").getValue();
                                                            var NtTrf = parseFloat(parseInt(Tariff) * parseInt(Nights)).toFixed(2);
                                                            var TotalNights = parseInt(NoOfRooms) * parseInt(Nights);
                                                            var TotalTariff = parseInt(NoOfRooms) * parseInt(NtTrf);
                                                            GetVal.RATE_TY_NM = $$("RateCodeBK").getValue();
                                                            GetVal.RATE_TY_ID = $$("RateCodeidBK").getValue();
                                                            GetVal.Nights = Nights;
                                                            GetVal.GrossAmt = Tariff;
                                                            GetVal.DepartureDt = DepatureBK;
                                                            GetVal.RegNoBK = RegNo; GetVal.TariffBK = Tariff;
                                                            GetVal.PLAN_ID = $("#PlanID").val();
                                                            GetVal.PLAN_NM = $$("PlanBK").getValue();
                                                            GetVal.RATE_TY_NM = $$("RateCodeBK").getValue();
                                                            GetVal.RATE_TY_ID = $$("RateCodeidBK").getValue();
                                                            GetVal.RoomTyid = $$("RoomTypeBK").getValue();
                                                            GetVal.RoomType = $$("RoomTypeBK").getText();
                                                            GetVal.ReserveNo = ReserveNo;
                                                            GetVal.TotalNights = TotalNights;
                                                            GetVal.TotalTariff = TotalTariff;
                                                            $$("QuoteGeneration_Grid").refresh();
                                                            var gridval = $$("QuoteGeneration_Grid").serialize();
                                                            var TotNt = 0;
                                                            var TotTrf = 0;
                                                            for (i = 0; i < gridval.length; i++) {
                                                                var TotalNights = parseInt(gridval[i].RoomID) * parseInt(gridval[i].Nights);
                                                                var TotalTariff = parseInt(gridval[i].RoomID) * parseInt(gridval[i].NetTariff);
                                                                TotNt = TotNt + parseInt(TotalNights);
                                                                TotTrf = TotTrf + parseInt(TotalTariff);
                                                            }
                                                            $$("TotalNights").define('label', TotNt);
                                                            $$("TotalNights").refresh();
                                                            $$("TotalTariff").define('label', parseFloat(TotTrf).toFixed(2));
                                                            $$("TotalTariff").refresh();
                                                            $$("BookingCreatePopup").hide();
                                                        }
                                                        else {
                                                            alert(datval.MsgTXT);
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                view: 'button',
                                                type: "icon",
                                                icon: "wxi-file",
                                                label: 'Save',
                                                width: 100,
                                                align: "right",
                                                on: {
                                                    onItemClick: function () {
                                                        debugger;
                                                        var datval = [];
                                                        if ($('#O_NM').val() != "" && $('#O_NM').val() != undefined) {
                                                            datval = PostBookingCreationFn("OPEN");
                                                        }
                                                        else {
                                                            datval = PostBookingCreationFn("SAVE");
                                                        }

                                                        if (datval.Status == "1") {
                                                            var RegNo = datval.RegNo;
                                                            var Tariff = datval.Tariff;
                                                            var ReserveNo = datval.ReserveNo;
                                                            var RowId = $("#SelectRWID").val();
                                                            var GetVal = $$("QuoteGeneration_Grid").getItem(RowId);
                                                            if (datval.DetailsDt.length > 0) {
                                                                GetVal.GUEST1_TITLE_ID = datval.DetailsDt[0].GUEST1_TITLE_ID;
                                                                GetVal.FIRSTNAME = datval.DetailsDt[0].FIRSTNAME;
                                                                GetVal.LASTNAME = datval.DetailsDt[0].LASTNAME;
                                                                GetVal.ARRIVAL_TM = datval.DetailsDt[0].ARRIVAL_TM;
                                                                GetVal.DEPARTURE_TM = datval.DetailsDt[0].DEPARTURE_TM;
                                                                GetVal.INFANT = datval.DetailsDt[0].INFANT;
                                                                GetVal.FO_RS_STATUS = datval.DetailsDt[0].RESERVE_STATUS;
                                                                GetVal.GUEST_ID = datval.DetailsDt[0].GUEST_ID;
                                                                GetVal.CMP_NM = datval.DetailsDt[0].GUEST_PARTY_NM;
                                                                GetVal.CMP_ID = datval.DetailsDt[0].GUEST_PARTY_ID;

                                                            }
                                                            if (datval.AmtDt.length > 0) {
                                                                for (o = 0; o < datval.AmtDt.length; o++) {
                                                                    if (datval.AmtDt[o].TYPE == "O" && datval.AmtDt[o].REV_GR == "1") {
                                                                        GetVal.CHR_AMT = datval.AmtDt[0].AMT;
                                                                    }
                                                                    if (datval.AmtDt[o].TYPE == "O" && datval.AmtDt[o].REV_GR == "2") {
                                                                        GetVal.PLAN_CHR = datval.AmtDt[o].AMT;
                                                                    }
                                                                    if (datval.AmtDt[o].TYPE == "O" && datval.AmtDt[o].REV_GR == "3") {
                                                                        GetVal.OTH_CHR = datval.AmtDt[o].AMT;
                                                                    }
                                                                    if (datval.AmtDt[o].TYPE == "T" && datval.AmtDt[o].REV_GR == "1") {
                                                                        GetVal.TAX_AMT = datval.AmtDt[o].AMT;
                                                                    }
                                                                    if (datval.AmtDt[o].TYPE == "T" && datval.AmtDt[o].REV_GR == "2") {
                                                                        GetVal.PLAN_TAX = datval.AmtDt[o].AMT;
                                                                    }
                                                                    if (datval.AmtDt[o].TYPE == "T" && datval.AmtDt[o].REV_GR == "3") {
                                                                        GetVal.OTH_TAX = datval.AmtDt[o].AMT;
                                                                    }
                                                                }
                                                            }
                                                            GetVal.Adult = $$("AdultBK").getValue();
                                                            GetVal.Child = $$("ChildBK").getValue();
                                                            var ArrivalBK = $$("ArrivalBK").getValue();
                                                            if (ArrivalBK != "") {
                                                                ArrivalBK = ArrivalBK.substring(0, 10).toString();
                                                                ArrivalBK = ArrivalBK.split('-')[2] + "/" + ArrivalBK.split('-')[1] + "/" + ArrivalBK.split('-')[0];
                                                            }

                                                            var DepatureBK = $$("DepatureBK").getValue();
                                                            if (DepatureBK != "") {
                                                                DepatureBK = DepatureBK.substring(0, 10).toString();
                                                                DepatureBK = DepatureBK.split('-')[2] + "/" + DepatureBK.split('-')[1] + "/" + DepatureBK.split('-')[0];
                                                            }
                                                            GetVal.ArraivalDt = ArrivalBK;

                                                            var Nights = "";
                                                            var Table = {};
                                                            Table["ARRV"] = ArrivalBK;
                                                            Table["DEPART"] = DepatureBK;
                                                            var paramValue = JSON.stringify(Table);
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json",
                                                                accepts: "application/json",
                                                                dataType: "json",
                                                                url: "/SalesAndMarket/NightsCalculate",
                                                                cache: false,
                                                                charset: 'utf-8',
                                                                data: paramValue,
                                                                async: false,
                                                                success: function (data) {
                                                                    Nights = data;
                                                                    debugger;
                                                                    GetVal.NetTariff = parseFloat(parseInt(Tariff) * parseInt(Nights)).toFixed(2);
                                                                }
                                                            });
                                                            GetVal.RoomID = $$("NoOfRoomsBK").getValue();;
                                                            var NoOfRooms = $$("NoOfRoomsBK").getValue();
                                                            var NtTrf = parseFloat(parseInt(Tariff) * parseInt(Nights)).toFixed(2);
                                                            var TotalNights = parseInt(NoOfRooms) * parseInt(Nights);
                                                            var TotalTariff = parseInt(NoOfRooms) * parseInt(NtTrf);
                                                            GetVal.RATE_TY_NM = $$("RateCodeBK").getValue();
                                                            GetVal.RATE_TY_ID = $$("RateCodeidBK").getValue();
                                                            GetVal.Nights = Nights;
                                                            GetVal.GrossAmt = Tariff;
                                                            GetVal.DepartureDt = DepatureBK;
                                                            GetVal.RegNoBK = RegNo; GetVal.TariffBK = Tariff;
                                                            GetVal.PLAN_ID = $("#PlanID").val();
                                                            GetVal.PLAN_NM = $$("PlanBK").getValue();
                                                            GetVal.RATE_TY_NM = $$("RateCodeBK").getValue();
                                                            GetVal.RATE_TY_ID = $$("RateCodeidBK").getValue();
                                                            GetVal.RoomTyid = $$("RoomTypeBK").getValue();
                                                            GetVal.RoomType = $$("RoomTypeBK").getText();
                                                            GetVal.ReserveNo = ReserveNo;
                                                            GetVal.TotalNights = TotalNights;
                                                            GetVal.TotalTariff = TotalTariff;
                                                            $$("QuoteGeneration_Grid").refresh();
                                                            var gridval = $$("QuoteGeneration_Grid").serialize();
                                                            var TotNt = 0;
                                                            var TotTrf = 0;
                                                            for (i = 0; i < gridval.length; i++) {
                                                                var TotalNights = parseInt(gridval[i].RoomID) * parseInt(gridval[i].Nights);
                                                                var TotalTariff = parseInt(gridval[i].RoomID) * parseInt(gridval[i].NetTariff);
                                                                TotNt = TotNt + parseInt(TotalNights);
                                                                TotTrf = TotTrf + parseInt(TotalTariff);
                                                            }
                                                            $$("TotalNights").define('label', TotNt);
                                                            $$("TotalNights").refresh();
                                                            $$("TotalTariff").define('label', parseFloat(TotTrf).toFixed(2));
                                                            $$("TotalTariff").refresh();
                                                            $$("BookingCreatePopup").hide();
                                                        }
                                                        else {
                                                            alert(datval.MsgTXT);
                                                        }

                                                    }
                                                }
                                            },
                                            {
                                                view: 'button',
                                                type: "icon",
                                                icon: "wxi-close",
                                                label: 'Close',
                                                width: 100,
                                                align: "right",
                                                on: {
                                                    onItemClick: function () {
                                                        $$("BookingCreatePopup").hide();
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                   ]}
                                     
                   ]
               }
            ]
        }
    }).show();

}
function CurrentDateLoad() {
    var rtn = '';
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/CurrentDateLoadNew",
        data: '',
        async: false,
        success: function (data) {
            rtn = data;
        }
    });
    return rtn;
}
function GuestLoadfn() {
    //webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    //webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Guest Search",
        id: 'GuestSearchPOP',
        modal: true,
        width: 500,
        close: true,
        body: {
            rows: [
                {
                    id: "GuestSearchNew",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "GUEST_TITLE", header: ['Title', { content: "textFilter" }], width: 80, css: { 'text-align': 'left ! important' } },
                            { id: "LAST_NAME", header: ['Last Name', { content: "textFilter" }], width: 200, css: { 'text-align': 'left ! important' } },
                            { id: "FIRST_NAME", header: ['First Name', { content: "textFilter" }], width: 200, css: { 'text-align': 'left ! important' } },
                            { id: "GUEST_ID", hidden: true },
                            { id: "GUEST_TITLE_ID", hidden: true },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            var getval = this.getItem(id.row); 
                            $$("LastNMBK").setValue(getval.LAST_NAME);
                            $$("FirstNMBK").setValue(getval.FIRST_NAME);
                            $$("TitleBK").setValue($.trim(getval.GUEST_TITLE_ID));
                            $$("GuestSearchPOP").hide();
                        },
                        'onBeforeFilter': function (id, value, config) {
                            debugger;
                            if ($.trim(value).length >= 2) {
                                if (id == "GUEST_TITLE") {
                                    $('#FlrTitle').val(value);
                                }
                                if (id == "LAST_NAME") {
                                    $('#FlrLstNm').val(value);
                                }
                                if (id == "FIRST_NAME") {
                                    $('#FlrFstNm').val(value);
                                }
                                var dataval = GuestLoadFn();
                            }
                           


                        },
                        'onKeyPress': function (e) {
                            debugger;
                            if (e == '13') {
                                var valid = $$("GuestSearchNew").getSelectedId(true);
                                this.callEvent("onItemDblClick", [valid[0]]);
                            }
                        }
                    },
                },
                {
                    view: 'form',
                    elements: [
                        {
                            cols: [
                                {
                                    view: 'label',
                                    label: ' ',
                                    name: 'label1',
                                    id: 'label1',
                                    labelWidth: 100,
                                },
                                {
                                    cols: [
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Ok',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var data = $$("GuestSearchNew").getSelectedItem();
                                                    $$("LastNMBK").setValue(data.LAST_NAME);
                                                    $$("FirstNMBK").setValue(data.FIRST_NAME);
                                                    $$("TitleBK").setValue($.trim(data.GUEST_TITLE_ID));
                                                    $$("GuestSearchPOP").hide();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("GuestSearchPOP").hide();
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }).show();

}
function TitleGstLoad() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/TitleGstLoad",
        data: { 'PROPID': $$("Property").getValue() },
        //dataType:JSON,
        async: false,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
            }
        }
    });
    return rowDatad;
}
function GuestLoadFn() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/GuestLoadFn",
        data: { 'PROPID': $$("Property").getValue(), 'FlrTitle': $('#FlrTitle').val(),'FlrLstNm': $('#FlrLstNm').val(),'FlrFstNm': $('#FlrFstNm').val() },
        //dataType:JSON,
        async: false,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("GuestSearchNew").clearAll();
                $$("GuestSearchNew").parse(rowDatad);
                $$("GuestSearchNew").refresh();
            }
        }
    });
}
function CompanyLoadfn() {
    //webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    //webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Company Search",
        id: 'CompanySearchPOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    id: "CompanySearch",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "PARTY_NM", header: ['Company', { content: "textFilter" }], width: 380, css: { 'text-align': 'left ! important' } },
                            { id: "PARTY_ID", hidden: true },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            var getval = this.getItem(id.row);
                            $$("CompanyBK").setValue(getval.PARTY_NM);
                            $$("CompanyidBK").setValue(getval.PARTY_ID);
                            var RateVal = CompanyRateCodeLoadFn(getval.PARTY_ID);
                            debugger;
                            if (RateVal.length > 0) {
                                $$("RateCodeBK").setValue(RateVal[0].RATE_TY_NM);
                                $$("RateCodeidBK").setValue(RateVal[0].RATE_TY_ID);
                                $("#PlanID").val(RateVal[0].PLAN_ID);
                                $$("PlanBK").setValue(RateVal[0].PLAN_NM);
                                RateCodeTariffloadfn();
                            }
                            $$("CompanySearchPOP").hide();
                        },
                        'onBeforeFilter': function (id, value, config) {
                            debugger;
                            if ($.trim(value).length >= 3) {
                                var dataval = CompanySearchloadfn(value);
                            }
                            else {
                                $$("CompanySearch").clearAll();
                            }
                          

                        },
                        'onKeyPress': function (e) {
                            debugger;
                            if (e == '13') {
                                var valid = $$("CompanySearch").getSelectedId(true);
                                this.callEvent("onItemDblClick", [valid[0]]);
                            }
                        }
                    },
                },
                {
                    view: 'form',
                    elements: [
                        {
                            cols: [
                                {
                                    view: 'label',
                                    label: ' ',
                                    name: 'label1',
                                    id: 'label1',
                                    labelWidth: 100,
                                },
                                {
                                    cols: [
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Ok',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var data = $$("CompanySearch").getSelectedItem();
                                                    $$("CompanyBK").setValue(data.PARTY_NM);
                                                    $$("CompanyidBK").setValue(data.PARTY_ID);
                                                    var RateVal = CompanyRateCodeLoadFn(data.PARTY_ID);
                                                    debugger;
                                                    if (RateVal.length > 0) {
                                                        $$("RateCodeBK").setValue(RateVal[0].RATE_TY_NM);
                                                        $$("RateCodeidBK").setValue(RateVal[0].RATE_TY_ID);
                                                        $("#PlanID").val(RateVal[0].PLAN_ID);
                                                        $$("PlanBK").setValue(RateVal[0].PLAN_NM);
                                                        RateCodeTariffloadfn();
                                                    }
                                                    $$("CompanySearchPOP").hide();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("CompanySearchPOP").hide();
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }).show();
   
}
function CompanyRateCodeLoadFn(ComId) {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/CompanyRateCodeLoadFn",
        data: { 'PROPID': $$("Property").getValue(), 'PartyId': ComId, 'RMTY': $$("RoomTypeBK").getValue(), 'ARRV': $$("ArrivalBK").getValue() },
        //dataType:JSON,
        async: false,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
            }
        }
    });
    return rowDatad;
}
function RoomNoLoadfn() {
    //webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    //webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Room No Search",
        id: 'RoomNoSearchPOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    id: "RoomNoSearch",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "ROOM_NO", header: ['Room No', { content: "textFilter" }], width: 380, css: { 'text-align': 'left ! important' } },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            var getval = this.getItem(id.row);
                            $$("RoomNO").setValue(getval.ROOM_NO);
                            $$("RoomNoSearchPOP").hide();
                        },
                        'onKeyPress': function (e) {
                            debugger;
                            if (e == '13') {
                                var valid = $$("RoomNoSearch").getSelectedId(true);
                                this.callEvent("onItemDblClick", [valid[0]]);
                            }
                        }
                    },
                },
                {
                    view: 'form',
                    elements: [
                        {
                            cols: [
                                {
                                    view: 'label',
                                    label: ' ',
                                    name: 'label1',
                                    id: 'label1',
                                    labelWidth: 100,
                                },
                                {
                                    cols: [
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Ok',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var data = $$("RoomNoSearch").getSelectedItem();
                                                    $$("RoomNO").setValue(data.ROOM_NO);
                                                    $$("RoomNoSearchPOP").hide();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("RoomNoSearchPOP").hide();
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }).show();

}
function RoomNoLoadFns() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/RoomNoLoadFn",
        data: { 'PROPID': $$("Property").getValue(), 'RMTY': $$("RoomTypeBK").getValue() },
        //dataType:JSON,
        async: false,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("RoomNoSearch").clearAll();
                $$("RoomNoSearch").parse(rowDatad);
                $$("RoomNoSearch").refresh();
            }
        }
    });
    return rowDatad;
}
function CompanySearchloadfn(val) {
    
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/CompanyLoadMultiParty",
        data: { 'PROPID': $$("Property").getValue(), 'Value': val },
        //dataType:JSON,
        async: false,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("CompanySearch").clearAll();
                $$("CompanySearch").parse(rowDatad);
                $$("CompanySearch").refresh();
            }
        }
    });
    return rowDatad;
}
function RateCodeLoadfn() {
    //webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    //webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "RateCode Search",
        id: 'RateCodeSearchPOP',
        modal: true,
        width: 400,
        close: true,
        body: {
            rows: [
                {
                    id: "RateCodeSearch",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "RATE_TY_NM", header: ['RateCode', { content: "textFilter" }], width: 380, css: { 'text-align': 'left ! important' } },
                            { id: "RATE_TY_ID", hidden: true },
                    ],
                    scroll: "y",
                    height: 500,
                    data: [],
                    on: {
                        'onItemClick': function (id) {
                            var getval = this.getItem(id.row);
                            $$("RateCodeBK").setValue(getval.RATE_TY_NM);
                            $$("RateCodeidBK").setValue(getval.RATE_TY_ID);
                            $("#PlanID").val(getval.PLAN_ID);
                            $$("PlanBK").setValue(getval.PLAN_NM);
                           
                            RateCodeTariffloadfn();
                            $$("RateCodeSearchPOP").hide();
                        }
                    },
                },
                {
                    view: 'form',
                    elements: [
                        {
                            cols: [
                                {
                                    view: 'label',
                                    label: ' ',
                                    name: 'label1',
                                    id: 'label1',
                                    labelWidth: 100,
                                },
                                {
                                    cols: [
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Ok',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var data = $$("RateCodeSearch").getSelectedItem();
                                                    $$("RateCodeBK").setValue(data.RATE_TY_NM);
                                                    $$("RateCodeidBK").setValue(data.RATE_TY_ID);
                                                    $("#PlanID").val(data.PLAN_ID);
                                                    $$("PlanBK").setValue(data.PLAN_NM);
                                                    RateCodeTariffloadfn();
                                                    $$("RateCodeSearchPOP").hide();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            minWidth: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("RateCodeSearchPOP").hide();
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }).show();
    var dataval = RateCodeSearchloadfn();
}
function RateCodeSearchloadfn() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/RateCodeSearchloadfn",
        data: { 'PROPID': $$("Property").getValue(), 'RMTY': $$("RoomTypeBK").getValue(), 'ARRV': $$("ArrivalBK").getValue() },
        async: false,
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("RateCodeSearch").clearAll();
                $$("RateCodeSearch").parse(rowDatad);
                $$("RateCodeSearch").refresh();
            }
        }
    });
    return rowDatad;
}
function RateCodeTariffloadfn() {
    var rowDatad = [];
    var ArrivalBK = $$("ArrivalBK").getValue();
    if (ArrivalBK != "") {
        ArrivalBK = ArrivalBK.substring(0, 10).toString();
        ArrivalBK = ArrivalBK.split('-')[1] + "/" + ArrivalBK.split('-')[2] + "/" + ArrivalBK.split('-')[0];
    }
    var DepatureBK = $$("DepatureBK").getValue();
    if (DepatureBK != "") {
        DepatureBK = DepatureBK.substring(0, 10).toString();
        DepatureBK = DepatureBK.split('-')[1] + "/" + DepatureBK.split('-')[2] + "/" + DepatureBK.split('-')[0];
    }
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/RateCodeTariffloadfn",
        data: { 'PROPID': $$("Property").getValue(), 'RMTY': $$("RoomTypeBK").getValue(), 'ARRV': ArrivalBK, 'DEPT': DepatureBK, 'RATE_TY_ID': $$("RateCodeidBK").getValue(), 'PLAN': $("#PlanID").val(), 'ADLT': $$("AdultBK").getValue(), 'CHLD': $$("ChildBK").getValue() },
        async: false,
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
                $$("TariffBK").setValue(parseFloat(rowDatad[0].TOT_TRF).toFixed(2));
            }
        }
    });
    return rowDatad;
}
function GetRoomTyFn() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        async: false,
        url: "/SalesAndMarket/GetRoomTyFn",
        data: { 'PROPID':$$("Property").getValue()},
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
            }
        }
    });
    return rowDatad;
}



function PostBookingCreationFn(ModeTy) {
    var rowDatad = [];
    var Params = {};
    Params["ModeTy"] = ModeTy;
    Params["O_NM"] = $('#O_NM').val();
    Params["PROPID"] = $$("Property").getValue();
    Params["RoomTy"] = $$("RoomTypeBK").getValue();
    Params["RoomTyNM"] = $$("RoomTypeBK").getText();
    Params["RateCode"] = $$("RateCodeidBK").getValue();
    Params["RateCodeNM"] = $$("RateCodeBK").getValue();
    Params["Company"] = $$("CompanyidBK").getValue();
    Params["CompanyNM"] = $$("CompanyBK").getValue();
    Params["LastNM"] = $$("LastNMBK").getValue();
    Params["FirstNM"] = $$("FirstNMBK").getValue();
    Params["TitleBK"] = $$("TitleBK").getValue();
    Params["RoomNO"] = $$("RoomNO").getValue();
    var str1 = $$("HHMMBK1").getValue();
    if (str1.length < 4) {
        alert('Arrival HH:MM should be Correct');
        return false;
    }
    var res11 = str1.substr(0, 2);
    var res12 = str1.substr(2, 2);
    Params["ArrivalTime"] = res11 + ':' + res12;
    var str2 = $$("HHMMBK2").getValue();
    if (str2.length < 4) {
        alert('Departure HH:MM should be Correct');
        return false;
    }
    var res21 = str2.substr(0, 2);
    var res22 = str2.substr(2, 2);
    Params["DepartureTime"] = res21 + ':' + res22;
    Params["Mobile"] = $$("MobileBK").getValue();
    Params["ResStatus"] = $$("StatusBK").getValue();
    Params["EMail"] = $$("EMailBK").getValue();
    Params["Adult"] = $$("AdultBK").getValue();
    Params["Child"] = $$("ChildBK").getValue();
    Params["NoOfRooms"] = $$("NoOfRoomsBK").getValue();
    Params["R_NO"] = $('#R_NO').val();
    Params["Reserve_NO"] = $('#Reserve_NO').val();
    var TariffAmt = 0;
    if ($$("DiscBK").getValue() != "" && $$("DiscBK").getValue() != "0") {
        var discdt = parseInt($$("DiscBK").getValue()) / 100;
        TariffAmt = parseInt($$("TariffBK").getValue()) - (parseInt($$("TariffBK").getValue()) * discdt);
    }
    else if ($$("AmountBK").getValue() != "" && $$("AmountBK").getValue() != "0") {
        if(parseInt($$("AmountBK").getValue())< parseInt($$("TariffBK").getValue())){
            TariffAmt = parseInt($$("TariffBK").getValue()) - parseInt($$("AmountBK").getValue());}
    else{
            alert("Amount is less then of Tariff");
            return false;
    }
    }
    Params["Tariff"] = TariffAmt;
    Params["GurestReq"] = $$("GuestRequestBK").getValue();
    debugger;
    var ArrivalBK = $$("ArrivalBK").getValue();
    if (ArrivalBK != "") {
        ArrivalBK = ArrivalBK.substring(0, 10).toString();
        ArrivalBK = ArrivalBK.split('-')[2] + "/" + ArrivalBK.split('-')[1] + "/" + ArrivalBK.split('-')[0];
    }
    Params["ArrivalDate"] = ArrivalBK;
    var DepatureBK = $$("DepatureBK").getValue();
    if (DepatureBK != "") {
        DepatureBK = DepatureBK.substring(0, 10).toString();
        DepatureBK = DepatureBK.split('-')[2] + "/" + DepatureBK.split('-')[1] + "/" + DepatureBK.split('-')[0];
    }
    Params["DepartureDate"] = DepatureBK;
    
    var DueDTBK = $$("DueDTBK").getValue();
    if (DueDTBK != "") {
        DueDTBK = DueDTBK.substring(0, 10).toString();
        DueDTBK = DueDTBK.split('-')[2] + "/" + DueDTBK.split('-')[1] + "/" + DueDTBK.split('-')[0];
    }
    Params["DueDate"] = DueDTBK;
    $.ajax({
        type: "POST",
        async: false,
        url: "/SalesAndMarket/PostBookingCreationFn",
        data: { 'Params': JSON.stringify(Params) },
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
            }
        }
    });
    return rowDatad;
}
function OpenModeBookingLoad(ReserveNo, ModeIND) {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        async: false,
        url: "/SalesAndMarket/OpenModeBookingLoad",
        data: { 'PROPID': $$("Property").getValue(), 'ReserveNo': ReserveNo, 'ModeIND': ModeIND },
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = JSON.parse(d);
            }
        }
    });
    return rowDatad;
}