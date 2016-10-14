import React, {PropTypes} from 'react';
import classNames from 'classnames';

const FormField = (props) => {

  const {input, label, type, meta: {touched, error}} = props;

  let formGroup = classNames(
    'form-group',
    {'has-error': touched && error}
  );

  return (
    <div className={formGroup}>

      {label &&
      <label className="control-label"
             htmlFor={props.id}>
        {label}
      </label>
      }

      <input {...input}
             type={type}
             className="form-control"
             id={props.id}
             placeholder={props.placeholder || ''}
             required={props.required ? 'required' : ''}
             aria-describedby={`${props.id}ErrorBlock`}
      />

      {touched && error && <span id={`${props.id}ErrorBlock`} className="help-block">{error}</span>}
    </div>
  );
};

FormField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  touched: PropTypes.bool,
  error: PropTypes.object,

  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.string
};

export default FormField;
