const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const logger = require('../config/winston-logger-config');
const { Op } = require("sequelize");

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

    async getFlights(query) {
        try {
            const customFilter={};
            let sortFilter=[];

            if(query.trips) {
                const [ departureAirportId, arrivalAirportId ] = query.trips.split("-");
                customFilter.departureAirportId=departureAirportId;
                customFilter.arrivalAirportId=arrivalAirportId;
            }
            
            if(query.price) {
                const [ minPrice, maxPrice ] = query.price.split("-");
                customFilter.price = {
                    [Op.between] : [minPrice,maxPrice==undefined ? "200000" : maxPrice ]
                }
            }
            
            if(query.travellers) {
                customFilter.totalSeats = {
                    [Op.gte] : query.travellers
                }
            }

            // TODO: Fix the UTC TIME ISSUE
            const endDayTime=" 23:59:00";
            if(query.tripDate) {
                customFilter.departureTime = {
                    [Op.between] : [ query.tripDate , query.tripDate+endDayTime]
                }  
            }

            if(query.sort) {
                const sortFilters=query.sort.split(",");
                sortFilter = sortFilters.map((param) => param.split("_"));
                console.log(sortFilter);                
            }
            
            const flights = await this.#flightRepository.getAllFlights(customFilter,sortFilter);
            return flights;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }


    async getFlight(id) {
        try {
            const flight=await this.#flightRepository.get(id);
            if(!flight) throw new AppError("The requested Flight does not exist",StatusCodes.NOT_FOUND);
            return flight;
        } catch (error) {
            throw error;
        }
    }

    async updateRemainingSeats(data) {
        try {
            console.log(data);
            const response=await this.#flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports=FlightService;
