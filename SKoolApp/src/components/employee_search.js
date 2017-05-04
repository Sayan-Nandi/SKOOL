import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getEmployeeListByTeam, getEmployeeFilteredList} from '../actions/index';


let oTable = null;
class EmployeeSearch extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {term:'0', filter:''};
        this.onTeamInputChange = this.onTeamInputChange.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }


    componentWillMount()
    {

        this.props.getEmployeeListByTeam(this.state.term);
        /*
        .then((response) => {
             console.log('loaded');
            oTable = $('#dataTables-example').dataTable();
        })
        .catch((err) => {
            console.log(err);
        });
        */
    }


    onFilterChange(event)
    {
        this.setState({filter:event.target.value});
        if(event.target.value!=''){
            this.props.getEmployeeFilteredList(event.target.value,this.props.emplist.employeelist, this.props.emplist.employeefilteredlist);
        }
    }

    onTeamInputChange(event)
    {        
        //let oTable = $('#dataTables-example').dataTable();
        //oTable.fnFilter('');        
        this.setState({term:event.target.value, filter:''});
        this.props.getEmployeeListByTeam(event.target.value);
        /*
        .then(() => {
             console.log('ajax : ' + oTable.ajax);
            if(oTable!=null){
             //    oTable.fnClearTable();             
                oTable.ajax.reload();
            }
        })
        .catch((err) => {
            console.log(err);
        });
        */
    }

    render()
    {
        return(
            <div className="row">
                <div className="col-sm-6">
                    <div className="dataTables_length" id="dataTables-example_length">
                        <label>
                            <input type="number" 
                            placeholder="0"
                            className="form-control input-sm"
                            value={this.state.term}
                            onChange={this.onTeamInputChange}
                            /> : Select Team
                        </label>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div id="dataTables-example_filter" className="dataTables_filter">
                        <label> Search: 
                            <input type="text" 
                            placeholder = ""
                            className="form-control input-sm" 
                            value = {this.state.filter}
                            onChange={this.onFilterChange}
                            />
                        </label>
                    </div>
                </div>
            </div>
        );
    }


}

function mapStateToProps({emplist})
{
    return {emplist}; 
}

export default connect(mapStateToProps,{getEmployeeListByTeam, getEmployeeFilteredList})(EmployeeSearch);


