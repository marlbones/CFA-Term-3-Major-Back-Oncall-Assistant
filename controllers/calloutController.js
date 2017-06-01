const mongoose = require('mongoose');
const Callout = require('../models/Callout');

exports.getCallouts = (req, res) => {
  Callout.find()
    .then(callouts => {
      res.json(callouts)
    })
};

exports.postCallouts = (req, res) => {
  const cw_name = req.query.cw_name;
  const time = req.query.time;
  const details = req.query.details;
  const call_phone = req.query.call_phone;
  const length = req.query.length;
  const client_id = req.query.client_id;
  const day = req.query.day;
  const month = req.query.month;
  const year = req.query.year;
  const created_at = req.query.created_at;
  let callout = new Callout();
  callout.cw_name = cw_name;
  callout.time = time;
  callout.details = details;
  callout.call_phone = call_phone;
  callout.length = length;
  callout.client_id = client_id;
  callout.day = day;
  callout.month = month;
  callout.year = year;
  callout.created_at = created_at;
  callout.save()
    .then(() => {
      res.json(callout)
    })
};

exports.getCallout = (req,res) => {
  Callout.findOne({ _id: req.params.id})
    .then(callout => {
      res.json(callout)
    });
};

exports.updateCallout = (req, res) => {
  Callout.findOneAndUpdate({ _id: req.params.id }, req.query, {
    new: true
  })
  .then(callout => {
    res.json(callout)
  });
};

exports.deleteCallouts =  (req, res) => {
  Callout.findOneAndRemove({ _id: req.params.id})
    .then(() => {
      res.json('it has been deleted')
    })
};
