var csv = require('fast-csv');
var mongoose = require('mongoose');
var Match = require('../models/matchModel').Match;

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

            matches.push(data);
        })
        .on("end", function () {
            Match.collection.insertMany(matches, function (err, documents) {
                console.log(documents);
                if (err) throw err;
            });

            res.send(matches.length + ' matches have been successfully uploaded.');
        });
};