var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.set('debug', true);

var teamSchema = new Schema({
    _id: { type: Schema.ObjectId },
    teamName: { type: String }
});

const Team = mongoose.model('team', teamSchema)

module.exports = Team;