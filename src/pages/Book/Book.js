import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import Table from '../../components/Table/Table';
import SearchBox from '../../components/Input/SearchBox';
import BookService from './BookService';

class Book extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bookData: {},
      params: {
        page: 0
      },
      loading: false
    };
  }

  getBooks = (params) => {
    this.setState({ loading: true });
    const newParams = { ...this.state.params, ...params };
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
      accessor: 'categoryName'
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
    }
  ];

  onSearch = (obj) => {
    this.getBooks({ searchText: obj.value });
  };

  render() {
    const { bookData, loading } = this.state;
    return (
      <div>
        <h2>All book</h2>
        <div className="width25">
          <SearchBox name="searchText" onSearch={this.onSearch} />
        </div>
        <Table
          columns={this.columns}
          data={bookData}
          loading={loading}
          onFetchData={this.getBooks}
          className="book-table"
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default Book;
