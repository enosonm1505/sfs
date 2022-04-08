
function ValidatePasssword() {
    debugger;
    var txtPwd = document.getElementById("hfUserPwd").value;
    var txthidPwd = document.getElementById("hfdhidepassword").value;
    var txtOldPwd = document.getElementById("txtOldPwd").value;
    var txtConfirmPwd = document.getElementById("txtConfirmPwd");
    var txtNewPwd = document.getElementById("txtNewPwd");
    var btnSave = document.getElementById("btnSave");

    //var btn = document.getElementById('btnbind');
    //btn.click();
    var oldps = txtOldPwd;

    function Trim(nStr) { return nStr.replace(/(^\s*)|(\s*$)/g, ""); }
    if (Trim(txthidPwd) == Trim(txtPwd)) {
        txtNewPwd.value = '';
        txtConfirmPwd.value = '';
        txtConfirmPwd.disabled = true;
        txtNewPwd.disabled = true;
        btnSave.disabled = true;
        document.getElementById("txtOldPwd").value = oldps;
        return false;
    }
    else {
        txtConfirmPwd.disabled = false;
        txtNewPwd.disabled = false;
        btnSave.disabled = false;
        document.getElementById('hdnFocus').value = 'txtNewPwd';
    }
}
function oldpsgetvalues() {
    
    var btn = document.getElementById('btnbind');
    btn.click();

}
function ValidatePasssword1(val) {
    debugger;
    alert(val);

    document.getElementById("txtOldPwd").value = val;

}

function ValiDateFinal() {
    var txtNewPwd = document.getElementById("txtNewPwd").value;
    var txtConfirmPwd = document.getElementById("txtConfirmPwd").value;
    function Trim(nStr) { return nStr.replace(/(^\s*)|(\s*$)/g, ""); }
    if (Trim(txtConfirmPwd) != Trim(txtNewPwd)) {
        document.getElementById('divMsgAlert').style.display = 'block';
        document.getElementById('lblAlertPop').innerText = 'Password does not match';
        document.getElementById('hdnFocus').value = 'txtNewPwd';
        txtConfirmPwd.value = ''; txtNewPwd.value = '';
        return false;
    }
}
