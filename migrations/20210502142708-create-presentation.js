'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Presentation', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'User',
                    key: 'id',
                    as: 'user_id'
                },
                allowNull: true,
            },
            title: {
                allowNull: true,
                type: Sequelize.STRING
            },
            is_private: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            secret_key: {
                type: Sequelize.STRING,
                allowNull: true
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
        await queryInterface.dropTable('Presentation');
    }
};
