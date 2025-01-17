'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Card.belongsTo(models.Account);
      Card.hasMany(models.Replacement);
    }
  }
  Card.init({
    cardNumber: DataTypes.STRING,
    nip: DataTypes.INTEGER,
    dateExpiration: DataTypes.DATE,
    state: DataTypes.BOOLEAN,
    AccountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};