import React from 'react';
import ReactSelect from 'react-select';

const Select = (props) => {
  const {
    name,
    label,
    placeholder,
    options,
    defaultValue,
    isDisabled = false,
    isRequire = false,
    isMulti = false,
    isClearable = false,
    allowSelectAll = false
  } = props;

  const ALL_OPTION = {
    label: 'ALL',
    value: '*'
  };

  const onChange = (selected) => {
    props.onChange({
      name,
      label: selected.label,
      value: selected.value
    });
  };

  return (
    <div className="input-wrapper select-wrapper">
      <label className="input-label">
        {label}
        {isRequire && <span className="input-require">&nbsp;*</span>}
      </label>
      <ReactSelect
        name={name}
        placeholder={placeholder}
        options={allowSelectAll ? [ALL_OPTION, ...options] : options}
        defaultValue={defaultValue}
        onChange={onChange}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isClearable={isClearable}
      />
    </div>
  );
};

export default Select;
