var csv = require('fast-csv');
var mongoose = require('mongoose');
var User = require('../models/userModel');

exports.post = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var userFile = req.files.file;

    var users = [];

    csv
        .parseString(userFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
        .on("data", function (data) {
            users.push({
                username: data.username,
                password: data.password,
                role: data.role
            });
        })
        .on("end", function () {
            User.collection.insertMany(users, function (err, documents) {
                if (err) throw err;
            });
            console.log("Sucessfully Uploaded");
            res.send(users.length + ' users have been successfully uploaded.');
        });
};