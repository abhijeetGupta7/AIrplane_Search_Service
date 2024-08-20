const { StatusCodes } = require("http-status-codes");

const { ErrorResponse }= require("../utils/common");

function validateCreateAirplaneRequest(req,res,next) {
    if(!req.body.modelNumber) {

        ErrorResponse.message="Something went wrong while creating airplane";
        ErrorResponse.error={ Explanation: 'Model number not found in the correct form in request body' }
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={
    validateCreateAirplaneRequest
}