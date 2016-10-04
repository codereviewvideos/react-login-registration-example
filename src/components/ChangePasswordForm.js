import React  from 'react';
import { Field, reduxForm } from 'redux-form';
// import '../styles/change-password-form.css';

const ChangePasswordForm = (props) => {

  const { handleSubmit } = props;

  return (
    <form className="form-change-password" onSubmit={handleSubmit(props.onSubmit)}>

      <h2 className="form-change-password-heading">Change Password</h2>

      <label htmlFor="currentPassword" className="sr-only">Current Password</label>
      <Field component="input"
             type="password"
             name="currentPassword"
             className="form-control"
             placeholder="Current Password"
             autoCorrect="off"
             autoCapitalize="off"
             spellCheck="false"
             required />

      <label htmlFor="newPassword" className="sr-only">Password</label>
      <Field component="input"
             type="password"
             name="newPassword"
             className="form-control"
             placeholder="New Password"
             required />

      <label htmlFor="newPasswordRepeated" className="sr-only">Password (Repeated)</label>
      <Field component="input"
             type="password"
             name="newPasswordRepeated"
             className="form-control"
             placeholder="Password Repeated"
             required />

      <button className="btn btn-lg btn-primary btn-block" type="submit">Change Password</button>

    </form>
  );
};

ChangePasswordForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

// Decorate the form component
export default reduxForm({
  form: 'change-password' // a unique name for this form
})(ChangePasswordForm);
