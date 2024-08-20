'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("Airports",{
      fields: ["cityId"],
      type: "foreign key",
      name: "fk_airports_cities",
      references: {
        table: "cities",
        field: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports', 'fk_airports_cities');
  }
};
