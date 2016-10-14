import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import FormField from './FormField';
// import '../styles/change-password-form.css';


const ChangePasswordForm = (props) => {

  // <Field component={React.DOM.input}
  //        type="password"
  //        name="currentPassword"
  //        className="form-control"
  //        placeholder="Current Password"
  //        autoCorrect="off"
  //        autoCapitalize="off"
  //        spellCheck="false"
  //        required />

  let submitting = false;

  return (
    <form className="form-change-password" onSubmit={props.handleSubmit}>

      <h2 className="form-change-password-heading">Change Password</h2>

      <Field component={FormField}
             name="currentPassword"
             id="currentPassword"
             type="password"
             placeholder="Current Password"
             required="required"
      />

      <Field component={FormField}
             name="newPassword"
             id="newPassword"
             type="password"
             placeholder="New Password"
             required="required"
      />

      <Field component={FormField}
             name="newPasswordRepeated"
             id="newPasswordRepeated"
             type="password"
             placeholder="New Password Repeated"
             required="required"
      />

      <button className="btn btn-lg btn-primary btn-block"
              type="submit"
              disabled={submitting}>

        Change Password</button>

    </form>
  );

  // { submitting
  //   ? <i className="fa fa-spin fa-spinner"></i>
  //   : null
  // }

};

ChangePasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

// Decorate the form component
export default reduxForm({
  form: 'change-password' // a unique name for this form
})(ChangePasswordForm);
