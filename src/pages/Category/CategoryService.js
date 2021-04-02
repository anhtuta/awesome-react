import axiosClient from '../../service/axiosClient';

const getAllCategories = () => {
  return axiosClient.get('/api/category/all');
};

const CategoryService = {
  getAllCategories
};

export default CategoryService;
