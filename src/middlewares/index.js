const { validateCreateAirplaneRequest } = require("./airplane-middlewares");
const { validateCreateCityRequest } = require("./city-middlewares");

module.exports={
    validateCreateAirplaneRequest,
    validateCreateCityRequest
}