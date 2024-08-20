const { BAD_REQUEST } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCreateCityRequest(req,res,next) {
    if(!req.body.name) {
        ErrorResponse.successfalse;
        ErrorResponse.message="Something went wrong while creating city";
        ErrorResponse.error= { Details: "City name not found in the request body" }

        return res.status(BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={
    validateCreateCityRequest
}