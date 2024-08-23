const { validateCreateAirplaneRequest } = require("./airplane-middlewares");
const { validateCreateAirportRequest } = require("./airport-middlewares");
const { validateCreateCityRequest } = require("./city-middlewares");
const { validateCreateFlightRequest } = require("./flight-middlewares");

module.exports={
    validateCreateAirplaneRequest,
    validateCreateCityRequest,
    validateCreateAirportRequest,
    validateCreateFlightRequest
}