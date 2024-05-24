
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('./config')

const sequelize = new Sequelize(`postgres://${config.user}:${config.pass}@${config.host}:${config.port}/${config.name}`);

fs
  .readdirSync(path.join(__dirname, "models"))
  .filter(file => {
    return file.slice(-3) === '.js';
  })
  .forEach(file => {
    try {
      const model = require(path.join(__dirname, "./models", file))(sequelize, Sequelize.DataTypes);
      model.sync();
    } catch (error) {
      console.log(error);
    }
  });

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};