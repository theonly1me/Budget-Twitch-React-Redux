import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderError = (error, touched) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

const renderInput = formProps => {
  const className = `field ${
    formProps.meta.error && formProps.meta.touched ? 'error' : ''
  }`;
  return (
    <div className={className}>
      <label>{formProps.label}</label>
      <input {...formProps.input} autoComplete="off" />
      <div>{renderError(formProps.meta.error, formProps.meta.touched)}</div>
    </div>
  );
};

const validate = formValues => {
  const errors = {};
  if (!formValues.title) errors.title = 'You must enter a title for the stream';
  if (!formValues.description)
    errors.description = 'You must enter a stream description';
  return errors;
};

const StreamForm = props => {
  const onSubmit = formValues => {
    props.onSubmit(formValues);
  };

  return (
    <form
      onSubmit={props.handleSubmit(onSubmit)}
      className="ui form error"
      style={{ width: '50%' }}
    >
      <Field name="title" component={renderInput} label="Enter Label" />
      <Field
        name="description"
        component={renderInput}
        label="Enter Description"
      />
      <button className="ui button primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default reduxForm({ form: 'StreamForm', validate })(StreamForm);
