var csv = require('fast-csv');
var mongoose = require('mongoose');
var Delivery = require('../models/deliveryModel');
var Player = require('../models/playerModel');
var HashMap = require('hashmap');

exports.post = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var deliveriesFile = req.files.file;

    var deliveries = [];
    var players = [];

    csv
        .parseString(deliveriesFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
        .on("data", function (data) {
            data['_id'] = new mongoose.Types.ObjectId();
            deliveries.push({
                match_id: data.match_id === '' ? null : parseInt(data.match_id),
                inning: data.inning === '' ? null : parseInt(data.inning),
                batting_team: data.batting_team,
                bowling_team: data.bowling_team,
                over: data.over === '' ? null : parseInt(data.over),
                ball: data.ball === '' ? null : parseInt(data.ball),
                batsman: data.batsman,
                non_striker: data.non_striker,
                bowler: data.bowler,
                is_super_over: data.is_super_over === '0' ? false : true,
                wide_runs: data.wide_runs === '' ? null : parseInt(data.wide_runs),
                bye_runs: data.bye_runs === '' ? null : parseInt(data.bye_runs),
                legbye_runs: data.legbye_runs === '' ? null : parseInt(data.legbye_runs),
                noball_runs: data.noball_runs === '' ? null : parseInt(data.noball_runs),
                penalty_runs: data.penalty_runs === '' ? null : parseInt(data.penalty_runs),
                batsman_runs: data.batsman_runs === '' ? null : parseInt(data.batsman_runs),
                extra_runs: data.extra_runs === '' ? null : parseInt(data.extra_runs),
                total_runs: data.total_runs === '' ? null : parseInt(data.total_runs),
                player_dismissed: data.player_dismissed,
                dismissal_kind: data.dismissal_kind,
                fielder: data.fielder,
            });
            console.log("In progress");
        })
        .on("end", function () {
            const player = new HashMap();
            deliveries.forEach(item => player.set(item.batsman, item.batting_team));
            deliveries.forEach(item => player.set(item.non_striker, item.batting_team));
            deliveries.forEach(item => player.set(item.bowler, item.bowling_team));
            deliveries.forEach(item => item.batsman[item.batsman.length - 1] === '(' ? player.set(item.fielder, item.bowling_team) : null);
            player.forEach(function (value, key) {
                players.push({
                    _id: new mongoose.Types.ObjectId(),
                    teamName: value,
                    playerName: key
                })
            });
            Delivery.collection.insertMany(deliveries, function (err, documents) {
               console.log("Deliveries insert in progress");
                if (err) throw err;
            });
            Player.collection.insertMany(players, function (err, documents) {
                console.log("Players insert in progress");
                if (err) throw err;
            });
            console.log("Successfully uploaded");
            res.send(deliveries.length + ' deliveries have been successfully uploaded.');
        });
};