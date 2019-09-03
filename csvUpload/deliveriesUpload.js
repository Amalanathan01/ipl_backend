var csv = require('fast-csv');
var mongoose = require('mongoose');
var Delivery = require('../models/deliveryModel').Delivery;

exports.post = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var deliveriesFile = req.files.file;

    var deliveries = [];

    csv
        .parseString(deliveriesFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
        .on("data", function (data) {
            data['_id'] = new mongoose.Types.ObjectId();

            deliveries.push(data);
            console.log(deliveries.length)
        })
        .on("end", function () {
            Delivery.collection.insertMany(deliveries, function (err, documents) {
                console.log(documents);
                if (err) throw err;
            });
            res.send(deliveries.length + ' deliveries have been successfully uploaded.');
        });
};