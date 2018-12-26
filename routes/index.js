var express = require('express');
var router = express.Router();
var apis = require('./api');
/* GET home page. */
router.post('/', function(req, res, next) {
  switch (req.body.apicode){
    case "addShop":
      apis.addShop(req.body.args, res);
      break;
    case "getShops":
      apis.getShops(req.body.args, res);
      break;
    case "getShopById":
      apis.getShopById(req.body.args, res);
      break;
    case "updateShop":
      apis.updateShop(req.body.args, res);
      break;
    case "deleteShop":
      apis.deleteShop(req.body.args, res);
      break;
    case "getChooses":
      apis.getChooses(req.body.args, res);
      break;
    case "getFavoriteChooses":
      apis.getFavoriteChooses(req.body.args, res);
      break;
    case "updateChoose":
      apis.updateChoose(req.body.args, res);
      break;
    case "deleteChoose":
      apis.deleteChoose(req.body.args, res);
      break;
    case "getChoose":
      apis.getChoose(req.body.args, res);
      break;
    case "addChoose":
      apis.addChoose(req.body.args, res);
      break;
    case "addSelection":
      apis.addSelection(req.body.args, res);
      break;
    case "getSelection":
      apis.getSelection(req.body.args, res);
      break;
    case "deleteSelection":
      apis.deleteSelection(req.body.args, res);
      break;
    case "updateSelection":
      apis.updateSelection(req.body.args, res);
      break;
    case "getSelections":
      apis.getSelections(req.body.args, res);
      break;
    case "addUser":
      apis.addUser(req.body.args, res);
      break;
    case "updateUser":
      apis.updateUser(req.body.args, res);
      break;
    case "getUserByPhone":
      apis.getUserByPhone(req.body.args, res);
      break;
    case "getUserBy2P":
      apis.getUserBy2P(req.body.args, res);
      break;
    case "getUserById":
      apis.getUserById(req.body.args, res);
      break;
    default:
      res.send('Undefined ApiCode!');

  }
});

module.exports = router;
