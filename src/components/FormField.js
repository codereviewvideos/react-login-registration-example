import React, {PropTypes} from 'react';

const FormField = ({input, label, type, meta: {touched, error}}) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="form-control"/>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
};

FormField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired
};

export default FormField;
