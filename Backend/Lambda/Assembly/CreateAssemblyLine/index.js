
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
	var _AssemblyId = event.assemblyId;
	var _DeviceSerialNo = event.deviceSerialNo;
	var _DeviceType = event.deviceType;
	var _FilamentBatchId = event.filamentBatchId;
	var _LedBatchId = event.ledBatchId;
	var _CircuitBoardBatchId = event.circuitBoardBatchId;
	var _WireBatchId = event.wireBatchId;
	var _CasingBatchId = event.casingBatchId;
	var _AdaptorBatchId = event.adaptorBatchId;
	var _StickPodBatchId = event.stickPodBatchId; 
	var _ManufacturingPlant = event.manufacturingPlant;
	var _AssemblyStatus = event.assemblyStatus;
	var _AssemblyCreationDate = event.assemblyCreationDate;
	var _AssemblyCreatedBy = '';



	mysqlstatement = `CALL CreateAssemblyLineItem('${_AssemblyId}'
						, '${_DeviceSerialNo}' 
						, '${_DeviceType}' 
						, '${_FilamentBatchId}' 
						, '${_LedBatchId}' 
						, '${_CircuitBoardBatchId}' 
						, '${_WireBatchId}' 
						, '${_CasingBatchId}' 
						, '${_AdaptorBatchId}'
						, '${_StickPodBatchId}' 
						, '${_ManufacturingPlant}'
						, '${_AssemblyStatus}' 
						, '${_AssemblyCreationDate}' 
						, '${_AssemblyCreatedBy}')`;


//console.log(mysqlstatement);
	/* Filter out tabs and the space semi-colon */
	mysqlstatement = mysqlstatement.replace(/\t+/g, " ").replace(/\s\;/g, ";");
//console.log(mysqlstatement);	

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
			callback(null, true);
		}
	});
	/* Free the connection */
	connection.end();
}
/*
DEFAULT MAIN FUNCTION CALL
*/
exports.handler = function(event, context, callback) {
 
	if(event.assemblyId)
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