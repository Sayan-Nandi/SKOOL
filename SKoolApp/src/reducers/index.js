import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import emplist from './reducer_employee_list'; 
import empMaster from './reducer_employeemaster';
import empDetails from './reducer_employeedetails';
import updEmployee from './reducer_updateemployee';


const rootReducer = combineReducers({
  emplist: emplist,
  empmaster : empMaster,
  empdetails : empDetails,
  updemployee : updEmployee, 
  form:formReducer
});

export default rootReducer;
