'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Defining the one-to-many association between City and Airport models
      City.hasMany(models.Airport, {
        foreignKey: 'cityId',
        as: 'airports'
      });
    }
  }
  City.init({
    name: { 
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
    }
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};