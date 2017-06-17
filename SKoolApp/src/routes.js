import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
import EmployeeDetails from './components/employee_details';
import Landing from './components/landing';
import EmployeeDetailsNew from './components/employee_new';


export default(
    <Route path="/" component={App}>
        <IndexRoute component={Landing} />
        <Route path="/teams/:teamid/employees/:employeeid" component={EmployeeDetails} />
        <Route path="/teams/:teamid/employees/New" component={EmployeeDetailsNew} />
        
    </Route>
);
