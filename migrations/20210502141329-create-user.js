'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('User', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            google_id:{
                type: Sequelize.STRING
            },
            first_name: {
                type: Sequelize.STRING
            },
            last_name: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                unique: {
                    args: true,
                    msg: 'Email already exists'
                },
                validate: {
                    isEmail: {
                        args: true,
                        msg: 'Please enter a valid email address'
                    },
                },
            },
            picture:{
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at'
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: 'updated_at'
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                field: 'deleted_at'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('User');
    }
};
