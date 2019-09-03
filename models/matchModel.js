var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

 var matchSchema = new Schema({
    id: { type: Number  },
    season : {type : Number},
    city : {type : String},
    date : {type : Date},
    team1 : {type : String},
    team2 : {type : String},
    toss_winner : {type : String},
    toss_decision : {type : String},
    result : {type : String},
    dl_applied : {type : Boolean},
    winner : {type : String},
    win_by_runs : {type : Number},
    win_by_wickets : {type : Number},
    player_of_match : {type : String},
    venue : {type : String},
    umpire1 : {type : String},
    umpire2 : {type : String},
    umpire3 : {type : String}
});

const Match = mongoose.model('match', matchSchema)

const list = () => {
    return new Promise((resolve, reject) => {
        Match.find().select("-_id")
            .exec(function (err, matches) {
                if (err) {
                    reject(err);
                } else {
                    resolve(matches);
                }
            })
    });
};

module.exports = { Match : Match, matchList : list };