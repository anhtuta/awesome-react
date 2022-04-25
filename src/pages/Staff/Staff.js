import React, { PureComponent } from 'react';
import Table from '../../components/Table/Table';
import SearchBox from '../../components/Input/SearchBox';
import Button from '../../components/Button/Button';
import { ACTION_ADD, ACTION_EDIT, STAFF_ALIVE, STAFF_DEAD } from '../../constants/Constants';
import Toast from '../../components/Toast/Toast';
import StaffUpsertModal from './StaffUpsertModal';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import StaffService from './StaffService';
import StoreService from '../Store/StoreService';
import './Staff.scss';

class Staff extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      staffData: {},
      params: {
        page: 0
      },
      loading: false,
      action: '',
      showUpsertModal: false,
      showConfirmModal: false,
      storeOptions: [],
      selectedRow: {}
    };
  }

  componentDidMount() {
    // get all store for creating new or updating staff
    StoreService.getAllStores()
      .then((res) => {
        const storeOptions = res.data.map((item) => ({
          value: item.id,
          label: item.name
        }));
        this.setState({ storeOptions });
      })
      .catch((err) => {
        console.log(err);
        Toast.error(err);
      });
  }

  getStaffs = (params) => {
    this.setState({ loading: true });
    const sort = params.sortBy ? params.sortBy + ',' + params.sortOrder : this.state.params.sort;
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

  // Not use!
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
      accessor: 'storeName',
      Cell: ({ original }) => original.store.name,
      sortable: false
    },
    {
      Header: 'Dead or alive?',
      accessor: 'storeName',
      Cell: ({ original }) => (original.isAlive === STAFF_ALIVE ? 'Alive' : 'Deceased'),
      getProps: (state, rowInfo, column) => {
        const isAlive = rowInfo ? rowInfo.original.isAlive : null;
        let color;
        switch (isAlive) {
          case STAFF_ALIVE:
            color = '#2199f9';
            break;
          case STAFF_DEAD:
            color = '#dc3545';
            break;
          default:
            color = null;
            break;
        }

        return {
          style: {
            color: color,
            fontWeight: color ? 'bold' : null
          }
        };
      }
    },
    {
      Header: 'Action',
      Cell: ({ original }) => (
        <div>
          <i
            className="fa fa-pencil-square icon-btn-action icon-btn-edit"
            onClick={() => this.onUpdate(original)}
            title="Edit staff"
          ></i>
          &nbsp;
          <i
            className="fa fa-trash icon-btn-action icon-btn-delete"
            onClick={() => this.onDelete(original)}
            title="Delete staff"
          ></i>
        </div>
      ),
      width: 80
    }
  ];

  onSearch = (obj) => {
    this.getStaffs({ searchText: obj.value });
  };

  onAddNew = () => {
    this.setState({
      action: ACTION_ADD,
      showUpsertModal: true
    });
  };

  onUpdate = (original) => {
    const selectedRow = {
      id: original.id,
      firstName: original.firstName,
      lastName: original.lastName,
      gender: original.gender,
      isAlive: original.isAlive,
      email: original.email,
      store: original.store
    };
    this.setState({
      action: ACTION_EDIT,
      showUpsertModal: true,
      selectedRow
    });
  };

  onDelete = (original) => {
    this.setState({
      showConfirmModal: true,
      selectedRow: { id: original.id, name: original.firstName + ' ' + original.lastName }
    });
  };

  onCloseUpsertModal = () => {
    this.setState({
      showUpsertModal: false,
      selectedRow: {}
    });
  };

  onCloseConfirmModal = () => {
    this.setState({
      showConfirmModal: false,
      selectedRow: {}
    });
  };

  onSave = () => {
    this.onCloseUpsertModal();
    this.getStaffs(this.state.params);
  };

  onDeleteStaff = () => {
    StaffService.deleteStaff(this.state.selectedRow.id)
      .then((res) => {
        Toast.success(res.message);
        this.onCloseConfirmModal();
        this.getStaffs(this.state.params);
      })
      .catch((err) => {
        console.log(err);
        Toast.error(err);
      });
  };

  render() {
    const {
      staffData,
      loading,
      showUpsertModal,
      showConfirmModal,
      storeOptions,
      action,
      selectedRow
    } = this.state;
    return (
      <div className="staff-wrapper">
        <h2>All staff</h2>
        <div className="search-section">
          <div className="width50">
            <SearchBox name="searchText" onSearch={this.onSearch} />
          </div>
          <Button text="Add new" className="btn-success btn-add-new" onClick={this.onAddNew} />
        </div>

        <Table
          columns={this.columns}
          data={staffData}
          loading={loading}
          onFetchData={this.getStaffs}
          className="staff-table"
          defaultPageSize={10}
        />

        {showUpsertModal && (
          <StaffUpsertModal
            showUpsertModal={showUpsertModal}
            onCloseUpsertModal={this.onCloseUpsertModal}
            storeOptions={storeOptions}
            selectedRow={selectedRow}
            action={action}
            onSave={this.onSave}
          />
        )}
        {showConfirmModal && (
          <ConfirmModal
            show={showConfirmModal}
            modalTitle={`Delete this staff "${selectedRow.name}", this cannot be undone?`}
            saveButtonText="Delete"
            cancelButtonText="Cancel"
            isDelete={true}
            onSave={this.onDeleteStaff}
            onClose={this.onCloseConfirmModal}
            onCancel={this.onCloseConfirmModal}
          />
        )}
      </div>
    );
  }
}

export default Staff;
