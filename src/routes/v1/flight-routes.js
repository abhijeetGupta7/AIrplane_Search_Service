const express = require('express');
const { flightMiddlewares } = require('../../middlewares');
const { flightController } = require('../../controllers');

const flightRouter=express.Router();

flightRouter.post("/",flightMiddlewares.validateCreateFlightRequest, flightController.createFlight);

flightRouter.get("/", flightController.getFlights);

flightRouter.get("/:id", flightController.getFlight);

flightRouter.patch("/:id/seats", flightMiddlewares.validateupdateSeatsFlightRequest, flightController.updateRemainingSeats);

module.exports=flightRouter;
