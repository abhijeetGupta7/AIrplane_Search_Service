const express=require("express");
const { airportController } = require("../../controllers");
const { validateCreateAirportRequest } = require("../../middlewares");

const airportRouter=express.Router();

// /api/v1/airport/ POST
airportRouter.post("/", validateCreateAirportRequest, airportController.createAirport);

// /api/v1/airport/ GET
airportRouter.get("/", airportController.getAirports);

// /api/v1/airport/:id  GET
airportRouter.get("/:id", airportController.getAirport);

// /api/v1/airport/:id  PATCH
airportRouter.patch("/:id",airportController.updateAirport);

// /api/v1/airport/:id  DELETE
airportRouter.delete("/:id",airportController.deleteAirport);

module.exports=airportRouter;