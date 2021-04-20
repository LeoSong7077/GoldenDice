function urlCheckBoxOnchange(isChecked) {
    if (isChecked) {
        document.getElementById("url").disabled = false;
    }
    else {
        document.getElementById("url").disabled = true;
    }
    //url input의 disabled 에 대한 toggling
    //$('#url').prop('disabled', function(i, v) { return !v; });
}

function loadFileName(file) {
    let filename = '';
    if (window.FileReader){ // modern browser 
        filename = file.name;
    } 
    else { // old IE 
        filename = $('#fileInput').val().split('/').pop().split('\\').pop();
    }  
    $('#uploadedFileName').append(`<p>${filename}</p>`);
    //question page, append filename
    $('#questionContent #afBox .Qright').append(`
        <li class="Qvalue" style="word-break: keep-all;">${filename}</li>`);
}

function readmultifiles(files) {
    if (allData.length === 0) {
        $('#uploadedFileName').html('');
        $('#uploadedFileName').css('color','black');
    }
    var reader = new FileReader();  
    function readFile(index) {
        if ( index >= files.length ) return;
            var file = files[index];
            let fileType = '.' + file.name.split('.')[1];
            let validTypes = new Array(".csv", ".json");
        if (validTypes.indexOf(fileType) < 0) { // fileType &&
            window.alert("Invalid file selected. valid files are of " + validTypes.toString() + " types. ");
            return false;
        }         
        reader.onload = function(e) {  
            // get file content  
            var data = e.target.result;
            console.log("onload filetype : " + fileType);
            fileToServer(fileType, data); 
            loadFileName(file);

            readFile(index+1)
        }
        reader.readAsBinaryString(file);
    }
    readFile(0);
  }    

//**using global variable
function fileToServer(fileType, data) {
    var fileType = fileType.substring(1);
    //console.log(fileType);

    $.ajax({
        url : "/ajax_file", // 이 url 서버에 보낼 것이다.
        type : "POST", // 통신 방식
        //contentType: "application/json; charset=utf-8",
        //async: false,
        dataType : "JSON", // 통신, 운반에 사용할 데이터 종류
        data : {"data" : data, "type" : fileType}, // 받을때 데이터 명칭 : 보낼 데이터
    })

    .done(function (json){ //넘어온 json 데이터
        //$(".result").text(json.data);
        const data = json.data;
        if (Array.isArray(data) === true) {
            console.log('ajax array data response');
            //단일 데이터를 섞을 경우 이 allData를 참조하지 못하는 에러가 나온다.
            allData = allData.concat(data);
            filesData = filesData.concat(data);
            //console.log(data);
        } else {
            console.log('ajax single data response')                
            allData = allData.push(data);
            filesData = filesData.push(data);
            //console.log(data);
        }
    })

    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed");
    });
}

//**using global variable
function saveData() {
    const url = $('#url').val(); //기본값이 undefined면 조건문으로 해야됨.
    const data = JSON.stringify(allData);
    const winners = JSON.stringify(finalWinners);

    $.ajax({
        url : "/ajax_save", // 이 url 서버에 보낼 것이다.
        type : "POST", // 통신 방식
        dataType : "JSON", // 통신, 운반에 사용할 데이터 종류
        data : { "url" : url, "winners" : winners, "data" : data }, // 받을때 데이터 명칭 : 보낼 데이터
    })

    .done(function (json){ //넘어온 json 데이터
        console.log('---database saved---');
        //success page dicecode 저장
        const dicecode = json.dicecode;
        $("#success .Svalue").text(dicecode);
    })

    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed");
    });
}

function getTextareaData() {
    var stringData = $('#dataInput').val().trim(); //textarea
    let arrData = [];
    if (stringData !== '') {
        arrData = stringData.split(/\s+|\,\s*/); // \s:공백 , +:하나이상의 문자 , *:0개이상의 문자
    }
    return arrData;
}

//**using global variable
function addTextareaValueToData() {
    allData = allData.concat(getTextareaData());
    additionalData = additionalData.concat(getTextareaData());
}

//**using global variable
function clearAdditionalData() {
    additionalData = [];
    allData = filesData;
}

//**using global variable
let eventRankCount = 1;
function addEventRanks() {
    //eventRankBox
    $("#eventRankBox").append(`<div>
                        <span class="eventRank">${3*eventRankCount + 1}등 : <input type="number" required></span>
                        <span class="eventRank">/ ${3*eventRankCount + 2}등 : <input type="number" required></span>
                        <span class="eventRank">/ ${3*eventRankCount + 3}등 : <input type="number" required></span>
                    </div>`);

    //success page : add winners
    $("#successWinnersBox ul").append(`<li>
                            <p>${3*eventRankCount + 1}등</p>
                            <textarea></textarea>
                        </li>
                        <li>
                            <p>${3*eventRankCount + 2}등</p>
                            <textarea></textarea>
                        </li>
                        <li>
                            <p>${3*eventRankCount + 3}등</p>
                            <textarea></textarea>
                        </li>`);
    eventRankCount++;
}

function resetEventRanks() {
    $("#eventRankBox").html(`<input type="button" id="eventRankAddButton" value="+" onclick="addEventRanks()">
                        <div>
                            <span class="eventRank">1등 : <input type="number" required></span>
                            <span class="eventRank">/ 2등 : <input type="number" required></span>
                            <span class="eventRank">/ 3등 : <input type="number" required></span>
                        </div>`);

    //success page : reset winners
    $("#successWinnersBox ul").html(`<li>
                            <p>1등</p>
                            <textarea></textarea>
                        </li>
                        <li>
                            <p>2등</p>
                            <textarea></textarea>
                        </li>
                        <li>
                            <p>3등</p>
                            <textarea></textarea>
                        </li>`);
    eventRankCount = 1;
}

// ---!!!--- random page 유효성 검사
// ---!!!---
// ---!!!---

function randomPageValidation() {
    //1.URL의 체크박스가 체크 돼었을 경우, url 값이 '' 또는 undefined 면 경고문

    return false;
}

//random page의 Roll the GoldenDice submit 버튼.
function randomSubmit() {
    if (randomPageValidation) {
        clickSubmit();
    }
    else {
        window.alert("모든 데이터를 입력하십시오.");
    }
}