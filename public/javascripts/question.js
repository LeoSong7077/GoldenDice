//**using global variable
function showDataCounts() {
    //question페이지에 count 설정
    $('#afcBox .Qvalue').text(filesData.length);
    $('#adBox .Qvalue').text(additionalData.length);
    $('#tdcBox .Qvalue').text(allData.length);
}