/**
 * Created by Friday on 2017/5/11.
 */
var Sequelize = require('sequelize');
var DatabaseInfo = {
    mysql: {
        development: {
            database:'python',
            username:'coco',
            password:'Wzt_759687679',
            host:'47.100.112.88',
            port:'3306'
        },
    }
};

module.exports = DbConnection;

function DbConnection()
{

}

var conn;
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    conn=DatabaseInfo.mysql.development;
} else if (env === 'production'){
    conn=DatabaseInfo.mysql.production;
} else if (env === 'test')
{
    conn=DatabaseInfo.mysql.test;
}
else {
    conn=DatabaseInfo.mysql.development;
}

DbConnection.prototype.sequelize= new Sequelize(conn.database,conn.username,conn.password,{
    host:conn.host,
    port:conn.port,
    dialect:'mysql',
    // operatorsAliases: Op,
    timezone:'+08:00',
    pool:{
        max: '10'
    }
});