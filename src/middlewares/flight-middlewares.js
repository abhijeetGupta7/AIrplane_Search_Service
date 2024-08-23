const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { comapareTime } = require("../utils/helpers/date-time-helpers");

function validateCreateFlightRequest(req,res,next) {
    if(!req.body.flightNumber) {
        ErrorResponse.message="Something went wrong while creating flight";
        ErrorResponse.error={ Explanation: 'FlightNumber not found in the correct form in request body' }
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.airplaneId) {
        ErrorResponse.message="Something went wrong while creating flight";
        ErrorResponse.error={ Explanation: 'airplaneId not found in the correct form in request body' }
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId) {
        ErrorResponse.message="Something went wrong while creating flight";
        ErrorResponse.error={ Explanation: 'arrivalAirportId not found in the correct form in request body' }
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.departureAirportId) {
        ErrorResponse.message="Something went wrong while creating flight";
        ErrorResponse.error={ Explanation: 'departureAirportId not found in the correct form in request body' }
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.arrivalTime) {
        ErrorResponse.message="Something went wrong while creating flight";
        ErrorResponse.error={ Explanation: 'arrivalTime not found in the correct form in request body' }
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.departureTime) {
        ErrorResponse.message="Something went wrong while creating flight";
        ErrorResponse.error={ Explanation: 'departureTime not found in the correct form in request body' }
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.price) {
        ErrorResponse.message="Something went wrong while creating flight";
        ErrorResponse.error={ Explanation: 'price not found in the correct form in request body' }
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.totalSeats) {
        ErrorResponse.message="Something went wrong while creating flight";
        ErrorResponse.error={ Explanation: 'totalSeats not found in the correct form in request body' }
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!comapareTime(req.body.arrivalTime,req.body.departureTime)) {
        ErrorResponse.message="Something went wrong while creating flight";
        ErrorResponse.error={ Explanation: 'Arrival Time cannot be lesser than the Departure Time' }
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={
    validateCreateFlightRequest
}
