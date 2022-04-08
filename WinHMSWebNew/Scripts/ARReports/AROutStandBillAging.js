function fnCallTariffEditPopUpShowFn(CompId, ConString, UsrId, Mode, RmTyId, RmTyNm, RateTyId, RateTyNm, Currid, CurrNm, ArrDt, ArrTm, DepartDt, DepartTm, Pax, txtAdlt, txtchd1, txtchd2, txtchd3, pGstTy) {

    var RateFixed = 0;

    var DocTypes = [];

    if (!webix.env.touch && webix.env.scrollSize)
        webix.CustomScroll.init();

    var reqobj = new Object;
    reqobj["REQTYPE"] = "GET_LOADTARIFFEDIT";
    reqobj["M_IND"] = $.trim(UsrId);
    reqobj["COMPID"] = $.trim(CompId);
    reqobj["CONSTRING"] = $.trim(ConString);
    reqobj["USRID"] = $.trim(UsrId);
    reqobj["MODE"] = $.trim(Mode);

    var dataparam = JSON.stringify(reqobj);
    $.ajax({
        async: false,
        url: "http://localhost:58091/api/TariffEdit/FOTariffJsonRequest",
        type: 'POST',
        data: dataparam,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (RetData) {
            if (RetData != "") {
                //debugger;
                DataVal = JSON.parse(RetData);

                FoCont = DataVal.TBL_FOCONT;

                C3_IND = FoCont[0].C3_IND;

                if (DataVal.TBL_TARIFFEDITCOUNT > 0) {
                    RateFixed = 1;
                    fntariffedit = false;
                }
                else
                    fntariffedit = true;

                //debugger;
                DocTypes = DataVal.TBL_DISCTYPE;

            }
        },
    });

    var SrchRate = "<span class='webix_input_icon' style='position: relative; top:3px;left:4px;cursor:pointer;font-size:14px;font-weight:bold;Color:Red !important' >R</span>";
    var SrchPlan = "<span class='webix_input_icon' style='position: relative; top:3px;left:4px;cursor:pointer;font-size:14px;font-weight:bold;Color:Red !important' >P</span>";
    var SearchPop = "<span class='webix_input_icon wxi-search ' style='position: relative; top: 4px;left:4px;' ></span>";

    //Rate Code PopUp Windows 
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "Prompt_Rate_Code",
        head: "Rate Code",
        position: "center",
        minWidth: 750,
        maxWidth: 800,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,
        //autowidth: true,
        body: {
            view: 'form',
            minWidth: 750,
            maxWidth: 800,

            elements: [
                {
                    paddingX: 10,
                    PaddingY: 35,
                    height: 30,
                },
                {
                    view: "datatable",
                    id: "Grid_Rate_Code",
                    select: "row",
                    data: [],
                    height: 350,
                    //scrollX: false,
                    //editable: true,
                    scheme: {
                        $change: function (item) {
                            if (item.PkgInd == 1) {
                                item.$css = { 'color': 'Red ! important' };
                            }
                        }
                    },
                    columns: [
                             { header: "RateTyId", id: "RateTyId", hidden: true },
                             { header: "Rate Code", id: "RateTyNm", width: 180, css: { 'text-align': 'left ! important' } },
                             { header: "Single", id: "Single", width: 75, css: { 'text-align': 'right ! important' } },
                             { header: "Double", id: "Double", width: 75, css: { 'text-align': 'right ! important' } },
                             { header: "Triple", id: "Triple", width: 75, css: { 'text-align': 'right ! important' } },
                             { header: "Quadruple", id: "Quadr", width: 75, css: { 'text-align': 'right ! important' } },
                             { header: "Quintuple", id: "Quin", width: 75, css: { 'text-align': 'right ! important' } },
                             { header: "Hexatuple", id: "Hexa", width: 75, css: { 'text-align': 'right ! important' } },
                             { header: "ExtAdlt", id: "ExtAdult", width: 75, css: { 'text-align': 'right ! important' } },
                             { header: "ExtCh1", id: "ExtCh1", width: 75, css: { 'text-align': 'right ! important' } },
                             { header: "ExtCh2", id: "ExtCh2", width: 75, css: { 'text-align': 'right ! important' } },
                             { header: "ExtCh3", id: "ExtCh3", width: 75, css: { 'text-align': 'right ! important' } },
                             { header: "PlanId", id: "PlanId", hidden: true },
                             { header: "PlanNm", id: "PlanNm", width: 150, css: { 'text-align': 'left ! important' } },
                             { header: "PlanAmt", id: "PlanAmt", width: 75, css: { 'text-align': 'right ! important' } },
                             { header: "PchldAmt", id: "PchldAmt", width: 75, css: { 'text-align': 'right ! important' } },
                             { header: "RateCat", id: "RateCat", hidden: true },
                             { header: "TariffEdit", id: "TariffEdit", hidden: true },
                             { header: "TypeId", id: "TypeId", hidden: true },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            debugger;
                            var selectedRows = this.getSelectedItem(id.row);

                            $$("Prompt_Rate_Code").hide();
                        }
                    }
                },
            ]
        }
    });



    //Plan PopUp Windows 
    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "Prompt_Paln",
        head: "Plan Amount",
        position: "center",
        minWidth: 500,
        maxWidth: 500,
        resizeColumn: true,
        resizeRow: true,
        css: "webix_header_border",
        height: 550,
        //autowidth: true,
        body: {
            view: 'form',
            minWidth: 500,
            maxWidth: 500,

            elements: [
                {
                    paddingX: 10,
                    PaddingY: 35,
                    height: 30,
                },
                {
                    view: "datatable",
                    id: "Grid_Plan",
                    select: "row",
                    data: [],
                    height: 350,
                    columns: [
                             { header: "PlanId", id: "AgentId", hidden: true },
                             { header: "Plan Name", id: "AgentNm", width: 230, css: { 'text-align': 'left ! important' } },
                             { header: "Adult Amt", id: "Palce", width: 120, css: { 'text-align': 'left ! important' } },
                             { header: "Child Amt", id: "Narr", width: 145, css: { 'text-align': 'left ! important' } },
                             { header: "Child2 Amt", id: "PartyId", hidden: true },
                             { header: "Child3 Amt", id: "PartyNM", hidden: true },
                             { header: "Single", id: "Comper", hidden: true },
                             { header: "Double", id: "Comper", hidden: true },
                             { header: "Triple", id: "Comper", hidden: true },
                             { header: "Qudrauple", id: "Comper", hidden: true },
                    ],
                    on: {
                        'onItemDblClick': function (id, e, node) {
                            debugger;
                            var selectedRows = this.getSelectedItem(id.row);

                            //var dataval = $$("grdTariffEdit").getSelectedItem();
                            //dataval.TrvAgId = selectedRows[0].AgentId;
                            //dataval.TrvAgNM = selectedRows[0].AgentNm;

                            //if (selectedRows[0].PartyId != "") {
                            //    dataval.CompId = selectedRows[0].PartyId;
                            //    dataval.CompNm = selectedRows[0].PartyNM;
                            //}

                            //$$("grdTariffEdit").refresh();

                            //$$("Prompt_TrvAgent").hide();
                        }
                    }
                },
            ]
        }
    });



    webix.ui({
        view: "window",
        close: true,
        modal: true,
        id: "TariffEditPopup",
        head: "Tariff Edit",
        position: "center",
        minWidth: 950,
        maxWidth: 1200,
        height: 550,
        autowidth: true,
        body: {
            view: 'form',
            minWidth: 900,
            maxWidth: 1050,

            elements: [
                {
                    paddingX: 10,
                    PaddingY: 35,
                    height: 65,
                    cols: [
                        {
                            minWidth: 1000,
                            maxWidth: 1000,
                            rows: [
                                 {
                                     paddingX: 0,
                                     PaddingY: 100,
                                     cols: [{
                                         view: "text",
                                         id: "txtRoomTy",
                                         label: "Room Ty",
                                         inputWidth: 250,
                                         labelWidth: 60,
                                         maxWidth: 280,
                                         value: RmTyNm,
                                         labelAlign: "left",
                                         readonly: true,
                                     },
                                     {
                                         view: "text",
                                         id: "txtCurrency",
                                         label: "Currency",
                                         inputWidth: 200,
                                         labelWidth: 60,
                                         maxWidth: 230,
                                         value: CurrNm,
                                         labelAlign: "left",
                                         readonly: true,
                                     },
                                       {
                                           view: "text",
                                           id: "txtRateTy",
                                           label: "Rate Type",
                                           inputWidth: 300,
                                           labelWidth: 65,
                                           maxWidth: 380,
                                           value: RateTyNm,
                                           labelAlign: "left",
                                           readonly: true,
                                       }
                                     ]
                                 },
                                 {
                                     cols: [{
                                         view: "text",
                                         id: "txtArrDt",
                                         label: "Arrival Dt",
                                         inputWidth: 170,
                                         labelWidth: 60,
                                         minWidth: 260,
                                         value: ArrDt,
                                         labelAlign: "left",
                                         readonly: true,
                                     },
                                     {
                                         view: "text",
                                         id: "txtDepartDt",
                                         label: "Departure Dt",
                                         inputWidth: 190,
                                         labelWidth: 80,
                                         minWidth: 240,
                                         value: DepartDt,
                                         labelAlign: "Right",
                                         readonly: true,
                                     },
                                      {
                                          view: "text",
                                          id: "txtPax",
                                          label: "Charge Pax",
                                          inputWidth: 125,
                                          labelWidth: 75,
                                          minWidth: 155,
                                          maxWidth: 155,
                                          labelAlign: "left",
                                          readonly: true,
                                      },
                                       {
                                           view: "text",
                                           id: "txtTotTariff",
                                           label: "Total Tariff",
                                           inputWidth: 160,
                                           labelWidth: 70,
                                           minWidth: 190,
                                           maxWidth: 210,
                                           labelAlign: "left",
                                           readonly: true,
                                       },
                                       {
                                           view: "text",
                                           id: "txtNetTariff",
                                           label: "Net Tariff",
                                           inputWidth: 160,
                                           labelWidth: 63,
                                           minWidth: 170,
                                           maxWidth: 170,
                                           labelAlign: "left",
                                           readonly: true,
                                       },
                                     ]
                                 }
                            ],
                        },
                    ]
                },
                {
                    view: "datatable",
                    id: "grdTariffEdit",
                    select: "row",
                    data: [],
                    height: 350,
                    //scrollX: false,
                    editable: true,
                    columns: [
                           { header: "Date", id: "Date", width: 75, css: { 'text-align': 'center ! important' } },
                           { header: "Day", id: "Days", width: 40, css: { 'text-align': 'center ! important' } },
                           { header: "RateId", id: "RateTyId", hidden: true },
                           { header: "Rate Code", id: "RateTyNm", width: 120, css: { 'text-align': 'left ! important' } },
                           { header: " ", id: "RatePop", width: 25, template: SrchRate, css: { 'text-align': 'center ! important' } },
                           { header: "Single", id: "TarSng", width: 70, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "Double", id: "TarDbl", width: 70, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "Triple", id: "TarTri", width: 70, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "Quard.", id: "TarQuad", width: 60, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "Quin.", id: "TarQuin", width: 60, hidden: (C3_IND == 3 ? true : false), editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "Hex.", id: "TarHex", width: 60, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },

                           { header: "ExtAdult", id: "ExtAdult", width: 70, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "ExtChild1", id: "ExtChild", width: 75, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "Child2", id: "ExtChild2", width: 75, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "Child3", id: "ExtChild3", width: 75, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "Disc%", id: "DiscPer", width: 75, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "DiscAmt", id: "DiscAmt", width: 75, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "Reason", id: "DiscRea", width: 75, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },

                           { header: "CBy", id: "CBy", hidden: true },
                           { header: "CDt", id: "CDt", hidden: true },

                           { header: "Disc Type ", id: "DiscTyNM", width: 85, css: { 'text-align': 'left ! important' }, editor: "select", collection: function (id) { return DocTypes; } },
                           { header: "Disc Type Id ", id: "DiscTyID", hidden: true, width: 85, css: { 'text-align': 'left ! important' } },

                           { header: "CompId", id: "CompId", css: { 'text-align': 'left ! important' }, hidden: true, },
                           { header: "Company", id: "CompNm", width: 100, css: { 'text-align': 'left ! important' } },
                           { header: " ", id: "CompSrch", width: 25, template: SearchPop, css: { 'text-align': 'center ! important' } },

                           { header: "T.Agent", id: "TrvAgId", css: { 'text-align': 'left ! important' }, hidden: true, },
                           { header: "T.Agent", id: "TrvAgNM", width: 100, css: { 'text-align': 'left ! important' } },
                           { header: " ", id: "TrvSrch", width: 25, template: SearchPop, css: { 'text-align': 'center ! important' } },

                           { header: "Adult", id: "Adult", width: 45, editor: 'text', liveEdit: true, css: { 'text-align': 'Center ! important' } },
                           { header: "Ch1", id: "Child", width: 45, editor: 'text', liveEdit: true, css: { 'text-align': 'Center ! important' } },
                           { header: "Ch2", id: "Child2", width: 45, editor: 'text', liveEdit: true, css: { 'text-align': 'Center ! important' } },
                           { header: "Ch3", id: "Child3", width: 45, editor: 'text', liveEdit: true, css: { 'text-align': 'Center ! important' } },

                           { header: "Plan", id: "PlanId", width: 50, editor: 'text', liveEdit: true, css: { 'text-align': 'Center ! important' } },
                           { header: " ", id: "PlnSrch", width: 25, template: SrchPlan, css: { 'text-align': 'center ! important' } },
                           { header: "P.Adult", id: "PlnAd1", width: 70, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "P.Ch1", id: "PlnCh1", width: 70, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "P.Ch2", id: "PlnCh2", width: 70, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                           { header: "P.Ch3", id: "PlnCh3", width: 70, editor: 'text', liveEdit: true, css: { 'text-align': 'Right ! important' } },
                    ],
                    on: {
                        //
                        onItemClick: function (id, index) {
                            debugger;

                            var getval = this.getItem(id.row);
                            if (id.column == "RatePop") {

                                var RowIndexId = $$("grdTariffEdit").getFirstId();

                                if (id != RowIndexId) {
                                    fnLoadRateCode(CompId, ConString, UsrId, Currid, RmTyId);
                                    $$("Prompt_Rate_Code").show();
                                }
                            }

                            if (id.column == "CompSrch") {
                                fnLoadCompany(CompId, ConString, UsrId);
                                $$("Prompt_Company").show();
                            }

                            if (id.column == "TrvSrch") {
                                fnLoadTravelAgent(CompId, ConString, UsrId);
                                $$("Prompt_TrvAgent").show();
                            }

                            if (id.column == "PlnSrch") {
                                //fnLoadTravelAgent(CompId, ConString, UsrId);
                                $$("Prompt_Paln").show();
                            }
                        }
                    }
                },
                {
                    PaddingY: 20,
                    cols: [
                         {
                             minWidth: 850,
                             maxWidth: 850,

                             rows: [
                                  {
                                      cols: [{
                                          view: 'icon',
                                          icon: 'wxi-file',
                                          maxWidth: 30,
                                      },
                                         {
                                             view: 'button',
                                             label: 'Restore to Standard Rate',
                                             maxWidth: 200
                                         },
                                          {
                                              view: 'button',
                                              label: 'Log',
                                              hidden: fntariffedit,
                                              maxWidth: 50
                                          },
                                      ]
                                  }
                             ]
                         },
                         {
                             minWidth: 150,
                             maxWidth: 150,
                             paddingX: 50,
                             rows: [
                                 {
                                     cols: [
                                        {
                                            view: 'button',
                                            label: 'Save',
                                            maxWidth: 70,
                                        },
                                        {
                                            view: 'button',
                                            label: 'Exit',
                                            maxWidth: 70,
                                            on: {
                                                onItemClick: function () {
                                                    $$('TariffEditPopup').hide();
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


    fnLoadTariffData(CompId, ConString, UsrId, Mode, RmTyId, RateTyId, Currid, ArrDt, ArrTm, DepartDt, DepartTm, RateFixed, Pax, txtAdlt, txtchd1, txtchd2, txtchd3, pGstTy);

    $$("TariffEditPopup").show();
}