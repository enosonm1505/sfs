$(document).ready(function () {
    //$("#pageload").hide();
    $(".HdrBtnBx").hide();
    $(".loader").fadeOut("slow");
    $('#txtFrmDt').datepicker({
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#txtToDt').datepicker({
        autoclose: true,
        format: 'dd/mm/yyyy'
    });
    //.on('changeDate', function (e) {
    //    $('#Entry_form').formValidation('revalidateField', 'txtReOrdBy');
    //});

    $("#textMemId").val("");
    $("#textMemNm").val("");

    PrcDefDate();
    PrcLoadMembType();
});

function PrcDefDate() {

    var Table = {};
    Table["REQTYPE"] = "FNDEFDATE";
    Table["COMPID"] = $("#COMPID").val();
    var ParamVal = JSON.stringify(Table);

    $.ajax({
        type: "POST",
        async: false,
        url: "/CCReports/API_CALL",
        data: "request=" + ParamVal,
        dataType: "json",
        success: function (data) {
            var aDemo = JSON.parse(data);

            var StartDt = aDemo[0].CURRDT.split('/');

            var BegDt = "01/" + StartDt[1] + "/" + StartDt[2];

            $("#txtFrmDt").val(BegDt);
            $("#txtToDt").val(aDemo[0].DATE1);
        }
    });
}

function PrcLoadMembType() {

    var Table = {};
    Table["REQTYPE"] = "MEMBERTYPE";
    Table["COMPID"] = $("#COMPID").val();
    var ParamVal = JSON.stringify(Table);

    $.ajax({
        type: "POST",
        async: false,
        url: "/CCReports/API_CALL",
        data: "request=" + ParamVal,
        dataType: "json",
        success: function (data) {
            var aDemo = JSON.parse(data);

            var items = "<option value=''>Select</option>";
            $.each(aDemo, function (i, value) {
                items += "<option value=" + value.PLYR_CAT_ID + ">" + value.PLYR_CAT_NM + "</option>";
            });

            $("#ddlMemTy").empty().html(items);
        }
    });
}

function fnMTypeChange() {
    $("#PartyId").val("");
    $('#textMemId').val("");
    $('#textMemNm').val("");
}


function fnPopupMember() {

    var MemType = $("#ddlMemTy").val()

    if (MemType != "") {
        if (MemType == "1") {

            $("#textMemId").val("");
            $("#textMemNm").val("");

            $('#MemberPop').modal('show');
        }
        else if (MemType == "2")
            $('#MemberPop').modal('show');
        else if (MemType == "3")
            $('#MemberPop').modal('show');
        else if (MemType == "3")
            $('#MemberPop').modal('show');

        fnMemberSearch();
    }
    else {
        swal("Error", "Choose Member Type !", "error");
    }
}

function fnMemberSearch() {

    $(".loader").fadeIn("slow");

    var Table = {};
    Table["REQTYPE"] = "MEMBERSEARCH";
    Table["COMPID"] = $("#COMPID").val();
    Table["vType"] = $("#ddlMemTy").val()
   
    var ParamVal = JSON.stringify(Table);

    $.ajax({
        type: "POST",
        async: false,
        url: "/CCReports/API_CALL",
        data: "request=" + ParamVal,
        dataType: "json",
        success: function (data) {
            var aDemo = JSON.parse(data);

            var oTblReport = $("#grdtblMemSrch")
            $('#grdtblMemSrch tbody').empty();

            oTblReport.DataTable({
                "data": aDemo,
                //"responsive": true,
                //"retrieve": true,
                //"processing": true,
                "bLengthChange": false,
                "bInfo": false,
                //"select": true,
                //"scrolly": ($(window).height() - 220),
                "order": [],
                "columns": [
                    {
                        "targets": 1, "data": "PARTY_ID", "title": "Member No", "width": "10%", "Visible": false,
                        "targets": 2, "data": "MEMB_NO", "title": "Member No", "width": "10%", "orderable": false,
                        "template": {
                            "class": "table-header-cell", "style": "text-align:center"
                        },
                    },
                    { "targets": 3, "data": "PARTY_NM", "title": "Member Name", "width": "90%", "orderable": false },
                ],
                "bDestroy": true
            });

          
            //To Clear the Input Filter 
            //oTblReport.search('').search('').draw();
            //oTblReport.$('tr.Popselected').removeClass('Popselected');

            $('#grdtblMemSrch tbody').on('dblclick', 'tr', function () {

                var MemNo = oTblReport.dataTable().fnGetData(this).MEMB_NO;
                var PartyNm = oTblReport.dataTable().fnGetData(this).PARTY_NM;
                var PartyId = oTblReport.fnGetData(this).PARTY_ID;

                if (MemNo != "") {
                    $('#PartyId').val(PartyId);
                    $('#textMemId').val(MemNo);
                    $('#textMemNm').val(PartyNm);
                }
                else {
                    $(this).addClass('Popselected');
                }

                $('#MemberPop').modal('hide');

            });

        }
    });

    $(".loader").fadeOut("slow");
   
}

