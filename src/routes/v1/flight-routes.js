const express = require('express');
const { validateCreateFlightRequest } = require('../../middlewares');
const { flightController } = require('../../controllers');

const flightRouter=express.Router();

flightRouter.post("/",validateCreateFlightRequest, flightController.createFlight);

module.exports=flightRouter;