'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('User', [{
            google_id: '1234566778',
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@xample.com'
        }], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('User', null, {});
    }
};
