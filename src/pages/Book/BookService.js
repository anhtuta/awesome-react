import axiosClient from '../../service/axiosClient';

const getBooks = (params) => {
  return axiosClient.get('/api/book', { params });
};

const createBook = (data) => {
  return axiosClient.post('/api/book', data, {});
};

const BookService = {
  getBooks,
  createBook
};

export default BookService;
