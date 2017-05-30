const mongoose = require('mongoose');
const Client = require('../models/Client');

exports.getClients = (req, res) => {
  Client.find()
    .then(clients => {
      res.json(clients)
    })
};

exports.postClients = (req, res) => {
  const name = req.query.name;
  const boat_id = req.query.boat_id;
  const nationality = req.query.nationality;
  const ethnicity = req.query.ethnicity;
  const language = req.query.language;
  const address = req.query.address;
  let client = new Client();
  client.name = name;
  client.boat_id = boat_id;
  client.nationality = nationality;
  client.ethnicity = ethnicity;
  client.language = language;
  client.address = address;
  client.save()
    .then(() => {
      res.json(client)
    })
};

exports.getClient = (req,res) => {
  Client.findOne({ _id: req.params.id})
    .then(client => {
      res.json(client)
    });
};

exports.updateClient = (req, res) => {
  Client.findOneAndUpdate({ _id: req.params.id }, req.query, {
    new: true
  })
  .then(client => {
    res.json(client)
  });
};

exports.deleteClients =  (req, res) => {
  Client.findOneAndRemove({ _id: req.params.id})
    .then(() => {
      res.json('it has been deleted')
    })
};
