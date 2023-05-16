"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stage, EventStages, SetTimes, MeetGreet }) {
      // define association here
      Event.belongsToMany(Stage, {
        foreignKey: "event_id",
        as: "stages",
        through: EventStages
      })


      Event.hasMany(SetTimes, {
        foreignKey: "event_id",
        as: "set_times"
      })


      Event.hasMany(MeetGreet, {
        foreignKey: "event_id",
        as: "meet_greets"
      })
    }
  }
  Event.init(
    {
      event_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events",
      timestamps: false
    }
  );
  return Event;
};