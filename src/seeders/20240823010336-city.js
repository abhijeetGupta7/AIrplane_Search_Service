'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('Cities', [
        { "name": "Delhi", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Mumbai", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Bengaluru", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Kolkata", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Hyderabad", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Cochin", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Ahmedabad", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Chennai", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Goa", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Thiruvananthapuram", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Pune", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Guwahati", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Jaipur", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Varanasi", "createdAt": new Date(), "updatedAt": new Date() },
        { "name": "Amritsar", "createdAt": new Date(), "updatedAt": new Date() }
      ], {});
    } catch (error) {
      console.error('Error in up migration:', error);
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('Cities', null, {});
    } catch (error) {
      console.error('Error in down migration:', error);
    }
  }
};
