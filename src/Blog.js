import React from "react";
import PostList from './PostList';
import './Blog.css';

/* Blog: shows navBar and renders PostList component */
function Blog() {
  return (
    <div>
      <h1 className="Blog-header"> Welcome to Microblog </h1>
      <h4 className="Blog-info">our innovative site for communicating on the information superhighway</h4>
      <PostList />
    </div>

  )
}

export default Blog;