'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate(models) {
            User.hasMany(models.Presentation, {
                foreignKey: 'user_id',
                as: 'user_presentation',
            });
        }
    }

    User.init(
        {
            google_id: DataTypes.STRING,
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            picture: DataTypes.STRING,
        },
        {
            sequelize,
            underscored: true,
            timestamps: true,
            paranoid: true,
            deletedAt: 'deletedAt',
            modelName: 'User',
            freezeTableName: true,
        });
    return User;
};
