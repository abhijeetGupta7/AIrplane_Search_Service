const statusCodes = require('http-status-codes');

const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const logger = require('../config/winston-logger-config');

const airportService=new AirportService();

/**
 *  POST : /airport
 *  req.body:  { name: airport,   }
 */
// TODO : FK (cityId) ERROR HANDLING
async function createAirport(req,res) {
    try {
        const airport=await airportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId,
        });
        console.log(airport);

        SuccessResponse.message="Successfully created an airport"
        SuccessResponse.data=airport;
        
        return res.status(statusCodes.CREATED).json(SuccessResponse);

    } catch (error) {
        
        ErrorResponse.message="Something went wrong while creating airport"
        ErrorResponse.error=error;

        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}  

/**
 *  GET : /airport
 *  req.body: {}
 */
async function getAirports(req,res) {
    try {
        const airports = await airportService.getAirports();

        SuccessResponse.message="Successfully fetched all the airports";
        SuccessResponse.data=airports;
        return res.status(statusCodes.OK).json(SuccessResponse);

    } catch (error) {
        logger.error(error);
        ErrorResponse.message="Something went wrong while fetching the airports";
        ErrorResponse.error=error;

        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

/**
 *  GET : /airport/:id
 *  req.body:  
 */
async function getAirport(req,res) {
    try {
        const airport = await airportService.getAirport(req.params.id);

        SuccessResponse.message="Successfully fetched the airport";
        SuccessResponse.data=airport;
        
        return res.status(statusCodes.OK).json(SuccessResponse);            
    
    } catch (error) {
        console.log(error);
        ErrorResponse.message="Something went wrong while fetching the airport";
        ErrorResponse.error=error;
        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


async function updateAirport(req,res) {
    try {
        const response= await airportService.updateAirport(req.params.id,req.body);
        SuccessResponse.message="Successfully updated the airport";
        SuccessResponse.data={};
        return res.status(statusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error=error;
        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function deleteAirport(req,res) {
    try {
        const response = await airportService.deleteAirport(req.params.id);
        SuccessResponse.message = "Successfully deleted the airport";
        SuccessResponse.data={};
        
        return res.status(statusCodes.OK).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.message = "Something went wrong";
        ErrorResponse.error=error;
        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);        
    }
}



module.exports={
    createAirport,
    getAirports,
    getAirport,
    deleteAirport,
    updateAirport
}