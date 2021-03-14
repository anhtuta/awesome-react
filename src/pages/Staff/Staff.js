import React, { PureComponent } from 'react';
import Table from '../../components/Table/Table';
import SearchBox from '../../components/Input/SearchBox';
import StaffService from './StaffService';

class Staff extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      staffData: {},
      params: {
        page: 0
      },
      loading: false
    };
  }

  getStaffs = (params) => {
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
    StaffService.getStaffs(newParams)
      .then((res) => {
        this.setState({
          staffData: res.data,
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

  getStaffs2 = async (params) => {
    this.setState({ loading: true });
    const newParams = { ...this.state.params, ...params };
    this.setState({
      params: newParams
    });
    try {
      const res = await StaffService.getStaffs(newParams);
      this.setState({
        staffData: res.data,
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
      Header: 'Name',
      accessor: (d) => d.firstName + ' ' + d.lastName,
      id: 'fullName'
    },
    {
      Header: 'Gender',
      accessor: 'gender'
    },
    {
      Header: 'Email',
      accessor: 'email',
      sortable: false
    },
    {
      Header: 'Working at',
      accessor: 'storeName'
    }
  ];

  onSearch = (obj) => {
    this.getStaffs({ searchText: obj.value });
  };

  render() {
    const { staffData, loading } = this.state;
    return (
      <div>
        <h2>All staff</h2>
        <div className="width25">
          <SearchBox name="searchText" onSearch={this.onSearch} />
        </div>
        <Table
          columns={this.columns}
          data={staffData}
          loading={loading}
          onFetchData={this.getStaffs}
          className="staff-table"
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default Staff;
