const { validateCreateAirplaneRequest } = require("./airplane-middlewares");
const { validateCreateAirportRequest } = require("./airport-middlewares");
const { validateCreateCityRequest } = require("./city-middlewares");

module.exports={
    validateCreateAirplaneRequest,
    validateCreateCityRequest,
    validateCreateAirportRequest
}