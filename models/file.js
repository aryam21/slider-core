'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class File extends Model {
        static associate(models) {
            File.belongsTo(models.Presentation, {
                foreignKey: 'presentation_id',
                as: 'file_presentation',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    };
    File.init(
        {
            presentation_id: DataTypes.INTEGER,
            path: DataTypes.STRING,
            name: DataTypes.STRING,
            size: DataTypes.INTEGER,
            mime: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'File',
            underscored: true,
            timestamps: true,
            paranoid: true,
            freezeTableName: true,
        }
    );
    return File;
};
