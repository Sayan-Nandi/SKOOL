import {FETCH_EMP_LIST, FILTER_EMPLOYEE} from '../actions/index';

const INITIAL_STATE = {employeelist:[], employeefilteredlist:[], teamid:0};

export default function(state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case FETCH_EMP_LIST:
            //console.log(action.payload.data[0]);    
            return {employeelist:action.payload[0].data[0], employeefilteredlist:action.payload[0].data[0], teamid:action.payload[1]};  
        case FILTER_EMPLOYEE:
            //console.log(action.payload);
            return Object.assign({},state,{employeefilteredlist:action.payload});
            
            
                      
        default:
            return state;
    }
}