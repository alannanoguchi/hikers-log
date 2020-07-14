'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Hikes', 'imgUrl', { type: Sequelize.STRING });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Hikes', 'imgUrl');
  }
};