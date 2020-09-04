'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("categorycontents", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    category_id: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.TEXT
    },
    file: {
      type: Sequelize.JSON,
      defaultValue: '',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    }
});
},
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categorycontents');
  }
};
