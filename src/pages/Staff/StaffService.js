import axiosClient from '../../service/axiosClient';

const getStaffs = (params) => {
  return axiosClient.get('/api/staff', { params });
};

const StaffService = {
  getStaffs
};

export default StaffService;
