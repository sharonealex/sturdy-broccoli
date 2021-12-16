const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Painting extends Model{};

Painting.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false
    },
    exhibition_date: {
        type: DataTypes.DATE
    },
    filename: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    gallery_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'gallery',
            key: 'id'
        }
    }
},{
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = Painting;
