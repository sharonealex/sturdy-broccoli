const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model{
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
};

Model.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6],
        },
      },
},{
    hooks: {
        beforeCreate = (newUser)=>{
             newUser.password = bcrypt.hash(newUser.password);
             return newUser;
        }
    },
    sequelize,
    freezeTableName: true,
    underscored: false,
    timestamps:false,
    modelName: 'user'

});

module.exports = User;