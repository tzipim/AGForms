var IsToolBarOn;
IsToolBarOn = false;
var CurrentPlugInVersion;
CurrentPlugInVersion = "";


function window_onload() {





    var language = document.getElementById("GeneralAttributes").getAttribute("tfsLanguage") || "";
    var isHebrew = language.toLowerCase() != "english";

    var isIE = (window.navigator.appName.indexOf("Internet Explorer") != -1);

    var installURL = isIE ?
        "http://forms.gov.il/download/signandverify.exe" :
        "http://forms.gov.il/download/agtoolbar.xpi";

    if (!IsToolBarOn || CurrentPlugInVersion == "") {
        if (isHebrew) {
            document.write("<br><br><table width=640 cellspacing=0 align=center bgcolor='#B2D0EF' border=2 >");
            document.write("<tr ><td><img src='http://forms.gov.il/forms/resources/images/govformsheader.gif' style='visibility: hidden'; onload='this.style.visibility=\"\"'></td></tr>");
            document.write("<tr height=330px ><td colspan=2 style='PADDING-RIGHT: 86px; PADDING-LEFT: 86px; PADDING-TOP: 30px;FONT-SIZE: 20px; COLOR: #000000; FONT-FAMILY: Arial;' dir=rtl valign=top >");
            document.write("<span style='FONT-WEIGHT: bold; FONT-SIZE: 30px; COLOR:#23476b; FONT-FAMILY: Arial'><b>ברוך הבא לשירות הטפסים הלאומי!</b></span><br><br><span><b>על מנת למלא את הטופס בצורה נוחה ויעילה עליך להוריד את תוכנת סרגל הכלים.</b></span><br><br>");
            document.write("<span><b>להורדת סרגל הכלים </span><a href='" + installURL + "'>לחץ כאן</b></a><br><br>");
            document.write("<strong>למידע נוסף <a href='http://www.gov.il/FirstGov/Forms/download' target='_blank'>לחץ כאן</a></strong>");
            document.write("<br><br><span><b>לתמיכה טכנית 24 שעות ביממה 1-800-200-560</b></span><br><br></td></tr></table>");
            document.close();
        } else {
            document.write("<br><br><table width=640 cellspacing=0 align=center bgcolor='#B2D0EF' border=2 >");
            document.write("<tr ><td><img src='http://forms.gov.il/forms/resources/images/govformsheader.gif' style='visibility: hidden'; onload='this.style.visibility=\"\"'></td></tr>");
            document.write("<tr height=330px ><td colspan=2 style='PADDING-RIGHT: 86px; PADDING-LEFT: 86px; PADDING-TOP: 30px;FONT-SIZE: 20px; COLOR: #000000; FONT-FAMILY: Arial;' dir=LTR valign=top >");
            document.write("<span style='FONT-WEIGHT: bold; FONT-SIZE: 30px; COLOR:#23476b; FONT-FAMILY: Arial'><b>Welcome to Israel e-Gov services!</b></span><br><br><span><b>In order to view and user the form you need to install the AGForms toolbar</b></span><br><br>");
            document.write("<span><b>To download the toolbar  </span><a href='" + installURL + "'>press here</b></a><br><br>");
            document.write("<strong>To learn more  <a href='http://www.gov.il/FirstGov/Forms/download' target='_blank'>press here </a></strong>");
            document.write("<br><br><span><b>לתמיכה טכנית 24 שעות ביממה 1-800-200-560</b></span><br><br></td></tr></table>");
            document.close();
        }
    }

}




//----- Start User Functions ---------------------------------------------
//----- Fix interface functions ------------------------------------------
function checkFormIntegrityUser() {

    return true;
}

function checkControlIntegrityUser(control, showAlert) {
    return "";
}

function userBeforeSubmit() { //  requires plugin version 1.3.0.0

    return true;
}

function userBeforeSave() {//Requires plugin version 1.3.0.0

    return true;
}

