import React  from 'react';
import {Field, reduxForm} from 'redux-form';
import FormField from './FormField';
// import '../styles/change-password-form.css';

const RegistrationForm = (props) => {

  const {handleSubmit} = props;

  return (
    <form className="form-registration" onSubmit={handleSubmit(props.onSubmit)}>

      <h2 className="form-registration-heading">Register</h2>

      <Field component={FormField}
             name="username"
             id="username"
             type="text"
             label="Username"
             placeholder="Your desired Username"
             required="required"
      />

      <Field component={FormField}
             name="emailAddress"
             id="emailAddress"
             type="email"
             label="Email Address"
             placeholder="Email Address"
             required="required"
      />

      <Field component={FormField}
             name="password"
             id="password"
             type="password"
             label="Password"
             placeholder="Password"
             required="required"
      />

      <Field component={FormField}
             name="passwordRepeated"
             id="passwordRepeated"
             type="password"
             label="Password Repeated"
             placeholder="Password Repeated"
             required="required"
      />

      <button className="btn btn-lg btn-primary btn-block"
              disabled={props.pristine || props.isSubmitting}
              type="submit">
        {props.isSubmitting ? <i className="fa fa-spin fa-spinner" /> : null} Register
      </button>

    </form>
  );
};

RegistrationForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  isSubmitting: React.PropTypes.bool.isRequired,
  pristine: React.PropTypes.bool.isRequired
};

// Decorate the form component
export default reduxForm({
  form: 'registration' // a unique name for this form
})(RegistrationForm);
