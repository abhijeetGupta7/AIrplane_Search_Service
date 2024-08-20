const statusCodes = require('http-status-codes');

const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const logger = require('../config/winston-logger-config');

const cityService=new CityService();

/**
 *  POST : /city
 *  req.body:  { name: City }
 */
async function createcity(req,res) {
    try {
        const city=await cityService.createCity({
            name: req.body.name
        });
        console.log(city);

        SuccessResponse.message="Successfully created an city"
        SuccessResponse.data=city;
        
        return res.status(statusCodes.CREATED).json(SuccessResponse);

    } catch (error) {
        
        ErrorResponse.message="Something went wrong while creating city"
        ErrorResponse.error=error;

        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}  

/**
 *  GET : /city
 *  req.body: {}
 */
async function getCities(req,res) {
    try {
        const cities = await cityService.getCities();

        SuccessResponse.message="Successfully fetched all the cities";
        SuccessResponse.data=cities;
        return res.status(statusCodes.OK).json(SuccessResponse);

    } catch (error) {
        logger.error(error);
        ErrorResponse.message="Something went wrong while fetching the cities";
        ErrorResponse.error=error;

        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

/**
 *  GET : /city/:id
 *  req.body:  
 */
async function getcity(req,res) {
    try {
        const city = await cityService.getCity(req.params.id);

        SuccessResponse.message="Successfully fetched the city";
        SuccessResponse.data=city;
        
        return res.status(statusCodes.OK).json(SuccessResponse);            
    
    } catch (error) {
        console.log(error);
        ErrorResponse.message="Something went wrong while fetching the city";
        ErrorResponse.error=error;
        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


async function updatecity(req,res) {
    try {
        const response= await cityService.updateCity(req.params.id,req.body);
        SuccessResponse.message="Successfully updated the city";
        SuccessResponse.data={};
        return res.status(statusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error=error;
        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function deletecity(req,res) {
    try {
        const response = await cityService.deleteCity(req.params.id);
        SuccessResponse.message = "Successfully deleted the city";
        SuccessResponse.data={};
        
        return res.status(statusCodes.OK).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.message = "Something went wrong";
        ErrorResponse.error=error;
        return res.status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);        
    }
}



module.exports={
    createcity,
    getCities,
    getcity,
    deletecity,
    updatecity
}