$(document).ready(function() { 
    //layout
    // setSuccessPageBoxesWidth();
});

function clickLogo() {
    resetEventRanks();
    moveToRandomPage();
}

function clickRandomExit() {
    allReset(); //index.js
    exitRandomPage();
}

function clickRandomSubmit() {
    addTextareaValueToData();
    showDataCounts();
    lockScrollBar();
    moveToQuestionPage();
}

function clickResultExit() {
    clearResultPageValues();
    exitResultPage();
}

function clickQyesBtn() {
    doGoldenDice();
    saveData();
    unlockScrollBar();
    moveToSuccessPage();
}

function clickQnoBtn() {
    clearAdditionalData();
    unlockScrollBar();
    returnToRandomPage();
}

function clickSuccess() {
    allReset(); //index.js
    exitSuccessPage();
    // !!! 작동 안됨
    window.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth'
      });
}

//공통 사용 함수
function allReset() {
    //clear global fields
    allData = new Array(); //**global field
    filesData = new Array(); //**global field
    additionalData = new Array(); //**global field
    //reset random page form : url, file, rank
    $('#randomContainer form').trigger("reset");
    //reset uploadedFileName
    $('#uploadedFileName').text('파일선택');
    $('#uploadedFileName').css('color','silver');
    //reset textarea
    $('#randomContainer textarea').val('');
    //reset question page - filename
    $('#questionContent #afBox .Qright').html('');
    //reset url disabled
    document.getElementById("url").disabled = false;
}