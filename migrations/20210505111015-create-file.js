'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('File', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            presentation_id: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'Presentation',
                    key: 'id',
                    as: 'presentation_id'
                },
                allowNull: true,
            },
            path: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            size: {
                type: Sequelize.INTEGER
            },
            mime: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('File');
    }
};
