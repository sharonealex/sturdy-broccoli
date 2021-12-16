const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection")

class Dish extends Model {}

Dish.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    dish_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    guest_name: {
        type: DataTypes.STRING
    },
    has_nuts: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: "dish",
  }
);

module.exports = Dish;
