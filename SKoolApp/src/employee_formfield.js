import React from 'react';
import MenuItem from 'material-ui/MenuItem'

const getTechnologyByTeam = (technologies) => {
    const items = technologies.map((technology) =>
        {
            return(
                <MenuItem value={technology.TechnologyId} primaryText={technology.TechnologyName} />
            );
        });
    return items;
}


export const FIELDS_EMPLOYEE_HEADER = {
    EmployeeCode : {
        type : 'input',
        label : 'Code',
        populatechild : null,
        disabled : false
     },
    EmployeeIBMTenure:  {
        type : 'input',
        label : 'IBM Tenure',
        populatechild : null,
        disabled:true 
    },
    EmployeeTeamOverAllScore :  {
        type : 'input',
        label : 'Over-all Score',
        populatechild : null,
        disabled:true 
    },
    EmployeeName : {
        type : 'input',
        label : 'Name',
        populatechild : null,
        disabled:false 
    },
    EmployeeAccountTenure:{
        type : 'input',
        label : 'Account Tenure',
        populatechild : null,
        disabled:true  
    },   
    EmployeeTeam_TierId: {
        type : 'select',
        label : 'Tier',
        populatechild : (tiers) =>{
            const items = tiers.map((tier) =>
                    {
                        return(
                            <MenuItem value={tier.Tierid} primaryText={tier.TierName} />
                        );
                    });
            return items;                    
        },
        disabled:true               
    }                
};

export const FIELDS_EMPLOYEE_BASIC = {
    Employee_EmployeeJobTypeId : {
        type : 'select',
        label : 'Job Type',
        populatechild : (jobtypes) =>{
            const items = jobtypes.map((jobtype) =>
                    {
                        return(
                            <MenuItem value={jobtype.EmployeeJobTypeId} primaryText={jobtype.EmployeeJobTypeName} />
                        );
                    });
            return items;                    
        },
        disabled:false              
    },
    EmployeeIBMDOJ:{
        type : 'date',
        label : 'IBM DOJ',
        populatechild : null,
        disabled:false              
    },
    EmployeeLNId:{
        type : 'input',
        label : 'Notes Id',
        populatechild : null,
        disabled:false              
    },
    EmployeeTeam_RoleId:{
        type : 'select',
        label : 'Role',
        populatechild : (roles) =>{
            const items = roles.map((role) =>
                    {
                        return(
                            <MenuItem value={role.RoleId} primaryText={role.RoleName} />
                        );
                    });
            return items;                    
        },
        disabled:false              
    },
    EmployeeAccDOJ:{
        type : 'date',
        label : 'Account DOJ',
        populatechild : null,
        disabled:false              
    },
    Employee_BandID:{
        type : 'select',
        label : 'Band',
        populatechild : (bands) =>{
            const items = bands.map((band) =>
                    {
                        return(
                            <MenuItem value={band.BandId} primaryText={band.BandName} />
                        );
                    });
            return items;                    
        },
        disabled:false              
    },
    EmployeeTeam_JobRoleId:{
        type : 'select',
        label : 'Job Role',
        populatechild : (jobroles) =>{
            const items = jobroles.map((jobrole) =>
                    {
                        return(
                            <MenuItem value={jobrole.JobRoleId} primaryText={jobrole.JobRoleName} />
                        );
                    });
            return items;                    
        },
        disabled:false              
    }    
}

export const FIELDS_EMPLOYEE_TECHNOLOGY = {
    EmployeeTeamPrimarySkill_TeamTechnologyId :{
        type : 'select',
        label : 'Primary Skill',
        populatechild : getTechnologyByTeam,
        disabled:false        
    }
	, EmployeeTeamPrimarySkillScore : {
        type : 'input',
        label : 'Primary Skill Score',
        populatechild : null,
        disabled:false         
    }
	, EmployeeTeamPrimarySkillWeight : {
        type : 'input',
        label : 'Primary Skill Weight',
        populatechild : null,
        disabled:false

    }
	, EmployeeTeamSecondarySkill_TeamTechnologyId : {
        type : 'select',
        label : 'Secondary Skill',
        populatechild : getTechnologyByTeam,
        disabled:false        
    }
	, EmployeeTeamSecondarySkillScore : {
        type : 'input',
        label : 'Secondary Skill Score',
        populatechild : null,
        disabled:false        
    }
	, EmployeeTeamSecondarySkillWeight : {
        type : 'input',
        label : 'Secondary Skill Weight',
        populatechild : null,
        disabled:false        
    }
	, EmployeeTeamTertiarySkill_TeamTechnologyId : {
        type : 'select',
        label : 'Tertiary Skill',
        populatechild : getTechnologyByTeam,
        disabled:false        
    }
	, EmployeeTeamTertiarySkillScore : {
        type : 'input',
        label : 'Tertiary Skill Score',
        populatechild : null,
        disabled:false            
    }
	, EmployeeTeamTertiarySkillWeight : {
        type : 'input',
        label : 'Tertiary Skill Weight',
        populatechild : null,
        disabled:false           
    }


}