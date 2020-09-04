"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`
      INSERT INTO users (id, name, phone, email, password, createdAt, updatedAt) VALUES
      (1, 'abc', '1234567890', 'abc@gmail.com', 'f7dc2e1937940bb8486274edc88cc3c5', '2020-09-03 18:43:11', '2020-09-03 18:43:11'),
      (2, 'qwerty', '1234567890', 'xyz@gmail.com', 'f7dc2e1937940bb8486274edc88cc3c5', '2020-09-03 19:55:58', '2020-09-03 19:55:58'),
      (3, 'qw', '1234567890', 'xyz@gmail.com', 'f7dc2e1937940bb8486274edc88cc3c5', '2020-09-03 19:59:33', '2020-09-03 19:59:33'),
      (4, 'Chantale Mullins', '1234567890', 'rikuxyq@mailinator.com', 'f7dc2e1937940bb8486274edc88cc3c5', '2020-09-04 11:33:58', '2020-09-04 11:33:58'),
      (5, 'Lacy Goodwin', '1234567890', 'bexucuq@mailinator.com', 'f7dc2e1937940bb8486274edc88cc3c5', '2020-09-04 11:34:42', '2020-09-04 11:34:42'),
      (6, 'Malik Branch', '1234567890', 'gajawe@mailinator.com', 'f7dc2e1937940bb8486274edc88cc3c5', '2020-09-04 11:41:51', '2020-09-04 11:41:51'),
      (7, 'Karleigh Cervantes', '1234567890', 'decyfezu@mailinator.com', 'f7dc2e1937940bb8486274edc88cc3c5', '2020-09-04 11:44:27', '2020-09-04 11:44:27'),
      (8, 'Jada Taylor', '1234567890', 'xaja@mailinator.com', 'f7dc2e1937940bb8486274edc88cc3c5', '2020-09-04 11:47:59', '2020-09-04 11:47:59'),
      (9, 'Clarke Ball', '1234567890', 'xaxa@mailinator.com', 'f7dc2e1937940bb8486274edc88cc3c5', '2020-09-04 11:50:16', '2020-09-04 11:50:16');
      `),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`DELETE FROM users where id in (1, 2, 3, 4, 5, 6, 7, 8, 9);`),
    ]);
  },
};
