import React  from 'react';
import {Field, reduxForm} from 'redux-form';
import FormField from './FormField';
// import '../styles/login-page.css';

const LoginForm = (props) => {

  const {handleSubmit} = props;

  return (
      <form className="form-signin" onSubmit={handleSubmit(props.onSubmit)}>

        <h2 className="form-signin-heading">Please log in</h2>

        <Field component={FormField}
               name="username"
               id="username"
               type="text"
               placeholder="Username or Email Address"
               required="required"
        />

        <Field component={FormField}
               name="password"
               id="password"
               type="password"
               placeholder="Password"
               required="required"
        />

        <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>

      </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

// Decorate the form component
export default reduxForm({
  form: 'login' // a unique name for this form
})(LoginForm);
