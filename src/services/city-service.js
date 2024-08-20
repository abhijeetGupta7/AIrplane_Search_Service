const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const logger = require('../config/winston-logger-config');

class CityService {
    
    #cityRepository;
    
    constructor() {
        this.#cityRepository= new CityRepository();
    }

    async createCity(data) {
        try {
            const city=await this.#cityRepository.create(data);
            return city;
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

    
    async getCities() {
        try {
            const cities = await this.#cityRepository.getAll();
            return cities;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }


    async getCity(id) {
        try {
            const city = await this.#cityRepository.get(id);
            if(!city) {
                throw new AppError("The requested city does not exist",StatusCodes.NOT_FOUND);
            }
            return city;
        } catch (error) {
            throw error;
        }
    }

     async deleteCity(id) {
        try {
            const response = await this.#cityRepository.destroy(id);
            if(response) return response;
            else throw new AppError("The requested city does not exist",StatusCodes.NOT_FOUND);
        } catch (error) {
            throw error;
        }
     }

     async updateCity(id,data) {    // TODO: As of now, we have just handled invalid id, but not attributes req body error
        try {
            const response = await this.#cityRepository.update(id,data);
            if(response[0]) return response;
            else throw new AppError("The requested city does not exist",StatusCodes.NOT_FOUND);
        } catch(error) {
            console.log(error);
            throw error;
        }
     }
}

module.exports=CityService;
