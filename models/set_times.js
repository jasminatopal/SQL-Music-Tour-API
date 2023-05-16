'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SetTimes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  static associate({Band, Stage, Event}) {
      // define association here
      SetTimes.belongsTo(Band, {
        foreignKey: "band_id",
        as: "band"
      })

  
      SetTimes.belongsTo(Event, {
        foreignKey: "event_id",
        as: "events"
      })


      SetTimes.belongsTo(Stage, {
        foreignKey: "stage_id",
        as: "stage"
      })
    }
  }
  SetTimes.init({
    settimes_id: {
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
    stage_id: {
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
    modelName: 'SetTimes',
    tableName: 'set_times',
    timestamps: false
  });
  return SetTimes;
};