/**
 * Created by yangyang on 17/4/26.
 */

var mysql = require('mysql');
var db_config = require('./db_config');
var tools = require('./tools');

var mysql_poolCluster = {};
module.exports = mysql_poolCluster;

//PoolCluster 提供多个主机连接
var poolCluster = mysql.createPoolCluster();

poolCluster.add('MASTER', db_config); // add a named configuration

//断开连接
function _release(connection) {
    try {
        connection.release();
    } catch (err) {
        console.log('DB-关闭数据库连接异常！- 2: ' + err);
    }
}

// Target Group : MASTER, Selector : round-robin
//执行sql语句
mysql_poolCluster.query = function(sql, values) {

    return new Promise(function (resolve) {

        poolCluster.getConnection('MASTER', function (err, connection) {
            if (err) {
                throw 'DB-获取数据库连接异常:'+err;
            } else {
                connection.query(sql, values, function(err, rows) {
                    _release(connection);
                    resolve(tools.formatResult(err, rows));
                });
            }
        });
    });
}

//关闭poolCluster
mysql_poolCluster.end = function(){
    // close all connections
    poolCluster.end(function (err) {
        if(err){
            console.log('poolCluster 关闭错误: ' + err);
        }else {
            // all connections in the pool cluster have ended
            console.log('poolCluster 关闭成功');
        }
    });
}

