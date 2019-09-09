const { parse } = require('json2csv');

exports.get = function (req, res) {

    var fields = [
        'id',
        'season',
        'city',
        'date',
        'team1',
        'team2',
        'toss_winner',
        'toss_decision',
        'result',
        'dl_applied',
        'winner',
        'win_by_runs',
        'win_by_wickets',
        'player_of_match',
        'venue',
        'umpire1',
        'umpire2',
        'umpire3'
    ];

    const csv = parse({}, {fields});

    res.set("Content-Disposition", "attachment;filename=matches.csv");
    res.set("Content-Type", "application/octet-stream");

    res.send(csv);

};