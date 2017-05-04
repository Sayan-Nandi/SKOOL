import {FETCH_EMP_MASTER} from '../actions/index';

const INITIAL_STATE = {groups:[], jobtypes:[], roles:[], bands:[], tiers:[], technologies:[], jobroles:[]};

export default function(state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case FETCH_EMP_MASTER:
            //console.log(action.payload.data);

            return Object.assign({},state,{ groups:action.payload.data[0] ,
                        jobtypes:action.payload.data[1],
                        roles:action.payload.data[2],
                        bands:action.payload.data[3],
                        tiers:action.payload.data[4],
                        technologies:action.payload.data[5],
                        jobroles:action.payload.data[6]
                });
  
        default:
            return state;
    }

}
