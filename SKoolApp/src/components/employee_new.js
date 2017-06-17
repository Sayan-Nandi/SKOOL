import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    reduxForm, 
    formValueSelector} from 'redux-form';

import {getEmployeeMaster, getEmployeeDetails, updateEmployeeDetails} from '../actions/index'
import {FIELDS_EMPLOYEE_HEADER, FIELDS_EMPLOYEE_BASIC, FIELDS_EMPLOYEE_TECHNOLOGY} from '../employee_formfield';

import {Panel, 
    PanelGroup,
      Tabs,
    Tab,
    Button,
ButtonToolbar} from 'react-bootstrap';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import injectTapEventPlugin from "react-tap-event-plugin";
//injectTapEventPlugin();

import {renderFormControl} from './formcontrols';
import EmployeeAttribute from './employee_attributes';


class EmployeeDetailsNew extends Component
{



    componentWillMount()
    {
            //TODO
    }


    onSubmit(values){
        //TODO
    }



    getControls(fieldConfig, key)
    {
        let collection = null;
        switch(fieldConfig.label){
            case 'Job Type':
                collection = this.props.empmaster.jobtypes;
                break;
            case 'Role' : 
                collection = this.props.empmaster.roles;
                break;
            case 'Band' :
                collection = this.props.empmaster.bands;
                break;
            case 'Tier' :
                collection = this.props.empmaster.tiers;
                break;
            case 'Primary Skill' : case 'Secondary Skill' : case 'Tertiary Skill':
                collection = this.props.empmaster.technologies;
                break;  
            case 'Job Role':  
                collection = this.props.empmaster.jobroles;
                break;                                                                     
            default:
                collection = [];
                break;
        }
        if(this.props.initialValues)
            return renderFormControl(fieldConfig, key, collection, this.props.initialValues);
        else
            return <div></div>;    
    }

    render()
    {     

        const {handleSubmit, getEmployeeMaster, getEmployeeDetails, updateEmployeeDetails, submitting} = this.props;            
        
        return(
            <MuiThemeProvider>
            <div>            
                <h1>Create New Employee</h1>
                <Panel header="Employee Details">
                    <Panel>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Panel>
                                <div>
                                    <GridList cols={3} cellHeight={65}>
                                    {_.keys(FIELDS_EMPLOYEE_HEADER).map((key)=>{
                                        let field = _.at(FIELDS_EMPLOYEE_HEADER,key)[0];
                                        return <GridTile key={key}>
                                            <div>                                            
                                                {this.getControls(field,key)}
                                            </div> 
                                        </GridTile>
                                    })}
                                    </GridList>
                                </div>  
                            </Panel> 
                        <PanelGroup defaultActiveKey="1" accordion>                        
                            <Panel header="Basic Information" eventKey="1">
                                <div>
                                    <GridList cols={3} cellHeight={65}>
                                    {_.keys(FIELDS_EMPLOYEE_BASIC).map((key)=>{
                                        let field = _.at(FIELDS_EMPLOYEE_BASIC,key)[0];
                                        return <GridTile key={key}>
                                            <div>                                            
                                                {this.getControls(field,key)}
                                            </div> 
                                        </GridTile>
                                    })}
                                    </GridList>
                                </div>                            
                            </Panel>  

                            <Panel header="Technical Skill" eventKey="2">
                                <div>
                                    <GridList cols={3} cellHeight={65}>
                                    {_.keys(FIELDS_EMPLOYEE_TECHNOLOGY).map((key)=>{
                                        let field = _.at(FIELDS_EMPLOYEE_TECHNOLOGY,key)[0];
                                        return <GridTile key={key}>
                                            <div>                                            
                                                {this.getControls(field,key)}
                                            </div> 
                                        </GridTile>
                                    })}
                                    </GridList>
                                </div>                            
                            </Panel> 
                        </PanelGroup>  
                        <div className="rightAlign">
                                <ButtonToolbar>
                                    <Button type="submit" bsStyle="primary" disabled={false}>Next</Button>
                                </ButtonToolbar>
                        </div>
                    </form>
                </Panel>
                </Panel> 
            </div>
            </MuiThemeProvider>
        );

    }

}

EmployeeDetailsNew =  reduxForm({
    form:'EmployeeFormNew'
})(EmployeeDetailsNew)

EmployeeDetailsNew = connect(
  state => ({
    empmaster: state.empmaster,  
    initialValues: state.empdetails ? state.empdetails.empdetails["0"] : [],
    empdetails:  state.empdetails,
    updemployee : state.updemployee
  }),
  {getEmployeeMaster, getEmployeeDetails, updateEmployeeDetails}               
)(EmployeeDetailsNew)

export default EmployeeDetailsNew;