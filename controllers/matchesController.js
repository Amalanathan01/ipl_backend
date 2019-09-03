const matchList = require('../models/matchModel').matchList;
const crypto = require('crypto');

exports.list = (req, res) => {
    matchList()
        .then((result) => {
            res.status(200).send(result);
        })
};