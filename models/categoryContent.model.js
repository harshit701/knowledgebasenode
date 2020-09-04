module.exports = (sequelize, Sequelize) => {
  const categoryContent = sequelize.define("categoryContent", {
    category_id: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.TEXT
    },
    file: {
      type: Sequelize.JSON,
      defaultValue: '',
    }
  });

  return categoryContent;
};
