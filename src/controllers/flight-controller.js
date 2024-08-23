const statusCodes = require('http-status-codes');

const { FlightService } = require("../services");
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const logger = require('../config/winston-logger-config');

const flightService=new FlightService();

/**
 *  POST : /flight
 *  req.body:  { flightNumber: flight,   }
 */

async function createFlight(req,res) {
    try {
        const flight=await flightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            arrivalAirportId: req.body.arrivalAirportId,
            departureAirportId: req.body.departureAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        console.log(flight);

        SuccessResponse.message="Successfully created an flight"
        SuccessResponse.data=flight;
        
        return res.status(statusCodes.CREATED).json(SuccessResponse);

    } catch (error) {
        
        ErrorResponse.message="Something went wrong while creating flight"
        ErrorResponse.error=error;

        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}  

module.exports={
    createFlight,
}