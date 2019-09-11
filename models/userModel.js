var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.set('debug', true);

var userSchema = new Schema({
    id: { type: Number },
    userName: { type: String },
    password: { type: String },
    role: { type: String}
});

const User = mongoose.model('user', userSchema)

module.exports = User;