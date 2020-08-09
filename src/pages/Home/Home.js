import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import Table from '../../components/Table/Table';
import TlvcOrderService from './TlvcOrderService';

/**
 * Với cách này, mọi data của table đều do chính nó quản lý,
 * nên Home ko cần state gì liên quan đến table nữa.
 * Mọi data của table sẽ được lấy từ state của nó.
 *
 * Flow của cách này: Chẳng hạn user click vào chuyển trang hoặc sort:
 * Table gọi onFetchData -> gọi onFetchData của Home lấy lại data
 * -> onFetchData của Home return Promise -> Table get Promise và updateState
 * -> Table2 rerender với data mới state mới
 */
class Home extends PureComponent {
  getAllTlvcOrder = (params) => {
    // res là 1 Promise nhé
    const res = TlvcOrderService.getAllTlvcOrder(params);
    return res;
  };

  columns = [
    {
      Header: 'Họ tên',
      accessor: 'name'
    },
    {
      Header: 'Số điện thoại',
      accessor: 'phone',
      Cell: (props) => <a href={'tel:' + props.value}>{props.value}</a>
    },
    {
      Header: 'Địa chỉ',
      accessor: 'address'
    },
    {
      Header: 'Ngày đặt hàng',
      accessor: 'order_date',
      Cell: (props) => <Moment format="HH:mm DD/MM/YYYY">{props.value}</Moment>
    },
    {
      Header: 'Lời nhắn',
      accessor: 'message'
    },
    {
      Header: 'Trạng thái',
      accessor: 'status'
    }
  ];

  render() {
    return (
      <div>
        <h2>Danh sách đặt hàng</h2>
        <Table
          columns={this.columns}
          onFetchData={this.getAllTlvcOrder}
          className="tlvc-order-table"
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default Home;
