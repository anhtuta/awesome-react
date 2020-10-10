import React, { useState, useEffect, useRef } from 'react';
import PostList from './PostList';
import Pagination from './Pagination';
import queryString from 'query-string';
import InputText from '../../components/Input/InputText';

const FetchDemo = () => {
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 9,
    _totalRows: 0
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 9,
    title_like: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // tạo 1 biến mà giá trị sẽ ko thay đổi sau mỗi lần rerender
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const paramString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const json = await response.json();
        setPostList(json.data);
        setPagination(json.pagination);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostList();
  }, [filters]);

  const onPageChange = (newPage) => {
    setFilters({
      ...filters,
      _page: newPage
    });
  };

  const handleOnChangeText = (obj) => {
    const text = obj.value;
    setSearchTerm(text);

    // Implement kỹ thuật debounce
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setFilters({
        ...filters,
        _page: 1,
        title_like: text
      });
    }, 300);
  };

  return (
    <div>
      <h2>Post list</h2>
      <InputText
        value={searchTerm}
        onChange={handleOnChangeText}
        placeholder="Search..."
      />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </div>
  );
};

export default FetchDemo;
