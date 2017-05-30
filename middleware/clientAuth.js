const Client = require('../models/Client');
let jwt = require('jsonwebtoken');

// Authenticating
exports.clientAuth = function(req, res, next) {
    console.log('Authenticating access')

    const key = req.body.key ||
      req.query.key ||
      req.headers['x-access-key'];

      //Token authentication
      var decoded = jwt.verify(key, 'secret');
      console.log(decoded.email)
      let found = false;
      if (decoded.email === 'admin@admin.com') {
        found = true;
      };

      if (found) { //?key=1234 in url to pass key
          next();
      } else {
    res.json(401, { //'401' doesn't allow access to a page
        success: false,
        message: 'Not Authorised',
    });
  }
};
