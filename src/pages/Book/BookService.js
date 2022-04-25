import axiosClient from '../../service/axiosClient';

const getBooks = (params) => {
  return axiosClient.get('/api/book/detail', { params });
};

const createBook = (data) => {
  return axiosClient.post('/api/book', data);
};

const updateBook = (data) => {
  return axiosClient.put('/api/book/' + data.id, data);
};

const deleteBook = (id) => {
  return axiosClient.delete('/api/book/' + id);
};

const BookService = {
  getBooks,
  createBook,
  updateBook,
  deleteBook
};

export default BookService;
