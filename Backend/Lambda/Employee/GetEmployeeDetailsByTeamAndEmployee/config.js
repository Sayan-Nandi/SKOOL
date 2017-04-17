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
    const kms = new AWS.KMS();
    kms.decrypt({ CiphertextBlob: new Buffer(encrypted, 'base64') }, (err, data) => {
        if (err) {
            //console.log('Decrypt error:', err);
            callback(err);
        }
        decrypted = data.Plaintext.toString('ascii');
        callback(null,decrypted);
    });
}
}

module.exports= configuration;