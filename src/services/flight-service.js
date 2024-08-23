const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const logger = require('../config/winston-logger-config');

class FlightService {
    
    #flightRepository;
    
    constructor() {
        this.#flightRepository= new FlightRepository();
    }

    // TODO: Handle FK contraint (error)
    async createFlight(data) {
        try {
            const flight=await this.#flightRepository.create(data);
            return flight;
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
}

module.exports=FlightService;
