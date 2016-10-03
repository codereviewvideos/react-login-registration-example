import React  from 'react';
import { Field, reduxForm } from 'redux-form';
// import '../styles/change-password-form.css';

const RegistrationForm = (props) => {

  const { handleSubmit } = props;

  return (
    <form className="form-registration" onSubmit={handleSubmit(props.onSubmit)}>

      <h2 className="form-registration-heading">Register</h2>

      <label htmlFor="username" className="sr-only">Username</label>
      <Field component="input"
             type="text"
             name="username"
             className="form-control"
             placeholder="Username"
             required />

      <label htmlFor="emailAddress" className="sr-only">Email Address</label>
      <Field component="input"
             type="email"
             name="emailAddress"
             className="form-control"
             placeholder="Email Address"
             required />

      <label htmlFor="password" className="sr-only">Password</label>
      <Field component="input"
             type="password"
             name="password"
             className="form-control"
             placeholder="Password"
             required />

      <label htmlFor="passwordRepeated" className="sr-only">Password (Repeated)</label>
      <Field component="input"
             type="password"
             name="passwordRepeated"
             className="form-control"
             placeholder="Password Repeated"
             required />

      <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>

    </form>
  );
};

RegistrationForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

// Decorate the form component
export default reduxForm({
  form: 'registration' // a unique name for this form
})(RegistrationForm);
