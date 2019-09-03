var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
var deliverySchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId},
    match_id: { type: String, ref : 'Match' },
    inning : {type : Number},
    batting_team : {type : String},
    bowling_team : {type : String},
    over : {type : Number},
    ball : {type : Number},
    batsman : {type : String},
    non_striker : {type : String},
    bowler : {type : String},
    is_super_over : {type : Boolean},
    wide_runs : {type : Number},
    bye_runs : {type : Number},
    legbye_runs : {type : Number},
    noball_runs : {type : Number},
    penalty_runs : {type : Number},
    batsman_runs : {type : Number},
    extra_runs : {type : Number},
    total_runs : {type : Number},
    player_dismissed : {type : String},
    dismissal_kind : {type : String},
    fielder : {type : String}
});

const Delivery = mongoose.model('delivery', deliverySchema)

function findByMatchId(id) {
    return Delivery.find({ match_id : id })
        .then((result) => {
            result = JSON.stringify(result);
            delete result._id;
            delete result.__v;
            return result;
        });
};

module.exports = { Delivery : Delivery, findByMatchId : findByMatchId };