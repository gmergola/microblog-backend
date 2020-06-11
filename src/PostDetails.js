import React, { useState, useEffect } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import PostForm from "./PostForm";
import Comments from './Comments';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getPostFromAPI, deleteCommentFromAPI, deletePostFromAPI} from "./actionCreators";
import "./PostDetails.css";
import changeVotes from "./changeVotes";

/** PostDetails: Shows details of individual post. Get post id from params */
function PostDetails() {
  const { id } = useParams();

  const [editClicked, setEditClicked] = useState(false);
  const { post, loading, error } = useSelector(st => ({ post: st.posts[id], loading: st.loading, error: st.error }), shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();


  // Pull in all post details on component mount
  useEffect(() => {
    dispatch(getPostFromAPI(id));
  }, [dispatch, id]);



  // Delete post and redirect to home page
  function handleDeleteClick() {
    dispatch(deletePostFromAPI(id));
    history.push("/");
  }


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
          <div className="PostDetails-post-div">
            <button className="PostDetails-btn btn btn-dark" onClick={() => setEditClicked(true)}>Edit Post</button>
            <button className="PostDetails-btn delete-btn btn btn-secondary" onClick={handleDeleteClick}>Delete Post</button>
            <h1 className="PostDetails-title" >{post.title}</h1>
            <h3><b>Description of post: </b><i>{post.description}</i></h3>
            <p>{post.body}</p>
            <div>
              <p ><b>Votes:</b> {post.votes}</p>
              <button className="PostDetails-btn btn btn-success" onClick={() => changeVotes( id, "up", dispatch)}>Up Vote</button>
              <button className="PostDetails-btn btn btn-danger" onClick={() => changeVotes( id, "down", dispatch)}>Down Vote</button>
            </div>
          </div>
          <p><b>Comments:</b> </p>
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
      {
      error ?
      <Redirect to="/" />
      :loading
        ?
        <p>Loading...</p>
        : showPostOrEdit()
      }
    </div>


  )
}

export default PostDetails;