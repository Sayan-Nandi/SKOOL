import {UPDATE_EMP_DETAILS} from '../actions/index';

const INITIAL_STATE = {updatestatus:''};

export default function(state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case UPDATE_EMP_DETAILS:
            //console.log(action.payload.data);
            return action.payload.data;
        default:
            return state;
    }

}
