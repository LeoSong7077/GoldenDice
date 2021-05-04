//layout.js

//이벤트 생성: main -> random -> question -> success
//이벤트 확인: main -> search

function moveToRandomPage() {
    $('#random').show();
    $('#success').hide();
    $('#result').hide();
    //random에 있었을 경우. 작성을 취소할 것 입니까 alert나오게 하기! 이건 그냥 confirm? 메소드로 해도될듯
}

function exitRandomPage() {
    //작성을 취소할 것 입니까? confirm, alert
    const random = document.getElementById('random');
    random.style.display = 'none';
}

function moveToQuestionPage() {
    console.log("ok");
    const question = document.getElementById('question');
    question.style.display = 'block';
}

function showResultPage() {
    $('#result').show();
}

function exitResultPage() {
    const result =  document.getElementById('result');
    result.style.display = 'none';
}

function moveToSuccessPage() {
    $('#random').hide();
    $('#question').hide();  
    $('#success').show();
}

function returnToRandomPage() {
    $('#question').hide();
}

    function lockScrollBar() {
        document.body.style.overflowY = 'hidden';
        $('html').css('overflowY', 'hidden');
    }

    function unlockScrollBar() {
        document.body.style.overflowY = 'auto';
        $('html').css('overflowY', 'auto');
    }

function exitSuccessPage() {
    const success = document.getElementById('success');
    success.style.display = 'none';
}