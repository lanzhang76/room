
var r = require("./random");

exports.getsID = () => {
    var adjectives = ["Artsy", "Creative", "Inspired", "Supportive", "Aspiring", "Cool", "Fun", "Innovative", "Thoughtful", "Charming", "Honest", "Hard-working", "Passionate", "Fearless", "Persistent", "Confident", "Sensible", "Compassionate", "Witty", "Versatile", "Warm-hearted", "Humorous", "Courageous", "Fair-minded"]
    var names = ["Aino", "Alvar", "Eero", "Jules", "Magdelena", "Inaki", "Basel", "James", "Jussuf", "Berenice", "Matthew", "Lida", "Michele", "Sigmund", "Robert", "Bani", "Ruanne", "Raimund", "Ivor", "Marina", "Gerald", "Max", "Rhonda", "William", "Angel"]
    return `${r.rand(adjectives)} ${r.rand(names)}`
}