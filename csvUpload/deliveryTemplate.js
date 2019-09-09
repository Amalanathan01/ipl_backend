var json2csv = require('json2csv');

exports.get = function (req, res) {

    var fields = [
        'match_id',
        'inning',
        'batting_team',
        'bowling_team',
        'over',
        'ball',
        'batsman',
        'non_striker',
        'bowler',
        'is_super_over',
        'wide_runs',
        'bye_runs',
        'legbye_runs',
        'noball_runs',
        'penalty_runs',
        'batsman_runs',
        'extra_runs',
        'total_runs',
        'player_dismissed',
        'dismissal_kind',
        'fielder'
    ];

    var csv = json2csv({ data: '', fields: fields });

    res.set("Content-Disposition", "attachment;filename=deliveries.csv");
    res.set("Content-Type", "application/octet-stream");

    res.send(csv);

};