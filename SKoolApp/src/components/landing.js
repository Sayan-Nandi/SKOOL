import React, {Component} from 'react';
import EmployeeSearch from './employee_search';
import EmployeeList from './employee_list';


class Landing extends Component
{

/*
    componentDidUpdate()
    {
        setTimeout(()=>{$('#dataTables-example').dataTable();},5000)
    }
*/
    render()
    {
        return(
            <div id="page-wrapper">                           
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Employee List</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">Employee search by team</div>
                            <div className="panel-body">
                                <div className="table-responsive">
                                    <EmployeeSearch />
                                    <EmployeeList />    
                                </div>
                            </div>
                            
                        </div>    
                    </div>    
                </div>                    
            </div>    
            );
    }
}
export default Landing;