function HideElments() {

    var online = navigator.onLine;


    if (!online) {

        //var elsOffLine = document.getElementsByClassName("facilityOfflineInfo");
        //Array.prototype.forEach.call(elsOffLine, function (el) {
        //    el.style.display = "block";
        //});


        //var elOnline = document.getElementsByClassName("facilityOnlineInfo");
        //Array.prototype.forEach.call(elOnline, function (el) {
        //    el.style.display = "none";
        //});

    }
    else {

        //var elsOffLine = document.getElementsByClassName("facilityOfflineInfo");
        //Array.prototype.forEach.call(elsOffLine, function (el) {
        //    el.style.display = "none";
        //});


        //var elOnline = document.getElementsByClassName("facilityOnlineInfo");
        //Array.prototype.forEach.call(elOnline, function (el) {
        //    el.style.display = "block";
        //});
    }




}



// window.onload = function () { alert("It's loaded!") }




//----- Start User Functions ---------------------------------------------
//----- Fix interface functions ------------------------------------------

function checkFormIntegrityUser() { //dont delete function declaretion

    return true;
}


function checkControlIntegrityUser(control, showAlert) {// dont delete function declaretion
    return ""; // return "" or error message
}

function userSubmit() { // dont delete function declaretion

}

function windowOnLoadUser() {// dont delete function declaretion

}

function setCalculatePropertiesUser() {// dont delete function declaretion
}
function fillDates(fieldName) {
    
}

//---------- Free Functions ------------------------------------------------



//כמות tr בתוך thead בטבלה
function GetNumberTrInTable(tblId, theadOrTbody) {
    return $("#" + tblId + " > " + theadOrTbody + " > tr").length;
}
//מציאת שורה בטבלה דינמית
function FindIndex(obj) {
    return $(obj).closest("table[tfsdata] > tbody > tr").get(0);
}

function DelRow(e, cellNumId, tblId) {

    var lenElements = document.getElementsByName(cellNumId);
    if (lenElements.length == 1) {
        tfsAlert("חייבת להיות לפחות רשומה אחת בטבלה", "טבלאות", 64);
        return;
    }

    var indexCurrentRow = FindIndex(e.srcElement || e.target).rowIndex; // Index tr
    var numRowInThead = GetNumberTrInTable(tblId, "thead");; // length tr in thead
    
    // מחיקה
    //document.getElementById(tblId).deleteRow(indexCurrentRow);
    // סידור מיספור השורות
    for (var i = indexCurrentRow - numRowInThead; i < lenElements.length; i++)
        lenElements[i].innerHTML = i + 1;
    // הודעה למשתמש
    //tfsAlert("שורה מספר " + (indexCurrentRow - numRowInThead + 1) + " נמחקה", "טבלאות", 64);

}
//הוספת שורה לטבלה דינמית
function AddRow(btnAdd, cellNum) {
    var clickAdd = document.getElementById(btnAdd);
    clickAdd.click();
    var cellNum = document.getElementsByName(cellNum);
    cellNum[cellNum.length - 1].innerHTML = cellNum.length;
}


function checkIdNum(stringId) {
    
    if (getValue(stringId) != "") {
        var i;
        var param = getValue(stringId);

        var numDigits = 9 - param.length;

        if (numDigits != 0) {
            for (i = 0; i < numDigits; i++)
                param = 0 + stringId;
        }
        if (param == "000000000") {
            tfsAlert('עליך להזין מספר זהות בן 9 ספרות כולל ספרת ביקורת', 'שגיאה במילוי טופס', 16)
            return false;
        }
        var len = param.length;
        var returnValue = 0;
        var tempValue = 0;

        for (i = 0; i < len; i += 2)
            returnValue = parseInt(param.substr(i, 1)) + returnValue;

        for (i = 1; i < len; i += 2) {
            tempValue = parseInt(param.substr(i, 1)) * 2;

            if (tempValue > 9)
                tempValue = tempValue - 9;
            returnValue = returnValue + tempValue;
        }
        returnValue = returnValue % 10;

        if (returnValue != 0) {
            tfsAlert('עליך להזין מספר זהות בן 9 ספרות כולל ספרת ביקורת', 'שגיאה במילוי טופס', 16)
            return false;
        }
    }
    return true;
}

function AddReceiptRow(btnAdd, cellNum)
{
    AddRow(btnAdd, cellNum);
    SumTotalRecipts();
}

function DeleteReceiptRow(delImage, e, cellNumId, tblId) {
    DelRow(e, cellNumId, tblId);

    //remove ELEMENT from DOM if > 1
    var noofrows = $('.receipts .tbrecptsum').length;
    if (noofrows > 1) {
        var delRow = $(delImage).closest('tr');
        $(delRow).remove();
    }
    SumTotalRecipts();
}

function SumTotalRecipts()
{

    var total = 0;
    $('.receipts .tbrecptsum').each(function (i, obj) {

        //check if a number
        var tbValue = $.trim($(obj).val());

        if ($.isNumeric(tbValue)) {
            total += parseFloat(tbValue);
        }
       
    });

    $('#section_Receipts #spnTotSumReceipts').text(total);
}





function AddPaymentRow(btnAdd, cellNum) {
    AddRow(btnAdd, cellNum);
    SumTotalPayments();
}

function DeletePaymentRow(delImage, e, cellNumId, tblId) {
    DelRow(e, cellNumId, tblId);

    //remove ELEMENT from DOM
    var noofrows = $('.payments .tbpaysum').length;
    if (noofrows > 1) {
        var delRow = $(delImage).closest('tr');
        $(delRow).remove();
    }
    SumTotalPayments();
}

function SumTotalPayments() {

    var total = 0;
    $('.payments .tbpaysum').each(function (i, obj) {

        //check if a number
        var tbValue = $.trim($(obj).val());

        if ($.isNumeric(tbValue)) {
            total += parseFloat(tbValue);
        }

    });
    console.log(total);
    $('#section_Payments #spnTotSumPayments').text(total);
}



//----- End User Functions -----------------------------------------------

