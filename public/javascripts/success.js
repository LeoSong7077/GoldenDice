function showWinnersResult(winners) {
    for (let i = 0; i < winners.length; i++) {
        let text = '';
        for (let j = 0; j < winners[i].length; j++) {
            let firstKey = '';
            let data = winners[i][j];
            if (typeof winners[i][j] === 'object') {
                firstKey = Object.keys(winners[i][j])[0];
                data = data[firstKey];
            }
            text = text + ((j === 0) ? '' : ', ') + data;
        }
        console.log(text.trim());
        $(`#successWinnersBox ul li:nth-child(${i+1}) textarea`).val(text.trim());
    }
}