const AWS = require('aws-sdk');

const configuration = {
 env_variable:{
    MySqlHost: 'MYSQLHOST',
    MySqlDB:'MYSQLDBName',
    MySqlUser:'MYSQLUSER',
    MySqlUserPassword:'MYSQLUSERPASSWORD',
    MySqlPort:'MYSQLPORT'
 },
 decrypt: function(envvariable,callback){
    var encrypted = process.env[envvariable];
    callback(null,encrypted);
}
}

module.exports= configuration;