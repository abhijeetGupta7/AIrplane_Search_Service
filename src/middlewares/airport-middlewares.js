const { StatusCodes } = require("http-status-codes");
const ErrorResponse = require("../utils/common/error-response");

function validateCreateAirportRequest(req,res,next) {
    if(!req.body.name) {
        ErrorResponse.message="Something went wrong while creating airport";
        ErrorResponse.error={ Explanation: 'Name not found in the correct form in request body' }
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.code) {
        ErrorResponse.message="Something went wrong while creating airport";
        ErrorResponse.error={ Explanation: 'Code not found in the correct form in request body' }
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.cityId) {
        ErrorResponse.message="Something went wrong while creating airport";
        ErrorResponse.error={ Explanation: 'cityId not found in the correct form in request body' }
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={
    validateCreateAirportRequest
};