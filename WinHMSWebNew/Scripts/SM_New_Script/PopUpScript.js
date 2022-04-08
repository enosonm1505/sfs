function QuoteGenerationPopup() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    var chkhd = false;
    if (C10_IND == "1") {
        chkhd = true;
    }
    else {
        chkhd = false;
    }
    var BKCREATION = BookingCreationIND();
    debugger;
    var chkhd1 = true;
    if (BKCREATION == "1") {
        chkhd1 = false;
    }
    else {
        chkhd1 = true;
    }
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Worksheet",
        id: 'QuoteGenerationPopup',
        modal: true,
        width: 1100,
        close: true,
        body: {
            rows: [
                {
                    cols: [
                        {
                        view: 'button',
                        type: "icon",
                        icon: "wxi-plus",
                        label: 'Add',
                        name: 'QuoteGeneration_Btn',
                        id: 'QuoteGeneration_Btn',
                        inputWidth: 70,
                        minWidth: 30,
                        align: "right",
                        on: {
                            onItemClick: function () {
                                if (C10_IND != "1") {
                                    QuoteCreation();
                                    $("#QuoteGenerateTy").val("");
                                    $("#RATE_TY_NM").val("");
                                    $("#RATE_TY_ID").val("");
                                    $$("RoomID").setValue("1");
                                    $$("RoomType").setValue("");
                                   // $$("ArrivalDt").setValue("");
                                    //$$("DeparturteDt").setValue("");
                                    $$("Adult").setValue("");
                                    $$("Child").setValue("");
                                    $$("GrossAmt").setValue("");
                                    $$("NetTariff").setValue("");
                                } else {
                                    QuoteCreationOffline();
                                    $("#QuoteGenerateTy").val("");
                                    $$("RoomIDOFL").setValue("1");
                                    $$("RoomTypeOFL").setValue("");
                                    //$$("ArrivalDtOFL").setValue("");
                                   // $$("DeparturteDtOFL").setValue("");
                                    $$("AdultOFL").setValue("");
                                    $$("ChildOFL").setValue("");
                                    $$("GrossAmtOFL").setValue("");
                                    $$("NetTariffOFL").setValue("");
                                }
                            }
                        }
                    },
                     
                    {
                        view: "button",
                        type: "icon",
                        icon: "wxi-trash",
                        label: "",
                        id: "QuoteGeneration_Del",
                        width: 30,
                        click: function () {
                            $$("QuoteGeneration_Grid").editCancel();
                            $$("QuoteGeneration_Grid").remove($$("QuoteGeneration_Grid").getSelectedId());
                            $$("QuoteGeneration_Grid").refresh();
                            quote_generate_grid1 = [];
                            $.each($$("QuoteGeneration_Grid").serialize(), function (key, value) {

                                value.Active = 1;
                                value.ID = ++l;
                                quote_generate_grid1.push(value);

                            });
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
                        },
                        align: "right"
                    }
                    ]},
                {
                    id: "QuoteGeneration_Grid",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "ArraivalDt", header: 'ArraivalDt', width: 120, css: { 'text-align': 'center ! important' } },
                            { id: "DepartureDt", header: 'DepartureDt', width: 120, css: { 'text-align': 'center ! important' } },
                            { id: "RoomType", header: 'Room Type', width: 180, css: { 'text-align': 'center ! important' } },
                            { id: "RoomID", header: 'Rms', width: 80, css: { 'text-align': 'center ! important' } },
                            { id: "Adult", header: 'Adult', width: 80,  css: { 'text-align': 'right ! important' } },
                            { id: "Child", header: 'Child',  width: 80, css: { 'text-align': 'right ! important' } },
                            { id: "RATE_TY_NM", header: 'Rate Code', width: 100,hidden:chkhd, css: { 'text-align': 'right ! important' } },
                            { id: "GrossAmt", header: 'Price', width: 100,format: webix.i18n.numberFormat, css: { 'text-align': 'right ! important' } },
                            { id: "DiscPer", header: 'Disc %', width: 100, hidden: chkhd, css: { 'text-align': 'right ! important' } },
                            { id: "DiscAmt", header: 'Disc Amt', width: 100, hidden: chkhd, css: { 'text-align': 'right ! important' } },
                            { id: "NetTariff", header: 'Net Tariff',  width: 100,format: webix.i18n.numberFormat, css: { 'text-align': 'right ! important' } },
                            { id: "BooKing", header: '',  css: 'Product_Grid_style2', width: 50, template: "B", hidden: chkhd1, css: { 'text-align': 'center ! important' }, },
                            { id: "RegNoBK", header: 'Reg No', width: 100, css: { 'text-align': 'right ! important' }, hidden: chkhd1 },
                            { id: "OtherCharges", header: 'Other Charg', hidden: chkhd, width: 100, css: { 'text-align': 'right ! important' } },
                            { id: "Value", header: 'O', width: 100, hidden: chkhd, css: { 'text-align': 'right ! important' } },
                            { id: "RoomTyid", hidden: true },
                            { id: "RATE_TY_ID", hidden: true },
                            { id: "PK_ID", hidden: true },
                            { id: "Currency", hidden: true },
                            { id: "PARTY_ID", hidden: true },
                            { id: "PARTY_NM", hidden: true },
                            { id: "PROD_ID", hidden: true },
                            { id: "UnitTyID", hidden: true },
                            { id: "PLAN_ID", hidden: true },
                            { id: "PLAN_NM", hidden: true },
                            { id: "Nights", hidden: false },
                            { id: "TotalNights", hidden: false, },
                            { id: "TotalTariff", hidden: true },
                            { id: "TariffBK", hidden: true },
                            { id: "ReserveNo", hidden: true },

                            { id: "ARRIVAL_TM", hidden: true },
                            { id: "DEPARTURE_TM", hidden: true },
                            { id: "INFANT", hidden: true },
                            { id: "CHR_AMT", hidden: true },
                            { id: "TAX_AMT", hidden: true },
                            { id: "OTH_CHR", hidden: true },
                            { id: "OTH_TAX", hidden: true },
                            { id: "PLAN_CHR", hidden: true },
                            { id: "PLAN_TAX", hidden: true },
                            { id: "FO_RS_STATUS", hidden: true },
                            { id: "GUEST_ID", hidden: true },
                            { id: "CMP_NM", hidden: true },
                            { id: "GUEST1_TITLE_ID", hidden: true },
                            { id: "FIRSTNAME", hidden: true },
                            { id: "LASTNAME", hidden: true },
                            { id: "CMP_ID", hidden: true },
                            
                    ],
                 
                    height: 400,
                    data: [],
                    on: {
                        onItemClick: function (id) {
                            debugger;
                            var getval = this.getItem(id.row);
                            $("#SelectRWID").val(id.row)
                            if (id.column == "BooKing") {
                                if ($$("Property").getValue() != "") {
                                    BookingCreatePopup();
                                    if (getval.RegNoBK == "" || getval.RegNoBK == undefined) {
                                        $$("AdultBK").setValue(getval.Adult);
                                        $$("ChildBK").setValue(getval.Child);
                                        var arr = getval.ArraivalDt.split('/')[2] + "/" + getval.ArraivalDt.split('/')[1] + "/" + getval.ArraivalDt.split('/')[0];
                                        var dep = getval.DepartureDt.split('/')[2] + "/" + getval.DepartureDt.split('/')[1] + "/" + getval.DepartureDt.split('/')[0];
                                        $$("DepatureBK").setValue(dep);
                                        $$("ArrivalBK").setValue(arr);
                                        $$("RoomTypeBK").setValue(getval.RoomTyid);
                                        $$("NoOfRoomsBK").setValue(getval.RoomID);
                                        $('#R_NO').val('');
                                        $('#Reserve_NO').val('');
                                        $('#O_NM').val('');
                                        $$('BookIndCancel').hide();
                                    }
                                    else {
                                        $$('BookIndCancel').show();
                                        var OpenVal = OpenModeBookingLoad(getval.ReserveNo);
                                        if (OpenVal.length > 0) {
                                            $$("RoomNO").setValue(OpenVal[0].BLOCK_ROOM_NO);
                                            $$("ReserveNO").setValue(OpenVal[0].reserve_no);
                                            $$("AdultBK").setValue(OpenVal[0].adult);
                                            $$("ChildBK").setValue(OpenVal[0].child);
                                            $$("DepatureBK").setValue(OpenVal[0].departure_dt);
                                            $$("ArrivalBK").setValue(OpenVal[0].arrival_dt);
                                            $$("RoomTypeBK").setValue($.trim(OpenVal[0].room_ty_id));
                                            $$("NoOfRoomsBK").setValue(OpenVal[0].reserve_rooms);
                                            $$("HHMMBK1").setValue(OpenVal[0].arrival_tm);
                                            $$("HHMMBK2").setValue(OpenVal[0].departure_tm);

                                            $$("MobileBK").setValue(OpenVal[0].MOBILE);
                                            $$("EMailBK").setValue(OpenVal[0].email);
                                            $$("TitleBK").setValue($.trim(OpenVal[0].Titleid));
                                            $$("LastNMBK").setValue(OpenVal[0].last_name);
                                            $$("FirstNMBK").setValue(OpenVal[0].first_name);
                                            $$("GuestRequestBK").setValue(OpenVal[0].Sp_Message);
                                            $$("TariffBK").setValue(OpenVal[0].tariff);
                                            $$("DiscBK").setValue(OpenVal[0].tariff_disc_per);
                                            $$("AmountBK").setValue(OpenVal[0].tariff_disc_amt);
                                            $$("StatusBK").setValue($.trim(OpenVal[0].reserve_status));
                                       
                                            $$("CompanyBK").setValue(OpenVal[0].GUEST_PARTY_NM);
                                            $$("CompanyidBK").setValue(OpenVal[0].Guest_Party_Id);
                                            $$("RateCodeBK").setValue(OpenVal[0].rate_ty_nm);
                                            $$("RateCodeidBK").setValue(OpenVal[0].rate_ty_id);
                                            $$("PlanBK").setValue(OpenVal[0].plan_nm);
                                            $("#PlanID").val(OpenVal[0].plan_id);
                                            $('#O_NM').val(OpenVal[0].O_NM);
                                            $('#R_NO').val(OpenVal[0].r_no);
                                            $('#Reserve_NO').val(OpenVal[0].reserve_no);
                                        }
                                    }
                                }
                                else {
                                    alert('Property is Empty!....');
                                }
                            }
                        },
                        'onItemDblClick': function (id) {
                            $("#QuoteGenerateTy").val("1");
                            var getval = this.getItem(id.row);
                            debugger;
                            $("#QuoteGenerateTy").val(id.row)
                            var dtARRV = "";
                            if (getval.ArraivalDt != null || getval.ArraivalDt != undefined) {
                                dtARRV = getval.ArraivalDt;
                                dtARRV = dtARRV.split('/');
                                dtARRV = dtARRV["2"] + '-' + dtARRV["1"] + '-' + dtARRV["0"];
                            }
                            var dtDEPART = "";
                            if (getval.DepartureDt != null || getval.DepartureDt != undefined) {
                                dtDEPART = getval.DepartureDt;
                                dtDEPART = dtDEPART.split('/');
                                dtDEPART = dtDEPART["2"] + '-' + dtDEPART["1"] + '-' + dtDEPART["0"];
                            }

                            if (C10_IND != "1") {
                                QuoteCreation();
                                $("#RATE_TY_NM").val("");
                                $("#RATE_TY_ID").val("");
                                $$("RoomID").setValue(getval.RoomID);
                               
                                $$("ArrivalDt").setValue(dtARRV);
                                $$("DeparturteDt").setValue(dtDEPART);
                                $$("Adult").setValue(getval.Adult);
                                $$("Child").setValue(getval.Child);
                                $$("GrossAmt").setValue(parseFloat(getval.GrossAmt).toFixed(2));
                                $$("NetTariff").setValue(parseFloat(getval.NetTariff).toFixed(2));
                                $$("RoomType").setValue($.trim(getval.RoomTyid));
                                $("#PLAN_ID").val(getval.PLAN_ID);
                                $("#PLAN_NM").val(getval.PLAN_NM);
                                $("#PARTY_NM").val(getval.PARTY_NM);
                                $("#PARTY_ID").val(getval.PARTY_ID);
                                
                                $("#RATE_TY_ID").val(getval.RATE_TY_ID);
                                $("#PK_ID").val(getval.PK_ID);
                                $("#RATE_TY_NM").val(getval.RATE_TY_NM);
                                $$("DiscPer").setValue(getval.DiscPer);
                                $$("DiscAmt").setValue(getval.DiscAmt);
                                if (getval.RoomID > 1) {
                                    var totval = Number(getval.RoomID) * Number(getval.NetTariff);
                                    $$("TotValueOFL").setValue(totval.toFixed(2));
                                    $$("TotValueOFL").show();
                                }
                                
                            } else {
                                QuoteCreationOffline();
                                $$("RoomIDOFL").setValue(getval.RoomID);
                                $$("RoomTypeOFL").setValue($.trim(getval.RoomTyid));
                                $$("ArrivalDtOFL").setValue(dtARRV);
                                $$("DeparturteDtOFL").setValue(dtDEPART);
                                $$("AdultOFL").setValue(getval.Adult);
                                $$("ChildOFL").setValue(getval.Child);
                                $$("GrossAmtOFL").setValue(parseFloat(getval.GrossAmt).toFixed(2));
                                $$("NetTariffOFL").setValue(parseFloat(getval.NetTariff).toFixed(2));

                                $("#PLAN_ID").val(getval.PLAN_ID);
                                $("#PLAN_NM").val(getval.PLAN_NM);
                                $("#PARTY_NM").val(getval.PARTY_NM);
                                $("#PARTY_ID").val(getval.PARTY_ID);

                                $("#RATE_TY_ID").val(getval.RATE_TY_ID);
                                $("#PK_ID").val(getval.PK_ID);
                                $("#RATE_TY_NM").val(getval.RATE_TY_NM);
                                $("#DiscAmt").val(getval.DiscAmt);
                                if (getval.RoomID > 1) {
                                    var totval = Number(getval.RoomID) * Number(getval.NetTariff);
                                    $$("TotValueOFL").setValue(totval.toFixed(2));
                                    $$("TotValueOFL").show();
                                }
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
                                    label: 'Total Tariff  : ',
                                    name: 'labeln',
                                    align: "right",
                                    id: 'labeln',
                                    labelWidth: 70,
                                    minWidth: 70,
                                },
                                {
                                    view: 'label',
                                    label: '10000.00',
                                    name: 'label2',
                                    id: 'TotalTariff',
                                    css: "LblClr",
                                    labelWidth: 70,
                                    minWidth: 70,
                                },
                                {
                                    view: 'label',
                                    label: 'Total Nights  : ',
                                    name: 'label3',
                                    align: "right",
                                    id: 'label3',
                                    labelWidth: 70,
                                    minWidth: 70,
                                },
                                {
                                    view: 'label',
                                    label: '9',
                                    name: 'label4',
                                    id: 'TotalNights',
                                    labelWidth: 70,
                                    css: "LblClr",
                                    minWidth: 70,
                                },
                                {
                                    cols: [
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-file",
                                            label: 'Ok',
                                            width: 80,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    var gridval = $$("QuoteGeneration_Grid").serialize();
                                                    var TotNt = 0;
                                                    var TotTrf = 0;
                                                    for (i = 0; i < gridval.length; i++) {
                                                        var TotalNights = parseInt(gridval[i].RoomID) * parseInt(gridval[i].Nights);
                                                        var TotalTariff = parseInt(gridval[i].RoomID) * parseInt(gridval[i].NetTariff);
                                                        TotNt = TotNt + parseInt(TotalNights);
                                                        TotTrf = TotTrf + parseInt(TotalTariff);
                                                    }
                                                    var grid = $$("Product_Grid").serialize(); //$("#ProductGrid").data("kendoGrid");
                                                    var no = $("#ProductGridRow").val();
                                                    grid[no].ProductValue = TotTrf;
                                                    grid[no].SetInd = "1";
                                                    if (grid[no].ProdtInd == "1") {
                                                        //grid.dataSource._data[no].ProductQty = Number(FoTotalRooms) * Number(FoTotalNights);
                                                        grid[no].ProductQty = Number(TotNt);
                                                        var ArrVal = TotTrf / TotNt;
                                                        grid[no].CalcValue = Number(ArrVal).toFixed(2);
                                                    }
                                                    $$("Product_Grid").refresh();
                                                    var tot = $$("Product_Grid").getFooterNode("ProductValue").innerText;
                                                    if (tot != "" && tot != null && tot != undefined) {
                                                        $$("Projection_Value").setValue(Comma(Number(tot.toString().replace(/,/g, '')).toFixed(2)));
                                                    }
                                                    grid[no].setSelectColor = "yellow";
                                                    $$("Product_Grid").refresh();
                                                    onQuoteGenerate_Close();
                                                    $$("QuoteGenerationPopup").hide();
                                                    DateCalLoad()
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            width: 80,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("QuoteGenerationPopup").hide();
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
    });
    debugger;
   
}
function TotalGrossAmountComputeOffPreLoad() {
    debugger;
    var grid = $$("QuoteGeneration_Grid").serialize(); 
    var count = grid.length;
    var Amt = 0;
    var Amt1 = 0;
    var Rooms = 0;
    var Nights = 0;
    var calcUnits = 0;
    var RoomFID = 0;
    var NightFCID = 0;
    if (count > 0) {
        for (var i = 0; i < count; i++) {

            var Tariff = grid[i].NetTariff;
            Tariff = (Tariff == null ? "" : Tariff.toString().replace(",", ""));
            Amt = Amt + Number(Tariff.toString().replace(/,/g, ''));

            var RoomID = grid[i].RoomID;
            Rooms = Rooms + Number(RoomID);
            var Ngt = grid[i].Nights;
            Nights = Nights + Number(Ngt);
            var RoomFilCountID = grid[i].RoomID;
            RoomFID = Number(RoomFilCountID);
            var NgtFCountId = grid[i].Nights;
            NightFCID = Number(NgtFCountId);
            calcUnits += NightFCID * RoomFID;
            Amt1 = Amt1 + (Rooms*Number(Tariff.toString().replace(/,/g, '')));
        }
    }

    //var units = (Number(Rooms) * Number(Nights));
    //var ARR = (Number(Amt) / Number(units));

    var ARR = (Number(Amt) / Number(calcUnits));
    //$("#TotalGrossAmount").text(Comma(Number(Amt.toString().replace(/,/g, '')).toFixed(2)));
    $("#TotalGrossAmount").val((Number(Amt1.toString().replace(/,/g, '')).toFixed(2)));
    $("#FoTotalRooms").val(calcUnits);
    //$("#FoTotalRooms").val(Rooms);
    $("#FototalARR").val(ARR);
    $("#FoTotalNights").val(Nights);
}
function QuoteCreation() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    var dateval = CurrentDateLoadNew();
    var split = dateval.split('/');
    var date = parseInt(split[2]) + 1;
    var depdate = split[0] + '/' + split[1] + '/' + date;
    debugger;
    var RmTy = GetRoomTyFnNew();
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Quote Creation",
        id: 'QuoteCreation',
        modal: true,
        width: 700,
        close: true,
        body: {
            rows: [
                {
                    view: 'form',
                    elements: [
                        {
                            rows: [
                                {
                                    cols: [
                                           {
                                               view: "combo",
                                               label: 'Room Type',
                                               id: 'RoomType',
                                               labelWidth: 100,
                                               inputWidth: 300,
                                               options: RmTy,

                                           },
                                            {
                                                view: "text",
                                                label: 'No of Room',
                                                id: 'RoomID',
                                                labelWidth: 100,
                                                inputWidth: 300,
                                                pattern: { mask: "###", allow: /[0-9]/g },
                                                attributes: { maxlength: 3 }

                                            },
                                             
                                    ]

                                },
                                 {
                                     cols: [
                                            {
                                                view: "datepicker",
                                                label: 'Arrival',
                                                id: 'ArrivalDt',
                                                labelWidth: 100,
                                                inputWidth: 250, format:"%d/%m/%y",
                                                value: dateval


                                            },
                                             {
                                                 view: "datepicker",
                                                 label: 'Departure',
                                                 id: 'DeparturteDt',
                                                 labelWidth: 100,
                                                 inputWidth: 250, format: "%d/%m/%y",
                                                 value: depdate
                                             },

                                     ]

                                 },
                                  {
                                      cols: [
                                             {
                                                 view: 'text',
                                                 label: 'Company',
                                                 id: 'PARTY_NM',
                                                 labelWidth: 100,
                                                 inputWidth: 300
                                             },
                                              {
                                                  view: 'text',
                                                  label: 'Rate Code',
                                                  id: 'RATE_TY_NM',
                                                  labelWidth: 100,
                                                  inputWidth: 300

                                              },

                                      ]

                                  },
                                  {
                                      cols: [
                                             {
                                                 view: "text",
                                                 label: 'Adult',
                                                 id: 'Adult',
                                                 labelWidth: 100,
                                                 inputWidth: 300,
                                                 pattern: { mask: "###", allow: /[0-9]/g },
                                                 attributes: { maxlength: 3 }

                                             },
                                              {
                                                  view: "text",
                                                  label: 'Child',
                                                  id: 'Child',
                                                  labelWidth: 100,
                                                  inputWidth: 300,
                                                  pattern: { mask: "###", allow: /[0-9]/g },
                                                  attributes: { maxlength: 3 }

                                              },

                                      ]

                                  },
                                  {
                                      cols: [
                                             
                                              {
                                                  view: "text",
                                                  label: 'Dis %',
                                                  id: 'DiscPer',
                                                  labelWidth: 100,
                                                  inputWidth: 300,
                                                  attributes: { maxlength: 6 },
                                                  format: "111111.00",
                                                  pattern: { mask: "######", allow: /[0-9]/g },
                                                  on: {
                                                      onKeyPress: function (code, e) {
                                                          debugger;
                                                          if (Number(this.getValue()) > 100) {
                                                             this.setValue(100);
                                                          }
                                                          $$("DiscAmt").setValue(0);
                                                      },
                                                      onBlur: function () {
                                                          debugger;
                                                          if (Number(this.getValue()) > 100) {
                                                              this.setValue(100);
                                                          }
                                                          $$("DiscAmt").setValue(0);
                                                      },
                                                  }

                                              },
                                              {
                                                  view: "text",
                                                  label: 'Dis Amt',
                                                  id: 'DiscAmt',
                                                  labelWidth: 100,
                                                  inputWidth: 300,
                                                  attributes: { maxlength: 12 },
                                                  format: "111111.00",
                                                  pattern: { mask: "######", allow: /[0-9]/g },
                                                  on: {
                                                      onKeyPress: function (code, e) {

                                                          $$("DiscPer").setValue(0);
                                                      },
                                                      onBlur: function () {

                                                          $$("DiscPer").setValue(0);
                                                      },
                                                  }

                                              },

                                      ]

                                  },
                                 {
                                     cols: [
                                            {
                                                view: "text",
                                                label: 'Product Amt',
                                                id: 'GrossAmtOFL',
                                                labelWidth: 100,
                                                inputWidth: 300,
                                                width: 300,
                                                attributes: { maxlength: 10 },
                                                format: "111111.00",
                                                pattern: { mask: "######", allow: /[0-9]/g },

                                            },
                                            {
                                                view: 'button',
                                                label: 'Compute',
                                                width: 300,
                                                inputWidth: 80,
                                                on: {
                                                    onItemClick: function () {
                                                        ComputeValues();
                                                    }
                                                }
                                            },
                                            {}

                                     ]

                                 },
                                  {
                                      view: "text",
                                      label: 'Net Tariff',
                                      id: 'NetTariffOFL',
                                      labelWidth: 100,
                                      inputWidth: 300,
                                      attributes: { maxlength: 10 },
                                      disabled:true,
                                  },
                            ]
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
                                                               ComputeValues();
                                                               var ROOM_TYPE = $$("RoomType").getText();
                                                               var ROOM_TYPE_ID = $$("RoomType").getValue();
                                                               var CURRENCY_ID = '';
                                                               var NOofRoom = $$("RoomID").getValue();
                                                               var ARRV = $$("ArrivalDt").getValue();
                                                               var DEPART = $$("DeparturteDt").getValue();
                                                               var RATE_TY_ID = $("#RATE_TY_ID").val();
                                                               var RATE_TY_NM = $("#RATE_TY_NM").val();
                                                               var RoomID = $$("RoomID").getValue();
                                                               var PK_ID = $("#PK_ID").val();
                                                               var PLAN_ID = $("#PLAN_ID").val();
                                                               var PLAN_NM = $("#PLAN_NM").val();

                                                               var ADLT = $$("Adult").getValue();
                                                               var CHLD = $$("Child").getValue();
                                                               if (ADLT == "") ADLT = "0";
                                                               if (CHLD == "") CHLD = "0";
                                                               var dtARRV = "";
                                                               var dtARRV1 = "";
                                                               if (ARRV != null || ARRV != undefined) {
                                                                   dtARRV = ARRV;
                                                                   dtARRV = dtARRV.split('-');
                                                                   dtARRV1 = dtARRV["2"].split(' ');
                                                                   dtARRV = dtARRV1["0"] + '/' +dtARRV["1"] + '/' + dtARRV["0"];
                                                                    }
                                                               var dtDEPART = "";
                                                               var dtDEPART1 = "";
                                                               if (DEPART != null || DEPART != undefined) {
                                                                   dtDEPART = DEPART;
                                                                   dtDEPART = dtDEPART.split('-');
                                                                   dtDEPART1 = dtDEPART["2"].split(' ');
                                                                   dtDEPART =  dtDEPART1["0"] + '/' + dtDEPART["1"]+ '/' +dtDEPART["0"];
                                                               }

                                                               var datearr = $$("ArrivalDt").getText();
                                                               var datedep = $$("DeparturteDt").getText();
                                                               datearr = datearr.split('/')[2] + "-" + datearr.split('/')[1] + "-" + datearr.split('/')[0];
                                                               datedep = datedep.split('/')[2] + "-" + datedep.split('/')[1] + "-" + datedep.split('/')[0];
                                                               debugger;
                                                               var d1 = new Date(datearr);
                                                               var d2 = new Date(datedep);
                                                               if (Date.parse(d1) > Date.parse(d2)) {
                                                                   alert("Departure date greater than Arrival date....");
                                                                   return false;
                                                               }
                                                               if (!validateCompute(ROOM_TYPE, CURRENCY_ID, dtARRV, dtDEPART, RATE_TY_ID, ADLT, CHLD, RoomID))
                                                                   return false;
                                                               var PARTY_NM = $("#PARTY_NM").val();
                                                               var PARTY_ID = $("#PARTY_ID").val();
                                                               var DiscPer = $$("DiscPer").getValue();
                                                               var DiscAmt = $$("DiscAmt").getValue();
                                                               var ProductTypeId = $("#ProductTypeId").val();
                                                               var UnitTyID = $("#UnitTyID").val();

                                                               var Nights = "";
                                                               var Table = {};
                                                               Table["ARRV"] = dtARRV;
                                                               Table["DEPART"] = dtDEPART;
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
                                                                   }
                                                               });

                                                               var GuestName = $("#GuestName").val();
                                                               var GuestID = $("#GuestID").val();
                                                               var Narration = $("#Narration").val();
                                                               var QuoteNo = $("#QuoteNo").val();
                                                               var QuoteDT = $("#QuoteDT").val();
                                                               var PmsBookingNo = $("#PmsBookingNo").val();
                                                               var GuestFNM = $("#GuestFNM").val();
                                                               var GuestLNM = $("#GuestLNM").val();
                                                               var GuestTLE = $("#GuestTLE").val();
                                                               var SALE_PER_ID = SALE_PER_ID;

                                                               var GrossAmt = $$("GrossAmt").getValue();
                                                               var NetTariff = $$("NetTariff").getValue();
                                                               var QuoteGenerateTy = $("#QuoteGenerateTy").val();
                                                               var DefaultProperty = $$("Property").getValue();
                                                               var TotalNights = parseInt(NOofRoom) * parseInt(Nights);
                                                               var TotalTariff = parseInt(NOofRoom) * parseInt(NetTariff);
                                                               if (QuoteGenerateTy == "") {
                                                                  
                                                                   $$("QuoteGeneration_Grid").add({
                                                                       ArraivalDt: dtARRV,
                                                                       DepartureDt: dtDEPART,
                                                                       RoomType: ROOM_TYPE,
                                                                       RoomID: NOofRoom,
                                                                       Adult: ADLT,
                                                                       Child: CHLD,
                                                                       RATE_TY_ID: RATE_TY_ID,
                                                                       GrossAmt: GrossAmt,
                                                                       DiscPer: DiscPer,
                                                                       NetTariff: NetTariff,
                                                                       RoomTyid: ROOM_TYPE_ID,
                                                                       DiscAmt: DiscAmt,
                                                                       Currency: CURRENCY_ID,
                                                                       RATE_TY_NM: RATE_TY_NM,
                                                                       PARTY_NM: PARTY_NM,
                                                                       PARTY_ID: PARTY_ID,
                                                                       PROD_ID: ProductTypeId,
                                                                       UnitTyID: UnitTyID,
                                                                       Nights: Nights,
                                                                       OtherCharges: "",
                                                                       PK_ID: PK_ID,
                                                                       PLAN_ID: PLAN_ID,
                                                                       PLAN_NM: PLAN_NM,
                                                                       TotalNights: TotalNights,
                                                                       TotalTariff: TotalTariff,
                                                                       RegNoBK: '0',
                                                                       ReserveNo: '0',
                                                                       TariffBK:'0'

                                                                   });
                                                                   $$("QuoteGeneration_Grid").refresh();
                                                               }
                                                               else {
                                                                   var no = QuoteGenerateTy;
                                                                  var GetVal= $$("QuoteGeneration_Grid").getSelectedItem();
                                                                  GetVal.ArraivalDt = dtARRV;
                                                                  GetVal.DepartureDt = dtDEPART;
                                                                  GetVal.RoomType = ROOM_TYPE;
                                                                  GetVal.RoomID = NOofRoom;
                                                                  GetVal.Adult = ADLT;
                                                                  GetVal.Child = CHLD;
                                                                  GetVal.RATE_TY_ID = RATE_TY_ID;
                                                                  GetVal.GrossAmt = GrossAmt;
                                                                  GetVal.DiscPer = DiscPer;
                                                                  GetVal.NetTariff = NetTariff;
                                                                  GetVal.RoomTyid = ROOM_TYPE_ID;
                                                                  GetVal.DiscAmt = DiscAmt;
                                                                  GetVal.Currency = CURRENCY_ID;
                                                                  GetVal.RATE_TY_NM = RATE_TY_NM;
                                                                  GetVal.PLAN_ID = PLAN_ID;
                                                                  GetVal.PLAN_NM = PLAN_NM;
                                                                  GetVal.PK_ID = PK_ID;
                                                                  GetVal.PARTY_NM = PARTY_NM;
                                                                  GetVal.PARTY_ID = PARTY_ID;
                                                                  GetVal.PROD_ID = ProductTypeId;
                                                                  GetVal.UnitTyID = UnitTyID;
                                                                  GetVal.Nights = Nights;
                                                                  GetVal.OtherCharges = "";
                                                                  GetVal.TotalNights = TotalNights;
                                                                  GetVal.TotalTariff = TotalTariff;

                                                                   $$("QuoteGeneration_Grid").refresh();
                                                               }
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
                                                           }
                                                       }
                                                   },
                                                   {
                                                       view: 'button',
                                                       type: "icon",
                                                       icon: "wxi-close",
                                                       label: 'Cancel',
                                                       width: 100,
                                                       align: "right",
                                                       on: {
                                                           onItemClick: function () {
                                                               $$("QuoteCreation").hide();
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
            ]
        }
    }).show();
}
function CurrentDateLoadNew() {
    var rtn = '';
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/CurrentDateLoad",
        data: '',
        async: false,
        success: function (data) {
            rtn = data;
        }
    });
    return rtn;
}
function GetRoomTyFnNew() {
    var rowDatad = [];
    $.ajax({
        type: "POST",
        async: false,
        url: "/SalesAndMarket/GetRoomTyFnNew",
        data: { 'PROPID': $$("Property").getValue() },
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
function QuoteCreationOffline() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    var dateval = CurrentDateLoadNew();
    var split = dateval.split('/');
    var date = parseInt(split[2]) + 1;
    var depdate = split[0] + '/' + split[1] + '/' + date;
    var RmTy = GetRoomTyFnNew();
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        //head: "Quote Creation Offline",
        head: "Worksheet Detail",
        id: 'QuoteCreationOffline',
        modal: true,
        width: 700,
        close: true,
        body: {
            rows: [
                {
                    view: 'form',
                    elements: [
                        {
                            rows: [
                                {
                                    cols: [
                                           {
                                               view: "combo",
                                               label: 'Room Type',
                                               id: 'RoomTypeOFL',
                                               labelWidth: 100,
                                               inputWidth: 300,
                                               options: RmTy,

                                           },
                                            {
                                                view: "text",
                                                label: 'No of Room',
                                                id: 'RoomIDOFL',
                                                labelWidth: 100,
                                                pattern: { mask: "###", allow: /[0-9]/g },
                                                inputWidth: 300,
                                                attributes: { maxlength: 3 }

                                            },

                                    ]

                                },
                                 {
                                     cols: [
                                            {
                                                view: "datepicker",
                                                label: 'Arrival',
                                                id: 'ArrivalDtOFL',
                                                labelWidth: 100,
                                                inputWidth: 250, format: "%d/%m/%Y", //"dd/MM/yyyy",
                                                value: dateval,
                                                stringResult: true,
                                                on: {
                                                    onChange: function (newval,oldval) {
                                                        SMFromDateChangeOff(newval);
                                                    }
                                                }


                                            },
                                             {
                                                 view: "datepicker",
                                                 label: 'Departure',
                                                 id: 'DeparturteDtOFL',
                                                 labelWidth: 100,
                                                 stringResult: true,
                                                 inputWidth: 250, format: "%d/%m/%Y", //"dd/MM/yyyy"
                                                 value: depdate,
                                                 on: {
                                                     onChange: function (newval, oldval) {
                                                         SMToDateChangeOff(newval);
                                                     }
                                                 }
                                             },

                                     ]

                                 },
                                  {
                                      cols: [
                                             {
                                                 view: "text",
                                                 label: 'Adult',
                                                 id: 'AdultOFL',
                                                 labelWidth: 100,
                                                 inputWidth: 300,
                                                 pattern: { mask: "###", allow: /[0-9]/g },
                                                 attributes: { maxlength: 3 }

                                             },
                                              {
                                                  view: "text",
                                                  label: 'Child',
                                                  id: 'ChildOFL',
                                                  labelWidth: 100,
                                                  inputWidth: 300,
                                                  pattern: { mask: "###", allow: /[0-9]/g },
                                                  attributes: { maxlength: 3 }

                                              },

                                      ]

                                  },
                                  {
                                      cols: [
                                             {
                                                 view: "text",
                                                 //label: 'Product Amt',
                                                 label: 'Price',
                                                 id: 'GrossAmtOFL',
                                                 labelWidth: 100,
                                                 inputWidth: 300,
                                                 width: 300,
                                                 attributes: { maxlength: 10},
                                                 format: "111111.00",
                                                 pattern: { mask: "######", allow: /[0-9]/g },

                                             },
                                             {
                                                 view: 'button',
                                                 label: 'Compute',
                                                 width: 300,
                                                 inputWidth: 80,
                                                 on: {
                                                     onItemClick: function () {
                                                         ComputeValuesOff();
                                                     }
                                                 }
                                             },
                                             {}
                                              
                                      ]

                                  },
                                  {
                                      view: "text",
                                      label: 'Net Tariff',
                                      id: 'NetTariffOFL',
                                      labelWidth: 100,
                                      inputWidth: 300,
                                      attributes: { maxlength: 10 },
                                      disabled: true,

                                  },
                                   {
                                       view: "text",
                                       label: 'Total Value',
                                       id: 'TotValueOFL',
                                       labelWidth: 100,
                                       inputWidth: 300,
                                       attributes: { maxlength: 10 },
                                       disabled: true,
                                       hidden:true

                                   },
                            ]
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
                                                               debugger;
                                                               ComputeValuesOff();
                                                               var ROOM_TYPE = $$("RoomTypeOFL").getText();
                                                               var ROOM_TYPE_ID = $$("RoomTypeOFL").getValue();
                                                               var CURRENCY_ID = "";
                                                               var ARRV = $$("ArrivalDtOFL").getValue();
                                                               var DEPART = $$("DeparturteDtOFL").getValue();

                                                               var dtARRV = "";
                                                               var dtARRV1 = "";
                                                               if (ARRV != null || ARRV != undefined) {
                                                                   dtARRV = ARRV;
                                                                   dtARRV = dtARRV.split('-');
                                                                   dtARRV1 = dtARRV["2"].split(' ');
                                                                   dtARRV = dtARRV1["0"] + '/' +dtARRV["1"] + '/' + dtARRV["0"];
                                                               }
                                                               var dtDEPART = "";
                                                               var dtDEPART1 = "";
                                                               if (DEPART != null || DEPART != undefined) {
                                                                   dtDEPART = DEPART;
                                                                   dtDEPART = dtDEPART.split('-');
                                                                   dtDEPART1 = dtDEPART["2"].split(' ');
                                                                   dtDEPART =dtDEPART1["0"] + '/' + dtDEPART["1"] + '/' +dtDEPART["0"];
                                                               }
                                                               var datearr = $$("ArrivalDtOFL").getText();
                                                               var datedep = $$("DeparturteDtOFL").getText();
                                                               datearr = datearr.split('/')[2] + "-" + datearr.split('/')[1] + "-" + datearr.split('/')[0];
                                                               datedep = datedep.split('/')[2] + "-" + datedep.split('/')[1] + "-" + datedep.split('/')[0];
                                                               debugger;
                                                               var d1 = new Date(datearr);
                                                               var d2 = new Date(datedep);
                                                               if (Date.parse(d1) > Date.parse(d2)) {
                                                                   alert("Departure date greater than Arrival date....");
                                                                   return false;
                                                               }
                                                               var NoOfRooms = $$("RoomIDOFL").getValue();
                                                               var RATE_TY_ID = "";
                                                               var RATE_TY_NM = "";
      
                                                               var PK_ID = "";
                                                               var PLAN_ID = "";
                                                               var PLAN_NM = "";
      
                                                               var ADLT = $$("AdultOFL").getValue();
                                                               var CHLD = $$("ChildOFL").getValue();
                                                               if (ADLT == "") ADLT = "0";
                                                               if (CHLD == "") CHLD = "0";
                                                               if (!validateComputeOff(ROOM_TYPE, dtARRV, dtDEPART, ADLT, CHLD, NoOfRooms))
                                                                   return false;
                                                               var PARTY_NM ="";
                                                               var PARTY_ID = "";
                                                               var DiscPer = "";
                                                               var DiscAmt ="";
                                                               var ProductTypeId = $("#ProductTypeId").val();
                                                               var UnitTyID = $("#UnitTyID").val();

                                                               var Nights = "";
                                                               var Table = {};
                                                               Table["ARRV"] = dtARRV;
                                                               Table["DEPART"] = dtDEPART;
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
                                                                       $("#Nights").val(Nights);
                                                                       
                                                                       var GuestName = $("#GuestName").val();
                                                                       var GuestID = $("#GuestID").val();
                                                                       var Narration = $("#Narration").val();
                                                                       var QuoteNo = $("#QuoteNo").val();
                                                                       var QuoteDT = $("#QuoteDT").val();
                                                                       var PmsBookingNo = $("#PmsBookingNo").val();
                                                                       var GuestFNM = $("#GuestFNM").val();
                                                                       var GuestLNM = $("#GuestLNM").val();
                                                                       var GuestTLE = $("#GuestTLE").val();
                                                                       var SALE_PER_ID = SALE_PER_ID;

                                                                       var GrossAmt = $$("GrossAmtOFL").getValue();
                                                                       var NetTariff = $$("NetTariffOFL").getValue();
                                                                       var QuoteGenerateTy = $("#QuoteGenerateTy").val();
                                                                       var DefaultProperty = $$("Property").getValue()// $("#DefaultProperty").data('kendoDropDownList').value();
                                                                       var TotalNights = parseInt(NoOfRooms) * parseInt(Nights);
                                                                       var TotalTariff = parseInt(NoOfRooms) * parseInt(NetTariff);
                                                                       if (QuoteGenerateTy == "") {
                                                                           $$("QuoteGeneration_Grid").add({
                                                                               ArraivalDt: dtARRV,
                                                                               DepartureDt: dtDEPART,
                                                                               RoomType: ROOM_TYPE,
                                                                               RoomID: NoOfRooms,
                                                                               Adult: ADLT,
                                                                               Child: CHLD,
                                                                               RATE_TY_ID: RATE_TY_ID,
                                                                               GrossAmt: GrossAmt,
                                                                               DiscPer: DiscPer,
                                                                               NetTariff: NetTariff,
                                                                               RoomTyid: ROOM_TYPE_ID,
                                                                               DiscAmt: DiscAmt,
                                                                               Currency: CURRENCY_ID,
                                                                               RATE_TY_NM: RATE_TY_NM,
                                                                               PARTY_NM: PARTY_NM,
                                                                               PARTY_ID: PARTY_ID,
                                                                               PROD_ID: ProductTypeId,
                                                                               UnitTyID: UnitTyID,
                                                                               Nights: Nights,
                                                                               OtherCharges: "",
                                                                               PK_ID: PK_ID,
                                                                               PLAN_ID: PLAN_ID,
                                                                               PLAN_NM: PLAN_NM,
                                                                               TotalNights: TotalNights,
                                                                               TotalTariff: TotalTariff
                                                                           });
                                                                           $$("QuoteGeneration_Grid").refresh();
                                                                       } else {
                                                                           var no = QuoteGenerateTy;
                                                                         var getItem=  $$("QuoteGeneration_Grid").getSelectedItem();
                                                                         getItem.ArraivalDt = dtARRV;
                                                                         getItem.DepartureDt = dtDEPART;
                                                                           getItem.RoomType = ROOM_TYPE;
                                                                           getItem.RoomID = NoOfRooms;
                                                                           getItem.Adult = ADLT;
                                                                           getItem.Child = CHLD;
                                                                           getItem.RATE_TY_ID = RATE_TY_ID;
                                                                           getItem.GrossAmt = GrossAmt;
                                                                           getItem.DiscPer = DiscPer;
                                                                           getItem.NetTariff = NetTariff;
                                                                           getItem.RoomTyid = ROOM_TYPE_ID;
                                                                           getItem.DiscAmt = DiscAmt;
                                                                           getItem.Currency = CURRENCY_ID;
                                                                           getItem.RATE_TY_NM = RATE_TY_NM;
                                                                           getItem.PLAN_ID = PLAN_ID;
                                                                           getItem.PLAN_NM = PLAN_NM;
                                                                           getItem.PK_ID = PK_ID;
                                                                           getItem.PARTY_NM = PARTY_NM;
                                                                           getItem.PARTY_ID = PARTY_ID;
                                                                           getItem.PROD_ID = ProductTypeId;
                                                                           getItem.UnitTyID = UnitTyID;
                                                                           getItem.Nights = Nights;
                                                                           getItem.OtherCharges = "";
                                                                           getItem.TotalNights = TotalNights;
                                                                           getItem.TotalTariff = TotalTariff;
                                                                           $$("QuoteGeneration_Grid").refresh();
                                                                       }
                                                                   }
                                                               });
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
                                                                       $$("QuoteCreationOffline").hide();
                                                           }
                                                       }
                                                   },
                                                   {
                                                       view: 'button',
                                                       type: "icon",
                                                       icon: "wxi-close",
                                                       label: 'Cancel',
                                                       width: 100,
                                                       align: "right",
                                                       on: {
                                                           onItemClick: function () {
                                                               $$("QuoteCreationOffline").hide();
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
            ]
        }
    }).show();
}
function BookingCreationIND() {
    var rowDatad = "";
    $.ajax({
        type: "POST",
        async: false,
        url: "/SalesAndMarket/BookingCreationIND",
        //dataType:JSON,
        success: function (d) {
            debugger;
            if (d != "") {
                rowDatad = d;
            }
        }
    });
    return rowDatad;
}
function Comma(Num) { //function to add commas to textboxes

    Num += '';
    Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    x = Num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}
    function ComputeValues()
    {
        try{        
            $("#pageProgressdiv").show();
            var ROOM_TYPE = $$("RoomType").getValue();
            var DefaultProperty = $$("RoomType").getValue();
            var CURRENCY_ID = $$("RoomType").getValue();
            var ARRV = $$("ArrivalDt").getValue();
            var DEPART = $$("DeparturteDt").getValue();
            var RoomID = $$("RoomID").getValue();

        
            var PLAN = "";
            var RATE_TY_ID = $("#RATE_TY_ID").val();
            var ADLT = $$("Adult").getValue();
            var CHLD = $$("Child").getValue();
            var CHLD1 = "0";
            var CHLD2 = "0";
            var PAX = "0";
            if (ADLT == "") ADLT = "0";
            if (CHLD == "") CHLD = "0";
            PAX = Number(ADLT) + Number(CHLD);

            if (!validateCompute(ROOM_TYPE, CURRENCY_ID, ARRV, DEPART, RATE_TY_ID, ADLT, CHLD, RoomID))
            {                return false;
            }
            var dataparam = {};
            dataparam["ROOM_TYPE"] = ROOM_TYPE;
            dataparam["RemoteId"] = DefaultProperty;
            dataparam["CURRENCY_ID"] = CURRENCY_ID;
            dataparam["ARRV"] = ARRV;
            dataparam["DEPART"] = DEPART;
            dataparam["PLAN"] = PLAN;
            dataparam["RATE_TY_ID"] = RATE_TY_ID;
            dataparam["ADLT"] = ADLT;
            dataparam["CHLD"] = CHLD;
            dataparam["CHLD1"] = CHLD1;
            dataparam["CHLD2"] = CHLD2;
            dataparam["PAX"] = PAX;

            var DataVal = JSON.stringify(dataparam);
            $.ajax({
                type: "POST",
                contentType: "application/json",
                accepts: "application/json",
                dataType: "json",
                url: "/SalesAndMarket/GET_TARIFF_VAL",          
                charset: 'utf-8',
                data: DataVal,
               async: false,
                success: function (data) {
                    var Amt = Number(data);
                    Amt = Number(Amt) * Number(RoomID);
                    $$("GrossAmt").setValue(Comma(Number(Amt.toString().replace(/,/g, '')).toFixed(2)));
                    var DiscPer = $$("DiscPer").getValue();
                    var DiscAmt = $$("DiscAmt").getValue();
                    if (DiscPer != "" && DiscPer != "0") {
                        DiscPer = DiscPer - 0;
                        var Amt2 = (Amt * (DiscPer / 100)).toFixed(2);
                        $$("DiscAmt").setValue(Comma(Number(Amt2).toFixed(2)));
                        var Amt3 = Number(Amt) - Number(Amt2);
                        $$("NetTariff").setValue(Comma(Number(Amt3).toFixed(2)));
                    }
                    else if (DiscAmt != "" && DiscAmt != "0") {
                        var Amt2 = $$("DiscAmt").getValue();
                        var Amt3 = Number(Amt) - Number(Amt2.toString().replace(/,/g, ''));
                        $$("NetTariff").setValue(Comma(Number(Amt3).toFixed(2)));
                    }
                    else {
                        $$("NetTariff").setValue(Comma(Number(Amt).toFixed(2)));
                    }
                }
            });
        }
        catch (e) {
        }
    }
    function validateCompute(ROOM_TYPE, CURRENCY_ID, ARRV, DEPART, RATE_TY_ID, ADLT, CHLD, RoomID) {

        if (ROOM_TYPE == "") {
           alert("Room Type Cannot be Empty.");
            
           
            return false;
        }
        if (RATE_TY_ID == "") {
           alert("Rate Type Cannot be Empty.");
            
           
            return false;
        }
        if (CURRENCY_ID == "") {
           alert("Currency Cannot be Empty.");
            
           
            return false;
        }

        if (ARRV == "") {
           alert("Arraival Cannot be Empty.");
            
           
            return false;
        }

        if (DEPART == "") {
           alert("Departure Cannot be Empty.");
            
           
            return false;
        }
        if (RoomID == "") {
           alert("No of Rooms Cannot be Empty.");
            
           
            return false;
        }
        if (ADLT == "" && CHLD == "") {
           alert(" Pax Cannot be Empty.");
            
           
            return false;
        }
        else if (ADLT == "0" && CHLD == "0") {
           alert(" Pax Cannot be Empty.");
            
           
            return false;
        }
        return true;
    }
    function SMFromDateChangeOff(Fromval) {
        var From = Fromval;
        var To = $$("DeparturteDtOFL").getValue();
        $.ajax({
            type: "POST",
            url: "/SalesAndMarket/FTDateValidation",
            cache: false,
            charset: 'utf-8',
            data: "F=" + From + "&T=" + To,
            success: function (data) {
                if (data.d != "") {
                    debugger;
                    $("#ArrivalDt").val(To);
                    $("#ArrivalDtOff").val("");//S.VijayaLakshmi''6/5/20
                    alert(" Arrival Date Cannot be Greater than Departure Date.");
                   
                    
                }
            }
        });

    }
    function SMToDateChangeOff(Toval) {
        var From = $$("ArrivalDtOFL").getValue();
        var To = Toval;
        $.ajax({
            type: "POST",
            url: "/SalesAndMarket/FTDateValidation",
            cache: false,
            charset: 'utf-8',
            data: "F=" + From + "&T=" + To,
            success: function (data) {
                if (data.d != "") {
                    alert(" Arrival Date Cannot be Greater than Departure Date.");
                }
            }
        });
    }
    function ComputeValuesOff() {
        debugger;

        try {
            var ROOM_TYPE = $$("RoomTypeOFL").getValue();
            var DefaultProperty = $$("Property").getValue(); //$("#DefaultProperty").data('kendoDropDownList').value();
            var ARRV = $$("ArrivalDtOFL").getValue();
            var DEPART = $$("DeparturteDtOFL").getValue();
            var NoOfRooms = $$("RoomIDOFL").getValue();

            var PLAN = "";
            var RATE_TY_ID = "";
            var ADLT = $$("ArrivalDtOFL").getValue();
            var CHLD = $$("DeparturteDtOFL").getValue();
            var CHLD1 = "0";
            var CHLD2 = "0";
            var PAX = "0";
            if (ADLT == "") ADLT = "0";
            if (CHLD == "") CHLD = "0";
            PAX = Number(ADLT) + Number(CHLD);

            if (!validateComputeOff(ROOM_TYPE, ARRV, DEPART, ADLT, CHLD, NoOfRooms)) {
                return false;
            }


            var Nights = "";
            var Table = {};
            Table["ARRV"] = ARRV;
            Table["DEPART"] = DEPART;
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
                    $("#Nights").val(Nights);
                    var Amt = $$("GrossAmtOFL").getValue();
                    Amt = Amt.toString().replace(/,/g, '');
                    $$("GrossAmtOFL").setValue(Number(Amt).toFixed(2));
                    //Amt = ((Number(Amt) * Number(NoOfRooms)) * Nights);
                    Amt = ((Number(Amt)) * Nights);
                    var DiscPer = 0;
                    var DiscAmt = 0;
                    if (DiscPer != "" && DiscPer != "0") {
                        DiscPer = DiscPer - 0;
                        var Amt2 = (Amt * (DiscPer / 100)).toFixed(2);
                        $("#DiscAmt").val(Comma(Number(Amt2).toFixed(2)));
                        var Amt3 = Number(Amt) - Number(Amt2);
                        $$("NetTariffOFL").setValue(Comma(Number(Amt3).toFixed(2)));
                    }
                    else if (DiscAmt != "" && DiscAmt != "0") {
                        var Amt2 = $("#DiscAmt").val();
                        var Amt3 = Number(Amt) - Number(Amt2.toString().replace(/,/g, ''));
                        //$("#NetTariffOff").val(Comma(Number(Amt3).toFixed(2)));
                        $$("NetTariffOFL").setValue((Number(Amt3).toFixed(2)));
                    }
                    else {
                        //$("#NetTariffOff").val(Comma(Number(Amt).toFixed(2)));
                        $$("NetTariffOFL").setValue((Number(Amt).toFixed(2)));
                    }
                    if (NoOfRooms > 1) {
                        var totval = Number(NoOfRooms) * Number($$("NetTariffOFL").getValue());
                        $$("TotValueOFL").setValue(totval.toFixed(2));
                        $$("TotValueOFL").show();
                    }
                }
            });



        }
        catch (e) {
        }
    }
    function validateComputeOff(ROOM_TYPE, CURRENCY_ID, ARRV, DEPART, ADLT, CHLD, NoOfRooms) {

        if (ROOM_TYPE == "") {
            alert("Room Type Cannot be Empty.");
           
            
            return false;
        }
        if (ARRV == "") {
            alert("Arraival Cannot be Empty.");
           
            
            return false;
        }

        if (DEPART == "") {
            alert("Departure Cannot be Empty.");
           
            
            return false;
        }
        if (NoOfRooms == "") {
            alert("No of Rooms Cannot be Empty.");
           
            
            return false;
        }
        if (ADLT == "" && CHLD == "") {
            alert(" Pax Cannot be Empty.");
           
            
            return false;
        }
        else if (ADLT == "0" && CHLD == "0") {
            alert(" Pax Cannot be Empty.");
           
            
            return false;
        }
        return true;
    }
    function BanqWorksheetPopup() {
        var string1 = webix.i18n.numberFormat("123.45");
        var string2 = webix.i18n.intFormat("123");
        var string3 = webix.i18n.priceFormat("123.45");
        webix.editors.myeditor1 = webix.extend({
            render: function () {
                return webix.html.create("div", {
                    "class": "webix_dt_editor"
                }, "<input type='text' maxlength='9'/>");
            }
        }, webix.editors.text);
        webix.editors.myeditor2 = webix.extend({
            render: function () {
                return webix.html.create("div", {
                    "class": "webix_dt_editor"
                }, "<input type='text'  maxlength='3'/>");
            }
        }, webix.editors.text);
        webix.editors.NotesCM = webix.extend({
            render: function () {
                return webix.html.create("div", {
                    "class": "webix_dt_editor"
                }, "<input type='text'  maxlength='500'/>");
            }
        }, webix.editors.text);
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Banquet WorkSheet",
        id: 'BanqWorksheetPopup',
        modal: true,
        width: 1100,
        close: true,
        body: {
            rows: [
                {
                    cols: [{
                        view: 'button',
                        type: "icon",
                        icon: "wxi-plus",
                        label: 'Add',
                        name: 'BanqWorksheet_Btn',
                        id: 'BanqWorksheet_Btn',
                        inputWidth: 70,
                        minWidth: 30,
                        align: "right",
                        on: {
                            onItemClick: function () {
                                var ProductTypeId = $("#ProductTypeId").val();
                                var UnitTyID = $("#UnitTyID").val();
                                $$("BanqWorksheet_Grid").add({
                                    ProductQty: '',
                                    ProductValue: '',
                                    CompanyDetail: $$("Organization").getValue(),
                                    Comments: '',
                                    DATE: new Date(),
                                    CalcTY: 'APC',
                                    CalcValue: '',
                                    PROD_ID: ProductTypeId,
                                    UnitTyID: UnitTyID,
                                });
                                $$("BanqWorksheet_Grid").refresh();
                            }
                        }
                    },
                    {
                        view: "button",
                        type: "icon",
                        icon: "wxi-trash",
                        label: "",
                        id: "BanqWorksheet_Del",
                        width: 30,
                        click: function () {
                            $$("BanqWorksheet_Grid").editCancel();
                            $$("BanqWorksheet_Grid").remove($$("BanqWorksheet_Grid").getSelectedId());
                            $$("BanqWorksheet_Grid").refresh();
                            Banq_grid1 = [];
                            $.each($$("BanqWorksheet_Grid").serialize(), function (key, value) {
                                value.Active = 1;
                                value.ID = ++k;
                                Banq_grid1.push(value);
                            });
                            var grid = $$("BanqWorksheet_Grid").serialize();
                            var TOTALGross = 0;
                            var TOTALUnits = 0;
                            var TOTALAPC = 0;
                            for (var i = 0; i < grid.length; i++) {
                                var Values = grid[i].ProductValue;
                                if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                                    TOTALGross = Number(TOTALGross) + Number(Values);
                                }
                                var Unitis = grid[i].ProductQty;
                                if (Unitis != "" && Unitis != undefined && Unitis != null && Unitis != "0" && Unitis != "0.00") {
                                    TOTALUnits = Number(TOTALUnits) + Number(Unitis);
                                }
                                var CalcValue = grid[i].CalcValue;
                                if (CalcValue != "" && CalcValue != undefined && CalcValue != null && CalcValue != "0" && CalcValue != "0.00") {
                                    TOTALAPC = Number(TOTALAPC) + Number(CalcValue);
                                }
                            }
                            $$("TotalGrossAmountBQ").setValue(Number(TOTALGross).toFixed(2));
                            $$("TotalGrossUnitsBQ").setValue(TOTALUnits);
                            $("#BqAPCTotal").val(TOTALAPC);
                        },
                        align: "right"
                    }
                    ]
                },
                {
                    id: "BanqWorksheet_Grid",
                    select: 'row',
                    view: "datatable",
                    editable: true,
                    columns: [
                            { id: "DATE", header: 'Date',editor:"date",format : webix.Date.dateToStr("%d/%m/%Y"),width: 110, css: { 'text-align': 'center ! important' } },
                            { id: "Comments", header: 'Narration', editor: "NotesCM", width: 350, css: { 'text-align': 'center ! important' } },
                            { id: "CompanyDetail", header: 'Company', width: 300, css: { 'text-align': 'center ! important' } },
                            { id: "ProductValue", header: 'Value', editor: "myeditor1", numberFormat: '111111111.00', width: 80, css: { 'text-align': 'right ! important' } },
                            { id: "ProductQty", header: 'Units', editor: "myeditor2", width: 80, css: { 'text-align': 'right ! important' }, numberFormat: '11111' },
                            { id: "CalcTY", header: ' ', width: 80, css: { 'text-align': 'right ! important' } },
                            { id: "CalcValue", header: ' ',  width: 80,editor: "myeditor1", numberFormat: '111111111.00', css: { 'text-align': 'right ! important' } },
                            { id: "PROD_ID", hidden: true },
                            { id: "UnitTyID", hidden: true },
                    ],

                    height: 400,
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            var getval = this.getItem(id.row);
                            var dataval = $$("Competitor_Grid").getSelectedItem();
                            dataval.CompetitorTy = getval.GRP_NAME;
                            dataval.CompetitorTyId = getval.grp_id;
                            $$("Competitor_Grid").refresh();
                            $$("CompetitorSearchPOP").hide();
                        },
                        'onEditorChange': function (cell, value) {
                            debugger;
                            var getval = this.getItem(cell.row);
                            if (cell.column == 'ProductValue' || cell.column == 'ProductQty' || cell.column == 'CalcValue') {
                                var Values = 0;
                                var Units = 0;
                                if (cell.column == "ProductQty") {
                                    Values = this.getItem(cell.row).ProductValue;
                                    if (Values == "" || Values == undefined || Values == null || Values == "0" || Values == "0.00") {
                                        Values = this.getItem(cell.row).CalcValue;
                                    }
                                    Units = value;
                                }
                                else if (cell.column == "ProductValue") {
                                    Values = value;
                                    Units = this.getItem(cell.row).ProductQty;
                                }
                                else if (cell.column == "CalcValue") {
                                    Values = value;
                                    Units = this.getItem(cell.row).ProductQty;
                                }
                                var CalcValue = 0;
                                var PrdValue = 0;
                                if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                                    Values = Values.toString().replace(/,/g, '');
                                    if (Units != "" && Units != undefined && Units != null && Units != "0") {
                                        CalcValue = parseFloat(Number(Values) / Number(Units)).toFixed(2);
                                        PrdValue = parseFloat(Number(Values) * Number(Units)).toFixed(2);
                                    }
                                }
                                if (cell.column == "CalcValue") {
                                    this.getItem(cell.row).CalcValue = parseFloat(Number(Values)).toFixed(2);
                                    this.getItem(cell.row).ProductValue = parseFloat(Number(PrdValue)).toFixed(2);
                                    this.getItem(cell.row).ProductQty = Units;
                                }
                                if (cell.column == "ProductValue") {
                                    this.getItem(cell.row).CalcValue = CalcValue;
                                    this.getItem(cell.row).ProductValue = parseFloat(Number(Values)).toFixed(2);
                                    this.getItem(cell.row).ProductQty = Units;
                                }
                                if (cell.column == "ProductQty") {
                                    var Values1 = 0;
                                    this.getItem(cell.row).ProductQty = Units;
                                    Values1 = this.getItem(cell.row).ProductValue;
                                    if (Values1 == "" || Values1 == undefined || Values1 == null || Values1 == "0" || Values1 == "0.00") {
                                        this.getItem(cell.row).CalcValue = Values;
                                        this.getItem(cell.row).ProductValue = parseFloat(Number(PrdValue)).toFixed(2);
                                    }
                                    else {
                                        this.getItem(cell.row).CalcValue = CalcValue;
                                        this.getItem(cell.row).ProductValue = parseFloat(Number(Values)).toFixed(2);
                                    }

                                }
                                this.refresh();
                                var grid = this.serialize();
                                var TOTALGross = 0;
                                var TOTALUnits = 0;
                                var TOTALAPC = 0;
                                for (var i = 0; i < grid.length; i++) {
                                    var Values = grid[i].ProductValue;
                                    if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                                        TOTALGross = Number(TOTALGross) + Number(Values);
                                    }
                                    var Unitis = grid[i].ProductQty;
                                    if (Unitis != "" && Unitis != undefined && Unitis != null && Unitis != "0" && Unitis != "0.00") {
                                        TOTALUnits = Number(TOTALUnits) + Number(Unitis);
                                    }
                                    var CalcValue = grid[i].CalcValue;
                                    if (CalcValue != "" && CalcValue != undefined && CalcValue != null && CalcValue != "0" && CalcValue != "0.00") {
                                        TOTALAPC = Number(TOTALAPC) + Number(CalcValue);
                                    }
                                }
                                $$("TotalGrossAmountBQ").setValue(Number(TOTALGross).toFixed(2));
                                $$("TotalGrossUnitsBQ").setValue(TOTALUnits);
                                $("#BqAPCTotal").val(TOTALAPC);

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
                                    labelWidth: 200,
                                },
                                 {
                                     view: 'text',
                                     label: 'Gross Amount ',
                                     name: 'TotalGrossAmountBQ',
                                     id: 'TotalGrossAmountBQ',
                                     labelWidth: 100,
                                     inputWidth: 200,
                                     disabled:true,
                                 },
                                {
                                    view: 'text',
                                    label: 'Total Units ',
                                    name: 'TotalGrossUnitsBQ',
                                    id: 'TotalGrossUnitsBQ',
                                    labelWidth: 100,
                                    inputWidth: 200,
                                    disabled: true,
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
                                                    debugger;

                                                    $$("BanqWorksheet_Grid").editCancel();
                                                    $$("BanqWorksheet_Grid").refresh();
                                                    var getval = $$("BanqWorksheet_Grid").serialize();
                                                    for (var i = 0; i < getval.length; i++) {
                                                        var _arrValues = getval[i].CalcValue;
                                                        var Values = getval[i].ProductValue;
                                                        var Units = getval[i].ProductQty;
                                                        var CalcValue = 0;
                                                       
                                                        if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                                                            if (Units != "" && Units != undefined && Units != null && Units != "0") {
                                                                CalcValue = (Number(Values) / Number(Units));
                                                            }
                                                            else CalcValue = _arrValues;

                                                        }
                                                        getval[i].CalcValue = CalcValue;
                                                    }
                                                    $$("BanqWorksheet_Grid").refresh();
                                                    var grid = $$("BanqWorksheet_Grid").serialize();
                                                        var TOTALGross = 0;
                                                        var TOTALUnits = 0;
                                                        var TOTALAPC = 0;
                                                        for (var i = 0; i < grid.length; i++) {
                                                            var Values = grid[i].ProductValue;
                                                            if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                                                                TOTALGross = Number(TOTALGross) + Number(Values);
                                                            }
                                                            var Unitis = grid[i].ProductQty;
                                                            if (Unitis != "" && Unitis != undefined && Unitis != null && Unitis != "0" && Unitis != "0.00") {
                                                                TOTALUnits = Number(TOTALUnits) + Number(Unitis);
                                                            }
                                                            var CalcValue = grid[i].CalcValue;
                                                            if (CalcValue != "" && CalcValue != undefined && CalcValue != null && CalcValue != "0" && CalcValue != "0.00") {
                                                                TOTALAPC = Number(TOTALAPC) + Number(CalcValue);
                                                            }
                                                        }
                                                        $$("TotalGrossAmountBQ").setValue(Number(TOTALGross).toFixed(2));
                                                        $$("TotalGrossUnitsBQ").setValue(TOTALUnits);
                                                        $("#BqAPCTotal").val(TOTALAPC);






                                                    var TotalGrossAmount = $$("TotalGrossAmountBQ").getValue();
                                                    var TotalUnit = $$("TotalGrossUnitsBQ").getValue();
                                                    var TotalAPC = $("#BqAPCTotal").val();

                                                    var grid = $$("Product_Grid").serialize(); //$("#ProductGrid").data("kendoGrid");
                                                    var no = $("#ProductGridRow").val();
                                                    grid[no].ProductValue = TotalGrossAmount;
                                                    if (grid[no].ProdtInd == "1") {
                                                        grid[no].ProductQty = TotalUnit;
                                                        grid[no].CalcValue = Number(TotalAPC).toFixed(2);
                                                    }
                                                    $$("Product_Grid").refresh();
                                                    SaveBQ_Prodid_unit();
                                                    //productTotalCalculation(e);
                                                    //var uid = grid._data[no].uid;  
                                                    //var element = $('tr[data-uid="' + uid + '"] td:nth-child(7)');
                                                    //$(element).addClass("yellowback"); 
                                                    grid[no].setSelectColor = "yellow";
                                                    grid[no].SetInd = "1";
                                                    $$("Product_Grid").refresh();
                                                    var tot = $$("Product_Grid").getFooterNode("ProductValue").innerText;
                                                    if (tot != "" && tot != null && tot != undefined) {
                                                        $$("Projection_Value").setValue(Comma(Number(tot.toString().replace(/,/g, '')).toFixed(2)));
                                                    }
                                                    onBanqWSGenerateGrid_Close();
                                                    $$("BanqWorksheetPopup").hide();
                                                    DateCalLoad();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("BanqWorksheetPopup").hide();
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
    });
}
function QuotationPopup() {
    debugger;
    var TempLoad = LoadDropDown("SalesAndMarket", "EmailTemplateLoad")
    var Assigned_List = LoadDropDown("SalesAndMarket", "AssignedToLoad");
    //var date = new Date();
    //date.setDate(date.getDate());
    //date.toLocaleDateString();
   // webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Quotation",
        id: 'QuotationPopup',
        modal: true,
        width: 900,
       // height:500,
        close: true,
        body: {
            rows: [
                {
                   // padding: 10,
                    padding: {
                        top: 0, bottom: 0, left: 10, right: 0
                    },
                    cols: [
                        {
                            view: 'button',
                            label: 'Email Quote',
                            id: 'BtnEmailQuote',
                            inputWidth: 120,
                            minWidth: 120,
                            width: 140,
                            on: {
                                onItemClick: function () {
                                    EmailSendPopup();

                                }
                            }
                        },
                        {
                            view: 'richselect',
                          //  label: 'Area',
                            name: 'ddlTemplate',
                            id: 'ddlTemplate',
                         //   labelWidth: 80,
                            inputWidth: 200,
                            minWidth: 200,
                         //   value: '1',
                            options: TempLoad,
                          value: TempLoad[0].id,
                       
                            on: {
                                onChange: function () {
                                   
                                }
                            }
                        },
                         {
                             minWidth: 200,//550
                         },
                    {
                        view: 'button',
                        label: 'Create',
                        id: 'BtnCreateQuote',
                        inputWidth: 70,
                        minWidth: 70,
                        width:70,
                        align: "right",
                        on: {
                            onItemClick: function () {
                                debugger;
                                $("#QuoteCreate").val("1")
                                SaveQuotation();
                            }
                        }

                    },
                     {
                         view: 'button',
                         label: 'Save',
                         id: 'BtnSaveQuote',
                         inputWidth: 60,
                         minWidth: 60,
                         width: 60,
                         hidden:true,
                         align: "right",
                         on: {
                             onItemClick: function () {
                                 debugger;
                                 $("#QuoteCreate").val("3")
                                 
                                 SaveQuotation();


                             }
                         }
                     },
                   
                    {
                        view: 'button',
                        label: 'Re Create',
                        id: 'BtnReCreateQuote',
                        inputWidth: 80,
                        minWidth: 80,
                        width: 80,
                        align: "right",
                        on: {
                            onItemClick: function () {
                                debugger;
                                $("#QuoteCreate").val("2")
                                SaveQuotation();

                            }
                        }
                    },
                     {
                         view: 'button',
                         label: 'Open',
                         id: 'BtnOpenQuote',
                         inputWidth: 60,
                         minWidth: 60,
                         width: 60,
                         align: "right",
                         on: {
                             onItemClick: function () {
                                 debugger;
                                 
                                 $$("BtnCreateQuote").hide();
                                 $$("BtnSaveQuote").show();
                                 $$("BtnReCreateQuote").show();
                                 $$("BtnEmailQuote").show();
                                 $$("ddlTemplate").show();
                                 ExistQuoteLoad();
                                 //$("#QuoteCreate").val("3")
                                 //SaveQuotation();

                             }
                         }
                     },
                    ]
                },
                {
                    padding: {
                        top: 0, bottom: 0, left: 10, right: 0
                    },
                    cols: [
                         {
                           
                             view: 'label',
                             label: 'Each Line in w.s',
                             name: 'Lbleach',
                             id: 'Lbleach',
                             labelWidth: 150,
                             inputwidth: 150,
                             width:150

                         },
                          {
                              view: 'radio',
                              minWidth: 100,
                              id: "RadConsQuote",
                              value: 0,
                              inputwidth:100,
                              options: [
                              { "id": 1, "value": "Consolidated Quote" }
                              ],
                              on: {
                                  "onChange": function (newValue, oldValue) {
                                      debugger;
                                      if (newValue == "1") {
                                          $$("RadIndQuote").setValue(0);
                                          $$("RadOptQuote").setValue(0);
                                      }
                                  }
                              }
                          },
                           {},
                                 {
                                     view: 'text',
                                     label: 'Quote No',
                                     name: 'QuoteNo',
                                     id: 'QuoteNo',
                                     labelWidth: 100,
                                     inputWidth: 230,
                                     minWidth: 230,
                                     inputAlign: "center"
                                 },

                    ]
                },
                {
                    padding: {
                        top: 0, bottom: 0, left: 10, right: 0
                    },
                    cols: [
                        {
                            width:150
                        },

                        {
                            view: 'radio',
                            minWidth: 100,
                            id: "RadIndQuote",
                            inputwidth: 100,
                             value: 0,
                            options: [
                            { "id": 1, "value": "Independent Quote" }
                            ],
                            on: {
                                "onChange": function (newValue, oldValue) {
                                    debugger;
                                    if (newValue == "1") {
                                        $$("RadConsQuote").setValue(0);
                                        $$("RadOptQuote").setValue(0);
                                    }
                                }
                            }
                        },
                        {},
                    {
                        view: 'datepicker',
                        label: 'Quote Date',
                        id: 'QuoteDt',
                        labelWidth: 100,
                        inputWidth: 230,
                        minWidth: 230,
                        stringResult: true,
                        format: "%d/%m/%Y",
                       //  value: date
                       
                    },

                    ]
                },
                {
                    padding: {
                        top: 0, bottom: 0, left: 10, right: 0
                    },
                    cols: [
                    {width:150},
                   {
                       view: 'radio',
                       minWidth: 100,
                       id: "RadOptQuote",
                       inputwidth: 100,
                        value: 0,
                       options: [
                       { "id": 1, "value": "Independent & Optional " }
                       ],
                       on: {
                           "onChange": function (newValue, oldValue) {
                               debugger;
                               if (newValue == "1") {
                                   $$("RadConsQuote").setValue(0);
                                   $$("RadIndQuote").setValue(0);
                               }
                           }
                       }
                   },
                    {},
                     {
                         view: 'text',
                         label: 'Amend No',
                         name: 'AmendNo',
                         id: 'AmendNo',
                         labelWidth: 100,
                         inputWidth: 230,
                         minWidth: 230,
                         inputAlign: "center"
                     },
                    ]
                },
                {
                    padding: {
                        top: 0, bottom: 0, left: 10, right: 0
                    },
                    cols: [
                        { width: 150 },
                        { inputwidth: 100 },
                        {},
                        {
                        view: 'datepicker',
                        label: 'Amend Date',
                        id: 'AmendDt',
                        labelWidth: 100,
                        inputWidth: 230,
                        minWidth: 230,
                        stringResult: true,
                        format: "%d/%m/%Y",
                        // value: date
                    }]
                   
                },
               {
                   padding: {
                        top: 0, bottom: 0, left: 10, right: 0
                    },
                   cols: [

                       {
                           
                               view: "textarea",
                               label: 'Terms',
                               id: 'TERMS',
                               name: 'TERMS',
                                labelPosition: 'top',
                               labelWidth: 100,
                               inputWidth: 700,
                               minWidth: 500,
                               height: 150,
                               attributes: { maxlength: 4000 }
                           //}]
                       
                   }
                   ]
                  
               },
               
               
                {
                    padding: {
                        top: 0, bottom: 0, left: 10, right: 0
                    },
                    cols:[{
                        view: "textarea",
                        label: 'Narration 1',
                        id: 'NAR1',
                        name: 'NAR1',
                        labelPosition: 'top',
                        labelWidth: 100,
                        inputWidth: 700,
                        height: 100,
                        attributes: { maxlength: 1000 }
                    }
                    ]  
                },
               
                {
                    padding: {
                        top: 0, bottom: 0, left: 10, right: 0
                    },
                    cols:[    {
                        view: "textarea",
                        label: 'Narration 2',
                        id: 'NAR2',
                        name: 'NAR2',
                        labelPosition: 'top',
                        labelWidth: 100,
                        inputWidth: 700,
                        height: 100,
                        attributes: { maxlength: 1000 }
                  
                        }
                        ]
                },
                {
                    padding: {
                        top: 0, bottom: 0, left: 10, right: 0
                    },
                    cols: [
                        
                    //    {
                    //    view: "text",
                    //    label: 'Sign By',
                    //    id: 'SIGNBY',
                    //    name: 'SIGNBY',
                    //    attributes: { maxlength: 40 },
                    //    labelPosition: 'top',
                    //    labelWidth: 100,
                    //    inputWidth: 300
                    //}
                    {
                        view: 'richselect',
                        label: 'Sign By',
                        name: 'SIGNBY',
                        id: 'SIGNBY',
                        labelPosition: 'top',
                        labelWidth: 100,
                        inputWidth: 300,
                       
                        options: Assigned_List,
                        //value: TempLoad[0].id,

                        on: {
                            onChange: function () {

                            }
                        }
                    }
                    ]
                },
                {
                    padding: {
                        top: 0, bottom: 0, left: 10, right: 0
                    },
                    cols: [
                        {
                            view: 'label',
                            label: ' ',
                            id: 'hide1',
                           // hidden: true,
                            //width: 80,
                        }
                        ]
                }
                
          


            ]
        }
        
    });
    $$("RadIndQuote").setValue(1);
    $$("QuoteNo").disable();
    $$("AmendNo").disable();
    $$("AmendDt").disable();
    $$("QuoteDt").disable();
    $$("SIGNBY").setValue($$("Assigned_To").getValue());

  
  
   
  
}

