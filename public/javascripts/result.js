function clearResultPageValues() {
    //clear searchedDataCount
    $('#searchedDataCount').text('');
    //clear resultDataInputSearchBox input
    $('#resultDataInputSearchBox input').val('');
}

function searchData() {
    const dicecode = $('#searchBar').val();
    console.log(dicecode);

    $.ajax({
        url : "/ajax_search", // 이 url 서버에 보낼 것이다.
        type : "POST", // 통신 방식
        dataType : "JSON", // 통신, 운반에 사용할 데이터 종류
        data : { "dicecode" : dicecode }, // 받을때 데이터 명칭 : 보낼 데이터
    })

    .done(function (json){ //넘어온 json 데이터
        console.log('---database searching---');
        //console.log(json);

        const dicecode = json.dicecode;
        const url = (json.url !== '') ? json.url : 'no url'; //css 문제떄문에 default가 값이 있게..
        const data = json.data; //배열
        const winners = json.winners; //배열

        $('#resultDiceCode b').text(dicecode);
        $('#resultUrl').text(url);

        let dataString = "";
        data.forEach(function(item, index){
            let value = item;
            if ((typeof item) === 'object') {
                const key = Object.keys(item)[1];
                value = item[key];
            }
            dataString = dataString + value + ((index !== data.length - 1) ? ", " : "");
        });
        $('#resultDataInput').text(dataString);
        $('#resultDataInputCountsBox #allDataCount span').text(data.length);

        $('#resultDataOutputBox ul').html('');
        for (let i = 0; i < winners.length; i++) {
            let winnersString = "";
            winners[i].forEach(function(item, index){
                let value = item;
                if ((typeof item) === 'object') {
                    const key = Object.keys(item)[1];
                    value = item[key];
                } 
                winnersString = winnersString + value + ((index !== winners[i].length - 1) ? ", " : "");
            });
            //$(`#resultDataOutputBox li:nth-child(${i+1}) div`).text(winnersString);
            //db의 winners 배열의 개수 만큼 result page의 winners에 html 추가 해주기!!
            $('#resultDataOutputBox ul').append(`<li><span>${i+1}등</span>
                        <div class="results">
                            ${winnersString}
                        </div>
                    </li>`);

        }
        showResultPage();
    })

    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed : searching");
    });

    $('#searchBar').val('');

}

function resultDataSearch() {
    //highlight 까지는 알겠는데 그 데이터 있는 곳으로 이동하면서 포커스 되는것또한 되게 해야한다!!
    const search = $('#resultDataInputSearchBox input').val();
    highlightText(search);
}

function resultDataClear() {
    highlightText('');
    $('#resultDataInputSearchBox input').val('');
}

function highlightText(word) {
    //new RegExp :
    let count = 0;        
    var regex = new RegExp(word,'gi'); // ???
    $("#resultDataInput").html( $("#resultDataInput").text().replace(regex, function() {
        count++;
        return "<span class='highlight'>"+word+"</span>";
    }) );

    $('#searchedDataCount').text((word !== '')? count : '');
}