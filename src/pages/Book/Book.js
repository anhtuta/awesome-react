import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import Table from '../../components/Table/Table';
import SearchBox from '../../components/Input/SearchBox';
import Button from '../../components/Button/Button';
import { ACTION_ADD, ACTION_EDIT } from '../../constants/Constants';
import BookUpsertModal from './BookUpsertModal';
import BookService from './BookService';
import CategoryService from '../Category/CategoryService';
import './Book.scss';

class Book extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bookData: {},
      params: {
        page: 0
      },
      loading: false,
      action: '',
      showUpsertModal: false,
      showConfirmModal: false,
      categoryOptions: []
    };
  }

  componentDidMount() {
    // get all category for creating new or updating book
    CategoryService.getAllCategories()
      .then((res) => {
        console.log(res);
        const categoryOptions = res.data.map((item) => ({
          value: item.id,
          label: item.name
        }));
        this.setState({ categoryOptions });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  }

  getBooks = (params) => {
    this.setState({ loading: true });
    const sort = params.sortBy
      ? params.sortBy + ',' + params.sortOrder
      : this.state.params.sort;
    const newParams = {
      ...this.state.params,
      ...params,
      sort
    };
    this.setState({
      params: newParams
    });
    BookService.getBooks(newParams)
      .then((res) => {
        this.setState({
          bookData: res.data,
          totalCount: res.meta,
          loading: false
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  };

  getBooks2 = async (params) => {
    this.setState({ loading: true });
    const newParams = { ...this.state.params, ...params };
    this.setState({
      params: newParams
    });
    try {
      const res = await BookService.getBooks(newParams);
      this.setState({
        bookData: res.data,
        totalCount: res.meta,
        loading: false
      });
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false
      });
    }
  };

  columns = [
    {
      Header: 'Title',
      accessor: 'title'
    },
    {
      Header: 'Author',
      accessor: 'author'
    },
    {
      Header: 'Category',
      accessor: 'categoryName',
      Cell: ({ original }) => original.category.name,
      sortable: false
    },
    {
      Header: 'Price',
      accessor: 'price'
    },
    {
      Header: 'Created date',
      accessor: 'createdDate',
      Cell: ({ original }) => (
        <Moment format="HH:mm DD/MM/YYYY">{original.createdDate}</Moment>
      )
    },
    {
      Header: 'Modified date',
      accessor: 'modifiedDate',
      Cell: ({ original }) => (
        <Moment format="HH:mm DD/MM/YYYY">{original.modifiedDate}</Moment>
      )
    },
    {
      Header: 'Action',
      Cell: ({ original }) => (
        <div>
          <i
            className="fas fa-edit icon-btn-action icon-btn-edit"
            onClick={() => this.onDelete(original.id)}
          ></i>
          &nbsp;
          <i className="fas fa-trash-alt icon-btn-action icon-btn-delete"></i>
        </div>
      ),
      width: 80
    }
  ];

  onSearch = (obj) => {
    this.getBooks({ searchText: obj.value });
  };

  onAddNew = () => {
    this.setState({
      action: ACTION_ADD,
      showUpsertModal: true
    });
  };

  onUpdate = () => {
    this.setState({
      action: ACTION_EDIT
    });
  };

  onDelete = (id) => {
    alert('Delete id = ' + id);
  };

  onCloseUpsertModal = () => {
    this.setState({
      showUpsertModal: false
    });
  };

  render() {
    const {
      bookData,
      loading,
      showUpsertModal,
      showConfirmModal,
      categoryOptions,
      action
    } = this.state;
    console.log(this.state);

    return (
      <div className="book-wrapper">
        <h2>All book</h2>
        <div className="search-section">
          <div className="width25">
            <SearchBox name="searchText" onSearch={this.onSearch} />
          </div>

          <Button
            text="Add new"
            className="btn-success btn-add-new"
            onClick={this.onAddNew}
          />
        </div>

        <Table
          columns={this.columns}
          data={bookData}
          loading={loading}
          onFetchData={this.getBooks}
          className="book-table"
          defaultPageSize={10}
        />

        {showUpsertModal && (
          <BookUpsertModal
            showUpsertModal={showUpsertModal}
            onCloseUpsertModal={this.onCloseUpsertModal}
            categoryOptions={categoryOptions}
            action={action}
          />
        )}
      </div>
    );
  }
}

export default Book;
