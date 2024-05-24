module.exports = (sequelize, DataTypes) => {
  return sequelize.define('photos', {
    publishedDate: DataTypes.DATE,
    tags: DataTypes.TEXT,
    url: DataTypes.TEXT,
  }, {});
};