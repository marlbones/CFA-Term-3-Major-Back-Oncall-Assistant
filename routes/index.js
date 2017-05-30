var express = require('express');
var router = express.Router();

const Client = require('../models/Client');
const clientController = require('../controllers/clientController')

function ensureAuthenticated(req, res, next) {
  // Express authentication method
  if (req.isAuthenticated()) {
    // Keep going
    next();
  } else {
    // If not authenticated, redirect to login page
    // req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}
// Get Homepage
// Ensure user is authenticated before rendering index
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('index');
});

router.get('/clients', ensureAuthenticated, clientController.getClients);
router.post('/clients', clientController.postClients);
router.get('/clients/:id', ensureAuthenticated, clientController.getClient);
router.post('/clients/:id', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClients);

module.exports = router;
