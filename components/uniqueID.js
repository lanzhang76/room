
var r = require("./random");

exports.getsID = () => {
    var names = "Alligator, Anteater, Armadillo, Auroch, Axolotl, Badger, Bat, Bear, Beaver, Blobfish, Buffalo, Camel, Chameleon, Cheetah, Chipmunk, Chinchilla, Chupacabra"
    var name_list = names.split(", ")

    return `Anonymous ${r.rand(name_list)}`
}