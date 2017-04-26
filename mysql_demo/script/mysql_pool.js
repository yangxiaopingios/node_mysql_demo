/**
 * Created by yangyang on 17/4/25.
 */
var mysql = require('mysql');
var db_config = require('./db_config');
var tools = require('./tools');

var mysql_pool = {};
module.exports = mysql_pool;

var pool = mysql.createPool(db_config);

//断开连接
function _release(connection) {
    try {
        connection.release();
    } catch (err) {
        console.log('DB-关闭数据库连接异常！- 2: ' + err);
    }
}

//执行sql语句
mysql_pool.query = function(sql, values) {

    return new Promise(function (resolve) {

        pool.getConnection(function(err, connection){
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

//关闭连接池
mysql_pool.end = function(){
    pool.end(function (err) {
        if(err){
            console.log('连接池关闭错误: ' + err);
        }else {
            console.log('连接池关闭成功');
        }
        // all connections in the pool have ended
    });
}