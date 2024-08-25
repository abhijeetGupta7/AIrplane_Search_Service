const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter,sortFilter) {
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
}

module.exports=FlightRepository;