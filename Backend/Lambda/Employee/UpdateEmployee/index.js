
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
	var _teamid = event.EmployeeTeam_TeamId;
	var _empid = event.EmployeeTeam_EmployeeId;
    var _Employeename = event.EmployeeName;
    var _EmployeeLNid = event.EmployeeLNId;
    var _EmployeeIBMDOJ = event.EmployeeIBMDOJ;
    var _EmployeeAccDOJ = event.EmployeeAccDOJ;
    var _Employee_BandId = event.Employee_BandID;
    var _Employee_EmployeeJobTypeId = event.Employee_EmployeeJobTypeId; 
    var _EmployeeCode = event.EmployeeCode;
    var _EmployeeTeamOverAllScore = event.EmployeeTeamOverAllScore;
    var _EmployeeTeam_TierId = event.EmployeeTeam_TierId;
    var _EmployeeTeam_RoleId = event.EmployeeTeam_RoleId;
    var _EmployeeTeamPrimarySkill_TeamTechnologyId = event.EmployeeTeamPrimarySkill_TeamTechnologyId; 
    var _EmployeeTeamPrimarySkillScore = event.EmployeeTeamPrimarySkillScore;
    var _EmployeeTeamPrimarySkillWeight = event.EmployeeTeamPrimarySkillWeight;
    var _EmployeeTeamSecondarySkill_TeamTechnologyId = event.EmployeeTeamSecondarySkill_TeamTechnologyId;
    var _EmployeeTeamSecondarySkillScore = event.EmployeeTeamSecondarySkillScore;
    var _EmployeeTeamSecondarySkillWeight = event.EmployeeTeamSecondarySkillWeight;
    var _EmployeeTeamTertiarySkill_TeamTechnologyId = event.EmployeeTeamTertiarySkill_TeamTechnologyId;
    var _EmployeeTeamTertiarySkillScore = event.EmployeeTeamTertiarySkillScore;
    var _EmployeeTeamTertiarySkillWeight = event.EmployeeTeamTertiarySkillWeight;
    var _EmployeeTeam_JobRoleId = event.EmployeeTeam_JobRoleId;
    var _EmployeeTeamId = event.EmployeeTeamId;

	mysqlstatement = `CALL UpdateEmployee(${_teamid}
						, ${_empid}
						, '${_Employeename}' 
						, '${_EmployeeLNid}' 
						, '${_EmployeeIBMDOJ}' 
						, '${_EmployeeAccDOJ}' 
						, ${_Employee_BandId} 
						, ${_Employee_EmployeeJobTypeId} 
						, ${_EmployeeCode} 
						, ${_EmployeeTeamOverAllScore}
						, ${_EmployeeTeam_TierId} 
						, ${_EmployeeTeam_RoleId}
						, ${_EmployeeTeamPrimarySkill_TeamTechnologyId} 
						, ${_EmployeeTeamPrimarySkillScore} 
						, ${_EmployeeTeamPrimarySkillWeight} 
						, ${_EmployeeTeamSecondarySkill_TeamTechnologyId} 
						, ${_EmployeeTeamSecondarySkillScore}
						, ${_EmployeeTeamSecondarySkillWeight}
						, ${_EmployeeTeamTertiarySkill_TeamTechnologyId}
						, ${_EmployeeTeamTertiarySkillScore} 
						, ${_EmployeeTeamTertiarySkillWeight} 
						, ${_EmployeeTeam_JobRoleId} 
						, ${_EmployeeTeamId})`;


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
			callback(null, 'Employee updated successfully!');
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
	//console.log('acc DOJ:' + event.body.EmployeeAccDOJ);
	//console.log('employeeid:' + event.params.employeeid);
    //callback(null,'this is for testing');
    //consol.log(event.body);
	if(event.EmployeeTeam_TeamId)
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