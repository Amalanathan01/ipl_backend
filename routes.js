const MatchesController = require('./controllers/matchesController');
const DeliveryController = require('./controllers/deliveriesController');

exports.routesConfig = function (app) {
    app.get('/matches', [
        MatchesController.list
    ]);

    app.get('/delivery/:deliveryId', [
        DeliveryController.getById
    ]);
};