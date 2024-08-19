const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const logger = require('../config/winston-logger-config');

class AirplaneService {
    
    #airplaneRepository;
    
    constructor() {
        this.#airplaneRepository= new AirplaneRepository();
    }

    async createAirplane(data) {
        try {
            const airplane=await this.#airplaneRepository.create(data);
            return airplane;
        } catch (error) {
            console.log(error);
            //logger.error(error);
            if(error.name=='SequelizeValidationError') {
                let details=[];
                error.errors.forEach((err)=>{
                    details.push(err.message);
                })
                throw new AppError(details,StatusCodes.BAD_REQUEST);
            }
            throw error;
        }
    }

    
    async getAirplanes() {
        try {
            const airplanes = await this.#airplaneRepository.getAll();
            return airplanes;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }


    async getAirplane(id) {
        try {
            const airplane = await this.#airplaneRepository.get(id);
            if(!airplane) {
                throw new AppError("Id does not exist",StatusCodes.BAD_REQUEST);
            }
            return airplane;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

}

module.exports=AirplaneService;
