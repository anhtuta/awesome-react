import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import Table2 from '../../components/Table/Table2';
import TlvcOrderService from './TlvcOrderService';

/**
 * Với cách này, mọi data của table đều do Component cha là thằng Home2 quản lý,
 * nên Table2 ko cần state nữa mà chỉ cần là functional component.
 * Mọi data của table2 sẽ được lấy từ state của Home2, truyền thông qua props.
 *
 * Flow của cách này: Chẳng hạn user click vào chuyển trang hoặc sort:
 * Table2 gọi onFetchData -> gọi onFetchData của Home2 lấy lại data
 * -> onFetchData của Home2 updateState -> Home2 rerender với state mới
 * -> Home2 truyền props mới cho Table2 -> Table2 rerender với data mới
 */
class Home2 extends PureComponent {
  state = {
    data: [],
    pages: -1,
    loading: false
  };

  getAllTlvcOrder = (params) => {
    this.setState({ loading: true });
    let size = params.size ? params.size : 10;
    TlvcOrderService.getAllTlvcOrder(params)
      .then((res) => {
        this.setState({
          data: res.data.records,
          pages: Math.ceil(res.data.totalCount / size),
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
    const { data, pages, loading } = this.state;
    return (
      <div>
        <h2>Danh sách đặt hàng</h2>
        <Table2
          columns={this.columns}
          onFetchData={this.getAllTlvcOrder}
          className="tlvc-order-table"
          defaultPageSize={10}
          data={data}
          pages={pages}
          loading={loading}
        />
      </div>
    );
  }
}

export default Home2;
