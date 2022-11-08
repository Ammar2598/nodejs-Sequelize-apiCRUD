const express = require("express");
const route = express.Router();
const db = require("../models");

route.post("/createprofile", (req, res, next) => {
  db.Profile.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    country: req.body.country,
    UserId: req.body.UserId,
  })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
  //create(req.body)
});
route.get("/profile/:id", (req, res, next) => {
  db.Profile.findOne({ where: { id: req.params.id }, include: [db.User] })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
  //db.Profile.findAll({where:(id:req.params.id)})
});

route.get("/profiles", (req, res, next) => {
  db.Profile.findAll({ include: [db.User] })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
  //db.Profile.findAll({where:(id:req.params.id)})
});

route.patch("/profile/:id", (req, res, next) => {
  db.Profile.update(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      country: req.body.country,
      UserId: req.body.UserId,
    },
    { where: { id: req.params.id } }
  )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
  //db.Profile.findAll({where:(id:req.params.id)})
});

route.delete("/profile/:id", (req, res, next) => {
  db.Profile.destroy({ where: { id: req.params.id } })
    .then((response) => res.status(202).send(response))
    .catch((err) => res.status(400).send(err));
  //db.Profile.findAll({where:(id:req.params.id)})
});
module.exports = route;
