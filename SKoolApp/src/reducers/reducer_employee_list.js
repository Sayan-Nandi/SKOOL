import {FETCH_EMP_LIST, FILTER_EMPLOYEE} from '../actions/index';

const INITIAL_STATE = {employeelist:[], employeefilteredlist:[]};

export default function(state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case FETCH_EMP_LIST:
            //console.log(action.payload.data[0]);    
            return {employeelist:action.payload.data[0], employeefilteredlist:action.payload.data[0]};  
        case FILTER_EMPLOYEE:
            //console.log(action.payload);
            return Object.assign({},state,{employeefilteredlist:action.payload});
            
            
                      
        default:
            return state;
    }
}