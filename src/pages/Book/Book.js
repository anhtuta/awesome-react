import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import Table from '../../components/Table/Table';
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
      Header: 'Price',
      accessor: 'price'
    },
    {
      Header: 'Created date',
      accessor: 'created_date',
      Cell: (props) => <Moment format="HH:mm DD/MM/YYYY">{props.value}</Moment>
    },
    {
      Header: 'Modified date',
      accessor: 'modified_date',
      Cell: (props) => <Moment format="HH:mm DD/MM/YYYY">{props.value}</Moment>
    }
  ];

  render() {
    const { bookData, params, loading } = this.state;
    const { page } = params;
    return (
      <div>
        <h2>All book</h2>
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
