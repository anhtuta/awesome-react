import axiosClient from '../../service/axiosClient';

const getStaffs = (params) => {
  return axiosClient.get('/api/staff', { params });
};

const createStaff = (data) => {
  return axiosClient.post('/api/staff', data);
};

const updateStaff = (data) => {
  return axiosClient.put('/api/staff/' + data.id, data);
};

const deleteStaff = (id) => {
  return axiosClient.delete('/api/staff/' + id);
};

const StaffService = {
  getStaffs,
  createStaff,
  updateStaff,
  deleteStaff
};

export default StaffService;
