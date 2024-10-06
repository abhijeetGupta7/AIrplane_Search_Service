const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const db = require("../models");
const { addRowLockOnFlight } = require("./queries");


class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter,sortFilter) {
        console.log(filter);
        const response = await Flight.findAll({
            where: filter,
            order : sortFilter,
            include : [ 
                {
                    model : Airplane,
                    as: "airplaneDetails",
                    required: true
                },
                {
                    model: Airport,
                    as: "arrivalAirport",
                    required: true,
                    include : {
                        model: City,
                        required: true
                    }
                },
                {
                    model : Airport,
                    as: "departureAirport",
                    required: true,
                    include: {
                        model: City,
                        required: true
                    }
                },
            ]
        });
        return response;
    }

    async updateRemainingSeats(flightId,seats,dec='true') {
        
        const transaction= await db.sequelize.transaction();
        
        try {
            db.sequelize.query(addRowLockOnFlight(flightId));
            if(dec=='true') {
                await Flight.decrement('totalSeats', { 
                    by: seats, where: { "id":flightId }  
                }, { transaction:transaction });
            } else {
                await Flight.increment('totalSeats', { 
                    by: seats, where: { "id":flightId }  
                }, { transaction:transaction });
            }            

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }

        const response= await this.get(flightId);
        return response;
    }
}

module.exports=FlightRepository;