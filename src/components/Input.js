import React from 'react';

const Input = ({ value, label, name, type, error, onChange, ...rest }) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input
        name={name}
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  )
}

Input.defaultProps = {
  value: '',
  label: '',
  name: '',
  type: 'text',
}

export default Input
