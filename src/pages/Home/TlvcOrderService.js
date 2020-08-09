import axiosClient from '../../service/axiosClient';

const getAllTlvcOrder = (params) => {
  return axiosClient.get('/api/tlvc-order/read.php', { params });
};

const TlvcOrderService = {
  getAllTlvcOrder
};

export default TlvcOrderService;
