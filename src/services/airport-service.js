const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const logger = require('../config/winston-logger-config');

class AirportService {
    
    #airportRepository;
    
    constructor() {
        this.#airportRepository= new AirportRepository();
    }

    async createAirport(data) {
        try {
            const airport=await this.#airportRepository.create(data);
            return airport;
        } catch (error) {
            logger.error(error);
            if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError') {
                let details=[];
                error.errors.forEach((err)=>{
                    details.push(err.message);
                })
                throw new AppError(details,StatusCodes.BAD_REQUEST);
            }
            throw error;
        }
    }

    
    async getAirports() {
        try {
            const airports = await this.#airportRepository.getAll();
            return airports;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }


    async getAirport(id) {
        try {
            const airport = await this.#airportRepository.get(id);
            if(!airport) {
                throw new AppError("The requested airport does not exist",StatusCodes.NOT_FOUND);
            }
            return airport;
        } catch (error) {
            throw error;
        }
    }

     async deleteAirport(id) {
        try {
            const response = await this.#airportRepository.destroy(id);
            if(response) return response;
            else throw new AppError("The requested airport does not exist",StatusCodes.NOT_FOUND);
        } catch (error) {
            throw error;
        }
     }

     // TODO : Handling Updation of FK (cityId)
     async updateAirport(id,data) {    // TODO: As of now, we have just handled invalid id, but not attributes req body error
        try {
            const response = await this.#airportRepository.update(id,data);
            if(response[0]) return response;
            else throw new AppError("The requested airport does not exist",StatusCodes.NOT_FOUND);
        } catch(error) {
            console.log(error);
            throw error;
        }
     }
}

module.exports=AirportService;
