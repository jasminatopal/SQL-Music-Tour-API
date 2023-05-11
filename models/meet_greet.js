'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Band extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    MeetGreet.init({
        meetgreet_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        band_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
    
        sequelize,
        modelName: 'MeetGreet',
        tableName: 'meet_greets',
        timestamps: false
    });
    return MeetGreet;
};