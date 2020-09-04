const db = require("../models");
const CategoryContent = db.categoryContent;
const Op = db.Sequelize.Op;
const Joi = require('joi');

// Create and Save a new CategoryContent
exports.create = (req, res) => {

  const schema = Joi.object({
    category_id: Joi.required(),
    description: Joi.required(),
    file: Joi.allow()
  });
  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(500).send({
      message: error.message
    });
  }
  
  // Create a CategoryContent
  const categoryContent = {
    category_id: req.body.category_id,
    description: req.body.description,
    file: req.body.file
  };

  // Save CategoryContent in the database
  CategoryContent.create(categoryContent)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the CategoryContent.",
      });
    });
};

// Retrieve all CategoryContents from the database.
exports.findAll = (req, res) => {
  const description = req.query.description;
  var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;

  CategoryContent.findAll({ where: condition })
    .then((data) => {
      data.map(element => element.file = JSON.parse(element.file));
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categoryContent.",
      });
    });
};

// Find a single CategoryContent with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  CategoryContent.findByPk(id)
    .then((data) => {
      data.file = JSON.parse(data.file);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving CategoryContent with id=" + id,
      });
    });
};

// Update a CategoryContent by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  CategoryContent.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "CategoryContent was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update CategoryContent with id=${id}. Maybe CategoryContent was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating CategoryContent with id=" + id,
      });
    });
};

// Delete a CategoryContent with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  CategoryContent.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "CategoryContent was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete CategoryContent with id=${id}. Maybe CategoryContent was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete CategoryContent with id=" + id,
      });
    });
};
