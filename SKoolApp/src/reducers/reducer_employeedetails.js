import {FETCH_EMP_DETAILS} from '../actions/index';

const INITIAL_STATE = {empdetails:{}, empgroups:[], empattributes:[], attribs:[]};

export default function(state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case FETCH_EMP_DETAILS:

            //console.log(action.payload.data[0]);
            return Object.assign({},state,{ empdetails:action.payload.data[0],
                        empgroups:action.payload.data[1],
                        empattributes:action.payload.data[2],
                        attribs:[JSON.parse(
                            `{${action.payload.data[2].map((attrib) => {
                                return `"attrib_${attrib.AttributeId}_${attrib.EmployeeTeamAttributeId}" : ${attrib.EmployeeTeamAttributeValue}`})}}`)] 
                });
        default:
            return state;
    }

}
