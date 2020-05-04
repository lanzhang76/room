exports.totalcount = (num) => {
    var count_sent = '';
    if (num == 1) {
        count_sent = `There is 1 person in the exhibition right now.`;
    } else if (num == 5) {
        count_sent = `There are ${num} people in the exhibition.`;
    } else if (num == 10) {
        count_sent = `There are ${num} people in the exhibition.`;
    } else if (num == 20) {
        count_sent = `There are ${num} people in the exhibition.`;
    } else if (num == 50) {
        count_sent = `Wow! There are ${num} people in the exhibition.`;
    }
    // Should return '' if no special event happens
    return count_sent;
}