import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    reduxForm, 
    formValueSelector} from 'redux-form';
import {Panel, 
    PanelGroup,
    Tabs,
    Tab,
    Button,
    ButtonToolbar
} from 'react-bootstrap';    
import {GridList, GridTile} from 'material-ui/GridList';
import {renderFormControl} from './formcontrols';
import Paper from 'material-ui/Paper';
import {getEmployeeMaster, getEmployeeDetails} from '../actions/index'

const attributeObject = (label,disabled) =>{
    return {
        type : 'input',
        label : label,
        populatechild : null,
        disabled:disabled  
    }
}



const getFormInitialState = (attribs) => {
    var str = '{';
    str += attribs.map((attrib)=>{
        return `"attrib_${attrib.EmployeeTeamAttributeId}" : ${attrib.EmployeeTeamAttributeValue}`
    });
    str += '}';
    return JSON.parse(str);
}

class EmployeeAttribute extends Component
{
    getAttributeTab(group)
    {
        console.log(this.props);


        let attributes = this.props.empdetails.empattributes;
        //console.log(attributes);
        let group_attribute = _.filter(attributes,(attribute)=>{return attribute.GroupId == group.GroupId});
        //console.log(group_attribute);
        return (
            <Tab eventKey={group.GroupId} title={group.GroupName}>
                <div>
                    <div className="paperContent">Application Score<br/>{group.EmployeeTeamGroupApplicationScore}</div>
                    <div className="paperContent">Role wise weight<br/>{group.EmployeeTeamGroupRolewiseWeight}</div>
                    <div className="paperContent">Target Score    <br/>{group.EmployeeTeamGroupTargetScore}</div>
                    <div className="paperContent">Role wise Score<br/>{group.EmployeeTeamGroupRolewiseScore}</div>
                </div>
                <Panel>
                    <div>
                        <GridList cols={3} cellHeight={65}>
                            {group_attribute.map((attrib)=>{
                                    return <GridTile key={attrib.EmployeeTeamAttributeId}>                                 
                                        <div key={attrib.EmployeeTeamAttributeId}>                  
                                            {renderFormControl(
                                                attributeObject(`${attrib.AttributeName} (Weight ${attrib.AttributeWeight} %)`,false)
                                                , `attrib_${attrib.EmployeeTeamAttributeId}`
                                                , null
                                                , `attrib_${attrib.EmployeeTeamAttributeId}`)}                                                              
                                        </div> 
                                    </GridTile>
                                })}
                            
                           
                        </GridList>
                    </div>  
                </Panel> 
            </Tab>
        );

    }

    onSubmit(values){
        console.log('submitting');
        return;
    }


    render()
    {
        //console.log(this.props.empdetails);
//        const {handleSubmit} = this.props;
                const {handleSubmit} = this.props;            
   
        if(this.props.empdetails.empgroups.length>0)
        {
            let groups = this.props.empdetails.empgroups;
            console.log(groups);
            return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Tabs defaultActiveKey={groups[0].GroupId} animation={false} >
                {groups.map((group)=>{ return this.getAttributeTab(group);})}
                </Tabs>
                <div className="rightAlign">
                <ButtonToolbar>
                    <Button type="submit" bsStyle="primary" disabled={false}>Save Changes</Button>
                </ButtonToolbar>
                </div>
            </form>);
        }else return <div></div>


    }
}
EmployeeAttribute =  reduxForm({
    form:'EmployeeAttributeForm'
})(EmployeeAttribute)

EmployeeAttribute = connect(
  state => ({
    initialValues: state.empdetails ? state.empdetails.attribs[0] : [],
    empdetails:  state.empdetails
  })
)(EmployeeAttribute)

export default EmployeeAttribute;