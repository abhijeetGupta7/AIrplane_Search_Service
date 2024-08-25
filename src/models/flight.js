'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // Define association with the Airplane model
      Flight.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        as: "airplaneDetails",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"

      });

      // Define association with the Airport model for arrivalAirportId
      Flight.belongsTo(models.Airport, {
        as: "arrivalAirport",
        foreignKey: "arrivalAirportId",
        targetKey: "code", // Match the arrivalAirportId with Airport.code
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });

      // Define association with the Airport model for departureAirportId
      Flight.belongsTo(models.Airport, {
        as : "departureAirport",
        foreignKey: "departureAirportId",
        targetKey: "code", // Match the arrivalAirportId with Airport.code
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  }

  Flight.init({
    flightNumber: {
      type:DataTypes.STRING,
      allowNull:false
    },
    airplaneId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    arrivalAirportId: {
      type:DataTypes.STRING,
      allowNull:false
    },
    departureAirportId: {
      type:DataTypes.STRING,
      allowNull:false
    },
    arrivalTime: {
      type:DataTypes.DATE,
      allowNull:false
    },
    departureTime: {
      type:DataTypes.DATE,
      allowNull:false
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    boardingGate: {
      type:DataTypes.STRING
    },
    totalSeats: {              // This is totalAvailableSeats in flight
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};