
const config = require('./config.js');

const mysql = require('mysql'); 

let decrypted;
let decryptedHost;
let decryptedDatabase;
let decryptedMySqlUser;
let decryptedMySqlPassword;
let decryptedMySqlPort;

var mysqlstatement = "";

function processEvent(event, context, callback) {
/* Create mySQL statement.  The forward slash at the end of each line is to instruct old versions of node that the string has a line break.  Because node. */
	var TeamId = event.params.teamid;
	var EmployeeId = event.params.employeeid;
	mysqlstatement = 'CALL GetEmployeeInfoByEmployeeTeamId('+TeamId+',' + EmployeeId +')';

	/* Filter out tabs and the space semi-colon */
	mysqlstatement = mysqlstatement.replace(/\t+/g, " ").replace(/\s\;/g, ";");

	var mysqlconnect = {
		host: decryptedHost,
		database: decryptedDatabase,
		user: decryptedMySqlUser,
		password: decryptedMySqlPassword,
		port: decryptedMySqlPort
	};
	/* Create the mySQL connection to use for this function */
	var connection = mysql.createConnection(mysqlconnect);
    console.log("connection created");
    connection.connect();
    console.log("connection opened");
	/* Create the mySQL statement to use */
	connection.query(mysqlstatement, function(err, rows, fields) {
		if (err) {
			console.log("mySQL Error");
			callback(err);
		}
		else {
			/* Statement completed, let's see what we've got */
			callback(null, rows);
		}
	});

	/* Free the connection */
	connection.end();
}
/*
DEFAULT MAIN FUNCTION CALL
*/
exports.handler = function(event, context, callback) {
    //console.log("begining of the function");
	//console.log(event);
	//console.log('teamid:' + event.params.teamid);
	//console.log('employeeid:' + event.params.employeeid);
    //callback(null,'this is for testing');
	if(event.params.teamid && event.params.employeeid)
	{

        if (decrypted) {
            processEvent(event, context, callback);
        } else {
			config.decrypt(config.env_variable.MySqlHost,(err, data) => {
				if(err)
				{	
					console.log("Error decrypting MySQLHost");
					callback(err);
				}
				decryptedHost = data;
				console.log("MySQLHost:"+ decryptedHost);

				config.decrypt(config.env_variable.MySqlDB,(err, data) => {
					if(err)
					{	
						console.log("Error decrypting MySQLDB");
						callback(err);
					}
					decryptedDatabase = data;
					console.log("MySQLDB:"+ decryptedDatabase);

					config.decrypt(config.env_variable.MySqlUser,(err, data) => {
						if(err)
						{	
							console.error("Error decrypting MySQLUser");
							callback(err);
						}
						decryptedMySqlUser = data;
						console.info("MySQLUser:"+ decryptedMySqlUser);

						config.decrypt(config.env_variable.MySqlUserPassword,(err, data) => {
							if(err)
							{	
								console.log("Error decrypting MySQLPassword");
								callback(err);
							}
							decryptedMySqlPassword = data;
							console.info("MySQLPassword:"+ decryptedMySqlPassword);

							config.decrypt(config.env_variable.MySqlPort,(err, data) => {
								if(err)
								{	
									console.log("Error decrypting MySQLPort");
									callback(err);
								}
								decryptedMySqlPort = data;
								console.info("MySQLPort:"+ decryptedMySqlPort);

								decrypted = true;
								console.log('calling process event');
            					processEvent(event, context, callback);
							});
						});
					});

				});

			});
			
        }

	}
	else
		callback(new Error('[BadRequest] TeamId is not passed.'));
};