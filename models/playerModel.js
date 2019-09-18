var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.set('debug', true);

var playerSchema = new Schema({
    _id: { type: Schema.ObjectId },
    teamName: { type: String },
    playerName: { type: String }
});

const Player = mongoose.model('player', playerSchema)

module.exports = Player;