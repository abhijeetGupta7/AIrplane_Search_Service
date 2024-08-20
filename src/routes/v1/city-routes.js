const express=require("express");
const { cityController } = require("../../controllers");
const { validateCreateCityRequest } = require("../../middlewares");

const cityRouter=express.Router();

// /api/v1/airplane/ POST
cityRouter.post("/", validateCreateCityRequest, cityController.createcity);

// /api/v1/airplane/ GET
cityRouter.get("/", cityController.getCities);

// /api/v1/airplane/:id  GET
cityRouter.get("/:id", cityController.getcity);

// /api/v1/airplane/:id  PATCH
cityRouter.patch("/:id",cityController.updatecity);

// /api/v1/airplane/:id  DELETE
cityRouter.delete("/:id",cityController.deletecity);

module.exports=cityRouter;