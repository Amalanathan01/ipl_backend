var csv = require('fast-csv');
var mongoose = require('mongoose');
var Match = require('../models/matchModel');

exports.post = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var matchFile = req.files.file;

    var matches = [];

    csv
        .parseString(matchFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
        .on("data", function (data) {
            matches.push({
                id: data.id === '' ? null : parseInt(data.id),
                season: data.season,
                city: data.city,
                date: data.date === '' ? null : new Date(data.date),
                team1: data.team1,
                team2: data.team2,
                toss_winner: data.toss_winner,
                toss_decision: data.toss_decision,
                result: data.result,
                dl_applied: data.dl_applied === '0' ? false : true,
                winner: data.winner,
                win_by_runs: data.win_by_runs === '' ? null : data.win_by_runs,
                win_by_wickets: data.win_by_wickets === '' ? null : data.win_by_wickets,
                player_of_match: data.player_of_match,
                venue: data.venue,
                umpire1: data.umpire1,
                umpire2: data.umpire2,
                umpire3: data.umpire3
            });
        })
        .on("end", function () {
            Match.collection.insertMany(matches, function (err, documents) {
                if (err) throw err;
            });
            console.log("Sucessfully Uploaded");
            res.send(matches.length + ' matches have been successfully uploaded.');
        });
};