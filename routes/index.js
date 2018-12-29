var express = require('express');
var router = express.Router();
var apis = require('./api');
/* GET home page. */
// router.post('/', function(req, res, next) {
//   switch (req.body.apicode){
//     case "getTempMaxMap":
//       apis.getTempMaxMap(req.body.args, res);
//       break;
//
//     default:
//       res.send('Undefined ApiCode!');
//
//   }
// });
router.post('/getKindNum',function (req, res, next) {
  apis.getKindNum(req.body, res);
});
router.get('/getTempMaxMap',function (req, res, next) {
  apis.getTempMaxMap(req, res);
});
router.get('/getTempMinMap',function (req, res, next) {
  apis.getTempMinMap(req, res);
});
router.get('/getTempMaxSort',function (req, res, next) {
  apis.getTempMaxSort(req, res);
});
router.get('/getAllDate',function (req, res, next) {
  apis.getAllDate(req, res);
});
module.exports = router;