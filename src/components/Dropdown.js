import React from 'react';

const Dropdown = ({
  name, label, value,
  options, placeholder, error,
  onChange,
  displayProperty, valueProperty }) => {

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <select
        name={name}
        value={value}
        className="form-control"
        onChange={onChange}>
        <option disabled value="">
          {placeholder}
        </option>
        {options.map(option => (
          <option
            value={option[valueProperty]}>
            {option[displayProperty]}
          </option>
        ))
        }
      </select>
      {error && <p className="text-danger">{error}</p>}
    </div>
  )
};

Dropdown.defaultProps = {
  value: '',
  placeholder: "Please Select Genre"
}

export default Dropdown
