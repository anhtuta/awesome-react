import axiosClient from '../../service/axiosClient';

const getAllStores = () => {
  return axiosClient.get('/api/store/all');
};

const StoreService = {
  getAllStores
};

export default StoreService;
