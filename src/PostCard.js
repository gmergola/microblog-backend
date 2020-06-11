import React from 'react';
import { Link } from "react-router-dom";
import './PostCard.css';

/* PostCard: Displays condensed details of a post, links to detailed route */
function PostCard({ postId, postData: { title, description, votes }, handleVotes }) {
  return (
    <div className="PostCard-body card text-white bg-secondary mb-3">
      <p className="PostCard-header card-header">{title}</p>
      <p className="card-text">{description}</p>
      <div>
        <p>Votes: {votes}</p>
        <div><Link className="PostCard-link" to={`/${postId}`}>Click here to see details about {title}</Link></div>
        <button className="PostCard-btn btn btn-success" onClick={() => handleVotes(postId, "up")}>Up Vote</button>
        <button className="PostCard-btn btn btn-danger" onClick={() => handleVotes(postId, "down")}>Down Vote</button>
      </div>
    </div>
  )
}

export default PostCard;