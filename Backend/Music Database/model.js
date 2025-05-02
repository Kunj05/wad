const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    Singer: String,
    Actor: String,
    Actress: String
});

module.exports = mongoose.model('Song', songSchema);
