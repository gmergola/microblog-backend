import React, {useEffect} from 'react';
import PostCard from './PostCard.js';
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import { getPostsFromAPI, clearErr } from "./actionCreators";
import changeVotes from "./changeVotes"



/*PostList: Makes call to db to get brief version of posts and lists them */
function PostList(){
  const postIdsToPostData = useSelector(st => st.posts, shallowEqual);
  const dispatch = useDispatch();

  // Pull in brief details on all posts on component mount
  // clear error in state
  useEffect(() => {
    dispatch(clearErr());
    dispatch(getPostsFromAPI());
  }, [dispatch]);

  // Passed down to PostCard.  dispatches post request
  // to API and updates backend with new vote
  function handleVotes(postId, direction) {
    changeVotes(postId, direction, dispatch);
  }

  //Makes an array of the postIdsToPostData object, sorted by
  // votes in the postdata
  function sortPostsByVotes() {
    let posts = Object.entries(postIdsToPostData);

    return posts.sort((post1, post2) => {
      return post2[1].votes - post1[1].votes
    })
  }

  return(
    <div>
      {sortPostsByVotes().map(([postId, postData]) => (
      <PostCard
      key={postId}
      postId={postId}
      postData={postData}
      handleVotes={handleVotes}/>))}
    </div>
  )
}

export default PostList;
