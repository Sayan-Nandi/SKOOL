import React, {Component} from 'react';
import {Field, formValueSelector} from 'redux-form';
import {
  SelectField,
  TextField,
} from 'redux-form-material-ui';

import DatePicker from 'material-ui/DatePicker'
import MenuItem from 'material-ui/MenuItem';



const renderDatePicker = ({ input, defaultValue, label, meta: { touched, error } }) => (
    <DatePicker 
        errorText = {touched && error} 
        {...input}
        floatingLabelText={label}
        hintText={label}
        value = {input.value !== ''? new Date(input.value) : null}
        onChange = {(event, value) => {input.onChange(value)}} />
)

export const renderFormControl = (fieldConfig, key, collection, val) =>
{
    switch(fieldConfig.type)
    {
        case 'select':

            return(
                <Field
                        name={key}
                        component={SelectField}
                        hintText={fieldConfig.label}
                        floatingLabelText={fieldConfig.label}
                        disabled={fieldConfig.disabled}                            
                    >
                        {(collection.length > 0) ? fieldConfig.populatechild(collection) : ''}
                    </Field>
            );
        case 'input':
        //console.log(val);
            return(
                <Field
                            name={key}
                            component={TextField}
                            hintText={fieldConfig.label}
                            floatingLabelText={fieldConfig.label}
                            disabled={fieldConfig.disabled} 
                            defaultValue={val}
                        />
            );     
        case 'date' :
            return(
                        <Field
                        name={key}
                        component={renderDatePicker}
                        format={null}
                        label={fieldConfig.label}
                        hintText={fieldConfig.label}
                        value={new Date(_.at(val,key))}
                        defaultValue={new Date(_.at(val,key))}
                        disabled={fieldConfig.disabled} 
                    />
            );
        default:
            return <div></div>
    }
    
}
