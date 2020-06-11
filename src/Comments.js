
import React from 'react';
import NewCommentForm from './NewCommentForm';
import './Comments.css';

/* grabbing all comments from post state by the posts
unique id that comes through as a prop
render new comment form*/
// comments: {id: {text: 'Hey!'}}


function Comments({ comments, handleDelete, postId }) {

  return (
    <div>
      <div>
        {Object.entries(comments).map(([commentId, commentData]) =>
          (<div className="Comments-comment" key={commentId}>
            <span >{commentData.text}</span>
            <span className="Comments-delete" onClick={() => handleDelete(commentId)}><b>X</b></span>
          </div>))}
      </div>
        <NewCommentForm postId={postId}/>
    </div>

  )
}

export default Comments;