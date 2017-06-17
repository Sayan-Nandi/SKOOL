import axios from 'axios';


//following section is for list of urls
const URL_EMP_MASTER = 'https://h8cecj40pk.execute-api.us-west-1.amazonaws.com/dev/teams/employeeconfig';
const URL_EMP_LIST_BY_TEAM = 'https://h8cecj40pk.execute-api.us-west-1.amazonaws.com/dev/GetEmployeeDetailsByTeam';

//following sections is for list of event type
export const FETCH_EMP_MASTER = 'FETCH_EMP_MASTER';
export const FETCH_EMP_LIST = 'FETCH_EMP_LIST';
export const FILTER_EMPLOYEE = 'FILTER_EMPLOYEE';
export const FETCH_EMP_DETAILS = 'FETCH_EMP_DETAILS';
export const UPDATE_EMP_DETAILS = 'UPDATE_EMP_DETAILS';

export function getEmployeeMaster(teamid)
{
    const request = axios.get(`${URL_EMP_MASTER}?TeamId=${teamid}`);
    //console.log('Request : ',request);
    return{
        type:FETCH_EMP_MASTER,
        payload: request
    }
}

export function getEmployeeListByTeam(teamid)
{
    const request = axios.get(`${URL_EMP_LIST_BY_TEAM}?TeamId=${teamid}`);
    //console.log('Request : ',request);
    return{
        type:FETCH_EMP_LIST,
        payload: [request, teamid]
    }    

}

export function getEmployeeFilteredList(searchtext, originallist, modifiedlist)
{
    let newlist = [];
    let listtosearch = null;
    let searchStr = searchtext.toLowerCase().split(' ');
    if(searchStr.length > 0){
        listtosearch = (searchStr.length > 1) ? modifiedlist : originallist;
        searchStr.map((str)=>
        {
            if(str!=''){
                newlist = [];
                listtosearch.map((row) => {
                    if(String(row.BandName).toLowerCase().indexOf(str) > -1 ||
                        String(row.EmployeeAccDOJ).toLowerCase().indexOf(str) > -1 ||
                        String(row.EmployeeAccountTenure).toLowerCase().indexOf(str) > -1 ||
                        String(row.EmployeeCode).toLowerCase().indexOf(str) > -1 ||
                        String(row.EmployeeIBMDOJ).toLowerCase().indexOf(str) > -1 ||
                        String(row.EmployeeIBMTenure).toLowerCase().indexOf(str) > -1 ||
                        String(row.EmployeeJobTypeName).toLowerCase().indexOf(str) > -1 ||
                        String(row.EmployeeLNid).toLowerCase().indexOf(str) > -1 ||
                        String(row.EmployeeTeamOverAllScore).toLowerCase().indexOf(str) > -1 ||
                        String(row.Employeename).toLowerCase().indexOf(str) > -1 ||
                        String(row.RoleName).toLowerCase().indexOf(str) > -1 ||
                        String(row.TierName).toLowerCase().indexOf(str) > -1 ){
                        let needToAdd = true;

                            if(newlist.length>0){
                                newlist.map((r) =>{
                                    if(r.EmployeeId == row.EmployeeId){
                                        needToAdd = false;
                                    } 
                                });
                            }
                            
                            if(needToAdd)
                            {
                                newlist.push(row);
                            }
                        }
                });
            }
        });
    }

    return{
        type:FILTER_EMPLOYEE,
        payload:newlist
    }

}



export function getEmployeeDetails(teamid, empid)
{
    const URL_EMP_DETAILS = `https://h8cecj40pk.execute-api.us-west-1.amazonaws.com/dev/teams/${teamid}/employees/${empid}`
    const request = axios.get(URL_EMP_DETAILS);
    //console.log(request);
    return{
        type:FETCH_EMP_DETAILS,
        payload: request
    }    
} 

export function updateEmployeeDetails(teamid, empid, values)
{
    console.log(values);
    const URL_EMP_DETAILS = `https://h8cecj40pk.execute-api.us-west-1.amazonaws.com/dev/teams/${teamid}/employees/${empid}`
    const request = axios.post(URL_EMP_DETAILS, values);
    console.log(request);
    return{
        type:UPDATE_EMP_DETAILS,
        payload: request
    }    
} 

