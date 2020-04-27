exports.totalcount = (num) => {
    var count_sent = '';
    if (num == 1) {
        count_sent = `There is 1 person in the exhibition right now.`;
    } else {
        count_sent = `There are ${num} people in the exhibition.`;
    }
    return count_sent;
}