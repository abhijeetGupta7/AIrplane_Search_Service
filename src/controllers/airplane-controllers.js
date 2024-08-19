const statusCodes = require('http-status-codes');

const { AirplaneService } = require("../services");
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const logger = require('../config/winston-logger-config');

const airplaneService=new AirplaneService();

/**
 *  POST : /airplane
 *  req.body:  { modelNumber: 'airbus-320, capacity:300 }
 */
async function createAirplane(req,res) {
    try {
        const airplane=await airplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        });
        console.log(airplane);

        SuccessResponse.message="Successfully created an airplane"
        SuccessResponse.data=airplane;
        
        return res.status(statusCodes.CREATED).json(SuccessResponse);

    } catch (error) {
        
        ErrorResponse.message="Something went wrong while creating airplane"
        ErrorResponse.error=error;

        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}  

/**
 *  GET : /airplane
 *  req.body: {}
 */
async function getAirplanes(req,res) {
    try {
        const airplanes = await airplaneService.getAirplanes();

        SuccessResponse.message="Successfully fetched all the airplanes";
        SuccessResponse.data=airplanes;
        return res.status(statusCodes.OK).json(SuccessResponse);

    } catch (error) {
        logger.error(error);
        ErrorResponse.message="Something went wrong while fetching the airplanes";
        ErrorResponse.error=error;

        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

/**
 *  GET : /airplane/:id
 *  req.body:  
 */
async function getAirplane(req,res) {
    try {
        const airplane = await airplaneService.getAirplane(req.params.id);

        SuccessResponse.message="Successfully fetched the airplane";
        SuccessResponse.data=airplane;
        
        return res.status(statusCodes.OK).json(SuccessResponse);            
    
    } catch (error) {
        console.log(error);
        ErrorResponse.message="Something went wrong while fetching the airplane";
        ErrorResponse.error=error;
        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


async function updateAirplane(req,res) {
    try {
        const response= await airplaneService.updateAirplane(req.params.id,req.body);
        SuccessResponse.message="Successfully updated the airplane";
        SuccessResponse.data={};
        return res.status(statusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error=error;
        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function deleteAirplane(req,res) {
    try {
        const response = await airplaneService.deleteAirplane(req.params.id);
        SuccessResponse.message = "Successfully deleted the airplane";
        SuccessResponse.data={};
        
        return res.status(statusCodes.OK).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.message = "Something went wrong";
        ErrorResponse.error=error;
        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);        
    }
}



module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
}