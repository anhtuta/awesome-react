import React, { PureComponent } from 'react';
import InputText from '../../components/Input/InputText';
import Select from '../../components/Input/Select';
import NormalModal from '../../components/Modal/NormalModal';
import { ACTION_ADD } from '../../constants/Constants';
import Toast from '../../components/Toast/Toast';
import RadioGroup from '../../components/Input/RadioGroup';
import Checkbox from '../../components/Input/Checkbox';
import StaffService from './StaffService';

const genderOptions = [
  {
    label: 'Male',
    value: 'male'
  },
  {
    label: 'Female',
    value: 'female'
  },
  {
    label: 'Gay',
    value: 'gay'
  },
  {
    label: 'Lesbian',
    value: 'lesbian'
  },
  {
    label: 'Unknown',
    value: 'unknown'
  }
];

class StaffUpsertModal extends PureComponent {
  constructor(props) {
    super(props);
    const { id, firstName, lastName, gender, isAlive, email, store } = props.selectedRow;
    this.state = {
      id,
      firstName,
      lastName,
      gender: gender ? this.getGenderOptionByValue(gender) : null,
      isAlive: isAlive === 1,
      email,
      store: store ? this.getStoreOptionById(store.id) : null,
      invalid: {
        firstName: false
      }
    };
  }

  getStoreOptionById = (id) => {
    return this.props.storeOptions.find((option) => {
      return option.value === id;
    });
  };

  getGenderOptionByValue = (value) => {
    return genderOptions.find((option) => {
      return option.value === value;
    });
  };

  handleOnChange = (obj) => {
    const copyOfInvalid = {
      ...this.state.invalid,
      [obj.name]: obj.invalid ? obj.invalid : false
    };
    this.setState({
      [obj.name]: obj.value,
      invalid: copyOfInvalid
    });
  };

  handleOnChangeStore = (obj) => {
    this.setState({
      store: { label: obj.label, value: obj.value }
    });
  };

  onChangeGender = (obj) => {
    this.setState({
      gender: { label: obj.label, value: obj.value }
    });
  };

  onSave = () => {
    const { id, firstName, lastName, gender, isAlive, email, store } = this.state;
    if (!firstName || !lastName || !store) {
      Toast.error('Please fill all required fields');
      return;
    }
    const data = {
      id,
      firstName,
      lastName,
      gender: gender ? gender.value : null,
      isAlive: isAlive ? 1 : 0,
      email,
      storeId: store.value
    };
    const { action } = this.props;
    if (action === ACTION_ADD) {
      StaffService.createStaff(data)
        .then((res) => {
          Toast.success(res.message);
          this.props.onSave();
        })
        .catch((err) => {
          console.log(err);
          Toast.error(err);
        });
    } else {
      StaffService.updateStaff(data)
        .then((res) => {
          Toast.success(res.message);
          this.props.onSave();
        })
        .catch((err) => {
          console.log(err);
          Toast.error(err);
        });
    }
  };

  render() {
    const { showUpsertModal, onCloseUpsertModal, storeOptions } = this.props;
    const { firstName, lastName, gender, isAlive, email, store } = this.state;

    return (
      <NormalModal
        customClass="staff-modal-wrapper"
        show={showUpsertModal}
        modalTitle="Add new staff"
        saveButtonText="Save"
        cancelButtonText="Cancel"
        onSave={this.onSave}
        onClose={onCloseUpsertModal}
        onCancel={onCloseUpsertModal}
      >
        <InputText
          name="firstName"
          label="First name"
          defaultValue={firstName}
          isRequire={true}
          onChange={this.handleOnChange}
        />
        <InputText
          name="lastName"
          label="Last name"
          defaultValue={lastName}
          isRequire={true}
          onChange={this.handleOnChange}
        />

        <div style={{ display: 'flex' }}>
          <div className="width60">
            <RadioGroup
              name="gender"
              label="Gender"
              defaultOption={gender}
              options={genderOptions}
              onChange={this.onChangeGender}
            />
          </div>
          <div className="width10 vertical-line"></div>
          <div className="width30">
            <Checkbox
              label="Alive"
              headerLabel="Dead or Alive?"
              name="isAlive"
              onChange={this.handleOnChange}
              defaultChecked={isAlive}
            />
          </div>
        </div>
        <InputText
          name="email"
          label="Email"
          defaultValue={email}
          onChange={this.handleOnChange}
        />
        <Select
          name="store"
          label="Working at"
          defaultOption={store}
          options={storeOptions}
          isRequire={true}
          onChange={this.handleOnChangeStore}
        />
      </NormalModal>
    );
  }
}

export default StaffUpsertModal;