function PrcDisLedger() {
    //debugger;
    $(".loader").fadeIn("slow");
    var Valid = true;
    var MemType = $("#ddlMemTy").val();
    var StartDt = $("#txtFrmDt").val();
    var EndDt = $("#txtToDt").val();

    if (MemType == "") {
        Valid = false;
        swal("Error", "Select Member Type !", "error");
    }
    else if (StartDt == "" || EndDt == "") {
        Valid = false;
        swal("Error", "Select From/To Date !", "error");
    }
    else {
        if (MemType == "1" && $("#textMemId").val() == "") {
            Valid = false;
            swal("Error", "Member Id Cannot be empty", "error");
        }
    }

    if (Valid == true) {
        var Table = {};
        Table["REQTYPE"] = "CARDTRANLEDGER";
        Table["COMPID"] = $("#COMPID").val();
        Table["FromDt"] = StartDt;
        Table["ToDt"] = EndDt;
        Table["vType"] = MemType;
        Table["vMemIdRpt"] = $("#PartyId").val();

        var ParamVal = JSON.stringify(Table);

        $.ajax({
            type: "POST",
            async: false,
            url: "/CCReports/API_CALL",
            data: "request=" + ParamVal,
            dataType: "json",
            success: function (data) {
                var aDemo = JSON.parse(data);

                var oTblReport = $("#grdCardLedg");
                $('#grdCardLedg tbody').empty();

                oTblReport.DataTable({
                    "data": aDemo,
                    'sDom': '<"pull-left"l>  <"pull-right">ftip',
                    //"responsive": true,
                    //"retrieve": true,
                    //"scrollCollapse": true,
                    //"processing": true,
                    "pageLength": 100,
                    "bLengthChange": false,
                    "bInfo": false,
                    "searching": false,
                    "select": true,
                    "scrollX": true,
                    "scrollY": true,
                    "scrollY": ($(window).height() - 280),
                    //"scrollCollapse": true,
                    //"paging": false,
                    "columns": [
                        { "targets": 1, "data": "TrnNo", "title": "Trn No", "width": "15%", "orderable": false },
                        { "targets": 2, "data": "TrnDt", "title": "Trn Dt", "width": "15%", "orderable": false },
                        { "targets": 3, "data": "TrnType", "title": "Trn Type", "width": "15%", "orderable": false },
                        { "targets": 4, "data": "CrAmt", "title": "Cr Amt", "width": "10%", "orderable": false, "className": "text-right", },
                        { "targets": 5, "data": "DrAmt", "title": "Dr Amt", "width": "10%", "orderable": false, "className": "text-right" },
                        { "targets": 6, "data": "Remarks", "title": "Remarks", "width": "35%", "orderable": false },
                    ],
                    "bDestroy": true,
                    "order": [1],

                    createdRow: function (row, data, dataIndex) {
                        if (data.grpHead == 'G') {

                            $('td:eq(0)', row).attr('colspan', 6);
                            $('td:eq(1)', row).css('display', 'none');
                            $('td:eq(2)', row).css('display', 'none');
                            $('td:eq(3)', row).css('display', 'none');
                            $('td:eq(4)', row).css('display', 'none');
                            $('td:eq(5)', row).css('display', 'none');

                            $('td:eq(0)', row).css("background-color", "#e8d780");
                            $('td:eq(0)', row).css("font-weight", "bold");

                            this.api().cell($('td:eq(0)', row)).data(data.TrnNo);

                            //// Add COLSPAN attribute
                            //$('td:eq(0)', row).attr('colspan', 4);

                            //// Hide required number of columns
                            //$($('td', this)).remove();

                            //$('td:eq(1)', row).next('td').remove();
                            //$('td:eq(2)', row).next('td').remove();
                            //$('td:eq(3)', row).next('td').remove();
                            ////$('td:eq(4)', row).next('td').remove();
                            ////$('td:eq(5)', row).next('td').remove();

                            // Update cell data
                            //this.api().cell($('td:eq(0)', row)).data(data.TrnNo);
                        }
                    }
                });
            }
        });
    }
    $(".loader").fadeOut("slow");
}

