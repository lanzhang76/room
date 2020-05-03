var rand = require('./random');

// announce when a visitor is browsing exhibition projects
exports.exhibition = (user_id) => {
    const message = rand.rand([
        `${user_id} wanders through the Exhibition space: “Hm, where to begin?”`,
        `${user_id} browses the Exhibition.`,
        `${user_id} enters the gallery.`,
        `${user_id} enters the gallery, amazed by the variety of projects made by DT students.`,
        `${user_id} is browsing DT students’ projects.`,
        `${user_id} is in the main gallery space right now, just browsing.`,
        `${user_id} is looking around in the exhibition.`
    ])
    return message;
}


exports.publication = (user_id) => {
    const message = rand.rand([
        `${user_id} begins Hindsight Reader.`,
        `${user_id} takes out their reading glasses, and opens Hindsight Reader.`,
        `${user_id} finds their comfiest reading chair, and curls up with Hindsight Reader.`,
        `${user_id} picks up Hindsight Reader and starts reading.`,
        `${user_id} is handed Hindsight Reader.`,
        `${user_id} peeks over a visitor’s shoulder who is reading Hindsight Reader`
    ])
    return message;
}

exports.livestream = (user_id) => {
    const message = rand.rand([
        `${user_id} has their eyes and ears peeled, ready for the performances.`,
        `${user_id} takes a front seat at the performance hall.`,
        `“Is that seat taken?” ${user_id} grabs a center seat at the performance hall.`
    ])
    return message;
}