var findByMatchId = require('../models/deliveryModel').findByMatchId;
const crypto = require('crypto');

exports.getById = (req, res) => {
	findByMatchId(req.params.deliveryId)
        .then((result) => {
        	res.status(200).send(result);
        });
};