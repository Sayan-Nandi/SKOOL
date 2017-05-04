import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

//let oTable = null;
//let tableData = null;
class EmployeeList extends Component
{
    /*
    componentDidUpdate()
    {
        console.log('reached');
         oTable = $('#dataTables-example').dataTable();
         tableData = oTable.fnGetData();
         console.log(tableData);
    }
    */
    renderEmployee(employee)
    {
        return(
            <tr key={employee.EmployeeId} className="gradeA">
                <td><Link to={`/teams/${employee.TeamId}/employees/${employee.EmployeeId}`}>{employee.EmployeeCode}</Link></td>
                <td><Link to={`/teams/${employee.TeamId}/employees/${employee.EmployeeId}`}>{employee.Employeename}</Link></td>
                <td>{employee.EmployeeJobTypeName}</td>
                <td>{employee.EmployeeLNid}</td>
                <td>{employee.EmployeeIBMDOJ}</td>
                <td>{employee.EmployeeAccDOJ}</td>
                <td>{employee.RoleName}</td>
                <td>{employee.BandName}</td>
                <td>{employee.EmployeeIBMTenure}</td>
                <td>{employee.EmployeeAccountTenure}</td>
                <td>{employee.EmployeeTeamOverAllScore}</td>
                <td>{employee.TierName}</td>                
            </tr>
        );
    }
    render()
    {
        return(
    <div>
            <table className="table table-striped table-bordered table-hover" 
                                        id="dataTables-example">
                <thead>
                    <tr>
                        <th>Emp Code</th>
                        <th>Name</th>
                        <th>Work</th>
                        <th>LNId</th>
                        <th>DOJ-IBM</th>
                        <th>DOJ-Acc</th>
                        <th>Role</th>
                        <th>Band</th>
                        <th>IBM-Tenure</th>
                        <th>Acc-Tenure</th>
                        <th>Score</th>
                        <th>Tier</th>                                                        
                    </tr>
                </thead>
            <tbody>
                {this.props.emplist.employeefilteredlist.length > 0 ? this.props.emplist.employeefilteredlist.map(this.renderEmployee):''}
            </tbody>

            </table>

    </div>
            
        );
    }
}

function mapStateToProps({emplist})
{
    //console.log(emplist.employeefilteredlist);
    return {emplist}; 
}
export default connect(mapStateToProps)(EmployeeList);