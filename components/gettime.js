const ordinal = require("ordinal-js");
var daysOfWeek = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

// Output format: '12:31pm' or '06:22am'
exports.getHourMinute = () => {
    var currentHour = new Date().getHours();
    var currentMin = new Date().getMinutes();
    var m = currentMin >= 12 ? 'pm' : 'am'
    var timestamp = `${currentHour}:${currentMin}${m}. `
    return timestamp
}

// Output format: '26th April, 2020'
exports.getDate = (time) => {
    var myDate = new Date(time);
    var date = myDate.getDate();
    var month = myDate.getMonth();
    var year = myDate.getFullYear();

    function pad(n) {
        return n < 10 ? '0' + n : n
    }
    var ordinalDate = ordinal.toOrdinal(date) + " " + monthNames[month] + ", " + year;
    return ordinalDate
}

// Output format: 'Such a night owl!'
exports.birdOrOwl = () => {
    var currentHour = new Date().getHours();
    var judge = '';
    // 23pm-2am: night owl
    // 5am-8am: early bird
    if (currentHour >= 23 && currentHour <= 2) {
        judge = 'Such a night owl!'
    } else if (currentHour >= 5 && currentHour < 8) {
        judge = 'What an early bird!'
    } else {
        judge = ''
    }
    return judge
}




// reference from:
// https://www.toptal.com/software/definitive-guide-to-datetime-manipulation