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
    //console.log(lenElements.length);

    if (lenElements.length == 1) {
        //tfsAlert("חייבת להיות לפחות רשומה אחת בטבלה", "טבלאות", 64);
        //tfsAlert("atleast one row", "טבלאות", 64);
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

    $('.receipts #spnTotSumReceipts').text(total);
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
    $('.payments #spnTotSumPayments').text(total);
}



/*Start section form 4.10*/
function AddTaxChange(btnAdd, cellNum) {
    AddRow(btnAdd, cellNum);
    SumTotalTaxChange();
}

function DeleteTaxChange(delImage, e, cellNumId, tblId) {
    DelRow(e, cellNumId, tblId);

    //remove ELEMENT from DOM
    var noofrows = $('.taxchange #tdNumTaxChange').length;
    if (noofrows > 1) {
        var delRow = $(delImage).closest('tr');
        $(delRow).remove();
    }
    SumTotalTaxChange();
}

function SumTotalTaxChange() {

    var total = 0;

    $('.taxchange .localtaxregula').each(function (i, obj) {
        //check if a number
        var tbValue = $.trim($(obj).val());

        if ($.isNumeric(tbValue)) {
            total += parseFloat(tbValue);
        }
    });
    $('.taxchange #spnlocaltaxregula').text(total);

    total = 0;
    $('.taxchange .cuuryrreqtar').each(function (i, obj) {
        //check if a number
        var tbValue = $.trim($(obj).val());

        if ($.isNumeric(tbValue)) {
            total += parseFloat(tbValue);
        }
    });
    $('.taxchange #spncuuryrreqtar').text(total);

    total = 0;
    $('.taxchange .cuuryrreqpay').each(function (i, obj) {
        //check if a number
        var tbValue = $.trim($(obj).val());

        if ($.isNumeric(tbValue)) {
            total += parseFloat(tbValue);
        }
    });
    $('.taxchange #spncuuryrreqpay').text(total);

    total = 0;
    $('.taxchange .incdecdesper').each(function (i, obj) {
        //check if a number
        var tbValue = $.trim($(obj).val());

        if ($.isNumeric(tbValue)) {
            total += parseFloat(tbValue);
        }
    });
    $('.taxchange #spnincdecdesper').text(total);

    total = 0;
    $('.taxchange .totarsqmet').each(function (i, obj) {
        //check if a number
        var tbValue = $.trim($(obj).val());

        if ($.isNumeric(tbValue)) {
            total += parseFloat(tbValue);
        }
    });
    $('.taxchange #spntotarsqmet').text(total);


    total = 0;
    $('.taxchange .totinccurrtaxwarr').each(function (i, obj) {
        //check if a number
        var tbValue = $.trim($(obj).val());

        if ($.isNumeric(tbValue)) {
            total += parseFloat(tbValue);
        }
    });
    $('.taxchange #spntotinccurrtaxwarr').text(total);


    total = 0;
    $('.taxchange .totincordreq').each(function (i, obj) {
        //check if a number
        var tbValue = $.trim($(obj).val());

        if ($.isNumeric(tbValue)) {
            total += parseFloat(tbValue);
        }
    });
    $('.taxchange #spntotincordreq').text(total);

    total = 0;
    $('.taxchange .totaddi').each(function (i, obj) {
        //check if a number
        var tbValue = $.trim($(obj).val());

        if ($.isNumeric(tbValue)) {
            total += parseFloat(tbValue);
        }
    });
    $('.taxchange #spntotaddi').text(total);

    total = 0;
    $('.taxchange .numtaxpay').each(function (i, obj) {
        //check if a number
        var tbValue = $.trim($(obj).val());

        if ($.isNumeric(tbValue)) {
            total += parseFloat(tbValue);
        }
    });
    $('.taxchange #spnnumtaxpay').text(total);

    total = 0;
    $('.taxchange .sincerate').each(function (i, obj) {
        //check if a number
        var tbValue = $.trim($(obj).val());

        if ($.isNumeric(tbValue)) {
            total += parseFloat(tbValue);
        }
    });
    $('.taxchange #spnsincerate').text(total);


}

/*End section form 4.10*/


/* START section form 4.18*/

function AddEmpUnderPersonalCont(btnAdd, cellNum) {
    AddRow(btnAdd, cellNum);
}

function DeleteEmpUnderPersonalCont(delImage, e, cellNumId, tblId) {
    DelRow(e, cellNumId, tblId);
}


/* END section form 4.18*/

/* START section form 4.12*/

function AddtblReqAreaRevSharing(btnAdd, cellNum) {
    AddRow(btnAdd, cellNum);
}

function DeletetblReqAreaRevSharing(delImage, e, cellNumId, tblId) {
    DelRow(e, cellNumId, tblId);
}


function AddtblObtPrpTaxRevenue(btnAdd, cellNum) {
    AddRow(btnAdd, cellNum);
}

function DeletetblObtPrpTaxRevenue(delImage, e, cellNumId, tblId) {
    DelRow(e, cellNumId, tblId);
}

function AddtblReqAreaTaxSharing(btnAdd, cellNum) {
    AddRow(btnAdd, cellNum);
}

function DeletetblReqAreaTaxSharing(delImage, e, cellNumId, tblId) {
    DelRow(e, cellNumId, tblId);
}

/* END section form 4.12*/


//----- End User Functions -----------------------------------------------