function windowOnLoadUser() {





    if (compareVersion(CurrentPlugInVersion, document.getElementById("GeneralAttributes").getAttribute('tfspluginversion')) == -1) {
        var isIE = (window.navigator.appName.indexOf("Internet Explorer") != -1);

        var installURL = isIE ?
            "http://forms.gov.il/download/signandverify.exe" :
            "http://forms.gov.il/download/agtoolbar.xpi";

        document.getElementById("versionErrorMessageURL").href = installURL;

        document.getElementById("versionError").style.display = "inline";
        //Lock submit button
        document.getElementById("GeneralAttributes").setAttribute("tfsdisablebuttons", "submit");
        //update labels in message:
        setValue('currentVersion', CurrentPlugInVersion);
        setValue('newVersion', document.getElementById("GeneralAttributes").getAttribute('tfspluginversion'));
        // Lock form:
        document.getElementById("UpgradeNeeded").style.display = "none";
        //Check if there is a function tfsLock (Availble from 1400) so Lock main div.
        //if (typeof tfsLock == 'function')
        //  tfsLock("mainDiv");

    }

}

function setCalculatePropertiesUser() {

}

function userBeforeSign(spanID) { //Requires plugin version 1.3.0.0

    return true;
}

function userAfterSign(spanID) {  //Requires plugin version 1.3.0.0

}

function userBeforeRemoveSignature(spanID) { //Requires plugin version 1.4.0.0

    return true;
}

function userAfterRemoveSignature(spanID) {  //Requires plugin version 1.4.0.0

}

function userBeforeImportXML() {  //Requires plugin version 1.3.0.0

    return true;
}

function userAfterImportXML() {  //Requires plugin version 1.3.0.0

}

function userBeforeResetForm() {  //Requires plugin version 1.3.0.0

    return true;
}

function userAfterResetForm() {  //Requires plugin version 1.3.0.0

}

function userBeforeLockForm() {  //Requires plugin version 1.3.0.0

    return true;
}

function userBeforePrint(isPrintPreview) {  //Requires plugin version 1.3.0.1
    delSelect()
    return true;
}

function userAfterPrint(isPrintPreview) {  //Requires plugin version 1.3.0.1
    returnSelect()
}

function userBeforeAddAttachment(fileName, size, inputID) {  //Requires plugin version 1.4.0.0

    return true;
}

function userAfterAddAttachment(inputID) {  //Requires plugin version 1.4.0.0

}

function userBeforeRemoveAttachment() {  //Requires plugin version 1.4.0.0

    return true;
}

function userAfterRemoveAttachment() {  //Requires plugin version 1.4.0.0

}
//---------- Free Functions ------------------------------------------------

function delSelect() {
    var b = document.getElementsByTagName("SELECT");
    for (i = 0; i < b.length; i++) {
        if (b.item(i).style.display != "none" && b.item(i).selectedIndex != -1) {
            var selInput = document.createElement("INPUT");
            selInput.id = "inp" + i;
            selInput.className = "Toprint";
            selInput.style.textAlign = "right";
            b.item(i).parentNode.appendChild(selInput);
            (b.item(i)[b.item(i).selectedIndex].text != "בחר") ? selInput.value = b.item(i)[b.item(i).selectedIndex].text : selInput.value = "";
            var str = selInput.value;
            (str.length >= 0 && str.length < 4) ? selInput.size = 1 : selInput.size = str.length;
            //במקום השורה הקודמת יכולה להופיע השורה הבאה, תלוי בגודל שרוצים שיהיה
            //השורה הבאה אינה מושלמת, לשאול את רחל
            //(str.length>=0&&str.length<4 )?selInput.size=b.item(i).clientWidth/10;
        }
    }
}


//הפונקציה נקראת באירוע onafterprint="returnSelect()"
function returnSelect() {
    var b = document.getElementsByTagName("SELECT");
    for (i = 0; i < b.length; i++) {
        var a = document.getElementById("inp" + i);
        if (a)
            a.parentNode.removeChild(a);
    }
}
function compareVersion(v1, v2) {
    var ar1 = v1.split(".");
    var ar2 = v2.split(".");
    var len = Math.min(v1.length, v2.length);
    for (var i = 0; i < len; i++) {
        var n1 = parseInt(ar1[i], 10);
        var n2 = parseInt(ar2[i], 10);
        if (n1 > n2) return 1;
        if (n1 < n2) return -1;
    }
    if (ar1.length > ar2.length) return 1;
    if (ar1.length < ar2.length) return -1;
    return 0;
}

function showmessage(str) {
    if (str != "")
    { alert(str); }

}

//----- End User Functions -----------------------------------------------