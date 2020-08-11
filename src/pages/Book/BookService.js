import axiosClient from '../../service/axiosClient';

const getBooks = (params) => {
  return axiosClient.get('/api/book', { params });
};

const BookService = {
  getBooks
};

export default BookService;
