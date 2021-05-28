'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Presentation extends Model {
        static associate(models) {
            Presentation.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'presentation_user',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            Presentation.hasMany(models.File, {
                foreignKey: 'presentation_id',
                as: 'presentation_file',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }

    Presentation.init(
        {
            user_id: DataTypes.INTEGER,
            title: DataTypes.STRING,
            is_private: DataTypes.BOOLEAN,
            secret_key: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Presentation',
            underscored: true,
            timestamps: true,
            paranoid: true,
            freezeTableName: true,
        }
    );
    return Presentation;
};
