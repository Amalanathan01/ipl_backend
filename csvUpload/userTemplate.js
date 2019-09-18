const { parse } = require('json2csv');

exports.get = function (req, res) {

    var fields = [
        'username',
        'password',
        'role'
    ];

    const csv = parse({}, { fields });

    res.set("Content-Disposition", "attachment;filename=users.csv");
    res.set("Content-Type", "application/octet-stream");

    res.send(csv);

};