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
            logger.error(error);
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
                throw new AppError("The requested airplane does not exist",StatusCodes.NOT_FOUND);
            }
            return airplane;
        } catch (error) {
            throw error;
        }
    }

     async deleteAirplane(id) {
        try {
            const response = await this.#airplaneRepository.destroy(id);
            if(response) return response;
            else throw new AppError("The requested airplane does not exist",StatusCodes.NOT_FOUND);
        } catch (error) {
            throw error;
        }
     }

     async updateAirplane(id,data) {    // TODO: As of now, we have just handled invalid id, but not attributes req body error
        try {
            const response = await this.#airplaneRepository.update(id,data);
            if(response[0]) return response;
            else throw new AppError("The requested airplane does not exist",StatusCodes.NOT_FOUND);
        } catch(error) {
            console.log(error);
            throw error;
        }
     }
}

module.exports=AirplaneService;
