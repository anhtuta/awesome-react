import React, { PureComponent } from 'react';
import InputText from '../../components/Input/InputText';
import Select from '../../components/Input/Select';
import NormalModal from '../../components/Modal/NormalModal';
import { ACTION_ADD, ACTION_EDIT } from '../../constants/Constants';
import BookService from './BookService';

class BookUpsertModal extends PureComponent {
  state = {
    title: null,
    author: null,
    category: null,
    price: null,
    invalid: {
      title: false
    }
  };

  handleOnChange = (obj) => {
    const copyOfInvalid = { ...this.state.invalid, [obj.name]: obj.invalid };
    this.setState({
      [obj.name]: obj.value,
      invalid: copyOfInvalid
    });
  };

  handleOnChangeCategory = (obj) => {
    this.setState({
      category: { label: obj.label, value: obj.value }
    });
  };

  onSave = () => {
    const { title, author, category, price } = this.state;
    const data = {
      title,
      author,
      categoryId: category.value,
      price
    };
    const { action } = this.props;
    if (action === ACTION_ADD) {
      BookService.createBook(data)
        .then((res) => {
          console.log(res);
          this.props.onCloseUpsertModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const { showUpsertModal, onCloseUpsertModal, categoryOptions } = this.props;
    // const {title, author, category, price} = this.state;

    console.log(this.state);

    return (
      <NormalModal
        show={showUpsertModal}
        modalTitle="Add new book"
        saveButtonText="Save"
        cancelButtonText="Cancel"
        onSave={this.onSave}
        onClose={onCloseUpsertModal}
      >
        <InputText
          name="title"
          label="Title"
          isRequire={true}
          onChange={this.handleOnChange}
        />
        <InputText
          name="author"
          label="Author"
          isRequire={true}
          onChange={this.handleOnChange}
        />
        <Select
          name="category"
          label="Category"
          options={categoryOptions}
          isRequire={true}
          onChange={this.handleOnChangeCategory}
        />
        <InputText
          name="price"
          label="Price"
          regex="[0-9]+"
          isRequire={true}
          onChange={this.handleOnChange}
        />
      </NormalModal>
    );
  }
}

export default BookUpsertModal;
