const express=require("express");
const { airplaneController } = require("../../controllers");
const { validateCreateAirplaneRequest } = require("../../middlewares");

const airplaneRouter=express.Router();

// /api/v1/airplane/ POST
airplaneRouter.post("/", validateCreateAirplaneRequest, airplaneController.createAirplane);

// /api/v1/airplane/ GET
airplaneRouter.get("/", airplaneController.getAirplanes);

// /api/v1/airplane/:id  GET
airplaneRouter.get("/:id", airplaneController.getAirplane);

// /api/v1/airplane/:id  PATCH
airplaneRouter.patch("/:id",airplaneController.updateAirplane);

// /api/v1/airplane/:id  DELETE
airplaneRouter.delete("/:id",airplaneController.deleteAirplane);

module.exports=airplaneRouter;