'use strict';
const { Model } = require('sequelize');
const { Enums } = require("../utils/common");
const { BUSINESS, ECONOMY, FIRST_CLASS, PREMIUM_ECONOMY } = Enums.SEAT_TYPE;

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Association between Seats and Airplanes table
      Seat.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  }

  Seat.init({
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    col: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: [BUSINESS, FIRST_CLASS, PREMIUM_ECONOMY, ECONOMY],
      defaultValue: ECONOMY,
      allowNull: false
    }
  }, {
    sequelize, 
    modelName: 'Seat',
  });

  return Seat;
};
