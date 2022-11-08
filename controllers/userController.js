const Joi = require("joi");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SchemaValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

exports.register = (username, email, password) => {
  return new Promise((resolve, reject) => {
    let validation = SchemaValidation.validate({ username, email, password });
    if (validation.error) {
      return reject(validation.error.details[0].message);
    }
    db.User.count({ where: { email } }).then((doc) => {
      if (doc != 0) {
        return reject("this email is used");
      } else {
        bcrypt.hash(password, 10).then((hashedPassword) => {
          db.User.create({
            username,
            email,
            password: hashedPassword,
          })
            .then((response) => resolve(response))
            .catch((err) => reject(err));
          //create(req.body)
        });
      }
    });
  });
};

const privateKey = "this is private key";
exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    db.User.findOne({ where: { email } }).then((user) => {
      if (!user) {
        reject("invalid data");
      } else {
        bcrypt.compare(password, user.password).then((same) => {
          if (same) {
            let token = jwt.sign(
              { id: user.id, username: user.id, role: "userrole" },
              privateKey,
              {
                expiresIn: "24h",
              }
            );
            resolve(token);
          } else {
            reject("invalid data");
          }
        });
      }
    });
  });
};
