'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hike = sequelize.define('Hike', {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    imgUrl: DataTypes.STRING //add this line (don't forget the comma above!)
  }, {});
  // Hike.associate = function(models) {
  //   Hike.hasMany(models.Rsvp);
  // };
  return Hike;
};