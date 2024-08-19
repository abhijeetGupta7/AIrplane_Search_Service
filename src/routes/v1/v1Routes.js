const express=require('express');
const airplaneRouter = require('./airplane-routes');
const infoController = require('../../controllers/info-controller');

const v1Router=express.Router();

v1Router.use("/airplane",airplaneRouter);

v1Router.get("/info",infoController);

module.exports=v1Router;