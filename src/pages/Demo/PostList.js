import React from 'react';
import PropTypes from 'prop-types';

function PostList(props) {
  const { posts } = props;
  return (
    <div>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array
};

PostList.defaultProps = {
  posts: []
};

export default PostList;
