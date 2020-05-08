import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"
// import { LOREM_IPSUM } from "./config"
import PostForm from "./PostForm"
import Comments from './Comments'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { 
  getPostFromAPI, 
  deleteCommentFromAPI, 
  deletePostFromAPI
 } from "./actionCreators";

import changeVotes from "./changeVotes"

/**
 * Shows details of individual post. Get post id from params
 */
function PostDetails() {
  const { id } = useParams();

  const [editClicked, setEditClicked] = useState(false);
  const { post, loading } = useSelector(st => ({ post: st.posts[id], loading: st.loading }), shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();
  // const changeVotes = useChangeVotes();


  // Pull in all post details on component mount
  useEffect(() => {
    dispatch(getPostFromAPI(id));
  }, [dispatch, id]);



  // Delete post and redirect to home page
  function handleDeleteClick() {
    dispatch(deletePostFromAPI(id));
    history.push("/");
  }

  // function handleUpVote(){
  //   changeVotes(id, "up");
  // }

  // function handleDownVote(){
  //   changeVotes(id, "down");
  // }

    // Passed down to PostCard.  dispatches post request
  // to API and updates backend with new vote
  // function handleVotes(postId, direction) {
  //   dispatch(updateVotesWithAPI(postId, direction));
  // }

  // Pass down function for deleting comments
  function handleCommentDelete(commentId) {
    dispatch(deleteCommentFromAPI(commentId, id));
  }

  // Returns appropriate JSX depending on if editing or viewing
  function showPostOrEdit() {
    if (editClicked) {
      return <PostForm
        id={id}
        postDetails={post}
        setEditClicked={setEditClicked} />
    } else {
      return (
        <div>
          <div>
            <h1>{post.title}</h1>
            <button className="Post-edit-btn" onClick={() => setEditClicked(true)}>Edit</button>
            <button className="Post-delete-btn" onClick={handleDeleteClick}>Delete</button>
            <h3>{post.description}</h3>
            <p>{post.body}</p>
            <div>
              <p>Votes: {post.votes}</p>
              <button onClick={() => changeVotes( id, "up", dispatch)}>Up Vote</button>
              <button onClick={() => changeVotes( id, "down", dispatch)}>Down Vote</button>
            </div>
          </div>
          {post.comments ?
            <Comments comments={post.comments} postId={id} handleDelete={handleCommentDelete} />
            :
            ""
          }
        </div>
      )

    }
  }


  return (
    <div>
      {loading ? <p>Loading...</p> : showPostOrEdit()}
    </div>


  )
}

export default PostDetails;