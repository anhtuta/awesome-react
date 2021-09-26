import React, { PureComponent } from 'react';
import './Input.scss';

const DEFAULT_INPUT_MAX_LENGTH = 200;

class InputText extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue ? props.defaultValue : '',
      errorMsg: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.defaultValue !== prevState.value) {
      return { value: nextProps.defaultValue };
    }
    return null;
  }

  onChange = (e) => {
    const { value } = e.target;
    const maxLength = this.props.maxLength
      ? this.props.maxLength
      : DEFAULT_INPUT_MAX_LENGTH;
    let errorMsg = '';

    if (value.length > maxLength) {
      errorMsg = 'Max length of input is: ' + maxLength;
    } else if (!this.regexValidation(value)) {
      errorMsg = this.props.regexErrorMsg ? this.props.regexErrorMsg : 'Input is invalid';
    }

    this.setState({
      value,
      errorMsg
    });

    this.props.onChange({
      name: this.props.name,
      value,
      invalid: !!errorMsg
    });
  };

  onKeyPress = (e) => {
    const { onKeyPress } = this.props;
    if (onKeyPress) {
      onKeyPress(e);
    }
  };

  regexValidation = (value) => {
    const regex = this.props.regex ? this.props.regex : '';
    if (value === '' || regex === '') return true;
    return value.match(regex);
  };

  render() {
    const {
      name,
      label,
      disabled = false,
      isRequire = false,
      type = 'text',
      placeholder
    } = this.props;

    const { value, errorMsg } = this.state;

    return (
      <div className="input-wrapper">
        {label && (
          <label className="input-label">
            {label}
            {isRequire && <span className="input-require">&nbsp;*</span>}
          </label>
        )}
        <div className="input-text-wrapper">
          <input
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            onChange={this.onChange}
            className={'input-text' + (!!errorMsg ? ' input-error' : '')}
            placeholder={placeholder}
            onKeyPress={this.onKeyPress}
          />
          {!!errorMsg && <div className="input-error-msg">{errorMsg}</div>}
        </div>
      </div>
    );
  }
}

/**
 * Note: class cha dùng component bây giờ không truyền props value,
 * mà là defaultValue, việc quản lý value cho input được thực hiện trong
 * component này (thông qua state), component cha ko dính dáng gì,
 * và khi onChange sẽ truyền ngược value đó cho component cha
 */
export default InputText;
