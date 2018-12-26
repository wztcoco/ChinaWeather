var sequelize = require('sequelize');
var ChooseTable = require('../models/index').ChooseTable;
var SelectInfor = require('../models/index').select_infor;
var SelectionTable = require('../models/index').SelectionTable;
var ShopTable = require('../models/index').ShopTable;
var UserTable = require('../models/index').UserTable;
var API_RESULT_MODEL = {
    "obj": {

    },
    "msg": {
        "error": "",
            "prompt": ""
    },
    "retcode": 0
};
module.exports = {
    addShop:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var shopId = params.shop_id;
        var shopTypeName = params.shop_type_name;
        var shopName = params.shop_name;
        var shopIntro = params.shop_intro;
        var shopImage = params.shop_image;
        ShopTable.create({
            shop_id : shopId,
            shop_type_name : shopTypeName,
            shop_name : shopName,
            shop_intro : shopIntro,
            shop_image : shopImage
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="Shop添加成功";
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="Shop添加失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    getShops:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var shopTypeName = params.shop_type_name?params.shop_type_name:"";
        ShopTable.findAll({
            attributes:['shop_id','shop_type_name','shop_name','shop_intro','shop_image'],
            where:{shop_type_name: {$like:shopTypeName}}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="Shop查询成功";
                jsonResult.obj.shopList = result;
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="Shop查询失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    getShopById:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var shopId = params.shop_id;
        ShopTable.findOne({
            attributes:['shop_id','shop_type_name','shop_name','shop_intro','shop_image'],
            where:{shop_id:shopId}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt = "Shop查询成功";
                jsonResult.obj = result;
                res.send(jsonResult)
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        })
    },
    updateShop:function (params,res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var shopId = params.shop_id;
        var shopTypeName = params.shop_type_name;
        var shopName = params.shop_name;
        var shopIntro = params.shop_intro;
        var shopImage = params.shop_image;
        ShopTable.update({
            shop_type_name : shopTypeName,
            shop_name : shopName,
            shop_intro : shopIntro,
            shop_image : shopImage
        }, {
            where:{shop_id:shopId}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="Shop更新成功";
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="Shop添加失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    deleteShop:function (params,res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var shopId = params.shop_id;
        ShopTable.destroy({
            where:{shop_id : shopId}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="Shop删除成功";
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="Shop删除失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    getChooses:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        ChooseTable.findAll({
            attributes:['choose_id','choose_name','wei_date','is_favorite','choose_result']
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="chooses查询成功";
                jsonResult.obj.choose_list = result;
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="chooses查询失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    getFavoriteChooses:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var isFavorite = params.is_favorite;
        ChooseTable.findAll({
            attributes:['choose_id','choose_name','wei_date','is_favorite','choose_result'],
            where:{is_favorite:isFavorite}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="chooses查询成功";
                jsonResult.obj.choose_list = result;
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="chooses查询失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    updateChoose:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var chooseId = params.choose_id;
        var chooseName = params.choose_name;
        var weiDate = params.wei_date;
        var isFavorite = params.is_favorite;
        var chooseResult = params.choose_result;
        ChooseTable.update({
            choose_name:chooseName,
            wei_date:weiDate,
            is_favorite:isFavorite,
            choose_result:chooseResult
        },{
            where:{choose_id:chooseId}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="choose更新成功";
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="choose更新失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    deleteChoose:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var chooseId = params.choose_id;
        ChooseTable.destroy({
            where:{choose_id:chooseId}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="choose删除成功";
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="choose删除失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    getChoose:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var chooseId = params.choose_id;
        ChooseTable.findOne({
            attributes:['choose_id','choose_name','wei_date','is_favorite','choose_result'],
            where:{choose_id:chooseId}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="chooses查询成功";
                jsonResult.obj = result;
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="chooses查询失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    addChoose:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var chooseId = params.choose_id;
        var chooseName = params.choose_name;
        var weiDate = params.wei_date;
        var isFavorite = params.is_favorite;
        var chooseResult = params.choose_result;
        ChooseTable.create({
            choose_id:chooseId,
            choose_name:chooseName,
            wei_date:weiDate,
            is_favorite:isFavorite,
            choose_result:chooseResult
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="choose添加成功";
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="choose添加失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    addSelection:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var selectionId = params.selection_id;
        var chooseId = params.choose_id;
        var shopId = params.shop_id;
        var focusValue = params.focus_value;
        SelectionTable.create({
            selection_id:selectionId,
            choose_id:chooseId,
            shop_id:shopId,
            focus_value:focusValue
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="selection添加成功";
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="selection添加失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    getSelections:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var chooseId = params.choose_id;
        SelectionTable.findAll({
            attributes:["selection_id","choose_id","shop_id","focus_value"],
            where:{choose_id:chooseId}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="selection添加成功";
                jsonResult.obj.selection_list = result;
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="selection添加失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    updateSelection:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var selectionId = params.selection_id;
        var chooseId = params.choose_id;
        var focusValue = params.focus_value;
        var shopId = params.shop_id;
        SelectionTable.update({
            choose_id:chooseId,
            shop_id:shopId,
            focus_value:focusValue
        }, {
            where:{selection_id:selectionId,}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="selection更新成功";
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="selection更新失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    deleteSelection:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var selectionId = params.selection_id;
        SelectionTable.destroy({
                where:{selection_id:selectionId}
            }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="selection删除成功";
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="selection删除失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    getSelection:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var chooseId = params.choose_id;
        var shopId = params.shop_id;
        SelectionTable.findAll({
            attributes:["selection_id","choose_id","shop_id","focus_value"],
            where:{choose_id:chooseId,shop_id:shopId}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="selection查询成功";
                jsonResult.obj = result;
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="selection查询失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    addUser:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var userId = params.user_id;
        var userName = params.user_name;
        var password = params.password;
        var userPhone = params.user_phone;
        UserTable.create({
            user_id:userId,
            user_name:userName,
            password:password,
            user_phone:userPhone
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="user添加成功";
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="user添加失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    updateUser:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var userId = params.user_id;
        var userName = params.user_name;
        var password = params.password;
        var userPhone = params.user_phone;
        UserTable.update({
            user_name: userName,
            password: password,
            user_phone: userPhone
        }, {
                where:{user_id:userId}
            }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="user更新成功";
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="user更新失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    getUserByPhone:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var userPhone = params.user_phone;
        UserTable.findOne({
            attributes:['user_id','user_name','password','user_phone'],
            where:{user_phone:userPhone}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="user查询成功";
                jsonResult.obj = result;
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="user查询失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    getUserBy2P:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var userPhone = params.user_phone;
        var password = params.password;
        UserTable.findOne({
            attributes:['user_id','user_name','password','user_phone'],
            where:{user_phone:userPhone,password:password}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="user查询成功";
                jsonResult.obj = result;
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="user查询失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
    getUserById:function (params, res) {
        var jsonResult=JSON.parse(JSON.stringify(API_RESULT_MODEL));
        var userId = params.user_id;
        UserTable.findOne({
            attributes:['user_id','user_name','password','user_phone'],
            where:{user_id:userId}
        }).then(function (result) {
            if(result){
                jsonResult.msg.prompt="user查询成功";
                jsonResult.obj = result;
                res.send(jsonResult);
            }else {
                jsonResult.retcode=-1;
                jsonResult.msg.prompt="user查询失败";
                res.send(jsonResult);
            }
        }).catch(function (err) {
            jsonResult.retcode=-500;
            jsonResult.msg.prompt="系统内部错误";
            jsonResult.msg.error=err.message;
            res.send(jsonResult);
        });
    },
};