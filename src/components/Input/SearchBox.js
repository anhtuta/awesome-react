import React, { PureComponent } from 'react';
import './Input.scss';

const DEFAULT_INPUT_MAX_LENGTH = 200;

class SearchBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      errorMsg: '',
      invalid: false,
      focus: false
    };
  }

  onChange = (e) => {
    const { value } = e.target;
    const maxLength = this.props.maxLength
      ? this.props.maxLength
      : DEFAULT_INPUT_MAX_LENGTH;
    let errorMsg = '';

    if (value.length > maxLength) {
      errorMsg = 'Max length of search text is: ' + maxLength;
    } else if (!this.regexValidation(value)) {
      errorMsg = this.props.regexErrorMsg
        ? this.props.regexErrorMsg
        : 'Search text is invalid';
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

  onKeyUp = (e, searchText) => {
    if (e.keyCode === 13) {
      // Enter
      this.onSearch(searchText);
    }
  };

  onSearch = (name) => {
    let { value } = this.state;
    if (value === '') value = null;
    this.props.onSearch({ name, value });
  };

  onClear = (name) => {
    this.setState({
      value: ''
    });
    this.props.onSearch({ name, value: null });
  };

  // onKeyPress = (e) => {
  //   const { onKeyPress } = this.props;
  //   if (onKeyPress) {
  //     onKeyPress(e);
  //   }
  // };

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
        <label className="input-label">
          {label}
          {isRequire && <span className="input-require">&nbsp;*</span>}
        </label>
        <div className="input-search-wrapper">
          <i
            className="fas fa-search input-search-icon"
            onClick={() => this.onSearch(this.props.name)}
          ></i>
          <input
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            onChange={this.onChange}
            className={'input-text' + (!!errorMsg ? 'input-error' : '')}
            placeholder={placeholder}
            onKeyUp={this.onKeyUp}
          />
          {!!errorMsg && <div className="input-error-msg">{errorMsg}</div>}
        </div>
      </div>
    );
  }
}

export default SearchBox;
