/**
 * Created by yangyang on 17/4/25.
 */

//方式一: Establishing connections
//每次都创建一个连接,执行完就断开连接
var mysql_connection = require('./mysql_connection');

var getInfo1 = async function(){
    var sql = 'select * from wx_users_relation';
    var result = await mysql_connection.query(sql);
    console.log(result.data[0].open_id);
}

//当connection.end来关闭连接时,可以多次调用异步方法来进行多次数据库操作
//原因: 因为异步运行中,connection在完成数据库操作一次后,用connection.end来关闭连接时,不会关闭连接,而是返回错误
getInfo1();
getInfo1();
getInfo1();

//这种方式不能进行多次查询 只能查询一次
//原因: 因为同步运行中,connection在完成数据库操作一次后就断开连接了
//var run1 = async function(){
//    await getInfo1();
//    await getInfo1();
//    await getInfo1();
//}
//
//run1();



//方式二: Pooling connections
// 提供连接池来支持创建和管理一个个连接,适合并发高的连接方式
//var mysql_pool = require('./mysql_pool');
//var getInfo2 = async function (){
//    var sql = 'select * from wx_users_relation';
//    var result = await mysql_pool.query(sql, '');
//    console.log(result.data[0].open_id);
//}
//
////必须同步执行代码,否则会提前结束线程池
//var run2 = async function(){
//    await getInfo2();
//    await getInfo2();
//    await getInfo2();
////当一个个连接结束湿,结束线程池
//    mysql_pool.end();
//}
//
//run2();


//方式三: PoolCluster
// poolCluster 提供多个主机连接
//var mysql_poolCluster = require('./mysql_poolCluster');
//var getInfo3 = async function (){
//    var sql = 'select * from wx_users_relation';
//    var result = await mysql_poolCluster.query(sql, '');
//    console.log(result.data[0].open_id);
//}
//
////必须同步执行代码,否则会提前结束线程池
//var run3 = async function(){
//    await getInfo3();
//    await getInfo3();
//    await getInfo3();
////当一个个连接结束湿,结束线程池
//    mysql_poolCluster.end();
//}
//
//run3();


