"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`
      INSERT INTO categories (id, name, user_id, createdAt, updatedAt) VALUES
      (6, 'Node JS', 5, '2020-09-04 19:24:14', '2020-09-04 19:24:14'),
      (7, 'Angular', 4, '2020-09-04 19:24:29', '2020-09-04 19:24:29'),
      (8, 'PHP', 2, '2020-09-04 19:24:37', '2020-09-04 19:24:37'),
      (9, '.NET', 7, '2020-09-04 19:24:50', '2020-09-04 19:24:50');
      `),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`DELETE FROM categories where id in (6, 7, 8, 9);`),
    ]);
  },
};
