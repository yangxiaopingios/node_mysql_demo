/**
 * Created by yangyang on 17/4/25.
 */

var tools = {};
module.exports = tools;

tools.formatResult = function(err, result){
    if (err){
        return {
            "status": false,
            "data" : err
        }
    }else {
        return {
            "status": true,
            "data" : result
        }
    }
}
