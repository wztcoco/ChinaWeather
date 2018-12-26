var express = require('express');
var router = express.Router();
var apis = require('./api');
/* GET home page. */
router.post('/', function(req, res, next) {
  switch (req.body.apicode){
    case "addShop":
      apis.addShop(req.body.args, res);
      break;

    default:
      res.send('Undefined ApiCode!');

  }
});

module.exports = router;
