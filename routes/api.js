 var sequelize = require('sequelize');
var WeatherTable = require('../models/index').weather;
var underscore = require('underscore');
var API_RESULT_MODEL = {
    "obj": {

    },
    "msg": {
        "error": "",
            "prompt": ""
    },
    "retcode": 0
};


var data = {
    "jiangsu": {"value": "", "index": "1", "stateInitColor": "0"},
    "henan": {"value": "19.77%", "index": "2", "stateInitColor": "0"},
    "anhui": {"value": "10.85%", "index": "3", "stateInitColor": "0"},
    "zhejiang": {"value": "10.02%", "index": "4", "stateInitColor": "0"},
    "liaoning": {"value": "8.46%", "index": "5", "stateInitColor": "0"},
    "beijing": {"value": "4.04%", "index": "6", "stateInitColor": "1"},
    "hubei": {"value": "3.66%", "index": "7", "stateInitColor": "1"},
    "jilin": {"value": "2.56%", "index": "8", "stateInitColor": "1"},
    "shanghai": {"value": "2.47%", "index": "9", "stateInitColor": "1"},
    "guangxi": {"value": "2.3%", "index": "10", "stateInitColor": "1"},
    "sichuan": {"value": "1.48%", "index": "11", "stateInitColor": "2"},
    "guizhou": {"value": "0.99%", "index": "12", "stateInitColor": "2"},
    "hunan": {"value": "0.78%", "index": "13", "stateInitColor": "2"},
    "shandong": {"value": "0.7%", "index": "14", "stateInitColor": "2"},
    "guangdong": {"value": "0.44%", "index": "15", "stateInitColor": "2"},
    "jiangxi": {"value": "0.34%", "index": "16", "stateInitColor": "3"},
    "fujian": {"value": "0.27%", "index": "17", "stateInitColor": "3"},
    "yunnan": {"value": "0.23%", "index": "18", "stateInitColor": "3"},
    "hainan": {"value": "0.21%", "index": "19", "stateInitColor": "3"},
    "shanxi": {"value": "0.11%", "index": "20", "stateInitColor": "3"},
    "hebei": {"value": "0.11%", "index": "21", "stateInitColor": "4"},
    "neimongol": {"value": "0.04%", "index": "22", "stateInitColor": "4"},
    "tianjin": {"value": "0.04%", "index": "23", "stateInitColor": "4"},
    "gansu": {"value": "0.04%", "index": "24", "stateInitColor": "4"},
    "shaanxi": {"value": "0.02%", "index": "25", "stateInitColor": "4"},
    "macau": {"value": "0.0%", "index": "26", "stateInitColor": "7"},
    "hongkong": {"value": "0.0%", "index": "27", "stateInitColor": "7"},
    "taiwan": {"value": "0.0%", "index": "28", "stateInitColor": "7"},
    "qinghai": {"value": "0.0%", "index": "29", "stateInitColor": "7"},
    "xizang": {"value": "0.0%", "index": "30", "stateInitColor": "7"},
    "ningxia": {"value": "0.0%", "index": "31", "stateInitColor": "7"},
    "xinjiang": {"value": "0.0%", "index": "32", "stateInitColor": "7"},
    "heilongjiang": {"value": "0.0%", "index": "33", "stateInitColor": "7"},
    "chongqing": {"value": "0.0%", "index": "34", "stateInitColor": "7"}
};
var names={
    heilongjiang: '哈尔滨',
    jilin: '长春',
    liaoning: '沈阳',
    hebei: '石家庄',
    shandong: '济南',
    jiangsu: '南京',
    zhejiang: '杭州',
    anhui: '合肥',
    henan: '郑州',
    shanxi: '太原',
    shaanxi: '西安',
    gansu: '兰州',
    hubei: '武汉',
    jiangxi: '南昌',
    fujian: '福州',
    hunan: '长沙',
    guizhou: '贵阳',
    sichuan: '成都',
    yunnan: '昆明',
    qinghai: '西宁',
    hainan: '海南',
    shanghai: '上海',
    chongqing: '重庆',
    tianjin: '天津',
    beijing: '北京',
    ningxia: '银川',
    neimongol: '呼和浩特',
    guangxi: '南宁',
    xinjiang: '乌鲁木齐',
    xizang: '拉萨',
    guangdong: '广州',
    hongkong: '香港',
    taiwan: '台北',
    macau: '澳门'
};
module.exports = {
    getTempMaxMap:function (params, res) {
        WeatherTable.findAll({
            attributes:["city","date","max","min","kind"]
        }).then(function (result) {
            if(result){
                var citys = underscore.pluck(result,"dataValues");
                var max_temp =-100;
                var min_temp = 100;
                underscore.map(citys,function (item1) {
                    if(item1.max>max_temp)
                        max_temp = item1.max;
                    if(item1.max<min_temp)
                        min_temp = item1.max;
                });
                var temp = (max_temp-min_temp)/8;
                for(i in data){
                    var each_city = underscore.where(citys,{city:names[i]});
                    var ave_temp = 0;
                    var length = 0;
                    underscore.map(each_city,function (item2) {
                        ave_temp+=item2.max;
                        length++;
                    });
                    ave_temp/=length;
                    var j = -1;
                    data[i].value = ave_temp.toFixed(1)+"";
                    while(ave_temp>=min_temp)
                    {
                        ave_temp-=temp;
                        j++;
                    }
                    data[i].stateInitColor = j+"";
                }
                res.send(data);
            }
        }).catch(function (error) {
            console.log(error);
        })
    },
    getTempMinMap:function (params, res) {
        WeatherTable.findAll({
            attributes:["city","date","max","min","kind"]
        }).then(function (result) {
            if(result){
                var citys = underscore.pluck(result,"dataValues");
                var max_temp =-100;
                var min_temp = 100;
                underscore.map(citys,function (item1) {
                    if(item1.min>max_temp)
                        max_temp = item1.min;
                    if(item1.min<min_temp)
                        min_temp = item1.min;
                });
                var temp = (max_temp-min_temp)/8;
                for(i in data){
                    var each_city = underscore.where(citys,{city:names[i]});
                    var ave_temp = 0;
                    var length = 0;
                    underscore.map(each_city,function (item2) {
                        ave_temp+=item2.min;
                        length++;
                    });
                    ave_temp/=length;
                    var j = -1;
                    data[i].value = ave_temp.toFixed(1)+"";
                    while(ave_temp>=min_temp)
                    {
                        ave_temp-=temp;
                        j++;
                    }
                    data[i].stateInitColor = j+"";
                }
                res.send(data);
            }
        }).catch(function (error) {
            console.log(error);
        })
    },
    getTempMaxSort:function (params, res) {
        WeatherTable.findAll({
            attributes:["city","date","max","min","kind"]
        }).then(function (result) {
            if(result){
                var citys = underscore.pluck(result,"dataValues");
                var maps = [];
                for(i in data){
                    var each_city = underscore.where(citys,{city:names[i]});
                    var ave_temp = 0;
                    var length = 0;
                    underscore.map(each_city,function (item2) {
                        var dataT = 0;
                        dataT+=item2.max;
                        dataT+=item2.min;
                        dataT/=2;
                        ave_temp+=dataT;
                        length++;
                    });
                    ave_temp/=length;
                    var each_temp = [];
                    each_temp.push(names[i],parseInt(10*ave_temp.toFixed(1))/10);
                    maps.push(each_temp);
                }
                maps.sort(function(x, y){
                    return y[1]-x[1];
                });

                res.send(maps.slice(0,10));
            }
        }).catch(function (error) {
            console.log(error);
        })
    },
    getTempMinSort:function (params, res) {
        WeatherTable.findAll({
            attributes:["city","date","max","min","kind"]
        }).then(function (result) {
            if(result){
                var citys = underscore.pluck(result,"dataValues");
                var maps = [];
                for(i in data){
                    var each_city = underscore.where(citys,{city:names[i]});
                    var ave_temp = 0;
                    var length = 0;
                    underscore.map(each_city,function (item2) {
                        var dataT = 0;
                        dataT+=item2.max;
                        dataT+=item2.min;
                        dataT/=2;
                        ave_temp+=dataT;
                        length++;
                    });
                    ave_temp/=length;
                    var each_temp = [];
                    each_temp.push(names[i],parseInt(10*ave_temp.toFixed(1))/10);
                    maps.push(each_temp);
                }
                maps.sort(function(x, y){
                    return x[1]-y[1];
                });

                res.send(maps.slice(0,10));
            }
        }).catch(function (error) {
            console.log(error);
        })
    },
    getAllDate:function (params, res) {
        WeatherTable.findAndCountAll({
            attributes:["date"]
        }).then(function (result) {
            if(result){
                var dates = underscore.pluck(result.rows,"dataValues");
                var datesArray = underscore.pluck(dates,"date");
                var resArray = underscore.unique(datesArray);
                res.send(resArray);
            }
        }).catch(function (error) {
            console.log(error);
        })
    },
    getKindNum:function (params, res) {
        var date = params.date;
        WeatherTable.findAll({
            attributes:["city","kind"],
            where:{date:date}
        }).then(function (result) {
            if(result){
                var citys = underscore.pluck(result,"dataValues");
                var kinds = underscore.pluck(citys,"kind");
                var kindArray = underscore.unique(kinds);
                var resultObj =[];
                for(var i=0;i<kindArray.length;i++) {
                    var dataa={};
                    var cityList = underscore.pluck(underscore.where(citys,{kind:kindArray[i]}),"city");
                    dataa.name = kindArray[i];
                    var xxx = cityList.length/citys.length;
                    dataa.y =  parseInt(100*xxx.toFixed(2));
                    resultObj.push(dataa);
                }
                res.send(resultObj);
            }
        }).catch(function (error) {
            console.log(error);
        })
    },
};