function EmailSendPopup() {
    debugger;
    
    //date.toLocaleDateString();
    // webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Email Preview",
        id: 'EmailSendPopup',
        modal: true,
        width: 1500,
      
        close: true,
        body: {
            rows: [
                {
                  
                    padding: {
                        top: 0, bottom: 0, left: 10, right: 0
                    },
                    cols: [
                        {
                            view: "text",
                            label: 'To',
                            id: 'ToEmail',
                            name: 'ToEmail',
                            labelWidth: 100,
                            inputWidth: 1000,
                            width:1000
                        },
                    {
                    view: 'button',
                    label: 'Send',
                    id: 'BtnSendEmail',
                    inputWidth: 80,
                    minWidth: 80,
                    width:150,
                  //  align: "left",
                    on: {
                        onItemClick: function () {
                            debugger;
                            FnSendMailQuote();

                        }
                    }
                },
                        ]

                },


                {
                    padding: {
                        top: 0, bottom: 0, left: 10, right: 0
                    },
                    cols: [
                      {
                          view: "text",
                          label: 'Cc',
                          id: 'Cc',
                          name: 'Cc',
                          labelWidth: 100,
                          inputWidth: 1000,
                          width:1000
                      }
                    ]

                },
                 
                  {
                      padding: {
                          top: 0, bottom: 0, left: 10, right: 0
                      },
                      cols: [
                        {
                            view: "text",
                            label: 'Subject',
                            id: 'EmailSub',
                            name: 'EmailSub',
                            labelWidth: 100,
                            inputWidth: 1000,
                            width: 1000
                        }
                      ]

                  },
            {
                padding: {
                    top: 0, bottom: 0, left: 10, right: 0
                },
                cols: [
                 {
                           
                     view: "textarea",
                     label: ' ',
                     id: 'Body',
                     name: 'Body',
                     //labelPosition: 'top',
                     labelWidth: 100,
                     inputWidth: 1000,
                     minWidth: 500,
                     height: 550,
                     width: 1000
                     
                       
                 }]

            },
            {
                cols: [
                       {
                           view: 'label',
                           label: ' ',
                           id: 'hide2',
                           // hidden: true,
                           //width: 80,
                       }
                ]
               
              
            }
            ]
            }
            

    });
    ContactPersEmailLoad();
    LoadTemplateDetails();
  
   




}
function ContactPersEmailLoad() {
    debugger;

   // var LeadOpprtunityID = $("#LeadOpprtunityID").val();

    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/ContactEmailLoad",
        //data: "SID=" + LeadOpprtunityID,
        data:[],
        async: false,
        success: function (data) {

            if (data != null && data != "" && data != undefined) {
                var dtval = JSON.parse(data.v);
                if (dtval != "0" && dtval != "" && dtval != null) {
                    $$("ToEmail").setValue(dtval[0].EMAIL);
                }
            }
        }

        
    });
    return rowDatad;
}
function ExistQuoteChk() {
    debugger;
   
    var LeadOpprtunityID = $("#LeadOpprtunityID").val();
    
    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/ExistQuoteChk",
        data: "SID=" + LeadOpprtunityID,
        async: false,
        success: function (data) {
           
            if (data.v != null && data.v != "" && data.v != undefined) {
                var dtval = JSON.parse(data.v);
                if (dtval != "0" && dtval != "" && dtval != null)
                {
                  //  $$("BtnCreateQuote").disable();
                    $$("BtnCreateQuote").hide();
                    $$("BtnReCreateQuote").hide();
                    $$("BtnOpenQuote").show();
                    $$("BtnEmailQuote").hide();
                    $$("ddlTemplate").hide();
                  
                   // $("#RECREATENO").val(dtval);
                }
                else {
                    $$("BtnCreateQuote").show();
                    $$("BtnReCreateQuote").hide();
                    $$("BtnOpenQuote").hide();
                    $$("BtnEmailQuote").hide();
                    $$("ddlTemplate").hide();
                   
                }
            }
         
        }
    });
    return rowDatad;
}
function ExistQuoteLoad() {
    debugger;

    var LeadOpprtunityID = $("#LeadOpprtunityID").val();

    var rowDatad = [];
    $.ajax({
        type: "POST",
        url: "/SalesAndMarket/ExistQuoteLoad",
        data: "SID=" + LeadOpprtunityID,
        async: false,
        success: function (data) {

            if (data != null && data != "" && data != undefined) {
                var dtval = JSON.parse(data.v);
             
               
                $$("NAR1").setValue(dtval[0].NAR1);
                $$("NAR2").setValue(dtval[0].NAR2);
                $$("TERMS").setValue(dtval[0].TERMS);
                $$("SIGNBY").setValue(dtval[0].SIGN_BY);
                if (dtval[0].Q_TY == "1") $$("RadConsQuote").setValue("1");
                if (dtval[0].Q_TY == "2") $$("RadIndQuote").setValue("1");
                if (dtval[0].Q_TY == "3") $$("RadOptQuote").setValue("1");
                $$("QuoteNo").setValue(dtval[0].Q_NO);
                $$("AmendNo").setValue(dtval[0].Q_AMEND);
                var dt1 = dtval[0].Q_DT;
                dt1 = dt1.split('/');
                dt1 = new Date(parseInt(dt1["2"]), parseInt(dt1["1"]) - 1, parseInt(dt1["0"]));
                $$("QuoteDt").setValue(dt1);

                dt1 = dtval[0].Q_A_DT;
                dt1 = dt1.split('/');
                dt1 = new Date(parseInt(dt1["2"]), parseInt(dt1["1"]) - 1, parseInt(dt1["0"]));
                $$("AmendDt").setValue(dt1);

            }

        }
    });
    return rowDatad;
}
function LoadTemplateDetails() {
    debugger;
    var FoWorkSheetevents = [];
    var FOWSGridList = $$("QuoteGeneration_Grid").serialize();
    if (FOWSGridList.length < 1) {
        alert("WorkSheet cannot be empty");
        return false;
    }
    $.each(FOWSGridList, function (i, value) {

        var obj = {};
        var NetTariff = "";
        var GrossAmt = "";
        var DiscAmt = "";
        var OtherCharges = "";
        if (value.NetTariff != null && value.NetTariff != "") {
            NetTariff = Number(value.NetTariff.toString().replace(/,/g, '')).toFixed(2);
        }
        if (value.GrossAmt != null && value.GrossAmt != "") {
            GrossAmt = Number(value.GrossAmt.toString().replace(/,/g, '')).toFixed(2);
        }
        if (value.DiscAmt != null && value.DiscAmt != "") {
            DiscAmt = Number(value.DiscAmt.toString().replace(/,/g, '')).toFixed(2);
        }
        if (value.OtherCharges != null && value.OtherCharges != "") {
            OtherCharges = Number(value.OtherCharges.toString().replace(/,/g, '')).toFixed(2);
        }



        obj["ArraivalDt"] = (value.ArraivalDt == null || value.ArraivalDt == undefined ? "" : value.ArraivalDt);
        obj["DepartureDt"] = (value.DepartureDt == null || value.DepartureDt == undefined ? "" : value.DepartureDt);
        obj["RoomType"] = (value.RoomType == null || value.RoomType == undefined ? "" : value.RoomType);
        obj["RoomID"] = (value.RoomID == null || value.RoomID == undefined ? "" : value.RoomID);
        obj["Adult"] = (value.Adult == null || value.Adult == undefined ? "" : value.Adult);
        obj["Child"] = (value.Child == null || value.Child == undefined ? "" : value.Child);
        obj["RATE_TY_NM"] = (value.RATE_TY_NM == null || value.RATE_TY_NM == undefined ? "" : value.RATE_TY_NM);
        obj["GrossAmt"] = GrossAmt;
        obj["DiscPer"] = (value.DiscPer == null || value.DiscPer == undefined ? "" : value.DiscPer);
        obj["NetTariff"] = NetTariff;
        obj["RoomTyid"] = (value.RoomTyid == null || value.RoomTyid == undefined ? "" : value.RoomTyid);
        obj["DiscAmt"] = DiscAmt;
        obj["RATE_TY_ID"] = (value.RATE_TY_ID == null || value.RATE_TY_ID == undefined ? "" : value.RATE_TY_ID);
        obj["PK_ID"] = (value.PK_ID == null || value.PK_ID == undefined ? "" : value.PK_ID);
        obj["PLAN_ID"] = (value.PLAN_ID == null || value.PLAN_ID == undefined ? "" : value.PLAN_ID);
        obj["PLAN_NM"] = (value.PLAN_NM == null || value.PLAN_NM == undefined ? "" : value.PLAN_NM);
        obj["Currency"] = (value.Currency == null || value.Currency == undefined ? "" : value.Currency);
        obj["PARTY_ID"] = (value.PARTY_ID == null || value.PARTY_ID == undefined ? "" : value.PARTY_ID);
        obj["PARTY_NM"] = (value.PARTY_NM == null || value.PARTY_NM == undefined ? "" : value.PARTY_NM);
        obj["PROD_ID"] = (value.PROD_ID == null || value.PROD_ID == undefined ? "" : value.PROD_ID);
        obj["UnitTyID"] = (value.UnitTyID == null || value.UnitTyID == undefined ? "" : value.UnitTyID);
        obj["Nights"] = (value.Nights == null || value.Nights == undefined ? "" : value.Nights);
        obj["OtherCharges"] = (value.OtherCharges == null || value.OtherCharges == undefined ? "" : value.OtherCharges);
        obj["RegNoBK"] = (value.RegNoBK == null || value.RegNoBK == undefined ? "" : value.RegNoBK);
        obj["TariffBK"] = (value.TariffBK == null || value.TariffBK == undefined ? "" : value.TariffBK);
        obj["ReserveNo"] = (value.ReserveNo == null || value.ReserveNo == undefined ? "" : value.ReserveNo);
        FoWorkSheetevents.push(obj);
    });

    var date = new Date();
    date.setDate(date.getDate());
    date.toLocaleDateString();



    var Table = {};
    Table["FOWSGridList"] = JSON.stringify(FoWorkSheetevents);



    Table["QuoteCreate"] = $("#QuoteCreate").val();
    Table["GuestName"] = '';
    Table["GuestFNM"] = '';
    Table["GuestLNM"] = '';
    Table["GuestTLE"] = '';
    Table["GuestID"] = '';

    Table["QuoteNo"] = $$("QuoteNo").getValue();
    Table["AmendNo"] = $$("AmendNo").getValue();

    Table["AmendDt"] = $$("AmendDt").getText();


    Table["QuoteDT"] = $$("QuoteDt").getText();
    Table["ToEmails"] = $$("ToEmail").getValue();
    Table["Subjects"] = $$("EmailSub").getValue();
    Table["NAR1"] = $$("NAR1").getValue();
    Table["NAR2"] = $$("NAR2").getValue();
    Table["TERMS"] = $$("TERMS").getValue();
    Table["SIGNBY"] = $$("SIGNBY").getValue();
    Table["TemplId"] = $$("ddlTemplate").getValue();

    Table["QTYPE"] = "";
    if ($$("RadConsQuote").getValue() == "1") Table["QTYPE"] = "1";
    if ($$("RadIndQuote").getValue() == "1") Table["QTYPE"] = "2";
    if ($$("RadOptQuote").getValue() == "1") Table["QTYPE"] = "3";
    var BTN_TYPE = $("#BTN_TYPE").val();
    var LeadOpprtunityID = $("#LeadOpprtunityID").val();
    var QUOT_PREFIX = $("#QUOT_PREFIX").val();
    Table["LeadOpprtunityID"] = LeadOpprtunityID;
    Table["QUOT_PREFIX"] = QUOT_PREFIX;
    Table["BTN_TYPE"] = BTN_TYPE;

    var paramValue = JSON.stringify(Table);
    var rowDatad = [];
    var paramValue = JSON.stringify(Table);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/SalesAndMarket/LoadTemplateDetails",
        async: false,
        data: "request=" + encodeURIComponent(paramValue),
        success: function (data) {
            debugger;
           
            if (data != null && data != "" && data != undefined) {
              

                $$("EmailSub").setValue(data.v.EmailSub);
                $$("Body").setValue(data.v.MailContent);
                $$("EmailSendPopup").show();
                
            }

        }
    });
    return rowDatad;
}
function SaveQuotation() {
    debugger;
   
    var FoWorkSheetevents = [];
    var FOWSGridList = $$("QuoteGeneration_Grid").serialize();
   
    
    if (FOWSGridList.length < 1) {
        alert("WorkSheet cannot be empty");
        return false;
    }
    $.each(FOWSGridList, function (i, value) {

        var obj = {};
        var NetTariff = "";
        var GrossAmt = "";
        var DiscAmt = "";
        var OtherCharges = "";
        if (value.NetTariff != null && value.NetTariff != "") {
            NetTariff = Number(value.NetTariff.toString().replace(/,/g, '')).toFixed(2);
        }
        if (value.GrossAmt != null && value.GrossAmt != "") {
            GrossAmt = Number(value.GrossAmt.toString().replace(/,/g, '')).toFixed(2);
        }
        if (value.DiscAmt != null && value.DiscAmt != "") {
            DiscAmt = Number(value.DiscAmt.toString().replace(/,/g, '')).toFixed(2);
        }
        if (value.OtherCharges != null && value.OtherCharges != "") {
            OtherCharges = Number(value.OtherCharges.toString().replace(/,/g, '')).toFixed(2);
        }



        obj["ArraivalDt"] = (value.ArraivalDt == null || value.ArraivalDt == undefined ? "" : value.ArraivalDt);
        obj["DepartureDt"] = (value.DepartureDt == null || value.DepartureDt == undefined ? "" : value.DepartureDt);
        obj["RoomType"] = (value.RoomType == null || value.RoomType == undefined ? "" : value.RoomType);
        obj["RoomID"] = (value.RoomID == null || value.RoomID == undefined ? "" : value.RoomID);
        obj["Adult"] = (value.Adult == null || value.Adult == undefined ? "" : value.Adult);
        obj["Child"] = (value.Child == null || value.Child == undefined ? "" : value.Child);
        obj["RATE_TY_NM"] = (value.RATE_TY_NM == null || value.RATE_TY_NM == undefined ? "" : value.RATE_TY_NM);
        obj["GrossAmt"] = GrossAmt;
        obj["DiscPer"] = (value.DiscPer == null || value.DiscPer == undefined ? "" : value.DiscPer);
        obj["NetTariff"] = NetTariff;
        obj["RoomTyid"] = (value.RoomTyid == null || value.RoomTyid == undefined ? "" : value.RoomTyid);
        obj["DiscAmt"] = DiscAmt;
        obj["RATE_TY_ID"] = (value.RATE_TY_ID == null || value.RATE_TY_ID == undefined ? "" : value.RATE_TY_ID);
        obj["PK_ID"] = (value.PK_ID == null || value.PK_ID == undefined ? "" : value.PK_ID);
        obj["PLAN_ID"] = (value.PLAN_ID == null || value.PLAN_ID == undefined ? "" : value.PLAN_ID);
        obj["PLAN_NM"] = (value.PLAN_NM == null || value.PLAN_NM == undefined ? "" : value.PLAN_NM);
        obj["Currency"] = (value.Currency == null || value.Currency == undefined ? "" : value.Currency);
        obj["PARTY_ID"] = (value.PARTY_ID == null || value.PARTY_ID == undefined ? "" : value.PARTY_ID);
        obj["PARTY_NM"] = (value.PARTY_NM == null || value.PARTY_NM == undefined ? "" : value.PARTY_NM);
        obj["PROD_ID"] = (value.PROD_ID == null || value.PROD_ID == undefined ? "" : value.PROD_ID);
        obj["UnitTyID"] = (value.UnitTyID == null || value.UnitTyID == undefined ? "" : value.UnitTyID);
        obj["Nights"] = (value.Nights == null || value.Nights == undefined ? "" : value.Nights);
        obj["OtherCharges"] = (value.OtherCharges == null || value.OtherCharges == undefined ? "" : value.OtherCharges);
        obj["RegNoBK"] = (value.RegNoBK == null || value.RegNoBK == undefined ? "" : value.RegNoBK);
        obj["TariffBK"] = (value.TariffBK == null || value.TariffBK == undefined ? "" : value.TariffBK);
        obj["ReserveNo"] = (value.ReserveNo == null || value.ReserveNo == undefined ? "" : value.ReserveNo);
        FoWorkSheetevents.push(obj);
    });

    var date = new Date();
    date.setDate(date.getDate());
    date.toLocaleDateString();

    var Table = {};
    Table["FOWSGridList"] = JSON.stringify(FoWorkSheetevents);
  
   
   
    Table["QuoteCreate"] = $("#QuoteCreate").val();
    Table["GuestName"] = '';
    Table["GuestFNM"] = '';
    Table["GuestLNM"] = '';
    Table["GuestTLE"] = '';
    Table["GuestID"] = '';
    
    Table["QuoteNo"] = $$("QuoteNo").getValue();
    Table["AmendNo"] = $$("AmendNo").getValue();

    Table["AmendDt"] = $$("AmendDt").getText();
    if (Table["AmendDt"] == "") Table["AmendDt"] = date;

    Table["QuoteDT"] = $$("QuoteDt").getText();
    if (Table["QuoteDt"] == "") Table["QuoteDt"] = date;

    Table["NAR1"] = $$("NAR1").getValue();
    Table["NAR2"] = $$("NAR2").getValue();
    Table["TERMS"] = $$("TERMS").getValue();
    Table["SIGNBY"] = $$("SIGNBY").getValue();
    Table["TemplId"] = $$("ddlTemplate").getValue();
  
    Table["QTYPE"] = "";
    if ($$("RadConsQuote").getValue() == "1") Table["QTYPE"] = "1";
    if ($$("RadIndQuote").getValue() == "1") Table["QTYPE"] = "2";
    if ($$("RadOptQuote").getValue() == "1") Table["QTYPE"] = "3";
    var BTN_TYPE = $("#BTN_TYPE").val();
    var LeadOpprtunityID = $("#LeadOpprtunityID").val();
    var QUOT_PREFIX = $("#QUOT_PREFIX").val();
    Table["LeadOpprtunityID"] = LeadOpprtunityID;
    Table["QUOT_PREFIX"] = QUOT_PREFIX;
    Table["BTN_TYPE"] = BTN_TYPE;
    //   Table["OtherChargesList"] = JSON.stringify(OtherChargesEvents);
   
    var paramValue = JSON.stringify(Table);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/SalesAndMarket/Quotation_Save",
        async: false,
        data: "request=" + encodeURIComponent(paramValue),
        success: function (data) {
            debugger;
            var alertVal = data.v.ErrorMeg;
            if (alertVal == "Operation Failed.") {
                alert(alertVal);
            }
            else {
                alert(alertVal);
                $$("AmendNo").setValue(data.v.AmendId);
                $$("QuoteNo").setValue(data.v.QuoteId);
                $$("AmendDt").setValue(date);
                //  $$("QuotationPopup").hide();
                if ($("#QuoteCreate").val() == "1")
                {
                    $$("BtnCreateQuote").hide();
                    $$("BtnReCreateQuote").hide();
                    $$("BtnOpenQuote").show();
                    $$("QuoteDt").setValue(date);
                }
               
            }
        }
    });

}
function FnSendMailQuote() {
    debugger;

    var FoWorkSheetevents = [];
    var FOWSGridList = $$("QuoteGeneration_Grid").serialize();


    if (FOWSGridList.length < 1) {
        alert("WorkSheet cannot be empty");
        return false;
    }
    $.each(FOWSGridList, function (i, value) {

        var obj = {};
        var NetTariff = "";
        var GrossAmt = "";
        var DiscAmt = "";
        var OtherCharges = "";
        if (value.NetTariff != null && value.NetTariff != "") {
            NetTariff = Number(value.NetTariff.toString().replace(/,/g, '')).toFixed(2);
        }
        if (value.GrossAmt != null && value.GrossAmt != "") {
            GrossAmt = Number(value.GrossAmt.toString().replace(/,/g, '')).toFixed(2);
        }
        if (value.DiscAmt != null && value.DiscAmt != "") {
            DiscAmt = Number(value.DiscAmt.toString().replace(/,/g, '')).toFixed(2);
        }
        if (value.OtherCharges != null && value.OtherCharges != "") {
            OtherCharges = Number(value.OtherCharges.toString().replace(/,/g, '')).toFixed(2);
        }



        obj["ArraivalDt"] = (value.ArraivalDt == null || value.ArraivalDt == undefined ? "" : value.ArraivalDt);
        obj["DepartureDt"] = (value.DepartureDt == null || value.DepartureDt == undefined ? "" : value.DepartureDt);
        obj["RoomType"] = (value.RoomType == null || value.RoomType == undefined ? "" : value.RoomType);
        obj["RoomID"] = (value.RoomID == null || value.RoomID == undefined ? "" : value.RoomID);
        obj["Adult"] = (value.Adult == null || value.Adult == undefined ? "" : value.Adult);
        obj["Child"] = (value.Child == null || value.Child == undefined ? "" : value.Child);
        obj["RATE_TY_NM"] = (value.RATE_TY_NM == null || value.RATE_TY_NM == undefined ? "" : value.RATE_TY_NM);
        obj["GrossAmt"] = GrossAmt;
        obj["DiscPer"] = (value.DiscPer == null || value.DiscPer == undefined ? "" : value.DiscPer);
        obj["NetTariff"] = NetTariff;
        obj["RoomTyid"] = (value.RoomTyid == null || value.RoomTyid == undefined ? "" : value.RoomTyid);
        obj["DiscAmt"] = DiscAmt;
        obj["RATE_TY_ID"] = (value.RATE_TY_ID == null || value.RATE_TY_ID == undefined ? "" : value.RATE_TY_ID);
        obj["PK_ID"] = (value.PK_ID == null || value.PK_ID == undefined ? "" : value.PK_ID);
        obj["PLAN_ID"] = (value.PLAN_ID == null || value.PLAN_ID == undefined ? "" : value.PLAN_ID);
        obj["PLAN_NM"] = (value.PLAN_NM == null || value.PLAN_NM == undefined ? "" : value.PLAN_NM);
        obj["Currency"] = (value.Currency == null || value.Currency == undefined ? "" : value.Currency);
        obj["PARTY_ID"] = (value.PARTY_ID == null || value.PARTY_ID == undefined ? "" : value.PARTY_ID);
        obj["PARTY_NM"] = (value.PARTY_NM == null || value.PARTY_NM == undefined ? "" : value.PARTY_NM);
        obj["PROD_ID"] = (value.PROD_ID == null || value.PROD_ID == undefined ? "" : value.PROD_ID);
        obj["UnitTyID"] = (value.UnitTyID == null || value.UnitTyID == undefined ? "" : value.UnitTyID);
        obj["Nights"] = (value.Nights == null || value.Nights == undefined ? "" : value.Nights);
        obj["OtherCharges"] = (value.OtherCharges == null || value.OtherCharges == undefined ? "" : value.OtherCharges);
        obj["RegNoBK"] = (value.RegNoBK == null || value.RegNoBK == undefined ? "" : value.RegNoBK);
        obj["TariffBK"] = (value.TariffBK == null || value.TariffBK == undefined ? "" : value.TariffBK);
        obj["ReserveNo"] = (value.ReserveNo == null || value.ReserveNo == undefined ? "" : value.ReserveNo);
        FoWorkSheetevents.push(obj);
    });

    var date = new Date();
    date.setDate(date.getDate());
    date.toLocaleDateString();

   

    var Table = {};
    Table["FOWSGridList"] = JSON.stringify(FoWorkSheetevents);



    Table["QuoteCreate"] = $("#QuoteCreate").val();
    Table["GuestName"] = '';
    Table["GuestFNM"] = '';
    Table["GuestLNM"] = '';
    Table["GuestTLE"] = '';
    Table["GuestID"] = '';

    Table["QuoteNo"] = $$("QuoteNo").getValue();
    Table["AmendNo"] = $$("AmendNo").getValue();

    Table["AmendDt"] = $$("AmendDt").getText();
   

    Table["QuoteDT"] = $$("QuoteDt").getText();
    Table["ToEmails"] = $$("ToEmail").getValue();
    Table["Subjects"] = $$("EmailSub").getValue();
    Table["CC"] = $$("Cc").getValue();
    var Body = $$("Body").getValue();
   
    //Body = Body.replace("<br>", "$");
    
    Table["Body"] = Body;
    Table["NAR1"] = $$("NAR1").getValue();
    Table["NAR2"] = $$("NAR2").getValue();
    Table["TERMS"] = $$("TERMS").getValue();
    Table["SIGNBY"] = $$("SIGNBY").getValue();
    Table["TemplId"] = $$("ddlTemplate").getValue();

    Table["QTYPE"] = "";
    if ($$("RadConsQuote").getValue() == "1") Table["QTYPE"] = "1";
    if ($$("RadIndQuote").getValue() == "1") Table["QTYPE"] = "2";
    if ($$("RadOptQuote").getValue() == "1") Table["QTYPE"] = "3";
    var BTN_TYPE = $("#BTN_TYPE").val();
    var LeadOpprtunityID = $("#LeadOpprtunityID").val();
    var QUOT_PREFIX = $("#QUOT_PREFIX").val();
    Table["LeadOpprtunityID"] = LeadOpprtunityID;
    Table["QUOT_PREFIX"] = QUOT_PREFIX;
    Table["BTN_TYPE"] = BTN_TYPE;
    //   Table["OtherChargesList"] = JSON.stringify(OtherChargesEvents);

    var paramValue = JSON.stringify(Table);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/SalesAndMarket/FnSendMailQuote",
        async: false,
        data: "request=" + encodeURIComponent(paramValue) ,
        success: function (data) {
            debugger;
            var alertVal = data.v.ErrorMeg;
            if (alertVal == "Operation Failed.") {
                alert(alertVal);
            }
            else {
                alert(alertVal);
                //$$("AmendNo").setValue(data.v.AmendId);
                //$$("QuoteNo").setValue(data.v.QuoteId);
                //$$("AmendDt").setValue(date);
                ////  $$("QuotationPopup").hide();
                //if ($("#QuoteCreate").val() == "1") {
                //    $$("BtnCreateQuote").hide();
                //    $$("BtnReCreateQuote").hide();
                //    $$("BtnOpenQuote").show();
                //    $$("QuoteDt").setValue(date);
                //}

            }
        }
    });

}
function SaveBQ_Prodid_unit() {
    debugger;
    var grid = $$("Product_Grid").serialize();
    var ProductTypeId = $("#ProductTypeId").val();
    var UnitTyID = $("#UnitTyID").val();
    var no = $("#ProductGridRow").val();
    for (var i = 0; i < grid.length; i++) {
        if (no == i) {
            grid[i].PROD_ID = ProductTypeId;
            grid[i].UnitTyID = UnitTyID;
        }
    }
    $$("Product_Grid").refresh();
    //S.VijayaLakshmi''22/5/20
}
function FandBsheetPopup() {
   
    webix.editors.myeditor1 = webix.extend({
        render: function () {
            return webix.html.create("div", {
                "class": "webix_dt_editor"
            }, "<input type='text' maxlength='9'/>");
        }
    }, webix.editors.text);
    webix.editors.myeditor2 = webix.extend({
        render: function () {
            return webix.html.create("div", {
                "class": "webix_dt_editor"
            }, "<input type='text'  maxlength='3'/>");
        }
    }, webix.editors.text);
    webix.editors.NotesCM = webix.extend({
        render: function () {
            return webix.html.create("div", {
                "class": "webix_dt_editor"
            }, "<input type='text'  maxlength='500'/>");
        }
    }, webix.editors.text);
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    var string1 = webix.i18n.numberFormat("123.45");
    var string2 = webix.i18n.intFormat("123");
    var string3 = webix.i18n.priceFormat("123.45");
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "F&B WorkSheet",
        id: 'FandBsheetPopup',
        modal: true,
        width: 1100,
        close: true,
        body: {
            rows: [
                {
                    cols: [{
                        view: 'button',
                        type: "icon",
                        icon: "wxi-plus",
                        label: 'Add',
                        inputWidth: 70,
                        minWidth: 30,
                        align: "right",
                        on: {
                            onItemClick: function () {
                                var ProductTypeId = $("#ProductTypeId").val();
                                var UnitTyID = $("#UnitTyID").val();
                                $$("FandBsheet_Grid").add({
                                    ProductQty: '',
                                    ProductValue: '',
                                    CompanyDetail: $$("Organization").getValue(),
                                    Comments: '',
                                    DATE: new Date(),
                                    CalcTY: 'APC',
                                    CalcValue: '',
                                    PROD_ID: ProductTypeId,
                                    UnitTyID: UnitTyID,
                                    Name: '',
                                    Active:'',
                                });
                                $$("FandBsheet_Grid").refresh();
                            }
                        }
                    },
                    {
                        view: "button",
                        type: "icon",
                        icon: "wxi-trash",
                        label: "",
                        width: 30,
                        click: function () {
                            $$("FandBsheet_Grid").editCancel();
                            $$("FandBsheet_Grid").remove($$("FandBsheet_Grid").getSelectedId());
                            $$("FandBsheet_Grid").refresh(); f_and_b_grid1 = [];
                            $.each($$("FandBsheet_Grid").serialize(), function (key, value) {
                                value.Active = 1;
                                value.ID = ++i;
                                f_and_b_grid1.push(value);
                            });
                            var grid = $$("FandBsheet_Grid").serialize();
                            debugger;
                            var TOTALGross = 0;
                            var TOTALUnits = 0;
                            var TOTALAPC = 0;
                            for (var i = 0; i < grid.length; i++) {
                                var Values = grid[i].ProductValue;
                                if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                                    TOTALGross = Number(TOTALGross) + Number(Values);
                                }
                                var Unitis = grid[i].ProductQty;
                                if (Unitis != "" && Unitis != undefined && Unitis != null && Unitis != "0" && Unitis != "0.00") {
                                    TOTALUnits = Number(TOTALUnits) + Number(Unitis);
                                }
                                var CalcValue = grid[i].CalcValue;
                                if (CalcValue != "" && CalcValue != undefined && CalcValue != null && CalcValue != "0" && CalcValue != "0.00") {
                                    TOTALAPC = Number(TOTALAPC) + Number(CalcValue);
                                }
                            }
                            $$("TotalGrossAmountFB").setValue(Number(TOTALGross).toFixed(2));
                            $$("TotalGrossUnitsFB").setValue(TOTALUnits);
                            $("#FBAPCTotal").val(TOTALAPC);
                        },
                        align: "right"
                    }
                    ]
                },
                {
                    id: "FandBsheet_Grid",
                    select: 'row',
                    view: "datatable",
                    editable: true,
                    columns: [
                            { id: "DATE", header: 'Date',editor:"date",format : webix.Date.dateToStr("%d/%m/%Y"), width: 110, css: { 'text-align': 'center ! important' } },
                            { id: "Name", header: 'Outlet', editor: "text", width: 200, css: { 'text-align': 'center ! important' } },
                            { id: "Comments", header: 'Narration', editor: "NotesCM", width: 230, css: { 'text-align': 'center ! important' } },
                            { id: "CompanyDetail", header: 'Company', width: 220, css: { 'text-align': 'center ! important' } },
                            { id: "ProductValue", header: 'Value', editor: "myeditor1", numberFormat: "111111111.00", width: 80, css: { 'text-align': 'right ! important' } },
                            { id: "ProductQty", header: 'Covers', editor: "myeditor2", width: 80, css: { 'text-align': 'right ! important' }, numberFormat: '11111' },
                            { id: "CalcTY", header: ' ', width: 80, css: { 'text-align': 'right ! important' } },
                            { id: "CalcValue", header: ' ', editor: "myeditor1", numberFormat: "111111111.00",width: 80, css: { 'text-align': 'right ! important' } },
                            { id: "PROD_ID", hidden: true },
                            { id: "UnitTyID", hidden: true },
                            { id: "Active", hidden: true },
                    ],

                    height: 400,
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            var getval = this.getItem(id.row);
                            var dataval = $$("Competitor_Grid").getSelectedItem();
                            dataval.CompetitorTy = getval.GRP_NAME;
                            dataval.CompetitorTyId = getval.grp_id;
                            $$("Competitor_Grid").refresh();
                            $$("FandBsheetPopup").hide();
                        },
                        'onEditorChange': function (cell, value) {
                            debugger;
                            var getval = this.getItem(cell.row);
                            if (cell.column == 'ProductValue' || cell.column == 'ProductQty' || cell.column == 'CalcValue') {
                                var Values = 0;
                                var Units = 0;
                                if (cell.column == "ProductQty") {
                                    Values = this.getItem(cell.row).ProductValue;
                                    if (Values == "" || Values == undefined || Values == null || Values == "0" || Values == "0.00") {
                                        Values = this.getItem(cell.row).CalcValue;
                                    }
                                    Units = value;
                                }
                                else if (cell.column == "ProductValue") {
                                    Values = value;
                                    Units = this.getItem(cell.row).ProductQty;
                                }
                                else if (cell.column == "CalcValue") {
                                    Values = value;
                                    Units = this.getItem(cell.row).ProductQty;
                                }
                                var CalcValue = 0;
                                var PrdValue = 0;
                                if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                                    Values = Values.toString().replace(/,/g, '');
                                    if (Units != "" && Units != undefined && Units != null && Units != "0") {
                                        CalcValue = parseFloat(Number(Values) / Number(Units)).toFixed(2);
                                        PrdValue = parseFloat(Number(Values) * Number(Units)).toFixed(2);
                                    }
                                }
                                if (cell.column == "CalcValue") {
                                    this.getItem(cell.row).CalcValue = parseFloat(Number(Values)).toFixed(2);
                                    this.getItem(cell.row).ProductValue = parseFloat(Number(PrdValue)).toFixed(2);
                                    this.getItem(cell.row).ProductQty = Units;
                                }
                                if (cell.column == "ProductValue") {
                                    this.getItem(cell.row).CalcValue = CalcValue;
                                    this.getItem(cell.row).ProductValue = parseFloat(Number(Values)).toFixed(2);
                                    this.getItem(cell.row).ProductQty = Units;
                                }
                                if (cell.column == "ProductQty") {
                                    var Values1 = 0;
                                    this.getItem(cell.row).ProductQty = Units;
                                    Values1 = this.getItem(cell.row).ProductValue;
                                    if (Values1 == "" || Values1 == undefined || Values1 == null || Values1 == "0" || Values1 == "0.00") {
                                        this.getItem(cell.row).CalcValue = Values;
                                        this.getItem(cell.row).ProductValue = parseFloat(Number(PrdValue)).toFixed(2);
                                    }
                                    else {
                                        this.getItem(cell.row).CalcValue = CalcValue;
                                        this.getItem(cell.row).ProductValue = parseFloat(Number(Values)).toFixed(2);
                                    }

                                }
                                this.refresh();
                                var grid = this.serialize();
                                debugger;
                                var TOTALGross = 0;
                                var TOTALUnits = 0;
                                var TOTALAPC = 0;
                                for (var i = 0; i < grid.length; i++) {
                                    var Values = grid[i].ProductValue;
                                    if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                                        TOTALGross = Number(TOTALGross) + Number(Values);
                                    }
                                    var Unitis = grid[i].ProductQty;
                                    if (Unitis != "" && Unitis != undefined && Unitis != null && Unitis != "0" && Unitis != "0.00") {
                                        TOTALUnits = Number(TOTALUnits) + Number(Unitis);
                                    }
                                    var CalcValue = grid[i].CalcValue;
                                    if (CalcValue != "" && CalcValue != undefined && CalcValue != null && CalcValue != "0" && CalcValue != "0.00") {
                                        TOTALAPC = Number(TOTALAPC) + Number(CalcValue);
                                    }
                                }
                                $$("TotalGrossAmountFB").setValue(Number(TOTALGross).toFixed(2));
                                $$("TotalGrossUnitsFB").setValue(TOTALUnits);
                                $("#FBAPCTotal").val(TOTALAPC);
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
                                     view: 'text',
                                     label: 'Gross Amount ',
                                     name: 'TotalGrossAmountFB',
                                     id: 'TotalGrossAmountFB',
                                     labelWidth: 100,
                                     inputWidth: 200,
                                     disabled: true,
                                 },
                                {
                                    view: 'text',
                                    label: 'Total Units ',
                                    name: 'TotalGrossUnitsFB',
                                    id: 'TotalGrossUnitsFB',
                                    labelWidth: 100,
                                    inputWidth: 200,
                                    disabled: true,
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

                                                    $$("FandBsheet_Grid").editCancel();
                                                    $$("FandBsheet_Grid").refresh();
                                                    var getval = $$("FandBsheet_Grid").serialize();
                                                    for (var i = 0; i < getval.length; i++) {
                                                        var _arrValues = getval[i].CalcValue;
                                                        var Values = getval[i].ProductValue;
                                                        var Units = getval[i].ProductQty;
                                                        var CalcValue = "";

                                                        if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                                                            if (Units != "" && Units != undefined && Units != null && Units != "0") {
                                                                CalcValue = (Number(Values) / Number(Units));
                                                            }
                                                            else CalcValue = _arrValues;

                                                        }
                                                        getval[i].CalcValue = CalcValue;
                                                    }
                                                        $$("FandBsheet_Grid").refresh();
                                                        var grid = $$("FandBsheet_Grid").serialize();
                                                        debugger;
                                                        var TOTALGross = 0;
                                                        var TOTALUnits = 0;
                                                        var TOTALAPC = 0;
                                                        for (var i = 0; i < grid.length; i++) {
                                                            var Values = grid[i].ProductValue;
                                                            if (Values != "" && Values != undefined && Values != null && Values != "0" && Values != "0.00") {
                                                                TOTALGross = Number(TOTALGross) + Number(Values);
                                                            }
                                                            var Unitis = grid[i].ProductQty;
                                                            if (Unitis != "" && Unitis != undefined && Unitis != null && Unitis != "0" && Unitis != "0.00") {
                                                                TOTALUnits = Number(TOTALUnits) + Number(Unitis);
                                                            }
                                                            var CalcValue = grid[i].CalcValue;
                                                            if (CalcValue != "" && CalcValue != undefined && CalcValue != null && CalcValue != "0" && CalcValue != "0.00") {
                                                                TOTALAPC = Number(TOTALAPC) + Number(CalcValue);
                                                            }
                                                        }
                                                        $$("TotalGrossAmountFB").setValue(Number(TOTALGross).toFixed(2));
                                                        $$("TotalGrossUnitsFB").setValue(TOTALUnits);
                                                        $("#FBAPCTotal").val(TOTALAPC);
                                                   

                                                    var TotalGrossAmount = $$("TotalGrossAmountFB").getValue();
                                                    var TotalUnit = $$("TotalGrossUnitsFB").getValue();
                                                    var TotalAPC = $("#FBAPCTotal").val();

                                                    var grid = $$("Product_Grid").serialize(); //$("#ProductGrid").data("kendoGrid");
                                                    var no = $("#ProductGridRow").val();
                                                    grid[no].ProductValue = TotalGrossAmount;
                                                    grid[no].SetInd = "1";
                                                    if (grid[no].ProdtInd == "1") {
                                                        grid[no].ProductQty = TotalUnit;
                                                        grid[no].CalcValue = Number(TotalAPC).toFixed(2);
                                                    }
                                                    $$("Product_Grid").refresh();
                                                    SaveFB_Prodid_unit();
                                                    //productTotalCalculation(e);
                                                    //var uid = grid._data[no].uid;  
                                                    //var element = $('tr[data-uid="' + uid + '"] td:nth-child(7)');
                                                    //$(element).addClass("yellowback");
                                                    grid[no].setSelectColor = "yellow";
                                                    $$("Product_Grid").refresh();
                                                    var tot = $$("Product_Grid").getFooterNode("ProductValue").innerText;
                                                    if (tot != "" && tot != null && tot != undefined) {
                                                        $$("Projection_Value").setValue(Comma(Number(tot.toString().replace(/,/g, '')).toFixed(2)));
                                                    }
                                                    onFandBsheetPopup_Close();
                                                    $$("FandBsheetPopup").hide();
                                                    DateCalLoad();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    $$("FandBsheetPopup").hide();
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
    });
}
function OtherChargesHidden() {
    webix.skin.mini.barHeight = 29; webix.skin.mini.tabbarHeight = 34; webix.skin.mini.rowHeight = 28; webix.skin.mini.listItemHeight = 28; webix.skin.mini.inputHeight = 30; webix.skin.mini.layoutMargin.wide = 5; webix.skin.mini.layoutMargin.space = 5; webix.skin.mini.layoutPadding.space = 5;
    webix.skin.set('mini');
    webix.ui({
        view: "window",
        move: true,
        position: "center",
        head: "Other Charges",
        id: 'OtherChargesHiddenPOP',
        modal: true,
        width: 450,
        close: true,
        body: {
            rows: [
                {
                    cols: [{
                        view: 'button',
                        type: "icon",
                        icon: "wxi-plus",
                        label: 'Add',
                        inputWidth: 70,
                        minWidth: 30,
                        align: "right",
                        on: {
                            onItemClick: function () {
                                $$("OtherChargesHidden").add({
                                    Value1: '',
                                    ProductValue: '',
                                    Select: '',
                                    Value3: '',
                                    PROD_ID: '',
                                });
                                $$("OtherChargesHidden").refresh();
                            }
                        }
                    },
                    {
                        view: "button",
                        type: "icon",
                        icon: "wxi-trash",
                        label: "",
                        width: 30,
                        click: function () {
                            $$("OtherChargesHidden").editCancel();
                            $$("OtherChargesHidden").remove($$("OtherChargesHidden").getSelectedId());
                        },
                        align: "right"
                    }
                    ]
                },
                {
                    id: "OtherChargesHidden",
                    select: 'row',
                    view: "datatable",
                    columns: [
                            { id: "Value1", header: 'Other Charges', width: 250, css: { 'text-align': 'center ! important' } },
                            { id: "Select", header: ' ', width: 30, css: { 'text-align': 'center ! important' } },
                            { id: "ProductValue", header: 'Amount', width: 150, css: { 'text-align': 'center ! important' } },
                            { id: "Value3", hidden: true },
                            { id: "PROD_ID", hidden: true },
                    ],

                    height: 400,
                    data: [],
                    on: {
                        'onItemDblClick': function (id) {
                            var getval = this.getItem(id.row);
                            var dataval = $$("Competitor_Grid").getSelectedItem();
                            dataval.CompetitorTy = getval.GRP_NAME;
                            dataval.CompetitorTyId = getval.grp_id;
                            $$("Competitor_Grid").refresh();
                            $$("OtherChargesHiddenPOP").hide();
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
                                                    debugger;
                                                    $$("OtherChargesHiddenPOP").hide();
                                                }
                                            }
                                        },
                                        {
                                            view: 'button',
                                            type: "icon",
                                            icon: "wxi-close",
                                            label: 'Cancel',
                                            width: 100,
                                            align: "right",
                                            on: {
                                                onItemClick: function () {
                                                    debugger;
                                                    $$("OtherChargesHiddenPOP").hide();
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
    });
}
function SaveFB_Prodid_unit() {
    var grid = $$("FandBsheet_Grid").serialize();
    var ProductTypeId = $("#ProductTypeId").val();
    var UnitTyID = $("#UnitTyID").val();
    var no = $("#ProductGridRow").val();
    for (var i = 0; i < grid.length; i++) {
        if (no == i) {
            grid[i].PROD_ID = ProductTypeId;
            grid[i].UnitTyID = UnitTyID;
        }
    }
    $$("FandBsheet_Grid").refresh();
}
