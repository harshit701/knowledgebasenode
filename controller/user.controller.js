const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const Joi = require('joi');

// Create and Save a new User
exports.create = async (req, res) => {
  if (req.body.password !== req.body.confirm_password) {
    res.status(403).send({
      message: 'password and confirm_password must be same!'
    });
  }
  delete req.body.confirm_password;

  const hashPassword = crypto.createHash("md5").update(req.body.password).digest("hex");

  // Create a User
  const user = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: hashPassword
  };

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().label('invalid name'),
    password: Joi.string().required(),
    phone: Joi.string().pattern(new RegExp('^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$')).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
  });
  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(500).send({
      message: error.message
    });
  }

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user.",
      });
    });
};

// Retrieve all Users from the database.
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashPassword = crypto.createHash("md5").update(password).digest("hex");

  User.findOne({ where: {email: email, password: hashPassword} })
    .then((data) => {
      if (!data) {
        res.status(200).send({
          message: "Oops! Email or password is wrong.",
        });
      }
      const generatedToken = {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone
      }
      const token = jwt.sign(generatedToken, config.tokensecret, {
        expiresIn: '120ms' // expires in 24 hours
      });
      res.send({data: token, user_id: data.id});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
