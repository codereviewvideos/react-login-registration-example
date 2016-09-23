import React  from 'react';
import { Field, reduxForm } from 'redux-form';
import '../styles/login-page.css';

const LoginForm = (props) => {

  const { handleSubmit } = props;

  return (
      <form className="form-signin" onSubmit={handleSubmit(props.onSubmit)}>

        <h2 className="form-signin-heading">Please sign in</h2>

        <label htmlFor="username" className="sr-only">Username</label>
        <Field component="input"
               type="text"
               name="username"
               className="form-control"
               placeholder="Username or Email Address"
               autoCorrect="off"
               autoCapitalize="off"
               spellCheck="false"
               required />

        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <Field component="input"
               type="password"
               name="password"
               className="form-control"
               placeholder="Password"
               required />

        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

      </form>
  );
};

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

// Decorate the form component
export default reduxForm({
  form: 'login' // a unique name for this form
})(LoginForm);
