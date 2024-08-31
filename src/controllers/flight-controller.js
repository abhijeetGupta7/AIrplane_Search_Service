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

async function getFlights(req,res) {
    try {
        const flights= await flightService.getFlights(req.query);

        SuccessResponse.message="Successfully fetched all the flights";
        SuccessResponse.data=flights;
        return res.status(statusCodes.OK).json(SuccessResponse);

    } catch (error) {
        logger.error(error);
        ErrorResponse.message="Something went wrong while fetching the flights";
        ErrorResponse.error=error;

        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getFlight(req,res) {
    try {
        const flight=await flightService.getFlight(req.params.id);

        SuccessResponse.message="Successfully fetched the flight";
        SuccessResponse.data=flight;
        return res.status(statusCodes.OK).json(SuccessResponse);

    } catch (error) {
        logger.error(error);
        ErrorResponse.message="Something went wrong while fetching the flight";
        ErrorResponse.error=error;

        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function updateRemainingSeats(req,res) {
    try {
        const response=await flightService.updateRemainingSeats({
            flightId:req.params.id,
            seats:req.body.seats,
            dec:req.body.dec
        });
        SuccessResponse.message="Successfully updated the total available seats in the flight";
        SuccessResponse.data=response;
        
        return res.status(statusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.message="Something went wrong while updating the total available seats in the flights";
        
        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


module.exports={
    createFlight,
    getFlights,
    getFlight,
    updateRemainingSeats
}